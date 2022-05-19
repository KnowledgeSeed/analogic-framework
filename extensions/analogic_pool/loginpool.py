from analogic_pool import Pool
from flask import session, redirect, request, render_template, make_response


class LoginPool(Pool):
    def __init__(self, setting):
        super().__init__(setting)

    def login(self):
        cnf = self.setting.getConfig()
        if request.method == 'POST':
            if request.form['username'] == 'test' and request.form['password'] == 'Pass2323!%':
                session['username'] = request.form['username']
                resp = make_response(redirect(self.setting.getBaseUrl()))
                return self.add_authenticated_cookies(resp)
        return render_template('login.html', cnf=cnf)

    def index(self):
        cnf = self.setting.getConfig()
        if 'username' in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.getBaseUrl('login'))

    def check_app_authenticated(self):
        if 'username' in session:
            return True
        return False

    def get_authentication_response(self):
        return redirect(self.setting.getBaseUrl('login'))

    def extend_login_session(self):
        session.modified = True

