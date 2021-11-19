import requests
from flask import request, session
from DimensionFramework.AuthenticationProviders.Base import Base
from TM1py.Services import TM1Service
from flask import jsonify


class Pool(Base):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def checkAppAuthenticated(self):
        return True

    def getAuthenticationResponse(self):
        pass

    def setCustomMDXData(self, mdx):
        return mdx

    def pool(self, sub_path):

        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        self.extendLoginSession()

        target_url = self.setting.getPoolTargetUrl()

        mdx = self.getServerSideMDX()

        url = target_url + "/" + sub_path + (
            "?" + request.query_string.decode('UTF-8') if len(
                request.query_string) > 0 else "")

        method = request.method

        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        response = self.doPoolRequest(url, method, mdx, headers, cookies)

        return response.text, response.status_code, {'Content-Type': 'application/json'}

    def doPoolRequest(self, url, method, mdx, headers=None, cookies=None):

        if headers is None:
            headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                       'Accept-Encoding': 'gzip, deflate, br'}

        if cookies is None:
            cookies: dict[str, str] = {}

        return self.createRequestByAuthenticatedUser(url, method, mdx, headers, cookies)

    def createRequestByAuthenticatedUser(self, url, method, mdx, headers, cookies):
        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            headers['Authorization'] = self.setting.getPoolCamNamespace(pool_user['name'])
        else:
            cookies["TM1SessionId"] = pool_user['session']

        response = requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        if authorization_required:
            pool_user['session'] = response.cookies.get('TM1SessionId')
            self.setting.updatePoolUser(pool_user)
        else:
            self.setting.decreasePoolUserSessionCount(pool_user)

        return response

    def makeRequest(self, url, method, mdx, headers, cookies, **kwargs):
        return requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False,
            **kwargs)

    def extendLoginSession(self):
        pass

    def getTM1Service(self):

        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(),
                              namespace=self.setting.getAppCamNamespace(),
                              user=pool_user['name'],
                              password=self.setting.getPassword(pool_user['name']),
                              ssl=False)
        else:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(), session_id=pool_user['session'], ssl=False)

    def activeUser(self):
        return jsonify({'username': session.get('username')})
