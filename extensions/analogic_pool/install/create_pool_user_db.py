import os
import sys
from flask import json
from analogic_pool import create_pool_user_db

if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.getcwd(), 'apps', sys.argv[1], 'app.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

create_pool_user_db(setting, sys.argv[1])



