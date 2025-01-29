import os
from flask import Flask, Blueprint, request, send_file, session, render_template, current_app
import typing as t

from analogic.endpoint import AnalogicEndpoint
import logging.config
import json
import sys
from importlib import resources
from analogic.core_endpoints import core_endpoints
from analogic.system_endpoints import system_endpoints
from analogic.authentication_provider import AuthenticationProvider
from analogic.signal_receiver import SignalReceiver
from analogic.exceptions import AnalogicMaintenanceException
import inspect
from analogic.setting import SettingManager
from datetime import timedelta
import importlib
from analogic.task import scheduler
import atexit
from analogic.default_signal_receiver import DefaultSignalReceiver
import shutil
from time import time
from os import utime, stat

APPLICATIONS_DIR = 'apps'
APPLICATIONS_DIR_EXTRA = os.environ.get('APPLICATIONS_DIR_EXTRA', '')
APPLICATIONS_EXTRA = [] if not os.environ.get('APPLICATIONS_EXTRA') else os.environ.get('APPLICATIONS_EXTRA').split(',')
EXTENSIONS_DIR = 'extensions'
EXTENSIONS_DIR_EXTRA = os.environ.get('EXTENSIONS_DIR_EXTRA', '')
EXTENSIONS_EXTRA = [] if not os.environ.get('EXTENSIONS_EXTRA') else os.environ.get('EXTENSIONS_EXTRA').split(',')
ALLOWED_EXTENSION_PREFIX = 'analogic_'

def create_view_func(original_func, named_route):
    def my_wrapped_function(**kwargs):
        return original_func(named_route, **kwargs)
    return my_wrapped_function


class Analogic(Flask):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.endpoint_rules = []
        self.authentication_providers = {
            'Cam': 'analogic',
            'CamSecure': 'analogic',
            'LoginBasic': 'analogic',
            'LoginCam': 'analogic',
            'MultiAuthenticationProvider': 'analogic',
            'NoLogin': 'analogic'
        }
        self.signal_receivers = {}
        self.extension_assets = {}
        self.add_url_rule('/extension_asset', methods=['GET'], view_func=self.extension_asset)
        self.analogic_applications = {}
        self.initialize_auth_providers = True
        self.long_running_tasks = {}

    def create_new_app(self, name, main_page, model_api_url='', cam_namespace='', connected_seeder_url='',
                       connected_seeder_application_version=''):
        if name in self.analogic_applications:
            raise Exception('Application already exists')

        target = os.path.join(self.instance_path, APPLICATIONS_DIR, name)

        source = os.path.join(self.root_path, 'new_app_structure')

        shutil.copytree(source, target)

        self.replace_str_in_file(os.path.join(target, 'app.py'), 'default', name)
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$projectId', name)
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$mainPage', main_page)
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$modelApiUrl', model_api_url)
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$camNamespace', cam_namespace)
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$connectedSeederUrl', connected_seeder_url)
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$connectedSeederApplicationVersion', connected_seeder_application_version)
        authentication_mode = 'NoLogin' if model_api_url == '' else 'LoginBasic' if cam_namespace == '' else 'LoginCam'
        self.replace_str_in_file(os.path.join(target, 'app.json'), '$authenticationMode', authentication_mode)
        self.replace_str_in_file(os.path.join(target, 'static', 'assets', 'js', 'configs', 'widget-config.js'),
                                 '$projectId', name)

        self.trigger_change_monitor_for_restart()

    def trigger_change_monitor_for_restart(self):
        name = os.path.join(self.root_path, 'change_monitor.py')
        st_info = stat(name)

        utime(name, (st_info.st_atime, time()))

    def replace_str_in_file(self, path, old_str, new_str):
        with open(path, 'r') as file:
            filedata = file.read()

        new_content = filedata.replace(old_str, new_str)

        with open(path, 'w') as file:
            file.write(new_content)

    def register_named_routes(self, instance, auth_provider, named_routes):
        for named_route in named_routes:
            self.add_url_rule( f"{instance if instance != '/default' else ''}/{named_route}/<path:sub_path>",
                              f"{instance}_{named_route}",
                              view_func=create_view_func(auth_provider.handle_named_route, named_route),
                              provide_automatic_options=None,
                              **{'methods': ['GET']}
                              )
            self.add_url_rule(f"{instance if instance != '/default' else ''}/{named_route}/",
                              f"{instance}_{named_route}_1",
                              view_func=create_view_func(auth_provider.handle_named_route, named_route),
                              provide_automatic_options=None,
                              **{'methods': ['GET']}
                              )
            self.add_url_rule(f"{instance if instance != '/default' else ''}/{named_route}",
                              f"{instance}_{named_route}_2",
                              view_func=create_view_func(auth_provider.handle_named_route, named_route),
                              provide_automatic_options=None,
                              **{'methods': ['GET']}
                              )

    def register_analogic_url_rules(self, instance):
        for url_rule in self.endpoint_rules:
            self.add_url_rule(instance + url_rule['rule'],
                              url_rule['endpoint'],
                              view_func=url_rule['view_func'],
                              provide_automatic_options=url_rule['provide_automatic_options'],
                              **url_rule['options'])

    def register_analogic_endpoint(self, endpoint: "AnalogicEndpoint", **options: t.Any):
        if endpoint.name not in self.blueprints:
            self.endpoint_rules.extend(endpoint.endpoint_rules)
            super().register_blueprint(endpoint, **options)

    def register_authentication_provider(self, name, module_name):
        self.authentication_providers[name] = module_name

    def register_signal_receiver(self, name, module_name):
        self.signal_receivers[name] = module_name

    def evaluate_signal_receivers(self):
        for k, v in self.signal_receivers.items():

            class_name = k
            module_name = v

            if module_name in sys.modules:
                module = sys.modules[module_name]
            else:
                module = importlib.import_module(module_name)

            signal_receiver_class = getattr(module, class_name)
            signal_receiver = signal_receiver_class()
            signal_receiver.initialize()

    def get_authentication_provider_module_name(self, name):
        return self.authentication_providers[name]

    def register_application(self, application_dir, blueprint: "Blueprint", **options: t.Any) -> None:
        try:

            instance = '/' + blueprint.name

            self.register_analogic_url_rules(instance)

            auth_provider = self.create_authentication_provider(blueprint.name, application_dir)

            self.analogic_applications[blueprint.name] = auth_provider

            named_routes = auth_provider.get_setting().get_named_routes()

            self.register_named_routes(instance, auth_provider, named_routes)

            super().register_blueprint(blueprint, **options)
        except Exception as e:
            logging.getLogger(__name__).error('Error registering application ' + blueprint.name + ': ' + str(e))
            logging.getLogger(__name__).error(e, exc_info=True)

    def create_authentication_provider(self, analogic_application, analogic_application_path):
        with self.app_context():
            setting = SettingManager(analogic_application_path, analogic_application)
            return self.create_authentication_provider_by_setting(setting)

    def create_authentication_provider_by_setting(self, setting, initialize=True):

        class_name = setting.config['authenticationMode']
        module_name = self.get_authentication_provider_module_name(class_name)

        if module_name in sys.modules:
            module = sys.modules[module_name]
        else:
            module = importlib.import_module(module_name)

        authentication_provider_class = getattr(module, class_name)
        authentication_provider = authentication_provider_class(setting)

        if initialize and self.initialize_auth_providers and class_name != 'MultiAuthenticationProvider':
            authentication_provider.initialize()

        return authentication_provider

    def get_analogic_application(self):
        s = request.path.split('/')
        if len(s) > 2 and s[1] in self.analogic_applications:
            return self.analogic_applications[s[1]]
        else:
            if self.analogic_applications.get('default') is None:
                raise Exception('Default application not found')
            return self.analogic_applications['default']

    def register_extension_assets(self, assets):
        self.extension_assets.update(assets)

    def extension_asset(self):
        asset_name = request.args.get('asset_name')
        if asset_name in self.extension_assets:
            return send_file(self.extension_assets[asset_name])
        return 'not found', 404

    def get_extension_css_asset_names(self):
        return self._get_asset_by_ext('.css')

    def get_extension_js_asset_names(self):
        return self._get_asset_by_ext('.js')

    def _get_asset_by_ext(self, ext):
        return list(filter(lambda x: x.endswith(ext), list(self.extension_assets.keys())))

    def is_multi_authentication_provider(self):
        authentication_provider = self.get_analogic_application()

        config = authentication_provider.get_setting().get_config()

        return config['authenticationMode'] == 'MultiAuthenticationProvider'

    def get_multi_authentication_provider(self):
        authentication_provider = self.get_analogic_application()

        if authentication_provider.is_in_maintenance_mode() and authentication_provider.is_user_framework_admin() is False:
            raise AnalogicMaintenanceException(authentication_provider)

        return authentication_provider

    def get_authentication_provider(self):
        authentication_provider = self.get_analogic_application()

        if authentication_provider.is_in_maintenance_mode() and authentication_provider.is_user_framework_admin() is False:
            raise AnalogicMaintenanceException(authentication_provider)

        session.permanent = True
        config = authentication_provider.get_setting().get_config()

        if config['authenticationMode'] != 'Cam':
            self.permanent_session_lifetime = timedelta(minutes=config['sessionExpiresInMinutes'] - 1)
        else:
            self.permanent_session_lifetime = timedelta(days=31)

        if config['authenticationMode'] == 'MultiAuthenticationProvider':
            return authentication_provider.get_authentication_provider_by_request()

        return authentication_provider

    def on_exit(self):
        print('on_exit')
        for app_name in self.analogic_applications:
            self.analogic_applications[app_name].on_exit()


def page_not_found(e):
    return render_template('404.html'), 404


def page_error(e):
    if isinstance(e.original_exception, AnalogicMaintenanceException):
        request_xhr_key = request.headers.get('X-Requested-With')
        if request_xhr_key and request_xhr_key == 'XMLHttpRequest':
            return e.original_exception.authentication_provider.get_maintenance_message(), 503
        return render_template('maintenance.html',
                               message=e.original_exception.authentication_provider.get_maintenance_message()), 503

    message = ''
    if e.original_exception:
        message += str(e.original_exception)
    return render_template('500.html', message=message), 500


def create_app(instance_path, start_scheduler=True, initialize_auth_providers=True):
    app = Analogic(__name__, instance_path=instance_path)
    app.initialize_auth_providers = initialize_auth_providers

    app.secret_key = b'\x18m\x18\\]\xec\xcf\xbd\xf2\x89\xb9\xa3\x06N\x07\xfd'

    _load_logging(app)  # Todo overwrite

    app.register_analogic_endpoint(core_endpoints)

    _load_analogic_extensions(app, extensions_dir=EXTENSIONS_DIR)

    if EXTENSIONS_DIR_EXTRA != '':
        _load_analogic_extensions(app, extensions_dir=EXTENSIONS_DIR_EXTRA)

    if EXTENSIONS_EXTRA:
        for extension_path in EXTENSIONS_EXTRA:
            extension_abs_path = os.path.abspath(os.path.normpath(extension_path))
            extension_folder = os.path.dirname(extension_abs_path)
            extension_name = os.path.basename(extension_abs_path)
            _append_extension_dir_to_path(app, extension_folder)
            _load_module(app, False, extension_name, extension_folder, _register_extension)

    _load_applications(app, register_func=_register_application, module_dirs=APPLICATIONS_DIR)

    if APPLICATIONS_DIR_EXTRA != '':
        _load_applications(app, register_func=_register_application, module_dirs=APPLICATIONS_DIR_EXTRA)

    if APPLICATIONS_EXTRA:
        for application_path in APPLICATIONS_EXTRA:
            application_abs_path = os.path.abspath(os.path.normpath(application_path))
            application_folder = os.path.dirname(application_abs_path)
            application_name = os.path.basename(application_abs_path)
            _append_extension_dir_to_path(app, application_folder)
            _load_module(app, False, application_name, application_folder, _register_application)

    app.register_analogic_url_rules('')

    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, page_error)

    def inject_current_app():
        return {'current_app': current_app}

    app.context_processor(inject_current_app)

    with app.app_context():
        app.evaluate_signal_receivers()
        DefaultSignalReceiver().initialize()

    scheduler.init_app(app)

    if start_scheduler:
        scheduler.start()

    atexit.register(app.on_exit)

    app.register_blueprint(system_endpoints, url_prefix='/system_endpoints')

    return app


def _load_logging(app):
    logs_folder_path = os.path.join(app.instance_path, 'logs')
    if not os.path.exists(logs_folder_path):
        os.makedirs(logs_folder_path)

    with open(os.path.join(app.root_path, 'logging.json')) as file:
        log_config = json.load(file)
        for h in log_config['handlers']:
            if 'filename' in log_config['handlers'][h]:
                file_name = log_config['handlers'][h]['filename']

                log_config['handlers'][h]['filename'] = os.path.join(app.instance_path, file_name)

        logging.config.dictConfig(log_config)


def _load_analogic_extensions(app, extensions_dir):
    _append_extension_dir_to_path(app, extensions_dir)

    for directory in sys.path:
        if os.path.exists(directory) and os.path.isdir(directory) and len(os.listdir(directory)) != 0:
            _load_modules(app, directory, True, register_func=_register_extension)


def _append_extension_dir_to_path(app, modules_dir_name):
    modules_dir = os.path.join(app.instance_path, modules_dir_name)
    if modules_dir not in sys.path and os.path.exists(modules_dir) and len(os.listdir(modules_dir)) != 0:
        sys.path.append(modules_dir)


def _register_extension(app, extension_dir, extension_dir_name, modules):
    _register_extension_components(app, extension_dir_name, modules)
    _register_extension_assets(app, extension_dir)


def _register_extension_assets(app, extension_dir):
    assets = _fast_scan_dir(extension_dir, ['.css', '.js'])[1]
    app.register_extension_assets(assets)


def _register_extension_components(app, extension_name, files):
    for file in files:
        module = extension_name + '.' + file

        if module not in sys.modules:
            print(module + ' not loaded')
            continue

        for name, obj in inspect.getmembers(sys.modules[module]):
            if inspect.isclass(obj) and \
                    not inspect.isabstract(obj) and \
                    issubclass(obj, AuthenticationProvider) and \
                    app.authentication_providers.get(name) is None:
                logging.getLogger(__name__).info('Registering authentication provider ' + extension_name + "." + name)
                app.register_authentication_provider(name, extension_name)

            if inspect.isclass(obj) and \
                    not inspect.isabstract(obj) and \
                    issubclass(obj, SignalReceiver) and \
                    app.signal_receivers.get(name) is None:
                logging.getLogger(__name__).info('Registering signal receiver ' + extension_name + "." + name)
                app.register_signal_receiver(name, extension_name)

            if isinstance(obj, AnalogicEndpoint):
                logging.getLogger(__name__).info('Registering analogic endpoint ' + name)
                app.register_analogic_endpoint(obj)


def _load_applications(app, register_func, module_dirs):
    for module_dir in module_dirs.split(";"):
        modules_dir_path = os.path.join(app.instance_path, module_dir)

        _append_extension_dir_to_path(app, module_dir)

        _load_modules(app, modules_dir_path, False, register_func)


def _load_modules(app, modules_dir, check_prefix, register_func):
    if os.path.isdir(modules_dir):
        for module_dir_name in os.listdir(modules_dir):
            _load_module(app, check_prefix, module_dir_name, modules_dir, register_func)


def _load_module(app, check_prefix, module_dir_name, modules_dir, register_func):
    module_dir = os.path.join(modules_dir, module_dir_name)
    if os.path.isdir(module_dir) and module_dir_name != '.git' and module_dir_name != 'tests' and (
            check_prefix is False or (
            module_dir_name.startswith(ALLOWED_EXTENSION_PREFIX) and not module_dir_name.endswith(
        'dist-info') and not module_dir_name.endswith('egg-info'))):

        # workaround to handle repeating names in module path
        if module_dir_name == modules_dir.rsplit('/', 1)[-1]:  # or module_dir_name == modules_dir.rsplit('\\', 1)[-1]:
            module_dir_name = module_dir_name + '.' + module_dir_name

        files = resources.contents(module_dir_name)

        modules = [f[:-3] for f in files if f.endswith(".py") and f[0] != "_" and 'setup' not in f]
        register_func(app, module_dir, module_dir_name, modules)


def _register_application(app, application_dir, application_name, files):
    _register_extension_components(app, application_name, files)
    assets_extra_dir = os.path.join(application_dir, 'static', 'assets', 'extra')
    if os.path.exists(assets_extra_dir):
        assets_extra = _fast_scan_dir(assets_extra_dir, ['.css', '.js'])[1]
        app.register_extension_assets(assets_extra)

    for file in files:
        module = application_name + '.' + file

        if module not in sys.modules:
            print(module + ' not loaded')
            continue

        for name, obj in inspect.getmembers(sys.modules[module]):
            if isinstance(obj, Blueprint) and app.analogic_applications.get(obj.name) is None:
                app.register_application(application_dir=application_dir, blueprint=obj)
                logging.getLogger(__name__).info(
                    'Registering application ' + application_name + " with blueprint " + name)


def _fast_scan_dir(directory, ext):
    sub_folders, files = [], {}
    if '.git' in directory or 'tests' in directory:
        return sub_folders, files

    for f in os.scandir(directory):
        if f.is_dir():
            sub_folders.append(f.path)
        if f.is_file():
            if os.path.splitext(f.name)[1].lower() in ext:
                files[f.name] = f.path

    for directory in list(sub_folders):
        sf, f = _fast_scan_dir(directory, ext)
        sub_folders.extend(sf)
        files.update(f)
    return sub_folders, files
