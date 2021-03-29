import os
import redis
from flask import Flask
from flask_caching import Cache
import knowledgeseed.AuthenticationProviders.AuthenticationProviderFactory
from knowledgeseed.AuthenticationProviders.Base import Base

app = Flask(__name__)
site_root = os.path.realpath(os.path.dirname(__file__))
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


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


@app.route('/export', defaults={'instance': 'default'}, methods=['GET'])
@app.route('/<path:instance>/export', methods=['GET'])
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


def getProvider(instance):
    cache = getCache()
    config = Base(cache, site_root, instance).setting.getConfig()
    provider = knowledgeseed.AuthenticationProviders.AuthenticationProviderFactory.getProvider(config, cache, site_root,
                                                                                               instance)
    return provider


def getCache():
    try:
        cache = Cache(app, config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})
        cache.get('test')
        return cache
    except redis.ConnectionError as e:
        app.logger.info('Unable to connect to redis')
        return None


if __name__ == "__main__":
    app.run()
