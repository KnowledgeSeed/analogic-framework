from abc import ABCMeta
from analogic import AuthenticationProvider
import requests
from TM1py.Services import TM1Service
from analogic_pool import PoolSettingManager


class Pool(AuthenticationProvider, metaclass=ABCMeta):
    def __init__(self, setting):
        super().__init__(PoolSettingManager(setting))

    def create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
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

    def get_tm1_service(self):

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