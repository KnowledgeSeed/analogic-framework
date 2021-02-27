import os
import shutil
import sys
import datetime

from flask import json, request
from werkzeug.utils import secure_filename


class Base:
    CONFIG = 'knowledge_seed_config'
    REPOSITORY = 'knowledge_seed_repository'
    TM1SessionId = 'tm1_session_id'
    TM1SessionExpires = 'tm1_session_expires'

    def __init__(self, cache, site_root):
        self.cache = cache
        self.site_root = site_root

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

    def processFiles(self):
        try:
            if request.form.get('mode') == 'upload':
                return self.upload()
            else:
                return self.move()
        except:
            print('Unexpected error:')
            return 'Unexpected error', 200, {'Content-Type': 'application/json'}

    def upload(self):

        sub_folder = request.form.get('subFolder')
        path = request.form.get('path')
        target = path

        if sub_folder != "":
            target = path + '\\' + sub_folder
            os.mkdir(target)

        for f in request.files.values():
            filename = secure_filename(f.filename)
            f.save(os.path.join(target, filename))

        return 'ok', 200, {'Content-Type': 'application/json'}

    def move(self):
        target_dir = request.form.get('path')
        source_dir = request.form.get('source') + '\\' + request.form.get('subFolder')

        file_names = os.listdir(source_dir)

        for file_name in file_names:
            shutil.move(os.path.join(source_dir, file_name), os.path.join(target_dir, file_name))

        os.rmdir(source_dir)

        return 'ok', 200, {'Content-Type': 'application/json'}

    def clearCache(self):
        self.cache.delete(self.CONFIG)
        self.cache.delete(self.REPOSITORY)
        self.cache.delete(self.TM1SessionId)
        self.cache.delete(self.TM1SessionExpires)
        return "OK"

    def getConfig(self):
        config = self.cache.get(self.CONFIG)
        if config is None:
            json_url = os.path.join(self.site_root, "settings", "config.json")
            config = json.load(open(json_url))
            self.cache.set(self.CONFIG, config)
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
            self.cache.set('knowledge_seed_repository', repository)
        return repository

    def getMDX(self, key):
        repository = self.getRepository()
        mdx = repository[key]
        return mdx

    def addAuthenticatedCookie(self, response):
        cnf = self.getConfig()
        #TODO secure, httpOnly!!!
        response.set_cookie('authenticated', 'authenticated', max_age=cnf['sessionExpiresInMinutes'] * 60)
        return response

    def getTM1SessionId(self):
        if self.cache.get(self.TM1SessionId) is None or (
                    self.cache.get(self.TM1SessionExpires) is not None and datetime.datetime.now() >= self.cache.get(
                self.TM1SessionExpires)):
            return None
        return self.cache.get(self.TM1SessionId)

