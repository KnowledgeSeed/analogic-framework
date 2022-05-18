from analogic import create_app
import os

site_root = os.path.realpath(os.path.dirname(__file__))
app = create_app(site_root, reverse_proxy_path='flask')
