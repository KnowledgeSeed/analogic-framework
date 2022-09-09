import unittest
import datetime
from unittest import mock
from analogic.setting import SettingManager
import os
from flask_caching import Cache
from analogic.analogic import create_app


class SettingTestCase(unittest.TestCase):

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

        self.assertEqual('OK', self.default_setting.clear_cache())

    def test_get_base_url(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('http://localhost/testapp/', self.setting.get_base_url(''))
            self.assertEqual('http://localhost/testapp/login', self.setting.get_base_url('login'))

        with self.app.test_request_context(''):
            self.assertEqual('http://localhost/', self.default_setting.get_base_url(''))
            self.assertEqual('http://localhost/login', self.default_setting.get_base_url('login'))

    def test_get_config_cache_key(self):
        self.assertEqual(self.instance + '_' + SettingManager.CONFIG, self.setting._get_config_cache_key())

        self.assertEqual(self.default_instance + '_' + SettingManager.CONFIG, self.default_setting._get_config_cache_key())

    def test_get_config(self):
        with self.app.test_request_context('/testapp'):
            cnf = self.setting.get_config()
            self.assertEqual(cnf['authenticationMode'], 'LoginBasicPool')
            self.assertEqual(cnf['projectName'], 'Test App')
            self.assertEqual(cnf['projectId'], 'testapp')
            self.assertEqual(cnf['apiHost'], 'http://localhost:5000/testapp/proxy')
            self.assertEqual(cnf['proxy']['target'], 'https://kseed-dc1.knowledgeseed.local:5125/testappapi')
            self.assertEqual(cnf['smtp']['password'], 'testPass')
            self.assertEqual(cnf['instance'], 'testapp')

        with self.app.test_request_context(''):
            cnf_default = self.default_setting.get_config()
            self.assertEqual(cnf_default['authenticationMode'], 'LoginBasicPool')
            self.assertEqual(cnf_default['projectName'], 'Default App')
            self.assertEqual(cnf_default['projectId'], 'default')
            self.assertEqual(cnf_default['apiHost'], 'http://localhost:5000/pool')
            self.assertEqual(cnf_default['proxy']['target'], 'https://kseed-dc1.knowledgeseed.local:5125/defaultapi')
            self.assertEqual(cnf_default['instance'], 'default')

    def test_get_param(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('testapp', self.setting._get_param('instance'))
            self.assertEqual('testapp.static', self.setting._get_param('blueprint_static'))
            self.assertEqual('testapp', self.setting._get_param('projectId'))
            self.assertEqual('http://localhost:5000/testapp/proxy', self.setting._get_param('apiHost'))

        with self.app.test_request_context(''):
            self.assertEqual('default', self.default_setting._get_param('instance'))
            self.assertEqual('default.static', self.default_setting._get_param('blueprint_static'))
            self.assertEqual('default', self.default_setting._get_param('projectId'))
            self.assertEqual('http://localhost:5000/pool', self.default_setting._get_param('apiHost'))

    def test_get_instance(self):
        self.assertEqual('testapp', self.setting.get_instance())

        self.assertEqual('default', self.default_setting.get_instance())

    def test_get_mdx(self):
        self.assertEqual('test', self.setting.get_mdx('testId'))

        self.assertEqual('default_mdx_for_test', self.default_setting.get_mdx('defaultTestMdx'))

    def test_get_custom_object_description(self):
        custom_object = self.setting.get_custom_object_description('testappExport')
        self.assertEqual('Export', custom_object['class'])
        self.assertEqual('testappExport', custom_object['method'])
        self.assertEqual('testapp.server.Export', custom_object['namespace'])

        default_custom_object = self.default_setting.get_custom_object_description('defaultExport')
        self.assertEqual('Export', default_custom_object['class'])
        self.assertEqual('defaultExport', default_custom_object['method'])
        self.assertEqual('default.server.Export', default_custom_object['namespace'])

    def test_set_get_tm1_session_id(self):
        with self.app.test_request_context('/testapp'):
            self.setting.set_tm1_session_id('testTM1SessionId', 'testapp')
            self.assertEqual('testTM1SessionId', self.setting.get_tm1_session_id('testapp'))

        with self.app.test_request_context(''):
            self.default_setting.set_tm1_session_id('testTM1SessionIdForDefault', 'default')
            self.assertEqual('testTM1SessionIdForDefault', self.default_setting.get_tm1_session_id('default'))

    def test_get_proxy_target_url(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('https://kseed-dc1.knowledgeseed.local:5125/testappapi', self.setting.get_proxy_target_url())

        with self.app.test_request_context(''):
            self.assertEqual('https://kseed-dc1.knowledgeseed.local:5125/defaultapi', self.default_setting.get_proxy_target_url())

    def test_get_app_cam_namespace(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('knowledgeseed', self.setting.get_app_cam_namespace())

        with self.app.test_request_context(''):
            self.assertEqual('knowledgeseed', self.default_setting.get_app_cam_namespace())

    def test_get_smtp_password(self):
        with self.app.test_request_context('/testapp'):
            self.assertEqual('testPass', self.setting.get_smtp_password())


if __name__ == '__main__':
    unittest.main()
