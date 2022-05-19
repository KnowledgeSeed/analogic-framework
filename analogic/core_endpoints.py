from analogic.endpoint import AnalogicEndpoint
from analogic.middleware import get_middleware

core_endpoints = AnalogicEndpoint('core_endpoints', __name__)


@core_endpoints.analogic_endpoint_route('/', methods=['GET', 'POST'])
def index():
    return get_middleware().index()


@core_endpoints.analogic_endpoint_route('/login', methods=['GET', 'POST'])
def login():
    return get_middleware().login()


@core_endpoints.analogic_endpoint_route('/pool/<path:sub_path>', methods=['GET', 'POST', 'PATCH'])
def pool(sub_path):
    return get_middleware().pool(sub_path)


@core_endpoints.analogic_endpoint_route('/activeUser', methods=['GET'])
def active_user():
    return get_middleware().active_user()


@core_endpoints.analogic_endpoint_route('/auth', methods=['POST'])
def auth():
    return get_middleware().auth()


@core_endpoints.analogic_endpoint_route('/upload', methods=['POST'])
def upload():
    return get_middleware().process_files()


@core_endpoints.analogic_endpoint_route('/export', methods=['GET', 'POST'])
def export():
    return get_middleware().export()


@core_endpoints.analogic_endpoint_route('/clearcache', methods=['GET'])
def clear_cache():
    return get_middleware().setting.clearCache()


@core_endpoints.analogic_endpoint_route('/ping', methods=['GET'])
def ping():
    return get_middleware().ping()


@core_endpoints.analogic_endpoint_route('/pivot', methods=['GET', 'POST'])
def pivot():
    return get_middleware().pivot()
