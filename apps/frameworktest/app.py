from flask import Blueprint

frameworktest = Blueprint('frameworktest', __name__, static_folder='static', static_url_path='/applications/frameworktest/static')