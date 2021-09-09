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
                                            id: 'haysMainRow1Cell1Logo',
                                            type: ImageWidget,
                                            fileName: 'hays_logo.png',
                                            width: 100,
                                            height: 30
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
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_hays',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'haysMainGridRow2',
                            type: GridRowWidget,
                            marginTop: '1.5%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '32%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                },

                                {
                                    id: 'haysMainGridRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    alignment: 'top-left',
                                    width: '15%',
                                    widgets: [

                                        {
                                            id: 'haysMainGridRow2Cell2Text',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24 px',
                                            titleAlignment: 'left',
                                            titleFontColor: '#A9A9A9',
                                            fontfamily: 'Gotham Narrow',
                                            title: 'Forecasting',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]

                                },
                                {
                                    id: 'haysMainRow2Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainRow3',
                            type: GridRowWidget,
                            marginTop: '0.75%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow3Cell1',
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
                                    id: 'haysMainRow3Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '18%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow3Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-people-square-stack',
                                            fontColor: 'white',
                                            skin: 'haysmain_blue',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow3Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '18%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow3Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-cube-front-back',
                                            fontColor: 'white',
                                            skin: 'haysmain_red',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow3Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '18%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow3Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-percent-target',
                                            fontColor: 'white',
                                            skin: 'haysmain_green',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow3Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                }

                            ]

                        },
                        {
                            id: 'haysMainRow4',
                            type: GridRowWidget,
                            marginTop: '0.4%',
                            marginBottom: '0%',
                            width: '100%',

                            widgets: [
                                {
                                    id: 'haysMainRow4Cell1',
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
                                    id: 'haysMainRow4Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow4Cell2Text',
                                            type: TextWidget,
                                            title: 'KAM Forecasting',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow4Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow4Cell3Text',
                                            type: TextWidget,
                                            title: 'Arbeitsbericht',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow4Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow4Cell4Text',
                                            type: TextWidget,
                                            title: 'ZEG Bericht',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow4Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '34%',
                                    height: '6%',
                                    widgets: []
                                }

                            ]


                        },

                        /* {
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
                                             icon: 'icon-cube-front-back',
                                             fontColor: 'white',
                                             skin: 'haysmain_red',
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
                                             icon: 'icon-percent-target',
                                             fontColor: 'white',
                                             skin: 'haysmain_green',
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
                                     width: '46%',
                                     skin: '',
                                     height: '18%',
                                     widgets: []
                                 }

                             ]

                         },*/
                        /* {
                             id: 'haysMainRow6',
                             type: GridRowWidget,
                             marginTop: '1.3%',
                             marginBottom: '1.3%',
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
                                     width: '46%',
                                     height: '6%',
                                     widgets: []
                                 }
                             ]
                         },*/
                        {
                            id: 'haysMainRow7',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '1%',
                            widgets: [
                                {
                                    id: 'haysMainRow7Cell1',
                                    type: GridCellWidget,
                                    width: '30%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow7Cell2',
                                    type: GridCellWidget,
                                    width: '36%',
                                    skin: 'topborder',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow7Cell3',
                                    type: GridCellWidget,
                                    width: '34%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainGridRow75',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '0.75%',
                            widgets: [
                                {
                                    id: 'haysMainRow75Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '32%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                },

                                {
                                    id: 'haysMainGridRow75Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    alignment: 'top-left',
                                    width: '15%',
                                    widgets: [

                                        {
                                            id: 'haysMainGridRow75Cell2Text',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24 px',
                                            titleAlignment: 'left',
                                            titleFontColor: '#A9A9A9',
                                            fontfamily: 'Gotham Narrow',
                                            title: 'Sales Management',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]

                                },
                                {
                                    id: 'haysMainRow75Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainRow8',
                            type: GridRowWidget,
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow8Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-right',
                                    width: '30%',
                                    skin: '',
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
                                    widgets: [

                                        {
                                            id: 'haysMainRow8Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-user',
                                            fontColor: 'white',
                                            skin: 'haysmain_purple',
                                            paddingRight: '2%',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow8Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-left',
                                    width: '58%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainGridRow9',
                            type: GridRowWidget,
                            marginTop: '0.4%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainGridRow9Cell1',
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
                                    id: 'haysMainGridRow9Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [

                                        {
                                            id: 'haysMainGridRow9Cell2Text',
                                            type: TextWidget,
                                            title: 'Headcount',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainGridRow9Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '58%',
                                    height: '6%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainRow10',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '1%',
                            widgets: [
                                {
                                    id: 'haysMainRow10Cell1',
                                    type: GridCellWidget,
                                    width: '30%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow10Cell2',
                                    type: GridCellWidget,
                                    width: '36%',
                                    skin: 'topborder',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow10Cell3',
                                    type: GridCellWidget,
                                    width: '34%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainRow11',
                            type: GridRowWidget,
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow11Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-right',
                                    width: '30%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'haysMainRow11Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    widgets: [

                                        {
                                            id: 'haysMainRow11Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-settings',
                                            fontColor: 'white',
                                            skin: 'haysmain_grey',
                                            paddingRight: '2%',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainRow11Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-left',
                                    width: '58%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainGridRow12',
                            type: GridRowWidget,
                            marginTop: '0.4%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainGridRow12Cell1',
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
                                    id: 'haysMainGridRow12Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [

                                        {
                                            id: 'haysMainGridRow12Cell2Text',
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
                                    id: 'haysMainGridRow12Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '58%',
                                    height: '6%',
                                    widgets: []
                                }

                            ]
                        }

                    ]
                },
                {
                    id: 'haysMainKAMPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    skin: 'popup_hays',
                    width: '240',
                    bgScrollable: true,
                    fadingSpeed: 0,
                    fixed: false,
                    height: '100',
                    behaviour: 'popup',
                    positionAndCalculateBestSpace: 'right',
                    widgets: [

                        {
                            id: 'haysMainKAMPopupGrid',
                            type: GridWidget,
                            marginTop: 5,
                            widgets: [
                                {
                                    id: 'haysMainKAMPopupGridRow',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'haysMainKAMPopupButton1',
                                            type: ButtonWidget,
                                            height: 40,
                                            width: 220,
                                            marginLeft: 5,
                                            skin: 'popupbutton',
                                            icon: 'icon-person',
                                            borderWidth: 0,
                                            label: 'As KAM'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysMainKAMPopupGridRow2',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'haysMainKAMPopupButton2',
                                            type: ButtonWidget,
                                            height: 40,
                                            width: 220,
                                            marginLeft: 5,
                                            skin: 'popupbutton',
                                            icon: 'icon-star-circle',
                                            borderWidth: 0,
                                            label: 'As Leader'
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                }
            ]
        },

haysKamForecasting:
{
    id: 'haysKamForecasting',
        type: PageWidget,
        widgets:
    [
        {
            id: 'haysKamForecasting',
            type: GridWidget,
            marginLeft: '10',
            marginRight: '10',
            width: '100%',
            widgets: [
                {
                    id: 'haysKamForecastingGridRow1',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    skin: 'bottomborder',
                    widgets: [
                        {
                            id: 'haysKamForecastingGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysKamForecastingGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'KAM Forecasting',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }]
                        },
                        {
                            id: 'haysKamForecastingGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '62%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysKamForecastingGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }

                    ]
                },
                {
                    id: 'haysKamForecastingGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    width: '100%',
                    skin: '',
                    widgets: [

                        {
                            id: 'haysKamForecastingGridRow2Cell0',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '4%',
                            alignment: 'center-center',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell0Button1',
                                    type: ButtonWidget,
                                    icon: 'icon-table',
                                    action: '',
                                    width: '50px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'material_hayslight',
                                },

                            ]
                        },

                        {
                            id: 'haysKamForecastingGridRow2Cell1',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell1Button1',
                                    type: ButtonWidget,
                                    label: 'HAYS',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'lefttriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell2',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 120,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Business Unit 1',
                                    action: '',
                                    width: '110',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell3',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell3Button1',
                                    type: ButtonWidget,
                                    label: 'Area A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell4',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell4Button1',
                                    type: ButtonWidget,
                                    label: 'Department 1',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell5',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell5Button1',
                                    type: ButtonWidget,
                                    label: 'Team A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell6',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 150,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow6Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Adam Foreman',
                                    action: '',
                                    width: '135',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'rightbluetriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell7',
                            type: GridCellWidget,
                            marginTop: '0',
                            marginBottom: '0',
                            marginLeft: '2%',
                            width: '15%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell7Button1',
                                    type: ButtonWidget,
                                    label: 'Version: July Revision B',
                                    action: '',
                                    width: '191',
                                    fontColor: '#6C757D',
                                    icon: 'icon-rectangle-stack',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'hierarchy_button',
                                },

                            ]
                        },


                        {
                            id: 'haysKamForecastingGridRow2Cell8',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '38%',
                            alignment: 'center-left',
                            widgets: []
                        },
                        {
                            id: 'haysKamForecastingGridRow2Cell9',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '7%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell9Button1',
                                    type: ButtonWidget,
                                    label: 'Copy To',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    icon: 'icon-copy',
                                    skin: 'material_hayslight',
                                },

                            ]
                        }, {
                            id: 'haysKamForecastingGridRow2Cell10',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '7%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell10Button1',
                                    type: ButtonWidget,
                                    label: 'Submit',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    icon: 'icon-check-on',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'material_hays',
                                },

                            ]
                        },


                    ]


                },
                {
                    id: 'haysKamForecastingGridRow3',
                    type: GridRowWidget,
                    marginTop: '0',
                    marginBottom: '0',
                    width: '100%',
                    height: '30px',
                    widgets: [
                        {
                            id: 'haysKamForecastingGridRow3Cell1',
                            type: GridCellWidget,
                            width: '6%',
                            widgets: [
                                {
                                    id: 'haysKamForecastingGridRow3Cell1Text',
                                    type: TextWidget,
                                    title: 'Filters',
                                    titleFontWeight: 600,
                                    width: '100%',
                                    titleFontSize: '13px'
                                }
                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow3Cell1',
                            type: GridCellWidget,
                            width: '94%',
                            widgets: []
                        }
                    ]
                },
                {
                    id: 'haysKamForecastingGridRow4',
                    type: GridRowWidget,
                    marginTop: '0',
                    marginBottom: '0',
                    width: '100%',
                    height: '100px',
                    widgets: [
                        {
                            id: 'haysKamForecastingGridRow4Cell1',
                            type: GridCellWidget,
                            alignment: 'top-left',
                            widgets: [
                                {
                                    id: 'haysKamForecastingGridTable',
                                    type: GridTableWidget,
                                    width: '100%',
                                    marginLeft: '1%',
                                    title: '',
                                    widgets: [
                                        {
                                            id: 'haysKamForecastingGridTableRowCell1',
                                            type: GridTableCellWidget,
                                            width: '20%',
                                            widgets: [
                                                {
                                                    id: 'haysKamForecastingGridTableRowCell1Text',
                                                    type: TextWidget,
                                                    width: '100%',
                                                    depends: [
                                                        {'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'},
                                                        {'event': 'perform.haysKamForecastingGridTableRowCell1Text.finished'}
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'haysKamForecastingGridTableRowCell2',
                                            type: GridTableCellWidget,
                                            width: '20%',
                                            widgets: [
                                                {
                                                    id: 'haysKamForecastingGridTableRowCell2Text',
                                                    type: TextWidget,
                                                    width: '100%',
                                                    depends: [
                                                        {'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'},
                                                        {'event': 'perform.haysKamForecastingGridTableRowCell2Text.finished'}
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'haysKamForecastingGridTableRowCell1',
                                            type: GridTableCellWidget,
                                            width: '20%',
                                            widgets: [
                                                {
                                                    id: 'haysKamForecastingGridTableRowCell3Text',
                                                    type: TextWidget,
                                                    width: '100%',
                                                    depends: [
                                                        {'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'},
                                                        {'event': 'perform.haysKamForecastingGridTableRowCell3Text.finished'}
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'haysKamForecastingGridTableRowCell4',
                                            type: GridTableCellWidget,
                                            width: '20%',
                                            widgets: [
                                                {
                                                    id: 'haysKamForecastingGridTableRowCell4Text',
                                                    type: TextWidget,
                                                    width: '100%',
                                                    depends: [
                                                        {'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'},
                                                        {'event': 'perform.haysKamForecastingGridTableRowCell4Text.finished'}
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'haysKamForecastingGridTableRowCell5',
                                            type: GridTableCellWidget,
                                            width: '20%',
                                            widgets: [
                                                {
                                                    id: 'haysKamForecastingGridTableRowCell5Text',
                                                    type: TextWidget,
                                                    width: '100%',
                                                    depends: [
                                                        {'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'},
                                                        {'event': 'perform.haysKamForecastingGridTableRowCell5Text.finished'}
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'haysKamForecastingGridRow4Cell2',
                            type: GridCellWidget,
                            width: '25%',
                            alignment: 'top-left',
                            widgets: [
                                {
                                    id: 'haysKamForecastingGridRow4Cell2Button',
                                    type: ButtonWidget,
                                    width: '40px',
                                    height: '40px',
                                    skin: 'point_button',
                                    icon: 'icon-ellipsis'
                                }
                            ]
                        }
                    ]
                }
            ]


        },

        {
            id: 'haysKamForecastingFilterPopUp',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: true,
            backdrop: true,
            visible: false,
            closeBtn: false,
            width: '190',
            bgScrollable: true,
            fixed: true,
            heightFixed: false,
            behaviour: 'popup',
            skin: 'departurement_popup_hays',
            fadingSpeed: 0,
            position: 'bottom',
            widgets: [
                {
                    id: 'haysKamForecastingFilterPopUpDropdown',
                    type: DropBoxWidget,
                    multiSelect: true
                }
            ]
        },

        {
            id: 'haysKamForecastingPointPopUp',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: true,
            backdrop: true,
            visible: false,
            closeBtn: false,
            width: '240',
            height: '140px',
            bgScrollable: true,
            fixed: true,
            heightFixed: false,
            behaviour: 'popup',
            skin: 'departurement_popup_hays',
            fadingSpeed: 0,
            position: 'right',
            widgets: [
                {
                    id: 'haysKamForecastingPointPopUpCell1',
                    type: GridCellWidget,
                    alignment: 'bottom-left',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysKamForecastingPointPopUpCell1Button1',
                            type: ButtonWidget,
                            width: '100%',
                            label: 'Clear All Filters',
                            icon: 'icon-clear',
                            height: '40px',
                            skin: 'point_popup_clearbutton'

                        }
                    ]
                },
                {
                    id: 'haysKamForecastingPointPopUpCell2',
                    type: GridCellWidget,
                    alignment: 'bottom-left',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysKamForecastingPointPopUpCell2Button1',
                            type: ButtonWidget,
                            width: '100%',
                            label: 'Save as Filter Preset',
                            icon: 'icon-tray-arrow-down',
                            height: '40px',
                            skin: 'point_popup_savebutton'

                        }
                    ]
                },
                {
                    id: 'haysKamForecastingPointPopUpCell3',
                    type: GridCellWidget,
                    alignment: 'bottom-left',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysKamForecastingPointPopUpCell3Button1',
                            type: ButtonWidget,
                            width: '100%',
                            label: 'Load Filter Preset',
                            icon: 'icon-tray-files',
                            height: '40px',
                            skin: 'point_popup_loadbutton'

                        }
                    ]
                }

            ]
        }

    ]
}
,

haysForecastingHierarchy:
{
    id: 'haysForecastingHierarchy',
        type: PageWidget,
        widgets:
    [
        {
            id: 'haysForecastingHierarchy',
            type: GridWidget,
            marginLeft: '10',
            marginRight: '10',
            width: '100%',
            widgets: [
                {
                    id: 'haysForecastingHierarchyGridRow1',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    skin: 'bottomborder',
                    widgets: [
                        {
                            id: 'haysForecastingHierarchyGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysForecastingHierarchyGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'Forecasting Hierarchy',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }]
                        },
                        {
                            id: 'haysForecastingHierarchyGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '62%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysForecastingHierarchyGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }

                    ]
                },

                {
                    id: 'haysForecastingHierarchyGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysForecastingHierarchyGridRow2Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '30%',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGridRow2Cell1Search',
                                    type: TextBoxWidget,
                                    width: '400',
                                    defaultText: 'Search...',
                                    skin: 'searchbox',
                                    height: '40'
                                }
                            ]
                        },
                        {
                            id: 'haysForecastingHierarchyGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '65%',
                            widgets: []
                        },
                        {
                            id: 'haysForecastingHierarchyGridRow1Cell3',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '15%',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGridRow1Cell4Button',
                                    type: ButtonWidget,
                                    label: 'Open Selected',
                                    icon: 'icon-rows',
                                    skin: 'material_hays',
                                    marginTop: '7%',
                                    marginLeft: '30%',
                                    width: '120%'
                                }
                            ]
                        }

                    ]
                }
            ]
        },

        {
            id: 'haysForecastingHierarchyGrid2',
            type: GridWidget,
            marginTop: '50',
            width: '100%',
            widgets: [

                {
                    id: 'haysForecastingHierarchyGrid2Row_01',
                    type: GridRowWidget,
                    height: '100%',
                    widgets: [
                        {
                            id: 'haysForecastingHierarchyGrid2Row_01_01',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '300',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGrid2Level1GridTable',
                                    type: GridTableWidget,
                                    width: '300',
                                    listen: [],
                                    skin: 'hierarchyGridTable_hays',
                                    title: '',
                                    widgets: [
                                        {
                                            id: 'haysForecastingHierarchyGrid2Level1GridTableCell01',
                                            type: GridTableCellWidget,
                                            alignment: 'center-left',
                                            width: '250',
                                            skin: 'hierarchyCellBorder_hays',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level1GridTableCell01Toggle',
                                                    type: ToggleWidget,
                                                    titleOff: '',
                                                    titleOn: '',
                                                    action: 'launch',
                                                    visible: true,
                                                    width: '246px',
                                                    icon: 'icon-check-on',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-check-off',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level1GridTable_row_1.finished'
                                                        }
                                                    ]
                                                },
                                            ]
                                        },

                                        {
                                            id: 'haysForecastingHierarchyGrid2Level1GridTableCell02',
                                            type: GridTableCellWidget,
                                            alignment: 'center-right',
                                            skin: 'hierarchyCellBorder_hays',
                                            width: '50',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level1GridTableCell02Toggle',
                                                    type: ToggleWidget,
                                                    action: 'launch',
                                                    visible: true,
                                                    icon: 'icon-chevron-right',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-chevron-right',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level1GridTable_row_0.finished'
                                                        }
                                                    ]
                                                },

                                                /*
                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level1GridTableCell02Button',
                                                    type: ButtonWidget,
                                                    width: '100%',
                                                    icon: 'icon-chevron-right',
                                                    iconColor: '#007BFF',
                                                    //iconFontSize:,
                                                    height: '60'
                                                },

                                                 */
                                            ]
                                        }


                                    ]
                                }]
                        },

                        {
                            id: 'haysForecastingHierarchyGrid2Row_01_02',
                            type: GridCellWidget,
                            visible: false,
                            alignment: 'top-center',
                            width: '300',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGrid2Level2GridTable',
                                    type: GridTableWidget,
                                    width: '300',
                                    listen: [],
                                    skin: 'hierarchyGridTable_hays',
                                    title: '',
                                    widgets: [
                                        {
                                            id: 'haysForecastingHierarchyGrid2Level2GridTableCell01',
                                            type: GridTableCellWidget,
                                            alignment: 'center-left',
                                            skin: 'hierarchyCellBorder_hays',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level1GridTableCell01Toggle',
                                                    type: ToggleWidget,
                                                    titleOff: '',
                                                    titleOn: '',
                                                    action: 'launch',
                                                    visible: true,
                                                    width: '246px',
                                                    icon: 'icon-check-on',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-check-off',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level2GridTable_row_1.finished'
                                                        }
                                                    ]
                                                },
                                            ]
                                        },

                                        {
                                            id: 'haysForecastingHierarchyGrid2Level2GridTableCell02',
                                            type: GridTableCellWidget,
                                            alignment: 'center-right',
                                            skin: 'hierarchyCellBorder_hays',
                                            width: '50',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level2GridTableCell02Toggle',
                                                    type: ToggleWidget,
                                                    action: 'launch',
                                                    visible: true,
                                                    icon: 'icon-chevron-right',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-chevron-right',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level2GridTable_row_0.finished'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }


                                    ]
                                }]
                        },

                        {
                            id: 'haysForecastingHierarchyGrid2Row_01_03',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '300',
                            visible: false,
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGrid2Level3GridTable',
                                    type: GridTableWidget,
                                    width: '300',
                                    listen: [],
                                    skin: 'hierarchyGridTable_hays',
                                    title: '',
                                    widgets: [
                                        {
                                            id: 'haysForecastingHierarchyGrid2Level3GridTableCell01',
                                            type: GridTableCellWidget,
                                            alignment: 'center-left',
                                            width: '246',
                                            skin: 'hierarchyCellBorder_hays',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level3GridTableCell01Toggle',
                                                    type: ToggleWidget,
                                                    titleOff: '',
                                                    titleOn: '',
                                                    action: 'launch',
                                                    visible: true,
                                                    width: '246px',
                                                    icon: 'icon-check-on',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-check-off',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level3GridTable_row_1.finished'
                                                        }
                                                    ]
                                                },
                                            ]
                                        },

                                        {
                                            id: 'haysForecastingHierarchyGrid2Level3GridTableCell02',
                                            type: GridTableCellWidget,
                                            alignment: 'center-right',
                                            skin: 'hierarchyCellBorder_hays',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level3GridTableCell02Toggle',
                                                    type: ToggleWidget,
                                                    action: 'launch',
                                                    visible: true,
                                                    icon: 'icon-chevron-right',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-chevron-right',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level3GridTable_row_0.finished'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }


                                    ]
                                }]
                        },

                        {
                            id: 'haysForecastingHierarchyGrid2Row_01_04',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            visible: false,
                            width: '300',
                            widgets: [

                                {
                                    id: 'haysForecastingHierarchyGrid2Level4GridTable',
                                    type: GridTableWidget,
                                    width: '300',
                                    listen: [],
                                    skin: 'hierarchyGridTable_hays',
                                    title: '',
                                    widgets: [
                                        {
                                            id: 'haysForecastingHierarchyGrid2Level4GridTableCell01',
                                            type: GridTableCellWidget,
                                            alignment: 'center-left',
                                            width: '246',
                                            skin: 'hierarchyCellBorder_hays',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level4GridTableCell01Toggle',
                                                    type: ToggleWidget,
                                                    titleOff: '',
                                                    titleOn: '',
                                                    action: 'launch',
                                                    visible: true,
                                                    width: '250px',
                                                    icon: 'icon-check-on',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-check-off',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level4GridTable_row_1.finished'
                                                        }
                                                    ]
                                                },
                                            ]
                                        },

                                        {
                                            id: 'haysForecastingHierarchyGrid2Level4GridTableCell02',
                                            type: GridTableCellWidget,
                                            alignment: 'center-right',
                                            skin: 'hierarchyCellBorder_hays',
                                            width: '50',
                                            widgets: [

                                                {
                                                    id: 'haysForecastingHierarchyGrid2Level4GridTableCell02Toggle',
                                                    type: ToggleWidget,
                                                    action: 'launch',
                                                    visible: true,
                                                    icon: 'icon-chevron-right',
                                                    skin: 'hierarchyToggle_hays',
                                                    height: '60',
                                                    iconOff: 'icon-chevron-right',
                                                    depends: [
                                                        {
                                                            event: 'switch.haysForecastingHierarchyGrid2Level4GridTable_row_0.finished'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }


                                    ]
                                }]
                        },


                    ]
                }]
        },
    ]


}
,

haysArbeitsbericht:
{
    id: 'haysArbeitsbericht',
        type: PageWidget,
        widgets:
    [
        {
            id: 'haysArbeitsbericht',
            type: GridWidget,
            marginLeft: '10',
            marginRight: '10',
            width: '100%',
            widgets: [
                {
                    id: 'haysArbeitsberichtGridRow1',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    skin: 'bottomborder',
                    widgets: [
                        {
                            id: 'haysArbeitsberichtGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'top-left',
                            width: '17%',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'Arbeitsbericht',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '14%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysArbeitsberichtGridRow1Cell4',
                            type: GridCellWidget,
                            alignment: 'center',
                            width: '20%',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtYearSegmentedControl',
                                    type: SegmentedControlWidget,
                                    width: '100%',
                                    skin: 'segmented',
                                    marginBottom: '5px',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtSegmentedControlItem1',
                                            type: SegmentedControlItemWidget,
                                            action: 'segmentedControlTab1',
                                            selected: true,
                                            label: 'Classic View',
                                        },
                                        {
                                            id: 'haysArbeitsberichtSegmentedControlItem2',
                                            type: SegmentedControlItemWidget,
                                            action: 'segmentedControlTab2',
                                            selected: false,
                                            label: 'Pivot View',
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            id: 'haysArbeitsberichtGridRow1Cell5',
                            type: GridCellWidget,
                            alignment: 'center',
                            width: '18%',
                            skin: 'leftborder',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtBySegmentedControl',
                                    type: SegmentedControlWidget,
                                    width: '100%',
                                    skin: 'segmented_light',
                                    marginBottom: 5,
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtBySegmentedControlItem1',
                                            type: SegmentedControlItemWidget,
                                            action: 'segmentedControlTab1',
                                            selected: true,
                                            label: 'By Sales Channel',
                                        },
                                        {
                                            id: 'haysArbeitsberichtBySegmentedControlItem2',
                                            type: SegmentedControlItemWidget,
                                            action: 'segmentedControlTab2',
                                            selected: false,
                                            label: 'By Hierarchy',
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            id: 'haysArbeitsberichtGridRow1Cell6',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '18%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysArbeitsberichtGridRow1Cell7',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow1Cell7Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }

                    ]
                },
                {
                    id: 'haysArbeitsberichtGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    width: '100%',
                    skin: '',
                    widgets: [

                        {
                            id: 'haysArbeitsberichtGridRow2Cell1',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow2Cell1Button1',
                                    type: ButtonWidget,
                                    label: 'HAYS',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'lefttriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell2',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 120,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow2Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Business Unit 1',
                                    action: '',
                                    width: '110',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell3',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow2Cell3Button1',
                                    type: ButtonWidget,
                                    label: 'Area A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell4',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow2Cell4Button1',
                                    type: ButtonWidget,
                                    label: 'Department 1',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell5',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow2Cell5Button1',
                                    type: ButtonWidget,
                                    label: 'Team A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell6',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 150,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtGridRow6Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Adam Foreman',
                                    action: '',
                                    width: '135',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'rightbluetriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell7',
                            type: GridCellWidget,
                            marginLeft: '2%',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 150,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysKamForecastingGridRow2Cell7Button1',
                                    type: ButtonWidget,
                                    label: 'Version: July Revision B',
                                    action: '',
                                    width: '191',
                                    fontColor: '#6C757D',
                                    icon: 'icon-rectangle-stack',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'hierarchy_button',
                                }
                            ]
                        },

                        {
                            id: 'haysArbeitsberichtGridRow2Cell8',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '3%',
                            alignment: 'center-left',
                            widgets: []
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell9',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '10%',
                            alignment: 'center-left',
                            widgets: [
                                {
                                    id: 'haysKamForecastingGridRow2Cell7Button1',
                                    type: ButtonWidget,
                                    label: 'Compare to ...',
                                    action: '',
                                    width: '132',
                                    fontColor: '#6C757D',
                                    icon: 'icon-rectangle-stack',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'hierarchy_button_grey',
                                }
                            ]
                        },
                        {
                            id: 'haysArbeitsberichtGridRow2Cell9',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '30%',
                            alignment: 'center-left',
                            widgets: []
                        },


                    ]


                }
            ]
        }
    ]


}
,

haysArbeitsberichtPivot:
{
    id: 'haysArbeitsberichtPivot',
        type: PageWidget,
        widgets:
    [

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
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '21%',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'Arbeitsbericht Pivot',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }]
                        },

                        {
                            id: 'haysArbeitsberichtPivotGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '66%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },


                        {
                            id: 'haysArbeitsberichtPivotGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'haysArbeitsberichtPivotGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    width: '100%',
                    skin: '',
                    widgets: [

                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell1',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '5.5%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell1Button1',
                                    type: ButtonWidget,
                                    label: 'HAYS',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'lefttriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell2',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '7.2%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Business Unit 1',
                                    action: '',
                                    width: '110',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell3',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '5.6%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell3Button1',
                                    type: ButtonWidget,
                                    label: 'Area A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell4',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '6.7%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell4Button1',
                                    type: ButtonWidget,
                                    label: 'Department 1',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell5',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '5.6%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow2Cell5Button1',
                                    type: ButtonWidget,
                                    label: 'Team A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell6',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '8%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysArbeitsberichtPivotGridRow6Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Adam Foreman',
                                    action: '',
                                    width: '135',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'rightbluetriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysArbeitsberichtPivotGridRow2Cell8',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '68.4%',
                            alignment: 'center-left',
                            widgets: []
                        },
                    ]
                },
            ]
        }
    ]
}
,

haysZEGBericht:
{
    id: 'haysZEGBericht',
        type: PageWidget,
        widgets:
    [

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
                            id: 'haysZEGBerichtGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysZEGBerichtGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom-center',
                            width: '12.5%',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'ZEG-Bericht',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }]
                        },
                        {
                            id: 'haysZEGBerichtGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '74.5%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },


                        {
                            id: 'haysZEGBerichtGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'haysZEGBerichtGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    width: '100%',
                    skin: '',
                    widgets: [

                        {
                            id: 'haysZEGBerichtPivotGridRow2Cell1',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtPivotGridRow2Cell1Button1',
                                    type: ButtonWidget,
                                    label: 'HAYS',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'lefttriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysZEGBerichtPivotGridRow2Cell2',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 120,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow2Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Business Unit 1',
                                    action: '',
                                    width: '110',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysZEGBerichtGridRow2Cell3',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow2Cell3Button1',
                                    type: ButtonWidget,
                                    label: 'Area A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysZEGBerichtGridRow2Cell4',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow2Cell4Button1',
                                    type: ButtonWidget,
                                    label: 'Department 1',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysZEGBerichtGridRow2Cell5',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow2Cell5Button1',
                                    type: ButtonWidget,
                                    label: 'Team A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysZEGBerichtGridRow2Cell6',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysZEGBerichtGridRow6Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Adam Foreman',
                                    action: '',
                                    width: '135',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'rightbluetriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysZEGBerichtGridRow2Cell8',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '68.4%',
                            alignment: 'center-left',
                            widgets: []
                        },
                    ]
                },
            ]
        }
    ]
}
,

haysSettings:
{
    id: 'haysSettings',
        type: PageWidget,
        widgets:
    [

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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
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
                            alignment: 'top-center',
                            width: '31.5%',
                            widgets: []
                        },
                        {
                            id: 'haysSettingsGridRow2Cell2',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysSettingsGridRow2Cell2Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '50',
                                    icon: 'icon-arrow-left',
                                    skin: 'backbuttonhays',
                                    height: '50'
                                }]
                        },
                        {
                            id: 'haysSettingsGridRow2Cell3',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '7%',
                            widgets: [

                                {
                                    id: 'haysSettingsGridRow2Cell3Text',
                                    type: TextWidget,
                                    title: 'Settings',
                                    width: '100%',
                                    skin: 'settings',
                                    titleAlignment: 'center',
                                    titleFontSize: 30,
                                    height: '40px',
                                    marginTop: '4px',
                                    titleFontColor: '#A9A9A9',
                                }]
                        }
                    ]
                },

                {
                    id: 'haysSettingsGridRow3',
                    type: GridRowWidget,
                    visible: true,
                    marginTop: '1%',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysSettingsGridRow3Cell1',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '30%',
                            widgets: []
                        },
                        {
                            id: 'haysSettingsGridRow3Cell2',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '13%',
                            widgets: [
                                {
                                    id: 'haysSettingsGridRow3Cell2Button',
                                    type: ButtonWidget,
                                    skin: 'settings_grey_menu',
                                    icon: 'icon-people-3-fill',
                                    height: '145px',
                                    width: '145px'
                                }
                            ]
                        },
                        {
                            id: 'haysSettingsGridRow3Cell3',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '13%',
                            widgets: [
                                {
                                    id: 'haysSettingsGridRow3Cell3Button',
                                    type: ButtonWidget,
                                    skin: 'haysmain_disabled',
                                    height: '145px',
                                    width: '145px'
                                }
                            ]
                        },
                        {
                            id: 'haysSettingsGridRow3Cell4',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '13%',
                            widgets: [
                                {
                                    id: 'haysSettingsGridRow3Cell4Button',
                                    type: ButtonWidget,
                                    skin: 'haysmain_disabled',
                                    height: '145px',
                                    width: '145px'
                                }
                            ]
                        },
                    ]
                },

                {
                    id: 'haysSettingsGridRow4',
                    type: GridRowWidget,
                    visible: true,
                    marginTop: '1%',
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysSettingsGridRow4Cell1',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '31%',
                            widgets: []
                        },
                        {
                            id: 'haysSettingsGridRow4Cell2',
                            type: GridCellWidget,
                            alignment: 'top-center',
                            width: '10.5%',
                            widgets: [
                                {
                                    id: 'haysSettingsGridRow4Cell2Text',
                                    type: TextWidget,
                                    title: 'User Groups',
                                    titleFontSize: '16px',
                                    titleAlignment: 'center'
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
}
,

haysVersion:
{
    id: 'haysVersion',
        type: PageWidget,
        widgets:
    [
        {
            id: 'haysVersion',
            type: GridWidget,
            marginLeft: '10',
            marginRight: '10',
            width: '100%',
            widgets: [
                {
                    id: 'haysVersionGridRow1',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    skin: 'bottomborder',
                    widgets: [
                        {
                            id: 'haysVersionGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysVersionGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'KAM Forecasting Versions',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }]
                        },
                        {
                            id: 'haysVersionGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '62%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysVersionGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }

                    ]
                },

                {
                    id: 'haysVersionGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    width: '100%',
                    skin: '',
                    widgets: [

                        {
                            id: 'haysVersionGridRow2Cell1',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow2Cell1Button1',
                                    type: ButtonWidget,
                                    label: 'HAYS',
                                    action: '',
                                    width: '100px',
                                    height: '40px',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'lefttriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysVersionGridRow2Cell2',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 120,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow2Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Business Unit 1',
                                    action: '',
                                    width: '110',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysVersionGridRow2Cell3',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow2Cell3Button1',
                                    type: ButtonWidget,
                                    label: 'Area A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysVersionGridRow2Cell4',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow2Cell4Button1',
                                    type: ButtonWidget,
                                    label: 'Department 1',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysVersionGridRow2Cell5',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow2Cell5Button1',
                                    type: ButtonWidget,
                                    label: 'Team A',
                                    action: '',
                                    width: '100',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'triangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysVersionGridRow2Cell6',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysVersionGridRow6Cell2Button1',
                                    type: ButtonWidget,
                                    label: 'Adam Foreman',
                                    action: '',
                                    width: '135',
                                    marginTop: '20',
                                    marginBottom: '20',
                                    skin: 'rightbluetriangle_button',
                                },

                            ]
                        },
                        {
                            id: 'haysVersionGridRow2Cell7',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: 110,
                            alignment: 'center-left',
                            widgets: []
                        },


                        {
                            id: 'haysVersionGridRow2Cell8',
                            type: GridCellWidget,
                            marginLeft: '1',
                            marginTop: '0',
                            marginBottom: '0',
                            width: '39.4%',
                            alignment: 'center-left',
                            widgets: []
                        },
                    ]
                },

                {
                    id: 'haysUserGroupsGridRow3',
                    type: GridRowWidget,
                    marginTop: '0',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysUserGroupsGridRow3Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '0',
                            marginLeft: '1%',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysUserGroupsGridRow3Cell1Search',
                                    type: TextBoxWidget,
                                    width: '371',
                                    defaultText: 'Search...',
                                    skin: 'searchbox',
                                    height: '40'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
,

haysUserGroups:
{
    id: 'haysUserGroups',
    type: PageWidget,
    widgets:
    [
        {
            id: 'haysUserGroups',
            type: GridWidget,
            marginLeft: '10',
            marginRight: '10',
            width: '100%',
            widgets: [
                {
                    id: 'haysUserGroupsGridRow1',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    skin: 'bottomborder',
                    widgets: [
                        {
                            id: 'haysUserGroupsGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysUserGroupsGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysUserGroupsGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysUserGroupsGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'User Groups',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }
                            ]
                        },
                        {
                            id: 'haysUserGroupsGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '62%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysUserGroupsGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysUserGroupsGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }

                    ]
                },

                {
                    id: 'haysUserGroupsGridRow15',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysUserGroupsGridRow15Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '15%',
                            widgets: [

                               {
                                    id: 'haysUserGroupsGridRow15SegmentedControl',
                                    type: SegmentedControlWidget,
                                    width: '100%',
                                    skin: 'segmented',
                                    marginBottom: '5px',
                                    widgets: [

                                        {
                                            id: 'haysUserGroupsGridRow15SegmentedControlItem1',
                                            type: SegmentedControlItemWidget,
                                            action: 'segmentedControlTab1',
                                            selected: true,
                                            label: 'By Groups',
                                        },
                                        {
                                            id: 'haysUserGroupsGridRow15SegmentedControlItem2',
                                            type: SegmentedControlItemWidget,
                                            action: 'segmentedControlTab2',
                                            selected: false,
                                            label: 'By Versions',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'haysUserGroupsGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysUserGroupsGridRow2Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysUserGroupsGridRow2Cell1Search',
                                    type: TextBoxWidget,
                                    width: '400',
                                    defaultText: 'Search...',
                                    skin: 'searchbox',
                                    height: '40'
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'haysUserGroupsGridRow3',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysUserGroupsGridRow3Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysUserGroupsGridRow3Cell1Button',
                                    type: ButtonWidget,
                                    width: '120',
                                    skin: 'material_hays',
                                    label: 'New Group',
                                    icon: 'icon-plus-circle',
                                    height: '40'
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
                    id: 'haysUserGroupsByGroupsGridTable',
                    type: GridTableWidget,
                    hideIfNoData: true,
                    visible: true,
                    skin: 'settings_hays',
                    listen: [

                    ],
                    width: '35%',
                    title: '',
                    widgets: [

                        {
                            id: 'haysUserGroupsByGroupsGridTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            height: '90',
                            width: '100%',
                            widgets: [


                                {
                                    id: 'haysUserGroupsByGroupsGridTableHeaderCell-01',
                                    type: GridTableHeaderCellWidget,
                                    width: '50.3%',
                                    alignment: 'bottom-left',
                                    widgets: [

                                        {
                                            id: 'haysUserGroupsByGroupsGridTableHeaderCell1Text',
                                            type: TextWidget,
                                            width: '100%',
                                            body: '',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: '10%',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'haysUserGroupsByGroupsGridTableHeaderCell-02',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-center',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupsByGroupsGridTableHeaderText-02',
                                            type: TextWidget,
                                            body: 'ADMIN',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'haysUserGroupsByGroupsGridTableHeaderCell-03',
                                    type: GridTableHeaderCellWidget,
                                    width: '10%',
                                    alignment: 'bottom-center',
                                    widgets: [

                                        {
                                            id: 'haysUserGroupsByGroupsGridTableHeaderText-03',
                                            type: TextWidget,
                                            body: 'Read',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            bodyAlignment: 'center'
                                        }
                                    ]
                                },

                                {
                                    id: 'haysUserGroupsByGroupsGridTableHeaderCell-04',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-left',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupsByGroupsGridTableHeaderCellText-04',
                                            type: TextWidget,
                                            body: 'Write',
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: '15px',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                {
                                    id: 'haysUserGroupsByGroupsGridTableHeaderCell-05',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-left',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupsByGroupsGridTableHeaderCellText-05',
                                            type: TextWidget,
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: '15px',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                                 {
                                    id: 'haysUserGroupsByGroupsGridTableHeaderCell-06',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'bottom-left',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupsByGroupsGridTableHeaderCellText-06',
                                            type: TextWidget,
                                            skin: 'products_gd_header_bpsp',
                                            titleAlignment: 'start',
                                            marginBottom: 8,
                                            marginLeft: '15px',
                                            bodyAlignment: 'start'
                                        }
                                    ]
                                },

                            ]
                        },


                        {
                            id: 'haysUserGroupsByGroupsGridTableCell-01',
                            type: GridTableCellWidget,
                            width: '50%',
                            alignment: 'center-left',
                            widgets: [

                                {
                                    id: 'haysUserGroupsByGroupsGridTableText-01',
                                    type: TextWidget,
                                    titleAlignment: 'start',
                                    width: 400,
                                    marginLeft: 15,
                                }
                            ]
                        },

                        {
                            id: 'haysUserGroupsByGroupsGridTableCell-02',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupsByGroupsGridTableCell2Toggle',
                                    type: ToggleWidget,
                                    width: '100%',
                                    iconOff: 'icon-x-rectangle',
                                    icon: 'icon-check-rectangle',
                                    value: 0,
                                    skin: 'switch_hays'
                                },
                            ]
                        },

                        {
                            id: 'haysUserGroupsByGroupsGridTableCell-03',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '10%',
                            widgets: [
                                 {
                                    id: 'haysUserGroupsByGroupsGridTableCell3Toggle',
                                    type: ToggleWidget,
                                    width: '100%',
                                    iconOff: 'icon-x-rectangle',
                                    icon: 'icon-check-rectangle',
                                    value: 0,
                                    skin: 'switch_hays'
                                },
                            ]
                        },

                        {
                            id: 'haysUserGroupsByGroupsGridTableCell-04',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupsByGroupsGridTableCell4Toggle',
                                    type: ToggleWidget,
                                    width: '100%',
                                    iconOff: 'icon-x-rectangle',
                                    icon: 'icon-check-rectangle',
                                    value: 0,
                                    skin: 'switch_hays'
                                },
                            ]
                        },

                        {
                            id: 'haysUserGroupsByGroupsGridTableCell-05',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupsByGroupsGridTableCell5Button',
                                    type: ButtonWidget,
                                    width: '100%',
                                    icon: 'icon-trash',
                                    skin: 'gridtableicon'
                                },
                            ]
                        },

                         {
                            id: 'haysUserGroupsByGroupsGridTableCell-6',
                            type: GridTableCellWidget,
                            alignment: 'center-center',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupsByGroupsGridTableCell6Button',
                                    type: ButtonWidget,
                                    width: '100%',
                                    icon: 'icon-chevron-right',
                                    skin: 'gridtableicon'
                                },
                            ]
                        },


                    ]
                },
    ]
}
,

haysUserGroupHierarchy:
{
    id: 'haysUserGroupHierarchy',
    type: PageWidget,
    widgets:
    [
        {
            id: 'haysUserGroupHierarchy',
            type: GridWidget,
            marginLeft: '10',
            marginRight: '10',
            width: '100%',
            widgets: [
                {
                    id: 'haysUserGroupHierarchyGridRow1',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    skin: 'bottomborder',
                    widgets: [
                        {
                            id: 'haysUserGroupHierarchyGridRow1Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: [

                                {
                                    id: 'haysUserGroupHierarchyGridRow1Cell1Button',
                                    type: ButtonWidget,
                                    label: '',
                                    width: '30',
                                    icon: 'icon-menu',
                                    skin: 'backbuttonhays',
                                    height: '30'
                                }]
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow1Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            width: '25%',
                            widgets: [

                                {
                                    id: 'haysUserGroupHierarchyGridRow1Cell2Text',
                                    type: TextWidget,
                                    title: 'User Group',
                                    width: '100%',
                                    skin: 'menu',
                                    titleFontSize: 36,
                                    titleFontColor: '#000000',
                                }
                            ]
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow1Cell3',
                            type: GridCellWidget,
                            marginLeft: '10',
                            marginRight: '0',
                            marginTop: '0',
                            alignment: 'top-right',
                            width: '62%',
                            skin: '',
                            height: '0',
                            widgets: []
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow1Cell4',
                            type: GridCellWidget,
                            marginLeft: '5',
                            marginRight: '0',
                            marginTop: '1%',
                            alignment: 'top-center',
                            width: '10%',
                            height: '0',
                            widgets: [

                                {
                                    id: 'haysUserGroupHierarchyGridRow1Cell4Button',
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
                                    icon: 'icon-user',
                                    skin: 'userpanelmain_hays',
                                }
                            ]
                        }

                    ]
                },

                {
                    id: 'haysUserGroupHierarchyGridRow2',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysUserGroupHierarchyGridRow2Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '15%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchyGridRow2Cell1Textbox',
                                    type: TextBoxWidget,
                                    title: 'User Group Name',
                                    titleFontSize: '13px',
                                    titleTextAlignment: 'left',
                                    titleVisible: true,
                                    textAlignment: 'left',
                                    textFontSize: '16px',
                                    width: '260px',
                                    height: '40px',
                                    visible: true,
                                    defaultText: 'Custom Group A',
                                    skin: 'custom_group'

                                }
                            ]
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow2Cell2',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '55%',
                            widgets: []
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow2Cell3',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchyGridRow2Cell2Button',
                                    type: ButtonWidget,
                                    skin: 'material_haysred',
                                    label: 'Delete'
                                }
                            ]
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow2Cell4',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchyGridRow2Cell2Button',
                                    type: ButtonWidget,
                                    skin: 'material_hayslight',
                                    label: 'Cancel'
                                }
                            ]
                        },
                        {
                            id: 'haysUserGroupHierarchyGridRow2Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchyGridRow2Cell2Button',
                                    type: ButtonWidget,
                                    skin: 'material_hays',
                                    label: 'Save'
                                }
                            ]
                        }
                    ]
                },

                {
                    id: 'haysUserGroupHierarchyGridRow3',
                    type: GridRowWidget,
                    marginTop: '1.3%',
                    marginBottom: '0%',
                    width: '100%',
                    height: '10%',
                    widgets: [
                        {
                            id: 'haysUserGroupsGridRow3Cell1',
                            type: GridCellWidget,
                            alignment: 'bottom',
                            marginTop: '7px',
                            marginLeft: '1%',
                            width: '3%',
                            widgets: []
                        }
                    ]
                },
            ]
        },

        {
            id: 'haysUserGroupHierarchyDeleteDataGridTablePopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            width: '240',
            height: '200',
            bgScrollable: true,
            fixed: true,
            heightFixed: false,
            behaviour: 'popup',
            position: 'top',
            skin: '',
            fadingSpeed: 0,
            offset: 260,
            widgets: [
                {
                    id: 'haysUserGroupHierarchyDeleteDataGridTablePopupGrid',
                    type: GridWidget,
                    width: '100%',
                    widgets: [
                        {
                            id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow1',
                            type: GridRowWidget,
                            skin: '',
                            marginTop: '4%',
                            paddingBottom: 10,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchyDeleteDataGridTablePopupGridRow1Cell1',
                                    type: GridCellWidget,
                                    width: '100%',
                                    alignment: 'center-center',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupHierarchyDeleteDataGridTablePopupGridRow1Cell1Text',
                                            type: TextWidget,
                                            fontBold: true,
                                            fontSize: 16,
                                            skin: 'delete',
                                            title: 'Delete User Group',
                                            icon: 'icon-trash'
                                        },
                                    ]
                                }
                                ,

                            ]
                        },

                        {
                            id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow2',
                            type: GridRowWidget,
                            skin: '',
                            width: '100%',
                            marginLeft: '30%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow2Text',
                                    type: TextWidget,
                                    title: 'Are you sure?',
                                    skin: 'delete_message'
                                }
                            ]
                        },

                        {
                            id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow3',
                            type: GridRowWidget,
                            skin: '',
                            width: '100%',
                            marginLeft: '10%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow3Text',
                                    type: TextWidget,
                                    title: 'The action cannot be undone.',
                                    skin: 'delete_message'
                                }
                            ]
                        },

                        {
                            id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow4',
                            type: GridRowWidget,
                            skin: '',
                            marginTop: '4%',
                            paddingBottom: 10,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow4Cell1',
                                    type: GridCellWidget,
                                    width: '40%',
                                    marginLeft: '15px',
                                    height: '50px',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow4Cell1Button',
                                            type: ButtonWidget,
                                            height: '40px',
                                            label: 'Cancel',
                                            skin: 'delete_hayslight'
                                        }
                                    ]
                                },
                                {
                                    id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow4Cell2',
                                    type: GridCellWidget,
                                    width: '40%',
                                    marginLeft: '80px',
                                    marginRight: '10px',
                                    height: '50px',
                                    widgets: [
                                        {
                                            id: 'haysUserGroupHierarchylDeleteDataGridTablePopupGridRow4Cell2Button',
                                            type: ButtonWidget,
                                            height: '40px',
                                            label: 'Delete',
                                            skin: 'delete_haysred'
                                        }
                                    ]


                                }
                            ]
                        }

                    ]
                },

            ]
        },
    ]
}

}
;