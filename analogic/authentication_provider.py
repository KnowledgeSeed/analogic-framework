from flask import session, current_app, send_file, request, jsonify
from analogic.loader import ClassLoader
import analogic.pivot as PivotApi
from analogic.exceptions import AnalogicProxyException, AnalogicAccessDeniedException
import logging
import pandas as pd
from abc import ABC, abstractmethod
from functools import wraps
import orjson

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

    PERMISSION_QUERIES_KEY = 'analogic_permissions'
    PERMISSIONS_SESSION_NAME = 'analogic_permission'

    def __init__(self, setting):
        self.setting = setting
        self.logged_in_user_session_name = self.setting.get_instance() + '_logged_in_user_name'
        self._logger = logging.getLogger(self.setting.get_instance())

    def initialize(self):
        self.setting.initialize()

    def get_setting(self):
        return self.setting

    def get_logged_in_user_name(self):
        return session.get(self.logged_in_user_session_name)

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
        key = request.args.get('key')

        if key is None:
            return self.get_not_found_response()

        description = self.setting.get_custom_object_description(key)

        return ClassLoader().call(description, request, self.get_tm1_service(), self.setting, self)

    def _get_check_access_mdx(self, force_server_side_query=False):
        if request.args.get('server') is not None or force_server_side_query is True:
            if request.method == 'GET':
                body = request.args
            else:
                body = orjson.loads(request.data)
            key = body.get('key')
            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']
            key = key + '_analogic_check_access'
            mdx = self.setting.get_mdx(key)

            if mdx is None:
                return None
            else:
                mdx = self._set_custom_mdx_data(mdx)

            for k in body:
                mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            return mdx.encode('utf-8')

        return None

    def _get_server_side_mdx(self, force_server_side_query=False):
        if request.args.get('server') is not None or force_server_side_query is True:
            if request.method == 'GET':
                body = request.args
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
                mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            return mdx.encode('utf-8')
        else:
            return ''.encode('utf-8')

    @abstractmethod
    def index(self):
        pass

    @abstractmethod
    def check_app_authenticated(self):
        return True

    @abstractmethod
    def get_authentication_required_response(self):
        pass

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
        available_permissions = session.get(self.PERMISSIONS_SESSION_NAME)
        available_permissions_list = available_permissions.split(',') if available_permissions is not None else []
        return any(permission in required_permissions for permission in available_permissions_list)

    def load_permissions(self):
        permission_queries = self.setting.get_mdx(self.PERMISSION_QUERIES_KEY)
        if permission_queries is not None:
            for permission_query_params in permission_queries:
                self.execute_permission_query(permission_query_params)

    def execute_permission_query(self, params):
        try:
            target_url = self.setting.get_proxy_target_url()
            sub_path = params['url']
            url = target_url + ('/' if sub_path[0] != '/' else '') + sub_path
            body = self._set_custom_mdx_data(params['body'])

            headers: dict[str, str] = self.HEADERS.copy()
            cookies: dict[str, str] = {}

            response = self.do_proxy_request(url, params['method'], body.encode('utf-8'), headers, cookies, True)

            if response.status_code > 300:
                self._logger.error('MDX error: ' + response.text)
                self._logger.error('MDX: ' + body.decode('utf-8'))
            else:
                r = response.json()
                permissions = [str(x['Value']) for x in r['Cells']]

                existing_permissions = session.get(self.PERMISSIONS_SESSION_NAME)
                existing_permissions_list = existing_permissions.split(',') if existing_permissions is not None else []

                union = list(set(existing_permissions_list + permissions))
                session[self.PERMISSIONS_SESSION_NAME] = ','.join(union)

        except Exception as e:
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
            response = self.do_proxy_request(url, meth, mdx, headers, cookies, encode_content)
        except AnalogicProxyException as e:
            self._logger.error(e, exc_info=True)
            return { 'message' : 'Something went wrong {}'.format(e)}, 500, {'Content-Type': 'application/json'}
        except AnalogicAccessDeniedException as e:
            self._logger.error(e, exc_info=True)
            return { 'message' : 'Something went wrong {}'.format(e)}, 403, {'Content-Type': 'application/json'}


        if response.status_code == 400 or response.status_code == 500:
            if encode_content is False:
                self._logger.error('MDX error: ' + response.get_decompressed_data())
            else:
                self._logger.error('MDX error: ' + response.json())
            self._logger.error('MDX: ' + mdx.decode('utf-8'))

        if response.status_code == 401:
            return 'Authentication required', 401, {'Content-Type': 'application/json'}

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

    @abstractmethod
    def _extend_login_session(self):
        pass

    @abstractmethod
    def get_tm1_service(self):
        pass

    @login_required
    def active_user(self):
        return jsonify({'username': self.get_logged_in_user_name()})

    def logout(self):
        session.clear()
        return 'ok'

    def getLogger(self):
        return self._logger

    def on_exit(self):
        pass
