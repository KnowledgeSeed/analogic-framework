import sys
from pathlib import Path
import unittest
from unittest.mock import patch

from flask import Flask

sys.path.append(str(Path(__file__).resolve().parents[2]))

from analogic.authentication_provider import AuthenticationProvider
from analogic.exceptions import AnalogicAccessDeniedException, AnalogicTM1ServiceException


class DummySetting:
    def __init__(self):
        self._custom_objects = {
            'exportKey': {'namespace': 'dummy', 'class': 'Dummy', 'method': 'dummy'},
            'middlewareKey': {'namespace': 'dummy', 'class': 'Dummy', 'method': 'dummy'},
        }

    def get_custom_object_description(self, key):
        return self._custom_objects.get(key)

    def get_instance(self):
        return 'dummy'

    def get_instance_and_name(self):
        return 'dummy'

    def get_config(self):
        return {}


class DummyAuthenticationProvider(AuthenticationProvider):
    def __init__(self, setting):
        super().__init__(setting)

    def get_tm1_service(self):
        return None

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies, decode_content=True):
        return None

    def index(self):
        return ''


class TestAuthenticationProviderErrorHandling(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.secret_key = 'test-secret'
        self.app.testing = True
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.provider = DummyAuthenticationProvider(DummySetting())

    def tearDown(self):
        self.app_context.pop()

    def test_export_access_denied_returns_403(self):
        with self.app.test_request_context('/export?export_key=exportKey'):
            with patch.object(self.provider, 'check_app_authenticated', return_value=True):
                with patch('analogic.authentication_provider.ClassLoader.call',
                           side_effect=AnalogicAccessDeniedException('Access denied')):
                    body, status, headers = self.provider.export()

        self.assertEqual(403, status)
        self.assertEqual({'message': 'Access denied'}, body)
        self.assertEqual('application/json', headers['Content-Type'])

    def test_export_authentication_error_returns_400(self):
        with self.app.test_request_context('/export?export_key=exportKey'):
            with patch.object(self.provider, 'check_app_authenticated', return_value=True):
                with patch('analogic.authentication_provider.ClassLoader.call',
                           side_effect=AnalogicTM1ServiceException('Unauthorized')):
                    body, status, headers = self.provider.export()

        self.assertEqual(400, status)
        self.assertEqual({'message': 'Unauthorized'}, body)
        self.assertEqual('application/json', headers['Content-Type'])

    def test_middleware_unexpected_error_returns_500(self):
        with self.app.test_request_context('/middleware?object_key=middlewareKey'):
            with patch.object(self.provider, 'check_app_authenticated', return_value=True):
                with patch('analogic.authentication_provider.ClassLoader.call',
                           side_effect=Exception('Boom')):
                    body, status, headers = self.provider.middleware()

        self.assertEqual(500, status)
        self.assertEqual({'message': 'Internal server error', 'details': 'Boom'}, body)
        self.assertEqual('application/json', headers['Content-Type'])


if __name__ == '__main__':
    unittest.main()
