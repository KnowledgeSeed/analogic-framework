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

        // group raw cells into primary -> secondary -> {measure: sum}
        const groups = {};
        const order = [];
        for (let i = 0; i < raw.length; i++) {
            const r = raw[i];
            const p = r[primary] || '(blank)';
            const s = r[secondary] || '(blank)';
            if (!groups[p]) {
                groups[p] = {};
                order.push(p);
            }
            if (!groups[p][s]) {
                groups[p][s] = {};
            }
            groups[p][s][r.measure] = (groups[p][s][r.measure] || 0) + r.value;
        }

        const data = order.map(p => {
            const children = Object.keys(groups[p]).map(s => {
                const measures = groups[p][s];
                const rowId = `${p}::${s}`;
                const hasValue = measureNames.some(m => (measures[m] || 0) !== 0);
                const row = {
                    label: s,
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
                cellClick: 'cellClicked'
            }
        };
    },

    "__cache": null,

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

    init() {
        const control = v('analogicNewPageNineRichSegmented');
        const segment = control ? control.value : 'employee';
        const cache = Repository.analogicTablePlusRichDemo.__cache;
        if (cache) {
            return Repository.analogicTablePlusRichDemo.__build(cache, segment);
        }
        return new RestRequest(Repository.analogicTablePlusRichDemo.MdxRequest);
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