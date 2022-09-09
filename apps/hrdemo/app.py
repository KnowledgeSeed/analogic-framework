from flask import Blueprint

hrdemo = Blueprint('hrdemo', __name__, static_folder='static', static_url_path='/apps/hrdemo/static')