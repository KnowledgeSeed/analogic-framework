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
                                Utils.setWidgetValue('systemValueIpPlanningFocusedProductDefault', 'PL1');
                                Utils.setWidgetValueByOther('systemValueIpPlanningFocusedProduct', 'systemValueIpPlanningFocusedProductDefault');
                                Utils.setWidgetValueIfNotExist('systemValueGlobalSelectedCompany', false);
                                Utils.setWidgetValue('systemValueCustomerReportFocusedProductDefault', 'PL1');
                                Utils.setWidgetValueByOther('systemValueCustomerReportFocusedProduct', 'systemValueCustomerReportFocusedProductDefault');
                                Utils.setWidgetValueIfNotExist('systemValueCustomerPlanningSegmentedControlPeriodUnit', 'Yearly');
                                Utils.setWidgetValueIfNotExist('systemValueCustomersPlanningMonthlyType', 'Base Plan');
                                Utils.setWidgetValueIfNotExist('systemValueCustomersPlanningMonthlyTypeValue', 'Base Plan');
                                Utils.setWidgetValue('systemValueDefaultCustomersPlanningFocused', 'PL1');
                                Utils.setWidgetValueIfNotExist('systemValueCustomersPlanningFocused', v('systemValueDefaultCustomersPlanningFocused'));
                                return true;
                            }
                        }
                }
            }
        ]
    },

    rocheBPSPMainGridRow5Cell1aSubmitToBPXP: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => `
                   {
                    "MDX" : "SELECT 
                            {[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sValue]} 
                              ON COLUMNS , 
                               {[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPMainGridRow5Cell1aSubmitToBPXP]} 
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
                            enabled: (r, x) => {
                                return r.Cells[0].FormattedValue == 'TRUE';
                            },

                            skin: (r, x) => {
                                return r.Cells[0].FormattedValue == 'TRUE' ? 'rochemain' : 'rochemain_disabled';
                            }
                        }
                }
            }
    },

    rocheBPSPMainGridRow5Cell1Button: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => `
                   {
                    "MDX" : "SELECT 
                            {[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sValue]} 
                              ON COLUMNS , 
                               {[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPMainGridRow5Cell1Button]} 
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
                            enabled: (r, x) => {
                                return r.Cells[0].FormattedValue == 'TRUE';
                            },

                            skin: (r, x) => {
                                return r.Cells[0].FormattedValue == 'TRUE' ? 'rochemain' : 'rochemain_disabled';
                            }
                        }
                }
            }
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

    rocheBPSPMainSubmissionToBPXPPopupYes: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell2DropBox');
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            execute: (db) => {
                return {
                    enabled: Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'flag') === 1 ? true : false,
                    skin: Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'flag') === 1 ? 'blue_bg_bpsp' : 'grey_bg_bpsp'
                };
            }
        },

        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - BPSP - Submission')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`
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
                            [Measures Company Information].[Measures Company Information].[Start page message DateTime],
                            [Measures Company Information].[Measures Company Information].[Start page message User]} 
                          PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON COLUMNS , 
                          NON EMPTY 
                        {TM1SubsetToSet([Companies].[Companies], 'All Active')} 
                          PROPERTIES [Companies].[Companies].[Member description]  ON ROWS 
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
                            title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 1%;margin-top:0.5%;";  >' + r.Cells[x + 2].FormattedValue + '</div>' + '<div style=\"font-size:10px;color:#408CD9;;margin-top:0.5%;\" >' + r.Cells[x + 3].FormattedValue + '</div>',
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
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPProductsGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
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
                return v(g + '.cellData').filter(e => ['01C', '02C', '03C', '01N', '02N', '03C'].includes(e[0].uiLevel)).map(e => {
                    return [{
                        label: e[0].label,
                        skin: 'gridtable_hierarchy_shortcut_bpsp_' + e[0].uiLevel,
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

    rocheBPSPProductsCheckoutWarningContactEditorButton: {
        initCondition: (db) => {
            return Repository.templateFunctions.initConditionDependingOnYearlyMonthly(db);
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => {
                let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly',
                    c = Utils.getGridTableCell(g, 0), u = c.checkoutUser;
                u = db.activeUserName.split('/')[0] + '/' + u;
                return `
                      {"MDX":
                        "SELECT
                           {[}ElementAttributes_}Clients].[}ElementAttributes_}Clients].[Email]}
                          ON COLUMNS,
                           {[}Clients].[}Clients].[${u}]}
                          ON ROWS
                        FROM [}ElementAttributes_}Clients]"}
                    `;
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        url: (r, x) => {
                            return 'mailto:' + r.Cells[0].FormattedValue;
                        }
                    }
            }
        }
    },

    rocheBPSPProductsCheckoutWarningByUserText: {
        initCondition: (db) => {
            return Repository.templateFunctions.initConditionDependingOnYearlyMonthly(db);
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
    rocheBPSPProductsTypeSegmentedControlInfoText: {
        initCondition: (db) => {
            return db.systemValueSegmentedControlPeriodUnit === 'Monthly' && v('systemValueCheckoutProduct');
        },
        initDefault: (db) => {
            return {visible: false};
        },
        init: {
            execute: (db) => {
                return {
                    visible: db.systemValueSegmentedControlPeriodUnit === 'Monthly' && v('systemValueProductsTypeSegmentedControlVisibleType') !== false,
                    title: v('systemValueProductsTypeSegmentedControlVisibleType')
                };
            }
        }
    },
    rocheBPSPProductsTypeSegmentedControl: {
        switch: {
            execute: (db) => {
                Utils.setWidgetValue('selectedProductsTypeSegmentedControl', v('rocheBPSPProductsTypeSegmentedControl.selected'));
            }
        },
        initCondition: (db) => {
            return db.systemValueSegmentedControlPeriodUnit === 'Monthly';
        },
        initDefault: (db) => {
            return {visible: false};
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key');
                return `{"MDX":"
                  SELECT 
                    {[}Groups].[}Groups].[${company} SalesMarketing],[}Groups].[}Groups].[${company} SalesFinance]} 
                  ON COLUMNS , 
                    {[}Clients].[}Clients].[${db.activeUser}]} 
                    PROPERTIES [}Clients].[}Clients].[}TM1_DefaultDisplayValue]  ON ROWS 
                    FROM [}ClientGroups] 
                  "}`;
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        visible: (r, x) => {
                            let checkoutProduct = v('systemValueCheckoutProduct'),
                                marketingAdjustmentVisible = r.Cells[0].FormattedValue !== '' || !checkoutProduct,
                                finalSalesPlanVisible = r.Cells[1].FormattedValue !== '' || !checkoutProduct,
                                visible = (finalSalesPlanVisible && marketingAdjustmentVisible) || !checkoutProduct,
                                visibleType = '';

                            if (marketingAdjustmentVisible && !finalSalesPlanVisible) {
                                visibleType = 'Marketing Adjustment';
                            }

                            if (!marketingAdjustmentVisible && finalSalesPlanVisible) {
                                visibleType = 'Final Sales Plan';
                            }

                            if (!marketingAdjustmentVisible && !finalSalesPlanVisible) {
                                visibleType = 'Access denied';
                            }
                            Utils.setWidgetValue('systemValueProductsTypeSegmentedControlVisibleType', visibleType);
                            Utils.setWidgetValue('systemValueProductsTypeIsOk', visibleType !== 'Access denied');
                            return v('systemValueSegmentedControlPeriodUnit') === 'Monthly' && visible;
                        },
                        data: (r, x) => {
                            let vv = v('systemValueProductsTypeSegmentedControlVisibleType'),
                                selected = vv === false ? v('selectedProductsTypeSegmentedControl') !== false ? v('selectedProductsTypeSegmentedControl') : 'Final Sales Plan' : vv;
                            return [
                                {
                                    selected: 'Final Sales Plan' === selected,
                                    label: 'Final Sales Plan',
                                    value: 'Final Sales Plan'
                                },
                                {
                                    selected: 'Marketing Adjustment' === selected,
                                    label: 'Marketing Adjustment',
                                    value: 'Marketing Adjustment'
                                }
                            ];
                        }
                    }
            }
        }
    },
    rocheBPSPProducts: {
        getProductsTypeSegmentedControlValue: (db) => {
            let vv = v('systemValueProductsTypeSegmentedControlVisibleType');
            if (vv !== false) {
                return vv;
            }
            return v('rocheBPSPProductsTypeSegmentedControl.selected');
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
                                 MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[UILevelFormat] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} UI Level Format')
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
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutDateTime]),
                                 ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[UILevelFormat])}
                                 Set Comment AS
                                 {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment])}
                            SELECT 
                              {UNION(HEAD(UNION(UNION({FixColumns},{ColumnSelectionByUser},All),{DefaultColumnSelection},All),17),{Comment},All)}
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
                length: 18,
                query: [
                    (r, x) => {
                        let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue,
                            uiLevel = r.Cells[x + 6].FormattedValue;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'];
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = x;
                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_hierarchy_bpsp_' + uiLevel + (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? '_locked' : ''),
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
                            uiLevel: uiLevel,
                            hasComment: r.Cells[x + 17].FormattedValue !== ''
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
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 5;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members[6].Name !== 'DUMMY',
                            members: r.Cells[WidgetValue['systemValueProductsYearlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
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
    'rocheBPSPProductsGridTableMonthlyHeaderText-04': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPProductsGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return {
                    title: db.systemValueGlobalSegmentedControlRelativeYearValue,
                    body: Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)
                };
            }
        }
    },
    rocheBPSPProductsGridTableMonthly: {
        initCondition: (db) => {
            let l = v('rocheBPSPProductsGridRow1Cell3DropBox.value.length') !== false
                && v('systemValueSegmentedControlPeriodUnit') === 'Monthly'
                && v('systemValueBackFromCheckinMonthly') === false
                && v('systemValueProductsTypeIsOk') === true;
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
                                    [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                             MEMBER [Periods].[Periods].[ProductCaption] as 
                                    [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                             MEMBER [Periods].[Periods].[ProductLevel] as 
                                    [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                             MEMBER [Periods].[Periods].[UILevelFormat] as 
                                    [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} UI Level Format')
                             MEMBER [Periods].[Periods].[zUI CheckOutFlag] as
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value])
                             MEMBER [Periods].[Periods].[HasComment] as
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                             MEMBER [Periods].[Periods].[zUI CheckOutUser] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                             MEMBER [Periods].[Periods].[zUI CheckOutDateTime] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                             MEMBER [Periods].[Periods].[zUI Split Flag] as 
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Monthly Split Type])

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
                           {Union({Union(Union(FixColumns,{DRILLDOWNMEMBER({[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]},{[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]})},All),{Comment},All)},
                           {[Periods].[Periods].[UILevelFormat]})}
                           PROPERTIES [Periods].[Periods].[Caption]ON COLUMNS , 
                        -- rows
                          {StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])}
                          PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption] ON ROWS 
                        FROM [Sales Plan by Product] 
                        WHERE 
                          (
                           [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}],
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
                length: 22,
                query: [
                    (r, x) => {
                        let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue,
                            uiLevel = r.Cells[x + 21].FormattedValue;
                        WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsMainLocked'];
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;
                        WidgetValue['systemValueMonthlyRelativeIndex'] = x;

                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_hierarchy_bpsp_' + uiLevel + (WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? '_locked' : ''),
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
                            uiLevel: uiLevel,
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
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        let icon = v('systemValueProductsCheckotSplitIcons')[r.Cells[x + 6].FormattedValue];

                        let cell = {
                            icon: !icon ? 'icon-circle' : icon,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            iconColor: '#B1B3B3',
                            skin: 'products_gd_distribution_icon_bpsp'
                        };

                        if (!icon) {
                            cell['iconColor'] = 'black';
                            cell['titleFontWeight'] = 'bold';
                        }

                        if (cell.icon === 'icon-distribution-equal') {
                            cell.iconFontSize = 12;
                        }
                        return cell;
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
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
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true,
                            members: r.Cells[WidgetValue['systemValueMonthlyRelativeIndex']].Members,
                            applyMeasuresToSection: true,
                            width: '100%'
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 1;
                        return {
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableMonthlyIsLocked'] ? 'locked' : '',
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
                                  [zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sColumnSelectorTuple ${db.systemValueGlobalSegmentedControlRelativeYear}])+'}')}
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
                skin: 'monthly_right_bpsp',
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
                        s['visible'] = x === 0;
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
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Monthly' &&  v('systemValueProductsTypeIsOk') === true};
            }
        }
    },
    rocheBPSPProductsCheckoutGridTableYearlyFunction: {
        getCell: (index, r) => {
            let uiIndex = index + 10, uiValue = parseInt(r.Cells[uiIndex].FormattedValue), skin = 'monthly_right_bpsp',
                cellSkin = '',
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
                members: r.Cells[index].Members,
                applyMeasuresToSection: true,
                width: '100%'
            };
            if (icon !== '') {
                result['icon'] = icon;

            }
            if (applyMeasuresToSection) {
                result['width'] = '100%';
                result['height'] = '100%';
                result['performable'] = true;
                if (uiValue === 3 && r.Cells[index].Members[5].Name == WidgetValue.systemValueGlobalSegmentedControlRelativeYearValue) {
                    result['paddingRight'] = 26;
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
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"},
                                {"Name": "pLineItem", "Value": "${v('systemValueProductCheckoutGridTableYearlyPLineItem')}"},
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
                let pLineItem = v('systemValueSegmentedControlPeriodUnit') === 'Yearly' ? 'Final Sales Plan' : Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db);
                return `{
                        "Parameters": [
                                {"Name": "pVersion", "Value": "${db.systemValueGlobalCompanyVersion}"},
                                {"Name": "pProduct", "Value": "${db.systemValueCheckoutProduct}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pLineItem", "Value": "${pLineItem}"},
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
                let pLineItem = Utils.getGridTableCurrentCell('rocheBPSPProductsCheckoutGridTableYearly').members[6].Name;
                Utils.setWidgetValue('systemValueProductCheckoutGridTableYearlyPLineItem', pLineItem);
                if (Utils.getPropertyOrFunctionValue(cell, 'distributionEdit')) {
                    return `{
                        "Parameters": [
                                {"Name": "pPeriod", "Value": "${v('systemValueGlobalSegmentedControlRelativeYearValue')}"},
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsCheckoutGridTableYearly', 1).title}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pVersion", "Value": "${v('systemValueGlobalCompanyVersion')}"},
                                {"Name": "pLineItem", "Value": "${pLineItem}"}
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
                                {"Name": "pSplitMode", "Value": "Default"},
                                {"Name": "pLineItem", "Value": "${pLineItem}"}
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
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[UILevelFormat] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} UI Level Format')
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
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutDateTime]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[UILevelFormat])}
                         Set Comment AS
                              {([Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag],[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan])}

                    SELECT
                        {UNION(
                           HEAD(
                             UNION(
                               UNION({[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value]}*{FixColumns},
                               {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[UI Format]}*{ColumnSelectionByUser},All),
                               {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[UI Format]}*{DefaultColumnSelection},All),27),
                                       {Comment},All)}  ON COLUMNS , 
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
                length: 28,
                query: [
                    (r, x) => {
                        let result, pl, uiLevel = r.Cells[x + 6].FormattedValue;
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = x;
                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + uiLevel,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 27].FormattedValue !== ''
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
                        WidgetValue['systemValueProductsYearlyRelativeIndex'] = WidgetValue['systemValueProductsYearlyRelativeIndex'] + 5;
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
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Monthly' && v('systemValueProductsTypeIsOk') === true};
            }
        },
        getFileName: (db) => {
            let s = [], fileName;
            s.push(Utils.getFormattedDate(new Date(), '_', true));
            s.push(db.activeUserName);
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key'));
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key'));
            s.push(db.systemValueCheckoutProduct);
            s.push(Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db));
            return s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
        },
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear),
                    fileName = Repository.rocheBPSPProductsCheckoutGridRow2Cell1aButton.getFileName(db);
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
                    lineItem: Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db),
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
                performable = c.Consolidated === true && c.RuleDerived === false, isGrey = c.RuleDerived === true;

            let result = {
                title: c.FormattedValue,
                cellSkin: isGrey ? 'readonly_bpsp' : '',
                skin: 'monthly_right_bpsp',
                cellVisible: true,
                editable: editable,
                ordinal: c.Ordinal,
                members: c.Members,
                performable: performable
            };
            if (performable) {
                result['icon'] = 'icon-cloud-arrow-up';
            }
            if (editable) {
                result['titleFontColor'] = '#A05EB5';
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
            let fileName = Repository.rocheBPSPProductsCheckoutGridRow2Cell1aButton.getFileName(db);
            Utils.modifyFileName('rocheBPSPProductsCheckoutUploadPopupUpload', fileName);
            Utils.setWidgetValue('systemValueUploadFileName', fileName + '.csv');
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
                validationLineItem: Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db),
                validationMessage: 'First row of excel does not match'
                //      preProcessTemplate: v('preprocess.choose.value') === false ? 'Template1' : v('preprocess.choose.value')
            };
        },
        request: {
            url: (db) => `/api/v1/Processes('MODULE - UI - CSV Upload Post Processing')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                let fileName = v('systemValueUploadFileName');
                return `{
                        "Parameters": [
                                {"Name": "pUser", "Value": "${db.activeUserName}"},
                                {"Name": "pProduct", "Value": "${db.systemValueCheckoutProduct}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pReceiver", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}"},
                                {"Name": "pTargetCube", "Value": "Sales Plan by Product"},
                                {"Name": "pSelectedProductLevel", "Value": "${v('rocheBPSPProductsCheckoutUploadPopupPlDropbox.value')}"},
                                {"Name": "pFileName", "Value": "${fileName}"},
                                {"Name": "pLineItem", "Value": "${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}"}
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
                                {"Name": "pSplitMode", "Value": "Monthly"},
                                {"Name": "pSplitMethod", "Value": "Previous Year"},
                                {"Name": "pLineItem", "Value": "${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}"}
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
                                {"Name": "pSplitMode", "Value": "Monthly"},
                                {"Name": "pSplitMethod", "Value": "Equal"},
                                {"Name": "pLineItem", "Value": "${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}"}
                        ]
                    }`

        }
    },
    'rocheBPSPProductsCheckoutGridTableMonthlyHeaderText-04': {
        init: {
            execute: (db) => {
                return {
                    title: db.systemValueGlobalSegmentedControlRelativeYearValue,
                    body: Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)
                };
            }
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
                                {"Name": "pSplitMode", "Value": "Default"},
                                {"Name": "pLineItem", "Value": "${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}"}
                        ]
                    }`
            }
        },
        pastelast: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                Utils.setWidgetValueIfNotExist('systemValueCheckoutGridTableMonthlyPatchedProducts', []);
                v('systemValueCheckoutGridTableMonthlyPatchedProducts').push(v('rocheBPSPProductsCheckoutGridTableMonthly.cellData')[row][1].title);
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.parseNumber(widgetValue.value)}\"}
                ]`;
            }
        },
        paste: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                Utils.setWidgetValueIfNotExist('systemValueCheckoutGridTableMonthlyPatchedProducts', []);
                v('systemValueCheckoutGridTableMonthlyPatchedProducts').push(v('rocheBPSPProductsCheckoutGridTableMonthly.cellData')[row][1].title);
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.parseNumber(widgetValue.value)}\"}
                ]`;
            }
        },
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                Utils.setWidgetValueIfNotExist('systemValueCheckoutGridTableMonthlyPatchedProducts', []);
                v('systemValueCheckoutGridTableMonthlyPatchedProducts').push(v('rocheBPSPProductsCheckoutGridTableMonthly.cellData')[row][1].title);
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.parseNumber(widgetValue.value)}\"}
                ]`;
            }
        },
        writeMonthlySplitType: {
            url: (db) => `/api/v1/Cubes('Sales Plan by Product')/tm1.Update`,
            type: 'POST',
            body: (db) => {

                let touchedProducts = Utils.filterUnique(v('systemValueCheckoutGridTableMonthlyPatchedProducts')),
                    cellTemplates = [];

                let cellTemplate = (productCode) => `
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueGlobalSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductsGridRow1Cell3DropBox', 'key')}')",
                                    "Dimensions('LineItems Sales Plan by Product')/Hierarchies('LineItems Sales Plan by Product')/Elements('${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}')",
                                    "Dimensions('Measures Sales Plan by Product')/Hierarchies('Measures Sales Plan by Product')/Elements('Monthly Split Type')"
                                ]
                            },
                        ],
                         "Value": "M"
                    }
                    `;

                for (const t of touchedProducts) {
                    cellTemplates.push(cellTemplate(t));
                }

                Utils.setWidgetValue('systemValueCheckoutGridTableMonthlyPatchedProducts', []);

                return `
                    [
                    ${cellTemplates.join(',')}
                ]`;
            }
        },
        initCondition: (db) => {
            return WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Monthly'
                && v('rocheBPSPProductsTypeSegmentedControl.value') !== false
                && v('systemValueProductsTypeIsOk') == true;
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
                             MEMBER [Periods].[Periods].[UILevelFormat] as 
                                    [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} UI Level Format')
                             MEMBER [Periods].[Periods].[zUI CheckOutFlag] as
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Value])
                             MEMBER [Periods].[Periods].[HasComment] as
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                             MEMBER [Periods].[Periods].[zUI CheckOutUser] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                             MEMBER [Periods].[Periods].[zUI CheckOutDateTime] as 
                                    [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedDateTime])
                             MEMBER [Periods].[Periods].[zUI Split Flag] as 
                                    [Sales Plan by Product].([Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Monthly Split Type])
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
                           {Union({Union(Union(FixColumns,{DRILLDOWNMEMBER({[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]},{[Periods].[Periods].[${db.systemValueGlobalSegmentedControlRelativeYearValue}]})},All),{Comment},All)},
                           {[Periods].[Periods].[UILevelFormat]})}
                           PROPERTIES [Periods].[Periods].[Caption] ON COLUMNS , 
                        -- rows
                          {StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])}
                          PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption] ON ROWS 
                        FROM [Sales Plan by Product] 
                        WHERE 
                          (
                           [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[${Repository.rocheBPSPProducts.getProductsTypeSegmentedControlValue(db)}],
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
                length: 22,
                query: [
                    (r, x) => {
                        let result, pl, uiLevel = r.Cells[x + 21].FormattedValue;
                        WidgetValue['systemValueMonthlyRelativeIndex'] = x;

                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + uiLevel,
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
                            icon: !icon ? 'icon-circle' : icon,
                            cellSkin: '',
                            cellVisible: true,
                            ordinal: r.Cells[x + 6].Ordinal,
                            skin: 'products_gd_distribution_icon_bpsp'
                        };
                        if (!icon) {
                            cell['iconColor'] = 'black';
                            cell['titleFontWeight'] = 'bold';
                        }
                        if (cell.icon === 'icon-distribution-equal') {
                            cell.iconFontSize = 12;
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
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPMaterialGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPipPlanningGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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

    rocheBPSPIpPlanningCheckoutWarningContactEditorButton: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => {
                let g = 'rocheBPSPipPlanningGridTableMonthly',
                    c = Utils.getGridTableCell(g, 0), u = c.checkoutUser;
                u = db.activeUserName.split('/')[0] + '/' + u;
                return `
                      {"MDX":
                        "SELECT
                           {[}ElementAttributes_}Clients].[}ElementAttributes_}Clients].[Email]}
                          ON COLUMNS ,
                           {[}Clients].[}Clients].[${u}]}
                          ON ROWS
                        FROM [}ElementAttributes_}Clients]"}
                    `;
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        url: (r, x) => {
                            return 'mailto:' + r.Cells[0].FormattedValue;
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
                let b = Utils.parseNumber(db.systemValueGlobalStartingPlanYear);
                //return {title: Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 3, 'year')};
                return {title: b - 1};
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
                let a = Utils.parseNumber(db.systemValueIpPlanningSegmentedControlRelativeYearValue);
                let b = Utils.parseNumber(db.systemValueGlobalStartingPlanYear);
                return {
                    // title: Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 4, 'year'),
                    title: b,
                    body: a === b ? 'T0' : 'Plan'
                };
            }
        }
    },
    'rocheBPSPipPlanningGridTableMonthlyHeaderText-06': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                let b = v('systemValueIpPlanningSegmentedControlRelativeYearValue');
                return {
                    title: b
                };
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
                return {body: 'YEND vs Act ' + Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 18, 'year')};
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
                return {body: 'YEND vs T3 ' + Utils.getGridTableCellByRowAndColumn('rocheBPSPipPlanningGridTableMonthly', 0, 19, 'year')};
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
                    year: r.Cells[i].Members[7].Name,
                    applyMeasuresToSection: true,
                    width: '100%'
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
                                      {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP],'${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')}
                                --     {TM1DRILLDOWNMEMBER({[Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[IPL1]}, ALL, RECURSIVE )}
                                --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                                     Set FocusedOnProductRows AS 
                                      {Intersect({TM1DRILLDOWNMEMBER({[Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${db.systemValueIpPlanningFocusedProduct}]}, ALL, RECURSIVE )},{DefaultProductRows})}
                                --Decide which rowSet to use
                                     MEMBER [Materials].[BPSP Budget IP].[ProductIsFocused] AS 
                                     IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                                -- Decide 1st column element
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn] As
                                     IIF('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}'='${db.systemValueGlobalStartingPlanYear}', '([Periods].[Periods].[${Utils.parseNumber(db.systemValueGlobalStartingPlanYear) - 1}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])',
                                                        '([Periods].[Periods].[${db.systemValueGlobalStartingPlanYear}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])')
                                     Set FirstColumn As
                                     {StrToSet('{'+[LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn]+'}')}
                                -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Caption')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Element')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Product Level - Name')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[UILevelFormat] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('UI Level Format')
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
                                      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutDateTime]),
                                      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[UILevelFormat])}
                                     Set FinalColumns AS
                                     {([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS]),
                                      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment])}
                                -- column Tuple Create
                                     Set ColumnSelection As
                                        Union({FirstColumn},
                                        {([Periods].[Periods].[${db.systemValueGlobalStartingPlanYear}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Last Submitted Plan]),
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
                        length: 26,
                        query: [
                            (r, x) => {
                                let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue, skin,
                                    uiLevel = r.Cells[x + 6].FormattedValue;
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyRelativeIndex'] = x;
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsMainLocked'];
                                WidgetValue['systemValueRocheBPSPipPlanningGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;

                                pl = r.Cells[x + 1].FormattedValue.replace('a', '');
                                skin = 'gridtable_hierarchy_bpsp_' + uiLevel;
                                if (WidgetValue['systemValueRocheBPSPipPlanningGridTableMonthlyIsLocked']) {
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
                                    uiLevel: uiLevel,
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
                                return Repository.rocheBPSPipPlanningGridTableMonthly.getCell(r, x, 5);
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
                                    hasComment: c.FormattedValue !== ''
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
                return v('rocheBPSPipPlanningGridTableMonthly.cellData').filter(e => ['01C', '02C', '03C', '01N', '02N', '03N'].includes(e[0].uiLevel)).map(e => {
                    return [{
                        label: e[0].label,
                        skin: 'gridtable_hierarchy_shortcut_bpsp_' + e[0].uiLevel,
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
                let b = Utils.parseNumber(db.systemValueGlobalStartingPlanYear);
                //return {title: Utils.getGridTableCellByRowAndColumn('rocheBPSPIpPlanningCheckoutGridTableMonthly', 0, 3, 'year')};
                return {title: b - 1};
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
                let a = Utils.parseNumber(db.systemValueIpPlanningSegmentedControlRelativeYearValue);
                let b = Utils.parseNumber(db.systemValueGlobalStartingPlanYear);
                return {
                    //title: Utils.getGridTableCellByRowAndColumn('rocheBPSPIpPlanningCheckoutGridTableMonthly', 0, 4, 'year')
                    title: b,
                    body: a === b ? 'T0' : 'Plan'
                };
            }
        }
    },
    'rocheBPSPIpPlanningCheckoutGridTableMonthlyHeaderText-06': {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPIpPlanningCheckoutGridTableMonthly');
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                let b = v('systemValueIpPlanningSegmentedControlRelativeYearValue');
                return {
                    title: b
                };
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
                skin: 'monthly_right_bpsp',
                cellVisible: true,
                editable: editable,
                ordinal: c.Ordinal,
                year: c.Members[7].Name,
                members: c.Members,
                applyMeasuresToSection: true,
                width: '100%'
                //performable: performable
            };
            if (editable) {
                result['titleFontColor'] = '#A05EB5';
            }
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
                                      {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP],'${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')}
                                --Create deault subset for the rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                                     Set FocusedOnProductRows AS 
                                      {Intersect({TM1DRILLDOWNMEMBER({[Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${db.systemValueIpPlanningCheckoutProduct}]}, ALL, RECURSIVE )},{DefaultProductRows})}
                                --Decide which rowSet to use
                                     MEMBER [Materials].[BPSP Budget IP].[ProductIsFocused] AS 
                                     IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                                -- Decide 1st column element
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn] As
                                     IIF('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}'='${db.systemValueGlobalStartingPlanYear}', '([Periods].[Periods].[${Utils.parseNumber(db.systemValueGlobalStartingPlanYear) - 1}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])',
                                       '([Periods].[Periods].[${db.systemValueGlobalStartingPlanYear}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Actual Quantity])')
                                     Set FirstColumn As
                                     {StrToSet('{'+[LineItems Sales Plan IP].[LineItems Sales Plan IP].[FirstColumn]+'}')}
                                -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialName] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Caption')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialCode] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Element')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[MaterialLevel] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('Product Level - Name')
                                     MEMBER [LineItems Sales Plan IP].[LineItems Sales Plan IP].[UILevelFormat] as 
                                            [Materials].[BPSP Budget IP].CurrentMember.Properties('UI Level Format')
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
                                      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[zUI CheckOutDateTime]),
                                      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[UILevelFormat])}
                                     Set FinalColumns AS
                                     {([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[DIS]),
                                      ([Periods].[Periods].[2021],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[HasComment])}
                                -- column Tuple Create
                                     Set ColumnSelection As
                                        Union({FirstColumn},
                                        {([Periods].[Periods].[${db.systemValueGlobalStartingPlanYear}],[LineItems Sales Plan IP].[LineItems Sales Plan IP].[Last Submitted Plan]),
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
                length: 26,
                query: [
                    (r, x) => {
                        let result, pl, uiLevel = r.Cells[x + 6].FormattedValue;
                        WidgetValue['systemValueMonthlyRelativeIndex'] = x;

                        pl = r.Cells[x + 1].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_checkout_hierarchy_bpsp_' + uiLevel,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            uiLevel: uiLevel,
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
                        return Repository.rocheBPSPIpPlanningCheckoutGridTableMonthly.getCell(r, x, 5);
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
                            hasComment: c.FormattedValue !== ''
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
                return [{name: 'PL8', key: 'PL8', on: true}]
                /*return v('rocheBPSPIpPlanningCheckoutGridTableMonthly.cellData').map(function (e) {
                    return {name: e[1].title === 'IP Node' ? e[1].title : 'PL' + e[1].title, key: e[1].title, on: false}
                }).reduce((acc, current) => {
                    const x = acc.find(item => item.name === current.name);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);*/
            }
        }
    },
    rocheBPSPIpPlanningCheckoutUploadPopupUpload: {
        upload: (db) => {
            let fileName = Repository.rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton.getFileName(db);
            Utils.modifyFileName('rocheBPSPIpPlanningCheckoutUploadPopupUpload', fileName);
            Utils.setWidgetValue('systemValueUploadFileName', fileName + '.csv');
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
                let fileName = v('systemValueUploadFileName');
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
            let g = 'rocheBPSPIpPlanningCheckoutGridTableMonthly';
            return Utils.isGridTableLoaded(g) && Utils.getGridTableCell(g, 2).title;
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
                   {[Measures Sales Plan IP].[Measures Sales Plan IP].[Comment]} 
                  ON COLUMNS , 
                   {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]} 
                            ON ROWS 
                        FROM [Sales Plan IP] 
                        WHERE 
                          (
                           [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                           [LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],
                           [Receivers].[Receivers].[${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}],
                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${productCode}],
                           [Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],
                           [Contract Types].[Contract Types].[${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}],
                           [Instrument Types].[Instrument Types].[${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}]
                          )
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
            let g = 'rocheBPSPIpPlanningCheckoutGridTableMonthly';
            return Utils.isGridTableLoaded(g) && Utils.getGridTableCell(g, 2).title;
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
                   {[Measures Sales Plan IP].[Measures Sales Plan IP].[CommentSource],
                   [Measures Sales Plan IP].[Measures Sales Plan IP].[EditedBy],
                   [Measures Sales Plan IP].[Measures Sales Plan IP].[EditedDateTime]} 
                  ON COLUMNS , 
                   {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]} 
                            ON ROWS 
                        FROM [Sales Plan IP] 
                        WHERE 
                          (
                           [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                           [LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],
                           [Receivers].[Receivers].[${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}],
                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${productCode}],
                           [Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],
                           [Contract Types].[Contract Types].[${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}],
                           [Instrument Types].[Instrument Types].[${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}]
                          )
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
    /*
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

     */

    rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton: {
        getFileName: (db) => {
            let s = [];
            s.push(Utils.getFormattedDate(new Date(), '_', true));
            s.push(db.activeUserName);
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key'));
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell3DropBox', 'key'));
            s.push(db.systemValueIpPlanningCheckoutProduct);
            return s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
        },
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear),
                    fileName = Repository.rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton.getFileName(db);
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

    rocheBPSPAddMaterialGridRow1Cell0Button: {
        launch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueMaterialReturnFromSearch', true);
            }
        }

    },

    rocheBPSPSettingsGridRow2Cell3Button: {
        launch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueMaterialReturnFromSearch', true);
            }
        }

    },

    rocheBPSPMaterialGridTable:
        {

            initCondition: (db) => {
                let a = Utils.setWidgetValueIfNotExist('systemValueMaterialReturnFromSearch', false);
                let b = a === false && Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion;
                Utils.setWidgetValue('systemValueMaterialReturnFromSearch', false);
                return b;
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
                            searchString = v('rocheBPSPMaterialGridRow3Cell1SearchBox.value').toUpperCase();
                            ;

                        }
                        return `{"MDX":"
                                    
                                    With 
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
                                         [}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag],
                                         [}ElementAttributes_Materials].[}ElementAttributes_Materials].[UI Level Format]} 
                                      ON COLUMNS , 
                                      -- {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}],'${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}
                                          {Filter({TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')},
                                                 Instr(UCASE([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Name]), '${searchString}') > 0)}
                                      ON ROWS 
                                    FROM [}ElementAttributes_Materials] 
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 7,
                        query: [


                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x + 6].FormattedValue
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
                            searchString = v('rocheBPSPMaterialGridRow3Cell1SearchBox.value').toUpperCase();
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
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[NextFlag],
								   [}ElementAttributes_Materials].[}ElementAttributes_Materials].[UI Level Format]} 
								  ON COLUMNS , 
								  {Filter({TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')},
								   Instr(UCASE([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP Name]), '${searchString}') > 0)}
								   PROPERTIES [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[Caption]  ON ROWS 
								FROM [}ElementAttributes_Materials]
                                    "}`;
                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 7,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x + 6].FormattedValue
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
                return {visible: Utils.isGridTableLoaded('RocheBPSPMaterialsAddMaterialSearch')};
            }
        },
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Material Search Table Select All Filtered')/tm1.ExecuteWithReturn`,
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
                return `{
                        "Parameters": [
                                {"Name": "pMaterialCategory", "Value": "${dbV}"},
                                {"Name": "pProfitCenterBudget", "Value": "${ProfitCenterSearch}"},
                                {"Name": "pIPProfitCenterBudget", "Value": "${IpNodeSearch}"},
                                {"Name": "pElement", "Value": "${IDsearch}"},
                                {"Name": "pMediumName", "Value": "${DescriptionSearch}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`;
            }

            /*    execute: (db) => {
                    return {
                        value: v('RocheBPSPMaterialsAddMaterialSearchSelectAll.switch.value')
                    }
                }*/
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
                body: (db, cell, widgetValue, row, col) => {
                    WidgetValue['RocheBPSPMaterialsAddMaterialSearch']['cellData'][row][col].value = widgetValue.value;
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
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Consolidated,RuleDerived,Updateable;$expand=Members($select=Name, Attributes/Caption))`,
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
                                   Subset(
                                   Filter({
                                     FILTER({
                                      FILTER({
                                       FILTER({
                                        FILTER({
                                         TM1FILTERBYLEVEL({
                                           FILTER({TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Materials].[Materials].[All Materials]}, ALL, RECURSIVE )}, 0)}, [Materials].[Materials].CurrentMember.Properties('IP Active Flag') = '1')
                                         }, 0)
                                }, InStr([Materials].[Materials].CurrentMember.Properties('Material Category - Key') , '${dbV}') <> 0)
                                }, InStr([Materials].[Materials].CurrentMember.Properties('Profit Center Budget - Key') ,'${ProfitCenterSearch}')<>0)
                                }, InStr([Materials].[Materials].CurrentMember.Properties('IP Profit Center Budget - Key'), '${IpNodeSearch}')<>0)
                                }, InStr([Materials].[Materials].CurrentMember.Properties('Element'), '${IDsearch}' ) <> 0 AND
                                   InStr([Materials].[Materials].CurrentMember.Properties('Medium Name'), '${DescriptionSearch}' ) <> 0 )
                                   } 
                                   ,[Material Information by Company].([Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}],[Measures Material Information by Company].[Measures Material Information by Company].[Status flag])${v('rocheBPSPAddMaterialGridRow4Cell5ValidToggle.switch.value') ? '=' : '>='}0)
                                   ,0,1000)  
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
                                let editable = r.Cells[x].Consolidated === false && r.Cells[x].RuleDerived === false;
                                return {
                                    ordinal: r.Cells[x].Ordinal,
                                    value: r.Cells[x].FormattedValue,
                                    editable: editable,
                                    visible: editable,
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
                                let editable = r.Cells[x].Consolidated === false && r.Cells[x].RuleDerived === false;
                                return {
                                    visible: editable ? '' : false,
                                }
                            },


                        ]
                    }

                },
        },
    rocheBPSPAddMaterialRemoveClipBoard: {
        launch: {
            url: (db) => `/api/v1/Cellsets('${Repository.rocheBPSPAddMaterialGridRow3Cell2Button.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                let values = Utils.getOrdinalValuePairsAndEmptyFilledValues([], v('rocheBPSPAddMaterialGridRow3Cell2Button.data.cells'));
                let selectedElements = v('rocheBPSPAddMaterialGridRow3Cell2Button.data.selectedElements'),
                    selectedValues = Utils.getArrayWithValues(v('rocheBPSPAddMaterialGridRow3Cell2Button.data.cells').filter((e) => e.FormattedValue !== '').length, 0);
                let ordinalValuePairs = Utils.getOrdinalValuePairs(selectedElements, selectedValues), patch = [];
                if (ordinalValuePairs !== '') {
                    patch.push(ordinalValuePairs);
                }
                if (values !== '') {
                    patch.push(values);
                }
                return patch.length === 0 ? '[]' : `[${patch.join(',')}]`;
            }
        }
    },
    rocheBPSPAddMaterialGridRow3Cell2Button: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `{"MDX":"
                SELECT 
                    {[Measures Material Import by Company].[Measures Material Import by Company].[Materials],
                    [Measures Material Import by Company].[Measures Material Import by Company].[Selected for Basket Input]} 
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
                            return Utils.getEvenElements(r.Cells);
                        },
                        selectedElements: (r, x) => {
                            return Utils.getOddElements(r.Cells);
                        }
                    }
            }
        },
        launchpaste: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                return Repository.rocheBPSPAddMaterialRemoveClipBoard.launch.body(db);
            }
        },
        insert: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                let values = Utils.getCellsByColumnsFromClipboard('rocheBPSPAddMaterialGridRow3Cell2Button', 0);
                let existingValues = v('rocheBPSPAddMaterialGridRow3Cell2Button.data.cells'),
                    selectedElements = v('rocheBPSPAddMaterialGridRow3Cell2Button.data.selectedElements'),
                    selectedValues = Utils.getArrayWithValues(values.length, 1);
                return `[${Utils.getOrdinalValuePairs(selectedElements, selectedValues)}, ${Utils.getOrdinalValuePairsAndEmptyFilledValues(values, existingValues)}]`;
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
                                let value = Utils.parseNumber(r.Cells[x].FormattedValue), editable = value !== -1;
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
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') &&
                db.systemValueGlobalCompanyProductPlanVersion &&
                Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialAddDummyPopupGridRow3Cell1Dropbox');
            return b;
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
                                       [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialAddDummyPopupGridRow3Cell1Dropbox', 'key')}].Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}')
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
            return Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') && db.systemValueGlobalCompanyProductPlanVersion
                && Utils.getGridTableCell('rocheBPSPMaterialGridTable', 2).title;
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
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${Utils.getGridTableCell('rocheBPSPMaterialGridTable', 2).title}].Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}')
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
            body: (db) => `{
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
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPMaterialGridRow1Cell2DropBox') &&
                db.systemValueGlobalCompanyProductPlanVersion &&
                Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 2).title
            return b;
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `{
                            "MDX" : "
                            SELECT 
                                {[}ElementAttributes_Materials].[}ElementAttributes_Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption],
                                [}ElementAttributes_Materials].[}ElementAttributes_Materials].[Element]} 
                              ON COLUMNS , 
                               {Filter(
                                 {Filter(
                                  {TM1SubsetToSet([Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}], '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')} MM')}, 
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('Product Level - Name') = 'PL6')},
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}') = 
                                   [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${Utils.getGridTableCell('RocheBPSPMaterialIPNodeGridTable', 2).title}].Properties('BA ${db.systemValueGlobalCompanyProductPlanVersion}')
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
                        ]}`
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
            body: (db) => `{
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
                        ]}`
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
                                {"Name": "pMaterial", "Value":"${Utils.getGridTableCell('RocheBPSPMaterialsAddMaterialSearch', 1).title}"},                        
                        ]}`
            },
    },
    rocheBPSPMaterialsAddMaterialSearchTruncatedWarning: {
        initCondition: (db) => {
            return Repository.RocheBPSPMaterialsAddMaterialSearchSelectAll.init.execute(db);
        },
        initDefault: (db) => {
            return {visible: false};
        },
        init: {
            execute: (db) => {
                return {visible: v('RocheBPSPMaterialsAddMaterialSearch.cellData.length') === 1000};
            }
        }
    },

    rocheBPSPAddMaterialGridRow4Cell7Button: {
        init: {
            execute: (db) => {
                return Repository.RocheBPSPMaterialsAddMaterialSearchSelectAll.init.execute(db);
            }
        },
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
        init: {
            execute: (db) => {
                return Repository.RocheBPSPMaterialsAddMaterialSearchSelectAll.init.execute(db);
            }
        },
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Clear All Inputs')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                        
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key')}"}, 
                                {"Name": "pCube", "Value": "Material Information by Company"},                       
                        ]}`
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

    rocheBPSPIpPlanningCommentShowGridTable: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly') && Utils.getGridTableCell('rocheBPSPipPlanningGridTableMonthly', 2).title;
        },

        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {

                let productCode = Utils.getGridTableCell('rocheBPSPipPlanningGridTableMonthly', 2).title;
                return `{"MDX":"
                        SELECT 
                           {[Measures Sales Plan IP].[Measures Sales Plan IP].[Comment]} 
                          ON COLUMNS , 
                           {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]} 
                            ON ROWS 
                        FROM [Sales Plan IP] 
                        WHERE 
                          (
                           [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                           [LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],
                           [Receivers].[Receivers].[${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}],
                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${productCode}],
                           [Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],
                           [Contract Types].[Contract Types].[${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}],
                           [Instrument Types].[Instrument Types].[${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}]
                          )
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

    rocheBPSPIpPlanningCommentShowGridTableSource: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPipPlanningGridTableMonthly') && Utils.getGridTableCell('rocheBPSPipPlanningGridTableMonthly', 2).title;
        },

        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {

                let productCode = Utils.getGridTableCell('rocheBPSPipPlanningGridTableMonthly', 2).title;
                return `{"MDX":"
                      SELECT 
                   {[Measures Sales Plan IP].[Measures Sales Plan IP].[CommentSource],
                   [Measures Sales Plan IP].[Measures Sales Plan IP].[EditedBy],
                   [Measures Sales Plan IP].[Measures Sales Plan IP].[EditedDateTime]} 
                  ON COLUMNS , 
                   {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}]} 
                            ON ROWS 
                        FROM [Sales Plan IP] 
                        WHERE 
                          (
                           [Versions].[Versions].[${db.systemValueGlobalCompanyVersion}],
                           [LineItems Sales Plan IP].[LineItems Sales Plan IP].[Final Quantity Plan],
                           [Receivers].[Receivers].[${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}],
                           [Materials].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP].[${productCode}],
                           [Periods].[Periods].[${db.systemValueIpPlanningSegmentedControlRelativeYearValue}],
                           [Contract Types].[Contract Types].[${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}],
                           [Instrument Types].[Instrument Types].[${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}]
                          )
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

    rocheBPSPIpPlanningCommentEditGridRow2CommentInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPIpPlanningCommentShowGridTable.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPIpPlanningCommentShowGridTable.cellData')[0][0].title;
                }
                return r;
            }
        }
    },

    rocheBPSPIpPlanningCommentEditGridRow3TextInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPIpPlanningCommentShowGridTableSource.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPIpPlanningCommentShowGridTableSource.cellData')[0][0].title.split('<br/>')[0];
                }
                return r;
            }
        }
    },

    rocheBPSPIpPlanningCheckoutCommentEditControlPanelSaveButton: {
        launch: {
            url: (db) => `/api/v1/Cubes('Sales Plan IP')/tm1.Update`,
            type: 'POST',
            body: (db) => {
                let g = 'rocheBPSPIpPlanningCheckoutGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 2).title;
                return `
                [
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('EditedDateTime')"
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
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                     "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('EditedBy')"
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
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('CommentSource')"
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
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('Comment')"
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


    rocheBPSPIpPlanningCommentEditControlPanelSaveButton: {
        launch: {
            url: (db) => `/api/v1/Cubes('Sales Plan IP')/tm1.Update`,
            type: 'POST',
            body: (db) => {
                let g = 'rocheBPSPipPlanningGridTableMonthly';
                let productCode = Utils.getGridTableCell(g, 2).title;
                return `
                [
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('EditedDateTime')"
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
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('EditedBy')"
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
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('CommentSource')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPIpPlanningCommentEditGridRow3TextInput.value') ? v('rocheBPSPIpPlanningCommentEditGridRow3TextInput.value') : ''}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${db.systemValueGlobalCompanyVersion}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${db.systemValueIpPlanningSegmentedControlRelativeYearValue}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPipPlanningGridRow1Cell2DropBox', 'key')}')",
                                    "Dimensions('Materials')/Hierarchies('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} IP')/Elements('${productCode}')",
                                    "Dimensions('Contract Types')/Hierarchies('Contract Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell1SegmentedControl.selected')}')",
                                    "Dimensions('Instrument Types')/Hierarchies('Instrument Types')/Elements('${v('rocheBPSPipPlanningGridRow2Cell2SegmentedControl.selected')}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${v('rocheBPSPipPlanningGridRow1Cell3DropBox.value')}')",
                                    "Dimensions('LineItems Sales Plan IP')/Hierarchies('LineItems Sales Plan IP')/Elements('Final Quantity Plan')",
                                    "Dimensions('Measures Sales Plan IP')/Hierarchies('Measures Sales Plan IP')/Elements('Comment')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPIpPlanningCommentEditGridRow2CommentInput.value') ? v('rocheBPSPIpPlanningCommentEditGridRow2CommentInput.value') : ''}"
                    }
                ]
                `;
            }
        }
    },


    rocheBPSPReportsGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },


    rocheBPSPProductReportGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPProductReportGridRow1Cell2DropBox.value'));
            }
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
            {
            "MDX" : "

                        SELECT
                        {
                        [}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Name],
                        [}ElementAttributes_Companies].[}ElementAttributes_Companies].[Company - Key],
                        [}ElementAttributes_Companies].[}ElementAttributes_Companies].[NextGen - Flag]}
                          ON COLUMNS ,
                           {TM1SubsetToSet([Companies].[Companies], 'All Active')}
                          ON ROWS
                        FROM [}ElementAttributes_Companies]



            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 3) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
                                    key: r.Cells[i + 1].FormattedValue,
                                    flag: Utils.parseNumber(r.Cells[i + 2].FormattedValue),
                                    on: selected === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },

    rocheBPSPProductReportPageInit: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell2DropBox');
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
                    [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}]
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


    rocheBPSPProductReportGridRow1Cell3DropBox: {
        initCondition: (db) => {
            return v('rocheBPSPProductReportGridRow1Cell2DropBox.value');
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
               {
                [}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description],
                [}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Receiver - Key]}
              ON COLUMNS ,
               {TM1SubsetToSet([Receivers].[Receivers], 'zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')} Report Receivers')}
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
                                    on: v('rocheBPSPProductReportGridRow1Cell3DropBox.value') === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },

    rocheBPSPProductReportGridRow1Cell5DropBox: {
        initCondition: (db) => {
            return v('rocheBPSPProductReportGridRow1Cell2DropBox.value');
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
                   {[}ElementAttributes_Currency Keys].[}ElementAttributes_Currency Keys].Members}
                  ON COLUMNS ,
                   {TM1SubsetToSet([Currency Keys].[Currency Keys],
                    '${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')} Reporting Currencies')}
                  ON ROWS
                FROM [}ElementAttributes_Currency Keys]

            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [];
                            for (let i = 0; i < r.Cells.length; i = i + 1) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
                                    on: v('rocheBPSPProductReportGridRow1Cell5DropBox.value') === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },


    rocheBPSPProductReportGridRow1Cell9Button: {
        init: {
            execute: (db) => {
                return {label: WidgetValue['activeUserName']};
            }
        }
    },


    rocheBPSPProductReportGridRow2Cell1SegmentedControl: {
        init: {
            execute: (db) => {
                return [
                    {label: 'List'},
                    {label: 'Chart'},
                ];
            }
        },

    },

    rocheBPSPProductReportGridTable:
        {
            initCondition: (db) => {
                let b = Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell3DropBox') &&
                    Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell5DropBox')
                return b;
            },


            initDefault: (db) => {
                return [];
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => {

                        let yearzero = Utils.parseNumber(db.systemValueGlobalStartingPlanYear),
                            YearMinusOne = yearzero - 1,
                            YearMinusTwo = yearzero - 2,
                            YearPlusOne = yearzero + 1,
                            YearPlusTwo = yearzero + 2,
                            YearPlusThree = yearzero + 3,
                            yearPlusFour = yearzero + 4;

                        return `{"MDX":"    
                                                
                    With
                    --Create deault subset for the Rows by systemValueGlobalCompanyProductPlanVersion
                         Set DefaultProductRows AS
                         {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1]}, ALL, RECURSIVE )}
                    --Create deault subset for the Rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                         Set FocusedOnProductRows AS
                         {TM1DRILLDOWNMEMBER({[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${db.systemValueCustomerReportFocusedProduct}]}, ALL, RECURSIVE )}
                    --Decide which rowSet to use
                         MEMBER [Products].[BPSP Budget].[ProductIsFocused] AS 
                         IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                    -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                         MEMBER [LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductName] as 
                                [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                         MEMBER [LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductCaption] as 
                                [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                         MEMBER [LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductLevel] as 
                                [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                         MEMBER [LineItems Sales Report by Product].[LineItems Sales Report by Product].[UILevelFormat] as 
                                [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} UI Level Format')
                    
                    SELECT 
                    
                       {([Periods].[Periods].[${YearMinusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductName]),
                        ([Periods].[Periods].[${YearMinusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductCaption]),
                        ([Periods].[Periods].[${YearMinusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductLevel]),
                        ([Periods].[Periods].[${YearMinusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[UILevelFormat]),
                        -- 2019 Actual
                         ([Periods].[Periods].[${YearMinusTwo}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                         ([Periods].[Periods].[${YearMinusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                         ([Periods].[Periods].[${yearzero}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice YTD]),
                         -- 2021 T0
                         ([Periods].[Periods].[${yearzero}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW T0]),
                         ([Periods].[Periods].[${yearzero}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                         ([Periods].[Periods].[${YearPlusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                         ([Periods].[Periods].[${YearPlusTwo}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                         ([Periods].[Periods].[${YearPlusThree}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                         ([Periods].[Periods].[${yearzero}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Growth Final Sales Plan]),
                         ([Periods].[Periods].[${YearPlusOne}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Growth Final Sales Plan]),
                         ([Periods].[Periods].[${YearPlusTwo}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Growth Final Sales Plan]),
                         ([Periods].[Periods].[${YearPlusThree}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Growth Final Sales Plan])
                         
                       }
                       PROPERTIES [Periods].[Periods].[Caption] ,[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Caption]  ON COLUMNS , 
                       StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])
                       PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption]  ON ROWS 
                    FROM [Sales Report by Product] 
                    WHERE 
                      (
                       [Versions].[Versions].[Live],
                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}],
                       [Receivers].[Receivers].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell3DropBox', 'key')}],
                       [Currency Keys].[Currency Keys].[${v('rocheBPSPProductReportGridRow1Cell5DropBox.value')}],
                       [Measures Sales Report by Product].[Measures Sales Report by Product].[Value]
                      )


                    "}`;
                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 16,
                        query: [

                            (r, x) => {
                                let uiLevel = r.Cells[x + 3].FormattedValue;
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    productLevel: r.Cells[x + 2].FormattedValue.replace('a', ''),
                                    uiLevel: uiLevel,
                                    skin: 'gridtable_hierarchy_bpsp_' + uiLevel
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 2].FormattedValue}
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
                            }
                        ]
                    }

                },
        },

    rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPProductReportGridTable')
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                return v('rocheBPSPProductReportGridTable.cellData').filter(e => ['01C', '02C', '03C', '01N', '02N', '03N'].includes(e[0].uiLevel)).map(e => {
                    return [{
                        label: e[0].label,
                        skin: 'gridtable_hierarchy_shortcut_bpsp_' + e[0].uiLevel,
                        productCode: e[1].title
                    }];
                });
            }
        }
    },

    rocheBPSPProductReportInfoPopupText1: {
        initCondition: (db) => {
            return v('rocheBPSPProductReportGridRow1Cell2DropBox.value.length') !== false;
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
                        {[Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}]} 
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


    rocheBPSPProductReportInfoPopupText2: {
        initCondition: (db) => {
            return v('rocheBPSPProductReportGridRow1Cell2DropBox.value.length') !== false;
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
                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}]
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

    rocheBPSPProductReportGridTableHeaderFocusButton:
        {
            init: {
                execute: (db) => {
                    return {visible: db.systemValueCustomerReportFocusedProduct === db.systemValueCustomerReportFocusedProductDefault};
                }
            }
        },

    rocheBPSPProductReportGridTableHeaderReturnFromFocus:
        {
            init: {
                execute: (db) => {
                    return {visible: db.systemValueCustomerReportFocusedProduct !== db.systemValueCustomerReportFocusedProductDefault};
                }
            },
            launch: {
                execute: (db) => {
                    //WidgetValue['systemValueCustomerReportFocusedProduct'] = db.systemValueCustomerReportFocusedProductDefault;
                    Utils.setWidgetValue('systemValueCustomerReportFocusedProduct', db.systemValueCustomerReportFocusedProductDefault);
                }
            }
        },


    rocheBPSPProductReportCheckoutPopupFocusButton: {
        launch:
            {
                execute: (db) => {
                    //WidgetValue['systemValueCustomerReportFocusedProduct'] = Utils.getGridTableCell('rocheBPSPProductReportGridTable', 1).title;
                    Utils.setWidgetValue('systemValueCustomerReportFocusedProduct', Utils.getGridTableCell('rocheBPSPProductReportGridTable', 1).title);
                }
            }
    },

    rocheBPSPProductReportMaterialSelectorShortcutPopupGridTableButton01: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueCustomerReportFocusedProduct'] = Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable', 0).productCode;
                }
            },
    },

    rocheBPSPProductReportChart: {

        initCondition: (db) => {
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell3DropBox') &&
                Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell5DropBox');

            return b;
        },


        initDefault: (db) => {
            return [];
        },

        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => {
                    let selectedProduct = Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0) === false ? 'PL1' :
                        Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0).productCode;
                    let yearzero = Utils.parseNumber(db.systemValueGlobalStartingPlanYear),
                        YearMinusOne = yearzero - 1,
                        YearPlusOne = yearzero + 1,
                        YearPlusTwo = yearzero + 2,
                        YearPlusThree = yearzero + 3,
                        yearPlusFour = yearzero + 4;
                    return `{"MDX":"         
                    With
                    --Create deault subset for the Rows by systemValueGlobalCompanyProductPlanVersion
                         Set DefaultProductRows AS
                         {[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1]}
                    --Create deault subset for the Rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                         Set FocusedOnProductRows AS
                         {[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${selectedProduct}]}
                    --Decide which rowSet to use
                         MEMBER [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused] AS 
                         IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                    -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                         MEMBER [LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductCaption] as 
                                [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
               
                                SELECT
                               StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])
                               PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption]
                          
                               ON COLUMNS ,
                                     {
                                         ([Periods].[Periods].[${YearMinusOne + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${yearzero + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan])
                                       }
                                       PROPERTIES [Periods].[Periods].[Caption] ,[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Caption]  ON ROWS
                                    FROM [Sales Report by Product]
                                    WHERE
                                      (
                                       [Versions].[Versions].[Live],
                                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}],
                                       [Receivers].[Receivers].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell3DropBox', 'key')}],
                                       [Currency Keys].[Currency Keys].[${v('rocheBPSPProductReportGridRow1Cell5DropBox.value')}],
                                       [Measures Sales Report by Product].[Measures Sales Report by Product].[Value]
                                      )


            "}`;
                }
                ,
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[5].Name,
                                label: r.Cells[x].Members[5].Name
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => {
                    let selectedProduct = Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0) === false ? 'PL1' :
                        Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0).productCode;
                    let yearzero = Utils.parseNumber(db.systemValueGlobalStartingPlanYear),
                        YearMinusOne = yearzero - 1,
                        YearPlusOne = yearzero + 1,
                        YearPlusTwo = yearzero + 2,
                        YearPlusThree = yearzero + 3,
                        yearPlusFour = yearzero + 4;
                    return `{"MDX":"
                    
                With
                    --Create deault subset for the Rows by systemValueGlobalCompanyProductPlanVersion
                         Set DefaultProductRows AS
                         {[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1]}
                    --Create deault subset for the Rows by systemValueGlobalCompanyProductPlanVersion and systemValueGlobalCompanyFocusedElement
                         Set FocusedOnProductRows AS
                         {[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[${selectedProduct}]}
                    --Decide which rowSet to use
                         MEMBER [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused] AS 
                         IIF(Count(FocusedOnProductRows)=0,'DefaultProductRows','FocusedOnProductRows')
                    -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                         MEMBER [LineItems Sales Report by Product].[LineItems Sales Report by Product].[ProductCaption] as 
                                [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
               
                                SELECT
                               StrToSet([Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[ProductIsFocused])
                               PROPERTIES [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Caption]
                              
        
                   
                   
                   ON COLUMNS ,
                                     {
                                         ([Periods].[Periods].[${YearMinusOne + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${YearMinusOne + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[BW Invoice]),
                                         ([Periods].[Periods].[${yearzero + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${yearzero + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusOne + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusTwo + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '01'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '02'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '03'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '04'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '05'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '06'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '07'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '08'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '09'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '10'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '11'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan]),
                                         ([Periods].[Periods].[${YearPlusThree + '12'}],[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Final Sales Plan])
                                       }
                   PROPERTIES [Periods].[Periods].[Caption] ,[LineItems Sales Report by Product].[LineItems Sales Report by Product].[Caption]  ON ROWS
                FROM [Sales Report by Product]
                WHERE
                  (
                   [Versions].[Versions].[Live],
                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}],
                   [Receivers].[Receivers].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell3DropBox', 'key')}],
                   [Currency Keys].[Currency Keys].[${v('rocheBPSPProductReportGridRow1Cell5DropBox.value')}],
                   [Measures Sales Report by Product].[Measures Sales Report by Product].[Value]
                  )      
            "}`;
                }
                ,
                parsingControl: {
                    type: 'matrix',
                    length: 1,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        }
                    ]
                }

            }
        ],
    },

    rocheBPSPProductReportProductSelectorChartButton: {
        init: {
            execute: (db) => {
                /*
                Utils.setWidgetValue('systemValueCustomerReportChartValue', {
                    productName: Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0).label,
                    productCode: Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 1).title
                });
                 */
                return {
                    //label: v('systemValueCustomerReportFocusedProduct') === '' ? 'PL1'  :  v('systemValueCustomerReportFocusedProduct')
                    label: Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0) === false ? 'DIVISION DIAGNOSTICS' : Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0).label
                };
            }
        }
    },


    rocheBPSPProductReportMaterialSelectorPopopInChartGridTable:
        {
            initCondition: (db) => {
                let b = Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell3DropBox') &&
                    Utils.isValueExistingAndNotEmpty('rocheBPSPProductReportGridRow1Cell5DropBox')
                return b;
            },


            initDefault: (db) => {
                return [];
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"    
                                                
                            SELECT 
                               {[}ElementAttributes_Products].[}ElementAttributes_Products].[BPSP Budget Description],
                               [}ElementAttributes_Products].[}ElementAttributes_Products].[BPSP Budget Element],
                               [}ElementAttributes_Products].[}ElementAttributes_Products].[BPSP Budget Product Level - Name]} 
                              ON COLUMNS , 
                               {FILTER({TM1DRILLDOWNMEMBER({[Products].[BPSP Budget].[PL1]}, ALL, RECURSIVE )}, 
                               INSTR([Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Product Level - Name'), 'PL1')>0 OR   
                               INSTR([Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Product Level - Name'), 'PL2')>0 OR   
                               INSTR([Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Product Level - Name'), 'PL2a')>0 OR   
                               INSTR([Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Product Level - Name'), 'PL3')>0)} 
                              ON ROWS 
                            FROM [}ElementAttributes_Products] 


                    "}`;
                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 3,
                        query: [

                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    productCode: r.Cells[x + 1].FormattedValue,
                                    skin: 'gridtable_hierarchy_shortcut_bpsp_' + r.Cells[x + 2].FormattedValue.replace('a', '')
                                }
                            },


                        ]
                    }

                },
        },


    rocheBPSPProductReportMaterialSelectorPopopInChartGridTableButton01: {
        launch:
            {
                execute: (db) => {
                    Utils.setWidgetValue('systemValueCustomerReportChartValue', {
                        productName: Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0).label,
                        productCode: Utils.getGridTableCell('rocheBPSPProductReportMaterialSelectorPopopInChartGridTable', 0).productCode
                    });
                }
            },
    },

    rocheBPSPProductReportExportPopupCheckoutButton: {

        /*
        init: {
            execute: (db) => {
                return {visible: db.systemValueSegmentedControlPeriodUnit === 'Monthly'};
            }
        },
         */

        getFileName: (db) => {
            let s = [], fileName;
            s.push(Utils.getFormattedDate(new Date(), '_', true));
            s.push(db.activeUserName);
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key'));
            s.push(v('rocheBPSPProductReportGridRow1Cell5DropBox.value'));
            return s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
        },
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear),
                    fileName = Repository.rocheBPSPProductReportExportPopupCheckoutButton.getFileName(db);
                return {
                    url: 'export?export_key=rocheProductLevelExport&file_name=' + fileName + '.xlsx',   // custom_object json
                    fileName: fileName + '.xlsx',
                    activeUserName: db.activeUserName,
                    companyVersion: db.systemValueGlobalCompanyVersion, //Live
                    productPlanVersion: db.systemValueGlobalCompanyProductPlanVersion, //Budget
                    company: Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key'),
                    globalVersion: WidgetValue.systemValueGlobalCompanyVersion,
                    version: WidgetValue.systemValueGlobalCompanyProductPlanVersion,
                    currency: v('rocheBPSPProductReportGridRow1Cell5DropBox.value'),
                    yearMinusOne: y1 - 2,
                    year0: y1 - 1,
                    year1: y1, //2021
                    year2: y1 + 1,
                    year3: y1 + 2,
                    year4: y1 + 3,
                    key: 'rocheProductLevelExportMDX' // ez a yml
                };
            }
        }
    },


    /* customer planning */
    rocheBPSPCustomerPlanningPageInit: {
        initCondition: (db) => {
            return v('systemValueCustomerPlanningUploadTargetPath') === false;
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
                            {[Measures Control].[Measures Control].[UI Excel upload path Customer]}
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
                            Utils.setWidgetValue('systemValueCustomerPlanningUploadTargetPath', r.Cells[0].FormattedValue)
                            return true;
                        }
                    }
            }
        }
    },
    rocheBPSPCustomersPlanningGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPCustomersPlanningHeaderInfoGridTable: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector') && Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersTerritorySelector');
        },
        initDefault: (db) => {
            return [];
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                type: 'POST',
                body: (db) => `{"MDX":"
                    SELECT 
                           {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[PY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[CY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[NY]} 
                           PROPERTIES [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Caption]  ON COLUMNS , 
                           {[Customers Plan].[Customers Plan].[All Customers Plan]} 
                          ON ROWS 
                        FROM [Sales Territory to Customer] 
                        WHERE 
                          (
                           [Versions].[Versions].[${v('systemValueGlobalCompanyVersion')}],
                           [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')}],
                           [Territories].[Territories].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key')}],
                           [Receivers].[Receivers].[${v('rocheBPSPCustomersHorizontalTable.open.receiver')}]
                          )
                "}`,
                parsingControl: {
                    type: 'matrix',
                    length: 3,
                    query: [

                        (r, x) => {
                            return {body: r.Cells[x].FormattedValue, title: r.Cells[x].Members[5].Attributes.Caption};
                        }, (r, x) => {
                            return {
                                body: r.Cells[x + 1].FormattedValue,
                                title: r.Cells[x + 1].Members[5].Attributes.Caption
                            };
                        }, (r, x) => {
                            return {
                                body: r.Cells[x + 2].FormattedValue,
                                title: r.Cells[x + 2].Members[5].Attributes.Caption
                            };
                        }
                    ]
                }
            }
    },
    rocheBPSPCustomersPlanningMonthlyExcelUpload: {
        init: {
            execute: (db) => {
                return {visible: Repository.rocheBPSPCustomersPlanning.isMonthly(db) && Repository.rocheBPSPCustomersPlanning.isFocused()};
            }
        }
    },
    rocheBPSPCustomersPlanningMonthlyExcelExport: {
        init: {
            execute: (db) => {
                return {visible: Repository.rocheBPSPCustomersPlanning.isMonthly(db) && Repository.rocheBPSPCustomersPlanning.isFocused()};
            }
        },
        getFileName: (db) => {
            let s = [], fileName;
            s.push(Utils.getFormattedDate(new Date(), '_', true));
            s.push(db.activeUserName);
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'));
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),);
            s.push(v('rocheBPSPCustomersHorizontalTable.open.receiver'));
            s.push(v('systemValueCustomersPlanningFocused'));
            s.push(v('systemValueCustomersPlanningCustomerCode'));
            s.push(v('systemValueCustomersPlanningMonthlyTypeValue'));
            return s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
        },
        launch: {
            download: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    focusedProduct = v('systemValueCustomersPlanningFocused'),
                    hasFocusedProduct = focusedProduct !== 'PL1',
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    type = v('systemValueCustomersPlanningMonthlyTypeValue'),
                    y1 = parseInt(db.systemValueGlobalStartingPlanYear),
                    fileName = Repository.rocheBPSPCustomersPlanningMonthlyExcelExport.getFileName(db);
                return {
                    url: 'export?export_key=exportCustomerMonthly&file_name=' + fileName + '.xlsx',
                    fileName: fileName + '.xlsx',
                    activeUserName: db.activeUserName,
                    company: company,
                    version: version,
                    territoryCode: territoryCode,
                    receiver: receiver,
                    productVersion: productVersion,
                    customerCode: customerCode,
                    rows: hasFocusedProduct ? 'FocusedRows' : 'ProductRows',
                    focusedProduct: focusedProduct,
                    type: type,
                    year1: y1,
                    year2: y1 + 1,
                    year3: y1 + 2,
                    year4: y1 + 3,
                    key: 'exportCustomerMonthly'
                };
            }
        }
    },
    rocheBPSPCustomersPlanningUploadPopupPlDropbox: {
        initCondition: (db) => {
            let l = v('rocheBPSPCustomersPlanningGridTableMonthly.cellData.length');
            return l !== false && l !== 0;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                return [
                    {name: 'PL1', key: 1, on: true},
                    {name: 'PL2', key: 2, on: false},
                    {name: 'PL3', key: 3, on: false},
                    {name: 'PL4', key: 4, on: false},
                    {name: 'PL5', key: 5, on: false},
                    {name: 'PL6', key: 6, on: false}
                ]
            }
        }
    },
    rocheBPSPCustomersPlanningUploadPopupUpload: {
        upload: (db) => {
            let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                version = v('systemValueGlobalCompanyVersion'),
                receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                focusedProduct = v('systemValueCustomersPlanningFocused'),
                customerCode = v('systemValueCustomersPlanningCustomerCode'),
                type = v('systemValueCustomersPlanningMonthlyTypeValue'),
                fileName = Repository.rocheBPSPCustomersPlanningMonthlyExcelExport.getFileName(db);
            Utils.modifyFileName('rocheBPSPCustomersPlanningUploadPopupUpload', fileName);
            Utils.setWidgetValue('systemValueUploadFileName', fileName + '.csv');
            return {
                staging: app.defaultUploadStagingFolder,
                target: v('systemValueCustomerPlanningUploadTargetPath'),
                productLevel: v('rocheBPSPCustomersPlanningUploadPopupPlDropbox.value'),
                validation: 'validateCustomerPlanningExcelImport',
                validationUser: db.activeUserName,
                validationCompany: company,
                validationReceiver: receiver,
                validationGlobalVersion: version,
                validationVersion: productVersion,
                validationProduct: focusedProduct,
                validationLineItem: type,
                validationTerritoryCode: territoryCode,
                validationCustomerCode: customerCode,
                validationMessage: 'First row of excel does not match'
                //      preProcessTemplate: v('preprocess.choose.value') === false ? 'Template1' : v('preprocess.choose.value')
            };
        },
        request: {
            url: (db) => `/api/v1/Processes('MODULE - UI - CSV Upload Post Processing Customer')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    focusedProduct = v('systemValueCustomersPlanningFocused'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    type = v('systemValueCustomersPlanningMonthlyTypeValue'),
                    fileName = v('systemValueUploadFileName');
                return `{
                        "Parameters": [
                                {"Name": "pUser", "Value": "${db.activeUserName}"},                               
                                {"Name": "pSelectedProductLevel", "Value": "${v('rocheBPSPCustomersPlanningUploadPopupPlDropbox.value')}"},
                                {"Name": "pFileName", "Value": "${fileName}"},
                                {"Name": "pProduct", "Value": "${focusedProduct}"},
                                {"Name": "pCompany", "Value": "${company}"},
                                {"Name": "pReceiver", "Value": "${receiver}"},
                                {"Name": "pTargetCube", "Value": "Base Plan"},
                                {"Name": "pLineItem", "Value": "${type}"},
                                {"Name": "pCustomer", "Value": "${customerCode}"},
                                {"Name": "pTerritories", "Value": "${territoryCode}"},
                        ]
                    }`;
            }
        }
    },
    rocheBPSPCustomersPlanningGridTableMonthly: {
        perform: {
            url: (db, cell, widgetValue) => {
                return `/api/v1/Processes('MODULE - UI - Sales Plan by Customer Split')/tm1.ExecuteWithReturn`;
            },
            type: (db, cell, widgetValue) => {
                return 'POST';
            },
            body: (db, cell, widgetValue) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    product = Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableMonthly', 0).productCode,
                    period = Utils.getGridTableCurrentCell('rocheBPSPCustomersPlanningGridTableMonthly').members[8].Name,
                    type = v('systemValueCustomersPlanningMonthlyTypeValue'),
                    parameters = [];

                parameters.push(Utils.getProcessNameValuePair('pProduct', product));
                parameters.push(Utils.getProcessNameValuePair('pCompany', company));
                parameters.push(Utils.getProcessNameValuePair('pReceiver', receiver));
                parameters.push(Utils.getProcessNameValuePair('pTerritory', territoryCode));
                parameters.push(Utils.getProcessNameValuePair('pPeriod', period));
                parameters.push(Utils.getProcessNameValuePair('pCustomer', customerCode));
                parameters.push(Utils.getProcessNameValuePair('pLineItem', type));
                parameters.push(Utils.getProcessNameValuePair('pValue', Utils.parseNumber(widgetValue.value)));

                return Utils.buildProcessParameters(parameters);
            }
        },
        pastelast: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.parseNumber(widgetValue.value)}\"}
                ]`;
            }
        },
        paste: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.parseNumber(widgetValue.value)}\"}
                ]`;
            }
        },
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                return `[
                    {"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.parseNumber(widgetValue.value)}\"}
                ]`;
            }
        },
        initCondition: (db) => {
            return Repository.rocheBPSPCustomersPlanning.isMonthly(db);
        },
        initDefault: (db) => {
            return [];
        },
        getCell: (index, r) => {
            let c = r.Cells[index], editable = c.Consolidated === false && c.RuleDerived === false,
                performable = c.Consolidated === true && c.RuleDerived === false, isGrey = c.RuleDerived === true;
            if (v('systemValueCustomersPlanningMonthlyType') === 'Final Sales Plan' && c.Consolidated === true) {
                isGrey = true;
                performable = false;
            }

            let result = {
                title: c.FormattedValue,
                cellSkin: isGrey ? 'readonly_bpsp' : '',
                skin: 'monthly_right_bpsp',
                cellVisible: true,
                editable: editable,
                ordinal: c.Ordinal,
                width: '100%',
                height: '100%',
                applyMeasuresToSection: true,
                members: c.Members,
                performable: performable
            };
            if (performable) {
                result['icon'] = 'icon-cloud-arrow-up';
            }
            if (editable) {
                result['titleFontColor'] = '#A05EB5';
            }
            return result;
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name,Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    focusedProduct = v('systemValueCustomersPlanningFocused'),
                    relativeYear = v('systemValueGlobalSegmentedControlRelativeYear'),
                    relativeYearValue = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                    hasFocusedProduct = Repository.rocheBPSPCustomersPlanning.isFocused(),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    type = v('systemValueCustomersPlanningMonthlyTypeValue')
                ;
                return `
                    {
                        "MDX" : 
                            "With
                                --Default mdx to run from JS
                                Set ProductRows As
                                {Filter(
                                  {Filter({[Products].[BPSP ${productVersion}].Members} ,
                                  [Sales Territory to Product].([Versions].[Versions].[${version}],
                                                                [Companies].[Companies].[${company}],
                                                                [Territories].[Territories].[${territoryCode}],
                                                                [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Flag])>0)},
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL1' or 
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL2' or 
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL2a' or 
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL3'
                                          )}   
                                -- mdx to run from JS when user focusing
                                Set FocusedRows As
                                {Filter({TM1DRILLDOWNMEMBER({[Products].[BPSP ${productVersion}].[${focusedProduct}]} , All, Recursive)}
                                ,[Sales Territory to Product].([Versions].[Versions].[${version}],
                                                                [Companies].[Companies].[${company}],
                                                                [Territories].[Territories].[${territoryCode}],
                                                                [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Flag])>0)}
                                -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                                     MEMBER [Periods].[Periods].[ProductName] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} Description')
                                     MEMBER [Periods].[Periods].[ProductCaption] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} Element')
                                     MEMBER [Periods].[Periods].[ProductLevel] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name')
                                     MEMBER [Periods].[Periods].[UILevelFormat] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} UI Level Format')
                                     MEMBER [Periods].[Periods].[HasComment] as
                                            [Sales Plan by Customer].([Periods].[Periods].[${relativeYearValue}],[LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[Final Sales Plan],[Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Comment Flag])
                                -- Create the first 3 column with information
                                     Set FixColumns AS
                                     {[Periods].[Periods].[ProductName],
                                      [Periods].[Periods].[ProductCaption],
                                      [Periods].[Periods].[ProductLevel],
                                      [Periods].[Periods].[UILevelFormat]
                                      }
                                     Set Comment AS
                                     {[Periods].[Periods].[HasComment]}
                                SELECT 
                                  Union(
                                     {Union({FixColumns}, 
                                           {TM1DRILLDOWNMEMBER({[Periods].[Periods].[${relativeYearValue}]}, ALL, RECURSIVE )}
                                     ,All)},
                                     {Comment}
                                  ,All)
                                  ON COLUMNS, 
                                   ${hasFocusedProduct ? '{FocusedRows}' : '{ProductRows} '} 
                                  ON ROWS 
                                FROM [Sales Plan by Customer] 
                                WHERE 
                                  (
                                   [Versions].[Versions].[${version}],
                                   [Receivers].[Receivers].[${receiver}],
                                   [Territories].[Territories].[${territoryCode}],
                                   [Companies].[Companies].[${company}],
                                   [Customers Plan].[Customers Plan].[${customerCode}],
                                   [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[${type}],
                                   [Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value]
                                  )
                                "
                    }
               `;
            },
            parsingControl: {
                type: 'matrix',
                length: 18,
                query: [
                    (r, x) => {
                        let result, pl, pc, uiLevel = r.Cells[x + 3].FormattedValue;
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = x;
                        pc = r.Cells[x + 1].FormattedValue;
                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_hierarchy_bpsp_' + uiLevel,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            uiLevel: uiLevel,
                            productCode: pc
                        };
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: ''
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex']].FormattedValue,
                            cellSkin: ''
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 2;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableMonthly.getCell(WidgetValue['systemValueCustomersPlanningMonthlyRelativeIndex'], r);
                    },
                ]
            }
        }
    },
    rocheBPSPCustomersPlanningGridTableYearly: {
        perform: {
            validation: (db, cell, widgetValue) => {
                return {success: cell.copyMerge === false && cell.distributionEdit === false};
            },
            url: (db, cell, widgetValue) => {
                return `/api/v1/Processes('MODULE - UI - Sales Plan by Customer Split')/tm1.ExecuteWithReturn`;
            },
            type: (db, cell, widgetValue) => {
                return 'POST';
            },
            body: (db, cell, widgetValue) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    product = Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).productCode,
                    period = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                    parameters = [];

                parameters.push(Utils.getProcessNameValuePair('pProduct', product));
                parameters.push(Utils.getProcessNameValuePair('pCompany', company));
                parameters.push(Utils.getProcessNameValuePair('pReceiver', receiver));
                parameters.push(Utils.getProcessNameValuePair('pTerritory', territoryCode));
                parameters.push(Utils.getProcessNameValuePair('pPeriod', period));
                parameters.push(Utils.getProcessNameValuePair('pCustomer', customerCode));
                parameters.push(Utils.getProcessNameValuePair('pValue', Utils.parseNumber(widgetValue.value)));
                parameters.push(Utils.getProcessNameValuePair('pLineItem', 'Base Plan'));

                return Utils.buildProcessParameters(parameters);
            }
        },
        getCell: (index, r) => {
            let uiIndex = index + 10, uiValue = parseInt(r.Cells[uiIndex].FormattedValue), skin = 'monthly_right_bpsp',
                cellSkin = '',
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
            if (uiValue === 4) {
                if (r.Cells[index].Members[7].Name == v('systemValueGlobalSegmentedControlRelativeYearValue')) {
                    cellSkin = 'readonly_green_bpsp';
                } else {
                    //    skin = 'products_gd_readonly_with_icon_bpsp';
                    cellSkin = 'readonly_bpsp';
                    //    icon = 'icon-copy';
                    //    copyMerge = true;
                }
            }

            if ((uiValue === 2 || uiValue === 3)
                && r.Cells[index].Members[7].Name == v('systemValueGlobalSegmentedControlRelativeYearValue')) {

                skin = 'products_gd_writeable_with_icon_bpsp';
                cellSkin = '';
                applyMeasuresToSection = true;
                if (uiValue === 3) {
                    icon = 'icon-dots-vertical';
                    distributionEdit = true;
                    cellSkin = 'readonly_bpsp';
                    performWrite = false;
                } else {

                    icon = 'icon-cloud-arrow-up';
                    skin = 'monthly_right_bpsp';
                    performWrite = true;

                }
            }

            if (uiValue === 2
                && r.Cells[index].Members[7].Name != v('systemValueGlobalSegmentedControlRelativeYearValue')
                && r.Cells[index].Members[8].Name === 'Base Plan') {
                skin = 'products_gd_readonly_with_icon_bpsp';
                cellSkin = 'readonly_bpsp';
                icon = 'icon-copy';
                copyMerge = true;
            }
            let result = {
                title: r.Cells[index].FormattedValue,
                cellSkin: cellSkin,
                distributionEdit: distributionEdit,
                copyMerge: copyMerge,
                performWrite: performWrite,
                performable: performWrite,
                ordinal: r.Cells[index].Ordinal,
                skin: skin,
                members: r.Cells[index].Members,
                applyMeasuresToSection: true,
                uiValue: uiValue,
                width: '100%'
            };
            if (icon !== '') {
                result['icon'] = icon;

            }
            if (applyMeasuresToSection) {
                result['width'] = '100%';
                result['height'] = '100%';
                if (uiValue === 3 && r.Cells[index].Members[5].Name == v('systemValueGlobalSegmentedControlRelativeYearValue')) {
                    result['paddingRight'] = 26;
                }
            }
            return result;
        },
        initCondition: (db) => {
            return Repository.rocheBPSPCustomersPlanning.isYearly(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name,Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    focusedProduct = v('systemValueCustomersPlanningFocused'),
                    relativeYear = v('systemValueGlobalSegmentedControlRelativeYear'),
                    relativeYearValue = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                    hasFocusedProduct = Repository.rocheBPSPCustomersPlanning.isFocused(),
                    customerCode = v('systemValueCustomersPlanningCustomerCode')
                ;
                return `
                    {
                        "MDX" : 
                            "With
                                --Default mdx to run from JS
                                Set ProductRows As
                                {Filter(
                                  {Filter({[Products].[BPSP ${productVersion}].Members} ,
                                  [Sales Territory to Product].([Versions].[Versions].[${version}],
                                                                [Companies].[Companies].[${company}],
                                                                [Territories].[Territories].[${territoryCode}],
                                                                [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Flag])>0)},
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL1' or 
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL2' or 
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL2a' or 
                                           [Products].[BPSP Budget].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name') = 'PL3'
                                          )}   
                                -- mdx to run from JS when user focusing
                                Set FocusedRows As
                                {Filter({TM1DRILLDOWNMEMBER({[Products].[BPSP ${productVersion}].[${focusedProduct}]} , All, Recursive)}
                                ,[Sales Territory to Product].([Versions].[Versions].[${version}],
                                                                [Companies].[Companies].[${company}],
                                                                [Territories].[Territories].[${territoryCode}],
                                                                [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Flag])>0)}
                                --Create a dummy prodct for padding column headers
                                     MEMBER [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[DUMMY] as 1
                                --Create a dummy Tuple with 9 member for column padding
                                     Set PaddingColumns AS
                                     {{TM1SubsetToSet([Periods].[Periods],'zUI Padding Years')}*{[LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[DUMMY]}}
                                --Default column selection depend on Year selection
                                     Set DefaultColumnSelection AS
                                     {HEAD(UNION({StrToSet([Control].([Measures Control].[Measures Control].[UI CustomersGridTable DefaultColumnsTuple ${relativeYear}],[Value Type].[Value Type].[String]))},{PaddingColumns},All),10)}
                                -- Compress MDX result size with creating measures from Product Attributes for the query (decrease size from 3MB to 50KB)     
                                     MEMBER [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[ProductName] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} Description')
                                     MEMBER [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[ProductCaption] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} Element')
                                     MEMBER [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[ProductLevel] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} Product Level - Name')
                                     MEMBER [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[UILevelFormat] as 
                                            [Products].[BPSP ${productVersion}].CurrentMember.Properties('BPSP ${productVersion} UI Level Format')
                                     MEMBER [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[HasComment] as
                                            [Sales Plan by Customer].([Periods].[Periods].[${relativeYearValue}],[LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[Final Sales Plan],[Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Comment Flag])
                                -- Create the first 3 column with information
                                     Set FixColumns AS
                                     {([Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value],[Periods].[Periods].[2021],
                                       [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[ProductName]),
                                     ([Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value],[Periods].[Periods].[2021],
                                      [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[ProductCaption]),
                                     ([Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value],[Periods].[Periods].[2021],
                                      [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[ProductLevel]),
                                      ([Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value],[Periods].[Periods].[2021],
                                      [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[UILevelFormat])
                                      }
                                     Set Comment AS
                                     {([Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value],[Periods].[Periods].[2021],
                                       [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[HasComment])}
                                SELECT 
                                   Union(
                                     Union({FixColumns},
                                           {[Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Value],[Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[UIFormat]}*
                                           {DefaultColumnSelection}
                                      ,All),
                                   {Comment},All)
                                  ON COLUMNS, 
                                   ${hasFocusedProduct ? '{FocusedRows}' : '{ProductRows} '}
                                  ON ROWS 
                                FROM [Sales Plan by Customer] 
                                WHERE 
                                  (
                                   [Versions].[Versions].[${version}],
                                   [Receivers].[Receivers].[${receiver}],
                                   [Territories].[Territories].[${territoryCode}],
                                   [Companies].[Companies].[${company}],
                                   [Customers Plan].[Customers Plan].[${customerCode}]
                                  )
                                "
                    }
               `;
            },
            parsingControl: {
                type: 'matrix',
                length: 25,
                query: [
                    (r, x) => {
                        let result, pl, pc, uiLevel = r.Cells[x + 3].FormattedValue;
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = x;
                        pc = r.Cells[x + 1].FormattedValue;
                        pl = r.Cells[x + 2].FormattedValue.replace('a', '');
                        result = {
                            label: r.Cells[x].FormattedValue,
                            skin: 'gridtable_hierarchy_bpsp_' + uiLevel,
                            cellVisible: true,
                            icon: 'icon-badge',
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            uiLevel: uiLevel,
                            productCode: pc
                        };
                        return result;
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex']].FormattedValue,
                            cellSkin: ''
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return {
                            title: r.Cells[WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex']].FormattedValue,
                            cellSkin: ''
                        };
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 2;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 1;
                        return Repository.rocheBPSPCustomersPlanningGridTableYearly.getCell(WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'], r);
                    },
                    (r, x) => {
                        WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] = WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex'] + 11;
                        let cellValue = r.Cells[WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex']].FormattedValue;
                        return {

                            icon: cellValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: cellValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[WidgetValue['systemValueCustomersPlanningYearlyRelativeIndex']].Members,
                            hasComment: cellValue !== ''
                        };
                    }
                ]
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-02': {
        init: {
            execute: (db) => {
                return {
                    title: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(3),
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(3),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-03': {
        init: {
            execute: (db) => {
                return {
                    title: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(4),
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(4),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-04': {
        init: {
            execute: (db) => {
                return {
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(5),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderCell-05': {
        init: {
            execute: (db) => {
                let previousTitle = Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(5),
                    currentTitle = Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(6);
                if (previousTitle !== currentTitle) {
                    return {cellHeaderSkin: 'long_border_bpsp'};
                }
                return {};
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-05': {
        init: {
            execute: (db) => {
                let previousTitle = Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(5),
                    currentTitle = Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(6),
                    result = {
                        body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(6),
                    };
                if (previousTitle !== currentTitle) {
                    result['title'] = currentTitle;
                    result['skin'] = 'products_gd_header_bpsp';
                }
                return result;
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-06': {
        init: {
            execute: (db) => {
                return {
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(7),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-07': {
        init: {
            execute: (db) => {
                return {
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(8),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-08': {
        init: {
            execute: (db) => {
                return {
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(9),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-09': {
        init: {
            execute: (db) => {
                return {
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(10),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-10': {
        init: {
            execute: (db) => {
                return {
                    title: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(11),
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(11),
                };
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-11': {
        init: {
            execute: (db) => {
                return {
                    title: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderBody(12),
                    body: Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderTitle(12),
                };
            }
        }
    },
    rocheBPSPCustomersPlanningYearSegmentedControl: {
        init: {
            execute: (db) => {
                let s = parseInt(v('systemValueGlobalStartingPlanYear')),
                    sr = v('systemValueGlobalSegmentedControlRelativeYear');
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
                Utils.setWidgetValue('systemValueGlobalSegmentedControlRelativeYear', v('rocheBPSPCustomersPlanningYearSegmentedControl.value'));
                Utils.setWidgetValue('systemValueGlobalSegmentedControlRelativeYearValue', v('rocheBPSPCustomersPlanningYearSegmentedControl.selected'));
            }
        }
    },

    rocheBPSPCustomersTerritorySelector: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector');
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
                         {[}ElementAttributes_Territories].[}ElementAttributes_Territories].[Territory Code],
                          [}ElementAttributes_Territories].[}ElementAttributes_Territories].[Caption]}
                    ON COLUMNS ,
                       {FILTER(
                       {TM1FILTERBYLEVEL(
                             {TM1DRILLDOWNMEMBER(
                                {[Territories].[Territories].[ALL TERRITORIES ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')}]}, ALL, RECURSIVE )}, 0)}
                        , [}ElementAttributes_Territories].[}ElementAttributes_Territories].[Territory Used Flag] = '1')}
                      ON ROWS
                    FROM [}ElementAttributes_Territories]

            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        items: (r, x) => {
                            let result = [], selected = v('rocheBPSPCustomersTerritorySelector.value');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    name: r.Cells[i + 1].FormattedValue,
                                    key: r.Cells[i].FormattedValue,
                                    on: selected === r.Cells[i + 1].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },

    rocheBPSPCustomersCompanySelector: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPCustomersCompanySelector.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
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

    rocheBPSPCustomersHeaderInfoGridTable: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector') && Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersTerritorySelector');
        },
        initDefault: (db) => {
            return [];
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                type: 'POST',
                body: (db) => `{"MDX":"
                    SELECT 
                           {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[PY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[CY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[NY]} 
                           PROPERTIES [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Caption]  ON COLUMNS , 
                           {[Customers Plan].[Customers Plan].[All Customers Plan]} 
                          ON ROWS 
                        FROM [Sales Territory to Customer] 
                        WHERE 
                          (
                           [Versions].[Versions].[${v('systemValueGlobalCompanyVersion')}],
                           [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')}],
                           [Territories].[Territories].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key')}],
                           [Receivers].[Receivers].[All Receivers]
                          )
                "}`,
                parsingControl: {
                    type: 'matrix',
                    length: 3,
                    query: [

                        (r, x) => {
                            return {body: r.Cells[x].FormattedValue, title: r.Cells[x].Members[5].Attributes.Caption};
                        }, (r, x) => {
                            return {
                                body: r.Cells[x + 1].FormattedValue,
                                title: r.Cells[x + 1].Members[5].Attributes.Caption
                            };
                        }, (r, x) => {
                            return {
                                body: r.Cells[x + 2].FormattedValue,
                                title: r.Cells[x + 2].Members[5].Attributes.Caption
                            };
                        }
                    ]
                }
            }
    },

    rocheBPSPCustomersHorizontalTable: {
        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomersPlanningCustomer', v('rocheBPSPCustomersHorizontalTable.open.customer'));
                Utils.setWidgetValue('systemValueCustomersPlanningCustomerCode', v('rocheBPSPCustomersHorizontalTable.open.code'));
                Utils.setWidgetValue('systemValueCustomersPlanningCustomerReceiver', v('rocheBPSPCustomersHorizontalTable.open.receiver'));
                Utils.setWidgetValue('systemValueCustomersPlanningIsOpportunitiesSelectorLoadable', false);
                Utils.setWidgetValue('systemValueCustomersPlanningIsOpportunitiesFromGridTableSelectorLoadable', false);
            }
        },
        initCondition: (db) => {
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector')
                && Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersTerritorySelector');
            return b;
        },
        initDefault: (db) => {
            return [];
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => `{"MDX":"
                         With
                            Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Desc] as
                                [Customers Plan].[Customers Plan].CurrentMember.Properties('Account Name')
                            Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Territory] as
                                [Territories].[Territories].CurrentMember.Properties('Code')
                            Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Receiver] as
                                [Receivers].[Receivers].CurrentMember.Properties('Receiver - Key')
                            Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Code] as
                               [Customers Plan].[Customers Plan].CurrentMember.Name
                        SELECT 
                            {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Assignment Flag],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Desc],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Code],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Receiver],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[PY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[CY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[NY],
                            [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Submitted DateTime]
                           }  
                          PROPERTIES [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Caption]  ON COLUMNS , 
                          NON EMPTY 
                              {Except({TM1DRILLDOWNMEMBER({[Customers Plan].[Customers Plan].[All Customers Plan]}, ALL, RECURSIVE )},{[Customers Plan].[Customers Plan].[All Customers Plan]})}
                           * {TM1SubsetToSet([Receivers].[Receivers], \\"zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')} Plan Receivers\\")}  
                          ON ROWS 
                        FROM [Sales Territory to Customer] 
                        WHERE 
                          (
                           [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')}],
                           [Territories].[Territories].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key')}],
                           [Versions].[Versions].[${v('systemValueGlobalCompanyVersion')}]
                          )      
                  "}`
                ,
                parsingControl: {
                    type: 'matrix',
                    length: 8,
                    query: [

                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 2].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 3].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 4].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 5].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 6].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 7].FormattedValue};
                        }, (r, x) => {
                            return {active: true};
                        }

                    ]
                }

            },
    },
    rocheBPSPCustomersPlanningCustomerSelectorButton: {
        init: {
            execute: (db) => {
                return {
                    label: v('systemValueCustomersPlanningCustomer')
                        + ' (' + v('systemValueCustomersPlanningCustomerReceiver') + ')'
                };
            }
        }
    },
    rocheBPSPCustomersPlanningHorizontalTableCustomerSelector: {
        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomersPlanningCustomer', v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.open.customer'));
                Utils.setWidgetValue('systemValueCustomersPlanningCustomerCode', v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.open.code'));
                Utils.setWidgetValue('systemValueCustomersPlanningCustomerReceiver', v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.open.receiver'));
            }
        },
        initCondition: (db) => {
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector')
                && Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersTerritorySelector');
            return b;
        },
        initDefault: (db) => {
            return [];
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => `{"MDX":"
                    With
                        Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Desc] as
                            [Customers Plan].[Customers Plan].CurrentMember.Properties('Account Name')
                        Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Receiver] as
                                                    [Receivers].[Receivers].CurrentMember.Properties('Receiver - Key')
                       Member [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Code] as
                               [Customers Plan].[Customers Plan].CurrentMember.Name
                    SELECT 
                       {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Assignment Flag],
                        [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Desc],
                        [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Code],
                        [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Receiver],
                        [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[PY]
                       }  
                      PROPERTIES [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Caption]  ON COLUMNS , 
                      NON EMPTY 
                          {Except({TM1DRILLDOWNMEMBER({[Customers Plan].[Customers Plan].[All Customers Plan]}, ALL, RECURSIVE )},{[Customers Plan].[Customers Plan].[All Customers Plan]})}
                      ON ROWS 
                    FROM [Sales Territory to Customer] 
                    WHERE 
                      (
                       [Receivers].[Receivers].[${v('rocheBPSPCustomersHorizontalTable.open.receiver')}],  
                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')}],
                       [Territories].[Territories].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key')}],
                       [Versions].[Versions].[${v('systemValueGlobalCompanyVersion')}]
                      )
                
                  "}`
                ,
                parsingControl: {
                    type: 'matrix',
                    length: 5,
                    query: [
                        (r, x) => {
                            return {
                                active: true,
                                on: v('systemValueCustomersPlanningCustomerCode') == r.Cells[x + 2].FormattedValue
                            };
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 2].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 3].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 4].FormattedValue};
                        },

                    ]
                }

            },
    },
    rocheBPSPCustomersPlanningPeriodUnitSegmentedControl: {
        init: {
            execute: (db) => {
                let e = db.systemValueCustomerPlanningSegmentedControlPeriodUnit;
                return e ? [{label: 'Yearly', selected: e === 'Yearly'}, {
                    label: 'Monthly',
                    selected: e === 'Monthly'
                }] : false;
            }
        },
        switch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomerPlanningSegmentedControlPeriodUnit', v('rocheBPSPCustomersPlanningPeriodUnitSegmentedControl.selected'));
            }
        }
    },
    rocheBPSPCustomersPlanning: {
        isMonthly: (db) => {
            return v('systemValueCustomerPlanningSegmentedControlPeriodUnit') === 'Monthly';
        },
        isYearly: (db) => {
            return v('systemValueCustomerPlanningSegmentedControlPeriodUnit') === 'Yearly';
        },
        isYearlyLoaded: (db) => {
            return Utils.isGridTableLoaded('rocheBPSPCustomersPlanningGridTableYearly');
        },
        getVisibleGridTable: (db) => {
            return Repository.rocheBPSPCustomersPlanning.isYearly(db) ? 'rocheBPSPCustomersPlanningGridTableYearly' : 'rocheBPSPCustomersPlanningGridTableMonthly';
        },
        isFocused: () => {
            return v('systemValueIsCustomersPlanningFocused');
        },
        setCustomerSelectorOpenRecord: (db) => {
            let selected = Repository.rocheBPSPCustomersPlanning.getSelectedCustomer(db);
            if (!selected) {
                return false;
            }
            let selectedCustomer = selected.record;
            let open = {
                action: 'open',
                id: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector',
                customer: selectedCustomer[0].value,
                code: selectedCustomer[1].value,
                receiver: selectedCustomer[2].value,
                lastyearsrevenue: selectedCustomer[3].value,
                index: selected.index
            };

            WidgetValue['rocheBPSPCustomersPlanningHorizontalTableCustomerSelector']['open'] = open;
            return true;
        },
        getSelectedCustomer: (db) => {
            let i, rows = v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.rows');
            if (!rows) {
                return false;
            }
            for (i = 0; i < rows.length; ++i) {
                if (rows[i][1].value == v('systemValueCustomersPlanningCustomerCode')) {
                    return {index: i, record: rows[i]};
                }
            }
            return false;
        },
        getYearlyGridTableHeaderTitle: (index) => {
            return Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderInfo(index, 7);
        },
        getYearlyGridTableHeaderBody: (index) => {
            return Repository.rocheBPSPCustomersPlanning.getYearlyGridTableHeaderInfo(index, 8);
        },
        getYearlyGridTableHeaderInfo: (index, membersIndex) => {
            let gridTableData = v('rocheBPSPCustomersPlanningGridTableYearly.cellData'), members;
            if (!gridTableData || gridTableData.length === 0) {
                return '';
            }
            if (gridTableData[0].length < index) {
                return '';
            }
            members = v('members', gridTableData[0][index]);
            if (!members || members.length < membersIndex) {
                return '';
            }
            return members[membersIndex].Attributes.Caption;
        },
        getCopyMergeButtonProcessBody: (mode = 1) => {//1 = Copy, 2 = Merge
            let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                customerCode = v('systemValueCustomersPlanningCustomerCode'),
                product = Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).productCode,
                periodFrom = Utils.getGridTableCurrentCell('rocheBPSPCustomersPlanningGridTableYearly').members[7].Name,
                periodTo = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                growthRate = v('rocheBPSPCustomersPlanningCopyMergePopupSlider.value') / 100,
                lineItem = Utils.getGridTableCurrentCell('rocheBPSPCustomersPlanningGridTableYearly').members[8].Name,
                parameters = []
            ;
            parameters.push(Utils.getProcessNameValuePair('pProduct', product));
            parameters.push(Utils.getProcessNameValuePair('pCompany', company));
            parameters.push(Utils.getProcessNameValuePair('pReceiver', receiver));
            parameters.push(Utils.getProcessNameValuePair('pTerritory', territoryCode));
            parameters.push(Utils.getProcessNameValuePair('pPeriodFrom', periodFrom));
            parameters.push(Utils.getProcessNameValuePair('pPeriodTo', periodTo));
            parameters.push(Utils.getProcessNameValuePair('pMode', mode));
            parameters.push(Utils.getProcessNameValuePair('pGrowthRate', growthRate));
            parameters.push(Utils.getProcessNameValuePair('pLineItem', lineItem));
            parameters.push(Utils.getProcessNameValuePair('pCustomer', customerCode));

            return Utils.buildProcessParameters(parameters);
        }
    },
    rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton: {
        init: {
            execute: (db) => {
                return {visible: Repository.rocheBPSPCustomersPlanning.isYearly(db)};
            }
        }
    },
    rocheBPSPCustomersPlanningTypeSegmentedControl: {
        switch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomersPlanningMonthlyType', v('rocheBPSPCustomersPlanningTypeSegmentedControl.selected'));
                Utils.setWidgetValue('systemValueCustomersPlanningMonthlyTypeValue', v('rocheBPSPCustomersPlanningTypeSegmentedControl.value'));
            }
        },
        init: {
            execute: (db) => {
                let e = v('systemValueCustomersPlanningMonthlyType');
                return {
                    visible: Repository.rocheBPSPCustomersPlanning.isMonthly(db),
                    data: [
                        {label: 'Base Plan', selected: e === 'Base Plan'},
                        {label: 'One Time Event', selected: e === 'One Time Event'},
                        {label: 'Opportunity', selected: e === 'Opportunity'},
                        {label: 'Final Sales Plan', selected: e === 'Final Sales Plan'}
                    ]
                };
            }
        }
    },
    rocheBPSPCustomersPlanningFocusPopupPopupFocusButton: {
        launch: {
            execute: (db) => {
                let table = Repository.rocheBPSPCustomersPlanning.getVisibleGridTable(db);
                Utils.setWidgetValue('systemValueCustomersPlanningFocused', Utils.getGridTableCell(table, 0).productCode);
                Utils.setWidgetValue('systemValueIsCustomersPlanningFocused', true);
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableMonthlyHeaderText-01': {
        init: {
            execute: (db) => {
                return {visible: !Repository.rocheBPSPCustomersPlanning.isFocused()};
            }
        }
    },
    'rocheBPSPCustomersPlanningGridTableYearlyHeaderText-01': {
        init: {
            execute: (db) => {
                return {visible: !Repository.rocheBPSPCustomersPlanning.isFocused()};
            }
        }
    },
    rocheBPSPCustomersPlanningGridTableMonthlyHeaderReturnFromFocus: {
        launch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomersPlanningFocused', v('systemValueDefaultCustomersPlanningFocused'));
                Utils.setWidgetValue('systemValueIsCustomersPlanningFocused', false);
            }
        },
        init: {
            execute: (db) => {
                return {visible: Repository.rocheBPSPCustomersPlanning.isFocused()};
            }
        }
    },
    rocheBPSPCustomersPlanningGridTableYearlyHeaderReturnFromFocus: {
        launch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomersPlanningFocused', v('systemValueDefaultCustomersPlanningFocused'));
                Utils.setWidgetValue('systemValueIsCustomersPlanningFocused', false);
            }
        },
        init: {
            execute: (db) => {
                return {visible: Repository.rocheBPSPCustomersPlanning.isFocused()};
            }
        }
    },
    rocheBPSPCustomersPlanningGridRow2Cell2NextButton: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector', 'rows');
        },
        init: {
            execute: (db) => {
                let customerSelectorData = v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector');
                if (!customerSelectorData) {
                    return;
                }
                if (!customerSelectorData.open) {
                    if (!Repository.rocheBPSPCustomersPlanning.setCustomerSelectorOpenRecord(db)) {
                        return {};
                    }
                }
                if (customerSelectorData.open.index === customerSelectorData.rows.length - 1) {
                    return {iconColor: '#b1b3b3', enabled: false};
                }
                return {};
            }
        },
        launch: {
            execute: (db) => {
                let customerSelectorData = v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector');
                if (!customerSelectorData) {
                    return;
                }
                if (!customerSelectorData.open) {
                    if (!Repository.rocheBPSPCustomersPlanning.setCustomerSelectorOpenRecord(db)) {
                        return;
                    }
                }
                if (customerSelectorData.open.index === customerSelectorData.rows.length - 1) {
                    return;
                }
                let index = customerSelectorData.open.index + 1;
                let selectedCustomer = customerSelectorData.rows[index];
                let open = {
                    action: 'open',
                    id: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector',
                    customer: selectedCustomer[0].value,
                    code: selectedCustomer[1].value,
                    receiver: selectedCustomer[2].value,
                    lastyearsrevenue: selectedCustomer[3].value,
                    index: index
                };
                WidgetValue['rocheBPSPCustomersPlanningHorizontalTableCustomerSelector']['open'] = open;
                Repository.rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.open.execute(db);
            }
        }
    },
    rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton: {
        initCondition: (db) => {
            return Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector', 'rows');
        },
        init: {
            execute: (db) => {
                let customerSelectorData = v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector');
                if (!customerSelectorData) {
                    return;
                }
                if (!customerSelectorData.open) {
                    if (!Repository.rocheBPSPCustomersPlanning.setCustomerSelectorOpenRecord(db)) {
                        return {};
                    }
                }
                if (customerSelectorData.open.index === 0) {
                    return {iconColor: '#b1b3b3', enabled: false};
                }
                return {};
            }
        },
        launch: {
            execute: (db) => {
                let customerSelectorData = v('rocheBPSPCustomersPlanningHorizontalTableCustomerSelector');
                if (!customerSelectorData) {
                    return;
                }
                if (!customerSelectorData.open) {
                    if (!Repository.rocheBPSPCustomersPlanning.setCustomerSelectorOpenRecord(db)) {
                        return;
                    }
                }
                if (customerSelectorData.open.index === 0) {
                    return;
                }
                let index = customerSelectorData.open.index - 1;
                let selectedCustomer = customerSelectorData.rows[index];
                let open = {
                    action: 'open',
                    id: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector',
                    customer: selectedCustomer[0].value,
                    code: selectedCustomer[1].value,
                    receiver: selectedCustomer[2].value,
                    lastyearsrevenue: selectedCustomer[3].value,
                    index: index
                };
                WidgetValue['rocheBPSPCustomersPlanningHorizontalTableCustomerSelector']['open'] = open;
                Repository.rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.open.execute(db);
            }
        }
    },
    rocheBPSPCustomerPlanningOpportunityDeleteControlPanelDeleteButton: {
        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - Sales Opportunity Delete')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                let opportunity = Utils.getHorizontalTableHiddenValue('rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector', 'delete', 0, 'code'),
                    parameters = [];
                parameters.push(Utils.getProcessNameValuePair('pOpportunity', opportunity));
                return Utils.buildProcessParameters(parameters);
            }
        }
    },
    rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector: {
        initCondition: (db) => {
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector')
                && Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersTerritorySelector')
                && v('systemValueCustomersPlanningIsOpportunitiesSelectorLoadable');
            Utils.setWidgetValue('systemValueCustomersPlanningIsOpportunitiesSelectorLoadable', true);
            return b;
        },
        initDefault: (db) => {
            return [];
        },
        open: {
            execute: (db) => {
                app.fn.goToUrlNewTab(Utils.getHorizontalTableHiddenValue('rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector', 'open', 0, 'url'));
            }
        },
        select: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomerPlanningSelectedOpportunitiy', Utils.getHorizontalTableHiddenValue('rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector', 'select', 0, 'code'));
            }
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => `{"MDX":"                    
                    SELECT
                    {[}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Opportunity Name],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Total Deal Value],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Probability],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Type],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Contract Months],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Installation Revenue Date],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Link Sales Force],
                    [}ElementAttributes_Opportunities].[}ElementAttributes_Opportunities].[Use - Flag]}
                    ON COLUMNS ,
                    {FILTER({TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Opportunities].[Opportunities].[All Opportunities]}, ALL, RECURSIVE )}, 0)}, [Opportunities].[Opportunities].CurrentMember.Properties(\\"Customers Plan\\") = \\"${v('systemValueCustomersPlanningCustomerCode')}\\")}
                    ON ROWS
                    FROM [}ElementAttributes_Opportunities]
                  "}`
                ,
                parsingControl: {
                    type: 'matrix',
                    length: 8,
                    query: [
                        (r, x) => {
                            return {
                                value: r.Cells[x].FormattedValue,
                                code: r.Cells[x].Members[0].Name,
                                url: r.Cells[x + 6].FormattedValue
                            };
                        }, (r, x) => {
                            return {value: r.Cells[x + 3].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 4].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 5].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 2].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }, (r, x) => {
                            return {
                                active: true,
                                icon: Utils.parseNumber(r.Cells[x + 7].FormattedValue) === 1 ? 'icon-radio-on' : 'icon-radio-off'
                            };
                        }, (r, x) => {
                            return {
                                active: true
                            };
                        }, (r, x) => {
                            return {
                                active: true
                            };
                        }

                    ]
                }

            }
    },
    rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelectorTitle: {
        init: {
            execute: (db) => {
                return {
                    title: Utils.isGridTableLoaded('rocheBPSPCustomersPlanningGridTableYearly') ? Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).label : ''
                };
            }
        }
    },
    rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelector: {
        initCondition: (db) => {
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersCompanySelector')
                && Utils.isValueExistingAndNotEmpty('rocheBPSPCustomersTerritorySelector')
                && v('systemValueCustomersPlanningIsOpportunitiesFromGridTableSelectorLoadable');
            Utils.setWidgetValue('systemValueCustomersPlanningIsOpportunitiesFromGridTableSelectorLoadable', true);
            return b;
        },
        initDefault: (db) => {
            return [];
        },
        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueCustomerPlanningSelectedOpportunitiy', v('rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelector.open.opportunity'));
            }
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                        territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                        version = v('systemValueGlobalCompanyVersion'),
                        receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                        productCode = Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).productCode,
                        relativeYearValue = v('systemValueGlobalSegmentedControlRelativeYearValue');
                    return `{"MDX":"
                       SELECT
                            {[Measures Sales Plan by Customer Opportunity].[Measures Sales Plan by Customer Opportunity].Members}
                            ON COLUMNS ,
                            NON EMPTY
                            {FILTER({TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Opportunities].[Opportunities].[All Opportunities]}, ALL, RECURSIVE )}, 0)},
                             [Opportunities].[Opportunities].CurrentMember.Properties(\\"Customers Plan\\") = \\"${v('systemValueCustomersPlanningCustomerCode')}\\")}
                            ON ROWS
                            FROM [Sales Plan by Customer Opportunity]
                            WHERE
                            (
                            [Versions].[Versions].[${version}],
                            [Periods].[Periods].[${relativeYearValue}],
                            [Products].[BPSP Budget].[${productCode}],
                            [Receivers].[Receivers].[${receiver}],
                            [Territories].[Territories].[${territoryCode}],
                            [Companies].[Companies].[${company}]
                            ) 
                  "}`;
                }
                ,
                parsingControl: {
                    type: 'matrix',
                    length: 1,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].Members[6].Name};
                        }, (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        }, (r, x) => {
                            return {
                                active: true
                            };
                        }

                    ]
                }

            }
    },
    rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelectorTitle: {
        init: {
            execute: (db) => {
                return {title: 'Opportunities ' + v('systemValueGlobalSegmentedControlRelativeYearValue')};
            }
        }
    },
    rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton: {
        init: {
            execute: (db) => {
                return {label: Repository.rocheBPSPCustomersPlanning.isYearly(db) ? 'Clear all' : 'Clear table'};
            }
        },
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Clear All Inputs')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                        territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                        version = v('systemValueGlobalCompanyVersion'),
                        receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                        customerCode = v('systemValueCustomersPlanningCustomerCode'),
                        parameters = []
                    ;
                    parameters.push(Utils.getProcessNameValuePair('pVersion', version));
                    parameters.push(Utils.getProcessNameValuePair('pCompany', company));
                    parameters.push(Utils.getProcessNameValuePair('pReceiver', receiver));
                    parameters.push(Utils.getProcessNameValuePair('pCube', 'Sales Plan by Customer'));
                    parameters.push(Utils.getProcessNameValuePair('pTerritory', territoryCode));
                    parameters.push(Utils.getProcessNameValuePair('pCustomer', customerCode));
                    if (Repository.rocheBPSPCustomersPlanning.isMonthly(db)) {
                        parameters.push(Utils.getProcessNameValuePair('pPeriod', v('systemValueGlobalSegmentedControlRelativeYearValue')));
                        parameters.push(Utils.getProcessNameValuePair('pLineItem', v('systemValueCustomersPlanningMonthlyTypeValue')));
                    }
                    return Utils.buildProcessParameters(parameters);
                }
            }
    },
    rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Customers Plan Submit')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                        territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                        version = v('systemValueGlobalCompanyVersion'),
                        receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                        customerCode = v('systemValueCustomersPlanningCustomerCode'),
                        activeUser = v('activeUser'),
                        parameters = []
                    ;
                    parameters.push(Utils.getProcessNameValuePair('pVersion', version));
                    parameters.push(Utils.getProcessNameValuePair('pCompany', company));
                    parameters.push(Utils.getProcessNameValuePair('pReceiver', receiver));
                    parameters.push(Utils.getProcessNameValuePair('pTerritory', territoryCode));
                    parameters.push(Utils.getProcessNameValuePair('pCustomer', customerCode));
                    parameters.push(Utils.getProcessNameValuePair('pUser', v('activeUserName')));

                    return Utils.buildProcessParameters(parameters);
                }
            }
    },
    rocheBPSPCustomersPlanningCopyMergePopupCopyButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Customers Plan Yearly Copy')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return Repository.rocheBPSPCustomersPlanning.getCopyMergeButtonProcessBody();
                }
            }
    },
    rocheBPSPCustomersPlanningCopyMergePopupMergeButton: {
        launch:
            {
                url: (db) => `/api/v1/Processes('MODULE - UI - Customers Plan Yearly Copy')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return Repository.rocheBPSPCustomersPlanning.getCopyMergeButtonProcessBody(2);
                }
            }
    },
    rocheBPSPCustomersPlanningCopyMergePopupSlider: {
        initCondition: (db) => {
            let b = Utils.isGridTableLoaded('rocheBPSPCustomersPlanningGridTableYearly')
                && Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).productCode
            return b;
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
                   [Years].[Years].[${v('systemValueGlobalSegmentedControlRelativeYearValue')}],
                   [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key')}],
                   [Receivers].[Receivers].[${v('rocheBPSPCustomersHorizontalTable.open.receiver')}],
                   [Products Flat].[Products Flat].[${Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).productCode}]
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
    rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution: {
        initCondition: (db) => {
            Utils.setWidgetValueIfNotExist('systemValueCustomersPlanningIsOpportunityDistributionLoadable', false);
            return v('systemValueCustomersPlanningIsOpportunityDistributionLoadable');
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name,Attributes/BPSPBudgetDescription))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    opportunity = v('systemValueCustomerPlanningSelectedOpportunitiy'),
                    productCode = 'PL1';//Utils.getGridTableCell('rocheBPSPCustomersPlanningGridTableYearly', 0).productCode
                ;
                return `{"MDX":"
                        SELECT
                            {[Measures Sales Plan by Customer Opportunity Split].[Measures Sales Plan by Customer Opportunity Split].Members}
                            ON COLUMNS ,
                            {FILTER(
                            {FILTER(
                            {TM1DRILLDOWNMEMBER({[Products].[BPSP Budget].[${productCode}]} , All, Recursive)}, [Sales Territory to Product].([Versions].[Versions].[${version}],
                                                            [Companies].[Companies].[${company}],
                                                            [Territories].[Territories].[${territoryCode}],
                                                            [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Flag])>0)},
                            [Products].[BPSP Budget].CurrentMember.Properties(\\"BPSP Budget Product Level - Name\\") = \\"PL6\\")} ON ROWS
                            FROM [Sales Plan by Customer Opportunity Split]
                            WHERE
                            (
                        [Versions].[Versions].[${version}],
                        [Companies].[Companies].[${company}],
                        [Opportunities].[Opportunities].[${opportunity}])
                    
                    "}`;
            }
            ,
            parsingControl: {
                type: 'matrix',
                length: 1,
                query: [
                    (r, x) => {
                        return {value: r.Cells[x].Members[3].Attributes['BPSP Budget Description']};
                    }, (r, x) => {
                        return {value: r.Cells[x].Members[3].Name};
                    }, (r, x) => {
                        return {value: r.Cells[x].FormattedValue, editable: true, ordinal: r.Cells[x].Ordinal};
                    }
                ]
            }

        },
        cellEdit: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                let a = v('rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution.cellEdit'), value;
                if (a.value.includes('%')) {
                    value = Utils.parseNumber(a.value.replace('%', '')) / 100;
                } else {
                    value = Utils.parseNumber(a.value);
                }

                return `{"Ordinal": ${a.ordinal},"Value": \"${value}\"}`
            }
        }
    },
    rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionSave: {
        launch: {
            validation: (db) => {
                let value = Utils.parseNumber(v('rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal.rows')[0][2].value.replace('%', ''));
                return {success: value === 100, message: 'Please add 100% percentage'};
            },
            url: (db) => `/api/v1/Processes('MODULE - UI - Sales Opportunity Split')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    opportunity = v('systemValueCustomerPlanningSelectedOpportunitiy'),
                    parameters = []
                ;
                parameters.push(Utils.getProcessNameValuePair('pOpportunity', opportunity));
                parameters.push(Utils.getProcessNameValuePair('pCompany', company));
                parameters.push(Utils.getProcessNameValuePair('pReceiver', receiver));
                parameters.push(Utils.getProcessNameValuePair('pTerritory', territoryCode));
                parameters.push(Utils.getProcessNameValuePair('pCustomer', customerCode));

                return Utils.buildProcessParameters(parameters);
            }


        }
    },
    rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal: {
        initCondition: (db) => {
            Utils.setWidgetValueIfNotExist('systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', false);
            return v('systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable');
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name,Attributes/TotalDealValue))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    opportunity = v('systemValueCustomerPlanningSelectedOpportunitiy');
                return `{"MDX":"SELECT
                       {[Measures Sales Plan by Customer Opportunity Split].[Measures Sales Plan by Customer Opportunity Split].Members} 
                    ON COLUMNS ,
                       {TM1FILTERBYLEVEL({[Products].[BPSP Budget].Members}, 5)} 
                    ON ROWS
                    FROM [Sales Plan by Customer Opportunity Split]
                    WHERE
                    (
                        [Versions].[Versions].[${version}],
                        [Companies].[Companies].[${company}],
                        [Opportunities].[Opportunities].[${opportunity}]
                    )"}`;
            }
            ,
            parsingControl: {
                type: 'matrix',
                length: 1,
                query: [
                    (r, x) => {
                        return {value: r.Cells[x].Members[2].Name};
                    }, (r, x) => {
                        let value = r.Cells[x].Members[2].Attributes['Total Deal Value'];
                        if (value === null) {
                            value = '0';
                        } else {
                            value = value.toString();
                        }
                        return {value: value};
                    }, (r, x) => {
                        return {value: r.Cells[x].FormattedValue};
                    }
                ]
            }

        }
    },

    rocheBPSPCustomersPlanningCommentShowGridTable: {
        initCondition: (db) => {
            return Repository.rocheBPSPCustomersPlanning.isYearlyLoaded(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    period = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                    productCode = v('systemValueLastClickedProductCode');
                return `{"MDX":"
                    SELECT 
                         {[Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Comment]} 
                      PROPERTIES [Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Caption]  ON COLUMNS , 
                       {[Products].[BPSP ${productVersion}].[${productCode}]} 
                      PROPERTIES [Products].[BPSP ${productVersion}].[Caption]  ON ROWS 
                    FROM [Sales Plan by Customer] 
                    WHERE 
                      (
                       [Versions].[Versions].[${version}],
                       [Companies].[Companies].[${company}],
                       [Receivers].[Receivers].[${receiver}],
                       [Territories].[Territories].[${territoryCode}],
                       [Customers Plan].[Customers Plan].[${customerCode}],
                       [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[Final Sales Plan],
                       [Periods].[Periods].[${period}]
                      )

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


    rocheBPSPCustomersPlanningCommentShowGridTableSource: {
        initCondition: (db) => {
            return Repository.rocheBPSPCustomersPlanning.isYearlyLoaded(db);
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    period = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                    productCode = v('systemValueLastClickedProductCode');
                return `{"MDX":"
                    SELECT 
                         {
                         [Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[CommentSource],
                         [Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[EditedBy],
                         [Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[EditedDateTime]} 
                      PROPERTIES [Measures Sales Plan by Customer].[Measures Sales Plan by Customer].[Caption]  ON COLUMNS , 
                       {[Products].[BPSP ${productVersion}].[${productCode}]} 
                      PROPERTIES [Products].[BPSP ${productVersion}].[Caption]  ON ROWS 
                    FROM [Sales Plan by Customer] 
                    WHERE 
                      (
                       [Versions].[Versions].[${version}],
                       [Companies].[Companies].[${company}],
                       [Receivers].[Receivers].[${receiver}],
                       [Territories].[Territories].[${territoryCode}],
                       [Customers Plan].[Customers Plan].[${customerCode}],
                       [LineItems Sales Plan by Customer].[LineItems Sales Plan by Customer].[Final Sales Plan],
                       [Periods].[Periods].[${period}]
                      )

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
    rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPCustomersPlanningCommentShowGridTable.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPCustomersPlanningCommentShowGridTable.cellData')[0][0].title;
                }
                return r;
            }
        }
    },
    rocheBPSPCustomersPlanningCommentEditGridRow3TextInput: {
        init: {
            execute: (db) => {
                let l = v('rocheBPSPCustomersPlanningCommentShowGridTableSource.cellData.length'), r = {value: ''};
                if (l !== false && l !== 0) {
                    r.value = v('rocheBPSPCustomersPlanningCommentShowGridTableSource.cellData')[0][0].title.split('<br/>')[0];
                }
                return r;
            }
        }
    },

    rocheBPSPCustomersPlanningCommentEditControlPanelSaveButton: {
        launch: {
            url: (db) => `/api/v1/Cubes('Sales Plan by Customer')/tm1.Update`,
            type: 'POST',
            body: (db) => {
                let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersCompanySelector', 'key'),
                    territoryCode = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCustomersTerritorySelector', 'key'),
                    version = v('systemValueGlobalCompanyVersion'),
                    receiver = v('rocheBPSPCustomersHorizontalTable.open.receiver'),
                    customerCode = v('systemValueCustomersPlanningCustomerCode'),
                    productVersion = v('systemValueGlobalCompanyProductPlanVersion'),
                    period = v('systemValueGlobalSegmentedControlRelativeYearValue'),
                    productCode = v('systemValueLastClickedProductCode');
                return `
                [
                    {
                        "Cells": [
                            {
                                "Tuple@odata.bind": [
                                    "Dimensions('Versions')/Hierarchies('Versions')/Elements('${version}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${period}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${company}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${receiver}')",
                                    "Dimensions('Territories')/Hierarchies('Territories')/Elements('${territoryCode}')",
                                    "Dimensions('Customers Plan')/Hierarchies('Customers Plan')/Elements('${customerCode}')",
                                    "Dimensions('LineItems Sales Plan by Customer')/Hierarchies('LineItems Sales Plan by Customer')/Elements('Final Sales Plan')",
                                    "Dimensions('Measures Sales Plan by Customer')/Hierarchies('Measures Sales Plan by Customer')/Elements('EditedDateTime')"
                                ]
                            },
                        ],
                         "Value": "${Utils.getFormattedDate(new Date(), '.', true)}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${version}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${period}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${company}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${receiver}')",
                                    "Dimensions('Territories')/Hierarchies('Territories')/Elements('${territoryCode}')",
                                    "Dimensions('Customers Plan')/Hierarchies('Customers Plan')/Elements('${customerCode}')",
                                    "Dimensions('LineItems Sales Plan by Customer')/Hierarchies('LineItems Sales Plan by Customer')/Elements('Final Sales Plan')",
                                    "Dimensions('Measures Sales Plan by Customer')/Hierarchies('Measures Sales Plan by Customer')/Elements('EditedBy')"
                               ]
                            },
                        ],
                        "Value": "${WidgetValue['activeUserName']}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${version}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${period}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${company}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${receiver}')",
                                    "Dimensions('Territories')/Hierarchies('Territories')/Elements('${territoryCode}')",
                                    "Dimensions('Customers Plan')/Hierarchies('Customers Plan')/Elements('${customerCode}')",
                                    "Dimensions('LineItems Sales Plan by Customer')/Hierarchies('LineItems Sales Plan by Customer')/Elements('Final Sales Plan')",
                                    "Dimensions('Measures Sales Plan by Customer')/Hierarchies('Measures Sales Plan by Customer')/Elements('CommentSource')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPCustomersPlanningCommentEditGridRow3TextInput.value') ? v('rocheBPSPCustomersPlanningCommentEditGridRow3TextInput.value') : ''}"
                    },
                    {
                        "Cells": [
                            {
                               "Tuple@odata.bind": [
                                   "Dimensions('Versions')/Hierarchies('Versions')/Elements('${version}')",
                                    "Dimensions('Periods')/Hierarchies('Periods')/Elements('${period}')",
                                    "Dimensions('Companies')/Hierarchies('Companies')/Elements('${company}')",
                                    "Dimensions('Products')/Hierarchies('BPSP Budget')/Elements('${productCode}')",
                                    "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${receiver}')",
                                    "Dimensions('Territories')/Hierarchies('Territories')/Elements('${territoryCode}')",
                                    "Dimensions('Customers Plan')/Hierarchies('Customers Plan')/Elements('${customerCode}')",
                                    "Dimensions('LineItems Sales Plan by Customer')/Hierarchies('LineItems Sales Plan by Customer')/Elements('Final Sales Plan')",
                                    "Dimensions('Measures Sales Plan by Customer')/Hierarchies('Measures Sales Plan by Customer')/Elements('Comment')"
                               ]
                            },
                        ],
                        "Value": "${v('rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput.value') ? v('rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput.value') : ''}"
                    }
                ]
                `;
            }
        }
    },
    /* end customer planning */


    rocheBPSPCompanySettingsGridRow1Cell3Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPSecuritySetupGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPTerritoriesGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPTerritoriesUsersTitleGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPAccountsGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPAccountsTerritoriesGridRow1Cell5Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPSecuritySetupGridTable:
        {
            initCondition: (db) => {
                return Utils.isValueExistingAndNotEmpty('rocheBPSPSecuritySetupGridRow1Cell2DropBox');

            },
            initDefault: (db) => {
                return [];
            },

            launch: {
                execute: (db) => {
                    Utils.setWidgetValue('selectedTerritoriesUsersType', 'ByUser');
                }
            },

            switch: {

                url: (db) => `/api/v1/Processes('MODULE - UI - Security Setup per User')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pUser", "Value": "${v('rocheBPSPSecuritySetupGridTable').cellData[v('rocheBPSPSecuritySetupGridTable.row')][0].title}"},
                                {"Name": "pMode", "Value": "${v('rocheBPSPSecuritySetupGridTable').switch.value}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPSecuritySetupGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pClickedColumnID", "Value": "${v('rocheBPSPSecuritySetupGridTable.column')}"},
                        ]
                    }`
            },


            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPSecuritySetupGridRow1Cell2DropBox', 'key');
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPSecuritySetupGridRow2Cell1SearchBox')) {
                            searchString = v('rocheBPSPSecuritySetupGridRow2Cell1SearchBox.value').toUpperCase();

                        }

                        return `{"MDX":"
                                    
                              With
                           Set Clients As
                            Filter({[}Clients].[}Clients].Members},[}ClientGroups].([}Groups].[}Groups].[${company} SalesUser])<>'' OR ([}Groups].[}Groups].[${company} KeyUser])<>'')
                            Member  [}Groups].[}Groups].[SwitchMarketing] AS
                            IIF([}ClientGroups].([}Groups].[}Groups].[${company} SalesMarketing]) <>'',1,0)
                            Member  [}Groups].[}Groups].[SwitchFinance] AS
                            IIF([}ClientGroups].([}Groups].[}Groups].[${company} SalesFinance]) <>'',1,0)
                            Member  [}Groups].[}Groups].[SwitchSales] AS
                            IIF([}ClientGroups].([}Groups].[}Groups].[${company} SalesCustomer]) <>'',1,0)
                            Member  [}Groups].[}Groups].[FullName] AS
                               [}Clients].[}Clients].CurrentMember.Properties('Full Name') +' (' +[}Clients].[}Clients].CurrentMember.Properties('User ID') + ')'
                            Member  [}Groups].[}Groups].[Code] AS
                               [}Clients].[}Clients].CurrentMember.Properties('User ID')
                            Set Groups As
                            {
                              [}Groups].[}Groups].[Code],
                              [}Groups].[}Groups].[FullName],
                              [}Groups].[}Groups].[SwitchMarketing],
                              [}Groups].[}Groups].[SwitchFinance],
                              [}Groups].[}Groups].[SwitchSales]      
                            }
                        SELECT 
                           {Groups} 
                          ON COLUMNS ,
                            DISTINCT({FILTER({Clients}, INSTR(UCASE([}Groups].[}Groups].[FullName]), '${searchString}')<>0)})
                          ON ROWS
                        FROM [}ClientGroups]

                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 5,
                        query: [
                            (r, x) => {
                                return {
                                    title: r.Cells[x].FormattedValue,
                                    cellVisible: false
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 1].FormattedValue,
                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x + 2].FormattedValue) === 1 ? 1 : 0,
                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x + 3].FormattedValue) === 1 ? 1 : 0,
                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? 1 : 0,
                                }
                            },

                            (r, x) => {
                                return {
                                    icon: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? 'icon-arrow-right' : '',
                                    visible: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? true : false,
//                                    cellSkin: parseInt(r.Cells[x + 4].FormattedValue) === 1 ? '' : 'readonly_bpsp',
                                }
                            },
                        ]
                    }
                },
        },

    rocheBPSPSecuritySetupGridTableCell5Button: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueGlobalSelectedUser'] = Utils.getGridTableCell('rocheBPSPSecuritySetupGridTable', 0).title;
                    WidgetValue['systemValueGlobalSelectedUserName'] = Utils.getGridTableCell('rocheBPSPSecuritySetupGridTable', 1).title;
                }
            },
    },

    rocheBPSPSecuritySetupGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPSecuritySetupGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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

    rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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


    rocheBPSPTerritoriesUsersGridTable:
        {

            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox') && v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username');
                return a;
            },
            initDefault: (db) => {
                return [];
            },

            switch: {

                url: (db) => `/api/v1/Processes('MODULE - UI - Territory to User Update')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {

                    let territory = Utils.getGridTableCell('rocheBPSPTerritoriesUsersGridTable', 0).title;

                    return `{
                        "Parameters": [
                                {"Name": "pUser", "Value": "${v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid')}"},
                                {"Name": "pMode", "Value": "1"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pTerritory", "Value": "${v('rocheBPSPTerritoriesUsersGridTable').cellData[v('rocheBPSPTerritoriesUsersGridTable.row')][0].territoryID}"},
                        ]
                    }`;
                }
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/REXISTerritoryID, Attributes/UILevelFormat))`,
                    type: 'POST',
                    body: (db) => {
                        let selectedUser = v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid');
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key');
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersGridRow4Cell1SearchBox')) {
                            searchString = v('rocheBPSPTerritoriesUsersGridRow4Cell1SearchBox.value').toUpperCase();
                        }
                        return `{"MDX":"
                             SELECT
                                 {[Measures Client To Territory].[Measures Client To Territory].[Assign Input]}
                             ON COLUMNS ,
                               {FILTER({TM1DRILLDOWNMEMBER({[Territories].[Territories].[ALL TERRITORIES ${company}]}, ALL, RECURSIVE )},
                               INSTR(UCASE([Territories].[Territories].[Caption]), '${searchString}')<>0)}
                               PROPERTIES [Territories].[Territories].[Caption]  ON ROWS
                            FROM [Client To Territory]
                            WHERE
                              (
                               [Companies].[Companies].[${company}],
                               [}Clients].[}Clients].[${selectedUser}])
                            "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [

                            (r, x) => {
                                return {
                                    label: r.Cells[x].Members[2].Attributes.Caption,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x].Members[2].Attributes['UI Level Format'],
                                    territoryID: r.Cells[x].Members[2].Attributes['REXIS Territory ID'],
                                    ordinal: x
                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x].FormattedValue) > 0 ? 1 : 0,
                                    ordinal: x
                                }
                            }
                        ]
                    }
                },
        },


    rocheBPSPTerritoriesUsersGridRow3Cell2SelectorButton: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox') && v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedUser', v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid'));
                Utils.setWidgetValue('systemValueGlobalSelectedUserName', v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username') + ' (' + v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid') + ')');
                return {
                    label: v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username') === false ? 'unknow' : v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username') + ' (' + v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid') + ')'
                };
            }
        }
    },

    rocheBPSPTerritoriesUsersHorizontalTableUserSelector: {

        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedUser', v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid'));
                Utils.setWidgetValue('systemValueGlobalSelectedUserName', v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username') + ' (' + v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid') + ')');
            }
        },

        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key');
                    Utils.setWidgetValue('systemValueGlobalSelectedUser', v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid'));
                    Utils.setWidgetValue('systemValueGlobalSelectedUserName', v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.username') + ' (' + v('rocheBPSPTerritoriesUsersHorizontalTableUserSelector.open.userid') + ')');

                    return `{"MDX":"

                     With
                           Set Clients As
                            Filter({[}Clients].[}Clients].Members},[}ClientGroups].([}Groups].[}Groups].[${company} SalesUser])<>'')
                            Member  [}Groups].[}Groups].[SwitchSales] AS
                            IIF([}ClientGroups].([}Groups].[}Groups].[${company} SalesCustomer]) <>'',1,0)
                            Member  [}Groups].[}Groups].[FullName] AS
                               [}Clients].[}Clients].CurrentMember.Properties('Full Name')
                            Member  [}Groups].[}Groups].[Code] AS
                               [}Clients].[}Clients].CurrentMember.Properties('User ID')
                            Set Groups As
                            {
                              [}Groups].[}Groups].[Code],
                              [}Groups].[}Groups].[FullName],
                              [}Groups].[}Groups].[SwitchSales]
                            }
                        SELECT
                           {Groups}
                          ON COLUMNS ,
                          NON EMPTY
                           {Clients}
                           PROPERTIES [}Clients].[}Clients].[}TM1_DefaultDisplayValue]  ON ROWS
                        FROM [}ClientGroups]

                                    "}`

                },

                parsingControl: {
                    type: 'matrix',
                    length: 3,
                    query: [
                        (r, x) => {
                            return {
                                active: true,
                                on: v('rocheBPSPSecuritySetupGridTable.row') > 0 && r.Cells[x].FormattedValue === v('rocheBPSPSecuritySetupGridTable').cellData[v('rocheBPSPSecuritySetupGridTable.row')][0].title
                            }
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        }

                    ]
                }

            },
    },


    rocheBPSPTerritoriesUsersTerritoriesGridTable:
        {

            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox') && v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid');
                return a;
            },
            initDefault: (db) => {
                return [];
            },

            switch: {

                url: (db) => `/api/v1/Processes('MODULE - UI - Territory to User Update')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {

                    let user = Utils.getGridTableCell('rocheBPSPTerritoriesUsersTerritoriesGridTable', 0).title;
                    return `{
                            "Parameters": [
                                    {"Name": "pUser", "Value": "${v('rocheBPSPTerritoriesUsersTerritoriesGridTable').cellData[v('rocheBPSPTerritoriesUsersTerritoriesGridTable.row')][0].userID}"},
                                    {"Name": "pMode", "Value": "1"},
                                    {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key')}"},
                                    {"Name": "pTerritory", "Value": "${v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid')}"},
                            ]
                        }`;
                }
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => {
                        let selectedTerritory = v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid');
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key');
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTerritoriesGridRow4Cell1SearchBox')) {
                            searchString = v('rocheBPSPTerritoriesUsersTerritoriesGridRow4Cell1SearchBox.value').toUpperCase();
                        }


                        return `{"MDX":"

                                 With
                                       Set Clients As
                                Filter({[}Clients].[}Clients].Members},[}ClientGroups].([}Groups].[}Groups].[${company} SalesUser])<>'')
                                Member  [}Groups].[}Groups].[SwitchSales] AS
                                IIF([}ClientGroups].([}Groups].[}Groups].[${company} SalesCustomer]) <>'',1,0)
                                Member  [}Groups].[}Groups].[FullName] AS
                                   [}Clients].[}Clients].CurrentMember.Properties('Full Name')
                                Member  [}Groups].[}Groups].[Code] AS
                                   [}Clients].[}Clients].CurrentMember.Properties('User ID')
                                Member [}Groups].[}Groups].[TerritoryToUser]
                                AS [Client To Territory].([Companies].[Companies].[${company}], [}Clients].[}Clients].CurrentMember, [Territories].[Territories].[${selectedTerritory}],[Measures Client To Territory].[Measures Client To Territory].[Assign Flag])
                                Set Groups As
                                {
                                  [}Groups].[}Groups].[Code],
                                  [}Groups].[}Groups].[FullName],
                                  [}Groups].[}Groups].[SwitchSales],
                                  [}Groups].[}Groups].[TerritoryToUser]
                                }
                            SELECT
                               {Groups}
                              ON COLUMNS ,
                              NON EMPTY
                              ORDER({
                               {DISTINCT({FILTER({Clients}, INSTR(UCASE([}Groups].[}Groups].[FullName]), '${searchString}')<>0)})}
                               },[}Groups].[FullName], ASC )
                               PROPERTIES [}Clients].[}Clients].[}TM1_DefaultDisplayValue]  ON ROWS
                            FROM [}ClientGroups]

                                    "}`


                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 4,
                        query: [

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 1].FormattedValue + ' (' + r.Cells[x].FormattedValue + ')',
                                    nameID: r.Cells[x].Members[0].Name,
                                    userID: r.Cells[x].FormattedValue


                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x + 3].FormattedValue) > 0 ? 1 : 0,
                                    ordinal: x
                                }
                            }
                        ]
                    }
                },
        },


    rocheBPSPTerritoriesUsersTerritoriesGridRow3Cell2SelectorButton: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox') && v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryname');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryID', v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid'));
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryName', v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryname') + ' (' + v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid') + ')');
                return {
                    label: v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryname') === false ? 'UNKNOW' : v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryname') + ' (' + v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid') + ')'
                };
            }
        }
    },

    rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },

        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryID', v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid'));
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryName', v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryname') + ' (' + v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid') + ')');
            }
        },

        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key');
                    Utils.setWidgetValue('systemValueGlobalSelectedTerritoryID', v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid'));
                    Utils.setWidgetValue('systemValueGlobalSelectedTerritoryName', v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryname') + ' (' + v('rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector.open.territoryid') + ')');
                    return `{"MDX":"

                            SELECT 
                    {[}ElementAttributes_Territories].[}ElementAttributes_Territories].[Caption],
                    [}ElementAttributes_Territories].[}ElementAttributes_Territories].[Territory Code]} 
                    ON COLUMNS , 
                    {TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Territories].[Territories].[ALL TERRITORIES ${company}]}, 
                    {[Territories].[Territories].[ALL TERRITORIES ${company}]}, RECURSIVE )}, 0)} 
                    ON ROWS 
                       FROM [}ElementAttributes_Territories] 

                                    "}`
                    /* Az előző MDX
                                         SELECT
                          {[Measures Client To Territory].[Measures Client To Territory].[Assign Flag]}
                        ON COLUMNS ,
                           {TM1DRILLDOWNMEMBER({[Territories].[Territories].[ALL TERRITORIES ${company}]}, ALL, RECURSIVE )}
                           PROPERTIES [Territories].[Territories].[Caption]  ON ROWS
                     FROM [Client To Territory]
                     WHERE
                          (
                           [Companies].[Companies].[${company}],
                           [}Clients].[}Clients].[CAMID(\\"knowledgeseed:u:878333962a02fd48a2bb251bf401ee67\\")]
                          )
                     */


                },

                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {
                                active: true,
                                on: v('rocheBPSPTerritoriesGridTable.row') > 0 && r.Cells[x + 1].FormattedValue === v('rocheBPSPTerritoriesGridTable').cellData[v('rocheBPSPTerritoriesGridTable.row')][0].territoryID
                            }
                        },
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }

                    ]
                }

            },
    },


    // rocheBPSPAccountsTerritories

    rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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

    rocheBPSPAccountsTerritoriesGridTable:
        {
            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox') && v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname');
                return a;
            },
            initDefault: (db) => {
                return [];
            },
            switch: {

                url: (db) => `/api/v1/Processes('MODULE - UI - Account to Territory Reassign')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pTerritory", "Value": "${v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid')}"},
                                {"Name": "pCustomer", "Value": "${v('rocheBPSPAccountsTerritoriesGridTable').cellData[v('rocheBPSPAccountsTerritoriesGridTable.row')][0].accountID}"},
                                {"Name": "pMode", "Value": "${v('rocheBPSPAccountsTerritoriesGridTable').cellData[v('rocheBPSPAccountsTerritoriesGridTable.row')][1].value === 0 ? 1 : 0}"}
                        ]
                    }`;
                }
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name, Attributes/Caption,Attributes/AccountName))`,
                    type: 'POST',
                    body: (db) => {
                        let selectedTerritory = v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid');
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key');
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow4Cell1SearchBox')) {
                            searchString = v('rocheBPSPAccountsTerritoriesGridRow4Cell1SearchBox.value').toUpperCase();
                        }
                        return `{"MDX":"
                                        SELECT 
                                       {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Assignment Flag],
                                       [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[REXIS Flag]} 
                                      ON COLUMNS ,
                                      
                                     
                                      ORDER({ 
                                           {FILTER({TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Customers Plan].[Customers Plan].[All Customers Plan ${company}]},
                                            {[Customers Plan].[Customers Plan].[All Customers Plan ${company}]}, RECURSIVE )}, 0)}, 
                                            INSTR(UCASE([Customers Plan].[Customers Plan].CurrentMember.Properties('Account Name')), '${searchString}')>0
                                             OR
                                             INSTR(UCASE([Customers Plan].[Customers Plan].CurrentMember.Properties('Caption')), '${searchString}')>0)
                                             } 
                                      },[Customers Plan].[ Account Name], ASC )
 
                                          ON ROWS 
                                        FROM [Sales Territory to Customer] 
                                        WHERE 
                                          (
                                           [Versions].[Versions].[Live],
                                           [Companies].[Companies].[${company}],
                                           [Receivers].[Receivers].[All Receivers],
                                           [Territories].[Territories].[${v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid')}]
                                          )
                            "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 2,
                        query: [

                            (r, x) => {
                                return {
                                    title: r.Cells[x].Members[4].Attributes['Account Name'] + '  (' + r.Cells[x].Members[4].Name + ')',
                                    accountID: r.Cells[x].Members[4].Name,

                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x].FormattedValue) > 0 ? 1 : 0,
                                    editable: r.Cells[x].RuleDerived === true ? false : true,
                                    cellSkin: r.Cells[x].RuleDerived === true ? 'readonly_bpsp' : '',
                                }
                            },
                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x + 1].FormattedValue) > 0 ? 1 : 0,
                                }
                            }
                        ]
                    }
                },
        },

    rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },

        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryID', v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid'));
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryName', v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid') + ')');
            }
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key');
                    Utils.setWidgetValue('systemValueGlobalSelectedTerritoryID', v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid'));
                    Utils.setWidgetValue('systemValueGlobalSelectedTerritoryName', v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid') + ')');
                    return `{"MDX":"
                    
                    SELECT 
                    {[}ElementAttributes_Territories].[}ElementAttributes_Territories].[Caption],
                    [}ElementAttributes_Territories].[}ElementAttributes_Territories].[Territory Code]} 
                    ON COLUMNS , 
                    {TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Territories].[Territories].[ALL TERRITORIES ${company}]}, 
                    {[Territories].[Territories].[ALL TERRITORIES ${company}]}, RECURSIVE )}, 0)} 
                    ON ROWS 
                       FROM [}ElementAttributes_Territories] 
                                    "}`
                },

                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {
                                active: true,
                                on: v('rocheBPSPTerritoriesGridTable.row') > 0 && r.Cells[x + 1].FormattedValue === v('rocheBPSPTerritoriesGridTable').cellData[v('rocheBPSPTerritoriesGridTable.row')][0].territoryID
                            }
                        },
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }

                    ]
                }

            },
    },

    rocheBPSPAccountsTerritoriesGridRow3Cell1SelectorButton: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox') && v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryID', v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid'));
                Utils.setWidgetValue('systemValueGlobalSelectedTerritoryName', v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid') + ')');
                return {
                    label: v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname') === false ? '1391 UNASSIGNED' : v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryname') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableTerritoriesSelector.open.territoryid') + ')'
                };
            }
        }
    },

    rocheBPSPAccountsTerritoriesGridTable2:
        {
            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox') && v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername');
                return a;
            },
            initDefault: (db) => {
                return [];
            },
            switch: {

                url: (db) => `/api/v1/Processes('MODULE - UI - Account to Territory Reassign')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => {
                    return `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key')}"},
                                {"Name": "pCustomer", "Value": "${v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid')}"},
                                {"Name": "pTerritory", "Value": "${v('rocheBPSPAccountsTerritoriesGridTable2').cellData[v('rocheBPSPAccountsTerritoriesGridTable2.row')][0].customerID}"},
                                {"Name": "pMode", "Value": "${v('rocheBPSPAccountsTerritoriesGridTable2').cellData[v('rocheBPSPAccountsTerritoriesGridTable2.row')][1].value === 0 ? 1 : 0}"}
                        ]
                    }`;
                }
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name, Attributes/Caption,Attributes/AccountName,Attributes/UILevelFormat))`,
                    type: 'POST',
                    body: (db) => {
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key');
                        let selectedCustomer = v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid');
                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGrid2Row4Cell1SearchBox')) {
                            searchString = v('rocheBPSPAccountsTerritoriesGrid2Row4Cell1SearchBox.value').toUpperCase();
                        }
                        return `{"MDX":"
                                WITH
                                     MEMBER [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[IsNElement]
                                     AS IIF(ISLEAF([Territories].[Territories].CurrentMember),'1','0')
                                SELECT 
                                   {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Assignment Flag],
                                   [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[REXIS Flag],
                                   [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[IsNElement]}
                                  ON COLUMNS ,
                                  
                                    {FILTER({TM1DRILLDOWNMEMBER({[Territories].[Territories].[ALL TERRITORIES ${company}]}, ALL, RECURSIVE )},
                                    INSTR(UCASE([Territories].[Territories].[Caption]), '${searchString}')<>0
                                    OR
                                    INSTR(UCASE([Territories].[Territories].[Territory Code]), '${searchString}')<>0
                                    )
                                    }
                                    PROPERTIES [Territories].[Territories].[Caption]

                                    
                                    ON ROWS

                                FROM [Sales Territory to Customer] 
                                WHERE 
                                  (
                                   [Versions].[Versions].[Live],
                                   [Companies].[Companies].[${company}],
                                   [Receivers].[Receivers].[All Receivers],
                                   [Customers Plan].[Customers Plan].[${selectedCustomer}]
                                  )
                            "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 3,
                        query: [

                            (r, x) => {
                                return {
                                    label: r.Cells[x].Members[4].Attributes['Caption'] + '  (' + r.Cells[x].Members[4].Name + ')',
                                    customerID: r.Cells[x].Members[4].Name,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x].Members[4].Attributes['UI Level Format'].replace('a', ''),
                                    level: r.Cells[x].Members[4].Attributes['UI Level Format'].replace('a', ''),
                                }
                            },

                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x].FormattedValue) > 0 ? 1 : 0,
                                    editable: r.Cells[x + 2].FormattedValue === '1' ? true : false,
                                    cellSkin: r.Cells[x + 2].FormattedValue === '1' ? '' : 'readonly_bpsp',
                                    skin: r.Cells[x + 2].FormattedValue === '1' ? 'Settings_toggle_bpsp' : 'label_toggle_bpsp',
                                    titleOn: r.Cells[x + 2].FormattedValue === '1' ? '' : '' + parseInt(r.Cells[x].FormattedValue),
                                }
                            },
                            (r, x) => {
                                return {
                                    value: parseInt(r.Cells[x + 1].FormattedValue) > 0 ? 1 : 0,
                                    editable: r.Cells[x + 1].FormattedValue === '1' ? true : false,
                                    cellSkin: r.Cells[x + 1].FormattedValue === '1' ? '' : 'readonly_bpsp',
                                    skin: r.Cells[x + 1].FormattedValue === '1' ? 'Settings_toggle_bpsp' : 'label_toggle_bpsp',
                                    titleOn: r.Cells[x + 1].FormattedValue === '1' ? '' : '' + parseInt(r.Cells[x].FormattedValue),
                                }
                            }
                        ]
                    }
                },
        },


    rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },

        open: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCustomerID', v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid'));
                Utils.setWidgetValue('systemValueGlobalSelectedCustomerName', v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid') + ')');
            }
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key');
                    Utils.setWidgetValue('systemValueGlobalSelectedCustomerID', v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid'));
                    Utils.setWidgetValue('systemValueGlobalSelectedCustomerName', v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid') + ')');
                    return `{"MDX":"
                        SELECT 
                           {[}ElementAttributes_Customers Plan].[}ElementAttributes_Customers Plan].[Account Name],
                           [}ElementAttributes_Customers Plan].[}ElementAttributes_Customers Plan].[Caption]} 
                          ON COLUMNS , 
                           {TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Customers Plan].[Customers Plan].[All Customers Plan ${company}]}, 
                           {[Customers Plan].[Customers Plan].[All Customers Plan ${company}]}, RECURSIVE )}, 0)} 
                          ON ROWS 
                        FROM [}ElementAttributes_Customers Plan] 
                                    "}`
                },

                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {active: true}
                        },
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }

                    ]
                }

            },
    },

    rocheBPSPAccountsTerritoriesGrid2Row3Cell1SelectorButton: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox') && v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCustomerID', v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid'));
                Utils.setWidgetValue('systemValueGlobalSelectedCustomerName', v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.territoryid') + ')');
                return {
                    label: v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername') === false ? 'Unknow' : v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customername') + ' (' + v('rocheBPSPAccountsTerritoriesHorizontalTableCustomerSelector.open.customerid') + ')'
                };
            }
        }
    },

    rocheBPSPAccountsTerritoriesGridRow3Cell4SaveButton: {

        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Territory to User Update')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {

                return `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`;
            }
        }


    },

    rocheBPSPTerritoriesUsersGridRow3Cell4SaveButton: {

        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Territory to User Update')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {

                return `{
                        "Parameters": [

                                {"Name": "pMode", "Value": "2"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`;
            }
        }

    },

    rocheBPSPTerritoriesUsersTerritoriesGridRow3Cell4SaveButton: {

        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Territory to User Update')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {

                return `{
                        "Parameters": [

                                {"Name": "pMode", "Value": "2"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesUsersTitleGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`;
            }
        }

    },

    rocheBPSPAccountsTerritoriesGrid2Row3Cell4SaveButton: {

        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Account to Territory Update')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {

                return `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsTerritoriesGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`;
            }
        }
    },

    rocheBPSPTerritoriesUsersTerritoriesGrid: {
        init: {
            execute: (db) => {
                return {visible: db.selectedTerritoriesUsersType === 'ByTerritory' ? true : false};
            }
        }

    },

    rocheBPSPTerritoriesUsersGrid: {
        init: {
            execute: (db) => {
                return {visible: db.selectedTerritoriesUsersType === 'ByUser' ? true : false};
            }
        }

    },

    rocheBPSPSettingsGridRow5Cell2Button: {
        launch: {
            execute: (db) => {
                Utils.setWidgetValue('selectedTerritoriesUsersType', 'ByTerritory');
            }
        }

    },


    // rocheBPSPTerritories

    rocheBPSPTerritoriesGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPTerritoriesGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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


    rocheBPSPTerritoriesGridTable:
        {
            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesGridRow1Cell2DropBox');
                return a;
            },
            initDefault: (db) => {
                return [];
            },

            perform: {
                execute: (db) => {
                    Utils.setWidgetValue('selectedTerritoriesUsersType', 'ByTerritory');
                }
            },


            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name, Attributes/Caption,Attributes/TerritoryCode))`,
                    type: 'POST',
                    body: (db) => {
                        let searchString = '';
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesGridRow1Cell2DropBox', 'key') === '' ? '0001' : Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesGridRow1Cell2DropBox', 'key');
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesGridRow2Cell1SearchBox')) {
                            searchString = v('rocheBPSPTerritoriesGridRow2Cell1SearchBox.value').toUpperCase();
                            ;
                        }
                        return `{"MDX":"
                                    WITH MEMBER [}Clients].[}Clients].[All]
                                    AS SUM([}Clients].[}Clients].Members)
                                    MEMBER [Measures Client To Territory].[Measures Client To Territory].[UILevelFormat]
                                    AS [Territories].[Territories].CurrentMember.Properties('UI Level Format')
                                    MEMBER [Measures Client To Territory].[Measures Client To Territory].[TerritoryToProduct]
                                    AS [Sales Territory to Product].([Versions].[Versions].[Live], [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1], [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Flag])
                                    MEMBER [Measures Client To Territory].[Measures Client To Territory].[TerritoryToCustomer]
                                    AS [Sales Territory to Customer].([Versions].[Versions].[Live], [Receivers].[Receivers].[All Receivers], [Customers Plan].[Customers Plan].[All Customers Plan ${company}], [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Assignment Flag])
                                    MEMBER [Measures Client To Territory].[Measures Client To Territory].[IsNElement]
                                    AS IIF(ISLEAF([Territories].[Territories].CurrentMember),'1','0')
                                    SELECT
                                       {([}Clients].[}Clients].[Admin], [Measures Client To Territory].[Measures Client To Territory].[UILevelFormat]),
                                       ([}Clients].[}Clients].[Admin], [Measures Client To Territory].[Measures Client To Territory].[TerritoryToProduct]), 
                                       ([}Clients].[}Clients].[Admin], [Measures Client To Territory].[Measures Client To Territory].[TerritoryToCustomer]), 
                                       ([}Clients].[}Clients].[All], [Measures Client To Territory].[Measures Client To Territory].[Assign Flag]),
                                       ([}Clients].[}Clients].[Admin], [Measures Client To Territory].[Measures Client To Territory].[IsNElement])

                                       } 
                                      ON COLUMNS,
                                      --{TM1DRILLDOWNMEMBER({[Territories].[Territories].[All Territories 1391]}, All, Recursive)}
                                      --PROPERTIES [Territories].[Territories].[Caption]
                                        {FILTER({TM1DRILLDOWNMEMBER({[Territories].[Territories].[ALL TERRITORIES ${company}]},
                                        {[Territories].[Territories].[ALL TERRITORIES ${company}]}, RECURSIVE )}, 
                                        INSTR(UCASE([Territories].[Territories].CurrentMember.Properties('Caption')), '${searchString}')>0)}
                                      ON ROWS 
                                    FROM [Client To Territory] 
                                    WHERE 
                                      (
                                       [Companies].[Companies].[${company}]
                                      )

                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 5,
                        query: [


                            (r, x) => {
                                return {
                                    label: r.Cells[x].Members[1].Attributes['Caption'],
                                    territoryName: r.Cells[x].Members[1].Attributes['Caption'],
                                    territoryID: r.Cells[x].Members[1].Name,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x].FormattedValue
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x].FormattedValue.replace('PL', '')}
                            },

                            (r, x) => {
                                return {
                                    title: parseInt(r.Cells[x + 1].FormattedValue) + ' Products',
                                    skin: 'territories_readonly_text_with_icon_bpsp',
                                    icon: 'icon-edit'
                                }
                            },

                            (r, x) => {
                                return {
                                    title: parseInt(r.Cells[x + 2].FormattedValue) + ' Customers',
                                    skin: 'territories_readonly_text_with_icon_bpsp',
                                    icon: r.Cells[x + 4].FormattedValue === '1' ? 'icon-edit' : '',
                                    cellSkin: r.Cells[x + 4].FormattedValue === '1' ? '' : 'readonly_bpsp'
                                }
                            },
                            (r, x) => {
                                return {
                                    title: r.Cells[x + 4].FormattedValue === '1' ? parseInt(r.Cells[x + 3].FormattedValue) + ' Users' : '',
                                    skin: 'territories_readonly_text_with_icon_bpsp',
                                    icon: r.Cells[x + 4].FormattedValue === '1' ? 'icon-edit' : '',
                                    cellSkin: r.Cells[x + 4].FormattedValue === '1' ? '' : 'readonly_bpsp'

                                }
                            },

                        ]
                    }
                },
        },


    rocheBPSPTerritoriesGridTableCellText05: {
        launch:
            {
                execute: (db) => {
                    WidgetValue['systemValueGlobalSelectedUser'] = Utils.getGridTableCell('rocheBPSPTerritoriesGridTable', 0).title;
                    WidgetValue['systemValueGlobalSelectedUserName'] = Utils.getGridTableCell('rocheBPSPTerritoriesGridTable', 1).title;
                }
            },
    },


    // rocheBPSPTerritoriesProducts

    rocheBPSPTerritoriesProductsGridTable:
        {

            switch: {

                url: (db) => `/api/v1/Processes('MODULE - UI - Territory to Product Update')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (db) => `{
                        "Parameters": [
                                {"Name": "pProduct", "Value": "${v('rocheBPSPTerritoriesProductsGridTable').cellData[v('rocheBPSPTerritoriesProductsGridTable.row')][1].title}"},
                                {"Name": "pTerritory", "Value": "${Utils.getGridTableCell('rocheBPSPTerritoriesGridTable', 0).territoryID}"},
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesGridRow1Cell2DropBox', 'key')}"},
                        ]
                    }`
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => {
                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPTerritoriesGridRow1Cell2DropBox', 'key');
                        let searchString = '';
                        let territoryID = Utils.getGridTableCell('rocheBPSPTerritoriesGridTable', 0).territoryID;
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPTerritoriesProductsGridRow2Cell1SearchBox')) {
                            searchString = v('rocheBPSPTerritoriesProductsGridRow2Cell1SearchBox.value').toUpperCase();
                        }
                        return `{"MDX":"
                                    With
                                    MEMBER [Measures Sales Territory to Product].[Measures Sales Territory to Product].[ProductName] as 
                                                [Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Description')
                                    MEMBER [Measures Sales Territory to Product].[Measures Sales Territory to Product].[ProductCode] as 
                                                [Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Element')
                                    MEMBER [Measures Sales Territory to Product].[Measures Sales Territory to Product].[ProductLevel] as 
                                                [Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Product Level - Name')
                                    
                                    SELECT 
                                       {[Measures Sales Territory to Product].[Measures Sales Territory to Product].[ProductName],
                                       [Measures Sales Territory to Product].[Measures Sales Territory to Product].[ProductCode],
                                       [Measures Sales Territory to Product].[Measures Sales Territory to Product].[ProductLevel],
                                       [Measures Sales Territory to Product].[Measures Sales Territory to Product].[Assignment Input]}
                                       
                                      ON COLUMNS , 
                                         -- {[Products].[BPSP Budget].Members} 
                                         --  PROPERTIES [Products].[BPSP Budget].[BPSP Budget Caption]  
                                        {FILTER({[Products].[BPSP Budget].Members}, 
                                        INSTR(UCASE([Products].[BPSP Budget].CurrentMember.Properties('BPSP Budget Caption')), '${searchString}')>0)} 
                                       PROPERTIES [Products].[BPSP Budget].[BPSP Budget Caption]
                                       
                                       ON ROWS 
                                    FROM [Sales Territory to Product] 
                                    WHERE 
                                      (
                                       [Versions].[Versions].[Live],
                                       [Companies].[Companies].[${company}],
                                       [Territories].[Territories].[${territoryID}]
                                      )
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 4,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x + 2].FormattedValue.replace('a', '')
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 1].FormattedValue,
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 2].FormattedValue,
                                }
                            },

                            (r, x) => {
                                return {
                                    value: r.Cells[x + 3].FormattedValue === '' ? 0 : 1,
                                }
                            }

                        ]
                    }
                },
        },

    rocheBPSPTerritoriesProductsGridRow1Cell2Title: {
        init: {
            execute: (db) => {
                return {title: Utils.getGridTableCell('rocheBPSPTerritoriesGridTable', 0).territoryName};
            }
        }
    },


    rocheBPSPTerritoriesProductsGridRow1Cell4Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },


    rocheBPSPMaterialGridRow4Cell3ExportButton: {
        getFileName: (db) => {
            let s = [], fileName;
            s.push(Utils.getFormattedDate(new Date(), '_', true));
            s.push(db.activeUserName);
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key'));
            return s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
        },
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear),
                    fileName = Repository.rocheBPSPMaterialGridRow4Cell3ExportButton.getFileName(db);
                return {
                    url: 'export?export_key=rocheMaterialMaintenanceExport&file_name=' + fileName + '.xlsx',   // custom_object json
                    fileName: fileName + '.xlsx',
                    activeUserName: db.activeUserName,
                    companyVersion: db.systemValueGlobalCompanyVersion, //Live
                    productPlanVersion: db.systemValueGlobalCompanyProductPlanVersion, //Budget
                    company: Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key'),
                    globalVersion: WidgetValue.systemValueGlobalCompanyVersion,
                    version: WidgetValue.systemValueGlobalCompanyProductPlanVersion,
                    year1: y1,
                    key: 'rocheMaterialMaintenanceExportMDX' // ez a yml
                };
            }
        }
    },

    rocheBPSPMaterialGridRow4Cell3ExportByIpNodeButton: {
        getFileName: (db) => {
            let s = [], fileName;
            s.push(Utils.getFormattedDate(new Date(), '_', true));
            s.push(db.activeUserName);
            s.push(Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key'));
            return s.join('_').replaceAll(':', '_').replaceAll(' ', '_').replaceAll('/', '_');
        },
        launch: {
            download: (db) => {
                let y1 = parseInt(db.systemValueGlobalStartingPlanYear),
                    fileName = Repository.rocheBPSPMaterialGridRow4Cell3ExportButton.getFileName(db);
                return {
                    url: 'export?export_key=rocheMaterialMaintenanceByIpNodeExport&file_name=' + fileName + '.xlsx',   // custom_object json
                    fileName: fileName + '.xlsx',
                    activeUserName: db.activeUserName,
                    companyVersion: db.systemValueGlobalCompanyVersion, //Live
                    productPlanVersion: db.systemValueGlobalCompanyProductPlanVersion, //Budget
                    company: Utils.getDropBoxSelectedItemAttribute('rocheBPSPMaterialGridRow1Cell2DropBox', 'key'),
                    globalVersion: WidgetValue.systemValueGlobalCompanyVersion,
                    version: WidgetValue.systemValueGlobalCompanyProductPlanVersion,
                    year1: y1,
                    key: 'rocheMaterialMaintenanceByIpNodeExportMDX' // ez a yml
                };
            }
        }
    },


    //rocheBPSPAccounts

    rocheBPSPAccountsGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPAccountsGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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


    rocheBPSPAccountsOverviewGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPAccountsGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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


    rocheBPSPAccountsGridRow1Cell4Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPAccountsOverviewGridRow1Cell4Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPAccountHorizontalTable: {
        open: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                let vv = v('rocheBPSPAccountHorizontalTable');
                return `{"Ordinal": ${vv.selectedOrdinal},"Value": \"${vv.selected ? "1" : ""}\"}`
            }
        },
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsGridRow1Cell2DropBox', 'key');
                    let y1 = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']);
                    let y0 = y1 - 1;

                    return `{"MDX":"
      					With 
						  Member [}ElementAttributes_Customers].[}ElementAttributes_Customers].[PrevYear] AS
						      [Sales Actuals by Customer].( [Periods].[Periods].[${y0}],[Companies].[Companies].[${company}],[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1],
						      [Receivers].[Receivers].[All Receivers],[Measures Sales Actuals by Customer].[Measures Sales Actuals by Customer].[Rexis Invoice])
						    Member [}ElementAttributes_Customers].[}ElementAttributes_Customers].[Actual] AS
						      [Sales Actuals by Customer].( [Periods].[Periods].[${y1}],[Companies].[Companies].[${company}],[Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].[PL1],
						      [Receivers].[Receivers].[All Receivers],[Measures Sales Actuals by Customer].[Measures Sales Actuals by Customer].[Rexis Invoice])
						SELECT 
                                   {[}ElementAttributes_Customers].[}ElementAttributes_Customers].[Account Name],
                                   [}ElementAttributes_Customers].[}ElementAttributes_Customers].[Account Number],
                                   [}ElementAttributes_Customers].[}ElementAttributes_Customers].[PrevYear],
                                   [}ElementAttributes_Customers].[}ElementAttributes_Customers].[Actual],
                                   [}ElementAttributes_Customers].[}ElementAttributes_Customers].[Plan Flag]} 
						  ON COLUMNS , 
						   {EXCEPT({DRILLDOWNMEMBER({[Customers].[Customers].[ALL CUSTOMERS ${company}]}, {[Customers].[Customers].[ALL CUSTOMERS ${company}]})},{[Customers].[Customers].[ALL CUSTOMERS ${company}]})} 
						  ON ROWS 
						FROM [}ElementAttributes_Customers] 
                  "}`;

                },
                parsingControl: {
                    type: 'matrix',
                    length: 5,
                    query: [

                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 2].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 3].FormattedValue};
                        }, (r, x) => {
                            return {
                                active: true,
                                ordinal: r.Cells[x + 4].Ordinal,
                                on: r.Cells[x + 4].FormattedValue === '' ? false : true
                            };
                        }
                    ]
                }

            },
    },

    rocheBPSPAccountsOverviewHorizontalTable: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPAccountsOverviewGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },

        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Consolidated;$expand=Members($select=Name, Attributes/Caption,Attributes/AccountName))`,
                type: 'POST',
                body: (db) => {
                    let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsOverviewGridRow1Cell2DropBox', 'key') === false ? Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsGridRow1Cell2DropBox', 'key')
                        : Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsGridRow1Cell2DropBox', 'key');

                    return `{"MDX":"
                       SELECT 
                                {[Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[REXIS Flag],
                                   [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Assignment Flag],
                                   [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Flag - Has plan data],
                                   [Measures Sales Territory to Customer].[Measures Sales Territory to Customer].[Flag - Has actuals]}
                          ON COLUMNS , 
                          NON EMPTY 
                           {EXCEPT({TM1DRILLDOWNMEMBER({[Customers Plan].[Customers Plan].[All Customers Plan ${company}]}, ALL, RECURSIVE )},
                           {[Customers Plan].[Customers Plan].[All Customers Plan ${company}]})}
                           * {TM1FILTERBYLEVEL({TM1DRILLDOWNMEMBER({[Receivers].[Receivers].[TC_12.2020_${company}]}, {[Receivers].[Receivers].[TC_12.2020_${company}]}, RECURSIVE )}, 0)} 
                          ON ROWS 
                        FROM [Sales Territory to Customer] 
                        WHERE 
                          (
                           [Versions].[Versions].[Live],
                           [Companies].[Companies].[${company}],
                           [Territories].[Territories].[All Territories]
                          )
                  "}`;

                },
                parsingControl: {
                    type: 'matrix',
                    length: 4,
                    query: [

                        (r, x) => {
                            return {value: r.Cells[x].Members[3].Attributes['Account Name']};
                        }, (r, x) => {
                            return {value: r.Cells[x].Members[3].Attributes.Caption};
                        }, (r, x) => {
                            return {value: r.Cells[x].Members[4].Attributes.Caption};
                        }, (r, x) => {
                            return {value: r.Cells[x].FormattedValue === 0 ? 'No' : 'Yes'};
                        }, (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue === 0 ? 'No' : 'Yes'};
                        }, (r, x) => {
                            return {value: r.Cells[x + 2].FormattedValue === 0 ? 'No' : 'Yes'};
                        }, (r, x) => {
                            return {value: r.Cells[x + 3].FormattedValue === 0 ? 'No' : 'Yes'};
                        }
                    ]
                }

            },
    },


    rocheBPSPAccountsGridRow2Cell1Button: {

        launch: {

            url: (db) => `/api/v1/Processes('MODULE - UI - Account Maintenance')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) => {

                return `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPAccountsGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`;
            }
        }


    },


    rocheBPSPCompanySettingsGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPCompanySettingsGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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

    rocheBPSPCompanySettingsCheckedOutGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPCompanySettingsCheckedOutGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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


    rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox: {
        choose: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGlobalSelectedCompany', v('rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox.value'));
            }
        },
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
                            let result = [], selected = v('systemValueGlobalSelectedCompany');
                            for (let i = 0; i < r.Cells.length; i = i + 2) {
                                result.push({
                                    'name': r.Cells[i].FormattedValue,
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

    rocheBPSPCompanySettingsCheckedOutGridRow1Cell3Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPCompanySettingsGrowthGridRow1Cell3Button: {
        init: {
            execute: (db) => {
                return {label: db.activeUserName};
            }
        }
    },

    rocheBPSPCompanySettingsCheckedOutGridTable:
        {
            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsCheckedOutGridRow1Cell2DropBox');
                return a;
            },
            initDefault: (db) => {
                return [];
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption,Attributes/BPSPBudgetUILevelFormat))`,
                    type: 'POST',
                    body: (db) => {
                        let u = db.activeUserName.split('/')[0];
                        return `{"MDX":"
                        With
                        MEMBER [Measures Sales Plan Checkout by Product].[Measures Sales Plan Checkout by Product].[Email] as
                        [}ElementAttributes_}Clients].([}ElementAttributes_}Clients].[Email],
                        StrToMember('[}Clients].[${u}/' + [Measures Sales Plan Checkout by Product].[Measures Sales Plan Checkout by Product].[checkout user] + ']'))
                        SELECT
                           {
                           [Measures Sales Plan Checkout by Product].[Measures Sales Plan Checkout by Product].[checkout user],
                           [Measures Sales Plan Checkout by Product].[Measures Sales Plan Checkout by Product].[checkout datetime],
                           [Measures Sales Plan Checkout by Product].[Measures Sales Plan Checkout by Product].[checkout flag],
                           [Measures Sales Plan Checkout by Product].[Measures Sales Plan Checkout by Product].[Email]
                           }
                          ON COLUMNS , 
                          NON EMPTY 
                          {[Products].[BPSP Budget].Members}
                           * {TM1DRILLDOWNMEMBER({[Receivers].[Receivers].[All Receivers]}, ALL, RECURSIVE )}
                          ON ROWS 
                        FROM [Sales Plan Checkout by Product]
                        WHERE 
                          (
                           [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsCheckedOutGridRow1Cell2DropBox', 'key')}],
                           [Versions].[Versions].[Live]
                          )
                                    "}`;
                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 4,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].Members[2].Attributes.Caption
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x].Members[2].Attributes['BPSP Budget UI Level Format'].replace('N', '').replace('C', '')}
                            },

                            (r, x) => {
                                return {title: r.Cells[x].Members[3].Name}
                            },

                            (r, x) => {
                                return {title: r.Cells[x].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },
                            (r, x) => {
                                return {label: 'Force Unlock'}
                            },

                            (r, x) => {
                                return {
                                    label: 'Contact',
                                    url: 'mailto:' + r.Cells[x + 3].FormattedValue
                                }
                            }
                        ]
                    }
                },
        },


    rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning:
        {
            initCondition: (db) => {
                let a = Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsCheckedOutGridRow1Cell2DropBox');
                return a;
            },
            initDefault: (db) => {
                return [];
            },

            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption,Attributes/BPSPBudgetIPUILevelFormat))`,
                    type: 'POST',
                    body: (db) => {
                        let u = db.activeUserName.split('/')[0];
                        return `{"MDX":"
                        With
                        MEMBER [Measures Sales Plan IP Checkout by Materials].[Measures Sales Plan IP Checkout by Materials].[Email] as
                        [}ElementAttributes_}Clients].([}ElementAttributes_}Clients].[Email],
                        StrToMember('[}Clients].[${u}/' + [Measures Sales Plan IP Checkout by Materials].[Measures Sales Plan IP Checkout by Materials].[checkout user] + ']'))
                           SELECT 
                                       {
                                       [Measures Sales Plan IP Checkout by Materials].[Measures Sales Plan IP Checkout by Materials].[checkout user],
                                       [Measures Sales Plan IP Checkout by Materials].[Measures Sales Plan IP Checkout by Materials].[checkout datetime],
                                       [Measures Sales Plan IP Checkout by Materials].[Measures Sales Plan IP Checkout by Materials].[checkout flag],
                                       [Measures Sales Plan IP Checkout by Materials].[Measures Sales Plan IP Checkout by Materials].[Email]
                                       } 
                                      ON COLUMNS , 
                                      NON EMPTY 
                                      {[Materials].[BPSP Budget IP].Members}
                                       * {TM1DRILLDOWNMEMBER({[Receivers].[Receivers].[All Receivers]}, ALL, RECURSIVE )}
                                      ON ROWS 
                                    FROM [Sales Plan IP Checkout by Material] 
                                    WHERE 
                                      (
                                       [Companies].[Companies].[${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsCheckedOutGridRow1Cell2DropBox', 'key')}],
                                       [Versions].[Versions].[Live]
                                      )

                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 4,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].Members[2].Attributes.Caption,
                                    mailTo: r.Cells[x + 3].FormattedValue
                                }
                            },

                            (r, x) => {
                                return {title: r.Cells[x].Members[2].Attributes['BPSP Budget IP UI Level Format'].replace('N', '').replace('C', '')}
                            },

                            (r, x) => {
                                return {title: r.Cells[x].Members[3].Name}
                            },

                            (r, x) => {
                                return {title: r.Cells[x].FormattedValue}
                            },

                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue}
                            },
                            (r, x) => {
                                return {label: 'Force Unlock'}
                            },

                            (r, x) => {
                                return {label: 'Contact'}
                            }
                        ]
                    }
                },
        },


    rocheBPSPCompanySettingsGridRow4Cell1MessageInput: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `{"MDX":"
                SELECT 
                   {[Measures Company Information].[Measures Company Information].[Start page message Title]} 
                   PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON COLUMNS , 
                   {[Companies].[Companies].[All Companies Active^${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGridRow1Cell2DropBox', 'key')}]} 
                   PROPERTIES [Companies].[Companies].[Member description]  ON ROWS 
                FROM [Company Information] 
                WHERE 
                  (
                   [Versions].[Versions].[Live]
                  )
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            return r.Cells[x].FormattedValue;
                        }
                    }
            }
        }
    },

    rocheBPSPCompanySettingsGridRow5Cell1MessageInput: {
        initCondition: (db) => {
            let a = Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsGridRow1Cell2DropBox');
            return a;
        },
        initDefault: (db) => {
            return [];
        },

        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `{"MDX":"
                SELECT 
                   {[Measures Company Information].[Measures Company Information].[Start page message]} 
                   PROPERTIES [Measures Company Information].[Measures Company Information].[Caption]  ON COLUMNS , 
                   {[Companies].[Companies].[All Companies Active^${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGridRow1Cell2DropBox', 'key')}]} 
                   PROPERTIES [Companies].[Companies].[Member description]  ON ROWS 
                FROM [Company Information] 
                WHERE 
                  (
                   [Versions].[Versions].[Live]
                  )
            "}`,
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            return r.Cells[x].FormattedValue;
                        }
                    }
            }
        }
    },


    rocheBPSPCompanySettingsGrowthGridTable:
        {

            initCondition: (db) => {
                let b = Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox') && Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsGrowthGridRow3Cell2DropBox')
                return b;
            },
            initDefault: (db) => {
                return [];
            },
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Consolidated,RuleDerived,Updateable;$expand=Members($select=Name, Attributes/Caption,Attributes/BPSPBudgetUILevelFormat))`,
                    type: 'POST',
                    body: (db) => {

                        let yearzero = Utils.parseNumber(db.systemValueGlobalStartingPlanYear),
                            YearPlusOne = yearzero + 1,
                            YearPlusTwo = yearzero + 2,
                            YearPlusThree = yearzero + 3,
                            yearPlusFour = yearzero + 4;

                        let searchString = '';
                        if (Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsGrowthGridRow3Cell1SearchBox')) {
                            searchString = v('rocheBPSPCompanySettingsGrowthGridRow3Cell1SearchBox.value').toUpperCase();
                        }

                        let company = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox', 'key');
                        let reciver = Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGrowthGridRow3Cell2DropBox', 'key');

                        return `{"MDX":"
                                        With
                                        MEMBER [Years].[Years].[ProductName] as 
                                        [Products Flat].[Products Flat].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                                        MEMBER [Years].[Years].[ProductCode] as 
                                        [Products Flat].[Products Flat].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                                        MEMBER [Years].[Years].[ProductLevel] as 
                                        [Products Flat].[Products Flat].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                                        
                                        SELECT 
                                           {
                                           [Years].[Years].[ProductName],
                                           [Years].[Years].[ProductCode],
                                           [Years].[Years].[ProductLevel],
                                           [Years].[Years].[${yearzero}],
                                           [Years].[Years].[${YearPlusOne}],
                                           [Years].[Years].[${YearPlusTwo}]
                                           } 
                                           
                                          ON COLUMNS , 
                                          {FILTER({[Products Flat].[Products Flat].[PL1],
                                          [Products Flat].[Products Flat].[P225EX_RDC],[Products Flat].[Products Flat].[P2A_100],[Products Flat].[Products Flat].[P305],
                                          [Products Flat].[Products Flat].[P6],[Products Flat].[Products Flat].[458611],[Products Flat].[Products Flat].[458621],
                                          [Products Flat].[Products Flat].[458631],[Products Flat].[Products Flat].[458641],[Products Flat].[Products Flat].[458651],
                                          [Products Flat].[Products Flat].[458360],[Products Flat].[Products Flat].[458400],[Products Flat].[Products Flat].[P15],
                                          [Products Flat].[Products Flat].[458451],[Products Flat].[Products Flat].[458453],[Products Flat].[Products Flat].[458454],
                                          [Products Flat].[Products Flat].[458452],[Products Flat].[Products Flat].[458458],[Products Flat].[Products Flat].[458461],
                                          [Products Flat].[Products Flat].[458455],[Products Flat].[Products Flat].[458459],[Products Flat].[Products Flat].[458456],
                                          [Products Flat].[Products Flat].[458457],[Products Flat].[Products Flat].[458462],[Products Flat].[Products Flat].[458460],
                                          [Products Flat].[Products Flat].[458470],[Products Flat].[Products Flat].[P188],[Products Flat].[Products Flat].[459491],
                                          [Products Flat].[Products Flat].[459492],[Products Flat].[Products Flat].[459493],[Products Flat].[Products Flat].[P184],[Products Flat].[Products Flat].[458855],
                                          [Products Flat].[Products Flat].[458856],[Products Flat].[Products Flat].[458213],[Products Flat].[Products Flat].[P23],[Products Flat].[Products Flat].[458490],
                                          [Products Flat].[Products Flat].[458500],[Products Flat].[Products Flat].[458510],[Products Flat].[Products Flat].[P186],[Products Flat].[Products Flat].[458101],
                                          [Products Flat].[Products Flat].[458111],[Products Flat].[Products Flat].[459090],[Products Flat].[Products Flat].[P187],[Products Flat].[Products Flat].[458550],
                                          [Products Flat].[Products Flat].[458560],[Products Flat].[Products Flat].[458570],[Products Flat].[Products Flat].[P118],[Products Flat].[Products Flat].[459250],
                                          [Products Flat].[Products Flat].[459316],[Products Flat].[Products Flat].[459456],[Products Flat].[Products Flat].[458140],[Products Flat].[Products Flat].[458167],
                                          [Products Flat].[Products Flat].[458168],[Products Flat].[Products Flat].[459130],[Products Flat].[Products Flat].[P132],[Products Flat].[Products Flat].[P316],
                                          [Products Flat].[Products Flat].[458150],[Products Flat].[Products Flat].[458155],[Products Flat].[Products Flat].[458310],[Products Flat].[Products Flat].[458211],
                                          [Products Flat].[Products Flat].[P323],[Products Flat].[Products Flat].[458311],[Products Flat].[Products Flat].[458411],[Products Flat].[Products Flat].[P319],[Products Flat].[Products Flat].[458170],[Products Flat].[Products Flat].[458240],[Products Flat].[Products Flat].[458245],[Products Flat].[Products Flat].[458305],[Products Flat].[Products Flat].[P327],[Products Flat].[Products Flat].[458255],[Products Flat].[Products Flat].[P318],[Products Flat].[Products Flat].[458180],[Products Flat].[Products Flat].[458190],[Products Flat].[Products Flat].[458200],[Products Flat].[Products Flat].[458888],[Products Flat].[Products Flat].[458220],[Products Flat].[Products Flat].[458230],[Products Flat].[Products Flat].[458235],[Products Flat].[Products Flat].[P320],[Products Flat].[Products Flat].[458290],[Products Flat].[Products Flat].[P119],[Products Flat].[Products Flat].[459110],[Products Flat].[Products Flat].[459115],[Products Flat].[Products Flat].[459120],[Products Flat].[Products Flat].[P134],[Products Flat].[Products Flat].[459252],[Products Flat].[Products Flat].[459251],[Products Flat].[Products Flat].[459455],[Products Flat].[Products Flat].[459271],[Products Flat].[Products Flat].[P135],[Products Flat].[Products Flat].[459255],[Products Flat].[Products Flat].[459281],[Products Flat].[Products Flat].[459285],[Products Flat].[Products Flat].[P136],[Products Flat].[Products Flat].[459261],[Products Flat].[Products Flat].[459321],[Products Flat].[Products Flat].[459331],[Products Flat].[Products Flat].[458312],[Products Flat].[Products Flat].[P500],[Products Flat].[Products Flat].[P520],[Products Flat].[Products Flat].[458142],[Products Flat].[Products Flat].[458143],[Products Flat].[Products Flat].[458262],[Products Flat].[Products Flat].[458263],[Products Flat].[Products Flat].[458265],[Products Flat].[Products Flat].[458264],
                                          [Products Flat].[Products Flat].[458322],[Products Flat].[Products Flat].[458693],[Products Flat].[Products Flat].[458699],[Products Flat].[Products Flat].[458552],
                                          [Products Flat].[Products Flat].[458852],[Products Flat].[Products Flat].[458551],[Products Flat].[Products Flat].[P540],[Products Flat].[Products Flat].[458681],
                                          [Products Flat].[Products Flat].[458691],[Products Flat].[Products Flat].[458682],[Products Flat].[Products Flat].[458692],[Products Flat].[Products Flat].[P560],
                                          [Products Flat].[Products Flat].[458854],[Products Flat].[Products Flat].[458871],[Products Flat].[Products Flat].[458872],[Products Flat].[Products Flat].[P310],
                                          [Products Flat].[Products Flat].[P175],[Products Flat].[Products Flat].[459010],[Products Flat].[Products Flat].[459020],[Products Flat].[Products Flat].[459025],
                                          [Products Flat].[Products Flat].[458216],[Products Flat].[Products Flat].[458217],[Products Flat].[Products Flat].[458215],[Products Flat].[Products Flat].[P165],
                                          [Products Flat].[Products Flat].[459440],[Products Flat].[Products Flat].[459445],[Products Flat].[Products Flat].[458214],[Products Flat].[Products Flat].[459011],
                                          [Products Flat].[Products Flat].[459012],[Products Flat].[Products Flat].[459022],[Products Flat].[Products Flat].[P195],[Products Flat].[Products Flat].[458070],
                                          [Products Flat].[Products Flat].[458090],[Products Flat].[Products Flat].[458940],[Products Flat].[Products Flat].[458950],[Products Flat].[Products Flat].[458955],
                                          [Products Flat].[Products Flat].[458010],[Products Flat].[Products Flat].[458011],[Products Flat].[Products Flat].[458012],[Products Flat].[Products Flat].[P128],
                                          [Products Flat].[Products Flat].[459210],[Products Flat].[Products Flat].[459220],[Products Flat].[Products Flat].[P2A_200],[Products Flat].[Products Flat].[P600],
                                          [Products Flat].[Products Flat].[P4403],[Products Flat].[Products Flat].[458346],[Products Flat].[Products Flat].[458371],[Products Flat].[Products Flat].[P4405],
                                          [Products Flat].[Products Flat].[P650],[Products Flat].[Products Flat].[P4404],[Products Flat].[Products Flat].[458225],[Products Flat].[Products Flat].[P4406],
                                          [Products Flat].[Products Flat].[458615],[Products Flat].[Products Flat].[P256],[Products Flat].[Products Flat].[P2A12],[Products Flat].[Products Flat].[P257],
                                          [Products Flat].[Products Flat].[P40],[Products Flat].[Products Flat].[468670],[Products Flat].[Products Flat].[468740],[Products Flat].[Products Flat].[468690],
                                          [Products Flat].[Products Flat].[468760],[Products Flat].[Products Flat].[468661],[Products Flat].[Products Flat].[468761],[Products Flat].[Products Flat].[468771],
                                          [Products Flat].[Products Flat].[468772],[Products Flat].[Products Flat].[468970],[Products Flat].[Products Flat].[468975],[Products Flat].[Products Flat].[468990],
                                          [Products Flat].[Products Flat].[468610],[Products Flat].[Products Flat].[468710],[Products Flat].[Products Flat].[468625],[Products Flat].[Products Flat].[468725],
                                          [Products Flat].[Products Flat].[468790],[Products Flat].[Products Flat].[469350],[Products Flat].[Products Flat].[S0030],[Products Flat].[Products Flat].[P96],
                                          [Products Flat].[Products Flat].[468035],[Products Flat].[Products Flat].[468036],[Products Flat].[Products Flat].[468034],[Products Flat].[Products Flat].[468037],
                                          [Products Flat].[Products Flat].[S0150],[Products Flat].[Products Flat].[P335],[Products Flat].[Products Flat].[469351],[Products Flat].[Products Flat].[S0160],
                                          [Products Flat].[Products Flat].[P330],[Products Flat].[Products Flat].[468023],[Products Flat].[Products Flat].[468024],[Products Flat].[Products Flat].[468031],
                                          [Products Flat].[Products Flat].[468025],[Products Flat].[Products Flat].[468027],[Products Flat].[Products Flat].[468032],[Products Flat].[Products Flat].[468028],
                                          [Products Flat].[Products Flat].[468033]},
                                          INSTR([Products Flat].[Products Flat].CurrentMember.Properties('BPSP Budget Description'), '${searchString}')>0)} 
                                           PROPERTIES [Products Flat].[Products Flat].[Caption]
                                           ON ROWS 
                                        FROM [Sales Parameters by Products Flat] 
                                        WHERE 
                                          (
                                           [Companies].[Companies].[${company}],
                                           [Versions].[Versions].[Live],
                                           [Receivers].[Receivers].[${reciver}],
                                           [Measures Sales Parameters by Products Flat].[Measures Sales Parameters by Products Flat].[Growth rate for Products Copy]
                                          )
                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 6,
                        query: [


                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x + 2].FormattedValue.replace('a', '')
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
                                    title: r.Cells[x + 3].FormattedValue,
                                    cellSkin: r.Cells[x + 3].RuleDerived === false && r.Cells[x + 3].Consolidated === false ? '' : 'readonly_bpsp',
                                    editable: r.Cells[x + 3].RuleDerived === false && r.Cells[x + 3].Consolidated === false ? true : false,
                                }
                            },

                            (r, x) => {
                                return {
                                    title: r.Cells[x + 4].FormattedValue,
                                    cellSkin: r.Cells[x + 4].RuleDerived === false && r.Cells[x + 4].Consolidated === false ? '' : 'readonly_bpsp',
                                    editable: r.Cells[x + 4].RuleDerived === false && r.Cells[x + 4].Consolidated === false ? true : false,
                                }
                            },
                            (r, x) => {
                                return {
                                    title: r.Cells[x + 5].FormattedValue,
                                    cellSkin: r.Cells[x + 5].RuleDerived === false && r.Cells[x + 5].Consolidated === false ? '' : 'readonly_bpsp',
                                    editable: r.Cells[x + 5].RuleDerived === false && r.Cells[x + 5].Consolidated === false ? true : false,
                                }
                            },
                        ]
                    }
                },

            write:
                {
                    url: (db) => `/api/v1/Cubes('Sales Parameters by Products Flat')/tm1.Update`,
                    type: 'POST',
                    body: (db) => `
                    {
                    "Cells": [
                        {"Tuple@odata.bind": [
                            "Dimensions('Versions')/Hierarchies('Versions')/Elements('Live')",
                            
                            "Dimensions('Measures Sales Parameters by Products Flat')/Hierarchies('Measures Sales Parameters by Products Flat')/Elements('Growth rate for Products Copy')",
                
                            "Dimensions('Years')/Hierarchies('Years')/Elements('${db.rocheBPSPCompanySettingsGrowthGridTable.column ? '202' + String(v('rocheBPSPCompanySettingsGrowthGridTable.column') - 2) : '2021'}')", 
                            
                            "Dimensions('Companies')/Hierarchies('Companies')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox', 'key')}')", 
                            
                             "Dimensions('Receivers')/Hierarchies('Receivers')/Elements('${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGrowthGridRow3Cell2DropBox', 'key')}')", 

                            "Dimensions('Products Flat')/Hierarchies('Products Flat')/Elements('${db.rocheBPSPCompanySettingsGrowthGridTable.cellData[db.rocheBPSPCompanySettingsGrowthGridTable.row][1].title}')"
                            ]}],
                    "Value": "${db.rocheBPSPCompanySettingsGrowthGridTable.write.value ? db.rocheBPSPCompanySettingsGrowthGridTable.write.value : '0'}"
                    },
                `

                },
        },

    rocheBPSPCompanySettingsGrowthGridRow3Cell2DropBox: {
        initCondition: (db) => {
            let b = Utils.isValueExistingAndNotEmpty('rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox')
            return b;
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
                       {[}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description],
                        [}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Receiver - Key]} 
                     ON COLUMNS , 
                        {Tm1SubsetToset([Receivers].[Receivers],'zUI ${Utils.getDropBoxSelectedItemAttribute('rocheBPSPCompanySettingsGrowthGridRow1Cell2DropBox', 'key')} Plan Receivers')}
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
                                    on: v('rocheBPSPCompanySettingsGrowthGridRow3Cell2DropBox.value') === r.Cells[i].FormattedValue
                                });
                            }
                            return result;
                        }
                    }
            }
        }
    },


    rocheBPSPCompanySettingsGridTableCustomer:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                    
                            SELECT 
                               {[Measures Control Company Settings].[Measures Control Company Settings].[TI Process],
                               [Measures Control Company Settings].[Measures Control Company Settings].[PopUp Message],
                               [Measures Control Company Settings].[Measures Control Company Settings].[PopUp OK Text],
                               [Measures Control Company Settings].[Measures Control Company Settings].[PopUp CANCEL Text],
                               [Measures Control Company Settings].[Measures Control Company Settings].[Button text],
                               [Measures Control Company Settings].[Measures Control Company Settings].[Button Icon],
                               [Measures Control Company Settings].[Measures Control Company Settings].[Button Color]} 
                              ON COLUMNS , 
                              NON EMPTY 
                               {[Company Settings Buttons].[Company Settings Buttons].[Button1],
                               [Company Settings Buttons].[Company Settings Buttons].[Button2],
                               [Company Settings Buttons].[Company Settings Buttons].[Button3],
                               [Company Settings Buttons].[Company Settings Buttons].[Button4],
                               [Company Settings Buttons].[Company Settings Buttons].[Button5],
                               [Company Settings Buttons].[Company Settings Buttons].[Button6],
                               [Company Settings Buttons].[Company Settings Buttons].[Button7],
                               [Company Settings Buttons].[Company Settings Buttons].[Button8],
                               [Company Settings Buttons].[Company Settings Buttons].[Button9],
                               [Company Settings Buttons].[Company Settings Buttons].[Button10]} 
                              ON ROWS 
                            FROM [Control Company Settings] 
                            WHERE 
                              (
                               [Planning Modules].[Planning Modules].[Customer]
                              )

                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 7,
                        query: [
                            (r, x) => {
                                return {
                                    TIProcess: r.Cells[x].FormattedValue,
                                    PopUpMessage: r.Cells[x + 1].FormattedValue,
                                    PopUpOKText: r.Cells[x + 2].FormattedValue,
                                    PopUpCancelText: r.Cells[x + 3].FormattedValue,
                                    ButtonText: r.Cells[x + 4].FormattedValue,
                                    ButtonIcon: r.Cells[x + 5].FormattedValue,
                                    ButtonColor: r.Cells[x + 6].FormattedValue,

                                    label: r.Cells[x + 4].FormattedValue,
                                    icon: r.Cells[x + 5].FormattedValue,
                                    fontColor: r.Cells[x + 6].FormattedValue,
                                    iconColor: r.Cells[x + 6].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_PL2_locked',

                                }
                            }


                        ]
                    }
                },
        },


    rocheBPSPCompanySettingsPopUpGridRow1Cell1Button: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableCustomer', 0),
                    y = x.ButtonIcon,
                    z = x.iconColor;

                return {
                    icon: y,
                    iconColor: z
                };
            }
        },
    },


    rocheBPSPCompanySettingsPopUpGridRow2Cell1Text: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableCustomer', 0),
                    y = x.PopUpMessage;

                return {
                    title: y,
                    body: '',
                };
            }
        },
    },


    rocheBPSPCompanySettingsPopUpGridRow4Cell1Button: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableCustomer', 0),
                    y = x.PopUpOKText;

                return {
                    label: y,
                };
            }
        },
    },


    rocheBPSPCompanySettingsPopUpGridRow5Cell1Cancel: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableCustomer', 0),
                    y = x.PopUpCancelText;

                return {
                    label: y,
                };
            }
        },
    },


    rocheBPSPCompanySettingsGridTableProduct:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                                    
                        SELECT 
                           {[Measures Control Company Settings].[Measures Control Company Settings].[TI Process],
                           [Measures Control Company Settings].[Measures Control Company Settings].[PopUp Message],
                           [Measures Control Company Settings].[Measures Control Company Settings].[PopUp OK Text],
                           [Measures Control Company Settings].[Measures Control Company Settings].[PopUp CANCEL Text],
                           [Measures Control Company Settings].[Measures Control Company Settings].[Button text],
                           [Measures Control Company Settings].[Measures Control Company Settings].[Button Icon],
                           [Measures Control Company Settings].[Measures Control Company Settings].[Button Color]} 
                          ON COLUMNS , 
                          NON EMPTY 
                           {[Company Settings Buttons].[Company Settings Buttons].[Button1],
                           [Company Settings Buttons].[Company Settings Buttons].[Button2],
                           [Company Settings Buttons].[Company Settings Buttons].[Button3],
                           [Company Settings Buttons].[Company Settings Buttons].[Button4],
                           [Company Settings Buttons].[Company Settings Buttons].[Button5],
                           [Company Settings Buttons].[Company Settings Buttons].[Button6],
                           [Company Settings Buttons].[Company Settings Buttons].[Button7],
                           [Company Settings Buttons].[Company Settings Buttons].[Button8],
                           [Company Settings Buttons].[Company Settings Buttons].[Button9],
                           [Company Settings Buttons].[Company Settings Buttons].[Button10]} 
                          ON ROWS 
                        FROM [Control Company Settings] 
                        WHERE 
                          (
                           [Planning Modules].[Planning Modules].[Product]
                          )

                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 7,
                        query: [
                            (r, x) => {
                                return {
                                    TIProcess: r.Cells[x].FormattedValue,
                                    PopUpMessage: r.Cells[x + 1].FormattedValue,
                                    PopUpOKText: r.Cells[x + 2].FormattedValue,
                                    PopUpCancelText: r.Cells[x + 3].FormattedValue,
                                    ButtonText: r.Cells[x + 4].FormattedValue,
                                    ButtonIcon: r.Cells[x + 5].FormattedValue,
                                    ButtonColor: r.Cells[x + 6].FormattedValue,

                                    label: r.Cells[x + 4].FormattedValue,
                                    icon: r.Cells[x + 5].FormattedValue,
                                    fontColor: r.Cells[x + 6].FormattedValue,
                                    iconColor: r.Cells[x + 6].FormattedValue,
                                    skin: 'gridtable_hierarchy_bpsp_PL2_locked',

                                }
                            }


                        ]
                    }
                },
        },


    rocheBPSPCompanySettingsProductPopUpGridRow1Cell1Button: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableProduct', 0),
                    y = x.ButtonIcon,
                    z = x.iconColor;

                return {
                    icon: y,
                    iconColor: z
                };
            }
        },
    },


    rocheBPSPCompanySettingsProductPopUpGridRow2Cell1Text: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableProduct', 0),
                    y = x.PopUpMessage;

                return {
                    title: y,
                    body: '',
                };
            }
        },
    },


    rocheBPSPCompanySettingsProductPopUpGridRow4Cell1Button: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableProduct', 0),
                    y = x.PopUpOKText;

                return {
                    label: y,
                };
            }
        },

        launch: {
            url: (db) => `/api/v1/Processes('MODULE - UI - BPSP - Submission')/tm1.ExecuteWithReturn`,
            type: 'POST',
            body: (db) =>
                `{
                        "Parameters": [
                                {"Name": "pCompany", "Value": "${Utils.getDropBoxSelectedItemAttribute('rocheBPSPProductReportGridRow1Cell2DropBox', 'key')}"}
                        ]
                    }`
        }


    },


    rocheBPSPCompanySettingsProductPopUpGridRow5Cell1Cancel: {
        init: {
            execute: (db) => {
                let x = Utils.getGridTableCell('rocheBPSPCompanySettingsGridTableProduct', 0),
                    y = x.PopUpCancelText;

                return {
                    label: y,
                };
            }
        },
    },


}
;