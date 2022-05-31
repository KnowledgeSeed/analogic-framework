from flask import Blueprint

bpspakos = Blueprint('bpspakos', __name__, static_folder='static', static_url_path='/applications/bpspakos/static')