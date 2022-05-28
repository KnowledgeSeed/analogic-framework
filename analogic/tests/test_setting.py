import unittest
from analogic.setting import SettingManager


class MyTestCase(unittest.TestCase):

    def setUp(self):
        cache = 'C:\\Repositories\\opensource\\cache'
        site_root = 'C:\\Repositories\\opensource'
        instance = 'bpsp'
        self.setting = SettingManager(cache, site_root, 'bpsp')

    def tearDown(self):
        self.setting = ''

    def test_clear_cache(self):
        self.assertEqual(SettingManager.clear_cache(self.setting), 'OK')

    def test_get_base_url(self):
        self.assertEqual(SettingManager.get_base_url(self.setting, ''), 'http://localhost:5000/bpsp/')

    def test_get_config_cache_key(self):
        self.assertEqual(SettingManager._get_config_cache_key(self.setting),
                         SettingManager._get_instance_cache_key(SettingManager.CONFIG))

    def test_get_config(self):
        self.assertEqual(SettingManager.get_config(self.setting),
                         SettingManager._get_json_setting(self.setting._get_config_cache_key(), 'app'))

    def test_get_param(self):
        cnf = self.setting.get_config()
        self.assertEqual(SettingManager._get_param(self.setting, 'instance'), cnf['instance'])
        self.assertEqual(SettingManager._get_param(self.setting, 'blueprint_static'), cnf['blueprint_static'])
        self.assertEqual(SettingManager._get_param(self.setting, 'hostname'), cnf['hostname'])





if __name__ == '__main__':
    unittest.main()
