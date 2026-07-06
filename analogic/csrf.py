import secrets
from hmac import compare_digest

from flask import request, session


SEEDER_STUDIO_CSRF_HEADER = 'X-Seeder-Studio-CSRFToken'
SEEDER_STUDIO_CSRF_SESSION_KEY = '_seeder_studio_csrf_token'


def get_or_create_seeder_studio_csrf_token():
    token = session.get(SEEDER_STUDIO_CSRF_SESSION_KEY)
    if not token:
        token = secrets.token_urlsafe(32)
        session[SEEDER_STUDIO_CSRF_SESSION_KEY] = token
    return token


def validate_seeder_studio_csrf_header(header_name=SEEDER_STUDIO_CSRF_HEADER):
    expected = session.get(SEEDER_STUDIO_CSRF_SESSION_KEY)
    received = request.headers.get(header_name, '')
    if not expected or not received:
        return False
    return compare_digest(str(expected), str(received))
