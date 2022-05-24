from analogic_pool import Pool
from flask import render_template, request, make_response, redirect, session
from TM1py.Services import TM1Service


class LoginBasicPool(Pool):
    def __init__(self, setting):
        super().__init__(setting)
        self.authentication_session_name = self.setting.getInstance() + '_username'

    def test_analogic_endpoint(self):
        cnf = self.setting.getConfig()
        return render_template('test_analogic_endpoint.html', cnf=cnf)

    def login(self):
        cnf = self.setting.getConfig()
        if request.method == 'POST':
            if request.form['username'] == 'test' and request.form['password'] == 'test1!3??_1':
                session[self.authentication_session_name] = request.form['username']
                session['permanent'] = True
                resp = make_response(redirect(self.setting.getBaseUrl()))
                return self.add_authenticated_cookies(resp)
        return render_template('login.html', cnf=cnf)

    def index(self):
        cnf = self.setting.getConfig()
        if self.authentication_session_name  in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.getBaseUrl('login'))

    def create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):

        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required is False:
            cookies["TM1SessionId"] = pool_user['session']
            response = self.makeRequest(url, method, mdx, headers, cookies)
        else:
            response = self.makeRequest(url, method, mdx, headers, cookies,
                                        auth=(pool_user['name'], self.setting.getPassword(pool_user['name'])))

        if authorization_required:
            pool_user['session'] = response.cookies.get('TM1SessionId')
            self.setting.updatePoolUser(pool_user)
        else:
            self.setting.decreasePoolUserSessionCount(pool_user)

        return response

    def check_app_authenticated(self):
        if self.authentication_session_name  in session:
            return True
        return False

    def get_authentication_required_response(self):
        return redirect(self.setting.getBaseUrl('login'))

    def extend_login_session(self):
        session.modified = True

    def get_tm1_service(self):

        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(),
                              user=pool_user['name'],
                              password=self.setting.getPassword(pool_user['name']),
                              ssl=False)
        else:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(), session_id=pool_user['session'], ssl=False)

