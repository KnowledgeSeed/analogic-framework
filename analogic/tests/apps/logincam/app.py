from flask import Blueprint

logincam = Blueprint('logincam', __name__, static_folder='static', static_url_path='/applications/logincam/static')