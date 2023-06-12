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
            'username': self.tm1_config.get('username'),
            'password': self.tm1_config.get('password')
        }

    def test_authentication(self):
        with self.client:
            response = self.client.get('/logout')
            assert response.status_code == 200
            login_form = self.get_login_info()

            response = self.client.post('/login', data=login_form, follow_redirects=True)

    @classmethod
    def tearDownClass(cls):
        pass
