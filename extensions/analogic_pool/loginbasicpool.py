from analogic_pool import Pool
from flask import render_template, request, make_response, redirect, session


class LoginBasicPool(Pool):
    def __init__(self, setting):
        super().__init__(setting)

    def login(self):
        cnf = self.setting.getConfig()
        if request.method == 'POST':
            if request.form['username'] == 'test' and request.form['password'] == 'test1!3??_1':
                session['username'] = request.form['username']
                session['permanent'] = True
                resp = make_response(redirect(self.setting.getBaseUrl()))
                return self.add_authenticated_cookies(resp)
        return render_template('login.html', cnf=cnf)

    def index(self):
        cnf = self.setting.getConfig()
        if 'username' in session:
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
        if 'username' in session:
            return True
        return False

    def get_authentication_response(self):
        return redirect(self.setting.getBaseUrl('login'))

    def extend_login_session(self):
        session.modified = True

