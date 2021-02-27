import jwt
import requests
import base64
from AuthenticationProviders.Pool import Pool
from flask import render_template, request, session, make_response, redirect, url_for, Response


# TODO lehet el lehetne redisben tárolni a jwt lejáratát, nem kéne minden request esetén decodelni
class SSOPool(Pool):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def index(self):
        cnf = self.getConfig()
        sso_token = session.get('sso_token')
        decoded = self.decodeToken(sso_token)

        if decoded.get('msg') != '':
            return make_response(redirect(cnf['authenticationBridge']))#TODO ez ajax híváskor történik, egy időben küldött több ajax híváskor több popup is feljön (biztos, hogy el akar navigálni..). Egyszer jöjjön csak fel.

        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=cnf)

    def authsso(self):
        cnf = self.getConfig()
        sso_token = request.args.get('token')

        decoded = self.decodeToken(sso_token)

        if decoded['msg'] != '':
            return render_template('sso_error.html', msg=decoded['msg'], cnf=cnf)

        user_name = decoded['token'].get('unique_name')
        #TODO Józsival tesztelni!!
      #  if self.hasPoolUserAccess(user_name.replace('\\', '/'), decoded['token']) is None:
       #     return render_template('unauthorized.html')

        session['sso_token'] = sso_token

        # proxy workaround:
        # resp = make_response(redirect(url_for('index')))
        resp = make_response(redirect(self.getBaseUrl()))
        # end proxy workaround

        return self.addAuthenticatedCookie(resp)

    def hasPoolUserAccess(self, user_name, token):
        has_access = True
        cnf = self.getConfig()
        sso_cnf = cnf['sso']

        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br',
                                   'Authorization': sso_cnf['userCAMNamespace']}

        resp = requests.post(url=sso_cnf['getUserUrl'],
                             json=sso_cnf['getUserBody'].replace('$username', user_name),
                             headers=headers)

        if resp.status_code == 201 or resp.status_code == 200:
            print('User exists')
            data = resp.json()
            if data['Cells'][1]['Value'] is None or data['Cells'][1]['Value'] != "1":
                has_access = False
                print('But user does not have access')

        if resp.status_code == 400:
            print('User does not exist')
            has_access = False
            requests.post(url=sso_cnf['putUserUrl'],
                          json=sso_cnf['putUserBody'].replace('$username', user_name),
                          headers=headers, verify=False)

        requests.post(url=sso_cnf['putTokenUrl'],
                      json=sso_cnf['putTokenBody'].replace('$username', user_name).replace('$token', token),
                      headers=headers, verify=False)

        print('Posting token was successful')

        if sso_cnf['additionalPostUrl1'] != '':
            requests.post(url=sso_cnf['additionalPostUrl1'],
                          json=sso_cnf['additionalPostBody1'].replace('$username', user_name).replace('$token', token),
                          headers=headers, verify=False)

        if sso_cnf['additionalPostUrl2'] != '':
            requests.post(url=sso_cnf['additionalPostUrl2'],
                          json=sso_cnf['additionalPostBody2'].replace('$username', user_name).replace('$token', token),
                          headers=headers, verify=False)

        return has_access

    def decodeToken(self, sso_token):
        if sso_token is None:
            return {'msg': 'sso token is null', 'token': ''}

        cnf = self.getConfig()
        secret = cnf['sso']['secret']
        msg = ''
        decoded_token = ''

        try:
            decoded_token = jwt.decode(sso_token, base64.b64decode(secret),  algorithms="HS256")
        except jwt.ExpiredSignatureError:
            msg = 'Signature has expired.'
        except jwt.DecodeError:
            msg = 'Error decoding signature.'
        except jwt.InvalidTokenError:
            msg = 'Invalid token'

        return {'msg': msg, 'token': decoded_token}

    def checkAppAuthenticated(self):
        sso_token = session['sso_token']
        decoded = self.decodeToken(sso_token)
        return decoded['msg'] == ''

    def getAuthenticationResponse(self):
        return Response('', 401)

    def setCustomMDXData(self, mdx):
        if len(mdx) > 0:
            return mdx.replace('$ssoToken', session['sso_token'])
        return mdx
