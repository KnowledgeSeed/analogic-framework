from analogic.authentication_provider import AuthenticationProvider
from analogic.multi_setting import MultiSettingManager
from flask import current_app, request
from analogic.logged_in_signal import logged_in
from analogic.multi_authentication_provider_interface import MultiAuthenticationProviderInterface
from rich.prompt import Prompt


class MultiAuthenticationProvider(AuthenticationProvider):

    def __init__(self, setting):
        super().__init__(setting)
        self.authentication_providers = {}
        self.instantiate_authentication_providers()

    def instantiate_authentication_providers(self):
        cnf = self.setting.get_config()
        for name, app_config in cnf.get(MultiSettingManager.AUTHENTICATION_PROVIDERS_APP_KEY_NAME, {}).items():
            setting = MultiSettingManager(self.setting.site_root, self.setting.get_instance(), name)

            child_auth_prov = current_app.create_authentication_provider_by_setting(setting, False)

            if isinstance(child_auth_prov, MultiAuthenticationProviderInterface):
                if name != MultiSettingManager.PRIMARY_AUTHENTICATION_PROVIDER_NAME:
                    current_app.register_analogic_url_rules('/' + self.setting.get_instance() + '/' + name)
                child_auth_prov.initialize()
                self.authentication_providers[name] = child_auth_prov
                logged_in.connect(self.authentication_provider_logged_in, self.authentication_providers[name])
            else:
                message = 'Unable to add {0} to multiauthentication provider. It must implement MultiAuthenticationProviderInterface.'.format(
                    name)
                self.getLogger().error(message)

    def authentication_provider_logged_in(self, auth_prov, user_name, password):
        for name, registered_auth_prov in self.authentication_providers.items():
            if registered_auth_prov is not auth_prov:
                try:
                    registered_auth_prov.do_login(user_name, password)
                except Exception as e:
                    self._logger.error(e, exc_info=True)

    def get_authentication_provider_by_request(self):
        s = request.path.split('/')
        if len(s) > 2 and s[2] in self.authentication_providers:
            return self.authentication_providers[s[2]]
        else:
            return self.authentication_providers.get(MultiSettingManager.PRIMARY_AUTHENTICATION_PROVIDER_NAME)

    def check_app_authenticated(self):
        return self.get_authentication_provider_by_request().check_app_authenticated()

    def get_authentication_required_response(self):
        return self.get_authentication_provider_by_request().get_authentication_required_response()

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies, decode_content=True):
        return self.get_authentication_provider_by_request()._create_request_with_authenticated_user(url, method, mdx,
                                                                                                     headers, cookies,
                                                                                                     decode_content)

    def _extend_login_session(self):
        self.get_authentication_provider_by_request()._extend_login_session()

    def get_tm1_service(self):
        return self.get_authentication_provider_by_request().get_tm1_service()

    def index(self):
        return self.get_authentication_provider_by_request().index()

    def on_exit(self):
        for name, registered_auth_prov in self.authentication_providers.items():
            registered_auth_prov.on_exit()

    def logout(self):
        for name, registered_auth_prov in self.authentication_providers.items():
            registered_auth_prov.logout()

    def install(self, params):
        child_auth_provider_name = params.get('multiappname')
        if child_auth_provider_name is not None:
            print('Install {0}'.format(child_auth_provider_name))
            self.authentication_providers.get(child_auth_provider_name).install(params)
        else:
            for name, registered_auth_prov in self.authentication_providers.items():
                print('Install {0} authentication provider'.format(name))
                registered_auth_prov.install(params)
                print('\n')

    def call_child_auth_provider_methods(self, params):
        child_auth_provider_name = params.get('multiappname')
        if child_auth_provider_name is None:
            child_auth_provider_name = Prompt.ask('Please enter child auth provider name',
                                                  choices=self.authentication_providers.keys())
        selected_child_auth_provider = self.authentication_providers.get(child_auth_provider_name)
        method = Prompt.ask('Please enter method of selected auth provider name',
                            choices=selected_child_auth_provider.get_available_backend_methods())
        getattr(selected_child_auth_provider, method)(params)

    def get_available_backend_methods(self):
        methods = super().get_available_backend_methods()
        methods.append('call_child_auth_provider_methods')
        return methods

    def add_command_line_parameters(self, ap):
        try:
            ap.add_argument("-ma", "--multiappname", required=False,
                            help="App id under MultiAuthenticationProvider")
        except Exception:
            pass
