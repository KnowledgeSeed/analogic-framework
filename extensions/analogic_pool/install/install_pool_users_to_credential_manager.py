import os
import sys
from flask import json
from analogic_pool import install_pool_users


if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.getcwd(), 'applications', sys.argv[1], 'applications_settings.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

install_pool_users(sys.argv[1], setting)
