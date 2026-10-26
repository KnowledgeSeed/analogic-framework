/* global app */
'use strict';

// Test application for the grid table bulk paste (Ctrl+V into an editable TextWidget cell).
// Layout mirrors the reported case: two blocks of phases, the "Phase 2" rows and the
// "Locked" column are read-only.
const bulkpasteColumn = (key, title, width = 110) => ({
    id: 'bulkpasteGridCell' + key,
    type: GridTableCellWidget,
    title: title,
    width: width,
    alignment: key === 'Phase' ? 'center-left' : 'center-right',
    widgets: [
        {
            id: 'bulkpasteGridText' + key,
            type: TextWidget,
            titleFontSize: 14
        }
    ]
});

WidgetConfig = {
    bulkpasteMain: {
        id: 'bulkpasteMain',
        type: PageWidget,
        widgets: [
            {
                id: 'bulkpasteTitle',
                type: TextWidget,
                title: 'Bulk paste test',
                titleFontSize: 24,
                body: 'Click an editable cell, then Ctrl+V a tab separated block (e.g. copied from Excel). Grey cells are read-only.',
                marginTop: 20,
                marginLeft: 20,
                marginBottom: 20
            },
            {
                id: 'bulkpasteGrid',
                type: GridTableWidget,
                title: '',
                width: 760,
                marginLeft: 20,
                widgets: [
                    bulkpasteColumn('Phase', 'Phase', 200),
                    bulkpasteColumn('2027', '2027'),
                    bulkpasteColumn('2028', '2028'),
                    bulkpasteColumn('2029', '2029'),
                    bulkpasteColumn('Locked', 'Locked'),
                    bulkpasteColumn('2031', '2031')
                ]
            },
            {
                id: 'bulkpasteLogText',
                type: TextWidget,
                title: 'Event log',
                body: '<pre id="bulkpasteLog" style="font-size:12px;line-height:16px;"></pre>',
                marginTop: 20,
                marginLeft: 20
            }
        ]
    }
};
