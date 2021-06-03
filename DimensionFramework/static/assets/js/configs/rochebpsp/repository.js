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
                                Utils.setWidgetValue('activeUserName', r.Cells[0].Value);
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
                                Utils.setWidgetValue('systemValueGlobalStartingPlanYear', r.Cells[0].FormattedValue);
                                Utils.setWidgetValueIfNotExist('systemValueIpPlanningSegmentedControlRelativeYear', 'Y0');
                                Utils.setWidgetValueIfNotExistByOther('systemValueIpPlanningSegmentedControlRelativeYearValue', 'systemValueGlobalStartingPlanYear');
                                Utils.setWidgetValue('systemValueGlobalCompanyVersion', 'Live');
                                Utils.setWidgetValue('systemValueFocusedProductDefault', 'PL1');
                                Utils.setWidgetValueByOther('systemValueFocusedProduct', 'systemValueFocusedProductDefault');
                                Utils.setWidgetValue('systemValueIpPlanningFocusedProductDefault', 'IPL1');
                                Utils.setWidgetValueByOther('systemValueIpPlanningFocusedProduct', 'systemValueIpPlanningFocusedProductDefault');
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
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 1%;margin-top: 0.5%;";  >' + r.Cells[x + 1].FormattedValue + '</div>' + '<div style=\"font-size:10px;color:#B1B3B3;margin-top: 0.5%;\" >' + r.Cells[x + 2].FormattedValue + '</div>',
                            body: r.Cells[x + 3].FormattedValue
                        }
                    }]
            }
        }
    },


    rocheBPSPMainBlueGridTable: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption,Attributes/Memberdescription))`,
            type: 'POST',
            body: (db) => `{"MDX":"
                SELECT 
                    {[Measures Company Information].[Measures Company Information].[Start page message Title],
                     [Measures Company Information].[Measures Company Information].[Start page message],
                     [Measures Company Information].[Measures Company Information].[Start page message DateTime]
                             } 
                        PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON COLUMNS , 
                         NON EMPTY 
                       {[Companies].[Companies].[All Companies^1391]} 
                      PROPERTIES [Companies].[Companies].[Member description]  ON ROWS 
                    FROM [Company Information] 
                    WHERE 
                      (
                       [Versions].[Versions].[Live]
                      )
            "}`,
            parsingControl: {
                type: 'matrix',
                length: 3,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 1%;margin-top:0.5%;";  >' + r.Cells[x].Members[1].Attributes.Caption + '</div>' + '<div style=\"font-size:10px;color:#408CD9;;margin-top:0.5%;\" >' + r.Cells[x + 2].FormattedValue + '</div>',
                            body: r.Cells[x + 1].FormattedValue
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
                            let result = [], selected = v('rocheBPSPProductsGridRow1Cell2DropBox.value');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    on: selected === r.Cells[i].FormattedValue
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
            return Utils.isValueExistingAndNotEmpty('rocheBPSPProductsGridRow1Cell2DropBox');
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
                        {[}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description],
                        [}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Receiver - Key]} 
                     ON COLUMNS , 
                        {Tm1SubsetToset([Receivers].[Receivers],'zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')} Plan Receivers')}
                     ON ROWS
                    FROM [}ElementAttributes_Receivers] 

            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [], selected = v('rocheBPSPProductsGridRow1Cell3DropBox.value');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    on: selected === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },

    rocheBPSPProductsPageInit: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPProductsGridRow1Cell2DropBox');
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
                            Utils.setWidgetValue('systemValueGlobalCompanyProductPlanVersion', r.Cells[0].FormattedValue);
                            Utils.setWidgetValueIfNotExist('systemValueSegmentedControlPeriodUnit', 'Yearly');
                            Utils.setWidgetValueIfNotExist('systemValueProductsCheckotSplitIcons', {
                                M: 'icon-distribution-manual',
                                P: 'icon-distribution-variable',
                                E: 'icon-distribution-equal'
                            });
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
        init: {
            execute: (db) => {
                let e = db.systemValueSegmentedControlPeriodUnit;
                return e ? [{label: 'Yearly', selected: e === 'Yearly'}, {
                    label: 'Monthly',
                    selected: e === 'Monthly'
                }] : false;
            }
        },
        switch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueSegmentedControlPeriodUnit', v('rocheBPSPProductsPeriodUnitSegmentedControl.selected'));
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderFocusButton: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct === db.systemValueFocusedProductDefault};
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderReturnFromFocus: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct !== db.systemValueFocusedProductDefault};
            }
        },
        launch: {
            execute: (db) => {
                WidgetValue['systemValueFocusedProduct'] = db.systemValueFocusedProductDefault;
            }
        }
    },

    rocheBPSPProductsGridTableMonthlyHeaderFocusButton: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct === db.systemValueFocusedProductDefault};
            }
        }
    },

    rocheBPSPProductsGridTableMonthlyHeaderReturnFromFocus: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueFocusedProduct !== db.systemValueFocusedProductDefault};
            }
        }, launch: {
            execute: (db) => {
                WidgetValue['systemValueFocusedProduct'] = db.systemValueFocusedProductDefault;
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
            return {title: cell.members[5].Name, body: cell.members[6].Attributes.Caption};
        },
        executeForText: (columnIndex) => {
            let cells = v('rocheBPSPProductsGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex - 1];
            return {
                title: cell.members[5].Name === previousCell.members[5].Name ? '' : cell.members[5].Name,
                body: cell.members[6].Attributes.Caption
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
    rocheBPSPProductsGridRow2Cell1Button: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Yearly'};
            }
        }
    },
    rocheBPSPProductsGridTableYearly: {
        initCondition: (db) => {
            let l = v('rocheBPSPProductsGridRow1Cell3DropBox.value.length') !== false
                && v('systemValueSegmentedControlPeriodUnit') === 'Yearly'
                && v('systemValueBackFromCheckin') === false;
            Utils.setWidgetValue('systemValueBackFromCheckin', false);
            return l;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
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
                                        [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
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
            let l = v('rocheBPSPProductsGridRow1Cell3DropBox.value.length') !== false
                && v('systemValueSegmentedControlPeriodUnit') === 'Monthly'
                && v('systemValueBackFromCheckinMonthly') === false;
            Utils.setWidgetValue('systemValueBackFromCheckinMonthly', false);
            return l;
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
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                             MEMBER [Periods].[Periods].[zUI CheckOutUser] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                             MEMBER [Periods].[Periods].[zUI CheckOutDateTime] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                             MEMBER [Periods].[Periods].[zUI Split Flag] as 
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Paln],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Monthly Split Type])

                        -- Create the first 5 column with information
                             Set FixColumns AS
                             {[Periods].[Periods].[ProductName],
                              [Periods].[Periods].[ProductCaption],
                              [Periods].[Periods].[ProductLevel],
                              [Periods].[Periods].[zUI CheckOutFlag],
                              [Periods].[Periods].[zUI CheckOutUser],
                              [Periods].[Periods].[zUI CheckOutDateTime],
                              [Periods].[Periods].[zUI Split Flag]}
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
                length: 21,
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
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 5;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        let icon = v('systemValueProductsCheckotSplitIcons')[r.Cells[x + 6].FormattedValue];

                        let cell = {
                            icon: !icon ? 'icon-distribution-equal' : icon,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            iconColor: '#B1B3B3',
                            skin: 'products_gd_distribution_icon_bpsp'
                        };

                        if (cell.icon === 'icon-distribution-equal') {
                            cell.iconFontSize = 11;
                        }
                        return cell;
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
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
        init: {
            execute: (db) => {
                let e = db.systemValueSegmentedControlPeriodUnit;
                return e ? [{label: 'Yearly', selected: e === 'Yearly'}, {
                    label: 'Monthly',
                    selected: e === 'Monthly'
                }] : false;
            }
        },
        switch: {
            execute: (db) => {

                Utils.setWidgetValue('systemValueSegmentedControlPeriodUnit', v('rocheBPSPProductsCheckoutPeriodUnitSegmentedControl.selected'));
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
            return Utils.isValueExistingAndNotEmpty('rocheBPSPProductsCheckoutGridTableYearly', 'cellData');
        },
        executeForTextFirstCol: (columnIndex) => {
            let cell = v('rocheBPSPProductsCheckoutGridTableYearly.cellData')[0][columnIndex];
            return {title: cell.members[5].Name, body: cell.members[6].Attributes.Caption};
        },
        executeForText: (columnIndex) => {
            let cells = v('rocheBPSPProductsCheckoutGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex - 1];
            return {
                title: cell.members[5].Name === previousCell.members[5].Name ? '' : cell.members[5].Name,
                body: cell.members[6].Attributes.Caption
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
            return Utils.isValueExistingAndNotEmpty('rocheBPSPProductsCheckoutGridTableYearly', 'cellData');
        },
        initDefault: (db) => {
            return [];
        },
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                let value = widgetValue.value;
                if (col == 4) {
                    value = Utils.getDecimalFromPercentString(value);
                }
                return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${value}\"}`
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
                let productCode = v('systemValueDistributionEditProductCode');
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
                        let c = r.Cells[WidgetValue['rocheBPSPProductsCheckoutDistributionEditPopupGridTableRelativeIndex']],
                            editable = c.Consolidated === false && c.RuleDerived === false;
                        return {
                            value: parseInt(c.FormattedValue) === 0 ? 0 : 1,
                            ordinal: c.Ordinal,
                            cellSkin: editable ? '' : 'readonly_bpsp',
                            editable: editable,
                            skin: 'lock_unlock_bpsp'
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
                body: (db) => {
                    Utils.setWidgetValue('systemValueBackFromCheckin', true);
                    Utils.setWidgetValue('systemValueBackFromCheckinMonthly', true);
                    return `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                {"Name": "pProduct", "Value": "${WidgetValue['systemValueCheckoutProduct']}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
                }
            },
    },
    rocheBPSPProductsCheckoutGridRow2Cell1Button: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Yearly'};
            }
        }
    },
    rocheBPSPProductsCheckoutGridRow2Cell1bButton: {
        init: {
            execute: (db) => {
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Monthly'};
            }
        }
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
                && r.Cells[index].Members[5].Name != WidgetValue.systemValueGlobalSegmentedControlRelativeYearValue) {

                skin = 'products_gd_readonly_with_icon_bpsp';
                cellSkin = 'readonly_bpsp';
                icon = 'icon-copy';
                copyMerge = true;
            }
            if ((uiValue === 2 || uiValue === 3)
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
                distributionEdit: !distributionEdit ? false : () => {
                    let widgetId = 'rocheBPSPProductsCheckoutGridTableYearly', w = v(widgetId);
                    if (v('perform.on', w) === true) {
                        return false;
                    }
                    return true;
                },
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
    rocheBPSPProductsCheckoutDistributionEditPopupControlPanelSaveButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Products Yearly Save Split')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return `{
                        "Parameters": [
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pProduct", "Value": "${v('rocheBPSPProductsCheckoutDistributionEditPopupGridTable.cellData')[0][0].label.split(' ')[0]}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
                }
            },
    },
    rocheBPSPProductsCheckoutDistributionEditPopupControlPanelCancelButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Clear All Inputs')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return `{
                        "Parameters": [
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pProduct", "Value": "${v('rocheBPSPProductsCheckoutDistributionEditPopupGridTable.cellData')[0][0].label.split(' ')[0]}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"},
                                {"Name": "pCube", "Value": "Sales Plan by Product Flat"}
                        ]
                    }`
                }
            },
    },
    'rocheBPSPProductsCheckoutDistributionEditPopupGridTableCellButton-07': {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Products Yearly Recalculate Split')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return `{
                        "Parameters": [
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pProduct", "Value": "${v('rocheBPSPProductsCheckoutDistributionEditPopupGridTable.cellData')[0][0].label.split(' ')[0]}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
                }
            },
    },
    rocheBPSPProductsCheckoutGridRow2Cell2Button: {
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Clear All Inputs')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                return `{
                        "Parameters": [
                                {"Name": "pVersion", "Value": "${db.systemValueGlobalCompanyVersion}"},
                                {"Name": "pProduct", "Value": "${db.systemValueCheckoutProduct}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pLineItem", "Value": "Final Sales Plan"},
                                {"Name": "pCube", "Value": "Sales Plan by Product"},
                                {"Name": "pPeriod", "Value": "${db.systemValueGlobalSegmentedControlRelativeYearValue}"}
                        ]
                    }`;
            }
        }
    },
    rocheBPSPProductsCheckoutGridTableYearly: {
        perform: {
            validation: (db, cell, widgetValue) => {
                return {success: cell.copyMerge === false};
            },
            url: (db, cell, widgetValue) => {
                if (Utils.getPropertyOrFunctionValue(cell, 'distributionEdit')) {
                    return `/api/v1/Processes('MODULE - UI - Products Yearly Prepare Split')/tm1.ExecuteWithReturn`;
                } else {
                    return `/api/v1/Processes('MODULE - UI - Sales Plan by Product Split ')/tm1.ExecuteWithReturn`;
                }
            },
            type: (db, cell, widgetValue) => {
                return 'POST';
            },
            body: (db, cell, widgetValue) => {
                if (Utils.getPropertyOrFunctionValue(cell, 'distributionEdit')) {
                    return `{
                        "Parameters": [
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
                } else {
                    return `{
                        "Parameters": [
                                {"Name": "pValue", "Value": "${Utils.parseNumber(v('rocheBPSPProductsCheckoutGridTableYearly.value'))}"},
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pSplitMode", "Value": "Default"}
                        ]
                    }`
                }
            }
        },
        initCondition: (db) => {
            return v('systemValueSegmentedControlPeriodUnit') === 'Yearly';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name,Attributes/Caption))`,
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
                                [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
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
        init: {
            execute: (db) => {
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Monthly'};
            }
        },
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear), s = [], fileName;
                s.push(Utils.getFormattedDate(new Date(), '_', true));
                s.push(db.activeUserName);
                s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key'));
                s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key'));
                s.push(db.systemValueCheckoutProduct);
                fileName = s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
                return {
                    url: 'export?export_key=rocheMonthly&file_name=' + fileName + '.xlsx',
                    fileName: fileName + '.xlsx',
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
                        F
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
        },
        request: {
            url: (db) => `/api/v1/Processes('MODULE - UI - CSV Upload Post Processing')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                let fileName = v('rocheBPSPProductsCheckoutUploadPopupUpload.fileNames')[0].replace('.xlsx', '.csv');
                L(fileName);
                return `{
                        "Parameters": [
                                {"Name": "pUser", "Value": "${db.activeUserName}"},
                                {"Name": "pProduct", "Value": "${db.systemValueCheckoutProduct}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pTargetCube", "Value": "Sales Plan by Product"},
                                {"Name": "pSelectedProductLevel", "Value": "${v('rocheBPSPProductsCheckoutUploadPopupPlDropbox.value')}"},
                                {"Name": "pFileName", "Value": "${fileName}"}
                        ]
                    }`;
            }
        }
    },
    rocheBPSPProductsCheckoutCopyMergePopupCopyButton: {
        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Products Yearly Copy')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title}"},
                                {"Name": "pYearFrom", "Value": "${Utils.getGridTableCurrentCell('rocheBPSPProductsCheckoutGridTableYearly').members[5].Name}"},
                                {"Name": "pYearTo", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pMode", "Value": "1"},
                                {"Name": "pPercentage", "Value": "${v('rocheBPSPProductsCheckoutCopyMergePopupSlider.value') / 100}"},
                                {"Name": "pLineItem", "Value": "${Utils.getGridTableCurrentCell('rocheBPSPProductsCheckoutGridTableYearly').members[6].Name}"}
                        ]
                    }`

        }
    },
    rocheBPSPProductsCheckoutCopyMergePopupMergeButton: {
        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Products Yearly Copy')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title}"},
                                {"Name": "pYearFrom", "Value": "${Utils.getGridTableCurrentCell('rocheBPSPProductsCheckoutGridTableYearly').members[5].Name}"},
                                {"Name": "pYearTo", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pMode", "Value": "2"},
                                {"Name": "pPercentage", "Value": "${v('rocheBPSPProductsCheckoutCopyMergePopupSlider.value') / 100}"},
                                {"Name": "pLineItem", "Value": "${Utils.getGridTableCurrentCell('rocheBPSPProductsCheckoutGridTableYearly').members[6].Name}"}
                        ]
                    }`

        }
    },
    rocheBPSPProductsCheckoutDistributionPopupLastYearButton: {
        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Sales Plan by Product Split')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pValue", "Value": "${Utils.parseNumber(Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableMonthly', 3).title)}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableMonthly', 1).title}"},
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}"},
                                {"Name": "pSplitMethod", "Value": "Previous Year"}
                        ]
                    }`

        }
    },
    rocheBPSPProductsCheckoutDistributionPopupLinearSplitButton: {
        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Sales Plan by Product Split')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pValue", "Value": "${Utils.parseNumber(Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableMonthly', 3).title)}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableMonthly', 1).title}"},
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}"},
                                {"Name": "pSplitMethod", "Value": "Equal"}
                        ]
                    }`

        }
    },
    rocheBPSPProductsCheckoutGridTableMonthly: {
        perform: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Sales Plan by Product Split')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db, cell, widgetValue) => {
                return `{
                        "Parameters": [
                                {"Name": "pValue", "Value": "${Utils.parseNumber(v('rocheBPSPProductsCheckoutGridTableMonthly.value'))}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableMonthly', 1).title}"},
                                {"Name": "pPeriod", "Value": "${Utils.getGridTableCurrentCell('rocheBPSPProductsCheckoutGridTableMonthly').members[6].Name}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPProductsGridRow1Cell3DropBox.value')}"},
                                {"Name": "pSplitMode", "Value": "Default"}
                        ]
                    }`
            }
        },
        pastelast: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                let iconOrdinal = v('rocheBPSPProductsCheckoutGridTableMonthly.cellData')[row][4].ordinal;
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"},
                    {"Ordinal": ${iconOrdinal},"Value": \"M\"}
                ]`;
            }
        },
        paste: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                let iconOrdinal = v('rocheBPSPProductsCheckoutGridTableMonthly.cellData')[row][4].ordinal;
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"},
                    {"Ordinal": ${iconOrdinal},"Value": \"M\"}
                ]`;
            }
        },
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                let iconOrdinal = v('rocheBPSPProductsCheckoutGridTableMonthly.cellData')[row][4].ordinal;
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"},
                    {"Ordinal": ${iconOrdinal},"Value": \"M\"}
                ]`;
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
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                             MEMBER [Periods].[Periods].[zUI CheckOutUser] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                             MEMBER [Periods].[Periods].[zUI CheckOutDateTime] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                             MEMBER [Periods].[Periods].[zUI Split Flag] as 
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Paln],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Monthly Split Type])
                        -- Create the first 5 column with information
                             Set FixColumns AS
                             {[Periods].[Periods].[ProductName],
                              [Periods].[Periods].[ProductCaption],
                              [Periods].[Periods].[ProductLevel],
                              [Periods].[Periods].[zUI CheckOutFlag],
                              [Periods].[Periods].[zUI CheckOutUser],
                              [Periods].[Periods].[zUI CheckOutDateTime],
                              [Periods].[Periods].[zUI Split Flag]}
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
                length: 21,
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
                            hasComment: r.Cells[x + 20].FormattedValue === ''
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
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 5;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },
                    (r, x) => {
                        let icon = v('systemValueProductsCheckotSplitIcons')[r.Cells[x + 6].FormattedValue];

                        let cell = {
                            icon: !icon ? 'icon-distribution-equal' : icon,
                            cellSkin: '',
                            cellVisible: true,
                            ordinal: r.Cells[x+6].Ordinal,
                            skin: 'products_gd_distribution_icon_bpsp'
                        };
                        if (!icon) {
                            cell['iconColor'] = 'white';
                        }
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
                        "Value": "${v('rocheBPSPProductsCheckoutCommentEditGridRow3TextInput.value') ? v('rocheBPSPProductsCheckoutCommentEditGridRow3TextInput.value') : ''}"
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
                        "Value": "${v('rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput.value') ? v('rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput.value') : ''}"
                    }
                ]
                `;
            }
        }
    },

    //end product checkout

    rocheBPSPMainGridRow1Cell5Button: {
        initCondition: (db) => {
            return v('activeUserName');
        },
        initDefault: (db) => {
          return {};
        },
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPCustomersGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },


    rocheBPSPSettingsGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
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
                        "Value": "${v('rocheBPSPProductsCommentEditGridRow3TextInput.value') ? v('rocheBPSPProductsCommentEditGridRow3TextInput.value') : ''}"
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
                        "Value": "${v('rocheBPSPProductsCommentEditGridRow2CommentInput.value') ? v('rocheBPSPProductsCommentEditGridRow2CommentInput.value') : ''}"
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

    rocheBPSPMaterialPageInit: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox');
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
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}]
                )
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            Utils.setWidgetValue('systemValueGlobalCompanyProductPlanVersion', r.Cells[0].FormattedValue);
                            return true;
                        }
                    }
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
                    sr = Utils.setWidgetValueIfNotExist('systemValueIpPlanningSegmentedControlRelativeYear', 'Y0');
                Utils.setWidgetValueIfNotExist('systemValueIpPlanningSegmentedControlRelativeYearValue', s);
                return [
                    {label: s, selected: 'Y0' === sr},
                    {label: ++s, selected: 'Y1' === sr}
                ];
            }
        },
        switch: {
            execute: (db) => {
                WidgetValue['systemValueIpPlanningSegmentedControlRelativeYear'] = v('rocheBPSPipPlanningYearSegmentedControl.value');
                WidgetValue['systemValueIpPlanningSegmentedControlRelativeYearValue'] = v('rocheBPSPipPlanningYearSegmentedControl.selected');
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
                                    on: v('rocheBPSPipPlanningGridRow1Cell2DropBox.value') === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },

    rocheBPSPipPlanningPageInit: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPipPlanningGridRow1Cell2DropBox');
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
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]
                )
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            Utils.setWidgetValue('systemValueGlobalCompanyProductPlanVersion', r.Cells[0].FormattedValue);
                            return true;
                        }
                    }
            }
        }
    },

    rocheBPSPIpPlanningCheckoutWarningByUserText: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                let g = 'rocheBPSPipPlanningGridTableMonthly',
                    c = Utils.getGridTableCell(g, 0), u = c.checkoutUser, d = c.checkedOutAt;
                return {title: `by<b>${u}</b>since<b>${d}</b>`};
            }
        }
    },

    rocheBPSPIpPlanningCheckoutPopupFocusButton: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueIpPlanningFocusedProduct'] = Utils.getGridTableCell('rocheBPSPipPlanningGridTableMonthly', 2).title;
                }
            },
    },

    rocheBPSPIpPlanningNoCheckoutPopupFocusButton: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueIpPlanningFocusedProduct'] = Utils.getGridTableCell('rocheBPSPipPlanningGridTableMonthly', 2).title;
                }
            }
    },

    rocheBPSPIpPlanningCheckoutPopupCheckoutButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Materials GridTable Checkout by User')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                {"Name": "pMaterial", "Value": "${Utils.setAndGetGridTableSystemValueByCurrentRow('rocheBPSPipPlanningGridTableMonthly', 2, 'systemValueIpPlanningCheckoutProduct', 'title')}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                        ]
                    }`
            }
    },


    rocheBPSPIpPlanningCheckoutGridRow2Cell3Button: {
          launch:
              {
                  url: (db) => `/api/v1/Processes('MODULE - UI - Materials GridTable CheckIn by User')/tm1.ExecuteWithReturn`,
                  type: 'POST',
                  body: (db) => {
                      Utils.setWidgetValue('systemValueBackFromCheckin', true);
                      return `{
                          "Parameters": [
                                  {"Name": "pUserID", "Value": "${db.activeUserName}"},
                                  {"Name": "pMaterial", "Value": "${WidgetValue['systemValueIpPlanningCheckoutProduct']}"},
                                  {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}"},
                                  {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell3DropBox', 'key')}"},
                                  {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"}
                          ]
                      }`
                }
            },
    },


    rocheBPSPipPlanningGridRow2Cell1SegmentedControl: {
        init: {
            execute: (db) => {
                return [
                    {
                        label: 'Cash Sales',
                        selected: v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected') === 'Cash Sales' || v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected') === false
                    },
                    {
                        label: 'Lease',
                        selected: v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected') === 'Lease'
                    },
                    {
                        label: 'Return',
                        selected: v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected') === 'Return'
                    },
                ];
            }

        }
    },


    rocheBPSPipPlanningGridRow2Cell2SegmentedControl: {
        init: {
            execute: (db) => {
                return [
                    {
                        label: 'New',
                        selected: v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected') === 'New' || v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected') === false
                    },
                    {
                        label: 'Used',
                        selected: v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected') === 'Used'
                    },
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
                      {[}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description],
                        [}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Receiver - Key]} 
                     ON COLUMNS , 
                        {Tm1SubsetToset([Receivers].[Receivers],'zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')} Plan Receivers')}
                     ON ROWS
                    FROM [}ElementAttributes_Receivers] 

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
                                    on: v('rocheBPSPipPlanningGridRow1Cell3DropBox.value') === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },

    rocheBPSPipPlanningGridTableMonthlyHeaderFocusButton:
        {
            init: {
                execute: (db) => {
                    return {visible: db.systemValueIpPlanningFocusedProduct === db.systemValueIpPlanningFocusedProductDefault};
                }
            }
        },
    rocheBPSPipPlanningGridTableMonthlyHeaderReturnFromFocus:
        {
            init: {
                execute: (db) => {
                    return {visible: db.systemValueIpPlanningFocusedProduct !== db.systemValueIpPlanningFocusedProductDefault};
                }
            },
            launch: {
                execute: (db) => {
                    WidgetValue['systemValueIpPlanningFocusedProduct'] = db.systemValueIpPlanningFocusedProductDefault;
                }
            }
        },

    'rocheBPSPipPlanningGridTableMonthlyHeaderText-04': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return { title: Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 3, 'year')};
            }
        }
    },
    'rocheBPSPipPlanningGridTableMonthlyHeaderText-05': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return { title: Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 4, 'year')};
            }
        }
    },
    'rocheBPSPipPlanningGridTableMonthlyHeaderText-19': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return { body: 'YEND vs Act ' + Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 18, 'year')};
            }
        }
    },
    'rocheBPSPipPlanningGridTableMonthlyHeaderText-20': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return { body: 'YEND vs T3 ' + Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 19, 'year')};
            }
        }
    },

    rocheBPSPipPlanningGridTableMonthly:
        {
            initCondition: (db) => {
                let b = Utils.isValueExistingAndNotEmpty('rocheBPSPipPlanningGridRow1Cell3DropBox') &&
                    Utils.isValueExistingAndNotEmpty('rocheBPSPipPlanningGridRow2Cell1SegmentedControl', 'selected') &&
                    Utils.isValueExistingAndNotEmpty('rocheBPSPipPlanningGridRow2Cell2SegmentedControl', 'selected') &&
                    v('systemValueGlobalCompanyProductPlanVersion') !== false && v('systemValueBackFromCheckin') === false;
                Utils.setWidgetValue('systemValueBackFromCheckin', false);
                return b;
            },
            initDefault: (db) => {
                return [];
            },
            getCell: (r, x, inc) => {
                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] + inc;
                let i = WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'];
                return {
                    title: r.Cells[i].FormattedValue,
                    cellSkin: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                    year: r.Cells[i].Members[7].Name
                };
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
                                With
                                --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion
                                     Set DefaultProductRows AS
                                      {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP],'1391')}
                                --     {TM1DRILLDOWNMEMBER({[Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[IPL1]}, ALL, RECURSIVE )}
                                --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                                     Set FocusedOnProductRows AS 
                                      {Intersect({TM1DRILLDOWNMEMBER({[Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${db.systemValueIpPlanningFocusedProduct}]}, ALL, RECURSIVE )},{DefaultProductRows})}
                                --Decide which rowSet to use
                                     MEMBER [Materials].[BPSP Budget IP].[ProductIsFocused] AS 
                                     IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                                -- Decide 1st column element
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn] As
                                     IIF('${db.systemValueIpPlanningSegmentedControlRelativeYearValue - 1}'='${db.systemValueGlobalStartingPlanYear - 1}', '([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue - 1}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])',
                                                        '([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan])')
                                     Set FirstColumn As
                                     {StrToSet('{'+[LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn]+'}')}
                                -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Caption')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Element')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Product Level - Name')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('IP DIS Relevant Flag Budget')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment] as
                                            [Sales Plan IP].([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],[Measures Sales Plan IP].[Measures Sales Plan IP].[Comment Flag])
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
                                        {([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Last Submitted Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}01],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}02],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}03],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}04],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}05],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}06],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}07],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}08],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}09],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}10],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}11],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}12],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                          --([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue} - ${db.systemValueIpPlanningSegmentedControlRelativeYearValue - 1}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                          ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                          ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Variance Final vs Last Submitted Plan])},All)
                                SELECT 
                                     Union(Union({FixColumns},{ColumnSelection},All),{FinalColumns},All)
                                  ON COLUMNS , 
                                -- rows
                                  {StrToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[ProductIsFocused])} ON ROWS 
                                FROM [Sales Plan IP] 
                                WHERE 
                                  (
                                   [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                                   [Measures Sales Plan IP].[Measures Sales Plan IP].[Value],
                                   [Receivers].[Receivers].[${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}],
                                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}],
                                   [Contract Types].[Contract Types].[${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}],
                                   [Instrument Types].[Instrument Types].[${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}]
                                  )
                    "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 25,
                        query: [
                            (r, x) => {
                                let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue, skin;
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = x;
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked'];
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;

                                pl = r.Cells[x + 1].FormattedValue.replace('a', '');
                                skin =  pl === 'IP Node'  ? 'gridtable_hierarchy_bpsp_PL6' : 'gridtable_hierarchy_bpsp_' + pl;
                                if(WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked']){
                                    skin += '_locked';
                                }
                                result = {
                                    label: r.Cells[x].FormattedValue,
                                    isMainLocked: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked'],
                                    isLockedByMe: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] && WidgetValue.activeUserName.indexOf(checkoutUser) !== -1,
                                    isLocked: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'],
                                    isChildrenLocked: WidgetValue['systemValueRocheBPSPipPlanningGridTableYearIsChildrenLocked'],
                                    checkoutUser: checkoutUser,
                                    checkedOutAt: r.Cells[x + 5].FormattedValue,
                                    productLevel: pl,
                                    skin: skin,
                                    cellSkin: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] ? 'locked' : '',
                                    icon: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked'] ? 'icon-lock' : 'icon-badge',
                                };
                                if (WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked']) {
                                    result['iconColor'] = '#D12D4A';
                                }
                                return result;
                            },

                            (r, x) => {
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] + 1;
                                let c = r.Cells[WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex']];
                                return {
                                    title: c.FormattedValue.replace('PL', ''),
                                    cellSkin: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] ? 'locked' : '',
                                }
                            },

                            (r, x) => {
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] + 1;
                                let c = r.Cells[WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex']];
                                return {
                                    title: c.FormattedValue,
                                    cellSkin: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] ? 'locked' : '',
                                }
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 4);
                            },
                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 1);
                            },

                            (r, x) => {
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] + 1;
                                let c = r.Cells[WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex']];
                                return {
                                    icon: c.FormattedValue === '' ? 'icon-x' : 'icon-check',
                                    cellSkin: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] + 1;
                                let c = r.Cells[WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex']];
                                return {
                                    icon: c.FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                                    iconColor: c.FormattedValue === '' ? '#C5C6C6' : '#0066cc',
                                    cellSkin: WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] ? 'locked' : '',
                                }
                            },


                        ]
                    }

                },
        },

    rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly')
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                return v('rocheBPSPipPlanningGridTableMonthly.cellData').filter(e => ['PL1', 'PL2', 'PL3'].includes(e[0].productLevel)).map(e => {
                    return [{
                        label: e[0].label,
                        skin: 'gridtable_hierarchy_shortcut_bpsp_' + e[0].productLevel,
                        productCode: e[2].title
                    }];
                });
            }
        }
    },

    rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTableButton01: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueIpPlanningFocusedProduct'] = Utils.getGridTableCell('rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable', 0).productCode;
                }
            },
    },

    rocheBPSPIpPlanningCheckoutInfoPopupText2: {
        initCondition: (db) => {
            return v('rocheBPSPipPlanningGridRow1Cell2DropBox.value.length') !== false;
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
                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]
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

    rocheBPSPIpPlanningCheckoutInfoPopupText1: {
        initCondition: (db) => {
            return v('rocheBPSPipPlanningGridRow1Cell2DropBox.value.length') !== false;
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
                        {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]} 
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

    rocheBPSPIpPlanningCheckoutGridRow1Cell9Button: {
        reference: 'rocheBPSPProductsGridRow1Cell9Button'
    },
    rocheBPSPIpPlanningCheckoutGridRow1Cell2CompanyText: {
        init: {
            execute: (db) => {
                return {title: v('rocheBPSPipPlanningGridRow1Cell2DropBox.value')};
            }
        }
    },

    rocheBPSPIpPlanningCheckoutGridRow1Cell3ReceiverText: {
        init: {
            execute: (db) => {
                return {title: v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')};
            }
        }
    },
    'rocheBPSPIpPlanningCheckoutGridTableMonthlyHeaderText-04': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPIpPlanningCheckoutGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return {title: Utils.getGridTableCellByRowAndColumn('rocheBPSPIpPlanningCheckoutGridTableMonthly', 0, 3, 'year')};
            }
        }
    },
    'rocheBPSPIpPlanningCheckoutGridTableMonthlyHeaderText-05': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPIpPlanningCheckoutGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return {title: Utils.getGridTableCellByRowAndColumn('rocheBPSPIpPlanningCheckoutGridTableMonthly', 0, 4, 'year')};
            }
        }
    },
    'rocheBPSPIpPlanningCheckoutGridTableMonthlyHeaderText-19': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPIpPlanningCheckoutGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return {body: 'YEND vs Act ' + Utils.getGridTableCellByRowAndColumn('rocheBPSPIpPlanningCheckoutGridTableMonthly', 0, 18, 'year')};
            }
        }
    },
    'rocheBPSPIpPlanningCheckoutGridTableMonthlyHeaderText-20': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPIpPlanningCheckoutGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return {body: 'YEND vs T3 ' + Utils.getGridTableCellByRowAndColumn('rocheBPSPIpPlanningCheckoutGridTableMonthly', 0, 19, 'year')};
            }
        }
    },
    rocheBPSPIpPlanningCheckoutGridTableMonthly: {
       /* perform: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Sales Plan by Product Split')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db, cell, widgetValue) => {
                return `{
                        "Parameters": [
                                {"Name": "pValue", "Value": "${Utils.parseNumber(v('rocheBPSPIpPlanningCheckoutGridTableMonthly.value'))}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPIpPlanningCheckoutGridTableMonthly', 1).title}"},
                                {"Name": "pPeriod", "Value": "${Utils.getGridTableCurrentCell('rocheBPSPIpPlanningCheckoutGridTableMonthly').members[6].Name}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}"},
                                {"Name": "pSplitMode", "Value": "Default"},
                                {"Name": "pLineitem", "Value": "Marketing Adjustment"}
                        ]
                    }`
            }
        },*/
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
        getCell: (r, x, inc) => {
            WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + inc;
            let c = r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']],
                editable = c.Consolidated === false && c.RuleDerived === false;
                /*,performable = c.Consolidated === true && c.RuleDerived === false;*/

            let result = {
                title: c.FormattedValue,
                cellSkin: editable ? '' : 'readonly_bpsp',
                skin: editable ? 'monthly_center_bpsp' : 'monthly_right_bpsp',
                cellVisible: true,
                editable: editable,
                ordinal: c.Ordinal,
                year: c.Members[7].Name,
                members: c.Members,
                //performable: performable
            };
       /*     if (performable) {
                result['icon'] = 'icon-cloud-arrow-up';
            }*/
            return result;
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Consolidated,RuleDerived,Updateable;$expand=Members($select=Name))`,
            type: 'POST',
            body: (db) => `{"MDX":"
                                With
                                --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion
                                     Set DefaultProductRows AS
                                      {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP],'1391')}
                                --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                                     Set FocusedOnProductRows AS 
                                      {Intersect({TM1DRILLDOWNMEMBER({[Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${db.systemValueIpPlanningCheckoutProduct}]}, ALL, RECURSIVE )},{DefaultProductRows})}
                                --Decide which rowSet to use
                                     MEMBER [Materials].[BPSP Budget IP].[ProductIsFocused] AS 
                                     IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                                -- Decide 1st column element
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn] As
                                     IIF('${db.systemValueIpPlanningSegmentedControlRelativeYearValue - 1}'='${db.systemValueGlobalStartingPlanYear - 1}', '([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue - 1}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])',
                                                        '([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan])')
                                     Set FirstColumn As
                                     {StrToSet('{'+[LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn]+'}')}
                                -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Caption')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Element')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Product Level - Name')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('IP DIS Relevant Flag Budget')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment] as
                                            [Sales Plan IP].([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],[Measures Sales Plan IP].[Measures Sales Plan IP].[Comment Flag])
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
                                        {([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Last Submitted Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}01],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}02],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}03],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}04],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}05],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}06],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}07],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}08],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}09],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}10],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}11],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}12],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                         ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                          --([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue} - ${db.systemValueIpPlanningSegmentedControlRelativeYearValue - 1}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                          ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan]),
                                          ([Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Variance Final vs Last Submitted Plan])},All)
                                SELECT 
                                     Union(Union({FixColumns},{ColumnSelection},All),{FinalColumns},All)
                                  ON COLUMNS , 
                                -- rows
                                  {StrToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[ProductIsFocused])} ON ROWS 
                                FROM [Sales Plan IP] 
                                WHERE 
                                  (
                                   [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                                   [Measures Sales Plan IP].[Measures Sales Plan IP].[Value],
                                   [Receivers].[Receivers].[${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}],
                                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}],
                                   [Contract Types].[Contract Types].[${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}],
                                   [Instrument Types].[Instrument Types].[${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}]
                                  )
                    "}`,
            parsingControl: {
                type: 'matrix',
                length: 25,
                query: [
                    (r, x) => {
                        let result, pl;
                        WidgetValue['systemValueMonthlyRelativeIndex'] = x;

                        pl = r.Cells[x + 1].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: pl === 'IP Node' ? 'gridtable_checkout_hierarchy_bpsp_PL6' : 'gridtable_checkout_hierarchy_bpsp_' + pl,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            productLevel: pl
                        };
                        return result;
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
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: '',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members
                        };
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 4);
                    },
                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 1);
                    },

                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        let c = r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']];
                        return {
                            icon: c.FormattedValue === '' ? 'icon-x' : 'icon-check',
                        }
                    },

                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        let c = r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']];
                        return {
                            icon: c.FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: c.FormattedValue === '' ? '#C5C6C6' : '#0066cc',
                        }
                    }
                ]
            }
        }
    },
    rocheBPSPIpPlanningCheckoutPageInit: {
        initCondition: (db) => {
            return v('systemValueIpPlanningUploadTargetPath') === false;
        },
        initDefault: (db) => {
            return true;
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
                {
                    "MDX" : "
                        SELECT
                            {[Value Type].[Value Type].[String]}
                         ON COLUMNS ,
                            {[Measures Control].[Measures Control].[UI Excel upload path IP]}
                        ON ROWS
                        FROM [Control]
                    "
                }
            `,
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            Utils.setWidgetValue('systemValueIpPlanningUploadTargetPath', r.Cells[0].FormattedValue)
                            return true;
                        }
                    }
            }
        }
    },
    rocheBPSPIpPlanningCheckoutGridRow2Cell2Button: {
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Clear All Inputs')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                return `{
                        "Parameters": [
                                {"Name": "pVersion", "Value": "${db.systemValueGlobalCompanyVersion}"},
                                {"Name": "pProduct", "Value": "${db.systemValueIpPlanningCheckoutProduct}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pLineItem", "Value": "Final Quantity Plan"},
                                {"Name": "pCube", "Value": "Sales Plan IP"},
                                {"Name": "pPeriod", "Value": "${db.systemValueIpPlanningSegmentedControlRelativeYearValue}"}
                        ]
                    }`;
            }
        }
    },
    rocheBPSPIpPlanningCheckoutUploadPopupPlDropbox: {
        initCondition: (db) => {
            let l = v('rocheBPSPIpPlanningCheckoutGridTableMonthly.cellData.length');
            return l !== false && l !== 0;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                return v('rocheBPSPIpPlanningCheckoutGridTableMonthly.cellData').map(function (e) {
                    return {name: e[1].title === 'IP Node' ? e[1].title : 'PL' + e[1].title, key: e[1].title, on: false}
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
    rocheBPSPIpPlanningCheckoutUploadPopupUpload: {
        upload: (db) => {
            return {
                staging: app.defaultUploadStagingFolder,
                target: v('systemValueIpPlanningUploadTargetPath'),
                productLevel: v('rocheBPSPIpPlanningCheckoutUploadPopupPlDropbox.value'),
                validation: 'validateExcelImport',
                validationUser: db.activeUserName,
                validationCompany: Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key'),
                validationReceiver: v('rocheBPSPipPlanningGridRow1Cell3DropBox.value'),
                validationGlobalVersion: db.systemValueGlobalCompanyVersion,
                validationVersion: db.systemValueGlobalCompanyProductPlanVersion,
                validationProduct: db.systemValueIpPlanningCheckoutProduct,
                validationMessage: 'First row of excel does not match'
            };
        },
        request: {
            url: (db) => `/api/v1/Processes('MODULE - UI - CSV Upload Post Processing IP')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                let fileName = v('rocheBPSPIpPlanningCheckoutUploadPopupUpload.fileNames')[0].replace('.xlsx', '.csv');
                return `{
                        "Parameters": [
                                {"Name": "pUser", "Value": "${db.activeUserName}"},
                                {"Name": "pProduct", "Value": "${db.systemValueIpPlanningCheckoutProduct}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pTargetCube", "Value": "Sales Plan IP"},
                                {"Name": "pSelectedMaterialLevel", "Value": "${v('rocheBPSPIpPlanningCheckoutUploadPopupPlDropbox.value')}"},
                                {"Name": "pFileName", "Value": "${fileName}"}
                        ]
                    }`;
            }
        }
    },
    rocheBPSPIpPlanningCheckoutCommentShowGridTable: {
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
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPIpPlanningCheckoutGridTableYearly' : 'rocheBPSPIpPlanningCheckoutGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 1).title;
                return `{"MDX":"
                    SELECT 
                    {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment]}
                    PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
                    ON COLUMNS , 
                    {[IpPlanning].[BPSP Budget].[${productCode}]} PROPERTIES [IpPlanning].[BPSP Budget].[Caption]
                    ON ROWS 
                    FROM [Sales Plan by Product] 
                    WHERE 
                    ([Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}],
                    [Receivers].[Receivers].[${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}],
                    [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],
                    [Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}])
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
    rocheBPSPIpPlanningCheckoutCommentShowGridTableSource: {
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
                let g = 'rocheBPSPIpPlanningCheckoutGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 2).title;
                return `{"MDX":"
                        SELECT 
                            {{[Measures Sales Plan by Product].[Measures Sales Plan by Product].[CommentSource]},
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy]},
                            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime]}}
                            
                            PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
                        ON COLUMNS , 
                            {[IpPlanning].[BPSP Budget].[${productCode}]} 
                            PROPERTIES [IpPlanning].[BPSP Budget].[Caption] 
                        ON ROWS 
                        FROM [Sales Plan by Product] 
                        WHERE 
                            ([Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                            [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}],
                            [Receivers].[Receivers].[${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}],
                            [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],
                            [Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}])
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
    rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPIpPlanningCheckoutCommentShowGridTable.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPIpPlanningCheckoutCommentShowGridTable.cellData')[0][0].title;
                }
                return r;
            }
        }
    },
    rocheBPSPIpPlanningCheckoutCommentEditGridRow3TextInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPIpPlanningCheckoutCommentShowGridTableSource.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPIpPlanningCheckoutCommentShowGridTableSource.cellData')[0][0].title.split('<br/>')[0];
                }
                return r;
            }
        }
    },

    rocheBPSPIpPlanningCheckoutCommentEditControlPanelSaveButton: {
        launch: {
            url: (db) => `/api/v1/Cubes('Sales Plan by Product')/tm1.Update`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPIpPlanningCheckoutGridTableYearly' : 'rocheBPSPIpPlanningCheckoutGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 1).title;
                return `
                [
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('IpPlanning')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}')",
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
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('IpPlanning')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}')",
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
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('IpPlanning')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('CommentSource')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPIpPlanningCheckoutCommentEditGridRow3TextInput.value') ? v('rocheBPSPIpPlanningCheckoutCommentEditGridRow3TextInput.value') : ''}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                   "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                   "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPIpPlanningGridRow1Cell2DropBox', 'key')}')",
                                   "Dimensions('IpPlanning')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                   "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPIpPlanningGridRow1Cell3DropBox.value')}')",
                                   "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('Final Sales Plan')",
                                   "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('Comment')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput.value') ? v('rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput.value') : ''}"
                    }
                ]
                `;
            }
        }
    },

     rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton: {
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear), s = [], fileName;
                s.push(Utils.getFormattedDate(new Date(), '_', true));
                s.push(db.activeUserName);
                s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key'));
                s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell3DropBox', 'key'));
                s.push(db.systemValueIpPlanningCheckoutProduct);
                fileName = s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
                return {
                    url: 'export?export_key=rocheIpPlanningMonthly&file_name=' + fileName + '.xlsx',
                    activeUserName: db.activeUserName,
                    fileName: fileName + '.xlsx',
                    companyVersion: db.systemValueGlobalCompanyVersion, //Live
                    productPlanVersion: db.systemValueGlobalCompanyProductPlanVersion, //Budget
                    company: Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key'),
                    receiver: v('rocheBPSPipPlanningGridRow1Cell3DropBox.value'),
                    material: db.systemValueIpPlanningCheckoutProduct,
                    globalVersion: db.systemValueGlobalCompanyVersion,
                    version: db.systemValueGlobalCompanyProductPlanVersion,
                    year1: y1,
                    year2: y1 + 1,
                    key: 'exportIpPlanningMonthly'
                };
            }
        }
    },


    rocheBPSPMaterialGridTable:
        {

            initCondition: (db) => {
                return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
            },
            initDefault: (db) => {
                return [];
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow3Cell1SearchBox')) {
                            searchString = v('rocheBPSPMaterialGridRow3Cell1SearchBox.value');

                        }
                        return `{"MDX":"

                                    
                                    With 
                                    -- IP Node then add dummy flag
                                    Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag] As
                                    IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL6',1,0)
                                    -- IP Node and has no pland Data then deletable
                                    Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag] As
                                    IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
                                        [Material Information by Company].([ Companies].[ Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}],
                                        [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) = 0,1,0)
                                    -- IP Node and has pland Data then go to plan
                                    Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag] As
                                    IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
                                        [Material Information by Company].([ Companies].[ Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}],
                                        [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) <> 0,1,0)
                                    SELECT 
                                       {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Name],
                                        [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name],
                                         [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element],
                                         [}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag],
                                         [}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag],
                                         [}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag]} 
                                      ON COLUMNS , 
                                      -- {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}],'${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}
                                      
                                          {Filter({TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')},
                                                 Instr([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Name], '${searchString}') > 0)}
                                       
                                      ON ROWS 
                                    FROM [}ElementAttributes_Materials] 
                                    "}`;

                    },
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
                                    icon: parseInt(r.Cells[x + 3].FormattedValue) === 1 ? 'icon-plus-circle-outline' : '',
                                    cellSkin: parseInt(r.Cells[x + 3].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? 'icon-trash' : '',

                                    cellSkin: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: parseInt(r.Cells[x + 5].FormattedValue) === 1 ? 'icon-copy' : '',
                                    cellSkin: parseInt(r.Cells[x + 5].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },


                        ]
                    }

                },
        },


    rocheBPSPMaterialDeleteDataPopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Remove Material From Subset')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pMaterial", "Value": "${Utils.getGridTableCell('rocheBPSPMaterialGridTable', 2).title}"},
                        
                        ]


                    }`
            },
    },


    rocheBPSPMaterialMoveDataPopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Move IP plan')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pMaterialFrom", "Value": "${Utils.getGridTableCell('rocheBPSPMaterialGridTable', 2).title}"},
                                {"Name": "pMaterialTo", "Value": "${v('rocheBPSPMaterialMoveDataPopupGridRow2Cell1Dropbox.value')}"},
                        ]


                    }`
            },
    },


    RocheBPSPMaterialIPNodeGridTable:
        {

            initCondition: (db) => {
                return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
            },
            initDefault: (db) => {
                return [];
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow3Cell1SearchBox')) {
                            searchString = v('rocheBPSPMaterialGridRow3Cell1SearchBox.value');
                        }
                        return `{"MDX":"
								                                    
								With 
								-- IP Node then add dummy flag
								Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag] As
								IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='IP Node',1,0)
								-- IP Node and has no pland Data then deletable
								Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag] As
								IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
								    [Material Information by Company].([ Companies].[ Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}],
								    [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) = 0,1,0)
								-- IP Node and has pland Data then go to plan
								Member[}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag] As
								IIF([}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name]='PL8' AND
								    [Material Information by Company].([ Companies].[ Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}],
								    [Measures Material Information by Company].[Measures Material Information by Company].[Flag - Has plan data]) <> 0,1,0)
								SELECT 
								   {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Name],
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Product Level - Name],
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element],
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[AddDummyFlag],
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[DeleteFlag],
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag]} 
								  ON COLUMNS , 
								  {Filter({TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')},
								   Instr([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Name], '${searchString}') > 0)}
								   PROPERTIES [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[Caption]  ON ROWS 
								FROM [}ElementAttributes_Materials] 
                                    
                                    "}`;

                    },
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
                                    icon: parseInt(r.Cells[x + 3].FormattedValue) === 1 ? 'icon-plus-circle-outline' : '',
                                    cellSkin: parseInt(r.Cells[x + 3].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? 'icon-trash' : '',
                                    cellSkin: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: parseInt(r.Cells[x + 5].FormattedValue) === 1 ? 'icon-copy' : '',
                                    cellSkin: parseInt(r.Cells[x + 5].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },


                        ]
                    }

                },
        },
    rocheBPSPAddMaterialCompanyInfo: {
        init: {
            execute: (db) => {
                return {title: v('rocheBPSPMaterialGridRow1Cell2DropBox.value')};
            }
        }
    },

    RocheBPSPMaterialsAddMaterialSearchSelectAll: {
        init: {
            execute: (db) => {
                return {
                    value: v('RocheBPSPMaterialsAddMaterialSearchSelectAll.switch.value')
                }
            }
        }
    },

    rocheBPSPMateralsAddMaterialSearchPagerInfoText: {
        init: {
            execute: (db) => {
                if (v('RocheBPSPMaterialsAddMaterialSearch.cellData.length') === false) {
                    return {visible: false};
                }
                return {title: Utils.getGridTablePagerText('RocheBPSPMaterialsAddMaterialSearch')};
            }
        }
    },
    rocheBPSPMateralsAddMaterialSearchPagerPreviousButton: {
        init: {
            execute: (db) => {
                if (v('RocheBPSPMaterialsAddMaterialSearch.cellData.length') === false) {
                    return {visible: false};
                }
                return {visible: Utils.isGridTablePagerPreviousButtonVisible('RocheBPSPMaterialsAddMaterialSearch')};
            }
        }
    },
    rocheBPSPMateralsAddMaterialSearchPagerFirstPageButton: {
        init: {
            execute: (db) => {
                if (v('RocheBPSPMaterialsAddMaterialSearch.cellData.length') === false) {
                    return {visible: false};
                }
                return Repository.rocheBPSPMateralsAddMaterialSearchPagerPreviousButton.init.execute(db);
            }
        }
    },
    rocheBPSPMateralsAddMaterialSearchPagerNextButton: {
        init: {
            execute: (db) => {
                if (v('RocheBPSPMaterialsAddMaterialSearch.cellData.length') === false) {
                    return {visible: false};
                }
                return {visible: Utils.isGridTablePagerNextButtonVisible('RocheBPSPMaterialsAddMaterialSearch')};
            }
        }
    },
    rocheBPSPMateralsAddMaterialSearchPagerLastPageButton: {
        init: {
            execute: (db) => {
                if (v('RocheBPSPMaterialsAddMaterialSearch.cellData.length') === false) {
                    return {visible: false};
                }
                return Repository.rocheBPSPMateralsAddMaterialSearchPagerNextButton.init.execute(db);
            }
        }
    },

    RocheBPSPMaterialsAddMaterialSearch:
        {
            switch: {
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                type: 'PATCH',
                body: (db, cell, widgetValue) => {
                    return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
                }
            },

            refresh_col_0: {
                execute: (db) => {
                    return {value: v('RocheBPSPMaterialsAddMaterialSearchSelectAll.switch.value')};
                }
            },
            initCondition: (db) => {
                let l = v('rocheBPSPAddMaterialGridRow4Cell1Search.value') != '' ||
                    v('rocheBPSPAddMaterialGridRow4Cell2Search.value') != '' || v('rocheBPSPAddMaterialGridRow4Cell3Dropbox.value') != ''
                    || v('rocheBPSPAddMaterialGridRow4Cell4Search.value') != '' || v('rocheBPSPAddMaterialGridRow4Cell5Search.value') != '';
                return l;
            },
            initDefault: (db) => {
                return [];
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',

                    body: (db) => {

                        let dbV = v('rocheBPSPAddMaterialGridRow4Cell3Dropbox.value');
                        dbV = dbV === false ? '' : dbV;

                        let IDsearch = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPAddMaterialGridRow4Cell1Search')) {
                            IDsearch = v('rocheBPSPAddMaterialGridRow4Cell1Search.value');
                        }

                        let DescriptionSearch = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPAddMaterialGridRow4Cell2Search')) {
                            DescriptionSearch = v('rocheBPSPAddMaterialGridRow4Cell2Search.value');
                        }

                        let ProfitCenterSearch = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPAddMaterialGridRow4Cell4Search')) {
                            ProfitCenterSearch = v('rocheBPSPAddMaterialGridRow4Cell4Search.value');
                        }

                        let IpNodeSearch = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPAddMaterialGridRow4Cell5Search')) {
                            IpNodeSearch = v('rocheBPSPAddMaterialGridRow4Cell5Search.value');
                        }
                        return `{"MDX":"

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
                                FILTER({TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Materials].[Materials].[All Materials]}, ALL, RECURSIVE )}, 0)}, 
                                        [Materials].[Materials].CurrentMember.Properties('IP Active Flag') = '1')
                                                 }, 0)
                                          --Dropbox with Category
                                          }, [Materials].[Materials].CurrentMember.Properties('Material Category - Key') = '${dbV}')
                                 -- Instr search
                                 }, InStr([Materials].[Materials].CurrentMember.Properties('Profit Center Budget - Key') ,'${ProfitCenterSearch}')<>0)
                                }, InStr([Materials].[Materials].CurrentMember.Properties('IP Profit Center Budget - Key'), '${IpNodeSearch}')<>0)
                                       }, InStr([Materials].[Materials].CurrentMember.Properties('Element'), '${IDsearch}' ) <> 0 AND
                                          InStr([Materials].[Materials].CurrentMember.Properties('Medium Name'), '${DescriptionSearch}' ) <> 0 )},1,100)}  
                                   PROPERTIES [Materials].[Materials].[Caption]  ON ROWS 
                                FROM [Material Information by Company] 
                                WHERE 
                                  (
                                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}]
                                  )
                                    "}`;

                    },

                    parsingControl: {
                        type: 'matrix',
                        length: 13,
                        query: [


                            (r, x) => {
                                return {
                                    ordinal: r.Cells[x].Ordinal, value: r.Cells[x].FormattedValue
                                }
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

    RocheBPSPMaterialsAddMaterialClipboardSelectAll: {
        init: {
            execute: (db) => {
                return {
                    value: v('RocheBPSPMaterialsAddMaterialClipboardSelectAll.switch.value')
                }
            }
        }
    },

    RocheBPSPMaterialsAddMaterialClipboard:
        {

            switch: {
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                type: 'PATCH',
                body: (db, cell, widgetValue) => {
                    return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
                }
            },

            refresh_col_0: {
                execute: (db) => {
                    return {value: v('RocheBPSPMaterialsAddMaterialClipboardSelectAll.switch.value')};
                }
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Consolidated,RuleDerived,Updateable;$expand=Members($select=Name, Attributes/Caption))`,
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
                                let editable = r.Cells[x].Consolidated === false && r.Cells[x].RuleDerived === false;
                                return {
                                    ordinal: r.Cells[x].Ordinal,
                                    value: r.Cells[x].FormattedValue,
                                    //value: v('RocheBPSPMaterialsAddMaterialClipboardSelectAll.switch.value'),
                                    cellSkin: editable ? '' : 'locked',
                                    editable: editable
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

    rocheBPSPMaterialMoveDataPopupGridRow2Cell1Dropbox: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "

                            SELECT 
                               {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Caption]} 
                              ON COLUMNS , 
                               {Filter(
                                  {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('Product Level - Name') = 'PL8')} 
                              ON ROWS 
                            FROM [}ElementAttributes_Materials] 

            "}`,
            parsingControl: {
                type: 'list',
                query:
                    (r, x) => {
                        let selected = v('rocheBPSPMaterialMoveDataPopupGridRow2Cell1Dropbox.value');
                        return {name: r.Cells[x].FormattedValue, on: selected === r.Cells[x].FormattedValue};
                    }
            }
        }
    },


    rocheBPSPMaterialAddDummyPopupGridRow3Cell1Dropbox: {

        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
                            "MDX" : "

                            SELECT 
                               {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption],
                                [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]} 
                              ON COLUMNS , 
                               {Filter(
                                  {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('Product Level - Name') = 'PL6')} 
                              ON ROWS 
                            FROM [}ElementAttributes_Materials]

            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
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

    rocheBPSPMaterialAddDummyPopupGridRow4Cell1Dropbox: {

        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
                {
                                "MDX" : "
                                     SELECT
                                   {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP Budget IP Caption],
                                    [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]}
                                  ON COLUMNS ,
                                   {Filter(
                                     {Filter(
                                      {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')},
                                       [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('Product Level - Name') = 'IP Node')},
                                       [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}') =
                                       [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[458856].Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}')
                                        )}
                                  ON ROWS
                                FROM [}ElementAttributes_Materials]
                "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
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


    rocheBPSPMaterialAddDummyPopupGridRow5Cell1Dropbox: {

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
                        {
                    "MDX" :"
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

    rocheBPSPMaterialAddDummyGridTablePopupGridRow3Cell1Dropbox: {

        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPMaterialGridTable');
        },
        initDefault: (db) => {
            return [];
        },


        init:
            {
                execute: (db) => {
                    return [{name: Utils.getGridTableCell('rocheBPSPMaterialGridTable', 0).label}];
                }
            }


        /*
       url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
       type: 'POST',
       body: (db) => `
       {
                       "MDX" : "

                       SELECT
                          {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption],
                           [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]}
                         ON COLUMNS ,
                          {Filter(
                             {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')},
                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('Product Level - Name') = 'PL6')}
                         ON ROWS
                       FROM [}ElementAttributes_Materials]

       "}`,
       parsingControl: {
           type: 'object',
           query:
               {
                   items: (r, x) => {
                       let result = [];
                       for (let i = 0; i < r.Cells.length; i = i + 2) {
                           result.push({
                               name: r.Cells[i].FormattedValue,
                               key: r.Cells[i + 1].FormattedValue,
                               on: false
                           });
                       }
                       return result;
                   }
               }
       }
   }

         */


    },

    rocheBPSPMaterialAddDummyGridTablePopupGridRow4Cell1Dropbox: {

        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "
                            SELECT 
                               {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP Budget IP Caption],
                                [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]} 
                              ON COLUMNS , 
                               {Filter(
                                 {Filter(
                                  {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('Product Level - Name') = 'IP Node')},
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}') = 
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[458856].Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}')
                                    )}
                              ON ROWS 
                            FROM [}ElementAttributes_Materials] 

            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
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

    rocheBPSPMaterialAddDummyGridTablePopupGridRow5Cell1Dropbox: {

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

    rocheBPSPMaterialAddDummyGridTableIPpopupGridRow3Cell1Dropbox: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
                            "MDX" : "

                            SELECT 
                               {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption],
                                [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]} 
                              ON COLUMNS , 
                               {Filter(
                                  {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('Product Level - Name') = 'PL6')} 
                              ON ROWS 
                            FROM [}ElementAttributes_Materials]

            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
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

    rocheBPSPMaterialAddDummyGridTableIPpopupGridRow4Cell1Dropbox: {

        initCondition: (db) => {
            return Utils.isGridTableLoaded('RocheBPSPMaterialIPNodeGridTable');
        },
        initDefault: (db) => {
            return [];
        },

        init:
            {
                execute: (db) => {
                    return [{name: Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 0).label}];
                }
            }

        /*
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
                            "MDX" : "
                            
                                    SELECT 
                                       {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP Budget IP Caption],
                                        [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]} 
                                      ON COLUMNS , 
                                       {Filter(
                                         {Filter(
                                          {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('Product Level - Name') = 'IP Node')},
                                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}') = 
                                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[458856].Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}')
                                            )}
                                      ON ROWS 
                                    FROM [}ElementAttributes_Materials] 


            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [],
                                selectedItem = Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 2).title;
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    on: r.Cells[i].FormattedValue === selectedItem
                                });
                            }
                            return result;
                        }
                    }
            }
        }

         */
    },

    rocheBPSPMaterialAddDummyGridTableIPpopupGridRow5Cell1Dropbox: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
                        {
                    "MDX" :"
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

    rocheBPSPMaterialAddDummyPopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Add Dummy Material')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},

                                {"Name": "pProductPL6", "Value": " ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialAddDummyPopupGridRow3Cell1Dropbox', 'key')} "},

                                {"Name": "pProductIPNode", "Value":"${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialAddDummyPopupGridRow4Cell1Dropbox', 'key')}"},

                                {"Name": "pMaterialName", "Value": "${v('rocheBPSPMaterialAddDummyPopupGridRow2Cell1TextInput.value')}"},

                                {"Name": "pMaterialCategory", "Value": "${v('rocheBPSPMaterialAddDummyPopupGridRow5Cell1Dropbox.value')}"}
                        
                        ]


                    }`
            },
    },

    rocheBPSPMaterialAddDummyGridTablePopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Add Dummy Material')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pProductPL6", "Value": " ${Utils.getGridTableCell('rocheBPSPMaterialGridTable', 2).title} "},
                                {"Name": "pProductIPNode", "Value":"${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialAddDummyGridTablePopupGridRow4Cell1Dropbox', 'key')}"},
                                {"Name": "pMaterialName", "Value": "${v('rocheBPSPMaterialAddDummyGridTablePopupGridRow2Cell1TextInput.value')}"},
                                {"Name": "pMaterialCategory", "Value": " ${v('rocheBPSPMaterialAddDummyGridTablePopupGridRow5Cell1Dropbox.value')}"},
                        ]
                    }`
            },
    },

    rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Remove Material From Subset')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pMaterial", "Value": "${Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 2).title}"},
                        
                        ]


                    }`
            },
    },

    rocheBPSPMaterialMoveDataIPNodePopupGridRow2Cell1Dropbox: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "

                            SELECT 
                               {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Caption]} 
                              ON COLUMNS , 
                               {Filter(
                                  {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].CurrentMember.Properties('Product Level - Name') = 'PL8')} 
                              ON ROWS 
                            FROM [}ElementAttributes_Materials] 

            "}`,
            parsingControl: {
                type: 'list',
                query:
                    (r, x) => {
                        let selected = v('rocheBPSPMaterialMoveDataIPNodePopupGridRow2Cell1Dropbox.value');
                        return {name: r.Cells[x].FormattedValue, on: selected === r.Cells[x].FormattedValue};
                    }
            }
        }
    },

    rocheBPSPMaterialMoveDataIPNodePopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Move IP plan')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pMaterialFrom", "Value": "${Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 2).title}"},
                                {"Name": "pMaterialTo", "Value": "${v('rocheBPSPMaterialMoveDataIPNodePopupGridRow2Cell1Dropbox.value')}"},
                        ]


                    }`
            },
    },


    rocheBPSPMaterialAddDummyGridTableIPpopupGridRow3Cell1Text: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
        },
        initDefault: (db) => {
            return [];
        },
    },

    rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelAddButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Maintenance Add Dummy Material')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},

                                {"Name": "pProductPL6", "Value": " ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialAddDummyGridTableIPpopupGridRow3Cell1Dropbox', 'key')}"},

                                {"Name": "pProductIPNode", "Value":"${Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 2).title}"},

                                {"Name": "pMaterialName", "Value": "${v('rocheBPSPMaterialAddDummyGridTableIPpopupGridRow2Cell1TextInput.value')}"},

                                {"Name": "pMaterialCategory", "Value": " ${v('rocheBPSPMaterialAddDummyGridTableIPpopupGridRow5Cell1Dropbox.value')}"},
                        ] }`
            },
    },

    RocheBPSPMaterialsAddMaterialSearchButton14: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Search Add Single Material')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},                        
                        ]
                    }`
            },
    },

    rocheBPSPAddMaterialGridRow4Cell7Button: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Search Add Selected Materials')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},                        
                        ]
                    }`
            },
    },


    rocheBPSPAddMaterialGridRow4Cell6Button: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Clear All Inputs')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"}, 
                                {"Name": "pCube", "Value": "Material Information by Company"},                       
                        ]
                    }`
            },
    },

    rocheBPSPAddMaterialGridRow3Cell3Button: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Material Import Add Materials')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"},                        
                        ]
                    }`
            },
    },


};