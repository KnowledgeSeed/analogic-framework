from analogic_pool import SSOPool
from flask import render_template, request, session, make_response, redirect
import logging
import uuid


class SSOPoolForTesting(SSOPool):
    def __init__(self, setting):
        super().__init__(setting)

    def index(self):
        cnf = self.setting.get_config()

        authenticated = request.cookies.get('authenticated') is not None
        return render_template('index.html', authenticated=authenticated, cnf=cnf)

    def auth_sso(self):
        sso_token = uuid.uuid4().hex[:6].upper()
        logger = logging.getLogger('login')

        user_name = request.args.get('username')

        logger.info(user_name + ' tries to login')

        if self._has_pool_user_access(user_name.replace('\\', '/'), sso_token) is False:
            return render_template('unauthorized.html')

        session[self.authentication_session_name] = sso_token
        session[self.authentication_session_username_name] = user_name

        resp = make_response(redirect(self.setting.get_base_url()))

        logger.info(user_name + ' logged in successfully')

        return self._add_authenticated_cookies(resp)
