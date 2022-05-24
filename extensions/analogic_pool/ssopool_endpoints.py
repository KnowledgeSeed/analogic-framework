from analogic import AnalogicEndpoint
from analogic import get_authentication_provider
from analogic import endpoint_login_required
from flask import render_template

ssopool_endpoints = AnalogicEndpoint('ssopool_endpoints', __name__, template_folder='test_templates',
                                     static_folder='static', static_url_path='/ssopool')


@ssopool_endpoints.analogic_endpoint_route('/test_analogic_endpoint', methods=['GET'])
@endpoint_login_required
def test_analogic_endpoint():
    return get_authentication_provider().test_analogic_endpoint()


@ssopool_endpoints.route('/test_flask_endpoint', methods=['GET'])
def test_flask_endpoint():
    return render_template('test_flask_endpoint.html')


@ssopool_endpoints.analogic_endpoint_route('/authsso', methods=['GET'])
def auth_sso():
    return get_authentication_provider().auth_sso()
