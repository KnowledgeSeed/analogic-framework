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
                                    width: '58%',
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
                                    marginTop: '2.5%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            label: 'David Modos',
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
                                            icon: 'icon-reports',
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
                                            icon: 'icon-main-settings',
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
                                                            skin: '',
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
                            id: 'rocheBPSPMainGridRow4',
                            type: GridRowWidget,
                            marginTop: '0.5%',
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
                                            title: 'Product',
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
                                            title: 'Report',
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
                                            title: 'Settings',
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
                                    width: '48%',
                                    widgets: []
                                }
                                ,

                                {
                                    id: 'rocheBPSPMainGridRow5Cell2',
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
                                                            skin: '',
                                                            title: '',
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                }]
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
                                    width: '47%',
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
                                    marginTop: '2.5%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPCustomersGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            label: 'David Modos',
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
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
                                            backdrop: true
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
                                            id: 'rocheBPSPProductsGridRow1Cell5SegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '100%',
                                            skin: 'segmented',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsGridRow1Cell5SegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    label: '2021',
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: '2021'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsGridRow1Cell5SegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    label: '2022',
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: '2022'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsGridRow1Cell5SegmentedControlItem3',
                                                    type: SegmentedControlItemWidget,
                                                    label: '2023',
                                                    action: 'segmentedControlTab3',
                                                    selected: false,
                                                    value: '2023'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsGridRow1Cell5SegmentedControlItem4',
                                                    type: SegmentedControlItemWidget,
                                                    label: '2024',
                                                    action: 'segmentedControlTab4',
                                                    selected: false,
                                                    value: '2024'
                                                }
                                            ]
                                        }]
                                },

                                {
                                    id: 'rocheBPSPProductsGridRow1Cell6',
                                    type: GridCellWidget,
                                    alignment: 'bottom-left',
                                    width: '18%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell6SegmentedControl',
                                            type: SegmentedControlWidget,
                                            width: '60%',
                                            skin: 'without_bg_bpsp',
                                            marginBottom: 5,
                                            widgets: [

                                                {
                                                    id: 'rocheBPSPProductsGridRow1Cell6SegmentedControlItem1',
                                                    type: SegmentedControlItemWidget,
                                                    label: 'Yearly',
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: 'Yearly',
                                                    skin: 'item_without_bg_bpsp'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsGridRow1Cell6SegmentedControlItem2',
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
                                            label: 'David Modos',
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }]
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
                                            width: '100%',
                                            icon: 'icon-columns',
                                            skin: 'blue_link_bpsp'
                                        }
                                    ]
                                }
                                /*   {
                                       id: 'rocheBPSPProductsGridRow2Cell1',
                                       type: GridCellWidget,
                                       alignment: 'bottom-right',
                                       width: '14%',
                                       widgets: [

                                           {
                                               id: 'rocheBPSPProductsGridRow2Cell1Button',
                                               type: ButtonWidget,
                                               label: 'Excel Template',
                                               visible: false,
                                               fontSize: 12,
                                               fontColor: '#2A66C5',
                                           }
                                       ]
                                   },
                                   {
                                       id: 'rocheBPSPProductsGridRow2Cell2',
                                       type: GridCellWidget,
                                       alignment: 'bottom-center',
                                       width: '5.5%',
                                       widgets: [

                                           {
                                               id: 'rocheBPSPProductsGridRow2Cell2Button',
                                               type: ButtonWidget,
                                               label: 'Upload Excel',
                                               fontSize: 12,
                                               visible: false,
                                               fontColor: '#2A66C5',
                                           }
                                       ]
                                   },*/
                            ]
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutPopup',
                    type: ContainerWidget,
                    anchorVisible: true,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '160',
                    bgScrollable: true,
                    fixed: false,
                    height: '200',
                    behaviour: 'popup',
                    position: 'right',
                    widgets: [
                        {
                            id: 'rocheBPSPProductsCheckoutPopupFocusButton',
                            type: ButtonWidget,
                            skin: 'deepblue_bluebg',
                            width: '130',
                            label: 'Focus'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupCheckoutButton',
                            type: ButtonWidget,
                            skin: 'deepblue_bluebg',
                            width: '130',
                            marginTop: '20',
                            label: 'Checkout'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutPopupCancelButton',
                            type: ButtonWidget,
                            skin: 'deepblue_bluebg',
                            width: '130',
                            marginTop: '20',
                            label: 'Cancel'
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsPageInit',
                    type: ShadowWidget
                },
                {
                    id: 'rocheBPSPProductsCheckoutWarning',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: true,
                    width: '300',
                    bgScrollable: true,
                    fixed: true,
                    height: '300',
                    behaviour: 'popup',
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
                            title: 'by<b>John Smith</b>since<b>2021.04.10 11:22</b>',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningMessageText',
                            type: TextWidget,
                            marginTop: 10,
                            skin: 'checkout_warning_bpsp',
                            title: 'You can checkout this section for editing after the',
                            body: 'current editor checks it in againg',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutWarningContactEditorButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            label: 'Contact Editor'
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
                    closeBtn: true,
                    width: '330',
                    bgScrollable: true,
                    fixed: true,
                    height: '500',
                    behaviour: 'popup',
                    position: 'bottom',
                    offset: -160,
                    widgets: [
                        {
                            id: 'rocheBPSPProductsColumnSelectorPopupText',
                            type: TextWidget,
                            skin: 'popup_header_bpsp',
                            title: 'Columns'
                        },
                        {
                            id: 'rocheBPSPProductsColumnSelectorPopupDropBox',
                            type: DropBoxWidget,
                            multiSelect: true,
                            skin: 'column_selector_bpsp'
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
                        {'event': 'bodyReady', 'method': 'refresh'},
                        {'event': 'choose.rocheBPSPProductsColumnSelectorPopupDropBox.finished', 'method': 'refresh'}
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsGridTableYearlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '80',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-01',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-left',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Product Code',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'PL',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            title: '2019',
                                            body: 'Actual',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            title: '2020',
                                            body: 'Actual',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            title: '2021',
                                            body: 'YTD Actuals',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            body: 'Previous Plan',
                                            skin: 'products_gd_header_bpsp',
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
                                            body: 'Customer Plan Total',
                                            skin: 'products_gd_header_bpsp',
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
                                            body: 'Marketing Adjustment',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    width: '8%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-11',
                                            type: TextWidget,
                                            body: 'Total Plan',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-13',
                                    type: GridTableHeaderCellWidget,
                                    width: '7%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-13',
                                            type: TextWidget,
                                            body: 'Final Plan',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-14',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    cellHeaderSkin: 'long_border_bpsp',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-14',
                                            type: TextWidget,
                                            title: 'Growth rate',
                                            body: '2021 Actual / 2022 Plan',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-15',
                                    type: GridTableHeaderCellWidget,
                                    width: '5%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-15',
                                            type: TextWidget,
                                            body: '2021 Plan / 2022 Plan',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-16',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-16',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyHeaderCell-17',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridTableYearlyHeaderText-17',
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
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-04',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-05',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-05',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-06',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-06',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-07',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-07',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-08',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-08',
                                    type: TextWidget,
                                    title: '',
                                    skin: 'products_gd_readonly_bpsp'
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-10',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-10',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-11',
                            type: GridTableCellWidget,
                            width: '8%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-11',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-13',
                            type: GridTableCellWidget,
                            width: '7%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-13',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-14',
                            type: GridTableCellWidget,
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-14',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-15',
                            type: GridTableCellWidget,
                            width: '5%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyText-15',
                                    type: TextWidget,
                                    skin: 'products_gd_readonly_bpsp',
                                    title: '',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-16',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyButton-16',
                                    type: ButtonWidget,
                                    icon: 'icon-comment-off',
                                    skin: 'comment_Off_GT_bpsp',
                                }
                            ]
                        },

                        {
                            id: 'rocheBPSPProductsGridTableYearlyCell-17',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '2%',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsGridTableYearlyButton-17',
                                    type: ButtonWidget,
                                    icon: 'icon-chart',
                                    skin: 'chartGT_bpsp',
                                }
                            ]
                        }]
                }]
        },

    rocheBPSPReports:
        {
            id: 'rocheBPSPReports',
            type: PageWidget,
            widgets: [

                {
                    id: 'rocheBPSPReportsGrid',
                    type: GridWidget,
                    width: '100%',
                    widgets: [

                        {
                            id: 'rocheBPSPReportsGridRow1',
                            type: GridRowWidget,
                            marginTop: '1%',
                            width: '100%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'rocheBPSPReportsGridRow1Cell0',
                                    type: GridCellWidget,
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPReportsGridRow1Cell0Button',
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
                                    id: 'rocheBPSPReportsGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '16%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPReportsGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Reports',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPReportsGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '48%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPReportsGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: '2021',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'text',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPReportsGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPReportsGridRow1Cell3Text',
                                            type: TextWidget,
                                            title: '2021',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'text',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPReportsGridRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPReportsGridRow1Cell4Text',
                                            type: TextWidget,
                                            title: '2022',
                                            body: '1000 EUR',
                                            width: '100%',
                                            skin: 'text',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPReportsGridRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '2.5%',
                                    alignment: 'top-center',
                                    width: '17%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPReportsGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            label: 'David Modos',
                                            backgroundColor: '#EBECEC',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain',
                                        }
                                    ]
                                }]
                        }]
                }]
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
                                    width: '85%',
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
                                    marginTop: '2.5%',
                                    alignment: 'top-center',
                                    width: '12%',
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
                            marginTop: '2%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'rocheBPSPSettingsGridRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-left',
                                    width: '48%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow2Cell1Text',
                                            type: TextWidget,
                                            title: 'Main Menu',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                        }
                                    ]
                                },
                            ]

                        },
                        {
                            id: 'rocheBPSPSettingsGridRow3',
                            type: GridRowWidget,
                            marginTop: '2%',
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
                                            id: 'rocheBPSPSettingsGridRow3Cell1Button',
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
                                    id: 'rocheBPSPSettingsGridRow3Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell2Button',
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
                                    id: 'rocheBPSPSettingsGridRow3Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell3Button',
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
                                    id: 'rocheBPSPSettingsGridRow3Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell4Button',
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
                                    id: 'rocheBPSPSettingsGridRow3Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell5Button',
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
                                {
                                    id: 'rocheBPSPSettingsGridRow3Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow3Cell6Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-square',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            height: '145'
                                        }
                                    ]


                                },

                            ]

                        },
                        {
                            id: 'rocheBPSPSettingsGridRow4',
                            type: GridRowWidget,
                            marginTop: '0.5%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell1Text',
                                            type: TextWidget,
                                            title: 'Product Groups',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },


                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell2Text',
                                            type: TextWidget,
                                            title: 'Territories',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell3Text',
                                            type: TextWidget,
                                            title: 'Accounts + Territories',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell4Text',
                                            type: TextWidget,
                                            title: 'Territories + Users',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell5Text',
                                            type: TextWidget,
                                            title: 'Accounts',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                        }
                                    ]


                                },
                                {
                                    id: 'rocheBPSPSettingsGridRow4Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    alignment: 'center-center',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPSettingsGridRow4Cell6Text',
                                            type: TextWidget,
                                            title: 'Material Maintenance',
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

}; 