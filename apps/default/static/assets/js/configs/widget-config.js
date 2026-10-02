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
            }
};