/* global app */
'use strict';

// Test application for the TextWidget / Widget.reRenderWidget rendering changes.
// Grid size and the compact text markup can be switched from the console:
//   localStorage.setItem('textperfRows', 300); localStorage.setItem('textperfCols', 30);
//   localStorage.setItem('textperfCompact', '1'); location.reload();
const TextPerf = {
    rows: parseInt(localStorage.getItem('textperfRows') || '150', 10),
    cols: parseInt(localStorage.getItem('textperfCols') || '20', 10),
    compact: localStorage.getItem('textperfCompact') === '1',
    generation: 0,
    log: [],
    // Column kinds, by column index. Anything above 4 alternates readonly / editable.
    kind: (col) => ['label', 'editable', 'performable', 'titleBody', 'rightClick'][col] || (col % 2 ? 'editable' : 'readonly')
};

window.TextPerf = TextPerf;

TextPerf.gridColumns = () => {
    const headerCells = [], cells = [];
    for (let j = 0; j < TextPerf.cols; ++j) {
        const kind = TextPerf.kind(j);
        headerCells.push({
            id: 'textperfGridHeaderCell-' + j,
            type: GridTableHeaderCellWidget,
            width: j === 0 ? 120 : 90,
            widgets: [{id: 'textperfGridHeaderText-' + j, type: TextWidget, title: kind + ' ' + j}]
        });
        cells.push({
            id: 'textperfGridCell-' + j,
            type: GridTableCellWidget,
            width: j === 0 ? 120 : 90,
            widgets: [{
                id: 'textperfGridText-' + j,
                type: TextWidget,
                editable: kind === 'editable',
                performable: kind === 'performable',
                enableRightClick: kind === 'rightClick',
                compactHtml: TextPerf.compact
            }]
        });
    }
    return [{id: 'textperfGridHeaderRow', type: GridTableHeaderRowWidget, widgets: headerCells}, ...cells];
};

WidgetConfig = {
    textperfMain: {
        id: 'textperfMain',
        type: PageWidget,
        widgets: [
            {
                id: 'textperfToolbar',
                type: GridWidget,
                widgets: [
                    {
                        id: 'textperfToolbarRow',
                        type: GridRowWidget,
                        widgets: [
                            {id: 'textperfToolbarCell1', type: GridCellWidget, width: 180, widgets: [{id: 'textperfRerenderButton', type: ButtonWidget, label: 'Re-render grid'}]},
                            {id: 'textperfToolbarCell2', type: GridCellWidget, width: 180, widgets: [{id: 'textperfUpdateButton', type: ButtonWidget, label: 'Update content'}]},
                            {id: 'textperfToolbarCell3', type: GridCellWidget, width: 180, widgets: [{id: 'textperfToggleButton', type: ButtonWidget, label: 'Toggle standalone'}]},
                            {id: 'textperfToolbarCell4', type: GridCellWidget, width: 500, widgets: [{id: 'textperfTimingText', type: TextWidget, title: ''}]}
                        ]
                    },
                    {
                        id: 'textperfStandaloneRow',
                        type: GridRowWidget,
                        widgets: [
                            {id: 'textperfStandaloneCell1', type: GridCellWidget, width: 180, widgets: [{id: 'textperfPlainText', type: TextWidget, title: 'Plain title', compactHtml: TextPerf.compact}]},
                            {id: 'textperfStandaloneCell2', type: GridCellWidget, width: 180, widgets: [{id: 'textperfEditableText', type: TextWidget, title: 'edit me', editable: true, compactHtml: TextPerf.compact}]},
                            {id: 'textperfStandaloneCell3', type: GridCellWidget, width: 180, widgets: [{id: 'textperfIconText', type: TextWidget, title: 'With icon', icon: 'icon-copy', iconPosition: 'left', compactHtml: TextPerf.compact}]},
                            {id: 'textperfStandaloneCell4', type: GridCellWidget, width: 180, widgets: [{id: 'textperfBodyText', type: TextWidget, title: 'Title', body: 'Body text', compactHtml: TextPerf.compact}]},
                            {id: 'textperfStandaloneCell5', type: GridCellWidget, width: 180, widgets: [{id: 'textperfRightClickText', type: TextWidget, title: 'Right click me', enableRightClick: true, compactHtml: TextPerf.compact}]},
                            // Starts with nothing but a title; "Toggle standalone" switches icon / body / editable on and off through updateContent.
                            {id: 'textperfStandaloneCell6', type: GridCellWidget, width: 220, widgets: [{id: 'textperfDynamicText', type: TextWidget, compactHtml: TextPerf.compact}]}
                        ]
                    }
                ]
            },
            {
                id: 'textperfGrid',
                type: GridTableWidget,
                rowHeight: 28,
                widgets: TextPerf.gridColumns()
            }
        ]
    }
};
