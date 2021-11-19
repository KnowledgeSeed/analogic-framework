import requests
from DimensionFramework.AuthenticationProviders.Pool import Pool
from flask import render_template, request, make_response, redirect, session
from TM1py.Services import TM1Service
import logging


class Cam(Pool):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=self.setting.getConfig())

    def auth(self):
        resp = make_response(redirect(self.setting.getBaseUrl()))
        resp.set_cookie('camPassport', request.form.get('c_pp'))

        cam_name = self.setTM1SessionIdForTM1Service(request.form.get('c_pp'))
        session['cam_name'] = cam_name
        return self.addAuthenticatedCookie(resp)

    def setTM1SessionIdForTM1Service(self, cam_passport):
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        cnf = self.setting.getConfig()

        headers['Authorization'] = 'CAMPassport ' + cam_passport

        # hq nem tudja backenden feloldani a hq.coresystems.hu-t
        # response = requests.request(url=cnf['tm1ApiHost'] + cnf['tm1ApiSubPath'] + 'ActiveUser', method='GET', headers=headers, cookies=cookies, verify=False)
        response = requests.request(url=cnf['tm1ApiHostBackend'] + cnf['tm1ApiSubPath'] + 'ActiveUser',
                                    method='GET',
                                    headers=headers, cookies=cookies, verify=False)
        json_object = response.json()
        cam_name = json_object['Name']
        self.setting.setTM1SessionId(response.cookies.get('TM1SessionId'), cam_name)
        return cam_name

    def createRequestByAuthenticatedUser(self, url, method, mdx, headers, cookies):
        tm1_session_id = self.setting.getTM1SessionId(session['cam_name'])

        cookies["TM1SessionId"] = tm1_session_id

        response = requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        return response

    def checkAppAuthenticated(self):
        return session.get('cam_name', '') != '' and self.setting.getTM1SessionId(session.get('cam_name')) is not None

    def getAuthenticationResponse(self):
        return 'Authentication required', 401, {'Content-Type': 'application/json'}

    def getTM1Service(self):
        return None
    #   cnf = self.setting.getConfig()todo resolve dns problem

    #   tm1_session_id = self.setting.getTM1SessionId(session['cam_name'])

    #   return TM1Service(base_url=cnf['tm1ApiHost'], session_id=tm1_session_id, ssl=False)

    def getLogger(self):
        return logging.getLogger(__name__)

    def ping(self):
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}

        self.getLogger().info(session.get('cam_name', ''))
        tm1_session_id = self.setting.getTM1SessionId(session.get('cam_name', ''))
        self.getLogger().info(tm1_session_id)

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = self.setting.getConfig()

        response = requests.request(url=cnf['tm1ApiHostBackend'] + cnf['tm1ApiSubPath'] + 'ActiveUser',
                                    method='GET',
                                    headers=headers, cookies=cookies, verify=False)

        json_object = response.json()
        cam_name = json_object['Name']
        self.setting.setTM1SessionId(tm1_session_id, cam_name)

        self.getLogger().info(response.status_code)
        self.getLogger().info(response.text)
        return 'Ok', response.status_code, {'Content-Type': 'application/json'}
