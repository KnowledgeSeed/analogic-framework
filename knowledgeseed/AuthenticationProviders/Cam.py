import requests
from knowledgeseed.AuthenticationProviders.Base import Base
from flask import render_template, request, make_response, redirect
from TM1py.Services import TM1Service


class Cam(Base):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=self.setting.getConfig())

    def auth(self):
        resp = make_response(redirect(self.setting.getBaseUrl()))
        resp.set_cookie('camPassport', request.form.get('c_pp'))
        #hq nem tudja backenden feloldani a hq.coresystems.hu-t
        #self.setTM1SessionIdForTM1Service(request.form.get('c_pp'))
        return self.addAuthenticatedCookie(resp)

    def setTM1SessionIdForTM1Service(self, cam_passport):
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        cnf = self.setting.getConfig()

        headers['Authorization'] = 'CAMPassport ' + cam_passport

        response = requests.request(url=cnf['tm1ApiHost'] + cnf['tm1ApiSubPath'] + 'ActiveUser', method='GET', headers=headers, cookies=cookies, verify=False)

        self.setting.setTM1SessionId(response.cookies.get('TM1SessionId'))

    def getTM1Service(self):
        cnf = self.setting.getConfig()

        tm1_session_id = self.setting.getTM1SessionId()

        return TM1Service(base_url=cnf['tm1ApiHost'], session_id=tm1_session_id, ssl=False)
