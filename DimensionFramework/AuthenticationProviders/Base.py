import pandas as pd
import sys

pd.set_option('display.float_format', lambda x: '%.3f' % x)
from flask import request, send_file, json, request
from DimensionFramework.Core.ClassLoader import ClassLoader
from DimensionFramework.Core.SettingManager import SettingManager
from DimensionFramework.Core.FileUploadManager import FileUploadManager
import logging


class Base:

    def __init__(self, cache, site_root, instance='default'):
        self.setting = SettingManager(cache, site_root, instance)
        self.upload_manager = FileUploadManager(self.setting)

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

        return send_file(ClassLoader().call(export_description, request, self.getTM1Service(), self.setting),
                         attachment_filename=file_name,
                         as_attachment=True,
                         cache_timeout=0,
                         mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    def do(self):
        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        key = request.args.get('key')

        if key is None:
            return self.getNotFoundResponse()

        description = self.setting.getCustomObjectDescription(key)

        return ClassLoader().call(description, request, self.getTM1Service(), self.setting)

    def getServerSideMDX(self):
        mdx = request.data
        if request.args.get('server') is not None:
            body = json.loads(request.data)
            mdx = self.setting.getMDX(body['key'])
            for k in body:
                mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            mdx = self.setCustomMDXData(mdx)
            return mdx.encode('utf-8')

        return mdx

    def login(self):
        pass

    def pool(self, sub_path):
        pass

    def index(self):
        pass

    def auth(self):
        pass

    def authsso(self):
        pass

    def getTM1Service(self):
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

                validation_message = ClassLoader().call(description, request, self.getTM1Service(), self.setting,
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
            print('Unexpected error:', sys.exc_info()[0])
            print('Unexpected error:', sys.exc_info()[1])
            return 'Unexpected error', 200, {'Content-Type': 'application/json'}

    def addAuthenticatedCookie(self, response):
        cnf = self.setting.getConfig()
        # TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=cnf['sessionExpiresInMinutes'] * 60)
        return response

    def exportConfig(self):
        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()
        repository = self.setting.getRepository()
        config = self.setting.getConfig()
        return 'valami', 200

    def getLogger(self):
        return logging.getLogger(__name__)

    def ping(self):
        self.getLogger().info('ping test2')
        return 'Ok', 200, {'Content-Type': 'application/json'}
