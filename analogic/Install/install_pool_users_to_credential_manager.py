import os
import sys
from flask import json
from functions import installPoolUsers


if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.path.dirname(__file__), '..', 'applications', sys.argv[1], 'config.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

installPoolUsers(sys.argv[1], setting)
