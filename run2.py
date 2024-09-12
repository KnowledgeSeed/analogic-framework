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

