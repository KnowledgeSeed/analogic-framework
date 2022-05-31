from analogic import SettingManager
from analogic_pool import SqlitePoolUserManager
import datetime
import os
import keyring
import base64
from pbkdf2 import PBKDF2
from Crypto.Cipher import AES

PASSPHRASE_SIZE = 64
KEY_SIZE = 32
BLOCK_SIZE = 16
IV_SIZE = 16
SALT_SIZE = 8


def get_salt_for_key(key, salt_name):
    salt_seed = keyring.get_password(salt_name, salt_name)
    return PBKDF2(key, salt_seed).read(SALT_SIZE)


def encrypt(plaintext, salt, passphrase_name):
    passphrase = keyring.get_password(passphrase_name, passphrase_name)

    init_vector = os.urandom(IV_SIZE)

    key = PBKDF2(passphrase, salt).read(KEY_SIZE)

    cipher = AES.new(key, AES.MODE_CBC, init_vector)

    text = plaintext + ' ' * (BLOCK_SIZE - (len(plaintext) % BLOCK_SIZE))

    return (init_vector + cipher.encrypt(text.encode('utf8'))).decode('latin-1')


def decrypt(ciphertext, salt, passphrase_name):
    passphrase = keyring.get_password(passphrase_name, passphrase_name)

    key = PBKDF2(passphrase, salt).read(KEY_SIZE)

    init_vector = ciphertext[:IV_SIZE]
    ciphertext = ciphertext[IV_SIZE:]

    cipher = AES.new(key, AES.MODE_CBC,
                     init_vector)

    return str(cipher.decrypt(ciphertext), 'utf-8').rstrip(' ')


class PoolSettingManager(SettingManager):
    FRAMEWORK_SSO_KEY_NAME = 'dimension_framework_key'
    FRAMEWORK_SSO_PASSPHRASE_NAME = 'dimension_framework_passphrase'
    FRAMEWORK_SSO_SALT_NAME = 'dimension_framework_salt'

    def __init__(self, setting):
        super().__init__(setting.cache, setting.site_root, setting.instance)
        cnf = self.get_config()
        if 'Pool' in cnf['authenticationMode']:
            self.poolUserManager = SqlitePoolUserManager(cnf['pool']['users'], setting.site_root, setting.instance)

    def clear_cache(self):
        super().clear_cache()
        authentication_mode = self._get_param('authenticationMode')
        if 'Pool' in authentication_mode:
            self.poolUserManager.clear()
            self.poolUserManager.create_database()
        return "OK"

    def get_framework_sso_key(self):
        u = self.get_framework_sso_key_name()
        return keyring.get_password(u, u)

    def get_framework_sso_key_name(self):
        return self.get_instance() + '_' + self.FRAMEWORK_SSO_KEY_NAME

    def get_framework_sso_pass_phrase_name(self):
        return self.get_instance() + '_' + self.FRAMEWORK_SSO_PASSPHRASE_NAME

    def get_framework_sso_salt_name(self):
        return self.get_instance() + '_' + self.FRAMEWORK_SSO_SALT_NAME

    def get_smtp_password(self):
        cnf = self.get_config()
        if 'password' in cnf['smtp']:
            return cnf['smtp']['password']
        else:
            return self.get_password(cnf['smtp']['sender_email'])

    def get_password(self, user_name, namespace=''):
        n = namespace
        if n == '':
            n = self.get_app_cam_namespace()
        return decrypt(keyring.get_password(n + '/' + user_name, user_name).encode('latin_1'),
                       get_salt_for_key(user_name, self.get_framework_sso_salt_name()),
                       self.get_framework_sso_pass_phrase_name())

    def get_pool_user(self):
        pool_user = self.poolUserManager.get_user()
        expired = pool_user['expiration'] == ''
        if expired is False:
            expired = datetime.datetime.now() >= datetime.datetime.fromisoformat(pool_user['expiration'])

        if expired:
            pool_user['expiration'] = ''
            pool_user['session'] = ''
        self.getLogger().info('Get pool user: ' + str(pool_user))
        return pool_user

    def update_pool_user(self, pool_user):
        cnf = self.get_config()
        expiration = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
        pool_user['expiration'] = expiration
        self.getLogger().info('Update pool user: ' + str(pool_user))
        self.poolUserManager.update_user_session(pool_user)

    def decrease_pool_user_session_count(self, pool_user):
        self.poolUserManager.decrease_session_count(pool_user)
        self.getLogger().info('Decrease pool user session count: ' + str(pool_user))

    def get_pool_cam_namespace(self, user):
        password = self.get_password(user)
        namespace = self.get_app_cam_namespace()
        s = user + ":" + password + ":" + namespace
        return 'CAMNamespace ' + base64.b64encode(s.encode('utf-8')).decode("utf-8")

    def get_sso_cam_namespace(self):
        cnf = self.get_config()
        password = keyring.get_password(cnf['sso']['adminNamespace'] + '/' + cnf['sso']['admin'], cnf['sso']['admin'])
        password = decrypt(password.encode('latin_1'),
                           get_salt_for_key(cnf['sso']['admin'], self.get_framework_sso_salt_name()),
                           self.get_framework_sso_pass_phrase_name())
        s = cnf['sso']['admin'] + ":" + password + ":" + cnf['sso']['adminNamespace']
        return 'CAMNamespace ' + base64.b64encode(s.encode('utf-8')).decode("utf-8")
