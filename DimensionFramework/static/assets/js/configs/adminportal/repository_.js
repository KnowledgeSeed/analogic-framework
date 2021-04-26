﻿/* global app */'use strict';
app.repository = {
    adminPortalUserGridButton: {
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

    adminPortalWidgetCatalogUserGridApplicationDropBox: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
        choose:
                {
                    url: (db) => `/api/v1/ExecuteMDX?`,
                    type: 'POST',
                    body: (db) => `{"MDX":"UPDATE  CUBE [zSYS Analogic UI User Data] SET ([zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridApplicationDropBox],[}Clients].[${db.activeUser}],[zSYS Analogic UI User Data Measure].[sUser]) = '${db.adminPortalWidgetCatalogUserGridApplicationDropBox.choose.value}'"}`


                },
    },

    adminPortalWidgetCatalogUserGridButton: {
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

    adminPortalWidgetCatalogFilterGridParentDropBox: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    server: true,
                    body: (db) => {
                        return {
                            selectedApplication: db.selectedApplication
                        };
                    },
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogFilterGridTypeDropBox: {
        init:
                {
                    url: (db) => `/api/v1/Dimensions('zSYS Analogic UI Widget Type')/Hierarchies('zSYS Analogic UI Widget Type')/Elements?$select=Name&$filter=Level eq 0&$orderby=Name`,
                    type: 'GET',
                    body: () => '',
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.value[x].Name, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogPagingDropBox: {
                init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT {[}Clients].[${db.activeUser}]} on ROWS, {[zSYS Analogic UI User Data Measure].[sValue]}*{[zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridApplicationDropBox],[zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridButton]} on COLUMNS  FROM [zSYS Analogic UI User Data]"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {items: (r, x) => {
                                        app.widgetValue['systemValueMaxPage'] = 2;
                                        return [{name: '10', on: true}, {name: '20'}, {name: '50'}, {name: '100'}];
                                    }}
                    }

                }
//        state:
//                (db) => {
//            return {items: [{name: '10', on: true}, {name: '20'}, {name: '50'}, {name: '100'}]};
//        },
    },
    
    adminPortalWidgetCatalogPageNumber: {
      state: (ctx) => {
          return v('adminPortalWidgetCatalogPageNumber.value') ? {title: v('adminPortalWidgetCatalogPageNumber.value')} : {title: 1};
      }  
    },

//    adminPortalWidgetCatalogPagingButton2: {
//        launch: {
//            execute: (ctx) => {
//                ctx['adminPortalWidgetCatalogPageNumber'].value++; 
//            }
//        }
//    },
//    
//    adminPortalWidgetCatalogPagingButton1: {
//        launch: {
//            execute: (ctx) => {
//                if(v('adminPortalWidgetCatalogPageNumber.value') > 1){
//                    ctx['adminPortalWidgetCatalogPageNumber'].value--;
//                }
//            }
//        }
//    },

    adminPortalWidgetCatalogHorizontalTable: {
//        state: (ctx) => {console.log(v('adminPortalWidgetCatalogPageNumber.value'));return [[],[],[],[]];}
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name,Attributes/WidgetsEnabled))&$orderby=FormattedValue`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
SELECT
               {SUBSET(
	       {FILTER( {FILTER({ {FILTER({ {FILTER({TM1DRILLDOWNMEMBER({[zSYS Analogic UI Definition].[${db.selectedApplication}]},ALL, RECURSIVE )},
               [zSYS Analogic UI Definition].[Application Caption] = '${db.selectedApplication}'
                  	)}
               },InStr([zSYS Analogic UI Definition].[Parent], '${ db.adminPortalWidgetCatalogFilterGridParentDropBox && db.adminPortalWidgetCatalogFilterGridParentDropBox.value ? db.adminPortalWidgetCatalogFilterGridParentDropBox.value : ''}') <> 0
			   )}
				},
               InStr([zSYS Analogic UI Definition].[Type], '${db.adminPortalWidgetCatalogFilterGridTypeDropBox && db.adminPortalWidgetCatalogFilterGridTypeDropBox.value ? db.adminPortalWidgetCatalogFilterGridTypeDropBox.value : ''}' ) <> 0
			   )},
               InStr([zSYS Analogic UI Definition].[ID], '${db.adminPortalWidgetCatalogSearchBox && db.adminPortalWidgetCatalogSearchBox.value ? db.adminPortalWidgetCatalogSearchBox.value : ''}' ) <> 0 OR
               InStr([zSYS Analogic UI Definition].[Caption], '${db.adminPortalWidgetCatalogSearchBox && db.adminPortalWidgetCatalogSearchBox.value ? db.adminPortalWidgetCatalogSearchBox.value : ''}' ) <> 0 )},
               0, ${db.adminPortalWidgetCatalogPagingDropBox && db.adminPortalWidgetCatalogPagingDropBox.value ? db.adminPortalWidgetCatalogPagingDropBox.value : 10})}
                  ON ROWS,
                  ({[}ElementAttributes_zSYS Analogic UI Definition].[ID],
                  [}ElementAttributes_zSYS Analogic UI Definition].[Parent],
                  [}ElementAttributes_zSYS Analogic UI Definition].[Caption],
                  [}ElementAttributes_zSYS Analogic UI Definition].[Type]})
                   ON COLUMNS
                  FROM [}ElementAttributes_zSYS Analogic UI Definition]"}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 4,
                        query: [
                            (r, x) => {
                                return {active: r.Cells[x].Members[0].Attributes.WidgetsEnabled === "1" ? true : false};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue};
                            }, (r, x) => {
                                return {value: r.Cells[x + 2].FormattedValue};
                            }, (r, x) => {
                                return {value: r.Cells[x + 3].FormattedValue};
                            }, (r, x) => {
                                return {value: r.Cells[x + 1].FormattedValue};
                            }, (r, x) => {
                                return {active: r.Cells[x + 3].FormattedValue !== "PageWidget" && r.Cells[x + 3].FormattedValue !== "Application"};
                            }, (r, x) => {
                                return {active: r.Cells[x + 3].FormattedValue !== "Application"};
                            }]
                    }

                },
    },

    adminPortalWidgetCatalogAddNewTitle: {
        state:
                (db) => {
            return {body: db.adminPortalWidgetCatalogHorizontalTable && db.adminPortalWidgetCatalogHorizontalTable.choose ? db.adminPortalWidgetCatalogHorizontalTable.choose.widget : ""};
        },
    },

    adminPortalWidgetCatalogAddNewGridType: {
        init:
                {
                    url: (db) => `/api/v1/Dimensions('zSYS Analogic UI Widget Type')/Hierarchies('zSYS Analogic UI Widget Type')/Elements?$select=Name&$filter=Level eq 0&$orderby=Name`,
                    type: 'GET',
                    body: () => '',
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.value[x].Name, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogAddNewGridUserSpec: {
        state:
                (db) => {
            return {items: [{name: 'true'}, {name: 'false'}]};
        },
    },

    adminPortalWidgetCatalogAddNewGridColumnNum: {
        state:
                (db) => {
            return {visible: v('adminPortalWidgetCatalogAddNewGridType.value') && (v('adminPortalWidgetCatalogAddNewGridType.value') === 'GridWidget' || v('adminPortalWidgetCatalogAddNewGridType.value') === 'GridTableWidget')};
        },
    },

    adminPortalWidgetCatalogAddNewGridRowNum: {
        state:
                (db) => {
            return {visible: v('adminPortalWidgetCatalogAddNewGridType.value') && v('adminPortalWidgetCatalogAddNewGridType.value') === 'GridWidget'};
        },
    },

    adminPortalWidgetCatalogAddNewGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Create New Widget')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pParentWidget", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.choose.widget}"},
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogAddNewGridElementName.value}"},
                                {"Name": "pWidgetPosition", "Value": "${db.adminPortalWidgetCatalogAddNewGridPosition.value}"},
                                {"Name": "pWidgetType", "Value": "${db.adminPortalWidgetCatalogAddNewGridType.value}"},
                                {"Name": "pUserSpecific", "Value": "${db.adminPortalWidgetCatalogAddNewGridUserSpec.value}"},
                                {"Name": "pColumnNumber", "Value": "${db.adminPortalWidgetCatalogAddNewGridColumnNum.value}"},
                                {"Name": "pRowNumber", "Value": "${db.adminPortalWidgetCatalogAddNewGridRowNum.value}"}



                       ]
            }`


                },
    },

    adminPortalWidgetCatalogAddNewGridSourceApplication: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogAddNewGridSourceWidget: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT NON EMPTY
               {FILTER( {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, [zSYS Analogic UI Definition].[ApplicationCaption] = '${(db.adminPortalWidgetCatalogAddNewGridSourceApplication || {}).value || db.selectedApplication}')}
                   ON COLUMNS 
                  FROM [}ElementAttributes_zSYS Analogic UI Definition]
                  WHERE ([}ElementAttributes_zSYS Analogic UI Definition].[Caption])
                  "}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogAddNewGridCloneButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Clone Widget')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetID", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneElementName.value}"},
                                {"Name": "pParentWidget", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.choose.widget}"},
                                {"Name": "pSourceWidgetID", "Value": "${db.adminPortalWidgetCatalogAddNewGridSourceWidget.value}"},
                                {"Name": "pContentDefinition", "Value": "${db.adminPortalWidgetCatalogAddNewGridContent.value}"},
                                {"Name": "pWidgetPosition", "Value": "${db.adminPortalWidgetCatalogAddNewGridClonePosition.value}"}
                       ]
            }`


                },
    },

    adminPortalWidgetCatalogAddNewGridCloneAllSourceApplication: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogAddNewGridCloneAllSourceWidget: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT NON EMPTY
               {FILTER( {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, [zSYS Analogic UI Definition].[ApplicationCaption] = '${(db.adminPortalWidgetCatalogAddNewGridCloneAllSourceApplication || {}).value ||
                                db.selectedApplication}')}
                   ON COLUMNS 
                  FROM [}ElementAttributes_zSYS Analogic UI Definition]
                  WHERE ([}ElementAttributes_zSYS Analogic UI Definition].[Caption])
                  "}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetCatalogAddNewGridCloneAllButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Clone Widget Group')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pParentWidget", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.choose.widget}"},
                                {"Name": "pSourceWidgetID", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllSourceWidget.value}"},
                                {"Name": "pContentDefinition", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllContent.value}"},
                                {"Name": "pWidgetPosition", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllPosition.value}"},
                                {"Name": "pSearchSubstring", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllSearch.value}"},
                                {"Name": "pReplacementString", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllReplace.value}"},
                                {"Name": "pAddPrefix", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllPrefix.value}"},
                                {"Name": "pAddPostfix", "Value": "${db.adminPortalWidgetCatalogAddNewGridCloneAllPostfix.value}"},

                       ]
            }`


                },
    },

    adminPortalWidgetCatalogDeleteWarnGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Widget')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.open.widget}"}
                       ]
            }`


                },
    },

    adminPortalWidgetCatalogDeployWarnGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Deploy Application Batch')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.selectedApplication}"}]}`


                },
    },

    adminPortalEventCatalogUserGridApplicationDropBox: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
        choose:
                {
                    url: (db) => `/api/v1/ExecuteMDX?`,
                    type: 'POST',
                    body: (db) => `{"MDX":"UPDATE  CUBE [zSYS Analogic UI User Data] SET ([zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridApplicationDropBox],[}Clients].[${db.activeUser}],[zSYS Analogic UI User Data Measure].[sValue]) = '${db.adminPortalEventCatalogUserGridApplicationDropBox.choose.value}'"}`


                },
    },

    adminPortalEventCatalogUserGridButton: {
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

    adminPortalEventCatalogHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value,FormattedValue;$expand=Members($select=Name,Attributes/Caption_Default,Attributes/WidgetType))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT NON EMPTY
                {FILTER( { HIERARCHIZE( {TM1SUBSETALL( [zSYS Analogic UI Action] )} ) }, 
                ([zSYS Analogic UI Action].[Application Caption] = '${db.selectedApplication}' AND
                [zSYS Analogic UI Action].[Application Caption] <> 'Application')
                )}*
            {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI ActionList] )}, 0)} *
        	{[zSYS Analogic UI Action Definition Measure].[action]}
                   ON COLUMNS 
                  FROM [zSYS Analogic UI Action Definition]
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            () => {
                                return {active: true};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[0].Attributes.Caption_Default};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[0].Attributes.WidgetType ? r.Cells[x].Members[0].Attributes.WidgetType : ''};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[1].Attributes.Caption_Default};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue ? r.Cells[x].FormattedValue : ''};
                            }, () => {
                                return {active: true};
                            }]
                    }

                },
        delete:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Event')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pAction", "Value": "${db.HorizontalTableEventMap.delete.eventid}"},
                                {"Name": "pActionList", "Value": "${db.HorizontalTableEventMap.delete.actionorder}"},
                                {"Name": "pActionType", "Value": "${db.HorizontalTableEventMap.delete.actionname}"}
                       ]
            }`


                },
    },

    adminPortalDataCatalogUserGridApplicationDropBox: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
        choose:
                {
                    url: (db) => `/api/v1/ExecuteMDX?`,
                    type: 'POST',
                    body: (db) => `{"MDX":"UPDATE  CUBE [zSYS Analogic UI User Data] SET ([zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridApplicationDropBox],[}Clients].[${db.activeUser}],[zSYS Analogic UI User Data Measure].[sValue]) = '${db.adminPortalDataCatalogUserGridApplicationDropBox.choose.value}'"}`


                },
    },

    adminPortalDataCatalogUserGridButton: {
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

    adminPortalDataCatalogHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name,Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"

		SELECT FILTER (
    		 {FILTER(  {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, 
                InStr([zSYS Analogic UI Definition].[ApplicationCaption], '${db.selectedApplication}' ) <> 0 
                )} *
            {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI DataSet List] )}, 0)} *
            {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Data Repository Event Type] )}, 0)} 
            
            ,
            [zSYS Analogic UI Data Repository Measure].[UsedinWidget] > 0)
                   ON COLUMNS, 
                 {[zSYS Analogic UI Data Repository Measure].[UsedinWidget]}  ON ROWS
                  FROM [zSYS Analogic UI Data Repository]
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            () => {
                                return {active: true};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[1].Attributes.Caption};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[3].Attributes.Caption};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[2].Attributes.Caption};
                            }]
                    }

                },
    },

    adminPortalSystemConfigUserGridApplicationDropBox: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
        choose:
                {
                    url: (db) => `/api/v1/ExecuteMDX?`,
                    type: 'POST',
                    body: (db) => `{"MDX":"UPDATE  CUBE [zSYS Analogic UI User Data] SET ([zSYS Analogic UI Widget].[adminPortalWidgetCatalogUserGridApplicationDropBox],[}Clients].[${db.activeUser}],[zSYS Analogic UI User Data Measure].[sValue]) = '${db.adminPortalSystemConfigUserGridApplicationDropBox.choose.value}'"}`


                },
    },

    adminPortalSystemConfigUserGridButton: {
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

    adminPortalSystemConfigHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT {FILTER({TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic Framework Application List] )}, 0)}, [zSYS Analogic Framework Application List].[CaptionDefault] = '${db.selectedApplication}')}*{TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic Framework Parameter] )}, 0)} ON ROWS, ({[zSYS Analogic Framework Parameter Measure].[ParameterValue],[zSYS Analogic Framework Parameter Measure].[ParameterValue]}) ON COLUMNS FROM [zSYS Analogic Framework Parameter]"}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 2,
                        query: [
                            (r, x) => {
                                return {value: r.Cells[x].Members[0].Name};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[1].Name};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue, editable: true, ordinal: x};
                            }]
                    }

                },
        cellEdit:
                {
                    url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                    type: 'PATCH',
                    body: (db) => `{"Ordinal": ${db.adminPortalSystemConfigHorizontalTable.cellEdit.ordinal},"Value": \"${db.adminPortalSystemConfigHorizontalTable.cellEdit.value}\"}`


                },
    },

    adminPortalSystemConfigWidgetTypeHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NONEMPTY({TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Type] )}, 0)}*{TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Parameter List] )}, 0)}) ON ROWS, ({[zSYS Analogic UI Widget Type Definition Measure].[Parameter],[zSYS Analogic UI Widget Type Definition Measure].[Comment]}) ON COLUMNS FROM [zSys Analogic UI Widget Type Definition]"}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 2,
                        query: [
                            (r, x) => {
                                return {value: r.Cells[x].Members[0].Name};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue};
                            }, (r, x) => {
                                return {value: r.Cells[x + 1].FormattedValue};
                            }]
                    }

                },
    },

    adminPortalEventLogsUserGridButton: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT ({[}Clients].[${db.activeUser}]}*{[zSYS Analogic User Parameter Measure].[FullName]})ON COLUMNS FROM [zSYS Analogic User Parameter]"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {label: (r, x) => {
                                        app.widgetValue['activeUserName'] = app.utils.toTitleCase(r.Cells[0].Value);
                                        return app.utils.toTitleCase(r.Cells[0].Value);
                                    }}
                    }

                },
    },

    adminPortalEventLogsApplicationLogsGridHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/MessageLogEntries?$select=TimeStamp,Message&$filter=Logger eq 'TM1.TILogOutput' and startswith(Message, 'Analogic UI - Admin portal') and 
            TimeStamp ge ${app.utils.getTimestamp((db.adminPortalEventLogsApplicationLogsGridFrom || {}).value || "")} and
            TimeStamp le ${app.utils.getTimestamp((db.adminPortalEventLogsApplicationLogsGridTo || {}).value || "", true)}
            &$top=${ db.adminPortalEventLogsApplicationLogsGridTop ? (isNaN(parseInt(db.adminPortalEventLogsApplicationLogsGridTop.value, 10)) ? 10 : parseInt(db.adminPortalEventLogsApplicationLogsGridTop.value, 10)) : 1}&$orderby=TimeStamp desc`,
                    type: 'GET',
                    body: () => '',
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {value: r.value[x].TimeStamp};
                            }, (r, x) => {
                                return {value: r.value[x].Message};
                            }]
                    }

                },
    },

    adminPortalEventLogsAuditLogsGridHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/TransactionLog(Reverse=true,IgnoreStatusMessages=true)?$select=ID,TimeStamp,User,Cube,Tuple,OldValue,NewValue&$filter=TimeStamp gt 2020-01-31T00:00:00.000Z and contains(Cube,'zSYS Analogic') and
            TimeStamp ge ${app.utils.getTimestamp((db.adminPortalEventLogsAuditLogsGridFrom || {}).value || "")} and
            TimeStamp le ${app.utils.getTimestamp((db.adminPortalEventLogsAuditLogsGridTo || {}).value || "", true)}
            &$top=${ db.adminPortalEventLogsAuditLogsGridTop ? (isNaN(parseInt(db.adminPortalEventLogsAuditLogsGridTop.value, 10)) ? 10 : parseInt(db.adminPortalEventLogsAuditLogsGridTop.value, 10)) : 10}&$orderby=TimeStamp desc`,
                    type: 'GET',
                    body: () => '',
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {value: r.value[x].TimeStamp ? r.value[x].TimeStamp : 'null'};
                            }, (r, x) => {
                                return {value: r.value[x].User ? r.value[x].User : 'null'};
                            }, (r, x) => {
                                return {value: r.value[x].Cube ? r.value[x].Cube : 'null'};
                            }, (r, x) => {
                                return {value: r.value[x].Tuple ? r.value[x].Tuple.toString() : 'null'};
                            }, (r, x) => {
                                return {value: r.value[x].OldValue ? r.value[x].OldValue : 'null'};
                            }, (r, x) => {
                                return {value: r.value[x].NewValue ? r.value[x].NewValue.toString() : 'null'};
                            }]
                    }

                },
    },

    adminPortalApplicationsUserGridButton: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT ({[}Clients].[${db.activeUser}]}*{[zSYS Analogic User Parameter Measure].[FullName]})ON COLUMNS FROM [zSYS Analogic User Parameter]"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {label: (r, x) => {
                                        app.widgetValue['activeUserName'] = app.utils.toTitleCase(r.Cells[0].Value);
                                        return app.utils.toTitleCase(r.Cells[0].Value);
                                    }}
                    }

                },
    },

    adminPortalApplicationsDeploymentGridApplication: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
    },

    adminPortalApplicationsDeploymentGridFolder: {
        initCondition:
                (db) => {
            return db.adminPortalApplicationsDeploymentGridApplication && db.adminPortalApplicationsDeploymentGridApplication.value;
        },
        initDefault:
                (db) => {
            return {text: ''};
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
                   SELECT (
                   {
                     [zSYS Analogic Framework Parameter Measure].[ParameterValue]
                    }
                    )
                    ON COLUMNS
                    FROM [zSYS Analogic Framework Parameter]
                    WHERE
                    ( [zSYS Analogic Framework Application List].[${db.adminPortalApplicationsDeploymentGridApplication.value}]
                     ,
                     [zSYS Analogic Framework Parameter].[ApplicationDeploymentFolder])
                    "}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {body: (r, x) => {
                                        return r.Cells[0].Value;
                                    }}
                    }

                },
    },

    adminPortalApplicationsDeploymentGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Deploy Application Batch')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.adminPortalApplicationsDeploymentGridApplication.value}"}]}`


                },
    },

    adminPortalApplicationsBackupGridApplication: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
    },

    adminPortalApplicationsBackupGridFolder: {
        initCondition:
                (db) => {
            return db.adminPortalApplicationsBackupGridApplication && db.adminPortalApplicationsBackupGridApplication.value;
        },
        initDefault:
                (db) => {
            return {body: ''};
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
                   SELECT (
                   {
                     [zSYS Analogic Framework Parameter Measure].[ParameterValue]
                    }
                    )
                    ON COLUMNS
                    FROM [zSYS Analogic Framework Parameter]
                    WHERE
                    ( [zSYS Analogic Framework Application List].[${db.adminPortalApplicationsBackupGridApplication.value}]
                     ,
                     [zSYS Analogic Framework Parameter].[ApplicationDeploymentBackupFolder])
                    "}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {body: (r, x) => {
                                        return r.Cells[0].Value;
                                    }}
                    }

                },
    },

    adminPortalApplicationsRestoreGridApplication: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
    },

    adminPortalApplicationsRestoreGridBackupList: {
        initCondition:
                (db) => {
            return db.adminPortalApplicationsRestoreGridApplication && db.adminPortalApplicationsRestoreGridApplication.value;
        },
        initDefault:
                (db) => {
            return [];
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY 
{TM1SORT( {FILTER( {TM1SUBSETALL( [zSYS Analogic Framework Backup List] )}, [zSYS Analogic Framework Backup List].[ApplicationCaption] = \\"${db.adminPortalApplicationsRestoreGridApplication.value}\\")}, DESC)} on ROWS, 
NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Backup List].[ApplicationCaption]} on COLUMNS 
FROM [}ElementAttributes_zSYS Analogic Framework Backup List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].Members[0].Name, on: x === 0};
                        }
                    }

                },
    },

    adminPortalApplicationsRestoreGridButtonRefresh: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Application Backuplist Refresh')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.adminPortalApplicationsRestoreGridApplication.value}"}]}`


                },
    },

    adminPortalApplicationsRestoreGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Restore Application Batch')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.adminPortalApplicationsRestoreGridApplication.value}"}, {"Name": "pRestoredBackup","Value": "${db.adminPortalApplicationsRestoreGridBackupList.value}"}]}`


                },
    },

    adminPortalApplicationsCreateNewConfigSource: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT NON EMPTY
               {FILTER( {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, [zSYS Analogic UI Definition].[Type] = \\"Application\\")}
                   ON COLUMNS 
                  FROM [}ElementAttributes_zSYS Analogic UI Definition]
                  WHERE ([}ElementAttributes_zSYS Analogic UI Definition].[Caption])
                  "}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue};
                        }
                    }

                },
    },

    adminPortalApplicationsCreateNewGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Create New Application')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.adminPortalApplicationsCreateNewAppName.value}"}, {"Name": "pApplicationWarPath","Value": "${app.utils.escapeText(db.adminPortalApplicationsCreateNewAppWarPath.value)}"}, {"Name": "pApplicationWarName","Value": "${db.adminPortalApplicationsCreateNewAppWarName.value}"}, {"Name": "pApplicationMainPage","Value": "${db.adminPortalApplicationsCreateNewAppMainPage.value}"},{"Name": "pApplicationHost","Value": "${db.adminPortalApplicationsCreateNewAppHost.value}"}, {"Name": "pAppConfigCopyFrom","Value": "${db.adminPortalApplicationsCreateNewConfigSource.value}"}, {"Name": "pApplicationAPIforProxy","Value": "${db.adminPortalApplicationsCreateNewProxy.value}"}, {"Name": "pAppTM1Server","Value": "${db.adminPortalApplicationsCreateNewAppTM1.value}"}]}`


                },
    },

    adminPortalApplicationsDeleteApplication: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT NON EMPTY TM1SubsetToSet([zSYS Analogic Framework Application List],\\"Default\\") on ROWS, NON EMPTY {[}ElementAttributes_zSYS Analogic Framework Application List].[CaptionDefault]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic Framework Application List]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: r.Cells[x].FormattedValue === v('selectedApplication')};
                        }
                    }

                },
    },

    adminPortalApplicationsDeleteGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Delete Application')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.adminPortalApplicationsDeleteApplication.value}"}]}`


                },
    },

    adminPortalWidgetConfigurationTitleGridTitle1: {
        state:
                (db) => {
            return {title: 'Widget Configuration - ' + db.adminPortalWidgetCatalogHorizontalTable.edit.widget};
        },
    },

    adminPortalWidgetConfigurationUserGridButton: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name))),Cells($select=Ordinal,Value)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT ({[}Clients].[${db.activeUser}]}*{[zSYS Analogic User Parameter Measure].[FullName]})ON COLUMNS FROM [zSYS Analogic User Parameter]"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {label: (r, x) => {
                                        app.widgetValue['activeUserName'] = app.utils.toTitleCase(r.Cells[0].Value);
                                        return app.utils.toTitleCase(r.Cells[0].Value);
                                    }}
                    }

                },
    },

    adminPortalWidgetConfigurationTitleGridTitle3: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT {[zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}]} on ROWS, {[}ElementAttributes_zSYS Analogic UI Definition].[ParentPageWidget]} on COLUMNS  FROM [}ElementAttributes_zSYS Analogic UI Definition]"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {title: (r, x) => {
                                        return r.Cells[0].FormattedValue;
                                    }}
                    }

                },
    },

    adminPortalWidgetConfigurationChangeGridOldParentWidget: {
        state:
                (db) => {
            return {body: db.adminPortalWidgetCatalogHorizontalTable.edit.parentwidget};
        },
    },

    adminPortalWidgetConfigurationChangeGridParentWidget: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
	WITH MEMBER 
			[}ElementAttributes_zSYS Analogic UI Definition].[flag] AS 
                   IIF ([zSYS Analogic UI Definition].[zSYS Analogic UI Definition].CURRENTMEMBER.Name =
                   
                   [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}].Parent.Name 
                     , \\"true\\",\\"false\\")         
	SELECT (
		{FILTER(
			{FILTER( {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, [zSYS Analogic UI Definition].[WidgetsEnabled] = \\"1\\")},
			[zSYS Analogic UI Definition].[zSYS Analogic UI Definition].CURRENTMEMBER.Properties(\\"Application\\") 
			= [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}].Properties(\\"Application\\") )})
	ON COLUMNS,
                ( { 
                [}ElementAttributes_zSYS Analogic UI Definition].[flag] }) 
    on ROWS 
    FROM [}ElementAttributes_zSYS Analogic UI Definition]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].Members[1].Attributes.Caption, on: r.Cells[x].FormattedValue === 'true'};
                        }
                    }

                },
    },

    adminPortalWidgetConfigurationChangeGridOldPosition: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT ({ [}ElementAttributes_zSYS Analogic UI Definition].[ChildID]} )ON COLUMNS FROM [}ElementAttributes_zSYS Analogic UI Definition] WHERE ([zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}])"}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {body: (r, x) => {
                                        return r.Cells[x].FormattedValue;
                                    }}
                    }

                },
    },

    adminPortalWidgetConfigurationChangeGridUserSpecific: {
        state:
                (db) => {
            return {items: [{name: 'true'}, {name: 'false'}]};
        },
    },

    adminPortalWidgetConfigurationChangeGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Update Widget')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pParentWidget", "Value": "${db.adminPortalWidgetConfigurationChangeGridParentWidget.value}"},
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}"},
                                {"Name": "pWidgetPosition", "Value": "${db.adminPortalWidgetConfigurationChangeGridPosition.value}"},
                                {"Name": "pUserSpecific", "Value": "${db.adminPortalWidgetConfigurationChangeGridUserSpecific.value}"}
                       ]
            }`


                },
    },

    adminPortalWidgetConfigurationTextGridTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value,FormattedValue,Updateable;$expand=Members($select=Name,Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT
               
                {FILTER(
     {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Parameter List] )}, 0)}, [zSYS Analogic UI Definition].([zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}],[zSYS Analogic UI Definition Measure].[UIInputType]) = \\"text\\" )}   
                   ON ROWS,
                  { [zSYS Analogic UI Definition Measure].[Value],
                    [zSYS Analogic UI Definition Measure].[Name] }
                
                   ON COLUMNS 
                  
                  FROM [zSYS Analogic UI Definition]
                  WHERE ( [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}])
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 2,
                        query: [
                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue};
                            }, (r, x) => {
                                return {placeHolder: r.Cells[x].FormattedValue, value: r.Cells[x].FormattedValue, ordinal: x};
                            }]
                    }

                },
        writeEnd:
                {
                    url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                    type: 'PATCH',
                    body: (db) => `{"Ordinal": ${db.adminPortalWidgetConfigurationTextGridTable.ordinal},"Value": \"${db.adminPortalWidgetConfigurationTextGridTable.value}\"}`


                },
    },

    adminPortalWidgetConfigurationDropBoxGridTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value,FormattedValue,HasPicklist,PicklistValues,Updateable;$expand=Members($select=Name,Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT
               
                {FILTER(
     {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Parameter List] )}, 0)}, [zSYS Analogic UI Definition].([zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}],[zSYS Analogic UI Definition Measure].[UIInputType]) = \\"picklist\\" )}   
                   ON ROWS,
                  { [zSYS Analogic UI Definition Measure].[Value],
                    [zSYS Analogic UI Definition Measure].[Name] }
                
                   ON COLUMNS 
                  
                  FROM [zSYS Analogic UI Definition]
                  WHERE ( [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}])
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 2,
                        query: [
                            (r, x) => {
                                return {title: r.Cells[x + 1].FormattedValue};
                            }, (r, x) => {
                                return r.Cells[x].HasPicklist === true ?
                                        {items: r.Cells[x].PicklistValues.map(t => {
                                                return {name: t, on: t == r.Cells[x].Value ? true : false};
                                            }), ordinal: r.Cells[x].Ordinal} : {items: [], ordinal: x};
                            }]
                    }

                },
        choose:
                {
                    url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                    type: 'PATCH',
                    body: (db) => `{"Ordinal": ${db.adminPortalWidgetConfigurationDropBoxGridTable.ordinal},"Value": \"${db.adminPortalWidgetConfigurationDropBoxGridTable.choose.value}\"}`


                },
    },

    adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name,Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT {FILTER(
     {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Parameter List] )}, 0)}, [zSYS Analogic UI Definition].([zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}],[zSYS Analogic UI Definition Measure].[UIInputType]) = \\"array\\" )}   
                   ON ROWS,
                  {[zSYS Analogic UI Definition Measure].[Name]} ON COLUMNS 
                  FROM [zSYS Analogic UI Definition]
                  WHERE ( [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}])
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {value: r.Cells[x].Members[1].Attributes.Caption};
                            }, (r, x) => {
                                return {value: r.Cells[x].Value};
                            }, () => {
                                return {active: true};
                            }]
                    }

                },
    },

    adminPortalWidgetConfigurationTextGridArrayTextArea: {
        initCondition:
                (db) => {
            return db.adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTable && db.adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTable.edit;
        },
        initDefault:
                (db) => {
            return {value: '', ordinal: 0};
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT               
                  { [zSYS Analogic UI Definition Measure].[Value]}
                   ON COLUMNS
                  FROM [zSYS Analogic UI Definition]
                  WHERE ( [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}],
                         [zSYS Analogic UI Widget Parameter List].[${db.adminPortalWidgetConfigurationTextGridArrayHorizontalTableHorizontalTable.edit.parameterid}])
                  "}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {value: r => r.Cells[0].FormattedValue}
                    }

                },
        save:
                {
                    url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                    type: 'PATCH',
                    body: (db) => `{
                    "Ordinal": 0,
                    "Value": "${db.adminPortalWidgetConfigurationTextGridArrayTextArea.save.value}"
                }`


                },
    },

    adminPortalEventEditHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value,FormattedValue;$expand=Members($select=Name,Attributes/Caption_Default,Attributes/WidgetType))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT NON EMPTY
                {FILTER( { HIERARCHIZE( {TM1SUBSETALL( [zSYS Analogic UI Action] )} ) }, 
                ([zSYS Analogic UI Action].[WidgetId] = '${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}' OR
                [zSYS Analogic UI Action].[WidgetId] = 'Application9')
                )} *
            {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI ActionList] )}, 0)} *
        	{[zSYS Analogic UI Action Definition Measure].[action]}
                   ON 0 
                  FROM [zSYS Analogic UI Action Definition]
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {value: r.Cells[x].Members[0].Attributes.Caption_Default};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[1].Attributes.Caption_Default};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue ? r.Cells[x].FormattedValue : ''};
                            }, () => {
                                return {active: true};
                            }, () => {
                                return {active: true};
                            }]
                    }

                },
        delete:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Event')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pAction", "Value": "${db.analogicPortalEventEditTable.delete.eventid}"},
                                {"Name": "pActionList", "Value": "${db.analogicPortalEventEditTable.delete.actionorder}"},
                                {"Name": "pActionType", "Value": "${db.analogicPortalEventEditTable.delete.actionname}"}
                       ]
            }`


                },
    },

    adminPortalEventEditArgumentHorizontalTable: {
        initCondition:
                (db) => {
            return db.adminPortalEventEditHorizontalTable && db.adminPortalEventEditHorizontalTable.open;
        },
        initDefault:
                (db) => {
            return [];
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"SELECT
		 FILTER (
		{TM1SORT( {TM1FILTERBYPATTERN( {TM1SUBSETALL( [zSYS Analogic UI Action Definition Measure] )}, \\"argument*\\")}, ASC)},
		[zSYS Analogic UI Action Definition].([zSYS Analogic UI Action].[${db.adminPortalEventEditHorizontalTable.open.eventid}],[zSYS Analogic UI ActionList].[${db.adminPortalEventEditHorizontalTable.open.actionorder} Filter]) <> '0')
                   ON COLUMNS 
                  FROM [zSYS Analogic UI Action Definition]
                  WHERE (
                  		[zSYS Analogic UI Action].[${db.adminPortalEventEditHorizontalTable.open.eventid}],
                		[zSYS Analogic UI ActionList].[${db.adminPortalEventEditHorizontalTable.open.actionorder}]
                		)"}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 2,
                        query: [
                            (r, x) => {
                                return {value: r.Cells[x + 1].FormattedValue};
                            }, (r, x) => {
                                // return {value: r.Cells[x + 1].FormattedValue, editable: db.analogicPortalEventEditTable.choose.actionname.includes(`goToUrl`) ? true : false, ordinal: x + 1};
                                return {value: r.Cells[x].FormattedValue, editable: r.Cells[x + 1].FormattedValue.includes('Edit manually', 0) ? true : false, ordinal: x};
                            }, () => {
                                return {active: true};
                            }]
                    }

                },
        cellEdit:
                {
                    url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                    type: 'PATCH',
                    body: (db) => `{"Ordinal": ${db.adminPortalEventEditArgumentHorizontalTable.cellEdit.ordinal},"Value": \"${db.adminPortalEventEditArgumentHorizontalTable.cellEdit.value}\"}`


                },
    },

    adminPortalEventEditGridArgumentDropbox: {
        initCondition:
                (db) => {
            return db.adminPortalEventEditArgumentHorizontalTable && db.adminPortalEventEditArgumentHorizontalTable.open;
        },
        initDefault:
                (db) => {
            return [];
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,HasPicklist,PicklistValues)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT
                    {
    		 	[zSYS Analogic UI Action Definition Measure].[argument${db.adminPortalEventEditArgumentHorizontalTable.open.rowindex + 1}]
                    }
                   ON COLUMNS 
                  FROM [zSYS Analogic UI Action Definition]
                  WHERE (
                  		[zSYS Analogic UI Action].[${db.adminPortalEventEditHorizontalTable.open.eventid}],
                		[zSYS Analogic UI ActionList].[${db.adminPortalEventEditHorizontalTable.open.actionorder}]
                		)
                  
                  "}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {items: (r, x) => {
                                        return r.Cells[x].HasPicklist === true ? r.Cells[x].PicklistValues.map(t => {
                                            return {name: t, on: t === r.Cells[x].FormattedValue ? true : false};
                                        }) : [];
                                    }, ordinal: (r, x) => {
                                        return r.Cells[x].Ordinal;
                                    }}
                    }

                },
        choose:
                {
                    url: (db) => `/api/v1/Cubes('zSYS Analogic UI Action Definition')/tm1.Update`,
                    type: 'POST',
                    body: (db) => `{"Cells": [
		{
                        "Tuple@odata.bind": [
                        "Dimensions('zSYS Analogic UI Action')/Hierarchies('zSYS Analogic UI Action')/Elements('${db.adminPortalEventEditHorizontalTable.open.eventid}')",
                        "Dimensions('zSYS Analogic UI ActionList')/Hierarchies('zSYS Analogic UI ActionList')/Elements('${db.adminPortalEventEditHorizontalTable.open.actionorder}')",
                        "Dimensions('zSYS Analogic UI Action Definition Measure')/Hierarchies('zSYS Analogic UI Action Definition Measure')/Elements('argument${db.adminPortalEventEditArgumentHorizontalTable.open.rowindex + 1}')"
			]
		}
		],
                        "Value": "${db.adminPortalEventEditGridArgumentDropbox.value}"
			}`


                },
    },

    adminPortalEventListenHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value,FormattedValue;$expand=Members($select=Name,Attributes/Caption_Default,Attributes/WidgetType))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
'SELECT NON EMPTY TM1SubsetToSet([zSys Analogic UI Event List],\\"Default\\") on ROWS, {[zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}]}*{[zSys Analogic UI Event List Measure].[sEvent],[zSys Analogic UI Event List Measure].[sMethod],[zSys Analogic UI Event List Measure].[sParameter]} on COLUMNS  FROM [zSys Analogic UI Event List]"}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 3,
                        query: [
                            (r, x) => {
                                return {value: r.Cells[x].Members[0].Name};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue};
                            }, (r, x) => {
                                return {value: r.Cells[x + 1].FormattedValue};
                            }, (r, x) => {
                                return {value: r.Cells[x + 2].FormattedValue};
                            }, () => {
                                return {active: true};
                            }, () => {
                                return {active: true};
                            }]
                    }

                },
        delete:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Event')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pAction", "Value": "${db.analogicPortalEventEditTable.delete.eventid}"},
                                {"Name": "pActionList", "Value": "${db.analogicPortalEventEditTable.delete.actionorder}"},
                                {"Name": "pActionType", "Value": "${db.analogicPortalEventEditTable.delete.actionname}"}
                       ]
            }`


                },
    },

    adminPortalWidgetConfigurationAddEventGridEvent: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" SELECT NON EMPTY {TM1SORT({TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Action] )}, 0)}, ASC)} * {FILTER ( {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Widget Type] )}, 0)}, [zSYS Analogic UI Widget Type].CurrentMember.Name = [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}].Properties(\\"Type\\") )} ON COLUMNS FROM [zSYS Analogic UI Widget Type Action Definition] WHERE ( [zSYS Analogic UI Widget Type Action Definition Measure].[ActionUsed] )"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].Members[1].Name, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetConfigurationAddEventGridAction: {
        init:
                {
                    url: (db) => `/api/v1/Dimensions('zSYS Analogic UI ActionType')/Hierarchies('zSYS Analogic UI ActionType')/Elements?$select=Name&$filter=Level eq 0&$orderby=Name`,
                    type: 'GET',
                    body: (db) => `{"MDX":"
	WITH MEMBER 
			[}ElementAttributes_zSYS Analogic UI Definition].[flag] AS 
                   IIF ([zSYS Analogic UI Definition].[zSYS Analogic UI Definition].CURRENTMEMBER.Name =
                   
                   [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}].Parent.Name 
                     , \\"true\\",\\"false\\")         
	SELECT (
		{FILTER(
			{FILTER( {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, [zSYS Analogic UI Definition].[WidgetsEnabled] = \\"1\\")},
			[zSYS Analogic UI Definition].[zSYS Analogic UI Definition].CURRENTMEMBER.Properties(\\"Application\\") 
			= [zSYS Analogic UI Definition].[${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}].Properties(\\"Application\\") )})
	ON COLUMNS,
                ( { 
                [}ElementAttributes_zSYS Analogic UI Definition].[flag] }) 
    on ROWS 
    FROM [}ElementAttributes_zSYS Analogic UI Definition]"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.value[x].Name, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetConfigurationAddEventGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Add New Event')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}"},
                                {"Name": "pWidgetEvent", "Value": "${db.adminPortalWidgetConfigurationAddEventGridEvent.value}"},
                                {"Name": "pWidgetAction", "Value": "${db.adminPortalWidgetConfigurationAddEventGridAction.value}"}
                       ]
            }`
                    ,
                    validation: (db) => {
                        if (db.adminPortalWidgetConfigurationAddEventGridAction.value === "" || db.adminPortalWidgetConfigurationAddEventGridEvent.value === "") {
                            return {success: false, message: 'Please provide values for all Drop Down!'};
                        }
                        return {success: true};
                    }
                },
    },

    adminPortalWidgetConfigurationDataEditHorizontalTable: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name,Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => `{"MDX":"

		SELECT FILTER (
    		 {FILTER(  {TM1SUBSETALL( [zSYS Analogic UI Definition] )}, 
               [zSYS Analogic UI Definition].[Caption] = '${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}' 
                )} *
            {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI DataSet List] )}, 0)} *
            {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Data Repository Event Type] )}, 0)} 
            
            ,
            [zSYS Analogic UI Data Repository Measure].[UsedinWidget] > 0)
                   ON COLUMNS, 
                 {[zSYS Analogic UI Data Repository Measure].[UsedinWidget]}  ON ROWS
                  FROM [zSYS Analogic UI Data Repository]
                  "}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            () => {
                                return {active: true};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[1].Attributes.Caption};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[3].Attributes.Caption};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[2].Attributes.Caption};
                            }, () => {
                                return {active: true};
                            }]
                    }

                },
    },

    adminPortalWidgetConfigurationDataEditTextArea: {
        initCondition:
                (db) => {
            return db.adminPortalWidgetConfigurationDataEditHorizontalTable && db.adminPortalWidgetConfigurationDataEditHorizontalTable.choose;
        },
        initDefault:
                (db) => {
            return {value: '', ordinal: 0};
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT 
            {[zSYS Analogic UI Definition].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.choose.widgetid}]}*
            {[zSYS Analogic UI DataSet List].[All zSYS Analogic UI Dataset List]} *
            {[zSYS Analogic UI Data Repository Event Type].[All zSYS Analogic UI Data Repository Event Type]} *
            {[zSYS Analogic UI Data Repository Measure].[jsExportLine]}


                   ON COLUMNS 
                  FROM [zSYS Analogic UI Data Repository]
                  "}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {value: r => r.Cells[0].FormattedValue}
                    }

                },
    },

    adminPortalWidgetConfigurationMDXEditHorizontalTable: {
        initCondition:
                (db) => {
            return db.adminPortalWidgetConfigurationDataEditHorizontalTable && db.adminPortalWidgetConfigurationDataEditHorizontalTable.open;
        },
        initDefault:
                (db) => {
            return [];
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,RuleDerived,Updateable;$expand=Members($select=Name);$filter=RuleDerived eq false)`,
                    type: 'POST',
                    body: (db) => `{"MDX":"
                SELECT 
                    {TM1FILTERBYLEVEL( {TM1SUBSETALL( [zSYS Analogic UI Data Repository Measure] )}, 0)}
            ON COLUMNS FROM [zSYS Analogic UI Data Repository]
            WHERE ([zSYS Analogic UI Definition].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.open.widgetid}],
                    [zSYS Analogic UI Data Repository Event Type].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.open.parameter}],
                    [zSYS Analogic UI DataSet List].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.open.dataset}])"}`,
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {active: true};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[1].Name};
                            }, (r, x) => {
                                return {value: r.Cells[x].Members[3].Name};
                            }, (r, x) => {
                                return {value: r.Cells[x].FormattedValue};
                            }]
                    }

                },
    },

    adminPortalWidgetConfigurationMDXEditTextArea: {
        initCondition:
                (db) => {
            return db.adminPortalWidgetConfigurationMDXEditHorizontalTable && db.adminPortalWidgetConfigurationMDXEditHorizontalTable.choose;
        },
        initDefault:
                (db) => {
            return {text: '', ordinal: 0};
        },
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
                    type: 'POST',
                    body: (db) => `{"MDX":" 
		SELECT               
                  { [zSYS Analogic UI Data Repository Measure].[${db.adminPortalWidgetConfigurationMDXEditHorizontalTable.choose.parameter}]}
                   ON COLUMNS
                  FROM [zSYS Analogic UI Data Repository]
                  WHERE ( [zSYS Analogic UI Definition].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.open.widgetid}],
                            [zSYS Analogic UI DataSet List].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.open.dataset}],
                         [zSYS Analogic UI Data Repository Event Type].[${db.adminPortalWidgetConfigurationDataEditHorizontalTable.open.parameter}])
                  "}`,
                    parsingControl: {
                        type: 'object',
                        query:
                                {value: r => r.Cells[0].FormattedValue}
                    }

                },
        save:
                {
                    url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                    type: 'PATCH',
                    body: (db) => `{
                    "Ordinal": 0,
                    "Value": "${db.adminPortalWidgetConfigurationMDXEditTextArea.save.value}"
                }`


                },
    },

    adminPortalWidgetConfigurationCopyContentGridEvent: {
        init:
                {
                    url: (db) => `/api/v1/Dimensions('zSYS Analogic UI Definition')/Hierarchies('zSYS Analogic UI Definition')/Elements?$select=Name,Attributes/Caption&$filter=(Attributes/Type eq '${db.adminPortalWidgetCatalogHorizontalTable.edit.widgettype}')`,
                    type: 'GET',
                    body: () => '',
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.value[x].Attributes.Caption, on: false};
                        }
                    }

                },
    },

    adminPortalWidgetConfigurationCopyContentGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Copy Widget')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetID", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}"},
                                {"Name": "pSourceWidgetID", "Value": "${db.adminPortalWidgetConfigurationCopyContentGridEvent.value}"},
                                {"Name": "pContentDefinition", "Value": "${db.adminPortalWidgetConfigurationCopyContentGridAction.value}"}
                       ]
            }`


                },
    },

    adminPortalApplicationsDeployWarnGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic Framework Deploy Application Batch')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{"Parameters": [ {"Name": "pApplication","Value": "${db.selectedApplication}"}]}`


                },
    },

    adminPortalWidgetConfigurationDeleteWarnGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Event')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pAction", "Value": "${db.adminPortalEventEditHorizontalTable.choose.eventid}"},
                                {"Name": "pActionList", "Value": "${db.adminPortalEventEditHorizontalTable.choose.actionorder}"},
                                {"Name": "pActionType", "Value": "${db.adminPortalEventEditHorizontalTable.choose.actionname}"}
                       ]
            }`


                },
    },

    adminPortalWidgetConfigurationAddListenGridEvent: {
        init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                    type: 'POST',
                    body: (db) => `{"MDX":" SELECT { TM1SubsetToSet([zSYS Analogic UI Action],\\"zSYS Analogic Page EventList - ${db.adminPortalWidgetConfigurationTitleGridTitle3 && db.adminPortalWidgetConfigurationTitleGridTitle3.value ? db.adminPortalWidgetConfigurationTitleGridTitle3.value : 'adminPortalMain'}\\") }
ON COLUMNS FROM [}ElementAttributes_zSYS Analogic UI Action] WHERE ([}ElementAttributes_zSYS Analogic UI Action].[Caption])"}`,
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.Cells[x].Members[1].Name};
                        }
                    }

                },
    },

    adminPortalWidgetConfigurationAddListenGridAction: {
        state:
                (db) => {
            return {items: [{name: 'refresh'}, {name: 'refreshWithState'}, {name: 'refreshWithWaitingForEvent'}]};
        },
    },

    adminPortalWidgetConfigurationAddListenGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Add Listen')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}"},
                                {"Name": "pEvent", "Value": "${db.adminPortalWidgetConfigurationAddListenGridEvent.value}"},
                                {"Name": "pMethod", "Value": "${db.adminPortalWidgetConfigurationAddListenGridAction.value}"},
                                {"Name": "pNonExistinginEventMap", "Value": "${db.adminPortalWidgetConfigurationAddListenGridNonExist.value}"},
                                {"Name": "pParameter", "Value": "${db.adminPortalWidgetConfigurationAddListenGridParameter.value}"}
                       ]
            }`


                },
    },

    adminPortalWidgetConfigurationEditListenGridEvent: {
        init:
                {
                    url: (db) => `/api/v1/Dimensions('zSYS Analogic UI Action')/Hierarchies('zSYS Analogic UI Action')/Subsets('zSYS Analogic Page EventList - ${db.adminPortalWidgetConfigurationTitleGridTitle3 && db.adminPortalWidgetConfigurationTitleGridTitle3.value ? db.adminPortalWidgetConfigurationTitleGridTitle3.value : 'adminPortalMain'}')/Elements?$select=Name,Attributes/Value`,
                    type: 'GET',
                    body: () => '',
                    parsingControl: {
                        type: 'list',
                        query:
                                (r, x) => {
                            return {name: r.value[x].Name, on: r.value[x].Name === v('adminPortalEventListenHorizontalTable.open.eventname')};
                        }
                    }

                },
    },

    adminPortalWidgetConfigurationEditListenGridAction: {
        state:
                (db) => {
            return {items: [{name: 'refresh', on: 'refresh' === v('adminPortalEventListenHorizontalTable.open.method')}, {name: 'refreshWithState', on: 'refreshWithState' === v('adminPortalEventListenHorizontalTable.open.method')}, {name: 'refreshWithWaitingForEvent', on: 'refreshWithWaitingForEvent' === v('adminPortalEventListenHorizontalTable.open.method')}]};
        },
    },

    adminPortalWidgetConfigurationEditListenGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Update Listen')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}"},
                                {"Name": "pEvent", "Value": "${db.adminPortalWidgetConfigurationEditListenGridEvent.value}"},
                                {"Name": "pMethod", "Value": "${db.adminPortalWidgetConfigurationEditListenGridAction.value}"},
                                {"Name": "pParameter", "Value": "${db.adminPortalWidgetConfigurationEditListenGridParameter.value}"},
                                {"Name": "pEventID", "Value": "${db.adminPortalEventListenHorizontalTable.open.eventid}"}
                       ]
            }`


                },
    },

    adminPortalWidgetConfigurationDeleteListenWarnGridButton: {
        launch:
                {
                    url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Listen')/tm1.ExecuteWithReturn`,
                    type: 'POST',
                    body: (db) => `{
                "Parameters": [
                                {"Name": "pWidgetName", "Value": "${db.adminPortalWidgetCatalogHorizontalTable.edit.widget}"},
                                {"Name": "pEventID", "Value": "${db.adminPortalEventListenHorizontalTable.choose.eventid}"}
 
                       ]
            }`


                },
    },

};