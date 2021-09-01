/* global app, Utils*/

'use strict';

app.repository = {
    haysKamForecastingDepartmentPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                            SELECT 
                               {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Sales channel]} 
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
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecastingBusinessPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                SELECT 
                                   {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Sales channel]} 
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
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecastingAreaPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                            SELECT 
                               {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Sales channel]} 
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
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecastingTeamPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                SELECT 
                                   {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Sales channel]} 
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
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecasting: {
        updateHayKamForecastingGridTableCell: (gridTableId, actualRow, actualColumn) => {
            let gridTableData = v(gridTableId), cellOriginalValue = gridTableData.cellData[actualRow][actualColumn];
            if (actualColumn != gridTableData.column) {
                return cellOriginalValue;
            }
            let dropDownValue = v('haysKamForecastingFilterPopUpDropdown.value');
            if (actualRow == 1) {
                cellOriginalValue['title'] = dropDownValue;

            }
            if (dropDownValue === '') {
                //skin változtatás:
                //cellOriginalValue['skin'] = actualRow == 0 ? 'első_sor_text_nek_a_skinje' : 'második_sor_text_nek_a_skinje';
            } else {
                //skin változtatás:
                //cellOriginalValue['skin'] = actualRow == 0 ? 'első_sor_text_nek_a_skinje_van_kiválasztott_érték' : 'második_sor_text_nek_a_skinje_van_kiválasztott_érték';
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
                            skin: 'filter_button',
                            cellSkin: 'top_greyfon'
                        },
                        {
                            title: 'Type',
                            icon: 'icon-circle-grid-4',
                            skin: 'filter_button',
                            iconColor: '#28A745',
                            cellSkin: 'greyfon'
                        },
                        {
                            title: 'Account',
                            icon: 'icon-rectangle-stack-fill',
                            skin: 'filter_button',
                            iconColor: '#E98300',
                            cellSkin: 'top_greyfon'
                        },
                        {
                            title: 'Location',
                            icon: 'icon-location',
                            skin: 'filter_button',
                            iconColor: '#E83E8C',
                            cellSkin: 'top_greyfon'
                        },
                        {
                            title: 'Project status',
                            icon: 'icon-calendar',
                            skin: 'filter_button',
                            iconColor: '#007BFF',
                            cellSkin: 'top_greyfon'
                        }
                    ],
                    [
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-clear',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        },
                        {
                            title: '',
                            skin: 'filter_text',
                            icon: '',
                            iconColor: '#A9A9A9',
                            cellSkin: ''
                        },
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-clear',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        },
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-clear',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
                        },
                        {
                            title: 'valami',
                            skin: 'filter_text',
                            icon: 'icon-clear',
                            iconColor: '#A9A9A9',
                            cellSkin: 'bottom_greyfon'
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
                        {name: selectedTitle + '1', on: selectedItems.includes(selectedTitle + '1')},
                        {name: selectedTitle + '2', on: selectedItems.includes(selectedTitle + '2')},
                        {name: selectedTitle + '3', on: selectedItems.includes(selectedTitle + '3')},
                        {name: selectedTitle + '4', on: selectedItems.includes(selectedTitle + '4')},
                        {name: selectedTitle + '5', on: selectedItems.includes(selectedTitle + '5')},
                        {name: selectedTitle + '6', on: selectedItems.includes(selectedTitle + '6')}
                    ]
                };
                return result;
            }
        }
    },
};