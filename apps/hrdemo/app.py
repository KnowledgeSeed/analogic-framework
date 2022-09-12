from flask import Blueprint
import os

if os.getenv('ANALOGIC_LOAD_SAMPLE_APPS', 'False') == 'True':
    hrdemo = Blueprint('hrdemo', __name__, static_folder='static', static_url_path='/apps/hrdemo/static')