from flask import Blueprint

textperf = Blueprint('textperf', __name__, static_folder='static', static_url_path='/apps/textperf/static')
