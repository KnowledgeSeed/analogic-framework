import os
import sys
from flask import json
from analogic_pool import generate_key

if len(sys.argv) < 2:
    print('Please add arguments')
    print('setup.py applicationName passPhrase salt')
    exit(0)

json_url = os.path.join(os.getcwd(), 'apps', sys.argv[1], 'app.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

generate_key(sys.argv[1], sys.argv[2], sys.argv[3])



