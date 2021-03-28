import os
from flask import Flask
from flask_caching import Cache
import knowledgeseed.AuthenticationProviders.AuthenticationProviderFactory
from knowledgeseed.AuthenticationProviders.Base import Base

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})
site_root = os.path.realpath(os.path.dirname(__file__))
config = Base(cache, site_root).setting.getConfig()
provider = knowledgeseed.AuthenticationProviders.AuthenticationProviderFactory.getProvider(config, cache, site_root)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def index():
    return provider.index()


@app.route('/login', methods=['GET', 'POST'])
def login():
    return provider.login()


@app.route('/pool/<path:sub_path>', methods=['GET', 'POST', 'PATCH'])
def pool(sub_path):
    return provider.pool(sub_path)


@app.route('/auth', methods=['POST'])
def auth():
    return provider.auth()


@app.route('/authsso', methods=['GET'])
def authsso():
    return provider.authsso()


@app.route('/upload', methods=['POST'])
def upload():
    return provider.processFiles()


@app.route('/export', methods=['GET'])
def export():
    return provider.export()


@app.route('/do', methods=['GET', 'POST'])
def do():
    return provider.do()


@app.route('/clearcache')
def clearCache():
    return provider.setting.clearCache()


if __name__ == "__main__":
    app.run()
