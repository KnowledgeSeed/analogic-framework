from flask import Blueprint

bulkpaste = Blueprint('bulkpaste', __name__, static_folder='static', static_url_path='/apps/bulkpaste/static')