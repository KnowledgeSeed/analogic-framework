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
                                return true;
                            }
                        }
                }
            }
        ]
    },

    rocheBPSPMainApplicationInit2: {
        initCondition: (db) => {
            return db.systemValueGlobalStartingPlanYear ? true : false;
        },
        initDefault: (db) => {
            return '';
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => `
                   {
                    "MDX" : "SELECT 
                            {[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sValue]} 
                              ON COLUMNS , 
                               {[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPProductsYearSegmentedControl]} 
                              ON ROWS 
                            FROM [zSYS Analogic UI User Data] 
                            WHERE 
                              (
                               [}Clients].[}Clients].[${db.activeUser}]
                              ) 
                    "}`,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            value: (r, x) => {
                                WidgetValue['systemValueGlobalSegmentedControlCellsetId'] = r.ID;
                                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = r.Cells[0].FormattedValue;//Y0, Y1, Y2, Y3
                                if (WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] === null || WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] === '') {
                                    WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = 'Y0';
                                }
                                let l = parseInt(WidgetValue['systemValueGlobalSegmentedControlRelativeYear'].replace('Y', ''));
                                WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']) + l;
                                return true;
                            }
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
                length: 4,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 5%;margin-top:1%;";  >' + r.Cells[x + 1].FormattedValue + '</div>' + '<div style=\"font-size:10px;color:#B1B3B3;;margin-top:1%;\" >' + r.Cells[x + 2].FormattedValue + '</div>',
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
            url: (db) => `/api/v1/Cellsets('${WidgetValue.systemValueGlobalSegmentedControlCellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = v('rocheBPSPProductsYearSegmentedControl.value');
                WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = v('rocheBPSPProductsYearSegmentedControl.selected');
                return `{"Ordinal": 0,"Value": \"${db.systemValueGlobalSegmentedControlRelativeYear}\"}`
            }
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
        },
        initConditionDependingOnCheckoutYearlyMonthly: (db) => {
            let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsCheckoutGridTableYearly' : 'rocheBPSPProductsCheckoutGridTableMonthly',
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
    rocheBPSPProductsInfoPopupText2: {
        initCondition: (db) => {
            return v('rocheBPSPProductsGridRow1Cell2DropBox.value.length') !== false;
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
              {"MDX":
                "SELECT 
                    {[Versions].[Versions].[Live]} 
                    PROPERTIES [Versions].[Versions].[Caption]  ON COLUMNS , 
                    {[Measures Company Information].[Measures Company Information].[Current Planning Event]} 
                    PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON ROWS 
                FROM [Company Information] 
                WHERE 
                  (
                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}]
                  )"}
            `,
            parsingControl: {
                type: 'object',
                query:
                    {
                        title: (r, x) => {
                            return '<li>' + r.Cells[0].FormattedValue + '</li>';
                        }
                    }
            }
        }
    },
    rocheBPSPProductsInfoPopupText1: {
        initCondition: (db) => {
            return v('rocheBPSPProductsGridRow1Cell2DropBox.value.length') !== false;
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
                    {"MDX":
                    "SELECT 
                        {[}ElementAttributes_Companies].[}ElementAttributes_Companies].[Currency - Key]} 
                    ON COLUMNS , 
                        {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}]} 
                    ON ROWS 
                    FROM [}ElementAttributes_Companies] "}
            `,
            parsingControl: {
                type: 'object',
                query:
                    {
                        title: (r, x) => {
                            return '<li>' + r.Cells[0].FormattedValue + '</li>';
                        }
                    }
            }
        }
    },
    rocheBPSPProductsCheckoutInfoPopupText1: {
        reference: 'rocheBPSPProductsInfoPopupText1'
    },
    rocheBPSPProductsCheckoutInfoPopupText2: {
        reference: 'rocheBPSPProductsInfoPopupText2'
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
                           {Union(Union(FixColumns,{DRILLDOWNMEMBER({[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]},{[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]})},All),{Comment},All)}
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
                            icon: x < 40 ? 'icon-distribution-equal' : 'icon-distribution-manual',
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            skin: 'products_gd_distribution_icon_bpsp'
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
    rocheBPSPProductsColumnSelectorUpdateButton:
        {

            launch: {
                validation: (db) => {
                    return {
                        success: v('rocheBPSPProductsColumnSelectorPopupDropBox.value').split(',').length <= 10,
                        message: 'The max number of columns allowed is 10. Please deselect some columns.'
                    };
                },
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
            validation: (db) => {
                return {
                    success: v('rocheBPSPProductsCheckoutColumnSelectorPopupDropBox.value').split(',').length <= 10,
                    message: 'The max number of columns allowed is 10. Please deselect some columns.'
                };
            },
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
            url: (db) => `/api/v1/Processes('MODULE - UI - Products Columns Selection Restore Default')/tm1.ExecuteWithReturn`,
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
                             IIF(Count({UserSpecificSelection})=0,[}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[${db.systemValueGlobalSegmentedControlRelativeYear}],
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

    rocheBPSPProductsCheckoutGridRow1Cell2CompanyText: {
        init: {
            execute: (db) => {
                return {title: v('rocheBPSPProductsGridRow1Cell2DropBox.value')};
            }
        }
    },

    rocheBPSPProductsCheckoutGridRow1Cell3ReceiverText: {
        init: {
            execute: (db) => {
                return {title: v('rocheBPSPProductsGridRow1Cell3DropBox.value')};
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

    rocheBPSPProductsCheckoutDistributionEditPopupGridTableFunctions: {
        getCell: (index, r) => {
            let c = r.Cells[index], editable = c.Consolidated === false && c.RuleDerived === false,
                performable = c.Consolidated === true && c.RuleDerived === false;

            let result = {
                title: c.FormattedValue,
                cellSkin: editable ? '' : 'readonly_bpsp',
                skin: editable ? 'monthly_center_bpsp' : 'monthly_right_bpsp',
                cellVisible: true,
                editable: editable,
                ordinal: c.Ordinal,
                members: c.Members,
                performable: performable,
                applyMeasuresToSection: true,
                width: '100%',
                height: '100%'
            };
            if (performable) {
                result['icon'] = 'icon-cloud-arrow-up';
            }
            return result;
        }
    },

    rocheBPSPProductsCheckoutDistributionEditPopupGridTable: {
        initCondition: (db) => {
            return v('rocheBPSPProductsCheckoutGridTableYearly.cellData.length') !== false && v('rocheBPSPProductsCheckoutGridTableYearly.cellData.length') !== 0;
        },
        initDefault: (db) => {
            return [];
        },
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        switch: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated)`,
            type: 'POST',
            body: (db) => {
                let productCode = Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title;
                return `
                {"MDX" :"With
                       Member [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[ProductName] As
                            [Products Flat].[Products Flat].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption]
                       Member [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[ProductLevel] As
                         [Products Flat].[Products Flat].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name]
                    SELECT
                       {[LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[ProductName],
                        [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[ProductLevel],
                        [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[UI Lock],
                        [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[Final Sales Plan],
                        [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[Split],
                        [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[Difference]}
                       PROPERTIES [LineItems Sales Plan by Product Flat].[LineItems Sales Plan by Product Flat].[Caption]  ON COLUMNS ,
                       UNION({[Products Flat].[Products Flat].[${productCode}]},
                       {TM1FILTERBYLEVEL({DRILLDOWNMEMBER({[Products Flat].[Products Flat].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} ${productCode}]}, {[Products Flat].[Products Flat].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} ${productCode}]})},0)},All)
                       PROPERTIES [Products Flat].[Products Flat].[Caption]  ON ROWS
                    FROM [Sales Plan by Product Flat]
                    WHERE
                      (
                       [Versions].[Versions].[${v('systemValueGlobalCompanyVersion')}],
                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                       [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}],
                       [Measures Sales Plan by Product Flat].[Measures Sales Plan by Product Flat].[Value],
                       [Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}12]
                      )"}`
            },
            parsingControl: {
                type: 'matrix',
                length: 6,
                query: [
                    (r, x) => {
                        let result, pl;
                        WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] = x;
                        pl = r.Cells[x + 1].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + pl,
                            cellVisible: true,
                            icon: 'icon-badge',
                            productLevel: pl
                        };
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] = WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex']].FormattedValue.replace('PL', ''),
                            cellVisible: true,
                            cellSkin: ''
                        };
                    },
                    (r, x) => {
                        WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] = WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] + 1;
                        return {
                            value: parseInt(r.Cells[WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex']].FormattedValue) === 0 ? 0 : 1,
                            ordinal: r.Cells[WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex']].Ordinal
                        };
                    },
                    (r, x) => {
                        WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] = WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutDistributionEditPopupGridTableFunctions.getCell(WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] = WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutDistributionEditPopupGridTableFunctions.getCell(WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] = WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'] + 1;
                        let s = Repository.rocheBPSPProductsCheckoutDistributionEditPopupGridTableFunctions.getCell(WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex'], r);
                        if (parseInt(s.title) > 0) {
                            s['titleFontColor'] = '#A86B24';
                        }
                        return s;
                    },
                    (r, x) => {
                        return {
                            visible: x === 0
                        };
                    }
                ]
            }
        }
    },
    rocheBPSPProductsCheckoutGridRow2Cell3Button: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Products GridTable CheckIn by User')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                {"Name": "pProduct", "Value": "${WidgetValue['systemValueCheckoutProduct']}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
            },
    },
    rocheBPSPProductsCheckoutGridTableYearlyFunction: {
        getCell: (index, r) => {
            let uiIndex = index + 10, uiValue = parseInt(r.Cells[uiIndex].FormattedValue), skin, cellSkin = '',
                applyMeasuresToSection = false,
                icon = '', distributionEdit = false, copyMerge = false, performWrite = false;
            if (uiValue === 1) {
                skin = 'products_gd_readonly_with_icon_bpsp';
                cellSkin = 'readonly_bpsp';
                icon = 'icon-copy';
                copyMerge = true;
            }
            if (uiValue === 0) {
                cellSkin = 'readonly_bpsp';
            }
            if ((uiValue === 2 || uiValue === 3)
                && (r.Cells[index].Members[6].Name == 'Final Sales Plan'
                    && r.Cells[index].Members[5].Name != WidgetValue.systemValueGlobalSegmentedControlRelativeYearValue)) {

                skin = 'products_gd_readonly_with_icon_bpsp';
                cellSkin = 'readonly_bpsp';
                icon = 'icon-copy';
                copyMerge = true;
            }
            if ((uiValue === 2 || uiValue === 3)
                && r.Cells[index].Members[6].Name === 'Final Sales Plan'
                && r.Cells[index].Members[5].Name == WidgetValue.systemValueGlobalSegmentedControlRelativeYearValue) {

                skin = 'products_gd_writeable_with_icon_bpsp';
                cellSkin = '';
                applyMeasuresToSection = true;
                performWrite = true;
                if (uiValue === 2) {
                    icon = 'icon-dots-vertical';
                    distributionEdit = true;
                } else {
                    icon = 'icon-cloud-arrow-up';
                    skin = 'monthly_right_bpsp';
                }
            }
            let result = {
                title: r.Cells[index].FormattedValue,
                cellSkin: cellSkin,
                distributionEdit: distributionEdit,
                copyMerge: copyMerge,
                performWrite: performWrite,
                ordinal: r.Cells[index].Ordinal,
                skin: skin,
                cellVisible: r.Cells[index].Members[6].Name !== 'DUMMY',
                members: r.Cells[index].Members
            };
            if (icon !== '') {
                result['icon'] = icon;

            }
            if (applyMeasuresToSection) {
                result['applyMeasuresToSection'] = true;
                result['width'] = '100%';
                result['height'] = '100%';
                result['performable'] = true;
                if (uiValue === 3) {
                    result['paddingRight'] = 18;
                }
            }
            return result;
        }
    },
    rocheBPSPProductsCheckoutCopyMergePopupSlider: {
        initCondition: (db) => {
            let l = v('rocheBPSPProductsCheckoutGridTableYearly.cellData.length');
            return l != false && l != 0;
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            { "MDX" :
                "SELECT 
                   {[Versions].[Versions].[Live]} 
                   PROPERTIES [Versions].[Versions].[Caption]  ON COLUMNS , 
                   {[Measures Sales Parameters by Products Flat].[Measures Sales Parameters by Products Flat].[Growth rate for Products Copy Minimum],
                    [Measures Sales Parameters by Products Flat].[Measures Sales Parameters by Products Flat].[Growth rate for Products Copy Maximum],
                [Measures Sales Parameters by Products Flat].[Measures Sales Parameters by Products Flat].[Growth rate for Products Copy]} 
                  ON ROWS 
                FROM [Sales Parameters by Products Flat] 
                WHERE 
                  (
                   [Years].[Years].[${WidgetValue.systemValueGlobalSegmentedControlRelativeYearValue}],
                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}],
                   [Receivers].[Receivers].[${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}],
                   [Products Flat].[Products Flat].[${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title}]
                  )
                  "}
           `,
            parsingControl: {
                    type: 'object',
                    query:
                        {
                            value: (r, x) => {
                                return Utils.parseNumber(r.Cells[2].FormattedValue) * 100;
                            },
                            originalValue: (r, x) => {
                                return Utils.parseNumber(r.Cells[2].FormattedValue) * 100;
                            }
                        }
                }
        }
    },
    rocheBPSPProductsCheckoutGridTableYearly: {
        perform: {
            validation: (db, cell, widgetValue) => {
                return {success: cell.distributionEdit === false && cell.copyMerge === false};
            },
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        initCondition: (db) => {
            return WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name))`,
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
    rocheBPSPProductsCheckoutGridRow2Cell1aButton: {
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear);
                return {
                    url: 'export?export_key=rocheMonthly',
                    activeUserName: db.activeUserName,
                    companyVersion: db.systemValueGlobalCompanyVersion, //Live
                    productPlanVersion: db.systemValueGlobalCompanyProductPlanVersion, //Budget
                    company: Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key'),
                    receiver: v('rocheBPSPProductsGridRow1Cell3DropBox.value'),
                    product: db.systemValueCheckoutProduct,
                    globalVersion: WidgetValue.systemValueGlobalCompanyVersion,
                    version: WidgetValue.systemValueGlobalCompanyProductPlanVersion,
                    year1: y1,
                    year2: y1 + 1,
                    year3: y1 + 2,
                    year4: y1 + 3,
                    key: 'exportMonthly'
                };
            }
        }
    },
    rocheBPSPProductsCheckoutGridTableMonthlyFunctions: {
        getCell: (index, r) => {
            let c = r.Cells[index], editable = c.Consolidated === false && c.RuleDerived === false,
                performable = c.Consolidated === true && c.RuleDerived === false;

            let result = {
                title: c.FormattedValue,
                cellSkin: editable ? '' : 'readonly_bpsp',
                skin: editable ? 'monthly_center_bpsp' : 'monthly_right_bpsp',
                cellVisible: true,
                editable: editable,
                ordinal: c.Ordinal,
                members: c.Members,
                performable: performable
                //titleFontColor: x < 40 ? '#000000' : '#A05EB5', manual
            };
            if (performable) {
                result['icon'] = 'icon-cloud-arrow-up';
            }
            return result;
        }
    },
    rocheBPSPProductsCheckoutUploadPopupPlDropbox: {
        initCondition: (db) => {
            let l = v('rocheBPSPProductsCheckoutGridTableMonthly.cellData.length');
            return l !== false && l !== 0;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                return v('rocheBPSPProductsCheckoutGridTableMonthly.cellData').map(function (e) {
                    return {name: 'PL' + e[2].title, key: e[2].title, on: false}
                }).reduce((acc, current) => {
                    const x = acc.find(item => item.name === current.name);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
            }
        }
    },
    rocheBPSPProductsCheckoutUploadPopupUpload: {
        upload: (db) => {
            return {
                staging: app.defaultUploadStagingFolder,
                target: app.defaultUploadTargetFolder,
                productLevel: v('rocheBPSPProductsCheckoutUploadPopupPlDropbox.value'),
                validation: 'validateExcelImport',
                validationUser: db.activeUserName,
                validationCompany: Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key'),
                validationReceiver: v('rocheBPSPProductsGridRow1Cell3DropBox.value'),
                validationGlobalVersion: WidgetValue.systemValueGlobalCompanyVersion,
                validationVersion: WidgetValue.systemValueGlobalCompanyProductPlanVersion,
                validationProduct: WidgetValue.systemValueCheckoutProduct,
                validationMessage: 'First row of excel does not match'
                //      preProcessTemplate: v('preprocess.choose.value') === false ? 'Template1' : v('preprocess.choose.value')
            };
        }
    },
    rocheBPSPProductsCheckoutGridTableMonthly: {
        perform: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        pastelast: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        paste: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue) => {
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
            }
        },
        initCondition: (db) => {
            return WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Monthly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Consolidated,RuleDerived,Updateable;$expand=Members($select=Name))`,
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
                           {Union(Union(FixColumns,{DRILLDOWNMEMBER({[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]},{[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]})},All),{Comment},All)}
                           PROPERTIES [Periods].[Periods].[Caption] ON COLUMNS , 
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
                        let cell = {//a 0-s az equal spread, az 1es a split by last actuls a 2 a manual es a 4 mixed (ez lesz abban az esetben ha egy Cs elem alatt tobb fele is van) a mixed ikonja siman egy potty lesz
                            icon: x < 40 ? 'icon-distribution-equal' : 'icon-distribution-manual',
                            cellSkin: '',
                            cellVisible: true,
                            skin: 'products_gd_distribution_icon_bpsp'
                        };
                        if (cell.icon === 'icon-distribution-equal') {
                            cell.iconFontSize = 11;
                        }
                        return cell;
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPProductsCheckoutGridTableMonthlyFunctions.getCell(WidgetValue['systemValueMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            cellSkin: '',
                            icon: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            hasComment: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue !== ''
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

    rocheBPSPProductsCheckoutCommentShowGridTable: {
        initCondition: (db) => {
            return Repository.templateFunctions.initConditionDependingOnCheckoutYearlyMonthly(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsCheckoutGridTableYearly' : 'rocheBPSPProductsCheckoutGridTableMonthly';
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


    rocheBPSPProductsCheckoutCommentShowGridTableSource: {
        initCondition: (db) => {
            return Repository.templateFunctions.initConditionDependingOnCheckoutYearlyMonthly(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsCheckoutGridTableYearly' : 'rocheBPSPProductsCheckoutGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 1).title;
                return `{"MDX":"
                        SELECT 
                            {{[Measures Sales Plan by Product].[Measures Sales Plan by Product].[CommentSource]},
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy]},
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime]}}
                            
                            PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
                        ON COLUMNS , 
                            {[Products].[BPSP Budget].[${productCode}]} 
                            PROPERTIES [Products].[BPSP Budget].[Caption] 
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
    rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPProductsCheckoutCommentShowGridTable.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPProductsCheckoutCommentShowGridTable.cellData')[0][0].title;
                }
                return r;
            }
        }
    },
    rocheBPSPProductsCheckoutCommentEditGridRow3TextInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPProductsCheckoutCommentShowGridTableSource.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPProductsCheckoutCommentShowGridTableSource.cellData')[0][0].title.split('<br/>')[0];
                }
                return r;
            }
        }
    },

    rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton: {
        launch: {
            url: (db) => `/api/v1/Cubes('Sales Plan by Product')/tm1.Update`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsCheckoutGridTableYearly' : 'rocheBPSPProductsCheckoutGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 1).title;
                return `
                [
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                    "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('EditedDateTime')"
                                ]
                            },
                        ],
                         "Value": "${Utils.getFormattedDate(new Date(), '.', true)}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('EditedBy')"
                               ]
                            },
                        ],
                        "Value": "${WidgetValue['activeUserName']}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('CommentSource')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPProductsCheckoutCommentEditGridRow3TextInput.value')}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('Comment')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput.value')}"
                    }
                ]
                `;
            }
        }
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
                            {{[Measures Sales Plan by Product].[Measures Sales Plan by Product].[CommentSource]},
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy]},
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime]}}
                            
                            PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
                        ON COLUMNS , 
                            {[Products].[BPSP Budget].[${productCode}]} 
                            PROPERTIES [Products].[BPSP Budget].[Caption] 
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
    rocheBPSPProductsCommentEditGridRow2CommentInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPProductsCommentShowGridTable.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPProductsCommentShowGridTable.cellData')[0][0].title;
                }
                return r;
            }
        }
    },
    rocheBPSPProductsCommentEditGridRow3TextInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPProductsCommentShowGridTableSource.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPProductsCommentShowGridTableSource.cellData')[0][0].title.split('<br/>')[0];
                }
                return r;
            }
        }
    },

    rocheBPSPProductsCommentEditControlPanelSaveButton: {
        launch: {
            url: (db) => `/api/v1/Cubes('Sales Plan by Product')/tm1.Update`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 1).title;
                return `
                [
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                    "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('EditedDateTime')"
                                ]
                            },
                        ],
                         "Value": "${Utils.getFormattedDate(new Date(), '.', true)}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('EditedBy')"
                               ]
                            },
                        ],
                        "Value": "${WidgetValue['activeUserName']}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('CommentSource')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPProductsCommentEditGridRow3TextInput.value')}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('Comment')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPProductsCommentEditGridRow2CommentInput.value')}"
                    }
                ]
                `;
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

        switch: {
            execute: (db) => {
                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = v('rocheBPSPipPlanningYearSegmentedControl.value');
            }
        }


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
      {TM1SubsetToSet([Materials].[BPSP Budget IP],'1391')}
--     {TM1DRILLDOWNMEMBER({[Materials].[BPSP Budget IP].[IPL1]}, ALL, RECURSIVE )}
--Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
     Set FocusedOnProductRows AS 
      {Intersect({TM1DRILLDOWNMEMBER({[Materials].[BPSP Budget IP].[IPL1]}, ALL, RECURSIVE )},{DefaultProductRows})}
--Decide which rowSet to use
     MEMBER [Materials].[BPSP Budget IP].[ProductIsFocused] AS 
     IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
-- Decide 1st column element
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn] As
     IIF('2020'='2020', '([Periods].[Periods].[2020],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])',
                        '([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan])')
     Set FirstColumn As
     {StrToSet('{'+[LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn]+'}')}
-- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName] as 
            [Materials].[BPSP Budget IP].CurrentMember.Properties('BPSP Budget IP Caption')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode] as 
            [Materials].[BPSP Budget IP].CurrentMember.Properties('Element')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel] as 
            [Materials].[BPSP Budget IP].CurrentMember.Properties('Product Level - Name')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS] as 
            [Materials].[BPSP Budget IP].CurrentMember.Properties('IP DIS Relevant Flag Budget')
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment] as
            [Sales Plan IP].([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],[Measures Sales Plan IP].[Measures Sales Plan IP].[Comment Flag])
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutUser] as 
            [Sales Plan IP].([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI Checkout Flag],[Measures Sales Plan IP].[Measures Sales Plan IP].[EditedBy])
     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutDateTime] as 
            [Sales Plan IP].([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI Checkout Flag],[Measures Sales Plan IP].[Measures Sales Plan IP].[EditedDateTime])
-- Create the first 5 column with information
     Set FixColumns AS
     {([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutFlag]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutUser]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutDateTime])}
     Set FinalColumns AS
     {([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS]),
      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment])}
-- column Tuple Create
     Set ColumnSelection As
        Union({FirstColumn},
        {([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Last Submitted Plan]),
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
          --([Periods].[Periods].[2021 - 2020],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
          ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
          ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Variance Final vs Last Submitted Plan])},All)
SELECT 
     Union(Union({FixColumns},{ColumnSelection},All),{FinalColumns},All)
  ON COLUMNS , 
-- rows
  {StrToSet([Materials].[BPSP Budget IP].[ProductIsFocused])} ON ROWS 
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
                        length: 25,
                        query: [

                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: r.Cells[x + 1].FormattedValue === 'IP Node' ? 'gridtable_hierarchy_bpsp_PL6' : 'gridtable_hierarchy_bpsp_' + r.Cells[x + 1].FormattedValue.replace('a', ''),
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 2].FormattedValue}
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

                            (r, x) => {
                                return {title: r.Cells[x + 22].FormattedValue}
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 23].FormattedValue === '' ? 'icon-x' : 'icon-check',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 24].FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                                }
                            },


                        ]
                    }

                },
        },


    rocheBPSPMaterialGridTable:
        {

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"


With 
-- IP Node then add dummy flag
Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag] As
IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL6',1,0)
-- IP Node and has no pland Data then deletable
Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag] As
IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
    [Material Information by Company].([ Companies].[ Companies].[1391],
    [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) = 0,1,0)
-- IP Node and has pland Data then go to plan
Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag] As
IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
    [Material Information by Company].([ Companies].[ Companies].[1391],
    [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) <> 0,1,0)
SELECT 
   {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP Budget Name],
    [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name],
     [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element],
     [}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag],
     [}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag],
     [}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag]} 
  ON COLUMNS , 
   {TM1SubsetToSet([Materials].[BPSP Budget],'1391 MM')} 
  ON ROWS 
FROM [}ElementAttributes_Materials] 



            "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 6,
                        query: [


                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x + 1].FormattedValue.replace('a', '')
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 2].FormattedValue}
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 3].FormattedValue === '1,00' ? 'icon-plus-circle-outline' : '',
                                    cellSkin: r.Cells[x + 3].FormattedValue === '1,00' ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 4].FormattedValue === '1,00' ? 'icon-trash' : '',

                                    cellSkin: r.Cells[x + 4].FormattedValue === '1,00' ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 5].FormattedValue === '1,00' ? 'icon-arrow-right1' : '',
                                    cellSkin: r.Cells[x + 5].FormattedValue === '1,00' ? '' : 'readonly_bpsp',
                                }
                            },


                        ]
                    }

                },
        },


    RocheBPSPMaterial_IPNode_GridTable:
        {

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"


With 
-- IP Node then add dummy flag
Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag] As
IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='IP Node',1,0)
-- IP Node and has no pland Data then deletable
Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag] As
IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
    [Material Information by Company].([ Companies].[ Companies].[1391],
    [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) = 0,1,0)
-- IP Node and has pland Data then go to plan
Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag] As
IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
    [Material Information by Company].([ Companies].[ Companies].[1391],
    [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) <> 0,1,0)
SELECT 
   {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP Budget IP Name],
   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name],
   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element],
   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag],
   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag],
   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag]} 
  ON COLUMNS , 
   {TM1SubsetToSet([Materials].[BPSP Budget IP], '1391 MM')}  
   PROPERTIES [Materials].[BPSP Budget IP].[Caption]  ON ROWS 
FROM [}ElementAttributes_Materials] 



            "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 6,
                        query: [


                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: r.Cells[x + 1].FormattedValue === 'IP Node' ? 'gridtable_hierarchy_bpsp_PL6' : 'gridtable_hierarchy_bpsp_' + r.Cells[x + 1].FormattedValue.replace('a', '')
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 2].FormattedValue}
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 3].FormattedValue === '1,00' ? 'icon-plus-circle-outline' : '',
                                    cellSkin: r.Cells[x + 3].FormattedValue === '1,00' ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 4].FormattedValue === '1,00' ? 'icon-trash' : '',

                                    cellSkin: r.Cells[x + 4].FormattedValue === '1,00' ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: r.Cells[x + 5].FormattedValue === '1,00' ? 'icon-arrow-right1' : '',
                                    cellSkin: r.Cells[x + 5].FormattedValue === '1,00' ? '' : 'readonly_bpsp',
                                }
                            },


                        ]
                    }

                },
        },


    rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable: {
        initDefault: (db) => {
            return [];
        },
        state:
            (db) => {
                return [
                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_shortcut_bpsp_PL1'},


                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_shortcut_bpsp_PL2'},


                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_shortcut_bpsp_PL3'},


                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_shortcut_bpsp_PL3'},


                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_shortcut_bpsp_PL2'},


                    ],

                    [
                        {label: 'Profit center name', skin: 'gridtable_hierarchy_shortcut_bpsp_PL3'},


                    ],
                ];
            }
    },


    RocheBPSPMaterialsAddMaterialSearch:
        {

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"

                
With 
Member [Measures Material Information by Company].[Measures Material Information by Company].[ID] As
   [Materials].[Materials].CurrentMember.Properties('Element')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Description] As
   [Materials].[Materials].CurrentMember.Properties('Medium Name')   
Member [Measures Material Information by Company].[Measures Material Information by Company].[Status] As
   [Materials].[Materials].CurrentMember.Properties('Material Status - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Instrument Category] As
   [Materials].[Materials].CurrentMember.Properties('Material Category - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Current Profit Center] As
   [Materials].[Materials].CurrentMember.Properties('Profit Center Actual - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Budget Profit Center] As
   [Materials].[Materials].CurrentMember.Properties('Profit Center Budget - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Product Type] As
   [Materials].[Materials].CurrentMember.Properties('Material Type - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Current IP Node] As
   [Materials].[Materials].CurrentMember.Properties('IP Profit Center Actual - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[Budget IP Node] As
   [Materials].[Materials].CurrentMember.Properties('IP Profit Center Budget - Key')
Member [Measures Material Information by Company].[Measures Material Information by Company].[IP Reporting Relevant] As
   [Materials].[Materials].CurrentMember.Properties('IP DIS Relevant Flag')
Set ColumnSelection As
  {
   [Measures Material Information by Company].[Measures Material Information by Company].[Shopping Basket],
   [Measures Material Information by Company].[Measures Material Information by Company].[ID],
   [Measures Material Information by Company].[Measures Material Information by Company].[Description],
   [Measures Material Information by Company].[Measures Material Information by Company].[Status],
   [Measures Material Information by Company].[Measures Material Information by Company].[Instrument Category],
   [Measures Material Information by Company].[Measures Material Information by Company].[Current Profit Center],
   [Measures Material Information by Company].[Measures Material Information by Company].[Budget Profit Center],
   [Measures Material Information by Company].[Measures Material Information by Company].[Product Type],
   [Measures Material Information by Company].[Measures Material Information by Company].[Current IP Node],
   [Measures Material Information by Company].[Measures Material Information by Company].[Budget IP Node],
   [Measures Material Information by Company].[Measures Material Information by Company].[Last Modified],
   [Measures Material Information by Company].[Measures Material Information by Company].[IP Reporting Relevant],
   [Measures Material Information by Company].[Measures Material Information by Company].[Status Message]
  }
SELECT 
   {ColumnSelection} 
   PROPERTIES [Measures Material Information by Company].[Measures Material Information by Company].[Caption]  ON COLUMNS ,
   {Subset({
    FILTER({
 FILTER({
FILTER({
 FILTER({
TM1FILTERBYLEVEL({
FILTER({[Materials].[Materials].Members}, 
        [Materials].[Materials].CurrentMember.Properties('IP Active Flag') = '1')
                 }, 0)
          --Dropbox with Category
          }, [Materials].[Materials].CurrentMember.Properties('Material Category - Key') = 'CC')
 -- Instr search
 }, InStr([Materials].[Materials].CurrentMember.Properties('Profit Center Budget - Key') ,'458360')<>0)
}, InStr([Materials].[Materials].CurrentMember.Properties('IP Profit Center Budget - Key'), '297')<>0)
       }, InStr([Materials].[Materials].CurrentMember.Properties('Element'), '48' ) <> 0 AND
          InStr([Materials].[Materials].CurrentMember.Properties('Medium Name'), '' ) <> 0 )},1,100)}  
   PROPERTIES [Materials].[Materials].[Caption]  ON ROWS 
FROM [Material Information by Company] 
WHERE 
  (
   [Companies].[Companies].[1391]
  )



            "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 13,
                        query: [


                            (r, x) => {
                                return {}
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
                                return {icon: r.Cells[x + 11].FormattedValue === '' ? 'icon-x' : 'icon-check',}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 12].FormattedValue}
                            },

                            (r, x) => {
                                return {}
                            },


                        ]
                    }

                },
        },
    rocheBPSPAddMaterialGridRow3Cell2Button: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `{"MDX":"
                SELECT 
                    {[Measures Material Import by Company].[Measures Material Import by Company].[Materials]} 
                ON COLUMNS , 
                    {TM1FILTERBYLEVEL({[Items].[Items].Members}, 0)} 
                ON ROWS 
                FROM [Material Import by Company] 
                WHERE 
                (
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}]
                )
            "}`,
            parsingControl: {
                type: 'object',
                    query:
                        {
                            cells: (r, x) => {
                                return r.Cells;
                            }
                        }
            }
        },
        launchpaste: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                let values = Utils.getCellsByColumnsFromClipboard('rocheBPSPAddMaterialGridRow3Cell2Button', 0);
                let existingValues = v('rocheBPSPAddMaterialGridRow3Cell2Button.data.cells');
                return `[${Utils.getOrdinalValuePairsAndEmptyFilledValues(values, existingValues)}]`;
            }
        }
    },

    RocheBPSPMaterialsAddMaterialClipboard:
        {

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
                                SELECT 
                                   {[Measures Material Import by Company].[Measures Material Import by Company].[Selected for Basket],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Materials],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Medium Name],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Material Type - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Material Status - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Material Category - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Profit Center Current - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Profit Center Budget - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[IP Profit Center Current - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[IP Profit Center Budget - Key],
                                    [Measures Material Import by Company].[Measures Material Import by Company].[Status Message]} 
                                  ON COLUMNS , 
                                  NON EMPTY  {TM1FILTERBYLEVEL({[Items].[Items].Members}, 0)} 
                                  ON ROWS 
                                FROM [Material Import by Company] 
                                WHERE 
                                  (
                                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}]
                                  )

            "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 11,
                        query: [


                            (r, x) => {
                                return {
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },


                            (r, x) => {
                                return {
                                    title: r.Cells[x + 1].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 2].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 3].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },


                            (r, x) => {
                                return {
                                    title: r.Cells[x + 4].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 5].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 6].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },
                            (r, x) => {
                                return {
                                    title: r.Cells[x + 7].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 8].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 9].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked',
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 10].FormattedValue,
                                    cellSkin: r.Cells[x + 10].FormattedValue === '' ? '' : 'locked'
                                }
                            },


                        ]
                    }

                },
        },


    rocheBPSPAddMaterialGridRow4Cell3Dropbox: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "

                SELECT
                   {[}ElementAttributes_zSYS UI Material Category].[}ElementAttributes_zSYS UI Material Category].[Caption]}
                  ON COLUMNS ,
                   {[zSYS UI Material Category].[zSYS UI Material Category].Members}
                  ON ROWS
                FROM [}ElementAttributes_zSYS UI Material Category]



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


};