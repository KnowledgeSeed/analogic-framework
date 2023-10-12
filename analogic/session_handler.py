from flask import session


class SessionHandler:

    def __init__(self, base_prefix):
        self.base_prefix = base_prefix

    def get(self, key, default_value=None):
        return session.get(self.base_prefix + key, default_value)

    def set(self, key, value):
        session[self.base_prefix + key] = value

    def delete(self, key):
        del session[self.base_prefix + key]

    def is_exist(self, key):
        return (self.base_prefix + key) in session

    def clear(self):
        session.clear()
