import os
from flask import Flask, Blueprint, request, send_file, session, render_template
import typing as t

from analogic.endpoint import AnalogicEndpoint
import logging.config
import json
import sys
from importlib import resources
from analogic.core_endpoints import core_endpoints
from analogic.authentication_provider import AuthenticationProvider
import inspect
from flask_caching import Cache
from analogic.setting import SettingManager
from datetime import timedelta
import importlib

APPLICATIONS_DIR = 'apps'
APPLICATIONS_DIR_EXTRA = os.environ.get('APPLICATIONS_DIR_EXTRA', '')
EXTENSIONS_DIR = 'extensions'
EXTENSIONS_DIR_EXTRA = os.environ.get('EXTENSIONS_DIR_EXTRA', '')
ALLOWED_EXTENSION_PREFIX = 'analogic_'

class Analogic(Flask):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.endpoint_rules = []
        self.authentication_providers = {
            'Cam': 'analogic',
            'LoginBasic': 'analogic',
            'NoLogin': 'analogic'
        }
        self.extension_assets = {}
        self.add_url_rule('/extension_asset', methods=['GET'], view_func=self.extension_asset)
        self.analogic_applications = {}

    def register_analogic_url_rules(self, instance):
        for url_rule in self.endpoint_rules:
            self.add_url_rule(instance + url_rule['rule'],
                              url_rule['endpoint'],
                              view_func=url_rule['view_func'],
                              provide_automatic_options=url_rule['provide_automatic_options'],
                              **url_rule['options'])

    def register_analogic_endpoint(self, endpoint: "AnalogicEndpoint", **options: t.Any):
        self.endpoint_rules.extend(endpoint.endpoint_rules)
        super().register_blueprint(endpoint, **options)

    def register_authentication_provider(self, name, module_name):
        self.authentication_providers[name] = module_name

    def get_authentication_provider_module_name(self, name):
        return self.authentication_providers[name]

    def register_application(self, blueprint: "Blueprint", **options: t.Any) -> None:
        instance = '/' + blueprint.name
        self.register_analogic_url_rules(instance)

        self.analogic_applications[blueprint.name] = True

        super().register_blueprint(blueprint, **options)

    def get_analogic_application(self):
        s = request.path.split('/')
        if len(s) > 2 and s[1] in self.analogic_applications:
            return s[1]
        else:
            return 'default'

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

    def get_authentication_provider(self):
        analogic_application = self.get_analogic_application()
        cache = self._get_cache()

        setting = SettingManager(cache, self.instance_path, analogic_application)
        config = setting.get_config()

        class_name = config['authenticationMode']
        module_name = self.get_authentication_provider_module_name(class_name)

        if module_name in sys.modules:
            module = sys.modules[module_name]
        else:
            module = importlib.import_module(module_name)  # Todo ModuleNotFoundError

        authentication_provider_class = getattr(module, class_name)
        authentication_provider = authentication_provider_class(setting)

        session.permanent = True
        self.permanent_session_lifetime = timedelta(minutes=config['sessionExpiresInMinutes'] - 1)
        return authentication_provider

    def _get_cache(self):
        cache_path = os.path.join(self.instance_path, 'cache')
        return Cache(self, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})


def page_not_found(e):
    return render_template('404.html'), 404


def page_error(e):
    message = ''
    if e.original_exception:
        message += str(e.original_exception)
    return render_template('500.html', message=message), 500


def create_app(instance_path):
    app = Analogic(__name__, instance_path=instance_path)

    app.secret_key = b'\x18m\x18\\]\xec\xcf\xbd\xf2\x89\xb9\xa3\x06N\x07\xfd'

    _load_logging(app)  # Todo overwrite

    app.register_analogic_endpoint(core_endpoints)

    _load_analogic_extensions(app, extensions_dir=EXTENSIONS_DIR)
    _load_analogic_extensions(app, extensions_dir=EXTENSIONS_DIR_EXTRA)

    _load_applications(app, register_func=_register_application, module_dir=APPLICATIONS_DIR)
    _load_applications(app, register_func=_register_application, module_dir=APPLICATIONS_DIR_EXTRA)

    app.register_analogic_url_rules('')

    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, page_error)

    return app


def _load_logging(app):
    logs_folder_path = os.path.join(app.instance_path, 'logs')
    if not os.path.exists(logs_folder_path):
        os.makedirs(logs_folder_path)

    with open(os.path.join(app.root_path, 'logging.json')) as file:
        log_config = json.load(file)
        for h in log_config['handlers']:
            if 'filename' in log_config['handlers'][h]:
                log_config['handlers'][h]['filename'] = os.path.join(app.instance_path,
                                                                     log_config['handlers'][h]['filename'])

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
                    issubclass(obj, AuthenticationProvider):
                app.register_authentication_provider(name, extension_name)

            if isinstance(obj, AnalogicEndpoint):
                app.register_analogic_endpoint(obj)


def _load_applications(app, register_func, module_dir):
    modules_dir = os.path.join(app.instance_path, module_dir)

    _append_extension_dir_to_path(app, module_dir)

    _load_modules(app, modules_dir, False, register_func)


def _load_modules(app, modules_dir, check_prefix, register_func):
    for module_dir_name in os.listdir(modules_dir):
        module_dir = os.path.join(modules_dir, module_dir_name)

        if os.path.isdir(module_dir) and (
                check_prefix is False or (
                module_dir_name.startswith(ALLOWED_EXTENSION_PREFIX) and not module_dir_name.endswith('dist-info'))):
            files = resources.contents(module_dir_name)

            modules = [f[:-3] for f in files if f.endswith(".py") and f[0] != "_"]
            register_func(app, module_dir, module_dir_name, modules)


def _register_application(app, application_dir, application_name, files):
    for file in files:
        module = application_name + '.' + file

        if module not in sys.modules:
            print(module + ' not loaded')
            continue

        for name, obj in inspect.getmembers(sys.modules[module]):
            if isinstance(obj, Blueprint):
                app.register_application(obj)


def _fast_scan_dir(directory, ext):
    sub_folders, files = [], {}

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
