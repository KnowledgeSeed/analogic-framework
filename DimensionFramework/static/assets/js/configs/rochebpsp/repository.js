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
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes))`,
            type: 'POST',
            body: (db) => `
            {
                "MDX" : 
                    "SELECT
                   {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag]),
                    ([Periods].[Periods].[2019],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Rexis Invoice]),
                    ([Periods].[Periods].[2020],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Rexis Invoice]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Rexis Invoice]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Plan Reference]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Customer Sales Plan]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Marketing Sales Plan Adj]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Growth BW Invoice]),
                    ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Growth Final Sales Plan])
                    }
                  PROPERTIES [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Caption] ,[Periods].[Periods].[Caption]  ON COLUMNS ,
                   {TM1SubsetToSet([Products].[BPSP Budget], \\"zSYS UI rocheBPSPProductsGridTable Rows - Budget\\")}
                  PROPERTIES [Products].[BPSP Budget].[BPSP Budget Caption] ON ROWS
                FROM [Sales Plan by Product]
                WHERE
                  (
                   [Versions].[Versions].[Live],
                   [Companies].[Companies].[1391],
                   [Receivers].[Receivers].[PL],
                   [Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]
                  )"
            }
       `,
            parsingControl: {
                type: 'matrix',
                length: 10,
                query: [
                    (r, x) => {
                        return {
                            label: r.Cells[x].Members[4].Attributes['Description'],
                            skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('a', ''),
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Name,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', ''),
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 1].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 2].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 3].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 4].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 5].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 6].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: 0,//??
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        }
                     },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 7].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 8].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'unlocked',
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ? 'locked' : 'unlocked',
                        };
                    }
                ]
            }
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