from DimensionFramework.AuthenticationProviders.Pool import Pool
from flask import session, redirect, request, render_template, make_response


class LoginPool(Pool):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def login(self):
        cnf = self.setting.getConfig()
        if request.method == 'POST':
            if request.form['username'] == 'test' and request.form['password'] == 'Pass2323!%':
                session['username'] = request.form['username']
                resp = make_response(redirect(self.setting.getBaseUrl()))
                return self.addAuthenticatedCookie(resp)
        return render_template('login.html', cnf=cnf)

    def index(self):
        cnf = self.setting.getConfig()
        if 'username' in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.getBaseUrl('login'))

    def checkAppAuthenticated(self):
        if 'username' in session:
            return True
        return False

    def getAuthenticationResponse(self):
        return redirect(self.setting.getBaseUrl('login'))

    def extendLoginSession(self):
        session.modified = True
