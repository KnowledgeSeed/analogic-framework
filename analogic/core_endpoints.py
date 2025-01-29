from analogic.endpoint import AnalogicEndpoint
from analogic.authentication_provider import get_authentication_provider, endpoint_login_required
from analogic.multi_authentication_provider import get_multi_authentication_provider, is_multi_authentication_provider
from flask import request, redirect, render_template, jsonify
from functools import wraps
from analogic.exceptions import AnalogicTM1ServiceException

core_endpoints = AnalogicEndpoint('core_endpoints', __name__)


def upload_admin_permission_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_provider = get_authentication_provider()
        setting = auth_provider.get_setting()

        if not auth_provider.check_app_authenticated():
            return auth_provider.get_authentication_required_response()

        try:
            auth_provider.get_tm1_service()
        except AnalogicTM1ServiceException:
            return auth_provider.get_authentication_required_response()

        if not _has_upload_admin_permission(auth_provider, setting):
            return jsonify({'message': 'Access denied'}), 403

        return f(*args, **kwargs)

    return decorated_function


def _has_upload_admin_permission(auth_provider, setting):
    user_admin_permissions = setting.get_upload_admin_permissions()
    logged_in_user_name = auth_provider.get_logged_in_user_name()
    user_admin_users = setting.get_upload_admin_users()

    has_permission = (
            len(user_admin_permissions) > 0
            and (auth_provider.check_permission(user_admin_permissions)
                 or logged_in_user_name in user_admin_users)
    )
    return has_permission


@core_endpoints.analogic_endpoint_route('/', methods=['GET', 'POST'])
def index():
    authentication_provider = get_authentication_provider()

    navigation_parameters = request.args.get('p')

    if navigation_parameters is not None:
        authentication_provider.set_navigation_parameters(navigation_parameters)
        return redirect(authentication_provider.setting.get_base_url())

    response = authentication_provider.index()

    return response


@core_endpoints.analogic_endpoint_route('/healthy', methods=['GET'])
def healthy():
    authentication_provider = get_multi_authentication_provider() if is_multi_authentication_provider() else get_authentication_provider()
    return authentication_provider.healthy()


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


@core_endpoints.analogic_endpoint_route('/upload_image', methods=['POST'])
@upload_admin_permission_required
def upload_image():
    return get_authentication_provider().upload_image()


@core_endpoints.analogic_endpoint_route('/list_images/<folder_name>', methods=['GET'])
@upload_admin_permission_required
def list_images(folder_name):
    return get_authentication_provider().list_images(folder_name)


@core_endpoints.analogic_endpoint_route('/delete_image/<folder_name>/<file_name>', methods=['DELETE'])
@upload_admin_permission_required
def delete_image(folder_name, file_name):
    return get_authentication_provider().delete_image(folder_name, file_name)
