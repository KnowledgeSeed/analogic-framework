from analogic.cam import Cam
from flask import request, make_response, redirect, session


class CamSecure(Cam):

    def __init__(self, setting):
        super().__init__(setting)

    def auth(self):
        resp = make_response(redirect(self.setting.get_base_url()))

        cam_name = self.set_tm1_service(request.form.get('c_pp'))
        session[self.logged_in_user_session_name] = cam_name
        self.load_permissions()
        return self._add_authenticated_cookies(resp)

    def get_base_url(self):
        return self.setting.get_proxy_target_url()
