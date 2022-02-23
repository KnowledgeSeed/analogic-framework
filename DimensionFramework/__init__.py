import os
import redis
from flask import Flask, session, request
from flask_caching import Cache
import DimensionFramework.AuthenticationProviders.AuthenticationProviderFactory
from DimensionFramework.AuthenticationProviders.Base import Base
from datetime import timedelta
from logging.handlers import RotatingFileHandler
import logging
import json_logging

app = Flask(__name__)
site_root = os.path.realpath(os.path.dirname(__file__))
app.secret_key = b'\x18m\x18\\]\xec\xcf\xbd\xf2\x89\xb9\xa3\x06N\x07\xfd'


@app.route('/', defaults={'instance': 'default'})
@app.route('/<path:instance>')
@app.route('/<path:instance>/')
def index(instance):
    return getProvider(instance).index()


@app.route('/login', defaults={'instance': 'default'}, methods=['GET', 'POST'])
@app.route('/<path:instance>/login', methods=['GET', 'POST'])
def login(instance):
    return getProvider(instance).login()


@app.route('/pool/<path:sub_path>', defaults={'instance': 'default'}, methods=['GET', 'POST', 'PATCH'])
@app.route('/<path:instance>/pool/<path:sub_path>', methods=['GET', 'POST', 'PATCH'])
def pool(instance, sub_path):
    return getProvider(instance).pool(sub_path)


@app.route('/activeUser', defaults={'instance': 'default'}, methods=['GET'])
@app.route('/<path:instance>/activeUser', methods=['GET'])
def activeUser(instance):
    return getProvider(instance).activeUser()


@app.route('/auth', defaults={'instance': 'default'}, methods=['POST'])
@app.route('/<path:instance>/auth', methods=['POST'])
def auth(instance):
    return getProvider(instance).auth()


@app.route('/authsso', defaults={'instance': 'default'}, methods=['GET'])
@app.route('/<path:instance>/authsso', methods=['GET'])
def authsso(instance):
    return getProvider(instance).authsso()


@app.route('/upload', defaults={'instance': 'default'}, methods=['POST'])
@app.route('/<path:instance>/upload', methods=['POST'])
def upload(instance):
    return getProvider(instance).processFiles()


@app.route('/export', defaults={'instance': 'default'}, methods=['GET', 'POST'])
@app.route('/<path:instance>/export', methods=['GET', 'POST'])
def export(instance):
    return getProvider(instance).export()


@app.route('/do', defaults={'instance': 'default'}, methods=['GET', 'POST'])
@app.route('/<path:instance>/do', methods=['GET', 'POST'])
def do(instance):
    return getProvider(instance).do()


@app.route('/clearcache', defaults={'instance': 'default'})
@app.route('/<path:instance>/clearcache')
def clearCache(instance):
    return getProvider(instance).setting.clearCache()


@app.route('/exportconfig/<path:config_type>', defaults={'instance': 'default'})
@app.route('/<path:instance>/exportconfig/<path:config_type>')
def exportConfig(instance, config_type):
    return getProvider(instance).exportConfig(config_type)


@app.route('/ping', defaults={'instance': 'default'})
@app.route('/<path:instance>/ping')
def ping(instance):
    return getProvider(instance).ping()


@app.route('/pivot', defaults={'instance': 'default'}, methods=['GET', 'POST'])
@app.route('/<path:instance>/pivot', methods=['GET', 'POST'])
def pivot(instance):
    return getProvider(instance).pivot()


def getProvider(instance):
    cache = getCache()
    config = Base(cache, site_root, instance).setting.getConfig()

    if 'logFolder' in config:
        log_folder_root = config['logFolder']
    else:
        log_folder_root = os.path.join(os.path.dirname(__file__), 'logs')


    logger = logging.getLogger('login')
    if not logger.hasHandlers():
        json_logging.ENABLE_JSON_LOGGING = True
        json_logging.init_flask(enable_json=True)
        log_file_name = os.path.join(log_folder_root, 'login.log')
        handler = RotatingFileHandler(log_file_name, maxBytes=1000000, backupCount=10)
        formatter = json_logging.JSONLogFormatter(
            '%(asctime)s :: %(levelname)s :: %(name)s :: %(lineno)d :: %(funcName)s() :: %(message)s :: %(process)d - %(threadName)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    log_file_name = os.path.join(log_folder_root, 'application.log')
    logging.basicConfig(
        handlers=[RotatingFileHandler(log_file_name, maxBytes=1000000, backupCount=10)],
        level=logging.INFO,
        format='%(asctime)s :: %(levelname)s :: %(name)s :: %(lineno)d :: %(funcName)s() :: %(message)s :: %(process)d - %(threadName)s',
        datefmt='%Y-%m-%dT%H:%M:%S')

    json_logging.config_root_logger()

    provider = DimensionFramework.AuthenticationProviders.AuthenticationProviderFactory.getProvider(config, cache,
                                                                                                    site_root,
                                                                                                    instance)

    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=config['sessionExpiresInMinutes'] - 1)
    return provider


def getCache():
    cache_path = os.path.join(os.path.dirname(__file__), 'cache')
    return Cache(app, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})


# only local or linux
def getRedisCache():
    try:
        cache = Cache(app, config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})
        cache.get('test')
        return cache
    except redis.ConnectionError as e:
        app.logger.info('Unable to connect to redis')
        return None


if __name__ == "__main__":
    app.run()
