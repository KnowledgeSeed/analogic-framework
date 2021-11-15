import requests
from DimensionFramework.AuthenticationProviders.Pool import Pool
from flask import render_template, request, make_response, redirect, session
from TM1py.Services import TM1Service


class LoginBasicPool(Pool):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def login(self):
        cnf = self.setting.getConfig()
        if request.method == 'POST':
            if request.form['username'] == 'test' and request.form['password'] == 'test1!3??_1':
                session['username'] = request.form['username']
                session['permanent'] = True
                resp = make_response(redirect(self.setting.getBaseUrl()))
                return self.addAuthenticatedCookie(resp)
        return render_template('login.html', cnf=cnf)

    def index(self):
        cnf = self.setting.getConfig()
        if 'username' in session:
            return render_template('index.html', authenticated=True, cnf=cnf)
        return redirect(self.setting.getBaseUrl('login'))

    def doPoolRequest(self, url, method, mdx, headers, cookies):
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

    def checkAppAuthenticated(self):
        if 'username' in session:
            return True
        return False

    def getAuthenticationResponse(self):
        return redirect(self.setting.getBaseUrl('login'))

