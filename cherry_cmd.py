import sys
import os

root = os.path.realpath(os.path.dirname(__file__))
sys.path.append(os.path.join(root, 'venv', 'Lib', 'site-packages'))

from DimensionFramework import app as application
from cheroot.wsgi import Server as WSGIServer

server = WSGIServer(bind_addr=('localhost', 8887), wsgi_app=application, numthreads=100)
try:
    server.start()
except KeyboardInterrupt:
    server.stop()