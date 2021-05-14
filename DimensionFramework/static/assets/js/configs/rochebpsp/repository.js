/* global app */
'use strict';
app.repository = {
    rocheBPSPMainApplicationInit: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{"MDX":"SELECT ({[}Clients].[${db.activeUser}]}*{[zSYS Analogic User Parameter Measure].[FullName]})ON COLUMNS FROM [zSYS Analogic User Parameter]"}`,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            label: (r, x) => {
                                app.widgetValue['activeUserName'] = r.Cells[0].Value;
                                return r.Cells[0].Value;
                            }
                        }
                }
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => `
            {
                    "MDX" : "SELECT 
                                {[Value Type].[Value Type].[String]} 
                            ON COLUMNS , 
                                {[Measures Control].[Measures Control].[Current Year]} 
                            ON ROWS 
                            FROM [Control] 
                    "}`,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            value: (r, x) => {
                                WidgetValue['systemValueGlobalStartingPlanYear'] = r.Cells[0].FormattedValue;
                                WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';
                                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = 'Y0';
                                WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = WidgetValue['systemValueGlobalStartingPlanYear'];
                                return true;
                            }
                        }
                }
            }
        ]
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
                length: 4,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 5%;margin-top:3%;";  >' + r.Cells[x + 1].FormattedValue + '</div>' + '<div style=\"font-size:10px;color:#B1B3B3;;margin-top:3%;\" >' + r.Cells[x + 2].FormattedValue + '</div>',
                            body: r.Cells[x + 3].FormattedValue
                        }
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
                length: 4,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 5%;margin-top:3%;";  >' + r.Cells[x + 1].FormattedValue + '</div>' + '<div style=\"font-size:10px;color:#408CD9;;margin-top:3%;\" >' + r.Cells[x + 2].FormattedValue + '</div>',
                            body: r.Cells[x + 3].FormattedValue
                        }
                    }]
            }
        }
    },


    rocheBPSPProductsCheckoutPopupFocusButton: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueFocusedProduct'] = Utils.getGridTableCell(WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly', 1).title;
                }
                /*  url: (db) => `/api/v1/Processes('MODULE - UI - Products GridTable CheckIn by User')/tm1.ExecuteWithReturn`,
                  type: 'POST',
                  body: (db) => `{
                          "Parameters": [
                          ]
                      }`*/
            },
    },

    rocheBPSPProductsNoCheckoutPopupFocusButton: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueFocusedProduct'] = Utils.getGridTableCell(WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly', 1).title;
                }
            }
    },

    rocheBPSPProductsCheckoutPopupCheckoutButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Products GridTable Checkout by User')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                {"Name": "pProduct", "Value": "${Utils.setAndGetGridTableSystemValueByCurrentRow(WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly', 1, 'systemValueCheckoutProduct', 'title')}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
            },
    },

    rocheBPSPProductsGridRow1Cell2DropBox: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "SELECT 
                        {[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Name],[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Key]} 
                    ON COLUMNS , 
                     {TM1SubsetToSet([Companies].[Companies], \\"All Active\\")}  
                    ON ROWS 
                    FROM [}ElementAttributes_Companies] 
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    on: false
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },


    rocheBPSPProductsGridRow1Cell3DropBox: {
        initCondition: (db) => {
            return v('rocheBPSPProductsGridRow1Cell2DropBox.value');
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "SELECT 
                        {[}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description]} 
                     ON COLUMNS , 
                        {Tm1SubsetToset([Receivers].[Receivers],'zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')} Plan Receivers')}
                     ON ROWS
                    FROM [}ElementAttributes_Receivers] 

            "}`,
            parsingControl: {
                type: 'list',
                query:
                    (r, x) => {
                        return {name: r.Cells[x].FormattedValue, on: false};
                    }
            }
        }
    },

    rocheBPSPProductsPageInit: {
        initCondition: (db) => {
            return v('rocheBPSPProductsGridRow1Cell2DropBox') !== false;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "SELECT 
                        {[Versions].[Versions].[Live]} 
                    PROPERTIES [Versions].[Versions].[Caption]  ON COLUMNS , 
                    NON EMPTY 
                        {[Measures Company Information].[Measures Company Information].[Products Hierarchy]} 
                        PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON ROWS 
                    FROM [Company Information] 
                WHERE 
                (
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}]
                )
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = r.Cells[0].FormattedValue;
                            L(r.Cells[0].FormattedValue);
                            WidgetValue['systemValueFocusedProduct'] = 'PL1';
                            WidgetValue['systemValueSegmentedControlPeriodUnit'] = 'Yearly';
                            return true;
                        }
                    }
            }
        }
    },

    rocheBPSPProductsYearSegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                    sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
                return [
                    {label: s, selected: 'Y0' === sr},
                    {label: ++s, selected: 'Y1' === sr},
                    {label: ++s, selected: 'Y2' === sr},
                    {label: ++s, selected: 'Y3' === sr},
                ];
            }
        },
        switch: {
            execute: (db) => {
                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = v('rocheBPSPProductsYearSegmentedControl.value');
                WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = v('rocheBPSPProductsYearSegmentedControl.selected');
            }
            //write back
            /*  url: (db) => `/api/v1/Processes('MODULE - UI - Products Columns Selection Update by User Selection')/tm1.ExecuteWithReturn`,
              type: 'POST',
              body: (db) => {
                  WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = v('rocheBPSPProductsYearSegmentedControl.value');
                  WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = v('rocheBPSPProductsYearSegmentedControl.selected');
                  return `{
                          "Parameters": [
                                  {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                  {"Name": "pSelectedColumns", "Value": "${v('rocheBPSPProductsColumnSelectorPopupDropBox.value')}"},
                          ]
                      }`
              }*/
        }
    },

    rocheBPSPProductsPeriodUnitSegmentedControl: {
        switch: {
            execute: (db) => {
                WidgetValue['systemValueSegmentedControlPeriodUnit'] = v('rocheBPSPProductsPeriodUnitSegmentedControl.selected');
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderFocusButton: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct === 'PL1'};
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderReturnFromFocus: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct !== 'PL1'};
            }
        },
        launch: {
            execute: (db) => {
                WidgetValue['systemValueFocusedProduct'] = 'PL1';
            }
        }
    },

    rocheBPSPProductsGridTableMonthlyHeaderFocusButton: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct === 'PL1'};
            }
        }
    },

    rocheBPSPProductsGridTableMonthlyHeaderReturnFromFocus: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct !== 'PL1'};
            }
        }, launch: {
            execute: (db) => {
                WidgetValue['systemValueFocusedProduct'] = 'PL1';
            }
        }
    },

    rocheBPSPProductsProductSelectorShortcutPopupGridTable: {
        initCondition: (db) => {
            return Repository.templateFunctions.initConditionDependingOnYearlyMonthly(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly';
                return v(g + '.cellData').filter(e => ['PL1', 'PL2', 'PL3'].includes(e[0].productLevel)).map(e => {
                    return [{
                        label: e[0].label,
                        skin: 'gridtable_hierarchy_shortcut_bpsp_' + e[0].productLevel,
                        productCode: e[1].title
                    }];
                });
            }
        }
    },

    rocheBPSPProductsProductSelectorShortcutPopupGridTableButton01: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueFocusedProduct'] = Utils.getGridTableCell('rocheBPSPProductsProductSelectorShortcutPopupGridTable', 0).productCode;
                }
            },
    },

    rocheBPSPProductsCheckoutWarningByUserText: {
        initCondition: (db) => {
            return v('rocheBPSPProductsGridTableYearly.cellData') !== false;
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly',
                    c = Utils.getGridTableCell(g, 0), u = c.checkoutUser, d = c.checkedOutAt;
                return {title: `by<b>${u}</b>since<b>${d}</b>`};
            }
        }
    },

    templateFunctions: {
        initConditionDependingOnYearlyMonthly: (db) => {
            let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly',
                l = v(g + '.cellData.length');
            return l !== false && l !== 0;
        }
    },

    defaultFunctionsForGridTableYearlyHeader: {
        initCondition: () => {
            let l = v('rocheBPSPProductsGridTableYearly.cellData.length');
            return l !== false && l !== 0;
        },
        executeForTextFirstCol: (columnIndex) => {
            let cell = v('rocheBPSPProductsGridTableYearly.cellData')[0][columnIndex];
            return {title: cell.members[5].Name, body: cell.members[6].Name};
        },
        executeForText: (columnIndex) => {
            let cells = v('rocheBPSPProductsGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex - 1];
            return {
                title: cell.members[5].Name === previousCell.members[5].Name ? '' : cell.members[5].Name,
                body: cell.members[6].Name
            };
        },
        executeForCell: (columnIndex) => {
            let cells = v('rocheBPSPProductsGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex - 1];
            return {
                cellHeaderSkin: cell.members[5].Name === previousCell.members[5].Name ? '' : 'long_border_bpsp'
            };
        }
    },

    rocheBPSPProductsForGridTableYearlyHeaderCellTemplate: {
        initCondition: () => {
            return Repository['defaultFunctionsForGridTableYearlyHeader'].initCondition();
        },
        initDefault: () => {
            return {};
        },
        init: {
            execute: (db, widgetId) => {
                let index = parseInt(widgetId.split('-')[1]);
                return Repository['defaultFunctionsForGridTableYearlyHeader'].executeForCell(index - 1);
            }
        }
    },

    rocheBPSPProductsForGridTableYearlyHeaderTextTemplate: {
        initCondition: () => {
            return Repository['defaultFunctionsForGridTableYearlyHeader'].initCondition();
        },
        initDefault: () => {
            return {};
        },
        init: {
            execute: (db, widgetId) => {
                let index = parseInt(widgetId.split('-')[1]);
                return Repository['defaultFunctionsForGridTableYearlyHeader'].executeForText(index - 1);
            }
        }
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-04': {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearlyHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearlyHeader'].executeForTextFirstCol(3);
            }
        }
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-05': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-05': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-06': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-06': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-07': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-07': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-08': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-08': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-09': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-09': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-10': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-10': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-11': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-11': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-12': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-12': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-13': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsGridTableYearlyHeaderText-13': {
        reference: 'rocheBPSPProductsForGridTableYearlyHeaderTextTemplate'
    },

    rocheBPSPProductsGridTableYearlyHeaderText13: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearlyHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearlyHeader'].executeForText(12);
            }
        }
    },

    rocheBPSPProductsGridTableYearly: {
        initCondition: (db) => {
            L(v('rocheBPSPProductsGridRow1Cell3DropBox.value.length'));
            return v('rocheBPSPProductsGridRow1Cell3DropBox.value.length') !== false && WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            body: (db) => `
            {
                "MDX" : 
                    "With 
                                 Set DefaultProductRows AS
                                 {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1]}, ALL, RECURSIVE )}
                                 Set FocusedOnProductRows AS
                                 {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${db.systemValueFocusedProduct}]}, ALL, RECURSIVE )}
                                 MEMBER [Products].[BPSP Budget].[ProductIsFocused] AS 
                                 IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[DUMMY] as 1
                                 Set PaddingColumns AS
                                 {{TM1SubsetToSet([Periods].[Periods],'zUI Padding Years')}*{[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[DUMMY]}}
                                 Set DefaultColumnSelection AS
                            {HEAD(UNION({StrToSet([Control].([Measures Control].[Measures Control].[UI ProuctsGridTable DefaultColumnsTuple ${db.systemValueGlobalSegmentedControlRelativeYear}],[Value Type].[Value Type].[String]))},{PaddingColumns},All),10)}
                                 Set WidgetSettingByUser AS
                                 {StrToSet('{'+[zSYS Analogic UI User Data].([}Clients].[}Clients].[${db.activeUserName}],[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPProductsGridTableYearly],[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sColumnSelectorTuple ${db.systemValueGlobalSegmentedControlRelativeYear}])+'}')}
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ColumnSelectionByUser] AS 
                                 IIF(Count(WidgetSettingByUser)>0,'Head(UNION({WidgetSettingByUser},{PaddingColumns},All),10)','{}')
                                 Set ColumnSelectionByUser AS
                                 {StrToSet([LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ColumnSelectionByUser])}
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductName] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductCaption] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductLevel] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment] as
                                        [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutDateTime] as 
                                        [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutUser] as 
                                        [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                                 Set FixColumns AS
                                 {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductName]),
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductCaption]),
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductLevel]),
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag]),
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutUser]),
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutDateTime])}
                                 Set Comment AS
                                 {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment])}
                            SELECT 
                              {UNION(HEAD(UNION(UNION({FixColumns},{ColumnSelectionByUser},All),{DefaultColumnSelection},All),16),{Comment},All)}
                              PROPERTIES [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Caption] ,[Periods].[Periods].[Caption]  ON COLUMNS , 
                              {StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])}
                              PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption] ON ROWS 
                            FROM [Sales Plan by Product] 
                            WHERE 
                              (
                               [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                               [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                               [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}],
                               [Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]
                              )

                        "
            }
       `,
            parsingControl: {
                type: 'matrix',
                length: 17,
                query: [
                    (r, x) => {
                        let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'];
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = x;
                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_hierarchy_bpsp_' + pl + (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? '_locked' : ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            icon: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] ? 'icon-lock' : 'icon-badge',
                            isMainLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'],
                            isLockedByMe: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] && WidgetValue.activeUserName.indexOf(checkoutUser) !== -1,
                            isLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'],
                            isChildrenLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'],
                            checkoutUser: checkoutUser,
                            checkedOutAt: r.Cells[x + 5].FormattedValue,
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 16].FormattedValue !== ''
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue.replace('PL', ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 4;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        let cellValue = r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue;
                        return {
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            icon: cellValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: cellValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            hasComment: cellValue !== ''
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                        };
                    }
                ]
            }
        }
    },
    rocheBPSPProductsGridTableMonthly: {
        initCondition: (db) => {
            L(v('rocheBPSPProductsGridRow1Cell3DropBox.value'));
            L(db.systemValueGlobalCompanyProductPlanVersion);
            return v('rocheBPSPProductsGridRow1Cell3DropBox.value.length') !== false && WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Monthly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            body: (db) => `
            {
                "MDX" : 
                    "With
                        --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion
                             Set DefaultProductRows AS
                             {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1]}, ALL, RECURSIVE )}
                        --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                             Set FocusedOnProductRows AS
                             {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${db.systemValueFocusedProduct}]}, ALL, RECURSIVE )}
                        --Decide which rowSet to use
                             MEMBER [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused] AS 
                             IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                        -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                             MEMBER [Periods].[Periods].[ProductName] as 
                                    [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                             MEMBER [Periods].[Periods].[ProductCaption] as 
                                    [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                             MEMBER [Periods].[Periods].[ProductLevel] as 
                                    [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                             MEMBER [Periods].[Periods].[zUI CheckOutFlag] as
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value])
                             MEMBER [Periods].[Periods].[HasComment] as
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                             MEMBER [Periods].[Periods].[zUI CheckOutUser] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                             MEMBER [Periods].[Periods].[zUI CheckOutDateTime] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                        -- Create the first 5 column with information
                             Set FixColumns AS
                             {[Periods].[Periods].[ProductName],
                              [Periods].[Periods].[ProductCaption],
                              [Periods].[Periods].[ProductLevel],
                              [Periods].[Periods].[zUI CheckOutFlag],
                              [Periods].[Periods].[zUI CheckOutUser],
                              [Periods].[Periods].[zUI CheckOutDateTime]}
                             Set Comment AS
                             {([Periods].[Periods].[HasComment])}
                        -- query
                        SELECT 
                        --Columns
                           {Union(Union(FixColumns,{TM1SubsetToSet([Periods].[Periods], \\"zUI ${db.systemValueGlobalSegmentedControlRelativeYear} Product Monthly Input\\")},All),{Comment},All)}
                           PROPERTIES [Periods].[Periods].[Caption]ON COLUMNS , 
                        -- rows
                          {StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])}
                          PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption] ON ROWS 
                        FROM [Sales Plan by Product] 
                        WHERE 
                          (
                           [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],
                       [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                       [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}],
                           [Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]
                          )
                        "
            }
       `,
            parsingControl: {
                type: 'matrix',
                length: 20,
                query: [
                    (r, x) => {
                        let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue;
                        WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked'];
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;
                        WidgetValue['systemValueMonthlyRelativeIndex'] = x;

                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_hierarchy_bpsp_' + pl + (WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? '_locked' : ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            icon: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked'] ? 'icon-lock' : 'icon-badge',
                            isMainLocked: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked'],
                            isLockedByMe: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] && WidgetValue.activeUserName.indexOf(checkoutUser) !== -1,
                            isLocked: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'],
                            isChildrenLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'],
                            checkoutUser: checkoutUser,
                            checkedOutAt: r.Cells[x + 5].FormattedValue,
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 19].FormattedValue === ''
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue.replace('PL', ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 4;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: '||||',
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
                            icon: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    }
                ]
            }
        }
    },
    rocheBPSPProductsColumnSelectorUpdateButton: {
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Products Columns Selection Update by User Selection')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                {"Name": "pSelectedColumns", "Value": "${v('rocheBPSPProductsColumnSelectorPopupDropBox.value')}"},
                        ]
                    }`
        }
    },
    rocheBPSPProductsCheckoutColumnSelectorUpdateButton: {
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Products Columns Selection Update by User Selection')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                {"Name": "pSelectedColumns", "Value": "${v('rocheBPSPProductsCheckoutColumnSelectorPopupDropBox.value')}"},
                        ]
                    }`
        }
    },
    rocheBPSPProductsColumnSelectorRestoreButton: {
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Products Columns Selection Update by User Selection')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                        ]
                    }`
        }
    },
    rocheBPSPProductsCheckoutColumnSelectorRestoreButton: {
        reference: 'rocheBPSPProductsColumnSelectorRestoreButton'
    },
    rocheBPSPProductsColumnSelectorPopupDropBox: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{
                    "MDX" : 
                        "With
                          Set DefaultRowSelection As
                             {TM1SubsetToSet([zSYS UI Columns Selector].[zSYS UI Columns Selector],\\"${db.systemValueGlobalSegmentedControlRelativeYear} selector\\")}
                          Set UserSpecificSelection As
                             {StrToSet('{'+[zSYS Analogic UI User Data].([}Clients].[}Clients].[${db.activeUserName}],
                                  [zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPProductsColumnSelectorPopupDropBox],
                                  [zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sValue])+'}')}
                          Member [}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[Flag] As
                             IIF(Count({UserSpecificSelection})=0,[}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[Y0],
                              IIF(Count(Intersect({[zSYS UI Columns Selector].CurrentMember},{UserSpecificSelection}))>0,
                                1,0))
                        SELECT 
                           {[}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[Flag],
                            [}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[Caption]} 
                          ON COLUMNS , 
                             {DefaultRowSelection}
                          ON ROWS 
                        FROM [}ElementAttributes_zSYS UI Columns Selector] 
                        "
                } `,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            items: (r, x) => {
                                let i, res = [];
                                for (i = 0; i < r.Cells.length; i = i + 2) {
                                    res.push({name: r.Cells[i + 1].Value, on: r.Cells[i].Value == 1});
                                }
                                return res;
                            }
                        }
                }

            },
        /*   state: (db) => {
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
           }*/
    },
    rocheBPSPProductsGridRow1Cell9Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        },
    },

//start product checkout

    rocheBPSPProductsCheckoutPeriodUnitSegmentedControl: {
        switch: {
            execute: (db) => {
                WidgetValue['systemValueSegmentedControlPeriodUnit'] = v('rocheBPSPProductsCheckoutPeriodUnitSegmentedControl.selected');
            }
        }
    },


    defaultFunctionsForCheckoutGridTableYearlyHeader: {
        initCondition: () => {
            let l = v('rocheBPSPProductsCheckoutGridTableYearly.cellData.length');
            return l !== false && l !== 0;
        },
        executeForTextFirstCol: (columnIndex) => {
            let cell = v('rocheBPSPProductsCheckoutGridTableYearly.cellData')[0][columnIndex];
            return {title: cell.members[5].Name, body: cell.members[6].Name};
        },
        executeForText: (columnIndex) => {
            let cells = v('rocheBPSPProductsCheckoutGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex - 1];
            return {
                title: cell.members[5].Name === previousCell.members[5].Name ? '' : cell.members[5].Name,
                body: cell.members[6].Name
            };
        },
        executeForCell: (columnIndex) => {
            let cells = v('rocheBPSPProductsCheckoutGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex - 1];
            return {
                cellHeaderSkin: cell.members[5].Name === previousCell.members[5].Name ? '' : 'long_border_bpsp'
            };
        }
    },

    rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate: {
        initCondition: () => {
            return Repository['defaultFunctionsForCheckoutGridTableYearlyHeader'].initCondition();
        },
        initDefault: () => {
            return {};
        },
        init: {
            execute: (db, widgetId) => {
                let index = parseInt(widgetId.split('-')[1]);
                return Repository['defaultFunctionsForCheckoutGridTableYearlyHeader'].executeForCell(index - 1);
            }
        }
    },

    rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate: {
        initCondition: () => {
            return Repository['defaultFunctionsForCheckoutGridTableYearlyHeader'].initCondition();
        },
        initDefault: () => {
            return {};
        },
        init: {
            execute: (db, widgetId) => {
                let index = parseInt(widgetId.split('-')[1]);
                return Repository['defaultFunctionsForCheckoutGridTableYearlyHeader'].executeForText(index - 1);
            }
        }
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-04': {
        initCondition: (db) => {
            return Repository['defaultFunctionsForCheckoutGridTableYearlyHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForCheckoutGridTableYearlyHeader'].executeForTextFirstCol(3);
            }
        }
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-05': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-05': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-06': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-06': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-07': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-07': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-08': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-08': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-09': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-09': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-10': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-10': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-11': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-11': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-12': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-12': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderCell-13': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderCellTemplate'
    },

    'rocheBPSPProductsCheckoutGridTableYearlyHeaderText-13': {
        reference: 'rocheBPSPProductsCheckoutForGridTableYearlyHeaderTextTemplate'
    },

    rocheBPSPProductsCheckoutDistributionEditPopupGridTable: {
        initCondition: (db) => {
            return v('rocheBPSPProductsCheckoutGridTableYearly.cellData') !== false;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let thirdCell = Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 2), result = [], i;
                let yearlyCells = v('rocheBPSPProductsCheckoutGridTableYearly.cellData'), pl;
                i = v('rocheBPSPProductsCheckoutGridTableYearly.row');
                pl = parseInt(thirdCell.title);
                result.push([yearlyCells[i][0], yearlyCells[i][2]]);
                ++i;
                while (i < yearlyCells.length && parseInt(yearlyCells[i][2].title) > pl) {
                    result.push([yearlyCells[i][0], yearlyCells[i][2]]);
                    ++i;
                }

                let firstValue = 5000000, otherValue = Math.round(firstValue / (result.length - 1)),
                    percent = Math.round((otherValue / firstValue) * 100);
                result[0].push({
                    value: 1
                });
                result[0].push({
                    title: firstValue,
                    cellSkin: 'readonly_bpsp'
                });
                result[0].push({
                    title: '100 %',
                    cellSkin: 'readonly_bpsp'

                });
                result[0].push({
                    title: '+ 500.000',
                    cellSkin: 'readonly_bpsp',
                    titleFontColor: '#A86B24'
                });
                result[0].push({
                    visible: true
                });
                for (i = 1; i < result.length; ++i) {
                    result[i].push({
                        value: 0
                    });
                    result[i].push({
                        title: otherValue
                    });
                    result[i].push({
                        title: percent + ' %'
                    });
                    result[i].push({
                        title: 'color test',
                        cellSkin: 'readonly_bpsp'
                    });
                    result[i].push({
                        visible: false
                    });
                }
                return result;
            }
        }
    },
    rocheBPSPProductsCheckoutGridTableYearlyFunction: {
        getCell: (index, r) => {
            let uiIndex = index + 10, uiValue = parseInt(r.Cells[uiIndex].FormattedValue), skin, cellSkin = '', icon = '', distributionEdit = false;
            if(uiValue === 1){
                skin = 'products_gd_readonly_with_icon_bpsp';
                cellSkin = 'readonly_bpsp';
                icon = 'icon-copy';
            }
            if(uiValue === 0){
                cellSkin = 'readonly_bpsp';
            }
            if((uiValue === 2 || uiValue === 3) && r.Cells[index].Members[6].Name !== 'Final Sales Plan') {
                skin = 'products_gd_readonly_with_icon_bpsp';
                cellSkin = 'readonly_bpsp';
                icon = 'icon-copy';
            }
            if(uiValue === 2 && r.Cells[index].Members[6].Name !== 'Final Sales Plan' ){
                skin = 'products_gd_writeable_with_icon_bpsp';
                cellSkin = '';
                icon = 'icon-dots-vertical';
                distributionEdit = true;
            }
            let result = {
                title: r.Cells[index].FormattedValue,
                cellSkin: cellSkin,
                distributionEdit: distributionEdit,
                skin: skin,
                cellVisible: r.Cells[index].Members[6].Name !== 'DUMMY',
                members: r.Cells[index].Members
            };
            if(icon !== ''){
                result['icon'] = icon;
            }
            return result;
        }
    },
    rocheBPSPProductsCheckoutGridTableYearly: {
        initCondition: (db) => {
            return WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            body: (db) => `
            {
                "MDX" : 
                    "With 
                         Set DefaultProductRows AS
                         {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${db.systemValueCheckoutProduct}]}, ALL, RECURSIVE )}
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[DUMMY] as 1
                         Set PaddingColumns AS
                         {{TM1SubsetToSet([Periods].[Periods],'zUI Padding Years')}*{[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[DUMMY]}}
                         Set DefaultColumnSelection AS
                    {HEAD(UNION({StrToSet([Control].([Measures Control].[Measures Control].[UI ProuctsGridTable DefaultColumnsTuple ${db.systemValueGlobalSegmentedControlRelativeYear}],[Value Type].[Value Type].[String]))},{PaddingColumns},All),10)}
                         Set ColumnSelectionByUser AS 
                         Head(UNION({StrToSet('{'+[zSYS Analogic UI User Data].([}Clients].[}Clients].[${db.activeUser}],[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPProductsGridTableYearly],[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sColumnSelectorTuple ${db.systemValueGlobalSegmentedControlRelativeYear}])+'}')},{PaddingColumns},All),10)
                         Set WidgetSettingByUser AS
                         {StrToSet('{'+[zSYS Analogic UI User Data].([}Clients].[}Clients].[${db.activeUserName}],[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPProductsGridTableYearly],[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sColumnSelectorTuple ${db.systemValueGlobalSegmentedControlRelativeYear}])+'}')}
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ColumnSelectionByUser] AS 
                         IIF(Count(WidgetSettingByUser)>0,'Head(UNION({WidgetSettingByUser},{PaddingColumns},All),10)','{}')
                         Set ColumnSelectionByUser AS
                         {StrToSet([LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ColumnSelectionByUser])}
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductName] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductCaption] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductLevel] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment] as
                                [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutDateTime] as 
                                [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutUser] as 
                                [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                         Set FixColumns AS
                         {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductName]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductCaption]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductLevel]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutUser]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutDateTime])}
                         Set Comment AS
                         {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment])}
                    SELECT 
                        {UNION(
                           HEAD(
                             UNION(
                               UNION({[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]}*{FixColumns},
                               {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[UI Format]}*{ColumnSelectionByUser},All),
                               {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[UI Format]}*{DefaultColumnSelection},All),26),
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]}*{Comment},All)}ON COLUMNS , 
                      {DefaultProductRows} PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption] ON ROWS 
                    FROM [Sales Plan by Product] 
                    WHERE 
                      (
                           [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                           [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                           [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}]
                      )

                        "
            }
       `,
            parsingControl: {
                type: 'matrix',
                length: 27,
                query: [
                    (r, x) => {
                        let result, pl;
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = x;
                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + pl,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 26].FormattedValue !== ''
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsCheckoutGridTableYearlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellVisible: true,
                            cellSkin: '',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue.replace('PL', ''),
                            cellVisible: true,
                            cellSkin: '',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 4;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                      /*  let uiIndex = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 11;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: 'readonly_bpsp',
                            skin: 'products_gd_readonly_with_icon_bpsp',
                            icon: 'icon-copy',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };*/
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                      /*  return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            icon: 'icon-dots-vertical',
                            distributionEdit: true,
                            skin: 'products_gd_writeable_with_icon_bpsp',
                            cellVisible: true,//r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members
                        };*/
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableYearlyFunction.getCell(WidgetValue['systemValueProductsYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 11;
                        let cellValue = r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue;
                        return {

                            icon: cellValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: cellValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            hasComment: cellValue !== ''
                        };
                    },
                    (r, x) => {
                        return {};
                    }
                ]
            }
        }
    },
    rocheBPSPProductsCheckoutGridTableMonthly: {
        initCondition: (db) => {
            return WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Monthly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            body: (db) => `
            {
                "MDX" : 
                    "With
                        --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion
                             Set DefaultProductRows AS
                             {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1]}, ALL, RECURSIVE )}
                        --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                             Set FocusedOnProductRows AS
                             {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${db.systemValueCheckoutProduct}]}, ALL, RECURSIVE )}
                        --Decide which rowSet to use
                             MEMBER [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused] AS 
                             IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                        -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                             MEMBER [Periods].[Periods].[ProductName] as 
                                    [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                             MEMBER [Periods].[Periods].[ProductCaption] as 
                                    [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                             MEMBER [Periods].[Periods].[ProductLevel] as 
                                    [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                             MEMBER [Periods].[Periods].[zUI CheckOutFlag] as
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value])
                             MEMBER [Periods].[Periods].[HasComment] as
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                             MEMBER [Periods].[Periods].[zUI CheckOutUser] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                             MEMBER [Periods].[Periods].[zUI CheckOutDateTime] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                        -- Create the first 5 column with information
                             Set FixColumns AS
                             {[Periods].[Periods].[ProductName],
                              [Periods].[Periods].[ProductCaption],
                              [Periods].[Periods].[ProductLevel],
                              [Periods].[Periods].[zUI CheckOutFlag],
                              [Periods].[Periods].[zUI CheckOutUser],
                              [Periods].[Periods].[zUI CheckOutDateTime]}
                             Set Comment AS
                             {([Periods].[Periods].[HasComment])}
                        -- query
                        SELECT 
                        --Columns
                           {Union(Union(FixColumns,{TM1SubsetToSet([Periods].[Periods], \\"zUI ${db.systemValueGlobalSegmentedControlRelativeYear} Product Monthly Input\\")},All),{Comment},All)}
                           PROPERTIES [Periods].[Periods].[Caption]ON COLUMNS , 
                        -- rows
                          {StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])}
                          PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption] ON ROWS 
                        FROM [Sales Plan by Product] 
                        WHERE 
                          (
                           [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],
                       [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                       [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}],
                           [Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]
                          )
                        "
            }
       `,
            parsingControl: {
                type: 'matrix',
                length: 20,
                query: [
                    (r, x) => {
                        let result, pl;
                        WidgetValue['systemValueMonthlyRelativeIndex'] = x;

                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + pl,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 19].FormattedValue === ''
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsCheckoutGridTableMonthlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue.replace('PL', ''),
                            cellSkin: '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 4;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        return {
                            icon: x < 40 ? 'icon-distribution-equal' : 'icon-distribution-manual',
                            cellSkin: '',
                            cellVisible: true,
                            skin: 'products_gd_distribution_icon_bpsp'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: 'readonly_bpsp',
                            skin: 'monthly_right_bpsp',
                            cellVisible: true,
                            editable: false,
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: 'readonly_bpsp',
                            cellVisible: true,
                            editable: false,
                            skin: 'monthly_right_bpsp',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: 'readonly_bpsp',
                            cellVisible: true,
                            editable: false,
                            skin: 'monthly_right_bpsp',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            skin: 'monthly_center_bpsp',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            skin: 'monthly_center_bpsp',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            skin: 'monthly_center_bpsp',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            skin: 'monthly_center_bpsp',
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            skin: 'monthly_center_bpsp',
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            skin: 'monthly_center_bpsp',
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            skin: 'monthly_center_bpsp',
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            skin: 'monthly_center_bpsp',
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            editable: true,
                            skin: 'monthly_center_bpsp',
                            titleFontColor: x < 40 ? '#000000' : '#A05EB5',
                            ordinal: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Ordinal,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            cellSkin: '',
                            icon: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    }
                ]
            }
        }
    },
    rocheBPSPProductsCheckoutColumnSelectorPopupDropBox: {
        reference: 'rocheBPSPProductsColumnSelectorPopupDropBox'
    },
    rocheBPSPProductsCheckoutGridRow1Cell9Button: {
        reference: 'rocheBPSPProductsGridRow1Cell9Button'
    },

    //end product checkout

    rocheBPSPMainGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },

    rocheBPSPCustomersGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },


    rocheBPSPSettingsGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },

    rocheBPSPProductsCommentEditControlPanelSaveButton: {
        launch: {}
    },


    rocheBPSPProductsCommentShowGridTable: {
        initCondition: (db) => {
            return Repository.templateFunctions.initConditionDependingOnYearlyMonthly(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 1).title;
                return `{"MDX":"
                    SELECT 
                    {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment]}
                    PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
                    ON COLUMNS , 
                    {[Products].[BPSP Budget].[${productCode}]} PROPERTIES [Products].[BPSP Budget].[Caption]
                    ON ROWS 
                    FROM [Sales Plan by Product] 
                    WHERE 
                    ([Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                    [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}],
                    [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],
                    [Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}])
            "}`
            },
            parsingControl: {
                type: 'matrix',
                length: 1,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].FormattedValue,
                        }
                    }]
            }
        }
    },


    rocheBPSPProductsCommentShowGridTableSource: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `{"MDX":"
            SELECT 
            {{[Measures Sales Plan by Product].[Measures Sales Plan by Product].[CommentSource]},
            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy]},
            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime]}}
            
            PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
            ON COLUMNS , 
            {[Products].[BPSP Budget].[P6]} 
            PROPERTIES [Products].[BPSP Budget].[Caption] 
            ON ROWS 
            FROM [Sales Plan by Product] 
            WHERE 
            ([Versions].[Versions].[Live],
            [Companies].[Companies].[1391],
            [Receivers].[Receivers].[PL],
            [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],
            [Periods].[Periods].[2021])
            "}`,
            parsingControl: {
                type: 'matrix',
                length: 3,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"margin-top:20px; float: left; font-size: 10px;  ";  >' + 'Edited by ' + '</div>' + '<div style=\"font-size:12px; font-weight: bold; margin-top:18px; margin-left: 3px; float: left;";  >' + r.Cells[x + 1].FormattedValue + '</div>' + '<div style=\"font-size:10px;color:#B1B3B3;margin-top:20px;margin-left: 5px; float: left; \" >' + r.Cells[x + 2].FormattedValue + '</div>',
                        }
                    }


                ]
            }
        }
    },


    rocheBPSPMaterialGridRow1Cell3Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },


    rocheBPSPMaterialGridRow1Cell2DropBox: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "SELECT 
                        {[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Name],[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Key]} 
                    ON COLUMNS , 
                     {TM1SubsetToSet([Companies].[Companies], \\"All Active\\")}  
                    ON ROWS 
                    FROM [}ElementAttributes_Companies] 
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    on: false
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },


    rocheBPSPMaterialGridRow2Cell1SegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                    sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
                return [
                    {label: 'By Product Group'},
                    {label: 'By IP Node'},
                ];
            }
        },

    },


    rocheBPSPAddMaterialGridRow2Cell1SegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                    sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
                return [
                    {label: 'Import List'},
                    {label: 'Search'},
                ];
            }
        },

    },


    rocheBPSPAddMaterialGridRow1Cell3Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },


    rocheBPSPipPlanningGridRow1Cell9Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },


    rocheBPSPipPlanningYearSegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                    sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
                return [
                    {label: s, selected: 'Y0' === sr},
                    {label: ++s, selected: 'Y1' === sr},
                    {label: ++s, selected: 'Y2' === sr},
                    {label: ++s, selected: 'Y3' === sr},
                ];
            }
        },
        switch: {
            execute: (db) => {
                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = v('rocheBPSPipPlanningYearSegmentedControl.value');
                WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = v('rocheBPSPipPlanningYearSegmentedControl.selected');
            }
        }
    },


    rocheBPSPipPlanningGridRow1Cell2DropBox: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "SELECT 
                        {[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Name],[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Key]} 
                    ON COLUMNS , 
                     {TM1SubsetToSet([Companies].[Companies], \\"All Active\\")}  
                    ON ROWS 
                    FROM [}ElementAttributes_Companies] 
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    on: false
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },


    rocheBPSPipPlanningGridRow2Cell1SegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                    sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
                return [
                    {label: 'Cash Sales'},
                    {label: 'Lease'},
                    {label: 'Return'},
                ];
            }
        },

    },


    rocheBPSPipPlanningGridRow2Cell2SegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                    sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
                return [
                    {label: 'New'},
                    {label: 'Used'},
                ];
            }
        },

    },

    rocheBPSPipPlanningGridRow1Cell3DropBox: {
        initCondition: (db) => {
            return v('rocheBPSPipPlanningGridRow1Cell2DropBox.value');
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "SELECT 
                        {[}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description]} 
                     ON COLUMNS , 
                        {Tm1SubsetToset([Receivers].[Receivers],'zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')} Plan Receivers')}
                     ON ROWS
                    FROM [}ElementAttributes_Receivers] 

            "}`,
            parsingControl: {
                type: 'list',
                query:
                    (r, x) => {
                        return {name: r.Cells[x].FormattedValue, on: false};
                    }
            }
        }
    },


    rocheBPSPipPlanningGridTableMonthly:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
With
--Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion
     Set DefaultProductRows AS
     {TM1DRILLDOWNMEMBER({[Materials].[BPSP Budget].[PL1]}, ALL, RECURSIVE )}
--Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
     Set FocusedOnProductRows AS
     {TM1DRILLDOWNMEMBER({[Materials].[BPSP Budget].[PL1]}, ALL, RECURSIVE )}
--Decide which rowSet to use
     MEMBER [Materials].[BPSP Budget].[ProductIsFocused] AS 
     IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
-- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName] as 
            [Materials].[BPSP Budget].CurrentMember.Properties('BPSP Budget Caption')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode] as 
            [Materials].[BPSP Budget].CurrentMember.Properties('BPSP Actual Caption')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel] as 
            [Materials].[BPSP Budget].CurrentMember.Properties('BPSP Budget IP Caption')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS] as 
            [Materials].[BPSP Budget].CurrentMember.Properties('IP DIS Relevant Budget')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment] as
            [Sales Plan IP].([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],[Measures Sales Plan IP].[Measures Sales Plan IP].[Comment Flag])
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutUser] as 
            [Sales Plan IP].([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI Checkout Flag],[Measures Sales Plan IP].[Measures Sales Plan IP].[EditedBy])
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutDateTime] as 
            [Sales Plan IP].([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI Checkout Flag],[Measures Sales Plan IP].[Measures Sales Plan IP].[EditedDateTime])
-- Create the first 5 column with information
     Set FixColumns AS
     {([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName]),
      ([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel]),
      ([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutFlag]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutUser]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutDateTime])}
     Set FinalColumns AS
     {([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment])}
-- column Tuple Create
     Set ColumnSelection As
        {([Periods].[Periods].[2020],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity]),
         ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[BW T3]),
         ([Periods].[Periods].[202101],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202102],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202103],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202104],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202105],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202106],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202107],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202108],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202109],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202110],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202111],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[202112],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
         ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
          ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Variance Final Plan vs Total Customer]),
          ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Variance Final Plan vs T3])}
SELECT 
--columns
     Union(Union({FixColumns},{ColumnSelection},All),{FinalColumns},All)
  ON COLUMNS , 
-- rows
  {StrToSet([Materials].[BPSP Budget].[ProductIsFocused])} ON ROWS 
FROM [Sales Plan IP] 
WHERE 
  (
   [Versions].[Versions].[Live],
   [Measures Sales Plan IP].[Measures Sales Plan IP].[Value],
   [Receivers].[Receivers].[All Receivers],
   [Companies].[Companies].[All Companies Active],
   [Contract Types].[Contract Types].[Cash Sales],
   [Instrument Types].[Instrument Types].[New]
  )
            "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 24,
                        query: [

                            (r, x) => {
                                return {label: r.Cells[x].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 2].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 3].FormattedValue}
                            },
                            (r, x) => {
                                return {title: r.Cells[x + 4].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 5].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 6].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 7].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 8].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 9].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 10].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 11].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 12].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 13].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 14].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 15].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 16].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 17].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 18].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 19].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 20].FormattedValue}
                            },


                            (r, x) => {
                                return {title: r.Cells[x + 21].FormattedValue}
                            },


                        ]
                    }

                },
        },


    rocheBPSPMaterialGridTable: {
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                return [
                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL1'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL2'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL2'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL3'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],


                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL4'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL5'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_bpsp_PL6'},

                        {title: '1', editable: false},

                        {title: 'PL1', editable: false},

                        {title: 'com', editable: false},

                        {title: 'com', editable: false},

                        {title: 'rep', editable: false}
                    ],

                ];
            }
        }
    },

};