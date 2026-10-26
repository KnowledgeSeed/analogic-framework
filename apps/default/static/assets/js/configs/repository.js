/* global app */
'use strict';
Repository = {
analogicTablePlusRichDemo:{
    // Same big MDX/dataset as the two tables above, but parsed the way adminLocal.txt's
    // sawLocalAdminGridTable does it: a layered column-default helper (mirrors LAClasses /
    // BaseTableCellData), a segmented control that switches the grouping (mirrors the
    // segment-driven mdxKey/TableFormat switching), a 2-level collapsible tree (mirrors
    // hideShowRows, but native to Tabulator's dataTree instead of manual DOM show/hide), and a
    // checkbox column with a cell-click handler (mirrors the Preparer/Reviewer checkbox columns
    // + text_click). We don't have Venncubed's TM1 model, so there is no real write-back Process
    // here - the "write" side is a client-only mock (console.log + local toggle), not a server call.

    "__toNumber": (formattedValue) => {
        const n = parseFloat(String(formattedValue || '0').replace(',', '.'));
        return isNaN(n) ? 0 : n;
    },

    "__measureField": (name) => 'm_' + String(name).toLowerCase().replace(/[^a-z0-9]+/g, '_'),

    // Deterministic (same rowId -> same number every render) 0-150 pseudo-random value, used
    // only to give the "Correction" column's progress editor something visible to show - see
    // the comment where this is called.
    "__demoCorrectionValue": (rowId) => {
        let seed = 0;
        const str = String(rowId);
        for (let i = 0; i < str.length; i++) {
            seed = (seed * 31 + str.charCodeAt(i)) % 100000;
        }
        const x = Math.sin(seed + 1) * 10000;
        return Math.round((x - Math.floor(x)) * 150);
    },

    // Layered column-default helper, analogous to adminLocal.txt's LAClasses/BaseTableCellData:
    // a shared base style merged with per-column overrides, instead of repeating the same
    // width/alignment/filter setup on every column definition.
    "__baseColumn": (overrides) => ({
        width: 140,
        hozAlign: 'right',
        headerFilter: false,
        ...overrides
    }),

    "__reviewed": {}, // client-only mock "reviewed" flag storage, keyed by leaf row id - no server write

    // Row count text for the render-time log: parent (total) rows + leaf rows of the tree.
    "__rowSummary": (data) => {
        const leaves = data.reduce((n, parent) => n + (parent._children ? parent._children.length : 0), 0);
        return `${data.length + leaves} rows (${data.length} parents + ${leaves} leaves)`;
    },

    // Shared render-time logger for this table and the classic-GridTable comparison page, so both
    // are measured the same way: start = the widget's init (data load) begins, end = the table has
    // finished rendering, diff = end - start (with the data part split out).
    "__renderTimer": {
        pending: {},
        clock() {
            const d = new Date();
            return d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0');
        },
        start(label) {
            this.pending[label] = {t0: performance.now(), dataAt: null};
            console.log(`[${label}] render start: ${this.clock()}`);
        },
        // rows: optional text describing the row count, appended to the "render time" line
        dataReady(label, rows = '') {
            if (this.pending[label]) {
                this.pending[label].dataAt = performance.now();
                this.pending[label].rows = rows;
            }
        },
        mark(label, what) {
            const p = this.pending[label];
            if (p) {
                console.log(`[${label}] ${what}: ${this.clock()} (+${Math.round(performance.now() - p.t0)} ms)`);
            }
        },
        end(label) {
            const p = this.pending[label];
            if (!p) {
                return;
            }
            delete this.pending[label];
            const t1 = performance.now();
            const parts = p.dataAt === null ? '' : ` (data ${Math.round(p.dataAt - p.t0)} ms + render ${Math.round(t1 - p.dataAt)} ms)`;
            console.log(`[${label}] render end:   ${this.clock()}`);
            console.log(`[${label}] render time:  ${Math.round(t1 - p.t0)} ms${parts}${p.rows ? ', ' + p.rows : ''}`);
        }
    },

    "__moneyFormatter": (cell) => {
        const raw = cell.getValue();
        const n = typeof raw === 'number' ? raw : parseFloat(raw) || 0;
        return n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    },

    "__reviewedFormatter": (cell) => {
        const row = cell.getData();
        if (!row || row.isParent) {
            return '';
        }
        return row.reviewed
            ? '<span class="icon-check-square-fill" style="color:#007AFF;font-size:20px;"></span>'
            : '<span class="icon-square" style="color:#ACADAE;font-size:20px;"></span>';
    },

    "__build": (raw, groupBy) => {
        const R = Repository.analogicTablePlusRichDemo;
        const primary = groupBy === 'position' ? 'position' : 'employee';
        const secondary = primary === 'position' ? 'employee' : 'position';

        // Discover the measure columns dynamically from the actual data instead of hardcoding
        // Venncubed's business measure names, which we don't have in this dataset.
        const measureNames = [];
        const measureSeen = {};
        for (let i = 0; i < raw.length; i++) {
            const measure = raw[i].measure;
            if (measure && !measureSeen[measure]) {
                measureSeen[measure] = true;
                measureNames.push(measure);
            }
        }

        // group raw cells into primary -> leaf rows {measure: value}. Nothing is summed across the
        // Org Unit / Lineitem dimensions (the raw cells don't carry them any more): a leaf is
        // identified by (secondary, n), n counting how often that (primary, secondary, measure)
        // was already seen, so every Org Unit / Lineitem block stays its own row - the same
        // 63,125 leaf rows the classic GridTable comparison page (analogicCompareGridTable) shows.
        // Only the parent rows are totals.
        const groups = {};
        const order = [];
        const occurrences = new Map();
        for (let i = 0; i < raw.length; i++) {
            const r = raw[i];
            const p = r[primary] || '(blank)';
            const s = r[secondary] || '(blank)';
            if (!groups[p]) {
                groups[p] = new Map();
                order.push(p);
            }
            const occurrenceKey = p + '\u0001' + s + '\u0001' + r.measure;
            const n = occurrences.get(occurrenceKey) || 0;
            occurrences.set(occurrenceKey, n + 1);

            const leafKey = s + '\u0001' + n;
            let leaf = groups[p].get(leafKey);
            if (!leaf) {
                leaf = {secondary: s, n: n, measures: {}};
                groups[p].set(leafKey, leaf);
            }
            leaf.measures[r.measure] = (leaf.measures[r.measure] || 0) + r.value;
        }

        const data = order.map(p => {
            const children = Array.from(groups[p].values()).map(leaf => {
                const measures = leaf.measures;
                const rowId = `${p}::${leaf.secondary}::${leaf.n}`;
                const hasValue = measureNames.some(m => (measures[m] || 0) !== 0);
                const row = {
                    label: `${leaf.secondary} #${leaf.n + 1}`,
                    rowId: rowId,
                    reviewed: !!R.__reviewed[rowId],
                    hasValue: hasValue
                };
                measureNames.forEach(m => {
                    // "Correction" is always 0 in the real MDX (checked the full 378k-row
                    // cache), so the progress editor on that column rendered an invisible,
                    // 0%-wide bar - looked broken even though the editor itself works fine.
                    // Swap in a deterministic (stable across re-renders) demo value just for
                    // that one column so there's actually something to show/drag.
                    row[R.__measureField(m)] = m === 'Correction'
                        ? R.__demoCorrectionValue(rowId)
                        : (measures[m] || 0);
                });
                return row;
            });

            const parentTotals = {};
            measureNames.forEach(m => {
                parentTotals[m] = 0;
            });
            children.forEach(c => {
                measureNames.forEach(m => {
                    parentTotals[m] += c[R.__measureField(m)] || 0;
                });
            });

            const parentRow = {label: p, rowId: p, isParent: true, _children: children};
            measureNames.forEach(m => {
                parentRow[R.__measureField(m)] = parentTotals[m];
            });
            return parentRow;
        });

        const columns = [
            R.__baseColumn({
                title: primary === 'employee' ? 'Employee' : 'Position',
                field: 'label',
                width: 400,
                hozAlign: 'left',
                frozen: true,
                // Without an explicit formatter this falls back to GridTablePlusWidget's own
                // defaultFormatter, which resolves its value through the widget's __analogicCells
                // metadata map - a map that's only ever built for top-level rows, never for
                // dataTree children (buildTabulatorData() doesn't recurse into _children). That
                // left every child row's label blank, with only Tabulator's own tree-branch
                // connector line showing (the "L"-shaped border seen in place of the text).
                // cell.getData() is Tabulator's own, always-reliable row data - same fix already
                // used by the "reporting" skin demo's label column.
                formatter: (cell) => {
                    const row = cell.getData();
                    const dotClass = row.isParent ? 'ks-gtp-report-dot--parent' : 'ks-gtp-report-dot--child';
                    let label = row && typeof row.label !== 'undefined' ? row.label : '';
                    return  `<div><span class="ks-gtp-report-dot ${dotClass}"></span>${row.label}</div>`;
                }
            })
            // _children/isParent/rowId no longer need to be declared as (hidden) columns here:
            // GridTablePlusWidget.buildTabulatorData() now copies every field off the raw row,
            // not just the ones with a column definition, so this metadata survives on its own.
        ];
        // One editor type per measure column, purely to showcase the range of built-in Tabulator
        // editors (see docs/GridTablePlusWidget.md, "editor - every built-in type") - not chosen
        // for business-realism. Any measure name not listed here (currently just "Corrected
        // Value", which stays non-editable anyway via isColumnEditable below) falls back to 'number'.
        const editorByMeasure = {
            'Override': {editor: 'number'},
            'Value': {editor: 'range', editorParams: {min: 0, max: 150, step: 1}},
            'Input': {editor: 'textarea'},
            'Delta': {editor: 'list', editorParams: {values: [0, 25, 50, 75, 100, 125, 150]}},
            'Correction': {editor: 'progress', editorParams: {min: 0, max: 150}}
        };

        measureNames.forEach((m, i) => {
            // Editable is a function now instead of a static `i !== 1` boolean, so it can also
            // block editing on level-0 (parent/group) rows - those hold aggregated sums, not raw
            // input. cssClass can't do the same per-row check (it's applied once, statically, for
            // the whole column), so the editable/readonly class is instead toggled per cell inside
            // the formatter, using the same two conditions.
            const isColumnEditable = i !== 1;
            const editorCfg = editorByMeasure[m] || {editor: 'number'};
            columns.push(R.__baseColumn({
                title: m,
                field: R.__measureField(m),
                width: 220,
                formatter: (cell) => {
                    const row = cell.getData();
                    const editableCell = isColumnEditable && !(row && row.isParent);
                    const element = cell.getElement();
                    element.classList.remove('ks-gtp-report-cell--editable', 'ks-gtp-report-cell--readonly');
                    element.classList.add(editableCell ? 'ks-gtp-report-cell--editable' : 'ks-gtp-report-cell--readonly');
                    return R.__moneyFormatter(cell);
                },
                editor: editorCfg.editor,
                editorParams: editorCfg.editorParams,
                editable: (cell) => isColumnEditable && !(cell.getData() && cell.getData().isParent),
            }));
        });
        columns.push(R.__baseColumn({
            title: 'Reviewed',
            field: 'reviewed',
            width: 110,
            hozAlign: 'center',
            formatter: R.__reviewedFormatter
        }));
        // trailing comment/note indicator, mirroring the reference screenshot's chat-bubble
        // column - highlighted (icon-comment-on) for rows that actually carry non-zero data
        // (row.hasValue, computed above), a dim placeholder (icon-comment-off) otherwise.
        // Purely visual for now, no click handler - not asked for.
        columns.push(R.__baseColumn({
            title: '',
            field: 'comment',
            width: 44,
            hozAlign: 'center',
            formatter: (cell) => {
                const row = cell.getData();
                if (!row || row.isParent) {
                    return '';
                }
                const active = !!row.hasValue;
                return `<span class="icon-comment-${active ? 'on' : 'off'}" style="font-size:18px;color:${active ? '#2563eb' : '#94a3b8'};"></span>`;
            }
        }));

        return {
            columns: columns,
            data: data,
            options: {
                height: '60vh',
                dataTree: true,
                headerSort: false,
                dataTreeChildField: '_children',
                dataTreeStartExpanded: false
            },
            events: {
                cellClick: 'cellClicked',
                renderComplete: 'renderCompleted'
            }
        };
    },

    // Tabulator's renderComplete - ends the render-time measurement started in init (only the
    // first one after a start counts; later ones, e.g. from scrolling, are ignored).
    renderCompleted() {
        Repository.analogicTablePlusRichDemo.__renderTimer.end('analogicTablePlusRichDemo');
    },


    cellClicked(ctx) {
        // Mirrors adminLocal.txt's text_click structure (inspect the clicked cell, branch on
        // its meaning), but every action here is a client-only mock - there is no real TM1
        // Process call behind this demo data. We read the field straight off the Tabulator cell
        // component (not ctx.getCell()) because GridTablePlusWidget's own cell-metadata tracking
        // only covers the top-level data array, not dataTree children.
        const cellComponent = ctx.getCellComponent();
        const field = cellComponent && typeof cellComponent.getField === 'function' ? cellComponent.getField() : null;
        const row = ctx.getRowData();

        // clicking the label/title cell opens a simple details popup for that row. The tree
        // expand/collapse icon lives in the same cell but stops its own click from bubbling
        // here (Tabulator's own dataTree control calls stopPropagation()), so this only fires
        // for clicks on the text itself.
        if (field === 'label') {
            if (!row) {
                return;
            }
            Utils.setWidgetValue('analogicTablePlusRichDemoSelectedRow', row);
            Api.forceRefresh('analogicTablePlusRichDemoDetailsPopup').then(() => {
                // Utils.openPopup(id, ctx) calls ctx.getEvent()/ctx.getElement() - the classic
                // widget-event ctx shape. GridTablePlusWidget's own ctx (built in
                // buildRepositoryContext) has no getElement(), only getCellElement(), so calling
                // Utils.openPopup here throws "ctx.getElement is not a function". Our popup is
                // centered/backdrop-based (no anchorOnClick), so the element argument isn't even
                // used functionally - call Api.openPopup directly with the matching method names.
                Api.openPopup('analogicTablePlusRichDemoDetailsPopup', ctx.getEvent(), ctx.getCellElement());
            });
            return;
        }

        if (field !== 'reviewed') {
            return;
        }
        if (!row || row.isParent) {
            return;
        }
        Repository.analogicTablePlusRichDemo.__reviewed[row.rowId] = !Repository.analogicTablePlusRichDemo.__reviewed[row.rowId];
        console.log('[analogicTablePlusRichDemo] mock write -> reviewed toggled for', row.rowId, Repository.analogicTablePlusRichDemo.__reviewed[row.rowId]);
        Api.updateWidgetsContentWithoutLoader(['analogicTablePlusRichDemo']);
    },

    "MdxRequest": {
        url: () => `/api/v1/ExecuteMDX?$expand=Cells($select=FormattedValue;$expand=Members($select=Name))`,
        type: "POST",
        server: true,
        body: () => ({key: 'analogicDemoMainRow2NewGridTableTest6_init', step: 2000000}),
        parsingControl: {
            type: 'script',
            script: (data) => {
                const cells = data.Cells || [];
                const raw = new Array(cells.length);
                for (let i = 0; i < cells.length; i++) {
                    const m = cells[i].Members || [];
                    raw[i] = {
                        employee: m[3] ? m[3].Name : '',
                        position: m[5] ? m[5].Name : '',
                        measure: m[4] ? m[4].Name : '',
                        value: Repository.analogicTablePlusRichDemo.__toNumber(cells[i].FormattedValue)
                    };
                }
                Repository.analogicTablePlusRichDemo.__cache = raw;
                const control = v('analogicNewPageNineRichSegmented');
                return Repository.analogicTablePlusRichDemo.__build(raw, control ? control.value : 'employee');
            }
        }
    },

    // Offline demo: the raw array that MdxRequest's parsingControl produces (employee/position/
    // measure/value per cell) was saved once to analogicTablePlusRichDemo.raw.json next to this
    // file, so the table loads from it instead of calling ExecuteMDX. A plain init() can't return
    // an async result (the load executor wraps it in an already-resolved Deferred, which doesn't
    // adopt promises), so init is a LoadExecutor subclass (the factory instantiates it with the
    // context) whose execute() returns the ajax Deferred. The
    // MdxRequest above is kept to switch back to the live MDX source.
    "__rawJsonUrl": (() => {
        const script = document.currentScript
            || Array.from(document.scripts).find(s => /configs\/repository\.js/.test(s.src));
        const base = script && script.src ? script.src.replace(/[^/?]*(\?.*)?$/, '') : 'apps/default/static/assets/js/configs/';
        return base + 'analogicTablePlusRichDemo.raw.json';
    })(),

    init: class extends LoadExecutor {
        execute() {
            const R = Repository.analogicTablePlusRichDemo;
            const widgetId = this.context.getWidgetId();
            const control = v('analogicNewPageNineRichSegmented');
            const segment = control ? control.value : 'employee';
            R.__renderTimer.start(widgetId);

            if (R.__cache) {
                this.parsingControlFinished(widgetId);
                const result = R.__build(R.__cache, segment);
                R.__renderTimer.dataReady(widgetId, R.__rowSummary(result.data));
                return $.Deferred().resolve(result);
            }

            return $.ajax({url: R.__rawJsonUrl, dataType: 'json', cache: true}).then(raw => {
                R.__cache = raw;
                const result = R.__build(raw, segment);
                R.__renderTimer.dataReady(widgetId, R.__rowSummary(result.data));
                this.parsingControlFinished(widgetId);
                return result;
            });
        }
    },
},
analogicCompareGridTable: {
    // Render-time comparison for the classic GridTableWidget: the same saved dataset as
    // analogicTablePlusRichDemo (shares its __cache / raw.json). Both tables show the same
    // un-aggregated leaf rows: every Employee x Position x (Org Unit, Lineitem) combination is
    // its own row with one column per measure (63,125 rows x 8 columns = 505,000 cells), here as
    // real TextWidget cells. Expect a slow render on the full data.

    "__rowLimit": 2000, // 0 = all rows; set e.g. 2000 in the console before opening the page to try a lighter run

    "__measures": ['Override', 'Corrected Value', 'Value', 'Input', 'Delta', 'Correction'],

    // raw: [{employee, position, measure, value}] in MDX order. A row is identified by
    // (employee, position, n) where n counts how often that (employee, position, measure) was
    // already seen - repeated Org Unit / Lineitem blocks therefore become separate rows.
    "__build": (raw) => {
        const R = Repository.analogicCompareGridTable;
        const measureIndex = {};
        R.__measures.forEach((m, i) => {
            measureIndex[m] = i;
        });
        const fmt = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format;
        const occurrences = new Map();
        const rowIndex = new Map();
        const rows = [];

        for (let i = 0; i < raw.length; i++) {
            const r = raw[i];
            const mi = measureIndex[r.measure];
            if (mi === undefined) {
                continue;
            }
            const cellKey = r.employee + '\u0001' + r.position + '\u0001' + r.measure;
            const n = occurrences.get(cellKey) || 0;
            occurrences.set(cellKey, n + 1);

            const rowKey = r.employee + '\u0001' + r.position + '\u0001' + n;
            let row = rowIndex.get(rowKey);
            if (!row) {
                row = [{title: r.employee}, {title: r.position}];
                for (let k = 0; k < R.__measures.length; k++) {
                    row.push({title: fmt(0)});
                }
                rowIndex.set(rowKey, row);
                rows.push(row);
            }
            row[2 + mi] = {title: fmt(r.value)};
        }

        return R.__rowLimit > 0 ? rows.slice(0, R.__rowLimit) : rows;
    },

    init: class extends LoadExecutor {
        execute() {
            const R = Repository.analogicCompareGridTable;
            const P = Repository.analogicTablePlusRichDemo;
            const widgetId = this.context.getWidgetId();
            const timer = P.__renderTimer;
            const previous = Widgets[widgetId] && Widgets[widgetId].cellData;

            timer.start(widgetId);
            // The table sets isRendering = false at the end of its initEvents, i.e. when every cell
            // widget is built and in the DOM. Nothing signals that to the repository, so poll for it.
            // The main thread is blocked while rendering, so the first tick after it is the finish.
            // On a big table the DOM insert and the following initEvents (one call per cell) are
            // two long blocking steps, so the moment the table content shows up is logged too.
            let domLogged = false;
            const poll = () => {
                const w = Widgets[widgetId];
                if (!domLogged && w && w.cellData !== previous && document.querySelector('#' + widgetId + ' .ks-grid-table-content')) {
                    domLogged = true;
                    timer.mark(widgetId, 'table DOM inserted');
                }
                if (w && w.cellData && w.cellData !== previous && w.isRendering === false) {
                    timer.end(widgetId);
                } else if (timer.pending[widgetId] && performance.now() - timer.pending[widgetId].t0 < 3600000) {
                    setTimeout(poll, 20);
                }
            };
            setTimeout(poll, 20);

            const finish = (raw) => {
                const rows = R.__build(raw);
                timer.dataReady(widgetId, `${rows.length} rows x ${R.__measures.length + 2} columns = ${rows.length * (R.__measures.length + 2)} cells`);
                this.parsingControlFinished(widgetId);
                return rows;
            };

            if (P.__cache) {
                return $.Deferred().resolve(finish(P.__cache));
            }

            return $.ajax({url: P.__rawJsonUrl, dataType: 'json', cache: true}).then(raw => {
                P.__cache = raw;
                return finish(raw);
            });
        }
    }
},
analogicNewPageNineRichSegmented: {
    switch() {
        Api.updateContent('analogicTablePlusRichDemo');
    }
},
analogicTablePlusRichDemoDetailsPopupTitle:{
    init() {
        const row = v('analogicTablePlusRichDemoSelectedRow');
        return {title: row ? row.label : ''};
    }
},
analogicTablePlusRichDemoDetailsPopupFields:{
    init() {
        const row = v('analogicTablePlusRichDemoSelectedRow') || {};
        const fmt = (n) => typeof n === 'number' ? n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
        const lines = [
            `Override: ${fmt(row.m_override)}`,
            `Corrected Value: ${fmt(row.m_corrected_value)}`,
            `Value: ${fmt(row.m_value)}`,
            `Input: ${fmt(row.m_input)}`,
            `Delta: ${fmt(row.m_delta)}`,
            `Correction: ${fmt(row.m_correction)}`,
            `Reviewed: ${row.reviewed ? 'Yes' : 'No'}`
        ];
        return {body: lines.join('<br>')};
    }
},
};