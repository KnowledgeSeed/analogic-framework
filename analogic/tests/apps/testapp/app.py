from flask import Blueprint

testapp = Blueprint('testapp', __name__, static_folder='static', static_url_path='/apps/testapp/static')