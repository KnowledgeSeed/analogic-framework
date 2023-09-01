from analogic.loginbasic import LoginBasic


class LoginCam(LoginBasic):

    def __init__(self, setting):
        super().__init__(setting)

    def get_connection_params(self, user_name, password):
        return {'base_url': self.setting.get_proxy_target_url(), 'ssl': self.setting.get_ssl_verify(),
                'user': user_name,
                'password': password, 'namespace': self.setting.get_app_cam_namespace()}

    @staticmethod
    def get_setting_parameter_descriptions():
        result = super(LoginCam, LoginCam).get_setting_parameter_descriptions()
        result['camNamespace'] = {
            'required': True,
            'description': 'The Cognos Access Management namespace ID.'
        }

        return result
