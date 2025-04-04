from TM1py import TM1Service
from TM1py.Services import HierarchyService, SecurityService, ApplicationService, SubsetService, ServerService, \
    MonitoringService, ProcessService, PowerBiService, AnnotationService, ViewService, RestService, CellService, \
    ChoreService, DimensionService, CubeService, ElementService, SandboxService, GitService, LoggerService, \
    JobService, UserService, ThreadService, SessionService, TransactionLogService, MessageLogService, ConfigurationService, \
    AuditLogService
from TM1py.Services.FileService import FileService
from TM1py.Utils import case_and_space_insensitive_equals
from TM1py.Exceptions.Exceptions import TM1pyVersionDeprecationException
from TM1py.Exceptions import TM1pyRestException
from TM1py.Services.RestService import AuthenticationMode
from requests.auth import HTTPBasicAuth
from requests import Session as BaseSession
from requests.adapters import HTTPAdapter as BaseHTTPAdapter
from requests.adapters import (DEFAULT_POOLBLOCK, DEFAULT_POOLSIZE, DEFAULT_RETRIES)
from requests import Request
from requests import Response as BaseResponse
import requests

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
import warnings
import time
from typing import Optional
from requests import Timeout
from TM1py.Exceptions.Exceptions import TM1pyTimeout
import re


try:
    from requests_negotiate_sspi import HttpNegotiateAuth
except ImportError:
    warnings.warn("requests_negotiate_sspi failed to import. SSO will not work", ImportWarning)


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
        if hasattr(self, "socket_options"):
            kwargs["socket_options"] = self.socket_options
        super(HTTPAdapterWithSocketOptions, self).init_poolmanager(*args, **kwargs)


class AnalogicRestService(RestService):

    def __init__(self, **kwargs):
        """ Create an instance of RESTService
        :param address: String - address of the TM1 instance
        :param port: Int - HTTPPortNumber as specified in the tm1s.cfg
        :param ssl: boolean -  as specified in the tm1s.cfg
        :param instance: string -  planing analytics engine (v12) instance name
        :param database: string -  planing analytics engine (v12) database name
        :param base_url - base url
        :param auth_url - auth url for planning analytics engine (v12)
        :param user: String - name of the user
        :param password String - password of the user
        :param decode_b64 - whether password argument is b64 encoded
        :param namespace String - optional CAM namespace
        :param cam_passport: String - the cam passport
        :param session_id: String - TM1SessionId e.g. q7O6e1w49AixeuLVxJ1GZg
        :param application_client_id - planning analytics engine (v12) named application client ID created via manage service
        :param application_client_secret - planning analytics engine (v12) named application secret created via manage service
        :param api_key: String - planing analytics engine (v12) API Key from https://cloud.ibm.com/iam/apikeys
        :param iam_url: String - planing analytics engine (v12) IBM Cloud IAM URL. Default: "https://iam.cloud.ibm.com"
        :param pa_url: String - planing analytics engine (v12) PA URL e.g., "https://us-east-2.aws.planninganalytics.ibm.com"
        :param cpd_url: String - cloud pack for data url (aka ZEN) CPD URL e.g., "https://cpd-zen.apps.cp4dpa-test11.cp.fyre.ibm.com"
        :param tenant: String - planing analytics engine (v12) Tenant e.g., YC4B2M1AG2Y6
        :param session_context: String - Name of the Application. Controls "Context" column in Arc / TM1top.
                If None, use default: TM1py
        :param verify: path to .cer file or 'True' / True / 'False' / False (if no ssl verification is required)
        :param logging: boolean - switch on/off verbose http logging into sys.stdout
        :param timeout: Float - Number of seconds that the client will wait to receive the first byte.
        :param cancel_at_timeout: Abort operation in TM1 when timeout is reached
        :param async_requests_mode: changes internal REST execution mode to avoid 60s timeout on IBM cloud
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

        # core arguments for connection
        self._ssl = self.translate_to_boolean(kwargs.get('ssl', True))
        self._address = kwargs.get('address', None)
        self._port = kwargs.get('port', None)
        self._base_url = kwargs.get('base_url', None)
        self._auth_url = kwargs.get('auth_url', None)
        self._instance = kwargs.get('instance', None)
        self._database = kwargs.get('database', None)
        self._api_key = kwargs.get('api_key', None)
        self._iam_url = kwargs.get('iam_url', None)
        self._pa_url = kwargs.get('pa_url', None)
        self._cpd_url = kwargs.get('cpd_url', None)
        self._tenant = kwargs.get('tenant', None)
        self._user = kwargs.get('user', None)

        # other arguments
        self._auth_mode = self._determine_auth_mode()
        self._timeout = None if kwargs.get('timeout', None) is None else float(kwargs.get('timeout'))
        self._cancel_at_timeout = kwargs.get('cancel_at_timeout', False)
        self._async_requests_mode = self.translate_to_boolean(kwargs.get('async_requests_mode', False))
        self._connection_pool_size = kwargs.get('connection_pool_size', self.DEFAULT_CONNECTION_POOL_SIZE)
        self._re_connect_on_session_timeout = kwargs.get('re_connect_on_session_timeout', True)
        # is retrieved on demand and then cached
        self._sandboxing_disabled = None
        # optional verbose logging to stdout
        self.handle_logging(kwargs.get('logging', False))

        self._proxies = self._handle_proxies(kwargs.get('proxies', None))
        self._is_admin = None
        self._is_data_admin = None
        self._is_security_admin = None
        self._is_ops_admin = None

        # populated later on the fly for users with the name different from 'Admin'
        if self._user and case_and_space_insensitive_equals(self._user, 'ADMIN'):
            self._is_admin = True
            self._is_data_admin = True
            self._is_security_admin = True
            self._is_ops_admin = True

        self._verify = self._determine_verify(kwargs.get('verify', None))

        self._base_url, self._auth_url = self._construct_service_and_auth_root()

        self._version = None
        self._headers = self.HEADERS.copy()
        if "session_context" in kwargs:
            self._headers["TM1-SessionContext"] = kwargs["session_context"]

        self.disable_http_warnings()

        self._s = Session()  # mod out Session

        self._manage_http_adapter()  # mod move from end of method

        if self._proxies:
            self._s.proxies = self._proxies

        # First contact with TM1
        self.connect()
        if not self._version:
            self.set_version()

    def _manage_http_adapter(self):  # mod override for using our base adapter
        adapter = HTTPAdapterWithSocketOptions(
            pool_connections=int(self._connection_pool_size or self.DEFAULT_CONNECTION_POOL_SIZE),
            pool_maxsize=int(self._connection_pool_size))

        self._s.mount(self._base_url, adapter)

    def connect(self):
        if "session_id" in self._kwargs:
            self._s.cookies.set("TM1SessionId", self._kwargs["session_id"])
        else:
            self._start_session(
                user=self._kwargs.get("user", None),
                password=self._kwargs.get("password", None),
                namespace=self._kwargs.get("namespace", None),
                gateway=self._kwargs.get("gateway", None),
                cam_passport=self._kwargs.get("cam_passport", None),
                decode_b64=self.translate_to_boolean(self._kwargs.get("decode_b64", False)),
                integrated_login=self.translate_to_boolean(self._kwargs.get("integrated_login", False)),
                integrated_login_domain=self._kwargs.get("integrated_login_domain"),
                integrated_login_service=self._kwargs.get("integrated_login_service"),
                integrated_login_host=self._kwargs.get("integrated_login_host"),
                integrated_login_delegate=self._kwargs.get("integrated_login_delegate"),
                impersonate=self._kwargs.get("impersonate", None),
                application_client_id=self._kwargs.get("application_client_id", None),
                application_client_secret=self._kwargs.get("application_client_secret", None),
                intergated_username=self._kwargs.get("integrated_username", None),
                integrated_password=self._kwargs.get("integrated_password", None)
            )

    def verify_compressed_response(self, response: Response):
        """ check if Status Code is OK
        :Parameters:
            `response`: String
                the response that is returned from a method call
        :Exceptions:
            TM1pyException, raises TM1pyException when Code is not 200, 204 etc.
        """
        if not response.ok:
            raise TM1pyRestException(response.get_decompressed_data(),
                                     status_code=response.status_code,
                                     reason=response.reason,
                                     headers=response.headers)

    def request(
            self,
            method: str,
            url: str,
            data: str = '',
            encoding='utf-8',
            async_requests_mode: Optional[bool] = None,
            return_async_id=False,
            timeout: float = None,
            cancel_at_timeout: bool = False,
            decode_content: bool = True,#Mod
            **kwargs):

        original_url = url #Mod
        url, data = self._url_and_body(
            url=url,
            data=data,
            encoding=encoding)

        timeout = timeout if timeout else self._timeout

        try:
            if return_async_id:
                async_requests_mode = True
            # determine async_requests_mode
            elif async_requests_mode is None:
                async_requests_mode = self._async_requests_mode

            if not async_requests_mode:
                response = self._s.request(method=method, url=url, data=data, verify=self._verify, timeout=timeout, decode_content=decode_content,#Mod
                                           **kwargs)
                if self._re_connect_on_session_timeout and response.status_code == 401:
                    self.connect()
                    response = self._s.request(method=method, url=url, data=data, verify=self._verify, timeout=timeout, decode_content=decode_content,#Mod
                                               **kwargs)

            else:
                additional_header = {'Prefer': 'respond-async'}
                http_headers = kwargs.get('headers', dict())
                http_headers.update(additional_header)
                kwargs['headers'] = http_headers
                response = self._s.request(method=method, url=url, data=data, verify=self._verify, timeout=timeout, decode_content=decode_content,#Mod
                                           **kwargs)
                # reconnect in case of session timeout
                if self._re_connect_on_session_timeout and response.status_code == 401:
                    self.connect()
                    response = self._s.request(method=method, url=url, data=data, verify=self._verify, timeout=timeout, decode_content=decode_content,#Mod
                                               **kwargs)
                self.verify_response(response=response)

                if 'Location' not in response.headers or "'" not in response.headers['Location']:
                    raise ValueError(f"Failed to retrieve async_id from request {method} '{url}'")
                async_id = response.headers.get('Location').split("'")[1]
                if return_async_id:
                    return async_id

                for wait in RestService.wait_time_generator(timeout):
                    response = self.retrieve_async_response(async_id)
                    if response.status_code in [200, 201]:
                        break
                    time.sleep(wait)

                # all wait times consumed and still no 200
                if response.status_code not in [200, 201]:
                    if cancel_at_timeout or (cancel_at_timeout is None and self._cancel_at_timeout):
                        self.cancel_async_operation(async_id)
                    raise TM1pyTimeout(method=method, url=url, timeout=timeout)

                # response transformation necessary in TM1 < v11. Not required for v12
                if response.content.startswith(b"HTTP/"):
                    response = self.build_response_from_binary_response(response.content)
                else:
                    # In v12 status_code must be set explicitly, as it is 200 by default
                    response.status_code = int(response.headers['asyncresult'])

            # verify
            if decode_content is False:
                self.verify_compressed_response(response=response)#Mod
            else:
                self.verify_response(response=response)

            # response encoding
            response.encoding = encoding

            return response

        except Timeout:
            if cancel_at_timeout or (cancel_at_timeout is None and self._cancel_at_timeout):
                self.cancel_running_operation()
            raise TM1pyTimeout(method=method, url=url, timeout=timeout)

        except ConnectionError as e:
            # cater for issue in requests library: https://github.com/psf/requests/issues/5430
            if re.search('Read timed out', str(e), re.IGNORECASE):
                if cancel_at_timeout or (cancel_at_timeout is None and self._cancel_at_timeout):
                    self.cancel_running_operation()
                raise TM1pyTimeout(method=method, url=url, timeout=timeout)

            # A connection error that requires attention (e.g. SSL)
            raise e

    def _start_session(self, user: str, password: str, decode_b64: bool = False, namespace: str = None,
                       gateway: str = None, cam_passport: str = None, integrated_login: bool = None,
                       integrated_login_domain: str = None, integrated_login_service: str = None,
                       integrated_login_host: str = None, integrated_login_delegate: bool = None,
                       impersonate: str = None,
                       application_client_id: str = None, application_client_secret: str = None,
                       intergated_username: str = None, integrated_password: str = None):#Mod integrated_username,integrated_password
        """ perform a simple GET request (Ask for the TM1 Version) to start a session
        """
        # Authorization with integrated_login
        if integrated_login:
            self._s.auth = HttpNegotiateAuth(
                username=intergated_username,#Mod integrated_username
                password=integrated_password,#Mod integrated_password
                domain=integrated_login_domain,
                service=integrated_login_service,
                host=integrated_login_host,
                delegate=integrated_login_delegate)

        elif self._auth_mode == AuthenticationMode.SERVICE_TO_SERVICE:
            application_auth = HTTPBasicAuth(application_client_id, application_client_secret)
            self._s.auth = application_auth

        # Get the JWT token from the CPD URL
        elif self._auth_mode == AuthenticationMode.PA_PROXY:
            credentials = {"username": user, "password": password}
            jwt = self._generate_cpd_access_token(credentials)

        elif self._auth_mode == AuthenticationMode.IBM_CLOUD_API_KEY:
            access_token = self._generate_ibm_iam_cloud_access_token()
            self.add_http_header('Authorization', "Bearer " + access_token)

        # v11 authorization (Basic, CAM) through Headers
        else:
            token = self._build_authorization_token(
                user,
                self.b64_decode_password(password) if decode_b64 else password,
                namespace,
                gateway,
                cam_passport,
                self._verify)
            self.add_http_header('Authorization', token)

        # process additional headers
        if impersonate:
            if self._auth_mode.use_v12_auth:
                raise TM1pyVersionDeprecationException('User Impersonation', '12')
            else:
                self.add_http_header('TM1-Impersonate', impersonate)

        try:
            # skip re_connect to avoid infinite recursion in case of invalid credentials
            original_value = self._re_connect_on_session_timeout
            try:
                self._re_connect_on_session_timeout = False
                if self._auth_mode == AuthenticationMode.SERVICE_TO_SERVICE:
                    payload = {"User": user}
                    response = self._s.post(
                        url=self._auth_url,
                        headers=self._headers,
                        verify=self._verify,
                        timeout=self._timeout,
                        json=payload)
                    self.verify_response(response)
                    if 'TM1SessionId' not in self._s.cookies:
                        # if session had incorrect domain due to CP4D extract it and add it to cookie jar
                        self._s.cookies.set(
                            "TM1SessionId",
                            self._extract_tm1_session_id_from_set_cookie_header(auth_response_headers=response.headers))
                        warnings.warn(
                            f"TM1SessionId has failed to be automatically added to the session cookies, future requests "
                            "using this TM1Service will use the session id extracted from the first response "
                            "Check the tm1-gateway domain settings are correct"
                            "in the container orchestrator ")
                elif self._auth_mode == AuthenticationMode.PA_PROXY:
                    header = {'Content-Type': 'application/x-www-form-urlencoded'}
                    payload = f"jwt={jwt}"
                    response = self._s.post(
                        url=self._auth_url,
                        headers=header,
                        verify=self._verify,
                        timeout=self._timeout,
                        data=payload)
                    self.verify_response(response)
                    csrf_cookie = response.cookies.get_dict(self._address, '/')['ba-sso-csrf']
                    self.add_http_header('ba-sso-authenticity', csrf_cookie)
                else:
                    response = self._s.get(
                        url=self._auth_url,
                        headers=self._headers,
                        verify=self._verify,
                        timeout=self._timeout)
                    self.verify_response(response)
                    self._version = response.text

            finally:
                self._re_connect_on_session_timeout = original_value

            if response is None:
                raise ValueError(f"No response returned from URL: '{self._auth_url}'. "
                                 f"Please double check your address and port number in the URL.")


        finally:
            # After we have session cookie, drop the Authorization Header
            self.remove_http_header('Authorization')




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
        self._tm1_rest = AnalogicRestService(**kwargs)#Mod
        self.annotations = AnnotationService(self._tm1_rest)
        self.cells = CellService(self._tm1_rest)
        self.chores = ChoreService(self._tm1_rest)
        self.cubes = CubeService(self._tm1_rest)
        self.dimensions = DimensionService(self._tm1_rest)
        self.elements = ElementService(self._tm1_rest)
        self.git = GitService(self._tm1_rest)
        self.hierarchies = HierarchyService(self._tm1_rest)
        self.processes = ProcessService(self._tm1_rest)
        self.security = SecurityService(self._tm1_rest)
        self.subsets = SubsetService(self._tm1_rest)
        self.applications = ApplicationService(self._tm1_rest)
        self.views = ViewService(self._tm1_rest)
        self.sandboxes = SandboxService(self._tm1_rest)
        self.files = FileService(self._tm1_rest)
        self.jobs = JobService(self._tm1_rest)
        self.users = UserService(self._tm1_rest)
        self.threads = ThreadService(self._tm1_rest)
        self.sessions = SessionService(self._tm1_rest)
        self.transaction_logs = TransactionLogService(self._tm1_rest)
        self.message_logs = MessageLogService(self._tm1_rest)
        self.configuration = ConfigurationService(self._tm1_rest)
        self.audit_logs = AuditLogService(self._tm1_rest)

        # higher level modules
        self.server = ServerService(self._tm1_rest)
        self.monitoring = MonitoringService(self._tm1_rest)
        self.power_bi = PowerBiService(self._tm1_rest)
        self.loggers = LoggerService(self._tm1_rest)


    def get_session(self):
        return self._tm1_rest._s

    def close_session(self):
        self._tm1_rest._s.close()
