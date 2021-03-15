from AuthenticationProviders.Base import Base
from flask import render_template
from TM1py.Services import TM1Service


class NoAuth(Base):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def index(self):
        cnf = self.setting.getConfig()
        return render_template('local.html', cnf=cnf)

    def getTM1Service(self):
        cnf = self.setting.getConfig()

        return TM1Service(base_url=cnf['tm1ApiHost'], namespace=cnf['camNamespace'], user=cnf['noauthUser'], password=['noauthPwd'], ssl=False)

