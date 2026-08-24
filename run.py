import importlib
import json
from urllib.parse import urlparse
from werkzeug.middleware.proxy_fix import ProxyFix
from analogic import create_app
import os
from flask_talisman import Talisman

site_root = os.path.realpath(os.path.dirname(__file__))
app = create_app(site_root)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1, x_prefix=1, x_port=1, x_proto=1)


def _seeder_async_service_connect_sources(root):
    # Apps with a connectedSeederUrl (see analogic_seeder extension) open a
    # WebSocket/fetch straight from the browser to that Seeder instance's
    # AsyncService, which is a different origin than this Flask app - CSP's
    # default-src 'self' would otherwise block it. Mirrors the connect-src
    # derivation in Seeder's own run.py (SEEDER_ASYNC_SERVICE_* env vars).
    sources = {"'self'"}
    explicit_url = (os.getenv('ANALOGIC_SEEDER_ASYNC_SERVICE_URL') or '').rstrip('/')
    async_port = os.getenv('ANALOGIC_SEEDER_ASYNC_SERVICE_PORT', '8100')

    hosts = set()
    apps_dir = os.path.join(root, 'apps')
    if os.path.isdir(apps_dir):
        for app_name in os.listdir(apps_dir):
            app_json_path = os.path.join(apps_dir, app_name, 'app.json')
            if not os.path.isfile(app_json_path):
                continue
            try:
                with open(app_json_path, encoding='utf-8') as file:
                    config = json.load(file)
            except (OSError, ValueError):
                continue
            seeder_url = str(config.get('connectedSeederUrl') or '').strip()
            if not seeder_url:
                continue
            parsed = urlparse(seeder_url)
            if parsed.hostname:
                hosts.add((parsed.hostname, parsed.scheme))

    if explicit_url:
        sources.add(explicit_url)
        if explicit_url.startswith('http://'):
            sources.add('ws://' + explicit_url[len('http://'):])
        elif explicit_url.startswith('https://'):
            sources.add('wss://' + explicit_url[len('https://'):])

    for host, scheme in hosts:
        http_scheme = 'https' if scheme == 'https' else 'http'
        ws_scheme = 'wss' if scheme == 'https' else 'ws'
        sources.add(f'{http_scheme}://{host}:{async_port}')
        sources.add(f'{ws_scheme}://{host}:{async_port}')

    return sorted(sources)


csp_policy = {
    'default-src': '\'self\'',
    'object-src': '\'none\'',
    'style-src': '\'self\' \'unsafe-inline\'',
    'connect-src': _seeder_async_service_connect_sources(site_root)
}

if eval(os.getenv('ANALOGIC_TALISMAN_ENABLED', 'True')):
    Talisman(app, force_https=False, content_security_policy=csp_policy, x_content_type_options=False)

if __name__ == "__main__":
    workers = int(os.getenv('ANALOGIC_WORKERS', '1'))
    threads = int(os.getenv('ANALOGIC_THREADS', '100'))

    if os.environ.get('ANALOGIC_WSGI_SERVER') == 'bjoern':
        bjoern = importlib.import_module('bjoern')
        getattr(bjoern, 'run')(app, "0.0.0.0", 5000)
    elif os.environ.get('ANALOGIC_WSGI_SERVER') == 'gevent':
        from gevent.pywsgi import WSGIServer
        http_server = WSGIServer(('0.0.0.0', 5000), app)
        http_server.serve_forever()
    elif os.environ.get('ANALOGIC_WSGI_SERVER') == 'waitress':
        from waitress import serve
        serve(app, host='0.0.0.0', port=5000, threads=threads)
    elif os.environ.get('ANALOGIC_WSGI_SERVER') == 'gunicorn':
        import subprocess
        subprocess.run(['gunicorn', '-w', str(workers), '--threads', str(threads), '-b', '0.0.0.0:5000', 'run:app'])
    elif os.environ.get('ANALOGIC_WSGI_SERVER') == 'gunicorn2':
        pass
    else:
        app.run(host='0.0.0.0', port='5000', debug=True)
