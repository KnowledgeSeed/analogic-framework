import jwt
import requests
import base64
from DimensionFramework.AuthenticationProviders.Pool import Pool
from flask import render_template, request, session, make_response, redirect, Response
import logging


class SSOPool(Pool):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def index(self):
        cnf = self.setting.getConfig()
        sso_token = session.get('sso_token')
        decoded = self.decodeToken(sso_token)

        if decoded.get('msg') != '':
   #     if sso_token is None or decoded.get('msg') == '':
            return make_response(redirect(cnf[
                                              'authenticationBridge']))

        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=cnf)

    def authsso(self):
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

        session['sso_token'] = sso_token
        session['username'] = user_name

        resp = make_response(redirect(self.setting.getBaseUrl()))

        logger.info(user_name + ' logged in successfully')

        return self.addAuthenticatedCookie(resp)

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

    def checkAppAuthenticated(self):
        sso_token = session.get('sso_token')
        return sso_token is not None
        # decoded = self.decodeToken(sso_token)
        # return decoded['msg'] == ''

    def getAuthenticationResponse(self):
        return Response('', 401)

    def setCustomMDXData(self, mdx):
        if len(mdx) > 0:
            return mdx.replace('$ssoToken', session['sso_token'])
        return mdx

    def extendLoginSession(self):
        session.modified = True
