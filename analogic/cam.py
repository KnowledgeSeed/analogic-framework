from analogic.authentication_provider import AuthenticationProvider
from flask import render_template, request, make_response, redirect, session, Response, send_file
from analogic.analogic_tm1_service import AnalogicTM1Service
import orjson
import analogic.pivot as PivotApi
from analogic.exceptions import AnalogicTM1ServiceException
from analogic.loader import ClassLoader
from analogic.authentication_provider import login_required
from analogic.signals import logged_in
from analogic.multi_authentication_provider_interface import MultiAuthenticationProviderInterface


class Cam(AuthenticationProvider, MultiAuthenticationProviderInterface):

    def __init__(self, setting):
        super().__init__(setting)

    def index(self):
        authenticated = request.cookies.get('authenticated') is not None and self.check_app_authenticated()
        return render_template('index.html', authenticated=authenticated, cnf=self.setting.get_config())

    def auth(self):
        resp = make_response(redirect(self.setting.get_base_url()))
        resp.set_cookie('camPassport', request.form.get('c_pp'))

        cam_name = self.set_tm1_service(request.form.get('c_pp'))
        self.session_handler.set(self.logged_in_user_session_name, cam_name)
        self.load_permissions()
        logged_in.send(self, user_name=cam_name, password='')
        return self._add_authenticated_cookies(resp)

    def do_login(self, user_name, password):
        raise Exception('Cam authentication mode must be the primary and only login endpoint')

    def get_base_url(self):
        return self.setting.get_config()['apiHost']

    def set_tm1_service(self, cam_passport):
        cnf = self.setting.get_config()

        tm1_service = AnalogicTM1Service(base_url=self.get_base_url(),
                                         cam_passport=cam_passport,
                                         connection_pool_size=100,
                                         ssl=self.setting.get_ssl_verify())

        response = tm1_service.get_session().request('GET', self.get_base_url() + cnf['apiSubPath'] + 'ActiveUser',
                                                     headers=self.HEADERS, verify=self.setting.get_ssl_verify())

        json_object = response.json()
        cam_name = json_object['Name']

        existing_tm1_service = self.setting.get_tm1_service(cam_name)

        if existing_tm1_service is not None:
            try:
                existing_tm1_service.close_session()
            except Exception as e:
                self._logger.error('exception while closing session: ' + str(e))

        self.setting.set_tm1_service(cam_name, tm1_service)

        return cam_name

    def _create_request_with_authenticated_user(self, url, method, mdx, headers, cookies, decode_content=True):
        tm1_service = self.setting.get_tm1_service(self.get_logged_in_user_name())
        if tm1_service is None:
            return Response('Unauthorized', status=401, mimetype='application/json')

        response = tm1_service.get_session().request(method, url, data=mdx, headers=headers,
                                                     verify=self.setting.get_ssl_verify(), decode_content=decode_content)
        if response.status_code == 401:
            try:
                tm1_service.re_authenticate()
            except Exception as e:
                self._logger.error('exception while re-authenticating: ' + str(e))
                return Response('Unauthorized', status=401, mimetype='application/json')
            response = tm1_service.get_session().request(method, url, data=mdx, headers=headers,
                                                         verify=self.setting.get_ssl_verify(), decode_content=decode_content)
        return response

    def _get_server_side_mdx(self, force_server_side_query=False):
        mdx = request.data
        if request.args.get('server') is not None or force_server_side_query is True:
            body = orjson.loads(request.data)
            key = body['key']
            if body.get('key_suffix') is not None:
                key = key + '_' + body['key_suffix']
            mdx = self.setting.get_mdx(key)
            mdx = self._set_custom_mdx_data(mdx)
            for k in body:
                if type(body[k]) is not dict:
                    mdx = mdx.replace('$' + k, body[k].replace('"', '\\"'))

            return mdx.encode('utf-8')

        return mdx

    def check_app_authenticated(self):
        return self.session_handler.get(self.logged_in_user_session_name, '') != '' and self.setting.get_tm1_service(
            self.get_logged_in_user_name()) is not None

    @login_required
    def pivot(self):
        username = self.get_logged_in_user_name()

        v = request.values
        cube_name = v.get('cube_name')
        dimension_name = v.get('dimension_name')
        hierarchy_name = v.get('hierarchy_name')
        subset_name = v.get('subset_name')
        element_names = v.getlist('element_names[]')
        subset_name_to_remove = v.get('subset_name_to_remove')
        selected_cards = v.get('selected_cards')
        options = orjson.loads(v.get('options', '{}'))
        export_data = v.get('export_data')

        try:
            tm1_service = self.get_tm1_service()
        except AnalogicTM1ServiceException as e:
            return Response('Unauthorized', status=401, mimetype='application/json')

        return PivotApi.call(tm1_service, username, cube_name, dimension_name, hierarchy_name, subset_name,
                             element_names, subset_name_to_remove, selected_cards, options, export_data)

    @login_required
    def export(self):

        file_name = request.args.get('file_name', default='export.xlsx')
        export_key = request.args.get('export_key')

        if export_key is None:
            return self.get_not_found_response()

        export_description = self.setting.get_custom_object_description(export_key)

        if export_description is None:
            return self.get_not_found_response()

        try:
            tm1_service = self.get_tm1_service()
        except AnalogicTM1ServiceException as e:
            return Response('Unauthorized', status=401, mimetype='application/json')

        try:
            response = ClassLoader().call(export_description, request, tm1_service, self.setting, self)
        except Exception as e:
            self.getLogger().error(e, exc_info=True)
            return {'message': str(e)}, 404, {'Content-type': 'application/json'}

        return send_file(response,
                         download_name=file_name,
                         as_attachment=True,
                         max_age=0,
                         mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    def get_authentication_required_response(self):
        return 'Authentication required', 401, {'Content-Type': 'application/json'}

    def get_tm1_service(self):
        tm1_service = self.setting.get_tm1_service(self.get_logged_in_user_name())
        if tm1_service is None:
            raise AnalogicTM1ServiceException('Unauthorized')

        if tm1_service.connection.is_connected() is False:
            try:
                tm1_service.re_authenticate()
            except Exception as e:
                self._logger.error('exception while re-authenticating: ' + str(e))
                raise AnalogicTM1ServiceException('Unauthorized')

        return tm1_service

    def _extend_login_session(self):
        session.modified = True

    def _set_custom_mdx_data(self, mdx):
        if mdx is not None and len(mdx) > 0:
            return mdx.replace('$activeUser', self.get_logged_in_user_name().replace('"', '\\"'))
        return mdx

    @staticmethod
    def get_setting_parameter_descriptions():
        result = super(Cam, Cam).get_setting_parameter_descriptions()
        result['camNamespace'] = {
            'required': True,
            'description': 'The Cognos Access Management namespace ID.'
        }
        result['proxy'] = {
            'target': {
                'required': True,
                'description': 'Tm1 restapi url.'
            }
        }
        result['apiHost'] = {
            'required': True,
            'description': 'Tm1 restapi url for the javascript client.'
        }
        result['authenticationBridge'] = {
            'required': True,
            'description': 'ibmcognos url for authentication, e.g.: https://<url>/ibmcognos/bi/v1?b_action=xts.run&m=portal/bridge.xts&c_env=portal/variables_TM1.xml&c_cmd=../tm1/web/tm1web.html&ps=http://localhost:5000&pg=../<frameworkappname>/auth&host=dev.knowledgeseed.ch&server=<tm1servername>'
        }

        return result

