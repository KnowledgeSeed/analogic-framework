from analogic.endpoint import AnalogicEndpoint
from analogic.authentication_provider import get_authentication_provider, endpoint_login_required
from flask import request, redirect, render_template

core_endpoints = AnalogicEndpoint('core_endpoints', __name__)


@core_endpoints.analogic_endpoint_route('/', methods=['GET', 'POST'])
def index():
    authentication_provider = get_authentication_provider()

    navigation_parameters = request.args.get('p')

    if navigation_parameters is not None:
        authentication_provider.set_navigation_parameters(navigation_parameters)
        return redirect(authentication_provider.setting.get_base_url())

    response = authentication_provider.index()

    return response


@core_endpoints.analogic_endpoint_route('/navigation_parameters', methods=['GET'])
def navigation_parameters():
    authentication_provider = get_authentication_provider()

    navigation_parameters = authentication_provider.get_navigation_parameters()

    if navigation_parameters is not None:
        authentication_provider.clear_navigation_parameters()

    return {'navigation_parameters': navigation_parameters}, 200, {'Content-type': 'application/json'}


@core_endpoints.analogic_endpoint_route('/start_maintenance', methods=['GET', 'POST'])
@endpoint_login_required
def start_maintenance():
    authentication_provider = get_authentication_provider()
    if authentication_provider.is_user_framework_admin() is False:
        return "You are not authorized to start maintenance", 403
    if request.method == 'POST':
        authentication_provider.is_in_maintenance = True
        authentication_provider.maintenance_message = request.form.get('message', 'Maintenance in progress')
        return "Maintenance mode started", 200
    return render_template('start_maintenance.html', cnf=authentication_provider.get_setting().get_config()), 200


@core_endpoints.analogic_endpoint_route('/stop_maintenance', methods=['GET'])
def stop_maintenance():
    authentication_provider = get_authentication_provider()
    if authentication_provider.is_user_framework_admin() is False:
        return "You are not authorized to stop maintenance", 403
    authentication_provider.is_in_maintenance = False
    return "Maintenance mode stopped", 200


@core_endpoints.analogic_endpoint_route('/login', methods=['GET', 'POST'])
def login():
    return get_authentication_provider().login()


@core_endpoints.analogic_endpoint_route('/proxy/<path:sub_path>', methods=['GET', 'POST', 'PATCH'])
def proxy(sub_path):
    return get_authentication_provider().proxy(sub_path)


@core_endpoints.analogic_endpoint_route('/activeUser', methods=['GET'])
def active_user():
    return get_authentication_provider().active_user()


@core_endpoints.analogic_endpoint_route('/auth', methods=['POST'])
def auth():
    return get_authentication_provider().auth()


@core_endpoints.analogic_endpoint_route('/logout', methods=['GET'])
def logout():
    return get_authentication_provider().logout()


@core_endpoints.analogic_endpoint_route('/export', methods=['GET', 'POST'])
def export():
    return get_authentication_provider().export()


@core_endpoints.analogic_endpoint_route('/clearcache', methods=['GET'])
def clear_cache():
    return get_authentication_provider().clear_cache()


@core_endpoints.analogic_endpoint_route('/pivot', methods=['GET', 'POST'])
def pivot():
    return get_authentication_provider().pivot()


@core_endpoints.analogic_endpoint_route('/middleware', methods=['GET', 'POST'])
def middleware():
    return get_authentication_provider().middleware()
