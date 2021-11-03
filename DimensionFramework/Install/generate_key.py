import keyring
import os
import sys
import hmac
import hashlib
import base64
from flask import json

root = os.path.realpath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, root)
sys.path.append(os.path.join(root, 'DimensionFramework'))

from DimensionFramework.Core.SettingManager import SettingManager

if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.path.dirname(__file__), '..', 'applications', sys.argv[1], 'config.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")

dig = hmac.new(os.urandom(10), msg=os.urandom(10), digestmod=hashlib.sha256).digest()
t = base64.b64encode(dig).decode()

print(t)

target_user_name = sys.argv[1] + '_' + SettingManager.FRAMEWORK_SSO_KEY_NAME
p = keyring.get_password(target_user_name, target_user_name)
if p is not None:
    keyring.delete_password(target_user_name, target_user_name)
keyring.set_password(target_user_name, target_user_name, t)

