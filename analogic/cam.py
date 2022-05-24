import requests
from analogic.authentication_provider import AuthenticationProvider
from flask import render_template, request, make_response, redirect, session
from TM1py.Services import TM1Service
import logging


class Cam(AuthenticationProvider):

    def __init__(self, setting):
        super().__init__(setting)
        self.authentication_session_name = self.setting.getInstance() + '_cam_name'

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=self.setting.getConfig())

    def auth(self):
        resp = make_response(redirect(self.setting.getBaseUrl()))
        resp.set_cookie('camPassport', request.form.get('c_pp'))

        cam_name = self.set_tm1_session_id_for_tm1_service(request.form.get('c_pp'))
        session[self.authentication_session_name] = cam_name
        return self.add_authenticated_cookies(resp)

    def set_tm1_session_id_for_tm1_service(self, cam_passport):
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        cnf = self.setting.getConfig()

        headers['Authorization'] = 'CAMPassport ' + cam_passport

        response = requests.request(url=cnf['tm1ApiHost'] + cnf['tm1ApiSubPath'] + 'ActiveUser',
                                    method='GET',
                                    headers=headers, cookies=cookies, verify=False)

        json_object = response.json()
        cam_name = json_object['Name']

        self.setting.setTM1SessionId(response.cookies.get('TM1SessionId'), cam_name)

        return cam_name

    def create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
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

    def check_app_authenticated(self):
        return session.get(self.authentication_session_name, '') != '' and self.setting.getTM1SessionId(
            session.get(self.authentication_session_name)) is not None

    def get_authentication_required_response(self):
        return 'Authentication required', 401, {'Content-Type': 'application/json'}

    def get_tm1_service(self):
        cnf = self.setting.getConfig()

        tm1_session_id = self.setting.getTM1SessionId(session[self.authentication_session_name])

        return TM1Service(base_url=cnf['tm1ApiHost'], session_id=tm1_session_id, ssl=False)

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

        response = requests.request(url=cnf['tm1ApiHost'] + cnf['tm1ApiSubPath'] + 'ActiveUser',
                                    method='GET',
                                    headers=headers, cookies=cookies, verify=False)

        json_object = response.json()
        cam_name = json_object['Name']
        self.setting.setTM1SessionId(tm1_session_id, cam_name)

        self.getLogger().info(response.status_code)
        self.getLogger().info(response.text)
        return 'Ok', response.status_code, {'Content-Type': 'application/json'}

    def extend_login_session(self):
        pass
