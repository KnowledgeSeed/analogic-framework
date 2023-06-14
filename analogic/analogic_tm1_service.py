from TM1py import TM1Service
from TM1py.Services import HierarchyService, SecurityService, ApplicationService, SubsetService, ServerService, \
    MonitoringService, ProcessService, PowerBiService, AnnotationService, ViewService, RestService, CellService, \
    ChoreService, DimensionService, CubeService, ElementService, SandboxService, GitService
from TM1py.Services.FileService import FileService
from TM1py.Utils import case_and_space_insensitive_equals
import json
from json import JSONDecodeError
from requests import Session as BaseSession
from requests.adapters import HTTPAdapter as BaseHTTPAdapter
from requests.adapters import (DEFAULT_POOLBLOCK, DEFAULT_POOLSIZE, DEFAULT_RETRIES)
from requests import Request
from requests import Response as BaseResponse
import http.client as http_client
import socket
import requests

import urllib3
from urllib3.util import Timeout as TimeoutSauce
from urllib3.exceptions import ClosedPoolError
from urllib3.exceptions import ConnectTimeoutError
from urllib3.exceptions import HTTPError as _HTTPError
from urllib3.exceptions import MaxRetryError
from urllib3.exceptions import NewConnectionError
from urllib3.exceptions import ProxyError as _ProxyError
from urllib3.exceptions import ProtocolError
from urllib3.exceptions import ReadTimeoutError
from urllib3.exceptions import SSLError as _SSLError
from urllib3.exceptions import ResponseError
from urllib3.exceptions import LocationValueError
from urllib3.exceptions import DecodeError
from urllib3.exceptions import InvalidHeader as _InvalidHeader
from urllib3.response import GzipDecoder

from requests.exceptions import (ConnectionError, ConnectTimeout, ReadTimeout, SSLError,
                                 ProxyError, RetryError, InvalidURL, ContentDecodingError,
                                 ChunkedEncodingError, StreamConsumedError, InvalidHeader)
from requests.exceptions import SSLError as RequestsSSLError
from requests.structures import CaseInsensitiveDict
from requests.cookies import extract_cookies_to_jar
from requests.utils import get_encoding_from_headers
from requests.utils import (stream_decode_response_unicode, iter_slices)
import logging


class Session(BaseSession):
    def __init__(self):
        super().__init__()

    def request(
            self,
            method,
            url,
            params=None,
            data=None,
            headers=None,
            cookies=None,
            files=None,
            auth=None,
            timeout=None,
            allow_redirects=True,
            proxies=None,
            hooks=None,
            stream=None,
            verify=None,
            cert=None,
            json=None,
            decode_content=True  # mod
    ):
        """Constructs a :class:`Request <Request>`, prepares it and sends it.
        Returns :class:`Response <Response>` object.

        :param method: method for the new :class:`Request` object.
        :param url: URL for the new :class:`Request` object.
        :param params: (optional) Dictionary or bytes to be sent in the query
            string for the :class:`Request`.
        :param data: (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the :class:`Request`.
        :param json: (optional) json to send in the body of the
            :class:`Request`.
        :param headers: (optional) Dictionary of HTTP Headers to send with the
            :class:`Request`.
        :param cookies: (optional) Dict or CookieJar object to send with the
            :class:`Request`.
        :param files: (optional) Dictionary of ``'filename': file-like-objects``
            for multipart encoding upload.
        :param auth: (optional) Auth tuple or callable to enable
            Basic/Digest/Custom HTTP Auth.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple
        :param allow_redirects: (optional) Set to True by default.
        :type allow_redirects: bool
        :param proxies: (optional) Dictionary mapping protocol or protocol and
            hostname to the URL of the proxy.
        :param stream: (optional) whether to immediately download the response
            content. Defaults to ``False``.
        :param verify: (optional) Either a boolean, in which case it controls whether we verify
            the server's TLS certificate, or a string, in which case it must be a path
            to a CA bundle to use. Defaults to ``True``. When set to
            ``False``, requests will accept any TLS certificate presented by
            the server, and will ignore hostname mismatches and/or expired
            certificates, which will make your application vulnerable to
            man-in-the-middle (MitM) attacks. Setting verify to ``False``
            may be useful during local development or testing.
        :param cert: (optional) if String, path to ssl client cert file (.pem).
            If Tuple, ('cert', 'key') pair.
        :rtype: requests.Response
        """
        # Create the Request.
        req = Request(
            method=method.upper(),
            url=url,
            headers=headers,
            files=files,
            data=data or {},
            json=json,
            params=params or {},
            auth=auth,
            cookies=cookies,
            hooks=hooks,
        )
        prep = self.prepare_request(req)

        proxies = proxies or {}

        settings = self.merge_environment_settings(
            prep.url, proxies, stream, verify, cert
        )

        # Send the request.
        send_kwargs = {
            "timeout": timeout,
            "allow_redirects": allow_redirects,
            "decode_content": decode_content  # mod
        }
        send_kwargs.update(settings)
        resp = self.send(prep, **send_kwargs)

        return resp


class Response(BaseResponse):
    def __init__(self, decode_content=True):  # mod
        super().__init__()
        self._decode_content = decode_content  # mod

    def iter_content(self, chunk_size=1, decode_unicode=False):
        """Iterates over the response data.  When stream=True is set on the
        request, this avoids reading the content at once into memory for
        large responses.  The chunk size is the number of bytes it should
        read into memory.  This is not necessarily the length of each item
        returned as decoding can take place.

        chunk_size must be of type int or None. A value of None will
        function differently depending on the value of `stream`.
        stream=True will read data as it arrives in whatever size the
        chunks are received. If stream=False, data is returned as
        a single chunk.

        If decode_unicode is True, content will be decoded using the best
        available encoding based on the response.
        """

        def generate():
            # Special case for urllib3.
            if hasattr(self.raw, "stream"):
                try:
                    yield from self.raw.stream(chunk_size, decode_content=self._decode_content)  # mod
                except ProtocolError as e:
                    raise ChunkedEncodingError(e)
                except DecodeError as e:
                    raise ContentDecodingError(e)
                except ReadTimeoutError as e:
                    raise ConnectionError(e)
                except SSLError as e:
                    raise RequestsSSLError(e)
            else:
                # Standard file-like object.
                while True:
                    if self._decode_content:  # mod
                        chunk = self.raw.read(chunk_size)  # mod
                    else:  # mod
                        chunk = self.raw.read(chunk_size, decode_content=False)  # mod
                    if not chunk:
                        break
                    yield chunk

            self._content_consumed = True

        if self._content_consumed and isinstance(self._content, bool):
            raise StreamConsumedError()
        elif chunk_size is not None and not isinstance(chunk_size, int):
            raise TypeError(
                f"chunk_size must be an int, it is instead a {type(chunk_size)}."
            )
        # simulate reading small chunks of the content
        reused_chunks = iter_slices(self._content, chunk_size)

        stream_chunks = generate()

        chunks = reused_chunks if self._content_consumed else stream_chunks

        if decode_unicode:
            chunks = stream_decode_response_unicode(chunks, self)

        return chunks

    def get_decompressed_data(self):  # mod add
        text = ''
        try:
            gzip_decoder = GzipDecoder()
            text = gzip_decoder.decompress(self.content).decode('utf-8')
        except Exception:
            logging.getLogger(__name__).error('Failed to decompress data')
        return text


class HTTPAdapter(BaseHTTPAdapter):

    def __init__(self, pool_connections=DEFAULT_POOLSIZE,
                 pool_maxsize=DEFAULT_POOLSIZE, max_retries=DEFAULT_RETRIES,
                 pool_block=DEFAULT_POOLBLOCK):
        super().__init__(pool_connections, pool_maxsize, max_retries, pool_block)

    def send(
            self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None, decode_content=True  # mod
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection(request.url, proxies)
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

            raise ConnectionError(e, request=request)

        except ClosedPoolError as e:
            raise ConnectionError(e, request=request)

        except _ProxyError as e:
            raise ProxyError(e)

        except (_SSLError, _HTTPError) as e:
            if isinstance(e, _SSLError):
                # This branch is for urllib3 versions earlier than v1.22
                raise SSLError(e, request=request)
            elif isinstance(e, ReadTimeoutError):
                raise ReadTimeout(e, request=request)
            elif isinstance(e, _InvalidHeader):
                raise InvalidHeader(e, request=request)
            else:
                raise

        return self.build_response(request, resp, decode_content)  # mod

    def build_response(self, req, resp, decode_content=True):  # mod
        """Builds a :class:`Response <requests.Response>` object from a urllib3
        response. This should not be called from user code, and is only exposed
        for use when subclassing the
        :class:`HTTPAdapter <requests.adapters.HTTPAdapter>`

        :param req: The :class:`PreparedRequest <PreparedRequest>` used to generate the response.
        :param resp: The urllib3 response object.
        :rtype: requests.Response
        """
        response = Response(decode_content=decode_content)  # mod

        # Fallback to None if there's no status_code, for whatever reason.
        response.status_code = getattr(resp, "status", None)

        # Make headers case-insensitive.
        response.headers = CaseInsensitiveDict(getattr(resp, "headers", {}))

        # Set encoding.
        response.encoding = get_encoding_from_headers(response.headers)
        response.raw = resp
        response.reason = response.raw.reason

        if isinstance(req.url, bytes):
            response.url = req.url.decode("utf-8")
        else:
            response.url = req.url

        # Add new cookies from the server.
        extract_cookies_to_jar(response.cookies, req, resp)

        # Give the Response some context.
        response.request = req
        response.connection = self

        return response


class HTTPAdapterWithSocketOptions(HTTPAdapter):  # mod added for our adapter
    def __init__(self, *args, **kwargs):
        self.socket_options = kwargs.pop("socket_options", None)
        super(HTTPAdapterWithSocketOptions, self).__init__(*args, **kwargs)

    def init_poolmanager(self, *args, **kwargs):
        if self.socket_options is not None:
            kwargs["socket_options"] = self.socket_options
        super(HTTPAdapterWithSocketOptions, self).init_poolmanager(*args, **kwargs)


class AnalogicRestService(RestService):

    def __init__(self, **kwargs):
        """ Create an instance of RESTService
        :param address: String - address of the TM1 instance
        :param port: Int - HTTPPortNumber as specified in the tm1s.cfg
        :param base_url - base url e.g. https://localhost:12354/api/v1
        :param user: String - name of the user
        :param password String - password of the user
        :param decode_b64 - whether password argument is b64 encoded
        :param namespace String - optional CAM namespace
        :param ssl: boolean -  as specified in the tm1s.cfg
        :param cam_passport: String - the cam passport
        :param session_id: String - TM1SessionId e.g. q7O6e1w49AixeuLVxJ1GZg
        :param session_context: String - Name of the Application. Controls "Context" column in Arc / TM1top.
                If None, use default: TM1py
        :param verify: path to .cer file or 'True' / True / 'False' / False (if no ssl verification is required)
        :param logging: boolean - switch on/off verbose http logging into sys.stdout
        :param timeout: Float - Number of seconds that the client will wait to receive the first byte.
        :param cancel_at_timeout: Abort operation in TM1 when timeout is reached
        :param async_requests_mode: changes internal REST execution mode to avoid 60s timeout on IBM cloud
        :param tcp_keepalive: maintain the TCP connection all the time, users should choose either async_requests_mode or tcp_keepalive to run a long-run request
                If both are True, use async_requests_mode by default
        :param connection_pool_size - In a multi threaded environment, you should set this value to a
                higher number, such as the number of threads
        :param integrated_login: True for IntegratedSecurityMode3
        :param integrated_login_domain: NT Domain name.
                Default: '.' for local account.
        :param integrated_login_service: Kerberos Service type for remote Service Principal Name.
                Default: 'HTTP'
        :param integrated_login_host: Host name for Service Principal Name.
                Default: Extracted from request URI
        :param integrated_login_delegate: Indicates that the user's credentials are to be delegated to the server.
                Default: False
        :param impersonate: Name of user to impersonate
        :param re_connect_on_session_timeout: attempt to reconnect once if session is timed out
        :param proxies: pass a dictionary with proxies e.g.
                {'http': 'http://proxy.example.com:8080', 'https': 'http://secureproxy.example.com:8090'}
        """
        # store kwargs for future use e.g. re_connect on 401 session timeout
        self._kwargs = kwargs

        self._ssl = self.translate_to_boolean(kwargs.get('ssl', True))
        self._address = kwargs.get('address', None)
        self._port = kwargs.get('port', None)
        self._verify = False
        self._timeout = None if kwargs.get('timeout', None) is None else float(kwargs.get('timeout'))
        self._cancel_at_timeout = kwargs.get('cancel_at_timeout', False)
        self._async_requests_mode = self.translate_to_boolean(kwargs.get('async_requests_mode', False))
        # Set tcp_keepalive to False explicitly to turn it off when async_requests_mode is enabled
        self._tcp_keepalive = self.translate_to_boolean(
            kwargs.get('tcp_keepalive', False)) \
            if self._async_requests_mode is not True \
            else False
        self._connection_pool_size = kwargs.get('connection_pool_size', None)
        self._re_connect_on_session_timeout = kwargs.get('re_connect_on_session_timeout', True)

        # Logging
        if 'logging' in kwargs:
            if self.translate_to_boolean(value=kwargs['logging']):
                http_client.HTTPConnection.debuglevel = 1

        self._proxies = kwargs.get('proxies', None)
        # handle invalid types and potential string argument
        if not isinstance(self._proxies, (dict, str, type(None))):
            raise ValueError("Argument of 'proxies' must be None, dictionary or JSON string")
        elif isinstance(self._proxies, str):
            try:
                self._proxies = json.loads(self._proxies)
            except JSONDecodeError:
                raise ValueError("Invalid JSON passed for argument 'proxies': %s", self._proxies)

        # populated on the fly
        if kwargs.get('user'):
            self._is_admin = True if case_and_space_insensitive_equals(kwargs.get('user'), 'ADMIN') else None
        else:
            self._is_admin = None

        if 'verify' in kwargs:
            if isinstance(kwargs['verify'], str):
                if kwargs['verify'].upper() == 'FALSE':
                    self._verify = False
                elif kwargs['verify'].upper() == 'TRUE':
                    self._verify = True
                # path to .cer file
                else:
                    self._verify = kwargs.get('verify')
            elif isinstance(kwargs['verify'], bool):
                self._verify = kwargs['verify']
            else:
                raise ValueError("verify argument must be of type str or bool")

        if 'base_url' in kwargs:
            self._base_url = kwargs['base_url']
            self._ssl = self._determine_ssl_based_on_base_url()
        else:
            self._base_url = "http{}://{}:{}".format(
                's' if self._ssl else '',
                'localhost' if len(self._address) == 0 else self._address,
                self._port)

        self._version = None
        self._headers = self.HEADERS.copy()
        if "session_context" in kwargs:
            self._headers["TM1-SessionContext"] = kwargs["session_context"]

        self.disable_http_warnings()

        self._s = Session()  # mod out Session

        if self._tcp_keepalive or self._connection_pool_size is not None: #mod move from end of method
            self._manage_http_adapter()

        if self._proxies:
            self._s.proxies = self._proxies

        self.connect()

        if not self._version:
            self.set_version()

        # is retrieved on demand and cached
        self._sandboxing_disabled = None

    def _manage_http_adapter(self):  # mod override for using our base adapter
        if self._tcp_keepalive:
            # SO_KEEPALIVE: set 1 to enable TCP keepalive
            socket_options = urllib3.connection.HTTPConnection.default_socket_options + [
                (socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1),
                (socket.IPPROTO_TCP, socket.TCP_KEEPIDLE, self.TCP_SOCKET_OPTIONS['TCP_KEEPIDLE']),
                (socket.IPPROTO_TCP, socket.TCP_KEEPINTVL, self.TCP_SOCKET_OPTIONS['TCP_KEEPINTVL']),
                (socket.IPPROTO_TCP, socket.TCP_KEEPCNT, self.TCP_SOCKET_OPTIONS['TCP_KEEPCNT'])]

            if self._connection_pool_size is not None:
                adapter = HTTPAdapterWithSocketOptions(
                    pool_connections=int(self._connection_pool_size),
                    pool_maxsize=int(self._connection_pool_size),
                    socket_options=socket_options)
            else:
                adapter = HTTPAdapterWithSocketOptions(socket_options=socket_options)

        else:
            adapter = HTTPAdapterWithSocketOptions(
                pool_connections=int(self._connection_pool_size),
                pool_maxsize=int(self._connection_pool_size))

        self._s.mount(self._base_url, adapter)

    # @staticmethod
    # def build_response_from_raw_bytes(data: bytes) -> Response:
    #     urllib_response = RestService.urllib3_response_from_bytes(data)
    #
    #     adapter = HTTPAdapter()
    #     requests_response = adapter.build_response(requests.PreparedRequest(), urllib_response)
    #     # actual content of response needs to be set explicitly
    #     requests_response._content = urllib_response.data
    #
    #     return requests_response


class AnalogicTM1Service(TM1Service):

    def __init__(self, **kwargs):
        """ Initiate the TM1Service

            :param address: String - address of the TM1 instance
            :param port: Int - HTTPPortNumber as specified in the tm1s.cfg
            :param base_url - base url e.g. https://localhost:12354/api/v1
            :param user: String - name of the user
            :param password String - password of the user
            :param decode_b64 - whether password argument is b64 encoded
            :param namespace String - optional CAM namespace
            :param ssl: boolean -  as specified in the tm1s.cfg
            :param cam_passport: String - the cam passport
            :param session_id: String - TM1SessionId e.g. q7O6e1w49AixeuLVxJ1GZg
            :param session_context: String - Name of the Application. Controls "Context" column in Arc / TM1top.
                If None, use default: TM1py
            :param verify: path to .cer file or 'True' / True / 'False' / False (if no ssl verification is required)
            :param logging: boolean - switch on/off verbose http logging into sys.stdout
            :param timeout: Float - Number of seconds that the client will wait to receive the first byte.
            :param cancel_at_timeout: Abort operation in TM1 when timeout is reached
            :param async_requests_mode: changes internal REST execution mode to avoid 60s timeout on IBM cloud
            :param tcp_keepalive: maintain the TCP connection all the time, users should choose either async_requests_mode or tcp_keepalive to run a long-run request
                    If both are True, use async_requests_mode by default
            :param connection_pool_size - In a multi threaded environment, you should set this value to a
                    higher number, such as the number of threads
            :param integrated_login: True for IntegratedSecurityMode3
            :param integrated_login_domain: NT Domain name.
                    Default: '.' for local account.
            :param integrated_login_service: Kerberos Service type for remote Service Principal Name.
                    Default: 'HTTP'
            :param integrated_login_host: Host name for Service Principal Name.
                    Default: Extracted from request URI
            :param integrated_login_delegate: Indicates that the user's credentials are to be delegated to the server.
                    Default: False
            :param impersonate: Name of user to impersonate
            :param re_connect_on_session_timeout: attempt to reconnect once if session is timed out
            :param proxies: pass a dictionary with proxies e.g.
                    {'http': 'http://proxy.example.com:8080', 'https': 'http://secureproxy.example.com:8090'}
            """
        self._tm1_rest = AnalogicRestService(**kwargs)
        self.annotations = AnnotationService(self._tm1_rest)
        self.cells = CellService(self._tm1_rest)
        self.chores = ChoreService(self._tm1_rest)
        self.cubes = CubeService(self._tm1_rest)
        self.dimensions = DimensionService(self._tm1_rest)
        self.elements = ElementService(self._tm1_rest)
        self.git = GitService(self._tm1_rest)
        self.hierarchies = HierarchyService(self._tm1_rest)
        self.monitoring = MonitoringService(self._tm1_rest)
        self.power_bi = PowerBiService(self._tm1_rest)
        self.processes = ProcessService(self._tm1_rest)
        self.security = SecurityService(self._tm1_rest)
        self.server = ServerService(self._tm1_rest)
        self.subsets = SubsetService(self._tm1_rest)
        self.applications = ApplicationService(self._tm1_rest)
        self.views = ViewService(self._tm1_rest)
        self.sandboxes = SandboxService(self._tm1_rest)
        self.files = FileService(self._tm1_rest)

    # def re_authenticate(self):
    #     # self._tm1_rest = AnalogicRestService(**self.connection._kwargs)
    #     # self._instantiate_services()
    #     self._tm1_rest.connect()

    def get_session(self):
        return self._tm1_rest._s

    def close_session(self):
        self._tm1_rest._s.close()
