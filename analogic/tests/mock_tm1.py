import gzip
from typing import Any, Dict, Iterable, List
from unittest.mock import patch

import orjson


class FakeCookies(dict):
    def get(self, key: str, default: Any = None) -> Any:  # pragma: no cover - trivial delegation
        return super().get(key, default)


class FakeRequestsResponse:
    def __init__(self, cookies: Dict[str, str]):
        self.cookies = FakeCookies(cookies)


class FakeRequestsSession:
    def __init__(self, *args, **kwargs):
        self.auth = None
        self.cookies = FakeCookies({})

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.close()
        return False

    def close(self):
        pass

    def get(self, url: str, *args, **kwargs):
        self.cookies['cam_passport'] = 'mock-passport'
        return FakeRequestsResponse({'cam_passport': 'mock-passport'})


class FakeResponse:
    def __init__(self, status_code: int, payload: Any, compressed: bool):
        self.status_code = status_code
        self._payload = payload
        self._compressed = compressed
        self.headers: Dict[str, str] = {'Content-Type': 'application/json'}
        if compressed:
            self.headers['Content-Encoding'] = 'gzip'

        raw = self._serialize_payload(payload)
        self._content = gzip.compress(raw) if compressed else raw
        self.encoding = 'utf-8'

    @staticmethod
    def _serialize_payload(payload: Any) -> bytes:
        if isinstance(payload, (bytes, bytearray)):
            return bytes(payload)
        if isinstance(payload, str):
            return payload.encode('utf-8')
        return orjson.dumps(payload)

    @property
    def content(self) -> bytes:
        return self._content

    @property
    def text(self) -> str:
        if self._compressed:
            return gzip.decompress(self._content).decode(self.encoding)
        return self._content.decode(self.encoding)

    def json(self) -> Any:
        if isinstance(self._payload, (dict, list)):
            return self._payload
        return orjson.loads(self.text)

    def get_decompressed_data(self) -> str:
        if self._compressed:
            return gzip.decompress(self._content).decode(self.encoding)
        return self.text


class FakeConnection:
    def __init__(self):
        self._connected = True

    def is_connected(self) -> bool:
        return self._connected

    def logout(self):
        self._connected = False


class FakeSession:
    def __init__(self, service: 'FakeTM1Service'):
        self._service = service

    def request(self, method: str, url: str, data: Any = None, headers: Dict[str, str] | None = None,
                verify: Any = None, decode_content: bool = True, **kwargs) -> FakeResponse:
        return self._service._request(method, url, data, headers, verify, decode_content, **kwargs)


class FakeTM1Service:
    _mdx_payload = {
        'Cells': [
            {'Ordinal': 0, 'Value': 1},
            {'Ordinal': 1, 'Value': 2}
        ]
    }

    _configuration_payload = {
        'Name': 'Mock TM1 Instance',
        'Version': 'P',
    }

    def __init__(self, *args, **kwargs):
        self._user_name = kwargs.get('user', 'mock-user')
        self.connection = FakeConnection()
        self._session = FakeSession(self)

    def get_session(self) -> FakeSession:
        return self._session

    def close_session(self):
        self.connection.logout()

    def re_authenticate(self):
        self.connection._connected = True

    def _request(self, method: str, url: str, data: Any, headers: Dict[str, str] | None,
                 verify: Any, decode_content: bool, **_) -> FakeResponse:
        if not self.connection.is_connected():
            return FakeResponse(401, {'message': 'Unauthorized'}, compressed=False)

        if 'ActiveUser' in url:
            return FakeResponse(200, {'Name': self._user_name}, compressed=False)

        if 'Configuration' in url:
            return FakeResponse(200, self._configuration_payload, compressed=False)

        if 'ExecuteMDX' in url:
            response_status = 201 if method.upper() == 'POST' else 200
            return FakeResponse(response_status, self._mdx_payload, compressed=not decode_content)

        return FakeResponse(200, {'message': 'ok'}, compressed=False)


def start_tm1_mocks() -> List[Any]:
    targets = [
        'analogic.loginbasic.AnalogicTM1Service',
        'analogic.cam.AnalogicTM1Service',
    ]

    patchers: List[Any] = [patch(target, FakeTM1Service) for target in targets]
    patchers.append(patch('requests.Session', FakeRequestsSession))

    for patcher in patchers:
        patcher.start()

    return patchers


def stop_tm1_mocks(patchers: Iterable[Any]):
    if not patchers:
        return
    for patcher in patchers:
        patcher.stop()
