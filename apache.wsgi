import sys
import os

root = os.path.realpath(os.path.dirname(__file__))
sys.path.insert(0, root)
sys.path.append(os.path.join(root, 'venv', 'Lib', 'site-packages'))

from run import app as application