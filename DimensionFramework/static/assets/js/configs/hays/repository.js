/* global app, Utils*/

'use strict';

app.repository = {
    haysKamForecasting: {
        updateHayKamForecastingGridTableCell: (gridTableId, actualRow, actualColumn) => {
            let gridTableData = v(gridTableId), cellOriginalValue = gridTableData.cellData[actualRow][actualColumn];
            if (actualColumn != gridTableData.column) {
                return cellOriginalValue;
            }
            let dropDownValue = v('haysKamForecastingFilterPopUpDropdown.value') ? v('haysKamForecastingFilterPopUpDropdown.value') : '';
            if (actualRow == 1) {
                cellOriginalValue['title'] = dropDownValue;

            }
            if (dropDownValue === "") {
                //skin változtatás:
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button_circle' : 'filter_text_disabled';
            } else {
                //skin változtatás:
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button' : 'filter_text';
            }

            return cellOriginalValue;
        }
    },
    haysKamForecastingGridTable: {
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            title: 'Businesspartner',
                            icon: 'icon-person',
                            iconColor: '#6F42C1',
                            skin: 'filter_button_circle',
                            iconCustomEventName: 'text_click'
                        },
                        {
                            title: 'Type',
                            icon: 'icon-circle-grid-4',
                            skin: 'filter_button_circle',
                            iconColor: '#28A745',
                            iconCustomEventName: 'text_click'
                        },
                        {
                            title: 'Account',
                            icon: 'icon-rectangle-stack-fill',
                            skin: 'filter_button_circle',
                            iconColor: '#E98300',
                            iconCustomEventName: 'text_click'
                        },
                        {
                            title: 'Location',
                            icon: 'icon-location',
                            skin: 'filter_button_circle',
                            iconColor: '#E83E8C',
                            iconCustomEventName: 'text_click'
                        },
                        {
                            title: 'Time Focus',
                            icon: 'icon-calendar',
                            skin: 'filter_button_circle',
                            iconColor: '#007BFF',
                            iconCustomEventName: 'text_click'
                        }
                    ],
                    [
                        {
                            title: '',
                            skin: '',
                            icon: '',
                        },
                        {
                            title: '',
                            skin: '',
                            icon: ''
                        },
                        {
                            title: '',
                            skin: '',
                            icon: ''
                        },
                        {
                            title: '',
                            skin: '',
                            icon: ''
                        },
                        {
                            title: '',
                            skin: '',
                            icon: ''
                        }
                    ]
                ];
                return result;
            }

        },
        refresh_col_0: {
            execute: (db, widgetId, extraParams) => {
                return Repository.haysKamForecasting.updateHayKamForecastingGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_1: {
            execute: (db, widgetId, extraParams) => {
                return Repository.haysKamForecasting.updateHayKamForecastingGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_2: {
            execute: (db, widgetId, extraParams) => {
                return Repository.haysKamForecasting.updateHayKamForecastingGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_3: {
            execute: (db, widgetId, extraParams) => {
                return Repository.haysKamForecasting.updateHayKamForecastingGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_4: {
            execute: (db, widgetId, extraParams) => {
                return Repository.haysKamForecasting.updateHayKamForecastingGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
    },
    haysKamForecastingFilterPopUpDropdown: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('haysKamForecastingGridTable');
        },
        init: {
            execute: (db) => {
                let gridTableData = v('haysKamForecastingGridTable'),
                    selectedTitle = Utils.getGridTableCurrentCell('haysKamForecastingGridTable').title,
                    skin = 'filter_selector_' + selectedTitle.replace(' ', '_').toLowerCase(),
                    selectedItems = Utils.getGridTableCellByRowAndColumn('haysKamForecastingGridTable', 1, gridTableData.column, 'title').split(',');
                let result = {
                    skin: skin,
                    items: [
                        {name: ' ' + selectedTitle + '1', on: selectedItems.includes(' ' + selectedTitle + '1')},
                        {name: ' ' + selectedTitle + '2', on: selectedItems.includes(' ' + selectedTitle + '2')},
                        {name: ' ' + selectedTitle + '3', on: selectedItems.includes(' ' + selectedTitle + '3')},
                        {name: ' ' + selectedTitle + '4', on: selectedItems.includes(' ' + selectedTitle + '4')},
                        {name: ' ' + selectedTitle + '5', on: selectedItems.includes(' ' + selectedTitle + '5')},
                        {name: ' ' + selectedTitle + '6', on: selectedItems.includes(' ' + selectedTitle + '6')}
                    ]
                };
                return result;
            }
        }
    },
    haysKamForecastingGridTableRowCell1Text: {
        perform: {
            execute: (db) => {
                if (v('haysKamForecastingGridTable.row') == 1) {
                    WidgetValue['haysKamForecastingFilterPopUpDropdown']['value'] = '';
                }
            }
        }
    },
    haysKamForecastingGridTableRowCell2Text: {
        perform: {
            execute: (db) => {
                Repository.haysKamForecastingGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    haysKamForecastingGridTableRowCell3Text: {
        perform: {
            execute: (db) => {
                Repository.haysKamForecastingGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    haysKamForecastingGridTableRowCell4Text: {
        perform: {
            execute: (db) => {
                Repository.haysKamForecastingGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    haysKamForecastingGridTableRowCell5Text: {
        perform: {
            execute: (db) => {
                Repository.haysKamForecastingGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    haysForecastingHierarchy: {
        getToggleOne: (gridTableId, actualRow, actualColumn) => {
            let gridTableData = v(gridTableId),
                cellOriginalValue = gridTableData.cellData[actualRow][actualColumn];
            if (actualRow == gridTableData.row) {
                if (cellOriginalValue['value'] === '1') {
                    cellOriginalValue['value'] = '0'
                } else {
                    cellOriginalValue['value'] = '1'
                }
            }
            return cellOriginalValue;
        },

        getToggleTwo: (gridTableId, actualRow, actualColumn) => {
            let gridTableData = v(gridTableId),
                cellOriginalValue = gridTableData.cellData[actualRow][actualColumn];
            if (actualRow == gridTableData.row) {
                if (cellOriginalValue['value'] === '1') {
                    cellOriginalValue['value'] = '0'
                } else {
                    cellOriginalValue['value'] = '1'
                }
            }
            return cellOriginalValue;
        },

    },
    haysForecastingHierarchyGrid2Level1GridTable:
        {
            refresh_col_0: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleOne(widgetId, extraParams.row, extraParams.col);
                }
            },
            refresh_col_1: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleTwo(widgetId, extraParams.row, extraParams.col);
                }
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                SELECT 
                                   {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Caption]} 
                                  ON COLUMNS , 
                                   {TM1FILTERBYLEVEL({[Organization Units].[Organization Units].Members}, 4)} 
                                  ON ROWS 
                                FROM [}ElementAttributes_Organization Units] 
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    titleOn: r.Cells[x].FormattedValue,
                                    titleOff: r.Cells[x].FormattedValue,
                                }
                            },
                            (r, x) => {
                                return {}
                            }


                        ]
                    }
                },
        },

    haysForecastingHierarchyGrid2Level2GridTable:
        {

            refresh_col_0: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleOne(widgetId, extraParams.row, extraParams.col);
                }
            },
            refresh_col_1: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleTwo(widgetId, extraParams.row, extraParams.col);
                }
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                            SELECT 
                               {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Caption]} 
                              ON COLUMNS , 
                               {TM1FILTERBYLEVEL({[Organization Units].[Organization Units].Members}, 3)} 
                              ON ROWS 
                            FROM [}ElementAttributes_Organization Units] 
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    titleOn: r.Cells[x].FormattedValue,
                                    titleOff: r.Cells[x].FormattedValue,
                                }
                            },
                            (r, x) => {
                                return {}
                            }


                        ]
                    }
                },
        },

    haysForecastingHierarchyGrid2Level3GridTable:
        {
            refresh_col_0: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleOne(widgetId, extraParams.row, extraParams.col);
                }
            },
            refresh_col_1: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleTwo(widgetId, extraParams.row, extraParams.col);
                }
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                            SELECT 
                               {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Caption]} 
                              ON COLUMNS , 
                               {TM1FILTERBYLEVEL({[Organization Units].[Organization Units].Members}, 2)} 
                              ON ROWS 
                            FROM [}ElementAttributes_Organization Units] 
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    titleOn: r.Cells[x].FormattedValue,
                                    titleOff: r.Cells[x].FormattedValue
                                }
                            },
                            (r, x) => {
                                return {}
                            }


                        ]
                    }
                },
        },

    haysForecastingHierarchyGrid2Level4GridTable:
        {

            refresh_col_0: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleOne(widgetId, extraParams.row, extraParams.col);
                }
            },
            refresh_col_1: {
                execute: (db, widgetId, extraParams) => {
                    return Repository.haysForecastingHierarchy.getToggleTwo(widgetId, extraParams.row, extraParams.col);
                },
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                SELECT 
                                   {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Caption]} 
                                  ON COLUMNS , 
                                  NON EMPTY 
                                   {TM1FILTERBYLEVEL({[Organization Units].[Organization Units].Members}, 0)} 
                                  ON ROWS 
                                FROM [}ElementAttributes_Organization Units] 
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    titleOn: r.Cells[x].FormattedValue,
                                    titleOff: r.Cells[x].FormattedValue
                                }
                            },
                            (r, x) => {
                                return {}
                            }


                        ]
                    }
                }
        },

    haysUserGroupsByGroupsGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                SELECT 
                                   {[Measures User Groups].[Measures User Groups].Members}  
                                  ON COLUMNS , 
                                   {[}Groups].[}Groups].Members}  
                                  ON ROWS 
                                FROM [User Groups] 
                                WHERE 
                                  (
                                   [Versions].[Versions].[Live],
                                   [Organization Units].[Organization Units].[ENTERPRISE],
                                   [Employee].[Employee].[Employee 1],
                                   [Projects].[Projects].[All Projects]
                                  )
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 3,
                        query: [
                            (r, x) => {
                                return {
                                    title: r.Cells[x].Members[4].Name
                                }
                            },
                            (r, x) => {
                                return {
                                    value: r.Cells[x].FormattedValue
                                }
                            },
                            (r, x) => {
                                return {
                                    value: r.Cells[x].FormattedValue
                                }
                            },
                            (r, x) => {
                                return {
                                    value: r.Cells[x].FormattedValue
                                }
                            },
                            (r, x) => {
                                return {
                                }
                            },
                            (r, x) => {
                                return {
                                }
                            },



                        ]
                    }
                },


        }

}