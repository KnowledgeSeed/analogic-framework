from AuthenticationProviders.Pool import Pool
from flask import render_template


class NoAuthPool(Pool):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def index(self):
        return render_template('local.html')