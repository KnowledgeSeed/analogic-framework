from analogic.cam import Cam
from flask import request, make_response, redirect
from analogic.signals import logged_in


class CamSecure(Cam):

    def __init__(self, setting):
        super().__init__(setting)

    def auth(self):
        resp = make_response(redirect(self.setting.get_base_url()))

        cam_name = self.set_tm1_service(request.form.get('c_pp'))
        self.session_handler.set(self.logged_in_user_session_name, cam_name)
        self.load_permissions()
        logged_in.send(self, user_name=cam_name, password='')
        return self._add_authenticated_cookies(resp)

    def do_login(self, user_name, password):
        raise Exception('Cam authentication mode must be the primary and only login endpoint')

    def get_base_url(self):
        return self.setting.get_proxy_target_url()

    @staticmethod
    def get_setting_parameter_descriptions():
        result = super(CamSecure, CamSecure).get_setting_parameter_descriptions()
        del result['apiHost']
        return result
