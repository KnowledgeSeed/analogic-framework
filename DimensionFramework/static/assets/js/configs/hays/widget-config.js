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
                                            icon: 'icon-people-square-stack',
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
                                            icon: 'icon-table',
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
                                            icon: 'icon-settings',
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
    haysKamForecasting: {
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
                                        skin: 'backbuttonhays',
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
                    {
                        id: 'haysKamForecastingGridRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        width: '100%',
                        skin: '',
                        widgets: [

                            {
                                id: 'haysKamForecastingGridRow2Cell1',
                                type: GridCellWidget,
                                marginLeft: '1',
                                marginTop: '0',
                                marginBottom: '0',
                                width: '5.5%',
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
                                width: '7.2%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'haysKamForecastingGridRow2Cell2Button1',
                                        type: ButtonWidget,
                                        label: 'Business Unit 1',
                                        action: '',
                                        width: '130',
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
                                width: '5.6%',
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
                                width: '6.7%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'haysKamForecastingGridRow2Cell4Button1',
                                        type: ButtonWidget,
                                        label: 'Department 1',
                                        action: '',
                                        width: '120',
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
                                width: '5.6%',
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
                                width: '8%',
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
                                marginLeft: '1',
                                marginTop: '0',
                                marginBottom: '0',
                                width: '9%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'haysKamForecastingGridRow2Cell7Button1',
                                        type: ButtonWidget,
                                        label: 'Version: July Revision B',
                                        action: '',
                                        width: '191',
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
                                width: '39.4%',
                                alignment: 'center-left',
                                widgets: []
                            },
                            {
                                id: 'haysKamForecastingGridRow2Cell9',
                                type: GridCellWidget,
                                marginLeft: '1',
                                marginTop: '0',
                                marginBottom: '0',
                                width: '6%',
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
                        height: '100',
                        widgets: [
                            {
                                id: 'haysKamForecastingGridTable',
                                type: GridTableWidget,
                                width: '80%',
                                title: '',
                                visible: true,
                                applyMeasuresToSection: true,
                                widgets: [
                                    {
                                        id: 'haysKamForecastingGridTableRow2Cell1',
                                        type: GridTableCellWidget,
                                        width: '20%',
                                        widgets: [
                                            {
                                                id: 'haysKamForecastingGridTableRow2Cell1Text',
                                                type: TextWidget,
                                                width: '100%',
                                                depends: [{'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'}]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'haysKamForecastingGridTableRow2Cell2',
                                        type: GridTableCellWidget,
                                        width: '20%',
                                        widgets: [
                                            {
                                                id: 'haysKamForecastingGridTableRow2Cell2Text',
                                                type: TextWidget,
                                                width: '100%',
                                                depends: [{'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'}]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'haysKamForecastingGridTableRow2Cell1',
                                        type: GridTableCellWidget,
                                        width: '20%',
                                        widgets: [
                                            {
                                                id: 'haysKamForecastingGridTableRow2Cell3Text',
                                                type: TextWidget,
                                                width: '100%',
                                                depends: [{'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'}]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'haysKamForecastingGridTableRow2Cell4',
                                        type: GridTableCellWidget,
                                        width: '20%',
                                        widgets: [
                                            {
                                                id: 'haysKamForecastingGridTableRow2Cell4Text',
                                                type: TextWidget,
                                                width: '100%',
                                                depends: [{'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'}]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'haysKamForecastingGridTableRow2Cell5',
                                        type: GridTableCellWidget,
                                        width: '20%',
                                        widgets: [
                                            {
                                                id: 'haysKamForecastingGridTableRow2Cell5Text',
                                                type: TextWidget,
                                                width: '100%',
                                                depends: [{'event': 'choose.haysKamForecastingFilterPopUpDropdown.finished'}]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'haysKamForecastingGridRow4Cell2',
                                type: GridCellWidget,
                                width: '20%',
                                alignment: 'top-left',
                                widgets: [
                                    {
                                        id: 'haysKamForecastingGridRow4Cell2Button',
                                        type: ButtonWidget,
                                        width: '40px',
                                        height: '40px',
                                        skin: 'pont_button',
                                        icon: 'icon-badge'
                                    }
                                ]
                            }
                        ]
                    }
                ]


            },

            {
                id: 'haysKamForecastingDepartmentPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '170',
                heiht: '600',
                bgScrollable: true,
                fixed: true,
                heightFixed: false,
                behaviour: 'popup',
                skin: 'departurement_popup_hays',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'haysKamForecastingDepartmentPopUpGridTable',
                        type: GridTableWidget,
                        hideIfNoData: true,
                        visible: true,
                        skin: '',
                        listen: [],
                        width: '100%',
                        marginBottom: '10%',
                        title: '',
                        widgets: [
                            {
                                id: 'haysKamForecastingDepartmentPopUpGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '100%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'haysKamForecastingDepartmentPopUpGridTableButton01',
                                        type: ButtonWidget,
                                        width: '100%',
                                        borderWidth: false,
                                        applyMeasuresToSection: true,
                                        marginBottom: '4%',
                                        marginTop: '4%',
                                        label: '',
                                        iconPosition: 'right',
                                        fontBold: true,
                                        action: '',
                                        icon: 'icon-chevron-open-horizontal',
                                        fontSize: '16px',
                                        skin: 'departurement_popup',
                                        iconColor: '#007BFF',
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },

            {
                id: 'haysKamForecastingBusinessPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '170',
                heiht: '600',
                bgScrollable: true,
                fixed: true,
                heightFixed: false,
                behaviour: 'popup',
                skin: 'business_popup_hays',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'haysKamForecastingBusinessPopUpGridTable',
                        type: GridTableWidget,
                        hideIfNoData: true,
                        visible: true,
                        skin: '',
                        listen: [],
                        width: '100%',
                        marginBottom: '10%',
                        title: '',
                        widgets: [
                            {
                                id: 'haysKamForecastingBusinessPopUpGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '100%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'haysKamForecastingBusinessPopUpGridTableButton01',
                                        type: ButtonWidget,
                                        width: '100%',
                                        borderWidth: false,
                                        applyMeasuresToSection: true,
                                        marginBottom: '4%',
                                        marginTop: '4%',
                                        label: '',
                                        iconPosition: 'right',
                                        fontBold: true,
                                        action: '',
                                        icon: 'icon-chevron-open-horizontal',
                                        fontSize: '16px',
                                        skin: 'departurement_popup',
                                        iconColor: '#007BFF',
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },

            {
                id: 'haysKamForecastingAreaPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '170',
                heiht: '600',
                bgScrollable: true,
                fixed: true,
                heightFixed: false,
                behaviour: 'popup',
                skin: 'area_popup_hays',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'haysKamForecastingAreaPopUpGridTable',
                        type: GridTableWidget,
                        hideIfNoData: true,
                        visible: true,
                        skin: '',
                        listen: [],
                        width: '100%',
                        marginBottom: '10%',
                        title: '',
                        widgets: [
                            {
                                id: 'haysKamForecastingAreaPopUpGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '100%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'haysKamForecastingAreaPopUpGridTableButton01',
                                        type: ButtonWidget,
                                        width: '100%',
                                        borderWidth: false,
                                        applyMeasuresToSection: true,
                                        marginBottom: '4%',
                                        marginTop: '4%',
                                        label: '',
                                        iconPosition: 'right',
                                        fontBold: true,
                                        action: '',
                                        icon: 'icon-chevron-open-horizontal',
                                        fontSize: '16px',
                                        skin: 'departurement_popup',
                                        iconColor: '#007BFF',
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },

            {
                id: 'haysKamForecastingTeamPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '170',
                heiht: '600',
                bgScrollable: true,
                fixed: true,
                heightFixed: false,
                behaviour: 'popup',
                skin: 'team_popup_hays',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'haysKamForecastingTeamPopUpGridTable',
                        type: GridTableWidget,
                        hideIfNoData: true,
                        visible: true,
                        skin: '',
                        listen: [],
                        width: '100%',
                        marginBottom: '10%',
                        title: '',
                        widgets: [
                            {
                                id: 'haysKamForecastingTeamPopUpGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '100%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'haysKamForecastingTeamPopUpGridTableButton01',
                                        type: ButtonWidget,
                                        width: '100%',
                                        borderWidth: false,
                                        applyMeasuresToSection: true,
                                        marginBottom: '4%',
                                        marginTop: '4%',
                                        label: '',
                                        iconPosition: 'right',
                                        fontBold: true,
                                        action: '',
                                        icon: 'icon-chevron-open-horizontal',
                                        fontSize: '16px',
                                        skin: 'departurement_popup',
                                        iconColor: '#007BFF',
                                    }
                                ]
                            }
                        ]
                    },
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
                        id: 'haysKamForecastingFilterPopUpCell1',
                        type: GridCellWidget,
                        alignment: 'bottom-left',
                        width: '21%',
                        widgets: [
                            {
                                id: 'haysKamForecastingFilterPopUpCell1SearchBox',
                                type: TextBoxWidget,
                                width: '170px',
                                skin: 'searchbox',
                                titleFontColor: '#747b85',
                                textFontSize: '14',
                            }
                        ]
                    },
                    {
                        id: 'haysKamForecastingFilterPopUpDropdown',
                        type: DropBoxWidget,
                        multiSelect: true,
                        skin: 'filter_selector'
                    }
                ]
            },

            {
                id: 'haysKamForecastingPontPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '190',
                height: '250px',
                bgScrollable: true,
                fixed: true,
                heightFixed: false,
                behaviour: 'popup',
                skin: 'departurement_popup_hays',
                fadingSpeed: 0,
                position: 'bottom',
                widgets: []
            }

        ]
    },

    haysForecastingHierarchy: {
        id: 'haysForecastingHierarchy',
        type: PageWidget,
        widgets: [
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
                                alignment: 'top-left',
                                width: '3%',
                                widgets: [

                                    {
                                        id: 'haysForecastingHierarchyGridRow1Cell1Button',
                                        type: ButtonWidget,
                                        label: '',
                                        width: '50',
                                        icon: 'icon-menu',
                                        skin: 'backbuttonhays',
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
                                        icon: 'icon-user',
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

    haysArbeitsbericht: {
        id: 'haysArbeitsbericht',
        type: PageWidget,
        widgets: [
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
                                alignment: 'top-left',
                                width: '3%',
                                widgets: [

                                    {
                                        id: 'haysArbeitsberichtGridRow1Cell1Button',
                                        type: ButtonWidget,
                                        label: '',
                                        width: '50',
                                        icon: 'icon-menu',
                                        skin: 'backbuttonhays',
                                        height: '45'
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
                                width: '16%',
                                skin: '',
                                height: '0',
                                widgets: []
                            },
                            {
                                id: 'haysArbeitsberichtGridRow1Cell4',
                                type: GridCellWidget,
                                alignment: 'center',
                                width: '15%',
                                widgets: [

                                    {
                                        id: 'haysArbeitsberichtYearSegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '100%',
                                        skin: 'segmented',
                                        marginBottom: 5,
                                        widgets: [

                                            {
                                                id: 'haysArbeitsberichtSegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                selected: true,
                                                label: 'By Search History',
                                            },
                                            {
                                                id: 'haysArbeitsberichtSegmentedControlItem2',
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
                                id: 'haysArbeitsberichtGridRow1Cell5',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '31%',
                                skin: '',
                                height: '0',
                                widgets: []
                            },
                            {
                                id: 'haysArbeitsberichtGridRow1Cell6',
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
                                width: '5.5%',
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
                                width: '7.2%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'haysArbeitsberichtGridRow2Cell2Button1',
                                        type: ButtonWidget,
                                        label: 'Business Unit 1',
                                        action: '',
                                        width: '130',
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
                                width: '5.6%',
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
                                width: '6.7%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'haysArbeitsberichtGridRow2Cell4Button1',
                                        type: ButtonWidget,
                                        label: 'Department 1',
                                        action: '',
                                        width: '120',
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
                                width: '5.6%',
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
                                width: '8%',
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
                                marginLeft: '1',
                                marginTop: '0',
                                marginBottom: '0',
                                width: '9%',
                                alignment: 'center-left',
                                widgets: []
                            },


                            {
                                id: 'haysArbeitsberichtGridRow2Cell8',
                                type: GridCellWidget,
                                marginLeft: '1',
                                marginTop: '0',
                                marginBottom: '0',
                                width: '39.4%',
                                alignment: 'center-left',
                                widgets: []
                            },


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
                                            skin: 'backbuttonhays',
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
                                            skin: 'backbuttonhays',
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
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'haysSettingsGridRow2Cell1Button',
                                            type: ButtonWidget,
                                            label: '',
                                            width: '50',
                                            icon: 'icon-menu',
                                            skin: 'backbuttonhays',
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