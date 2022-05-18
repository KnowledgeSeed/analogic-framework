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
from TM1py.Services import TM1Service
import requests

pd.set_option('display.float_format', lambda x: '%.3f' % x)


def get_middleware():
    analogic_application = get_analogic_application()
    cache = get_cache()

    config = SettingManager(cache, current_app.instance_path, analogic_application).getConfig()

    module_name, class_name = config['authenticationMode'].rsplit(".", 1)

    if module_name in sys.modules:
        module = sys.modules[module_name]
    else:
        module = importlib.import_module(module_name)  # Todo ModuleNotFoundError

    middleware_class = getattr(module, class_name)
    middleware = middleware_class(cache, current_app.instance_path, analogic_application)

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


class Middleware:

    def __init__(self, cache, site_root, instance='default'):
        self.setting = SettingManager(cache, site_root, instance)
        self.upload_manager = FileUploadManager(self.setting)

    def pivot(self):
        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        v = request.values
        cube_name = v.get('cube_name')
        dimension_name = v.get('dimension_name')
        hierarchy_name = v.get('hierarchy_name')
        subset_name = v.get('subset_name')
        element_names = v.getlist('element_names[]')
        subset_name_to_remove = v.get('subset_name_to_remove')
        selected_cards = v.get('selected_cards')
        options = v.get('options')

        return PivotApi.call(self.getTM1Service(), cube_name, dimension_name, hierarchy_name, subset_name,
                             element_names, subset_name_to_remove, selected_cards, options)

    def export(self):
        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        file_name = request.args.get('file_name', default='export.xlsx')
        export_key = request.args.get('export_key')

        if export_key is None:
            return self.getNotFoundResponse()

        export_description = self.setting.getCustomObjectDescription(export_key)

        if export_description is None:
            return self.getNotFoundResponse()

        return send_file(ClassLoader().call(export_description, request, self.getTM1Service(), self.setting, self),
                         attachment_filename=file_name,
                         as_attachment=True,
                         cache_timeout=0,
                         mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    def getServerSideMDX(self):
        mdx = request.data
        if request.args.get('server') is not None:
            body = json.loads(request.data)
            key = body['key']
            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']
            mdx = self.setting.getMDX(key)
            for k in body:
                mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            mdx = self.setCustomMDXData(mdx)
            return mdx.encode('utf-8')

        return mdx

    def login(self):
        pass

    def index(self):
        pass

    def auth(self):
        pass

    def authsso(self):
        pass

    def checkAppAuthenticated(self):
        return True

    def getAuthenticationResponse(self):
        pass

    def getNotFoundResponse(self):
        return 'Not found', 404, {'Content-Type': 'application/json'}

    def processFiles(self):
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

                validation_message = ClassLoader().call(description, request, self.getTM1Service(), self.setting, self,
                                                        path=upload_path)

                if validation_message != '':
                    result = 'ERROR!<br/><br/>' + validation_message
                    return result, 200, {'Content-Type': 'application/json'}

            preprocess_template = request.form.get('preProcessTemplate', default='')

            if preprocess_template != '':
                pre_process_message = self.upload_manager.preProcess(self.getTM1Service(), preprocess_template,
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

    def addAuthenticatedCookie(self, response):
        cnf = self.setting.getConfig()
        # TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=cnf['sessionExpiresInMinutes'] * 60)
        return response

    def ping(self):
        self.getLogger().info('ping')
        return 'Ok', 200, {'Content-Type': 'application/json'}

    def setCustomMDXData(self, mdx):
        return mdx

    def pool(self, sub_path):

        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        self.extendLoginSession()

        target_url = self.setting.getPoolTargetUrl()

        mdx = self.getServerSideMDX()

        url = target_url + "/" + sub_path + (
            "?" + request.query_string.decode('UTF-8') if len(
                request.query_string) > 0 else "")

        method = request.method

        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        cookies: dict[str, str] = {}

        response = self.doPoolRequest(url, method, mdx, headers, cookies)

        if response.status_code == 400 or response.status_code == 500:
            logger = self.getLogger()
            logger.error('MDX error: ' + response.text)
            logger.error('MDX: ' + mdx.decode('utf-8'))

        return response.text, response.status_code, {'Content-Type': 'application/json'}

    def doPoolRequest(self, url, method, mdx, headers=None, cookies=None):

        if headers is None:
            headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                       'Accept-Encoding': 'gzip, deflate, br'}

        if cookies is None:
            cookies: dict[str, str] = {}

        return self.createRequestByAuthenticatedUser(url, method, mdx, headers, cookies)

    def createRequestByAuthenticatedUser(self, url, method, mdx, headers, cookies):
        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            headers['Authorization'] = self.setting.getPoolCamNamespace(pool_user['name'])
        else:
            cookies["TM1SessionId"] = pool_user['session']

        response = requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        if authorization_required:
            pool_user['session'] = response.cookies.get('TM1SessionId')
            self.setting.updatePoolUser(pool_user)
        else:
            self.setting.decreasePoolUserSessionCount(pool_user)

        return response

    def makeRequest(self, url, method, mdx, headers, cookies, **kwargs):
        return requests.request(
            url=url,
            method=method,
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False,
            **kwargs)

    def extendLoginSession(self):
        pass

    def getTM1Service(self):

        pool_user = self.setting.getPoolUser()

        authorization_required = pool_user['session'] == ''

        if authorization_required:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(),
                              namespace=self.setting.getAppCamNamespace(),
                              user=pool_user['name'],
                              password=self.setting.getPassword(pool_user['name']),
                              ssl=False)
        else:
            return TM1Service(base_url=self.setting.getPoolTargetUrl(), session_id=pool_user['session'], ssl=False)

    def activeUser(self):
        return jsonify({'username': session.get('username')})

    def getLogger(self):
        return logging.getLogger(self.setting.getInstance())
