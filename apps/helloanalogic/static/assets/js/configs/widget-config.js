/* global app */

'use strict';

WidgetConfig = {
    analogicDemoMain:
        {
            id: 'analogicDemoMain',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoMainGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoMainRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow1Cell1Image',
                                            type: ImageWidget,
                                            //icon: 'icon-knowledgeseed_stratos',
                                            titleFontColor: '#AEAEB2',
                                            fileName: 'knowledgeseed_stratos.png',
                                            titleFontSize: '22px',
                                            width: 200,
                                            height: 60
                                        },
                                        {
                                            id: 'analogicDemoMainRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-logo-analogicDemore1',
                                            iconColor: '#627D77',
                                            height: 40,
                                            title: 'Analogic Demo',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'center-right',
                                    width: '34%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'center-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'center-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'center-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'center-center',
                                    width: '10%',
                                    height: '40',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow2',
                            type: GridRowWidget,
                            marginTop: '3.5%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '25.5%',
                                    skin: '',
                                    height: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainGridRow2Cell2Text1',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24',
                                            titleAlignment: 'left',
                                            titleFontColor: '#ACADAE',
                                            title: 'Volume Planning',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainGridRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    alignment: 'top-right',
                                    width: '19.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainGridRow2Cell2Text2',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24',
                                            titleAlignment: 'left',
                                            titleFontColor: '#ACADAE',
                                            title: 'Tools',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow2Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '290',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-left',
                                    skin: '',
                                    width: '44.5%',
                                    height: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainGridRow2Cell2Text3',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24',
                                            titleAlignment: 'left',
                                            titleFontColor: '#ACADAE',
                                            title: 'Reporting',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow3',
                            type: GridRowWidget,
                            marginTop: '1.75%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow3Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow3Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow3Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-copy',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_blue',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow3Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    skin: 'rightborder',
                                    alignment: 'top-center',
                                    width: '14%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow3Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-rectangle-stack',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_red',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow3Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    skin: 'rightborder',
                                    alignment: 'top-center',
                                    width: '14%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow3Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-check-list',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_green',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow3Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '11%',
                                    skin: '',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow3Cell5Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-card-chart',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_purple',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow3Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '12%',
                                    skin: '',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow3Cell6Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-percent-target',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_pink',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow3Cell7',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '23%',
                                    skin: '',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow3Cell7Button',
                                            type: ButtonWidget,
                                            label: 'Tabulator Demo',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-grid',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_blue',
                                            height: '145'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow4',
                            type: GridRowWidget,
                            marginTop: '0.5%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow4Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '14%',
                                    height: '6%',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow4Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow4Cell2Text',
                                            type: TextWidget,
                                            title: 'Sales Units',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow4Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow4Cell3Text',
                                            type: TextWidget,
                                            title: 'Review Sales',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow4Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '16%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow4Cell4Text',
                                            type: TextWidget,
                                            title: 'Allocation',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow4Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '13.5%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow4Cell5Text',
                                            type: TextWidget,
                                            title: 'New Volumes',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow4Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '11%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow4Cell6Text',
                                            type: TextWidget,
                                            title: 'Plan Report',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow4Cell7',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '21.5%',
                                    height: '6%',
                                    widgets: []
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow5',
                            type: GridRowWidget,
                            marginTop: '0.75%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow5Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow5Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '62%',
                                    skin: 'bottomborder',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow5Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '23%',
                                    skin: '',
                                    widgets: []
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow6',
                            type: GridRowWidget,
                            marginTop: '1.5%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow6Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '22.5%',
                                    skin: '',
                                    height: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainGridRow6Cell2Text1',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24',
                                            titleAlignment: 'left',
                                            titleFontColor: '#ACADAE',
                                            title: 'Simulation',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainGridRow6Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    alignment: 'top-right',
                                    width: '27.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainGridRow6Cell2Text2',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24',
                                            titleAlignment: 'left',
                                            titleFontColor: '#ACADAE',
                                            title: 'Sales Planning',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow6Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '160',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-left',
                                    skin: '',
                                    width: '44.5%',
                                    height: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainGridRow6Cell2Text3',
                                            type: TextWidget,
                                            width: '100%',
                                            height: '24',
                                            titleAlignment: 'left',
                                            titleFontColor: '#ACADAE',
                                            title: 'External Reports',
                                            skin: 'menu',
                                            titleFontSize: 24,
                                            titleFontWeight: 100
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow7',
                            type: GridRowWidget,
                            marginTop: '1.75%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow7Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow7Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow7Cell2Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-icon-main-risks-off',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_normal_red',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow7Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    skin: 'rightborder',
                                    alignment: 'top-center',
                                    width: '14%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow7Cell3Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-group',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_light_purple',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow7Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    skin: 'rightborder',
                                    alignment: 'top-center',
                                    width: '14%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow7Cell4Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-circle-grid-4',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_dark_gray',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow7Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '11%',
                                    skin: '',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow7Cell5Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-power-bi',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_yellow',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow7Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '12%',
                                    skin: '',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow7Cell6Button',
                                            type: ButtonWidget,
                                            label: '',
                                            action: '',
                                            width: '145',
                                            icon: 'icon-paw',
                                            fontColor: 'white',
                                            skin: 'analogicDemomain_light_blue',
                                            height: '145'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow7Cell7',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '23%',
                                    skin: '',
                                    widgets: []
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow8',
                            type: GridRowWidget,
                            marginTop: '0.5%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow8Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '14%',
                                    height: '6%',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow8Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow8Cell2Text',
                                            type: TextWidget,
                                            title: 'Risk Simulation',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow8Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '12%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow8Cell3Text',
                                            type: TextWidget,
                                            title: 'HR Simulation',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow8Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '16%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow8Cell4Text',
                                            type: TextWidget,
                                            title: 'Sales Planning',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow8Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '13.5%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow8Cell5Text',
                                            type: TextWidget,
                                            title: 'PowerBI Report',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow8Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '11%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow8Cell6Text',
                                            type: TextWidget,
                                            title: 'PAW Report',
                                            width: '100%',
                                            skin: 'menu',
                                            titleAlignment: 'center',
                                            titleFontSize: 16,
                                            titleFontColor: '#000000',
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow8Cell7',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '21.5%',
                                    height: '6%',
                                    widgets: []
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow9',
                            type: GridRowWidget,
                            marginTop: '1.75%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow9Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    skin: '',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow9Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '62%',
                                    skin: 'bottomborder',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoMainRow9Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '23%',
                                    skin: '',
                                    widgets: []
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoMainRow10',
                            type: GridRowWidget,
                            marginTop: '1%',
                            marginBottom: '0%',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoMainRow10Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-right',
                                    width: '28%',
                                    height: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow10Cell1Button',
                                            type: ButtonWidget,
                                            label: 'Sales Planning Schedule',
                                            width: '220px',
                                            skin: 'material_light',
                                            icon: 'icon-calendar'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoMainRow10Cell2',
                                    type: PanelWidget,
                                    marginLeft: 500,
                                    widgets: [
                                        {
                                            id: 'analogicDemoMainRow10Cell2Text1',
                                            type: TextWidget,
                                            height: 20,
                                            title: 'DEV Links:',
                                            skin: 'link_text',
                                            titleFontColor: '#000000'
                                        },
                                        {
                                            id: 'analogicDemoMainRow10Cell2Text2',
                                            type: ButtonWidget,
                                            skin: 'material_analogicDemo',
                                            height: 30,
                                            iconPosition: 'right',
                                            fontColor: '#009FDA',
                                            width: 210,
                                            iconFontSize: 16,
                                            label: 'KPI Financial Plan vs. Target',
                                            icon: 'icon-arrow-jump-circle',
                                        },
                                        {
                                            id: 'analogicDemoMainRow10Cell2Text3',
                                            type: ButtonWidget,
                                            height: 30,
                                            skin: 'material_analogicDemo',
                                            iconPosition: 'right',
                                            width: 190,
                                            iconFontSize: 16,
                                            fontColor: '#009FDA',
                                            label: 'Validation Status Report',
                                            icon: 'icon-arrow-jump-circle',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    analogicDemoAddCloneContract:
        {
            id: 'analogicDemoAddCloneContract',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoAddCloneContractGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoAddCloneContractRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'Sales Units',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            marginBottom: '24',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '89%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow2Cell1SearchBox',
                                            type: TextBoxWidget,
                                            height: 40,
                                            width: 400,
                                            defaultText: 'Search ...',
                                            skin: 'searchbox'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow2Cell2Button',
                                            type: ButtonWidget,
                                            icon: 'icon-check-on',
                                            label: 'Validate',
                                            width: '97px',
                                            skin: 'material_green_light'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractRow2Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow2Cell3Button',
                                            type: ButtonWidget,
                                            label: 'Save',
                                            width: '80px',
                                            icon: 'icon-check-on',
                                            skin: 'material_green'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractRow3',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractRow3Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractRow3Cell1Button',
                                            type: ButtonWidget,
                                            icon: 'icon-plus-circle',
                                            height: 40,
                                            width: 150,
                                            label: 'New Sales Unit',
                                            skin: 'material'
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                },
                {
                    id: 'analogicDemoAddCloneContractContractsTable',
                    type: GridTableWidget,
                    title: '',
                    skin: 'add_clone_analogicDemo',
                    marginTop: 30,
                    widgets: [
                        {
                            id: 'analogicDemoAddCloneContractContractsTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-0',//alert
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    width: '40px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-0',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '220px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-1',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Sales Unit'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '220px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-3',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '220px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-3',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '220px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-5',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '170px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-5',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '170px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-6',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-8',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '170px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-8',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-9',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '140px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-9',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-10',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '170px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-10',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-11',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '140px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-11',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Column Title'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableHeaderCell-12',//copy
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '90px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractContractsTableHeaderText-12',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            marginLeft: 10,
                                            title: 'Clone'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell0',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            width: '40px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableButton0',
                                    type: ButtonWidget,
                                    iconColor: '#DC3545'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '220px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText1',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginLeft: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell2',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '220px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText2',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '220px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText3',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '220px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText4',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell5',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '170px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText5',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell6',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '170px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText6',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell7',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '170px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText7',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell8',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '140px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText8',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell9',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            width: '170px',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText9',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 20
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell10',
                            type: GridTableCellWidget,
                            width: '140px',
                            cellSkin: 'grey_borders',
                            alignment: 'center-right',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableText10',
                                    type: TextWidget,
                                    skin: 'normal',
                                    marginRight: 20
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAddCloneContractContractsTableCell11',
                            type: GridTableCellWidget,
                            width: '90px',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractContractsTableButton11',
                                    type: ButtonWidget,
                                    iconColor: '#009FDA',
                                    icon: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoAddCloneContractClonePopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '240',
                    height: '180',
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
                            id: 'analogicDemoAddCloneContractClonePopupGrid',
                            type: GridWidget,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractClonePopupRow1',
                                    type: GridRowWidget,
                                    skin: '',
                                    marginTop: '4%',
                                    paddingBottom: 10,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractClonePopupRow1Cell1',
                                            type: GridCellWidget,
                                            width: '100%',
                                            alignment: 'center-center',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAddCloneContractClonePopupRow1Cell1Text',
                                                    type: TextWidget,
                                                    fontBold: true,
                                                    fontSize: 16,
                                                    skin: 'clone',
                                                    title: 'Clone Sales Unit',
                                                    icon: 'icon-copy'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractClonePopupRow2',
                                    type: GridRowWidget,
                                    skin: '',
                                    width: '100%',
                                    alignment: 'center',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractClonePopupRow2Text',
                                            type: TextWidget,
                                            title: '',
                                            skin: 'delete_message'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractClonePopupRow3',
                                    type: GridRowWidget,
                                    skin: '',
                                    marginTop: '4%',
                                    paddingBottom: 10,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractClonePopupRow3Cell1',
                                            type: GridCellWidget,
                                            width: '40%',
                                            marginLeft: '15px',
                                            height: '50px',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAddCloneContractClonePopupRow3Cell1Button',
                                                    type: ButtonWidget,
                                                    height: '40px',
                                                    width: '105px',
                                                    label: 'Cancel',
                                                    skin: 'material_light'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'analogicDemoAddCloneContractClonePopupRow3Cell2',
                                            type: GridCellWidget,
                                            width: '40%',
                                            marginLeft: '80px',
                                            marginRight: '10px',
                                            height: '50px',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAddCloneContractClonePopupRow3Cell2Button',
                                                    type: ButtonWidget,
                                                    height: '40px',
                                                    width: '105px',
                                                    label: 'Clone',
                                                    skin: 'material'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoAddCloneContractValidation',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '300',
                    height: '240',
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
                            id: 'analogicDemoAddCloneContractValidationGrid',
                            type: GridWidget,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractValidationRow1',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_pad',
                                    marginTop: '4%',
                                    marginBottom: '6%',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractValidationRow1Cell1',
                                            type: GridCellWidget,
                                            width: '100%',
                                            alignment: 'center-center',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAddCloneContractValidationRow1Cell1Text',
                                                    type: TextWidget,
                                                    fontBold: true,
                                                    fontSize: 16,
                                                    skin: 'delete',
                                                    title: 'Validation Errors',
                                                    icon: 'icon-alert'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractValidationRow2',
                                    type: GridRowWidget,
                                    skin: '',
                                    width: '100%',
                                    marginLeft: '8%',
                                    marginTop: '5px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractValidationRow2Text',
                                            type: TextWidget,
                                            title: '',
                                            skin: 'delete_message'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractValidationRow3',
                                    type: GridRowWidget,
                                    skin: 'bottomborder_pad',
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '6%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractValidationRow3Text1',
                                            type: TextWidget,
                                            marginLeft: '40%',
                                            title: 'Column 5',
                                            skin: 'delete_message'
                                        },
                                        {
                                            id: 'analogicDemoAddCloneContractValidationRow3Text2',
                                            type: TextWidget,
                                            marginLeft: '25%',
                                            titleFontColor: '#DC3545',
                                            title: 'Mandatory field is empty',
                                            skin: 'delete_message'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractValidationRow4',
                                    type: GridRowWidget,
                                    skin: '',
                                    marginTop: '4%',
                                    paddingBottom: 10,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractValidationRow4Cell1',
                                            type: GridCellWidget,
                                            width: '40%',
                                            marginLeft: '15px',
                                            height: '50px',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAddCloneContractValidationRow4Cell1Button',
                                                    type: ButtonWidget,
                                                    height: '40px',
                                                    label: 'Refresh',
                                                    width: '105px',
                                                    marginLeft: '20px',
                                                    skin: 'material_green_light'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'analogicDemoAddCloneContractValidationRow4Cell2',
                                            type: GridCellWidget,
                                            width: '40%',
                                            marginLeft: '80px',
                                            marginRight: '10px',
                                            height: '50px',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAddCloneContractValidationRow4Cell2Button',
                                                    type: ButtonWidget,
                                                    height: '40px',
                                                    width: '105px',
                                                    marginRight: '20px',
                                                    label: 'Close',
                                                    skin: 'material'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoAddCloneContractNewContractPopupPopup',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '280',
                    bgScrollable: true,
                    fixed: true,
                    height: '556',
                    behaviour: 'popup',
                    position: 'top',
                    fadingSpeed: 0,
                    offset: 180,
                    widgets: [
                        {
                            id: 'analogicDemoAddCloneContractNewContractPopupPopupGrid',
                            type: GridWidget,
                            marginTop: 5,
                            widgets: [
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow',
                                    type: GridRowWidget,
                                    skin: 'bottomborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupText',
                                            type: TextWidget,
                                            height: 30,
                                            titleFontWeight: '600',
                                            marginLeft: '75px',
                                            marginTop: '10px',
                                            width: 200,
                                            skin: '',
                                            borderWidth: 0,
                                            title: 'Add Sales Unit'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow2',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow2DropBox',
                                            type: DropBoxWidget,
                                            width: 260,
                                            skin: 'edit',
                                            visible: true,
                                            borderWidth: 0,
                                            title: 'Segment',
                                            items: []
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow3',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow3TextBox',
                                            type: TextBoxWidget,
                                            width: 260,
                                            defaultText: 'Add Name ...',
                                            marginTop: '15px',
                                            skin: 'custom_group',
                                            borderWidth: 0,
                                            title: 'Sales Unit Name'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow4',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow4DropBox',
                                            type: DropBoxWidget,
                                            borderWidth: 0,
                                            skin: 'edit',
                                            visible: true,
                                            width: 260,
                                            title: 'Type',
                                            items: []
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow5',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow5DropBox',
                                            type: DropBoxWidget,
                                            width: 260,
                                            skin: 'edit',
                                            borderWidth: 0,
                                            visible: true,
                                            title: 'Location',
                                            items: []
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow6',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow6Dropbox',
                                            type: DropBoxWidget,
                                            width: 260,
                                            skin: 'edit',
                                            borderWidth: 0,
                                            visible: true,
                                            title: 'Account',
                                            items: []
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAddCloneContractNewContractPopupPopupGridRow7',
                                    type: GridRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow7Button1',
                                            type: ButtonWidget,
                                            height: 40,
                                            skin: 'material_light',
                                            borderWidth: 0,
                                            width: '105px',
                                            marginTop: '20px',
                                            marginLeft: '20px',
                                            label: 'Cancel'
                                        },
                                        {
                                            id: 'analogicDemoAddCloneContractNewContractPopupPopupRow7Button2',
                                            type: ButtonWidget,
                                            height: 40,
                                            marginTop: '20px',
                                            marginLeft: '20px',
                                            skin: 'material',
                                            borderWidth: 0,
                                            width: '105px',
                                            label: 'Add'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    analogicDemoReviewContracts:
        {
            id: 'analogicDemoReviewContracts',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoReviewContractsGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoReviewContractsRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'Review Sales',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsRow2Cell1SearchBox',
                                            type: TextBoxWidget,
                                            height: 40,
                                            width: 400,
                                            defaultText: 'Search ...',
                                            skin: 'searchbox'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsRow3',
                            type: GridRowWidget,
                            marginTop: '2%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsGridRow3Cell1',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '13%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsFilterGridTable1',
                                            type: GridTableWidget,
                                            width: '100%',
                                            title: '',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTable1RowCell1',
                                                    type: GridTableCellWidget,
                                                    width: '100%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTable1RowCell1Text',
                                                            type: TextWidget,
                                                            width: '100%'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow3Cell2',
                                    type: GridCellWidget,
                                    width: '3%',
                                    alignment: 'top-right',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell2Button',
                                            type: ButtonWidget,
                                            width: '40px',
                                            height: '40px',
                                            skin: 'plus_button',
                                            icon: 'icon-plus-circle'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsRow3Cell3',
                                    type: GridCellWidget,
                                    width: '81%',
                                    alignment: 'top-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsFilterGridTable',
                                            type: GridTableWidget,
                                            width: '100%',
                                            title: '',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTableRowCell3',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell3Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoReviewContractsFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoReviewContractsFilterGridTableRowCell3Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoReviewContractsCenterFilterPopUpTable_0_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTableRowCell4',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell4Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoReviewContractsFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoReviewContractsFilterGridTableRowCell4Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoReviewContractsCenterFilterPopUpTable_2_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTableRowCell5',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell5Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoReviewContractsFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoReviewContractsFilterGridTableRowCell5Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoReviewContractsCenterFilterPopUpTable_4_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTableRowCell6',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell6Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoReviewContractsFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoReviewContractsFilterGridTableRowCell6Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoReviewContractsCenterFilterPopUpTable_5_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTableRowCell7',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell7Text',
                                                            type: TextWidget,
                                                            depends: [
                                                                {'event': 'choose.analogicDemoReviewContractsFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoReviewContractsFilterGridTableRowCell7Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoReviewContractsCenterFilterPopUpTable_1_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoReviewContractsFilterGridTableRowCell8',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoReviewContractsFilterGridTableRowCell8Text',
                                                            type: TextWidget,
                                                            depends: [
                                                                {'event': 'choose.analogicDemoReviewContractsFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoReviewContractsFilterGridTableRowCell8Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoReviewContractsCenterFilterPopUpTable_3_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'analogicDemoReviewContractsGridRow3Cell2Button',
                                            type: ButtonWidget,
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
                    id: 'analogicDemoReviewContractsContractsTable',
                    type: GridTableWidget,
                    title: '',
                    width: '100%',
                    skin: 'add_clone_analogicDemo',
                    widgets: [
                        {
                            id: 'analogicDemoReviewContractsContractsTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableHeaderCell-0',//alert
                                    type: GridTableHeaderCellWidget,
                                    width: '2%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsContractsTableHeaderText-0',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsContractsTableHeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    width: '9.8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsContractsTableHeaderText-1',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsContractsTableHeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '19.65%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsContractsTableHeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Column Group 1',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsContractsTableHeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '19.65%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsContractsTableHeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Column Group 2',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsContractsTableHeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '48.9%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsContractsTableHeaderText-6',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell11',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            width: '2%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableButton11',
                                    type: ButtonWidget,
                                    iconColor: '#DC3545'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText1',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell2',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText2',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText3',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText4',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell5',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText5',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell6',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText6',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell7',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText7',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell8',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText8',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell9',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '9.8%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText9',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsContractsTableCell10',
                            type: GridTableCellWidget,
                            width: '9.8%',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsContractsTableText10',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 10,
                                    marginRight: 10
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoReviewContractsFilterPopUp',
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
                            id: 'analogicDemoReviewContractsFilterPopUpDropdown',
                            type: DropBoxWidget,
                            multiSelect: true,
                            skin: 'filter_selector_businesspartner'
                        }
                    ]
                },
                {
                    id: 'analogicDemoReviewContractsPointPopUp',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '240',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    skin: 'departurement_popup_hays',
                    fadingSpeed: 0,
                    position: 'right',
                    widgets: [
                        {
                            id: 'analogicDemoReviewContractsPointPopUpCell1',
                            type: GridCellWidget,
                            alignment: 'bottom-left',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsPointPopUpCell1Button1',
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
                            id: 'analogicDemoReviewContractsPointPopUpCell2',
                            type: GridCellWidget,
                            alignment: 'bottom-left',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsPointPopUpCell2Button1',
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
                            id: 'analogicDemoReviewContractsPointPopUpCell3',
                            type: GridCellWidget,
                            alignment: 'bottom-left',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsPointPopUpCell3Button1',
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
                },
                {
                    id: 'analogicDemoReviewContractsCenterFilterPopUp',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '380',
                    height: '560',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    position: 'top',
                    skin: '',
                    fadingSpeed: 0,
                    offset: 200,
                    widgets: [
                        {
                            id: 'analogicDemoReviewContractsCenterFilterPopUpRow1',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsCenterFilterPopUpRow1Cell1',
                                    type: GridCellWidget,
                                    width: '90%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsCenterFilterPopUpRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Filters'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReviewContractsCenterFilterPopUpRow1Cell2',
                                    type: GridCellWidget,
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsCenterFilterPopUpRow1Cell2X',
                                            type: TextWidget,
                                            icon: 'icon-x',
                                            iconColor: '#009FDA'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsCenterFilterPopUpRow2',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '10px',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsCenterFilterPopUpRow2Cell1',
                                    type: GridCellWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsCenterFilterPopUpRow2Cell1Search',
                                            type: TextBoxWidget,
                                            skin: 'searchbox',
                                            width: 360,
                                            defaultText: 'Search ...'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReviewContractsCenterFilterPopUpTable',
                            type: GridTableWidget,
                            title: '',
                            widgets: [
                                {
                                    id: 'analogicDemoReviewContractsCenterFilterPopUpTableCell',
                                    type: GridTableCellWidget,
                                    width: 200,
                                    alignment: 'top-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReviewContractsCenterFilterPopUpTableCellToggle',
                                            type: ToggleWidget,
                                            visible: true,
                                            icon: 'icon-minus-circle',
                                            iconOff: 'icon-plus-circle',
                                            skin: 'switch_analogicDemo',
                                            marginTop: 5,
                                            marginBottom: 5,
                                            marginLeft: 15
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    analogicDemoAllocation:
        {
            id: 'analogicDemoAllocation',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoAllocationGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoAllocationRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'Allocation',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationRow2',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '2%',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '15%',
                                    marginTop: 10,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow2Cell1Text',
                                            type: TextWidget,
                                            marginLeft: 2,
                                            title: 'User',
                                            titleFontSize: 13
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow2Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '15%',
                                    marginTop: 10,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow2Cell2Text',
                                            type: TextWidget,
                                            title: 'Description',
                                            titleFontSize: 13
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationRow3',
                            type: GridRowWidget,
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationRow3Cell1',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow3Cell1Text',
                                            type: ButtonWidget,
                                            label: 'Admin',
                                            iconPosition: 'right',
                                            icon: 'icon-chevron-down',
                                            skin: 'dropbox_init'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow3Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow3Cell2Text',
                                            type: TextBoxWidget,
                                            defaultText: 'Description',
                                            title: '',
                                            width: 260,
                                            skin: 'custom_group'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationRow3Cell3',
                                    type: GridCellWidget,
                                    alignment: 'top-right',
                                    width: '70%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow3Cell3Text',
                                            type: ButtonWidget,
                                            skin: 'material',
                                            label: 'Extract',
                                            width: 90,
                                            icon: 'icon-rectangle-stack'
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                },
                {
                    id: 'analogicDemoAllocationFilterTable',
                    type: GridTableWidget,
                    title: '',
                    width: 560,
                    skin: 'add_clone_analogicDemo',
                    marginTop: 30,
                    widgets: [
                        {
                            id: 'analogicDemoAllocationFilterTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationFilterTableHeaderCell-0',//alert
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    width: '280px',
                                    alignment: 'bottom-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationFilterTableHeaderText-0',
                                            type: TextWidget,
                                            titleFontSize: 12,
                                            titleFontWeight: 900,
                                            titleAlignment: 'left',
                                            marginLeft: 10,
                                            marginTop: 5,
                                            title: 'Filters'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationFilterTableHeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    width: '280px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationFilterTableHeaderText-1',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationFilterTableCell11',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            width: '280px',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationFilterTableButton11',
                                    type: TextWidget,
                                    width: 260,
                                    titleFontSize: 13
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationFilterTableCell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '280px',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationFilterTableText2',
                                    type: TextWidget,
                                    width: 260,
                                    skin: 'allocation_gt',
                                    titleFontSize: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoAllocationFilterPopUp',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '240',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    skin: 'departurement_popup_hays',
                    fadingSpeed: 0,
                    position: 'bottom',
                    widgets: [
                        {
                            id: 'analogicDemoAllocationFilterPopUpDropbox',
                            type: DropBoxWidget,
                            multiSelect: false,
                            skin: 'filter_selector'
                        }
                    ]
                }
            ]
        },
    analogicDemoNewVolumes:
        {
            id: 'analogicDemoNewVolumes',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoNewVolumesGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoNewVolumesRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoNewVolumesRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoNewVolumesRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'New Business Volumes',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoNewVolumesRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoNewVolumesRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoNewVolumesRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoNewVolumesRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoNewVolumesRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoNewVolumesRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoNewVolumesRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoNewVolumesRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoNewVolumesRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoNewVolumesRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ]
        },
    analogicDemoPlanReport:
        {
            id: 'analogicDemoPlanReport',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoPlanReportGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoPlanReportRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'Plan Report',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportRow2',
                            type: GridRowWidget,
                            marginTop: '2%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportRow2Cell1SearchBox',
                                            type: TextBoxWidget,
                                            height: 40,
                                            width: 400,
                                            defaultText: 'Search ...',
                                            skin: 'searchbox'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationRow2a',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '2%',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationRow2aCell1',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '100%',
                                    marginTop: 10,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationRow2aCell1Text',
                                            type: TextWidget,
                                            marginLeft: 2,
                                            title: 'Filters',
                                            titleFontSize: 13,
                                            titleFontWeight: 600
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportRow3',
                            type: GridRowWidget,
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportGridRow3Cell1',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '3%',
                                    widgets: [

                                        {
                                            id: 'analogicDemoPlanReportFilterGridTableRowCell2Button',
                                            type: ButtonWidget,
                                            width: '40px',
                                            height: '40px',
                                            skin: 'plus_button',
                                            icon: 'icon-plus-circle'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportGridRow3Cell2',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '97%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportFilterGridTable',
                                            type: GridTableWidget,
                                            width: '100%',
                                            marginLeft: '1%',
                                            title: '',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoPlanReportFilterGridTableRowCell1',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoPlanReportFilterGridTableRowCell1Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoPlanReportFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoPlanReportFilterGridTableRowCell1Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoPlanReportCenterFilterPopUpTable_0_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoPlanReportFilterGridTableRowCell2',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoPlanReportFilterGridTableRowCell2Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoPlanReportFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoPlanReportFilterGridTableRowCell2Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoPlanReportCenterFilterPopUpTable_2_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoPlanReportFilterGridTableRowCell3',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoPlanReportFilterGridTableRowCell3Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoPlanReportFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoPlanReportFilterGridTableRowCell3Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoPlanReportCenterFilterPopUpTable_4_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoPlanReportFilterGridTableRowCell4',
                                                    type: GridTableCellWidget,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoPlanReportFilterGridTableRowCell4Text',
                                                            type: TextWidget,
                                                            width: '100%',
                                                            depends: [
                                                                {'event': 'choose.analogicDemoPlanReportFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoPlanReportFilterGridTableRowCell4Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoPlanReportCenterFilterPopUpTable_5_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoPlanReportFilterGridTableRowCell5',
                                                    type: GridTableCellWidget,
                                                    hideIfNoData: true,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoPlanReportFilterGridTableRowCell5Text',
                                                            type: TextWidget,
                                                            depends: [
                                                                {'event': 'choose.analogicDemoPlanReportFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoPlanReportFilterGridTableRowCell5Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoPlanReportCenterFilterPopUpTable_1_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'analogicDemoPlanReportFilterGridTableRowCell6',
                                                    type: GridTableCellWidget,
                                                    hideIfNoData: true,
                                                    width: '16.67%',
                                                    widgets: [
                                                        {
                                                            id: 'analogicDemoPlanReportFilterGridTableRowCell6Text',
                                                            type: TextWidget,
                                                            depends: [
                                                                {'event': 'choose.analogicDemoPlanReportFilterPopUpDropdown.finished'},
                                                                {'event': 'perform.analogicDemoPlanReportFilterGridTableRowCell6Text.finished'}
                                                            ],
                                                            listen: [
                                                                {
                                                                    "event": "switch.analogicDemoPlanReportCenterFilterPopUpTable_3_0.finished",
                                                                    "method": "refresh"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'analogicDemoPlanReportGridRow3Cell3Button',
                                            type: ButtonWidget,
                                            marginBottom: 90,
                                            marginLeft: 10,
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
                    id: 'analogicDemoPlanReportForecastTable',
                    type: GridTableWidget,
                    title: '',
                    width: '1616px',
                    skin: 'add_clone_analogicDemo',
                    listen: [
                        {
                            event: 'writeEnd.analogicDemoPlanReportRow2Cell1SearchBox.finished',
                            method: 'refresh'
                        }
                    ],
                    widgets: [
                        {
                            id: 'analogicDemoPlanReportForecastTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-0',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    width: '350px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-0',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'blue_bg',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-1',
                                            type: TextWidget,
                                            title: '2022',
                                            marginLeft: 10,
                                            skin: 'table_header_2'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '∆ %',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-3',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-3',
                                            type: TextWidget,
                                            title: '∆ Abs.',
                                            marginLeft: 10,
                                            skin: 'table_header_2'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'blue_bg',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2023',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-5',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-5',
                                            type: TextWidget,
                                            title: '∆ %',
                                            marginLeft: 10,
                                            skin: 'table_header_2'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-6',
                                            type: TextWidget,
                                            title: '∆ Abs.',
                                            marginLeft: 10,
                                            skin: 'table_header_2'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-7',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'blue_bg',
                                    alignment: 'center-left',
                                    width: '174px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-7',
                                            type: TextWidget,
                                            marginLeft: 10,
                                            title: '2024',
                                            skin: 'table_header_2'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportForecastTableHeaderCell-8',
                                    type: GridTableHeaderCellWidget,
                                    cellHeaderSkin: 'grey_borders',
                                    alignment: 'center-left',
                                    width: '40px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportForecastTableHeaderText-8',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '350px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText1',
                                    type: TextWidget,
                                    marginLeft: 10,
                                    skin: 'normal'

                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell2',
                            type: GridTableCellWidget,
                            cellSkin: 'blue_bg',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText2',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText3',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText4',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell5',
                            type: GridTableCellWidget,
                            cellSkin: 'blue_bg',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText5',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell6',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText6',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell7',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText7',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell8',
                            type: GridTableCellWidget,
                            cellSkin: 'blue_bg',
                            width: '174px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText8',
                                    type: TextWidget,
                                    marginRight: 10,
                                    skin: 'normal'
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportForecastTableCell9',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '40px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportForecastTableText9',
                                    type: TextWidget,
                                    icon: 'icon-card-chart',
                                    iconColor: '#009FDA'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoPlanReportFilterPopUp',
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
                            id: 'analogicDemoPlanReportFilterPopUpDropdown',
                            type: DropBoxWidget,
                            multiSelect: true,
                            skin: 'filter_selector_businesspartner'
                        }
                    ]
                },
                {
                    id: 'analogicDemoPlanReportPointPopUp',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: true,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '240',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    skin: 'departurement_popup_hays',
                    fadingSpeed: 0,
                    position: 'right',
                    widgets: [
                        {
                            id: 'analogicDemoPlanReportPointPopUpCell1',
                            type: GridCellWidget,
                            alignment: 'bottom-left',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportPointPopUpCell1Button1',
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
                            id: 'analogicDemoPlanReportPointPopUpCell2',
                            type: GridCellWidget,
                            alignment: 'bottom-left',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportPointPopUpCell2Button1',
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
                            id: 'analogicDemoPlanReportPointPopUpCell3',
                            type: GridCellWidget,
                            alignment: 'bottom-left',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportPointPopUpCell3Button1',
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
                },
                {
                    id: 'analogicDemoPlanReportCenterFilterPopUp',
                    type: ContainerWidget,
                    anchorVisible: false,
                    anchorOnClick: false,
                    backdrop: true,
                    visible: false,
                    closeBtn: false,
                    width: '380',
                    height: '560',
                    bgScrollable: true,
                    fixed: true,
                    heightFixed: false,
                    behaviour: 'popup',
                    position: 'top',
                    skin: '',
                    fadingSpeed: 0,
                    offset: 200,
                    widgets: [
                        {
                            id: 'analogicDemoPlanReportCenterFilterPopUpRow1',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportCenterFilterPopUpRow1Cell1',
                                    type: GridCellWidget,
                                    width: '90%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportCenterFilterPopUpRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Filters'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportCenterFilterPopUpRow1Cell2',
                                    type: GridCellWidget,
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportCenterFilterPopUpRow1Cell2X',
                                            type: TextWidget,
                                            icon: 'icon-x',
                                            iconColor: '#009FDA'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportCenterFilterPopUpRow2',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '10px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportCenterFilterPopUpRow2Cell1',
                                    type: GridCellWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportCenterFilterPopUpRow2Cell1Search',
                                            type: TextBoxWidget,
                                            skin: 'searchbox',
                                            width: 360,
                                            defaultText: 'Search ...'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportCenterFilterPopUpTable',
                            type: GridTableWidget,
                            title: '',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportCenterFilterPopUpTableCell',
                                    type: GridTableCellWidget,
                                    width: 200,
                                    alignment: 'top-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportCenterFilterPopUpTableCellToggle',
                                            type: ToggleWidget,
                                            visible: true,
                                            icon: 'icon-minus-circle',
                                            iconOff: 'icon-plus-circle',
                                            skin: 'switch_analogicDemo',
                                            marginTop: 5,
                                            marginBottom: 5,
                                            marginLeft: 15
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoPlanReportChartPopup',
                    type: ContainerWidget,
                    width: '960',
                    height: '580',
                    bgScrollable: true,
                    bgColor: '#fff',
                    visible: false,
                    widgets: [
                        {
                            id: 'analogicDemoPlanReportChartPopupRow1',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportChartPopupRow1Cell1',
                                    type: GridCellWidget,
                                    width: '90%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportChartPopupRow1Cell1Text',
                                            type: TextWidget,
                                            title: 'Line Scatter Combo Chart'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoPlanReportChartPopupRow1Cell2',
                                    type: GridCellWidget,
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoPlanReportChartPopupRow1Cell2X',
                                            type: TextWidget,
                                            icon: 'icon-x',
                                            iconColor: '#009FDA'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoPlanReportChartPopupRow2',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                            widgets: [
                                {
                                    id: 'analogicDemoPlanReportChartPopupRow2Cell1',
                                    type: GridCellWidget,
                                    width: '90%',
                                    widgets: [
                                        {
                                            id: 'examplePagePieChartWidget',
                                            type: LineScatterComboWidget,
                                            width: 850,
                                            marginLeft: 35,
                                            height: 430
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    analogicDemoAllocationHierarchy:
        {
            id: 'analogicDemoAllocationHierarchy',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoAllocationHierarchyGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    height: '20%',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoAllocationHierarchyRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'Multi-level-selection',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34.5%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationHierarchyGridRow2',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyGridRow2Cell1',
                                    type: GridCellWidget,
                                    alignment: 'bottom',
                                    marginTop: '7px',
                                    marginLeft: '1%',
                                    width: '30%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGridRow2Cell1Search',
                                            type: TextBoxWidget,
                                            width: '400',
                                            defaultText: 'Search...',
                                            skin: 'searchbox',
                                            height: '40'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGridRow1Cell2',
                                    type: GridCellWidget,
                                    alignment: 'bottom',
                                    width: '65%',
                                    widgets: []
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGridRow1Cell3',
                                    type: GridCellWidget,
                                    alignment: 'bottom',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchySaveSelected',
                                            type: ButtonWidget,
                                            label: 'Save Selected',
                                            icon: 'icon-rows',
                                            skin: 'material',
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
                    id: 'analogicDemoAllocationHierarchyPanel',
                    type: PanelWidget,
                    skin: 'hierarchy',
                    marginTop: 50,
                    height: 800,
                    widgets: [
                        {
                            id: 'analogicDemoAllocationHierarchyGrid2Level1GridTable',
                            type: GridTableWidget,
                            listen: [],
                            title: '',
                            skin: 'hierarchyGridTable_hays',
                            height: '800',//todo
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableHeaderRow',
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableHeaderCell',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableHeader',
                                                    type: TextWidget,
                                                    icon: '',
                                                    skin: 'Hierarchy_icon',
                                                    listen: [
                                                        {
                                                            event: 'switch.analogicDemoAllocationHierarchyGrid2Level1GridTable_row_0.finished',
                                                            method: 'refreshWithoutLoader'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableCell02',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '210',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableCell02Text',
                                            type: ToggleWidget,
                                            visible: true,
                                            width: '210',
                                            skin: 'hierarchyToggle',
                                            iconOff: 'icon-check-off',
                                            icon: 'icon-check-on',
                                            height: '40',
                                            titleOn: '',
                                            titleOff: ''
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableCell03',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '40',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level1GridTableCell03Text',
                                            type: TextWidget,
                                            visible: true,
                                            width: '40',
                                            icon: 'icon-chevron-right',
                                            skin: 'Hierarchy_Off',
                                            height: '40',
                                            iconCustomEventName: 'text_click',
                                            depends: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level1GridTable_row_0.finished'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationHierarchyGrid2Level2GridTable',
                            type: GridTableWidget,
                            hideIfNoData: true,
                            height: '800',//todo
                            listen: [
                                {
                                    'event': 'switch.analogicDemoAllocationHierarchyGrid2Level1GridTable_row_0.finished',
                                    'method': 'refresh'
                                }
                            ],
                            skin: 'hierarchyGridTable_hays',
                            title: '',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableHeaderRow',
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableHeaderCell',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableHeader',
                                                    type: TextWidget,
                                                    icon: '',
                                                    skin: 'Hierarchy_icon',
                                                    listen: [
                                                        {
                                                            event: 'switch.analogicDemoAllocationHierarchyGrid2Level2GridTable_row_0.finished',
                                                            method: 'refreshWithoutLoader'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableCell02',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '210',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableCell02Text',
                                            type: ToggleWidget,
                                            visible: true,
                                            width: '210',
                                            skin: 'hierarchyToggle',
                                            iconOff: 'icon-check-off',
                                            icon: 'icon-check-on',
                                            height: '40',
                                            titleOn: '',
                                            titleOff: '',
                                            listen: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level1GridTable_row_0.finished',
                                                    method: 'refreshWithoutLoader'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableCell03',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '40',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level2GridTableCell03Text',
                                            type: TextWidget,
                                            visible: true,
                                            width: '40',
                                            icon: 'icon-chevron-right',
                                            skin: 'Hierarchy_Off',
                                            height: '40',
                                            iconCustomEventName: 'text_click',
                                            depends: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level2GridTable_row_0.finished'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationHierarchyGrid2Level3GridTable',
                            type: GridTableWidget,
                            hideIfNoData: true,
                            height: '800',//todo
                            listen: [
                                {
                                    'event': 'switch.analogicDemoAllocationHierarchyGrid2Level2GridTable_row_0.finished',
                                    'method': 'refresh'
                                },
                                {
                                    'event': 'refresh.analogicDemoAllocationHierarchyGrid2Level2GridTable.finished',
                                    'method': 'refresh'
                                }
                            ],
                            skin: 'hierarchyGridTable_hays',
                            title: '',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableHeaderRow',
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableHeaderCell',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableHeader',
                                                    type: TextWidget,
                                                    icon: '',
                                                    skin: 'Hierarchy_icon',
                                                    listen: [
                                                        {
                                                            event: 'switch.analogicDemoAllocationHierarchyGrid2Level3GridTable_row_0.finished',
                                                            method: 'refreshWithoutLoader'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableCell02',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '210',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableCell02Text',
                                            type: ToggleWidget,
                                            visible: true,
                                            width: '210',
                                            skin: 'hierarchyToggle',
                                            iconOff: 'icon-check-off',
                                            icon: 'icon-check-on',
                                            height: '40',
                                            titleOn: '',
                                            titleOff: '',
                                            listen: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level3GridTable_row_0.finished',
                                                    method: 'refreshWithoutLoader'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableCell03',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '40',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level3GridTableCell03Text',
                                            type: TextWidget,
                                            visible: true,
                                            width: '40',
                                            icon: 'icon-chevron-right',
                                            skin: 'Hierarchy_Off',
                                            height: '40',
                                            iconCustomEventName: 'text_click',
                                            depends: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level3GridTable_row_0.finished'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationHierarchyGrid2Level4GridTable',
                            type: GridTableWidget,
                            hideIfNoData: true,
                            height: '800',//todo
                            listen: [
                                {
                                    'event': 'switch.analogicDemoAllocationHierarchyGrid2Level3GridTable_row_0.finished',
                                    'method': 'refresh'
                                },
                                {
                                    'event': 'refresh.analogicDemoAllocationHierarchyGrid2Level3GridTable.finished',
                                    'method': 'refresh'
                                }
                            ],
                            skin: 'hierarchyGridTable_hays',
                            title: '',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableHeaderRow',
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableHeaderCell',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableHeader',
                                                    type: TextWidget,
                                                    icon: '',
                                                    skin: 'Hierarchy_icon',
                                                    listen: [
                                                        {
                                                            event: 'switch.analogicDemoAllocationHierarchyGrid2Level4GridTable_row_0.finished',
                                                            method: 'refreshWithoutLoader'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableCell02',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '210',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableCell02Text',
                                            type: ToggleWidget,
                                            visible: true,
                                            width: '210',
                                            skin: 'hierarchyToggle',
                                            iconOff: 'icon-check-off',
                                            icon: 'icon-check-on',
                                            height: '40',
                                            titleOn: '',
                                            titleOff: '',
                                            listen: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level3GridTable_row_0.finished',
                                                    method: 'refreshWithoutLoader'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableCell03',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '40',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level4GridTableCell03Text',
                                            type: TextWidget,
                                            visible: true,
                                            width: '40',
                                            icon: 'icon-chevron-right',
                                            skin: 'Hierarchy_Off',
                                            height: '40',
                                            iconCustomEventName: 'text_click',
                                            depends: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level4GridTable_row_0.finished'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoAllocationHierarchyGrid2Level5GridTable',
                            type: GridTableWidget,
                            hideIfNoData: true,
                            height: '800',//todo
                            listen: [
                                {
                                    'event': 'switch.analogicDemoAllocationHierarchyGrid2Level4GridTable_row_0.finished',
                                    'method': 'refresh'
                                },
                                {
                                    'event': 'refresh.analogicDemoAllocationHierarchyGrid2Level4GridTable.finished',
                                    'method': 'refresh'
                                }
                            ],
                            skin: 'hierarchyGridTable_hays',
                            title: '',
                            widgets: [
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level5GridTableHeaderRow',
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level5GridTableHeaderCell',
                                            type: GridTableHeaderCellWidget,
                                            alignment: 'center-left',
                                            widgets: [
                                                {
                                                    id: 'analogicDemoAllocationHierarchyGrid2Level5GridTableHeader',
                                                    type: TextWidget,
                                                    icon: '',
                                                    skin: 'Hierarchy_icon',
                                                    listen: [
                                                        {
                                                            event: 'switch.analogicDemoAllocationHierarchyGrid2Level5GridTable_row_0.finished',
                                                            method: 'refreshWithoutLoader'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoAllocationHierarchyGrid2Level5GridTableCell02',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    skin: 'hierarchyCell',
                                    width: '270',
                                    widgets: [
                                        {
                                            id: 'analogicDemoAllocationHierarchyGrid2Level5GridTableCell02Text',
                                            type: ToggleWidget,
                                            visible: true,
                                            width: '270',
                                            skin: 'hierarchyToggle_last',
                                            iconOff: 'icon-check-off',
                                            icon: 'icon-check-on',
                                            height: '40',
                                            titleOn: '',
                                            titleOff: '',
                                            listen: [
                                                {
                                                    event: 'switch.analogicDemoAllocationHierarchyGrid2Level4GridTable_row_0.finished',
                                                    method: 'refreshWithoutLoader'
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
    analogicDemoKPIPlanTarget:
        {
            id: 'analogicDemoKPIPlanTarget',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoKPIPlanTargetGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoKPIPlanTargetRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '33%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'KPI Financial Plan vs. Target',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '34%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetRow2',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '17%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow2Cell1DropBox',
                                            type: DropBoxWidget,
                                            title: 'Plan Cycle',
                                            width: 260,
                                            skin: 'edit'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetRow2Cell2DropBox',
                                            type: DropBoxWidget,
                                            skin: 'edit',
                                            width: 260,
                                            title: 'Plan Version'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoKPIPlanTargetTable',
                    type: GridTableWidget,
                    title: '',
                    width: '100%',
                    marginTop: '2%',
                    skin: 'target',
                    widgets: [
                        {
                            id: 'analogicDemoKPIPlanTargetTableHeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableHeaderCell-0',
                                    type: GridTableHeaderCellWidget,
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetTableHeaderText-0',
                                            type: TextWidget,
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetTableHeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    width: '18%',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetTableHeaderText-1',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Group 1',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetTableHeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetTableHeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Group 2',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetTableHeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetTableHeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Group 3',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetTableHeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetTableHeaderText-6',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Group 4',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetTableHeaderCell-7',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '18%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoKPIPlanTargetTableHeaderText-7',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Group 5',
                                            marginLeft: 10
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell0',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            alignment: 'center-left',
                            width: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText0',
                                    type: TextWidget,
                                    marginLeft: 20
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText1',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell2',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText2',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    icon: '',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText3',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText4',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell5',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText5',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    icon: '',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell6',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText6',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell7',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText7',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell8',
                            type: GridTableCellWidget,
                            alignment: 'center-left',
                            cellSkin: 'grey_borders',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText8',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    icon: '',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell9',
                            type: GridTableCellWidget,
                            alignment: 'center-left',
                            cellSkin: 'grey_borders',
                            width: '6%',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText9',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell10',
                            type: GridTableCellWidget,
                            alignment: 'center-left',
                            width: '6%',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText10',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell11',
                            type: GridTableCellWidget,
                            width: '6%',
                            alignment: 'center-left',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText11',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    icon: '',
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell12',
                            type: GridTableCellWidget,
                            width: '6%',
                            cellSkin: 'grey_borders',
                            alignment: 'center-left',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText12',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell13',
                            type: GridTableCellWidget,
                            width: '6%',
                            alignment: 'center-left',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText13',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell14',
                            type: GridTableCellWidget,
                            width: '6%',
                            alignment: 'center-left',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText14',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    icon: '',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetTableCell15',
                            type: GridTableCellWidget,
                            width: '6%',
                            alignment: 'center-left',
                            cellSkin: 'grey_borders',
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetTableText15',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    marginLeft: 7,
                                    marginRight: 10
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoKPIPlanTargetLastRow',
                    type: PanelWidget,
                    marginLeft: '37%',
                    width: '30%',
                    widgets: [
                        {
                            id: 'analogicDemoKPIPlanTargetLastRowText1',
                            type: TextWidget,
                            marginTop: 23,
                            marginLeft: 230,
                            title: '* Financial Targets',
                            titleFontSize: 14
                        },
                        {
                            id: 'analogicDemoKPIPlanTargetLastRowCell',
                            type: GridCellWidget,
                            width: '100%',
                            marginTop: 7,
                            widgets: [
                                {
                                    id: 'analogicDemoKPIPlanTargetLastRowText2',
                                    type: TextWidget,
                                    title: 'Reached Target',
                                    icon: 'icon-badge',
                                    width: 130,
                                    iconColor: '#747678',
                                    iconFontSize: 10,
                                    skin: 'badge',
                                    titleFontColor: '#739600',
                                    titleFontSize: 14
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetLastRowText3',
                                    type: TextWidget,
                                    title: 'Below within 1%',
                                    titleFontColor: '#E98300',
                                    icon: 'icon-badge',
                                    iconColor: '#747678',
                                    width: 130,
                                    marginLeft: 10,
                                    skin: 'badge',
                                    titleFontSize: 14
                                },
                                {
                                    id: 'analogicDemoKPIPlanTargetLastRowText4',
                                    type: TextWidget,
                                    title: 'Below more than 1%',
                                    marginLeft: 10,
                                    width: 150,
                                    titleFontColor: '#D71F85',
                                    titleFontSize: 14
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    analogicDemoReleaseAndValidation:
        {
            id: 'analogicDemoReleaseAndValidation',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicDemoReleaseAndValidationGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'analogicDemoReleaseAndValidationRow1',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            skin: 'bottomborder',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationRow1Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '47%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow1Cell1Text',
                                            type: TextWidget,
                                            icon: 'icon-menu',
                                            iconColor: '#009FDA',
                                            height: 40,
                                            title: 'Validation Status Report',
                                            skin: 'analogicDemo_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow1Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '20%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow1Cell2Text1',
                                            type: TextWidget,
                                            title: 'Plan Cycle',
                                            body: '2022',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow1Cell2a',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow1Cell2Text2',
                                            type: TextWidget,
                                            title: 'Last Report Refresh',
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow1Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '4.5%',
                                    skin: 'rightborder',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow1Cell3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-time-back-arrow',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow1Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '10%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow1Cell4Text',
                                            type: TextWidget,
                                            title: 'Environment',
                                            body: 'Planning app DEV',
                                            bodyFontColor: '#747678',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow1Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '10%',
                                    height: '0',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow1Cell5Button',
                                            type: ButtonWidget,
                                            backgroundColor: '#EBECEC',
                                            label: 'Josh Smith',
                                            action: '',
                                            width: '100%',
                                            icon: 'icon-user',
                                            skin: 'userpanelmain_analogicDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationRow2',
                            type: GridRowWidget,
                            marginTop: '1.3%',
                            marginBottom: '0%',
                            width: '100%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell1',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    alignment: 'center-left',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell1DropBox',
                                            type: DropBoxWidget,
                                            title: 'Plan Cycle',
                                            width: 260,
                                            skin: 'edit'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell2',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell2DropBox',
                                            type: DropBoxWidget,
                                            skin: 'edit',
                                            width: 260,
                                            title: 'Business Segment'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell3',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '15%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell3DropBox',
                                            type: DropBoxWidget,
                                            skin: 'edit',
                                            width: 260,
                                            title: 'Submision Package'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell4',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '32%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell4Text1',
                                            type: TextWidget,
                                            title: 'Validated by:',
                                            marginTop: 30,
                                            body: 'Anna Smith',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell5',
                                    type: GridCellWidget,
                                    marginLeft: '10',
                                    marginRight: '0',
                                    marginTop: '0',
                                    alignment: 'top-right',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell5Text2',
                                            type: TextWidget,
                                            title: 'Validation Date:',
                                            marginTop: 30,
                                            body: '2022.11.04 12:33:46',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell6',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '8%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell6Text3',
                                            type: TextWidget,
                                            title: 'Validation Status:',
                                            body: 'VALID',
                                            marginTop: 30,
                                            bodyFontColor: '#739600',
                                            skin: 'review_gd_header'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationRow2Cell7',
                                    type: GridCellWidget,
                                    marginLeft: '5',
                                    marginRight: '0',
                                    marginTop: '1%',
                                    alignment: 'top-center',
                                    width: '7%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow2Cell7Button',
                                            type: ButtonWidget,
                                            icon: 'icon-check-on',
                                            marginTop: 20,
                                            label: 'Validate',
                                            width: '100px',
                                            skin: 'material_green'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationRow3',
                            type: GridRowWidget,
                            width: '100%',
                            marginLeft: '86%',
                            height: '10%',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationRow3Cell',
                                    type: GridCellWidget,
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow3Text',
                                            type: TextWidget,
                                            title: 'Release Status',
                                            body: 'Not Released:',
                                            marginRight: 63,
                                            skin: 'review_gd_header'
                                        },
                                        {
                                            id: 'analogicDemoReleaseAndValidationRow3Button',
                                            type: ButtonWidget,
                                            icon: 'icon-tray-files',
                                            label: 'Release',
                                            width: '100px',
                                            marginLeft: '28px',
                                            skin: 'material'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoReleaseAndValidationTable1',
                    type: GridTableWidget,
                    title: '',
                    width: '570px',
                    skin: 'add_clone_analogicDemo',
                    widgets: [
                        {
                            id: 'analogicDemoReleaseAndValidationTable1HeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1HeaderCell-0',
                                    type: GridTableHeaderCellWidget,
                                    width: '330px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable1HeaderText-0',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Strict Validation Rules',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1HeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    width: '60px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable1HeaderText-1',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2022',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1HeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable1HeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2022',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1HeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable1HeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2023',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1HeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable1HeaderText-6',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2024',
                                            marginLeft: 10
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable1Cell0',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            width: '330px',
                            alignment: 'center-left',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1Text0',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    titleFontWeight: 100,
                                    marginLeft: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable1Cell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1Text1',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16,
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable1Cell2',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1Text2',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable1Cell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1Text3',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable1Cell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable1Text4',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoReleaseAndValidationTable2',
                    type: GridTableWidget,
                    title: '',
                    width: '570px',
                    marginTop: 35,
                    skin: 'add_clone_analogicDemo',
                    widgets: [
                        {
                            id: 'analogicDemoReleaseAndValidationTable2HeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2HeaderCell-0',
                                    type: GridTableHeaderCellWidget,
                                    width: '330px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable2HeaderText-0',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Strict Validation Rules',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2HeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    width: '60px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable2HeaderText-1',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2022',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2HeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable2HeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2022',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2HeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable2HeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2023',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2HeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable2HeaderText-6',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2024',
                                            marginLeft: 10
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable2Cell0',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            width: '330px',
                            alignment: 'center-left',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2Text0',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    titleFontWeight: 100,
                                    marginLeft: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable2Cell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2Text1',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16,
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable2Cell2',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2Text2',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable2Cell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2Text3',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable2Cell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable2Text4',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicDemoReleaseAndValidationTable3',
                    type: GridTableWidget,
                    title: '',
                    width: '570px',
                    marginTop: 35,
                    skin: 'add_clone_analogicDemo',
                    widgets: [
                        {
                            id: 'analogicDemoReleaseAndValidationTable3HeaderRow',
                            type: GridTableHeaderRowWidget,
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3HeaderCell-0',
                                    type: GridTableHeaderCellWidget,
                                    width: '330px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable3HeaderText-0',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: 'Strict Validation Rules',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3HeaderCell-1',
                                    type: GridTableHeaderCellWidget,
                                    width: '60px',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable3HeaderText-1',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2022',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3HeaderCell-2',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable3HeaderText-2',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2022',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3HeaderCell-4',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable3HeaderText-4',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2023',
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3HeaderCell-6',
                                    type: GridTableHeaderCellWidget,
                                    alignment: 'center-left',
                                    width: '60px',
                                    widgets: [
                                        {
                                            id: 'analogicDemoReleaseAndValidationTable3HeaderText-6',
                                            type: TextWidget,
                                            skin: 'table_header_2',
                                            title: '2024',
                                            marginLeft: 10
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable3Cell0',
                            type: GridTableCellWidget,
                            skin: 'grey_borders',
                            width: '330px',
                            alignment: 'center-left',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3Text0',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    titleFontWeight: 100,
                                    marginLeft: 10
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable3Cell1',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3Text1',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16,
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable3Cell2',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3Text2',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable3Cell3',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3Text3',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        },
                        {
                            id: 'analogicDemoReleaseAndValidationTable3Cell4',
                            type: GridTableCellWidget,
                            cellSkin: 'grey_borders',
                            width: '60px',
                            widgets: [
                                {
                                    id: 'analogicDemoReleaseAndValidationTable3Text4',
                                    type: TextWidget,
                                    skin: 'table_header_2',
                                    iconColor: '#8FAB33',
                                    iconFontSize: 16
                                }
                            ]
                        }
                    ]
                }
            ]
        },

    analogicTableDemo:
        {
            id: 'analogicTableDemo',
            type: PageWidget,
            widgets: [
                {
                    id: 'analogicTableDemoGrid',
                    type: GridWidget,
                    marginLeft: '40',
                    marginRight: '40',
                    marginTop: '20',
                    widgets: [
                        {
                            id: 'analogicTableDemoHeaderRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '20',
                            widgets: [
                                {
                                    id: 'analogicTableDemoHeaderBackCell',
                                    type: GridCellWidget,
                                    width: '18%',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicTableDemoHeaderBack',
                                            type: ButtonWidget,
                                            label: 'Back to Dashboard',
                                            icon: 'icon-arrow-left',
                                            width: '220',
                                            skin: 'material_analogicDemo'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicTableDemoHeaderTitleCell',
                                    type: GridCellWidget,
                                    width: '62%',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'analogicTableDemoHeaderTitle',
                                            type: TextWidget,
                                            title: 'Analogic Tabulator Showcase',
                                            body: 'Explore selection, grouping, inline edits and custom renderers.',
                                            skin: 'review_gd_header',
                                            titleFontSize: 26,
                                            bodyFontColor: '#6B6C6E'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicTableDemoHeaderInfoCell',
                                    type: GridCellWidget,
                                    width: '20%',
                                    alignment: 'center-right',
                                    widgets: [
                                        {
                                            id: 'analogicTableDemoHeaderInfo',
                                            type: TextWidget,
                                            title: 'Tabulator v6 Demo',
                                            body: 'Live inside GridTablePlusWidget',
                                            skin: 'menu',
                                            titleFontSize: 16,
                                            bodyFontColor: '#4F5B66'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicTableDemoContentRow',
                            type: GridRowWidget,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicTableDemoContentCell',
                                    type: GridCellWidget,
                                    width: '100%',
                                    alignment: 'top-left',
                                    widgets: [
                                        {
                                            id: 'analogicTableDemoTable',
                                            type: GridTablePlusWidget,
                                            title: 'Project Portfolio Overview',
                                            minWidth: 960,
                                            hideIfNoData: false,
                                            tabulatorOptions: {
                                                height: '520px',
                                                layout: 'fitDataStretch',
                                                movableColumns: true,
                                                resizableColumnFit: true,
                                                selectable: true,
                                                selectableRangeMode: 'drag',
                                                tooltipGenerationMode: 'hover'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicTableDemoSimpleInfoRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '24',
                            marginBottom: '8',
                            widgets: [
                                {
                                    id: 'analogicTableDemoSimpleInfoCell',
                                    type: GridCellWidget,
                                    width: '100%',
                                    alignment: 'top-left',
                                    widgets: [
                                        {
                                            id: 'analogicTableDemoSimpleInfoText',
                                            type: TextWidget,
                                            title: 'Editable Ordinal Matrix',
                                            body: 'Simple 10×30 grid with inline editing, filtering and ordinal tracking for each cell.',
                                            titleFontSize: 18,
                                            titleFontWeight: 600,
                                            bodyFontColor: '#475569'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicTableDemoSimpleTableRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '24',
                            widgets: [
                                {
                                    id: 'analogicTableDemoSimpleTableCell',
                                    type: GridCellWidget,
                                    width: '100%',
                                    alignment: 'top-left',
                                    widgets: [
                                        {
                                            id: 'analogicTableDemoSimpleTable',
                                            type: GridTablePlusWidget,
                                            title: 'Editable Data Grid',
                                            minWidth: 960,
                                            hideIfNoData: false,
                                            tabulatorOptions: {
                                                height: '460px',
                                                layout: 'fitDataStretch',
                                                selectable: false,
                                                resizableColumnFit: true
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    gridTableLightDemo:
        {
            id: 'gridTableLightDemo',
            type: PageWidget,
            widgets: [
                {
                    id: 'gridTableLightDemoGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'gridTableLightDemoInfoRow',
                            type: GridRowWidget,
                            marginTop: '2%',
                            marginBottom: '16',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'gridTableLightDemoInfoCell',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'gridTableLightDemoInfoText',
                                            type: TextWidget,
                                            title: 'GridTableLight demo',
                                            body: 'Use the Details buttons or Owner dropdowns to trigger repository events.',
                                            titleFontSize: 16,
                                            titleFontWeight: 600,
                                            bodyFontColor: '#4B5563'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'gridTableLightDemoColumnSelectorRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '16',
                            widgets: [
                                {
                                    id: 'gridTableLightDemoColumnSelectorCell',
                                    type: GridCellWidget,
                                    alignment: 'center-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'gridTableLightColumnCountSelector',
                                            type: DropBoxWidget,
                                            width: 220,
                                            skin: 'edit',
                                            title: 'Columns'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'gridTableLightDemoMainTableRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginBottom: '24',
                            widgets: [
                                {
                                    id: 'gridTableLightDemoMainTableCell',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'gridTableLightDemoTable',
                                            type: GridTableLightWidget,
                                            skin: 'gridTableLightDemo'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'gridTableLightDemoCompactTableRow',
                            type: GridRowWidget,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'gridTableLightDemoCompactTableCell',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'gridTableLightCompactTable',
                                            type: GridTableLightWidget,
                                            skin: 'gridTableLightCompact'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'gridTableLightDemoTextTableRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '24',
                            widgets: [
                                {
                                    id: 'gridTableLightDemoTextTableCell',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'gridTableLightTextTable',
                                            type: GridTableLightWidget,
                                            skin: 'gridTableLightText'
                                        }
                                    ]
                                }
                            ]
                        },
                        // {
                        //     id: 'gridTableLightDemoServerTableRow',
                        //     type: GridRowWidget,
                        //     width: '100%',
                        //     marginTop: '24',
                        //     widgets: [
                        //         {
                        //             id: 'gridTableLightDemoServerTableCell',
                        //             type: GridCellWidget,
                        //             alignment: 'top-left',
                        //             width: '100%',
                        //             widgets: [
                        //                 {
                        //                     id: 'gridTableLightServerTable',
                        //                     type: GridTableLightWidget,
                        //                     skin: 'gridTableLightDemo'
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // },
                        // {
                        //     id: 'gridTableLightDemoServerTable2Row',
                        //     type: GridRowWidget,
                        //     width: '100%',
                        //     marginTop: '24',
                        //     widgets: [
                        //         {
                        //             id: 'gridTableLightDemoServerTable2Cell',
                        //             type: GridCellWidget,
                        //             alignment: 'top-left',
                        //             width: '100%',
                        //             widgets: [
                        //                 {
                        //                     id: 'gridTableLightServerTable2',
                        //                     type: GridTableLightWidget,
                        //                     skin: 'gridTableLightDemo',
                        //                     pageSize: 20
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        //
                        // }
                    ]
                }
            ]
        },
    gpuTableServerDemo:
        {
            id: 'gpuTableServerDemo',
            type: PageWidget,
            widgets: [
                {
                    id: 'gpuTableServerGrid',
                    type: GridWidget,
                    marginLeft: '10',
                    marginRight: '10',
                    width: '100%',
                    widgets: [
                        {
                            id: 'gpuTableServerTableRow',
                            type: GridRowWidget,
                            width: '100%',
                            marginTop: '24',
                            widgets: [
                                {
                                    id: 'gpuTableServerTableCell',
                                    type: GridCellWidget,
                                    alignment: 'top-left',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: 'gpuTableServerTable',
                                            type: GpuTableWidget,
                                            skin: 'contrast',
                                            width: '100%',
                                            height: '520px'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
}
;
