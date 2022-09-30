import os

from flask import Blueprint

if os.getenv('ANALOGIC_LOAD_SAMPLE_APPS', 'False') == 'True':
    helloanalogic = Blueprint('helloanalogic', __name__, static_folder='static', static_url_path='/apps/helloanalogic/static')