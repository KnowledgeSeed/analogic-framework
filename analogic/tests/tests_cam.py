import pytest
import os
from analogic.analogic import create_app


@pytest.fixture()
def app():
    site_root = os.path.realpath(os.path.dirname(__file__))
    app = create_app(site_root)

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


def test_index(app, client):
    with client:
        response = client.get("/cam", follow_redirects=True)
        assert response.status_code == 200
        assert response.request.path == '/cam/'
        assert response.request.base_url == 'http://localhost/cam/'
        assert response.request.host == 'localhost'
        assert 'redirect.js' in response.text


def test_logged_in(app, client, mocker):
    with client:
        client.set_cookie('authenticated', 'authenticated')
        mocker.patch('analogic.cam.Cam.check_app_authenticated', return_value=True)
        response = client.get("/cam", follow_redirects=True)
        assert response.status_code == 200
        assert response.request.path == '/cam/'
        assert response.request.base_url == 'http://localhost/cam/'
        assert response.request.host == 'localhost'
        assert 'redirect.js' not in response.text


def test_auth(app, client, mocker):
    with client:
        mocker.patch('analogic.cam.Cam.set_tm1_service', return_value='dddd')
        response = client.post('/cam/auth', data={'c_pp': 'fsdlfj'})
        assert response.status_code == 302


def test_auth_follow(app, client, mocker):
    with client:
        mocker.patch('analogic.cam.Cam.set_tm1_service', return_value='dddd')
        mocker.patch('analogic.cam.Cam.check_app_authenticated', return_value=True)
        response = client.post('/cam/auth', data={'c_pp': 'fsdlfj'}, follow_redirects=True)
        assert response.status_code == 200
        assert 'redirect.js' not in response.text
