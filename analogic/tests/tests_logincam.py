import configparser
import unittest
from pathlib import Path
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))
from analogic.analogic import create_app
import orjson
import gzip
from analogic.tests.mock_tm1 import start_tm1_mocks, stop_tm1_mocks


class TestLoginCamAuthenticationProvider(unittest.TestCase):
    _tm1_patchers = []

    @classmethod
    def setUpClass(cls) -> None:
        cls._tm1_patchers = start_tm1_mocks()
        cls.config = configparser.ConfigParser()
        cls.config.read(Path(__file__).parent.joinpath('logincam.ini'))
        cls.tm1_config = cls.config['tm1']

        site_root = os.path.realpath(os.path.dirname(__file__))
        cls.app = create_app(site_root)
        cls.client = cls.app.test_client()
        cls.auth_provider = cls.app.analogic_applications.get('logincam')

    def test_login_page(self):
        with self.client:
            response = self.client.get('/logincam/logout')
            assert response.status_code == 200

            response = self.client.get('/logincam/', follow_redirects=True)
            assert response.status_code == 200
            assert response.request.path == '/logincam/login'
            assert response.request.base_url == 'http://localhost/logincam/login'
            assert response.request.host == 'localhost'
            assert 'Password' in response.text

    def get_login_info(self):
        return {
            'username': self.tm1_config.get('user'),
            'password': self.tm1_config.get('password', raw=True),
            'namespace': self.tm1_config.get('namespace')
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
            url = '/logincam/proxy/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name,%20Attributes))),Cells($select=Ordinal,Value)&server=1'
            response = self.client.post(url, data=orjson.dumps(params), follow_redirects=True,
                                        content_type='application/json')
            assert response.status_code == 201
            assert orjson.loads(gzip.decompress(response.data)).get('Cells') is not None

    def login_into_app(self):
        response = self.client.get('/logincam/logout')
        assert response.status_code == 200

        login_form = self.get_login_info()

        response = self.client.post('/logincam/login', data=login_form, follow_redirects=True)
        self.assertTrue(response.status_code == 200)
        self.assertTrue('Password' not in response.text)

    def test_logout(self):
        with self.client:
            self.login_into_app()

            response = self.client.get('/logincam/logout')
            self.assertTrue(response.status_code == 200)

            response = self.client.get("/logincam/", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/logincam/pivot", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/logincam/export", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/logincam/activeUser", follow_redirects=True)
            self.assertTrue('Password' in response.text)

            response = self.client.get("/logincam/proxy/test", follow_redirects=True)
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
            url = '/logincam/proxy/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name,%20Attributes))),Cells($select=Ordinal,Value)&server=1'
            response = self.client.post(url, data=orjson.dumps(params), follow_redirects=True,
                                        content_type='application/json')
            assert response.status_code == 201
            assert orjson.loads(gzip.decompress(response.data)).get('Cells') is not None

    def test_export(self):
        app_path = '/logincam/'
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
        stop_tm1_mocks(cls._tm1_patchers)
