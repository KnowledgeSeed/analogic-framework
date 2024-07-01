import importlib
from werkzeug.middleware.proxy_fix import ProxyFix
from analogic import create_app
import os
from flask_talisman import Talisman

site_root = os.path.realpath(os.path.dirname(__file__))
app = create_app(site_root)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1, x_prefix=1, x_port=1, x_proto=1)

csp_policy = {
    'default-src': '\'self\'',
    'object-src': '\'none\'',
    'style-src': '\'self\' \'unsafe-inline\''
}

if eval(os.getenv('ANALOGIC_TALISMAN_ENABLED', 'True')):
    Talisman(app, force_https=False, content_security_policy=csp_policy, x_content_type_options=False)


if __name__ == "__main__":
    if os.environ.get('ANALOGIC_WSGI_SERVER') == 'bjoern':
        bjoern = importlib.import_module('bjoern')
        getattr(bjoern, 'run')(app, "0.0.0.0", 5000)
    elif os.environ.get('ANALOGIC_WSGI_SERVER') == 'gevent':
        from gevent.pywsgi import WSGIServer
        http_server = WSGIServer(('0.0.0.0', 5000), app)
        http_server.serve_forever()
    else:
        app.run(host='0.0.0.0', port='5000')
