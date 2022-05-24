import requests
from analogic.authentication_provider import AuthenticationProvider
from flask import render_template, request, make_response, redirect, session
from TM1py.Services import TM1Service
import logging


class LoginBasic(AuthenticationProvider):

    def __init__(self, setting):
        super().__init__(setting)
        self.authentication_session_name = self.setting.getInstance() + '_username'

    def index(self):
        cnf = self.setting.getConfig()
        if self.authentication_session_name in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.getBaseUrl('login'))

    def login(self):
        cnf = self.setting.getConfig()
        if request.method == 'POST':

            response = requests.request(url=self.setting.getPoolTargetUrl() + cnf['tm1ApiSubPath'] + 'ActiveUser',
                                        method='GET',
                                        auth=(request.form['username'], request.form['password']),
                                        verify=False)

            if response.status_code == 200:
                session[self.authentication_session_name] = request.form['username']
                session['permanent'] = True

                self.setting.setTM1SessionId(response.cookies.get('TM1SessionId'),
                                             session[self.authentication_session_name])

                resp = make_response(redirect(self.setting.getBaseUrl()))

                return self.add_authenticated_cookies(resp)

        return render_template('login.html', cnf=cnf)

    def create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
        tm1_session_id = self.setting.getTM1SessionId(session[self.authentication_session_name])

        cookies["TM1SessionId"] = tm1_session_id

        response = requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        return response

    def check_app_authenticated(self):
        if self.authentication_session_name in session:
            return True
        return False

    def get_authentication_required_response(self):
        return redirect(self.setting.getBaseUrl('login'))

    def extend_login_session(self):
        session.modified = True

    def get_tm1_service(self):
        cnf = self.setting.getConfig()

        tm1_session_id = self.setting.getTM1SessionId(session[self.authentication_session_name])

        return TM1Service(base_url=cnf['tm1ApiHost'], session_id=tm1_session_id, ssl=False)

    def getLogger(self):
        return logging.getLogger(__name__)
