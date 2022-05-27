import os
import sys
from flask import json
from analogic_pool import create_pool_user_db, generate_key, install_smtp_user, insert_key, install_pool_users

if len(sys.argv) < 4:
    print('Please add arguments')
    print('setup.py applicationName passPhrase salt')
    exit(0)

json_url = os.path.join(os.getcwd(), 'apps', sys.argv[1], 'app.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

application = sys.argv[1]
passphrase = sys.argv[2]
salt = sys.argv[3]

create_pool_user_db(setting, application)
generate_key(application, passphrase, salt)
install_pool_users(application, setting)
insert_key(application, 'uc9Pu9tAqW3INEJU+M2b/6b1VkOB1P6CybnJ3IYbqlA=')
os.remove('secret_key')
install_smtp_user(application, setting)