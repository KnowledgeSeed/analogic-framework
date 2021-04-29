/* global app */
'use strict';
app.repository = {
    rocheBPSPMainApplicationInit: {
        state: (db) => {
            WidgetValue['systemValueGlobalStartingPlanYear'] = 2020;
            WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';
            WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';
        }
    },
    rocheBPSPProductsGridRow1Cell2DropBox: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `
        {
            "MDX" : "SELECT
                {[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Member description]}
            ON COLUMNS ,
                {TM1SubsetToSet([Companies].[Companies], \\"All Active\\")}
             ON ROWS
            FROM [}ElementAttributes_Companies]"}
        }
       `,
            parsingControl: {
                type: 'list',
                query:
                    (r, x) => {
                        return {name: r.Cells[x].FormattedValue, on: false};
                    }
            }
        }
    },

    rocheBPSPMainGreyGridTable: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `{"MDX":"
			SELECT 
			{[Value Type].[Value Type].[String]} 
			ON COLUMNS , 
			{[Measures Control].[Measures Control].[BPSP NextGen system message Title],
			[Measures Control].[Measures Control].[BPSP NextGen system message User],
			[Measures Control].[Measures Control].[BPSP NextGen system message DateTime],
			[Measures Control].[Measures Control].[BPSP NextGen system message]}
			ON ROWS  FROM [Control] 
            "}`,
            parsingControl: {
                type: 'matrix',
                length: 1,
                query: [
                    (r, x) => {
                        return {title: r.Cells[x].FormattedValue}
                    }]
            }
        }
    },


    rocheBPSPMainBlueGridTable: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `{"MDX":"
            SELECT 
            {[Companies].[Companies].[All Companies^1391]} 
            PROPERTIES [Companies].[Companies].[Member description]  
            ON COLUMNS , 
            NON EMPTY 
               {[Measures Company Information].[Measures Company Information].[Start page message Title],
               [Measures Company Information].[Measures Company Information].[Start page message User],
               [Measures Company Information].[Measures Company Information].[Start page message DateTime],
               [Measures Company Information].[Measures Company Information].[Start page message]} 
              PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON ROWS 
            FROM [Company Information] 
            WHERE 
              (
               [Versions].[Versions].[Live]
              )
            "}`,
            parsingControl: {
                type: 'matrix',
                length: 1,
                query: [
                    (r, x) => {
                        return {title: r.Cells[x].FormattedValue}
                    }]
            }
        }
    },


    rocheBPSPProductsCheckoutPopupFocusButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Products GridTable CheckIn by User')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        ]
                    }`
            },
    },

    rocheBPSPProductsCheckoutPopupCheckoutButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Products GridTable Checkout by User')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        ]
                    }`
            },
    },


    rocheBPSPProductsGridRow1Cell3DropBox: {
        initCondition: (db) => {
            return v('rocheBPSPProductsGridRow1Cell2DropBox.value');
        },
        initDefault: (db) => {
            return [];
        },
        state:
            (db) => {
                return [{name: 'DK - Denmark', on: true}, {name: 'NL - Netherlands', on: false}, {
                    name: 'BE - Belgium',
                    on: false
                }];
            },
    },

    rocheBPSPProductsPageInit: {
        state:
            (db) => {
                //temp:
                WidgetValue['systemValueGlobalStartingPlanYear'] = 2020;
                WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';
                WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';
            },
    },

    rocheBPSPProductsGridTableYearly: {
        initCondition: (db) => {
            return v('rocheBPSPProductsColumnSelectorPopupDropBox') !== false;
        },
        initDefault: (db) => {
            return [];
        },
        state:
            (db) => {
                let dpxVal = v('rocheBPSPProductsColumnSelectorPopupDropBox.value') ? v('rocheBPSPProductsColumnSelectorPopupDropBox.value').split(',') : [];
                return [
                    [
                        {label: 'Division Diagnostics', skin: 'gridtable_hierarchy_bpsp_L01'},
                        {title: '123456789012', editable: false},
                        {title: '1', editable: false},
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '10.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '150.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'ODG Diagnostics', skin: 'gridtable_hierarchy_bpsp_L02'},
                        {title: '123456789012', editable: false},
                        {title: '2', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'Centralised & PoC Solutions', skin: 'gridtable_hierarchy_bpsp_L02'},
                        {title: '123456789012', editable: false},
                        {title: '2a', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CENTRALISED SOLUTIONS', skin: 'gridtable_hierarchy_bpsp_L03'},
                        {title: '123456789012', editable: false},
                        {title: '3', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'LAB SOLUTIONS', skin: 'gridtable_hierarchy_bpsp_L03'},
                        {title: '123456789012', editable: false},
                        {title: '3a', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CLINICAL CHEMISTRY', skin: 'gridtable_hierarchy_bpsp_L04'},
                        {title: '123456789012', editable: false},
                        {title: '4', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC REAGENTS', skin: 'gridtable_hierarchy_bpsp_L05'},
                        {title: '123456789012', editable: false},
                        {title: '5', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC Dat Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC TDM Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC HbA1c Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC Specific Protein Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ]
                ];
            }
    },
    rocheBPSPProductsColumnSelectorPopupDropBox: {
        state: (db) => {
            return [
                {name: '2019 Actuals', on: 'true'},
                {name: '2020 Actuals', on: 'true'},
                {name: '2021 YTD Actuals', on: 'true'},
                {name: '2021 Plan', on: 'true'},
                {name: '2021 Customer Plan Total', on: 'true'},
                {name: '2021 Marketing Adjustment', on: 'true'},
                {name: '2021 Total Plan', on: 'true'},
                {name: '2021 Final  Plan', on: 'true'},
                {name: 'Growth rate:  2020 Actual / 2021 Plan', on: 'true'},
                {name: 'Growth rate:  2021 Actual / 2022 Plan', on: 'true'},
            ];
        }
    },
    rocheBPSPProductsGridRow1Cell9Button: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{"MDX":"SELECT ({[}Clients].[${db.activeUser}]}*{[zSYS Analogic User Parameter Measure].[FullName]})ON COLUMNS FROM [zSYS Analogic User Parameter]"}`,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            label: (r, x) => {
                                app.widgetValue['activeUserName'] = app.utils.toTitleCase(r.Cells[0].Value);
                                return app.utils.toTitleCase(r.Cells[0].Value);
                            }
                        }
                }

            },
    },


};