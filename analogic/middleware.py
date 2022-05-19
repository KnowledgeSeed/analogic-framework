from flask_caching import Cache
from datetime import timedelta
from flask import session, current_app, send_file, json, request, jsonify
import importlib
import sys
import os
from analogic.loader import ClassLoader
from analogic.setting import SettingManager
from analogic.upload import FileUploadManager
import analogic.pivot as PivotApi
import logging
import pandas as pd
from abc import ABC, abstractmethod


pd.set_option('display.float_format', lambda x: '%.3f' % x)


def get_middleware():
    analogic_application = get_analogic_application()
    cache = get_cache()

    setting = SettingManager(cache, current_app.instance_path, analogic_application)
    config = setting.getConfig()

    module_name, class_name = config['authenticationMode'].rsplit(".", 1)

    if module_name in sys.modules:
        module = sys.modules[module_name]
    else:
        module = importlib.import_module(module_name)  # Todo ModuleNotFoundError

    middleware_class = getattr(module, class_name)
    middleware = middleware_class(setting)

    session.permanent = True
    current_app.permanent_session_lifetime = timedelta(minutes=config['sessionExpiresInMinutes'] - 1)
    return middleware


def get_analogic_application():
    s = request.path.split('/')
    if len(s) > 1:
        return s[1]
    else:
        return 'default'


def get_cache():
    cache_path = os.path.join(current_app.instance_path, 'cache')
    return Cache(current_app, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})


class Middleware(ABC):

    def __init__(self, setting):
        self.setting = setting
        self.upload_manager = FileUploadManager(self.setting)

    def pivot(self):
        if self.check_app_authenticated() is False:
            return self.get_authentication_response()

        v = request.values
        cube_name = v.get('cube_name')
        dimension_name = v.get('dimension_name')
        hierarchy_name = v.get('hierarchy_name')
        subset_name = v.get('subset_name')
        element_names = v.getlist('element_names[]')
        subset_name_to_remove = v.get('subset_name_to_remove')
        selected_cards = v.get('selected_cards')
        options = v.get('options')

        return PivotApi.call(self.get_tm1_service(), cube_name, dimension_name, hierarchy_name, subset_name,
                             element_names, subset_name_to_remove, selected_cards, options)

    def export(self):
        if self.check_app_authenticated() is False:
            return self.get_authentication_response()

        file_name = request.args.get('file_name', default='export.xlsx')
        export_key = request.args.get('export_key')

        if export_key is None:
            return self.get_not_found_response()

        export_description = self.setting.getCustomObjectDescription(export_key)

        if export_description is None:
            return self.get_not_found_response()

        return send_file(ClassLoader().call(export_description, request, self.get_tm1_service(), self.setting, self),
                         attachment_filename=file_name,
                         as_attachment=True,
                         cache_timeout=0,
                         mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    def get_server_side_mdx(self):
        mdx = request.data
        if request.args.get('server') is not None:
            body = json.loads(request.data)
            key = body['key']
            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']
            mdx = self.setting.getMDX(key)
            for k in body:
                mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            mdx = self.set_custom_mdx_data(mdx)
            return mdx.encode('utf-8')

        return mdx

    @abstractmethod
    def index(self):
        pass

    @abstractmethod
    def check_app_authenticated(self):
        return True

    @abstractmethod
    def get_authentication_response(self):
        pass

    def get_not_found_response(self):
        return 'Not found', 404, {'Content-Type': 'application/json'}

    def process_files(self):
        try:

            target = request.form.get('target')
            staging = request.form.get('staging')
            sub_folder = request.form.get('subFolder')
            pre_process_message = ''
            result = 'ok'
            validation_key = request.form.get('validation', '')

            upload_path = self.upload_manager.upload(target, staging, sub_folder, request.files)

            if validation_key != '':
                description = self.setting.getCustomObjectDescription(validation_key)

                validation_message = ClassLoader().call(description, request, self.get_tm1_service(), self.setting, self,
                                                        path=upload_path)

                if validation_message != '':
                    result = 'ERROR!<br/><br/>' + validation_message
                    return result, 200, {'Content-Type': 'application/json'}

            preprocess_template = request.form.get('preProcessTemplate', default='')

            if preprocess_template != '':
                pre_process_message = self.upload_manager.preProcess(self.get_tm1_service(), preprocess_template,
                                                                     upload_path)

            if staging != '':
                self.upload_manager.move(target, staging, sub_folder)

            self.upload_manager.postProcess()

            if pre_process_message != '':
                result = 'ERROR!<br/><br/>' + pre_process_message
            return result, 200, {'Content-Type': 'application/json'}
        except:
            logger = self.getLogger()
            logger.error(sys.exc_info()[0])
            logger.error(sys.exc_info()[1])
            return 'Unexpected error', 200, {'Content-Type': 'application/json'}

    def add_authenticated_cookies(self, response):
        cnf = self.setting.getConfig()
        # TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=cnf['sessionExpiresInMinutes'] * 60)
        return response

    def set_custom_mdx_data(self, mdx):
        return mdx

    def pool(self, sub_path):

        if self.check_app_authenticated() is False:
            return self.get_authentication_response()

        self.extend_login_session()

        target_url = self.setting.getPoolTargetUrl()

        mdx = self.get_server_side_mdx()

        url = target_url + "/" + sub_path + (
            "?" + request.query_string.decode('UTF-8') if len(
                request.query_string) > 0 else "")

        method = request.method

        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        response = self.do_pool_request(url, method, mdx, headers, cookies)

        if response.status_code == 400 or response.status_code == 500:
            logger = self.getLogger()
            logger.error('MDX error: ' + response.text)
            logger.error('MDX: ' + mdx.decode('utf-8'))

        return response.text, response.status_code, {'Content-Type': 'application/json'}

    def do_pool_request(self, url, method, mdx, headers=None, cookies=None):

        if headers is None:
            headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                       'Accept-Encoding': 'gzip, deflate, br'}

        if cookies is None:
            cookies: dict[str, str] = {}

        return self.create_request_with_authenticated_user(url, method, mdx, headers, cookies)

    @abstractmethod
    def create_request_with_authenticated_user(self, url, method, mdx, headers, cookies):
        pass

    @abstractmethod
    def extend_login_session(self):
        pass

    @abstractmethod
    def get_tm1_service(self):
        pass

    def active_user(self):
        return jsonify({'username': session.get('username')})

    def getLogger(self):
        return logging.getLogger(self.setting.getInstance())
