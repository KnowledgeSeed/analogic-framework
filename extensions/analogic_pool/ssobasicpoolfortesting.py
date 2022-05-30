import requests
from analogic_pool import SSOPoolForTesting
from TM1py.Services import TM1Service


class SSOBasicPoolForTesting(SSOPoolForTesting):
    def __init__(self, setting):
        super().__init__(setting)

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):

        pool_user = self.setting.get_pool_user()

        authorization_required = pool_user['session'] == ''

        if authorization_required is False:
            cookies["TM1SessionId"] = pool_user['session']
            response = self._make_request(url, method, mdx, headers, cookies)
        else:
            response = self._make_request(url, method, mdx, headers, cookies,
                                          auth=(pool_user['name'], self.setting.get_password(pool_user['name'])))

        if authorization_required:
            pool_user['session'] = response.cookies.get('TM1SessionId')
            self.setting.update_pool_user(pool_user)
        else:
            self.setting.decrease_pool_user_session_count(pool_user)

        return response

    def _get_header_for_access(self):
        return {'Content-Type': 'application/json; charset=utf-8',
                'Accept-Encoding': 'gzip, deflate, br'}

    def _make_post(self, url, json, headers):
        cnf = self.setting.get_config()
        sso_cnf = cnf['sso']
        pwd = self.setting.get_password(sso_cnf['admin'], sso_cnf['adminNamespace'])
        return requests.post(url=url,
                             data=json,
                             headers=headers,
                             auth=(sso_cnf['admin'], pwd),
                             verify=False)

    def get_tm1_service(self):

        pool_user = self.setting.get_pool_user()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            return TM1Service(base_url=self.setting.get_proxy_target_url(),
                              user=pool_user['name'],
                              password=self.setting.get_password(pool_user['name']),
                              ssl=False)
        else:
            return TM1Service(base_url=self.setting.get_proxy_target_url(), session_id=pool_user['session'], ssl=False)
