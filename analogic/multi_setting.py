from analogic.setting import SettingManager
from flask import url_for, current_app, request
import uuid


class MultiSettingManager(SettingManager):
    AUTHENTICATION_PROVIDERS_APP_KEY_NAME = '_authenticationProviders'
    PRIMARY_AUTHENTICATION_PROVIDER_NAME = 'primary'

    def __init__(self, analogic_application_path, instance='default', name=''):
        self.name = name
        super().__init__(analogic_application_path, instance)

    def get_app_setting(self, setting):
        if self.name == '':
            return super().get_app_setting(setting)

        setting['instance'] = self.instance
        setting['blueprint_static'] = self.instance + '.static'
        setting['extension_css_asset_names'] = current_app.get_extension_css_asset_names()
        setting['extension_js_asset_names'] = current_app.get_extension_js_asset_names()
        setting['version'] = uuid.uuid4().hex[:6].upper()

        res = self._get_auth_provider_settings_by_name(setting)
        for k, v in res.items():
            setting[k] = v

        setting['auth_prov'] = self.name
        return setting

    def _get_auth_provider_settings_by_name(self, setting):
        result = setting.get(self.AUTHENTICATION_PROVIDERS_APP_KEY_NAME).get(self.name)

        if result.get('apiSubPath') is None:
            result['apiSubPath'] = '/api/v1/'

        if result.get('authenticationBridge') is None:
            result['authenticationBridge'] = ''

        if result.get('sessionExpiresInMinutes') is None:
            result['sessionExpiresInMinutes'] = 20

        if result.get('useMinifiedAssets') is None:
            result['useMinifiedAssets'] = False

        if result.get('ssl_verify') is None:
            result['ssl_verify'] = True

        return result

    def get_config_js_name(self):
        return 'config{0}.js'.format(self.name)

    def get_name(self):
        return self.name

    def get_permission_query_repository_yml_key(self):
        key = super().get_permission_query_repository_yml_key()
        name = self.get_name()
        if name == MultiSettingManager.PRIMARY_AUTHENTICATION_PROVIDER_NAME or name == '':
            return key
        else:
            return name + '_' + key

    def get_permission_session_name(self):
        key = super().get_permission_session_name()
        name = self.get_name()
        if name == MultiSettingManager.PRIMARY_AUTHENTICATION_PROVIDER_NAME:
            return key
        else:
            return name + '_' + key

    def get_base_url(self, route=''):
        base = url_for('core_endpoints.index')
        url = request.environ.get('wsgi.url_scheme') + '://' + request.environ.get('HTTP_HOST')
        name = self.name if self.name != self.PRIMARY_AUTHENTICATION_PROVIDER_NAME else ''
        sub_path = [base[:-1], self.instance, name, route]
        new_sub_path = ('/'.join(filter(lambda x: x != 'default' and x is not None, sub_path)))
        url += (new_sub_path.replace('//', '/'))
        return url
