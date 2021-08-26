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
                                    width: '75%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },


                                {
                                    id: 'haysMainRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '20px',
                                    marginTop: '30px',
                                    width: '15%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'haysMainRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#F2F2F2',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '115px',
                                            height: '40px',
                                            icon: 'icon-profile',
                                            fontSize: 14,
                                            skin: 'userpanelmain_hays',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'haysMainGridRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'haysMainRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '28%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                },

                                {
                                    id: 'haysMainGridRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    alignment: 'top-center',
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
                                    width: '57%',
                                    skin: '',
                                    height: '18%',
                                    widgets: []
                                }

                            ]
                        },
                        {
                            id: 'haysMainRow3',
                            type: GridRowWidget,
                            marginTop: '1.6%',
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
                                            icon: 'icon-menu',
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
                                            icon: 'icon-menu',
                                            fontColor: 'white',
                                            skin: 'haysmain_blue',
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
                                            icon: 'icon-menu',
                                            fontColor: 'white',
                                            skin: 'haysmain_red',
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
                            marginTop: '1.3%',
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
                                            title: 'KAM FC as Leader',
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
                                            icon: 'icon-menu',
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
                                            icon: 'icon-menu',
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

                        },
                        {
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
                        },
                        {
                            id: 'haysMainRow7',
                            type: GridRowWidget,
                            width: '100%',
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
                                    widgets:[]
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
                                            icon: 'icon-menu',
                                            fontColor: 'white',
                                            skin: 'haysmain_grey',
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
                            marginTop: '1.3%',
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
                        }

                    ]
                }

            ]
        },
    haysKamForecasting:
        {
         id: 'haysKamForecasting',
         type: PageWidget,
         widgets: [
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
                                 alignment: 'top-center',
                                 width: '3%',
                                 widgets: [

                                     {
                                         id: 'haysKamForecastingGridRow1Cell1Button',
                                         type: ButtonWidget,
                                         label: '',
                                         width: '50',
                                         icon: 'icon-menu',
                                         skin: 'backbuttonrocheBPSP',
                                         height: '45'
                                     }]
                             },
                             {
                                 id: 'haysKamForecastingGridRow1Cell2',
                                 type: GridCellWidget,
                                 alignment: 'top-left',
                                 width: '25%',
                                 widgets: [

                                     {
                                         id: 'haysKamForecastingGridRow1Cell2Text',
                                         type: TextWidget,
                                         title: 'KAM Forecasting',
                                         width: '100%',
                                         skin: 'menu',
                                         titleAlignment: 'top',
                                         titleFontSize: 30,
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
                 ]
             },
             {
                 id: 'haysKamForecastingGrid',
                 type: GridWidget,
                 marginLeft: '10',
                 marginRight: '10',
                 width: '100%',
                 widgets: [
                     {
                         id: 'haysKamForecastingGridTable',
                         type: GridTableWidget,
                         title: 'Filter',
                         marginTop: '20px',
                         marginBottom: '20px',
                         width: '62.5%',
                         visible: true,
                         listen: [],
                         widgets: [
                             {
                                 id: 'haysKamForecastingGridTableRow1',
                                 type: GridTableHeaderRowWidget,
                                 width: '100%',
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingGridTableRow1Cell1',
                                         type: GridTableHeaderCellWidget,
                                         width: '20%',
                                         visible: true,
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingGridTableRow1Cell1Text',
                                                 type: TextWidget,
                                                 width: '100%',
                                             }
                                         ]

                                     },
                                     {
                                         id: 'haysKamForecastingGridTableRow1Cell2',
                                         type: GridTableHeaderCellWidget,
                                         width: '20%',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingGridTableRow1Cell2Text',
                                                 type: TextWidget,
                                                 width: '100%',
                                             }
                                         ]

                                     },
                                     {
                                         id: 'haysKamForecastingGridTableRow1Cell3',
                                         type: GridTableHeaderCellWidget,
                                         width: '20%',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingGridTableRow1Cell3Text',
                                                 type: TextWidget,
                                                 width: '100%',
                                             }
                                         ]

                                     },
                                     {
                                         id: 'haysKamForecastingGridTableRow1Cell4',
                                         type: GridTableHeaderCellWidget,
                                         width: '20%',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingGridTableRow1Cell4Text',
                                                 type: TextWidget,
                                                 width: '100%',
                                             }
                                         ]

                                     },
                                     {
                                         id: 'haysKamForecastingGridTableRow1Cell5',
                                         type: GridTableHeaderCellWidget,
                                         width: '20%',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingGridTableRow1Cell5Text',
                                                 type: TextWidget,
                                                 width: '100%'
                                             }
                                         ]

                                     }

                                 ]
                             },
                             {
                                 id: 'haysKamForecastingGridTableRow2Cell1',
                                 type: GridTableCellWidget,
                                 width: '20%',
                                 skin: 'greyfon',
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingGridTableRow2Cell1Text',
                                         type: TextWidget
                                     }
                                     ]

                             },
                             {
                                 id: 'haysKamForecastingGridTableRow2Cell2',
                                 type: GridTableCellWidget,
                                 width: '20%',
                                 skin: 'greyfon',
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingGridTableRow2Cell2Text',
                                         type: TextWidget
                                     }
                                     ]

                             },
                             {
                                 id: 'haysKamForecastingGridTableRow2Cell3',
                                 type: GridTableCellWidget,
                                 width: '20%',
                                 skin: 'greyfon',
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingGridTableRow2Cell3Text',
                                         type: TextWidget
                                     }
                                     ]

                             },
                             {
                                 id: 'haysKamForecastingGridTableRow2Cell4',
                                 type: GridTableCellWidget,
                                 width: '20%',
                                 skin: 'greyfon',
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingGridTableRow2Cell4Text',
                                         type: TextWidget
                                     }
                                     ]

                             },
                             {
                                 id: 'haysKamForecastingGridTableRow2Cell5',
                                 type: GridTableCellWidget,
                                 width: '20%',
                                 skin: 'simpanel',
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingGridTableRow2Cell5Text',
                                         type: TextWidget
                                     }
                                     ]

                             }
                         ]

                     }

                     /*{
                         id: 'haysKamForecastingFilterContainer',
                         type: ContainerWidget,
                         anchorVisible: false,
                         anchorOnClick: true,
                         backdrop: true,
                         visible: true,
                         closeBtn: false,
                         width: 270,
                         height: 240,
                         bgScrollable: true,
                         fixed: true,
                         behaviour: 'popup',
                         position: 'top-left',
                         skin: 'popup_hays ',
                         fadingSpeed: 0,
                         widgets: [
                             {
                                 id: 'haysKamForecastingFilterContainerGrid',
                                 type: GridWidget,
                                 width: 270,
                                 widgets: [
                                     {
                                         id: 'haysKamForecastingFilterContainerGridRow1',
                                         type: GridRowWidget,
                                         paddingBottom: 15,
                                         width: 270,
                                         alignment: 'top-center',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingFilterContainerGridRow1Cell1',
                                                 type: GridCellWidget,
                                                 width: '100%',
                                                 alignment: 'center',
                                                 widgets: [
                                                     {
                                                         id: 'haysKamForecastingFilterContainerGridCell1SearchBox',
                                                         type: TextBoxWidget,
                                                         width: 240,
                                                         skin: 'searchbox',
                                                         titleFontColor: '#747b85',
                                                         textFontSize: '14',
                                                     }
                                                 ]
                                             }
                                         ]
                                     },
                                     {
                                         id: 'haysKamForecastingFilterContainerGridRow2',
                                         type: GridRowWidget,
                                         width: 270,
                                         alignment: 'top-center',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingFilterContainerGridRow2Cell1',
                                                 type: GridCellWidget,
                                                 width: 270,
                                                 alignment: 'center',
                                                 widgets: [
                                                     {
                                                         id: 'haysKamForecastingFilterContainerGridRow2GridCell1Button',
                                                         type: ButtonWidget,
                                                         label: 'Contract',
                                                         width: 240,
                                                         skin: 'filter_container_button',
                                                         textFontSize: '14',
                                                         icon: 'icon-menu'
                                                     }
                                                 ]
                                             }

                                         ]
                                     },
                                     {
                                         id: 'haysKamForecastingFilterContainerGridRow3',
                                         type: GridRowWidget,
                                         width: 270,
                                         alignment: 'top-center',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingFilterContainerGridRow3Cell1',
                                                 type: GridCellWidget,
                                                 width: 270,
                                                 alignment: 'center',
                                                 widgets: [
                                                     {
                                                         id: 'haysKamForecastingFilterContainerGridRow3GridCell1Button',
                                                         type: ButtonWidget,
                                                         label: 'Permanent',
                                                         width: 240,
                                                         skin: 'filter_container_button',
                                                         textFontSize: '14',
                                                         icon: 'icon-menu'
                                                     }
                                                 ]
                                             }

                                         ]
                                     },
                                     {
                                         id: 'haysKamForecastingFilterContainerGridRow4',
                                         type: GridRowWidget,
                                         width: 270,
                                         alignment: 'top-center',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingFilterContainerGridRow4Cell1',
                                                 type: GridCellWidget,
                                                 width: 270,
                                                 alignment: 'center',
                                                 widgets: [
                                                     {
                                                         id: 'haysKamForecastingFilterContainerGridRow4GridCell1Button',
                                                         type: ButtonWidget,
                                                         label: 'Temp',
                                                         width: 240,
                                                         skin: 'filter_container_button',
                                                         textFontSize: '14',
                                                         icon: 'icon-menu'
                                                     }
                                                 ]
                                             }

                                         ]
                                     },
                                     {
                                         id: 'haysKamForecastingFilterContainerGridRow5',
                                         type: GridRowWidget,
                                         width: 270,
                                         alignment: 'top-center',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingFilterContainerGridRow5Cell1',
                                                 type: GridCellWidget,
                                                 width: 270,
                                                 alignment: 'center',
                                                 widgets: [
                                                     {
                                                         id: 'haysKamForecastingFilterContainerGridRow5GridCell1Button',
                                                         type: ButtonWidget,
                                                         label: 'Sonstige',
                                                         width: 240,
                                                         skin: 'filter_container_button',
                                                         textFontSize: '14',
                                                         icon: 'icon-menu'
                                                     }
                                                 ]
                                             }

                                         ]
                                     },
                                     {
                                         id: 'haysKamForecastingFilterContainerGridRow6',
                                         type: GridRowWidget,
                                         width: 270,
                                         alignment: 'top-center',
                                         widgets: [
                                             {
                                                 id: 'haysKamForecastingFilterContainerGridRow6Cell1',
                                                 type: GridCellWidget,
                                                 width: 270,
                                                 alignment: 'center',
                                                 widgets: [
                                                     {
                                                         id: 'haysKamForecastingFilterContainerGridRow6GridCell1Button',
                                                         type: ButtonWidget,
                                                         label: 'TBA',
                                                         width: 240,
                                                         skin: 'filter_container_button',
                                                         textFontSize: '14',
                                                         icon: 'icon-menu'
                                                     }
                                                 ]
                                             }

                                         ]
                                     }
                                 ]
                             }
                         ]
                     }*/
                 ]
             }
             ]
    },

    haysForecastingHierarchy:
        {
        id: 'haysForecastingHierarchy',
        type:PageWidget,
        widgets: [
            {
                id: 'haysForecastingHierarchy',
                type:GridWidget,
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
                                    alignment: 'top-left',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'haysForecastingHierarchyGridRow1Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-menu',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '45'
                                        }]
                                },
                                {
                                    id: 'haysForecastingHierarchyGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '25%',
                                    widgets: [

                                        {
                                            id: 'haysForecastingHierarchyGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: 'ForecastingHierarchy',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'left',
                                            titleFontSize: 30,
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
                                            icon: 'icon-profile',
                                            skin: 'userpanelmain_hays',
                                        }
                                    ]
                                }

                            ]
                    }
                    ]
            }
        ]


    },

    haysArbeitsbericht:
        {
        id: 'haysArbeitsbericht',
        type:PageWidget,
        widgets: [
            {
                id: 'haysArbeitsbericht',
                type:GridWidget,
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
                                    alignment: 'top-left',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtGridRow1Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-menu',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '35'
                                        }]
                                },
                                {
                                    id: 'haysArbeitsberichtGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '25%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: 'Arbeitsbericht',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'left',
                                            titleFontSize: 30,
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
                                    width: '62%',
                                    skin: '',
                                    height: '0',
                                    widgets: []
                                },
                                {
                                    id: 'haysArbeitsberichtGridRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtGridRow1Cell4Button',
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
                                            skin: 'userpanelmain_hays',
                                        }
                                    ]
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
                                    alignment: 'top-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtPivotGridRow1Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-menu',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '35'
                                        }]
                                },
                                {
                                    id: 'haysArbeitsberichtPivotGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-center',
                                    width: '25%',
                                    widgets: [

                                        {
                                            id: 'haysArbeitsberichtPivotGridRow1Cell2Text',
                                            type: TextWidget,
                                            title: 'Arbeitsbericht Pivot',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'left',
                                            titleFontSize: 30,
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
                                    width: '55%',
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
                                            backgroundColor: '#F2F2F2',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '115px',
                                            height: '40px',
                                            icon: 'icon-profile',
                                            fontSize: 14,
                                            skin: 'userpanelmain_hays',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
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
                                    id: 'haysZEGBerichtGridRow1Cell1',
                                    type: GridCellWidget,
                                    alignment: 'top-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysZEGBerichtGridRow1Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-menu',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '35'
                                        }]
                                },
                            {
                                    id: 'haysZEGBerichtGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom-center',
                                    width: '20%',
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
                                },
                                {
                                    id: 'haysZEGBerichtGridRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '60%',
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
                                            backgroundColor: '#F2F2F2',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '115px',
                                            height: '40px',
                                            icon: 'icon-profile',
                                            fontSize: 14,
                                            skin: 'userpanelmain_hays',
                                        }
                                    ]
                                }
                            ]
                        }
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
                                            backgroundColor: '#F2F2F2',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '115px',
                                            height: '40px',
                                            icon: 'icon-profile',
                                            fontSize: 14,
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
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-menu',
                                            skin: 'backbuttonrocheBPSP',
                                            height: '50'
                                        }]
                                },
                            {
                                    id: 'haysSettingsGridRow2Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-center',
                                    width: '10%',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow2Cell2Text',
                                            type: TextWidget,
                                            title: 'Settings',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 32,
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