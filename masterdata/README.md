# Widget masterdata

The hand maintained descriptions Seeder (Studio, validation, MCP, export) uses for the framework:
widgets, widget parameters, events, sub widgets, `Api.*` and `Utils.*` functions.

The files here are the source of truth. On a release the CI builds them into a package with a
content hash (`revision`); a release that does not change these files produces the same revision
and therefore no new package.

## When you change the framework

| Change | Update |
|---|---|
| new / renamed widget option (`getRealValue('name', ...)`) | `widgets.json` (parameters of the widget) |
| new widget | `widgets.json`, `sub_widgets.json`, `widget_events.json` |
| new `Api.*` function | `api_functions.json`, `api_functions_arguments.json`, `api_functions_descriptions.json` |
| new `Utils.*` function | `utils_functions.json` |
| new widget event | `widget_events.json` (events are not extracted, they are reviewed by hand) |

`python tools/masterdata/build_masterdata.py --check` (also part of the CI and of `pytest`) fails when
the framework source and these files disagree.

## drift_baseline.json

Known, accepted gaps that existed when the check was introduced. It may only shrink: when you document
an option, remove it from the baseline (`--update-baseline` rewrites `widgets` and
`undocumentedWidgets`; `externalWidgets` and `events` are hand maintained).

* `externalWidgets`: widgets that live in extensions (separate repositories, not in this checkout).
* `events`: events that cannot be found in the framework source (dynamic or from a library).

Not part of the package: `drift_baseline.json`, `README.md`.
