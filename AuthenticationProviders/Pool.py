import time
import requests
from flask import request, json
from typing import Callable
from AuthenticationProviders.Base import Base
import datetime


class Pool(Base):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def checkAppAuthenticated(self):
        return True

    def getAuthenticationResponse(self):
        pass

    def setCustomMDXData(self, mdx):
        return mdx

    def pool(self, sub_path):
        start_time = time.time()

        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        cnf = self.getConfig()
        pool_user = cnf['pool']['users'][0]
        target_url = cnf['pool']['target']

        mdx = request.data
        if request.args.get('server') is not None:
            body = json.loads(request.data)
            mdx = self.getMDX(body['key'])
            for k in body:
                mdx = mdx.replace('$' + k, body[k])

        mdx = self.setCustomMDXData(mdx)

        url = target_url + "/" + sub_path + (
            "?" + request.query_string.decode('UTF-8') if len(
                request.query_string) > 0 else "")

        method = request.method

        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        authorization_required = self.cache.get(self.TM1SessionId) is None or (self.cache.get(self.TM1SessionExpires) is not None and datetime.datetime.now() >= self.cache.get(self.TM1SessionExpires))

        if authorization_required:
            headers['Authorization'] = pool_user
        else:
            cookies["TM1SessionId"] = self.cache.get(self.TM1SessionId)

        response = requests.request(url=url, method=method, data=mdx, headers=headers, cookies=cookies, verify=False)

        if authorization_required:
            self.cache.set(self.TM1SessionId, response.cookies.get('TM1SessionId'))
            expires = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
            self.cache.set(self.TM1SessionExpires, expires)

        duration: Callable[[], str] = lambda: "%.5fs" % (time.time() - start_time)
        print(duration())

        return response.text, response.status_code, {'Content-Type': 'application/json'}
