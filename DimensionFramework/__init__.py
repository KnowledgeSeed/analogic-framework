import os
from flask import Flask, session, Blueprint
import DimensionFramework.AuthenticationProviders.AuthenticationProviderFactory
from DimensionFramework.AuthenticationProviders.Base import Base
from flask_caching import Cache
from datetime import timedelta
import logging.config
import json
import pkgutil
import sys


class DimensionFrameworkApp(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.add_url_rule('/', defaults={'instance': 'default'}, view_func=self.index)
        self.add_url_rule('/<path:instance>', view_func=self.index)
        self.add_url_rule('/<path:instance>/', view_func=self.index)

        self.add_dimension_framework_url_rule('login', ['GET', 'POST'], self.login)
        self.add_dimension_framework_url_rule('pool/<path:sub_path>', ['GET', 'POST', 'PATCH'], self.pool)
        self.add_dimension_framework_url_rule('activeUser', ['GET'],
                                              self.active_user)  # TODO rename activeUser -> active_user
        self.add_dimension_framework_url_rule('auth', ['POST'], self.auth)
        self.add_dimension_framework_url_rule('authsso', ['GET'], self.auth_sso)  # TODO rename authsso -> auth_sso
        self.add_dimension_framework_url_rule('upload', ['POST'], self.upload)
        self.add_dimension_framework_url_rule('export', ['GET', 'POST'], self.export)
        self.add_dimension_framework_url_rule('clearcache', ['GET'], self.clear_cache)
        self.add_dimension_framework_url_rule('ping', ['GET'], self.ping)
        self.add_dimension_framework_url_rule('pivot', ['GET', 'POST'], self.pivot)

    def add_dimension_framework_url_rule(self, url, methods, view_func):
        self.add_url_rule('/' + url, defaults={'instance': 'default'}, methods=methods, view_func=view_func)
        self.add_url_rule('/<path:instance>/' + url, methods=methods, view_func=view_func)

    def index(self, instance):
        return self.get_provider(instance.replace('/', '')).index()

    def login(self, instance):
        return self.get_provider(instance).login()

    def pool(self, instance, sub_path):
        return self.get_provider(instance).pool(sub_path)

    def active_user(self, instance):
        return self.get_provider(instance).activeUser()

    def auth(self, instance):
        return self.get_provider(instance).auth()

    def auth_sso(self, instance):
        return self.get_provider(instance).authsso()

    def upload(self, instance):
        return self.get_provider(instance).processFiles()

    def export(self, instance):
        return self.get_provider(instance).export()

    def clear_cache(self, instance):
        return self.get_provider(instance).setting.clearCache()

    def ping(self, instance):
        return self.get_provider(instance).ping()

    def pivot(self, instance):
        return self.get_provider(instance).pivot()

    def get_provider(self, instance):
        cache = self.get_cache()
        config = Base(cache, self.instance_path, instance).setting.getConfig()

        provider = DimensionFramework.AuthenticationProviders.AuthenticationProviderFactory.getProvider(config, cache,
                                                                                                        self.instance_path,
                                                                                                        instance)

        session.permanent = True
        self.permanent_session_lifetime = timedelta(minutes=config['sessionExpiresInMinutes'] - 1)
        return provider

    def get_cache(self):
        cache_path = os.path.join(self.instance_path, 'cache')
        return Cache(self, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})


def create_app(site_root):
    app = DimensionFrameworkApp(__name__, instance_path=site_root)
    app.secret_key = b'\x18m\x18\\]\xec\xcf\xbd\xf2\x89\xb9\xa3\x06N\x07\xfd'

    load_logging(app)

    load_applications(app)

    return app


def load_logging(app):
    logs_folder_path = os.path.join(app.instance_path, 'logs')
    if not os.path.exists(logs_folder_path):
        os.makedirs(logs_folder_path)

    log_config = json.load(open(os.path.join(app.root_path, 'logging.json')))
    for h in log_config['handlers']:
        if 'filename' in log_config['handlers'][h]:
            log_config['handlers'][h]['filename'] = os.path.join(app.instance_path, log_config['handlers'][h]['filename'])

    logging.config.dictConfig(log_config)


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
                    for obj in vars(vars(vars(loaded_module)[application_dir_name])[mod_name]).values(): #Todo error handling
                        if isinstance(obj, Blueprint):
                            app.register_blueprint(obj)


#
#
# if __name__ == "__main__":
#     app.run()
