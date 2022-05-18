import os
import sys
from flask import json
from functions import createPoolUserDB, generateKey, installPoolUser, insertKey, installSmtpUser

if len(sys.argv) < 3:
    print('Please add arguments')
    print('setup_local_with_default_credential.py applicationName passwordForPoolUser')
    exit(0)

json_url = os.path.join(os.path.dirname(__file__), '..', 'applications', sys.argv[1], 'config.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

application = sys.argv[1]
password = sys.argv[2]
passphrase = 'XrrwAgqLXSH19nIC8I5JOeXoAdx'
salt = 'zuhder75w7ef4fgbrs'

createPoolUserDB(setting, application)
generateKey(application, passphrase, salt)
installPoolUser(application, setting, password)
insertKey(application, 'uc9Pu9tAqW3INEJU+M2b/6b1VkOB1P6CybnJ3IYbqlA=')
os.remove('secret_key')
installSmtpUser(application, setting)