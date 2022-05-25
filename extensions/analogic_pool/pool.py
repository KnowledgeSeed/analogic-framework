from abc import ABCMeta
from analogic import AuthenticationProvider
import requests
from TM1py.Services import TM1Service
from analogic_pool import PoolSettingManager


class Pool(AuthenticationProvider, metaclass=ABCMeta):
    def __init__(self, setting):
        super().__init__(PoolSettingManager(setting))

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
        pool_user = self.setting.get_pool_user()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            headers['Authorization'] = self.setting.get_pool_cam_namespace(pool_user['name'])
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
            self.setting.update_pool_user(pool_user)
        else:
            self.setting.decrease_pool_user_session_count(pool_user)

        return response

    def _make_request(self, url, method, mdx, headers, cookies, **kwargs):
        return requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False,
            **kwargs)

    def get_tm1_service(self):

        pool_user = self.setting.get_pool_user()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            return TM1Service(base_url=self.setting.get_pool_target_url(),
                              namespace=self.setting.get_app_cam_namespace(),
                              user=pool_user['name'],
                              password=self.setting.get_password(pool_user['name']),
                              ssl=False)
        else:
            return TM1Service(base_url=self.setting.get_pool_target_url(), session_id=pool_user['session'], ssl=False)