/* global app */
'use strict';

// Test application for two customer reports (IS/BS Notes page):
//  1. NotFoundError ("Failed to set the 'innerHTML' property") when clicking fast between an edited
//     text and the cells of a grid table.
//  2. Switching a segmented control while its tables are still rendering leaves the page showing
//     the result of an older switch (the panel / table of the other segment).
// Every data load of the tables is delayed (RenderRace.latency), the way a slow TM1 answers, so the
// renders of two quick switches overlap. RenderRace.check() reports whether the page is consistent.
// The config files load in an unspecified order, each one shares this object.
var RenderRace = window.RenderRace = window.RenderRace || {
    rows: 12,
    // Latency (ms) of the next loads, taken in order; when empty, defaultLatency is used.
    latencies: [],
    defaultLatency: 600,
    log: []
};

RenderRace.columns = (prefix) => {
    const titles = ['', 'Total', 'LFRC', 'LIC', 'Check'], headerCells = [], cells = [];
    titles.forEach((title, j) => {
        headerCells.push({
            id: prefix + 'HeaderCell-' + j,
            type: GridTableHeaderCellWidget,
            width: j === 0 ? 140 : 110,
            widgets: [{id: prefix + 'HeaderText-' + j, type: TextWidget, title: title}]
        });
        cells.push({
            id: prefix + 'Cell-' + j,
            type: GridTableCellWidget,
            width: j === 0 ? 140 : 110,
            widgets: [{id: prefix + 'Text-' + j, type: TextWidget, editable: j > 0}]
        });
    });
    return [{id: prefix + 'HeaderRow', type: GridTableHeaderRowWidget, widgets: headerCells}, ...cells];
};

RenderRace.panel = (id, title, tableId) => ({
    id: id,
    type: PanelWidget,
    width: '100%',
    widgets: [
        {id: id + 'Title', type: TextWidget, title: title, titleFontSize: 18},
        {id: tableId, type: GridTableWidget, rowHeight: 30, widgets: RenderRace.columns(tableId)}
    ]
});

WidgetConfig = {
    rrMain: {
        id: 'rrMain',
        type: PageWidget,
        widgets: [
            {
                id: 'rrToolbar',
                type: GridWidget,
                widgets: [
                    {
                        id: 'rrToolbarRow',
                        type: GridRowWidget,
                        widgets: [
                            {
                                id: 'rrToolbarCell1', type: GridCellWidget, width: 420, widgets: [{
                                    id: 'rrSegmented',
                                    type: SegmentedControlWidget,
                                    width: '400px',
                                    widgets: [
                                        {id: 'rrSegmentedItem1', type: SegmentedControlItemWidget, label: 'Balance Sheet', value: 'BS', selected: true},
                                        {id: 'rrSegmentedItem2', type: SegmentedControlItemWidget, label: 'Income Statement', value: 'IS'}
                                    ]
                                }]
                            },
                            {id: 'rrToolbarCell2', type: GridCellWidget, width: 260, widgets: [{id: 'rrEditableText', type: TextWidget, title: 'edit me', editable: true}]},
                            {id: 'rrToolbarCell3', type: GridCellWidget, width: 520, widgets: [{id: 'rrStatusText', type: TextWidget, title: ''}]}
                        ]
                    }
                ]
            },
            RenderRace.panel('rrBsPanel', 'Balance Sheet', 'rrBsTable'),
            RenderRace.panel('rrIsPanel', 'Income Statement', 'rrIsTable')
        ]
    }
};
