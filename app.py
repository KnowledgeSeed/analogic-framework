import os
import AuthenticationProviders.AuthenticationProviderFactory
from flask import Flask, request
from TM1py.Services import TM1Service
from flask_caching import Cache
from AuthenticationProviders.Base import Base

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})
site_root = os.path.realpath(os.path.dirname(__file__))
config = Base(cache, site_root).getConfig()
provider = AuthenticationProviders.AuthenticationProviderFactory.getProvider(config, cache, site_root)
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


@app.route('/pivottest')
def pivottest():
    address = "https://hq.coresystems.hu:5125/analogicadminapi"
    ssl = False
    # tm1 = TM1Service(base_url=address, session_id=request.cookies.get('TM1SessionId'), ssl=ssl)
    # nv = tm1.cubes.views.get_native_view('zSYS Analogic UI FileUpload Config', 'Teszt', private=False)

    NAMESPACE = "knowledgeseed"
    USER = "oravecz.tamas"
    PWD = "TomiNewPass1212%"
    SSL = False
    tm1 = TM1Service(base_url=address, namespace=NAMESPACE, user=USER, password=PWD, ssl=SSL)
    nv = tm1.cubes.views.get_native_view('zSYS Analogic UI FileUpload Preprocessing Setting',
                                         'Template_SettingReadView_for_tm1py', private=False)
    mdx = "SELECT {[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[ExtensionCheck],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[ForcedTargetName],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileFormat],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[HeaderCheck],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileColumnDelimiter],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileQuoteCharacter],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileNoneEmptyCheck],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[ExpectedColumnNr],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[CharacterSetCheck],[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[Backup Before Override]} on ROWS,  on COLUMNS  FROM [zSYS Analogic UI FileUpload Preprocessing Setting] WHERE ([zSYS Analogic UI FileUpload Processing Template].[Template1])"
    pnl_data = tm1.cubes.cells.execute_mdx_raw(nv.MDX)
    param_values = pnl_data.get('Cells')
    d = nv.MDX
    return d


@app.route('/clearcache')
def clearCache():
    return provider.clearCache()
