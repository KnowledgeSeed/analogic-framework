"""Client bundles: prebuilt JavaScript apps an analogic app serves next to (or instead of) the widget pipeline.

    apps/<app>/bundles/<name>/manifest.json   entry, styles, dataSources (allowlist), csp (additions)
    apps/<app>/bundles/<name>/dist/...        the built files

Everything that is authorization stays on the server: a bundle's files are served only to a logged-in user, its
data goes through the app's own proxy / middleware / export endpoints (pool, impersonate, required_permissions and
<key>_analogic_check_access work as for widgets), and a request that names a bundle (X-Analogic-Bundle) may only
reach the data sources its manifest lists and must carry the session's CSRF token.

app.json switches:
    mainBundle        a bundle that replaces the widget main page after login
    bundleOnly        every data request must come from a bundle (no widget pipeline, no raw client MDX)
    csrfProtection    CSRF on the data endpoints for every request (default: on when mainBundle/bundleOnly is set)
    clientSecurity    {"allowUnsafeEval": bool, "allowedOrigins": [https origins bundles may load or connect to]}
"""
import hmac
import json
import os
import re
import secrets

from flask import g, request

BUNDLES_DIR = 'bundles'
MANIFEST = 'manifest.json'
BUNDLE_HEADER = 'X-Analogic-Bundle'
CSRF_HEADER = 'X-CSRFToken'
CSRF_SESSION_KEY = '_analogic_csrf_token'
NAME_PATTERN = re.compile(r'^[a-z0-9][a-z0-9_-]{0,63}$')
UNSAFE_METHODS = ('POST', 'PUT', 'PATCH', 'DELETE')
MDX_PATHS = ('api/v1/ExecuteMDX', 'api/v1/ExecuteMDXSetExpression')
DATA_SOURCE_KINDS = ('repository', 'middleware', 'export', 'rest', 'pivot')

# The CSP directives a manifest may extend, and the keyword sources it may add on its own.
CSP_DIRECTIVES = {'scriptSrc': 'script-src', 'styleSrc': 'style-src', 'imgSrc': 'img-src', 'fontSrc': 'font-src',
                  'connectSrc': 'connect-src', 'workerSrc': 'worker-src', 'mediaSrc': 'media-src'}
CSP_KEYWORDS = {"'self'", 'blob:', 'data:'}
CSP_KEYWORDS_BY_DIRECTIVE = {'script-src': {"'self'"}, 'connect-src': {"'self'"}}
ORIGIN_PATTERN = re.compile(r'^https://[a-z0-9.-]+(:\d{1,5})?$')
_manifest_cache = {}


class BundleError(ValueError):
    pass


# --------------------------------------------------------------------------------------------------------- files

def bundles_root(site_root):
    return os.path.join(site_root, BUNDLES_DIR)


def bundle_root(site_root, name):
    if not isinstance(name, str) or not NAME_PATTERN.match(name):
        raise BundleError('Invalid bundle name.')
    return os.path.join(bundles_root(site_root), name)


def safe_path(root, relative):
    """The absolute path of relative inside root, or None for anything that leaves it."""
    if not isinstance(relative, str) or not relative or '\\' in relative or '\x00' in relative:
        return None
    parts = relative.split('/')
    if relative.startswith('/') or any(p in ('', '.', '..') for p in parts):
        return None
    root_real = os.path.realpath(root)
    path = os.path.realpath(os.path.join(root_real, *parts))
    if path != root_real and path.startswith(root_real + os.sep):
        return path
    return None


def list_bundles(site_root):
    root = bundles_root(site_root)
    if not os.path.isdir(root):
        return []
    return sorted(n for n in os.listdir(root)
                  if NAME_PATTERN.match(n) and os.path.isfile(os.path.join(root, n, MANIFEST)))


# ------------------------------------------------------------------------------------------------------ manifest

def _string_list(value, field):
    if value is None:
        return []
    if not isinstance(value, list) or not all(isinstance(v, str) and v for v in value):
        raise BundleError(f'{field} must be a list of strings.')
    return list(dict.fromkeys(value))


def validate_manifest(data, root=None, client_security=None):
    """A normalized manifest; raises BundleError with every reason. root: check that the files exist."""
    if not isinstance(data, dict):
        raise BundleError('manifest.json must be an object.')
    errors = []
    name = data.get('name')
    entry = data.get('entry')
    if not isinstance(entry, str) or not entry.endswith(('.js', '.mjs')):
        errors.append('entry: a .js or .mjs file is required.')
    try:
        styles = _string_list(data.get('styles'), 'styles')
    except BundleError as e:
        errors.append(str(e))
        styles = []
    for path in ([entry] if isinstance(entry, str) else []) + styles:
        if root is not None and (safe_path(root, path) is None or not os.path.isfile(safe_path(root, path))):
            errors.append(f'{path}: not found in the bundle.')
        elif root is None and safe_path('/x', path) is None:
            errors.append(f'{path}: invalid path.')

    sources = data.get('dataSources') or {}
    normalized_sources = {}
    if not isinstance(sources, dict):
        errors.append('dataSources must be an object.')
        sources = {}
    for kind, value in sources.items():
        if kind not in DATA_SOURCE_KINDS:
            errors.append(f'dataSources.{kind}: unknown kind (allowed: {", ".join(DATA_SOURCE_KINDS)}).')
        elif kind == 'pivot':
            if not isinstance(value, bool):
                errors.append('dataSources.pivot must be true or false.')
            normalized_sources[kind] = value is True
        else:
            try:
                normalized_sources[kind] = _string_list(value, f'dataSources.{kind}')
            except BundleError as e:
                errors.append(str(e))
    for prefix in normalized_sources.get('rest', []):
        if not prefix.startswith('api/v1/') or '..' in prefix:
            errors.append(f'dataSources.rest: {prefix} must be a TM1 REST path below api/v1/.')

    csp = data.get('csp') or {}
    normalized_csp = {}
    allowed_origins = set((client_security or {}).get('allowedOrigins') or [])
    allow_unsafe_eval = (client_security or {}).get('allowUnsafeEval') is True
    if not isinstance(csp, dict):
        errors.append('csp must be an object.')
        csp = {}
    for key, value in csp.items():
        directive = CSP_DIRECTIVES.get(key)
        if directive is None:
            errors.append(f'csp.{key}: not extendable (allowed: {", ".join(CSP_DIRECTIVES)}).')
            continue
        try:
            values = _string_list(value, f'csp.{key}')
        except BundleError as e:
            errors.append(str(e))
            continue
        for source in values:
            keywords = CSP_KEYWORDS_BY_DIRECTIVE.get(directive, CSP_KEYWORDS)
            if source in keywords:
                continue
            if source == "'unsafe-eval'" and directive == 'script-src' and allow_unsafe_eval:
                continue
            if ORIGIN_PATTERN.match(source) and source in allowed_origins:
                continue
            errors.append(f'csp.{key}: {source} is not allowed' +
                          (' (the app must list it in clientSecurity.allowedOrigins).' if source.startswith('https://')
                           else '.'))
        normalized_csp[directive] = values
    if errors:
        raise BundleError(' '.join(errors))
    return {'name': name if isinstance(name, str) else None, 'entry': entry, 'styles': styles,
            'dataSources': normalized_sources, 'csp': normalized_csp,
            'title': data.get('title') if isinstance(data.get('title'), str) else None}


def load_manifest(site_root, name, client_security=None):
    """The validated manifest of an installed bundle (cached by file time), or None when there is no such bundle."""
    root = bundle_root(site_root, name)
    path = os.path.join(root, MANIFEST)
    try:
        mtime = os.path.getmtime(path)
    except OSError:
        return None
    cache_key = (path, json.dumps(client_security or {}, sort_keys=True))
    cached = _manifest_cache.get(cache_key)
    if cached and cached[0] == mtime:
        return cached[1]
    with open(path, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
        except ValueError as e:
            raise BundleError(f'manifest.json: {e}')
    manifest = validate_manifest(data, root, client_security)
    _manifest_cache[cache_key] = (mtime, manifest)
    return manifest


def parse_csp(header):
    policy = {}
    for part in (header or '').split(';'):
        tokens = part.split()
        if tokens:
            policy[tokens[0].lower()] = tokens[1:]
    return policy


def csp_policy(manifest, base):
    """base (the app's policy, as a dict) with the manifest's additions. A directive the base leaves to default-src
    starts from default-src, so adding blob: to worker-src keeps 'self'."""
    policy = {k: list(v) for k, v in base.items()}
    fallback = base.get('default-src', ["'self'"])
    for directive, sources in (manifest or {}).get('csp', {}).items():
        current = policy.setdefault(directive, list(base.get('script-src', fallback))
                                    if directive == 'worker-src' else list(fallback))
        for source in sources:
            if source not in current:
                current.append(source)
    return policy


def csp_header(policy):
    return '; '.join(f'{k} {" ".join(v)}'.strip() for k, v in policy.items())


# ------------------------------------------------------------------------------------------------------- csrf

def csrf_token(session_handler):
    token = session_handler.get(CSRF_SESSION_KEY)
    if not token:
        token = secrets.token_urlsafe(32)
        session_handler.set(CSRF_SESSION_KEY, token)
    return token


def csrf_valid(session_handler):
    expected = session_handler.get(CSRF_SESSION_KEY)
    sent = request.headers.get(CSRF_HEADER, '')
    return bool(expected) and hmac.compare_digest(expected, sent)


def csrf_required(config):
    if request.method not in UNSAFE_METHODS:
        return False
    if request.headers.get(BUNDLE_HEADER):
        return True
    explicit = config.get('csrfProtection')
    if isinstance(explicit, bool):
        return explicit
    return bool(config.get('mainBundle') or config.get('bundleOnly'))


# -------------------------------------------------------------------------------------------- data allowlist

def _request_body():
    if request.method == 'GET':
        return request.args
    if len(request.form) > 0:
        return request.form
    try:
        return json.loads(request.get_data(cache=True) or b'{}')
    except ValueError:
        return {}


def requested_source(kind, sub_path=None):
    """(allowlist kind, name) the current data request asks for."""
    if kind == 'proxy':
        if request.args.get('server') is not None:
            body = _request_body()
            key = body.get('key') if hasattr(body, 'get') else None
            if key and body.get('key_suffix'):
                key = key + '_' + body.get('key_suffix')
            return 'repository', key
        return 'rest', sub_path
    if kind == 'middleware':
        return 'middleware', request.args.get('object_key')
    if kind == 'export':
        return 'export', request.args.get('export_key')
    return 'pivot', None


def allowed(manifest, source_kind, name):
    sources = manifest.get('dataSources', {})
    if source_kind == 'pivot':
        return sources.get('pivot') is True
    if not name:
        return False
    if source_kind == 'rest':
        path = name.split('?')[0]
        # Raw TM1 REST from a bundle reads; the only POST is an MDX query (its body is used only when the app
        # allows client-side queries). Writes go through repository entries or middleware.
        if request.method != 'GET' and not path.startswith(MDX_PATHS):
            return False
        return any(path == p or path.startswith(p.rstrip('/') + '/') or path.startswith(p + '(')
                   for p in sources.get('rest', []))
    return name in sources.get(source_kind, [])


def guard_data_request(auth_provider, kind, sub_path=None):
    """None, or the refusal of a data request (proxy / middleware / export / pivot) under the bundle rules."""
    setting = auth_provider.get_setting()
    config = setting.get_config()
    bundle = request.headers.get(BUNDLE_HEADER)
    if not bundle:
        if config.get('bundleOnly') is True:
            return _refuse('This app serves data to its bundles only.')
        if csrf_required(config) and not csrf_valid(auth_provider.session_handler):
            return _refuse('CSRF token missing or invalid.')
        return None
    if not auth_provider.check_app_authenticated():
        return None  # the endpoint answers with its own authentication response
    if not csrf_valid(auth_provider.session_handler):
        return _refuse('CSRF token missing or invalid.')
    try:
        manifest = load_manifest(setting.site_root, bundle, config.get('clientSecurity'))
    except BundleError:
        manifest = None
    if manifest is None:
        return _refuse('Unknown bundle.')
    source_kind, name = requested_source(kind, sub_path)
    if not allowed(manifest, source_kind, name):
        return _refuse(f'The bundle may not use {source_kind} {name or ""}'.rstrip() + '.')
    g.analogic_bundle = bundle
    return None


def _refuse(message):
    return {'message': message}, 403, {'Content-Type': 'application/json'}


# ------------------------------------------------------------------------------------------------- the page

def widget_page_manifest(site_root, client_security=None, logger=None):
    """A widget page may hold BundleWidgets of any installed bundle, so its policy gets the union of their csp
    additions (each validated like on a bundle page). None when the app has no bundles. A broken manifest is
    skipped: its widget fails to start, the rest of the page keeps its policy."""
    csp = {}
    found = False
    for name in list_bundles(site_root):
        try:
            manifest = load_manifest(site_root, name, client_security)
        except BundleError as e:
            if logger:
                logger.warning('Bundle %s skipped for the widget page policy: %s', name, e)
            continue
        if manifest is None:
            continue
        found = True
        for directive, sources in manifest.get('csp', {}).items():
            current = csp.setdefault(directive, [])
            current.extend(s for s in sources if s not in current)
    return {'csp': csp} if found else None


def public_config(config):
    keys = ('projectName', 'mainPage', 'sessionExpiresInMinutes', 'mainBundle', 'bundleOnly')
    return {k: config.get(k) for k in keys if k in config}


def apply_bundle_csp(response):
    """Runs after Talisman: a bundle page extends the app's policy with its manifest's additions. Without a policy
    (Talisman off) there is nothing to extend."""
    manifest = getattr(g, 'analogic_bundle_page_manifest', None)
    header = response.headers.get('Content-Security-Policy')
    if manifest and header:
        response.headers['Content-Security-Policy'] = csp_header(csp_policy(manifest, parse_csp(header)))
    return response
