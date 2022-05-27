import sys
import os

root = os.path.realpath(os.path.dirname(__file__))
sys.path.insert(0, root)
path = os.path.join(root, 'venv', 'Lib', 'site-packages')
if path not in sys.path:
    sys.path.append(path)


from run import app as application