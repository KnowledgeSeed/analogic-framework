from analogic.authentication_provider import AuthenticationProvider
from flask import render_template, request, make_response, redirect, session, Response
from analogic.analogic_tm1_service import AnalogicTM1Service


class Cam(AuthenticationProvider):

    def __init__(self, setting):
        super().__init__(setting)

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=self.setting.get_config())

    def auth(self):
        resp = make_response(redirect(self.setting.get_base_url()))
        resp.set_cookie('camPassport', request.form.get('c_pp'))

        cam_name = self.set_tm1_service(request.form.get('c_pp'))
        session[self.logged_in_user_session_name] = cam_name
        return self._add_authenticated_cookies(resp)

    def get_base_url(self):
        return self.setting.get_config()['apiHost']

    def set_tm1_service(self, cam_passport):
        cnf = self.setting.get_config()

        tm1_service = AnalogicTM1Service(base_url=self.get_base_url(), cam_passport=cam_passport,
                                         ssl=self.setting.get_ssl_verify())

        response = tm1_service.get_session().request('GET', self.get_base_url() + cnf['apiSubPath'] + 'ActiveUser',
                                                     headers=self.HEADERS, verify=self.setting.get_ssl_verify())

        json_object = response.json()
        cam_name = json_object['Name']

        existing_tm1_service = self.setting.get_tm1_service(cam_name)

        is_connected = False
        if existing_tm1_service is not None:
            try:
                is_connected = existing_tm1_service.connection.is_connected()
            except Exception as e:
                self._logger.error('exception while checking connection: ' + str(e))


        if not is_connected:
            if existing_tm1_service is not None:
                try:
                    existing_tm1_service.close_session()
                except Exception as e:
                    self._logger.error('exception while closing session: ' + str(e))
            self.setting.set_tm1_service(cam_name, tm1_service)

        return cam_name

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
        tm1_service = self.setting.get_tm1_service(session[self.logged_in_user_session_name])
        if tm1_service is None:
            return Response('Unauthorized', status=401, mimetype='application/json')

        response = tm1_service.get_session().request(method, url, data=mdx, headers=headers,
                                                     verify=self.setting.get_ssl_verify())
        if response.status_code == 401:
            tm1_service.re_authenticate()
            response = tm1_service.get_session().request(method, url, data=mdx, headers=headers,
                                                         verify=self.setting.get_ssl_verify())
        return response

    def check_app_authenticated(self):
        return session.get(self.logged_in_user_session_name, '') != '' and self.setting.get_tm1_session_id(
            session.get(self.logged_in_user_session_name)) is not None

    def get_authentication_required_response(self):
        return 'Authentication required', 401, {'Content-Type': 'application/json'}

    def get_tm1_service(self):
        return self.setting.get_tm1_service(session[self.logged_in_user_session_name])

    def _extend_login_session(self):
        session.modified = True
