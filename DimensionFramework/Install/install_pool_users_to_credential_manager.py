import keyring
import os
import sys
from flask import json

if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.path.dirname(__file__), '..', 'applications', sys.argv[1], 'config.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

passwords_url = os.path.join(os.path.dirname(__file__), 'pwd.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

if 'pool' not in setting or 'users' not in setting['pool']:
    print('please set pool.users in config.json')
    exit(0)

p = json.load(open(passwords_url), encoding="utf-8")

if 'passwords' not in p:
    print('please set passwords array in pwd.json')
    exit(0)

if len(p['passwords']) != len(setting['pool']['users']):
    print('length of password array is not equals with users array')
    exit(0)

for idx, u in enumerate(setting['pool']['users']):
    keyring.set_password(setting['camNamespace'] + '/' + u, u, p['passwords'][idx])

print('users added')
