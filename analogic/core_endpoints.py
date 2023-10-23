from analogic.endpoint import AnalogicEndpoint
from analogic.authentication_provider import get_authentication_provider
from flask import current_app, make_response, send_from_directory, request
from pywebpush import webpush, WebPushException
import json
import os

core_endpoints = AnalogicEndpoint('core_endpoints', __name__)


@core_endpoints.analogic_endpoint_route('/', methods=['GET', 'POST'])
def index():
    return get_authentication_provider().index()


@core_endpoints.analogic_endpoint_route('/login', methods=['GET', 'POST'])
def login():
    return get_authentication_provider().login()


@core_endpoints.analogic_endpoint_route('/proxy/<path:sub_path>', methods=['GET', 'POST', 'PATCH'])
def proxy(sub_path):
    return get_authentication_provider().proxy(sub_path)


@core_endpoints.analogic_endpoint_route('/activeUser', methods=['GET'])
def active_user():
    return get_authentication_provider().active_user()


@core_endpoints.analogic_endpoint_route('/auth', methods=['POST'])
def auth():
    return get_authentication_provider().auth()


@core_endpoints.analogic_endpoint_route('/logout', methods=['GET'])
def logout():
    return get_authentication_provider().logout()


@core_endpoints.analogic_endpoint_route('/export', methods=['GET', 'POST'])
def export():
    return get_authentication_provider().export()


@core_endpoints.analogic_endpoint_route('/clearcache', methods=['GET'])
def clear_cache():
    return get_authentication_provider().clear_cache()

@core_endpoints.analogic_endpoint_route('/pivot', methods=['GET', 'POST'])
def pivot():
    return get_authentication_provider().pivot()


@core_endpoints.analogic_endpoint_route('/middleware', methods=['GET', 'POST'])
def middleware():
    return get_authentication_provider().middleware()

@core_endpoints.analogic_endpoint_route('/service_worker.js', methods=['GET'])
def service_worker():
    path = os.path.join(current_app.static_folder, 'assets', 'js')
    response = make_response(send_from_directory(path, 'service_worker.js'))
    return response

@core_endpoints.analogic_endpoint_route('/push', methods=['POST'])
def push():

    sub = json.loads(request.form["sub"])

    result = "OK"
    try:
        webpush(
            subscription_info=sub,
            data=json.dumps({
                "title": "Welcome!",
                "body": "Yes, it works!",
                "data": "test",
                "actions": [
                    {
                        "action": "test",
                        "title": "Test"
                    }
                ]
            }),
            vapid_private_key='GGjUGK9GBj_cQ5Bz3DY6-1tGeIr46NpscTaC_bk_9Ns',
            vapid_claims={"sub": 'mailto:your@email.com'}
        )
    except WebPushException as ex:
        print(ex)
        result = "FAILED"
    return result
