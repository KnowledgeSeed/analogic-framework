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
                length: 4,
                query: [
                    (r, x) => {
                        return {title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 5%;margin-top:3%;";  >' + r.Cells[x+1].FormattedValue +   '</div>' +  '<div style=\"font-size:10px;color:#B1B3B3;;margin-top:3%;\" >' + r.Cells[x+2].FormattedValue +   '</div>' , body: r.Cells[x+3].FormattedValue }
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
                        return {title: r.Cells[x].FormattedValue + '<br/><div style=\"font-size:10px; float: left;margin-right: 5%;margin-top:3%;";  >' + r.Cells[x+1].FormattedValue +   '</div>' +  '<div style=\"font-size:10px;color:#408CD9;;margin-top:3%;\" >' + r.Cells[x+2].FormattedValue +   '</div>' , body: r.Cells[x+3].FormattedValue }
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
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `
        {
            "MDX" : "
SELECT 
   {[}ElementAttributes_Receivers].[}ElementAttributes_Receivers].[Member description]} 
  ON COLUMNS , 
   {[Receivers].[Receivers].[All Receivers^AD],[Receivers].[Receivers].[All Receivers^AE],[Receivers].[Receivers].[All Receivers^AF],[Receivers].[Receivers].[AG],[Receivers].[Receivers].[All Receivers^AL],[Receivers].[Receivers].[All Receivers^AM],[Receivers].[Receivers].[All Receivers^AN],[Receivers].[Receivers].[All Receivers^AO],[Receivers].[Receivers].[All Receivers^AR],[Receivers].[Receivers].[AS],[Receivers].[Receivers].[All Receivers^AT],[Receivers].[Receivers].[All Receivers^AU],[Receivers].[Receivers].[All Receivers^AW],[Receivers].[Receivers].[All Receivers^AZ],[Receivers].[Receivers].[All Receivers^BA],[Receivers].[Receivers].[All Receivers^BB],[Receivers].[Receivers].[All Receivers^BD],[Receivers].[Receivers].[All Receivers^BE],[Receivers].[Receivers].[All Receivers^BF],[Receivers].[Receivers].[All Receivers^BG],[Receivers].[Receivers].[All Receivers^BH],[Receivers].[Receivers].[All Receivers^BI],[Receivers].[Receivers].[All Receivers^BJ],[Receivers].[Receivers].[All Receivers^BM],[Receivers].[Receivers].[BN],[Receivers].[Receivers].[All Receivers^BO],[Receivers].[Receivers].[BQ],[Receivers].[Receivers].[All Receivers^BR],[Receivers].[Receivers].[All Receivers^BS],[Receivers].[Receivers].[All Receivers^BT],[Receivers].[Receivers].[All Receivers^BW],[Receivers].[Receivers].[All Receivers^BY],[Receivers].[Receivers].[All Receivers^BZ],[Receivers].[Receivers].[C2],[Receivers].[Receivers].[C4],[Receivers].[Receivers].[All Receivers^CA],[Receivers].[Receivers].[All Receivers^CD],[Receivers].[Receivers].[All Receivers^CF],[Receivers].[Receivers].[All Receivers^CG],[Receivers].[Receivers].[All Receivers^CH],[Receivers].[Receivers].[All Receivers^CI],[Receivers].[Receivers].[All Receivers^CK],[Receivers].[Receivers].[All Receivers^CL],[Receivers].[Receivers].[All Receivers^CM],[Receivers].[Receivers].[All Receivers^CN],[Receivers].[Receivers].[All Receivers^CO],[Receivers].[Receivers].[CQ],[Receivers].[Receivers].[All Receivers^CR],[Receivers].[Receivers].[CS],[Receivers].[Receivers].[All Receivers^CU],[Receivers].[Receivers].[All Receivers^CV],[Receivers].[Receivers].[All Receivers^CW],[Receivers].[Receivers].[All Receivers^CY],[Receivers].[Receivers].[All Receivers^CZ],[Receivers].[Receivers].[All Receivers^DE],[Receivers].[Receivers].[All Receivers^DJ],[Receivers].[Receivers].[All Receivers^DK],[Receivers].[Receivers].[All Receivers^DM],[Receivers].[Receivers].[All Receivers^DO],[Receivers].[Receivers].[All Receivers^DZ],[Receivers].[Receivers].[All Receivers^E1],[Receivers].[Receivers].[All Receivers^E2],[Receivers].[Receivers].[EB],[Receivers].[Receivers].[All Receivers^EC],[Receivers].[Receivers].[All Receivers^EE],[Receivers].[Receivers].[All Receivers^EG],[Receivers].[Receivers].[All Receivers^EH],[Receivers].[Receivers].[All Receivers^ER],[Receivers].[Receivers].[All Receivers^ES],[Receivers].[Receivers].[All Receivers^ET],[Receivers].[Receivers].[EWBP],[Receivers].[Receivers].[All Receivers^FI],[Receivers].[Receivers].[All Receivers^FJ],[Receivers].[Receivers].[FM],[Receivers].[Receivers].[All Receivers^FO],[Receivers].[Receivers].[All Receivers^FR],[Receivers].[Receivers].[All Receivers^GA],[Receivers].[Receivers].[All Receivers^GB],[Receivers].[Receivers].[All Receivers^GD],[Receivers].[Receivers].[All Receivers^GE],[Receivers].[Receivers].[All Receivers^GF],[Receivers].[Receivers].[All Receivers^GH],[Receivers].[Receivers].[GI],[Receivers].[Receivers].[All Receivers^GL],[Receivers].[Receivers].[All Receivers^GM],[Receivers].[Receivers].[All Receivers^GN],[Receivers].[Receivers].[All Receivers^GP],[Receivers].[Receivers].[All Receivers^GQ],[Receivers].[Receivers].[All Receivers^GR],[Receivers].[Receivers].[All Receivers^GT],[Receivers].[Receivers].[All Receivers^GU],[Receivers].[Receivers].[All Receivers^GW],[Receivers].[Receivers].[All Receivers^GY],[Receivers].[Receivers].[All Receivers^HK],[Receivers].[Receivers].[All Receivers^HN],[Receivers].[Receivers].[All Receivers^HR],[Receivers].[Receivers].[All Receivers^HT],[Receivers].[Receivers].[All Receivers^HU],[Receivers].[Receivers].[All Receivers^ID],[Receivers].[Receivers].[All Receivers^IE],[Receivers].[Receivers].[All Receivers^IL],[Receivers].[Receivers].[All Receivers^IN],[Receivers].[Receivers].[All Receivers^IQ],[Receivers].[Receivers].[All Receivers^IR],[Receivers].[Receivers].[All Receivers^IS],[Receivers].[Receivers].[All Receivers^IT],[Receivers].[Receivers].[All Receivers^JM],[Receivers].[Receivers].[All Receivers^JO],[Receivers].[Receivers].[All Receivers^JP],[Receivers].[Receivers].[All Receivers^KE],[Receivers].[Receivers].[All Receivers^KG],[Receivers].[Receivers].[All Receivers^KH],[Receivers].[Receivers].[All Receivers^KI],[Receivers].[Receivers].[KM],[Receivers].[Receivers].[All Receivers^KN],[Receivers].[Receivers].[KP],[Receivers].[Receivers].[All Receivers^KR],[Receivers].[Receivers].[All Receivers^KW],[Receivers].[Receivers].[All Receivers^KY],[Receivers].[Receivers].[All Receivers^KZ],[Receivers].[Receivers].[All Receivers^LA],[Receivers].[Receivers].[All Receivers^LB],[Receivers].[Receivers].[All Receivers^LC],[Receivers].[Receivers].[LI],[Receivers].[Receivers].[All Receivers^LK],[Receivers].[Receivers].[All Receivers^LR],[Receivers].[Receivers].[All Receivers^LS],[Receivers].[Receivers].[All Receivers^LT],[Receivers].[Receivers].[All Receivers^LU],[Receivers].[Receivers].[All Receivers^LV],[Receivers].[Receivers].[All Receivers^LY],[Receivers].[Receivers].[All Receivers^M1],[Receivers].[Receivers].[M2],[Receivers].[Receivers].[M3],[Receivers].[Receivers].[M4],[Receivers].[Receivers].[All Receivers^MA],[Receivers].[Receivers].[All Receivers^MC],[Receivers].[Receivers].[All Receivers^MD],[Receivers].[Receivers].[All Receivers^ME],[Receivers].[Receivers].[All Receivers^MG],[Receivers].[Receivers].[All Receivers^MH],[Receivers].[Receivers].[All Receivers^MK],[Receivers].[Receivers].[All Receivers^ML],[Receivers].[Receivers].[All Receivers^MM],[Receivers].[Receivers].[All Receivers^MN],[Receivers].[Receivers].[All Receivers^MO],[Receivers].[Receivers].[All Receivers^MP],[Receivers].[Receivers].[All Receivers^MQ],[Receivers].[Receivers].[All Receivers^MR],[Receivers].[Receivers].[All Receivers^MT],[Receivers].[Receivers].[All Receivers^MU],[Receivers].[Receivers].[All Receivers^MV],[Receivers].[Receivers].[All Receivers^MW],[Receivers].[Receivers].[All Receivers^MX],[Receivers].[Receivers].[All Receivers^MY],[Receivers].[Receivers].[All Receivers^MZ],[Receivers].[Receivers].[All Receivers^NA],[Receivers].[Receivers].[All Receivers^NC],[Receivers].[Receivers].[All Receivers^NE],[Receivers].[Receivers].[All Receivers^NG],[Receivers].[Receivers].[All Receivers^NI],[Receivers].[Receivers].[All Receivers^NL],[Receivers].[Receivers].[All Receivers^NO],[Receivers].[Receivers].[All Receivers^NP],[Receivers].[Receivers].[All Receivers^NR],[Receivers].[Receivers].[All Receivers^NU],[Receivers].[Receivers].[All Receivers^NZ],[Receivers].[Receivers].[All Receivers^OM],[Receivers].[Receivers].[All Receivers^PA],[Receivers].[Receivers].[All Receivers^PE],[Receivers].[Receivers].[All Receivers^PF],[Receivers].[Receivers].[All Receivers^PG],[Receivers].[Receivers].[All Receivers^PH],[Receivers].[Receivers].[All Receivers^PK],[Receivers].[Receivers].[All Receivers^PL],[Receivers].[Receivers].[All Receivers^PM],[Receivers].[Receivers].[PR],[Receivers].[Receivers].[All Receivers^PS],[Receivers].[Receivers].[All Receivers^PT],[Receivers].[Receivers].[All Receivers^PW],[Receivers].[Receivers].[All Receivers^PY],[Receivers].[Receivers].[All Receivers^QA],[Receivers].[Receivers].[All Receivers^RE],[Receivers].[Receivers].[All Receivers^RO],[Receivers].[Receivers].[All Receivers^RS],[Receivers].[Receivers].[All Receivers^RU],[Receivers].[Receivers].[All Receivers^RW],[Receivers].[Receivers].[All Receivers^SA],[Receivers].[Receivers].[All Receivers^SB],[Receivers].[Receivers].[All Receivers^SC],[Receivers].[Receivers].[All Receivers^SD],[Receivers].[Receivers].[All Receivers^SE],[Receivers].[Receivers].[All Receivers^SG],[Receivers].[Receivers].[All Receivers^SI],[Receivers].[Receivers].[All Receivers^SK],[Receivers].[Receivers].[All Receivers^SL],[Receivers].[Receivers].[All Receivers^SM],[Receivers].[Receivers].[All Receivers^SN],[Receivers].[Receivers].[All Receivers^SO],[Receivers].[Receivers].[SQ],[Receivers].[Receivers].[All Receivers^SR],[Receivers].[Receivers].[All Receivers^SS],[Receivers].[Receivers].[All Receivers^ST],[Receivers].[Receivers].[All Receivers^SV],[Receivers].[Receivers].[All Receivers^SX],[Receivers].[Receivers].[All Receivers^SY],[Receivers].[Receivers].[All Receivers^SZ],[Receivers].[Receivers].[TC],[Receivers].[Receivers].[All Receivers^TD],[Receivers].[Receivers].[All Receivers^TG],[Receivers].[Receivers].[All Receivers^TH],[Receivers].[Receivers].[All Receivers^TJ],[Receivers].[Receivers].[TL],[Receivers].[Receivers].[All Receivers^TM],[Receivers].[Receivers].[All Receivers^TN],[Receivers].[Receivers].[All Receivers^TO],[Receivers].[Receivers].[All Receivers^TR],[Receivers].[Receivers].[All Receivers^TT],[Receivers].[Receivers].[All Receivers^TV],[Receivers].[Receivers].[All Receivers^TW],[Receivers].[Receivers].[All Receivers^TZ],[Receivers].[Receivers].[All Receivers^UA],[Receivers].[Receivers].[UB],[Receivers].[Receivers].[All Receivers^UG],[Receivers].[Receivers].[All Receivers^US],[Receivers].[Receivers].[USBP],[Receivers].[Receivers].[All Receivers^UY],[Receivers].[Receivers].[All Receivers^UZ],[Receivers].[Receivers].[All Receivers^VA],[Receivers].[Receivers].[All Receivers^VC],[Receivers].[Receivers].[All Receivers^VE],[Receivers].[Receivers].[VG],[Receivers].[Receivers].[All Receivers^VN],[Receivers].[Receivers].[All Receivers^VU],[Receivers].[Receivers].[All Receivers^WS],[Receivers].[Receivers].[X1],[Receivers].[Receivers].[All Receivers^X2],[Receivers].[Receivers].[X3],[Receivers].[Receivers].[All Receivers^XA],[Receivers].[Receivers].[XD],[Receivers].[Receivers].[All Receivers^XE],[Receivers].[Receivers].[All Receivers^XF],[Receivers].[Receivers].[All Receivers^XG],[Receivers].[Receivers].[All Receivers^XK],[Receivers].[Receivers].[XM],[Receivers].[Receivers].[XO],[Receivers].[Receivers].[All Receivers^XP],[Receivers].[Receivers].[XR],[Receivers].[Receivers].[XS],[Receivers].[Receivers].[All Receivers^XT],[Receivers].[Receivers].[All Receivers^XU],[Receivers].[Receivers].[XW],[Receivers].[Receivers].[All Receivers^XX],[Receivers].[Receivers].[All Receivers^XZ],[Receivers].[Receivers].[All Receivers^YE],[Receivers].[Receivers].[All Receivers^YT],[Receivers].[Receivers].[YU]} 
  ON ROWS 
FROM [}ElementAttributes_Receivers] 
            "}
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
                        let result;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] =  /*Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ||*/ r.Cells[x].Members[4].Attributes['Description'].indexOf('CS Coagulation') !== -1 || r.Cells[x].Members[4].Attributes['Description'].indexOf('CS COAGULATION') !== -1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] = WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] && r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', '') == '4';
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = r.Cells[x].Members[4].Attributes['Description'].indexOf('CORE LAB') !== -1;
                        result = {
                            label: r.Cells[x].Members[4].Attributes['Description'],
                            skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('a', '') + (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? '_locked' : ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            icon: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] ? 'icon-lock' : 'icon-badge',
                            isMainLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'],
                            isLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'],
                            isChildrenLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked']
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Name,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 1].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 2].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 3].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 4].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 5].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 6].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: 0,//??
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        }
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 7].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 8].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
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
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] =  /*Utils.parseNumber(r.Cells[x].FormattedValue) > 0 ||*/ r.Cells[x].Members[4].Attributes['Description'].indexOf('CS Coagulation') !== -1 || r.Cells[x].Members[4].Attributes['Description'].indexOf('CS COAGULATION') !== -1;
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] = WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] && r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', '') == '4';
                        WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked'] = r.Cells[x].Members[4].Attributes['Description'].indexOf('CORE LAB') !== -1;
                        result = {
                            label: r.Cells[x].Members[4].Attributes['Description'],
                            skin: 'gridtable_hierarchy_bpsp_' + r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('a', '') + (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? '_locked' : ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true,
                            icon: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'] ? 'icon-lock' : 'icon-badge',
                            isMainLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked'],
                            isLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'],
                            isChildrenLocked: WidgetValue['systemValueRocheBPSPProductsGridTableYearIsChildrenLocked']
                        };
                        if (WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsMainLocked']) {
                            result['iconColor'] = '#D12D4A';
                        }
                        return result;
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Name,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[4].Attributes['BPSP Budget Product Level - Name'].replace('PL', ''),
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : '',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 1].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: '||||',
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 3].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 4].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 5].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 6].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: 0,//??
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        }
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 7].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 8].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
                        };
                    },
                    (r, x) => {
                        return {
                            title: r.Cells[x + 9].FormattedValue,
                            cellSkin: WidgetValue['systemValueRocheBPSPProductsGridTableYearlyIsLocked'] ? 'locked' : 'readonly_bpsp',
                            cellVisible: true
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








};