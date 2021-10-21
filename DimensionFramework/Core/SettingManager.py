import datetime
import yaml
import os
import keyring
import base64
from flask import json
import logging
from DimensionFramework.Core.SqlitePoolUserManager import SqlitePoolUserManager


class SettingManager:
    CONFIG = 'dimension_framework_config'
    REPOSITORY = 'dimension_framework_repository'
    CLASSES = 'dimension_framework_classes'
    TM1SessionId = 'dimension_framework_tm1_session_id'
    TM1SessionExpires = 'dimension_framework_tm1_session_expires'
    FRAMEWORK_MDX = 'dimension_framework_mdx'

    def __init__(self, cache, site_root, instance='default'):
        self.cache = cache
        self.site_root = site_root
        self.instance = instance
        cnf = self.getConfig()
        self.poolUserManager = SqlitePoolUserManager(cnf['pool']['users'], instance)

    def clearCache(self):
        if self.cache is not None:
            self.cache.delete(self.getConfigCacheKey())
            self.cache.delete(self.getRepositoryCacheKey())
            self.cache.delete(self.getTm1SessionIdCacheKey())
            self.cache.delete(self.getTM1SessionExpiresCacheKey())
            self.cache.delete(self.getClassesCacheKey())
            self.cache.delete(self.getFrameworkMdxCacheKey())
            self.poolUserManager.clear()
        return "OK"

    def getInstance(self):
        return self.instance

    def getConfigCacheKey(self):
        return self.getInstanceCacheKey(self.CONFIG)

    def getRepositoryCacheKey(self):
        return self.getMiddlewareConfig() + '_' + self.REPOSITORY

    def getTm1SessionIdCacheKey(self):
        return self.getInstanceCacheKey(self.TM1SessionId)

    def getTM1SessionExpiresCacheKey(self):
        return self.getInstanceCacheKey(self.TM1SessionExpires)

    def getClassesCacheKey(self):
        return self.getInstanceCacheKey(self.CLASSES)

    def getFrameworkMdxCacheKey(self):
        return self.getInstanceCacheKey(self.FRAMEWORK_MDX)

    def getInstanceCacheKey(self, key):
        return self.getInstance() + '_' + key

    def getConfig(self):
        cnf = self.getJsonSetting(self.getConfigCacheKey(), 'config')
        cnf['devAuthLogin'] = ''
        return cnf

    def getParam(self, param_name):
        cnf = self.getConfig()
        return cnf[param_name]

    def getBaseUrl(self, route=''):
        cnf = self.getConfig()
        if self.instance == 'default':
            return os.path.join(cnf['host'], cnf['subpath'], route)
        return os.path.join(cnf['host'], cnf['subpath'], self.instance, route)

    def getRepository(self):
        return self.getYamlSetting(self.getRepositoryCacheKey(), 'repository', False,
                                   os.path.join('configs', self.getMiddlewareConfig()))

    def getMDX(self, key):
        repository = self.getRepository()
        mdx = repository[key]
        return mdx

    def getJsonSetting(self, key, file_name, by_instance=True, folder='applications'):
        setting = self.cacheGet(key)
        if setting is None:
            file_path = file_name
            if by_instance:
                file_path = os.path.join(self.instance, file_name)
            json_url = os.path.join(self.site_root, folder, file_path + '.json')
            setting = json.load(open(json_url), encoding="utf-8")
            setting['instance'] = self.instance
            self.cacheSet(key, setting, 0)
        return setting

    def getYamlSetting(self, key, file_name, by_instance=True, folder='applications'):
        setting = self.cacheGet(key)
        if setting is None:
            file_path = file_name
            if by_instance:
                file_path = os.path.join(self.instance, file_name)
            with open(os.path.join(self.site_root, folder, file_path + '.yml'), encoding="utf-8") as file:
                setting = yaml.load(file, Loader=yaml.FullLoader)
                self.cacheSet(key, setting, 0)
        return setting

    def getFrameworkMdx(self, key):
        mdx = self.getYamlSetting(self.getFrameworkMdxCacheKey(), 'mdx', False, 'global')
        return mdx[key]

    def getCustomObjectDescription(self, key):
        classes = self.getJsonSetting(self.getClassesCacheKey(), 'custom_objects', False,
                                      os.path.join('configs', self.getMiddlewareConfig()))
        return classes[key]

    def setTM1SessionId(self, tm1_session_id, suffix=''):
        cnf = self.getConfig()
        self.cacheSet(self.getTm1SessionIdCacheKey() + suffix, tm1_session_id, 0)
        expires = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
        self.cacheSet(self.getTM1SessionExpiresCacheKey() + suffix, expires, 0)

    def getTM1SessionId(self, suffix=''):
        self.getLogger().info(self.getTm1SessionIdCacheKey() + suffix)
        tm1_session_id = self.cacheGet(self.getTm1SessionIdCacheKey() + suffix)
        self.getLogger().info(tm1_session_id)
        tm1_session_id_exp = self.cacheGet(self.getTM1SessionExpiresCacheKey() + suffix)
        self.getLogger().info(tm1_session_id_exp)
        if tm1_session_id is None or (
                tm1_session_id_exp is not None and datetime.datetime.now() >= tm1_session_id_exp):
            return None
        return tm1_session_id

    def getPassword(self, user_name):
        return keyring.get_password(self.getAppCamNamespace() + '/' + user_name, user_name)

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

    def getPoolTargetUrl(self):
        cnf = self.getConfig()
        return cnf['pool']['target']

    def getAppCamNamespace(self):
        cnf = self.getConfig()
        return cnf['camNamespace']

    def getMiddlewareConfig(self):
        cnf = self.getConfig()
        return cnf['applicationConfigFolder']

    def getPoolCamNamespace(self, user):
        password = self.getPassword(user)
        namespace = self.getAppCamNamespace()
        s = user + ":" + password + ":" + namespace
        return 'CAMNamespace ' + base64.b64encode(s.encode('utf-8')).decode("utf-8")

    def getSsoCamNamespace(self):
        cnf = self.getConfig()
        password = keyring.get_password(cnf['sso']['adminNamespace'] + '/' + cnf['sso']['admin'], cnf['sso']['admin'])
        s = cnf['sso']['admin'] + ":" + password + ":" + cnf['sso']['adminNamespace']
        return 'CAMNamespace ' + base64.b64encode(s.encode('utf-8')).decode("utf-8")

    def cacheGet(self, key):
        if self.cache is not None:
            return self.cache.get(key)
        return None

    def cacheSet(self, key, value, expires=0):
        if self.cache is not None:
            self.cache.set(key, value, expires)

    def getLogger(self):
        return logging.getLogger(__name__)
