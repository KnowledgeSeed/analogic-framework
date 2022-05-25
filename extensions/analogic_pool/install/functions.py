import os
import hmac
import hashlib
import base64
import keyring
import requests
from flask import json

root = os.getcwd()

from analogic_pool.sqlite import SqlitePoolUserManager
from analogic_pool.poolsetting import PoolSettingManager, encrypt, get_salt_for_key


def create_pool_user_db(setting, application):
    if 'pool' not in setting or 'users' not in setting['pool']:
        print('please set pool.users in config.json')
        return

    if 'Pool' in setting['authenticationMode']:
        pool_user_manager = SqlitePoolUserManager(setting['pool']['users'],
                                                  os.getcwd(),
                                                  application)
        pool_user_manager.clear()
        pool_user_manager.create_database()
        print('Database created')
    else:
        print('authenticationMode is not Pool')


def generate_key(application, pass_phrase, salt):
    dig = hmac.new(os.urandom(10), msg=os.urandom(10), digestmod=hashlib.sha256).digest()
    t = base64.b64encode(dig).decode()

    secret_file = open("secret_key", mode="w", encoding="utf-8")
    secret_file.writelines(t)
    secret_file.close()

    target_user_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_KEY_NAME
    pass_phrase_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_PASSPHRASE_NAME
    salt_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_SALT_NAME

    update_credential_manager(pass_phrase_name, pass_phrase_name, pass_phrase)
    update_credential_manager(salt_name, salt_name, salt)
    update_credential_manager(target_user_name, target_user_name, t)
    print('key generated')


def insert_key(application, value):
    target_user_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_KEY_NAME
    update_credential_manager(target_user_name, target_user_name, value)
    print('key added')


def update_credential_manager(target, user_name, pwd):
    p = keyring.get_password(target, user_name)
    if p is not None:
        keyring.delete_password(target, user_name)
    keyring.set_password(target, user_name, pwd)


def install_pool_user(application, setting, password):
    if 'pool' not in setting or 'users' not in setting['pool']:
        print('please set pool.users in config.json')
        return
    passphrase_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_PASSPHRASE_NAME
    salt_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_SALT_NAME
    for idx, u in enumerate(setting['pool']['users']):
        target = setting['camNamespace'] + '/' + u
        encrypted_password = encrypt(password, get_salt_for_key(u, salt_name), passphrase_name)
        update_credential_manager(target, u, encrypted_password)

    print('user added')


def install_pool_users(application, setting, admin_user='', admin_pwd=''):
    passwords_url = os.path.join(os.getcwd(), 'pwd.json')
    if os.path.exists(passwords_url) is False:
        print('path does not exists: ' + passwords_url)
        return

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

    passphrase_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_PASSPHRASE_NAME
    salt_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_SALT_NAME
    for idx, u in enumerate(setting['pool']['users']):
        target = setting['camNamespace'] + '/' + u
        password = encrypt(p['passwords'][idx], get_salt_for_key(u, salt_name), passphrase_name)
        update_credential_manager(target, u, password)
        if admin_user != '':
            create_in_tm1(setting, admin_user, admin_pwd, u, p['passwords'][idx])

    print('users added')


def create_in_tm1(setting, admin_user, admin_pwd, user, pwd):
    url = setting[
              'tm1ApiHost'] + "/api/v1/Processes('zSYS Analogic Create Pool User')/tm1.ExecuteWithReturn"
    body = '{"Parameters": [{"Name": "pUserID", "Value": "' + user + '"},{"Name": "pPassword", "Value": "' + pwd + '"}]}'
    headers = {'Content-Type': 'application/json; charset=utf-8',
               'Accept-Encoding': 'gzip, deflate, br'}
    response = requests.request(
        url=url,
        method='POST',
        data=body,
        headers=headers,
        verify=False,
        auth=(admin_user, admin_pwd))

    print(response.text)
    print(response.status_code)


def install_smtp_user(application, setting):
    if 'smtp' not in setting:
        print('The "smtp" key does not exists in the setting!')
        return

    pwd_url = os.path.join(os.getcwd(), 'smtp_pwd.txt')

    if os.path.exists(pwd_url) is False:
        print('Path does not exists: ' + pwd_url)
        return

    pwd = open(pwd_url, 'r').read()

    if not pwd:
        print('Please set password for the SMTP user!')
        return

    passphrase_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_PASSPHRASE_NAME
    salt_name = application + '_' + PoolSettingManager.FRAMEWORK_SSO_SALT_NAME

    user_name = setting['smtp']['sender_email']
    target = setting['camNamespace'] + '/' + user_name
    password = encrypt(pwd, get_salt_for_key(user_name, salt_name), passphrase_name)
    update_credential_manager(target, user_name, password)

    print('SMTP user added')
