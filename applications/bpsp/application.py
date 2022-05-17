from flask import Blueprint

bpsp = Blueprint('bpsp', __name__, static_folder='static', static_url_path='/applications/bpsp/static')