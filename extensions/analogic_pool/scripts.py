from flask import Blueprint

scripts = Blueprint('panel2_script', __name__, static_folder='static', static_url_path='/extensions/analogic_pool/static')