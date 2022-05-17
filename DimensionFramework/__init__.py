import os
from flask import Flask, session, Blueprint, request
from flask.scaffold import setupmethod
import typing as t
from DimensionFramework.AuthenticationProviders.Base import Base
from DimensionFramework.Core.ReverseProxy import ReverseProxy
from DimensionFramework.Core.AnalogicEndpoint import AnalogicEndpoint
from DimensionFramework.Core.AnalogicEndpointBlueprint import AnalogicEndpointBlueprint
from flask_caching import Cache
from datetime import timedelta
import logging.config
import json
import pkgutil
import sys
import importlib
import functools
from importlib import resources


class DimensionFrameworkApp(Flask):

    def __init__(self, *args, **kwargs):
        self._reverse_proxy_path = kwargs.get('reverse_proxy_path', '')
        kwargs.pop('reverse_proxy_path')
        super().__init__(*args, **kwargs)

        self.analogic_url_rules = []

        self.add_analogic_url_rule('/', methods=['GET', 'POST'], view_func=self.index)
        self.add_analogic_url_rule('/login', methods=['GET', 'POST'], view_func=self.login)
        self.add_analogic_url_rule('/pool/<path:sub_path>', methods=['GET', 'POST', 'PATCH'], view_func=self.pool)
        self.add_analogic_url_rule('/activeUser', methods=['GET'],
                                   view_func=self.active_user)  # TODO rename activeUser -> active_user
        self.add_analogic_url_rule('/auth', methods=['POST'], view_func=self.auth)
        self.add_analogic_url_rule('/authsso', methods=['GET'],
                                   view_func=self.auth_sso)  # TODO rename authsso -> auth_sso
        self.add_analogic_url_rule('/upload', methods=['POST'], view_func=self.upload)
        self.add_analogic_url_rule('/export', methods=['GET', 'POST'], view_func=self.export)
        self.add_analogic_url_rule('/clearcache', methods=['GET'], view_func=self.clear_cache)
        self.add_analogic_url_rule('/ping', methods=['GET'], view_func=self.ping)
        self.add_analogic_url_rule('/pivot', methods=['GET', 'POST'], view_func=self.pivot)

    def get_reverse_proxy_path(self):
        return self._reverse_proxy_path

    def add_analogic_url_rule(self,
                              rule: str,
                              endpoint: t.Optional[str] = None,
                              view_func: t.Optional[t.Callable] = None,
                              provide_automatic_options: t.Optional[bool] = None,
                              **options: t.Any):

        self.analogic_url_rules.append({
            'rule': rule,
            'endpoint': endpoint,
            'view_func': view_func,
            'provide_automatic_options': provide_automatic_options,
            'options': options
        })

    def register_analogic_url_rules(self, instance):
        for url_rule in self.analogic_url_rules:
            self.add_url_rule(instance + url_rule['rule'],
                              url_rule['endpoint'],
                              view_func=url_rule['view_func'],
                              provide_automatic_options=url_rule['provide_automatic_options'],
                              **url_rule['options'])

    def register_analogic_endpoint_blueprint(self, blueprint: "AnalogicEndpointBlueprint"):
        self.analogic_url_rules.extend(blueprint.analogic_url_rules)

    @setupmethod
    def register_blueprint(self, blueprint: "Blueprint", **options: t.Any) -> None:

        instance = '/' + blueprint.name
        self.register_analogic_url_rules(instance)

        super().register_blueprint(blueprint, **options)

    @staticmethod
    def get_analogic_instance():
        s = request.path.split('/')
        if len(s) > 1:
            return s[1]
        else:
            return 'default'

    def index(self):
        return self.get_provider().index()

    def login(self):
        return self.get_provider().login()

    def pool(self, sub_path):
        return self.get_provider().pool(sub_path)

    def active_user(self):
        return self.get_provider().activeUser()

    def auth(self):
        return self.get_provider().auth()

    def auth_sso(self):
        return self.get_provider().authsso()

    def upload(self):
        return self.get_provider().processFiles()

    def export(self):
        return self.get_provider().export()

    def clear_cache(self):
        return self.get_provider().setting.clearCache()

    def ping(self):
        return self.get_provider().ping()

    def pivot(self):
        return self.get_provider().pivot()

    def get_provider(self):
        instance = self.get_analogic_instance()
        cache = self.get_cache()
        config = Base(cache, self.instance_path, instance).setting.getConfig()

        module_name, class_name = config['authenticationMode'].rsplit(".", 1)

        if module_name in sys.modules:
            module = sys.modules[module_name]
        else:
            module = importlib.import_module(module_name)  # Todo ModuleNotFoundError

        provider_class = getattr(module, class_name)
        provider = provider_class(cache, self.instance_path, instance)

        session.permanent = True
        self.permanent_session_lifetime = timedelta(minutes=config['sessionExpiresInMinutes'] - 1)
        return provider

    def get_cache(self):
        cache_path = os.path.join(self.instance_path, 'cache')
        return Cache(self, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})


def create_app(instance_path, reverse_proxy_path=''):
    app = DimensionFrameworkApp(__name__, instance_path=instance_path, reverse_proxy_path=reverse_proxy_path)
    app.secret_key = b'\x18m\x18\\]\xec\xcf\xbd\xf2\x89\xb9\xa3\x06N\x07\xfd'

    if reverse_proxy_path != '':
        app.wsgi_app = ReverseProxy(app.wsgi_app, script_name='/' + reverse_proxy_path)

    load_logging(app)

    load_dd(app)

    load_extensions(app)

    load_applications(app)

    app.register_analogic_url_rules('')

    return app


def load_logging(app):
    logs_folder_path = os.path.join(app.instance_path, 'logs')
    if not os.path.exists(logs_folder_path):
        os.makedirs(logs_folder_path)

    log_config = json.load(open(os.path.join(app.root_path, 'logging.json')))
    for h in log_config['handlers']:
        if 'filename' in log_config['handlers'][h]:
            log_config['handlers'][h]['filename'] = os.path.join(app.instance_path,
                                                                 log_config['handlers'][h]['filename'])

    logging.config.dictConfig(log_config)


def load_dd(app):
    extensions_dir_name = 'extensions'
    extensions_dir = os.path.join(app.instance_path, extensions_dir_name)
    for extension_dir_name in os.listdir(extensions_dir):
        extension_dir = os.path.join(extensions_dir, extension_dir_name)
        if os.path.isdir(extension_dir):
            # module = importlib.import_module(extension_dir_name)
            files = resources.contents(extension_dir_name)

            modules = [f[:-3] for f in files if f.endswith(".py") and f[0] != "_"]

            endpoints = list(filter(lambda x: x.endswith('AnalogicEndpoint'), modules))
            load_analogic_endpoints(app, extension_dir_name, endpoints)

            blueprints = list(filter(lambda x: x.endswith('endpointblueprint'), modules))
            register_analogic_endpoint_blueprints(app, extension_dir_name, blueprints)

            print('t')


def register_analogic_endpoint_blueprints(app, extension_name, files):
    for file in files:
        module = extension_name + '.' + file

        objects = vars(sys.modules[module])

        if isinstance(objects[file], AnalogicEndpointBlueprint):
            app.register_analogic_endpoint_blueprint(objects[file])


def load_analogic_endpoints(app, extension_name, endpoints):
    for endpoint in endpoints:
        module = extension_name + '.' + endpoint

        if module not in sys.modules:
            print(module + ' not loaded')
            return

        classes = vars(sys.modules[module])

        if endpoint not in classes:
            print(endpoint + ' class not found in ' + module)
            return

        if AnalogicEndpoint not in classes[endpoint].__bases__:
            print(endpoint + ' class does not inherit AnalogicEndpoint')
            return

        functions = [func for func in dir(classes[endpoint]) if
                     callable(getattr(classes[endpoint], func)) and func[0] != '_']

        for function in functions:
            app.add_analogic_url_rule('/' + function, methods=['GET'], view_func=getattr(classes[endpoint], function))

        print('ok')


def load_extensions(app):
    extensions_dir_name = 'extensions'
    extensions_dir = os.path.join(app.instance_path, extensions_dir_name)
    for extension_dir_name in os.listdir(extensions_dir):
        extension_dir = os.path.join(extensions_dir, extension_dir_name)

        extensions = pkgutil.iter_modules(path=[extension_dir])
        for loader, mod_name, is_pkg in extensions:
            class_name = extensions_dir_name + '.' + extension_dir_name + '.' + mod_name
            if mod_name != 'setup' and mod_name not in sys.modules:
                print(class_name)
                loaded_module = __import__(class_name)
                # if 'AnalogicEndpoint' in mod_name:
                # vars(vars(vars(loaded_module)[extension_dir_name])[mod_name])[mod_name].__bases__[0] is AnalogicEndpoint
                if mod_name == 'extension':
                    for obj in vars(
                            vars(vars(loaded_module)[extension_dir_name])[mod_name]).values():  # Todo error handling
                        if isinstance(obj, Blueprint):
                            app.register_blueprint(obj)


def load_applications(app):
    applications_dir_name = 'applications'
    applications_dir = os.path.join(app.instance_path, applications_dir_name)
    for application_dir_name in os.listdir(applications_dir):
        application_dir = os.path.join(applications_dir, application_dir_name)

        applications = pkgutil.iter_modules(path=[application_dir])
        for loader, mod_name, is_pkg in applications:
            class_name = applications_dir_name + '.' + application_dir_name + '.' + mod_name
            if mod_name not in sys.modules:
                loaded_module = __import__(class_name)
                if mod_name == 'application':
                    for obj in vars(
                            vars(vars(loaded_module)[application_dir_name])[mod_name]).values():  # Todo error handling
                        if isinstance(obj, Blueprint):
                            app.register_blueprint(obj)

#
#
# if __name__ == "__main__":
#     app.run()
