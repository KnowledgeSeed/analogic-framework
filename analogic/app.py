import os
from flask import Flask, Blueprint
from flask.scaffold import setupmethod
import typing as t

from analogic.proxy import ReverseProxy
from analogic.endpoint import AnalogicEndpoint
import logging.config
import json
import pkgutil
import sys
from importlib import resources
from analogic.core_endpoints import core_endpoints


class Analogic(Flask):

    def __init__(self, *args, **kwargs):
        self._reverse_proxy_path = kwargs.get('reverse_proxy_path', '')
        kwargs.pop('reverse_proxy_path')
        super().__init__(*args, **kwargs)

        self.analogic_url_rules = []

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

    def register_analogic_endpoint(self, endpoint: "AnalogicEndpoint"):
        self.analogic_url_rules.extend(endpoint.analogic_url_rules)

    @setupmethod
    def register_blueprint(self, blueprint: "Blueprint", **options: t.Any) -> None:
        instance = '/' + blueprint.name
        self.register_analogic_url_rules(instance)

        super().register_blueprint(blueprint, **options)


def create_app(instance_path, reverse_proxy_path=''):
    app = Analogic(__name__, instance_path=instance_path, reverse_proxy_path=reverse_proxy_path)
    app.secret_key = b'\x18m\x18\\]\xec\xcf\xbd\xf2\x89\xb9\xa3\x06N\x07\xfd'

    if reverse_proxy_path != '':
        app.wsgi_app = ReverseProxy(app.wsgi_app, script_name='/' + reverse_proxy_path)

    load_logging(app)

    app.register_analogic_endpoint(core_endpoints)
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


def load_extensions(app):
    extensions_dir_name = 'extensions'
    extensions_dir = os.path.join(app.instance_path, extensions_dir_name)
    for extension_dir_name in os.listdir(extensions_dir):
        extension_dir = os.path.join(extensions_dir, extension_dir_name)
        if os.path.isdir(extension_dir):
            # module = importlib.import_module(extension_dir_name)
            files = resources.contents(extension_dir_name)

            modules = [f[:-3] for f in files if f.endswith(".py") and f[0] != "_"]

            endpoints = list(filter(lambda x: x.endswith('_endpoints'), modules))
            register_analogic_endpoint(app, extension_dir_name, endpoints)


def register_analogic_endpoint(app, extension_name, files):
    for file in files:
        module = extension_name + '.' + file

        if module not in sys.modules:
            print(module + ' not loaded')
            return

        objects = vars(sys.modules[module])

        for obj in objects:
            if isinstance(objects[obj], AnalogicEndpoint):
                app.register_analogic_endpoint(objects[obj])


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
