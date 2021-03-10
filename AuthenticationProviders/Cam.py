import requests
import datetime
from AuthenticationProviders.Base import Base
from flask import render_template, request, make_response, redirect
from TM1py.Services import TM1Service


class Cam(Base):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=self.getConfig())

    def auth(self):
        resp = make_response(redirect(self.getBaseUrl()))
        resp.set_cookie('camPassport', request.form.get('c_pp'))
        self.setTM1SessionIdForTM1Service(request.form.get('c_pp'))
        return self.addAuthenticatedCookie(resp)

    def setTM1SessionIdForTM1Service(self, cam_passport):
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        cnf = self.getConfig()

        headers['Authorization'] = 'CAMPassport ' + cam_passport

        response = requests.request(url=cnf['tm1ApiHost'] + cnf['tm1ApiSubPath'] + 'ActiveUser', method='GET', headers=headers, cookies=cookies, verify=False)

        self.cache.set(self.TM1SessionId, response.cookies.get('TM1SessionId'), 0)
        expires = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
        self.cache.set(self.TM1SessionExpires, expires, 0)

    def getTM1Service(self):
        cnf = self.getConfig()

        tm1_session_id = self.getTM1SessionId()

        return TM1Service(base_url=cnf['tm1ApiHost'], session_id=tm1_session_id, ssl=False)
