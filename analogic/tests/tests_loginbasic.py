import configparser
import unittest
from pathlib import Path
import os
import analogic.cam
import analogic.loginbasic
from analogic.analogic import create_app
from unittest.mock import patch
import requests
from requests_ntlm import HttpNtlmAuth
import orjson
import gzip


class TestLoginBasicAuthenticationProvider(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.config = configparser.ConfigParser()
        cls.config.read(Path(__file__).parent.joinpath('loginbasic.ini'))
        cls.tm1_config = cls.config['tm1']

        site_root = os.path.realpath(os.path.dirname(__file__))
        cls.app = create_app(site_root)
        cls.client = cls.app.test_client()
        cls.auth_provider = cls.app.analogic_applications.get('default')

    def test_login_page(self):
        with self.client:
            response = self.client.get('/logout')
            assert response.status_code == 200

            response = self.client.get('/', follow_redirects=True)
            assert response.status_code == 200
            assert response.request.path == '/login'
            assert response.request.base_url == 'http://localhost/login'
            assert response.request.host == 'localhost'
            assert 'Password' in response.text

    def get_login_info(self):
        return {
            'username': self.tm1_config.get('user'),
            'password': self.tm1_config.get('password')
        }

    def test_authentication(self):
        with self.client:
            self.login_into_app()

    def test_call_server_side_mdx(self):
        with self.client:
            self.login_into_app()
            params = {
                'key': 'test_mdx'
            }
            url = '/proxy/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name,%20Attributes))),Cells($select=Ordinal,Value)&server=1'
            response = self.client.post(url, data=orjson.dumps(params), follow_redirects=True,
                                        content_type='application/json')
            assert response.status_code == 201
            assert orjson.loads(gzip.decompress(response.data)).get('Cells') is not None

    def login_into_app(self):
        response = self.client.get('/logout')
        assert response.status_code == 200

        login_form = self.get_login_info()

        response = self.client.post('/login', data=login_form, follow_redirects=True)
        self.assertTrue(response.status_code == 200)
        self.assertTrue('Password' not in response.text)

    def test_authenticated_cookie_flags(self):
        with self.client:
            self.client.get('/logout')
            cnf = self.auth_provider.get_setting().get_config()
            cnf['secureCookies'] = True
            cnf['cookieSameSite'] = 'Lax'

            with patch.object(analogic.loginbasic.LoginBasic, 'do_login', return_value=None):
                response = self.client.post('/login', data=self.get_login_info(), follow_redirects=False)

            self.assertEqual(response.status_code, 302)

            set_cookie_headers = response.headers.getlist('Set-Cookie')
            authenticated_cookie = next(
                (cookie for cookie in set_cookie_headers if cookie.startswith('authenticated=')),
                None
            )

            self.assertIsNotNone(authenticated_cookie)
            self.assertIn('HttpOnly', authenticated_cookie)
            self.assertIn('SameSite=Lax', authenticated_cookie)
            self.assertIn('Secure', authenticated_cookie)

            cnf['secureCookies'] = False

    def test_logout(self):
        with self.client:
            self.login_into_app()

            response = self.client.get('/logout')
            self.assertTrue(response.status_code == 200)

            response = self.client.get("/", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/pivot", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/export", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/activeUser", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/proxy/test", follow_redirects=True)
            self.assertTrue('Password' in response.text)

    def test_get_tm1_service_re_authenticate(self):
        with self.client:
            self.login_into_app()
            self.auth_provider.get_tm1_service().connection.logout()
            self.assertTrue(self.auth_provider.get_tm1_service().connection.is_connected())

    def test_proxy_re_authenticate(self):
        with self.client:
            self.login_into_app()
            self.auth_provider.get_tm1_service().connection.logout()

            params = {
                'key': 'test_mdx'
            }
            url = '/proxy/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name,%20Attributes))),Cells($select=Ordinal,Value)&server=1'
            response = self.client.post(url, data=orjson.dumps(params), follow_redirects=True,
                                        content_type='application/json')
            assert response.status_code == 201
            assert orjson.loads(gzip.decompress(response.data)).get('Cells') is not None

    def test_export(self):
        app_path = '/'
        with self.client:
            self.login_into_app()

            response = self.client.get(app_path + 'export?export_key=sdsd')
            self.assertTrue(response.status_code == 404)

            response = self.client.get(app_path + 'export?export_key=fakeExport')
            self.assertTrue(response.status_code == 404)

            response = self.client.get(app_path + 'export?export_key=testExport')
            self.assertTrue(response.status_code == 200)

    @classmethod
    def tearDownClass(cls):
        pass
