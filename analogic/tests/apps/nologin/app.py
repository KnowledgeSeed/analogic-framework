from flask import Blueprint

nologin = Blueprint('nologin', __name__, static_folder='static', static_url_path='/apps/nologin/static')