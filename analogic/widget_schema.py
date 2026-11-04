"""Machine-readable schema of the widget classes this framework ships.

Why this exists
---------------
Tools that write ``widget-config.js`` (Seeder Studio, HEX) need to know which
option keys a widget type accepts.  That knowledge used to live in a hand
maintained snapshot on the Seeder side - one ``4.1.0`` file serving every 4.x
framework version, with whole widget types missing and others listing two or
three of their thirty parameters.

The widgets already declare their parameters in a uniform way::

    getParameters(d) {
        return {
            fontSize: this.getRealValue('fontSize', d, false),
            ...

so the schema is read from the source instead of being written twice.  It is
generated from the installed framework, which makes the running framework the
single source of truth for its own version.

What it is not
--------------
This is a static scan, not a JavaScript parser.  It reports what the source
declares; a key computed at runtime (``this.getRealValue(prefix + 'Color')``)
cannot be seen and is skipped.  ``complete`` is therefore never claimed: a
consumer may treat a listed key as known, and must not treat an unlisted key
as proof of a typo for types that also read options directly.
"""

from __future__ import annotations

import json
import os
import re
from functools import lru_cache
from typing import Any

SCHEMA_VERSION = 1

_CLASS_RE = re.compile(r'\bclass\s+([A-Za-z_$][\w$]*)(?:\s+extends\s+([A-Za-z_$][\w$.]*))?\s*\{')
_OPTION_READ_RE = re.compile(r'\b(?:this\.options|o)\.([A-Za-z_$][\w$]*)\b(?!\s*\()')
_EVENT_ACTION_RE = re.compile(r'''data-action=(?:\\?["'])([a-z][\w-]*)''')
_ACTION_LITERAL_RE = re.compile(r'''\baction\s*:\s*(?:[^,\n]*\?\s*)?(['"])([a-z][\w-]*)\1(?:\s*:\s*(['"])([a-z][\w-]*)\3)?''')

# Reads of these are plumbing every widget has, not configuration to offer.
_STRUCTURAL_OPTION_KEYS = frozenset({'id', 'type', 'widgets', 'import', 'parent', 'length'})


def default_widgets_dir() -> str:
    return os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static', 'assets', 'js', 'widgets')


def _framework_version() -> str:
    path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'version.config')
    try:
        with open(path, encoding='utf-8') as handle:
            return handle.read().strip()
    except OSError:
        return ''


def _strip_comments(source: str) -> str:
    """Blank out comments and keep every offset, so brace matching stays honest."""
    out = []
    i, n = 0, len(source)
    quote = ''
    while i < n:
        ch = source[i]
        nxt = source[i + 1] if i + 1 < n else ''
        if quote:
            out.append(ch)
            if ch == '\\' and i + 1 < n:
                out.append(nxt)
                i += 2
                continue
            if ch == quote:
                quote = ''
            i += 1
            continue
        if ch in '\'"`':
            quote = ch
            out.append(ch)
            i += 1
            continue
        if ch == '/' and nxt == '/':
            end = source.find('\n', i)
            end = n if end < 0 else end
            out.append(' ' * (end - i))
            i = end
            continue
        if ch == '/' and nxt == '*':
            end = source.find('*/', i + 2)
            end = n if end < 0 else end + 2
            out.append(''.join(c if c == '\n' else ' ' for c in source[i:end]))
            i = end
            continue
        out.append(ch)
        i += 1
    return ''.join(out)


def _matching_brace(source: str, open_index: int) -> int:
    """Index of the brace closing the one at ``open_index`` (strings skipped)."""
    depth = 0
    quote = ''
    i, n = open_index, len(source)
    while i < n:
        ch = source[i]
        if quote:
            if ch == '\\':
                i += 2
                continue
            if ch == quote:
                quote = ''
        elif ch in '\'"':
            quote = ch
        elif ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return n - 1


def _split_top_level_args(text: str) -> list[str]:
    args, depth, quote, current = [], 0, '', []
    for index, ch in enumerate(text):
        if quote:
            current.append(ch)
            if ch == quote and text[index - 1] != '\\':
                quote = ''
            continue
        if ch in '\'"`':
            quote = ch
            current.append(ch)
        elif ch in '([{':
            depth += 1
            current.append(ch)
        elif ch in ')]}':
            if depth == 0:
                break
            depth -= 1
            current.append(ch)
        elif ch == ',' and depth == 0:
            args.append(''.join(current).strip())
            current = []
        else:
            current.append(ch)
    tail = ''.join(current).strip()
    if tail:
        args.append(tail)
    return args


def _default_type(default: str | None) -> str:
    if default is None or default == '':
        return 'unknown'
    text = default.strip()
    if text == 'true':
        return 'boolean'
    if text == 'false':
        # The widgets use `false` as "not set" for colours, sizes and texts as
        # often as for real flags, so it says nothing about the value's type.
        return 'any'
    if text in ('null', 'undefined'):
        return 'unknown'
    if re.fullmatch(r'-?\d+(?:\.\d+)?', text):
        return 'number'
    if len(text) >= 2 and text[0] in '\'"`' and text[-1] == text[0]:
        return 'string'
    if text.startswith('['):
        return 'array'
    if text.startswith('{'):
        return 'object'
    return 'expression'


def _parameters_in(body: str) -> list[dict[str, Any]]:
    """Every ``getRealValue('key', data, default)`` call, first occurrence wins."""
    found: dict[str, dict[str, Any]] = {}
    for match in re.finditer(r'\bgetRealValue\(', body):
        args = _split_top_level_args(body[match.end():])
        if not args:
            continue
        key_match = re.fullmatch(r'''(['"])([A-Za-z_$][\w$]*)\1''', args[0])
        if not key_match:
            continue  # computed key: cannot be known statically
        name = key_match.group(2)
        if name in found:
            continue
        default = args[2] if len(args) > 2 else None
        entry: dict[str, Any] = {'name': name, 'type': _default_type(default)}
        if default is not None:
            entry['default'] = default
        found[name] = entry
    return sorted(found.values(), key=lambda item: item['name'])


def _direct_option_keys(body: str, declared: set[str]) -> list[str]:
    keys = {
        match.group(1) for match in _OPTION_READ_RE.finditer(body)
    } - _STRUCTURAL_OPTION_KEYS - declared
    return sorted(keys)


def _actions_in(body: str) -> list[str]:
    actions = {match.group(1) for match in _EVENT_ACTION_RE.finditer(body)}
    for match in _ACTION_LITERAL_RE.finditer(body):
        actions.add(match.group(2))
        if match.group(4):
            actions.add(match.group(4))
    return sorted(action for action in actions if not action.startswith('$'))


def _scan_file(path: str, relative: str) -> dict[str, dict[str, Any]]:
    try:
        with open(path, encoding='utf-8', errors='replace') as handle:
            source = _strip_comments(handle.read())
    except OSError:
        return {}
    classes: dict[str, dict[str, Any]] = {}
    for match in _CLASS_RE.finditer(source):
        name, parent = match.group(1), match.group(2) or ''
        open_index = match.end() - 1
        body = source[open_index:_matching_brace(source, open_index) + 1]
        parameters = _parameters_in(body)
        classes[name] = {
            'extends': parent,
            'file': relative,
            'parameters': parameters,
            'optionKeys': _direct_option_keys(body, {item['name'] for item in parameters}),
            'actions': _actions_in(body),
        }
    return classes


def _resolve_inheritance(classes: dict[str, dict[str, Any]]) -> None:
    def ancestors(name: str) -> list[str]:
        chain, seen = [], {name}
        parent = classes.get(name, {}).get('extends')
        while parent and parent in classes and parent not in seen:
            chain.append(parent)
            seen.add(parent)
            parent = classes[parent].get('extends')
        return chain

    for name, entry in classes.items():
        chain = ancestors(name)
        entry['inheritsFrom'] = chain
        merged = {item['name']: item for item in entry['parameters']}
        keys = set(entry['optionKeys'])
        for ancestor in chain:
            for item in classes[ancestor]['parameters']:
                merged.setdefault(item['name'], {**item, 'inheritedFrom': ancestor})
            keys.update(classes[ancestor]['optionKeys'])
        entry['allParameters'] = sorted(merged.values(), key=lambda item: item['name'])
        entry['allOptionKeys'] = sorted(keys - set(merged))


def build_widget_schema(widgets_dir: str | None = None) -> dict[str, Any]:
    """Scan the widget sources and return the schema as a plain dict."""
    root = widgets_dir or default_widgets_dir()
    classes: dict[str, dict[str, Any]] = {}
    for current, _dirs, files in os.walk(root):
        for filename in sorted(files):
            if not filename.endswith('.js'):
                continue
            path = os.path.join(current, filename)
            relative = os.path.relpath(path, root).replace(os.sep, '/')
            for name, entry in _scan_file(path, relative).items():
                # The first definition wins; a duplicate class name in another
                # file would otherwise depend on directory walk order.
                classes.setdefault(name, entry)
    _resolve_inheritance(classes)
    return {
        'schemaVersion': SCHEMA_VERSION,
        'frameworkVersion': _framework_version(),
        'source': 'static-scan',
        'complete': False,
        'widgets': {name: classes[name] for name in sorted(classes)},
    }


@lru_cache(maxsize=1)
def get_widget_schema() -> dict[str, Any]:
    """The schema of the installed framework, computed once per process."""
    return build_widget_schema()


def known_config_keys(widget_type: str, schema: dict[str, Any] | None = None) -> set[str] | None:
    """Every option key the source shows ``widget_type`` reading, or None.

    ``None`` means the type is not a widget class of this framework.
    """
    entry = ((schema or get_widget_schema()).get('widgets') or {}).get(widget_type)
    if not entry:
        return None
    return {item['name'] for item in entry['allParameters']} | set(entry['allOptionKeys'])


def write_widget_schema(path: str, widgets_dir: str | None = None) -> dict[str, Any]:
    schema = build_widget_schema(widgets_dir)
    with open(path, 'w', encoding='utf-8', newline='\n') as handle:
        json.dump(schema, handle, indent=2, sort_keys=True)
        handle.write('\n')
    return schema


def main(argv: list[str] | None = None) -> int:
    """``python -m analogic.widget_schema [--out FILE]``"""
    import argparse

    parser = argparse.ArgumentParser(description='Print the widget schema of this framework as JSON.')
    parser.add_argument('--out', help='Write the schema to this file instead of stdout.')
    parser.add_argument('--widgets-dir', help='Scan this directory instead of the installed widgets.')
    args = parser.parse_args(argv)
    if args.out:
        schema = write_widget_schema(args.out, args.widgets_dir)
        print(f"{len(schema['widgets'])} widget classes written to {args.out}")
    else:
        print(json.dumps(build_widget_schema(args.widgets_dir), indent=2, sort_keys=True))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
