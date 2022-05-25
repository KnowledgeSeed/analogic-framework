import os
import sys
from flask import json
from analogic_pool import install_smtp_user

if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

application = sys.argv[1]

json_url = os.path.join(os.getcwd(), 'applications', application, 'application_settings.json')

if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

install_smtp_user(application, setting)
