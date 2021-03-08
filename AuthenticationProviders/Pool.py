import time
import requests
import datetime
from flask import request, json
from typing import Callable
from AuthenticationProviders.Base import Base
from TM1py.Services import TM1Service


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
        #TODO multi pool user
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

        tm1_session_id = self.getTM1SessionId()

        authorization_required = tm1_session_id is None

        if authorization_required:
            headers['Authorization'] = pool_user
        else:
            cookies["TM1SessionId"] = tm1_session_id

        response = requests.request(url=url, method=method, data=mdx, headers=headers, cookies=cookies, verify=False)

        if authorization_required:
            self.cache.set(self.TM1SessionId, response.cookies.get('TM1SessionId'))
            expires = datetime.datetime.now() + datetime.timedelta(minutes=cnf['sessionExpiresInMinutes'] - 1)
            self.cache.set(self.TM1SessionExpires, expires)

        duration: Callable[[], str] = lambda: "%.5fs" % (time.time() - start_time)
        print(duration())

        return response.text, response.status_code, {'Content-Type': 'application/json'}

    def getTM1Service(self):
        cnf = self.getConfig()

        tm1_session_id = self.getTM1SessionId()

        authorization_required = tm1_session_id is None

        if authorization_required:
            print('Not implemented')
            #TODO master user password secure módon tárolásának kitalálása után implementálható
            #TM1Service(base_url=address, namespace=NAMESPACE, user=USER, password=PWD, ssl=SSL)
        else:
            return TM1Service(base_url=cnf['pool']['target'], session_id=tm1_session_id, ssl=False)
