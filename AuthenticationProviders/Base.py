import os
import shutil
import datetime

from flask import json, request, send_file
from werkzeug.utils import secure_filename
from Core.ClassLoader import ClassLoader


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
            self.upload()
            self.preProcess()
            if request.form.get('staging') != '':
                self.move()
            self.postProcess()
            return 'ok', 200, {'Content-Type': 'application/json'}
        except:
            print('Unexpected error:')
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

    def preProcess(self):
        pass

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
