import importlib.util
import sys
import tempfile
import types
import unittest
from pathlib import Path
from unittest.mock import patch


def _register_stub(module_name, **attributes):
    module = types.ModuleType(module_name)
    for key, value in attributes.items():
        setattr(module, key, value)
    sys.modules[module_name] = module


dummy_class = lambda name: type(name, (), {})
dummy_exception = lambda name: type(name, (Exception,), {})

_register_stub('analogic.version', version='test-version')
_register_stub('analogic.endpoint', AnalogicEndpoint=dummy_class('AnalogicEndpoint'))
_register_stub('analogic.core_endpoints', core_endpoints=object())
_register_stub('analogic.system_endpoints', system_endpoints=object())
_register_stub(
    'analogic.authentication_provider',
    AuthenticationProvider=dummy_class('AuthenticationProvider'),
    get_authentication_provider=lambda: None,
    login_required=lambda func: func,
    endpoint_login_required=lambda func: func
)
_register_stub(
    'analogic.multi_authentication_provider',
    MultiAuthenticationProvider=dummy_class('MultiAuthenticationProvider'),
    is_multi_authentication_provider=lambda: False,
    get_multi_authentication_provider=lambda: None
)
_register_stub('analogic.cam', Cam=dummy_class('Cam'))
_register_stub('analogic.loader', ClassLoader=dummy_class('ClassLoader'))
_register_stub('analogic.email', EmailManager=dummy_class('EmailManager'))
_register_stub(
    'analogic.setting',
    SettingManager=dummy_class('SettingManager'),
    get_properties_file_value=lambda *_args, **_kwargs: None,
    hash_password=lambda value: value
)
_register_stub('analogic.multi_setting', MultiSettingManager=dummy_class('MultiSettingManager'))
_register_stub('analogic.analogic_tm1_service', AnalogicTM1Service=dummy_class('AnalogicTM1Service'))
_register_stub('analogic.pivot')
_register_stub('analogic.loginbasic', LoginBasic=dummy_class('LoginBasic'))
_register_stub('analogic.logincam', LoginCam=dummy_class('LoginCam'))
_register_stub('analogic.nologin', NoLogin=dummy_class('NoLogin'))
_register_stub('analogic.camsecure', CamSecure=dummy_class('CamSecure'))
_register_stub(
    'analogic.exceptions',
    AnalogicException=dummy_exception('AnalogicException'),
    AnalogicProxyException=dummy_exception('AnalogicProxyException'),
    AnalogicTM1ServiceException=dummy_exception('AnalogicTM1ServiceException'),
    AnalogicAccessDeniedException=dummy_exception('AnalogicAccessDeniedException'),
    AnalogicAcceptedException=dummy_exception('AnalogicAcceptedException'),
    AnalogicMaintenanceException=dummy_exception('AnalogicMaintenanceException')
)
_register_stub('analogic.signals', logged_in=object(), before_call_do_proxy=object())
_register_stub(
    'analogic.multi_authentication_provider_interface',
    MultiAuthenticationProviderInterface=dummy_class('MultiAuthenticationProviderInterface')
)
_register_stub('analogic.session_handler', SessionHandler=dummy_class('SessionHandler'))
_register_stub('analogic.signal_receiver', SignalReceiver=dummy_class('SignalReceiver'))
_register_stub(
    'analogic.default_signal_receiver',
    DefaultSignalReceiver=type('DefaultSignalReceiver', (), {'initialize': lambda self: None})
)
_register_stub('analogic.long_running_task_executor', LongRunningTaskExecutor=dummy_class('LongRunningTaskExecutor'))
_register_stub('analogic.request_logger', RequestLogger=dummy_class('RequestLogger'))
_register_stub('analogic.json_log_formatter', JSONLogFormatter=dummy_class('JSONLogFormatter'))
_register_stub('analogic.task', scheduler=types.SimpleNamespace(init_app=lambda app: None, start=lambda: None))

MODULE_PATH = Path(__file__).resolve().parents[1] / 'analogic.py'
MODULE_SPEC = importlib.util.spec_from_file_location('analogic_create_new_app_test', MODULE_PATH)
analogic_module = importlib.util.module_from_spec(MODULE_SPEC)
MODULE_SPEC.loader.exec_module(analogic_module)
Analogic = analogic_module.Analogic


class TestCreateNewApp(unittest.TestCase):

    def test_create_new_app_creates_template_directories(self):
        analogic_root = Path(__file__).resolve().parents[1]

        with tempfile.TemporaryDirectory() as temp_instance_path:
            app = Analogic(__name__, instance_path=temp_instance_path)
            app.root_path = str(analogic_root)

            with patch.object(app, 'trigger_change_monitor_for_restart'):
                app.create_new_app('demoapp', 'main')

            target_root = Path(temp_instance_path) / 'apps' / 'demoapp'
            self.assertTrue((target_root / 'server' / 'email_templates').is_dir())
            self.assertTrue((target_root / 'templates').is_dir())


if __name__ == '__main__':
    unittest.main()
