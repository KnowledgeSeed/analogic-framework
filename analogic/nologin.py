from analogic.authentication_provider import AuthenticationProvider
from analogic.multi_authentication_provider_interface import MultiAuthenticationProviderInterface
from flask import render_template, make_response, redirect, session, jsonify
import logging


class NoLogin(AuthenticationProvider, MultiAuthenticationProviderInterface):

    def __init__(self, setting):
        super().__init__(setting)

    def index(self):
        cnf = self.setting.get_config()

        resp = make_response(render_template('index.html', authenticated=True, cnf=cnf))

        self.session_handler.set(self.logged_in_user_session_name, 'nologin')

        return self._add_authenticated_cookies(resp, 86400)

    def login(self):
        return redirect(self.setting.get_base_url())

    def do_login(self, user_name, password):
        pass

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies, decode_content=True):
        return {}

    def check_app_authenticated(self):
        return True

    def get_authentication_required_response(self):
        return redirect(self.setting.get_base_url())

    def _extend_login_session(self):
        session.modified = True

    def get_tm1_service(self):
        return None

    def active_user(self):
        return jsonify({'username': self.get_logged_in_user_name()})

    def getLogger(self):
        return logging.getLogger(__name__)
