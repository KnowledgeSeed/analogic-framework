import configparser
import unittest
from pathlib import Path
import os
import analogic.cam
from analogic.analogic import create_app
from unittest.mock import patch
import requests
from requests_ntlm import HttpNtlmAuth
import orjson
import gzip


class TestCamAuthenticationProvider(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.config = configparser.ConfigParser()
        cls.config.read(Path(__file__).parent.joinpath('cam.ini'))

        site_root = os.path.realpath(os.path.dirname(__file__))
        cls.app = create_app(site_root)
        cls.client = cls.app.test_client()

    def test_index(self):
        with self.client:
            response = self.client.get("/cam", follow_redirects=True)
            assert response.status_code == 200
            assert response.request.path == '/cam/'
            assert response.request.base_url == 'http://localhost/cam/'
            assert response.request.host == 'localhost'
            assert 'redirect.js' in response.text

    def test_logged_in(self):
        with self.client:
            self.client.set_cookie('authenticated', 'authenticated')
            with patch.object(analogic.cam.Cam, 'check_app_authenticated', return_value=True) as mock_method:
                response = self.client.get("/cam", follow_redirects=True)
                assert response.status_code == 200
                assert response.request.path == '/cam/'
                assert response.request.base_url == 'http://localhost/cam/'
                assert response.request.host == 'localhost'
                assert 'redirect.js' not in response.text

    def test_auth(self):
        with self.client:
            with patch.object(analogic.cam.Cam, 'set_tm1_service', return_value='dddd') as mock_method:
                response = self.client.post('/cam/auth', data={'c_pp': 'fsdlfj'})
                assert response.status_code == 302

    def test_auth_follow(self):
        with self.client:
            with patch.object(analogic.cam.Cam, 'set_tm1_service', return_value='dddd') as mock_method1, patch.object(
                    analogic.cam.Cam, 'check_app_authenticated', return_value=True) as mock_method2:
                response = self.client.post('/cam/auth', data={'c_pp': 'fsdlfj'}, follow_redirects=True)
                assert response.status_code == 200
                assert 'redirect.js' not in response.text

    def test_real_authentication(self):
        cam_passport = self.get_cam_passport()
        with self.client:
            response = self.client.post('/cam/auth', data={'c_pp': cam_passport}, follow_redirects=True)
            assert response.status_code == 200
            assert 'redirect.js' not in response.text
            assert self.app.get_authentication_provider().get_tm1_service().connection.is_connected()

    def test_call_server_side_mdx(self):
        cam_passport = self.get_cam_passport()
        with self.client:
            response = self.client.post('/cam/auth', data={'c_pp': cam_passport}, follow_redirects=True)
            params = {
                'key': 'test_mdx'
            }
            url = '/cam/proxy/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name,%20Attributes))),Cells($select=Ordinal,Value)&server=1'
            response = self.client.post(url, data=orjson.dumps(params), follow_redirects=True, content_type='application/json')
            assert response.status_code == 201
            assert orjson.loads(gzip.decompress(response.data)).get('Cells') is not None

    def get_cam_passport(self):
        tm1_config = self.config['tm1']
        with requests.Session() as session:
            session.auth = HttpNtlmAuth(tm1_config.get('namespace') + '\\' + tm1_config.get('user'), tm1_config.get('password', raw=True))
            response = session.get(tm1_config.get('gateway'))
            c_pp = response.cookies.get('cam_passport')
            return c_pp

    @classmethod
    def tearDownClass(cls):
        pass
