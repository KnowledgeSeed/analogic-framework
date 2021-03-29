from knowledgeseed.AuthenticationProviders.Pool import Pool
from flask import render_template


class DevAuthPool(Pool):
    def __init__(self, cache, site_root, instance='default'):
        super().__init__(cache, site_root, instance)

    def index(self):
        return render_template('local.html')