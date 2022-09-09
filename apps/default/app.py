from flask import Blueprint

default = Blueprint('default', __name__, static_folder='static', static_url_path='/apps/default/static')