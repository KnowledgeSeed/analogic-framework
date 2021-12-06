import os
import sys
from flask import json
from functions import createPoolUserDB, generateKey, installPoolUsers, insertKey, installSmtpUser

if len(sys.argv) < 4:
    print('Please add arguments')
    print('setup.py applicationName passPhrase salt')
    exit(0)

json_url = os.path.join(os.path.dirname(__file__), '..', 'applications', sys.argv[1], 'config.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

application = sys.argv[1]
passphrase = sys.argv[2]
salt = sys.argv[3]

createPoolUserDB(setting, application)
generateKey(application, passphrase, salt)
installPoolUsers(application, setting)
insertKey(application, 'uc9Pu9tAqW3INEJU+M2b/6b1VkOB1P6CybnJ3IYbqlA=')
os.remove('secret_key')
installSmtpUser(application, setting)