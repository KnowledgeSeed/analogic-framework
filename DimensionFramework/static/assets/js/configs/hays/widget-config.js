/* global app */

'use strict';

app.widgetConfig = {
    haysMain:
        {
            id: 'haysMain',
            type: PageWidget,
            widgets: [

                {
                    id: 'haysMain',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [

                        {
                            id: 'haysMainRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'haysMainRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'HAYS',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                            titleFontColor: '#092E74',
                                        }
                                    ]
                                },

                                {
                                    id: 'haysMainRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '80%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },


                                {
                                    id: 'haysMainRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'haysMainRow1Cell5Button',
                                            type: ButtonWidget,
                                            listen: [
                                                /*
                                                {
                                                    event: 'init.rocheBPSPMainApplicationInit.finished',
                                                    method: 'refresh'
                                                }
                                                 */
                                            ],
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_bpsp',
                                        }
                                    ]
                                }
                            ]
                        },





                        {
                            id: 'haysMainRow5',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow5Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '30%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow5Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '18%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow5Cell2Button',
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
                                    id: 'haysMainRow5Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '18%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow5Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-reports',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            paddingRight: '2%',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow5Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '40%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                }

                            ]

                        },
                        {
                            id: 'haysMainRow6',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow6Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '30%',
                                    height: '6%',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow6Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    skin: 'bottomborder',
                                    widgets: [

                                        {
                                            id: 'haysMainRow6Cell2Text',
                                            type: TextWidget,
                                            title: 'Arbeitsbericht Pivot',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow6Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    skin: 'bottomborder',
                                    widgets: [

                                        {
                                            id: 'haysMainRow6Cell3Text',
                                            type: TextWidget,
                                            title: 'ZEG-Bericht',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow6Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '40%',
                                    height: '6%',
                                    widgets: []
                                }

                                ]


                        },
                        {
                            id: 'haysMainRow7',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow7Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '30%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow7Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '18%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow7Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-reports',
                                            fontColor: 'white',
                                            skin: 'rochemain',
                                            paddingRight: '2%',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow7Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '40%',
                                    height: '18%',
                                    widgets: []
                                }

                                ]
                        },
                        {
                            id: 'haysMainRow8',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow8Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '30%',
                                    skin: '',
                                    height: '6%',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow8Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow8Cell2Text',
                                            type: TextWidget,
                                            title: 'Settings',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow8Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '40%',
                                    height: '6%',
                                    widgets: []
                                }

                                ]
                        }

                    ]
                }

            ]
        },

    haysArbeitsberichtPivot:
        {
            id: 'haysArbeitsberichtPivot',
            type: PageWidget,
            widgets: [

                {
                    id: 'haysArbeitsberichtPivot',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysArbeitsberichtPivotGridRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtPivotGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'HAYS',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                            titleFontColor: '#092E74',
                                        }
                                    ]
                                },

                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '80%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },


                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtPivotGridRow1Cell5Button',
                                            type: ButtonWidget,
                                            listen: [
                                                /*
                                                {
                                                    event: 'init.rocheBPSPMainApplicationInit.finished',
                                                    method: 'refresh'
                                                }
                                                 */
                                            ],
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_bpsp',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtPivotGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }]
                                },
                            {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtPivotGridRow2Cell2Text',
                                            type: TextWidget,
                                            title: 'Settings',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }]
                                }
                                ]
                        }]
                }]
        },

    haysZEGBericht:
        {
            id: 'haysZEGBericht',
            type: PageWidget,
            widgets: [

                {
                    id: 'haysZEGBericht',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysZEGBerichtGridRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                            id: 'haysZEGBerichtGridRow1',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow1Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysZEGBerichtGridRow1Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }]
                                },
                            {
                                    id: 'haysZEGBerichtGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '15%',
                                    widgets: [

                                        {
                                            id: 'haysZEGBerichtGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: 'ZEG-Bericht',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 30,
                                            titleFontColor: '#000000',
                                        }]
                                }
                                ]
                        },

                                {
                                    id: 'haysZEGBerichtGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '65%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },


                                {
                                    id: 'haysZEGBerichtGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'haysZEGBerichtGridRow1Cell3Button',
                                            type: ButtonWidget,
                                            listen: [
                                                /*
                                                {
                                                    event: 'init.rocheBPSPMainApplicationInit.finished',
                                                    method: 'refresh'
                                                }
                                                 */
                                            ],
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_bpsp',
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }
                ]
        },
    haysSettings:
        {
            id: 'haysSettings',
            type: PageWidget,
            widgets: [

                {
                    id: 'haysSettings',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysSettingsGridRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [

                                {
                                    id: 'haysSettingsGridRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'HAYS',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'start',
                                            titleFontSize: 36,
                                            titleFontColor: '#092E74',
                                        }
                                    ]
                                },

                                {
                                    id: 'haysSettingsGridRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '80%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },


                                {
                                    id: 'haysSettingsGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow1Cell3Button',
                                            type: ButtonWidget,
                                            listen: [
                                                /*
                                                {
                                                    event: 'init.rocheBPSPMainApplicationInit.finished',
                                                    method: 'refresh'
                                                }
                                                 */
                                            ],
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_bpsp',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'haysSettingsGridRow2',
                            type: GridRowWidget,
                            visible: true,
                            marginTop: '1%',
                            width: '100%',
                            widgets: [

                                {
                                    id: 'haysSettingsGridRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-back-arrow',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }]
                                },
                            {
                                    id: 'haysSettingsGridRow2Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow2Cell2Text',
                                            type: TextWidget,
                                            title: 'Settings',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }]
                                }
                                ]
                        }
                    ]

                }
                ]
        }

};