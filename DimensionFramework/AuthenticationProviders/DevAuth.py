from DimensionFramework.AuthenticationProviders.Base import Base
from flask import render_template
from TM1py.Services import TM1Service


class DevAuth(Base):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def index(self):
        cnf = self.setting.getConfig()
        return render_template('local.html', cnf=cnf)

    def getTM1Service(self):
        cnf = self.setting.getConfig()

        return TM1Service(
            base_url=cnf['tm1ApiHost'],
            namespace=self.setting.getAppCamNamespace(),
            user=self.setting.getPoolUser(),
            password=self.setting.getPassword(),
            ssl=False)
