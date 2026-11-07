"""Client bundles (analogic/bundles.py): manifest checks, file paths, the CSP a manifest may add, CSRF and the
data-source allowlist of requests that come from a bundle."""
import importlib.util
import json
import os
import tempfile
import unittest
from pathlib import Path

from flask import Flask, g, session

SPEC = importlib.util.spec_from_file_location('bundles_under_test',
                                              Path(__file__).resolve().parents[1] / 'bundles.py')
bundles = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(bundles)

MANIFEST = {'name': 'sales', 'entry': 'dist/index.js', 'styles': ['dist/index.css'],
            'dataSources': {'repository': ['salesByRegion'], 'middleware': ['Export.generate'],
                            'rest': ['api/v1/Cubes'], 'export': ['salesExport']},
            'csp': {'workerSrc': ["'self'", 'blob:'], 'imgSrc': ['data:']}}


class Sessions:
    def __init__(self):
        self.prefix = 'demo_'

    def get(self, key, default=None):
        return session.get(self.prefix + key, default)

    def set(self, key, value):
        session[self.prefix + key] = value


class Setting:
    def __init__(self, root, config):
        self.site_root, self.config = root, config

    def get_config(self):
        return self.config


class Provider:
    def __init__(self, root, config, authenticated=True):
        self.setting = Setting(root, config)
        self.session_handler = Sessions()
        self.authenticated = authenticated

    def get_setting(self):
        return self.setting

    def check_app_authenticated(self):
        return self.authenticated


class BundlesTest(unittest.TestCase):

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = self.tmp.name
        self.write_bundle('sales', MANIFEST)
        self.app = Flask(__name__)
        self.app.secret_key = 'test'

    def tearDown(self):
        self.tmp.cleanup()

    def write_bundle(self, name, manifest, files=('dist/index.js', 'dist/index.css')):
        root = Path(self.root, 'bundles', name)
        for f in files:
            (root / f).parent.mkdir(parents=True, exist_ok=True)
            (root / f).write_text('x', encoding='utf-8')
        (root / 'manifest.json').write_text(json.dumps(manifest), encoding='utf-8')

    def test_a_valid_manifest_is_normalized(self):
        manifest = bundles.load_manifest(self.root, 'sales')
        self.assertEqual('dist/index.js', manifest['entry'])
        self.assertEqual({'worker-src': ["'self'", 'blob:'], 'img-src': ['data:']}, manifest['csp'])
        self.assertEqual(['sales'], bundles.list_bundles(self.root))

    def test_every_manifest_problem_is_reported(self):
        bad = {'entry': 'dist/missing.js', 'styles': ['../x.css'], 'dataSources': {'shell': ['x'], 'rest': ['etc']},
               'csp': {'scriptSrc': ["'unsafe-eval'", 'https://cdn.example.com'], 'frameAncestors': ['*']}}
        with self.assertRaises(bundles.BundleError) as error:
            bundles.validate_manifest(bad, os.path.join(self.root, 'bundles', 'sales'))
        message = str(error.exception)
        for reason in ('dist/missing.js: not found', '../x.css', 'dataSources.shell', 'dataSources.rest: etc',
                       "'unsafe-eval' is not allowed", 'clientSecurity.allowedOrigins', 'csp.frameAncestors'):
            self.assertIn(reason, message)

    def test_the_app_can_allow_eval_and_listed_origins(self):
        manifest = dict(MANIFEST, csp={'scriptSrc': ["'unsafe-eval'", 'https://cdn.example.com']})
        security = {'allowUnsafeEval': True, 'allowedOrigins': ['https://cdn.example.com']}
        result = bundles.validate_manifest(manifest, os.path.join(self.root, 'bundles', 'sales'), security)
        self.assertEqual(["'unsafe-eval'", 'https://cdn.example.com'], result['csp']['script-src'])
        with self.assertRaises(bundles.BundleError):  # a keyword like blob: is no script source
            bundles.validate_manifest(dict(MANIFEST, csp={'scriptSrc': ['blob:']}))

    def test_paths_never_leave_the_bundle(self):
        root = os.path.join(self.root, 'bundles', 'sales')
        self.assertTrue(bundles.safe_path(root, 'dist/index.js').endswith('index.js'))
        for path in ('../sales/manifest.json', '/etc/passwd', 'dist/../../x', 'dist\\index.js', '', 'dist//x'):
            self.assertIsNone(bundles.safe_path(root, path), path)
        with self.assertRaises(bundles.BundleError):
            bundles.bundle_root(self.root, '../apps')

    def test_the_page_policy_extends_the_apps_policy(self):
        base = bundles.parse_csp("default-src 'self'; object-src 'none'; connect-src 'self' ws://localhost:8100")
        policy = bundles.csp_policy(bundles.load_manifest(self.root, 'sales'), base)
        header = bundles.csp_header(policy)
        self.assertIn("worker-src 'self' blob:", header)
        self.assertIn("img-src 'self' data:", header)
        self.assertIn("connect-src 'self' ws://localhost:8100", header)
        self.assertIn("object-src 'none'", header)

    def test_a_widget_page_gets_the_union_of_its_bundles_policies(self):
        self.write_bundle('board', {'entry': 'dist/index.js', 'csp': {'imgSrc': ['data:', 'blob:'], 'fontSrc': ['data:']}})
        self.write_bundle('broken', {'entry': 'dist/missing.js'})
        manifest = bundles.widget_page_manifest(self.root)
        self.assertEqual({'worker-src': ["'self'", 'blob:'], 'img-src': ['data:', 'blob:'], 'font-src': ['data:']},
                         manifest['csp'])
        base = bundles.parse_csp("default-src 'self'; img-src 'self'")
        self.assertEqual({'default-src': ["'self'"], 'img-src': ["'self'", 'data:', 'blob:'],
                          'worker-src': ["'self'", 'blob:'], 'font-src': ["'self'", 'data:']},
                         bundles.parse_csp(bundles.csp_header(bundles.csp_policy(manifest, base))))
        empty = tempfile.TemporaryDirectory()
        self.addCleanup(empty.cleanup)
        self.assertIsNone(bundles.widget_page_manifest(empty.name))

    def test_a_bundle_request_needs_the_csrf_token_and_an_allowed_source(self):
        provider = Provider(self.root, {})
        headers = {bundles.BUNDLE_HEADER: 'sales'}
        body = {'key': 'salesByRegion', 'year': '2026'}
        with self.app.test_request_context('/proxy/api/v1/ExecuteMDX?server=1', method='POST', json=body,
                                           headers=headers):
            self.assertEqual(403, bundles.guard_data_request(provider, 'proxy', 'api/v1/ExecuteMDX')[1])
        with self.app.test_request_context('/', method='POST', json=body,
                                           headers=dict(headers, **{bundles.CSRF_HEADER: 'wrong'})):
            bundles.csrf_token(provider.session_handler)
            self.assertIn('CSRF', bundles.guard_data_request(provider, 'proxy', 'x')[0]['message'])
        for path, query, payload, expected in (
                ('api/v1/ExecuteMDX', 'server=1', body, None),
                ('api/v1/ExecuteMDX', 'server=1', {'key': 'payroll'}, 403),
                ('api/v1/ExecuteMDX', 'server=1', {'key': 'sales', 'key_suffix': 'ByRegion'}, 403),
                ('api/v1/Cubes', '', None, None),
                ("api/v1/Cubes('Sales')/Views", '', None, None),
                ('api/v1/Processes', '', None, 403),
        ):
            with self.app.test_request_context(f'/proxy/{path}?{query}', method='GET' if payload is None else 'POST',
                                               json=payload):
                token = bundles.csrf_token(provider.session_handler)
                with self.app.test_request_context(f'/proxy/{path}?{query}',
                                                   method='GET' if payload is None else 'POST', json=payload,
                                                   headers=dict(headers, **{bundles.CSRF_HEADER: token})):
                    session.update({'demo_' + bundles.CSRF_SESSION_KEY: token})
                    refusal = bundles.guard_data_request(provider, 'proxy', path)
                    self.assertEqual(expected, refusal and refusal[1], (path, payload))
                    if expected is None:
                        self.assertEqual('sales', g.analogic_bundle)

    def test_raw_rest_from_a_bundle_only_reads(self):
        provider = Provider(self.root, {})
        with self.app.test_request_context('/', method='POST', data='{}', headers={
                bundles.BUNDLE_HEADER: 'sales', bundles.CSRF_HEADER: 't'}):
            session['demo_' + bundles.CSRF_SESSION_KEY] = 't'
            self.assertEqual(403, bundles.guard_data_request(provider, 'proxy', "api/v1/Cubes('Sales')/tm1.Update")[1])

    def test_middleware_export_and_pivot_follow_the_manifest(self):
        provider = Provider(self.root, {})
        cases = (('/middleware?object_key=Export.generate', 'middleware', None),
                 ('/middleware?object_key=Admin.reset', 'middleware', 403),
                 ('/export?export_key=salesExport', 'export', None),
                 ('/pivot', 'pivot', 403))
        for url, kind, expected in cases:
            with self.app.test_request_context(url, method='POST', json={}, headers={
                    bundles.BUNDLE_HEADER: 'sales', bundles.CSRF_HEADER: 't'}):
                session['demo_' + bundles.CSRF_SESSION_KEY] = 't'
                refusal = bundles.guard_data_request(provider, kind)
                self.assertEqual(expected, refusal and refusal[1], url)

    def test_widget_requests_keep_todays_rules_unless_the_app_switches(self):
        with self.app.test_request_context('/proxy/x', method='POST', json={}):
            self.assertIsNone(bundles.guard_data_request(Provider(self.root, {}), 'proxy', 'x'))
            self.assertEqual(403, bundles.guard_data_request(Provider(self.root, {'csrfProtection': True}),
                                                             'proxy', 'x')[1])
            self.assertEqual(403, bundles.guard_data_request(Provider(self.root, {'bundleOnly': True}),
                                                             'proxy', 'x')[1])
            self.assertEqual(403, bundles.guard_data_request(Provider(self.root, {'mainBundle': 'sales'}),
                                                             'proxy', 'x')[1])
        with self.app.test_request_context('/proxy/x', method='GET'):
            self.assertIsNone(bundles.guard_data_request(Provider(self.root, {'mainBundle': 'sales'}), 'proxy', 'x'))

    def test_an_unknown_bundle_is_refused(self):
        with self.app.test_request_context('/middleware?object_key=x', method='POST', json={}, headers={
                bundles.BUNDLE_HEADER: 'nope', bundles.CSRF_HEADER: 't'}):
            session['demo_' + bundles.CSRF_SESSION_KEY] = 't'
            self.assertEqual('Unknown bundle.',
                             bundles.guard_data_request(Provider(self.root, {}), 'middleware')[0]['message'])


if __name__ == '__main__':
    unittest.main()
