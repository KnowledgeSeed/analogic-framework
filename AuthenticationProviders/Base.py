import os
import shutil
import datetime
import pandas as pd
import chardet
import magic
import sys
import pathlib

pd.set_option('display.float_format', lambda x: '%.3f' % x)
from flask import json, request, send_file
from werkzeug.utils import secure_filename
from Core.ClassLoader import ClassLoader
from TM1py.Utils.Utils import build_pandas_dataframe_from_cellset


class Base:
    CONFIG = 'knowledge_seed_config'
    REPOSITORY = 'knowledge_seed_repository'
    CLASSES = 'knowledge_seed_classes'
    TM1SessionId = 'tm1_session_id'
    TM1SessionExpires = 'tm1_session_expires'

    def __init__(self, cache, site_root):
        self.cache = cache
        self.site_root = site_root

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
            target = self.upload()
            pre_process_message = ''
            result = 'ok'
            preprocess_template = request.form.get('preProcessTemplate', default='')
            if preprocess_template != '':
                pre_process_message = self.preProcess(preprocess_template, target)
            if request.form.get('staging') != '':
                self.move()
            self.postProcess()
            if pre_process_message != '':
                result = 'ERROR!<br/><br/>' + pre_process_message
            return result, 200, {'Content-Type': 'application/json'}
        except:
            print('Unexpected error:', sys.exc_info()[0])
            return 'Unexpected error', 200, {'Content-Type': 'application/json'}

    def upload(self):

        sub_folder = request.form.get('subFolder')
        path = request.form.get('staging')

        if path == '':
            path = request.form.get('target')
        target = path

        if sub_folder != "":
            target = path + '\\' + sub_folder
            os.mkdir(target)

        for f in request.files.values():
            filename = secure_filename(f.filename)
            f.save(os.path.join(target, filename))
        return target

    def preProcess(self, preprocess_template, target):
        tm1_service = self.getTM1Service()
        mdx = "SELECT " \
              "{[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[ExtensionCheck], " \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[ForcedTargetName]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileFormat]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[HeaderCheck]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileColumnDelimiter]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileQuoteCharacter]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[FileNoneEmptyCheck]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[ExpectedColumnNr]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[CharacterSetCheck]," \
              "[zSYS Analogic UI FileUpload Preprocessing Setting Measure].[Backup Before Override]}" \
              " on ROWS, " \
              "{[zSYS Analogic UI FileUpload Processing Template].[" + preprocess_template + "]}" \
              " on COLUMNS" \
              "  FROM [zSYS Analogic UI FileUpload Preprocessing Setting]"
        data = tm1_service.cubes.cells.execute_mdx(mdx)
        df = build_pandas_dataframe_from_cellset(data, multiindex=False)
        rules = df.set_index('zSYS Analogic UI FileUpload Preprocessing Setting Measure').to_dict()['Values']
        return self.preProcessValidate(rules, target)

    def preProcessValidate(self, rules, source_dir):
        file_names = os.listdir(source_dir)
        message = ''

        for file_name in file_names:
            blob = open(os.path.join(source_dir, file_name), 'rb').read()
            if rules['CharacterSetCheck'] != '':
                message += self.checkCharacterSet(blob, rules['CharacterSetCheck'], file_name)
            #message += self.checkFileFormat(os.path.join(source_dir, file_name), rules['FileFormat'], file_name)
            if rules['ExtensionCheck'] == 'yes':
                message += self.checkExtension(rules['FileFormat'], file_name)
            if rules['FileNoneEmptyCheck'] == 'yes':
                message += self.checkNoneEmpty(os.path.join(source_dir, file_name), file_name)
            message += self.checkContent(os.path.join(source_dir, file_name), rules['ExpectedColumnNr'], rules['FileColumnDelimiter'], rules['FileQuoteCharacter'], rules['HeaderCheck'], file_name)

        return message

    def checkCharacterSet(self, blob, expected, file_name):
        result = chardet.detect(blob)
        return self.getErrorMessage(expected, result['encoding'], file_name, 'character set')

    def checkFileFormat(self, path, expected, file_name):
        result = magic.from_file(path, mime=True)
        return self.getErrorMessage(expected, result, file_name, 'file format')

    def checkExtension(self, expected, file_name):
        file_extension = pathlib.Path(file_name).suffix
        return self.getErrorMessage('.' + expected, file_extension, file_name, 'extension')

    def checkNoneEmpty(self, path, file_name):
        if os.path.getsize(path) > 0:
            return ''
        return 'file: ' + file_name + ' is empty<br/>'

    def checkContent(self, path, expected_col, delimiter, quote, header, file_name):
        count_quote = 0
        count_delimiter = 0
        first_line = ''
        result = ''

        with open(path, "r") as f:
            count_delimiter = sum(line.count(delimiter) for line in f)
            f.seek(0)
            count_quote = sum(line.count(quote) for line in f)
            f.seek(0)
            first_line = f.readline()

        if count_delimiter == 0:
            result += 'Expected delimiter for ' + file_name + ' is ' + delimiter + '<br/><br/>'

        if count_delimiter * 2 > count_quote:
            result += 'Expected quote character for ' + file_name + ' is ' + quote + '<br/><br/>'

        col_num = first_line.count(delimiter) + 1
        if expected_col is not None and col_num != expected_col:
            result += 'Expected column number for ' + file_name + ' is ' + str(expected_col) + ' but got ' + str(col_num) + '<br/><br/>'

        act_header = first_line.replace('\n', '')

        if header != '' and act_header != header:
            result += 'Expected header for ' + file_name + ' is ' + header + ' but got ' + act_header + '<br/><br/>'

        return result

    def getErrorMessage(self, expected, got, file_name, sub_message):
        if expected is None or got is None:
            # Todo ilyenkor mit kell tenni?
            return ''
        if expected.lower() != got.lower():
            return 'Expected ' + sub_message + ' for ' + file_name + ' is ' + expected + ' but got: ' + got + '<br/><br/>'
        return ''

    def move(self):
        target_dir = request.form.get('target')
        source_dir = request.form.get('staging') + '\\' + request.form.get('subFolder')

        file_names = os.listdir(source_dir)

        for file_name in file_names:
            shutil.move(os.path.join(source_dir, file_name), os.path.join(target_dir, file_name))

        os.rmdir(source_dir)

    def postProcess(self):
        pass

    def clearCache(self):
        self.cache.delete(self.CONFIG)
        self.cache.delete(self.REPOSITORY)
        self.cache.delete(self.TM1SessionId)
        self.cache.delete(self.TM1SessionExpires)
        self.cache.delete(self.CLASSES)
        return "OK"

    def getConfig(self):
        config = self.cache.get(self.CONFIG)
        if config is None:
            json_url = os.path.join(self.site_root, "settings", "config.json")
            config = json.load(open(json_url))
            self.cache.set(self.CONFIG, config, 0)
        return config

    def getParam(self, param_name):
        cnf = self.getConfig()
        return cnf[param_name]

    def getBaseUrl(self, route=''):
        cnf = self.getConfig()
        return cnf['host'] + cnf['subpath'] + '/' + route

    def getRepository(self):
        repository = self.cache.get('knowledge_seed_repository')
        if repository is None:
            json_url = os.path.join(self.site_root, "settings", "repository.json")
            repository = json.load(open(json_url))
            self.cache.set('knowledge_seed_repository', repository, 0)
        return repository

    def getMDX(self, key):
        repository = self.getRepository()
        mdx = repository[key]
        return mdx

    def getClassDescription(self, key):
        classes = self.cache.get(self.CLASSES)
        if classes is None:
            json_url = os.path.join(self.site_root, "settings", "classes.json")
            classes = json.load(open(json_url))
            self.cache.set(self.CLASSES, classes, 0)
        return classes[key]

    def addAuthenticatedCookie(self, response):
        cnf = self.getConfig()
        # TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=cnf['sessionExpiresInMinutes'] * 60)
        return response

    def getTM1SessionId(self):
        if self.cache.get(self.TM1SessionId) is None or (
                self.cache.get(self.TM1SessionExpires) is not None and datetime.datetime.now() >= self.cache.get(
            self.TM1SessionExpires)):
            return None
        return self.cache.get(self.TM1SessionId)
