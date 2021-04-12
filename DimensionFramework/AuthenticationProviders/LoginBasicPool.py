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
        tm1_session_id = self.setting.getTM1SessionId()

        authorization_required = tm1_session_id is None

        if authorization_required is True:
            cookies["TM1SessionId"] = tm1_session_id

        response = requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False,
            auth=(self.setting.getPoolUser(), self.setting.getPassword()))

        if authorization_required:
            self.setting.setTM1SessionId(response.cookies.get('TM1SessionId'))

        return response

    def checkAppAuthenticated(self):
        if 'username' in session:
            return True
        return False

    def getAuthenticationResponse(self):
        return redirect(self.setting.getBaseUrl('login'))

    def getTM1Service(self):
        cnf = self.setting.getConfig()

        tm1_session_id = self.setting.getTM1SessionId()

        return TM1Service(base_url=cnf['tm1ApiHost'], session_id=tm1_session_id, ssl=False)
