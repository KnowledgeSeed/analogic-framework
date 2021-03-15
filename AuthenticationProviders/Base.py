import pandas as pd
import sys

pd.set_option('display.float_format', lambda x: '%.3f' % x)
from flask import request, send_file
from Core.ClassLoader import ClassLoader
from Core.SettingManager import SettingManager
from Core.FileUploadManager import FileUploadManager


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

        return send_file(ClassLoader().call(export_description, request, self.getTM1Service()),
                         attachment_filename=file_name,
                         as_attachment=True,
                         cache_timeout=0)

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
            target = self.upload_manager.upload()
            pre_process_message = ''
            result = 'ok'
            preprocess_template = request.form.get('preProcessTemplate', default='')
            if preprocess_template != '':
                pre_process_message = self.upload_manager.preProcess(self.getTM1Service(), preprocess_template, target)
            if request.form.get('staging') != '':
                self.upload_manager.move()
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
