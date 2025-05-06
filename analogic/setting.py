import yaml
import os
from flask import json, current_app, url_for, request, render_template, has_request_context
import logging
import uuid
import sys
import importlib
import hashlib
from jproperties import Properties
from cryptography.fernet import Fernet


def get_properties_file_value(path, key):
    configs = Properties()

    logger = logging.getLogger(__name__)

    if path is None:
        logger.info('Secret property path is none')
        raise Exception('Secret property file not found')

    if os.path.exists(path) is False:
        logger.info(f'Secret property file not found in {path} in {os.getcwd()}')
        checked_path = os.path.join(current_app.instance_path, path)
        if os.path.exists(checked_path) is False:
            logger.info(f'Secret property file not found in {checked_path} in {current_app.instance_path}')
            raise Exception('Secret property file not found')
    else:
        checked_path = path

    with open(checked_path, 'rb') as config_file:

        configs.load(config_file)

        return configs.get(key).data


def hash_password(password, salt):
    password_hash = hashlib.sha512((password + salt).encode()).hexdigest()
    return password_hash


class SettingManager:
    ENABLE_REQUEST_LOGGER_PARAMETER_NAME = 'enableRequestLogger'
    ENABLE_WRITE_REQUEST_LOGGER_PARAMETER_NAME = 'enableWriteRequestLogger'
    ENABLE_TOOL_TIPS_PARAMETER_NAME = 'enableToolTips'
    AUTHENTICATION_FAILED_MESSAGE_PARAMETER_NAME = 'authenticationFailedMessage'
    SECRET_PROPERTIES_PATH = '_secretPropertiesPath'
    CUSTOM_LOGIN_HTML_PARAMETER_NAME = '_customLoginHtml'
    UPLOAD_ADMIN_PERMISSIONS = '_uploadAdminPermissions'
    UPLOAD_ADMIN_USERS = '_uploadAdminUsers'
    NAMED_ROUTES = '_namedRoutes'

    def __init__(self, analogic_application_path, instance='default'):
        self.site_root = analogic_application_path
        self.instance = instance
        self.config_js_name = self.get_config_js_name()
        self.config = self._create_config()
        self.repository = self._create_repository()
        self.custom_objects = self._create_custom_objects()
        self._logger = logging.getLogger(self.get_instance())
        self.tm1_services = {}

    def initialize(self):
        pass

    def clear_cache(self):
        self.repository = self._create_repository()
        self.custom_objects = self._create_custom_objects()
        self.config = None
        self.config = self._create_config()
        self.save_config_js()
        self.reload_custom_objects()
        return "OK"

    def reload_custom_objects(self):
        namespaces = set(map(lambda o: self.custom_objects[o].get('namespace'), self.custom_objects))
        for namespace in namespaces:
            if namespace is not None:
                try:
                    importlib.reload(sys.modules[namespace])
                except Exception as e:
                    self._logger.error(e)

    def get_instance(self):
        return self.instance

    def _create_config(self):
        return self._get_json_setting('app')

    def get_config(self):
        if not os.path.exists(os.path.join(self.site_root, 'static', 'assets', 'js', self.config_js_name)):
            self.save_config_js()

        if self.config is not None:
            return self.config
        self.config = self._get_json_setting('app')
        self.save_config_js()
        return self.config

    def _get_param(self, param_name):
        return self.config[param_name]

    def get_base_url(self, route=''):
        if has_request_context():
            base = url_for('core_endpoints.index')
            url = request.environ.get('wsgi.url_scheme') + '://' + request.environ.get('HTTP_HOST')
            sub_path = [base[:-1], self.instance, route]
            return url + ('/'.join(filter(lambda x: x != 'default' and x is not None, sub_path)))
        else:
            ''

    def _create_repository(self):
        return self._get_yaml_setting(os.path.join('server', 'configs', 'repository'))

    def _get_repository(self):
        if self.repository is not None:
            return self.repository
        return self._get_yaml_setting(os.path.join('server', 'configs', 'repository'))

    def get_mdx(self, key):
        repository = self._get_repository()
        if repository is None:
            return None
        mdx = repository.get(key)
        return mdx

    def _get_json_setting(self, file_name):

        json_url = os.path.join(self.site_root, file_name + '.json')
        with open(json_url, encoding="utf-8") as f:
            setting = json.load(f)

        if file_name == 'app':
            return self.get_app_setting(setting)

        return setting

    def get_app_setting(self, setting):
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

        return setting

    def save_config_js(self, exclude=[]):
        js_url = os.path.join(self.site_root, 'static', 'assets', 'js', self.config_js_name)
        if has_request_context():
            with open(js_url, 'w', encoding="utf-8") as f:
                f.write(render_template('config.html', cnf=self.config, exclude=exclude))

    def _get_yaml_setting(self, file_path):
        with open(os.path.join(self.site_root, file_path + '.yml'), encoding="utf-8") as file:
            setting = yaml.safe_load(file)
        return setting

    def _create_custom_objects(self):
        return self._get_json_setting(os.path.join('server', 'configs', 'custom_objects'))

    def get_custom_object_description(self, key):
        if self.custom_objects is None:
            self.custom_objects = self._create_custom_objects()
        return self.custom_objects.get(key)

    def set_tm1_service(self, user_name, tm1_service):
        self.tm1_services[user_name] = tm1_service

    def get_tm1_service(self, user_name):
        return self.tm1_services.get(user_name)

    def get_proxy_target_url(self):
        return self.config['proxy']['target']

    def get_app_cam_namespace(self):
        return self.config.get('camNamespace')

    def get_smtp_password(self):
        return self.config['smtp'].get('password')

    def get_ssl_verify(self):
        return self.config['ssl_verify']

    def get_config_js_name(self):
        return 'config.js'

    def get_name(self):
        return ''

    def get_instance_and_name(self):
        return self.get_instance() + '_' + self.get_name()

    def get_check_access_repository_yml_suffix(self):
        return '_analogic_check_access'

    def get_permission_query_repository_yml_key(self):
        return 'analogic_permissions'

    def get_permission_session_name(self):
        return self.get_instance() + '_analogic_permissions'

    def is_request_logger_enabled(self):
        return self.get_config().get(self.ENABLE_REQUEST_LOGGER_PARAMETER_NAME, False)

    def is_write_request_logger_enabled(self):
        return self.get_config().get(self.ENABLE_WRITE_REQUEST_LOGGER_PARAMETER_NAME, False)

    def get_authentication_failed_message(self):
        return self.get_config().get(self.AUTHENTICATION_FAILED_MESSAGE_PARAMETER_NAME, 'Authentication failed')

    def getLogger(self):
        return self._logger

    def encrypt_secret(self, secret, fernet_key):
        f = Fernet(fernet_key.encode('utf-8'))
        return f.encrypt(secret.encode('utf-8')).decode('latin-1')

    def decrypt_password(self, secret, fernet_key):
        f = Fernet(fernet_key.encode('utf-8'))
        return f.decrypt(secret.encode('latin-1')).decode('utf-8')

    def get_plain_text_secret(self, key, **kwargs):

        fernet_key_prop_key = kwargs.get('fernet_key_prop_key')
        fernet_key_env_prop_key = kwargs.get('fernet_key_env_prop_key')
        env_key = kwargs.get('env_key')

        secret = self.get_extended_property_value(key, env_key=env_key)

        if secret is None:
            return None

        fernet_key = self.get_extended_property_value(fernet_key_prop_key, env_key=fernet_key_env_prop_key)

        if fernet_key is not None:
            return self.decrypt_password(secret, fernet_key)

        return secret

    def get_login_html(self):
        return self.get_extended_property_value(self.CUSTOM_LOGIN_HTML_PARAMETER_NAME, default_value="login.html")

    def _get_secret_properties_path(self):
        return self.get_config().get(self.SECRET_PROPERTIES_PATH)

    def get_extended_property_value(self, key, **kwargs):
        env_key = kwargs.get('env_key')
        default_value = kwargs.get('default_value')

        try:
            config = self.get_config()
            if key in config:
                return config[key]
            return self.get_property_value(key)
        except Exception as e:
            self._logger.info(f'Property value not found for {key}: {e}')
            value = os.getenv(env_key if env_key else key)
            return value if value is not None else default_value

    def get_property_value(self, key):

        path = self._get_secret_properties_path()

        return get_properties_file_value(path, key)

    def get_upload_admin_permissions(self):
        return self.get_extended_property_value(self.UPLOAD_ADMIN_PERMISSIONS, default_value=['ADMIN'])

    def get_upload_admin_users(self):
        return self.get_extended_property_value(self.UPLOAD_ADMIN_USERS, default_value=[])

    def get_named_routes(self):
        return self.get_extended_property_value(self.NAMED_ROUTES, default_value=[])
