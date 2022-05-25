from analogic.endpoint import AnalogicEndpoint
from analogic.authentication_provider import get_authentication_provider

core_endpoints = AnalogicEndpoint('core_endpoints', __name__)


@core_endpoints.analogic_endpoint_route('/', methods=['GET', 'POST'])
def index():
    return get_authentication_provider().index()


@core_endpoints.analogic_endpoint_route('/login', methods=['GET', 'POST'])
def login():
    return get_authentication_provider().login()


@core_endpoints.analogic_endpoint_route('/pool/<path:sub_path>', methods=['GET', 'POST', 'PATCH'])
def pool(sub_path):
    return get_authentication_provider().pool(sub_path)


@core_endpoints.analogic_endpoint_route('/activeUser', methods=['GET'])
def active_user():
    return get_authentication_provider().active_user()


@core_endpoints.analogic_endpoint_route('/auth', methods=['POST'])
def auth():
    return get_authentication_provider().auth()


@core_endpoints.analogic_endpoint_route('/upload', methods=['POST'])
def upload():
    return get_authentication_provider().process_files()


@core_endpoints.analogic_endpoint_route('/export', methods=['GET', 'POST'])
def export():
    return get_authentication_provider().export()


@core_endpoints.analogic_endpoint_route('/clearcache', methods=['GET'])
def clear_cache():
    return get_authentication_provider().setting.clear_cache()


@core_endpoints.analogic_endpoint_route('/ping', methods=['GET'])
def ping():
    return get_authentication_provider().ping()


@core_endpoints.analogic_endpoint_route('/pivot', methods=['GET', 'POST'])
def pivot():
    return get_authentication_provider().pivot()

