import pandas as pd
import sys

pd.set_option('display.float_format', lambda x: '%.3f' % x)
from flask import request, send_file
from knowledgeseed.Core.ClassLoader import ClassLoader
from knowledgeseed.Core.SettingManager import SettingManager
from knowledgeseed.Core.FileUploadManager import FileUploadManager


class Base:

    def __init__(self, cache, site_root):
        self.setting = SettingManager(cache, site_root)
        self.upload_manager = FileUploadManager(self.setting)

    def export(self):
        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        file_name = request.args.get('file_name', default='export.xlsx')
        export_key = request.args.get('export_key')

        if export_key is None:
            return self.getNotFoundResponse()

        export_description = self.getClassDescription(export_key)

        if export_description is None:
            return self.getNotFoundResponse()

        return send_file(ClassLoader().call(export_description, request, self.getTM1Service(), self.setting),
                         attachment_filename=file_name,
                         as_attachment=True,
                         cache_timeout=0)

    def do(self):
        if self.checkAppAuthenticated() is False:
            return self.getAuthenticationResponse()

        key = request.args.get('key')

        if key is None:
            return self.getNotFoundResponse()

        description = self.getClassDescription(key)

        return ClassLoader().call(description, request, self.getTM1Service(), self.setting)

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
        return 'Not found', 401, {'Content-Type': 'application/json'}

    def processFiles(self):
        try:

            target = request.form.get('target')
            staging = request.form.get('staging')
            sub_folder = request.form.get('subFolder')
            pre_process_message = ''
            result = 'ok'

            upload_path = self.upload_manager.upload(target, staging, sub_folder, request.files)

            preprocess_template = request.form.get('preProcessTemplate', default='')

            if preprocess_template != '':
                pre_process_message = self.upload_manager.preProcess(self.getTM1Service(), preprocess_template, upload_path)

            if staging != '':
                self.upload_manager.move(target, staging, sub_folder)

            self.upload_manager.postProcess()

            if pre_process_message != '':
                result = 'ERROR!<br/><br/>' + pre_process_message
            return result, 200, {'Content-Type': 'application/json'}
        except:
            print('Unexpected error:', sys.exc_info()[0])
            return 'Unexpected error', 200, {'Content-Type': 'application/json'}

    def addAuthenticatedCookie(self, response):
        cnf = self.setting.getConfig()
        # TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=cnf['sessionExpiresInMinutes'] * 60)
        return response
