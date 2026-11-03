/* global app, RenderRace, QB, Utils */
'use strict';

var RenderRace = window.RenderRace = window.RenderRace || {rows: 12, latencies: [], defaultLatency: 600, log: []};

// Simulated server latency: the data of the tables arrives after RenderRace.latencies[0] ms (or
// defaultLatency), so the loads of two quick segment switches are in flight at the same time and can
// finish in either order.
const rrLoadData = QB.loadData, rrDelayed = ['rrBsTable', 'rrIsTable', 'rrEditableText'];
QB.loadData = (widgetId, ...args) => {
    const result = rrLoadData(widgetId, ...args);
    if (!rrDelayed.includes(widgetId)) {
        return result;
    }
    const ms = RenderRace.latencies.length ? RenderRace.latencies.shift() : RenderRace.defaultLatency;
    RenderRace.pending = (RenderRace.pending || 0) + 1;
    return result.then(d => $.Deferred(deferred => setTimeout(() => {
        --RenderRace.pending;
        deferred.resolve(d);
    }, ms)).promise());
};

RenderRace.segment = () => (Widgets.rrSegmented && Widgets.rrSegmented.value) || 'BS';

RenderRace.tableData = (tableId, segment) => {
    const result = [];
    for (let i = 0; i < RenderRace.rows; ++i) {
        result.push([
            {title: segment + ' row ' + i, segment: segment},
            {title: (i * 345).toFixed(2)},
            {title: (i * 1000 + 0.56).toFixed(2)},
            {title: (-i * 999).toFixed(2)},
            {title: '0.00'}
        ]);
    }
    return result;
};

Repository = {
    rrBsPanel: {
        init: () => ({visible: RenderRace.segment() === 'BS'})
    },
    rrIsPanel: {
        init: () => ({visible: RenderRace.segment() === 'IS'})
    },
    rrBsTable: {
        init: {execute: () => RenderRace.tableData('rrBsTable', RenderRace.segment())}
    },
    rrIsTable: {
        init: {execute: () => RenderRace.tableData('rrIsTable', RenderRace.segment())}
    },
    rrEditableText: {
        init: {execute: () => ({title: 'edit me', editable: true})}
    },
    rrSegmented: {
        // The pattern of the customer page: a switch re-renders both panels, whose visibility (and
        // whose table data) depend on the selected segment.
        switch: () => Api.forceRefreshWidgets(['rrBsPanel', 'rrIsPanel'])
    }
};
