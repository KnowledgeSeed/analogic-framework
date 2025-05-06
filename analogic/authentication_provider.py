from flask import session, current_app, send_file, request, jsonify, Response, redirect, make_response
from analogic.loader import ClassLoader
import analogic.pivot as PivotApi
from analogic.exceptions import AnalogicProxyException, AnalogicAccessDeniedException, AnalogicException, \
    AnalogicAcceptedException
from analogic.session_handler import SessionHandler
from analogic.request_logger import RequestLogger
from analogic.setting import SettingManager
import logging
import pandas as pd
from abc import ABC, abstractmethod
from analogic.signals import before_call_do_proxy
from functools import wraps
import orjson
import os
from werkzeug.utils import secure_filename
import base64

pd.set_option('display.float_format', lambda x: '%.3f' % x)


def get_authentication_provider():
    return current_app.get_authentication_provider()


def endpoint_login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_provider = get_authentication_provider()
        if auth_provider.check_app_authenticated() is False:
            return auth_provider.get_authentication_required_response()
        return f(*args, **kwargs)

    return decorated_function


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_provider = args[0]
        if auth_provider.check_app_authenticated() is False:
            return auth_provider.get_authentication_required_response()
        return f(*args, **kwargs)

    return decorated_function

def login_required_redirect_index(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_provider = args[0]
        if auth_provider.check_app_authenticated() is False:
            return redirect(auth_provider.get_setting().get_base_url())
        return f(*args, **kwargs)

    return decorated_function


def check_access(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_provider = args[0]
        try:
            if auth_provider.has_access(kwargs.get('force_server_side_query')) is False:
                return auth_provider.get_access_denied_response()
        except Exception as e:
            return {'message': str(e)}, 400, {'Content-Type': 'application/json'}
        return f(*args, **kwargs)

    return decorated_function


class AuthenticationProvider(ABC):
    HEADERS = {'Connection': 'keep-alive',
               'User-Agent': 'Analogic',
               'Content-Type': 'application/json; odata.streaming=true; charset=utf-8',
               'Accept': 'application/json;odata.metadata=none,text/plain',
               'Accept-Encoding': 'gzip, deflate, br',
               'TM1-SessionContext': 'Analogic'}

    def __init__(self, setting):
        self.setting = setting
        self.logged_in_user_session_name = '_logged_in_user_name'
        self._logger = logging.getLogger(self.setting.get_instance())
        self.session_handler = SessionHandler(self.setting.get_instance_and_name())
        self.request_logger = RequestLogger()
        self.user_subscriptions = {}
        self.is_in_maintenance = False
        self.maintenance_message = ''

    def initialize(self):
        self.setting.initialize()

    def get_setting(self):
        return self.setting

    def is_user_framework_admin(self):
        cnf = self.setting.get_config()
        if cnf.get('_frameworkAdminUsers') is not None:
            return self.get_logged_in_user_name() in cnf['_frameworkAdminUsers']
        return False

    def get_logged_in_user_name(self):
        return self.session_handler.get(self.logged_in_user_session_name)

    def set_navigation_parameters(self, value):
        self.session_handler.set('navigation_parameters', value)

    def get_navigation_parameters(self):
        return self.session_handler.get('navigation_parameters')

    def pop_navigation_parameters(self):
        navigation_parameters = self.get_navigation_parameters()
        self.clear_navigation_parameters()
        return navigation_parameters


    @login_required_redirect_index
    def handle_named_route(self, named_route, **kwargs):

        if named_route not in self.get_setting().get_named_routes():
            return "Not found", 404

        parts = kwargs.get('sub_path', '').split("/")

        result = {f"navigationParameter{i + 1}": part for i, part in enumerate(parts)}
        result['page'] = named_route.replace('/', '')
        result['sub_path'] = named_route + '/' + kwargs.get('sub_path', '')

        self.session_handler.set('navigation_parameters', base64.b64encode(orjson.dumps(result)).decode('utf-8'))

        response = self.index()

        return make_response(response)

    def clear_navigation_parameters(self):
        self.session_handler.delete('navigation_parameters')

    @login_required
    def pivot(self):
        username = self.get_logged_in_user_name()

        v = request.values
        cube_name = v.get('cube_name')
        dimension_name = v.get('dimension_name')
        hierarchy_name = v.get('hierarchy_name')
        subset_name = v.get('subset_name')
        element_names = v.getlist('element_names[]')
        subset_name_to_remove = v.get('subset_name_to_remove')
        selected_cards = v.get('selected_cards')
        options = orjson.loads(v.get('options', '{}'))
        export_data = v.get('export_data')

        return PivotApi.call(self.get_tm1_service(), username, cube_name, dimension_name, hierarchy_name, subset_name,
                             element_names, subset_name_to_remove, selected_cards, options, export_data)

    @login_required
    def export(self):

        file_name = request.args.get('file_name', default='export.xlsx')
        export_key = request.args.get('export_key')

        if export_key is None:
            return self.get_not_found_response()

        export_description = self.setting.get_custom_object_description(export_key)

        if export_description is None:
            return self.get_not_found_response()

        try:
            response = ClassLoader().call(export_description, request, self.get_tm1_service(), self.setting, self)
        except Exception as e:  # Todo 500, 401
            self.getLogger().error(e, exc_info=True)
            return {'message': str(e)}, 404, {'Content-type': 'application/json'}

        return send_file(response,
                         download_name=file_name,
                         as_attachment=True,
                         max_age=0,
                         mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    @login_required
    def middleware(self):
        key = request.args.get('object_key')

        if key is None:
            return self.get_not_found_response()

        description = self.setting.get_custom_object_description(key)

        if description is None:
            return self.get_not_found_response()
        try:
            return ClassLoader().call(description, request, self.get_tm1_service(), self.setting, self)
        except Exception as e:  # Todo 500, 401
            self.getLogger().error(e, exc_info=True)
            return {'message': str(e)}, 404, {'Content-type': 'application/json'}

    def upload_image(self):
        try:
            images_upload_folder = os.path.join(self.get_setting().site_root, 'static', 'assets', 'skin', 'images',
                                                'upload')

            file_num = int(request.form.get('fileNum', 0))
            file_name = request.form.get('fileName', '').rsplit('.', 1)[0]
            folder_name = request.form.get('folderName', '').strip()

            if file_num == 0:
                return jsonify({'message': 'No files provided'}), 400

            target_folder = images_upload_folder
            if folder_name:
                target_folder = os.path.join(images_upload_folder, secure_filename(folder_name))

            if not os.path.exists(target_folder):
                os.makedirs(target_folder)

            first_file_name = None
            for i in range(file_num):
                file_key = f'file{i}'
                if file_key not in request.files:
                    continue

                file = request.files[file_key]

                if i == 0:
                    if file_num == 1 and file_name:
                        filename = secure_filename(file_name) + '.' + file.filename.rsplit('.', 1)[-1]
                    else:
                        filename = secure_filename(file.filename)

                    first_file_name = filename
                else:
                    filename = secure_filename(file.filename)

                file.save(os.path.join(target_folder, filename))

            return jsonify({'message': 'ok', 'fileName': first_file_name, 'folderName': 'upload/' + folder_name}), 200

        except Exception as e:
            return jsonify({'message': str(e)}), 400

    def list_images(self, folder_name):
        try:
            images_upload_folder = os.path.join(self.get_setting().site_root, 'static', 'assets', 'skin', 'images',
                                                'upload')

            target_folder = images_upload_folder
            if folder_name:
                target_folder = os.path.join(images_upload_folder, secure_filename(folder_name))

            if not os.path.exists(target_folder):
                return jsonify({'message': 'Success', 'files': []}), 200

            files = os.listdir(target_folder)
            files = [f for f in files if os.path.isfile(os.path.join(target_folder, f))]

            return jsonify({'message': 'Success', 'files': files}), 200

        except Exception as e:
            return jsonify({'message': str(e)}), 400

    def delete_image(self, folder_name, file_name):
        try:
            images_upload_folder = os.path.join(self.get_setting().site_root, 'static', 'assets', 'skin', 'images',
                                                'upload')

            target_folder = images_upload_folder
            if folder_name:
                target_folder = os.path.join(images_upload_folder, secure_filename(folder_name))

            if not os.path.exists(target_folder):
                return jsonify({'message': 'Folder does not exist'}), 400

            target_file = os.path.join(target_folder, secure_filename(file_name))

            if not os.path.exists(target_file):
                return jsonify({'message': 'File does not exist'}), 400

            os.remove(target_file)

            return jsonify({'message': 'File deleted successfully'}), 200

        except Exception as e:
            return jsonify({'message': str(e)}), 400

    def _get_check_access_mdx(self, force_server_side_query=False):
        if request.args.get('server') is not None or force_server_side_query is True:

            if request.method == 'GET':
                body = request.args
            elif len(request.form) > 0:
                body = request.form.to_dict()
            else:
                body = orjson.loads(request.data)

            key = body.get('key')

            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']

            key = key + self.get_setting().get_check_access_repository_yml_suffix()

            mdx = self.setting.get_mdx(key)

            if mdx is None:
                return None
            else:
                mdx = self._set_custom_mdx_data(mdx)

            for k in body:
                if type(body[k]) is not dict:
                    mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            self.log_request(**body)

            return mdx.encode('utf-8')

        return None

    def log_request(self, **kwargs):

        is_request_logger_enabled_by_client = request.args.get('requestLoggerEnabled') == 'true' or kwargs.get(
            'requestLoggerEnabled') == 'true'

        if self.setting.is_request_logger_enabled() is True or is_request_logger_enabled_by_client:
            params = kwargs.copy()

            params['logged_in_user'] = self.get_logged_in_user_name()

            params['journey_id'] = request.args.get('requestLoggerJourneyId', params.get('requestLoggerJourneyId', ''))
            params['group_id'] = request.args.get('requestLoggerGroupId', params.get('requestLoggerGroupId', ''))

            if params.get('requestLoggerJourneyId') is not None:
                del params['requestLoggerJourneyId']

            if params.get('requestLoggerGroupId') is not None:
                del params['requestLoggerGroupId']

            if params.get('requestLoggerEnabled') is not None:
                del params['requestLoggerEnabled']

            params['analogic_api_full_path'] = request.full_path
            params['analogic_api_host_url'] = request.host_url
            params['analogic_api_method'] = request.method

            params.update(self.get_additional_log_request_parameters())

            self.request_logger.log_request(**params)

    def log_write_request(self, **kwargs):
        if self.setting.is_write_request_logger_enabled() is True and self.is_write_request():
            params = kwargs.copy()

            params['logged_in_user'] = self.get_logged_in_user_name()

            params['url'] = request.full_path

            params.update(self.get_additional_log_request_parameters())

            self.request_logger.log_write_request(**params)

    def get_additional_log_request_parameters(self):
        return {}

    def is_write_request(self):
        return 'tm1.ExecuteWithReturn' in request.full_path

    def _get_server_side_mdx(self, force_server_side_query=False):

        if request.args.get('server') is not None or force_server_side_query is True:

            if request.method == 'GET':
                body = request.args
            elif len(request.form) > 0:
                body = request.form.to_dict()
            else:
                body = orjson.loads(request.data)

            key = body['key']

            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']

            mdx = self.setting.get_mdx(key)

            if isinstance(mdx, dict):

                if 'required_permissions' in mdx and self.check_permission(mdx.get('required_permissions')) is False:
                    raise AnalogicAccessDeniedException('You do not have access to run the query {}'.format(key))

                mdx = mdx['query']

            mdx = self._set_custom_mdx_data(mdx)

            for k in body:

                if type(body[k]) is not dict:
                    mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            self.log_request(**body)

            self.log_write_request(**body)

            return mdx.encode('utf-8')
        else:
            if self.get_setting().get_config().get('allowClientSideQuery') is True:
                return request.data
            return ''.encode('utf-8')

    def index(self):
        pass

    def check_app_authenticated(self):
        return self.session_handler.is_exist(self.logged_in_user_session_name)

    def get_authentication_required_response(self):
        return Response('', 401)

    def healthy(self):
        return {'message': 'ok'}, 200, {'Content-Type': 'application/json'}

    def get_not_found_response(self):
        return 'Not found', 404, {'Content-Type': 'application/json'}

    def _add_authenticated_cookies(self, response, max_age=None):
        m = max_age
        if max_age is None:
            cnf = self.setting.get_config()
            m = cnf['sessionExpiresInMinutes'] * 60
        # TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=m)
        return response

    def _set_custom_mdx_data(self, mdx):
        return mdx

    def get_access_denied_response(self):
        return {'message': 'Access denied'}, 403, {'Content-Type': 'application/json'}

    def has_access(self, force_server_side_query=False):
        mdx = self._get_check_access_mdx(force_server_side_query)
        if mdx is None:
            return True

        target_url = self.setting.get_proxy_target_url()

        sub_path = 'api/v1/ExecuteMDX?$expand=Cells($select=Value)'

        url = target_url + "/" + sub_path

        headers: dict[str, str] = self.HEADERS.copy()
        cookies: dict[str, str] = {}

        try:
            response = self.do_proxy_request(url, 'POST', mdx, headers, cookies, True)
        except AnalogicProxyException as e:
            self._logger.error(e, exc_info=True)
            raise e

        if response.status_code == 400 or response.status_code == 500:
            self._logger.error('MDX error: ' + response.text)
            self._logger.error('MDX: ' + mdx.decode('utf-8'))
            raise Exception(response.text)

        if response.status_code == 401:
            raise Exception('401 tm1 authentication failed')

        resp = response.json()

        if resp.get('Cells') is None:
            return False

        if len(resp.get('Cells')) < 1:
            return False

        return resp.get('Cells')[0].get('Value') == 1

    def check_permission(self, required_permissions):
        available_permissions_list = self.get_permission_list()
        return any(permission in required_permissions for permission in available_permissions_list)

    def get_permission_list(self):
        available_permissions = self.session_handler.get(self.setting.get_permission_session_name())
        available_permissions_list = available_permissions.split(',') if available_permissions is not None else []
        return available_permissions_list

    def set_permissions(self, permissions_str):
        self.session_handler.set(self.setting.get_permission_session_name(), permissions_str)

    def load_permissions(self):
        self.set_permissions('')
        permission_queries = self.setting.get_mdx(self.setting.get_permission_query_repository_yml_key())
        if permission_queries is not None:
            for permission_query_params in permission_queries:
                self.execute_permission_query(permission_query_params)

    def execute_permission_query(self, params):
        try:
            target_url = self.setting.get_proxy_target_url()
            sub_path = params['url'].replace('\n', '')
            url = target_url + ('/' if sub_path[0] != '/' else '') + sub_path
            body = self._set_custom_mdx_data(params['body'])

            headers: dict[str, str] = self.HEADERS.copy()
            cookies: dict[str, str] = {}

            response = self.do_proxy_request(url, params['method'].replace('\n', ''), body.encode('utf-8'), headers,
                                             cookies, True)

            if response.status_code > 300:
                self._logger.error(
                    'Unable to load permissions {0} {1}'.format(self.setting.get_instance(), self.setting.get_name()))
                self._logger.error('MDX error: ' + response.text)
                self._logger.error('MDX: ' + body)
            else:
                r = response.json()
                permissions = [str(x['Value']) for x in r['Cells']]

                existing_permissions = self.session_handler.get(self.setting.get_permission_session_name())
                existing_permissions_list = existing_permissions.split(
                    ',') if existing_permissions is not None and existing_permissions != '' else []

                union = list(set(existing_permissions_list + permissions))
                self.set_permissions(','.join(union))

        except Exception as e:
            self._logger.error(
                'Unable to load permissions {0} {1}'.format(self.setting.get_instance(), self.setting.get_name()))
            self.getLogger().error(e, exc_info=True)

    @login_required
    @check_access
    def proxy(self, sub_path, encode_content=False, method=None, force_server_side_query=False,
              forward_query_string=True):

        self._extend_login_session()

        target_url = self.setting.get_proxy_target_url()

        url = target_url + "/" + sub_path + (
            "?" + request.query_string.decode('UTF-8') if len(
                request.query_string) > 0 and forward_query_string is True else "")

        meth = request.method if method is None else method

        headers: dict[str, str] = self.HEADERS.copy()
        cookies: dict[str, str] = {}

        try:
            mdx = self._get_server_side_mdx(force_server_side_query)

            url = url.replace('\n', '')

            before_call_do_proxy.send(self, url=url, method=meth, data=mdx, headers=headers, cookies=cookies,
                                      encode_content=encode_content)

            response = self.do_proxy_request(url, meth, mdx, headers, cookies, encode_content)
        except AnalogicProxyException as e:
            self._logger.error(e, exc_info=True)
            return {'message': 'Something went wrong {}'.format(e)}, 500, {'Content-Type': 'application/json'}
        except AnalogicAcceptedException as e:
            return {'message': str(e)}, 202, {'Content-Type': 'application/json'}
        except AnalogicException as e:
            self._logger.error(e, exc_info=True)
            return {'message': str(e)}, 500, {'Content-Type': 'application/json'}
        except AnalogicAccessDeniedException as e:
            self._logger.error(e, exc_info=True)
            return {'message': 'Something went wrong {}'.format(e)}, 403, {'Content-Type': 'application/json'}

        if response.status_code == 400 or response.status_code == 500:
            if encode_content is False:
                self._logger.error('MDX error: ' + response.get_decompressed_data())
            else:
                self._logger.error(f'MDX error: {response.text}')
            self._logger.error('Status code: ' + str(response.status_code))
            self._logger.error('MDX: ' + mdx.decode('utf-8'))

        if response.status_code == 401:
            return 'Authentication required', 401, {'Content-Type': 'application/json'}

        if response.status_code == 404:
            return 'Not found', 404, {'Content-Type': 'application/json'}

        if encode_content is True:
            return response.json(), 200, {'Content-Type': 'application/json'}

        return response.content, response.status_code, {
            'Content-Type': 'application/json; odata.metadata=minimal; odata.streaming=true; charset=utf-8',
            'Content-Encoding': 'gzip'}

    def do_proxy_request(self, url, method, mdx, headers=None, cookies=None, decode_content=True):

        if headers is None:
            headers: dict[str, str] = self.HEADERS.copy()

        if cookies is None:
            cookies: dict[str, str] = {}

        return self._create_request_with_authenticated_user(url, method, mdx, headers, cookies, decode_content)

    @abstractmethod
    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies, decode_content=True):
        pass

    def _extend_login_session(self):
        session.modified = True

    @abstractmethod
    def get_tm1_service(self):
        pass

    @login_required
    def active_user(self):
        return jsonify({'username': self.get_logged_in_user_name()})

    def login(self):
        self.session_handler.set(self.logged_in_user_session_name, '')

    def logout(self):
        self.session_handler.clear()
        return 'ok'

    def clear_cache(self):
        return self.get_setting().clear_cache()

    def is_in_maintenance_mode(self):
        return self.is_in_maintenance

    def get_maintenance_message(self):
        return self.maintenance_message

    def get_request_log(self, journey_id):
        return self.request_logger.get_request_log(journey_id)

    def getLogger(self):
        return self._logger

    def on_exit(self):
        pass

    def install(self, params):
        pass

    def uninstall(self, params):
        pass

    def add_command_line_parameters(self, ap):
        pass

    def get_available_backend_methods(self):
        return ['install', 'uninstall']

    @staticmethod
    def get_setting_parameter_descriptions():
        result = {
            'projectName': {
                'required': True,
                'description': 'Free text, displayed on the header of html title.'
            },
            'projectId': {
                'required': True,
                'description': 'The same text as the app directory. Accented, special characters are not allowed.'
            },
            'authenticationMode': {
                'required': True,
                'description': 'Authenticaton provider class name.'
            },
            'mainPage': {
                'required': True,
                'description': 'Javascript client start page.'
            },
            'ssl_verify': {
                'required': False,
                'description': 'Server side requests parameter, default value true. In case of disabling self signed certificate of api will not be checked'
            },
            'sessionExpiresInMinutes': {
                'required': False,
                'description': 'Numeric value. Session will expire after the added value. Default 20'
            },
            SettingManager.ENABLE_REQUEST_LOGGER_PARAMETER_NAME: {
                'required': False,
                'description': 'Boolean value, default false. All of the request parameter will be added to the log'
            },
            SettingManager.ENABLE_WRITE_REQUEST_LOGGER_PARAMETER_NAME: {
                'required': False,
                'description': 'Boolean value, default false. All of the write request parameter will be added to the log'
            },
            SettingManager.ENABLE_TOOL_TIPS_PARAMETER_NAME: {
                'required': False,
                'description': 'Boolean value, default false. Tooltips will be displayed on the widget if tooltip parameter is set.'
            }
        }

        return result
