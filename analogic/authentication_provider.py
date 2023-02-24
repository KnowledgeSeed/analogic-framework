from flask import session, current_app, send_file, request, jsonify
from analogic.loader import ClassLoader
import analogic.pivot as PivotApi
from analogic.exceptions import AnalogicProxyException
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
        if auth_provider.check_app_authenticated is False:
            return auth_provider.get_authentication_required_response()
        return f(*args, **kwargs)

    return decorated_function


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_provider = args[0]
        if auth_provider.check_app_authenticated is False:
            return auth_provider.get_authentication_required_response()
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

        return send_file(ClassLoader().call(export_description, request, self.get_tm1_service(), self.setting, self),
                         attachment_filename=file_name,
                         as_attachment=True,
                         cache_timeout=0,
                         mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    @login_required
    def middleware(self):
        key = request.args.get('key')

        if key is None:
            return self.get_not_found_response()

        description = self.setting.get_custom_object_description(key)

        return ClassLoader().call(description, request, self.get_tm1_service(), self.setting, self)

    def _get_server_side_mdx(self):
        mdx = request.data
        if request.args.get('server') is not None:
            body = orjson.loads(request.data)
            key = body['key']
            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']
            mdx = self.setting.get_mdx(key)
            mdx = self._set_custom_mdx_data(mdx)
            for k in body:
                mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            return mdx.encode('utf-8')

        return mdx

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

    @login_required
    def proxy(self, sub_path):

        self._extend_login_session()

        target_url = self.setting.get_proxy_target_url()

        mdx = self._get_server_side_mdx()

        url = target_url + "/" + sub_path + (
            "?" + request.query_string.decode('UTF-8') if len(
                request.query_string) > 0 else "")

        method = request.method

        headers: dict[str, str] = self.HEADERS.copy()
        cookies: dict[str, str] = {}

        try:
            response = self.do_proxy_request(url, method, mdx, headers, cookies, False)
        except AnalogicProxyException as e:
            self._logger.error(e)
            return 'Something went wrong', 500, {'Content-Type': 'application/json'}

        if response.status_code == 400 or response.status_code == 500:
            self._logger.error('MDX error: ' + response.get_decompressed_data())
            self._logger.error('MDX: ' + mdx.decode('utf-8'))

        if response.status_code == 401:
            return 'Authentication required', 401, {'Content-Type': 'application/json'}

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
