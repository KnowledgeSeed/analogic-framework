import sys
import os

root = os.path.realpath(os.path.dirname(__file__))
sys.path.append(os.path.join(root, 'venv', 'Lib', 'site-packages'))

from DimensionFramework import app as application
from waitress import serve

serve(application, listen='localhost:8889')

