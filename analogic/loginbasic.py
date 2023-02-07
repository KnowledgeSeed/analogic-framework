from analogic.authentication_provider import AuthenticationProvider
from analogic.analogic_tm1_service import AnalogicTM1Service
from flask import render_template, request, make_response, redirect, session
import logging


class LoginBasic(AuthenticationProvider):

    def __init__(self, setting):
        super().__init__(setting)

    def index(self):
        cnf = self.setting.get_config()
        if self.logged_in_user_session_name in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.get_base_url('login'))

    def login(self):
        cnf = self.setting.get_config()
        if request.method == 'POST':

            p = {'base_url': self.get_proxy_target_url(), 'ssl': self.get_ssl_verify(), 'user': request.form['username'],
                 'password':  request.form['password']}

            try:
                tm1_service = AnalogicTM1Service(**p)
                self.setting.set_tm1_service(request.form['username'], tm1_service)
                session[self.logged_in_user_session_name] = request.form['username']
                resp = make_response(redirect(self.setting.get_base_url()))
                return self._add_authenticated_cookies(resp)

            except Exception as e:
                self.getLogger().error(e)
            # response = requests.request(url=self.setting.get_proxy_target_url() + cnf['apiSubPath'] + 'ActiveUser',
            #                             method='GET',
            #                             auth=(request.form['username'], request.form['password']),
            #                             verify=False)
            #
            # if response.status_code == 200:
            #     session[self.logged_in_user_session_name] = request.form['username']
            #     session['permanent'] = True
            #
            #     self.setting.set_tm1_session_id(response.cookies.get('TM1SessionId'),
            #                                     session[self.logged_in_user_session_name])
            #
            #     resp = make_response(redirect(self.setting.get_base_url()))
            #
            #     return self._add_authenticated_cookies(resp)

        return render_template('login.html', cnf=cnf)

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
        tm1_service = self.setting.get_tm1_service(session[self.logged_in_user_session_name])
        response = tm1_service.get_session().request(method, url, data=mdx, headers=headers, verify=self.setting.get_ssl_verify())
        if response.status_code == 401:
            tm1_service.re_authenticate()
            response = tm1_service.get_session().request(method, url, data=mdx, headers=headers, verify=self.setting.get_ssl_verify())
        return response
        # tm1_session_id = self.setting.get_tm1_session_id(session[self.logged_in_user_session_name])
        #
        # cookies["TM1SessionId"] = tm1_session_id
        #
        # response = requests.request(
        #     url=url,
        #     method=method,
        #     data=mdx,
        #     headers=headers,
        #     cookies=cookies,
        #     verify=False)
        #
        # return response

    def check_app_authenticated(self):
        if self.logged_in_user_session_name in session:
            return True
        return False

    def get_authentication_required_response(self):
        return redirect(self.setting.get_base_url('login'))

    def _extend_login_session(self):
        session.modified = True

    def get_tm1_service(self):
        return self.setting.get_tm1_service(session[self.logged_in_user_session_name])

    def getLogger(self):
        return logging.getLogger(__name__)
