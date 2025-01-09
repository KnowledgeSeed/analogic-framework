from analogic.authentication_provider import AuthenticationProvider
from analogic.analogic_tm1_service import AnalogicTM1Service
from analogic.exceptions import AnalogicTM1ServiceException
from flask import render_template, request, make_response, redirect, session, Response
from analogic.signals import logged_in
from analogic.multi_authentication_provider_interface import MultiAuthenticationProviderInterface


class LoginBasic(AuthenticationProvider, MultiAuthenticationProviderInterface):

    def __init__(self, setting):
        super().__init__(setting)

    def index(self):
        cnf = self.setting.get_config()
        if self.session_handler.is_exist(self.logged_in_user_session_name):
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.get_base_url('login'))

    def get_connection_params(self, user_name, password):
        return {
            'base_url': self.setting.get_proxy_target_url(),
            'ssl': self.setting.get_ssl_verify(),
            'user': user_name,
            'password': password
        }

    def login(self):
        cnf = self.setting.get_config()
        message = ''
        if request.method == 'POST':
            user_name = request.form.get('username')
            password = request.form.get('password')
            try:
                self.do_login(user_name, password)
                logged_in.send(self, user_name=user_name, password=password)
                resp = make_response(redirect(self.setting.get_base_url()))
                return self._add_authenticated_cookies(resp)
            except Exception as e:
                self._logger.error(e, exc_info=True)
                message = str(e)
        return render_template(self.get_setting().get_login_html(), cnf=cnf, message=message)

    def do_login(self, user_name, password):
        p = self.get_connection_params(user_name, password)
        p['connection_pool_size'] = 100

        tm1_service = self.setting.get_tm1_service(user_name)
        is_connected = False
        if tm1_service is not None:
            try:
                is_connected = tm1_service.connection.is_connected()
            except Exception as e:
                self._logger.error('exception while checking connection: ' + str(e))

        if not is_connected:
            if tm1_service is not None:
                try:
                    tm1_service.close_session()
                except Exception as e:
                    self._logger.error('exception while closing session: ' + str(e))

            tm1_service = AnalogicTM1Service(**p)
            self.setting.set_tm1_service(user_name, tm1_service)

        self.session_handler.set(self.logged_in_user_session_name, user_name)
        self.load_permissions()

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies, decode_content=True):
        user_name = self.get_logged_in_user_name()
        tm1_service = self.setting.get_tm1_service(user_name)
        if tm1_service is None:
            return Response('Unauthorized', status=401, mimetype='application/json')
        response = tm1_service.get_session().request(method, url, data=mdx, headers=headers,
                                                     verify=self.setting.get_ssl_verify(),
                                                     decode_content=decode_content)
        if response.status_code == 401:
            tm1_service.re_authenticate()
            response = tm1_service.get_session().request(method, url, data=mdx, headers=headers,
                                                         verify=self.setting.get_ssl_verify(),
                                                         decode_content=decode_content)
        return response

    def check_app_authenticated(self):
        return self.session_handler.is_exist(self.logged_in_user_session_name)

    def get_authentication_required_response(self):
        return redirect(self.setting.get_base_url('login'))

    def _extend_login_session(self):
        session.modified = True

    def get_tm1_service(self):
        tm1_service = self.setting.get_tm1_service(self.get_logged_in_user_name())
        if tm1_service is None:
            raise AnalogicTM1ServiceException('Unauthorized')

        if tm1_service.connection.is_connected() is False:
            try:
                tm1_service.re_authenticate()
            except Exception as e:
                self._logger.error('exception while re-authenticating: ' + str(e))
                raise AnalogicTM1ServiceException('Unauthorized')

        return tm1_service

    @staticmethod
    def get_setting_parameter_descriptions():
        result = super(LoginBasic, LoginBasic).get_setting_parameter_descriptions()
        result['proxy'] = {
            'target': {
                'required': True,
                'description': 'Tm1 restapi url.'
            }
        }

        return result
