/* global app */'use strict';
app.widgetConfig = {
    adminPortalMain:
            {
                id: 'adminPortalMain',
                type: PageWidget,
                widgets: [
                    {
                        id: 'preprocess',
                        type: DropBoxWidget,
                        title: 'Preprocess templates',
                        items: [{name: 'Template1'}, {name: 'Template2'}, {name: 'Template3'},{name: 'Template4'}],
                        skin: 'analogicdropbox',
                        width: '25%'
                    },
                    {
                        id: 'upload1',
                        type: FileUploadWidget,
                        marginTop: 50,
                        marginLeft: 50,
                        width: 100,
                        label: 'upload',
                        fontColor: 'white',
                        skin: 'deepblue_backbutton',
                        maxFileSize: 5,
                        progressVisible: true
                    },

/*                    {
                        id: 'sandyDevSimulationEmployeePopUp',
                        type: ContainerWidget,
                        visible: false,
                        width: '450',
                        bgScrollable: true,
                        notLoadIfHidden: true,
                        height: '570',
                        offset: -200,
                        bgColor: '#fff',
                        widgets: [

                            {
                                id: 'sandyDevSimulationEmployeePopUpEmployeeGrid',
                                type: GridWidget,
                                visible: true,
                                marginLeft: '5',
                                marginRight: '5',
                                marginTop: '20',
                                marginBottom: '5',
                                widgets: [

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow1',
                                        type: GridRowWidget,
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell1_1',
                                                type: GridCellWidget,
                                                skin: 'bottomborderlight',
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridText1',
                                                        type: TextWidget,
                                                        title: 'Note',
                                                        marginTop: '5',
                                                        marginBottom: '10',
                                                        skin: 'bold',
                                                    }
                                                ]}]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow2',
                                        type: GridRowWidget,
                                        marginTop: '20',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridText2_2',
                                                type: TextWidget,
                                                title: 'After Change',
                                                marginLeft: '180',
                                                titleFontColor: '#acabaa',
                                            }
                                        ]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow3',
                                        type: GridRowWidget,
                                        marginTop: '20',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell3_1',
                                                type: GridCellWidget,
                                                alignment: 'center-left',
                                                width: '180',
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridText3_1',
                                                        type: TextWidget,
                                                        title: 'Headcount reduction',
                                                        marginTop: '10',
                                                    }
                                                ]},

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell3_4',
                                                type: GridCellWidget,
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell3_4DropBox',
                                                        type: DropBoxWidget,
                                                        skin: 'popupdropbox',
                                                    }
                                                ]}]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow3_5',
                                        type: GridRowWidget,
                                        marginTop: '20',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell3_5_1',
                                                type: GridCellWidget,
                                                alignment: 'center-left',
                                                width: '180',
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridText3_5_1',
                                                        type: TextWidget,
                                                        title: 'Termination cost (SI)',
                                                        marginTop: '10',
                                                    }
                                                ]},

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell3_5_4',
                                                type: GridCellWidget,
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridText3_5_4',
                                                        type: TextWidget,
                                                        title: '0',
                                                        marginTop: '5',
                                                        titleFontColor: '#939290',
                                                    }
                                                ]}]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow4',
                                        type: GridRowWidget,
                                        marginTop: '20',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell4_1',
                                                type: GridCellWidget,
                                                alignment: 'center-left',
                                                width: '180',
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridText4_1',
                                                        type: TextWidget,
                                                        title: 'Headcount increase',
                                                        marginTop: '10',
                                                    }
                                                ]},

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell4_4',
                                                type: GridCellWidget,
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell4_4DropBox',
                                                        type: DropBoxWidget,
                                                        skin: 'popupdropbox',
                                                    }
                                                ]}]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow55',
                                        type: GridRowWidget,
                                        marginTop: '20',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell55_1',
                                                type: GridCellWidget,
                                                alignment: 'center-left',
                                                width: '180',
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridButton55_1',
                                                        type: ButtonWidget,
                                                        label: 'Month of base salary for non-compete clause',
                                                        action: '',
                                                        isInfo: true}
                                                ]},

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell55_4',
                                                type: GridCellWidget,
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell55_4Textbox',
                                                        type: TextBoxWidget,
                                                        titleVisible: false,
                                                        defaultText: '0',
                                                        width: '100',
                                                        skin: 'simulationtextbox',
                                                    }
                                                ]}]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow5',
                                        type: GridRowWidget,
                                        marginTop: '50',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridCell5_1',
                                                type: GridCellWidget,
                                                skin: 'bottomborderlight',
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridText5',
                                                        type: TextWidget,
                                                        title: 'Note',
                                                        marginTop: '5',
                                                        marginBottom: '10',
                                                    },
                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridTextBox5',
                                                        type: TextBoxWidget,
                                                        titleVisible: false,
                                                        marginLeft: '150',
                                                        marginBottom: '10',
                                                        skin: 'simulationtextbox',
                                                    }
                                                ]}]},

                                    {
                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridRow8',
                                        type: GridRowWidget,
                                        alignment: 'center',
                                        width: '100%',
                                        widgets: [

                                            {
                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridButtonGrid',
                                                type: GridWidget,
                                                widgets: [

                                                    {
                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridButtonGridRow1',
                                                        type: GridRowWidget,
                                                        alignment: 'center',
                                                        width: '100%',
                                                        widgets: [

                                                            {
                                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridButtonGridCell1',
                                                                type: GridCellWidget,
                                                                widgets: [

                                                                    {
                                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridButtonGridOkButton',
                                                                        type: ButtonWidget,
                                                                        label: 'Submit',
                                                                        action: '',
                                                                        marginTop: '40',
                                                                        fontColor: 'icon-add-circle',
                                                                        skin: 'telecompopup',
                                                                    }
                                                                ]},

                                                            {
                                                                id: 'sandyDevSimulationEmployeePopUpEmployeeGridButtonGridCell2',
                                                                type: GridCellWidget,
                                                                widgets: [

                                                                    {
                                                                        id: 'sandyDevSimulationEmployeePopUpEmployeeGridButtonGridCancelButton',
                                                                        type: ButtonWidget,
                                                                        label: 'Cancel',
                                                                        action: '',
                                                                        marginLeft: '10',
                                                                        marginTop: '40',
                                                                        skin: 'telecomcancel',
                                                                    }
                                                                ]}]}]}]}]}]},*/
//                    {
//                        id: 'dpick',
//                        type: DatePickerWidget,
//                        editable: true,
//                        skin: 'monthpicker',
//                        monthPicker: true,
//                        width: 300
//                    },
//                    {
//                        id: 'dklsk',
//                        type: TextBoxWidget
//                    },
//                    {
//                        id: 'testHt',
//                        type: HorizontalTableWidget,
//                        title: 'Admin Panel',
//                        titleVisible: true,
//                        columnNames: ["Measure", "Value"],
//                        searchField: false,
//                        checkbox: null,
//                        width: '50%',
//                        marginLeft: '30',
//                        marginTop: '10',
//                        skin: 'deepblue_ht',
//                        widgets: []
//                    },
//                    {
//                        id: 'modosdavidMainGridtable',
//                        type: GridTableWidget,
//                        title: '',
//                        widgets: [
//
//                            {
//                                id: 'modosdavidMainGridtableCell1',
//                                type: GridTableCellWidget,
//                                widgets: [
//
//                                    {
//                                        id: 'modosdavidMainGridtableCell1DatePicker',
//                                        type: DatePickerWidget,
//                                        editable: true,
//                                        skin: 'datepicker',
//                                    }
//                                ]}]},
//
//                    {
//                        id: 'modosdavidTestLineArea',
//                        type: LineAreaChartWidget,
//                        width: '800',
//                        height: '400',
//                        listen: [{"event": "launch.modosdavidToggle.finished", "method": "refresh"}],
//                        datasets: [{legendLabel: 'Test1Test1Test1Test1Test1', borderColor: '#00965E', borderWidth: 1, backgroundColor: '#00965E', fill: true, lineTension: 0.5, pointRadius: 0}, {legendLabel: 'Test2', borderWidth: 1, borderColor: '#858686', backgroundColor: '#858686', fill: true, lineTension: 0.5, pointRadius: 0}, {legendLabel: 'Test3', borderColor: '#0066CC', backgroundColor: '#0066CC', fill: true, lineTension: 0.5, pointRadius: 0}],
//                        marginLeft: '50',
//                        legendSkin: 'legend-2',
//                        visible: true,
//                        xAxisLabel: 'Test1',
//                        yAxisLabel: 'Test2',
//                        xAxesDisplay: true,
//                        xAxesGridLinesDisplay: true,
//                        xAxesGridLinesDrawBorder: true,
//                        yAxesDisplay: true,
//                        yAxesGridLinesDisplay: true,
//                        xAxesTicksFontFamily: 'imago, sans-serif',
//                        yAxesTicksFontFamily: 'imago, sans-serif',
//                        xAxesLabelFontFamily: 'imago, sans-serif',
//                        yAxesLabelFontFamily: 'imago, sans-serif',
//                        tooltipsEnabled: true,
//                        widgets: [
//
//                            {
//                                id: 'modosdavidTestVerticalLine',
//                                type: VerticalLineBoxWidget,
//                            }
//                        ]},
//
//                    {
//                        id: 'testGridTable',
//                        type: GridTableWidget,
//                        title: '',
//                        widgets: [
//
//                            {
//                                id: 'testGridTableHeaderRow',
//                                type: GridTableHeaderRowWidget,
//                                widgets: [
//
//                                    {
//                                        id: 'testGridTableHeaderCell_01',
//                                        type: GridTableHeaderCellWidget,
//                                        widgets: [
//
//                                            {
//                                                id: 'testGridTableHeaderText_01',
//                                                type: TextWidget,
//                                                title: 'd',
//                                            }
//                                        ]},
//
//                                    {
//                                        id: 'testGridTableHeaderCell_02',
//                                        type: GridTableHeaderCellWidget,
//                                        widgets: [
//
//                                            {
//                                                id: 'testGridTableHeaderText_02',
//                                                type: TextWidget,
//                                                title: 'd2',
//                                            }
//                                        ]},
//
//                                    {
//                                        id: 'testGridTableHeaderCell_03',
//                                        type: GridTableHeaderCellWidget,
//                                        widgets: [
//
//                                            {
//                                                id: 'testGridTableHeaderText_03',
//                                                type: TextWidget,
//                                                title: 'd3',
//                                            }
//                                        ]}]},
//
//                            {
//                                id: 'testGridTableCell_01',
//                                type: GridTableCellWidget,
//                                widgets: [
//
//                                    {
//                                        id: 'testGridTableText_01',
//                                        type: DatePickerWidget,
//                                        title: 'Project Start',
//                                        titleVisible: true,
//                                        editable: true,
//                                        monthPicker: false,
//                                        marginTop: '10',
//                                        skin: 'datepicker'
//                                    }
//                                ]},
//
//                            {
//                                id: 'testGridTableCell_02',
//                                type: GridTableCellWidget,
//                                widgets: [
//
//                                    {
//                                        id: 'testGridTableText_02',
//                                        type: ToggleWidget
//                                    }
//                                ]},
//
//                            {
//                                id: 'testGridTableCell_03',
//                                type: GridTableCellWidget,
//                                widgets: [
//
//                                    {
//                                        id: 'testGridTableText_03',
//                                        type: DropBoxWidget,
//                                        items: [{name: 'ddd'}, {name: 'dd2'}],
//                                        skin: 'deepblue_dropbox'
//                                    }
//                                ]}]},
                ]},
};
