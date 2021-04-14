/* global app */'use strict';
app.repository = {
       adminPortalUserGridButton2: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT {[}Clients].[${db.activeUser}]} on ROWS, {[zSYS Analogic UI User Data Measure].[sValue]}*{[zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridApplicationDropBox],[zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridButton]} on COLUMNS  FROM [zSYS Analogic UI User Data]"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {label: (r, x) => {
                                        app.widgetValue['activeUserName'] = app.utils.toTitleCase(r.Cells[1].Value);
                                        app.widgetValue['selectedApplication'] = r.Cells[0].Value;
                                        return app.utils.toTitleCase(r.Cells[1].Value);
                                    }}
                    }

                },
    },
    adminPortalUserGridButton:{
        init:
        {
            url:  (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
            type: 'POST',
          server: true,
                    body: (db) => {
                        return {
                            activeUser: db.activeUser
                        };
                    },
            parsingControl: {
                        type: 'object',
                        query:
                        {label: (r, x) => {
                                        app.widgetValue['activeUserName'] = app.utils.toTitleCase(r.Cells[1].Value);
                                        app.widgetValue['selectedApplication'] = r.Cells[0].Value;
                                        app.widgetValue['defaultFilter'] ='[zSYS Analogic UI Widget Parameter].([zSYS Analogic WidgetParameters].[id],[zSYS Analogic UI Widget Parameter Measure].[value]) <> \\"\\"';
                                        return app.utils.toTitleCase(r.Cells[1].Value);
                                    }}
	             }
	             },
    },
    upload1: {
        upload: (db) => {
            return {
                staging: '\\\\USER-PC\\staging',
                target: '\\\\USER-PC\\ddd',
                preProcessTemplate: v('preprocess.choose.value') === false ? 'Template1' : v('preprocess.choose.value')
            };
        }
    },

    sandyDevSimulationEmployeePopUpEmployeeGridCell3_4DropBox: {
        init: {
            execute: (db) => {
                return {items: [{name: 'test1', on: false}, {name: 'test2', on: false}, {name: 'test3', on: true}]};
            }
        }
    },
    sandyDevSimulationEmployeePopUpEmployeeGridCell4_4DropBox: {
        init: {
            execute: (db) => {
                return {items: [{name: 'test1', on: false}, {name: 'test2', on: false}, {name: 'test3', on: true}]};
            }
        }
    },
    sandyDevSimulationEmployeePopUpEmployeeGridCell55_4Textbox: {
        launch: {
            execute: (db) => {
                return {value: 'test'};
            }
        }
    },
    sandyDevSimulationEmployeePopUpEmployeeGridTextBox5: {
        init: {
            execute: (db) => {
                return {value: 'test'};
            }
        }
    },
    dpick: {
        init: {
            execute: (db) => {
                return {datePicked: "2020.06", minDate: "2020.01", maxDate: "2021.12"};
            }
        }
    },
    testHt: {
        init: {
            execute: (db) => {
                return [
                    [{value: '<dd', editable: false}, {value: 'dd', editable: false}, ],
                    [{value: 'dd', editable: false}, {value: 'dd', editable: false}, ],
                ];
            }
        }
    },
    modosdavidTestLineArea: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => `{"MDX":"
                    SELECT (
                        {TM1SubsetToSet([Year], \\"TestYears${db.modosdavidToggle ? db.modosdavidToggle.launch.value : 0}\\" )}
                    ) ON COLUMNS
                    FROM
                    [}ElementAttributes_Year]
                    WHERE
                    ([}ElementAttributes_Year].[SliderLabel])
            "}`,
                parsingControl: {
                    type: 'list',
                    query:
                            (r, x) => {
                        return {
                            value: r.Cells[x].Value,
                            label: r.Cells[x].Members[1].Name
                        }
                    }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{"MDX":"SELECT ( {TM1SubsetToSet([Year], \\"TestYears${db.modosdavidToggle ? db.modosdavidToggle.launch.value : 0}\\" )}*
{[Line Item BC PPN RnD].[${db.modosdavidToggle ? db.modosdavidToggle.launch.value : 0}], [Line Item BC PPN RnD].[${db.modosdavidToggle ? db.modosdavidToggle.launch.value : 0}],[Line Item BC PPN RnD].[C]}
) ON COLUMNS
FROM [BC PPN RnD]
WHERE
([Product PPN].[00024_01], [Measures BC PPN RnD].[Value])
"}`,
                parsingControl: {
                    type: 'matrix',
                    length: 3,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].Value};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].Value};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 2].Value};
                        }]
                }

            }
        ],
    },

    modosdavidTestVerticalLine: {
        state:
                (db) => {
            return [[
                    {lineVisible: false, value: 0},
                    {lineVisible: true, value: 100, lineStyle: "dotted", lineWidth: 1, labelVisible: true, titleVisible: true, label: "TEST", title: "TEST", lineColor: "#000000", titleColor: "#000000"},
                    {lineVisible: false, value: 500}
                ]];
        },
    },

    modosdavidTestLineNewPage: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name))`,
                type: 'POST',
                body: (db) => `{"MDX":"
                    SELECT (
                        {TM1SubsetToSet([Year], \\"TestYears${db.toggleValue ? db.toggleValue : 0}\\" )}
                    ) ON COLUMNS
                    FROM
                    [}ElementAttributes_Year]
                    WHERE
                    ([}ElementAttributes_Year].[SliderLabel])
            "}`,
                parsingControl: {
                    type: 'list',
                    query:
                            (r, x) => {
                        return {
                            value: r.Cells[x].Value,
                            label: r.Cells[x].Members[1].Name
                        }
                    }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{"MDX":"SELECT ( {TM1SubsetToSet([Year], \\"TestYears${db.toggleValue ? db.toggleValue : 0}\\" )}*
{[Line Item BC PPN RnD].[${db.toggleValue ? db.toggleValue : 0}]}
) ON COLUMNS
FROM [BC PPN RnD]
WHERE
([Product PPN].[00024_01], [Measures BC PPN RnD].[Value])
"}`,
                parsingControl: {
                    type: 'matrix',
                    length: 1,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].Value};
                        },
                                /*                    (r, x) => {
                                 return {value: r.Cells[x + 1].Value};
                                 },
                                 (r, x) => {
                                 return {value: r.Cells[x + 2].Value};
                                 } */]
                }

            }
        ],
    },
    button1: {
      launch: {
          execute: (db, row, col) => {
              console.log(row), console.log(col);
              alert('button1');
          }
      }
    },
    testGridTable: {
        launch: {
          execute: (db, row, col) => {
              console.log(row);console.log(col);
              console.log(Utils.getGridTableCurrentCell('testGridTable'));
              alert('grid');
          }
        },
        init: {
            execute: (db) => {
                return [
                    [{ordinal: 2}, {ordinal: 4}, {title: 'test'}],
                    [{ordinal: 3}, {ordinal: 5}, {title: 'test2'}]
                ];
            }
        }
    }

};
