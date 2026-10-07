/* global app */
'use strict';
WidgetConfig = {
        analogicMain:
            {
                id: 'analogicMain',
                type: PageWidget,
                widgets: [
                    {
                        id: 'analogicMainHelloAnalogic',
                        type: ButtonWidget,
                        url: '/helloanalogic',
                        label: 'Hello analogic application'
                    },
                    {
                        id: 'analogicMainCompareToGridTable',
                        type: ButtonWidget,
                        label: 'Compare to GridTableWidget'
                    },
                    {
                    "id": "analogicNewPageNineRichInfoRow",
                    "type": GridRowWidget,
                    "marginTop": "24",
                    "marginBottom": "8",
                    "width": "100%",
                    "widgets": [
                        {
                            "id": "analogicNewPageNineRichInfoCell",
                            "type": GridCellWidget,
                            "alignment": "top-left",
                            "width": "100%",
                            "widgets": [
                                {
                                    "id": "analogicNewPageNineRichInfoText",
                                    "type": TextWidget,
                                    "title": "GridTable Plus - Venncubed parsing/event pattern port",
                                    "body": "Same MDX again, but this time parsed like adminLocal.txt's sawLocalAdminGridTable: layered column defaults, a segmented view switch, a collapsible 2-level tree (native Tabulator dataTree instead of manual row show/hide) and a checkbox column with a click handler. The checkbox click is a client-only mock - no real TM1 write-back exists for this demo data.",
                                    "titleFontSize": 16,
                                    "titleFontWeight": 600,
                                    "bodyFontColor": "#4B5563"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "analogicNewPageNineRichControlRow",
                    "type": GridRowWidget,
                    "marginBottom": "12",
                    "width": "100%",
                    "widgets": [
                        {
                            "id": "analogicNewPageNineRichControlCell",
                            "type": GridCellWidget,
                            "alignment": "top-left",
                            "width": "100%",
                            "widgets": [
                                {
                                    "id": "analogicNewPageNineRichSegmented",
                                    "type": SegmentedControlWidget,
                                    "width": 260,
                                    "widgets": [
                                        {
                                            "id": "analogicNewPageNineRichSegmentedEmployee",
                                            "type": SegmentedControlItemWidget,
                                            "label": "By Employee",
                                            "value": "employee",
                                            "selected": true
                                        },
                                        {
                                            "id": "analogicNewPageNineRichSegmentedPosition",
                                            "type": SegmentedControlItemWidget,
                                            "label": "By Position",
                                            "value": "position"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "analogicNewPageNineRichRow1",
                    "type": GridRowWidget,
                    "width": "100%",
                    "widgets": [
                        {
                            "id": "analogicNewPageNineRichRow1Cell1",
                            "type": GridCellWidget,
                            "alignment": "top-left",
                            "width": "100%",
                            "widgets": [
                                {
                                    "id": "analogicTablePlusRichDemo",
                                    "type": GridTablePlusWidget,
                                    "originalId": "analogicTablePlusRichDemo",
                                    "skin": "reporting",
                                    "minWidth": '100%',
                                    "hideIfNoData": false,
                                    "tabulatorOptions": {
                                        "layout": "fitDataStretch",
                                        "resizableColumnFit": true,
                                        "dataTreeExpandElement": '<span class="icon-chevron-right"></span>',
                                        "dataTreeCollapseElement": '<span class="icon-chevron-down"></span>',
                                        "columnDefaults": {
                                            "headerSort": false
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "id": "analogicTablePlusRichDemoDetailsPopup",
                            "type": ContainerWidget,
                            "visible": false,
                            "backdrop": true,
                            "closeBtn": true,
                            "position": "center",
                            "width": 360,
                            "widgets": [
                                {
                                    "id": "analogicTablePlusRichDemoDetailsPopupGrid",
                                    "type": GridWidget,
                                    "width": "100%",
                                    "marginLeft": "16",
                                    "marginRight": "16",
                                    "marginTop": "16",
                                    "marginBottom": "16",
                                    "widgets": [
                                        {
                                            "id": "analogicTablePlusRichDemoDetailsPopupTitleRow",
                                            "type": GridRowWidget,
                                            "marginBottom": "12",
                                            "width": "100%",
                                            "widgets": [
                                                {
                                                    "id": "analogicTablePlusRichDemoDetailsPopupTitleCell",
                                                    "type": GridCellWidget,
                                                    "width": "100%",
                                                    "alignment": "top-left",
                                                    "widgets": [
                                                        {
                                                            "id": "analogicTablePlusRichDemoDetailsPopupTitle",
                                                            "type": TextWidget,
                                                            "titleFontSize": 18,
                                                            "titleFontWeight": 700
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "id": "analogicTablePlusRichDemoDetailsPopupFieldsRow",
                                            "type": GridRowWidget,
                                            "width": "100%",
                                            "widgets": [
                                                {
                                                    "id": "analogicTablePlusRichDemoDetailsPopupFieldsCell",
                                                    "type": GridCellWidget,
                                                    "width": "100%",
                                                    "alignment": "top-left",
                                                    "widgets": [
                                                        {
                                                            "id": "analogicTablePlusRichDemoDetailsPopupFields",
                                                            "type": TextWidget,
                                                            "icon": false,
                                                            "bodyFontColor": "#334155"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                                ]
                                }

                    ]
                },

                    // {
                    //     id: 'analogicMainHrDemo',
                    //     type: ButtonWidget,
                    //     url: '/hrdemo',
                    //     label: 'Hrdemo application'
                    // }
                ]
            },
        // Render-time comparison page: the SAME dataset as analogicTablePlusRichDemo (the saved
        // raw.json, same un-aggregated leaf rows) rendered by the classic GridTableWidget, i.e. one real
        // Widget instance + DOM subtree per cell instead of Tabulator's virtualised rows.
        analogicCompareGridTablePage:
            {
                id: 'analogicCompareGridTablePage',
                type: PageWidget,
                widgets: [
                    {
                        id: 'analogicCompareGridTableBack',
                        type: ButtonWidget,
                        label: 'Back'
                    },
                    {
                        id: 'analogicCompareGridTableInfoRow',
                        type: GridRowWidget,
                        marginTop: '24',
                        marginBottom: '12',
                        width: '100%',
                        widgets: [
                            {
                                id: 'analogicCompareGridTableInfoCell',
                                type: GridCellWidget,
                                alignment: 'top-left',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'analogicCompareGridTableInfoText',
                                        type: TextWidget,
                                        title: 'Classic GridTableWidget - same data as the GridTable Plus demo',
                                        body: 'Only the first 2,000 rows of the saved dataset (16,000 cells) are shown here - the full dataset has 63,125 rows (505,000 cells), which this widget would need several minutes to render. One row per Employee x Position x (Org Unit, Lineitem) combination and one column per measure. Every cell is a real TextWidget instance, so the whole table is rendered up front. The load and render times are logged to the browser console ([analogicCompareGridTable]).',
                                        titleFontSize: 16,
                                        titleFontWeight: 600,
                                        bodyFontColor: '#4B5563'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'analogicCompareGridTableRow',
                        type: GridRowWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'analogicCompareGridTableRowCell',
                                type: GridCellWidget,
                                alignment: 'top-left',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'analogicCompareGridTable',
                                        type: GridTableWidget,
                                        title: '',
                                        minWidth: '100%',
                                        hideIfNoData: false,
                                        widgets: [
                                            {
                                                id: 'analogicCompareGridTableCell1',
                                                type: GridTableCellWidget,
                                                title: 'Employee',
                                                width: 160,
                                                alignment: 'center-left',
                                                widgets: [{id: 'analogicCompareGridTableCell1Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell2',
                                                type: GridTableCellWidget,
                                                title: 'Position',
                                                width: 140,
                                                alignment: 'center-left',
                                                widgets: [{id: 'analogicCompareGridTableCell2Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell3',
                                                type: GridTableCellWidget,
                                                title: 'Override',
                                                width: 120,
                                                alignment: 'center-right',
                                                widgets: [{id: 'analogicCompareGridTableCell3Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell4',
                                                type: GridTableCellWidget,
                                                title: 'Corrected Value',
                                                width: 120,
                                                alignment: 'center-right',
                                                widgets: [{id: 'analogicCompareGridTableCell4Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell5',
                                                type: GridTableCellWidget,
                                                title: 'Value',
                                                width: 120,
                                                alignment: 'center-right',
                                                widgets: [{id: 'analogicCompareGridTableCell5Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell6',
                                                type: GridTableCellWidget,
                                                title: 'Input',
                                                width: 120,
                                                alignment: 'center-right',
                                                widgets: [{id: 'analogicCompareGridTableCell6Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell7',
                                                type: GridTableCellWidget,
                                                title: 'Delta',
                                                width: 120,
                                                alignment: 'center-right',
                                                widgets: [{id: 'analogicCompareGridTableCell7Text', type: TextWidget, titleFontSize: 12}]
                                            },
                                            {
                                                id: 'analogicCompareGridTableCell8',
                                                type: GridTableCellWidget,
                                                title: 'Correction',
                                                width: 120,
                                                alignment: 'center-right',
                                                widgets: [{id: 'analogicCompareGridTableCell8Text', type: TextWidget, titleFontSize: 12}]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
};