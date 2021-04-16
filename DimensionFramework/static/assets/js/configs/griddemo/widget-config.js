/* global app */

'use strict'
app.widgetConfig = {
    gridTestPage:
        {
            id: 'gridTestPage',
            type: PageWidget,
            widgets: [
                {
                    id: 'salesModelPageTitle',
                    type: TextWidget,
                    marginLeft: 180,
                    marginBottom: 10,
                    marginTop: 30,
                    title: 'Sales Model',
                    skin: 'template6'
                },
                {
                        id: 'tempPopupForGridTable',
                        type: ContainerWidget,
                        anchorVisible: true,
                        anchorOnClick: true,
                        backdrop: false,
                        visible: false,
                        closeBtn: true,
                        width: '160',
                        bgScrollable: true,
                        fixed: false,
                        height: '130',
                        behaviour: 'popup',
                        position: 'right',
                        widgets: [
                            {
                                id: 'paste',
                                type: ButtonWidget,
                                skin: 'analogicpopup',
                                width: 130,
                                label: 'Paste'
                            }
                        ]
                },
                {
                    type: GridWidget,
                    marginLeft: 180,
                    marginBottom: 20,
                    widgets: [
                        {
                            type: GridRowWidget,
                            widgets: [
                                {
                                    type: GridCellWidget,
                                    widgets: [
                                        {
                                            id: 'extendSwitch',
                                            type: ToggleWidget,
                                            titleOn: 'Extend +3 years',
                                            titleOff: 'Extend +3 years'
                                        }
                                    ]
                                },
                                {
                                    type: GridCellWidget,
                                    widgets: [
                                        {
                                            id: 'resetAllNominals',
                                            type: ButtonWidget,
                                            label: 'Reset all nominals',
                                            marginLeft: 30,
                                            skin: 'template5'
                                        }
                                    ]
                                },
                                {
                                    type: GridCellWidget,
                                    widgets: [
                                        {
                                            id: 'gridOuterText',
                                            type: TextWidget,
                                            marginLeft: 80,
                                            listen: [
                                                {
                                                    event: 'choose.choose.grid_0_4.finished',
                                                    method: 'refresh'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: GridRowWidget,
                            alignment: 'right',
                            marginTop: -50,
                            widgets: [
                                {
                                    type: GridCellWidget,
                                    widgets: [
                                        {
                                            id: 'resetAllFactors',
                                            type: ButtonWidget,
                                            label: 'Reset all factors',
                                            marginRight: 170,
                                            skin: 'template5'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'grid',
                    type: GridTableWidget,
                    title: '',
                    marginLeft: 150,
                    marginRight: 150,
                    rowHeight: 50,
                    widgets: [
                        {
                            id: 'gridHeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 25,
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'EMEA'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Premium Base'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 300,
                                    alignment: 'bottom-space-between',
                                    borderRight: false,
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Premium Decrease'
                                        },
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Premium Increase'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    borderRight: false,
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 50,
                                    widgets: [
                                        {
                                            id: 'resetNominals',
                                            type: ButtonWidget,
                                            label: 'Reset Nominals',
                                            skin: 'template6'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Premium 2020'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Premium 2021'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Premium 2022'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Loss Ratio % Base'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 300,
                                    alignment: 'bottom-space-between',
                                    borderRight: false,
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Decrease'
                                        },
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Increase'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 30,
                                    borderRight: false,
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 60,
                                    widgets: [
                                        {
                                            id: 'resetLossRatio',
                                            type: ButtonWidget,
                                            label: 'Reset Loss Ratio',
                                            skin: 'template6'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Loss Ratio 2020'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Loss Ratio 2021'
                                        }
                                    ]
                                },
                                {
                                    type: GridTableHeaderCellWidget,
                                    width: 20,
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            type: TextWidget,
                                            skin: 'template8',
                                            title: 'Loss Ratio 2022'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            height: 60,
                            width: 25,
                            alignment: 'center-left',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template7'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    depends: [{col: 2, action: 'slide'}],
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 300,
                            borderRight: false,
                            widgets: [
                                {
                                    id: 'slider',
                                    type: SliderWidget,
                                    title: 'Slider'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            borderRight: false,
                            widgets: [
                                {
                                    type: ToggleWidget,
                                    titleOn: 'Flow Business',
                                    titleOff: 'Flow Business'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 50,
                            widgets: [
                                {
                                    type: DropBoxWidget,
                                    titleVisible: false,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 300,
                            borderRight: false,
                            widgets: [
                                {
                                    id: 'slider',
                                    type: SliderWidget,
                                    title: 'Slider'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 30,
                            borderRight: false,
                            widgets: [
                                {
                                    type: ToggleWidget,
                                    titleOn: 'Multiple Year',
                                    titleOff: 'Multiple Year'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 60,
                            widgets: [
                                {
                                    type: DropBoxWidget,
                                    titleVisible: false,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5',
                                    editable: true
                                }
                            ]
                        }

                    ]
                },
                {
                    id: 'grid2',
                    type: GridTableWidget,
                    title: '',
                    marginLeft: 150,
                    marginRight: 150,
                    marginTop: 10,
                    rowHeight: 50,
                    widgets: [
                        {
                            type: GridTableCellWidget,
                            height: 60,
                            width: 25,
                            alignment: 'center-left',
                            borderLeft: false,
                            title: 'US',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template7'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Premium Base',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    depends: [{col: 2, action: 'slide'}],
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 300,
                            title: 'Premium Decrease|Premium Increase',
                            borderRight: false,
                            headerAlignment: 'bottom-space-between',
                            widgets: [
                                {
                                    id: 'slider',
                                    type: SliderWidget,
                                    title: 'Slider'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: '',
                            borderRight: false,
                            widgets: [
                                {
                                    type: ToggleWidget,
                                    titleOn: 'Flow Business',
                                    titleOff: 'Flow Business'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 50,
                            title: 'Reset Nominals',
                            widgets: [
                                {
                                    type: DropBoxWidget,
                                    titleVisible: false,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Premium 2020',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Premium 2021',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Premium 2022',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Loss Ratio % Base',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 300,
                            title: 'Decrease|Increase',
                            headerAlignment: 'bottom-space-between',
                            borderRight: false,
                            widgets: [
                                {
                                    id: 'slider',
                                    type: SliderWidget,
                                    title: 'Slider'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 30,
                            title: '',
                            borderRight: false,
                            widgets: [
                                {
                                    type: ToggleWidget,
                                    titleOn: 'Multiple Year',
                                    titleOff: 'Multiple Year'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 60,
                            title: 'Reset Loss Ratio',
                            widgets: [
                                {
                                    type: DropBoxWidget,
                                    titleVisible: false,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Loss Ratio 2020',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Loss Ratio 2021',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        },
                        {
                            type: GridTableCellWidget,
                            width: 20,
                            title: 'Loss Ratio 2022',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template5'
                                }
                            ]
                        }

                    ]
                },
                {
                    type: GridWidget,
                    marginTop: 50,
                    widgets: [
                        {
                            type: GridRowWidget,
                            alignment: 'center',
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template9',
                                    title: 'all figures in USD millions unless otherwise stated'
                                }
                            ]
                        },
                        {
                            type: GridRowWidget,
                            alignment: 'center',
                            marginTop: 10,
                            widgets: [
                                {
                                    type: TextWidget,
                                    skin: 'template9',
                                    title: 'figures are Nominals; Commissions are scaled in line with Premiums'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
};