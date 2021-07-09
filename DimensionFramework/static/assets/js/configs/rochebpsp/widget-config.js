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
                    id: 'rocheBPSPMainSubmissionToBPXPPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '270',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: true,
                    height: '250',
                    behaviour: 'popup',
                    skin: 'popup_bpsp ',
                    position: 'center',
                    widgets: [
                        {
                            id: 'rocheBPSPMainSubmissionToBPXPPopupText',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'Are you sure you want to submit',
                            marginTop: 15,
                            titleAlignment: 'center'
                        },
                        {
                            id: 'rocheBPSPMainSubmissionToBPXPPopupText2',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'Sales to BPxP?',
                            titleAlignment: 'center'
                        },
                        {
                            id: 'rocheBPSPProductReportGridRow1Cell2DropBox',
                            type: DropBoxWidget,
                            width: '100%',
                            skin: 'simple_bold_bpsp',
                            marginTop: 15,
                            selectFirst: true,
                            textAlignment: 'center',
                            backdrop: true
                        },
                        {
                            id: 'rocheBPSPMainSubmissionToBPXPPopupYes',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            label: 'Yes',
                            marginTop: 15,
                            marginBottom: 10
                        },
                        {
                            id: 'rocheBPSPMainSubmissionToBPXPPopupNo',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            label: 'No'
                        }
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
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },

                                {
                                    id: 'rocheBPSPMainGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },

                                {
                                    id: 'rocheBPSPMainGridRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '1',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
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
                                            listen: [
                                                {
                                                    event: 'init.rocheBPSPMainApplicationInit.finished',
                                                    method: 'refresh'
                                                }
                                            ],
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
                                            marginTop: '10px',
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
                                    id: 'rocheBPSPMainGridRow5Cell1a',
                                    type: GridCellWidget,
                                    width: '10%',
                                    marginLeft: '10',
                                    alignment: 'bottom-center',
                                    widgets: [
                                        {
                                            id: 'rocheBPSPMainGridRow5Cell1aSubmitToBPXP',
                                            type: ButtonWidget,
                                            action: '',
                                            width: '145',
                                            icon: 'icon-icon-accept',
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
                                    width: '28%',
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
                                    height: '100%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainBlueGridTable',
                                            type: GridTableWidget,
                                            hideIfNoData: true,
                                            skin: 'blue_message_main_bpsp',
                                            width: '100%',
                                            applyMeasuresToSection: true,
                                            marginTop: -33,
                                            listen: [],
                                            title: '',
                                            widgets: [
                                                {
                                                    id: 'rocheBPSPMainBlueGridTable-Cell-01',
                                                    type: GridTableCellWidget,
                                                    width: '100%',
                                                    alignment: 'center-left',
                                                    skin: '',
                                                    widgets: [

                                                        {
                                                            id: 'rocheBPSPMainBlueGridTable-Cell-01-Text',
                                                            type: TextWidget,
                                                            skin: 'messageboard_text_bpsp',
                                                            width: '100%',
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
                                {
                                    id: 'rocheBPSPMainGridRow6Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPMainGridRow6Cell2Text',
                                            type: TextWidget,
                                            title: 'Submission to BPxP',
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
                                    width: '13%',
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
                                    alignment: 'bottom-center',
                                    width: '12%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell2DropBox',
                                            type: DropBoxWidget,
                                            width: '120%',
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
                                    alignment: 'bottom-left',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsGridRow1Cell3DropBox',
                                            type: DropBoxWidget,
                                            width: '145%',
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
                