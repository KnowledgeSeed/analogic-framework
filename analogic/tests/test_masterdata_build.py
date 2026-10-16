import importlib.util
import json
import sys
import zipfile
from io import BytesIO
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
_spec = importlib.util.spec_from_file_location(
    'build_masterdata', REPO_ROOT / 'tools' / 'masterdata' / 'build_masterdata.py')
build_masterdata = importlib.util.module_from_spec(_spec)
sys.modules[_spec.name] = build_masterdata
_spec.loader.exec_module(build_masterdata)


@pytest.fixture(scope='module')
def files():
    return build_masterdata.read_masterdata_files()


@pytest.fixture(scope='module')
def baseline():
    return json.loads((build_masterdata.MASTERDATA_DIR / build_masterdata.BASELINE_FILE).read_text(encoding='utf-8'))


def test_committed_masterdata_is_valid_for_the_framework_source(files, baseline):
    """The CI gate: a widget / Api / Utils change without the matching masterdata update fails here."""
    report = build_masterdata.validate(files, baseline)
    assert report.errors == []


def test_baseline_has_no_stale_entries(files, baseline):
    """Documented options must be removed from the baseline, so it only ever shrinks."""
    report = build_masterdata.validate(files, baseline)
    assert [note for note in report.notes if 'remove from' in note] == []


def test_new_undocumented_widget_option_is_reported(files):
    sources = build_masterdata._read_sources(build_masterdata.WIDGET_SOURCE_DIRS)
    widgets = json.loads(files['widgets.json'])
    button_options = widgets['ButtonWidget']['parameters']
    widgets['ButtonWidget']['parameters'] = [p for p in button_options if p['name'] != 'label']
    drifted, _, _ = build_masterdata.compute_drift(widgets, sources)
    assert 'label' in drifted['ButtonWidget']


def test_missing_api_function_is_reported(files, baseline):
    changed = dict(files)
    api_functions = json.loads(files['api_functions.json'])
    api_functions['functions'].remove('Api.showWidget')
    changed['api_functions.json'] = json.dumps(api_functions).encode('utf-8')
    report = build_masterdata.validate(changed, baseline)
    assert any('Api.showWidget exists in the framework but is not in the masterdata' in e for e in report.errors)


def test_invalid_json_is_reported(files, baseline):
    changed = dict(files)
    changed['widget_events.json'] = b'{not json'
    report = build_masterdata.validate(changed, baseline)
    assert any('widget_events.json is not valid JSON' in e for e in report.errors)


def test_event_missing_from_the_source_is_reported(files, baseline):
    changed = dict(files)
    events = json.loads(files['widget_events.json'])
    events['ButtonWidget'] = events.get('ButtonWidget', []) + ['definitelyNotAnEvent']
    changed['widget_events.json'] = json.dumps(events).encode('utf-8')
    report = build_masterdata.validate(changed, baseline)
    assert any('definitelyNotAnEvent' in e for e in report.errors)


def test_revision_ignores_line_endings_and_changes_with_content(files):
    crlf = {name: content.replace(b'\n', b'\r\n') for name, content in files.items()}
    normalized = {name: content.replace(b'\r\n', b'\n') for name, content in crlf.items()}
    assert build_masterdata.compute_revision(normalized) == build_masterdata.compute_revision(files)

    changed = dict(files)
    changed['sub_widgets.json'] = files['sub_widgets.json'] + b' '
    assert build_masterdata.compute_revision(changed) != build_masterdata.compute_revision(files)


def test_package_is_deterministic_and_contains_a_matching_manifest(files):
    package, manifest = build_masterdata.build_package(files)
    assert package == build_masterdata.build_package(files)[0]

    with zipfile.ZipFile(BytesIO(package)) as archive:
        names = archive.namelist()
        assert names == sorted(names)
        assert set(names) == set(build_masterdata.PACKAGE_FILES) | {'manifest.json'}
        stored_manifest = json.loads(archive.read('manifest.json'))
        assert stored_manifest == manifest
        assert manifest['revision'] == build_masterdata.compute_revision(files)
        for name in build_masterdata.PACKAGE_FILES:
            assert archive.read(name) == files[name]
