import requests
from flask import request, json
from knowledgeseed.AuthenticationProviders.Base import Base
from TM1py.Services import TM1Service


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
        #TODO multi pool user

        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        target_url = self.setting.getPoolTargetUrl()

        mdx = request.data
        if request.args.get('server') is not None:
            body = json.loads(request.data)
            mdx = self.setting.getMDX(body['key'])
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

        tm1_session_id = self.setting.getTM1SessionId()

        authorization_required = tm1_session_id is None

        if authorization_required:
            headers['Authorization'] = self.setting.getPoolCamNamespace()
        else:
            cookies["TM1SessionId"] = tm1_session_id

        response = requests.request(url=url, method=method, data=mdx, headers=headers, cookies=cookies, verify=False)

        if authorization_required:
            self.setting.setTM1SessionId(response.cookies.get('TM1SessionId'))

        return response.text, response.status_code, {'Content-Type': 'application/json'}

    def getTM1Service(self):

        tm1_session_id = self.setting.getTM1SessionId()

        authorization_required = tm1_session_id is None

        if authorization_required:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(),
                              namespace=self.setting.getAppCamNamespace(),
                              user=self.setting.getPoolUser(),
                              password=self.setting.getPassword(),
                              ssl=False)
        else:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(), session_id=tm1_session_id, ssl=False)
