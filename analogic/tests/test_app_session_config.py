from contextlib import ExitStack
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from analogic.analogic import create_app


class TestAppSessionConfig(unittest.TestCase):

    def setUp(self):
        self.context = ExitStack()
        self.addCleanup(self.context.close)
        self.instance = self.context.enter_context(tempfile.TemporaryDirectory())
        self.config_path = Path(self.instance) / 'config.py'
        self.context.enter_context(patch.dict(os.environ, {
            'ANALOGIC_SECRET_KEY': '',
            'ANALOGIC_SESSION_COOKIE_NAME': ''
        }))
        for target in ('_load_logging', '_load_analogic_extensions', '_load_applications',
                       'DefaultSignalReceiver.initialize', 'atexit.register'):
            self.context.enter_context(patch('analogic.analogic.' + target))
        self.scheduler = self.context.enter_context(patch('analogic.analogic.scheduler'))

    def create_app(self):
        return create_app(self.instance, start_scheduler=False, initialize_auth_providers=False)

    def test_reads_session_settings_from_instance_directory_without_rewriting(self):
        config = "SECRET_KEY = 'existing-test-key'\nSESSION_COOKIE_NAME = 'existing_session'\n"
        self.config_path.write_text(config, encoding='utf-8')

        app = self.create_app()

        self.assertEqual('existing-test-key', app.secret_key)
        self.assertEqual('existing_session', app.config['SESSION_COOKIE_NAME'])
        self.assertEqual(config, self.config_path.read_text(encoding='utf-8'))
        self.scheduler.start.assert_not_called()

    def test_generated_key_and_signed_session_survive_application_restart(self):
        first = self.create_app()
        saved_config = self.config_path.read_bytes()
        signed_session = first.session_interface.get_signing_serializer(first).dumps({'username': 'test'})

        second = self.create_app()

        self.assertTrue(first.secret_key)
        self.assertEqual(first.secret_key, second.secret_key)
        self.assertEqual(saved_config, self.config_path.read_bytes())
        self.assertEqual({'username': 'test'},
                         second.session_interface.get_signing_serializer(second).loads(signed_session))

    def test_environment_overrides_preserve_instance_configuration(self):
        config = "SECRET_KEY = 'existing-test-key'\nSESSION_COOKIE_NAME = 'existing_session'\n"
        self.config_path.write_text(config, encoding='utf-8')

        with patch.dict(os.environ, {
            'ANALOGIC_SECRET_KEY': 'environment-test-key',
            'ANALOGIC_SESSION_COOKIE_NAME': 'isolated_session'
        }):
            app = self.create_app()

        self.assertEqual('environment-test-key', app.secret_key)
        self.assertEqual('isolated_session', app.config['SESSION_COOKIE_NAME'])
        self.assertEqual(config, self.config_path.read_text(encoding='utf-8'))

    def test_environment_key_does_not_create_configuration_file(self):
        with patch.dict(os.environ, {'ANALOGIC_SECRET_KEY': 'environment-test-key'}):
            app = self.create_app()

        self.assertEqual('environment-test-key', app.secret_key)
        self.assertEqual('session', app.config['SESSION_COOKIE_NAME'])
        self.assertFalse(self.config_path.exists())


if __name__ == '__main__':
    unittest.main()
