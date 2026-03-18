import importlib.util
import json
import sys
import tempfile
import types
import unittest
from pathlib import Path
from unittest.mock import Mock

from flask import Flask

jproperties_stub = types.ModuleType('jproperties')


class DummyProperties:
    def load(self, *_args, **_kwargs):
        return None

    def get(self, _key):
        return None


jproperties_stub.Properties = DummyProperties
sys.modules['jproperties'] = jproperties_stub

cryptography_stub = types.ModuleType('cryptography')
fernet_stub = types.ModuleType('cryptography.fernet')


class DummyFernet:
    def __init__(self, *_args, **_kwargs):
        pass

    def encrypt(self, value):
        return value

    def decrypt(self, value):
        return value


fernet_stub.Fernet = DummyFernet
cryptography_stub.fernet = fernet_stub
sys.modules['cryptography'] = cryptography_stub
sys.modules['cryptography.fernet'] = fernet_stub

MODULE_PATH = Path(__file__).resolve().parents[1] / 'setting.py'
MODULE_SPEC = importlib.util.spec_from_file_location('analogic_setting_test', MODULE_PATH)
setting_module = importlib.util.module_from_spec(MODULE_SPEC)
MODULE_SPEC.loader.exec_module(setting_module)
SettingManager = setting_module.SettingManager


class TestSettingManagerClearCache(unittest.TestCase):

    def setUp(self):
        self.tempdir = tempfile.TemporaryDirectory()
        self.site_root = Path(self.tempdir.name)
        (self.site_root / 'server' / 'configs').mkdir(parents=True)
        (self.site_root / 'static' / 'assets' / 'js').mkdir(parents=True)

        self.app_json_path = self.site_root / 'app.json'
        self.app_json_path.write_text(json.dumps({
            'mainPage': 'legacyMain',
            'connectedSeederUrl': 'http://old-seeder',
            'connectedSeederApplicationVersion': 'old_app'
        }), encoding='utf-8')
        (self.site_root / 'server' / 'configs' / 'repository.yml').write_text('{}', encoding='utf-8')
        (self.site_root / 'server' / 'configs' / 'custom_objects.json').write_text('{}', encoding='utf-8')

        self.app = Flask(__name__)
        self.app.get_extension_css_asset_names = lambda: []
        self.app.get_extension_js_asset_names = lambda: []
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.setting = SettingManager(str(self.site_root), instance='default')

    def tearDown(self):
        self.app_context.pop()
        self.tempdir.cleanup()

    def test_clear_cache_reloads_main_page_from_app_json(self):
        self.app_json_path.write_text(json.dumps({
            'mainPage': 'newMain',
            'connectedSeederUrl': 'http://new-seeder',
            'connectedSeederApplicationVersion': 'project123_1.0'
        }), encoding='utf-8')
        self.setting.save_config_js = Mock()

        result = self.setting.clear_cache()

        self.assertEqual('OK', result)
        self.assertEqual('newMain', self.setting.config['mainPage'])
        self.setting.save_config_js.assert_called_once()


if __name__ == '__main__':
    unittest.main()
