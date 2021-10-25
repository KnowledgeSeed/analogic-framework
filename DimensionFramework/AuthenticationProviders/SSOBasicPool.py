import requests
from DimensionFramework.AuthenticationProviders.SSOPool import SSOPool


class SSOBasicPool(SSOPool):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def doPoolRequest(self, url, method, mdx, headers, cookies):
        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required is True:
            cookies["TM1SessionId"] = pool_user['session']

        response = requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False,
            auth=(pool_user['name'], self.setting.getPassword(pool_user['name'])))

        if authorization_required:
            pool_user['session'] = response.cookies.get('TM1SessionId')
            self.setting.updatePoolUser(pool_user)
        else:
            self.setting.decreasePoolUserSessionCount(pool_user)

        return response

    def getHeaderForAccess(self):
        return {'Content-Type': 'application/json; charset=utf-8',
                'Accept-Encoding': 'gzip, deflate, br'}

    def makePost(self, url, json, headers):
        cnf = self.setting.getConfig()
        sso_cnf = cnf['sso']
        pwd = self.setting.getPassword(sso_cnf['admin'], sso_cnf['adminNamespace'])
        return requests.post(url=url,
                             data=json,
                             headers=headers,
                             auth=(sso_cnf['admin'], pwd),
                             verify=False)
