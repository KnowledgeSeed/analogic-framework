/* global app */
'use strict';
app.widgetConfig = {
    rocheBPSPMain:
        {
            id: 'rocheBPSPMain',
            type: PageWidget,
            widgets: [
                {
                    id: 'rocheBPSPMainApplicationInit',
                    type: ShadowWidget
                },
                {
                    id: 'rocheBPSPMainApplicationInit2',
                    type: ShadowWidget,
                    listen: [
                        {'event': 'bodyReady', 'method': 'refresh'}
                    ]
                },
                {
                    id: 'rocheBPSPMainGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPMainGridRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'rocheBPSPMainGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '14%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Sales Planning',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '50%',
                                    skin: 'rightborder',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: '2021',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'textrightborder',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    skin: 'noskin',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow1Cell3Text',
                                            type: TextWidget,
                                            title: '2021',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'textrightborder',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    skin: 'rightborder',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow1Cell4Text',
                                            type: TextWidget,
                                            title: '2022',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'textnoborder',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '20%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_bpsp',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPMainGridRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMainGridRow2Cell1',
                                    type: GridCellWidget, marginLeft: '10',
                                    alignment: 'center-left',
                                    width: '48%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow2Cell1Text',
                                            type: TextWidget,
                                            title: 'Main Menu',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow2Cell2',
                                    type: GridCellWidget,
                                    visible: true,
                                    marginLeft: '0',
                                    alignment: 'center-left',
                                    width: '50%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow2Cell2Text',
                                            type: TextWidget,
                                            title: 'Message Board',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPMainGridRow3',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            height: '155',
                            widgets: [

                                {
                                    id: 'rocheBPSPMainGridRow3Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow3Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-customers',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow3Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow3Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-icon-2',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow3Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow3Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-ip-planning',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow3Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow3Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-reports',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow3CellUres',
                                    type: GridCellWidget,
                                    width: '8%',
                                    widgets: []
                                }
                                ,

                                {
                                    id: 'rocheBPSPMainGridRow3Cell5',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '50%',
                                    skin: 'messagebordgrey',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGreyGridTable',
                                            type: GridTableWidget,
                                            marginTop: '15px',
                                            marginLeft: '15px',
                                            hideIfNoData: true,
                                            skin: 'messege_board_bpsp',
                                            listen: [],
                                            title: '',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPMainGreyGridTable-Cell-01',
                                                    type: GridTableCellWidget,
                                                    width: '20%',
                                                    alignment: 'center-left',
                                                    widgets: [

                                                        {
                                                            id: 'rocheBPSPMainGreyGridTable-Cell-01-Text',
                                                            type: TextWidget,
                                                            skin: 'messageboard_text_bpsp',
                                                            title: '',
                                                        }
                                                    ]
                                                },
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPMainGridRow4',
                            type: GridRowWidget,
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMainGridRow4Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow4Cell1Text',
                                            type: TextWidget,
                                            title: 'Customers',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow4Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow4Cell2Text',
                                            type: TextWidget,
                                            title: 'Products',
                                            skin: 'menu',
                                            titleFontSize: 16,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow4Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow4Cell3Text',
                                            type: TextWidget,
                                            title: 'IP Planning',
                                            skin: 'menu',
                                            titleFontSize: 16,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMainGridRow4Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow4Cell4Text',
                                            type: TextWidget,
                                            title: 'Reports',
                                            skin: 'menu',
                                            titleFontSize: 16,
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPMainGridRow5',
                            type: GridRowWidget,
                            marginTop: '0%',
                            height: '155px',
                            widgets: [

                                {
                                    id: 'rocheBPSPMainGridRow5Cell1',
                                    type: GridCellWidget,
                                    width: '10%',
                                    marginLeft: '10',
                                    alignment: 'bottom-center',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMainGridRow5Cell1Button',
                                            type: ButtonWidget,
                                            action: '',
                                            width: '145',
                                            icon: 'icon-main-settings',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]
                                }
                                ,

                                {
                                    id: 'rocheBPSPMainGridRow5Cell2',
                                    type: GridCellWidget,
                                    width: '38%',
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    widgets: []
                                }
                                ,

                                {
                                    id: 'rocheBPSPMainGridRow5Cell3',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '50%',
                                    skin: 'messagebordblue',
                                    height: '100%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainBlueGridTable',
                                            type: GridTableWidget,
                                            marginTop: '15px',
                                            marginLeft: '15px',
                                            hideIfNoData: true,
                                            skin: 'messege_board_bpsp',
                                            listen: [],
                                            title: '',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPMainBlueGridTable-Cell-01',
                                                    type: GridTableCellWidget,
                                                    width: '20%',
                                                    alignment: 'center-left',
                                                    widgets: [

                                                        {
                                                            id: 'rocheBPSPMainBlueGridTable-Cell-01-Text',
                                                            type: TextWidget,
                                                            skin: 'messageboard_text_bpsp',
                                                            title: '',
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                }]
                        },
                        {
                            id: 'rocheBPSPMainGridRow6',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '5',
                            widgets: [

                                {
                                    id: 'rocheBPSPMainGridRow6Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow6Cell1Text',
                                            type: TextWidget,
                                            title: 'Settings',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]
                                },


                            ]
                        },
                    ]
                }]
        },

    rocheBPSPCustomers:
        {
            id: 'rocheBPSPCustomers',
            type: PageWidget,
            widgets: [

                {
                    id: 'rocheBPSPCustomersGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPCustomersGridRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'rocheBPSPCustomersGridRow1Cell0',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '2%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPCustomersGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '16%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Customers',
                                            width: '100%',
                                            skin: 'text',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPCustomersGridRow1CellKozepe',
                                    type: GridCellWidget,
                                    alignment: 'center-center',
                                    width: '39%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1CellKozepeText',
                                            type: TextWidget,
                                            title: '6120 Roche Deutschland',
                                            skin: 'text',
                                            titleAlignment: 'center',
                                            titleFontSize: 15,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPCustomersGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: '2021',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'textrightborder',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPCustomersGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell3Text',
                                            type: TextWidget,
                                            title: '2021',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'textrightborder',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPCustomersGridRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell4Text',
                                            type: TextWidget,
                                            title: '2022',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'textnoborder',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPCustomersGridRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '20%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_bpsp',
                                        }
                                    ]
                                }]
                        }]
                }]
        },

    rocheBPSPProducts:
        {
            id: 'rocheBPSPProducts',
            type: PageWidget,
            widgets: [

                {
                    id: 'rocheBPSPProductsGrid',
                    type: GridWidget,
                    width: '100%',
                    marginRight: 10,
                    marginLeft: 10,
                    widgets: [

                        {
                            id: 'rocheBPSPProductsGridRow1',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            skin: 'bottomborder_bpsp',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell0',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'bottom-left',
                                    width: '17%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Products',
                                            width: '100%',
                                            skin: 'text',
                                            titleAlignment: 'center',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-right',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell2DropBox',
                                            type: DropBoxWidget,
                                            width: '190',
                                            skin: 'simple_bold_bpsp',
                                            marginBottom: 5,
                                            selectFirst: true,
                                            backdrop: true
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell3DropBox',
                                            type: DropBoxWidget,
                                            width: '130',
                                            skin: 'simple_bpsp',
                                            marginBottom: 5,
                                            selectFirst: true,
                                            backdrop: true,
                                            listen: [
                                                {event: 'bodyReady', method: 'refresh'},
                                                {
                                                    event: 'choose.rocheBPSPProductsGridRow1Cell2DropBox.finished',
                                                    method: 'refresh'
                                                }
                                            ]
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell4',
                                    type: GridCellWidget,
                                    alignment: 'center-left',
                                    width: '2%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '12',
                                            icon: 'icon-info',
                                            skin: '',
                                            height: '12',
                                            marginBottom: 2,

                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell5',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '21%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsYearSegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Y0'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Y1'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem3',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab3',
                                                    selected: false,
                                                    value: 'Y2'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem4',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab4',
                                                    selected: false,
                                                    value: 'Y3'
                                                }
                                            ]
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell6',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '18%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsPeriodUnitSegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '60%',
                                            skin: 'without_bg_bpsp',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsPeriodUnitSegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    label: 'Yearly',
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Yearly',
                                                    skin: 'item_without_bg_bpsp'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsPeriodUnitSegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    label: 'Monthly',
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Monthly'
                                                }
                                            ]
                                        }]
                                },
                                {
                                    id: 'rocheBPSPProductsGridRow1Cell9',
                                    type: GridCellWidget,
                                    alignment: 'center-right',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell9Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsGridRow2',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsGridRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-right',
                                    width: '98%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: 'Columns',
                                            width: '100',
                                            height: '40',
                                            icon: 'icon-columns',
                                            skin: 'blue_link_columns_bpsp'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    skin: 'checkout_popup_bpsp',
                    width: '220',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: false,
                    height: '165',
                    behaviour: 'popup',
                    position: 'right',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutPopupCheckoutButton',
                            type: ButtonWidget,
                            skin: 'yellow_bg_bpsp',
                            label: 'Check Out',
                            icon: 'icon-lock'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupFocusButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            marginTop: '10',
                            label: 'Focus'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupCancelButton',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            marginTop: '10',
                            label: 'Cancel'
                        }
                    ]
                },

                {
                    id: 'rocheBPSPProductsNoCheckoutPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    skin: 'checkout_popup_bpsp',
                    width: '220',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: false,
                    height: '240',
                    behaviour: 'popup',
                    position: 'right',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutPopupNoCheckoutButton',
                            type: ButtonWidget,
                            skin: 'grey_bg_bpsp',
                            label: 'Check Out',
                            icon: 'icon-lock'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupNoCheckoutWarningText1',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'Cannot be Checked Out',
                            titleAlignment: 'center',
                            marginTop: 10,
                            paddingBottom: 1,
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupNoCheckoutWarningText2',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'a subsection is being edited',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupNoCheckoutWarningText3',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'at least one child',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsNoCheckoutPopupFocusButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            marginTop: '10',
                            label: 'Focus on this Block'
                        },
                        {
                            id: 'rocheBPSPProductsNoCheckoutPopupCancelButton',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            marginTop: '10',
                            label: 'Cancel'
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsPageInit',
                    type: ShadowWidget,
                    listen: [
                        {event: 'bodyReady', method: 'refresh'},
                        {event: 'choose.rocheBPSPProductsGridRow1Cell2DropBox.finished', method: 'refresh'}
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutWarning',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '260',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: true,
                    height: '270',
                    behaviour: 'popup',
                    skin: 'popup_bpsp ',
                    position: 'center',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutWarningLockIcon',
                            type: ImageWidget,
                            skin: 'warning_bpsp',
                            icon: 'lock'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningText',
                            type: TextWidget,
                            skin: 'checkout_warning_bpsp',
                            title: 'This section is being edited',
                            titleAlignment: 'center'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningByUserText',
                            type: TextWidget,
                            marginTop: 10,
                            skin: 'checkout_warning_bpsp',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningMessageText',
                            type: TextWidget,
                            marginTop: 10,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'You can checkout this section for editing after the',
                            body: 'current editor checks it in again',
                            titleAlignment: 'center',
                            titleFontSize: 10,
                            bodyAlignment: 'center',
                            bodyFontSize: 10,
                            marginBottom: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningContactEditorButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            label: 'Contact Editor',
                            url: 'https://hangouts.google.com/chat/person/109335557829914353504',
                            marginBottom: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningCancel',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            label: 'Cancel'
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsColumnSelectorPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '330',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    position: 'bottom',
                    skin: 'popup_bpsp ',
                    fadingSpeed: 0,
                    offset: -160,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsColumnSelectorPopupGrid',
                            type: GridWidget,
                            width: 320,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsColumnSelectorPopupGridRow1',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_columnselector_bpsp',
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsColumnSelectorPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '46%',
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsColumnSelectorPopupText',
                                                    type: TextWidget,
                                                    paddingLeft: 10,
                                                    skin: 'popup_header_bpsp',
                                                    title: 'Columns'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsColumnSelectorPopupGridRow1Cell2',
                                            type: GridCellWidget,
                                            width: '18%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsColumnSelectorRestoreButton',
                                                    type: ButtonWidget,
                                                    label: 'Restore',
                                                    icon: 'icon-arrow-return',
                                                    skin: 'red_link_bpsp'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsColumnSelectorPopupGridRow1Cell3',
                                            type: GridCellWidget,
                                            width: '18%',
                                            alignment: 'center-center',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsColumnSelectorUpdateButton',
                                                    type: ButtonWidget,
                                                    label: 'Update',
                                                    icon: 'icon-icon-accept',
                                                    skin: 'green_link_bpsp',
                                                    borderWidth: 0,
                                                    marginLeft: 20
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsColumnSelectorPopupGridRow1Cell4',
                                            type: GridCellWidget,
                                            width: '18%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsColumnSelectorCancelButton',
                                                    type: ButtonWidget,
                                                    icon: 'icon-x',
                                                    marginRight: 10,
                                                    borderWidth: 0,
                                                    skin: 'blue_icon_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsColumnSelectorPopupGridRow2',
                                    type: GridRowWidget,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsColumnSelectorPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '100%',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsColumnSelectorPopupDropBox',
                                                    type: DropBoxWidget,
                                                    multiSelect: true,
                                                    skin: 'column_selector_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },


                    ]
                },
                {
                    id: 'rocheBPSPProductsInfoPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '260',
                    height: 170,
                    bgScrollable: true,
                    fixed: true,
                    behaviour: 'popup',
                    position: 'bottom',
                    skin: 'popup_bpsp ',
                    fadingSpeed: 0,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsInfoPopupPopupGrid',
                            type: GridWidget,
                            width: 260,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsInfoPopupPopupGridRow1',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_columnselector_bpsp',
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsInfoPopupPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '50%',
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsInfoPopupPopupText',
                                                    type: TextWidget,
                                                    paddingLeft: 20,
                                                    skin: 'popup_header_bpsp',
                                                    title: 'Info'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsInfoPopupPopupGridRow1Cell4',
                                            type: GridCellWidget,
                                            width: '50%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsInfoPopupCancelButton',
                                                    type: ButtonWidget,
                                                    icon: 'icon-x',
                                                    marginRight: 20,
                                                    borderWidth: 0,
                                                    skin: 'blue_icon_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsInfoPopupText1',
                            marginTop: 20,
                            type: TextWidget,
                            marginLeft: 20,
                            titleFontSize: 16
                        },
                        {
                            id: 'rocheBPSPProductsInfoPopupText2',
                            type: TextWidget,
                            marginTop: 20,
                            marginLeft: 20,
                            titleFontSize: 16
                        }

                    ]
                },
                {
                    id: 'rocheBPSPProductsProductSelectorShortcutPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '320',
                    heightFixed: false,
                    bgScrollable: true,
                    fixed: false,
                    behaviour: 'popup',
                    position: 'bottom',
                    offset: 100,
                    skin: 'popup_bpsp ',
                    fadingSpeed: 0,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable',
                            type: GridTableWidget,
                            title: '',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 5,
                            listen: [],
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsProductSelectorShortcutPopupGridTableRow',
                                    type: GridTableHeaderRowWidget,
                                    height: '80',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsProductSelectorShortcutPopupGridTableRowCell1',
                                            type: GridTableHeaderCellWidget,
                                            width: '20%',
                                            alignment: 'bottom-left',
                                            widgets: []
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable01',
                                    type: GridTableCellWidget,
                                    width: '100%',
                                    alignment: 'center-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsProductSelectorShortcutPopupGridTableButton01',
                                            type: ButtonWidget,
                                            height: 40,
                                            skin: 'gridtablehierarchy_bpsp',
                                            borderWidth: 0,
                                            label: '',
                                            action: '',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsGridTableYearly',
                    type: GridTableWidget,
                    marginTop: '60',
                    hideIfNoData: true,
                    skin: 'products_bpsp',
                    listen: [
                        {
                            'event': 'bodyReady',
                            'method': 'refreshWithWaitingForEvent',
                            'parameters': ['init.rocheBPSPProductsGridRow1Cell3DropBox.finished']
                        },
                        {'event': 'choose.rocheBPSPProductsGridRow1Cell3DropBox.finished', 'method': 'refresh'},
                        {
                            'event': 'choose.rocheBPSPProductsGridRow1Cell2DropBox.finished',
                            'method': 'refreshWithWaitingForEvent',
                            'parameters': ['rendered.rocheBPSPProductsGridRow1Cell3DropBox']
                        },
                        {'event': 'launch.rocheBPSPProductsCheckoutPopupFocusButton.finished', 'method': 'refresh'},
                        {'event': 'launch.rocheBPSPProductsNoCheckoutPopupFocusButton.finished', 'method': 'refresh'},
                        {
                            'event': 'launch.rocheBPSPProductsGridTableYearlyHeaderReturnFromFocus.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'launch.rocheBPSPProductsProductSelectorShortcutPopupGridTableButton01.finished',
                            'method': 'refresh'
                        },
                        {'event': 'switch.rocheBPSPProductsYearSegmentedControl.finished', 'method': 'refresh'},
                        {'event': 'launch.rocheBPSPProductsColumnSelectorUpdateButton.finished', 'method': 'refresh'},
                        {'event': 'launch.rocheBPSPProductsColumnSelectorRestoreButton.finished', 'method': 'refresh'},
                        {
                            'event': 'launch.rocheBPSPProductsCommentEditControlPanelSaveButton.finished',
                            'method': 'refresh'
                        }
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsGridTableYearlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderFocusButton',
                                            type: ButtonWidget,
                                            label: 'Focus on Block',
                                            skin: 'blue_link_icon_right_bpsp',
                                            icon: 'icon-arrow-right',
                                            iconPosition: 'right',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        },
                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderReturnFromFocus',
                                            type: ButtonWidget,
                                            label: 'Return from Focus',
                                            visible: false,
                                            skin: 'blue_link_bpsp',
                                            icon: 'icon-arrow-left',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Product Code',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'PL',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-04',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-04',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-05',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-05',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-06',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-06',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-07',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-07',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-08',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-08',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-09',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-09',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-10',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-10',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    width: '7%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-11',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-12',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-12',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-13',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-13',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-14',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-14',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-15',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    cellHeaderSkin: 'no_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-15',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-01',
                            type: GridTableCellWidget,
                            width: '20%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyButton-01',
                                    type: ButtonWidget,
                                    icon: 'icon-badge',
                                    skin: 'gridtablehierarchy_bpsp',
                                    label: '',
                                    action: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-02',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-02',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-03',
                            type: GridTableCellWidget,
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-03',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-04',
                            type: GridTableCellWidget,
                            width: '8%',
                            alignment: 'center-right',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-04',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-05',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-05',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-06',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-06',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-07',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-07',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-08',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-08',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                    skin: 'products_gd_readonly_bpsp'
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-09',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-09',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-10',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-10',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-11',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '7%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-11',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-12',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-12',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-13',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-13',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-14',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyButton-14',
                                    type: ButtonWidget,
                                    icon: 'icon-comment-off',
                                    skin: 'comment_Off_GT_bpsp',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-15',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyButton-15',
                                    type: ButtonWidget,
                                    icon: 'icon-chart',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        }]
                },

                {
                    id: 'rocheBPSPProductsCommentShow',
                    type: ContainerWidget,
                    visible: false,
                    width: '400',
                    closeBtn: false,
                    height: '100%',
                    behaviour: 'popup',
                    position: 'right',
                    bgColor: '#fff',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCommentShowGrid',
                            type: GridWidget,
                            marginLeft: '10',
                            marginRight: '10',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCommentShowGridRow1',
                                    type: GridRowWidget,
                                    marginBottom: '20',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCommentShowGridRow1Title',
                                            type: ButtonWidget,
                                            label: 'Comment Show',
                                            icon: 'icon-comment-off',
                                            marginTop: '15',
                                            marginBottom: '10',
                                            fontBold: true,
                                            fontSize: 24,
                                            skin: 'commenttitle',
                                        },
                                        {
                                            id: 'rocheBPSPProductsCommentShowGridXButton',
                                            type: ButtonWidget,
                                            icon: 'icon-x',
                                            iconFontSize: '15',
                                            marginTop: '19',
                                            marginLeft: '120',
                                            borderWidth: 0,
                                            skin: 'blue_icon_bpsp'
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCommentShowGridRow2',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentShowGridRow2Cell',
                                            type: GridCellWidget,
                                            alignment: 'top-left',
                                            width: '90%',
                                            skin: '',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCommentShowGridTable',
                                                    type: GridTableWidget,
                                                    marginTop: '12px',
                                                    marginLeft: '1px',
                                                    hideIfNoData: true,
                                                    skin: '',
                                                    listen: [],
                                                    title: '',
                                                    widgets: [
                                                        {
                                                            id: 'rocheBPSPProductsCommentShowGridTable-Cell-01',
                                                            type: GridTableCellWidget,
                                                            width: '20%',
                                                            alignment: 'center-left',
                                                            widgets: [

                                                                {
                                                                    id: 'rocheBPSPProductsCommentShowGridTable-Cell-01-Text',
                                                                    type: TextWidget,
                                                                    skin: '',
                                                                    title: '',
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCommentShowGridRow3',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentShowGridRow3Button',
                                            type: ButtonWidget,
                                            label: 'Source:',
                                            action: '',
                                            marginTop: '30',
                                            fontBold: true,
                                            fontSize: 16,
                                            skin: '',
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCommentShowGridRow4',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentShowGridRow4Cell',
                                            type: GridCellWidget,
                                            alignment: 'top-left',
                                            width: '90%',
                                            skin: '',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCommentShowGridTableSource',
                                                    type: GridTableWidget,
                                                    marginLeft: '1px',
                                                    hideIfNoData: true,
                                                    skin: '',
                                                    listen: [],
                                                    title: '',
                                                    widgets: [
                                                        {
                                                            id: 'rocheBPSPProductsCommentShowGridTableSource-Cell-01',
                                                            type: GridTableCellWidget,
                                                            width: '20%',
                                                            alignment: 'center-left',
                                                            widgets: [

                                                                {
                                                                    id: 'rocheBPSPProductsCommentShowGridTableSource-Cell-01-Text',
                                                                    type: TextWidget,
                                                                    skin: '',
                                                                    title: '',
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCommentShowGridRow5',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentShowGridRow5Button',
                                            type: ButtonWidget,
                                            label: 'Edit',
                                            action: '',
                                            width: '100',
                                            marginTop: '30',
                                            marginBottom: '20',
                                            skin: 'simtype',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },


                {
                    id: 'rocheBPSPProductsCommentEdit',
                    type: ContainerWidget,
                    visible: false,
                    width: '400',
                    closeBtn: false,
                    height: '100%',
                    behaviour: 'popup',
                    position: 'right',
                    bgColor: '#fff',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCommentEditGrid',
                            type: GridWidget,
                            marginLeft: '10',
                            marginRight: '10',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCommentEditGridRow1',
                                    type: GridRowWidget,
                                    marginBottom: '20',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentEditGridRow1Title',
                                            type: ButtonWidget,
                                            label: 'Comment Edit',
                                            icon: 'icon-comment-off',
                                            marginTop: '15',
                                            fontBold: true,
                                            fontSize: 24,
                                            skin: 'commenttitle',
                                        },
                                        {
                                            id: 'rocheBPSPProductsCommentEditGridXButton',
                                            type: ButtonWidget,
                                            icon: 'icon-x',
                                            iconFontSize: '15',
                                            marginTop: '19',
                                            marginLeft: '120',
                                            borderWidth: 0,
                                            skin: 'blue_icon_bpsp'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCommentEditGridRow2',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentEditGridRow2CommentInput',
                                            type: TextAreaWidget,
                                            title: 'Comment Text',
                                            marginBottom: '30',
                                            width: '100%',
                                            skin: 'commenttext'
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCommentEditGridRow3',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCommentEditGridRow3TextInput',
                                            type: TextAreaWidget,
                                            title: 'Source Text',
                                            marginBottom: '30',
                                            width: '100%',
                                            skin: 'commentsource'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCommentEditControlPanel',
                            type: PanelWidget,
                            skin: 'horizontal_align_center',
                            marginTop: 30,
                            marginBottom: 30,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCommentEditControlPanelSaveButton',
                                    type: ButtonWidget,
                                    height: 40,
                                    width: 100,
                                    skin: 'blue_button_bpsp',
                                    borderWidth: 0,
                                    label: 'Save'
                                },
                                {
                                    id: 'rocheBPSPProductsCommentEditControlPanelCancelButton',
                                    type: ButtonWidget,
                                    width: 100,
                                    height: 40,
                                    marginLeft: 15,
                                    skin: 'white_bg_bpsp',
                                    label: 'Cancel'
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'rocheBPSPProductsGridTableMonthly',
                    type: GridTableWidget,
                    marginTop: '60',
                    hideIfNoData: true,
                    visible: false,
                    skin: 'products_bpsp',
                    listen: [
                        {
                            'event': 'bodyReady',
                            'method': 'refreshWithWaitingForEvent',
                            'parameters': ['init.rocheBPSPProductsGridRow1Cell3DropBox.finished']
                        },
                        {'event': 'choose.rocheBPSPProductsGridRow1Cell3DropBox.finished', 'method': 'refresh'},
                        {
                            'event': 'choose.rocheBPSPProductsGridRow1Cell2DropBox.finished',
                            'method': 'refreshWithWaitingForEvent',
                            'parameters': ['rendered.rocheBPSPProductsGridRow1Cell3DropBox']
                        },
                        {'event': 'launch.rocheBPSPProductsCheckoutPopupFocusButton.finished', 'method': 'refresh'},
                        {'event': 'launch.rocheBPSPProductsNoCheckoutPopupFocusButton.finished', 'method': 'refresh'},
                        {
                            'event': 'launch.rocheBPSPProductsGridTableMonthlyHeaderReturnFromFocus.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'launch.rocheBPSPProductsProductSelectorShortcutPopupGridTableButton01.finished',
                            'method': 'refresh'
                        },
                        {'event': 'switch.rocheBPSPProductsYearSegmentedControl.finished', 'method': 'refresh'},
                        {
                            'event': 'launch.rocheBPSPProductsCommentEditControlPanelSaveButton.finished',
                            'method': 'refresh'
                        }
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderFocusButton',
                                            type: ButtonWidget,
                                            label: 'Focus on Block',
                                            skin: 'blue_link_icon_right_bpsp',
                                            icon: 'icon-arrow-right',
                                            iconPosition: 'right',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        },
                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderReturnFromFocus',
                                            type: ButtonWidget,
                                            label: 'Return from Focus',
                                            visible: false,
                                            skin: 'blue_link_bpsp',
                                            icon: 'icon-arrow-left',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '7%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Product Code',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'PL',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-04',
                                    type: GridTableHeaderCellWidget,
                                    width: '7%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-04',
                                            type: TextWidget,
                                            title: '2021',
                                            body: 'Final Plan',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-05',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-05',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-06',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-06',
                                            type: TextWidget,
                                            title: '',
                                            body: '01',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-07',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-07',
                                            type: TextWidget,
                                            body: '02',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-08',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-08',
                                            type: TextWidget,
                                            body: '03',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-09',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-09',
                                            type: TextWidget,
                                            body: '04',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-10',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-10',
                                            type: TextWidget,
                                            body: '05',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-11',
                                            type: TextWidget,
                                            body: '06',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-12',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-12',
                                            type: TextWidget,
                                            title: '',
                                            body: '07',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-13',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-13',
                                            type: TextWidget,
                                            body: '08',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-14',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-14',
                                            type: TextWidget,
                                            body: '09',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-15',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-15',
                                            type: TextWidget,
                                            body: '10',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-16',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-16',
                                            type: TextWidget,
                                            body: '11',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-17',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-17',
                                            type: TextWidget,
                                            body: '12',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyHeaderCell-18',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableMonthlyHeaderText-18',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-01',
                            type: GridTableCellWidget,
                            width: '20%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyButton-01',
                                    type: ButtonWidget,
                                    icon: 'icon-badge',
                                    skin: 'gridtablehierarchy_bpsp',
                                    label: ''
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-02',
                            type: GridTableCellWidget,
                            width: '7%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-02',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-03',
                            type: GridTableCellWidget,
                            width: '2%',
                            alignment: 'center-center',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-03',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-04',
                            type: GridTableCellWidget,
                            width: '7%',
                            alignment: 'center-right',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-04',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-05',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-05',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-06',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-06',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-07',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-07',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-08',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-08',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                    skin: 'products_gd_readonly_bpsp'
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-09',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-09',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-10',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-10',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-11',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-11',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-12',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-12',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-13',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-13',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-14',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-14',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-15',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-15',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-16',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-16',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-17',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyText-17',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsGridTableMonthlyCell-18',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableMonthlyButton-18',
                                    type: ButtonWidget,
                                    icon: 'icon-comment-off',
                                    skin: 'comment_Off_GT_bpsp',
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    rocheBPSPProductsCheckout:
        {
            id: 'rocheBPSPProductsCheckout',
            type: PageWidget,
            widgets: [
                {
                    id: 'rocheBPSPProductsCheckoutInfoPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '260',
                    height: 170,
                    bgScrollable: true,
                    fixed: true,
                    behaviour: 'popup',
                    position: 'bottom',
                    skin: 'popup_bpsp ',
                    fadingSpeed: 0,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutInfoPopupPopupGrid',
                            type: GridWidget,
                            width: 260,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutInfoPopupPopupGridRow1',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_columnselector_bpsp',
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutInfoPopupPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '50%',
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutInfoPopupPopupText',
                                                    type: TextWidget,
                                                    paddingLeft: 20,
                                                    skin: 'popup_header_bpsp',
                                                    title: 'Info'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutInfoPopupPopupGridRow1Cell4',
                                            type: GridCellWidget,
                                            width: '50%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutInfoPopupCancelButton',
                                                    type: ButtonWidget,
                                                    icon: 'icon-x',
                                                    marginRight: 20,
                                                    borderWidth: 0,
                                                    skin: 'blue_icon_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutInfoPopupText1',
                            marginTop: 20,
                            type: TextWidget,
                            marginLeft: 20,
                            titleFontSize: 16
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutInfoPopupText2',
                            type: TextWidget,
                            marginTop: 20,
                            marginLeft: 20,
                            titleFontSize: 16
                        }

                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutCommentShow',
                    type: ContainerWidget,
                    visible: false,
                    width: '400',
                    closeBtn: false,
                    height: '100%',
                    behaviour: 'popup',
                    position: 'right',
                    bgColor: '#fff',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutCommentShowGrid',
                            type: GridWidget,
                            marginLeft: '10',
                            marginRight: '10',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow1',
                                    type: GridRowWidget,
                                    marginBottom: '20',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow1Title',
                                            type: ButtonWidget,
                                            label: 'Comment Show',
                                            icon: 'icon-comment-off',
                                            marginTop: '15',
                                            marginBottom: '10',
                                            fontBold: true,
                                            fontSize: 24,
                                            skin: 'commenttitle',
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridXButton',
                                            type: ButtonWidget,
                                            icon: 'icon-x',
                                            iconFontSize: '15',
                                            marginTop: '19',
                                            marginLeft: '120',
                                            borderWidth: 0,
                                            skin: 'blue_icon_bpsp'
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow2',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow2Cell',
                                            type: GridCellWidget,
                                            alignment: 'top-left',
                                            width: '90%',
                                            skin: '',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTable',
                                                    type: GridTableWidget,
                                                    marginTop: '12px',
                                                    marginLeft: '1px',
                                                    hideIfNoData: true,
                                                    skin: '',
                                                    listen: [],
                                                    title: '',
                                                    widgets: [
                                                        {
                                                            id: 'rocheBPSPProductsCheckoutCommentShowGridTable-Cell-01',
                                                            type: GridTableCellWidget,
                                                            width: '20%',
                                                            alignment: 'center-left',
                                                            widgets: [

                                                                {
                                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTable-Cell-01-Text',
                                                                    type: TextWidget,
                                                                    skin: '',
                                                                    title: '',
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow3',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow3Button',
                                            type: ButtonWidget,
                                            label: 'Source:',
                                            action: '',
                                            marginTop: '30',
                                            fontBold: true,
                                            fontSize: 16,
                                            skin: '',
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow4',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow4Cell',
                                            type: GridCellWidget,
                                            alignment: 'top-left',
                                            width: '90%',
                                            skin: '',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTableSource',
                                                    type: GridTableWidget,
                                                    marginLeft: '1px',
                                                    hideIfNoData: true,
                                                    skin: '',
                                                    listen: [],
                                                    title: '',
                                                    widgets: [
                                                        {
                                                            id: 'rocheBPSPProductsCheckoutCommentShowGridTableSource-Cell-01',
                                                            type: GridTableCellWidget,
                                                            width: '20%',
                                                            alignment: 'center-left',
                                                            widgets: [

                                                                {
                                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTableSource-Cell-01-Text',
                                                                    type: TextWidget,
                                                                    skin: '',
                                                                    title: '',
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow5',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow5Button',
                                            type: ButtonWidget,
                                            label: 'Edit',
                                            action: '',
                                            width: '100',
                                            marginTop: '30',
                                            marginBottom: '20',
                                            skin: 'simtype',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },


                {
                    id: 'rocheBPSPProductsCheckoutCommentEdit',
                    type: ContainerWidget,
                    visible: false,
                    width: '400',
                    closeBtn: false,
                    height: '100%',
                    behaviour: 'popup',
                    position: 'right',
                    bgColor: '#fff',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutCommentEditGrid',
                            type: GridWidget,
                            marginLeft: '10',
                            marginRight: '10',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow1',
                                    type: GridRowWidget,
                                    marginBottom: '20',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow1Title',
                                            type: ButtonWidget,
                                            label: 'Comment Edit',
                                            icon: 'icon-comment-off',
                                            marginTop: '15',
                                            fontBold: true,
                                            fontSize: 24,
                                            skin: 'commenttitle',
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridXButton',
                                            type: ButtonWidget,
                                            icon: 'icon-x',
                                            iconFontSize: '15',
                                            marginTop: '19',
                                            marginLeft: '120',
                                            borderWidth: 0,
                                            skin: 'blue_icon_bpsp'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow2',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput',
                                            type: TextAreaWidget,
                                            title: 'Comment Text',
                                            marginBottom: '30',
                                            width: '100%',
                                            skin: 'commenttext'
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow3',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow3TextInput',
                                            type: TextAreaWidget,
                                            title: 'Source Text',
                                            marginBottom: '30',
                                            width: '100%',
                                            skin: 'commentsource'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCommentEditControlPanel',
                            type: PanelWidget,
                            skin: 'horizontal_align_center',
                            marginTop: 30,
                            marginBottom: 30,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton',
                                    type: ButtonWidget,
                                    height: 40,
                                    width: 100,
                                    skin: 'blue_button_bpsp',
                                    borderWidth: 0,
                                    label: 'Save'
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditControlPanelCancelButton',
                                    type: ButtonWidget,
                                    width: 100,
                                    height: 40,
                                    marginLeft: 15,
                                    skin: 'white_bg_bpsp',
                                    label: 'Cancel'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutGrid',
                    type: GridWidget,
                    width: '100%',
                    marginRight: 10,
                    marginLeft: 10,
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutGridRow1',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            skin: 'bottomborder_bpsp',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell0',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-lock',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50',
                                            iconColor: '#ED8B00',
                                            paddingTop: 5,
                                            borderWidth: false
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'bottom-left',
                                    width: '17%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Checked Out',
                                            width: '100%',
                                            skin: 'checkout_page_header_bpsp',
                                            titleAlignment: 'center'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'center-right',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell2CompanyText',
                                            type: TextWidget,
                                            width: '190',
                                            skin: 'simple_bold_bpsp',
                                            marginTop: 10
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'center-center',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell3ReceiverText',
                                            type: TextWidget,
                                            width: '130',
                                            skin: 'simple_bpsp',
                                            marginTop: 10
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell4',
                                    type: GridCellWidget,
                                    alignment: 'center-left',
                                    width: '2%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '12',
                                            icon: 'icon-info',
                                            skin: '',
                                            height: '12',
                                            marginBottom: 2,

                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell5',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '21%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsYearSegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Y0'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Y1'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem3',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab3',
                                                    selected: false,
                                                    value: 'Y2'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem4',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab4',
                                                    selected: false,
                                                    value: 'Y3'
                                                }
                                            ]
                                        }]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell6',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '18%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutPeriodUnitSegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '60%',
                                            skin: 'without_bg_bpsp',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutPeriodUnitSegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    label: 'Yearly',
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Yearly',
                                                    skin: 'item_without_bg_bpsp'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsCheckoutPeriodUnitSegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    label: 'Monthly',
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Monthly'
                                                }
                                            ]
                                        }]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell9',
                                    type: GridCellWidget,
                                    alignment: 'center-right',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell9Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutGridRow2',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-right',
                                    width: '86%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: 'Columns',
                                            width: '100%',
                                            icon: 'icon-columns',
                                            skin: 'blue_link_columns_bpsp'
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow2Cell1aButton',
                                            type: ButtonWidget,
                                            label: 'Excel Template',
                                            width: '100%',
                                            icon: 'icon-doc-arrow-up',
                                            visible: false,
                                            skin: 'blue_link_columns_bpsp'
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow2Cell1bButton',
                                            type: ButtonWidget,
                                            label: 'Upload excel',
                                            visible: false,
                                            width: '100%',
                                            icon: 'icon-columns',
                                            skin: 'blue_link_columns_bpsp',
                                            marginLeft: 15
                                        }

                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow2Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '7%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow2Cell2Button',
                                            type: ButtonWidget,
                                            label: 'Clear all',
                                            width: '100%',
                                            icon: 'icon-x-square-outline',
                                            skin: 'red_link_x_bpsp'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridRow2Cell3',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '7%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow2Cell3Button',
                                            type: ButtonWidget,
                                            label: 'Check In',
                                            width: '100%',
                                            icon: 'icon-unlock',
                                            skin: 'blue_link_bpsp',
                                            fontColor: '#00965E',
                                            iconColor: '#00965E'
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },

                {
                    id: 'rocheBPSPProductsCheckoutColumnSelectorPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '330',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    position: 'bottom',
                    skin: 'popup_bpsp ',
                    fadingSpeed: 0,
                    offset: -160,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGrid',
                            type: GridWidget,
                            width: 320,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow1',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_columnselector_bpsp',
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '46%',
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutColumnSelectorPopupText',
                                                    type: TextWidget,
                                                    paddingLeft: 10,
                                                    skin: 'popup_header_bpsp',
                                                    title: 'Columns'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow1Cell2',
                                            type: GridCellWidget,
                                            width: '18%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutColumnSelectorRestoreButton',
                                                    type: ButtonWidget,
                                                    label: 'Restore',
                                                    icon: 'icon-arrow-return',
                                                    skin: 'red_link_bpsp'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow1Cell3',
                                            type: GridCellWidget,
                                            width: '18%',
                                            alignment: 'center-center',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutColumnSelectorUpdateButton',
                                                    type: ButtonWidget,
                                                    label: 'Update',
                                                    icon: 'icon-icon-accept',
                                                    skin: 'green_link_bpsp',
                                                    borderWidth: 0,
                                                    marginLeft: 20
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow1Cell4',
                                            type: GridCellWidget,
                                            width: '18%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutColumnSelectorCancelButton',
                                                    type: ButtonWidget,
                                                    icon: 'icon-x',
                                                    marginRight: 10,
                                                    borderWidth: 0,
                                                    skin: 'blue_icon_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow2',
                                    type: GridRowWidget,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '100%',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutColumnSelectorPopupDropBox',
                                                    type: DropBoxWidget,
                                                    multiSelect: true,
                                                    skin: 'column_selector_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },


                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutDistributionEditPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '900',
                    bgScrollable: true,
                    heightFixed: false,
                    fadingSpeed: 0,
                    fixed: true,
                    height: '270',
                    behaviour: 'popup',
                    skin: 'popup_bpsp ',
                    position: 'center',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupMainText',
                            type: TextWidget,
                            marginTop: 25,
                            skin: 'edit_distribution_value',
                            titleAlignment: 'center',
                            title: 'Edit Value Distribution'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupPanel',
                            type: PanelWidget,
                            skin: 'horizontal_align_center',
                            marginTop: 8,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupCopiedByText1',
                                    type: TextWidget,
                                    titleFontSize: 10,
                                    titleAlignment: 'center',
                                    title: 'Values copied by '
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupCopiedByText2',
                                    type: TextWidget,
                                    titleFontSize: 9,
                                    marginLeft: 2,
                                    titleFontWeight: 'bold',
                                    titleAlignment: 'center',
                                    title: 'John Smith,'
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupCopiedByText1',
                                    type: TextWidget,
                                    titleFontSize: 10,
                                    titleFontColor: '#B1B3B3',
                                    titleAlignment: 'center',
                                    marginLeft: 3,
                                    title: '2021.03.10. 11:30'
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTable',
                            type: GridTableWidget,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 15,
                            skin: 'edit_distribution_bpsp',
                            title: '',
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderRow',
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-01',
                                            type: GridTableHeaderCellWidget,
                                            width: '341',
                                            alignment: 'bottom-left',
                                            widgets: []
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-02',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'bottom-center',
                                            width: '40',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCellText-02',
                                                    type: TextWidget,
                                                    body: 'PL',
                                                    bodyFontSize: 15,
                                                    bodyFontColor: '#858686',
                                                    bodyFontWeight: 'bold',
                                                    titleAlignment: 'start',
                                                    marginBottom: 8,
                                                    bodyAlignment: 'start'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-03',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'bottom-center',
                                            width: '40',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCellText-03',
                                                    type: TextWidget,
                                                    body: 'Lock',
                                                    bodyFontSize: 15,
                                                    bodyFontColor: '#858686',
                                                    bodyFontWeight: 'bold',
                                                    titleAlignment: 'start',
                                                    marginBottom: 8,
                                                    bodyAlignment: 'start'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-04',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'bottom-center',
                                            width: '114',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCellText-04',
                                                    type: TextWidget,
                                                    body: 'Value',
                                                    bodyFontSize: 15,
                                                    bodyFontColor: '#858686',
                                                    bodyFontWeight: 'bold',
                                                    titleAlignment: 'start',
                                                    marginBottom: 8,
                                                    bodyAlignment: 'start'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-05',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'bottom-center',
                                            width: '114',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCellText-05',
                                                    type: TextWidget,
                                                    body: 'Percent',
                                                    bodyFontSize: 15,
                                                    bodyFontColor: '#858686',
                                                    bodyFontWeight: 'bold',
                                                    titleAlignment: 'start',
                                                    marginBottom: 8,
                                                    bodyAlignment: 'start'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-06',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'bottom-center',
                                            width: '114',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCellText-06',
                                                    type: TextWidget,
                                                    body: 'Difference',
                                                    bodyFontSize: 15,
                                                    bodyFontColor: '#858686',
                                                    bodyFontWeight: 'bold',
                                                    titleAlignment: 'start',
                                                    marginBottom: 8,
                                                    bodyAlignment: 'start'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableHeaderCell-07',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'bottom-center',
                                            width: '114',
                                            widgets: []
                                        },
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-01',
                                    type: GridTableCellWidget,
                                    width: '341',
                                    alignment: 'center-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableButton-01',
                                            type: ButtonWidget,
                                            icon: 'icon-badge',
                                            skin: 'gridtablehierarchy_bpsp',
                                            label: '',
                                            action: '',
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-02',
                                    type: GridTableCellWidget,
                                    width: '40',
                                    alignment: 'center-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellText-02',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-03',
                                    type: GridTableCellWidget,
                                    width: '40',
                                    alignment: 'center-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellToggle-03',
                                            type: ToggleWidget,
                                            skin: 'lock_unlock_bpsp',
                                            titleOn: 'o',
                                            titleOff: 'f'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-04',
                                    type: GridTableCellWidget,
                                    width: '114',
                                    alignment: 'center-right',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellText-04',
                                            type: TextWidget,
                                            titleAlignment: 'end',
                                            paddingRight: 8,
                                            title: '',
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-05',
                                    type: GridTableCellWidget,
                                    width: '114',
                                    alignment: 'center-right',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellText-05',
                                            type: TextWidget,
                                            titleAlignment: 'end',
                                            paddingRight: 8,
                                            title: '',
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-06',
                                    type: GridTableCellWidget,
                                    width: '114',
                                    alignment: 'center-right',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellText-06',
                                            type: TextWidget,
                                            titleAlignment: 'end',
                                            titleFontColor: '#00965E',
                                            paddingRight: 8,
                                            title: '',
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCell-07',
                                    type: GridTableCellWidget,
                                    width: '114',
                                    alignment: 'center-right',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellButton-07',
                                            type: ButtonWidget,
                                            paddingRight: 8,
                                            skin: 'split_down_bpsp',
                                            label: 'Split down',
                                            icon: 'icon-arrow-split-down',
                                            iconColor: '#E08F33',
                                            iconFontSize: 12,
                                            fontColor: '#E08F33',
                                            fontBold: true,
                                            fontSize: 15
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutDistributionEditPopupControlPanel',
                            type: PanelWidget,
                            skin: 'horizontal_align_center',
                            marginTop: 30,
                            marginBottom: 30,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupControlPanelSaveButton',
                                    type: ButtonWidget,
                                    height: 40,
                                    width: 100,
                                    skin: 'blue_button_bpsp',
                                    borderWidth: 0,
                                    label: 'Save'
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutDistributionEditPopupControlPanelCancelButton',
                                    type: ButtonWidget,
                                    width: 100,
                                    height: 40,
                                    marginLeft: 15,
                                    skin: 'white_bg_bpsp',
                                    label: 'Cancel'
                                }
                            ]
                        },
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutCopyMergePopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    skin: 'checkout_popup_bpsp',
                    width: '290',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: false,
                    height: '260',
                    behaviour: 'popup',
                    position: 'right',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutCopyMergePopupGrid',
                            type: GridWidget,
                            marginTop: 10,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutCopyMergePopupGridRow',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_bpsp',
                                    paddingBottom: 20,
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutCopyMergePopupCopyButton',
                                            type: ButtonWidget,
                                            height: 40,
                                            width: 120,
                                            marginLeft: 10,
                                            skin: 'blue_button_bpsp',
                                            borderWidth: 0,
                                            label: 'Copy'
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutCopyMergePopupMergeButton',
                                            type: ButtonWidget,
                                            height: 40,
                                            width: 120,
                                            marginLeft: 10,
                                            skin: 'blue_button_bpsp',
                                            borderWidth: 0,
                                            label: 'Merge',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCopyMergePopupSlider',
                            type: SliderWidget,
                            width: 270,
                            buttonsVisible: false,
                            minRange: -100,
                            maxRange: 100,
                            unit: '%'

                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCopyMergePopupCancel',
                            type: ButtonWidget,
                            width: 200,
                            skin: 'white_bg_bpsp',
                            label: 'Cancel',
                            marginLeft: 30

                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutGridTableYearly',
                    type: GridTableWidget,
                    marginTop: '60',
                    hideIfNoData: true,
                    skin: 'products_bpsp',
                    listen: [
                        {'event': 'switch.rocheBPSPProductsYearSegmentedControl.finished', 'method': 'refresh'},
                        {
                            'event': 'launch.rocheBPSPProductsCheckoutColumnSelectorUpdateButton.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'launch.rocheBPSPProductsCheckoutColumnSelectorRestoreButton.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'launch.rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton.finished',
                            'method': 'refresh'
                        }
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    alignment: 'bottom-left',
                                    widgets: []
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Product Code',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'PL',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-04',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-04',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-05',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-05',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-06',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-06',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-07',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-07',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-08',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-08',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-09',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-09',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-10',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-10',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    width: '7%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-11',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-12',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-12',
                                            type: TextWidget,
                                            title: '',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-13',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-13',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-14',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-14',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-15',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    cellHeaderSkin: 'no_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-15',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-01',
                            type: GridTableCellWidget,
                            width: '20%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyButton-01',
                                    type: ButtonWidget,
                                    icon: 'icon-badge',
                                    skin: 'gridtablehierarchy_bpsp',
                                    label: '',
                                    action: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-02',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-02',
                                    type: TextWidget,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-03',
                            type: GridTableCellWidget,
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-03',
                                    type: TextWidget,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-04',
                            type: GridTableCellWidget,
                            width: '8%',
                            alignment: 'center-right',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-04',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-05',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-05',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-06',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-06',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-07',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-07',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-08',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-08',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: ''
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-09',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-09',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-10',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-10',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-11',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '7%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-11',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-12',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-12',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-13',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyText-13',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-14',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyButton-14',
                                    type: ButtonWidget,
                                    icon: 'icon-comment-off',
                                    skin: 'comment_Off_GT_bpsp',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyCell-15',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyButton-15',
                                    type: ButtonWidget,
                                    icon: 'icon-chart',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        }]
                },

                {
                    id: 'rocheBPSPProductsCheckoutCommentShow',
                    type: ContainerWidget,
                    visible: false,
                    width: '400',
                    closeBtn: true,
                    height: '100%',
                    behaviour: 'popup',
                    position: 'right',
                    bgColor: '#ffffff',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutCommentShowGrid',
                            type: GridWidget,
                            marginLeft: '20',
                            marginRight: '20',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow1',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow1Title',
                                            type: ButtonWidget,
                                            label: 'Comment Show',
                                            action: '',
                                            icon: 'icon-comment-off',
                                            marginTop: '30',
                                            marginBottom: '10',
                                            fontBold: true,
                                            fontSize: 24,
                                            skin: 'commenttitle',
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow2',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow2Cell',
                                            type: GridCellWidget,
                                            alignment: 'top-left',
                                            width: '90%',
                                            skin: '',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTable',
                                                    type: GridTableWidget,
                                                    marginTop: '12px',
                                                    marginLeft: '1px',
                                                    hideIfNoData: true,
                                                    skin: '',
                                                    listen: [],
                                                    title: '',
                                                    widgets: [
                                                        {
                                                            id: 'rocheBPSPProductsCheckoutCommentShowGridTable-Cell-01',
                                                            type: GridTableCellWidget,
                                                            width: '20%',
                                                            alignment: 'center-left',
                                                            widgets: [

                                                                {
                                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTable-Cell-01-Text',
                                                                    type: TextWidget,
                                                                    skin: '',
                                                                    title: '',
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow3',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow3Button',
                                            type: ButtonWidget,
                                            label: 'Source:',
                                            action: '',
                                            marginTop: '30',
                                            fontBold: true,
                                            fontSize: 16,
                                            skin: '',
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow4',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow4Cell',
                                            type: GridCellWidget,
                                            alignment: 'top-left',
                                            width: '90%',
                                            skin: '',
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTableSource',
                                                    type: GridTableWidget,
                                                    marginLeft: '1px',
                                                    hideIfNoData: true,
                                                    skin: '',
                                                    listen: [],
                                                    title: '',
                                                    widgets: [
                                                        {
                                                            id: 'rocheBPSPProductsCheckoutCommentShowGridTableSource-Cell-01',
                                                            type: GridTableCellWidget,
                                                            width: '20%',
                                                            alignment: 'center-left',
                                                            widgets: [

                                                                {
                                                                    id: 'rocheBPSPProductsCheckoutCommentShowGridTableSource-Cell-01-Text',
                                                                    type: TextWidget,
                                                                    skin: '',
                                                                    title: '',
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentShowGridRow5',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentShowGridRow5Button',
                                            type: ButtonWidget,
                                            label: 'Edit',
                                            action: '',
                                            width: '100',
                                            marginTop: '30',
                                            marginBottom: '20',
                                            skin: 'simtype',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },


                {
                    id: 'rocheBPSPProductsCheckoutCommentEdit',
                    type: ContainerWidget,
                    visible: false,
                    width: '400',
                    closeBtn: true,
                    height: '100%',
                    behaviour: 'popup',
                    position: 'right',
                    bgColor: '#fff',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutCommentEditGrid',
                            type: GridWidget,
                            marginLeft: '20',
                            marginRight: '20',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow1',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow1Title',
                                            type: ButtonWidget,
                                            label: 'Comment Edit',
                                            action: '',
                                            icon: 'icon-comment-off',
                                            marginTop: '30',
                                            marginBottom: '30',
                                            fontBold: true,
                                            fontSize: 24,
                                            skin: 'commenttitle',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow2',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput',
                                            type: TextAreaWidget,
                                            title: 'Comment Text',
                                            listen: [{
                                                "method": "refresh"
                                            }],
                                            marginBottom: '30',
                                            width: '100%',
                                            skin: 'commenttext'
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow3',
                                    type: GridRowWidget,
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow3TextInput',
                                            type: TextAreaWidget,
                                            title: 'Source Text',
                                            listen: [{
                                                "method": "refresh"
                                            }],
                                            marginBottom: '30',
                                            width: '100%',
                                            skin: 'commentsource'
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPProductsCheckoutCommentEditGridRow4',
                                    type: GridRowWidget,
                                    alignment: 'left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow4Button',
                                            type: ButtonWidget,
                                            label: 'Save',
                                            action: '',
                                            width: '100',
                                            marginTop: '20',
                                            marginBottom: '20',
                                            skin: 'simtype',
                                        },

                                        {
                                            id: 'rocheBPSPProductsCheckoutCommentEditGridRow4Button',
                                            type: ButtonWidget,
                                            label: 'Cancel',
                                            action: '',
                                            width: '100',
                                            marginTop: '32',
                                            marginBottom: '20',
                                            marginLeft: '120',
                                            fontBold: 'True',
                                            fontSize: '16px',
                                            fontColor: '#0066CC',
                                            skin: '',
                                        }


                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'rocheBPSPProductsCheckoutDistributionPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    skin: 'checkout_popup_bpsp',
                    width: '230',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: false,
                    height: '100',
                    behaviour: 'popup',
                    position: 'right',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutDistributionPopupLastYearButton',
                            type: ButtonWidget,
                            height: 40,
                            icon: 'icon-distribution-variable',
                            skin: 'distribution_bpsp',
                            borderWidth: 0,
                            label: 'By Last Years Actuals',
                            iconFontSize: 15
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutDistributionPopupLinearSplitButton',
                            type: ButtonWidget,
                            height: 40,
                            icon: 'icon-distribution-equal',
                            skin: 'distribution_bpsp',
                            borderWidth: 0,
                            label: 'Linear Split',
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutUploadPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '260',
                    height: 190,
                    bgScrollable: true,
                    fixed: true,
                    behaviour: 'popup',
                    position: 'bottom',
                    skin: 'popup_bpsp ',
                    fadingSpeed: 0,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutUploadPopupPopupGrid',
                            type: GridWidget,
                            width: 260,
                            widgets: [
                                {
                                    id: 'rocheBPSPProductsCheckoutUploadPopupPopupGridRow1',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_columnselector_bpsp',
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPProductsCheckoutUploadPopupPopupGridRow1Cell1',
                                            type: GridCellWidget,
                                            width: '50%',
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutUploadPopupPopupText',
                                                    type: TextWidget,
                                                    paddingLeft: 20,
                                                    skin: 'popup_header_bpsp',
                                                    title: 'Upload'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'rocheBPSPProductsCheckoutUploadPopupPopupGridRow1Cell4',
                                            type: GridCellWidget,
                                            width: '50%',
                                            alignment: 'center-right',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPProductsCheckoutUploadPopupCancelButton',
                                                    type: ButtonWidget,
                                                    icon: 'icon-x',
                                                    marginRight: 20,
                                                    borderWidth: 0,
                                                    skin: 'blue_icon_bpsp'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutUploadPopupPlDropbox',
                            marginTop: 10,
                            type: DropBoxWidget,
                            skin: 'simple_bold_bpsp',
                            selectFirst: true,
                            backdrop: true
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutUploadPopupUpload',
                            type: FileUploadWidget,
                            marginTop: 20,
                            marginLeft: 70,
                            width: 100,
                            label: 'Upload',
                            fontColor: 'white',
                            skin: 'deepblue_backbutton',
                            maxFileSize: 5,
                            progressVisible: true
                        }

                    ]
                },

                {
                    id: 'rocheBPSPProductsCheckoutGridTableMonthly',
                    type: GridTableWidget,
                    marginTop: '60',
                    hideIfNoData: true,
                    visible: false,
                    skin: 'products_bpsp',
                    listen: [
                        {'event': 'switch.rocheBPSPProductsYearSegmentedControl.finished', 'method': 'refresh'},
                        {
                            'event': 'launch.rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'pastelast.rocheBPSPProductsCheckoutGridTableMonthly.finished',
                            'method': 'refreshWithTimeout',
                            'parameters': [1500]
                        },
                        {
                            'event': 'write.rocheBPSPProductsCheckoutGridTableMonthly.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'perform.rocheBPSPProductsCheckoutGridTableMonthly.finished',
                            'method': 'refresh'
                        }
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    alignment: 'bottom-left',
                                    widgets: []
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '7%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Product Code',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'PL',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-04',
                                    type: GridTableHeaderCellWidget,
                                    width: '7%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-04',
                                            type: TextWidget,
                                            title: '2021',
                                            body: 'Final Plan',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-05',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderButton-05',
                                            type: ButtonWidget,
                                            icon: 'icon-dots-horizontal',
                                            marginBottom: 8,
                                            iconFontSize: 3
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-06',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-06',
                                            type: TextWidget,
                                            title: '',
                                            body: '01',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-07',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-07',
                                            type: TextWidget,
                                            body: '02',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-08',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-08',
                                            type: TextWidget,
                                            body: '03',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-09',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-09',
                                            type: TextWidget,
                                            body: '04',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-10',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-10',
                                            type: TextWidget,
                                            body: '05',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-11',
                                            type: TextWidget,
                                            body: '06',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-12',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-12',
                                            type: TextWidget,
                                            title: '',
                                            body: '07',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-13',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-13',
                                            type: TextWidget,
                                            body: '08',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-14',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-14',
                                            type: TextWidget,
                                            body: '09',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-15',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-15',
                                            type: TextWidget,
                                            body: '10',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-16',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-16',
                                            type: TextWidget,
                                            body: '11',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-17',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-17',
                                            type: TextWidget,
                                            body: '12',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderCell-18',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-18',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-01',
                            type: GridTableCellWidget,
                            width: '20%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyButton-01',
                                    type: ButtonWidget,
                                    icon: 'icon-badge',
                                    skin: 'gridtablehierarchy_bpsp',
                                    label: ''
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-02',
                            type: GridTableCellWidget,
                            width: '7%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-02',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-03',
                            type: GridTableCellWidget,
                            width: '2%',
                            alignment: 'center-center',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-03',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-04',
                            type: GridTableCellWidget,
                            width: '7%',
                            alignment: 'center-right',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-04',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-05',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-05',
                                    type: TextWidget,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-06',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-06',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-07',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-07',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-08',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-08',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    title: ''
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-09',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-09',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-10',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-10',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-11',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-11',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-12',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-12',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-13',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-13',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-14',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-14',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-15',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-15',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-16',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-16',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-17',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyText-17',
                                    type: TextWidget,
                                    width: '100%',
                                    height: '100%',
                                    applyMeasuresToSection: true,
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutGridTableMonthlyCell-18',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableMonthlyButton-18',
                                    type: ButtonWidget,
                                    icon: 'icon-comment-off',
                                    skin: 'comment_Off_GT_bpsp',
                                }
                            ]
                        }
                    ]
                }
            ]
        },

    rocheBPSPipPlanning:
        {
            id: 'rocheBPSPipPlanning',
            type: PageWidget,
            widgets: [

                {
                    id: 'rocheBPSPipPlanningGrid',
                    type: GridWidget,
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPipPlanningGridRow1',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            skin: 'bottomborder_bpsp',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell0',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'bottom-left',
                                    width: '17%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'IP Planning',
                                            width: '100%',
                                            skin: 'text',
                                            titleAlignment: 'center',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-right',
                                    width: '11%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPipPlanningGridRow1Cell2DropBox',
                                            type: DropBoxWidget,
                                            width: '190',
                                            skin: 'simple_bold_bpsp',
                                            marginBottom: 5,
                                            selectFirst: true,
                                            backdrop: true
                                        }

                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPipPlanningGridRow1Cell3DropBox',
                                            type: DropBoxWidget,
                                            width: '130',
                                            skin: 'simple_bpsp',
                                            marginBottom: 5,
                                            selectFirst: true,
                                            backdrop: true,
                                            listen: [
                                                {event: 'bodyReady', method: 'refresh'},
                                                {
                                                    event: 'choose.rocheBPSPipPlanningGridRow1Cell2DropBox.finished',
                                                    method: 'refresh'
                                                }
                                            ]
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell4',
                                    type: GridCellWidget,
                                    alignment: 'center-left',
                                    width: '2%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridRow1Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '12',
                                            icon: 'icon-info',
                                            skin: '',
                                            height: '12',
                                            marginBottom: 2,

                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell5',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '21%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsYearSegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Y0'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Y1'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem3',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab3',
                                                    selected: false,
                                                    value: 'Y2'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem4',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab4',
                                                    selected: false,
                                                    value: 'Y3'
                                                }
                                            ]
                                        }
                                    ]

                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell6',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '18%',
                                    widgets: []
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridRow1Cell9',
                                    type: GridCellWidget,
                                    alignment: 'center-right',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPipPlanningGridRow1Cell9Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }
                            ]
                        },


                        {
                            id: 'rocheBPSPipPlanningGridRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            skin: '',
                            widgets: [


                                {
                                    id: 'rocheBPSPipPlanningGridRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '20px',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '16%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridRow2Cell1SegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Cash Sales'
                                                },
                                                {
                                                    id: 'rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Lease'
                                                },
                                                {
                                                    id: 'rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem3',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab3',
                                                    selected: false,
                                                    value: 'Return'
                                                },
                                            ]

                                        },


                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '20px',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridRow2Cell2SegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPipPlanningGridRow2Cell2SegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'ImportList'
                                                },
                                                {
                                                    id: 'rocheBPSPipPlanningGridRow2Cell2SegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Search'
                                                }
                                            ]

                                        },
                                    ]
                                },


                            ]
                        },


                    ]
                },

                {
                    id: 'rocheBPSPipPlanningGridTableMonthly',
                    type: GridTableWidget,
                    marginTop: '30',
                    width: '100%',
                    hideIfNoData: true,
                    skin: 'products_bpsp',
                    listen: [
                        {'event': 'switch.rocheBPSPProductsYearSegmentedControl.finished', 'method': 'refresh'},
                        {
                            'event': 'switch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem1.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'switch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem2.finished',
                            'method': 'refresh'
                        },
                        {
                            'event': 'switch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem3.finished',
                            'method': 'refresh'
                        },


                        {
                            'event': 'bodyReady',
                            'method': 'refreshWithWaitingForEvent',
                            'parameters': ['init.rocheBPSPipPlanningGridRow1Cell3DropBox.finished']
                        },
                        {'event': 'choose.rocheBPSPipPlanningGridRow1Cell3DropBox.finished', 'method': 'refresh'},
                        {
                            'event': 'choose.rocheBPSPipPlanningGridRow1Cell2DropBox.finished',
                            'method': 'refreshWithWaitingForEvent',
                            'parameters': ['rendered.rocheBPSPipPlanningGridRow1Cell3DropBox']
                        },
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderFocusButton',
                                            type: ButtonWidget,
                                            label: 'Focus on Block',
                                            skin: 'blue_link_icon_right_bpsp',
                                            icon: 'icon-arrow-right',
                                            iconPosition: 'right',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        },

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderReturnFromFocus',
                                            type: ButtonWidget,
                                            label: 'Return from Focus',
                                            visible: false,
                                            skin: 'blue_link_bpsp',
                                            icon: 'icon-arrow-left',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '4%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Level',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '6%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'Profit Center Number',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-04',
                                    type: GridTableHeaderCellWidget,
                                    width: '6%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-04',
                                            type: TextWidget,
                                            title: '2020',
                                            body: 'Actual',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-05',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-05',
                                            type: TextWidget,
                                            title: '2021',
                                            body: 'T3',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-06',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-06',
                                            type: TextWidget,
                                            title: '',
                                            body: '01',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-07',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-07',
                                            type: TextWidget,
                                            body: '02',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-08',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-08',
                                            type: TextWidget,
                                            body: '03',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-09',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-09',
                                            type: TextWidget,
                                            body: '04',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-10',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-10',
                                            type: TextWidget,
                                            body: '05',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-11',
                                            type: TextWidget,
                                            body: '06',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-12',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'products_gd_header_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-12',
                                            type: TextWidget,
                                            title: '',
                                            body: '07',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-13',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-13',
                                            type: TextWidget,
                                            body: '08',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-14',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-14',
                                            type: TextWidget,
                                            body: '09',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-15',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-15',
                                            type: TextWidget,
                                            body: '10',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-16',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-16',
                                            type: TextWidget,
                                            body: '11',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-17',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-17',
                                            type: TextWidget,
                                            body: '12',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-18',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-18',
                                            type: TextWidget,
                                            body: 'Total',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-19',
                                    type: GridTableHeaderCellWidget,
                                    width: '4%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-19',
                                            type: TextWidget,
                                            title: 'Variance',
                                            body: 'YEND vs Act 2020',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },
                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-20',
                                    type: GridTableHeaderCellWidget,
                                    width: '3%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-20',
                                            type: TextWidget,
                                            body: 'YEND vs T3 2020',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-21',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-21',
                                            type: TextWidget,
                                            body: 'DIS Reives',
                                            skin: 'products_gd_header_bpsp',
                                            marginBottom: 8,
                                            marginLeft: 8,
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'

                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyHeaderCell-22',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    cellHeaderSkin: 'no_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPipPlanningGridTableMonthlyHeaderText-22',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-01',
                            type: GridTableCellWidget,
                            width: '20%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyButton-01',
                                    type: ButtonWidget,
                                    icon: 'icon-badge',
                                    skin: '',
                                    label: '',
                                    action: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-02',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-02',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-03',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '6%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-03',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    alignment: 'center-center',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-04',
                            type: GridTableCellWidget,
                            width: '6%',
                            alignment: 'center-right',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-04',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-05',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-05',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-06',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-06',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-07',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-07',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-08',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-08',
                                    type: TextWidget,
                                    paddingRight: 8,
                                    title: '',
                                    skin: 'products_gd_readonly_bpsp'
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-09',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-09',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-10',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-10',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },


                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-11',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-11',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-12',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-12',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-13',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-13',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-14',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-14',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-15',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-15',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-16',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-16',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-17',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-17',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-18',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-18',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-19',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '4%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-19',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-20',
                            type: GridTableCellWidget,
                            alignment: 'center-right',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyText-20',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 8,
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-21',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyButton-21',
                                    type: ButtonWidget,
                                    icon: 'icon-x',
                                    skin: 'comment_Off_GT_bpsp',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPipPlanningGridTableMonthlyCell-22',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPipPlanningGridTableMonthlyButton-22',
                                    type: ButtonWidget,
                                    icon: 'icon-comment-off',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        }]
                },


            ]
        },

    rocheBPSPSettings:
        {
            id: 'rocheBPSPSettings',
            type: PageWidget,
            widgets: [

                {
                    id: 'rocheBPSPSettingsGrid',
                    type: GridWidget,
                    marginRight: '10px',
                    marginLeft: '10px',
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPSettingsGridRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            alignment: 'center-right',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'rocheBPSPSettingsGridRow1Cell0',
                                    type: GridCellWidget,
                                    marginLeft: '0',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-right',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPSettingsGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '78%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Settings',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '20%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            label: 'David Modos',
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }],


                        },

                        {
                            id: 'rocheBPSPSettingsGridRow2',
                            type: GridRowWidget,
                            marginTop: '4%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPSettingsGridRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-company-settings',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow2Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-security-setup',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow2Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow2Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-material-maintenance',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },

                            ]

                        },


                        {
                            id: 'rocheBPSPSettingsGridRow3',
                            type: GridRowWidget,
                            marginTop: '0.5%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPSettingsGridRow3Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell1Text',
                                            type: TextWidget,
                                            title: 'Company Settings',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow3Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell2Text',
                                            type: TextWidget,
                                            title: 'Security Setup',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow3Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell6Text',
                                            type: TextWidget,
                                            title: 'Material Maintenance',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },

                            ]

                        },


                        {
                            id: 'rocheBPSPSettingsGridRow4',
                            type: GridRowWidget,
                            marginTop: '3%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-left',
                                    width: '48%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell1Text',
                                            type: TextWidget,
                                            title: 'Customer Planning Settings',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                        }
                                    ]
                                },
                            ]

                        },
                        {
                            id: 'rocheBPSPSettingsGridRow5',
                            type: GridRowWidget,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPSettingsGridRow5Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow5Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-product-groups',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow5Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow5Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-territories',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow5Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow5Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-accounts-territories',
                                            fontColor: 'white',
                                            skin: 'settings_bpsp',
                                            height: '145'
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow5Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow5Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-territories-users',
                                            fontColor: 'white',
                                            skin: 'settings_bpsp',
                                            height: '145'
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow5Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow5Cell5Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-accounts',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },

                            ]

                        },
                        {
                            id: 'rocheBPSPSettingsGridRow6',
                            type: GridRowWidget,
                            marginTop: '0.5%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPSettingsGridRow6Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow6Cell1Text',
                                            type: TextWidget,
                                            title: 'Product Groups',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow6Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow6Cell2Text',
                                            type: TextWidget,
                                            title: 'Territories',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow6Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow6Cell3Text',
                                            type: TextWidget,
                                            title: 'Accounts + Territories',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow6Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow6Cell4Text',
                                            type: TextWidget,
                                            title: 'Territories + Users',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },

                                {
                                    id: 'rocheBPSPSettingsGridRow6Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow6Cell5Text',
                                            type: TextWidget,
                                            title: 'Accounts',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },

                            ]

                        }
                    ]


                }]
        },


    rocheBPSPMaterial:
        {
            id: 'rocheBPSPMaterial',
            type: PageWidget,
            widgets: [

                {
                    id: 'rocheBPSPMaterialGrid',
                    type: GridWidget,
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPMaterialGridRow1',
                            type: GridRowWidget,
                            marginTop: '1%',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridRow1Cell0',
                                    type: GridCellWidget,
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '16%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Material Maintenance',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPMaterialGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-center',
                                    width: '63%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridRow1Cell2DropBox',
                                            type: DropBoxWidget,
                                            width: '190',
                                            skin: 'simple_bold_bpsp',
                                            marginBottom: 5,
                                            selectFirst: true,
                                            backdrop: true
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPMaterialGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'center-right',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMaterialGridRow1Cell3Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }


                            ]
                        },
                        {
                            id: 'rocheBPSPMaterialGridRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            widgets: [


                                {
                                    id: 'rocheBPSPMaterialGridRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '21%',
                                    marginLeft: '40px',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMaterialGridRow2Cell1SegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPMaterialGridRow2Cell1SegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'ByProductGroup'
                                                },
                                                {
                                                    id: 'rocheBPSPMaterialGridRow2Cell1SegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'ByIPNode'
                                                }
                                            ]

                                        },
                                    ]
                                },
                            ]

                        },


                        {
                            id: 'rocheBPSPMaterialGridRow3',
                            type: GridRowWidget,
                            marginTop: '1%',
                            width: '100%',
                            marginLeft: '40px',
                            widgets: [


                                {
                                    id: 'rocheBPSPMaterialGridRow3Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '21%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMaterialGridRow3Cell1SearchBox',
                                            type: TextBoxWidget,
                                            title: 'Search',
                                            width: '400',
                                            skin: 'searchbox',
                                            titleFontColor: '#747b85',
                                            textFontSize: '14',
                                        }


                                    ]
                                },
                            ]

                        },


                        {
                            id: 'rocheBPSPMaterialGridRow4',
                            type: GridRowWidget,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [


                                {
                                    id: 'rocheBPSPMaterialGridRow4Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '8%',
                                    marginLeft: '40px',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMaterialGridRow4Cell1Button',
                                            type: ButtonWidget,
                                            label: 'Add Existing',
                                            icon: 'icon-add-circle',
                                            action: '',
                                            width: '130',
                                            marginTop: '20',
                                            marginBottom: '20',
                                            skin: 'material_bpsp',
                                        },
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridRow4Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMaterialGridRow4Cell2Button',
                                            type: ButtonWidget,
                                            label: 'Add Dummy',
                                            icon: 'icon-plus-circle-outline',
                                            action: '',
                                            width: '130',
                                            marginTop: '20',
                                            marginBottom: '20',
                                            skin: 'material_bpsp',
                                        },
                                    ]
                                },
                            ]

                        },


                    ]
                },

                {
                    id: 'rocheBPSPMaterialGridTable',
                    type: GridTableWidget,
                    marginTop: '60',
                    hideIfNoData: true,
                    skin: 'products_bpsp',
                    listen: [],
                    width: '50%',
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPMaterialGridTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '27%',
                                    alignment: 'bottom-left',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMaterialGridTableHeaderFocusButton',
                                            type: ButtonWidget,
                                            label: 'Profit center name',
                                            skin: 'products_gd_header_bpsp',
                                            iconPosition: 'right',
                                            marginBottom: 8,
                                            marginLeft: 10
                                        },
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridTableHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridTableHeaderText-02',
                                            type: TextWidget,
                                            body: 'Level',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridTableHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '6.7%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridTableHeaderText-03',
                                            type: TextWidget,
                                            body: 'Profit Center Number',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridTableHeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    width: '2.3%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridTableHeaderText-04',
                                            type: TextWidget,
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridTableHeaderCell-5',
                                    type: GridTableHeaderCellWidget,
                                    width: '2.3%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'no_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridTableHeaderText-5',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPMaterialGridTableHeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    width: '2.3%',
                                    cellHeaderSkin: 'no_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMaterialGridTableHeaderText-6',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                }]
                        },

                        {
                            id: 'rocheBPSPMaterialGridTableCell-01',
                            type: GridTableCellWidget,
                            width: '27%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableButton-01',
                                    type: ButtonWidget,
                                    width: '100%',
                                    icon: 'icon-badge',
                                    skin: 'gridtablehierarchy_bpsp',
                                    label: '',
                                    action: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPMaterialGridTableCell-02',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableText-02',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPMaterialGridTableCell-03',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '6.7%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableText-03',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPMaterialGridTableCell-4',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2.3%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableButton-4',
                                    type: ButtonWidget,
                                    icon: 'icon-plus-circle-outline',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPMaterialGridTableCell-5',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2.3%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableButton-5',
                                    type: ButtonWidget,
                                    icon: 'icon-trash',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPMaterialGridTableCell-6',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2.3%',
                            widgets: [

                                {
                                    id: 'rocheBPSPMaterialGridTableButton-6',
                                    type: ButtonWidget,
                                    icon: 'icon-arrow-right1',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        }
                    ]
                },
            ]
        },


    rocheBPSPAddMaterial:
        {
            id: 'rocheBPSPAddMaterial',
            type: PageWidget,
            widgets: [
                {
                    id: 'rocheBPSPAddMaterialGrid',
                    type: GridWidget,
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPAddMaterialGridRow1',
                            type: GridRowWidget,
                            marginTop: '1%',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'rocheBPSPAddMaterialGridRow1Cell0',
                                    type: GridCellWidget,
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPAddMaterialGridRow1Cell0Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPAddMaterialGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '16%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPAddMaterialGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Add Material',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },


                                {
                                    id: 'rocheBPSPAddMaterialGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-center',
                                    width: '63%',
                                    height: '0',
                                    widgets: []
                                },


                                {
                                    id: 'rocheBPSPAddMaterialGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'center-right',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPAddMaterialGridRow1Cell3Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }


                            ]
                        },


                        {
                            id: 'rocheBPSPAddMaterialGridRow2',
                            type: GridRowWidget,
                            marginTop: '1.5%',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [


                                {
                                    id: 'rocheBPSPAddMaterialGridRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '20px',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '16%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPAddMaterialGridRow2Cell1SegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPAddMaterialGridRow2Cell1SegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'ImportList'
                                                },
                                                {
                                                    id: 'rocheBPSPAddMaterialGridRow2Cell1SegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: 'Search'
                                                }
                                            ]

                                        },
                                    ]
                                },


                            ]
                        },


                        {
                            id: 'rocheBPSPAddMaterialGridRow3',
                            type: GridRowWidget,
                            marginTop: '1.5%',
                            marginBottom: '1%',
                            width: '100%',
                            widgets: [


                                {
                                    id: 'rocheBPSPAddMaterialGridRow3Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '20px',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '8%',

                                    widgets: [

                                        {
                                            id: 'rocheBPSPAddMaterialGridRow3Cell1Button',
                                            type: ButtonWidget,
                                            action: '',
                                            width: '140',
                                            height: '40px',
                                            label: 'Import CSV',
                                            icon: 'icon-doc-arrow-down',
                                            skin: 'blue_link_columns_bpsp',
                                        }

                                    ]
                                },


                                {
                                    id: 'rocheBPSPAddMaterialGridRow3Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '15px',
                                    alignment: 'center-left',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPAddMaterialGridRow3Cell2Button',
                                            type: ButtonWidget,
                                            action: '',
                                            width: '200px',
                                            height: '40px',
                                            label: 'Paste from Clipboard',
                                            icon: 'icon-pasteboard',
                                            skin: 'blue_link_columns_bpsp',
                                        }

                                    ]
                                },


                            ]
                        },


                    ]
                }
            ]
        },

}
;