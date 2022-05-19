from analogic import AnalogicEndpoint
from analogic import get_middleware

ssopool_endpoints = AnalogicEndpoint('ssopool_endpoints', __name__)


@ssopool_endpoints.analogic_endpoint_route('/valami2', methods=['GET'])
def valami2():
    return get_middleware().active_user()


@ssopool_endpoints.analogic_endpoint_route('/authsso', methods=['GET'])
def auth_sso():
    return get_middleware().auth_sso()
