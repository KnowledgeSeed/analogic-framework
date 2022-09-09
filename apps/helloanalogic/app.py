import os

from flask import Blueprint

if os.environ.get('ANALOGIC_LOAD_EXAMPLES', True):
    helloanalogic = Blueprint('helloanalogic', __name__, static_folder='static', static_url_path='/apps/helloanalogic/static')