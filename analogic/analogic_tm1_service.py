from TM1py import TM1Service
from TM1py.Services import HierarchyService, SecurityService, ApplicationService, SubsetService, ServerService, \
    MonitoringService, ProcessService, PowerBiService, AnnotationService, ViewService, RestService, CellService, \
    ChoreService, DimensionService, CubeService, ElementService, SandboxService, GitService
from TM1py.Utils import case_and_space_insensitive_equals
from typing import Union
from requests import Session as BaseSession
from requests.adapters import HTTPAdapter as BaseHTTPAdapter
from requests.adapters import (DEFAULT_POOLBLOCK, DEFAULT_POOLSIZE, DEFAULT_RETRIES, DEFAULT_POOL_TIMEOUT)
from requests import Request
from requests import Response as BaseResponse
import http.client as http_client

from urllib3.response import HTTPResponse
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
            decode_content=True
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
            "decode_content": decode_content
        }
        send_kwargs.update(settings)
        resp = self.send(prep, **send_kwargs)

        return resp


class Response(BaseResponse):
    def __init__(self, decode_content=True):
        super().__init__()
        self._decode_content = decode_content

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
                    yield from self.raw.stream(chunk_size, decode_content=self._decode_content)
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
                    if self._decode_content:
                        chunk = self.raw.read(chunk_size)
                    else:
                        chunk = self.raw.read(chunk_size, decode_content=False)
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

    def get_decompressed_data(self):
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
            self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None, decode_content=True
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
            if not chunked:
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
                )

            # Send the request.
            else:
                if hasattr(conn, "proxy_pool"):
                    conn = conn.proxy_pool

                low_conn = conn._get_conn(timeout=DEFAULT_POOL_TIMEOUT)

                try:
                    skip_host = "Host" in request.headers
                    low_conn.putrequest(
                        request.method,
                        url,
                        skip_accept_encoding=True,
                        skip_host=skip_host,
                    )

                    for header, value in request.headers.items():
                        low_conn.putheader(header, value)

                    low_conn.endheaders()

                    for i in request.body:
                        low_conn.send(hex(len(i))[2:].encode("utf-8"))
                        low_conn.send(b"\r\n")
                        low_conn.send(i)
                        low_conn.send(b"\r\n")
                    low_conn.send(b"0\r\n\r\n")

                    # Receive the response from the server
                    r = low_conn.getresponse()

                    resp = HTTPResponse.from_httplib(
                        r,
                        pool=conn,
                        connection=low_conn,
                        preload_content=False,
                        decode_content=False,
                    )
                except Exception:
                    # If we hit any problems here, clean up the connection.
                    # Then, raise so that we can handle the actual exception.
                    low_conn.close()
                    raise

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

        return self.build_response(request, resp, decode_content)

    def build_response(self, req, resp, decode_content=True):
        """Builds a :class:`Response <requests.Response>` object from a urllib3
        response. This should not be called from user code, and is only exposed
        for use when subclassing the
        :class:`HTTPAdapter <requests.adapters.HTTPAdapter>`

        :param req: The :class:`PreparedRequest <PreparedRequest>` used to generate the response.
        :param resp: The urllib3 response object.
        :rtype: requests.Response
        """
        response = Response(decode_content=decode_content)

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
        :param async_requests_mode: changes internal REST execution mode to avoid 60s timeout on IBM cloud
        :param connection_pool_size - In a multithreaded environment, you should set this value to a
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
        """
        self._kwargs = kwargs
        self._ssl = self.translate_to_boolean(kwargs.get('ssl', True))
        self._address = kwargs.get('address', None)
        self._port = kwargs.get('port', None)
        self._verify = False
        self._timeout = None if kwargs.get('timeout', None) is None else float(kwargs.get('timeout'))
        self._async_requests_mode = self.translate_to_boolean(kwargs.get('async_requests_mode', False))
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
        # re-use or create tm1 http session
        self._s = Session()

        # manage connection pool
        if "connection_pool_size" in kwargs:
            self._manage_http_connection_pool(kwargs.get("connection_pool_size"))

        if "session_id" in kwargs:
            self._s.cookies.set("TM1SessionId", kwargs["session_id"])
        else:
            self._start_session(
                user=kwargs.get("user", None),
                password=kwargs.get("password", None),
                namespace=kwargs.get("namespace", None),
                gateway=kwargs.get("gateway", None),
                cam_passport=kwargs.get("cam_passport", None),
                decode_b64=self.translate_to_boolean(kwargs.get("decode_b64", False)),
                integrated_login=self.translate_to_boolean(kwargs.get("integrated_login", False)),
                integrated_login_domain=kwargs.get("integrated_login_domain"),
                integrated_login_service=kwargs.get("integrated_login_service"),
                integrated_login_host=kwargs.get("integrated_login_host"),
                integrated_login_delegate=kwargs.get("integrated_login_delegate"),
                impersonate=kwargs.get("impersonate", None))

        if not self._version:
            self.set_version()

        self._sandboxing_disabled = None

        # Logging
        if 'logging' in kwargs:
            if self.translate_to_boolean(value=kwargs['logging']):
                http_client.HTTPConnection.debuglevel = 1

    def _manage_http_connection_pool(self, connection_pool_size: Union[str, int]):
        self._s.mount(
            self._base_url,
            HTTPAdapter(
                pool_connections=int(connection_pool_size),
                pool_maxsize=int(connection_pool_size)))


class AnalogicTM1Service(TM1Service):

    def __init__(self, **kwargs):
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
        self.git = GitService(self._tm1_rest)

    def re_authenticate(self):
        self._tm1_rest = AnalogicRestService(**self.connection._kwargs)
        self._instantiate_services()

    def get_session(self):
        return self._tm1_rest._s

    def close_session(self):
        self._tm1_rest._s.close()
