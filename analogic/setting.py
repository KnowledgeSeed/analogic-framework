import datetime
import yaml
import os
from flask import json, current_app, url_for, request, render_template
import logging
import uuid


class SettingManager:
    CONFIG = 'dimension_framework_config'
    REPOSITORY = 'dimension_framework_repository'
    CLASSES = 'dimension_framework_classes'
    TM1SessionId = 'dimension_framework_tm1_session_id'
    TM1SessionExpires = 'dimension_framework_tm1_session_expires'

    def __init__(self, cache, analogic_application_path, instance='default'):
        self.cache = cache
        self.site_root = analogic_application_path
        self.instance = instance

    def clear_cache(self):
        if self.cache is not None:
            self.cache.delete(self._get_config_cache_key())
            self.cache.delete(self._get_repository_cache_key())
            self.cache.delete(self._get_tm1_session_id_cache_key())
            self.cache.delete(self._get_tm1_session_expires_cache_key())
            self.cache.delete(self._get_classes_cache_key())
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

    def _get_instance_cache_key(self, key):
        return self.get_instance() + '_' + key

    def get_config(self):
        cnf = self._get_json_setting(self._get_config_cache_key(), 'app')
        return cnf

    def _get_param(self, param_name):
        cnf = self.get_config()
        return cnf[param_name]

    def get_base_url(self, route=''):
        base = url_for('core_endpoints.index')
        url = request.environ.get('wsgi.url_scheme') + '://' + request.environ.get('HTTP_HOST')
        sub_path = [base[:-1], self.instance, route]
        return url + ('/'.join(filter(lambda x : x != 'default' and x is not None, sub_path)))

    def _get_repository(self):
        return self._get_yaml_setting(self._get_repository_cache_key(), os.path.join('server', 'configs', 'repository'))

    def get_mdx(self, key):
        repository = self._get_repository()
        mdx = repository[key]
        return mdx

    def _get_json_setting(self, key, file_name):
        setting = self._cache_get(key)
        if setting is None:
            json_url = os.path.join(self.site_root, file_name + '.json')
            with open(json_url, encoding="utf-8") as f:
                setting = json.load(f)

            if file_name == 'app':
                setting['instance'] = self.instance
                setting['blueprint_static'] = self.instance + '.static'
                setting['extension_css_asset_names'] = current_app.get_extension_css_asset_names()
                setting['extension_js_asset_names'] = current_app.get_extension_js_asset_names()
                setting['version'] = uuid.uuid4().hex[:6].upper()

                if setting.get('apiSubPath') is None:
                    setting['apiSubPath'] = '/api/v1/'

                if setting.get('authenticationBridge') is None:
                    setting['authenticationBridge'] = ''

                if setting.get('sessionExpiresInMinutes') is None:
                    setting['sessionExpiresInMinutes'] = 20

                if setting.get('useMinifiedAssets') is None:
                    setting['useMinifiedAssets'] = False

                if setting.get('ssl_verify') is None:
                    setting['ssl_verify'] = True

                self.save_config_js(setting)

            self._cache_set(key, setting, 0)
        return setting

    def save_config_js(self, config):
        js_url = os.path.join(self.site_root, 'static', 'assets', 'js', 'config.js')
        with open(js_url, 'w', encoding="utf-8") as f:
            f.write(render_template('config.html', cnf=config))

    def _get_yaml_setting(self, key, file_path):
        setting = self._cache_get(key)
        if setting is None:
            with open(os.path.join(self.site_root, file_path + '.yml'), encoding="utf-8") as file:
                setting = yaml.safe_load(file)
                self._cache_set(key, setting, 0)
        return setting

    def get_custom_object_description(self, key):
        classes = self._get_json_setting(self._get_classes_cache_key(), os.path.join('server', 'configs', 'custom_objects'))
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

    def get_proxy_target_url(self):
        cnf = self.get_config()
        return cnf['proxy']['target']

    def get_app_cam_namespace(self):
        cnf = self.get_config()
        return cnf['camNamespace']

    def get_smtp_password(self):
        cnf = self.get_config()
        return cnf['smtp']['password']

    def get_ssl_verify(self):
        cnf = self.get_config()
        return cnf['ssl_verify']

    def _cache_get(self, key):
        if self.cache is not None:
            return self.cache.get(key)
        return None

    def _cache_set(self, key, value, expires=0):
        if self.cache is not None:
            self.cache.set(key, value, expires)

    def getLogger(self):
        return logging.getLogger(self.get_instance())
