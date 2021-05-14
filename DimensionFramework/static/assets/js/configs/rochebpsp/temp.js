/* global app */
'use strict';
app.repository = {
    rocheBPSPProductsCheckoutCheckoutPopupFocusButton: {
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

    rocheBPSPProductsCheckoutCheckoutPopupCheckoutButton: {
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


    rocheBPSPProductsCheckoutGridRow1Cell3DropBox: {
        initCondition: (db) => {
            return v('rocheBPSPProductsCheckoutGridRow1Cell2DropBox.value');
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

    rocheBPSPProductsCheckoutPageInit: {
        state:
            (db) => {
                //temp:
                WidgetValue['systemValueGlobalStartingPlanYear'] = 2020;
                WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';
                WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';
            },
    },

    rocheBPSPProductsCheckoutGridTableYearly: {
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
                        let result;
                        WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] =  /*Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ||*/ r.Cells[x].Members[4].Attributes['Description'].indexOf('CS Coagulation') !== -1 || r.Cells[x].Members[4].Attributes['Description'].indexOf('CS COAGULATION') !== -1;
                        WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsMainLocked'] = WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] && r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', '') == '4';
                        WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearIsChildrenLocked'] = r.Cells[x].Members[4].Attributes['Description'].indexOf('CORE LAB') !== -1;
                        result = {
                            label: r.Cells[x].Members[4].Attributes['Description'],
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('a', '') + (WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? '_locked' : ''),
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            icon: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsMainLocked'] ? 'icon-lock' : 'icon-badge',
                            isMainLocked: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsMainLocked'],
                            isLocked: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'],
                            isChildrenLocked: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearIsChildrenLocked']
                        };
                        if (WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Name,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', ''),
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 1].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 2].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 3].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 4].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 5].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 6].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: 0,//??
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        }
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 7].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 8].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : '',
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: WidgetValue['systemValuerocheBPSPProductsCheckoutGridTableYearlyIsLocked'] ? 'locked' : '',
                        };
                    }
                ]
            }
        }
    },
    rocheBPSPProductsCheckoutColumnSelectorPopupDropBox: {
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
    rocheBPSPProductsCheckoutGridRow1Cell9Button: {
        reference: 'rocheBPSPProductsGridRow1Cell9Button'
    },

    rocheBPSPProductsCheckoutGridRow1Cell2DropBox: {
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
};