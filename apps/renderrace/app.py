from flask import Blueprint

renderrace = Blueprint('renderrace', __name__, static_folder='static', static_url_path='/apps/renderrace/static')
