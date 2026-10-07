# GridTablePlusWidget

A standalone deep-dive into `GridTablePlusWidget` - what it is, why it exists,
how it compares to the classic `GridTableWidget`/`GridTableLightWidget`, and
how to build with it (parsing, columns, events, popups, hierarchical rows,
skinning). This file is intentionally self-contained (not part of the Sphinx
`docs/source/` build) so it can be read, copied or sent on its own.

## 1. What it is

`GridTablePlusWidget` embeds a full [Tabulator](https://tabulator.info)
(v6.3.1 in this project) instance inside an Analogic page. The repository
returns plain column and row data; the widget translates that into a
Tabulator configuration and lets Tabulator do the actual rendering -
grouping, selection, inline editing, clipboard, resizable/movable/frozen
columns, hierarchical (tree) rows and virtualised scrolling all come from
Tabulator itself, not from Analogic-specific rendering code.

Source: `analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js`
Base skin: `analogic/static/assets/skin/css/ks-grid-table-plus.css`

## 2. Why it exists - performance and architecture

The key difference from `GridTableWidget` and `GridTableLightWidget` is
**what a cell actually is**:

- In `GridTableWidget` (and, to a lesser extent, `GridTableLightWidget`)
  every cell is backed by a real Analogic `Widget` instance (a `TextWidget`,
  `ToggleWidget`, etc.) with its own render/event lifecycle and its own DOM
  subtree. A large table means a large number of real Widget objects and DOM
  elements, all present at once - which is exactly why a table crossing
  several dimensions (e.g. Org Unit x Employee x Measure x Position) can
  reach hundreds of thousands or millions of DOM elements and become slow to
  render and heavy to keep in memory.
- `GridTableLightWidget` mitigates this with client-side **pagination** -
  only one page of rows is rendered at a time. Effective, but it needs its
  own bespoke pagination/column markup that the developer has to build.
- `GridTablePlusWidget` solves the same problem **architecturally**, by
  delegating rendering to Tabulator's virtualised DOM: regardless of how
  many rows the dataset has, only the rows currently scrolled into the
  viewport are ever real DOM nodes. Tabulator adds/removes row elements on
  the fly as the user scrolls - no pagination UI needed.

This was measured in this project on the `analogicNewPageNine` demo page in
the `default` app: the same MDX dataset that produces a very slow, roughly
1.8 million DOM element `GridTableWidget` render was handed to a
`GridTablePlusWidget` instance and scrolled with no noticeable slowdown at
up to **2,000,000 cells**, without pagination and without any manual "hide
unused rows/columns" tricks.

## 3. Feature comparison

| Capability | `GridTableWidget` (classic) | `GridTablePlusWidget` |
|---|---|---|
| Rendering strategy | Renders every row/cell up front as real Analogic Widgets | Virtualised DOM (Tabulator); only visible rows exist in the DOM |
| Practical row-count ceiling | Struggles well before a million cells | Verified smooth at 2,000,000 cells in this project |
| A cell can be *any* Analogic widget (Toggle, Button, dropdown, ...) | **Yes** - a cell is a full Widget instance | **No** - a cell is a formatter-rendered `<div>`; interactivity is built with Tabulator formatters/editors + click events, not nested Analogic widgets |
| Hierarchical / collapsible rows | Manual: track parent/child levels yourself and show/hide DOM rows with jQuery (Venncubed's `hideShowRows` pattern) | Native: `dataTree` + `dataTreeChildField`, built into Tabulator |
| Sticky / frozen columns | Manual: inject a `<style>` tag with `position: sticky` rules (Venncubed's `addStickyColumn`/`removeStickyColumn`) | Native: `frozen: true` on a column definition |
| Column resize / reorder / multi-sort / header filter / clipboard | Not built in; would need custom code | Native Tabulator features, opt-in via `tabulatorOptions`/column definitions |
| Hiding unused columns for performance | Manual opt-in (`hideEmptyColumns` + `cell.hideCell`) | Not needed - virtualisation already avoids rendering offscreen cells; use a column's `visible: false` for genuinely hidden data |
| Writing back to TM1 on edit/click | Manual: `RestRequest`/`Api.executeRequest` from an event map action or cell click handler | Same - manual, via a Tabulator event (`cellEdited`, `cellClick`, ...) calling `RestRequest`/`Api.executeRequest`. Neither widget has a built-in write path. |

**Rule of thumb:** pick `GridTablePlusWidget` when the table is large and/or
needs native grid ergonomics (resize, sort, filter, sticky columns, tree
rows). Keep `GridTableWidget` when a cell genuinely needs to *be* an
interactive Analogic widget (e.g. a real `ToggleWidget` with its own skin
and click handling) rather than a formatted/editable Tabulator cell.

## 4. Widget configuration (`widget-config.js`)

Only a minimal configuration lives here because Tabulator behaviour is
mostly repository-driven:

```js
{
    id: 'myPlusTable',              // required, unique widget id
    type: GridTablePlusWidget,      // required
    title: 'My Table',              // optional caption above the table
    minWidth: 960,                  // sizing hints
    width: '100%',
    height: '600px',
    hideIfNoData: false,            // hide the widget if the repository returns no rows
    skin: 'standard',               // CSS variant, see "Skinning" below
    tabulatorOptions: {             // default Tabulator options, merged with repository "options"
        layout: 'fitDataStretch',
        resizableColumnFit: true
    },
    tabulatorColumnOptions: {},     // optional per-field column overrides, keyed by field/id
    tabulatorEvents: {}             // optional Tabulator event overrides (usually left to the repository)
}
```

## 5. Widget behaviour - what happens on refresh

At runtime `GridTablePlusWidget` merges three sources of options: the
widget configuration, the repository payload, and the data-driven
column/cell metadata. Tabulator receives the combined definition via
`prepareTabulatorSetup()`.

- **First render:** Tabulator is created from scratch
  (`initializeTabulatorInstance()`).
- **`updateContent()` (e.g. after an event map action refreshes the
  widget):** `refreshTabulator()` decides how much work is actually
  needed:
  - If the **column shape** hasn't changed (same fields/titles/visibility -
    e.g. only a cell value changed), it patches existing Tabulator rows in
    place with `updateOrAddData()` and removes rows that no longer exist,
    instead of replacing the whole dataset. This preserves per-row UI
    state - an expanded `dataTree` branch, the scroll position, the current
    selection - across the refresh.
  - If the column shape **did** change (e.g. a segmented control switched
    the table's grouping), it falls back to a full `setColumns()` +
    `replaceData()`. This is intentional: with `dataTree` enabled, a
    structural change can mean a parent row's children set is completely
    different (different count, different rows), and Tabulator's tree
    module cannot safely reconcile that incrementally - attempting to patch
    it can crash deep inside Tabulator's own row-styling code on the next
    redraw. A column-shape change is a reasonable trigger for "this is a
    different view, just rebuild it".
- **`forceRefresh`/`Api.forceRefresh(widgetId)`:** a heavier, different
  path. `GridTablePlusWidget` doesn't override `reRenderWidget`, so a force
  refresh goes through the generic `Widget.reRenderWidget()` base
  behaviour: it re-renders the widget's full HTML and, in `initEvents()`,
  **destroys the existing Tabulator instance and creates a brand new one**.
  Prefer `Api.updateWidgetsContent`/`updateWidgetsContentWithoutLoader` over
  `forceRefresh` whenever only the data changed - it is both cheaper and
  preserves UI state.

## 6. Repository contract

The repository entry must return an object with:

- **`columns`**: an array of column definitions (see [Column
  reference](#7-column-reference)).
- **`data`**: an array of row objects, each keyed by column `field`. A
  field's value can be a plain scalar or an Analogic-style cell object
  (`value`, `displayValue`, `metadata`). Fields on a row that are **not**
  declared as a column (your own bookkeeping like a stable row id, or a
  `dataTree` row's own children array) are preserved as-is on the row
  object handed to Tabulator - they just won't render as a visible column.
- **`options`**: additional Tabulator options (grouping, clipboard, height,
  `dataTree`/`dataTreeChildField`, ...), merged with widget/default
  settings.
- **`events`**: a map of Tabulator event name -> repository function name
  (see [Events](#9-events)).

## 7. How to write the parsing (step by step)

Unlike `GridTableWidget`'s `parsingControl` script (which builds a matrix
of per-cell widget configs), a `GridTablePlusWidget` repository entry
builds two much simpler things: a **column list** (defined once) and a
**data array** (one plain object per row).

Minimal example - load an MDX result and turn it into a two-column table:

```js
myPlusTable: {
    MdxRequest: {
        url: () => `/api/v1/ExecuteMDX?$expand=Cells($select=FormattedValue;$expand=Members($select=Name))`,
        type: 'POST',
        server: true,
        body: () => ({key: 'myMdxKey', step: 200}),
        parsingControl: {
            type: 'script',
            script: (data) => {
                const cells = data.Cells || [];
                const rows = cells.map(cell => ({
                    parameter: cell.Members && cell.Members[0] ? cell.Members[0].Name : '',
                    value: cell.FormattedValue
                }));

                return {
                    columns: [
                        {title: 'Parameter', field: 'parameter', width: 220, frozen: true},
                        {title: 'Value', field: 'value', width: 220, hozAlign: 'right'}
                    ],
                    data: rows,
                    options: {height: '60vh'}
                };
            }
        }
    },
    init() {
        return new RestRequest(Repository.myPlusTable.MdxRequest);
    }
}
```

The same layered pattern the classic `GridTableWidget` uses (a shared
base style + a per-column design config + the parsing script that turns
raw cells into rendered rows - as in Venncubed's `LAClasses`/
`BaseTableCellData` helper) still applies conceptually, just targeting
Tabulator's flat column-definition shape instead of a `cellConfig` object:

```js
const baseColumn = (overrides) => ({
    width: 140,
    hozAlign: 'right',
    headerFilter: false,
    ...overrides
});

const columns = [
    baseColumn({title: 'Employee', field: 'label', width: 220, hozAlign: 'left', frozen: true}),
    baseColumn({title: 'Override', field: 'm_override', formatter: moneyFormatter})
];
```

For a real, more advanced worked example - segmented view switching, a
2-level collapsible `dataTree`, and a checkbox column with a click handler,
all built from a single MDX - see `analogicTablePlusRichDemo` in
`apps/default/static/assets/js/configs/repository.js` (data) and
`analogicNewPageNine` in `apps/default/static/assets/js/configs/widget-config.js`
(widget/segmented-control wiring).

## 8. Column reference

A column definition accepts any [Tabulator column definition
property](https://tabulator.info/docs/6.3/columns) - it is passed through
almost as-is. The ones used most often in this codebase:

| Property | Meaning |
|---|---|
| `field` (**required**) | the row-object key this column reads |
| `title` | header text |
| `width` / `minWidth` | column sizing (pixels) |
| `hozAlign` / `headerHozAlign` | horizontal alignment of cell/header |
| `resizable` | whether the user can drag-resize the column (default `true`) |
| `frozen` | pins the column while horizontally scrolling - the native equivalent of Venncubed's `addStickyColumn` CSS hack |
| `cssClass` | extra CSS class(es) applied to every cell in the column |
| `formatter` | `(cell, formatterParams, onRendered) => string` - return HTML/text to render. If omitted, the widget's own `defaultFormatter` renders the cell's `displayValue`/`value` |
| `formatterParams` | extra options passed to the formatter |
| `editor` | makes the cell editable in place - see the full type list below - combine with a `cellEdited` event |
| `editable` | gates whether an already-`editor`-enabled cell can actually be edited - see below |
| `headerFilter` | adds a filter input to the column header - accepts the same type names as `editor` |
| `headerSort` | set `false` to disable sorting (e.g. an actions/icon column); set `columnDefaults: {headerSort: false}` in `tabulatorOptions` to turn it off for every column at once |
| `visible` | set `false` to keep a field on the row data without rendering a visible column |
| `topCalc` / `bottomCalc` | built-in column aggregation (sum, avg, ...) shown in a calculation row |

### `editor` - every built-in type

Pulled directly from this project's bundled Tabulator 6.3.1 (`analogic/static/assets/js/lib/tabulator.js`), not from upstream docs of a possibly different version:

| Type | What it renders |
|---|---|
| `input` | single-line text/number input |
| `textarea` | multi-line text |
| `number` | numeric input with step buttons |
| `range` | a slider |
| `date` | a date picker |
| `time` | a time picker |
| `datetime` | combined date + time picker |
| `list` | dropdown / autocomplete / multi-select, configured via `editorParams` (e.g. `values`, `multiselect`) - **this replaces the old `'select'` editor, which no longer exists in Tabulator 6.x** |
| `star` | a star rating control |
| `progress` | a draggable progress bar |
| `tickCross` | a checkbox-style on/off toggle |
| `adaptable` | picks one of the above automatically based on the cell's current value type |

`headerFilter` accepts the same type names (most commonly `'input'` or `'list'`).

### `editable` - gating who can actually edit

`editor` alone makes every cell in the column editable. `editable` narrows that down, and accepts three shapes:

- **`boolean`** - uniformly enables/disables editing for the whole column.
- **`function(cell) => boolean`** - evaluated per cell, so editability can depend on the row's own data (e.g. block editing on `dataTree` parent/group rows, which hold aggregated sums rather than raw input):
  ```js
  editable: (cell) => !cell.getData().isParent
  ```
- **`string`** - read as a field name on the row; Tabulator evaluates `!!row.data[thatField]` as the boolean flag (a shortcut for the function form above when a plain data field already holds the answer).

`cssClass` is column-wide and static, so it can't track the same per-row condition on its own - toggle the class from inside `formatter` instead (it receives the same `cell`, so it can run the identical check and call `cell.getElement().classList.add(/remove(...)`).

## 9. Events

`events` in the repository payload maps a **Tabulator event name** to the
**name of a function on the same repository object**. Any [Tabulator
event](https://tabulator.info/docs/6.3/events) can be used - the widget
does not restrict this to a fixed list, it simply does
`table.on(eventName, handler)` for every entry. Commonly useful ones:

- `tableBuilt` - fires once the grid has finished its first render.
- `cellClick` / `cellDblClick` / `cellTap` - a cell was clicked.
- `cellEdited` - an editable cell's value was changed by the user.
- `rowClick` / `rowSelectionChanged` - row-level interaction/selection.
- `dataTreeRowExpanded` / `dataTreeRowCollapsed` - a tree branch was
  expanded/collapsed.

A handler is called as `handler(ctx, ...originalTabulatorEventArgs)`,
where `ctx` is a context object built by the widget (full API in the next
section):

```js
myPlusTable: {
    // ...
    cellClicked(ctx, event) {
        const field = ctx.getColumnField();
        if (field !== 'reviewed') {
            return;
        }
        const row = ctx.getRowData();
        console.log('clicked row', row);
    },
    cellEdited(ctx) {
        const values = ctx.getEventValues(); // {value, displayValue, field, rowIndex, ...}
        // build and send a RestRequest here to write the change back to TM1,
        // the same way a classic GridTable cell's event map action would.
    }
}
```

```js
// widget-config.js - events are wired from the repository payload, not widget-config.js
{
    id: 'myPlusTable',
    type: GridTablePlusWidget
}
```

## 10. Reading a cell's data (e.g. for a popup)

Inside any Tabulator event handler, the `ctx` argument exposes:

- `ctx.getCell()` - the Analogic-normalised cell metadata (`value`,
  `displayValue`, `field`, `rowIndex`, `columnIndex`, `id`, `widgetId`),
  when available. For a `dataTree` child row this can be `null` - prefer
  the two calls below for tree tables.
- `ctx.getCellComponent()` / `ctx.getRowComponent()` /
  `ctx.getColumnComponent()` - the *native* Tabulator components for the
  cell/row/column, always available regardless of Analogic's own metadata
  tracking. `rowComponent.getData()` returns the full row object exactly
  as your repository built it (including any extra field that isn't a
  column, e.g. a hierarchical row's children array).
- `ctx.getRowData()` - shortcut for `getRowComponent().getData()`.
- `ctx.getCellValue()` / `ctx.getEventValues()` - the current
  value/displayValue of the clicked or edited cell.
- `ctx.getColumnField()` / `ctx.getRowIndex()` / `ctx.getColumnIndex()`.

To show a clicked cell's data in a popup, follow the same pattern the
classic `GridTableWidget` uses (`Utils.setWidgetValue` + `Api.forceRefresh`
+ `Utils.openPopup`, as in Venncubed's `sawLocalAdminGridTable.text_click`):

```js
cellClicked(ctx) {
    const row = ctx.getRowData();
    Utils.setWidgetValue('selectedCell', row);
    Api.forceRefresh('myDetailsPopup').then(() => {
        Utils.openPopup('myDetailsPopup', ctx);
    });
}
```

The popup's own widgets then read the value back with `v('selectedCell')`,
exactly like any other Analogic popup.

## 11. Hierarchical / collapsible rows (`dataTree`)

Set `dataTree: true` and `dataTreeChildField: '<fieldName>'` in the
repository payload's `options`, and give parent rows a matching field
containing an array of child row objects:

```js
return {
    columns: [...],
    data: [
        {label: 'Employee1', m_override: 0, _children: [
            {label: 'Back office', m_override: 0},
            {label: 'Sales', m_override: 0}
        ]}
    ],
    options: {
        dataTree: true,
        dataTreeChildField: '_children',
        dataTreeStartExpanded: false
    }
};
```

This replaces the manual `gridRowLevel` tracking + jQuery show/hide
(`hideShowRows`) that the classic `GridTableWidget` needs for the same
effect - expand/collapse, indentation and the toggle icon are all handled
natively by Tabulator.

## 12. Skinning and styling

`GridTablePlusWidget` follows Analogic's usual skin convention:

- The widget's root element gets the classes `ks-grid-table-plus` and
  `ks-grid-table-plus-<skin>`, where `<skin>` is the widget's `skin` option
  (`'standard'` by default).
- Base styling for every `GridTablePlusWidget` lives in
  `analogic/static/assets/skin/css/ks-grid-table-plus.css` - it mostly
  themes Tabulator's own classes (`.tabulator`, `.tabulator-header`,
  `.tabulator-row`, `.tabulator-cell`, ...) under the `.ks-grid-table-plus`
  scope.
- To customise an app's look without touching the core file, add an
  `apps/<app>/static/assets/skin/css/ks-grid-table-plus-style.css`
  override - the same way other widgets (buttons, grids, ...) are themed
  per app - and/or set a custom `skin` value and target
  `.ks-grid-table-plus-<yourSkin>` in that file.
- Per-cell styling beyond CSS classes can be done directly in a column's
  `formatter`, by returning HTML with inline styles, or via `cssClass` on
  the column definition.
- Tabulator's own look-and-feel options (row height, header height,
  striping, etc.) are configured through `tabulatorOptions`/`options`
  rather than CSS, where Tabulator exposes a JS option for them - see the
  [Tabulator layout docs](https://tabulator.info/docs/6.3/layout).

## 13. Known limitations / gotchas

- A cell cannot embed another Analogic widget (no `ToggleWidget`,
  `ButtonWidget`, etc. inside a cell) - build the same interactions with a
  Tabulator `formatter`/`editor` plus a click/edit event instead. This is
  the main capability the classic `GridTableWidget` has that
  `GridTablePlusWidget` does not.
- There is no built-in TM1 write-back path (same as the classic
  `GridTableWidget`) - wire a `cellEdited`/`cellClick` event to a
  `RestRequest`/`Api.executeRequest` call yourself.
- When using `dataTree`, a structural change to a parent row's children
  (different count/shape, typically caused by switching what the table is
  grouped by) is not safe to patch incrementally - `refreshTabulator()`
  already detects this via the column signature and falls back to a full
  rebuild (see [section 5](#5-widget-behaviour---what-happens-on-refresh)),
  but keep this in mind if you bypass `updateContent()`/`refreshTabulator()`
  and call the underlying Tabulator instance directly.
- Tabulator 6.3.1 (the version bundled in this project) can log a harmless
  `Format Error - Formatter has returned a type of object` warning to the
  console while scrolling a `dataTree` table. This was confirmed (by
  neutralising every Analogic-side formatter one at a time and still
  seeing it) to be internal to Tabulator's own tree/branch rendering, not
  something in this widget's code - it does not affect functionality and
  can be ignored.

## 14. Full usage example

```js
// widget-config.js
{
    id: 'analogicTableDemoTable',
    type: GridTablePlusWidget,
    title: 'Project Portfolio Overview',
    minWidth: 960,
    hideIfNoData: false,
    tabulatorOptions: {
        height: '520px',
        layout: 'fitDataStretch',
        movableColumns: true,
        resizableColumnFit: true,
        selectable: true,
        selectableRangeMode: 'drag',
        tooltipGenerationMode: 'hover'
    }
}
```

```js
// repository.js
{
    analogicTableDemoTable: {
        init() {
            return {
                columns,
                data: rows,
                options: {
                    groupBy: 'department',
                    placeholder: 'No project portfolio data available',
                    clipboard: true
                },
                events: {
                    tableBuilt: 'tableBuilt',
                    rowSelectionChanged: 'selectionChanged',
                    cellClick: 'cellClicked',
                    cellEdited: 'cellEdited'
                }
            };
        }
    }
}
```

See also `apps/helloanalogic/static/assets/js/configs/repository.js`
(`analogicTableDemoTable`/`analogicTableDemoSimpleTable`) for two complete,
working variations - one rich (grouping, context menus, inline editing),
one minimal.
