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


def getSaltForKey(key, salt_name):
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
        cnf = self.getConfig()
        if 'Pool' in cnf['authenticationMode']:
            self.poolUserManager = SqlitePoolUserManager(cnf['pool']['users'], setting.site_root, setting.instance)

    def clearCache(self):
        super().clearCache()
        authentication_mode = self.getParam('authenticationMode')
        if 'Pool' in authentication_mode:
            self.poolUserManager.clear()
            self.poolUserManager.createDatabase()
        return "OK"

    def getFrameworkSSOKey(self):
        u = self.getFrameworkSSOKeyName()
        return keyring.get_password(u, u)

    def getFrameworkSSOKeyName(self):
        return self.getInstance() + '_' + self.FRAMEWORK_SSO_KEY_NAME

    def getFrameworkSSOPassPhraseName(self):
        return self.getInstance() + '_' + self.FRAMEWORK_SSO_PASSPHRASE_NAME

    def getFrameworkSSOSaltName(self):
        return self.getInstance() + '_' + self.FRAMEWORK_SSO_SALT_NAME

    def getPassword(self, user_name, namespace=''):
        n = namespace
        if n == '':
            n = self.getAppCamNamespace()
        return decrypt(keyring.get_password(n + '/' + user_name, user_name).encode('latin_1'),
                       getSaltForKey(user_name, self.getFrameworkSSOSaltName()), self.getFrameworkSSOPassPhraseName())

    def getPoolUser(self):
        pool_user = self.poolUserManager.getUser()
        expired = pool_user['expiration'] == ''
        if expired is False:
            expired = datetime.datetime.now() >= datetime.datetime.fromisoformat(pool_user['expiration'])

        if expired:
            pool_user['expiration'] = ''
            pool_user['session'] = ''
        self.getLogger().info('Get pool user: ' + str(pool_user))
        return pool_user

    def updatePoolUser(self, pool_user):
        cnf = self.getConfig()
        expiration = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
        pool_user['expiration'] = expiration
        self.getLogger().info('Update pool user: ' + str(pool_user))
        self.poolUserManager.updateUserSession(pool_user)

    def decreasePoolUserSessionCount(self, pool_user):
        self.poolUserManager.decreaseSessionCount(pool_user)
        self.getLogger().info('Decrease pool user session count: ' + str(pool_user))

    def getPoolCamNamespace(self, user):
        password = self.getPassword(user)
        namespace = self.getAppCamNamespace()
        s = user + ":" + password + ":" + namespace
        return 'CAMNamespace ' + base64.b64encode(s.encode('utf-8')).decode("utf-8")

    def getSsoCamNamespace(self):
        cnf = self.getConfig()
        password = keyring.get_password(cnf['sso']['adminNamespace'] + '/' + cnf['sso']['admin'], cnf['sso']['admin'])
        password = decrypt(password.encode('latin_1'),
                           getSaltForKey(cnf['sso']['admin'], self.getFrameworkSSOSaltName()),
                           self.getFrameworkSSOPassPhraseName())
        s = cnf['sso']['admin'] + ":" + password + ":" + cnf['sso']['adminNamespace']
        return 'CAMNamespace ' + base64.b64encode(s.encode('utf-8')).decode("utf-8")
