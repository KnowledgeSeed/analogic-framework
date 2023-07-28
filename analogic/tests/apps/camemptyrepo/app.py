from flask import Blueprint

camemptyrepo = Blueprint('camemptyrepo', __name__, static_folder='static', static_url_path='/apps/camemptyrepo/static')