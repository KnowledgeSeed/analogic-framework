import keyring
import os
import sys
from flask import json

if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.getcwd(), 'applications', sys.argv[1], 'application_settings.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

passwords_url = os.path.join(os.getcwd(), 'pwd.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

if 'pool' not in setting or 'users' not in setting['pool']:
    print('please set pool.users in config.json')
    exit(0)

for idx, u in enumerate(setting['pool']['users']):
    p = keyring.get_password(setting['camNamespace'] + '/' + u, u)
    if p is not None:
        keyring.delete_password(setting['camNamespace'] + '/' + u, u)

print('users removed')