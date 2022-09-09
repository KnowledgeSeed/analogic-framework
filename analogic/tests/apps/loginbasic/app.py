from flask import Blueprint

loginbasic = Blueprint('loginbasic', __name__, static_folder='static', static_url_path='/apps/loginbasic/static')