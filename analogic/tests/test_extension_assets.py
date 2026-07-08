import tempfile
import unittest
from pathlib import Path

from analogic.analogic import Analogic
from analogic.analogic import _build_extension_asset_registry
from analogic.analogic import _get_extension_css_rewrite_asset_names
from analogic.analogic import _register_extension_assets


class TestExtensionAssets(unittest.TestCase):

    def setUp(self):
        self.tempdir = tempfile.TemporaryDirectory()
        self.extension_dir = Path(self.tempdir.name) / 'analogic_seeder'
        self.css_dir = self.extension_dir / 'static' / 'assets' / 'css'
        self.font_dir = self.extension_dir / 'static' / 'assets' / 'fonts'
        self.css_dir.mkdir(parents=True)
        self.font_dir.mkdir(parents=True)

        self.css_path = self.css_dir / 'seeder-studio-icons.css'
        self.css_path.write_text(
            "@font-face { src: url('../fonts/icomoon.ttf?l35ao1#iefix') format('truetype'); }\n"
            ".external { background: url('/skin/app.png'); }\n",
            encoding='utf-8'
        )
        self.js_path = self.extension_dir / 'static' / 'assets' / 'js' / 'seeder-studio.js'
        self.js_path.parent.mkdir(parents=True)
        self.js_path.write_text('window.seederStudio = true;', encoding='utf-8')
        self.font_path = self.font_dir / 'icomoon.ttf'
        self.font_path.write_bytes(b'font-data')

        self.app = Analogic(__name__)

    def tearDown(self):
        self.tempdir.cleanup()

    def test_extension_scan_registers_dependency_assets_without_auto_including_them(self):
        _register_extension_assets(self.app, str(self.extension_dir))

        self.assertIn('seeder-studio-icons.css', self.app.extension_assets)
        self.assertIn('seeder-studio.js', self.app.extension_assets)
        self.assertIn('analogic_seeder/static/assets/fonts/icomoon.ttf', self.app.extension_assets)

        self.assertIn('seeder-studio-icons.css', self.app.get_extension_css_asset_names())
        self.assertIn('seeder-studio.js', self.app.get_extension_js_asset_names())
        self.assertNotIn('analogic_seeder/static/assets/fonts/icomoon.ttf', self.app.get_extension_css_asset_names())
        self.assertNotIn('analogic_seeder/static/assets/fonts/icomoon.ttf', self.app.get_extension_js_asset_names())

    def test_extension_css_asset_rewrites_relative_urls_to_extension_asset_urls(self):
        _register_extension_assets(self.app, str(self.extension_dir))

        with self.app.test_request_context(
                '/extension_asset?asset_name=seeder-studio-icons.css',
                environ_overrides={'SCRIPT_NAME': '/analogic4/ksacademyira'}):
            response = self.app.extension_asset()

        css = response.get_data(as_text=True)
        self.assertIn(
            "/analogic4/ksacademyira/extension_asset?asset_name=analogic_seeder/static/assets/fonts/icomoon.ttf&l35ao1#iefix",
            css
        )
        self.assertIn("url('/skin/app.png')", css)

    def test_extension_asset_serves_font_with_font_mimetype(self):
        _register_extension_assets(self.app, str(self.extension_dir))

        with self.app.test_request_context(
                '/extension_asset?asset_name=analogic_seeder/static/assets/fonts/icomoon.ttf'):
            response = self.app.extension_asset()

        self.assertEqual(200, response.status_code)
        self.assertEqual('font/ttf', response.mimetype)
        response.close()

    def test_extension_asset_registry_keeps_legacy_filename_keys_and_relative_path_keys(self):
        registry = _build_extension_asset_registry(str(self.extension_dir), [
            str(self.css_path),
            str(self.font_path)
        ])
        css_rewrite_names = _get_extension_css_rewrite_asset_names(registry)

        self.assertEqual(str(self.css_path), registry['seeder-studio-icons.css'])
        self.assertEqual(str(self.font_path), registry['analogic_seeder/static/assets/fonts/icomoon.ttf'])
        self.assertIn('seeder-studio-icons.css', css_rewrite_names)
        self.assertIn('analogic_seeder/static/assets/css/seeder-studio-icons.css', css_rewrite_names)


if __name__ == '__main__':
    unittest.main()
