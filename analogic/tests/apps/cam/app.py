from flask import Blueprint

cam = Blueprint('cam', __name__, static_folder='static', static_url_path='/apps/cam/static')