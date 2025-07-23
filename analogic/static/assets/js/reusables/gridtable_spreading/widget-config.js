/* global app */
'use strict'

analogicSystemWidgets['analogicSystemGridTableCtxMenu'] = {
    id: 'analogicSystemGridTableCtxMenu',
    type: ContainerWidget,
    anchorVisible: false,
    anchorOnClick: true,
    visible: false,
    backdrop: true,
    width: '300',
    bgScrollable: true,
    fixed: false,
    heightFixed: false,
    behaviour: 'popup',
    pinned: false,
    position: false,
    newPositionCalculation: true,
    skin: '',
    widgets: [
        {
            id: 'analogicSystemGridTableCtxMenuGridTable',
            type: GridTableWidget,
            width: '100%',
            widgets: [
                {
                    id: 'analogicSystemGridTableCtxMenuGridTableCell1',
                    type: GridTableCellWidget,
                    alignment: 'center-center',
                    width: '80%',
                    widgets: [
                        {
                            id: 'analogicSystemGridTableCtxMenuGridTableCell1Button',
                            type: ButtonWidget,
                            width: '100%',
                            applyMeasuresToSection: true,
                            skin: 'data_spread_list'
                        }
                    ]
                }
            ]

        }
    ]
};
analogicSystemWidgets['analogicSystemDataSpreadOptionsPopup'] = {
    id: 'analogicSystemDataSpreadOptionsPopup',
    type: ContainerWidget,
    anchorVisible: false,
    anchorOnClick: true,
    visible: false,
    backdrop: true,
    width: '444',
    bgScrollable: true,
    fixed: false,
    height: '681',
    behaviour: 'popup',
    pinned: false,
    position: false,
    newPositionCalculation: true,
    skin: '',
    widgets: [
        {
            id: 'analogicSystemDataSpreadOptionsPopupGrid',
            type: GridWidget,
            skin: 'data_spread',
            widgets: [
                {
                    id: 'analogicSystemDataSpreadOptionsPopupPanel1',
                    type: PanelWidget,
                    width: '270px',
                    applyMeasuresToSection: true,
                    widgets: [
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel1GridTable',
                            type: GridTableWidget,
                            skin: 'spreads_list',
                            width: '100%',
                            widgets: [
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel1GridTableCell1',
                                    type: GridTableCellWidget,
                                    alignment: 'center-left',
                                    width: '80%',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel1GridTableCell1Text',
                                            type: TextWidget,
                                            title: '',
                                            marginLeft: 20,
                                            titleStyle: {
                                                white_space: 'nowrap',
                                                cursor: 'pointer',
                                                font_size: '13px'
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel1GridTableCell2',
                                    type: GridTableCellWidget,
                                    alignment: 'center-center',
                                    width: '20%',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel1GridTableCell2Text',
                                            type: ToggleWidget,
                                            icon: 'icon-star-fill',
                                            iconOff: 'icon-star',
                                            skin: 'data_spread_mark_as_favorite'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicSystemDataSpreadOptionsPopupPanel2',
                    type: PanelWidget,
                    width: '164px',
                    applyMeasuresToSection: true,
                    skin: 'data_spread',
                    widgets: [
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel',
                            type: PanelWidget,
                            width: '124px',
                            marginLeft: 18,
                            marginTop: 10,
                            widgets: [
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelRow1',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelTitle',
                                            type: TextWidget,
                                            title: 'Direction',
                                            titleFontSize: 13,
                                            titleFontWeight: 600
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelRow2',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle1',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-up-left',
                                            iconOff: 'icon-arrow-up-left',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle2',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-up',
                                            iconOff: 'icon-arrow-up',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle3',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-up-right',
                                            iconOff: 'icon-arrow-up-right',
                                            skin: 'select_spread_options'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelRow3',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle4',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-left',
                                            iconOff: 'icon-arrow-left',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle5',
                                            type: ToggleWidget,
                                            icon: 'icon-star-fill',
                                            iconOff: 'icon-star',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle6',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-right',
                                            iconOff: 'icon-arrow-right',
                                            skin: 'select_spread_options'
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelRow4',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle7',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-bottom-left',
                                            iconOff: 'icon-arrow-bottom-left',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle8',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-down',
                                            iconOff: 'icon-arrow-down',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle9',
                                            type: ToggleWidget,
                                            icon: 'icon-arrow-bottom-right',
                                            iconOff: 'icon-arrow-bottom-right',
                                            skin: 'select_spread_options'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanel',
                            type: PanelWidget,
                            width: '124px',
                            marginLeft: 18,
                            marginTop: 20,
                            widgets: [
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanelRow1',
                                    type: GridRowWidget,
                                    width: '164px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanelTitle',
                                            type: TextWidget,
                                            title: 'Action',
                                            titleFontSize: 13,
                                            titleFontWeight: 600
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanelRow2',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanelToggle1',
                                            type: ToggleWidget,
                                            icon: 'icon-plus',
                                            iconOff: 'icon-plus',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanelToggle2',
                                            type: ToggleWidget,
                                            icon: 'icon-minus',
                                            iconOff: 'icon-minus',
                                            skin: 'select_spread_options'
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2ActionPanelToggle3',
                                            type: ToggleWidget,
                                            icon: 'icon-arrows-square-reload',
                                            iconOff: 'icon-arrows-square-reload',
                                            skin: 'select_spread_options'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1',
                            type: PanelWidget,
                            width: '124px',
                            marginLeft: 18,
                            marginTop: 20,
                            widgets: [
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1Row1',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1Textbox',
                                            type: TextBoxWidget,
                                            title: 'Action',
                                            skin: 'data_spread_custom_group',
                                            width: 124
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2',
                            type: PanelWidget,
                            width: '124px',
                            marginLeft: 18,
                            marginTop: 20,
                            widgets: [
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2Row1',
                                    type: GridRowWidget,
                                    width: '124px',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2Textbox',
                                            type: TextBoxWidget,
                                            title: 'Action',
                                            skin: 'data_spread_custom_group',
                                            width: 124
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'analogicSystemDataSpreadOptionsPopupPanel3',
                    type: PanelWidget,
                    width: '511px',
                    skin: 'data_spread',
                    applyMeasuresToSection: true,
                    widgets: [
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel3Row1',
                            type: GridRowWidget,
                            width: '100%',
                            skin: 'data_spread',
                            widgets: [
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel3Row1Cell',
                                    type: GridCellWidget,
                                    alignment: 'center-center',
                                    width: '100%',
                                    widgets: [
                                        {
                                            id: "analogicSystemDataSpreadOptionsPopupPanel3Row1CellText",
                                            type: TextWidget,
                                            titleFontSize: 13,
                                            title: "Cube",
                                            marginRight: 10
                                        },
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel3Row1Dropbox',
                                            type: DropBoxWidget,
                                            skin: 'data_spread_edit',
                                            width: 360,
                                            items: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTable',
                            type: GridTableWidget,
                            skin: 'data_spread_cube_selector',
                            width: '480px',
                            marginLeft: 20,
                            marginTop: 20,
                            widgets: [
                                {
                                    id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderRow",
                                    type: GridTableHeaderRowWidget,
                                    widgets: [
                                        {
                                            id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderCell-1",
                                            type: GridTableHeaderCellWidget,
                                            width: "23%",
                                            widgets: [
                                                {
                                                    id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderText-1",
                                                    type: TextWidget
                                                }
                                            ]
                                        },
                                        {
                                            id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderCell-2",
                                            type: GridTableHeaderCellWidget,
                                            width: "29%",
                                            alignment: "center-left",
                                            widgets: [
                                                {
                                                    id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderText-2",
                                                    type: TextWidget,
                                                    titleFontSize: 13,
                                                    titleFontColor: "#ACADAE",
                                                    title: "Alias",
                                                    marginLeft: 10
                                                }
                                            ]
                                        },
                                        {
                                            id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderCell-3",
                                            type: GridTableHeaderCellWidget,
                                            width: "48%",
                                            alignment: "center-left",
                                            widgets: [
                                                {
                                                    id: "analogicSystemDataSpreadOptionsPopupPanel3GridTableHeaderText-3",
                                                    type: TextWidget,
                                                    titleFontColor: "#ACADAE",
                                                    titleFontSize: 13,
                                                    title: "Element",
                                                    marginLeft: 10
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTableCell1',
                                    type: GridTableCellWidget,
                                    alignment: 'center-left',
                                    width: '23%',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTableCell1Text',
                                            type: TextWidget,
                                            title: '',
                                            titleFontSize: 13
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTableCell2',
                                    type: GridTableCellWidget,
                                    alignment: 'center-left',
                                    width: '29%',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTableCell2Text',
                                            type: TextWidget,
                                            titleFontSize: 13,
                                            marginLeft: 10
                                        }
                                    ]
                                },
                                {
                                    id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTableCell3',
                                    type: GridTableCellWidget,
                                    alignment: 'center-left',
                                    width: '48%',
                                    widgets: [
                                        {
                                            id: 'analogicSystemDataSpreadOptionsPopupPanel3GridTableCell3Text',
                                            type: TextWidget,
                                            titleFontSize: 13,
                                            marginLeft: 10
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
            id: 'analogicSystemDataSpreadOptionsPopupGridRow',
            type: GridRowWidget,
            width: '100%',
            marginTop: 15,
            widgets: [
                {
                    id: 'analogicSystemDataSpreadOptionsPopupGridRow1Cell',
                    type: GridCellWidget,
                    width: '100%',
                    alignment: 'center-center',
                    widgets: [
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupCloseBtn',
                            type: ButtonWidget,
                            skin: 'data_spread_material_light',
                            label: 'Close',
                            marginRight: 10,
                            width: 180
                        },
                        {
                            id: 'analogicSystemDataSpreadOptionsPopupApplyBtn',
                            type: ButtonWidget,
                            skin: 'data_spread_material',
                            label: 'Apply Spread',
                            width: 180
                        }
                    ]
                }
            ]
        }
    ]
};
