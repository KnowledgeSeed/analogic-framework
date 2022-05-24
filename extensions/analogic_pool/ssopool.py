import jwt
import requests
import base64
from analogic_pool import Pool
from flask import render_template, request, session, make_response, redirect, Response
import logging


class SSOPool(Pool):
    def __init__(self, setting):
        super().__init__(setting)
        self.authentication_session_name = self.setting.getInstance() + '_sso_token'
        self.authentication_session_user_name = self.setting.getInstance() + '_username'

    def index(self):
        cnf = self.setting.getConfig()
        sso_token = session.get(self.authentication_session_name)
        decoded = self.decodeToken(sso_token)

        if decoded.get('msg') != '':
            return make_response(redirect(cnf[
                                              'authenticationBridge']))

        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=cnf)

    def auth_sso(self):
        cnf = self.setting.getConfig()
        sso_token = request.args.get('token')
        logger = logging.getLogger('login')

        decoded = self.decodeToken(sso_token)

        if decoded['msg'] != '':
            return render_template('sso_error.html', msg=decoded['msg'], cnf=cnf)

        user_name = decoded['token'].get('unique_name')

        logger.info(user_name + ' tries to login')

        if self.hasPoolUserAccess(user_name.replace('\\', '/'), sso_token) is False:
            return render_template('unauthorized.html')

        session[self.authentication_session_name] = sso_token
        session[self.authentication_session_username_name] = user_name

        resp = make_response(redirect(self.setting.getBaseUrl()))

        logger.info(user_name + ' logged in successfully')

        return self.add_authenticated_cookies(resp)

    def hasPoolUserAccess(self, user_name, token):
        has_access = True
        cnf = self.setting.getConfig()
        sso_cnf = cnf['sso']
        logger = logging.getLogger('login')

        headers = self.getHeaderForAccess()

        resp = self.makePost(sso_cnf['getUserUrl'],
                             sso_cnf['getUserBody'].replace('$username', user_name),
                             headers)

        if resp.status_code == 201 or resp.status_code == 200:
            logger.info('User exists')
            data = resp.json()
            if data['Cells'][1]['Value'] is None or data['Cells'][1]['Value'] != 1:
                has_access = False
                logger.info('But user does not have access')

        if resp.status_code == 400:
            logger.info('User does not exist')
            has_access = False
            self.makePost(sso_cnf['putUserUrl'],
                          sso_cnf['putUserBody'].replace('$username', user_name),
                          headers)

        self.makePost(sso_cnf['putTokenUrl'],
                      sso_cnf['putTokenBody'].replace('$username', user_name).replace('$token', token),
                      headers)

        logger.info('Posting token was successful')

        if sso_cnf['additionalPostUrl1'] != '':
            self.makePost(sso_cnf['additionalPostUrl1'],
                          sso_cnf['additionalPostBody1'].replace('$username', user_name).replace('$token', token),
                          headers)

        if sso_cnf['additionalPostUrl2'] != '':
            self.makePost(sso_cnf['additionalPostUrl2'],
                          sso_cnf['additionalPostBody2'].replace('$username', user_name).replace('$token', token),
                          headers)

        return has_access

    def getHeaderForAccess(self):
        return {'Content-Type': 'application/json; charset=utf-8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Authorization': self.setting.getSsoCamNamespace()}

    def makePost(self, url, json, headers):
        return requests.post(url=url,
                             data=json,
                             headers=headers,
                             verify=False)

    def decodeToken(self, sso_token):
        if sso_token is None:
            return {'msg': 'sso token is null', 'token': ''}

        secret = self.setting.getFrameworkSSOKey()
        msg = ''
        decoded_token = ''

        try:
            decoded_token = jwt.decode(sso_token, base64.b64decode(secret), algorithms="HS256")
        except jwt.ExpiredSignatureError:
            msg = 'Signature has expired.'
        except jwt.DecodeError:
            msg = 'Error decoding signature.'
        except jwt.InvalidTokenError:
            msg = 'Invalid token'

        return {'msg': msg, 'token': decoded_token}

    def check_app_authenticated(self):
        sso_token = session.get(self.authentication_session_name)
        return sso_token is not None

    def get_authentication_required_response(self):
        return Response('', 401)

    def set_custom_mdx_data(self, mdx):
        if len(mdx) > 0:
            return mdx.replace('$ssoToken', session[self.authentication_session_name])
        return mdx

    def extend_login_session(self):
        session.modified = True
