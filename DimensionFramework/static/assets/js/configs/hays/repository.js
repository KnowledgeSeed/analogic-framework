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
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button_circle' : 'filter_text_disabled';
            } else {
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button' : 'filter_text';
            }
            return cellOriginalValue;
        },

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
    haysKamForecastingForecastPhases: {
        init: {
            execute: (db) => {
                return [
                    [
                        {title: 'Forecast Phases', cellWidth: '8%'},
                        {
                            label: '',
                            cellWidth: '2%',
                            icon: 'icon-time-back-arrow'
                        },
                        {
                            label: 'Actual',
                            cellWidth: '30%'
                        },
                        {
                            label: 'Active Forecast',
                            cellWidth: '30%'
                        },
                        {
                            label: 'Passive Forecast',
                            cellWidth: '30%'
                        }
                    ]
                ];
            }
        }
    },
    haysKamForecastingForecast: {
        init: {

            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                return `{"MDX":"
                                SELECT 
                                               {TM1SubsetToSet([Periods].[Fiscal Year], \\"Current Forecast Period\\")}  
                                              ON COLUMNS , 
                                              NON EMPTY 
                                               {([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[All Key Account Managers],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[BP1],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[BP1],[Projects].[Projects].[Project001]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[BP2],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[BP2],[Projects].[Projects].[Project002]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[BP3],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM1],[Fee Earners].[Fee Earners].[BP3],[Projects].[Projects].[Project003]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM2],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM2],[Fee Earners].[Fee Earners].[BP4],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM2],[Fee Earners].[Fee Earners].[BP4],[Projects].[Projects].[Project004]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM2],[Fee Earners].[Fee Earners].[BP5],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team NKT],[Key Account Managers].[Key Account Managers].[KAM2],[Fee Earners].[Fee Earners].[BP5],[Projects].[Projects].[Project005]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[All Key Account Managers],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[BP6],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[BP6],[Projects].[Projects].[Project006]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[BP7],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[BP7],[Projects].[Projects].[Project007]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[BP8],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM3],[Fee Earners].[Fee Earners].[BP8],[Projects].[Projects].[Project008]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM4],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM4],[Fee Earners].[Fee Earners].[BP9],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM4],[Fee Earners].[Fee Earners].[BP9],[Projects].[Projects].[Project009]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM4],[Fee Earners].[Fee Earners].[BP10],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM4],[Fee Earners].[Fee Earners].[BP10],[Projects].[Projects].[Project010]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[All Fee Earners],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP11],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP11],[Projects].[Projects].[Project011]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP12],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP12],[Projects].[Projects].[Project012]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP13],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP13],[Projects].[Projects].[Project013]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP14],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP14],[Projects].[Projects].[Project014]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP15],[Projects].[Projects].[All Projects]),
                                                 ([Organization Units].[Organization Units].[Team MRG],[Key Account Managers].[Key Account Managers].[KAM5],[Fee Earners].[Fee Earners].[BP15],[Projects].[Projects].[Project015])
                                               }
                                              PROPERTIES [Key Account Managers].[Key Account Managers].[Caption] ,[Fee Earners].[Fee Earners].[Caption] 
                                              ON ROWS 
                                            FROM [Sales by Channel] 
                                            WHERE 
                                              (
                                               [Versions].[Versions].[Version1],
                                               [Currencies].[Currencies].[EUR],
                                               [Lineitems Sales by Channel].[Lineitems Sales by Channel].[Net Fees],
                                               [Measures Sales by Channel].[Measures Sales by Channel].[Value]
                                              )
                                    "}`;

            },
            parsingControl: {
                type: 'script',
                script: (data) => {
                    L(data);
                    return [[]];
                }
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
                },
        },

}