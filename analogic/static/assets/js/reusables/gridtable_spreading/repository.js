if (!Repository['analogicSystemGridTableCtxMenu']) {
    Repository['analogicSystemGridTableCtxMenu'] = {
        setGridTableId(id) {
           this.gridTableId = id;
           this.closeAllPopups();
        },
        getGridTableId() {
            return this.gridTableId;
        },
        getGridTable() {
          return v(this.getGridTableId());
        },
        closeAllPopups() {
            Api.closePopup(['analogicSystemGridTableCtxMenu', 'analogicSystemDataSpreadOptionsPopup']);
        }
    };
}

if (!Repository['analogicSystemGeneralGridTableCtxMenu']) {
    Repository['analogicSystemGeneralGridTableCtxMenu'] = {
        getContextMenuItems() {
            return [{
                label: 'Data Spread',
                icon: 'icon-arrow-split-down',
                skin: 'data_spread_list',
                action: (ctx) => {
                    Utils.openPopup('analogicSystemDataSpreadOptionsPopup', ctx);
                    Utils.closePopup('analogicSystemGridTableCtxMenu', ctx);
                }
            }];
        }
    };
}

if (!Repository['analogicSystemGridTableCtxMenuGridTable']) {
    Repository['analogicSystemGridTableCtxMenuGridTable'] = {
        init() {
            const sourceGridTable = Repository.analogicSystemGridTableCtxMenu.getGridTable();
            let contextMenuItems = [];

            if (sourceGridTable && typeof sourceGridTable.getContextMenuItems === 'function') {
                contextMenuItems = sourceGridTable.getContextMenuItems();
            } else if (Repository.analogicSystemGeneralGridTableCtxMenu && typeof Repository.analogicSystemGeneralGridTableCtxMenu.getContextMenuItems === 'function') {
                contextMenuItems = Repository.analogicSystemGeneralGridTableCtxMenu.getContextMenuItems();
            }

            return [contextMenuItems];
        },
        launch(ctx) {
            ctx.getCell().action(ctx);
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel1GridTable']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel1GridTable'] = {
        init() {
            let spreadOptions = {
                    'Proportional Spread': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Equal Spread': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Repeat': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Percent Change': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: '% Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Straight Line': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom'],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Start Value',
                        textbox2Visible: true,
                        textbox2Title: 'End Value',
                        cubePanelVisible: false
                    },
                    'Growth %': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom'],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Start Value',
                        textbox2Visible: true,
                        textbox2Title: 'Growth %',
                        cubePanelVisible: false
                    },
                    'Clear': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: false,
                        textbox1Visible: false,
                        textbox1Title: '',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Relative Proportional Spread': {
                        directionVisible: false,
                        directionOptions: [],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: true
                    },
                    'Relative Percent Adjustment': {
                        directionVisible: false,
                        directionOptions: [],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: '% Adjustment',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: true
                    },
                    'Repeat Leaves': {
                        directionVisible: false,
                        directionOptions: [],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Equal Spread Leaves': {
                        directionVisible: false,
                        directionOptions: [],
                        actionVisible: true,
                        textbox1Visible: true,
                        textbox1Title: 'Value',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Leaf Hold': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: false,
                        textbox1Visible: false,
                        textbox1Title: '',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Release Leaf Hold': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: false,
                        textbox1Visible: false,
                        textbox1Title: '',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Consolidation Hold': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: false,
                        textbox1Visible: false,
                        textbox1Title: '',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    },
                    'Release Consolidation Hold': {
                        directionVisible: true,
                        directionOptions: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'all-directions'],
                        actionVisible: false,
                        textbox1Visible: false,
                        textbox1Title: '',
                        textbox2Visible: false,
                        textbox2Title: '',
                        cubePanelVisible: false
                    }
                },
                result = [], isSelected;

            Object.keys(spreadOptions).forEach(e => {
                isSelected = v('systemValueSelectedSpreadTypeData')?.title === e;
                result.push([
                    {
                        title: e,
                        cellBackgroundColor: isSelected ? '#007AFF' : '#FFFFFF',
                        titleFontColor: isSelected ? '#FFFFFF' : '#000000',
                        directionVisible: spreadOptions[e].directionVisible,
                        directionOptions: spreadOptions[e].directionOptions,
                        actionVisible: spreadOptions[e].actionVisible,
                        textbox1Visible: spreadOptions[e].textbox1Visible,
                        textbox1Title: spreadOptions[e].textbox1Title,
                        textbox2Visible: spreadOptions[e].textbox2Visible,
                        textbox2Title: spreadOptions[e].textbox2Title,
                        cubePanelVisible: spreadOptions[e].cubePanelVisible
                    },
                    {
                        value: 0,
                        cellBackgroundColor: isSelected ? '#007AFF' : '#FFFFFF',
                        iconFontColor: isSelected ? '#FFFFFF' : '#000000'
                    }
                ]);
            });

            return result;
        },
        text_click() {
            Utils.setWidgetValue('systemValueSelectedSpreadTypeData', Utils.getGridTableCurrentCell('analogicSystemDataSpreadOptionsPopupPanel1GridTable'));
            Api.updateContent('analogicSystemDataSpreadOptionsPopupPanel1GridTable');
            Api.forceRefreshWidgets(['analogicSystemDataSpreadOptionsPopupPanel2', 'analogicSystemDataSpreadOptionsPopupPanel3']);
            $('#analogicSystemDataSpreadOptionsPopup').find('.ks-container').css('width', v('systemValueSelectedSpreadTypeData')['cubePanelVisible'] ? 965 : 444)
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setVisibility('directionVisible');
        },
        setVisibility(param1, param2 = false) {
            if (v('systemValueSelectedSpreadTypeData')) {
                return {
                    visible: param2 ? v('systemValueSelectedSpreadTypeData')[param1].includes(param2) : v('systemValueSelectedSpreadTypeData')[param1]
                };
            }
            return {visible: false};
        },
        setToggleInactive(param1, param2 = false) {
            if (v('systemValueSelectedSpreadTypeData')) {
                return {
                    editable: param2 ? v('systemValueSelectedSpreadTypeData')[param1].includes(param2) : v('systemValueSelectedSpreadTypeData')[param1]
                };
            }
            return {editable: false};
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2ActionPanel']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2ActionPanel'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setVisibility('actionVisible');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setVisibility('textbox1Visible');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setVisibility('textbox2Visible');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle1']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle1'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'top-left');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle2']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle2'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'top');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle3']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle3'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'top-right');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle4']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle4'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'left');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle5']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle5'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'all-directions');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle6']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle6'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'right');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle7']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle7'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'bottom-left');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle8']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle8'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'bottom');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle9']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2DirectionPanelToggle9'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setToggleInactive('directionOptions', 'bottom-right');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel3']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel3'] = {
        init() {
            return Repository.analogicSystemDataSpreadOptionsPopupPanel2DirectionPanel.setVisibility('cubePanelVisible');
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1Textbox']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1Textbox'] = {
        init() {
            if (v('systemValueSelectedSpreadTypeData')) {
                return {
                    title: v('systemValueSelectedSpreadTypeData')['textbox1Title']
                };
            }
            return {title: ''};
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2Textbox']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2Textbox'] = {
        init() {
            if (v('systemValueSelectedSpreadTypeData')) {
                return {
                    title: v('systemValueSelectedSpreadTypeData')['textbox2Title']
                };
            }
            return {title: ''};
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupPanel3GridTable']) {
    Repository['analogicSystemDataSpreadOptionsPopupPanel3GridTable'] = {
        init() {
            let result = [], data = {
                cube: 'Cost and FTE by Groups',
                dimensions: {
                    'Groups': {alias: false, elementName: 'Total Groups'},
                    'Versions': {alias: 'Caption', elementName: 'DataCopy Integration'},
                    'Periods': {alias: false, elementName: '202107'},
                    'Employees': {alias: 'Normal Name', elementName: 'Total Employees'},
                }
            };

            Object.keys(data.dimensions).forEach((e) => {
                result.push([
                    {title: e},
                    {title: data.dimensions[e].alias ?? 'Principal'},
                    {title: data.dimensions[e].elementName}
                ])
            });

            return result;
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupCloseBtn']) {
    Repository['analogicSystemDataSpreadOptionsPopupCloseBtn'] = {
        launch(ctx) {
            Utils.closePopup('analogicSystemDataSpreadOptionsPopup', ctx);
        }
    };
}

if (!Repository['analogicSystemDataSpreadOptionsPopupApplyBtn']) {
    Repository['analogicSystemDataSpreadOptionsPopupApplyBtn'] = {
        launch(ctx) {
            Utils.closePopup('analogicSystemDataSpreadOptionsPopup', ctx);
        }
    };
}