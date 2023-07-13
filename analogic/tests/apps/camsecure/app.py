from flask import Blueprint

camsecure = Blueprint('camsecure', __name__, static_folder='static', static_url_path='/apps/camsecure/static')