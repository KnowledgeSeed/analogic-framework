from AuthenticationProviders.Pool import Pool
from flask import session, redirect, url_for, request, render_template, make_response


class LoginPool(Pool):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def login(self):
        cnf = self.getConfig()
        if request.method == 'POST':
            if request.form['username'] == 'test' and request.form['password'] == 'test':
                session['username'] = request.form['username']
                resp = make_response(redirect(self.getBaseUrl()))
                return self.addAuthenticatedCookie(resp)
        return render_template('login.html', cnf=cnf)

    def index(self):
        cnf = self.getConfig()
        if 'username' in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.getBaseUrl('login'))




