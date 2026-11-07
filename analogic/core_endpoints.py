from analogic.endpoint import AnalogicEndpoint
from analogic.authentication_provider import get_authentication_provider, endpoint_login_required
from analogic.multi_authentication_provider import get_multi_authentication_provider, is_multi_authentication_provider
from flask import request, redirect, render_template, jsonify, Response, current_app
from functools import wraps
from analogic.exceptions import AnalogicTM1ServiceException

import mimetypes
import os
import traceback

from flask import g, send_file

from analogic import bundles

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

    authentication_provider.add_page_meta_data_info()

    # Read before index(): rendering the widget page pops them.
    navigation_pending = bool(authentication_provider.get_navigation_parameters())

    response = authentication_provider.index()

    main_bundle = authentication_provider.get_setting().get_config().get('mainBundle')
    # ?p= navigation into a widget page (ctx.navigate({page})) still opens the widget pipeline once.
    if (main_bundle and _is_page(response) and authentication_provider.check_app_authenticated()
            and not navigation_pending):
        return _bundle_page(authentication_provider, main_bundle)

    return response


def _is_page(response):
    status = response[1] if isinstance(response, tuple) and len(response) > 1 else getattr(response, 'status_code', 200)
    return status == 200


def _bundle_page(authentication_provider, name):
    setting = authentication_provider.get_setting()
    config = setting.get_config()
    try:
        manifest = bundles.load_manifest(setting.site_root, name, config.get('clientSecurity'))
    except bundles.BundleError as e:
        current_app.logger.error('Bundle %s of %s: %s', name, setting.get_instance(), e)
        return render_template('500.html'), 500
    if manifest is None:
        return authentication_provider.get_not_found_response()
    g.analogic_bundle_page_manifest = manifest
    base = setting.get_base_url().rstrip('/') + '/'
    boot = {
        'bundle': name,
        'baseUrl': base,
        'bundleUrl': base + 'bundles/' + name + '/',
        'entry': manifest['entry'],
        'csrfToken': bundles.csrf_token(authentication_provider.session_handler),
        'user': authentication_provider.get_logged_in_user_name(),
        'permissions': [p for p in authentication_provider.get_permission_list() if p],
        'config': bundles.public_config(config),
        'dataSources': manifest['dataSources'],
    }
    return render_template('bundle.html', cnf=config, manifest=manifest, boot=boot, bundle_name=name)


@core_endpoints.analogic_endpoint_route('/b/<name>', methods=['GET'])
def bundle_page(name):
    authentication_provider = get_authentication_provider()
    if not bundles.NAME_PATTERN.match(name):
        return authentication_provider.get_not_found_response()
    if not authentication_provider.check_app_authenticated():
        return redirect(authentication_provider.get_setting().get_base_url())
    return _bundle_page(authentication_provider, name)


@core_endpoints.analogic_endpoint_route('/bundles/<name>/<path:file_path>', methods=['GET'])
@endpoint_login_required
def bundle_file(name, file_path):
    authentication_provider = get_authentication_provider()
    setting = authentication_provider.get_setting()
    try:
        root = bundles.bundle_root(setting.site_root, name)
    except bundles.BundleError:
        return authentication_provider.get_not_found_response()
    path = bundles.safe_path(root, file_path)
    if path is None or not os.path.isfile(path) or os.path.basename(path) == bundles.MANIFEST:
        return authentication_provider.get_not_found_response()
    mimetype = 'text/javascript' if path.endswith(('.js', '.mjs')) else mimetypes.guess_type(path)[0]
    response = send_file(path, mimetype=mimetype or 'application/octet-stream', max_age=0, conditional=True)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Cache-Control'] = 'private, no-cache'
    return response


@core_endpoints.analogic_endpoint_route('/bundle_session/<name>', methods=['GET'])
@endpoint_login_required
def bundle_session(name):
    authentication_provider = get_authentication_provider()
    setting = authentication_provider.get_setting()
    try:
        manifest = bundles.load_manifest(setting.site_root, name, setting.get_config().get('clientSecurity'))
    except bundles.BundleError:
        manifest = None
    if manifest is None:
        return authentication_provider.get_not_found_response()
    return jsonify({'user': authentication_provider.get_logged_in_user_name(),
                    'permissions': [p for p in authentication_provider.get_permission_list() if p],
                    'csrfToken': bundles.csrf_token(authentication_provider.session_handler),
                    'dataSources': manifest['dataSources']})

@core_endpoints.analogic_endpoint_route('/sitemap.xml', methods=['GET'])
def sitemap():
    authentication_provider = get_authentication_provider()
    sitemap_data = authentication_provider.generate_sitemap()
    response = Response(sitemap_data, mimetype='application/xml')
    response.headers['Cache-Control'] = 'public, max-age=3600'
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
    authentication_provider = get_authentication_provider()
    return bundles.guard_data_request(authentication_provider, 'proxy', sub_path) or authentication_provider.proxy(sub_path)


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
    authentication_provider = get_authentication_provider()
    return bundles.guard_data_request(authentication_provider, 'export') or authentication_provider.export()


@core_endpoints.analogic_endpoint_route('/clearcache', methods=['GET'])
def clear_cache():
    return get_authentication_provider().clear_cache()


@core_endpoints.analogic_endpoint_route('/pivot', methods=['GET', 'POST'])
def pivot():
    refusal = bundles.guard_data_request(get_authentication_provider(), 'pivot')
    if refusal:
        return refusal
    try:
        response = get_authentication_provider().pivot()
        return response
    except IndexError as ie:
        current_app.logger.error(f"IndexError during pivot export: {ie}\n{traceback.format_exc()}")
        error_message = "Error generating report: Invalid data or configuration resulted in an index error. Please check your selections."
        return jsonify({"error": error_message}), 400
    except ValueError as ve:
        current_app.logger.error(f"ValueError during pivot export: {ve}\n{traceback.format_exc()}")
        error_message = f"Error generating report: Invalid value encountered ({ve}). Please check your data."
        return jsonify({"error": error_message}), 400
    except Exception as e:
        current_app.logger.error(f"Unexpected error during pivot export: {e}\n{traceback.format_exc()}")
        error_message = "An unexpected server error occurred while generating the report. Please try again later or contact support."
        return jsonify({"error": error_message}), 500


@core_endpoints.analogic_endpoint_route('/middleware', methods=['GET', 'POST'])
def middleware():
    authentication_provider = get_authentication_provider()
    return bundles.guard_data_request(authentication_provider, 'middleware') or authentication_provider.middleware()


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
