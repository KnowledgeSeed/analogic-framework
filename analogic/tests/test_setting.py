import unittest
from analogic.setting import SettingManager
import os
from flask_caching import Cache
from analogic.analogic import create_app


class MyTestCase(unittest.TestCase):

    def setUp(self):
        site_root = os.path.realpath(os.path.dirname(__file__))

        self.app = create_app(site_root)

        cache_path = os.path.join(site_root, 'cache')
        cache = Cache(self.app, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})

        self.instance = 'testapp'
        self.setting = SettingManager(cache, site_root, self.instance)
        self.setting.clear_cache()

        self.default_instance = 'default'
        self.default_setting = SettingManager(cache, site_root, self.default_instance)
        self.default_setting.clear_cache()

    def tearDown(self):
        self.setting = ''

    def test_clear_cache(self):
        self.assertEqual('OK', self.setting.clear_cache())

    def test_get_base_url(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('http://localhost/testapp', self.setting.get_base_url(''))
            self.assertEqual('http://localhost/testapp/login', self.setting.get_base_url('login'))

        with self.app.test_request_context(''):
            self.assertEqual('http://localhost', self.default_setting.get_base_url(''))
            self.assertEqual('http://localhost/login', self.default_setting.get_base_url('login'))

    def test_get_config_cache_key(self):
        self.assertEqual(self.instance + '_' + SettingManager.CONFIG, self.setting._get_config_cache_key())

    def test_get_config(self):
        with self.app.test_request_context('/testapp'):
            cnf = self.setting.get_config()
            self.assertEqual(cnf['authenticationMode'], 'LoginBasicPool')

    def test_get_param(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('testapp', self.setting._get_param('instance'))
            self.assertEqual('testapp.static', self.setting._get_param('blueprint_static'))
            self.assertEqual('http://localhost/', self.setting._get_param('hostname'))


if __name__ == '__main__':
    unittest.main()
