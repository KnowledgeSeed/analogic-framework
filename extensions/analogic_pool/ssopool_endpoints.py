from analogic import AnalogicEndpoint
from analogic import get_middleware

ssopool_endpoints = AnalogicEndpoint('ssopool_endpoints', __name__)


@ssopool_endpoints.analogic_endpoint_route('/valami2', methods=['GET'])
def valami2():
    return get_middleware().activeUser()
