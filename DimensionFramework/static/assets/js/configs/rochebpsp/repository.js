/* global app */
'use strict';
app.repository = {
    rocheBPSPMainApplicationInit: {
        init: {
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
                            return true;
                        }
                    }
            }
        },
        /*   state: (db) => {

               WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';
               WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';
           }*/
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
                    WidgetValue['systemValueFocusedProduct'] = Utils.getGridTableCell('rocheBPSPProductsGridTableYearly', 1).title;
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
                    WidgetValue['systemValueFocusedProduct'] = Utils.getGridTableCell('rocheBPSPProductsGridTableYearly', 1).title;
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
                                {"Name": "pProduct", "Value": "${Utils.getGridTableCell('rocheBPSPProductsGridTableYearly', 1).title}"},
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
        state: (db) => {
            let s = parseInt(WidgetValue['systemValueGlobalStartingPlanYear']),
                sr = WidgetValue['systemValueGlobalSegmentedControlRelativeYear'];
            return [
                {label: s, selected: 'Y0' === sr},
                {label: ++s, selected: 'Y1' === sr},
                {label: ++s, selected: 'Y2' === sr},
                {label: ++s, selected: 'Y3' === sr},
            ];
        },
        switch: {
            execute: (db) => {
                WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = v('rocheBPSPProductsYearSegmentedControl.value');
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
        state: (db) => {
            return {visible: db.systemValueFocusedProduct === 'PL1'};
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderReturnFromFocus: {
        state: (db) => {
            return {visible: db.systemValueFocusedProduct !== 'PL1'};
        }, launch: {
            execute: (db) => {
                WidgetValue['systemValueFocusedProduct'] = 'PL1';
            }
        }
    },

    rocheBPSPProductsGridTableMonthlyHeaderFocusButton: {
        state: (db) => {
            return {visible: db.systemValueFocusedProduct === 'PL1'};
        }
    },

    rocheBPSPProductsGridTableMonthlyHeaderReturnFromFocus: {
        state: (db) => {
            return {visible: db.systemValueFocusedProduct !== 'PL1'};
        }, launch: {
            execute: (db) => {
                WidgetValue['systemValueFocusedProduct'] = 'PL1';
            }
        }
    },

    rocheBPSPProductsProductSelectorShortcutPopupGridTable: {
        initCondition: (db) => {
            let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly';
            return v(g + '.cellData') !== false;
        },
        initDefault: (db) => {
            return [];
        },
        state: (db) => {
            let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly';
            return v(g + '.cellData').filter(e => ['PL1', 'PL2', 'PL3'].includes(e[0].productLevel)).map(e => {
                return [{
                    label: e[0].label,
                    skin: 'gridtable_hierarchy_shortcut_bpsp_' + e[0].productLevel,
                    productCode: e[1].title
                }];
            });
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
        state: (db) => {
            let g = WidgetValue['systemValueSegmentedControlPeriodUnit'] === 'Yearly' ? 'rocheBPSPProductsGridTableYearly' : 'rocheBPSPProductsGridTableMonthly',
                u = Utils.getGridTableCell(g, 0).checkoutUser;
            return {title: `by<b>${u}</b>since<b>2021.04.10 11:22</b>`};
        }
    },

    defaultFunctionsForGridTableYearylHeader: {
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
                previousCell = cells[0][columnIndex--];
            return {
                title: cell.members[5].Name === previousCell.members[5].Name ? '' : cell.members[5].Name,
                body: cell.members[6].Name
            };
        },
        executeForCell: (columnIndex) => {
            let cells = v('rocheBPSPProductsGridTableYearly.cellData'), cell = cells[0][columnIndex],
                previousCell = cells[0][columnIndex--];
            return {
                cellHeaderSkin: cell.members[5].Name === previousCell.members[5].Name ? '' : 'long_border_bpsp'
            };
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText04: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForTextFirstCol(4);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell05: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(5);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText05: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(5);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell06: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(6);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText06: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(6);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell07: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(7);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText07: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(7);
            }
        }
    },

    'rocheBPSPProductsGridTableYearlyHeaderCell-08': {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(8);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText08: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(8);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell09: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(9);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText09: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(9);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell10: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(10);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText10: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(10);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell11: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(11);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText11: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(11);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell12: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(12);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText12: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(12);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderCell13: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForCell(13);
            }
        }
    },

    rocheBPSPProductsGridTableYearlyHeaderText13: {
        initCondition: (db) => {
            return Repository['defaultFunctionsForGridTableYearylHeader'].initCondition();
        },
        initDefault: (db) => {
            return {};
        },
        init: {
            execute: (db) => {
                return Repository['defaultFunctionsForGridTableYearylHeader'].executeForText(13);
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
                         Set DefaultColumnSelection AS
                         {StrToSet([Control].([Measures Control].[Measures Control].[UI ProuctsGridTable DefaultColumnsTuple ${db.systemValueGlobalSegmentedControlRelativeYear}],[Value Type].[Value Type].[String]))}
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[DUMMY] as 1
                         Set PaddingColumns AS
                         {{TM1SubsetToSet([Periods].[Periods],'zUI Padding Years')}*{[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[DUMMY]}}
                        Set WidgetSettingByUser AS
                        {StrToSet('{'+[zSYS Analogic UI User Data].([}Clients].[}Clients].[${db.activeUser}],[zSYS Analogic UI Widget].[zSYS Analogic UI Widget].[rocheBPSPProductsGridTableYearly],[zSYS Analogic UI User Data Measure].[zSYS Analogic UI User Data Measure].[sColumnSelectorTuple])+'}')}
                        MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ColumnSelectionByUser] AS
                        IIF(Count(WidgetSettingByUser)>0,'Head(UNION({WidgetSettingByUser},{PaddingColumns},All),10)','{}')
                        Set ColumnSelectionByUser AS
                        {StrToSet([LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ColumnSelectionByUser])}
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductName] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Description')
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductCaption] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Element')
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductLevel] as [Products].[BPSP ${db.systemValueGlobalCompanyProductPlanVersion}].CurrentMember.Properties('BPSP ${db.systemValueGlobalCompanyProductPlanVersion} Product Level - Name')
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment] as
                            [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[Final Sales Plan],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment Flag])
                         MEMBER [LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutUser] as
                            [Sales Plan by Product].([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI Checkout Flag],[Measures Sales Plan by Product].[Measures Sales Plan by Product].[EditedBy])
                         Set FixColumns AS
                         {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductName]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductCaption]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[ProductLevel]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutFlag]),
                         ([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[zUI CheckOutUser])}
                         Set Comment AS
                            {([Periods].[Periods].[2021],[LineItems Sales Plan by Product].[LineItems Sales Plan by Product].[HasComment])}
                    SELECT 
                      {UNION(HEAD(UNION(UNION({FixColumns},{ColumnSelectionByUser},All),{DefaultColumnSelection},All),15),{Comment},All)}
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
                      )"
            }
       `,
            parsingControl: {
                type: 'matrix',
                length: 16,
                query: [
                    (r, x) => {
                        let result, pl, checkoutUser = r.Cells[x + 4].FormattedValue;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 2 || WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'];
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = Utils.parseNumber(r.Cells[x + 3].FormattedValue) === 3;
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
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 15].FormattedValue !== ''
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 1].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[x + 1].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 2].FormattedValue.replace('PL', ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            members: r.Cells[x + 2].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 5].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 5].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 5].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 6].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 6].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 6].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 7].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 7].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 7].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 8].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 8].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 8].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 9].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 9].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 10].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 10].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 10].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 11].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 11].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 11].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 12].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 12].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 12].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 13].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 13].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 13].Members
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 14].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: r.Cells[x + 14].Members[6].Name !== 'DUMMY',
                            members: r.Cells[x + 14].Members
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            icon: r.Cells[x + 15].FormattedValue === '' ? 'icon-comment-off' : 'icon-comment-on',
                            iconColor: r.Cells[x + 15].FormattedValue === '' ? '#C5C6C6' : '#0066cc',
                            members: r.Cells[x + 15].Members
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
                        -- Create the first 5 column with information
                             Set FixColumns AS
                             {[Periods].[Periods].[ProductName],
                              [Periods].[Periods].[ProductCaption],
                              [Periods].[Periods].[ProductLevel],
                              [Periods].[Periods].[zUI CheckOutFlag],
                              [Periods].[Periods].[zUI CheckOutUser]}
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
                length: 19,
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
                            members: r.Cells[x].Members,
                            productLevel: pl,
                            hasComment: r.Cells[x + 18].FormattedValue === ''
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
                        WidgetValue['systemValueMonthlyRelativeIndex'] = WidgetValue['systemValueMonthlyRelativeIndex'] + 3;
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
    rocheBPSPProductsColumnSelectorPopupDropBox: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{
                    "MDX" : 
                        "SELECT 
                       {[}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[Y0],[}ElementAttributes_zSYS UI Columns Selector].[}ElementAttributes_zSYS UI Columns Selector].[Caption]} 
                      ON COLUMNS , 
                       {TM1SubsetToSet([zSYS UI Columns Selector].[zSYS UI Columns Selector],\\"${db.systemValueGlobalSegmentedControlRelativeYear} selector\\")}  
                      ON ROWS 
                    FROM [}ElementAttributes_zSYS UI Columns Selector]"
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
                                app.widgetValue['activeUserName'] = r.Cells[0].Value;
                                return r.Cells[0].Value;
                            }
                        }
                }

            },
    },

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

    rocheBPSPMainGridRow1Cell5Button: {
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

    rocheBPSPCustomersGridRow1Cell5Button: {
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


    rocheBPSPSettingsGridRow1Cell5Button: {
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


    rocheBPSPProductsCommentShowGridTable: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            body: (db) => `{"MDX":"
			SELECT 
            {[Measures Sales Plan by Product].[Measures Sales Plan by Product].[Comment]}
            PROPERTIES  [Measures Sales Plan by Product]. [Measures Sales Plan by Product].[Caption]
            ON COLUMNS , 
            {[Products].[BPSP Budget].[P6]} PROPERTIES [Products].[BPSP Budget].[Caption]
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


    rocheBPSPMaterialGridRow1Cell3Button: {
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