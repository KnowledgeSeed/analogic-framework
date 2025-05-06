from analogic.authentication_provider import AuthenticationProvider
from analogic.multi_setting import MultiSettingManager
from flask import current_app, request, jsonify
from analogic.signals import logged_in
from analogic.multi_authentication_provider_interface import MultiAuthenticationProviderInterface
from rich.prompt import Prompt

def is_multi_authentication_provider():
    return current_app.is_multi_authentication_provider()

def get_multi_authentication_provider():
    return current_app.get_multi_authentication_provider()

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

                child_auth_provider_instance_name = '/' + self.setting.get_instance() + '/' + name

                if name != MultiSettingManager.PRIMARY_AUTHENTICATION_PROVIDER_NAME:
                    current_app.register_analogic_url_rules(child_auth_provider_instance_name)

                if current_app.initialize_auth_providers is True:
                    child_auth_prov.initialize()

                    if name != MultiSettingManager.PRIMARY_AUTHENTICATION_PROVIDER_NAME:
                        named_routes = child_auth_prov.get_setting().get_named_routes()

                        current_app.register_named_routes(child_auth_provider_instance_name, child_auth_prov, named_routes)

                self.authentication_providers[name] = child_auth_prov

                logged_in.connect(self.authentication_provider_logged_in, self.authentication_providers[name])
            else:
                message = 'Unable to add {0} to multiauthentication provider. It must implement MultiAuthenticationProviderInterface.'.format(
                    name)

                self.getLogger().error(message)

    def authentication_provider_logged_in(self, auth_prov, user_name, password):
        merge_permissions = self.get_setting().get_config().get('_mergePermissions', False)

        permissions = set()

        logged_in_auth_provs = []

        unable_to_login_auth_provider_names = []

        for name, registered_auth_prov in self.authentication_providers.items():

            if registered_auth_prov is not auth_prov:

                try:
                    registered_auth_prov.do_login(user_name, password)

                    logged_in_auth_provs.append(registered_auth_prov)

                except Exception as e:

                    message = f'Unable to login to {name}'

                    self._logger.error(message)

                    self._logger.error(e, exc_info=True)

                    unable_to_login_auth_provider_names.append(name)

            if merge_permissions is True:
                permissions.update(registered_auth_prov.get_permission_list())

        if len(unable_to_login_auth_provider_names) > 0:

            message = f'Unable to login {self.get_setting().get_instance()} : {",".join(unable_to_login_auth_provider_names)}'

            self._logger.error(message)

            for logged_in_auth_prov in logged_in_auth_provs:

                try:

                    logged_in_auth_prov.logout()

                except Exception as e:

                    self._logger.error(e, exc_info=True)

            raise Exception(message)

        if merge_permissions is True:

            permissions_str = ','.join(permissions)

            for name, registered_auth_prov in self.authentication_providers.items():
                registered_auth_prov.set_permissions(permissions_str)

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
    def handle_named_route(self, named_route, **kwargs):
        return self.get_authentication_provider_by_request().handle_named_route(named_route, **kwargs)

    def _extend_login_session(self):
        self.get_authentication_provider_by_request()._extend_login_session()

    def healthy(self):
        responses = {}
        status_code = 200
        for name, registered_auth_prov in self.authentication_providers.items():
            response = registered_auth_prov.healthy()
            if response[1] != 200:
                status_code = 500
            responses[name] = response[0] if  isinstance(response[0], dict) else response[0].json
        return jsonify(responses), status_code

    def get_tm1_service(self):
        return self.get_authentication_provider_by_request().get_tm1_service()

    def index(self):
        return self.get_authentication_provider_by_request().index()

    def on_exit(self):
        for name, registered_auth_prov in self.authentication_providers.items():
            registered_auth_prov.on_exit()

    def logout(self):
        # Todo event
        for name, registered_auth_prov in self.authentication_providers.items():
            registered_auth_prov.logout()

    def clear_cache(self):
        for name, registered_auth_prov in self.authentication_providers.items():
            registered_auth_prov.clear_cache()
        self.get_setting().clear_cache()

    def initialize(self):
        for name, registered_auth_prov in self.authentication_providers.items():
            registered_auth_prov.initialize()
        self.setting.initialize()

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

    def uninstall(self, params):
        child_auth_provider_name = params.get('multiappname')
        if child_auth_provider_name is not None:
            print('Uninstall {0}'.format(child_auth_provider_name))
            self.authentication_providers.get(child_auth_provider_name).uninstall(params)
        else:
            for name, registered_auth_prov in self.authentication_providers.items():
                print('Install {0} authentication provider'.format(name))
                registered_auth_prov.uninstall(params)
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
            for name, registered_auth_prov in self.authentication_providers.items():
                registered_auth_prov.add_command_line_parameters(ap)
        except Exception:
            pass

    @staticmethod
    def get_setting_parameter_descriptions():
        result = super(MultiAuthenticationProvider, MultiAuthenticationProvider).get_setting_parameter_descriptions()
        result['_authenticationProviders'] = {
            'required': True,
            'description': 'Child authentication providers or datasource (Pool, Graphql, SSOPool,...)'
        }
        result['_mergePermissions'] = {
            'required': False,
            'description': 'Default false. It merges the permission loaded in all children authentication provider'
        }

        return result
