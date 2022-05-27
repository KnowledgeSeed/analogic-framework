import os
import sys
from flask import json
from analogic_pool import create_pool_user_db, generate_key, install_pool_user, insert_key, install_smtp_user

if len(sys.argv) < 3:
    print('Please add arguments')
    print('setup_local_with_default_credential.py applicationName passwordForPoolUser')
    exit(0)

json_url = os.path.join(os.getcwd(), 'apps', sys.argv[1], 'app.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

application = sys.argv[1]
password = sys.argv[2]
passphrase = 'XrrwAgqLXSH19nIC8I5JOeXoAdx'
salt = 'zuhder75w7ef4fgbrs'

create_pool_user_db(setting, application)
generate_key(application, passphrase, salt)
install_pool_user(application, setting, password)
insert_key(application, 'uc9Pu9tAqW3INEJU+M2b/6b1VkOB1P6CybnJ3IYbqlA=')
os.remove('secret_key')
install_smtp_user(application, setting)