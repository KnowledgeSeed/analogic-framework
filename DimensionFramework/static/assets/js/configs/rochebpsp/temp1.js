/* global app */
'use strict';
app.widgetConfig = {
    rocheBPSPProductsCheckout:
        {
            id: 'rocheBPSPProductsCheckout',
            type: PageWidget,
            widgets: [

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
                                            paddingTop: 12,
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
                                    alignment: 'bottom-right',
                                    width: '11%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell2DropBox',
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
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridRow1Cell3DropBox',
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
                                                    label: '2021',
                                                    action: 'segmentedControlTab1',
                                                    selected: true,
                                                    value: '2021'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem2',
                                                    type: SegmentedControlItemWidget,
                                                    label: '2022',
                                                    action: 'segmentedControlTab2',
                                                    selected: false,
                                                    value: '2022'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem3',
                                                    type: SegmentedControlItemWidget,
                                                    label: '2023',
                                                    action: 'segmentedControlTab3',
                                                    selected: false,
                                                    value: '2023'
                                                },
                                                {
                                                    id: 'rocheBPSPProductsYearSegmentedControlItem4',
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
                                    id: 'rocheBPSPProductsCheckoutGridRow1Cell6',
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
                                }]
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
                                            icon: 'icon-columns',
                                            skin: 'blue_link_bpsp',
                                            fontColor: '#E40046',
                                            iconColor: '#E40046'
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
                    id: 'rocheBPSPProductsCheckoutCheckoutPopup',
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
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupCheckoutButton',
                            type: ButtonWidget,
                            skin: 'yellow_bg_bpsp',
                            label: 'Check Out',
                            icon: 'icon-lock'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupFocusButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            marginTop: '10',
                            label: 'Focus'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupCancelButton',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            marginTop: '10',
                            label: 'Cancel'
                        }
                    ]
                },

                {
                    id: 'rocheBPSPProductsCheckoutNoCheckoutPopup',
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
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupNoCheckoutButton',
                            type: ButtonWidget,
                            skin: 'grey_bg_bpsp',
                            label: 'Check Out',
                            icon: 'icon-lock'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupNoCheckoutWarningText1',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'Cannot be Checked Out',
                            titleAlignment: 'center',
                            marginTop: 10,
                            paddingBottom: 1,
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupNoCheckoutWarningText2',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'a subsection is being edited',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutPopupNoCheckoutWarningText3',
                            type: TextWidget,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'at least one child',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutNoCheckoutPopupFocusButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            marginTop: '10',
                            label: 'Focus on this Block'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutNoCheckoutPopupCancelButton',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            marginTop: '10',
                            label: 'Cancel'
                        }
                    ]
                },
                {
                    id: 'rocheBPSPProductsCheckoutPageInit',
                    type: ShadowWidget
                },
                {
                    id: 'rocheBPSPProductsCheckoutCheckoutWarning',
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
                            id: 'rocheBPSPProductsCheckoutCheckoutWarningLockIcon',
                            type: ImageWidget,
                            skin: 'warning_bpsp',
                            icon: 'lock'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutWarningText',
                            type: TextWidget,
                            skin: 'checkout_warning_bpsp',
                            title: 'This section is being edited',
                            titleAlignment: 'center'
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutWarningByUserText',
                            type: TextWidget,
                            marginTop: 10,
                            skin: 'checkout_warning_bpsp',
                            title: 'by<b>John Smith</b>since<b>2021.04.10 11:22</b>',
                            titleAlignment: 'center',
                            titleFontSize: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutWarningMessageText',
                            type: TextWidget,
                            marginTop: 10,
                            skin: 'checkout_warning_message_bpsp',
                            title: 'You can checkout this section for editing after the',
                            body: 'current editor checks it in againg',
                            titleAlignment: 'center',
                            titleFontSize: 10,
                            bodyAlignment: 'center',
                            bodyFontSize: 10,
                            marginBottom: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutWarningContactEditorButton',
                            type: ButtonWidget,
                            skin: 'blue_bg_bpsp',
                            label: 'Contact Editor',
                            marginBottom: 10
                        },
                        {
                            id: 'rocheBPSPProductsCheckoutCheckoutWarningCancel',
                            type: ButtonWidget,
                            skin: 'white_bg_bpsp',
                            label: 'Cancel'
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
                    closeBtn: true,
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
                            id: 'rocheBPSPProductsCheckoutColumnSelectorPopupText',
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
                    id: 'rocheBPSPProductsCheckoutGridTableYearly',
                    type: GridTableWidget,
                    marginTop: '60',
                    hideIfNoData: true,
                    skin: 'products_bpsp',
                    listen: [
                        {'event': 'bodyReady', 'method': 'refresh'}
                    ],
                    title: '',
                    widgets: [

                        {
                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '80',
                            widgets: [

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '20%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-01',
                                            type: TextWidget,
                                            title: '',
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-left',
                                    width: '8%',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-02',
                                            type: TextWidget,
                                            body: 'Product Code',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-03',
                                            type: TextWidget,
                                            body: 'PL',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            title: '2019',
                                            body: 'Actual',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            title: '2020',
                                            body: 'Actual',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            title: '2021',
                                            body: 'YTD Actuals',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            body: 'Previous Plan',
                                            skin: 'products_gd_header_bpsp',
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
                                            body: 'Customer Plan Total',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
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
                                            body: 'Marketing Adjustment',
                                            skin: 'products_gd_header_bpsp',
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
                                            body: 'Total Plan',
                                            skin: 'products_gd_header_bpsp',
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
                                            body: 'Final Plan',
                                            skin: 'products_gd_header_bpsp',
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
                                            title: 'Growth rate',
                                            body: '2021 Actual / 2022 Plan',
                                            skin: 'products_gd_header_bpsp',
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
                                            body: '2021 Plan / 2022 Plan',
                                            skin: 'products_gd_header_bpsp',
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
                                    skin: 'products_gd_readonly_bpsp',
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
                                    skin: 'products_gd_readonly_bpsp',
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
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
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
                                    paddingRight: 5,
                                    skin: 'products_gd_readonly_bpsp',
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
                                    paddingRight: 5,
                                    skin: 'products_gd_readonly_bpsp',
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
                                    paddingRight: 5,
                                    skin: 'products_gd_readonly_bpsp',
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
                                    paddingRight: 5,
                                    title: '',
                                    skin: 'products_gd_readonly_bpsp'
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
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
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
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
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
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
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
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
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
                                    skin: 'products_gd_readonly_bpsp',
                                    paddingRight: 5,
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
                }]
        },
};