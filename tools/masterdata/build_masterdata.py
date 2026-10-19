#!/usr/bin/env python3
"""Validates the widget masterdata against the framework source and builds the masterdata package.

The hand maintained masterdata (``masterdata/``) is the single source Seeder gets its widget,
event, Api and Utils descriptions from. This tool is run by the CI on every change and on every
release:

* ``--check``                validates the masterdata against the framework source,
* ``--out DIR``              validates and builds ``DIR/masterdata.zip`` + ``DIR/manifest.json``,
* ``--update-baseline``      rewrites ``masterdata/drift_baseline.json`` from the current source.

The ``revision`` is the sha256 of the package content only (not of the framework version), so a
framework release that does not change the masterdata produces the same revision and therefore
no new package.

Standard library only, so the CI needs no extra dependency.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import sys
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
MASTERDATA_DIR = REPO_ROOT / 'masterdata'
JS_ROOT = REPO_ROOT / 'analogic' / 'static' / 'assets' / 'js'
# Widget classes live here. lib/ holds third party libraries and is deliberately not scanned.
WIDGET_SOURCE_DIRS = (JS_ROOT / 'framework', JS_ROOT / 'widgets')

PACKAGE_FILES = (
    'api_functions.json',
    'api_functions_arguments.json',
    'api_functions_descriptions.json',
    'sub_widgets.json',
    'utils_functions.json',
    'widget_events.json',
    'widget_parameters.json',
    'widgets.json',
)
BASELINE_FILE = 'drift_baseline.json'
PACKAGE_SCHEMA_VERSION = 1

# Internal helpers that are intentionally not part of the masterdata.
API_EXCLUDED = frozenset({'handleListener'})  # alias of Listeners.handle
UTILS_EXCLUDED = frozenset({'backdrop'})  # internal show/hide helper

_CLASS_RE = re.compile(r'class\s+(\w+)(?:\s+extends\s+(\w+))?\s*\{')
_OPTION_RE = re.compile(r"getRealValue\(\s*'([A-Za-z0-9_]+)'")
_API_NAME_RE = re.compile(r'^Api\.(\w+)\s*=', re.M)
_UTILS_KEY_RE = re.compile(r'^    (?:async\s+)?([A-Za-z_]\w*)\s*(?:\(|:)', re.M)
_BASE_WIDGET = 'Widget'


@dataclass
class Report:
    errors: list[str] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)

    @property
    def ok(self):
        return not self.errors


# --------------------------------------------------------------------------- files / revision

def read_masterdata_files(masterdata_dir: Path = MASTERDATA_DIR) -> dict[str, bytes]:
    """Package files with normalized line endings (git on Windows may check out CRLF)."""
    files = {}
    for name in PACKAGE_FILES:
        path = masterdata_dir / name
        if not path.is_file():
            raise FileNotFoundError(f'Missing masterdata file: {path}')
        files[name] = path.read_bytes().replace(b'\r\n', b'\n')
    return files


def file_hashes(files: dict[str, bytes]) -> dict[str, str]:
    return {name: hashlib.sha256(files[name]).hexdigest() for name in sorted(files)}


def compute_revision(files: dict[str, bytes]) -> str:
    canonical = ''.join(f'{name}:{digest}\n' for name, digest in file_hashes(files).items())
    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()


# --------------------------------------------------------------------------- validation

def _load_json(files: dict[str, bytes], name: str, report: Report):
    try:
        return json.loads(files[name].decode('utf-8'))
    except (UnicodeError, json.JSONDecodeError) as error:
        report.errors.append(f'{name} is not valid JSON: {error}')
        return None


def _read_sources(source_dirs) -> dict[Path, str]:
    sources = {}
    for directory in source_dirs:
        for path in sorted(directory.rglob('*.js')):
            sources[path] = path.read_text(encoding='utf-8', errors='replace')
    return sources


def scan_widget_options(sources: dict[Path, str]):
    """Option names (``getRealValue``) and the ``extends`` parent per widget class."""
    options: dict[str, set[str]] = {}
    parents: dict[str, str] = {}
    for source in sources.values():
        classes = [(m.start(), m.group(1), m.group(2)) for m in _CLASS_RE.finditer(source)]
        for index, (start, name, parent) in enumerate(classes):
            end = classes[index + 1][0] if index + 1 < len(classes) else len(source)
            if parent:
                parents[name] = parent
            options.setdefault(name, set()).update(m.group(1) for m in _OPTION_RE.finditer(source, start, end))
    return {name: frozenset(values) for name, values in options.items()}, parents


def _documented_options(widget, masterdata, parents):
    documented, seen, current = set(), set(), widget
    while current and current not in seen:
        seen.add(current)
        for parameter in (masterdata.get(current) or {}).get('parameters', []):
            name = str(parameter.get('name', '')).strip()
            if name:
                documented.add(name)
        current = parents.get(current)
    for parameter in (masterdata.get(_BASE_WIDGET) or {}).get('parameters', []):
        name = str(parameter.get('name', '')).strip()
        if name:
            documented.add(name)
    return documented


def compute_drift(widgets_masterdata: dict, sources: dict[Path, str]):
    """(missing options per widget, undocumented widget classes, masterdata widgets without a class)."""
    source_options, parents = scan_widget_options(sources)
    drifted = {}
    for widget in sorted(source_options):
        if widget in widgets_masterdata:
            missing = source_options[widget] - _documented_options(widget, widgets_masterdata, parents)
            if missing:
                drifted[widget] = sorted(missing)
    undocumented = sorted(w for w in source_options
                          if w not in widgets_masterdata and w.endswith('Widget') and w != _BASE_WIDGET)
    unknown = sorted(w for w in widgets_masterdata
                     if w.endswith('Widget') and w not in source_options and w != _BASE_WIDGET)
    return drifted, undocumented, unknown


def baseline_from_drift(drifted, undocumented, previous: dict | None = None) -> dict:
    """Refreshed baseline. Hand maintained keys (externalWidgets, events) are carried over."""
    baseline = {key: value for key, value in (previous or {}).items()
                if key not in ('frameworkVersion', 'widgets', 'undocumentedWidgets')}
    baseline.update({'widgets': drifted, 'undocumentedWidgets': undocumented})
    return baseline


def _check_drift(widgets_masterdata, sources, baseline: dict, report: Report):
    drifted, undocumented, unknown = compute_drift(widgets_masterdata, sources)
    # Widgets that live in extensions (separate repositories), so there is no class to find here.
    external = {str(n) for n in baseline.get('externalWidgets') or []}
    unknown = [widget for widget in unknown if widget not in external]

    accepted = {str(w): {str(o) for o in options or []} for w, options in (baseline.get('widgets') or {}).items()}
    for widget, options in drifted.items():
        new = sorted(set(options) - accepted.get(widget, set()))
        if new:
            report.errors.append(
                f'{widget}: option(s) read by the framework but not documented in widgets.json: {", ".join(new)}. '
                f'Document them (preferred) or accept them in {BASELINE_FILE}.')
    for widget, options in accepted.items():
        fixed = sorted(options - set(drifted.get(widget, [])))
        if fixed:
            report.notes.append(f'{widget}: documented now, remove from {BASELINE_FILE}: {", ".join(fixed)}')

    accepted_undocumented = {str(n) for n in baseline.get('undocumentedWidgets') or []}
    for widget in sorted(set(undocumented) - accepted_undocumented):
        report.errors.append(f'{widget} exists in the framework but has no entry in widgets.json')
    for widget in sorted(accepted_undocumented - set(undocumented)):
        report.notes.append(f'{widget} is documented now, remove from {BASELINE_FILE}')
    for widget in unknown:
        report.errors.append(f'{widget} is in widgets.json but the framework has no such widget class')


def _check_function_names(files, sources, report: Report):
    api_source = next((text for path, text in sources.items() if path.name == 'api.js'), '')
    utils_source = next((text for path, text in sources.items() if path.name == 'utils.js'), '')

    api_names = set(_API_NAME_RE.findall(api_source)) - API_EXCLUDED
    start = utils_source.find('const Utils = {')
    end = re.search(r'^\};', utils_source[start:], re.M) if start >= 0 else None
    utils_names = (set(_UTILS_KEY_RE.findall(utils_source[start:start + end.start()])) - UTILS_EXCLUDED
                   if end else set())
    if not api_names:
        report.errors.append('No Api.* function found in api.js, the extraction is broken')
    if not utils_names:
        report.errors.append('No Utils.* function found in utils.js, the extraction is broken')

    api_functions = _load_json(files, 'api_functions.json', report) or {}
    api_documented = {n.split('.', 1)[1] for n in api_functions.get('functions', [])}
    utils_functions = _load_json(files, 'utils_functions.json', report) or {}
    utils_documented = {f['name'].split('.', 1)[1] for f in utils_functions.get('functions', [])}

    for kind, source_names, documented in (('Api', api_names, api_documented),
                                           ('Utils', utils_names, utils_documented)):
        for name in sorted(source_names - documented):
            report.errors.append(f'{kind}.{name} exists in the framework but is not in the masterdata')
        for name in sorted(documented - source_names):
            report.errors.append(f'{kind}.{name} is in the masterdata but the framework has no such function')

    # Every Api function needs its arguments and description entry.
    for name in ('api_functions_arguments.json', 'api_functions_descriptions.json'):
        entries = _load_json(files, name, report) or {}
        for function in sorted(api_functions.get('functions', [])):
            if function not in entries:
                report.errors.append(f'{function} has no entry in {name}')
        for function in sorted(set(entries) - set(api_functions.get('functions', []))):
            report.errors.append(f'{name} describes {function} which is not in api_functions.json')


def _check_events(files, baseline: dict, report: Report, source_dirs):
    """Weak check: event names are partly dynamic, so only require the name to occur in the source.

    The whole js tree is searched (including lib/, e.g. the Tabulator events of GridTablePlus).
    """
    events = _load_json(files, 'widget_events.json', report) or {}
    all_source = '\n'.join(_read_sources(source_dirs).values())
    accepted = {str(w): set(names or []) for w, names in (baseline.get('events') or {}).items()}
    for widget, names in sorted(events.items()):
        for event in names:
            if event not in all_source and event not in accepted.get(widget, set()):
                report.errors.append(f'{widget}: event "{event}" does not occur in the framework source')


def validate(files: dict[str, bytes], baseline: dict, source_dirs=WIDGET_SOURCE_DIRS,
             event_source_dirs=(JS_ROOT,)) -> Report:
    report = Report()
    sources = _read_sources(source_dirs)
    if not sources:
        report.errors.append('No framework source found, nothing to validate against')
        return report

    for name in PACKAGE_FILES:
        _load_json(files, name, report)
    widgets = _load_json(files, 'widgets.json', report)
    if widgets is not None:
        _check_drift(widgets, sources, baseline, report)
    _check_function_names(files, sources, report)
    _check_events(files, baseline, report, event_source_dirs)
    return report


# --------------------------------------------------------------------------- package

def build_package(files: dict[str, bytes]) -> tuple[bytes, dict]:
    """Deterministic zip (same content, same bytes) plus its manifest."""
    manifest = {
        'schema_version': PACKAGE_SCHEMA_VERSION,
        'revision': compute_revision(files),
        'files': file_hashes(files),
    }
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as archive:
        entries = dict(files)
        entries['manifest.json'] = (json.dumps(manifest, indent=2, sort_keys=True) + '\n').encode('utf-8')
        for name in sorted(entries):
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, entries[name])
    return buffer.getvalue(), manifest


def write_github_output(values: dict):
    path = os.getenv('GITHUB_OUTPUT')
    if path:
        with open(path, 'a', encoding='utf-8') as handle:
            for key, value in values.items():
                handle.write(f'{key}={value}\n')


# --------------------------------------------------------------------------- cli

def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--masterdata-dir', type=Path, default=MASTERDATA_DIR)
    parser.add_argument('--out', type=Path, help='build the package into this directory')
    parser.add_argument('--check', action='store_true', help='validate only')
    parser.add_argument('--update-baseline', action='store_true', help='rewrite drift_baseline.json from the source')
    args = parser.parse_args(argv)

    files = read_masterdata_files(args.masterdata_dir)
    baseline_path = args.masterdata_dir / BASELINE_FILE

    if args.update_baseline:
        widgets = json.loads(files['widgets.json'])
        drifted, undocumented, _ = compute_drift(widgets, _read_sources(WIDGET_SOURCE_DIRS))
        # The hand maintained keys (externalWidgets, events) are carried over from the existing baseline.
        previous = json.loads(baseline_path.read_text(encoding='utf-8')) if baseline_path.is_file() else None
        baseline_path.write_text(json.dumps(baseline_from_drift(drifted, undocumented, previous), indent=2) + '\n',
                                 encoding='utf-8')
        print(f'{baseline_path} updated: {sum(len(o) for o in drifted.values())} option(s) in '
              f'{len(drifted)} widget(s), {len(undocumented)} undocumented widget(s)')
        return 0

    baseline = json.loads(baseline_path.read_text(encoding='utf-8')) if baseline_path.is_file() else {}
    report = validate(files, baseline)
    for note in report.notes:
        print(f'note: {note}')
    for error in report.errors:
        print(f'::error::{error}')
    if not report.ok:
        print(f'Masterdata validation failed with {len(report.errors)} error(s)')
        return 1

    revision = compute_revision(files)
    print(f'Masterdata is valid, revision {revision}')
    if args.out:
        package, manifest = build_package(files)
        args.out.mkdir(parents=True, exist_ok=True)
        (args.out / 'masterdata.zip').write_bytes(package)
        (args.out / 'manifest.json').write_text(json.dumps(manifest, indent=2, sort_keys=True) + '\n',
                                                encoding='utf-8')
        print(f'Package written to {args.out / "masterdata.zip"} ({len(package)} bytes)')
    write_github_output({'masterdata_revision': revision})
    return 0


if __name__ == '__main__':
    sys.exit(main())
