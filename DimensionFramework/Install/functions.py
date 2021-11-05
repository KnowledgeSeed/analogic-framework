import os
import sys
import hmac
import hashlib
import base64
import keyring
from flask import json

root = os.path.realpath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, root)
sys.path.append(os.path.join(root, 'DimensionFramework'))

from DimensionFramework.Core.SqlitePoolUserManager import SqlitePoolUserManager
from DimensionFramework.Core.SettingManager import SettingManager, encrypt, getSaltForKey


def createPoolUserDB(setting, application):
    if 'pool' not in setting or 'users' not in setting['pool']:
        print('please set pool.users in config.json')
        return

    if 'Pool' in setting['authenticationMode']:
        poolUserManager = SqlitePoolUserManager(setting['pool']['users'],
                                                os.path.join(os.path.dirname(__file__), '..'),
                                                application)
        poolUserManager.clear()
        poolUserManager.createDatabase()
        print('Database created')
    else:
        print('authenticationMode is not Pool')


def generateKey(application, pass_phrase, salt):
    dig = hmac.new(os.urandom(10), msg=os.urandom(10), digestmod=hashlib.sha256).digest()
    t = base64.b64encode(dig).decode()

    target_user_name = application + '_' + SettingManager.FRAMEWORK_SSO_KEY_NAME
    pass_phrase_name = application + '_' + SettingManager.FRAMEWORK_SSO_PASSPHRASE_NAME
    salt_name = application + '_' + SettingManager.FRAMEWORK_SSO_SALT_NAME

    updateCredentialManager(pass_phrase_name, pass_phrase_name, pass_phrase)
    updateCredentialManager(salt_name, salt_name, salt)
    updateCredentialManager(target_user_name, target_user_name, t)
    print('key generated')


def updateCredentialManager(target, user_name, pwd):
    p = keyring.get_password(target, user_name)
    if p is not None:
        keyring.delete_password(target, user_name)
    keyring.set_password(target, user_name, pwd)


def installPoolUsers(application, setting):
    passwords_url = os.path.join(os.path.dirname(__file__), 'pwd.json')
    if os.path.exists(passwords_url) is False:
        print('path does not exists: ' + passwords_url)

    if 'pool' not in setting or 'users' not in setting['pool']:
        print('please set pool.users in config.json')
        return

    p = json.load(open(passwords_url), encoding="utf-8")

    if 'passwords' not in p:
        print('please set passwords array in pwd.json')
        return

    if len(p['passwords']) != len(setting['pool']['users']):
        print('length of password array is not equals with users array')
        return

    passphrase_name = application + '_' + SettingManager.FRAMEWORK_SSO_PASSPHRASE_NAME
    salt_name = application + '_' + SettingManager.FRAMEWORK_SSO_SALT_NAME
    for idx, u in enumerate(setting['pool']['users']):
        target = setting['camNamespace'] + '/' + u
        password = encrypt(p['passwords'][idx], getSaltForKey(u, salt_name), passphrase_name)
        updateCredentialManager(target, u, password)

    print('users added')
