import os
from analogic.analogic import create_app
from flask import session
import pytest
import requests


@pytest.fixture()
def app():
    site_root = os.path.realpath(os.path.dirname(__file__))
    app = create_app(site_root)

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_index(client):
    response = client.get('/loginbasic/')
    assert response.status_code == 302


@pytest.mark.server(url='/loginbasic/', responce={"username": "Admin", "password": ""}, method='POST')
def test_login(client):
    with client:
        response = client.post("/loginbasic/", data={"username": "Admin", "password": ""}, follow_redirects=True)
        assert response.status_code == 200
        assert response.request.path == '/loginbasic/login'
        assert response.request.base_url == 'http://localhost/loginbasic/login'
        assert response.request.host == 'localhost'
        assert len(response.history) == 1

