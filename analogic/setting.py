import datetime
import yaml
import os
from flask import json, request, current_app
import logging
from urllib.parse import urlparse


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

    def clear_cache(self):
        if self.cache is not None:
            self.cache.delete(self._get_config_cache_key())
            self.cache.delete(self._get_repository_cache_key())
            self.cache.delete(self._get_tm1_session_id_cache_key())
            self.cache.delete(self._get_tm1_session_expires_cache_key())
            self.cache.delete(self._get_classes_cache_key())
            self.cache.delete(self._get_framework_mdx_cache_key())
        return "OK"

    def get_instance(self):
        return self.instance

    def _get_config_cache_key(self):
        return self._get_instance_cache_key(self.CONFIG)

    def _get_repository_cache_key(self):
        return self.get_instance() + '_' + self.REPOSITORY

    def _get_tm1_session_id_cache_key(self):
        return self._get_instance_cache_key(self.TM1SessionId)

    def _get_tm1_session_expires_cache_key(self):
        return self._get_instance_cache_key(self.TM1SessionExpires)

    def _get_classes_cache_key(self):
        return self._get_instance_cache_key(self.CLASSES)

    def _get_framework_mdx_cache_key(self):
        return self._get_instance_cache_key(self.FRAMEWORK_MDX)

    def _get_instance_cache_key(self, key):
        return self.get_instance() + '_' + key

    def get_config(self):
        cnf = self._get_json_setting(self._get_config_cache_key(), 'application_settings')
        return cnf

    def _get_param(self, param_name):
        cnf = self.get_config()
        return cnf[param_name]

    def get_base_url(self, route=''):
        cnf = self.get_config()
        if self.instance == 'default':
            return os.path.join(cnf['hostname'], cnf['reverseProxyPath'], route)
        return os.path.join(cnf['hostname'], cnf['reverseProxyPath'], self.instance, route)

    def _get_repository(self):
        return self._get_yaml_setting(self._get_repository_cache_key(), 'repository', False,
                                      os.path.join('applications', self.get_instance(), 'server', 'configs'))

    def get_mdx(self, key):
        repository = self._get_repository()
        mdx = repository[key]
        return mdx

    def _get_json_setting(self, key, file_name, by_instance=True, folder='applications'):
        setting = self._cache_get(key)
        if setting is None:
            file_path = file_name
            if by_instance:
                file_path = os.path.join(self.instance, file_name)
            json_url = os.path.join(self.site_root, folder, file_path + '.json')
            setting = json.load(open(json_url), encoding="utf-8")

            if file_name == 'application_settings':
                setting['instance'] = self.instance
                setting['blueprint_static'] = self.instance + '.static'
                setting['hostname'] = self.get_host_name_url()
                setting['reverseProxyPath'] = current_app.get_reverse_proxy_path()
                setting['extension_css_asset_names'] = current_app.get_extension_css_asset_names()
                setting['extension_js_asset_names'] = current_app.get_extension_js_asset_names()

            self._cache_set(key, setting, 0)
        return setting

    def get_host_name_url(self):
        o = urlparse(request.base_url)
        if current_app.get_reverse_proxy_path() != '':
            return o.scheme + '://' + o.hostname + '/'
        return o.scheme + '://' + o.netloc + '/'

    def _get_yaml_setting(self, key, file_name, by_instance=True, folder='applications'):
        setting = self._cache_get(key)
        if setting is None:
            file_path = file_name
            if by_instance:
                file_path = os.path.join(self.instance, file_name)
            with open(os.path.join(self.site_root, folder, file_path + '.yml'), encoding="utf-8") as file:
                setting = yaml.load(file, Loader=yaml.FullLoader)
                self._cache_set(key, setting, 0)
        return setting

    def get_framework_mdx(self, key):
        mdx = self._get_yaml_setting(self._get_framework_mdx_cache_key(), 'mdx', False, 'global')
        return mdx[key]

    def get_custom_object_description(self, key):
        classes = self._get_json_setting(self._get_classes_cache_key(), 'custom_objects', False,
                                         os.path.join('applications', self.get_instance(), 'server', 'configs'))
        return classes[key]

    def set_tm1_session_id(self, tm1_session_id, suffix=''):
        cnf = self.get_config()
        self._cache_set(self._get_tm1_session_id_cache_key() + suffix, tm1_session_id, 0)
        expires = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
        self._cache_set(self._get_tm1_session_expires_cache_key() + suffix, expires, 0)

    def get_tm1_session_id(self, suffix=''):
        logger = self.getLogger()
        logger.info(self._get_tm1_session_id_cache_key() + suffix)
        tm1_session_id = self._cache_get(self._get_tm1_session_id_cache_key() + suffix)
        logger.info(tm1_session_id)
        tm1_session_id_exp = self._cache_get(self._get_tm1_session_expires_cache_key() + suffix)
        logger.info(tm1_session_id_exp)
        if tm1_session_id is None or (
                tm1_session_id_exp is not None and datetime.datetime.now() >= tm1_session_id_exp):
            return None
        return tm1_session_id

    def get_pool_target_url(self):
        cnf = self.get_config()
        return cnf['pool']['target']

    def get_app_cam_namespace(self):
        cnf = self.get_config()
        return cnf['camNamespace']

    def _cache_get(self, key):
        if self.cache is not None:
            return self.cache.get(key)
        return None

    def _cache_set(self, key, value, expires=0):
        if self.cache is not None:
            self.cache.set(key, value, expires)

    def getLogger(self):
        return logging.getLogger(self.get_instance())
