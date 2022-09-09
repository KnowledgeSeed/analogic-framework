import os
from analogic.analogic import create_app
from flask import session
import pytest


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


def test_login(client):
    with client:
        response = client.post("/loginbasic/login", data={"username": "Admin", "password": ""}, follow_redirects=True)

        assert session.get("loginbasic_logged_in_user_name") == 'Admin'
        assert response.request.path == '/loginbasic/'
        assert len(response.history) == 1
        assert response.status_code == 200
