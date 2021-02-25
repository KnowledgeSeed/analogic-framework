from AuthenticationProviders.Base import Base
from flask import render_template, request, make_response, redirect, url_for


class Cam(Base):
    def __init__(self, cache, site_root):
        super().__init__(cache, site_root)

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=self.getConfig())

    def auth(self):
        #proxy workaround:
        #resp = make_response(redirect(url_for('index')))
        resp = make_response(redirect(self.getBaseUrl()))
        #end proxy workaround
        resp.set_cookie('camPassport', request.form.get('c_pp'))
        return self.addAuthenticatedCookie(resp)
