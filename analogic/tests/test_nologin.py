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
    response = client.get('/nologin/')
    assert response.status_code == 200


def test_login(client):
    response = client.get('/nologin/login')
    assert response.status_code == 302


def test_session(client):
    with client:
        response = client.get('/nologin/')
        assert session.get('nologin_logged_in_user_name') == 'nologin'
