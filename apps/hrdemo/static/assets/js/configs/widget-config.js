/* global app */
'use strict';
WidgetConfig = {
    hrdemoMain: {
        id: 'hrdemoMain',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoMainGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoMainRow1',
                        type: GridRowWidget,
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder_main',
                        widgets: [
                            {
                                id: 'hrdemoMainRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '4',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow1Cell1Logo',
                                        type: ImageWidget,
                                        titleFontColor: '#AEAEB2',
                                        fileName: 'knowledgeseed_stratos.png',
                                        titleFontSize: '22px',
                                        width: 290,
                                        height: 90
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoMainRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                width: '15%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'HR - Modelling',
                                        marginLeft: '10px',
                                        skin: 'titleInPage'
                                    },
                                ]
                            },

                            {
                                id: 'hrdemoMainRow1Cell3',
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
                                import: 'panels.hrDemoUserButtonPanel'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoMainRow2',
                        type: GridRowWidget,
                        marginTop: '10%',
                        marginBottom: '0%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoMainRow2Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '25%',
                                skin: '',
                                height: '18%',
                                widgets: []
                            },
                            {
                                id: 'hrdemoMainRow2Cell2',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow2Cell2Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-blocks-slider',
                                        fontColor: 'white',
                                        skin: 'hrDemoMain_blue',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow2Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow2Cell3Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-table',
                                        fontColor: 'white',
                                        skin: 'hrDemoMain_blue',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow2Cell4',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                visible: true,
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow2Cell4Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-customers',
                                        fontColor: 'white',
                                        skin: 'hrDemoMain_blue',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow2Cell5',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                visible: true,
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow2Cell5Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-settings',
                                        fontColor: 'white',
                                        skin: 'hrDemoMain_blue',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow2Cell6',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '23%',
                                height: '6%',
                                widgets: []
                            }
                        ]
                    },
                    {
                        id: 'hrdemoMainRow3',
                        type: GridRowWidget,
                        marginTop: '0.4%',
                        marginBottom: '0%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoMainRow3Cell1',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '25%',
                                height: '6%',
                                widgets: []
                            },
                            {
                                id: 'hrdemoMainRow3Cell2',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '6%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow3Cell2Text',
                                        type: TextWidget,
                                        title: 'Simulation',
                                        width: '100%',
                                        skin: 'menu',
                                        titleAlignment: 'center',
                                        titleFontSize: 16,
                                        titleFontColor: '#000000',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow3Cell3',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '6%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow3Cell3Text',
                                        type: TextWidget,
                                        title: 'Report',
                                        width: '100%',
                                        skin: 'menu',
                                        titleAlignment: 'center',
                                        titleFontSize: 16,
                                        titleFontColor: '#000000',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow3Cell4',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'center-center',
                                width: '12%',
                                height: '6%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow3Cell4Text',
                                        type: TextWidget,
                                        title: 'Groups',
                                        width: '100%',
                                        skin: 'menu',
                                        titleAlignment: 'center',
                                        titleFontSize: 16,
                                        titleFontColor: '#000000',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoMainRow3Cell5',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '6%',
                                widgets: [
                                    {
                                        id: 'hrdemoMainRow3Cell5Text',
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
                                id: 'hrdemoMainRow3Cell6',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '23%',
                                height: '6%',
                                widgets: []
                            }
                        ]
                    },

                ]
            }
        ]
    },

    hrdemoGroupSelect: {
        id: 'hrdemoGroupSelect',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoGroupSelectGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoGroupSelectRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoGroupSelectRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupSelectRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        marginTop: '8px',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoGroupSelectRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupSelectRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'Simulations',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoGroupSelectRow1Cell3',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-center',
                                width: '83%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupSelectRow1Cell3SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '330',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        widgets: [
                                            {
                                                id: 'hrdemoGroupSelectRow1Cell3SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: '2022',
                                            },
                                            {
                                                id: 'hrdemoGroupSelectRow1Cell3SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: '2023',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                import: 'panels.hrDemoUserButtonPanel'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoGroupSelectRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoGroupSelectRow2Cell1',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-left',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupSelectRow2Cell1SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '300',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        visible: true,
                                        widgets: [
                                            {
                                                id: 'hrdemoGroupSelectRow2Cell1SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: 'FTE Change',
                                            },
                                            {
                                                id: 'hrdemoGroupSelectRow2Cell1SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: 'Total Cost',
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                id: 'hrdemoGroupSelectGridTable',
                type: GridTableWidget,
                marginTop: '40',
                hideIfNoData: true,
                skin: 'forecasting_forecast_hr',
                width: '46%',
                title: '',
                widgets: [

                    {
                        id: 'hrdemoGroupSelectGridTableHeaderRow',
                        type: GridTableHeaderRowWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoGroupSelectGridTableHeaderCell-01',
                                type: GridTableHeaderCellWidget,
                                width: '40%',
                                alignment: 'bottom-left',
                                widgets: [

                                    {
                                        id: 'hrdemoGroupSelectGridTableHeaderCell1Text',
                                        type: TextWidget,
                                        title: 'Group Name',
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '5px',
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoGroupSelectGridTableHeaderCell-02',
                                type: GridTableHeaderCellWidget,
                                alignment: 'bottom-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupSelectGridTableHeaderText-02',
                                        type: TextWidget,
                                        title: 'Base plan',
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoGroupSelectGridTableHeaderCell-03',
                                type: GridTableHeaderCellWidget,
                                width: '15%',
                                alignment: 'bottom-left',
                                widgets: [

                                    {
                                        id: 'hrdemoGroupSelectGridTableHeaderText-03',
                                        type: TextWidget,
                                        title: 'Budget',
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoGroupSelectGridTableHeaderCell-4',
                                type: GridTableHeaderCellWidget,
                                width: '15%',
                                alignment: 'bottom-left',
                                widgets: [

                                    {
                                        id: 'hrdemoGroupSelectGridTableHeaderText-04',
                                        type: TextWidget,
                                        title: 'FTE Change',
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoGroupSelectGridTableHeaderCell-5',
                                type: GridTableHeaderCellWidget,
                                width: '15%',
                                alignment: 'bottom-left',
                                widgets: [

                                    {
                                        id: 'hrdemoGroupSelectGridTableHeaderText-5',
                                        type: TextWidget,
                                        title: 'View Simulation',
                                        skin: 'gridTable_title_taxes2',
                                        paddingLeft: '8px',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },

                        ]
                    },


                    {
                        id: 'hrdemoGroupSelectGridTableCell-01',
                        type: GridTableCellWidget,
                        width: '40%',
                        alignment: 'center-left',
                        widgets: [

                            {
                                id: 'hrdemoGroupSelectGridTableButton-01',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },

                    {
                        id: 'hrdemoGroupSelectGridTableCell-02',
                        type: GridTableCellWidget,
                        alignment: 'center-left',
                        width: '15%',
                        widgets: [

                            {
                                id: 'hrdemoGroupSelectGridTableText-02',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },

                    {
                        id: 'hrdemoGroupSelectGridTableCell-03',
                        type: GridTableCellWidget,
                        alignment: 'center-left',
                        width: '15%',
                        widgets: [

                            {
                                id: 'hrdemoGroupSelectGridTableText-03',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoGroupSelectGridTableCell-4',
                        type: GridTableCellWidget,
                        alignment: 'center-left',
                        width: '15%',
                        widgets: [

                            {
                                id: 'hrdemoGroupSelectGridTableButton4',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoGroupSelectGridTableCell-5',
                        type: GridTableCellWidget,
                        alignment: 'center-center',
                        skin: 'group',
                        width: '15%',
                        widgets: [
                            {
                                id: 'hrdemoGroupSelectGridTableButton-5',
                                type: ButtonWidget,
                                icon: '',
                                skin: 'chartGT_bpsp',
                            }
                        ]
                    },
                ]
            },

        ]
    },

    hrdemoReport: {
        id: 'hrdemoReport',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoReportGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoReportRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoReportRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoReportRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        marginTop: '8px',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoReportRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'center-left',
                                width: '18%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoReportRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'Report',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoReportRow1Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-right',
                                width: '79%',
                                widgets: [
                                    {
                                        import: 'panels.hrDemoUserButtonPanel'
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },

            {
                id: 'hrdemoReportChart1Section',
                type: GridWidget,
                marginTop: '60',
                width: '100%',
                widgets: [

                    {
                        id: 'hrdemoReportChart1SectionRow',
                        type: GridRowWidget,
                        alignment: 'left',
                        marginLeft: 100,
                        width: '100%',
                        skin: 'noskin',
                        widgets: [

                            {
                                id: 'hrdemoReportChart1SectionCell1',
                                type: GridCellWidget,
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart1SectionText',
                                        type: TextWidget,
                                        title: 'Headcount and FTE values',
                                        marginLeft: '-60',
                                        titleFontColor: '#333333',
                                        skin: 'deepblue_text',
                                        titleFontSize: 24,
                                    },
                                    {
                                        id: 'hrdemoReportChart1SectionButton',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '20',
                                        icon: 'icon-info',
                                        marginLeft: '10',
                                        iconFontSize: '25',
                                        skin: 'infobutton',
                                        iconColor: '#007AFF'
                                    }
                                ]
                            }]
                    }]
            },

            {
                id: 'hrdemoReportChart1Grid',
                type: GridWidget,
                marginRight: '50',
                marginTop: '30',
                widgets: [

                    {
                        id: 'hrdemoReportChart1GridTitleRow',
                        type: GridRowWidget,
                        marginLeft: 110,
                        widgets: [

                            {
                                id: 'hrdemoReportChart1GridTitleCell1',
                                type: GridCellWidget,
                                marginLeft: '40',
                                alignment: 'center-left',
                                width: '50%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart1GridTitleText1',
                                        type: TextWidget,
                                        title: 'Headcount',
                                        marginLeft: '-100px',
                                        titleFontSize: 21,
                                        titleFontColor: '#a0a4ab'
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoReportChart1GridTitleCell2',
                                type: GridCellWidget,
                                alignment: 'center-left',
                                width: '50%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart1GridTitleText2',
                                        type: TextWidget,
                                        title: 'FTE',
                                        titleFontSize: 21,
                                        titleFontColor: '#a0a4ab'
                                    }
                                ]
                            }]
                    },

                    {
                        id: 'hrdemoReportChart1GridRow',
                        type: GridRowWidget,
                        widgets: [

                            {
                                id: 'hrdemoReportChart1GridCell1',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '50%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart1',
                                        type: ComboChartWidget,
                                        width: '900',
                                        height: '500',
                                        title: '',
                                        listen: [],
                                        datasets: [{
                                            "type": "line",
                                            "backgroundColor": "rgba(52,199,89,0.4)",
                                            "borderColor": "#34C759",
                                            "borderWidth": 1,
                                            "pointRadius": 0,
                                            "stack": 1,
                                            legendBackgroundColor: "#34C759",
                                            "dataLabelFontColor": "#fff",
                                            "dataLabelVisible": false,
                                            "fill": true,
                                            dataLabelBorderRadius: 5,
                                            "legendLabel": "Base"
                                        },
                                            {
                                                "type": "line",
                                                "backgroundColor": "rgba(0,122,255,0.4)",
                                                "borderColor": "#007AFF",
                                                "borderWidth": 2,
                                                "pointRadius": 0,
                                                legendBackgroundColor: "#007AFF",
                                                "stack": 2,
                                                dataLabelBorderRadius: 5,
                                                "dataLabelFontColor": "#fff",
                                                "dataLabelVisible": false,
                                                "fill": true,
                                                "legendLabel": "Budget"
                                            }],
                                        tooltipsEnabled: true,
                                        marginBottom: '50',
                                        skin: 'combochartFTE',
                                        legendGroupByStack: true,
                                        bezierCurve: false,
                                        xAxesGridLinesDisplay: true,
                                        xAxesGridLinesDrawBorder: true,
                                        xAxesTicksFontSize: 14,
                                        xAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        xAxesTicksFontColor: '#333333',
                                        xAxesTicksBegintAtZero: false,
                                        xAxesTicksPadding: 10,
                                        xAxesLabelFontSize: 12,
                                        xAxesLabelFontFamily: 'imago, sans-serif',
                                        xAxesLabelFontColor: '#747b85',
                                        xAxesZeroLineColor: '#dee1e5',
                                        leftYAxesDisplay: true,
                                        leftYAxesStacked: false,
                                        leftYAxesZeroLineColor: '#dee1e5',
                                        leftYAxesGridLinesDisplay: true,
                                        leftYAxesGridLinesDrawBorder: true,
                                        leftYAxesGridLinesColor: '#dee1e5',
                                        leftYAxesGridLinesDrawOnChartArea: true,
                                        leftYAxesGridLinesDrawTicks: true,
                                        leftYAxesLabelFontSize: 12,
                                        leftYAxesLabelFontFamily: 'imago, sans-serif',
                                        leftYAxesLabelFontColor: '#747b85',
                                        leftYAxesLabelFontStyle: 'normal',
                                        leftYAxesLabelPadding: 10,
                                        leftYAxesTicksFontSize: 21,
                                        leftYAxesTicksPadding: 20,
                                        leftYAxesTicksFontStyle: 'normal',
                                        leftYAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        leftYAxesTicksFontColor: '#333333',
                                        leftYAxesTicksDisplay: true,
                                        rightYAxesLabelFontSize: 12,
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoReportChart1GridCell2',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '50%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart2',
                                        type: ComboChartWidget,
                                        width: '900',
                                        height: '500',
                                        title: '',
                                        listen: [],
                                        datasets: [{
                                            "type": "bar",
                                            "backgroundColor": "#34C759",
                                            "borderColor": "#34C759",
                                            "borderWidth": 1,
                                            "pointRadius": 1,
                                            "stack": 1,
                                            dataLabelFontColor: "#000",
                                            dataLabelVisible: true,
                                            dataLabelBorderWidth: 20,
                                            dataLabelBorderRadius: 6,
                                            dataLabelBackgroundColor: "#fff",
                                            "fill": true,
                                            "legendLabel": "Base"
                                        },
                                            {
                                                "type": "line",
                                                "backgroundColor": "#007AFF",
                                                "borderColor": "#007AFF",
                                                "borderWidth": 2,
                                                "pointRadius": 0,
                                                "stack": 2,
                                                dataLabelFontColor: "#fff",
                                                dataLabelVisible: false,
                                                "fill": false,
                                                "legendLabel": "Budget"
                                            }],
                                        tooltipsEnabled: true,
                                        marginBottom: '50',
                                        skin: 'combochartFTE',
                                        legendGroupByStack: true,
                                        bezierCurve: false,
                                        xAxesGridLinesDisplay: true,
                                        xAxesGridLinesDrawBorder: true,
                                        xAxesTicksFontSize: 14,
                                        xAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        xAxesTicksFontColor: '#333333',
                                        xAxesTicksBegintAtZero: false,
                                        xAxesTicksPadding: 10,
                                        xAxesLabelFontSize: 12,
                                        xAxesLabelFontFamily: 'imago, sans-serif',
                                        xAxesLabelFontColor: '#747b85',
                                        xAxesZeroLineColor: '#dee1e5',
                                        leftYAxesDisplay: true,
                                        leftYAxesStacked: false,
                                        leftYAxesZeroLineColor: '#dee1e5',
                                        leftYAxesGridLinesDisplay: true,
                                        leftYAxesGridLinesDrawBorder: true,
                                        leftYAxesGridLinesColor: '#dee1e5',
                                        leftYAxesGridLinesDrawOnChartArea: true,
                                        leftYAxesGridLinesDrawTicks: true,
                                        leftYAxesLabelFontSize: 12,
                                        leftYAxesLabelFontFamily: 'imago, sans-serif',
                                        leftYAxesLabelFontColor: '#747b85',
                                        leftYAxesLabelFontStyle: 'normal',
                                        leftYAxesLabelPadding: 10,
                                        leftYAxesTicksFontSize: 21,
                                        leftYAxesTicksPadding: 20,
                                        leftYAxesTicksFontStyle: 'normal',
                                        leftYAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        leftYAxesTicksFontColor: '#333333',
                                        leftYAxesTicksDisplay: true,
                                        rightYAxesLabelFontSize: 12,
                                    }
                                ]
                            }]
                    },

                    {
                        id: 'hrdemoReportChart1GridTitle2Row',
                        type: GridRowWidget,
                        visible: false,
                        marginTop: '50',
                        widgets: [

                            {
                                id: 'hrdemoReportChart1GridTitle2Cell1',
                                type: GridCellWidget,
                                marginLeft: '40',
                                alignment: 'center-left',
                                width: '50%',
                                widgets: [
                                    {
                                        id: 'hrdemoReportChart1GridTitle2Text1',
                                        type: TextWidget,
                                        title: 'FTE / Hay or agile level',
                                        titleFontSize: 21,
                                        titleFontColor: '#a0a4ab'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoReportChart1GridTitle2Cell2',
                                type: GridCellWidget,
                                marginLeft: '40',
                                alignment: 'center-left',
                                width: '50%',
                                widgets: [
                                    {
                                        id: 'hrdemoReportChart1GridTitle2Text2',
                                        type: TextWidget,
                                        title: 'Competence levels',
                                        titleFontSize: 24,
                                        titleFontColor: '#a0a4ab'
                                    }
                                ]
                            }]
                    },
                    {
                        id: 'hrdemoReportChart1GridRow2',
                        type: GridRowWidget,
                        visible: false,
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoReportChart1GridCell2_1',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '50%',
                                widgets: [
                                    {
                                        id: 'hrdemoReportChart3',
                                        type: ComboChartWidget,
                                        width: '800',
                                        height: '400',
                                        title: '',
                                        datasets: [{
                                            "type": "bar",
                                            "backgroundColor": "#34C759",
                                            "borderColor": "#34C759",
                                            "borderWidth": 1,
                                            "pointRadius": 1,
                                            "stack": 1,
                                            dataLabelFontColor: "#fff",
                                            dataLabelVisible: true,
                                            "fill": true,
                                            "legendLabel": "Base"
                                        },
                                            {
                                                "type": "bar",
                                                "backgroundColor": "#007AFF",
                                                "borderColor": "#007AFF",
                                                "borderWidth": 3,
                                                "pointRadius": 2,
                                                "stack": 2,
                                                dataLabelFontColor: "#fff",
                                                dataLabelVisible: true,
                                                "fill": false,
                                                "legendLabel": "Budget"
                                            }],
                                        tooltipsEnabled: false,
                                        marginBottom: '50',
                                        skin: 'combochartFTE',
                                        legendGroupByStack: true,
                                        bezierCurve: false,
                                        xAxesGridLinesDisplay: true,
                                        xAxesGridLinesDrawBorder: true,
                                        xAxesTicksFontSize: 14,
                                        xAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        xAxesTicksFontColor: '#000000',
                                        xAxesTicksBegintAtZero: false,
                                        xAxesTicksPadding: 10,
                                        xAxesLabelFontSize: 12,
                                        xAxesLabelFontFamily: 'imago, sans-serif',
                                        xAxesLabelFontColor: '#747b85',
                                        xAxesZeroLineColor: '#dee1e5',
                                        leftYAxesDisplay: true,
                                        leftYAxesStacked: false,
                                        leftYAxesZeroLineColor: '#dee1e5',
                                        leftYAxesGridLinesDisplay: true,
                                        leftYAxesGridLinesDrawBorder: true,
                                        leftYAxesGridLinesColor: '#dee1e5',
                                        leftYAxesGridLinesDrawOnChartArea: true,
                                        leftYAxesGridLinesDrawTicks: true,
                                        leftYAxesLabelFontSize: 12,
                                        leftYAxesLabelFontFamily: 'imago, sans-serif',
                                        leftYAxesLabelFontColor: '#747b85',
                                        leftYAxesLabelFontStyle: 'normal',
                                        leftYAxesLabelPadding: 10,
                                        leftYAxesTicksFontSize: 21,
                                        leftYAxesTicksPadding: 20,
                                        leftYAxesTicksFontStyle: 'normal',
                                        leftYAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        leftYAxesTicksFontColor: '#000000',
                                        rightYAxesLabelFontColor: '#747b85',
                                        rightYAxesLabelFontSize: 12,
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoReportChart1GridCell2_2',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '50%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart4',
                                        type: ComboChartWidget,
                                        width: '800',
                                        height: '400',
                                        title: '',
                                        listen: [{
                                            "event": "choose.sandyDevReportControlGridDropbox3.finished",
                                            "method": "refresh"
                                        }, {
                                            "event": "choose.sandyDevReportControlGridDropbox4.finished",
                                            "method": "refresh"
                                        }, {
                                            "event": "choose.sandyDevReportControlGridDropboxOrgUnit.finished",
                                            "method": "refresh"
                                        }, {
                                            "event": "choose.sandyDevReportControlGridDropbox1.finished",
                                            "method": "refresh"
                                        }],
                                        datasets: [{
                                            "type": "bar",
                                            "backgroundColor": "#34C759",
                                            "borderColor": "#34C759",
                                            "borderWidth": 1,
                                            "pointRadius": 1,
                                            "stack": 1,
                                            dataLabelFontColor: "#fff",
                                            dataLabelVisible: true,
                                            "fill": true,
                                            "legendLabel": "Base"
                                        },
                                            {
                                                "type": "bar",
                                                "backgroundColor": "#007AFF",
                                                "borderColor": "#007AFF",
                                                "borderWidth": 3,
                                                "pointRadius": 2,
                                                "stack": 2,
                                                dataLabelFontColor: "#fff",
                                                dataLabelVisible: true,
                                                "fill": false,
                                                "legendLabel": "Budget"
                                            }],
                                        tooltipsEnabled: false,
                                        marginBottom: '50',
                                        skin: 'combochartFTE',
                                        legendGroupByStack: true,
                                        bezierCurve: false,
                                        xAxesGridLinesDisplay: true,
                                        xAxesGridLinesDrawBorder: true,
                                        xAxesTicksFontSize: 12,
                                        xAxesTicksFontFamily: 'imago, sans-serif',
                                        xAxesTicksFontColor: '#747b85',
                                        xAxesTicksBegintAtZero: false,
                                        xAxesTicksPadding: 10,
                                        xAxesLabelFontSize: 12,
                                        xAxesLabelFontFamily: 'imago, sans-serif',
                                        xAxesLabelFontColor: '#747b85',
                                        xAxesZeroLineColor: '#dee1e5',
                                        leftYAxesDisplay: true,
                                        leftYAxesStacked: false,
                                        leftYAxesZeroLineColor: '#dee1e5',
                                        leftYAxesGridLinesDisplay: true,
                                        leftYAxesGridLinesDrawBorder: true,
                                        leftYAxesGridLinesColor: '#dee1e5',
                                        leftYAxesGridLinesDrawOnChartArea: true,
                                        leftYAxesGridLinesDrawTicks: true,
                                        leftYAxesLabelFontSize: 12,
                                        leftYAxesLabelFontFamily: 'imago, sans-serif',
                                        leftYAxesLabelFontColor: '#747b85',
                                        leftYAxesLabelFontStyle: 'normal',
                                        leftYAxesLabelPadding: 10,
                                        leftYAxesTicksFontSize: 12,
                                        leftYAxesTicksFontFamily: 'imago, sans-serif',
                                        leftYAxesTicksFontColor: '#747b85',
                                        rightYAxesLabelFontSize: 12,
                                    }
                                ]
                            }]
                    }]
            },

            {
                id: 'hrdemoReportChart2SectionRow',
                type: GridRowWidget,
                marginTop: '100',
                alignment: 'left',
                width: '100%',
                skin: 'noskin',
                widgets: [

                    {
                        id: 'hrdemoReportChart2SectionCell1',
                        type: GridCellWidget,
                        alignment: 'center-center',
                        widgets: [

                            {
                                id: 'hrdemoReportChart2SectionText',
                                type: TextWidget,
                                title: 'HR Cost 1-2',
                                marginLeft: '130',
                                titleFontWeight: 600,
                                skin: 'deepblue_text',
                                titleFontSize: 24
                            },
                            {
                                id: 'hrdemoReportChart2SectionButton',
                                type: ButtonWidget,
                                label: '',
                                action: '',
                                width: '20',
                                icon: 'icon-info',
                                iconFontSize: '25',
                                marginLeft: '10',
                                skin: 'infobutton',
                                iconColor: '#007AFF'
                            }
                        ]
                    }]
            },

            {
                id: 'hrdemoReportChart2Grid',
                type: GridWidget,
                marginRight: '50',
                marginTop: '50',
                widgets: [

                    {
                        id: 'hrdemoReportChart2GridTitleRow',
                        type: GridRowWidget,
                        widgets: [

                            {
                                id: 'hrdemoReportChart2GridTitleCell1',
                                type: GridCellWidget,
                                marginLeft: '150',
                                alignment: 'center-left',
                                width: '100%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart2GridTitleText1',
                                        type: TextWidget,
                                        title: 'TWM (mHUF)',
                                        titleFontSize: 21,
                                        titleFontColor: '#a0a4ab'
                                    }
                                ]
                            }]
                    },

                    {
                        id: 'hrdemoReportChart2GridRow',
                        type: GridRowWidget,
                        widgets: [

                            {
                                id: 'hrdemoReportChart2GridCell1',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '100%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart5',
                                        type: ComboChartWidget,
                                        width: '1100',
                                        height: '550',
                                        title: '',
                                        datasets: [{
                                            "type": "bar",
                                            "backgroundColor": "#34C759",
                                            "borderColor": "#34C759",
                                            "borderWidth": 1,
                                            "pointRadius": 1,
                                            "stack": 1,
                                            dataLabelFontColor: "#000",
                                            dataLabelBackgroundColor: "#fff",
                                            dataLabelBorderWidth: 20,
                                            dataLabelBorderRadius: 6,
                                            dataLabelVisible: true,
                                            "fill": true,
                                            "legendLabel": "Base"
                                        },
                                            {
                                                "type": "line",
                                                "backgroundColor": "#007aff",
                                                "borderColor": "#007aff",
                                                "borderWidth": 3,
                                                "pointRadius": 2,
                                                "stack": 2,
                                                dataLabelFontColor: "#fff",
                                                dataLabelVisible: false,
                                                "fill": false,
                                                "legendLabel": "Budget"
                                            }],
                                        tooltipsEnabled: true,
                                        marginBottom: '50',
                                        skin: 'combochartFTE',
                                        legendGroupByStack: true,
                                        maintainAspectRatio: true,
                                        bezierCurve: false,
                                        xAxesGridLinesDisplay: true,
                                        xAxesGridLinesDrawBorder: true,
                                        xAxesGridLinesColor: '#dee1e5',
                                        xAxesTicksFontSize: 14,
                                        xAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        xAxesTicksFontColor: '#333333',
                                        xAxesTicksBegintAtZero: false,
                                        xAxesTicksPadding: 10,
                                        xAxesLabelFontSize: 12,
                                        xAxesLabelFontFamily: 'imago, sans-serif',
                                        xAxesLabelFontColor: '#747b85',
                                        xAxesZeroLineColor: '#dee1e5',
                                        leftYAxesDisplay: true,
                                        leftYAxesStacked: false,
                                        leftYAxesZeroLineColor: '#dee1e5',
                                        leftYAxesGridLinesDisplay: true,
                                        leftYAxesGridLinesDrawBorder: true,
                                        leftYAxesGridLinesColor: '#dee1e5',
                                        leftYAxesGridLinesDrawOnChartArea: true,
                                        leftYAxesGridLinesDrawTicks: true,
                                        leftYAxesLabelFontSize: 12,
                                        leftYAxesLabelFontFamily: 'imago, sans-serif',
                                        leftYAxesLabelFontColor: '#747b85',
                                        leftYAxesLabelFontStyle: 'normal',
                                        leftYAxesLabelPadding: 10,
                                        leftYAxesTicksFontSize: 21,
                                        leftYAxesTicksPadding: 20,
                                        leftYAxesTicksFontStyle: 'normal',
                                        leftYAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        leftYAxesTicksFontColor: '#333333',
                                        rightYAxesLabelFontColor: '#747b85',
                                        rightYAxesLabelFontSize: 12,
                                    }
                                ]
                            }]
                    },

                    {
                        id: 'hrdemoReportChart2GridRow2Text',
                        type: GridRowWidget,
                        width: '100%',
                        marginTop: 50,
                        widgets: [
                            {
                                id: 'hrdemoReportChart2GridRow2Title',
                                type: GridRowWidget,
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart2GridRow2TitleCell1',
                                        type: GridCellWidget,
                                        marginLeft: '150',
                                        alignment: 'center-left',
                                        width: '100%',
                                        widgets: [

                                            {
                                                id: 'hrdemoReportChart2GridRow2TitleText',
                                                type: TextWidget,
                                                title: 'Total Cost',
                                                titleFontSize: 21,
                                                titleFontColor: '#a0a4ab'
                                            }
                                        ]
                                    }]
                            }]
                    },
                    {
                        id: 'hrdemoReportChart2GridRow2',
                        type: GridRowWidget,
                        width: '100%',
                        marginTop: 100,
                        widgets: [
                            {
                                id: 'hrdemoReportChart2GridCell2',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '100%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportWaterFall',
                                        type: WaterFallWidget,
                                        width: '1400',
                                        height: '400',
                                        title: '',
                                        minYAxis: '100',
                                        maxYAxis: '1100',
                                        dataset1: {
                                            datapoints: [
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'},
                                                {positiveColor: '#34C759', negativeColor: '#FF3B30'}
                                            ]
                                        },
                                        tooltipsEnabled: true,
                                        marginBottom: '50',
                                        xAxisLabels: [
                                            {value: 'Total Cost 2022'},
                                            {value: 'Calculated Salary'},
                                            {value: 'Bonus'},
                                            {value: 'Auto Allowance'},
                                            {value: 'Other Benefits'},
                                            {value: 'Employer Contributions'},
                                            {value: 'Social Security'},
                                            {value: 'Pension Fund'},
                                            {value: 'Health Insurance'},
                                            {value: 'Total Cost 2023'}
                                        ],
                                        labelVisible: true,
                                        legendVisible: false,
                                        yAxisGridLineNum: 4
                                    }
                                ]
                            }]
                    },

                    {
                        id: 'hrdemoReportChart6GridTitle6Row',
                        type: GridRowWidget,
                        marginTop: '100',
                        widgets: [

                            {
                                id: 'hrdemoReportChart6GridTitle6Cell1',
                                type: GridCellWidget,
                                marginLeft: '150',
                                alignment: 'center-left',
                                width: '10%',
                                widgets: [
                                    {
                                        id: 'hrdemoReportChart6GridTitle6Text1',
                                        type: TextWidget,
                                        title: 'Budget',
                                        titleFontSize: 21,
                                        titleFontColor: '#a0a4ab'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoReportChart6GridRow6',
                        type: GridRowWidget,
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoReportChart6GridCell6',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '100%',
                                widgets: [

                                    {
                                        id: 'hrdemoReportChart6',
                                        type: ComboChartWidget,
                                        width: '1000',
                                        height: '600',
                                        title: '',
                                        listen: [],
                                        datasets: [{
                                            "type": "bar",
                                            "backgroundColor": "#34C759",
                                            "borderColor": "#34C759",
                                            "borderWidth": 1,
                                            "pointRadius": 1,
                                            dataLabelFontColor: "#000",
                                            dataLabelBackgroundColor: "#fff",
                                            dataLabelBorderWidth: 20,
                                            dataLabelBorderRadius: 6,
                                            "stack": 1,
                                            dataLabelVisible: true,
                                            "fill": true,
                                            "legendLabel": "Base Period"
                                        }],
                                        tooltipsEnabled: false,
                                        marginBottom: '50',
                                        skin: 'displaynone',
                                        legendGroupByStack: true,
                                        bezierCurve: false,
                                        xAxesGridLinesDisplay: true,
                                        xAxesGridLinesDrawBorder: true,
                                        xAxesTicksFontSize: 14,
                                        xAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        xAxesTicksFontColor: '#333333',
                                        xAxesTicksBegintAtZero: false,
                                        xAxesTicksPadding: 10,
                                        xAxesLabelFontSize: 12,
                                        xAxesLabelFontFamily: 'imago, sans-serif',
                                        xAxesLabelFontColor: '#747b85',
                                        xAxesZeroLineColor: '#dee1e5',
                                        leftYAxesDisplay: true,
                                        leftYAxesStacked: false,
                                        legendVisible: false,
                                        leftYAxesZeroLineColor: '#dee1e5',
                                        leftYAxesGridLinesDisplay: true,
                                        leftYAxesGridLinesDrawBorder: true,
                                        leftYAxesGridLinesColor: '#dee1e5',
                                        leftYAxesGridLinesDrawOnChartArea: true,
                                        leftYAxesGridLinesDrawTicks: true,
                                        leftYAxesLabelFontSize: 12,
                                        leftYAxesLabelFontFamily: 'imago, sans-serif',
                                        leftYAxesLabelFontColor: '#747b85',
                                        leftYAxesLabelFontStyle: 'normal',
                                        leftYAxesLabelPadding: 10,
                                        leftYAxesTicksFontSize: 21,
                                        leftYAxesTicksPadding: 20,
                                        leftYAxesTicksFontStyle: 'normal',
                                        leftYAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
                                        leftYAxesTicksFontColor: '#333333',
                                        rightYAxesLabelFontSize: 12,
                                    }
                                ]
                            }]
                    }]
            },


        ]
    },

    hrdemoGroups: {
        id: 'hrdemoGroups',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoGroupsGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoGroupsRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoGroupsRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupsRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        marginTop: '8px',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoGroupsRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'center-left',
                                width: '18%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupsRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'Manage Groups',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },
                                ]
                            },

                            {
                                id: 'hrdemoGroupsRow1Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '74%',
                                skin: '',
                                height: '0',
                                widgets: []
                            },
                            {
                                import: 'panels.hrDemoUserButtonPanel'
                            },
                        ]
                    },

                    {
                        id: 'hrdemoGroupsRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoGroupsRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'center-left',
                                paddingLeft: '20px',
                                width: '10%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupsRow2Cell1Button',
                                        type: ButtonWidget,
                                        width: '120px',
                                        label: 'New Group',
                                        skin: 'blue_background_button_hrdemo',
                                        iconColor: '#ffffff',
                                    },

                                ]
                            },]
                    }

                ]
            },
            {
                import: 'popups.hrdemoDeleteGroupPopup'
            },
            {
                import: 'popups.hrdemoNewGroupPopup'
            },
            {
                id: 'hrdemoGroupsPageGridTable',
                type: GridTableWidget,
                marginTop: '30',
                hideIfNoData: true,
                skin: 'forecasting_forecast_hr',
                width: '45%',
                title: '',
                widgets: [
                    {
                        id: 'hrdemoGroupsPageGridTableHeaderRow',
                        type: GridTableHeaderRowWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoGroupsPageGridTableHeaderCell-1',
                                type: GridTableHeaderCellWidget,
                                width: '50%',
                                skin: 'border_bottom',
                                alignment: 'bottom-left',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupsPageGridTableHeaderCell1Text',
                                        type: TextWidget,
                                        title: 'Group Name',
                                        paddingLeft: '10px',
                                        cellHeaderSkin: 'no_border_bpsp',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoGroupsPageGridTableHeaderCell-2',
                                type: GridTableHeaderCellWidget,
                                alignment: 'bottom-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupsPageGridTableHeaderText-02',
                                        type: TextWidget,
                                        title: 'Members',
                                        paddingLeft: '8px',
                                        cellHeaderSkin: 'no_border_bpsp',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoGroupsPageGridTableHeaderCell-5',
                                type: GridTableHeaderCellWidget,
                                alignment: 'bottom-left',
                                width: '45%',
                                widgets: [
                                    {
                                        id: 'hrdemoGroupsPageGridTableHeaderText-05',
                                        type: TextWidget,
                                        title: 'Created',
                                        paddingLeft: '8px',
                                        cellHeaderSkin: 'no_border_bpsp',
                                        titleFontWeight: 'bold',
                                        paddingBottom: '8px'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoGroupsPageGridTableHeaderCell-3',
                                type: GridTableHeaderCellWidget,
                                width: '7.5%',
                                alignment: 'bottom-left',
                                cellHeaderSkin: '',
                                widgets: []
                            },
                            {
                                id: 'hrdemoGroupsPageGridTableHeaderCell-4',
                                type: GridTableHeaderCellWidget,
                                width: '7.5%',
                                cellHeaderSkin: 'no_border',
                                alignment: 'bottom-left',
                                widgets: []
                            },

                        ]
                    },
                    {
                        id: 'hrdemoGroupsPageGridTableCell-1',
                        type: GridTableCellWidget,
                        width: '50%',
                        alignment: 'center-left',
                        widgets: [
                            {
                                id: 'hrdemoGroupsPageGridTableButton-01',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoGroupsPageGridTableCell-2',
                        type: GridTableCellWidget,
                        alignment: 'center-center',
                        width: '15%',
                        widgets: [
                            {
                                id: 'hrdemoGroupsPageGridTableText-02',
                                type: TextWidget,
                                titleAlignment: 'center'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoGroupsPageGridTableCell-5',
                        type: GridTableCellWidget,
                        alignment: 'center-left',
                        width: '45%',
                        widgets: [
                            {
                                id: 'hrdemoGroupsPageGridTableText-05',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoGroupsPageGridTableCell-3',
                        type: GridTableCellWidget,
                        alignment: 'center-left',
                        width: '7.5%',
                        widgets: [
                            {
                                id: 'hrdemoGroupsPageGridTableButton4',
                                type: ButtonWidget,
                                icon: '',
                                skin: 'chartGT_bpsp',
                            }
                        ]
                    },
                    {
                        id: 'hrdemoGroupsPageGridTableCell-4',
                        type: GridTableCellWidget,
                        alignment: 'center-center',
                        skin: 'group',
                        width: '7.5%',
                        widgets: [
                            {
                                id: 'hrdemoGroupsPageGridTableButton5',
                                type: ButtonWidget,
                                icon: '',
                                skin: 'chartGT_bpsp',
                            }
                        ]
                    },
                ]

            },
        ]
    },
    hrdemoPeopleServiceTeamEditor: {
        id: 'hrdemoPeopleServiceTeamEditor',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoPeopleServiceTeamEditorShadow',
                type: ShadowWidget
            },
            {
                id: 'hrdemoPeopleServiceTeamEditorGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoPeopleServiceTeamEditorRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamEditorRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        marginTop: '8px',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamEditorRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'top-left',
                                width: '30%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow2Cell1Tittle',
                                        type: TextWidget,
                                        title: '',
                                        titleFontSize: '36',
                                        skin: 'nowrap',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow2Cell1Title2',
                                        type: TextWidget,
                                        title: 'Edit Name',
                                        marginTop: '23px',
                                        titleFontSize: '12',
                                        skin: 'nowrap',
                                        titleFontColor: '#007AFF',
                                        marginLeft: '40px',
                                        titleFontWeight: 'bold',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamEditorRow1Cell4',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '68%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow1Cell4Button1',
                                        type: ButtonWidget,
                                        icon: '',
                                        width: '105px',
                                        heigth: '40px',
                                        marginRight: '10px',
                                        skin: 'ligthblue_background_button_hrdemo',
                                        label: 'Cancel'

                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow1Cell4Button2',
                                        type: ButtonWidget,
                                        icon: '',
                                        width: '105px',
                                        marginRight: '30px',
                                        heigth: '40px',
                                        skin: 'blue_background_button_hrdemo',
                                        label: 'Save'
                                    }

                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamEditorRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamEditorRow2Cell2',
                                type: GridCellWidget,
                                marginLeft: '550',
                                marginRight: '0',
                                marginTop: '20',
                                alignment: 'top-center',
                                width: '70%',
                                skin: '',
                                height: '0',
                                widgets: [

                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '320',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        widgets: [

                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: 'Editor',
                                            },
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: 'List',
                                            },
                                        ]
                                    }

                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamEditorRow3',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        visible: false,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamEditorRow3Cell1',
                                type: GridCellWidget,
                                marginTop: '20',
                                alignment: 'top-left',
                                width: '3%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow3Cell1Text1',
                                        type: TextWidget,
                                        title: 'Filters',
                                        icon: 'icon-plus-circle',
                                        skin: 'filter_text'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamEditorRow3Cell2',
                                type: GridCellWidget,
                                marginTop: '20',
                                alignment: 'center-left',
                                width: '90%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow3FilterPanelTable',
                                        type: GridTableWidget,
                                        title: '',
                                        skin: 'one_row',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorRow3FilterPanelTableCell-01',
                                                type: GridTableCellWidget,
                                                alignment: 'center-left',
                                                skin: 'selected_filter',
                                                marginLeft: 20,
                                                height: 40,
                                                width: '',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoPeopleServiceTeamEditorRow3FilterPanelTableText-01',
                                                        type: TextWidget,
                                                        icon: 'icon-x-circle',
                                                        iconColor: '#007AFF',
                                                        marginLeft: 10,
                                                        marginTop: 5,
                                                        titleFontWeight: 0,
                                                        iconCustomEventName: 'clear_filter',
                                                        marginRight: 10,
                                                        skin: 'selected_filter',
                                                        iconPosition: 'right'
                                                    },
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorRow3Cell3Text1',
                                        type: ButtonWidget,
                                        label: 'Clear all',
                                        skin: 'material_hrdemo_rv',
                                        visible: false,
                                        marginTop: '10px',
                                        marginLeft: '10px',
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        import: 'popups.hrdemoEditGroupPopup'
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamEditorPanel',
                        type: PanelWidget,
                        skin: 'hierarchy',
                        marginTop: 50,
                        height: 800,
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamEditorLevel1GridTable',
                                type: GridTableWidget,
                                listen: [],
                                title: '',
                                hideIfNoData: true,
                                skin: 'hierarchyGridTable_hays',
                                height: '800',
                                allowChangedDataUpdate: false,
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableHeaderRow',
                                        type: GridTableHeaderRowWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableHeaderCell',
                                                type: GridTableHeaderCellWidget,
                                                alignment: 'center-left',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableHeader',
                                                        type: TextWidget,
                                                        title: 'Department',
                                                        paddingLeft: '8px',
                                                        titleFontWeight: 'bold',
                                                        paddingBottom: '8px'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableCell01',
                                        type: GridTableCellWidget,
                                        alignment: 'center-left',
                                        width: '40',
                                        skin: 'hierarchyCell_hays',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableCell01Text',
                                                type: ToggleWidget,
                                                icon: 'icon-checkbox-on11',
                                                iconOff: 'icon-checkbox-off1',
                                                iconPosition: 'left',
                                                skin: 'page_toggle',
                                                width: 40,
                                                height: '40'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableCell02',
                                        type: GridTableCellWidget,
                                        alignment: 'center-left',
                                        skin: 'hierarchyCell_hays',
                                        width: '320',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorLevel1GridTableCell02Text',
                                                type: TextWidget,
                                                visible: true,
                                                width: '320',
                                                icon: 'icon-chevron-right',
                                                skin: 'Hierarchy_Off_Hays',
                                                height: '40',
                                                iconCustomEventName: 'text_click'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamEditorLevel2GridTable',
                                type: GridTableWidget,
                                hideIfNoData: true,
                                height: '800',
                                skin: 'hierarchyGridTable_hays',
                                title: '',
                                allowChangedDataUpdate: false,
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableHeaderRow',
                                        type: GridTableHeaderRowWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableHeaderCell',
                                                type: GridTableHeaderCellWidget,
                                                alignment: 'center-left',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableHeader',
                                                        type: TextWidget,
                                                        title: 'Team',
                                                        paddingLeft: '8px',
                                                        titleFontWeight: 'bold',
                                                        paddingBottom: '8px'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableCell01',
                                        type: GridTableCellWidget,
                                        alignment: 'center-left',
                                        skin: 'hierarchyCell_hays',
                                        width: '40',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableCell01Text',
                                                type: ToggleWidget,
                                                icon: 'icon-checkbox-on11',
                                                iconOff: 'icon-checkbox-off1',
                                                iconPosition: 'left',
                                                skin: 'page_toggle',
                                                height: '40'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableCell02',
                                        type: GridTableCellWidget,
                                        alignment: 'center-center',
                                        skin: 'hierarchyCell_hays',
                                        width: '320',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorLevel2GridTableCell02Text',
                                                type: TextWidget,
                                                visible: true,
                                                width: '320',
                                                icon: 'icon-chevron-right',
                                                skin: 'Hierarchy_Off_Hays',
                                                height: '40',
                                                iconCustomEventName: 'text_click'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamEditorGridTable',
                                type: GridTableWidget,
                                hideIfNoData: true,
                                height: '800',
                                skin: 'hierarchyGridTable_hays',
                                title: '',
                                allowChangedDataUpdate: false,
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorGridTableHeaderRow',
                                        type: GridTableHeaderRowWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorGridTableHeaderCell',
                                                type: GridTableHeaderCellWidget,
                                                alignment: 'center-left',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoPeopleServiceTeamEditorGridTableHeaderCell1Text',
                                                        type: TextWidget,
                                                        title: 'Members',
                                                        paddingLeft: '8px',
                                                        titleFontWeight: 'bold',
                                                        paddingBottom: '8px'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorGridTableCell01',
                                        type: GridTableCellWidget,
                                        alignment: 'center-left',
                                        skin: 'hierarchyCell_hays',
                                        width: '40',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorGridTableText-01',
                                                type: ToggleWidget,
                                                iconPosition: 'left',
                                                skin: 'page_toggle',
                                                height: '40'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamEditorGridTableCell02',
                                        type: GridTableCellWidget,
                                        alignment: 'center-left',
                                        skin: 'hierarchyCell_hays',
                                        width: '320',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamEditorGridTableText-02',
                                                type: TextWidget,
                                                width: '320',
                                                icon: 'icon-chevron-right',
                                                skin: 'Hierarchy_Off_Hays',
                                                height: '40',
                                                iconCustomEventName: 'text_click'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceEmployeeDetailsGridTable',
                                type: GridTableWidget,
                                marginLeft: '10',
                                marginRight: '10',
                                title: '',
                                skin: 'employee_details',
                                width: '290',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceEmployeeDetailsGridTableHeaderRow',
                                        type: GridTableHeaderRowWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell',
                                                type: GridTableHeaderCellWidget,
                                                alignment: 'center-center',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text',
                                                        type: ImageWidget,
                                                        title: '',
                                                        marginLeft: 25,
                                                        width: 250,
                                                        height: 250
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceEmployeeDetailsGridTableCell01',
                                        type: GridTableCellWidget,
                                        width: '25%',
                                        alignment: 'center-left',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceEmployeeDetailsGridTableText-01',
                                                type: TextWidget,
                                                titleFontColor: '#747B85',
                                                skin: 'employee_details_table'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceEmployeeDetailsGridTableCell02',
                                        type: GridTableCellWidget,
                                        width: '75%',
                                        alignment: 'center-left',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceEmployeeDetailsGridTableText-02',
                                                type: TextWidget,
                                                skin: 'employee_details_table'
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        import: 'popups.hrdemoFilterPopup'
                    },
                    {
                        import: 'popups.hrdemoFilterDetailsPopup'
                    }
                ]
            },

        ]
    },

    hrdemoPeopleServiceTeamList: {
        id: 'hrdemoPeopleServiceTeamList',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoPeopleServiceTeamListGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoPeopleServiceTeamListRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamListRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        iconFontSize: '20',
                                        marginTop: '8px',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'top-left',
                                width: '30%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow2Cell1Tittle',
                                        type: TextWidget,
                                        title: '',
                                        skin: 'nowrap',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow2Cell1Tittle2',
                                        type: TextWidget,
                                        title: 'Edit Name',
                                        marginTop: '23px',
                                        titleFontSize: '12',
                                        skin: 'nowrap',
                                        titleFontColor: '#007AFF',
                                        marginLeft: '40px',
                                        titleFontWeight: 'bold',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListRow1Cell4',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '68%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow1Cell4Button1',
                                        type: ButtonWidget,
                                        icon: '',
                                        width: '105px',
                                        heigth: '40px',
                                        marginRight: '10px',
                                        skin: 'ligthblue_background_button_hrdemo',
                                        label: 'Cancel'

                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow1Cell4Button2',
                                        type: ButtonWidget,
                                        icon: '',
                                        width: '105px',
                                        marginRight: '30px',
                                        heigth: '40px',
                                        skin: 'blue_background_button_hrdemo',
                                        label: 'Save'
                                    }

                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamListRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamListRow2Cell2',
                                type: GridCellWidget,
                                marginLeft: '550',
                                marginRight: '0',
                                marginTop: '20',
                                alignment: 'top-center',
                                width: '70%',
                                skin: '',
                                height: '0',
                                widgets: [

                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow2Cell1SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '320',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        widgets: [

                                            {
                                                id: 'hrdemoPeopleServiceTeamListRow2Cell1SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: false,
                                                label: 'Editor',
                                            },
                                            {
                                                id: 'hrdemoPeopleServiceTeamListRow2Cell1SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: true,
                                                label: 'List',
                                            },
                                        ]
                                    }

                                ]
                            },

                        ]
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamListRow4',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        marginBottom: '0%',
                        width: '100%',
                        height: '10%',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamListRow4Cell1',
                                type: GridCellWidget,
                                alignment: 'bottom',
                                marginTop: '7px',
                                marginLeft: '15px',
                                width: '100%',
                                widgets: [

                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow4Cell1Search',
                                        type: TextBoxWidget,
                                        width: '400',
                                        defaultText: 'Search...',
                                        skin: 'searchbox',
                                        height: '40'
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow2Cell3',
                                        type: GridCellWidget,
                                        marginTop: '40',
                                        alignment: 'top-right',
                                        width: '78%',
                                        skin: '',
                                        height: '0',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListRow2Cell3Tittle',
                                                type: TextWidget,
                                                title: 'View',
                                                icon: 'icon-columns-3-fill',
                                                marginTop: '4px',
                                                titleFontSize: '13',
                                                iconPosition: 'left',
                                                skin: 'blue_label_hrdemo',
                                                titleFontColor: '#007AFF',
                                                marginLeft: '10px',
                                                titleFontWeight: 'bold',
                                            },

                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamListRow3',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamListRow3Cell1',
                                type: GridCellWidget,
                                marginTop: '20',
                                alignment: 'top-left',
                                width: '3%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow3Cell1Text1',
                                        type: TextWidget,
                                        title: 'Filters',
                                        icon: 'icon-plus-circle',
                                        skin: 'filter_text'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListRow3Cell2',
                                type: GridCellWidget,
                                marginTop: '20',
                                alignment: 'center-left',
                                width: '90%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow3FilterPanelTable',
                                        type: GridTableWidget,
                                        title: '',
                                        skin: 'one_row',
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListRow3FilterPanelTableCell-01',
                                                type: GridTableCellWidget,
                                                alignment: 'center-left',
                                                skin: 'selected_filter',
                                                marginLeft: 20,
                                                height: 40,
                                                width: '',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoPeopleServiceTeamListRow3FilterPanelTableText-01',
                                                        type: TextWidget,
                                                        icon: 'icon-x-circle',
                                                        iconColor: '#007AFF',
                                                        marginLeft: 10,
                                                        marginTop: 5,
                                                        titleFontWeight: 0,
                                                        iconCustomEventName: 'clear_filter',
                                                        marginRight: 10,
                                                        skin: 'selected_filter',
                                                        iconPosition: 'right'
                                                    },
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListRow3Cell3Text1',
                                        type: ButtonWidget,
                                        label: 'Clear all',
                                        skin: 'material_hrdemo_rv',
                                        visible: false,
                                        marginTop: '10px',
                                        marginLeft: '10px',
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoPeopleServiceTeamListGridTable',
                        type: GridTableWidget,
                        marginTop: '30',
                        hideIfNoData: true,
                        skin: 'hrdemo_list_table',
                        title: '',
                        listen: [
                            {
                                event: 'writeKey.hrdemoPeopleServiceTeamListRow4Cell1Search.finished',
                                method: 'forceRefreshWithoutLoader'
                            }
                        ],
                        widgets: [
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderRow',
                                type: GridTableHeaderRowWidget,
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1',
                                                type: TextWidget,
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-2',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-2',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-3',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-3',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-4',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-4',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-5',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-5',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-6',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-6',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-7',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-7',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-8',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-8',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-9',
                                        type: GridTableHeaderCellWidget,
                                        widgets: [
                                            {
                                                id: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-9',
                                                type: TextWidget
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-1',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-01',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-2',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-02',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-3',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-03',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-4',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-04',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-5',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-05',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-6',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-06',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-7',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-07',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-8',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-08',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPeopleServiceTeamListGridTableCell-9',
                                type: GridTableCellWidget,
                                width: '12.5%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoPeopleServiceTeamListGridTableText-09',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '320px',
                                        titleFontSize: 13
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                import: 'popups.hrdemoViewGroupPopup'
            },
            {
                import: 'popups.hrdemoEditGroupPopup'
            },
            {
                import: 'popups.hrdemoFilterPopup'
            },
            {
                import: 'popups.hrdemoFilterDetailsPopup'
            }
        ]
    },

    hrdemoSimulation: {
        id: 'hrdemoSimulation',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoSimulationGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoSimulationRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoSimulationRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        marginTop: '8px',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'center-left',
                                width: '15%',
                                skin: '',
                                height: '0',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'Simulation',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationRow1Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-center',
                                width: '74%',
                                skin: '',
                                height: '0',
                                widgets: [

                                    {
                                        id: 'hrdemoSimulationRow1Cell3SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '320',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        widgets: [

                                            {
                                                id: 'hrdemoSimulationRow1Cell3SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: 'Simulation',
                                            },
                                            {
                                                id: 'hrdemoSimulationRow1Cell3SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: 'Group Budget',
                                            },
                                        ]
                                    }

                                ]
                            },
                            {
                                import: 'panels.hrDemoUserButtonPanel'
                            },
                        ]
                    },

                    {
                        id: 'hrdemoSimulationRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '12%',
                                marginLeft: '40px',
                                widgets: [


                                    {
                                        id: 'hrdemoSimulationRow2Cell1Text',
                                        type: TextWidget,
                                        icon: 'icon-rectangle-stack',
                                        width: '260px',
                                        marginLeft: 10,
                                        skin: 'dropbox_text_hrdemo',
                                        title: 'Personal draft - best case',
                                        listen: [
                                            /*       {
                                                event: 'choose.hrdemoIncomePlanningProjectSelectorPopupDropbox.finished',
                                             method: 'refresh'
                                               }*/
                                        ]
                                    },

                                ]
                            },
                            {
                                id: 'hrdemoSimulationRow2Cell2',
                                type: GridCellWidget,
                                marginLeft: '35px',
                                width: '15%',
                                skin: 'rightborder',
                                widgets: [

                                    {
                                        id: 'hrdemoSimulationRow2Cell2Button',
                                        type: ButtonWidget,
                                        icon: 'icon-blocks-compare',
                                        label: 'Compare Versions',
                                        //skin: 'blue_label_hrdemo'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationRow2Cell3',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '12%',
                                skin: '',
                                height: '0',
                                widgets: [

                                    {
                                        id: 'hrdemoSimulationRow2Cell3Text',
                                        type: TextWidget,
                                        icon: 'icon-people-3',
                                        width: '260px',
                                        marginLeft: 10,
                                        iconColor: '#007AFF',
                                        skin: 'dropbox_text_hrdemo2',
                                        title: '',
                                    },
                                ]
                            },

                            {
                                id: 'hrdemoSimulationRow2Cell4',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '10%',
                                skin: '',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow2Cell4Button',
                                        type: ButtonWidget,
                                        icon: 'icon-edit2',
                                        label: 'Edit The Group',
                                        skin: 'blue_label_hrdemo'

                                    },

                                ]
                            },

                            {
                                id: 'hrdemoSimulationRow2Cell5',
                                type: GridCellWidget,
                                alignment: 'center-right',
                                width: '56%',
                                skin: '',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow2Cell5Button',
                                        type: ButtonWidget,
                                        width: '136px',
                                        visible: true,
                                        icon: 'icon-check-circle',
                                        label: 'Copy to budget',
                                        skin: 'blue_background_button_hrdemo',
                                        iconColor: '#ffffff',
                                        marginRight: '10px'
                                    },

                                ]
                            },
                        ]
                    },

                    {
                        id: 'hrdemoSimulationRow3',
                        type: GridRowWidget,
                        marginTop: '3.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationRow3Cell1',
                                type: GridCellWidget,
                                marginLeft: '50',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-right',
                                width: '35%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow3CellGauge',
                                        type: GaugeWidget,
                                        width: '200',
                                        colors: ["#007AFF", "#858686"],
                                        fontFamily: 'imago, sans-serif',
                                        skin: 'ReportKPIGauge',
                                        listen: []
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationRow3Cell2',
                                type: GridCellWidget,
                                alignment: 'center-left',
                                width: '65%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow3Cell2Panel',
                                        type: PanelWidget,
                                        marginLeft: '5%',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationRow3Cell2PanelGridTable',
                                                type: GridTableWidget,
                                                hideIfNoData: true,
                                                skin: 'compensation_change_gt',
                                                listen: [],
                                                title: '',
                                                width: '210%',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRow',
                                                        type: GridTableHeaderRowWidget,
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowCell-01',
                                                                type: GridTableHeaderCellWidget,
                                                                width: '25%',
                                                                alignment: 'bottom-center',
                                                                widgets: [
                                                                    {
                                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowText1',
                                                                        type: TextWidget,
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowCell-02',
                                                                type: GridTableHeaderCellWidget,
                                                                alignment: 'bottom-right',
                                                                width: '25%',
                                                                widgets: [
                                                                    {
                                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowText2',
                                                                        type: TextWidget,
                                                                        title: 'HR Cost Simulation',
                                                                        icon: 'icon-badge',
                                                                        titleFontColor: '#747B85',
                                                                        iconColor: '#007AFF',
                                                                        iconPosition: 'left',
                                                                        skin: 'blue_label_hrdemo'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowCell-03',
                                                                type: GridTableHeaderCellWidget,
                                                                width: '25%',
                                                                alignment: 'bottom-right',
                                                                widgets: [
                                                                    {
                                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowText3',
                                                                        type: TextWidget,
                                                                        title: 'HR Cost Planned',
                                                                        icon: 'icon-badge',
                                                                        iconPosition: 'left',
                                                                        titleFontColor: '#747B85',
                                                                        iconColor: '#747B85',
                                                                        skin: 'blue_label_hrdemo'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowCell-04',
                                                                type: GridTableHeaderCellWidget,
                                                                width: '25%',
                                                                alignment: 'bottom-right',
                                                                widgets: [
                                                                    {
                                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableHeaderRowText4',
                                                                        type: TextWidget,
                                                                        title: 'HR Cost Gap',
                                                                        titleFontColor: '#747B85',
                                                                        skin: 'blue_label_hrdemo',
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableCell-01',
                                                        type: GridTableCellWidget,
                                                        width: '25%',
                                                        alignment: 'center-center',
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableText-01',
                                                                type: TextWidget,
                                                                titleFontSize: 14,
                                                                titleAlignment: 'center',
                                                                titleFontColor: '#747B85',
                                                                titleFontWeight: '800'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableCell-02',
                                                        type: GridTableCellWidget,
                                                        alignment: 'center-right',
                                                        width: '25%',
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableText-02',
                                                                type: TextWidget,
                                                                fontSize: '14',
                                                                titleAlignment: 'end',
                                                                titleFontSize: 14,
                                                                titleFontWeight: '800'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableCell-03',
                                                        type: GridTableCellWidget,
                                                        alignment: 'center-right',
                                                        width: '25%',
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableText-03',
                                                                type: TextWidget,
                                                                titleFontSize: 14,
                                                                titleAlignment: 'end',
                                                                titleFontWeight: '800'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'hrdemoSimulationRow3Cell2PanelGridTableCell-04',
                                                        type: GridTableCellWidget,
                                                        alignment: 'center-right',
                                                        width: '25%',
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationRow3Cell2PanelGridTableText-04',
                                                                type: TextWidget,
                                                                titleFontSize: 14,
                                                                titleAlignment: 'end',
                                                                titleFontWeight: '800'
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        id: 'hrdemoSimulationRow4',
                        type: GridRowWidget,
                        marginTop: '1%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationRow4Cell1',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-right',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationRow4Cell1SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '330',
                                        skin: 'segmented',
                                        marginBottom: '-25px',
                                        marginRight: '60',
                                        visible: true,
                                        widgets: [

                                            {
                                                id: 'hrdemoSimulationRow4Cell1SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: 'Sum',
                                            },

                                            {
                                                id: 'hrdemoSimulationRow4Cell1SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_middle_hrdemo',
                                                selected: false,
                                                label: 'Δ From Plan',
                                            },
                                            {
                                                id: 'hrdemoSimulationRow4Cell1SegmentedControlItem3',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab3',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: 'Δ%',
                                            },
                                        ]
                                    }

                                ]
                            },
                        ]
                    },
                ]
            },

            {
                id: 'hrdemoSimulationCommentPopup',
                type: ContainerWidget,
                visible: false,
                width: '320px',
                closeBtn: false,
                height: '100%',
                behaviour: 'popup',
                position: 'right',
                bgColor: '#fff',
                widgets: [
                    {
                        id: 'hrdemoSimulationCommentPopupGrid',
                        type: GridWidget,
                        marginLeft: '10',
                        marginRight: '10',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCommentPopupGridRow1',
                                type: GridRowWidget,
                                marginBottom: '20',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCommentPopupGridRow1Title',
                                        type: TextWidget,
                                        title: 'Comments',
                                        icon: 'icon-comment',
                                        skin: 'comment_title',
                                    },
                                    {
                                        id: 'hrdemoSimulationCommentPopupGridXButton',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        icon: 'icon-x',
                                        marginTop: '19',
                                        iconColor: '#007AFF',
                                        iconFontSize: 20,
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationCommentPopupGridRow2',
                                type: GridRowWidget,
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCommentPopupCommentInput',
                                        type: TextAreaWidget,
                                        placeholder: 'Add comment ...',
                                        marginBottom: '30',
                                        width: '280px',
                                        height: '40px',
                                        icon: 'icon-send.png',
                                        skin: 'comment_message'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCommentPopupPreviousCommentsGridTable',
                        type: GridTableWidget,
                        marginLeft: '10',
                        marginRight: '10',
                        title: '',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCommentPopupPreviousCommentsGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '44%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCommentPopupPreviousCommentsGridTableText-01',
                                        type: TextWidget
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCommentPopupControlPanel',
                        type: PanelWidget,
                        marginBottom: 30,
                        position: 'center',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCommentPopupControlPanelLoadMoreButton',
                                type: TextWidget,
                                title: 'Load more comments ...',
                                width: '100%',
                                marginLeft: '15',
                                titleAlignment: 'center',
                                skin: 'sign',
                                height: '40',
                                titleFontSize: '14'
                            }
                        ]
                    }
                ]
            },

            {
                id: 'hrdemoSimulationNamePopup',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: 525,
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                position: 'right',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoSimulationNamePopupGrid',
                        type: GridWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationNamePopupPanelCell',
                                type: GridCellWidget,
                                width: '100%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationNamePopupPanelCellImage',
                                        type: ImageWidget,
                                        title: '',
                                        fileName: '',
                                        marginLeft: 10,
                                        width: 180,
                                        height: 180
                                    },
                                    {
                                        id: 'hrdemoSimulationNamePopupRow1Cell1',
                                        type: GridCellWidget,
                                        width: '50%',
                                        alignment: 'top-left',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationNamePopupRow3GridTable',
                                                type: GridTableWidget,
                                                marginLeft: '10',
                                                marginRight: '10',
                                                title: '',
                                                width: '290',
                                                widgets: [
                                                    {
                                                        id: 'hrdemoSimulationNamePopupRow3GridTableHeaderRow',
                                                        type: GridTableHeaderRowWidget,
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationNamePopupRow3GridTableHeaderCell-1',
                                                                type: GridTableHeaderCellWidget,
                                                                width: '10%',
                                                                alignment: 'center-left',
                                                                widgets: [
                                                                    {
                                                                        id: 'hrdemoSimulationNamePopupRow3GridTableHeaderText-1',
                                                                        type: TextWidget,
                                                                        titleFontWeight: '600',
                                                                        titleFontSize: 20,
                                                                        marginBottom: 15,
                                                                        skin: 'submit',
                                                                        title: ''
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'hrdemoSimulationNamePopupRow3GridTableCell-01',
                                                        type: GridTableCellWidget,
                                                        width: '50%',
                                                        alignment: 'center-left',
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationNamePopupRow3GridTableText-01',
                                                                type: TextWidget,
                                                                titleFontColor: '#747B85',
                                                                marginBottom: 5
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 'hrdemoSimulationNamePopupRow3GridTableCell-02',
                                                        type: GridTableCellWidget,
                                                        width: '50%',
                                                        alignment: 'center-left',
                                                        widgets: [
                                                            {
                                                                id: 'hrdemoSimulationNamePopupRow3GridTableText-02',
                                                                type: TextWidget,
                                                                title: '',
                                                                marginBottom: 5
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
                    }
                ]
            },

            {
                id: 'hrdemoSimulationGroupSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup_hrdemo4',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoSimulationGroupSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox_hrdemo',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    },
                    {
                        id: 'hrdemoSimulationGroupSelectorPopUpCell1',
                        type: GridCellWidget,
                        alignment: 'center-center',
                        width: '100%',
                        skin: 'topborder',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGroupSelectorPopUpCell1Button',
                                type: TextWidget,
                                title: 'Manage Groups',
                                width: '180px',
                                textAlignment: 'center',
                                titleCursor: 'pointer',
                                marginLeft: '17%',
                                height: '40px',
                                skin: 'group_selector',
                            },
                        ]
                    }
                ]
            },

            {
                id: 'hrdemoSimulationTableFilterPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                marginLeft: '40px',
                heightFixed: false,
                bgScrollable: true,
                fixed: false,
                behaviour: 'popup',
                position: 'bottom',
                skin: '',
                fadingSpeed: 0,
                offset: 200,
                widgets: [
                    {
                        id: 'hrdemoSimulationTableFilterPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'filter',
                        multiSelect: false,
                        hideIfNoData: true,
                        selectFirst: true,
                    }
                ]
            },

            {
                id: 'hrdemoSimulationVersionSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup_hrdemo4',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoSimulationVersionSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox_hrdemo',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    }
                ]
            },

            {
                id: 'hrdemoSimulationGridTablePopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '315',
                height: '170',
                bgScrollable: true,
                fadingSpeed: 0,
                fixed: false,
                behaviour: 'popup',
                widgets: [
                    {
                        id: 'hrdemoSimulationGridTablePopUpGrid',
                        type: GridWidget,
                        width: '100%',
                        marginLeft: '3%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTablePopUpGridRow1',
                                type: GridRowWidget,
                                alignment: 'center-left',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTablePopUpGridRow1Cell1',
                                        type: GridCellWidget,
                                        height: '50px',
                                        alignment: 'center-left',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationGridTablePopUpGridRow1Cell1Button',
                                                type: ButtonWidget,
                                                height: '40px',
                                                label: 'Compensation & Position change',
                                                icon: 'icon-card',
                                                skin: 'popup_button_sim_page'
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTablePopUpGridRow2',
                                type: GridRowWidget,
                                width: '100%',
                                marginTop: '5px',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTablePopUpGridRow2Cell1',
                                        type: GridCellWidget,
                                        height: '50px',
                                        alignment: 'left',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationGridTablePopUpGridRow2Cell1Button',
                                                type: ButtonWidget,
                                                height: '50px',
                                                label: 'FTE change',
                                                icon: 'icon-person-outline',
                                                skin: 'popup_button_sim_page'
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTablePopUpGridRow3',
                                type: GridRowWidget,
                                width: '100%',
                                marginTop: '5px',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTablePopUpGridRow3Cell1',
                                        type: GridCellWidget,
                                        width: '100%',
                                        height: '50px',
                                        alignment: 'left',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationGridTablePopUpGridRow3Cell1Button',
                                                type: ButtonWidget,
                                                height: '40px',
                                                label: 'Exit organisation',
                                                icon: 'icon-forward-arrow',
                                                skin: 'popup_red_button_sim_page'
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
                ]
            },

            {
                id: 'hrdemoSimulationGridTableGroupPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '315',
                height: '120',
                bgScrollable: true,
                fadingSpeed: 0,
                fixed: false,
                behaviour: 'popup',
                widgets: [
                    {
                        id: 'hrdemoSimulationGridTableGroupPopUpGrid',
                        type: GridWidget,
                        width: '100%',
                        marginLeft: '3%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableGroupPopUpGridRow1',
                                type: GridRowWidget,
                                alignment: 'center-left',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableGroupPopUpGridRow1Cell1',
                                        type: GridCellWidget,
                                        height: '50px',
                                        alignment: 'center-left',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationGridTableGroupPopUpGridRow1Cell1Button',
                                                type: ButtonWidget,
                                                height: '40px',
                                                label: 'Collective compensation change',
                                                icon: 'icon-card',
                                                skin: 'popup_button_sim_page'
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableGroupPopUpGridRow2',
                                type: GridRowWidget,
                                alignment: 'center-left',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableGroupPopUpGridRow2Cell1',
                                        type: GridCellWidget,
                                        height: '50px',
                                        alignment: 'center-left',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationGridTableGroupPopUpGridRow2Cell1Button',
                                                type: ButtonWidget,
                                                height: '40px',
                                                label: 'Collective redundancy',
                                                icon: 'icon-person-outline',
                                                skin: 'popup_red_button_sim_page'
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
                id: 'hrdemoSimulationGridTable',
                type: GridTableWidget,
                title: '',
                //hideIfNoData: true,
                marginTop: '50px',
                skin: 'forecasting_forecast_hr',
                widgets: [
                    {
                        id: 'hrdemoSimulationGridTableHeaderRow',
                        type: GridTableHeaderRowWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-1',
                                type: GridTableHeaderCellWidget,
                                width: '10%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-1',
                                        type: TextWidget,
                                        paddingLeft: '5px',
                                        marginLeft: 5,
                                        body: 'Name',
                                        title: '',
                                        skin: 'simulation_header_month',
                                        titleFontWeight: 'bold',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-2',
                                type: GridTableHeaderCellWidget,
                                width: '10%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-2',
                                        type: TextWidget,
                                        title: 'Position',
                                        marginLeft: 5,
                                        paddingLeft: '5px',
                                        titleFontWeight: 'bold',
                                        skin: 'simulation_header_add_button',
                                        icon: 'icon-plus-circle',
                                        iconColor: '#007AFF',
                                        iconCustomEventName: 'add_dummy'
                                    },
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderTextFilter',
                                        type: TextWidget,
                                        paddingLeft: '5px',
                                        skin: 'simulation_header_filter',
                                        icon: 'icon-list1',
                                        iconColor: '#007AFF'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-3',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-3',
                                        type: TextWidget,
                                        skin: 'simulation_header_without_icon',
                                        title: '2022',
                                        paddingRight: '30px',
                                        body: 'Jan'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-4',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-4',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        paddingRight: '30px',
                                        title: '',
                                        body: 'Feb'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-5',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-5',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Mar'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-6',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-6',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Apr'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-7',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-7',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'May'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-8',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-8',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Jun'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-9',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-9',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Jul'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-10',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-10',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Aug'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-11',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-11',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Sep'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-12',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-12',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Oct'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-13',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-13',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Nov'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-14',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-14',
                                        type: TextWidget,
                                        title: '',
                                        paddingRight: '30px',
                                        skin: 'simulation_header_month',
                                        body: 'Dec'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-15',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-15',
                                        type: TextWidget,
                                        paddingRight: '30px',
                                        skin: 'simulation_header_with_icon',
                                        icon: 'icon-expand-arrow',
                                        iconColor: '#007AFF',
                                        title: '2023',
                                        body: 'Year'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-16',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-16',
                                        type: TextWidget,
                                        skin: 'simulation_header_with_icon',
                                        icon: 'icon-expand-arrow',
                                        iconColor: '#007AFF',
                                        paddingRight: '30px',
                                        title: '2022',
                                        body: 'Year'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-17',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-17',
                                        type: TextWidget,
                                        skin: 'simulation_header_without_icon',
                                        title: '2023',
                                        paddingRight: '30px',
                                        body: 'Jan'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-18',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-18',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Feb'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-19',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-19',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Mar'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-20',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-20',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Apr'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-21',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-21',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'May'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-22',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-22',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Jun'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-23',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-23',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Jul'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-24',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-24',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Aug'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-25',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-25',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Sep'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-26',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-26',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Oct'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-27',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-27',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        body: 'Nov',
                                        paddingRight: '30px',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-28',
                                type: GridTableHeaderCellWidget,
                                width: '4.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-28',
                                        type: TextWidget,
                                        skin: 'simulation_header_month',
                                        title: '',
                                        paddingRight: '30px',
                                        body: 'Dec'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-29',
                                type: GridTableHeaderCellWidget,
                                width: '10%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-29',
                                        type: TextWidget,
                                        marginLeft: '-80px',
                                        paddingLeft: '5px',
                                        title: '',
                                        bodyAlignment: 'start',
                                        skin: 'simulation_header_month',
                                        body: '',
                                        titleFontWeight: 'bold',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-30',
                                type: GridTableHeaderCellWidget,
                                width: '10%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-30',
                                        type: TextWidget,
                                        paddingLeft: '5px',
                                        marginLeft: '-80px',
                                        bodyAlignment: 'start',
                                        title: '',
                                        skin: 'simulation_header_month',
                                        body: 'HR Cost ∑ 2023',
                                        titleFontWeight: 'bold',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationGridTableHeaderCell-31',
                                type: GridTableHeaderCellWidget,
                                width: '1.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationGridTableHeaderText-31',
                                        type: TextWidget,
                                        skin: ''
                                    }
                                ]
                            },

                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell1',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText1',
                                type: TextWidget,
                                skin: 'delta_report_data'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell2',
                        type: GridTableCellWidget,
                        width: '10%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText2',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell3',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText3',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell4',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText4',
                                type: TextWidget,

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell5',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText5',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell6',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText6',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell7',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText7',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell8',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText8',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell9',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText9',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell10',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText10',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell11',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText11',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell12',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText12',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell13',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText13',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell14',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText14',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell15',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText15',
                                type: TextWidget,
                                skin: 'delta_report_data'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell16',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText16',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell17',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText17',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell18',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText18',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell19',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText19',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell20',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText20',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell21',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText21',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell22',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText22',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell23',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText23',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell24',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText24',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell25',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText25',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell26',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText26',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell27',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText27',
                                type: TextWidget,
                                skin: 'delta_report_data'

                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell28',
                        type: GridTableCellWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText28',
                                type: TextWidget,
                                skin: 'delta_report_data'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell29',
                        type: GridTableCellWidget,
                        width: '10%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText29',
                                type: TextWidget,
                                skin: 'delta_report_data'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell30',
                        type: GridTableCellWidget,
                        width: '10%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText30',
                                type: TextWidget,
                                skin: 'delta_report_data'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationGridTableCell31',
                        type: GridTableCellWidget,
                        width: '1.5%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationGridTableText31',
                                type: TextWidget,
                                skin: 'delta_report_data'
                            }
                        ]
                    },

                ]
            },

            {
                id: 'hrdemoSimulationCopyPopup',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: 280,
                height: 260,
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                position: 'top',
                fadingSpeed: 0,
                offset: 260,
                widgets: [
                    {
                        id: 'hrdemoSimulationCopyPopupGrid',
                        type: GridWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCopyPopupRow1',
                                type: GridRowWidget,
                                marginTop: '4%',
                                paddingBottom: 10,
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCopyPopupRow1Cell1',
                                        type: GridCellWidget,
                                        width: '100%',
                                        alignment: 'center-center',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationCopyPopupRow1Cell1Text',
                                                type: TextWidget,
                                                titleFontWeight: '600',
                                                titleFontSize: 20,
                                                skin: 'submit',
                                                title: 'Submit Data',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationCopyPopupRow3',
                                type: GridRowWidget,
                                width: '100%',
                                marginTop: '4%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCopyPopupRow3Cell1',
                                        type: GridCellWidget,
                                        width: '100%',
                                        alignment: 'center-center',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationCopyPopupRow3Text',
                                                type: TextWidget,
                                                title: 'Are you sure you want to',
                                                marginTop: 5,
                                                skin: 'submit_message',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationCopyPopupRow4',
                                type: GridRowWidget,
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCopyPopupRow4Cell1',
                                        type: GridCellWidget,
                                        width: '100%',
                                        alignment: 'center-center',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationCopyPopupRow4Text',
                                                type: TextWidget,
                                                title: 'submit the simulated data?',
                                                titleCursor: 'pointer',
                                                skin: 'submit_message'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationCopyPopupRow5',
                                type: GridRowWidget,
                                width: '100%',
                                marginTop: '10%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCopyPopupRow5Cell1',
                                        type: GridCellWidget,
                                        width: '100%',
                                        alignment: 'center-center',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationCopyPopupRow5Cell1Text',
                                                type: TextWidget,
                                                fontBold: true,
                                                titleCursor: 'pointer',
                                                fontSize: 15,
                                                skin: 'submit',
                                                title: 'Group A - Base version',
                                            }

                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationCopyPopupRow6',
                                type: GridRowWidget,
                                skin: '',
                                paddingBottom: 20,
                                width: '100%',
                                marginTop: '10%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCopyPopupRow6Cell1',
                                        type: GridCellWidget,
                                        width: '100%',
                                        height: '50px',
                                        alignment: 'center-center',
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationCopyPopupRow6Cell1Button',
                                                type: ButtonWidget,
                                                height: '40px',
                                                width: '110px',
                                                label: 'Cancel',
                                                skin: 'cancel_button_little'
                                            },
                                            {
                                                id: 'hrdemoSimulationCopyPopupRow6Cell2Button',
                                                type: ButtonWidget,
                                                height: '40px',
                                                marginLeft: '15px',
                                                width: '110px',
                                                label: 'Save',
                                                skin: 'save_button_little',
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                id: 'hrdemoSimulationExitOrganisationPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '360px',
                heightFixed: false,
                pEditingLeft: '120px',
                bgScrollable: true,
                fadingSpeed: 0,
                offset: 20,
                fixed: true,
                behaviour: 'popup',
                position: 'center',
                widgets: [
                    {
                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow1',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        widgets: [
                            {
                                id: 'hrdemoSimulationExitOrganisationPopUpGridRow1Text1',
                                type: TextWidget,
                                titleFontSize: '30',
                                marginTop: '15px',
                                titleCursor: 'pointer',
                                marginBottom: '10px',
                                title: 'Exit organization',
                                titleFontWeight: '400',
                                titleFontColor: '#747B85'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow2',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        marginTop: '15px',
                        widgets: [
                            {
                                id: 'hrdemoSimulationExitOrganisationPopUpGridRow2Cell1',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-center',
                                skin: 'double',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow2Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        titleFontColor: '##000000',
                                        marginTop: '15px',
                                        marginBottom: '15px',
                                        marginLeft: '9px',
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow3',
                        type: GridRowWidget,
                        width: '100%',
                        alignment: 'center',
                        marginTop: '15px',
                        height: '15%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationExitOrganisationPopUpGridRow3Text1',
                                type: TextWidget,
                                titleFontSize: '13',
                                titleCursor: 'pointer',
                                marginTop: '15px',
                                titleFontColor: '#747B85',
                                marginBottom: '15px',
                                marginLeft: '9px',
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow4',
                        type: GridRowWidget,
                        width: '100%',
                        alignment: 'center',
                        marginTop: '-34px',
                        height: '15%',
                        widgets: [

                            {
                                id: 'hrdemoSimulationExitOrganisationPopUpGridRow4DatePicker',
                                type: DatePickerWidget,
                                width: '319px',
                                skin: 'headcount_popup_datepicker',
                                icon: 'icon-calendar',
                                label: '',
                                panelFixed: true,
                                multiSelect: false,
                                hideIfNoData: false,
                                selectFirst: true,
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow5',
                        type: GridRowWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationExitOrganisationPopUpGridRow5Button',
                                type: ButtonWidget,
                                width: '320px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                skin: 'material_hrdemo',
                                label: 'Submit'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationExitOrganisationPopUpGridRow6',
                        type: GridRowWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationExitOrganisationPopUpGridRow6Button',
                                type: ButtonWidget,
                                width: '320px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                skin: 'material_hrdemogray',
                                label: 'Cancel'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'hrdemoUpdateValuePopup',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '360px',
                heightFixed: false,
                pEditingLeft: '120px',
                bgScrollable: true,
                fadingSpeed: 0,
                offset: 20,
                fixed: true,
                behaviour: 'popup',
                position: 'center',
                widgets: [
                    {
                        id: 'hrdemoUpdateValueGrid',
                        type: GridWidget,
                        marginTop: 5,
                        widgets: [
                            {
                                id: 'hrdemoUpdateValueGridRow1',
                                type: GridRowWidget,
                                width: '100%',
                                height: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow1Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        titleCursor: 'pointer',
                                        marginTop: '15px',
                                        marginBottom: '10px',
                                        width: '60%',
                                        alignment: 'center',
                                        title: '',
                                        marginLeft: '100px',
                                        titleFontWeight: '600',

                                    },
                                    {
                                        id: 'hrdemoUpdateValueGridRow1Text2',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        marginTop: '15px',
                                        marginBottom: '10px',
                                        titleCursor: 'pointer',
                                        width: '40%',
                                        titleFontColor: '#8E8E93',
                                        alignment: 'center',
                                        title: '',
                                        titleFontWeight: '600',

                                    },

                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow2',
                                type: GridRowWidget,
                                width: '100%',
                                height: '15%',
                                skin: 'bottomborder',
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow2Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        marginTop: '15px',
                                        marginBottom: '10px',
                                        width: '75px',
                                        titleCursor: 'pointer',
                                        title: 'Current',
                                        marginLeft: '16px',
                                        titleFontWeight: '600'
                                    },
                                    {
                                        id: 'hrdemoUpdateValueGridRow2Text2',
                                        type: TextWidget,
                                        marginBottom: '10px',
                                        titleFontSize: '16',
                                        marginTop: '13px',
                                        titleCursor: 'pointer',
                                        width: '75px',
                                        marginLeft: '40px',
                                        title: '',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow3',
                                type: GridRowWidget,
                                width: '360px',
                                height: '40px',
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow3Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        marginLeft: '20px',
                                        marginTop: '30px',
                                        title: 'New',
                                        titleCursor: 'pointer',
                                        titleFontWeight: '600'
                                    },
                                    {
                                        id: 'hrdemoUpdateValueGridRow3TextBox',
                                        type: TextBoxWidget,
                                        skin: 'custom_group2',
                                        width: '90px',
                                        marginTop: '15px',
                                        marginLeft: '80px',
                                    },
                                    {
                                        id: 'hrdemoUpdateValueGridRow3Button',
                                        type: ButtonWidget,
                                        icon: 'icon-arrow-reset',
                                        marginTop: '15px',
                                        width: '40px',
                                        marginLeft: '10px',
                                        skin: 'material_hrdemolight',
                                        backgroundColor: '#F2F2F2'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow4',
                                type: GridRowWidget,
                                marginTop: '30px',
                                marginLeft: '6px',
                                skin: 'bottomborder',
                                marginBottom: '10px',
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow4Slider',
                                        type: SliderWidget,
                                        width: '320px',
                                        hideIfNoData: false,
                                        skin: 'hrdemo_cell_value',
                                        minRange: -100,
                                        maxRange: 100,
                                        alignment: 'center',
                                        unit: '%',
                                        updateableWidgetId: 'hrdemoUpdateValueGridRow3TextBox',
                                        trackFillStartValue: -100,
                                        buttonsVisible: false,
                                        listen: [
                                            {
                                                event: 'launch.hrdemoUpdateValueGridRow3Button.finished',
                                                method: 'refreshWithoutLoader'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow5',
                                type: GridRowWidget,
                                width: '100%',
                                alignment: 'center',
                                marginTop: '15px',
                                height: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow5Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        titleCursor: 'pointer',
                                        marginTop: '15px',
                                        titleFontColor: '#747B85',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow6',
                                type: GridRowWidget,
                                width: '100%',
                                alignment: 'center',
                                height: '15%',
                                widgets: [

                                    {
                                        id: 'hrdemoUpdateValueGridRow6Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        titleCursor: 'pointer',
                                        titleFontColor: '#000000',
                                        marginLeft: '9px',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow7',
                                type: GridRowWidget,
                                width: '100%',
                                alignment: 'center',
                                height: '15%',
                                widgets: [

                                    {
                                        id: 'hrdemoUpdateValueGridRow7Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        marginTop: '10px',
                                        titleCursor: 'pointer',
                                        titleFontColor: '#747B85',
                                        marginLeft: '9px',
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow8',
                                type: GridRowWidget,
                                width: '100%',
                                alignment: 'center',
                                marginTop: '-19px',
                                height: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow8DatePicker',
                                        type: DatePickerWidget,
                                        width: '319px',
                                        skin: 'headcount_popup_datepicker',
                                        icon: 'icon-calendar',
                                        label: '',
                                        panelFixed: true,
                                        multiSelect: false,
                                        hideIfNoData: false,
                                        selectFirst: true,
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow9',
                                type: GridRowWidget,
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow9Button',
                                        type: ButtonWidget,
                                        width: '320px',
                                        marginTop: '10px',
                                        marginLeft: '10px',
                                        skin: 'material_hrdemo',
                                        label: 'Submit'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoUpdateValueGridRow10',
                                type: GridRowWidget,
                                widgets: [
                                    {
                                        id: 'hrdemoUpdateValueGridRow10Button',
                                        type: ButtonWidget,
                                        width: '320px',
                                        marginTop: '10px',
                                        marginLeft: '10px',
                                        skin: 'material_hrdemogray',
                                        label: 'Cancel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },


            {
                id: 'hrdemoSimulationCollectiveRedundancyPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '360px',
                height: '550',
                heightFixed: true,
                pEditingLeft: '120px',
                bgScrollable: true,
                fadingSpeed: 0,
                offset: 20,
                fixed: true,
                behaviour: 'popup',
                position: 'center',
                widgets: [
                    {
                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow1',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow1Text1',
                                type: TextWidget,
                                titleFontSize: '30',
                                marginTop: '15px',
                                titleCursor: 'pointer',
                                marginBottom: '10px',
                                title: 'Collective redundancy',
                                titleFontWeight: '400',
                                titleFontColor: '#747B85'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow2',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        marginTop: '15px',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow2Cell1',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-center',
                                skin: 'double',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow2Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        title: 'Group - 2022. June',
                                        titleFontColor: '##000000',
                                        marginTop: '15px',
                                        marginBottom: '15px',
                                        marginLeft: '9px',
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow3',
                        type: GridRowWidget,
                        width: '100%',
                        alignment: 'center',
                        marginTop: '15px',
                        height: '15%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow3Text1',
                                type: TextWidget,
                                titleFontSize: '13',
                                titleCursor: 'pointer',
                                title: 'Select the last working day of the Group',
                                marginTop: '15px',
                                titleFontColor: '#747B85',
                                marginBottom: '15px',
                                marginLeft: '9px',
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow4',
                        type: GridRowWidget,
                        width: '100%',
                        alignment: 'center',
                        marginTop: '-34px',
                        height: '15%',
                        widgets: [

                            {
                                id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow4DatePicker',
                                type: DatePickerWidget,
                                width: '319px',
                                skin: 'headcount_popup_datepicker',
                                icon: 'icon-calendar',
                                label: '',
                                panelFixed: true,
                                multiSelect: false,
                                hideIfNoData: false,
                                selectFirst: true,
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow5',
                        type: GridRowWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow5Button',
                                type: ButtonWidget,
                                width: '320px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                skin: 'material_hrdemo',
                                label: 'Submit'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow6',
                        type: GridRowWidget,
                        widgets: [
                            {
                                id: 'hrdemoSimulationCollectiveRedundancyPopUpGridRow6Button',
                                type: ButtonWidget,
                                width: '320px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                skin: 'material_hrdemogray',
                                label: 'Cancel'
                            }
                        ]
                    }
                ]
            },


            {
                id: 'hrdemoSimulationCompensationChangePopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '610px',
                height: '550',
                heightFixed: true,
                pEditingLeft: '120px',
                bgScrollable: true,
                fadingSpeed: 0,
                offset: 20,
                fixed: true,
                behaviour: 'popup',
                position: 'center',
                widgets: [
                    {
                        id: 'hrdemoSimulationCompensationChangePopUpGridRow1',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangePopUpGridRow1Text1',
                                type: TextWidget,
                                titleFontSize: '30',
                                marginTop: '15px',
                                titleCursor: 'pointer',
                                marginBottom: '10px',
                                title: 'Compensation & Position change',
                                titleFontWeight: '400',
                                titleFontColor: '#747678'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCompensationChangePopUpGridRow2',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        marginTop: '15px',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangePopUpGridRow2Cell1',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-center',
                                skin: 'double',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCompensationChangePopUpGridRow2Text1',
                                        type: TextWidget,
                                        titleFontSize: '16',
                                        marginTop: '15px',
                                        marginBottom: '15px',
                                        marginLeft: '9px',
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCompensationChangePopUpGridRow3',
                        type: GridRowWidget,
                        width: '100%',
                        alignment: 'center',
                        marginTop: '15px',
                        height: '15%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangePopUpGridRow3Text1',
                                type: TextWidget,
                                titleFontSize: '16',
                                titleCursor: 'pointer',
                                marginTop: '15px',
                                marginBottom: '15px',
                                marginLeft: '9px',
                            },
                        ]
                    },
                    {
                        id: 'hrDemoSimulationCompensationChangePopUpGridTable',
                        type: GridTableWidget,
                        hideIfNoData: true,
                        skin: 'add_dummy',
                        listen: [],
                        width: '530px',
                        title: '',
                        widgets: [

                            {
                                id: 'hrDemoSimulationCompensationChangePopUpGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '40%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrDemoSimulationCompensationChangePopUpGridTableText-01',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontWeight: 'bold',
                                    }
                                ]
                            },
                            {
                                id: 'hrDemoSimulationCompensationChangePopUpGridTableCell-02',
                                type: GridTableCellWidget,
                                alignment: 'center-left',
                                width: '60%',
                                widgets: [
                                    {
                                        id: 'hrDemoSimulationCompensationChangePopUpGridTableText-02',
                                        type: TextWidget,
                                        titleAlignment: 'center',
                                        paddingLeft: '8px'
                                    }
                                ]
                            },
                        ]
                    },

                    {
                        id: 'hrdemoSimulationCompensationChangePopUpGridRow4',
                        type: GridRowWidget,
                        skin: '',
                        paddingBottom: 20,
                        width: '100%',
                        marginTop: '6%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangePopUpGridRow4Cell1',
                                type: GridCellWidget,
                                width: '100%',
                                height: '50px',
                                alignment: 'center-center',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCompensationChangePopUpGridRow4Cell1Cancel',
                                        type: ButtonWidget,
                                        height: '40px',
                                        width: '110px',
                                        label: 'Cancel',
                                        skin: 'cancel_button'
                                    },
                                    {
                                        id: 'hrdemoSimulationCompensationChangePopUpGridRow4Cell1Save',
                                        type: ButtonWidget,
                                        height: '40px',
                                        marginLeft: '15px',
                                        width: '110px',
                                        label: 'Save',
                                        skin: 'save_button',
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },

            {
                id: 'hrdemoSimulationCompensationChangeGroupPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '365',
                height: '400',
                heightFixed: true,
                pEditingLeft: '120px',
                bgScrollable: true,
                fadingSpeed: 0,
                offset: 20,
                fixed: true,
                behaviour: 'popup',
                position: 'center',
                widgets: [
                    {
                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow1',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow1Text1',
                                type: TextWidget,
                                titleFontSize: '33',
                                marginTop: '15px',
                                marginBottom: '10px',
                                marginLeft: 7,
                                title: 'Compensation',
                                titleFontWeight: '800'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow2',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        marginTop: '15px',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow2Cell1',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-center',
                                skin: 'double',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow2Text1',
                                        type: TextWidget,
                                        titleFontSize: '13',
                                        title: 'Group - 2022. June',
                                        marginTop: '15px',
                                        marginBottom: '15px',
                                        marginLeft: '9px',
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow3',
                        type: GridRowWidget,
                        width: '100%',
                        marginTop: '15px',
                        height: '15%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow3Text1',
                                type: TextWidget,
                                titleFontSize: '15',
                                title: 'Salary Adjustment - %',
                                marginTop: '15px',
                                marginLeft: 13,
                                marginBottom: '15px',
                                titleFontColor: '#747B85',
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow4',
                        type: GridRowWidget,
                        width: '100%',
                        alignment: 'center',
                        height: '15%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow4Cell1',
                                type: GridCellWidget,
                                width: '100%',
                                height: '50px',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow3TextBox1',
                                        type: TextBoxWidget,
                                        skin: 'custom_group2',
                                        width: '65px',
                                        marginBottom: '0',
                                    },
                                    {
                                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow3Slider',
                                        type: SliderWidget,
                                        width: '195px',
                                        hideIfNoData: false,
                                        skin: 'hrdemo_cell_value',
                                        minRange: -100,
                                        maxRange: 100,
                                        alignment: 'center',
                                        unit: '%',
                                        updateableWidgetId: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow3TextBox1',
                                        trackFillStartValue: -100,
                                        buttonsVisible: false,
                                        listen: [
                                            {
                                                event: 'launch.hrdemoSimulationCompensationChangeGroupPopUpGridRow3Button.finished',
                                                method: 'refreshWithoutLoader'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow3Button',
                                        type: ButtonWidget,
                                        icon: 'icon-arrow-reset',
                                        marginTop: '15px',
                                        width: '50px',
                                        marginLeft: '10px',
                                        skin: 'material_hrdemolight',
                                        backgroundColor: '#F2F2F2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow5',
                        type: GridRowWidget,
                        skin: '',
                        paddingBottom: 20,
                        width: '100%',
                        marginTop: '6%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow5Cell1',
                                type: GridCellWidget,
                                width: '100%',
                                height: '50px',
                                alignment: 'center-center',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow5Cell1Submit',
                                        type: ButtonWidget,
                                        height: '45px',
                                        width: '320px',
                                        label: 'Submit',
                                        skin: 'save_button'
                                    }
                                ]
                            },
                        ]
                    },

                    {
                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow6',
                        type: GridRowWidget,
                        skin: '',
                        paddingBottom: 20,
                        width: '100%',
                        marginTop: '6%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow6Cell1',
                                type: GridCellWidget,
                                width: '100%',
                                height: '50px',
                                alignment: 'center-center',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow6Cell1Cancel',
                                        type: ButtonWidget,
                                        height: '45px',
                                        width: '320px',
                                        label: 'Cancel',
                                        skin: 'cancel_button'
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },

            {
                id: 'hrdemoSimulationAddDummyPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: false,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '610px',
                height: '700px',
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                position: 'center',
                widgets: [
                    {
                        id: 'hrdemoSimulationAddDummyPopUpGridRow1',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        widgets: [
                            {
                                id: 'hrdemoSimulationAddDummyPopUpGridRow1Text1',
                                type: TextWidget,
                                titleFontSize: '30',
                                marginTop: '15px',
                                marginBottom: '10px',
                                title: 'Add Dummy Employee',
                                titleAlignment: 'start',
                                titleFontWeight: '400',
                                titleFontColor: '#747678'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationAddDummyPopUpGridRow2',
                        type: GridRowWidget,
                        width: '100%',
                        height: '15%',
                        alignment: 'center',
                        marginTop: '15px',
                        marginBottom: '15px',
                        widgets: [
                            {
                                id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell1SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '200',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        visible: true,
                                        widgets: [
                                            {
                                                id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell1SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: 'Entry',
                                            },
                                            {
                                                id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell1SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: 'Exit',
                                            },
                                        ]
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell2',
                                type: GridCellWidget,
                                marginRight: '20',
                                visible: false,
                                alignment: 'center-right',
                                width: '100%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell2SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '200',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        visible: true,
                                        widgets: [

                                            {
                                                id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell2SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: 'Prefill',
                                            },
                                            {
                                                id: 'hrdemoSimulationAddDummyPopUpGridRow2Cell2SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: 'Input',
                                            },
                                        ]
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSimulationAddDummyPopUpGridTable',
                        type: GridTableWidget,
                        hideIfNoData: true,
                        skin: 'add_dummy',
                        listen: [],
                        width: '530px',
                        title: '',
                        widgets: [

                            {
                                id: 'hrdemoSimulationAddDummyPopUpGridTableCell-01',
                                type: GridTableCellWidget,
                                width: '40%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationAddDummyPopUpGridTableText-01',
                                        type: TextWidget,
                                        titleAlignment: 'start',
                                        paddingLeft: '8px',
                                        titleFontWeight: 'bold',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSimulationAddDummyPopUpGridTableCell-02',
                                type: GridTableCellWidget,
                                alignment: 'center-left',
                                width: '60%',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationAddDummyPopUpGridTableText-02',
                                        type: TextWidget,
                                        titleAlignment: 'center',
                                        paddingLeft: '8px'
                                    }
                                ]
                            },
                        ]
                    },

                    {
                        id: 'hrdemoSimulationAddDummyPopUpGridRow4',
                        type: GridRowWidget,
                        skin: '',
                        paddingBottom: 20,
                        width: '100%',
                        marginTop: '4%',
                        widgets: [
                            {
                                id: 'hrdemoSimulationAddDummyPopUpGridRow4Cell1',
                                type: GridCellWidget,
                                width: '100%',
                                height: '50px',
                                alignment: 'center-center',
                                widgets: [
                                    {
                                        id: 'hrdemoSimulationAddDummyPopUpGridRow4Cell1Cancel',
                                        type: ButtonWidget,
                                        height: '40px',
                                        width: '110px',
                                        label: 'Cancel',
                                        skin: 'cancel_button_gray'
                                    },
                                    {
                                        id: 'hrdemoSimulationAddDummyPopUpGridRow4Cell1Save',
                                        type: ButtonWidget,
                                        height: '40px',
                                        marginLeft: '15px',
                                        width: '110px',
                                        label: 'Save',
                                        skin: 'save_button',
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    },

    hrdemoSettings: {
        id: 'hrdemoSettings',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoSettingsGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoSettingsRow1',
                        type: GridRowWidget,
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder_main',
                        widgets: [
                            {
                                id: 'hrdemoSettingsRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '0',
                                marginBottom: '0',
                                alignment: 'center-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow1Cell1Logo',
                                        type: ImageWidget,
                                        titleFontColor: '#AEAEB2',
                                        fileName: 'knowledgeseed_stratos.png',
                                        titleFontSize: '22px',
                                        width: 290,
                                        height: 90
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSettingsRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                width: '15%',
                                alignment: 'center-left',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'HR - Modelling',
                                        marginLeft: '10px',
                                        skin: 'titleInPage'
                                    },
                                ]
                            },

                            {
                                id: 'hrdemoSettingsRow1Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'top-right',
                                width: '55%',
                            },
                            {
                                import: 'panels.hrDemoUserButtonPanel'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSettingsRow2',
                        type: GridRowWidget,
                        marginTop: '8%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSettingsRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'top-right',
                                width: '38%',
                            },
                            {
                                id: 'hrdemoSettingsRow2Cell2',
                                type: GridCellWidget,
                                alignment: 'center-center',
                                width: '12%',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow2Cell2Button',
                                        type: ButtonWidget,
                                        icon: 'icon-arrow-left1',
                                        label: 'Settings',
                                        iconPosition: 'left',
                                        fontColor: '#ACADAE',
                                        fontSize: '25',
                                        iconColor: '#347CF6',
                                        iconFontSize: '25',
                                        skin: 'arrow_left_settings_hrdemo'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSettingsRow2Cell3',
                                type: GridCellWidget,
                                width: '50%',
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSettingsRow3',
                        type: GridRowWidget,
                        marginTop: '1%',
                        marginBottom: '0%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSettingsRow3Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'top-right',
                                width: '38%',
                                height: '18%'
                            },
                            {
                                id: 'hrdemoSettingsRow3Cell2',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow3Cell2Button',
                                        type: ButtonWidget,
                                        width: '145',
                                        icon: 'icon-shield-lock-outline-1',
                                        fontColor: 'white',
                                        skin: 'hrdemoSettings_grey',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSettingsRow3Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow3Cell3Button',
                                        type: ButtonWidget,
                                        width: '145',
                                        icon: 'icon-person-viewfinder-1',
                                        fontColor: 'white',
                                        skin: 'hrdemoSettings_grey',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSettingsRow3Cell4',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '38%',
                                height: '6%'
                            }
                        ]
                    },

                    {
                        id: 'hrdemoSettingsRow4',
                        type: GridRowWidget,
                        marginTop: '0.4%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSettingsRow4Cell1',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '38%',
                                height: '6%'
                            },
                            {
                                id: 'hrdemoSettingsRow4Cell2',
                                type: GridCellWidget,
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '6%',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow4Cell2Text',
                                        type: TextWidget,
                                        title: 'Taxes & Social',
                                        body: 'Security',
                                        width: '100%',
                                        skin: 'menuc',
                                        titleAlignment: 'center',
                                        titleFontSize: 16,
                                        titleFontColor: '#000000',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSettingsRow4Cell3',
                                type: GridCellWidget,
                                marginLeft: '15',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '6%',
                                widgets: [
                                    {
                                        id: 'hrdemoSettingsRow4Cell3Text',
                                        type: TextWidget,
                                        title: 'Position',
                                        body: 'Parameters',
                                        width: '100%',
                                        skin: 'menu',
                                        titleAlignment: 'center',
                                        titleFontSize: 16,
                                        titleFontColor: '#000000',
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSettingsRow4Cell4',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '38%',
                                height: '6%'
                            }
                        ]
                    },

                ]
            },
        ]
    },

    hrdemoPositionParameters: {
        id: 'hrdemoPositionParameters',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoPositionParametersGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoPositionParametersRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersRow1Cell1Button',
                                        type: ButtonWidget,
                                        icon: 'icon-menu',
                                        marginTop: '8px',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-left',
                                width: '45%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'Position Parameters',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },

                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersRow1Cell3',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-left',
                                width: '53%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersRow1Cell3SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '330',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        widgets: [
                                            {
                                                id: 'hrdemoPositionParametersRow1Cell3SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: '2022',
                                            },
                                            {
                                                id: 'hrdemoPositionParametersRow1Cell3SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: '2023',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                import: 'panels.hrDemoUserButtonPanel'
                            },
                        ]
                    },

                    {
                        id: 'hrdemoPositionParametersRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersRow2Cell1',
                                type: GridCellWidget,
                                alignment: 'center-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersRow2Cell1Text',
                                        type: TextWidget,
                                        icon: 'icon-people-3',
                                        width: '260px',
                                        marginLeft: 10,
                                        iconColor: '#007AFF',
                                        skin: 'dropbox_text_hrdemo',
                                        title: 'Headcount Type',
                                        listen: []
                                    },
                                    {
                                        id: 'hrdemoPositionParametersRow2Cell1Text3',
                                        type: TextWidget,
                                        icon: 'icon-user',
                                        width: '260px',
                                        marginLeft: 10,
                                        iconColor: '#007AFF',
                                        skin: 'dropbox_text_hrdemo',
                                        title: 'Positions',
                                        listen: []
                                    },

                                ]
                            },]
                    }

                ]
            },

            {
                id: 'hrdemoPositionParametersGridTable',
                type: GridTableWidget,
                marginTop: '40',
                hideIfNoData: true,
                skin: 'customer_status_report_bpsp',
                listen: [
                    {
                        event: 'write.hrdemoPositionParametersGridTable.finished',
                        method: 'refresh'
                    },
                ],
                width: '80%',
                title: '',
                widgets: [
                    {
                        id: 'hrdemoPositionParametersGridTableHeaderRow',
                        type: GridTableHeaderRowWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-01',
                                type: GridTableHeaderCellWidget,
                                width: '22%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderCell1Text',
                                        type: TextWidget,
                                        body: 'Parameter name',
                                        paddingLeft: '10px',
                                        paddingTop: '10px',
                                        skin: 'gridTable_title_taxes',
                                        bodyFontWeight: 'bold'

                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-02',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-02',
                                        type: TextWidget,
                                        title: '2022',
                                        body: 'Jan',
                                        paddingLeft: '8px',
                                        paddingBottom: '25px',
                                        skin: 'gridTable_title_taxes'
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-03',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-03',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        body: 'Feb',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-4',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-04',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Mar',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-5',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-5',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Apr',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-6',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-6',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        body: 'May',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-7',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-7',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Jun'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-8',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-8',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold',
                                        body: 'July'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-9',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-9',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold',
                                        body: 'Aug'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-10',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-10',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Sep'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-11',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-11',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Oct'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-12',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-12',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Nov'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoPositionParametersGridTableHeaderCell-13',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                cellHeaderSin: 'close',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoPositionParametersGridTableHeaderText-13',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold',
                                        body: 'Dec'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-01',
                        type: GridTableCellWidget,
                        width: '22%',
                        alignment: 'center-left',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersGridTableButton-01',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-02',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersGridTableText-02',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-03',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableText-03',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-4',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersGridTableButton4',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-5',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoPositionParametersGridTableButton-5',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-6',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-6',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-7',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-7',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-8',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-8',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-9',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-9',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-10',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-10',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-11',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-11',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-12',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-12',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoPositionParametersGridTableCell-13',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoPositionParametersGridTableButton-13',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }
                        ]
                    },

                ]
            },

            {
                id: 'hrdemoPositionParametersHeadcountSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup_hrdemo3',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoPositionParametersHeadcountSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox_hrdemo',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    }
                ]
            },

            {
                id: 'hrdemoPositionParametersPositionSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup_hrdemo3',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoPositionParametersPositionSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox_hrdemo',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    }
                ]
            },

        ]
    },

    hrdemoSocialSecurity: {
        id: 'hrdemoSocialSecurity',
        type: PageWidget,
        widgets: [
            {
                id: 'hrdemoSocialSecurityGrid',
                type: GridWidget,
                marginLeft: '10',
                marginRight: '10',
                width: '100%',
                widgets: [
                    {
                        id: 'hrdemoSocialSecurityRow1',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        skin: 'bottomborder',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityRow1Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-left',
                                width: '2%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityRow1Cell1Button',
                                        type: ButtonWidget,
                                        marginTop: '8px',
                                        icon: 'icon-menu',
                                        iconFontSize: '20',
                                        iconColor: '#007AFF'
                                    },
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityRow1Cell2',
                                type: GridCellWidget,
                                marginLeft: '10',
                                alignment: 'center-left',
                                width: '45%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityRow1Cell2Title',
                                        type: TextWidget,
                                        title: 'Taxes & Social Security',
                                        titleFontSize: '36',
                                        marginLeft: '10px',
                                        titleFontWeight: 'bold',
                                    },

                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityRow1Cell3',
                                type: GridCellWidget,
                                marginRight: '20',
                                alignment: 'center-left',
                                width: '53%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityRow1Cell3SegmentedControl',
                                        type: SegmentedControlWidget,
                                        width: '330',
                                        skin: 'segmented',
                                        marginBottom: '5px',
                                        widgets: [
                                            {
                                                id: 'hrdemoSocialSecurityRow1Cell3SegmentedControlItem1',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab1',
                                                skin: 'segmented_left_hrdemo',
                                                selected: true,
                                                label: '2022',
                                            },
                                            {
                                                id: 'hrdemoSocialSecurityRow1Cell3SegmentedControlItem2',
                                                type: SegmentedControlItemWidget,
                                                action: 'segmentedControlTab2',
                                                skin: 'segmented_right_hrdemo',
                                                selected: false,
                                                label: '2023',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                import: 'panels.hrDemoUserButtonPanel'
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityRow2',
                        type: GridRowWidget,
                        marginTop: '1.3%',
                        height: '10%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityRow2Cell1',
                                type: GridCellWidget,
                                marginLeft: '5',
                                alignment: 'center-left',
                                width: '15%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityRow2Cell1Text',
                                        type: TextWidget,
                                        icon: 'icon-people-3',
                                        width: '260px',
                                        iconColor: '#007AFF',
                                        skin: 'dropbox_text_hrdemo',
                                        title: 'Headcount Type',
                                        listen: []
                                    },
                                    {
                                        id: 'hrdemoSocialSecurityRow2Cell1Text2',
                                        type: TextWidget,
                                        icon: 'icon-rectangle-stack',
                                        width: '260px',
                                        marginLeft: 15,
                                        iconColor: '#007AFF',
                                        skin: 'dropbox_text_hrdemo',
                                        title: 'Version',
                                        listen: []
                                    },

                                ]
                            },]
                    }
                ]
            },
            {
                id: 'hrdemoSocialSecurityGridTable',
                type: GridTableWidget,
                marginTop: '40',
                hideIfNoData: true,
                skin: 'customer_status_report_bpsp',
                listen: [
                    {
                        event: 'write.hrdemoSocialSecurityGridTable.finished',
                        method: 'refresh'
                    }
                ],
                width: '80%',
                title: '',
                widgets: [
                    {
                        id: 'hrdemoSocialSecurityGridTableHeaderRow',
                        type: GridTableHeaderRowWidget,
                        width: '100%',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-01',
                                type: GridTableHeaderCellWidget,
                                width: '22%',
                                alignment: 'center-left',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderCell1Text',
                                        type: TextWidget,
                                        body: 'Parameter Name',
                                        paddingLeft: '10px',
                                        paddingTop: '10px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes'

                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-02',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-02',
                                        type: TextWidget,
                                        title: '2022',
                                        body: 'Jan',
                                        paddingLeft: '8px',
                                        paddingBottom: '25px',
                                        skin: 'gridTable_title_taxes'
                                    }
                                ]
                            },

                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-03',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-03',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        body: 'Feb',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-4',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-04',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        body: 'Mar',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-5',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-5',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        body: 'Apr',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-6',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-6',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        body: 'May',
                                        skin: 'gridTable_title_taxes2',
                                        bodyFontWeight: 'bold'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-7',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-7',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        body: 'Jun',
                                        skin: 'gridTable_title_taxes2'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-8',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-8',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'July'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-9',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-9',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Aug'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-10',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [

                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-10',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Sep'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-11',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-11',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Oct'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-12',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-12',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Nov'
                                    }
                                ]
                            },
                            {
                                id: 'hrdemoSocialSecurityGridTableHeaderCell-13',
                                type: GridTableHeaderCellWidget,
                                alignment: 'center-left',
                                width: '6.5%',
                                widgets: [
                                    {
                                        id: 'hrdemoSocialSecurityGridTableHeaderText-13',
                                        type: TextWidget,
                                        paddingLeft: '8px',
                                        bodyFontWeight: 'bold',
                                        skin: 'gridTable_title_taxes2',
                                        body: 'Dec'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-01',
                        type: GridTableCellWidget,
                        width: '22%',
                        alignment: 'center-left',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityGridTableButton-01',
                                type: TextWidget,
                                titleAlignment: 'start',
                                paddingLeft: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-02',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityGridTableText-02',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px',
                                editable: true
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-03',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableText-03',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-4',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityGridTableButton4',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-5',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityGridTableButton-5',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-6',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-6',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-7',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-7',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-8',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-8',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-9',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-9',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-10',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-10',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-11',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-11',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-12',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [

                            {
                                id: 'hrdemoSocialSecurityGridTableButton-12',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },
                    {
                        id: 'hrdemoSocialSecurityGridTableCell-13',
                        type: GridTableCellWidget,
                        alignment: 'center-right',
                        width: '6.5%',
                        widgets: [
                            {
                                id: 'hrdemoSocialSecurityGridTableButton-13',
                                type: TextWidget,
                                titleAlignment: 'right',
                                paddingRight: '8px'
                            }
                        ]
                    },

                ]
            },
            {
                id: 'hrdemoSocialSecurityHeadcountSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup_hrdemo',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoSocialSecurityHeadcountSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox_hrdemo',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    }
                ]
            },
            {
                id: 'hrdemoSocialSecurityVersionSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup_hrdemo2',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoSocialSecurityVersionSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox_hrdemo',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    }
                ]
            },

        ]
    },
    popups: {
        hrdemoNewGroupPopup: {
            id: 'hrdemoNewGroupPopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            skin: '',
            width: '350px',
            height: '300px',
            paddingLeft: '120px',
            bgScrollable: true,
            fadingSpeed: 0,
            offset: 260,
            fixed: true,
            behaviour: 'popup',
            position: 'top',
            widgets: [
                {
                    id: 'hrdemoNewGroupGrid',
                    type: GridWidget,
                    marginTop: 5,
                    widgets: [
                        {
                            id: 'hrdemoNewGroupGridRow1',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoNewGroupGridRow1Text1',
                                    type: TextWidget,
                                    titleFontSize: '33',
                                    marginTop: '15px',
                                    marginBottom: '10px',
                                    width: '188px',
                                    titleCursor: 'pointer',
                                    title: 'New Group',
                                    marginLeft: '14px',
                                    titleFontWeight: '600'
                                },

                            ]
                        },
                        {
                            id: 'hrdemoNewGroupGridRow2',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoNewGroupGridRow2Text1',
                                    type: TextWidget,
                                    titleFontSize: '13',
                                    marginTop: '15px',
                                    title: 'Name',
                                    titleCursor: 'pointer',
                                    marginLeft: '15px',
                                    titleFontWeight: '600'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoNewGroupGridRow3',
                            type: GridRowWidget,
                            width: '100%',
                            height: '40px',
                            widgets: [
                                {
                                    id: 'hrdemoNewGroupGridRow3TextBox',
                                    type: TextBoxWidget,
                                    skin: 'groups_textbox',
                                    width: '319px',
                                    height: '40px',
                                    marginLeft: '8px',
                                    marginBottom: '30px'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoNewGroupGridRow4',
                            type: GridRowWidget,
                            visible: true,
                            widgets: [
                                {
                                    id: 'hrdemoNewGroupGridRow4Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    skin: 'material_hrdemo',
                                    label: 'OK'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoNewGroupGridRow5',
                            type: GridRowWidget,
                            widgets: [
                                {
                                    id: 'hrdemoNewGroupGridRow5Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    skin: 'material_hrdemogray',
                                    label: 'Cancel'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        hrdemoDeletePopup: {
            id: 'hrdemoDeletePopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            width: 360,
            height: 290,
            bgScrollable: true,
            fixed: true,
            behaviour: 'popup',
            position: 'top',
            skin: '',
            fadingSpeed: 0,
            offset: 260,
            widgets: [
                {
                    id: 'hrdemoDeletePopup',
                    type: GridWidget,
                    width: '100%',
                    widgets: [
                        {
                            id: 'hrdemoDeletePopupRow1',
                            type: GridRowWidget,
                            skin: '',
                            marginTop: '4%',
                            paddingBottom: 10,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'hrdemoDeletePopupRow1Cell1',
                                    type: GridCellWidget,
                                    width: '100%',
                                    alignment: 'center-center',
                                    widgets: [
                                        {
                                            id: 'hrdemoDeletePopupRow1Cell1Text',
                                            type: TextWidget,
                                            fontBold: true,
                                            fontSize: 33,
                                            titleCursor: 'pointer',
                                            marginTop: 5,
                                            alignment: 'center',
                                            marginRight: '50px',
                                            skin: 'delete',
                                            icon: 'icon-trash'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'hrdemoDeletePopupRow2',
                            type: GridRowWidget,
                            skin: '',
                            marginTop: '4%',
                            paddingBottom: 10,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'hrdemoDeletePopupRow1Cell1',
                                    type: GridCellWidget,
                                    width: '100%',
                                    alignment: 'center-center',
                                    widgets: [
                                        {
                                            id: 'hrdemoDeletePopupRow1Cell1Text',
                                            type: TextWidget,
                                            titleCursor: 'pointer',
                                            fontBold: true,
                                            fontSize: 16,
                                            marginTop: 5,
                                            skin: 'delete',
                                            title: 'Do you want to remove this version?',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'hrdemoDeletePopupRow3',
                            type: GridRowWidget,
                            skin: '',
                            width: '100%',
                            marginLeft: '80px',
                            widgets: [
                                {
                                    id: 'hrdemoDeletePopupRow3Text',
                                    type: TextWidget,
                                    titleCursor: 'pointer',
                                    title: 'All new data will be lost.',
                                    skin: 'delete_message'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoDeletePopupRow4',
                            type: GridRowWidget,
                            skin: '',
                            width: '100%',
                            marginLeft: '50px',
                            widgets: [
                                {
                                    id: 'hrdemoDeletePopupRow4Text',
                                    type: TextWidget,
                                    titleCursor: 'pointer',
                                    title: 'The operation cannot be undone.',
                                    skin: 'delete_message'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoDeletePopupRow5',
                            type: GridRowWidget,
                            skin: '',
                            marginTop: 40,
                            paddingBottom: 20,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'hrdemoDeletePopupRow5Cell1',
                                    type: GridCellWidget,
                                    width: '80%',
                                    marginLeft: '80px',
                                    marginRight: '10px',
                                    height: '50px',
                                    widgets: [
                                        {
                                            id: 'hrdemoDeletePopupRow5Cell1Button',
                                            type: ButtonWidget,
                                            height: '40px',
                                            width: '320px',
                                            label: 'Remove',
                                            skin: 'delete_hrdemored'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            id: 'hrdemoDeletePopupRow6',
                            type: GridRowWidget,
                            skin: '',
                            marginTop: 8,
                            paddingBottom: 20,
                            width: '100%',
                            widgets: [
                                {
                                    id: 'hrdemoDeletePopupRow6Cell1',
                                    type: GridCellWidget,
                                    width: '80%',
                                    marginLeft: '80px',
                                    marginRight: '10px',
                                    height: '50px',
                                    widgets: [
                                        {
                                            id: 'hrdemoDeletePopupRow6Cell1Button',
                                            type: ButtonWidget,
                                            height: '40px',
                                            width: '320px',
                                            label: 'Cancel',
                                            skin: 'material_hrdemogray'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        hrdemoViewGroupPopup: {
            id: 'hrdemoViewGroupPopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: true,
            backdrop: true,
            visible: false,
            closeBtn: false,
            heightFixed: false,
            width: '180px',
            offset: 110,
            marginLeft: '5px',
            bgScrollable: true,
            fadingSpeed: 0,
            fixed: true,
            positionAndCalculateBestSpace: 'left',
            behaviour: 'popup',
            position: 'left',
            widgets: [
                {
                    id: 'hrdemoViewGroupGrid',
                    type: GridWidget,
                    marginTop: 5,
                    widgets: [
                        {
                            id: 'hrdemoViewGroupGridTable',
                            type: GridTableWidget,
                            title: '',
                            skin: 'view',
                            width: '160',
                            widgets: [
                                {
                                    id: 'hrdemoViewGroupGridTableCell01',
                                    type: GridTableCellWidget,
                                    width: '100%',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'hrdemoViewGroupGridTableCell01Toggle1',
                                            type: ToggleWidget,
                                            titleFontSize: '13',
                                            skin: 'page_toggle',
                                            iconColor: '#007AFF',
                                            icon: 'icon-checkbox-on11',
                                            iconOff: 'icon-checkbox-off1',
                                            titleFontWeight: '600'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        hrdemoFilterPopup: {
            id: 'hrdemoFilterPopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            width: 240,
            height: 300,
            bgScrollable: true,
            fixed: true,
            behaviour: 'popup',
            position: 'top',
            skin: '',
            fadingSpeed: 0,
            offset: 260,
            widgets: [
                {
                    id: 'hrdemoFilterGrid',
                    type: GridWidget,
                    marginTop: 5,
                    widgets: [
                        {
                            id: 'hrdemoFilterGridCell01',
                            type: GridCellWidget,
                            width: '100%',
                            marginTop: 15,
                            marginLeft: 10,
                            alignment: 'center-left',
                            widgets: [
                                {
                                    id: 'hrdemoFilterGridCell01Text1',
                                    type: TextWidget,
                                    titleFontSize: '30',
                                    title: 'Add Filter',
                                    titleFontWeight: '600'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoFilterGridTable',
                            type: GridTableWidget,
                            title: '',
                            skin: 'view',
                            marginTop: '20',
                            width: '250',
                            widgets: [
                                {
                                    id: 'hrdemoFilterGridTableCell01',
                                    type: GridTableCellWidget,
                                    width: '100%',
                                    alignment: 'center-left',
                                    widgets: [
                                        {
                                            id: 'hrdemoFilterGridTableCell01Text1',
                                            type: TextWidget,
                                            icon: 'icon-plus-circle',
                                            iconPosition: 'right',
                                            titleCursor: 'pointer',
                                            skin: 'filter_element'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        hrdemoEditGroupPopup: {
            id: 'hrdemoEditGroupPopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            skin: '',
            width: '350px',
            height: '300px',
            paddingLeft: '120px',
            bgScrollable: true,
            fadingSpeed: 0,
            offset: 260,
            fixed: true,
            behaviour: 'popup',
            position: 'top',
            widgets: [
                {
                    id: 'hrdemoEditGroupGrid',
                    type: GridWidget,
                    marginTop: 5,
                    widgets: [
                        {
                            id: 'hrdemoEditGroupGridRow1',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoEditGroupGridRow1Text1',
                                    type: TextWidget,
                                    titleFontSize: '33',
                                    marginTop: '15px',
                                    marginBottom: '10px',
                                    width: '188px',
                                    titleCursor: 'pointer',
                                    title: 'Edit Group',
                                    marginLeft: '14px',
                                    titleFontWeight: '600'
                                },

                            ]
                        },
                        {
                            id: 'hrdemoEditGroupGridRow2',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoEditGroupGridRow2Text1',
                                    type: TextWidget,
                                    titleFontSize: '13',
                                    marginTop: '15px',
                                    title: 'Name',
                                    titleCursor: 'pointer',
                                    marginLeft: '15px',
                                    titleFontWeight: '600'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoEditGroupGridRow3',
                            type: GridRowWidget,
                            width: '100%',
                            height: '40px',
                            widgets: [
                                {
                                    id: 'hrdemoEditGroupGridRow3TextBox',
                                    type: TextBoxWidget,
                                    skin: 'custom_group2',
                                    width: '319px',
                                    height: '40px',
                                    marginLeft: '8px',
                                    marginBottom: '30px'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoEditGroupGridRow4',
                            type: GridRowWidget,
                            visible: true,
                            widgets: [
                                {
                                    id: 'hrdemoEditGroupGridRow4Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    skin: 'material_hrdemo',
                                    label: 'OK'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoEditGroupGridRow5',
                            type: GridRowWidget,
                            widgets: [
                                {
                                    id: 'hrdemoEditGroupGridRow5Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    skin: 'material_hrdemogray',
                                    label: 'Cancel'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        hrdemoFilterDetailsPopup: {
            id: 'hrdemoFilterDetailsPopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            skin: '',
            width: '350px',
            height: '275px',
            paddingLeft: '120px',
            bgScrollable: true,
            fadingSpeed: 0,
            offset: 260,
            fixed: true,
            behaviour: 'popup',
            position: 'top',
            widgets: [
                {
                    id: 'hrdemoFilterDetailsGrid',
                    type: GridWidget,
                    marginTop: 5,
                    widgets: [
                        {
                            id: 'hrdemoFilterDetailsGridRow1',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoFilterDetailsGridRow1Text1',
                                    type: TextWidget,
                                    titleFontSize: '33',
                                    marginTop: '15px',
                                    marginBottom: '20px',
                                    width: '320px',
                                    title: 'Car Filter',
                                    marginLeft: '14px',
                                    titleFontWeight: '600'
                                },

                            ]
                        },
                        {
                            id: 'hrdemoFilterDetailsGridRow3',
                            type: GridRowWidget,
                            width: '100%',
                            height: '40px',
                            widgets: [
                                {
                                    id: 'hrdemoFilterDetailsGridRow2Text1',
                                    type: TextWidget,
                                    width: 105,
                                    skin: 'filter_element',
                                    marginLeft: 10,
                                    marginTop: 15,
                                    title: 'Car',
                                },
                                {
                                    id: 'hrdemoFilterDetailsGridRow3DropBox',
                                    type: DropBoxWidget,
                                    skin: 'filter_details',
                                    width: '200',
                                    height: '40px',
                                    marginLeft: '8px',
                                    selectFirst: true,
                                    marginBottom: '30px'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoFilterDetailsGridRow4',
                            type: GridRowWidget,
                            visible: true,
                            widgets: [
                                {
                                    id: 'hrdemoFilterDetailsGridRow4Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    skin: 'material_hrdemo',
                                    label: 'Save'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoFilterDetailsGridRow5',
                            type: GridRowWidget,
                            widgets: [
                                {
                                    id: 'hrdemoFilterDetailsGridRow5Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    skin: 'material_hrdemogray',
                                    label: 'Cancel'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        hrdemoDeleteGroupPopup: {
            id: 'hrdemoDeleteGroupPopup',
            type: ContainerWidget,
            anchorVisible: false,
            anchorOnClick: false,
            backdrop: true,
            visible: false,
            closeBtn: false,
            skin: '',
            width: '350px',
            height: '250px',
            paddingLeft: '120px',
            bgScrollable: true,
            fadingSpeed: 0,
            offset: 260,
            fixed: true,
            behaviour: 'popup',
            position: 'top',
            widgets: [
                {
                    id: 'hrdemoDeleteGroupGrid',
                    type: GridWidget,
                    marginTop: 5,
                    widgets: [
                        {
                            id: 'hrdemoDeleteGroupGridRow1',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoDeleteGroupGridRow1Text1',
                                    type: TextWidget,
                                    fontSize: 33,
                                    titleCursor: 'pointer',
                                    marginTop: 5,
                                    alignment: 'center',
                                    width: '188px',
                                    skin: 'delete',
                                    icon: 'icon-trash',
                                    marginLeft: '95px',
                                    titleFontWeight: '600'
                                },

                            ]
                        },
                        {
                            id: 'hrdemoDeleteGroupGridRow2',
                            type: GridRowWidget,
                            width: '100%',
                            height: '15%',
                            widgets: [
                                {
                                    id: 'hrdemoDeleteGroupGridRow2Text1',
                                    type: TextWidget,
                                    titleFontSize: '13',
                                    marginTop: '15px',
                                    skin: 'delete',
                                    title: 'Do you want to remove this Group?',
                                    titleCursor: 'pointer',
                                    marginLeft: '65px',
                                    titleFontWeight: '600'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoDeleteGroupGridRow3',
                            type: GridRowWidget,
                            width: '100%',
                            height: '40px',
                            widgets: [
                                {
                                    id: 'hrdemoDeleteGroupGridRow3Text1',
                                    type: TextWidget,
                                    titleFontSize: '13',
                                    marginTop: '5px',
                                    skin: 'delete',
                                    title: 'All the data will be lost.',
                                    titleCursor: 'pointer',
                                    marginLeft: '100px',
                                    titleFontWeight: '600'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoDeleteGroupGridRow4',
                            type: GridRowWidget,
                            width: '100%',
                            height: '40px',
                            widgets: [
                                {
                                    id: 'hrdemoDeleteGroupGridRow4Text1',
                                    type: TextWidget,
                                    titleFontSize: '13',
                                    marginTop: '5px',
                                    title: 'The operation cannot be undone.',
                                    skin: 'delete_message',
                                    titleCursor: 'pointer',
                                    marginLeft: '70px',
                                    titleFontWeight: '600'
                                },
                            ]
                        },
                        {
                            id: 'hrdemoDeleteGroupGridRow5',
                            type: GridRowWidget,
                            visible: true,
                            widgets: [
                                {
                                    id: 'hrdemoDeleteGroupGridRow5Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '15px',
                                    marginLeft: '6px',
                                    label: 'Remove',
                                    skin: 'delete_hrdemored'
                                }
                            ]
                        },
                        {
                            id: 'hrdemoDeleteGroupGridRow6',
                            type: GridRowWidget,
                            widgets: [
                                {
                                    id: 'hrdemoDeleteGroupGridRow6Button',
                                    type: ButtonWidget,
                                    width: '320px',
                                    marginTop: '10px',
                                    marginLeft: '6px',
                                    label: 'Cancel',
                                    skin: 'material_hrdemogray'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    },

    panels: {
        hrDemoUserButtonPanel: {
            id: 'hrDemoUserButtonPanel',
            type: GridCellWidget,
            alignment: 'center-right',
            width: '15%',
            height: '0',
            widgets: [
                {
                    id: 'hrDemoUserButton',
                    type: ButtonWidget,
                    backgroundColor: '#EBECEC',
                    width: '100%',
                    icon: 'icon-user',
                    skin: 'userpanelmain',
                }
            ]
        },
    }

};
