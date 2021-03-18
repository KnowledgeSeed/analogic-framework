import datetime
import yaml
import os
import keyring
import base64
from flask import json


class SettingManager:
    CONFIG = 'knowledge_seed_config'
    REPOSITORY = 'knowledge_seed_repository'
    CLASSES = 'knowledge_seed_classes'
    TM1SessionId = 'tm1_session_id'
    TM1SessionExpires = 'tm1_session_expires'
    FRAMEWORK_MDX = 'knowledge_seed_framework_mdx'

    def __init__(self, cache, site_root):
        self.cache = cache
        self.site_root = site_root

    def clearCache(self):
        self.cache.delete(self.CONFIG)
        self.cache.delete(self.REPOSITORY)
        self.cache.delete(self.TM1SessionId)
        self.cache.delete(self.TM1SessionExpires)
        self.cache.delete(self.CLASSES)
        self.cache.delete(self.FRAMEWORK_MDX)
        return "OK"

    def getConfig(self):
        cnf = self.getJsonSetting(self.CONFIG, 'config')
        if cnf['authenticationMode'] == 'NoAuth':
            cnf['noAuthLogin'] = self.getPoolCamNamespace()
        else:
            cnf['noAuthLogin'] = ''
        return cnf

    def getParam(self, param_name):
        cnf = self.getConfig()
        return cnf[param_name]

    def getBaseUrl(self, route=''):
        cnf = self.getConfig()
        return cnf['host'] + cnf['subpath'] + '/' + route

    def getRepositoryOld(self):
        return self.getJsonSetting(self.REPOSITORY, 'repository')

    def getRepository(self):
        return self.getYamlSetting(self.REPOSITORY, 'repository')

    def getMDX(self, key):
        repository = self.getRepository()
        mdx = repository[key]
        return mdx

    def getJsonSetting(self, key, file_name):
        setting = self.cache.get(key)
        if setting is None:
            json_url = os.path.join(self.site_root, 'settings', file_name + '.json')
            setting = json.load(open(json_url))
            self.cache.set(key, setting, 0)
        return setting

    def getYamlSetting(self, key, file_name):
        setting = self.cache.get(key)
        if setting is None:
            with open(os.path.join(self.site_root, 'settings', file_name + '.yml')) as file:
                setting = yaml.load(file, Loader=yaml.FullLoader)
                self.cache.set(key, setting, 0)
        return setting

    def getFrameworkMdx(self, key):
        mdx = self.getYamlSetting(self.FRAMEWORK_MDX, 'framework_mdx')
        return mdx[key]

    def getClassDescription(self, key):
        classes = self.getJsonSetting(self.CLASSES, 'classes')
        return classes[key]

    def setTM1SessionId(self, tm1_session_id):
        cnf = self.getConfig()
        self.cache.set(self.TM1SessionId, tm1_session_id, 0)
        expires = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
        self.cache.set(self.TM1SessionExpires, expires, 0)

    def getTM1SessionId(self):
        if self.cache.get(self.TM1SessionId) is None or (
                self.cache.get(self.TM1SessionExpires) is not None and datetime.datetime.now() >= self.cache.get(
                self.TM1SessionExpires)):
            return None
        return self.cache.get(self.TM1SessionId)

    def getPassword(self):
        return keyring.get_password(self.getAppCamNamespace(), self.getPoolUser())

    def getPoolUser(self):
        cnf = self.getConfig()
        return cnf['pool']['users'][0]

    def getPoolTargetUrl(self):
        cnf = self.getConfig()
        return cnf['pool']['target']

    def getAppCamNamespace(self):
        cnf = self.getConfig()
        return cnf['camNamespace']

    def getPoolCamNamespace(self):
        password = self.getPassword()
        user = self.getPoolUser()
        namespace = self.getAppCamNamespace()
        return 'CAMNamespace ' + base64.b64decode(user + ":" + password + ":" + namespace)
