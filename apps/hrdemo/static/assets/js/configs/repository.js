/* global app */
'use strict';
Repository = {
    hrDemoUserButton: {
        init(db) {
            Utils.setWidgetValue('systemValueSelectedPositons', 'CEO');
            Utils.setWidgetValue('systemValueSelectedHeadcount', 'Permanent');
            Utils.setWidgetValue('systemValueSelectedVersion', 'Base Plan');
            Utils.setWidgetValue('systemValueSelectedVersion2', 'Personal Draft - Best case');
            //Utils.setWidgetValue('systemValueSelectedGroup2', 'Group A');
            return {
                label: db.activeUser
            }
        }
    },
    hrdemoGroups: {
        init() {
            Utils.setWidgetValue('systemValueSelectedEmployees', []);
            Utils.setWidgetValue('systemValueSelectedEmployeeHierarchy', []);
        }
    },
    hrdemoGroupSelectRow1Cell3SegmentedControl: {
        switch() {
            Api.updateContent('hrdemoGroupSelectGridTable');
        }
    },
    hrdemoGroupSelectRow1Cell1Button: {
        launch() {
            Api.removeWidgetValues(['hrdemoGroupSelectGridTable', 'hrdemoGroupSelectRow1Cell3SegmentedControl', 'hrdemoGroupSelectRow2Cell1SegmentedControl'])
            Api.openPage('hrdemoMain');
        }
    },
    'hrdemoGroupSelectGridTableHeaderText-04': {
        init() {
            return {
                title: v('hrdemoGroupSelectRow2Cell1SegmentedControl').selected ? v('hrdemoGroupSelectRow2Cell1SegmentedControl').selected : 'FTE Change'
            }
        }
    },
    hrdemoGroupSelectRow2Cell1SegmentedControl: {
        switch() {
            Api.updateWidgetsContent(['hrdemoGroupSelectGridTable', 'hrdemoGroupSelectGridTableHeaderText-04']);
        }
    },

    hrdemoGroupSelectGridTable: {
        launch() {
            Utils.setWidgetValue('systemValueSelectedGroup', Utils.getGridTableCurrentCell('hrdemoGroupSelectGridTable').group);
            Utils.setWidgetValue('systemValueSelectedGroup2', Utils.getGridTableCurrentCell('hrdemoGroupSelectGridTable').group);
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoGroupSelectGridTable_init',
                        year: v('hrdemoGroupSelectRow1Cell3SegmentedControl').selected ? v('hrdemoGroupSelectRow1Cell3SegmentedControl').selected : '2022',
                        lineitem: v('hrdemoGroupSelectRow2Cell1SegmentedControl').selected ? (v('hrdemoGroupSelectRow2Cell1SegmentedControl').selected).replace(' Change', '') : 'FTE'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {title: r.Cells[x].Members[3].Attributes.Long_name};
                        },
                        (r, x) => {
                            return {title: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 1].FormattedValue};
                        },
                        (r, x) => {
                            return {title: parseInt(r.Cells[x + 1].FormattedValue) - parseInt(r.Cells[x].FormattedValue)};
                        },
                        (r, x) => {
                            return {
                                icon: 'icon-chevron-right1',
                                group: r.Cells[x].Members[3].Attributes.Long_name
                            };
                        },
                    ]
                }
            }
    },

    hrdemoGroupsPageGridTable: {
        launch() {
            Utils.setWidgetValue('systemValueSelectedGroup', Utils.getGridTableCurrentCell('hrdemoGroupsPageGridTable').longname);
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Long_Name, Attributes/Created_DateTime))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoGroupsPageGridTable_init'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 1,
                    query: [
                        (r, x) => {
                            return {
                                title: r.Cells[x].Members[1].Attributes.Long_name,
                                paddingLeft: '10px',
                            };
                        },
                        (r, x) => {
                            return {
                                title: parseInt(r.Cells[x].FormattedValue),
                                marginLeft: '-70px'
                            };
                        },
                        (r, x) => {
                            return {title: r.Cells[x].Members[1].Attributes.Created_DateTime};
                        },
                        (r, x) => {
                            return {
                                icon: 'icon-edit2',
                                group: r.Cells[x].Members[1].Name,
                                longname: r.Cells[x].Members[1].Attributes.Long_name
                            };
                        },
                        (r, x) => {
                            return {
                                icon: 'icon-trash1',
                                group: r.Cells[x].Members[1].Name,
                                longname: r.Cells[x].Members[1].Attributes.Long_name
                            };
                        },
                    ]
                }
            }
    },
    hrdemoPeopleServiceTeamEditorRow2Cell1Tittle: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Attributes/Caption))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    group: v('systemValueSelectedGroup'),
                    key: 'hrdemoPeopleServiceTeamEditorRow1Cell2Title_init'
                };
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        title: (r, x) => {
                            return r.Cells[x].FormattedValue;
                        }
                    }
            }

        },
    },
    hrdemoPeopleServiceTeamList: {
        init() {
            Utils.setWidgetValue('systemValueSourcePage', 'hrdemoPeopleServiceTeamList');
        }
    },
    hrdemoPeopleServiceTeamListRow2Cell1Tittle: {
        reference: 'hrdemoPeopleServiceTeamEditorRow2Cell1Tittle'
    },
    hrdemoPeopleServiceTeamEditorRow1Cell1Button: {
        launch() {
            Utils.setWidgetValue('systemValueTeamEditorTableData', false);
            Utils.setWidgetValue('systemValueSelectedEmployees', []);
            Utils.setWidgetValue('systemValueSelectedGroup', false);
            Utils.setWidgetValue('systemValueClickedElementGroup', false);
            Utils.setWidgetValue('systemValueClickedRow', false);
            Repository.hrdemoPeopleServiceTeamEditorRow1Cell1Button.clearValues();
            Api.openPage('hrdemoMain');
        },
        clearValues() {
            Api.removeWidgetValues(['systemValueEmployeeLevelSelection',
                'systemValueTeamEditorTableData',
                'systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel2GridTable',
                'systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel1GridTable',
                'hrdemoPeopleServiceTeamEditorGridTable',
                'hrdemoPeopleServiceTeamEditorLevel2GridTable',
                'hrdemoPeopleServiceTeamEditorLevel1GridTable',
                'hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text',
                'hrdemoPeopleServiceEmployeeDetailsGridTable',
                'systemValueBackgroundColorLevel1',
                'systemValueBackgroundColorLevel2',
                'systemValueItemsForAgeFilterInEditor',
                'systemValueItemsForLocationFilterInEditor',
                'systemValueItemsForCarFilterInEditor',
                'systemValueItemsForSupervisorFilterInEditor',
                'systemValueItemsForSalaryFilterInEditor',
                'systemValueSelectedCarFilterInEditor',
                'systemValueSelectedAgeFilterInEditor',
                'systemValueSelectedLocationFilterInEditor',
                'systemValueSelectedSupervisorFilterInEditor',
                'systemValueSelectedSalaryFilterInEditor',
                'hrdemoFilterGridTable',
                'hrdemoFilterDetailsGridRow3DropBox',
                'hrdemoFilterDetailsGridRow2Text1',
                'hrdemoFilterDetailsGridRow1Text1']);
        }
    },
    hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControl: {
        switch(db) {
            Utils.setWidgetValue('systemValueTeamEditorTableData', false);
            Utils.setWidgetValue('systemValueClickedElementGroup', false);
            Utils.setWidgetValue('systemValueClickedRow', false);
            Repository.hrdemoPeopleServiceTeamEditorRow1Cell1Button.clearValues();
            Api.openPage('hrdemoPeopleServiceTeamList');
        }
    },
    hrdemoPeopleServiceTeamEditorRow1Cell4Button1: {
        launch() {
            Utils.setWidgetValue('systemValueCurrentYear', false);
            Utils.setWidgetValue('systemValueTeamEditorTableData', false);
            Utils.setWidgetValue('systemValueSelectedEmployees', []);
            Utils.setWidgetValue('systemValueSelectedGroup', false);
            Utils.setWidgetValue('systemValueClickedElementGroup', false);
            Utils.setWidgetValue('systemValueClickedRow', false);
            Repository.hrdemoPeopleServiceTeamEditorRow1Cell1Button.clearValues();
            Api.openPage('hrdemoGroups');
        }
    },
    hrdemoPeopleServiceTeamListGrid: {
        init() {
            Utils.setWidgetValue('systemValueShowDepartment', false);
        }
    },
    hrdemoEditGroupGridRow3TextBox: {
        init() {
            return {
                value: Utils.getGridTableCurrentCell('hrdemoGroupsPageGridTable').longname
            }
        }
    },
    hrdemoPeopleServiceTeamEditorRow1Cell4Button2: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Group Employee Cube Flag Update')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let employeeSet = '[Employees].[Employees].[' + v('systemValueSelectedEmployees').join('],[Employees].[Employees].[') + ']',
                    groupName = Utils.getGridTableCurrentCell('hrdemoGroupsPageGridTable').longname;
                Utils.setWidgetValue('systemValueTeamEditorTableData', false);
                return {
                    groupName: groupName,
                    employeeSet: employeeSet
                }
            }
        },
    },
    hrdemoNewGroupGridRow4Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Create Group')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let
                    groupname = v('hrdemoNewGroupGridRow3TextBox').value;
                return {
                    value: 'Group',
                    defaultText: 'Group',
                    groupname: groupname

                }
            },
            validation(db) {
                let msg = '';
                let groupname = v('hrdemoNewGroupGridRow3TextBox');
                if (groupname.value === '') {
                    let values = [groupname];
                    let result = values.filter(item => !item.value).map(item => item.title);
                    msg = 'Missing Group name' + result.join(', ');
                }
                return {
                    success: !msg,
                    message: msg
                };

            }
        },

    },
    hrdemoEditGroupGridRow4Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Edit Group')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let longname = Utils.getGridTableCurrentCell('hrdemoGroupsPageGridTable').longname,
                    newname = v('hrdemoEditGroupGridRow3TextBox').value;
                return {
                    longname: longname,
                    newname: newname
                }
            }
        },
    },
    hrdemoDeleteGroupGridRow5Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Delete Group')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let longname = Utils.getGridTableCurrentCell('hrdemoGroupsPageGridTable').longname;
                return {
                    longname: longname,

                }
            }
        },
    },
    hrdemoPeopleServiceTeamEditor: {
        init() {
            Utils.setWidgetValue('systemValueSourcePage', 'hrdemoPeopleServiceTeamEditor');
            Utils.setWidgetValue('systemValueSelectedEmployeeHierarchy', []);
            Utils.setWidgetValue('systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel2GridTable', false);
            Utils.setWidgetValue('systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel1GridTable', false);
            Utils.setWidgetValue('systemValueEmployeeLevelSelection', false);
        }
    },
    hrdemoPeopleServiceTeamEditorShadow: {
        initFinished() {
            Api.forceRefresh('hrdemoPeopleServiceTeamEditorLevel1GridTable');
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Normal_Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        group: v('systemValueSelectedGroup')
                    };
                },
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            value: (r, x) => {
                                for (let i = 0; i < r.Cells.length; ++i) {
                                    v('systemValueSelectedEmployees').push(r.Cells[i].Members[0].Name);
                                    v('systemValueSelectedEmployeeHierarchy').push({
                                        department: r.Cells[i + 1].FormattedValue,
                                        team: r.Cells[i].FormattedValue,
                                        employee: r.Cells[i].Members[0].Name
                                    });
                                    i++;
                                }
                                return true;
                            }
                        }
                }
            }
    },

    hrdemoPeopleServiceTeamEditorGridTable: {
        init(ctx) {
            if (v('systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel2GridTable')) {
                if (v('systemValueTeamEditorTableData')) {
                    return this.restRequest.parsingControl.script(v('systemValueTeamEditorTableData'));
                }
                return new RestRequest(this.restRequest)
            }
            return [];
        },
        text_click(ctx) {
            if (ctx.getCell().isActive) {
                Utils.setWidgetValue('systemValueEmployeeLevelSelection', ctx.getGridTableInfo());
                Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorGridTable', 'hrdemoPeopleServiceEmployeeDetailsGridTable']).then(() => {
                    Api.forceRefresh('hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text');
                });
            }
        },
        switch(ctx) {
            if (v('systemValueSelectedEmployees').includes(ctx.getCell().employee)) {
                const index = v('systemValueSelectedEmployees').indexOf(ctx.getCell().employee);
                if (index !== -1) {
                    v('systemValueSelectedEmployees').splice(index, 1);
                    v('systemValueSelectedEmployeeHierarchy').splice(index, 1);
                }
            } else {
                v('systemValueSelectedEmployees').push(ctx.getCell().employee);
                v('systemValueSelectedEmployeeHierarchy').push({
                    department: ctx.getCell().department,
                    team: ctx.getCell().team,
                    employee: ctx.getCell().employee
                })
            }
            Api.updateContent('hrdemoPeopleServiceTeamEditorGridTable').then(() => {
                Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorLevel1GridTable', 'hrdemoPeopleServiceTeamEditorLevel2GridTable', 'hrdemoPeopleServiceEmployeeDetailsGridTable']);
            });
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Group, Attributes/Team, Attributes/Age, Attributes/Car, Attributes/Location, Attributes/Salary, Attributes/Supervisor, Attributes/Department, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoPeopleServiceTeamEditorGridTable_init',
                    previouslyClickedElement: Utils.getGridTableCurrentCell('hrdemoPeopleServiceTeamEditorLevel2GridTable').title,
                    group: v('systemValueSelectedGroup')
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        cells = data.Cells,
                        members,
                        row = 0,
                        cell,
                        filterNames = ['Car', 'Age', 'Location', 'Supervisor', 'Salary'];

                    Utils.setWidgetValue('systemValueTeamEditorTableData', data);

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];

                        c = {
                            titleOn: '',
                            titleOff: '',
                            icon: 'icon-checkbox-on11',
                            iconOff: 'icon-checkbox-off1',
                            employee: members[1].Name,
                            team: members[1].Attributes.Team,
                            department: members[1].Attributes.Department,
                            value: v('systemValueSelectedEmployees').includes(members[1].Name) ? 1 : v(`hrdemoPeopleServiceTeamEditorGridTable_${row}_0`).switch ? v(`hrdemoPeopleServiceTeamEditorGridTable_${row}_0`).switch.value : 0,
                            cellBackgroundColor: '#ffffff'
                        }

                        if (v('systemValueEmployeeLevelSelection') && v('systemValueEmployeeLevelSelection').getCell().employee === members[1].Name) {
                            c.cellBackgroundColor = '#F2F2F2';
                        }
                        for (let i = 0; i < filterNames.length; i++) {
                            Repository.hrdemoPeopleServiceTeamEditorGridTable.filterDisplay(c, filterNames[i], members);
                        }

                        d.push(c);

                        c = {
                            title: members[1].Attributes.Long_name,
                            employee: members[1].Name,
                            cellBackgroundColor: '#ffffff',
                            isActive: true,
                            filters: {
                                car: members[1].Attributes['Car'],
                                age: members[1].Attributes['Age'],
                                location: members[1].Attributes['Location'],
                                supervisor: members[1].Attributes['Supervisor'],
                                salary: members[1].Attributes['Salary']
                            }
                        }

                        if (v('systemValueEmployeeLevelSelection') && v('systemValueEmployeeLevelSelection').getCell().employee === members[1].Name) {
                            c.cellBackgroundColor = '#F2F2F2';
                        }

                        for (let i = 0; i < filterNames.length; i++) {
                            if (Repository.hrdemoPeopleServiceTeamEditorGridTable.filterDisplayForText(c, filterNames[i], members)) {
                                c.titleFontColor = '#AEAEB2';
                                c.icon = '';
                                c.isActive = false;
                            }
                        }

                        d.push(c);

                        ++k;
                        ++row;
                        result.push(d);
                    }

                    let car = new Set(result.filter(e => e[1].filters.car !== null).map(e => e[1].filters.car)),
                        age = new Set(result.filter(e => e[1].filters.age !== null).map(e => e[1].filters.age)),
                        location = new Set(result.filter(e => e[1].filters.location !== null).map(e => e[1].filters.location)),
                        supervisor = new Set(result.filter(e => e[1].filters.supervisor !== null).map(e => e[1].filters.supervisor)),
                        salary = new Set(result.filter(e => e[1].filters.salary !== null).map(e => e[1].filters.salary));

                    Utils.setWidgetValue('systemValueItemsForAgeFilterInEditor', Array.from(age));
                    Utils.setWidgetValue('systemValueItemsForLocationFilterInEditor', Array.from(location));
                    Utils.setWidgetValue('systemValueItemsForCarFilterInEditor', Array.from(car));
                    Utils.setWidgetValue('systemValueItemsForSupervisorFilterInEditor', Array.from(supervisor));
                    Utils.setWidgetValue('systemValueItemsForSalaryFilterInEditor', Array.from(salary));

                    return {
                        content: result
                    };
                }
            },
        },
        filterDisplay(c, filter, members) {
            if (v(`systemValueSelected${filter}FilterInEditor`) && v(`systemValueSelected${filter}FilterInEditor`) !== members[1].Attributes[`${filter}`]) {
                return c.visible = false;
            }
        },
        filterDisplayForText(c, filter, members) {
            if (v(`systemValueSelected${filter}FilterInEditor`) && v(`systemValueSelected${filter}FilterInEditor`) !== members[1].Attributes[`${filter}`]) {
                return true;
            }
        }
    },
    hrdemoPeopleServiceTeamEditorLevel1GridTable: {
        text_click(ctx) {
            Utils.setWidgetValue('systemValueLatestClickedCell' + ctx.getId(), ctx.getGridTableInfo());
            Utils.setWidgetValue('systemValueBackgroundColorLevel1', ctx.getCell());
            Utils.setWidgetValue('systemValueTeamEditorTableData', false);
            Utils.setWidgetValue('systemValueEmployeeLevelSelection', false);
            Utils.setWidgetValue('systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel2GridTable', false);
            Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorLevel1GridTable', 'hrdemoPeopleServiceTeamEditorLevel2GridTable', 'hrdemoPeopleServiceTeamEditorGridTable', 'hrdemoPeopleServiceEmployeeDetailsGridTable']).then(() => {
                Api.forceRefreshWidgets(['hrdemoPeopleServiceTeamEditorRow3', 'hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text']);
            });
        },
        init(ctx) {
            if (v('hrdemoPeopleServiceTeamEditorShadow').value && v('hrdemoPeopleServiceTeamEditorShadow').value.value) {
                return new RestRequest(this.restRequest)
            }
            return [];
        },
        switch(ctx) {
            Utils.setWidgetValue('systemValueClickedToggle', ctx.getGridTableInfo());
            Api.executeQueryRequest(['hrdemoPeopleServiceTeamEditorLevel1GridTable', 'loadEmployees']).then(() => {
                Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorLevel1GridTable', 'hrdemoPeopleServiceTeamEditorLevel2GridTable', 'hrdemoPeopleServiceTeamEditorGridTable']);
            })
        },
        loadEmployees: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Group,  Attributes/Department, Attributes/Team, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoPeopleServiceTeamEditorGridTable_init',
                    previouslyClickedElement: Utils.getGridTableCurrentRow('hrdemoPeopleServiceTeamEditorLevel1GridTable')[1].title,
                    group: v('systemValueSelectedGroup')
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, widgetId, obj, ctx) => {
                    let cells = data.Cells, cell, members, k = 0;

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        if (v('hrdemoPeopleServiceTeamEditorLevel1GridTable').switch.value === 1) {
                            if (!v('systemValueSelectedEmployees').includes(members[1].Name)) {
                                v('systemValueSelectedEmployees').push(members[1].Name)
                                v('systemValueSelectedEmployeeHierarchy').push({
                                    department: members[1].Attributes.Department,
                                    team: members[1].Attributes.Team,
                                    employee: members[1].Name
                                })
                            }
                        } else {
                            const index = v('systemValueSelectedEmployees').indexOf(members[1].Name);
                            if (index !== -1) {
                                v('systemValueSelectedEmployees').splice(index, 1);
                                v('systemValueSelectedEmployeeHierarchy').splice(index, 1);
                            }
                        }
                        k++;
                    }
                }
            }
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Group, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoPeopleServiceTeamEditorLevel1GridTable_init',
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        step = 1,
                        cells = data.Cells,
                        members,
                        row = 0,
                        cell;

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];
                        let selectedEmployeesNumber = v('systemValueSelectedEmployeeHierarchy').filter(e => e.department === members[3].Name).length,
                            containedEmployee = parseInt(cell.FormattedValue) / 12;

                        c = {
                            titleOn: '',
                            titleOff: '',
                            value: selectedEmployeesNumber === containedEmployee ? 1 : 0,
                            cellBackgroundColor: v('systemValueBackgroundColorLevel1').title === members[3].Name ? '#f2f2f2' : '#ffffff'
                        }
                        d.push(c);
                        c = {
                            title: members[3].Name,
                            body: selectedEmployeesNumber === 0 ? parseInt(cell.FormattedValue) / 12 : '<b style=color:#007AFA>' + selectedEmployeesNumber + '</b>' + ' - ' + parseInt(cell.FormattedValue) / 12,
                            cellBackgroundColor: v('systemValueBackgroundColorLevel1').title === members[3].Name ? '#f2f2f2' : '#ffffff'
                        }
                        d.push(c);
                        k++;
                        ++row;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            },
        }
    },
    hrdemoPeopleServiceTeamEditorLevel2GridTable: {
        text_click(ctx) {
            Utils.setWidgetValue('systemValueLatestClickedCell' + ctx.getId(), ctx.getGridTableInfo());
            Utils.setWidgetValue('systemValueTeamEditorTableData', false);
            Utils.setWidgetValue('systemValueEmployeeLevelSelection', false);
            Utils.setWidgetValue('systemValueBackgroundColorLevel2', ctx.getCell());
            Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorGridTable', 'hrdemoPeopleServiceEmployeeDetailsGridTable']).then(() => {
                Api.forceRefresh('hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text');
                Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorLevel2GridTable', 'hrdemoPeopleServiceTeamEditorLevel1GridTable']);
                Api.forceRefresh('hrdemoPeopleServiceTeamEditorRow3');
            })
        },
        init(ctx) {
            if (v('systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel1GridTable')) {
                return new RestRequest(this.restRequest)
            }
            return [];
        },
        switch(ctx) {
            Api.executeQueryRequest(['hrdemoPeopleServiceTeamEditorLevel2GridTable', 'loadEmployees']).then(() => {
                Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorLevel2GridTable', 'hrdemoPeopleServiceTeamEditorLevel1GridTable', 'hrdemoPeopleServiceTeamEditorGridTable']);
            })
        },
        loadEmployees: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Group,  Attributes/Department, Attributes/Team, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoPeopleServiceTeamEditorGridTable_init',
                    previouslyClickedElement: Utils.getGridTableCurrentRow('hrdemoPeopleServiceTeamEditorLevel2GridTable')[1].title,
                    group: v('systemValueSelectedGroup')
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, widgetId, obj, ctx) => {
                    let cells = data.Cells, cell, members, k = 0;

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;

                        if (v('hrdemoPeopleServiceTeamEditorLevel2GridTable').switch.value === 1) {
                            if (!v('systemValueSelectedEmployees').includes(members[1].Name)) {
                                v('systemValueSelectedEmployees').push(members[1].Name)
                                v('systemValueSelectedEmployeeHierarchy').push({
                                    department: members[1].Attributes.Department,
                                    team: members[1].Attributes.Team,
                                    employee: members[1].Name
                                })
                            }
                        } else {
                            const index = v('systemValueSelectedEmployees').indexOf(members[1].Name);
                            if (index !== -1) {
                                v('systemValueSelectedEmployees').splice(index, 1);
                                v('systemValueSelectedEmployeeHierarchy').splice(index, 1);
                            }
                        }
                        k++;
                    }
                }
            }
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Group, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoPeopleServiceTeamEditorLevel2GridTable_init',
                    previouslyClickedElement: v('systemValueLatestClickedCellhrdemoPeopleServiceTeamEditorLevel1GridTable').getCell().title
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        cells = data.Cells,
                        members,
                        row = 0,
                        cell;

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];
                        let selectedEmployeesNumber = v('systemValueSelectedEmployeeHierarchy').filter(e => e.team === members[3].Name).length,
                            containedEmployee = parseInt(cell.FormattedValue) / 12;

                        c = {
                            titleOn: '',
                            titleOff: '',
                            value: selectedEmployeesNumber === containedEmployee ? 1 : 0,
                            cellBackgroundColor: v('systemValueBackgroundColorLevel2').title === members[3].Name ? '#f2f2f2' : '#ffffff'
                        }
                        d.push(c);
                        c = {
                            title: members[3].Name,
                            body: selectedEmployeesNumber === 0 ? parseInt(cell.FormattedValue) / 12 : '<b style=color:#007AFA>' + selectedEmployeesNumber + '</b>' + ' - ' + parseInt(cell.FormattedValue) / 12,
                            cellBackgroundColor: v('systemValueBackgroundColorLevel2').title === members[3].Name ? '#f2f2f2' : '#ffffff'
                        }

                        d.push(c);
                        k++;
                        ++row;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            },
        }
    },
    hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text: {
        init() {
            if (Utils.isGridTableLoaded('hrdemoPeopleServiceEmployeeDetailsGridTable')) {
                return {
                    fileName: `${Utils.getGridTableCurrentCell('hrdemoPeopleServiceTeamEditorGridTable').employee}.jpeg`
                }
            }
            return {visible: false};
        }
    },
    hrdemoPeopleServiceEmployeeDetailsGridTable: {
        init(ctx) {
            if (v('systemValueEmployeeLevelSelection')) {
                return new RestRequest(this.restRequest)
            }
            return [];
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Group, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoPeopleServiceEmployeeDetailsGridTable_init',
                    previouslyClickedElement: v('systemValueEmployeeLevelSelection').getCell().employee
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        cells = data.Cells,
                        members,
                        row = 0,
                        cell, a;

                    a = cells[0];
                    cells.splice(0, 0, {...a});

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];

                        c = {
                            marginLeft: 10,
                            marginTop: row === 0 ? 7 : 0,
                            titleFontWeight: 'normal',
                            title: row === 0 ? '' : members[1].Name,
                            icon: row === 0 ? Utils.getGridTableCurrentRow('hrdemoPeopleServiceTeamEditorGridTable')[0].value === 1 ? 'icon-checkbox-on11' : 'icon-checkbox-off1' : '',
                            iconColor: '#007AFA'
                        }
                        d.push(c);
                        c = {
                            marginLeft: row === 0 ? 0 : 50,
                            titleFontWeight: row === 0 ? 'bold' : 'normal',
                            title: row === 0 ? members[0].Attributes.Long_name : cell.FormattedValue ? cell.FormattedValue : ' - ',
                            titleFontSize: row === 0 ? 21 : 13
                        }

                        d.push(c);
                        k++;
                        ++row;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            },
        }
    },
    hrdemoPeopleServiceTeamListGridTable: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Location, Attributes/Supervisor, Attributes/Salary, Attributes/Position, Attributes/Car, Attributes/Team, Attributes/Age, Attributes/Department, Attributes/Long_name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    let searchString = '';
                    if (Utils.isValueExistingAndNotEmpty('hrdemoPeopleServiceTeamListRow4Cell1Search')) {
                        searchString = v('hrdemoPeopleServiceTeamListRow4Cell1Search.value').toUpperCase();
                    }
                    return {
                        key: 'hrdemoPeopleServiceTeamListGridTable_init',
                        group: v('systemValueSelectedGroup'),
                        carFilter: v('systemValueSelectedCarFilter') || '',
                        supervisorFilter: v('systemValueSelectedSupervisorFilter') || '',
                        ageFilter: v('systemValueSelectedAgeFilter') || '',
                        salaryFilter: v('systemValueSelectedSalaryFilter') || '',
                        locationFilter: v('systemValueSelectedLocationFilter') || '',
                        searchString: searchString
                    };
                },
                parsingControl: {
                    type: 'script',
                    script: (data, ctx, object) => {
                        let result = [],
                            k = 0, c,
                            cells = data.Cells,
                            members,
                            cell,
                            car = new Set(),
                            salary = new Set(),
                            location = new Set,
                            age = new Set(),
                            supervisor = new Set();

                        while (k < cells.length) {
                            cell = cells[k];
                            members = cell.Members;
                            let d = [];
                            c = {
                                title: members[1].Attributes.Long_name === null ? '' : members[1].Attributes.Long_name,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[0][0].value === 1
                            };
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Team === null ? '' : members[1].Attributes.Team,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[1][0].value === 1
                            };
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Department === null ? '' : members[1].Attributes.Department,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[2][0].value === 1
                            };
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Salary === null ? '' : members[1].Attributes.Salary,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[3][0].value === 1
                            };
                            if (c.title !== '') {
                                salary.add(c.title)
                            }
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Position === null ? '' : members[1].Attributes.Position,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[4][0].value === 1
                            };
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Supervisor === null ? '' : members[1].Attributes.Supervisor,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[5][0].value === 1
                            };
                            if (c.title !== '') {
                                supervisor.add(c.title)
                            }
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Car === null ? '' : members[1].Attributes.Car,
                                marginTop: '12px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[6][0].value === 1
                            };
                            if (c.title !== '') {
                                car.add(c.title)
                            }
                            d.push(c);
                            c = {
                                title: members[1].Attributes.Location === null ? '' : members[1].Attributes.Location,
                                marginTop: '12px',
                                alignment: 'right',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[7][0].value === 1
                            };
                            if (c.title !== '') {
                                location.add(c.title)
                            }

                            d.push(c);
                            c = {
                                title: members[1].Attributes.Age === null ? '' : members[1].Attributes.Age,
                                marginTop: '10px',
                                alignment: 'left',
                                cellVisible: v('hrdemoViewGroupGridTable').cellData[8][0].value === 1
                            };
                            if (c.title !== '') {
                                age.add(c.title)
                            }
                            d.push(c);
                            ++k;
                            result.push(d);
                        }
                        if (!v('systemValueItemsForAgeFilter')) {
                            Utils.setWidgetValue('systemValueItemsForAgeFilter', Array.from(age));
                            Utils.setWidgetValue('systemValueItemsForLocationFilter', Array.from(location));
                            Utils.setWidgetValue('systemValueItemsForCarFilter', Array.from(car));
                            Utils.setWidgetValue('systemValueItemsForSupervisorFilter', Array.from(supervisor));
                            Utils.setWidgetValue('systemValueItemsForSalaryFilter', Array.from(salary));
                        }
                        let length = v('hrdemoViewGroupGridTable').cellData.filter(e => e[0].value === 1).length;
                        return {
                            content: result,
                            width: length * 220
                        };
                    }
                }
            }
    },

    // Simulation Page

    hrdemoSimulation: {
        init(ctx) {
            Utils.setWidgetValue('systemValueCurrentYear', true);
            Utils.setWidgetValue('systemValueNextYear', false);
            Utils.setWidgetValue('systemValueSelectedEmployees', []);
            Utils.setWidgetValue('systemValueSelectedEmployeeHierarchy', []);
            Utils.setWidgetValue('systemValueGridTableMode', 'normalMode');
            Utils.setWidgetValue('systemValueDummyVersion', 'Base Plan');
            Utils.setWidgetValue('systemValueDummyPeriod', '202201');
            Utils.setWidgetValue('systemValueDummyPosition', 'CEO');
            Utils.setWidgetValue('systemValueDummyType', 'Permanent');
        }
    },

    hrdemoSimulationRow3CellGauge: {
        initCondition: (db) => {
            return v('hrdemoSimulationGroupSelectorPopUpDropbox').value
        },
        initDefault: (db) => {
            return {};
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSimulationRow3CellGauge_init',
                        version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                        group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value
                    };
                },
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            values: (r, x) => {
                                return [Utils.parseNumber(r.Cells[0].FormattedValue) / 1000, Utils.parseNumber(r.Cells[1].FormattedValue) / 1000];
                            },
                            minRange: (r, x) => {
                                return 0
                            },
                            maxRange: (r, x) => {
                                return Math.round(((Math.max(Utils.parseNumber(r.Cells[0].FormattedValue) / 1000, Utils.parseNumber(r.Cells[1].FormattedValue) / 1000)) * 1.2));
                            }
                        }
                }

            },
    },

    hrdemoSimulationRow3Cell2PanelGridTable: {
        init() {
            if (v('hrdemoSimulationGroupSelectorPopUpDropbox').value) {
                return new RestRequest(this.restRequest)
            }
            return [];
        },
        restRequest:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSimulationRow3Cell2PanelGridTable_init',
                        version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                        group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {title: 'HR Cost'};
                        },
                        (r, x) => {
                            return {title: parseInt(r.Cells[x].FormattedValue).toLocaleString('hu-HU')};
                        },
                        (r, x) => {
                            return {title: parseInt(r.Cells[x].FormattedValue).toLocaleString('hu-HU')};
                        },
                        (r, x) => {
                            return {title: (parseInt(r.Cells[x].FormattedValue) - parseInt(r.Cells[x + 1].FormattedValue)).toLocaleString('hu-HU')};
                        }
                    ]
                }
            }
    },

    hrdemoSimulationRow2Cell3Text: {
        init(ctx) {
            Utils.setWidgetValue('systemValueSelectedGroup', v('systemValueSelectedGroup2'));
            return {
                title: 'Group: ' + '<b style=color:#000000;font-weight:normal;>' + v('systemValueSelectedGroup2') + '</b>',
            };
        }
    },
    hrdemoSimulationGroupSelectorPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedGroup2', v('hrdemoSimulationGroupSelectorPopUpDropbox.value'));
            Utils.togglePopup('hrdemoSimulationGroupSelectorPopUp', ctx);
            Api.updateWidgetsContent(['hrdemoSimulationGridTable', 'hrdemoSimulationRow3Cell2PanelGridTable', 'hrdemoSimulationRow2Cell3Text']);
            Api.forceRefresh('hrdemoSimulationRow3CellGauge');
        },
        initFinished() {
            Api.updateContent('hrdemoSimulationRow2Cell3Text')
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSimulationGroupSelectorPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedGroup2');
                            if (!v('systemValueSelectedGroup2')) {
                                Utils.setWidgetValue('systemValueSelectedGroup2', r.Cells[0].FormattedValue);
                            }
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },
    hrdemoSocialSecurityRow2Cell1Text2: {
        init() {
            return {
                title: v('systemValueSelectedVersion'),
            };
        }
    },
    hrdemoSettingsRow3Cell3Button: {
        init() {
            Api.forceRefresh('hrdemoPositionParametersGridTable');
        }
    },
    hrdemoSimulationVersionSelectorPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedVersion2', v('hrdemoSimulationVersionSelectorPopUpDropbox.value'));
            Utils.togglePopup('hrdemoSimulationVersionSelectorPopUp', ctx);
            Api.updateWidgetsContent(['hrdemoSimulationGridTable', 'hrdemoSimulationRow3Cell2PanelGridTable', 'hrdemoSimulationRow2Cell1Text']);
            Api.forceRefresh('hrdemoSimulationRow3CellGauge');
        },
        initFinished() {
            Api.updateWidgetsContent(['hrdemoSimulationGridTable', 'hrdemoSimulationRow3Cell2PanelGridTable']);
            Api.forceRefresh('hrdemoSimulationRow3CellGauge');
        },
        init: {
            execute: (db) => {
                let selected = v('systemValueSelectedVersion2');
                let base = [
                        {
                            name: 'Personal Draft - Best case',
                            on: 'Personal Draft - Best case' === selected || selected === false
                        },
                        {name: 'Personal Draft - Average case', on: 'Personal Draft - Average case' === selected},
                        {name: 'Personal Draft - Worst case', on: 'Personal Draft - Worst case' === selected},
                    ],
                    compare = [
                        {name: 'Base Plan', on: 'Base Plan' === selected || selected === false},
                        {name: 'Budget', on: 'Budget' === selected},
                        {name: 'Personal Draft - Best case', on: 'Personal Draft - Best case' === selected},
                        {name: 'Personal Draft - Average case', on: 'Personal Draft - Average case' === selected},
                        {name: 'Personal Draft - Worst case', on: 'Personal Draft - Worst case' === selected},
                    ],
                    array = v('systemValueGridTableMode') !== 'compareMode' ? base : compare
                return {
                    items: array
                }
            }
        },
    },
    hrdemoSimulationGridTable: {
        text_click(ctx) {
            if (ctx.getCell().hasPopUp) {
                if (ctx.getRow() === 0) {
                    Utils.openPopup('hrdemoSimulationGridTableGroupPopUp', ctx);
                } else {
                    Utils.openPopup('hrdemoSimulationGridTablePopUp', ctx);
                }
            }
            if (ctx.getColumn() === 0 && v('systemValueGridTableMode') === 'normalMode') {
                Api.updateWidgetsContent(['hrdemoSimulationNamePopupRow3GridTable', 'hrdemoSimulationNamePopupRow3GridTableHeaderText-1']).then(() => {
                    Api.forceRefresh('hrdemoSimulationNamePopupPanelCellImage');
                    Utils.openPopup('hrdemoSimulationNamePopup', ctx);
                });
            }
        },
        updateContentFinished() {
            let i, widgetIds = [];
            for (i = 0; i <= 29; i++) {
                widgetIds.push('hrdemoSimulationGridTableHeaderCell-' + i)
            }
            Api.updateWidgetsContent(widgetIds);
        },
        forceRefreshFinished() {
            return this.updateContentFinished()
        },
        init() {
            Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadedComments', []);
            if (v('hrdemoSimulationVersionSelectorPopUpDropbox').value) {
                if (v('systemValueGridTableMode') === 'compareMode') {
                    return new RestRequest(this.restRequestCompareMode);
                } else if (v('systemValueGridTableMode') === 'budgetMode') {
                    return new RestRequest(this.restRequestBudgetMode);
                }
                return new RestRequest(this.restRequest); //normalMode
            }
            return [];
        },
        isCompare() {
            return v('systemValueGridTableMode') === 'compareMode';
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name, Attributes/Caption,Attributes/Long_name,Attributes/Position))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoSimulationGridTable_init',
                    position: v('hrdemoSimulationTableFilterPopUpDropbox').value && v('hrdemoSimulationTableFilterPopUpDropbox').value !== 'All' ? v('hrdemoSimulationTableFilterPopUpDropbox').value : '',
                    version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    measure: v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ From Plan' ? 'AbsoluteVariance' : v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ%' ? 'PercentVariance' : 'Normal'
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        step = 29,
                        cells = data.Cells,
                        members,
                        row = 0,
                        cell

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];

                        // 1. col
                        c = {
                            title: row === 0 ? 'Group' : members[1].Attributes.Long_name,
                            employeeNumber: members[1].Name,
                            titleCursor: 'pointer',
                            alignment: 'center-left',
                            cellWidth: '10%',
                            cellSkin: row === 0 ? 'border_bottom' : '',
                            titleFontSize: '13',
                            titleFontWeight: 'normal',
                            paddingBottom: '9px',
                            skin: 'delta_report_data',
                            marginLeft: '-5px',
                            mode: 'normal'
                        };
                        d.push(c);

                        // 2. col
                        c = {
                            title: row === 0 ? '' : members[1].Attributes.Position,
                            alignment: 'center-left',
                            titleFontSize: '13',
                            titleFontWeight: 'normal',
                            skin: 'delta_report_data',
                            paddingBottom: '9px',
                            cellSkin: row === 0 ? 'border_bottom' : '',
                            marginLeft: '-5px'
                        };
                        d.push(c);

                        for (let i = 0; i < 29; i++) {

                            //current year
                            if (i < 13) {
                                c = {
                                    icon: row === 0 ? '' : Repository.hrdemoSimulationGridTable.icons[parseInt(cells[i + k].FormattedValue)],
                                    alignment: 'center-center',
                                    width: '100%',
                                    applyMeasuresToSection: true,
                                    height: '100%',
                                    cellWidth: '4.5%',
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    cellVisible: v('systemValueCurrentYear') === true,
                                    iconColor: '#347CF6',
                                    yearAndMonth: cells[i + k].Members[2].Name,
                                    hasPopUp: i !== 12,
                                    skin: 'delta_report_data'
                                };
                                d.push(c);


                            } else if (i > 12 && i < 26) {
                                //next year
                                c = {
                                    icon: row === 0 ? '' : Repository.hrdemoSimulationGridTable.icons[parseInt(cells[i + k].FormattedValue)],
                                    width: '100%',
                                    applyMeasuresToSection: true,
                                    height: '100%',
                                    cellWidth: '4.5%',
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    iconColor: '#347CF6',
                                    hasPopUp: i !== 13,
                                    yearAndMonth: cells[i + k].Members[2].Name,
                                    skin: 'delta_report_data',
                                    cellVisible: v('systemValueNextYear') === true
                                };
                                d.push(c);

                            } else if (i > 25 && i < 28) {
                                //total cost
                                c = {
                                    title: Math.round(parseInt(cells[i + k].FormattedValue)).toLocaleString('hu-HU') + (v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ%' ? ' %' : ''),
                                    cellWidth: '10%',
                                    paddingRight: '15px',
                                    alignment: 'center-right',
                                    paddingBottom: '9px',
                                    skin: 'delta_report_data',
                                    titleFontWeight: 'normal',
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    applyMeasuresToSection: true,
                                    titleFontSize: '13',
                                };
                                d.push(c);
                            } else {
                                let formattedVal = cells[28 + k].FormattedValue;
                                let b = formattedVal === 'NA' || formattedVal === '0' || formattedVal === '';
                                d.push({
                                    commentId: formattedVal,
                                    members: {},
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    icon: b ? 'icon-comment-off' : 'icon-comment-on',
                                    iconColor: b ? '#E3E4E4' : '#007AFF',
                                    cellWidth: '1.5%',
                                    visible: row !== 0
                                });//comment
                            }

                        }
                        k = k + step;
                        ++row;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            }
        },

        restRequestCompareMode: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoSimulationGridTableCompareMode_init',
                    version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    measure: v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ From Plan' ? 'AbsoluteVariance' : v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ%' ? 'PercentVariance' : 'Normal'
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        step = 29,
                        cells = data.Cells,
                        members,
                        row = 0,
                        cell

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];

                        // 1. col
                        c = {
                            title: (members[3].Name).replace('AbsoluteVariance', '').replace('PercentVariance', ''),
                            alignment: 'center-left',
                            titleFontSize: '13',
                            titleFontWeight: 'normal',
                            marginLeft: '-5px',
                            cellWidth: '10%',
                            cellSkin: row === 0 ? 'border_bottom' : '',
                            mode: 'budget'
                        };
                        d.push(c);

                        // 2. col
                        c = {
                            //title: members[2].Name,
                            alignment: 'center-left',
                            titleFontSize: '13px',
                            cellSkin: row === 0 ? 'border_bottom' : '',
                            paddingLeft: '5px',
                            cellVisible: false
                        };
                        d.push(c);

                        for (let i = 0; i < 29; i++) {

                            //current year
                            if (i < 13) {
                                c = {
                                    title: parseInt(cells[i + k].FormattedValue).toLocaleString('hu-HU') + (v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ%' && row !== 0 ?  '%' : ''),
                                    paddingRight: '5px',
                                    skin: '',
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    alignment: 'center-right',
                                    applyMeasuresToSection: true,
                                    cellWidth: '4.5%',
                                    cellVisible: v('systemValueCurrentYear') === true,
                                };
                                d.push(c);


                            } else if (i > 12 && i < 26) {
                                //next year
                                c = {
                                    title:  parseInt(cells[i + k].FormattedValue).toLocaleString('hu-HU') + (v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ%' && row !== 0 ?  '%' : ''),
                                    paddingRight: '5px',
                                    skin: '',
                                    alignment: 'center-right',
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    applyMeasuresToSection: true,
                                    cellWidth: '4.5%',
                                    cellVisible: v('systemValueNextYear') === true,
                                };
                                d.push(c);

                            } else if (i > 25 && i < 28) {
                                //total cost
                                c = {
                                    title: Math.round(parseInt(cells[i + k].FormattedValue)).toLocaleString('hu-HU') + (v('hrdemoSimulationRow4Cell1SegmentedControl').selected === 'Δ%' && row !== 0 ? ' %' : ''),
                                    paddingRight: '5px',
                                    alignment: 'center-right',
                                    skin: '',
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    applyMeasuresToSection: true,
                                    titleFontSize: '13px',
                                };
                                d.push(c);
                            } else {
                                let formattedVal = cells[28 + k].FormattedValue;
                                let b = formattedVal === 'NA' || formattedVal === '0,00' || formattedVal === '';
                                d.push({
                                    commentId: formattedVal,
                                    members: {},
                                    cellSkin: row === 0 ? 'border_bottom' : '',
                                    icon: b ? 'icon-comment-off' : 'icon-comment-on',
                                    iconColor: b ? '#E3E4E4' : '#007AFF',
                                    cellWidth: '1.5%',
                                    visible: row !== 0
                                });//comment
                            }
                        }
                        k = k + step;
                        ++row;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            }
        },

        restRequestBudgetMode: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue,Updateable,RuleDerived,Consolidated;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoSimulationGridTableBudgetMode_init',
                    version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        step = 28,
                        cells = data.Cells,
                        members,
                        cell

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];

                        // 1. col
                        c = {
                            title: members[3].Name,
                            alignment: 'center-left',
                            titleFontSize: '13',
                            titleFontWeight: 'normal',
                            marginLeft: '-5px',
                            cellWidth: '16%',
                            mode: 'budget'
                        };
                        d.push(c);

                        // 2. col
                        c = {
                            //title: members[2].Name,
                            alignment: 'center-left',
                            titleFontSize: '13px',
                            paddingLeft: '5px',
                            cellVisible: false
                        };
                        d.push(c);

                        for (let i = 0; i < 29; i++) {

                            //current year
                            if (i < 14) {
                                c = {
                                    title: parseInt(cells[i + k].FormattedValue).toLocaleString('hu-HU'),
                                    paddingRight: '15px',
                                    skin: '',
                                    alignment: 'center-right',
                                    applyMeasuresToSection: true,
                                    cellBackgroundColor: i === 12 | i === 13 ? '#F2f2f2' : '#ffffff',
                                    cellWidth: '7.5%',

                                    cellVisible: v('systemValueCurrentYear') === true,
                                };
                                d.push(c);


                            } else if (i > 13 && i < 28) {
                                //next year
                                c = {
                                    title: parseInt(cells[i + k].FormattedValue).toLocaleString('hu-HU'),
                                    paddingRight: '15px',
                                    skin: '',
                                    alignment: 'center-right',
                                    cellBackgroundColor: i === 14 | i === 27 ? '#F2f2f2' : '#ffffff',
                                    applyMeasuresToSection: true,
                                    cellWidth: '7.5%',
                                    cellVisible: v('systemValueNextYear') === true,
                                };
                                d.push(c);
                            } else {
                                //comment
                                c = {
                                    cellVisible: false
                                };
                                d.push(c);
                            }

                        }
                        k = k + step;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            }
        },
        icons: {
            '-1': 'icon-arrow-right',
            '0': '',
            '1': 'icon-card',
            '2': 'icon-person-outline',
            '3': 'icon-pass'
        },
        getCommentSaveProcessParameters(ctx) {
            let cell = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable'), m = cell.members,
                version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                versionForCompare = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].title,
                group = v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                employee = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber, f;

            f = `${group}, ${this.isCompare() ? versionForCompare : version}, 2022, ${this.isCompare() ? 'Total Employees' : employee}, ${this.isCompare() ? 'CommentInCompare' : 'Comment'}`;

            return {
                commentId: cell.commentId,
                cube: 'Groups FTE and Cost',
                dimFilter: f
            };
        },
        getCommentReloadParametersAfterSave() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').members;

            m.version = this.isCompare() ? Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].title : v('hrdemoSimulationVersionSelectorPopUpDropbox').value;
            m.group = v('hrdemoSimulationGroupSelectorPopUpDropbox').value;
            m.employee = this.isCompare() ? 'Total Employees' : Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber;
            m.key = this.isCompare() ? 'hrdemoSimulationCommentPopupCommentInput_reloadComment_compare' : 'hrdemoSimulationCommentPopupCommentInput_reloadComment';

            return m;
        }
    },

    hrdemoSimulationRow2Cell2Button: {
        launch() {
            Utils.setWidgetValue('systemValueCurrentYear', true);
            Utils.setWidgetValue('systemValueNextYear', false);
            if (v('systemValueGridTableMode') === 'normalMode' || v('systemValueGridTableMode') === 'budgetMode') {
                Utils.setWidgetValue('systemValueGridTableMode', 'compareMode');
            } else {
                Utils.setWidgetValue('systemValueGridTableMode', 'normalMode');
            }
            Api.forceRefresh('hrdemoSimulationVersionSelectorPopUpDropbox').then(() => {
                Utils.setWidgetValue('systemValueSelectedVersion2', v('hrdemoSimulationVersionSelectorPopUpDropbox.value'));
                Api.updateWidgetsContent(['hrdemoSimulationRow3Cell2PanelGridTable', 'hrdemoSimulationRow2Cell1Text', 'hrdemoSimulationRow2Cell2Button', 'hrdemoSimulationRow2Cell1Text']);
                Api.forceRefresh('hrdemoSimulationRow3CellGauge');
            });
            Api.forceRefreshWidgets(['hrdemoSimulationGridTable', 'hrdemoSimulationRow1Cell3SegmentedControl']);

        },
        init() {
            let compareMode = v('systemValueGridTableMode') === 'compareMode';
            return {
                skin: compareMode ? 'orange_label_hrdemo' : 'blue_label_hrdemo',
                icon: compareMode ? 'icon-x1' : 'icon-blocks-compare',
                label: compareMode ? 'Exit Compare' : 'Compare Versions',
            };
        }
    },

    hrdemoSimulationRow2Cell1Text: {
        init(ctx) {
            let compareMode = v('systemValueGridTableMode') === 'compareMode';
            return {
                iconColor: compareMode ? '#FF9500' : '#007AFF',
                title: v('systemValueSelectedVersion2')
            };
        }
    },

    hrDemoSimulationCompensationChangePopUpGridTable: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_name))`,
                type: 'POST',
                server: true
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true
            }
        ],
        getFirstColumnCell(mainData) {
            return {
                title: mainData.Members[0].Attributes.Long_name
            };
        },
        getDropbox(items, mainData, skin = 'add_dummy') {
            return [
                this.getFirstColumnCell(mainData),
                {
                    type: DropBoxWidget,
                    selectFirst: true,
                    items: items.filter(x => x.FormattedValue !== '').map((x, i) => {
                        return {
                            name: x.FormattedValue,
                            on: (i + 1) === Utils.parseNumber(mainData.FormattedValue)
                        };
                    }),
                    skin: skin
                }
            ];
        },
        getText(mainData) {
            return [
                this.getFirstColumnCell(mainData),
                {
                    title: mainData.FormattedValue,
                    titleAlignment: 'start',
                    marginLeft: 5
                }
            ];
        },
        getTextBox(mainData, skin = 'custom_group') {
            return [
                this.getFirstColumnCell(mainData),
                {
                    type: TextBoxWidget,
                    value: mainData.FormattedValue,
                    skin: skin
                }
            ];
        },
        commonParsingControl(data) {
            const mainData = data[0].Cells, firstDropboxData = data[1].Cells, secondDropboxData = data[2].Cells,
                result = [];

            result.push(this.getDropbox(firstDropboxData, mainData[0]));
            result.push(this.getDropbox(secondDropboxData, mainData[1]));
            result.push(this.getText(mainData[2]));
            result.push(this.getTextBox(mainData[3]));
            result.push(this.getTextBox(mainData[4]));
            return result;
        }
    },

    hrdemoSimulationAddDummyPopUpGridTable: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        version: v('systemValueDummyVersion'),
                        period: v('systemValueDummyPeriod'),
                        position: v('systemValueDummyPosition'),
                        headcountType: v('systemValueDummyType')
                    }
                }
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        version: v('systemValueDummyVersion'),
                        period: v('systemValueDummyPeriod'),
                        position: v('systemValueDummyPosition'),
                        headcountType: v('systemValueDummyType')
                    }
                }
            },
        ],
        getFirstColumnCell(mainData) {
            return {
                title: mainData.Members[0].Name,
                titleFontColor: 'Prefill Values' === mainData.Members[0].Name ? '#007AFF' : '#000',
                titleCursor: 'Prefill Values' === mainData.Members[0].Name ? 'pointer' : ''
            };
        },
        getDropbox(items, mainData, skin = 'add_dummy') {
            return [
                this.getFirstColumnCell(mainData),
                {
                    type: DropBoxWidget,
                    selectFirst: true,
                    hideIfNoData: true,
                    visible: items.length !== 0,
                    items: items.filter(x => x.FormattedValue !== '').map((x, i) => {
                        return {
                            name: x.FormattedValue,
                            on: v('systemValueDummyPosition') === x.FormattedValue || v('systemValueDummyType') === x.FormattedValue
                        };
                    }),
                    skin: skin
                }
            ];
        },
        getText(mainData) {
            return [
                this.getFirstColumnCell(mainData),
                {
                    title: mainData.FormattedValue
                }
            ];
        },
        getDatePicker(mainData) {
            return [
                this.getFirstColumnCell(mainData),
                {
                    type: DatePickerWidget,
                    monthPicker: true,
                    local: 'de-DE',
                    skin: 'popup_monthpicker'
                }
            ];
        },
        getTextBox(mainData, prefillValues, skin = 'custom_group') {
            if (mainData.Members[0].Name === 'Base Salary') {
                Utils.setWidgetValue('SalaryPrefillValue', prefillValues.FormattedValue);
            }
            if (mainData.Members[0].Name === 'Bonus') {
                Utils.setWidgetValue('PrefillBonusValue', (parseFloat(prefillValues.FormattedValue.replace(',', '.')) * 100).toFixed() + '%');
            }
            return [
                this.getFirstColumnCell(mainData),
                {
                    type: TextBoxWidget,
                    value: v('systemValuePrefillValueForSalaryClicked') && v(`${this.defaultValueForTextBoxAfterRefresh[mainData.Members[0].Name]}`) || mainData.Members[0].Name === 'Bonus' ? v(`${this.defaultValueForTextBoxAfterRefresh[mainData.Members[0].Name]}`) : this.defaultValueForTextBox[mainData.Members[0].Name],
                    skin: skin,
                    editable: mainData.Members[0].Name !== 'Bonus',
                    defaultText: v('systemValuePrefillValueForSalaryClicked') || mainData.Members[0].Name === 'Bonus' ? v(`${this.defaultValueForTextBoxAfterRefresh[mainData.Members[0].Name]}`) : this.defaultValueForTextBox[mainData.Members[0].Name]
                }
            ];
        },
        defaultValueForTextBox: {
            'Number of employee': '1',
            'Name': '',
            'Other Sustainable': '0,00'
        },
        defaultValueForTextBoxAfterRefresh: {
            'Number of employee': 'systemValueNumberOfEmployees',
            'Name': 'systemValueName',
            'Other Sustainable': 'systemValueOtherSustainable',
            'Base Salary': 'SalaryPrefillValue',
            'Bonus': 'PrefillBonusValue'
        },
        commonParsingControl(data) {
            const mainData = data[0].Cells,
                firstDropboxData = data[1].Cells,
                secondDropboxData = data[2].Cells,
                salaryPrefillValue = data[3].Cells,
                fixBonus = data[4].Cells,
                result = [];

            result.push(this.getTextBox(mainData[0])); // name
            result.push(this.getTextBox(mainData[1])); // entry month
            result.push(this.getDatePicker(mainData[2]));
            result.push(this.getDropbox(firstDropboxData, mainData[3]));
            result.push(this.getDropbox(secondDropboxData, mainData[4]));
            result.push(this.getDropbox([], mainData[5]));// prefill salary
            result.push(this.getTextBox(mainData[6], salaryPrefillValue[0]));
            result.push(this.getTextBox(mainData[7], fixBonus[0]));
            result.push(this.getTextBox(mainData[8]));
            return result;
        },
        text_click(ctx) {
            if (ctx.getCell().title === 'Prefill Values') {
                Utils.setWidgetValue('systemValuePrefillValueForSalaryClicked', true);
                Utils.setWidgetValue('systemValueDummyVersion', v('hrdemoSimulationVersionSelectorPopUpDropbox').value);
                Utils.setWidgetValue('systemValueDummyPeriod', (v('hrdemoSimulationAddDummyPopUpGridTable_2_1').value).replace('.', ''));
                Utils.setWidgetValue('systemValueDummyPosition', v('hrdemoSimulationAddDummyPopUpGridTable_3_1').value);
                Utils.setWidgetValue('systemValueDummyType', v('hrdemoSimulationAddDummyPopUpGridTable_4_1').value);
                Api.updateContent('hrdemoSimulationAddDummyPopUpGridTable');
            }
        },
        writeEnd() {
            Utils.setWidgetValue('systemValueNumberOfEmployees', v('hrdemoSimulationAddDummyPopUpGridTable_0_1').value);
            Utils.setWidgetValue('systemValueName', v('hrdemoSimulationAddDummyPopUpGridTable_1_1').value);
            Utils.setWidgetValue('systemValueOtherSustainable', v('hrdemoSimulationAddDummyPopUpGridTable_8_1').value);
        },
        choose() {
            Utils.setWidgetValue('systemValueDummyPeriod', (v('hrdemoSimulationAddDummyPopUpGridTable_2_1').value).replace('.', ''));
            Utils.setWidgetValue('systemValueDummyPosition', v('hrdemoSimulationAddDummyPopUpGridTable_3_1').value);
            Utils.setWidgetValue('systemValueDummyType', v('hrdemoSimulationAddDummyPopUpGridTable_4_1').value);
            Api.updateContent('hrdemoSimulationAddDummyPopUpGridTable');
        },
        pick() {
            Utils.setWidgetValue('systemValueDummyPeriod', (v('hrdemoSimulationAddDummyPopUpGridTable_2_1').value).replace('.', ''));
            Utils.setWidgetValue('systemValueDummyPosition', v('hrdemoSimulationAddDummyPopUpGridTable_3_1').value);
            Utils.setWidgetValue('systemValueDummyType', v('hrdemoSimulationAddDummyPopUpGridTable_4_1').value);
            Api.updateContent('hrdemoSimulationAddDummyPopUpGridTable');
        }
    },
    /*hrdemoSimulationAddDummyPopUpGridRow2Cell1SegmentedControl: {
        switch() {
           Utils.setWidgetValue('systemValueDummyPeriod', '202201');
            Utils.setWidgetValue('systemValueDummyPosition', 'CEO');
            Utils.setWidgetValue('systemValueDummyType', 'Permanent');
            Utils.setWidgetValue("SalaryPrefillValue", '0,00');
            Utils.setWidgetValue('systemValueNumberOfEmployees', false);
            Utils.setWidgetValue('systemValueName', false);
            Utils.setWidgetValue('systemValueOtherSustainable', false);
            Api.updateContent('hrdemoSimulationAddDummyPopUpGridTable');
        }
    },*/
    'hrdemoSimulationGridTableHeaderText-1': {
        init() {
            return {
                body: v('systemValueGridTableMode') !== 'budgetMode' ? 'Name' : '',
            }
        }
    },
    'hrdemoSimulationGridTableHeaderText-2': {
        add_dummy(ctx) {
            Utils.setWidgetValue('systemValueDummyPeriod', '202201');
            Utils.setWidgetValue('systemValueDummyPosition', 'CEO');
            Utils.setWidgetValue('systemValueDummyType', 'Permanent');
            Utils.setWidgetValue("SalaryPrefillValue", '0,00');
            Utils.setWidgetValue('systemValueNumberOfEmployees', false);
            Utils.setWidgetValue('systemValueName', false);
            Utils.setWidgetValue('systemValueOtherSustainable', false);
            Api.updateContent('hrdemoSimulationAddDummyPopUpGridTable').then(() => {
                Utils.openPopup('hrdemoSimulationAddDummyPopUp', ctx);
            })
        }
    },

    'hrdemoSimulationGridTableHeaderText-15': {
        perform() {
            Utils.setWidgetValue('systemValueCurrentYear', false);
            Utils.setWidgetValue('systemValueNextYear', true);
            Api.updateContent('hrdemoSimulationGridTable').then(() => {
                Api.forceRefresh('hrdemoSimulationGridTableHeaderText-29');
            });
        },
        init() {
            return {
                title: v('systemValueGridTableMode') !== 'budgetMode' ? '2023' : '2022',
            }
        }
    },

    'hrdemoSimulationGridTableHeaderText-16': {
        perform() {
            if (v('systemValueNextYear')) {
                Utils.setWidgetValue('systemValueCurrentYear', true);
                Utils.setWidgetValue('systemValueNextYear', false);
                Api.updateContent('hrdemoSimulationGridTable').then(() => {
                    Api.forceRefresh('hrdemoSimulationGridTableHeaderText-29');
                });
            }
        },
        init() {
            return {
                iconColor: v('systemValueNextYear') ? '#007AFF' : '#ffffff',
                title: v('systemValueNextYear') ? '2022' : '2023',
                paddingRight: v('systemValueGridTableMode') !== 'budgetMode' ? '30px' : '50px',
            }
        }
    },
    'hrdemoSimulationGridTableHeaderText-29': {
        init() {
            return {
                title: v('systemValueGridTableMode') !== 'budgetMode' ? '' : '2023',
                body: v('systemValueGridTableMode') !== 'budgetMode' ? 'HR Cost ∑ 2022' : 'Year',
                skin: v('systemValueGridTableMode') !== 'budgetMode' ? 'simulation_header_month' : 'simulation_header_with_icon',
                icon: v('systemValueGridTableMode') !== 'budgetMode' ? '' : 'icon-expand-arrow',
                marginLeft: v('systemValueNextYear') === false ? '-80px' : '-50px',
                iconColor: '#ffffff',
                visible: v('systemValueGridTableMode') !== 'budgetMode' ? true : v('systemValueNextYear')
            };
        }
    },

    'hrdemoSimulationGridTableHeaderText-3': {
        init() {
            return {
                paddingRight: v('systemValueGridTableMode') !== 'budgetMode' ? '30px' : '50px',

            };
        }
    },
    'hrdemoSimulationGridTableHeaderText-5': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-6': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-7': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-8': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-9': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-10': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-11': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-12': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-13': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-14': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-17': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-18': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-19': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-20': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-21': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-22': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-23': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-24': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-25': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-26': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-27': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-28': {
        reference: 'hrdemoSimulationGridTableHeaderText-3'
    },
    'hrdemoSimulationGridTableHeaderText-30': {
        init() {
            return {
                body: v('systemValueGridTableMode') !== 'budgetMode' ? 'HR Cost ∑ 2023' : 'Year',
                title: v('systemValueGridTableMode') !== 'budgetMode' ? '' : '2023',
                paddingRight: v('systemValueGridTableMode') !== 'budgetMode' ? '0px' : '90px',
                paddingBottom: v('systemValueGridTableMode') !== 'budgetMode' ? '0px' : '18px'
            };
        }
    },

    'hrdemoSimulationGridTableHeaderCell-1': {
        init() {
            return {
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',
                width: v('systemValueGridTableMode') !== 'budgetMode' ? '10%' : '16%'
            };
        }
    },

    'hrdemoSimulationGridTableHeaderCell-2': {
        init(db) {
            return {
                cellVisible: v('systemValueGridTableMode') === 'normalMode',
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',

            };
        }
    },

    'hrdemoSimulationGridTableHeaderCell-3': {
        init(db) {
            return {
                cellVisible: v('systemValueCurrentYear') === true,
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',
                width: v('systemValueGridTableMode') !== 'budgetMode' ? '4.5%' : '7.5%',

            };
        }
    },
    'hrdemoSimulationGridTableHeaderCell-4': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-5': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-6': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-7': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-8': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-9': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-10': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-11': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-12': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-13': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-14': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    'hrdemoSimulationGridTableHeaderCell-15': {
        reference: 'hrdemoSimulationGridTableHeaderCell-3'
    },
    // next year

    'hrdemoSimulationGridTableHeaderCell-16': {
        init(db) {
            return {
                cellVisible: v('systemValueGridTableMode') !== 'budgetMode' ? v('systemValueNextYear') : true,
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',
                width: v('systemValueGridTableMode') !== 'budgetMode' ? '4.5%' : '7.5%'
            }
        }
    },
    'hrdemoSimulationGridTableHeaderCell-17': {
        init(db) {
            return {
                cellVisible: v('systemValueNextYear'),
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',
                width: v('systemValueGridTableMode') !== 'budgetMode' ? '4.5%' : '7.5%'
            }
        }
    },
    'hrdemoSimulationGridTableHeaderCell-18': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-19': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-20': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-21': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-22': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-23': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-24': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-25': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-26': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-27': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-28': {
        reference: 'hrdemoSimulationGridTableHeaderCell-17'
    },
    'hrdemoSimulationGridTableHeaderCell-29': {
        init() {
            return {
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',
                width: v('systemValueGridTableMode') !== 'budgetMode' ? '10%' : v('systemValueNextYear') ? '7.5%' : '0%',
                visible: v('systemValueGridTableMode') !== 'budgetMode' ? true : v('systemValueNextYear')
            };
        }
    },
    'hrdemoSimulationGridTableHeaderCell-30': {
        reference: 'hrdemoSimulationGridTableHeaderCell-29'
    },
    'hrdemoSimulationGridTableHeaderCell-31': {
        init() {
            return {
                cellHeaderSkin: v('systemValueGridTableMode') !== 'budgetMode' ? 'border_bottom' : '',
                width: '1.5%'
            };
        }
    },

    hrdemoSimulationRow1Cell3SegmentedControl: {
        switch() {
            Utils.setWidgetValue('systemValueCurrentYear', true);
            Utils.setWidgetValue('systemValueNextYear', false);
            Api.updateWidgetsContent(['hrdemoSimulationRow2Cell2Button', 'hrdemoSimulationRow2Cell1Text']);
            Api.forceRefreshWidgets(['hrdemoSimulationGridTable', 'hrdemoSimulationRow4Cell1', 'hrdemoSimulationRow2Cell5Button', 'hrdemoSimulationGridTableHeaderText-1']);
        },
        init() {
            return [
                {
                    selected: 'normalMode' === v('systemValueGridTableMode') || 'compareMode' === v('systemValueGridTableMode')
                },
                {
                    selected: 'budgetMode' === v('systemValueGridTableMode')
                }
            ];
        },
        segmentedControlTab1: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGridTableMode', 'normalMode');
            }
        },
        segmentedControlTab2: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueGridTableMode', 'budgetMode');
            }
        }
    },
    hrdemoSimulationRow4Cell1: {
        init() {
            return {
                visible: v('systemValueGridTableMode') !== 'budgetMode',
                skin: 'segmented'
            }
        },
    },
    hrdemoSimulationRow4Cell1SegmentedControl: {
        switch() {
            Api.updateContent('hrdemoSimulationGridTable');
        }
    },
    hrdemoSimulationCompensationChangePopUpGridRow4Cell1Save: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Input Compensation Change')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let value = v('hrDemoSimulationCompensationChangePopUpGridTable_3_1').value,
                    version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    period = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                    position = v('hrDemoSimulationCompensationChangePopUpGridTable_0_1').value,
                    headcountType = v('hrDemoSimulationCompensationChangePopUpGridTable_1_1').value,
                    employee = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber;
                return {
                    pValue: value,
                    pVersions: version,
                    pPeriods: period,
                    pPositions: position,
                    pHeadcountTypes: headcountType,
                    pEmployees: employee,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    bonus: v('hrDemoSimulationCompensationChangePopUpGridTable_4_1').value,
                    user: v('activeUser')
                }
            },
        },
    },
    // Social Security page
    hrdemoSocialSecurityHeadcountSelectorPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedHeadcount', v('hrdemoSocialSecurityHeadcountSelectorPopUpDropbox.value'));
            Api.updateContent('hrdemoSocialSecurityGridTable');
            Api.updateWidgetsContent(['hrdemoSocialSecurityGridTable', 'hrdemoSocialSecurityRow2Cell1Text']);
            Utils.togglePopup('hrdemoSocialSecurityHeadcountSelectorPopUp', ctx);
        },
        initFinished() {
            Api.updateContent('hrdemoSocialSecurityRow2Cell1Text');
            Api.updateContent('hrdemoSocialSecurityGridTable');
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSocialSecurityHeadcountSelectorPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedHeadcount');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },

    hrdemoSocialSecurityVersionSelectorPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedVersion', v('hrdemoSocialSecurityVersionSelectorPopUpDropbox.value'));
            Api.updateContent('hrdemoSocialSecurityGridTable');
            Api.updateWidgetsContent(['hrdemoSocialSecurityGridTable', 'hrdemoSocialSecurityRow2Cell1Text2']);
            Utils.togglePopup('hrdemoSocialSecurityVersionSelectorPopUp', ctx);
        },
        initFinished() {
            Api.updateContent('hrdemoSocialSecurityRow2Cell1Text2');
            Api.updateContent('hrdemoSocialSecurityGridTable');
        },
        init() {
            return new RestRequest(this.restRequest)
        },
        restRequest:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSocialSecurityVersionSelectorPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedVersion');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },
    hrdemoSocialSecurityRow1Cell1Button: {
        launch() {
            Api.removeWidgetValues(['hrdemoSocialSecurityRow1Cell3SegmentedControl', 'hrdemoSocialSecurityGridTable']);
            Api.openPage('hrdemoMain');
        }
    },
    hrdemoSocialSecurityRow1Cell3SegmentedControl: {
        switch() {
            Api.updateWidgetsContent(['hrdemoSocialSecurityGridTableHeaderText-02', 'hrdemoSocialSecurityGridTable']);
        }
    },
    'hrdemoSocialSecurityGridTableHeaderText-02': {
        init() {
            return {
                title: v('hrdemoSocialSecurityRow1Cell3SegmentedControl').selected
            }
        }
    },
    hrdemoSocialSecurityGridTable: {
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                if (cell.theValueIsPercent === true) {
                    return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.getDecimalFromPercentString(widgetValue.value)}\"}`
                } else {
                    return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
                }
            }
        },
        theValueIsPercent(headcountParam) {
            let value = '';
            if (headcountParam === 'Social Security Limit' || headcountParam === 'Insurance (per HC)') {
                value = false;
            } else {
                value = true
            }
            return value
        },
        init() {
            if (v('hrdemoSocialSecurityVersionSelectorPopUpDropbox').value && v('hrdemoSocialSecurityHeadcountSelectorPopUpDropbox').value) {
                return new RestRequest(this.restRequest);
            }
            return [];
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoSocialSecurityGridTable_init',
                    type: v('hrdemoSocialSecurityHeadcountSelectorPopUpDropbox').value,
                    version: v('hrdemoSocialSecurityVersionSelectorPopUpDropbox').value,
                    year: v('hrdemoSocialSecurityRow1Cell3SegmentedControl').selected ? v('hrdemoSocialSecurityRow1Cell3SegmentedControl').selected : '2022'
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, ctx, object) => {
                    let result = [],
                        k = 0, c,
                        step = 12,
                        cells = data.Cells,
                        members,
                        cell

                    while (k < cells.length) {
                        cell = cells[k];
                        members = cell.Members;
                        let d = [];

                        // 1. col
                        c = {
                            title: members[3].Name,
                            alignment: 'center-left',
                            titleFontSize: '13px',
                            paddingLeft: '10px',
                            mode: 'budget'
                        };
                        d.push(c);

                        for (let i = 0; i < 12; i++) {

                            c = {
                                title: '',
                                paddingRight: '15px',
                                ordinal: cells[i + k].Ordinal,
                                theValueIsPercent: !(['Social Security Limit', 'Insurance (per HC)'].includes(members[3].Name)),
                                editable: true
                            };
                            if (c.theValueIsPercent) {
                                c.title = parseFloat(cells[i + k].FormattedValue.replace(',', '.')) * 100 + '%';
                            } else {
                                c.title = parseInt(cells[i + k].FormattedValue).toFixed(1);
                            }
                            d.push(c);
                        }
                        k = k + step;
                        result.push(d);
                    }
                    return {
                        content: result
                    };
                }
            }
        },
    },


    // Position Param page
    hrdemoSocialSecurityRow2Cell1Text: {
        init() {
            return {
                title: v('systemValueSelectedHeadcount'),
            };
        }
    },
    hrdemoPositionParametersRow2Cell1Text: {
        init() {
            return {
                title: v('systemValueSelectedHeadcount'),
            };
        }
    },
    hrdemoPositionParametersHeadcountSelectorPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedHeadcount', v('hrdemoPositionParametersHeadcountSelectorPopUpDropbox.value'));
            Api.updateContent('hrdemoPositionParametersGridTable');
            Api.updateWidgetsContent(['hrdemoPositionParametersGridTable', 'hrdemoPositionParametersRow2Cell1Text']);
            Utils.togglePopup('hrdemoPositionParametersHeadcountSelectorPopUp', ctx);
        },
        initFinished() {
            Api.updateContent('hrdemoPositionParametersRow2Cell1Text');
            Api.updateContent('hrdemoPositionParametersGridTable');
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSocialSecurityHeadcountSelectorPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedHeadcount');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },

    hrdemoPositionParametersVersionSelectorPopUpDropbox: {
        choose() {
            //Api.updateContent('hrdemoHourlyWagestable'),
            //Utils.setWidgetValue('systemValueSelectedVersion', v('hrdemoVersionSelectorPopupDropbox.value'));
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSocialSecurityVersionSelectorPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedVersion');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },
    hrdemoPositionParametersRow2Cell1Text3: {
        init() {
            return {
                title: v('systemValueSelectedPositons'),
            };
        }
    },

    hrdemoPositionParametersPositionSelectorPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedPositons', v('hrdemoPositionParametersPositionSelectorPopUpDropbox.value'));
            Api.updateContent('hrdemoPositionParametersGridTable');
            Api.updateWidgetsContent(['hrdemoPositionParametersGridTable', 'hrdemoPositionParametersRow2Cell1Text3']);
            Utils.togglePopup('hrdemoPositionParametersPositionSelectorPopUp', ctx);
        },
        initFinished() {
            Api.updateContent('hrdemoPositionParametersRow2Cell1Text3');
            Api.updateContent('hrdemoPositionParametersGridTable');
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoPositionParametersPositionSelectorPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedPositons');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },
    hrdemoPositionParametersRow1Cell1Button: {
        launch() {
            Api.removeWidgetValues(['hrdemoPositionParametersRow1Cell3SegmentedControl', 'hrdemoPositionParametersGridTable']);
            Api.openPage('hrdemoMain');
        }
    },
    hrdemoPositionParametersRow1Cell3SegmentedControl: {
        switch() {
            Api.updateWidgetsContent(['hrdemoPositionParametersGridTableHeaderText-02', 'hrdemoPositionParametersGridTable']);
        }
    },
    'hrdemoPositionParametersGridTableHeaderText-02': {
        init() {
            return {
                title: v('hrdemoPositionParametersRow1Cell3SegmentedControl').selected
            }
        }
    },
    hrdemoPositionParametersGridTable: {
        write: {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db, cell, widgetValue, row, col) => {
                if (cell.theValueIsPercent === true) {
                    return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${Utils.getDecimalFromPercentString(widgetValue.value)}\"}`
                } else {
                    return `{"Ordinal": ${widgetValue.ordinal},"Value": \"${widgetValue.value}\"}`
                }
            }
        },
        theValueIsPercent(positionParam) {
            let value = '';
            if (positionParam === 'Bonus (%)') {
                value = true;
            } else {
                value = false
            }
            return value
        },
        init() {
            if (v('hrdemoPositionParametersPositionSelectorPopUpDropbox').value && v('hrdemoPositionParametersHeadcountSelectorPopUpDropbox').value) {
                return new RestRequest(this.restRequest);
            }
            return [];
        },
        restRequest:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoPositionParametersGridTable_init',
                        year: v('hrdemoPositionParametersRow1Cell3SegmentedControl').selected ? v('hrdemoPositionParametersRow1Cell3SegmentedControl').selected : '2022',
                        position: v('hrdemoPositionParametersPositionSelectorPopUpDropbox').value,
                        type: v('hrdemoPositionParametersHeadcountSelectorPopUpDropbox').value
                    };
                },
                parsingControl: {
                    type: 'script',
                    script: (data, ctx, object) => {
                        let result = [],
                            k = 0, c,
                            step = 12,
                            cells = data.Cells,
                            members,
                            cell

                        while (k < cells.length) {
                            cell = cells[k];
                            members = cell.Members;
                            let d = [];

                            // 1. col
                            c = {
                                title: members[4].Name,
                                alignment: 'center-left',
                                titleFontSize: '13px',
                                paddingLeft: '10px'
                            };
                            d.push(c);

                            for (let i = 0; i < 12; i++) {

                                c = {
                                    title: '',
                                    paddingRight:'15px',
                                    ordinal: cells[i + k].Ordinal,
                                    theValueIsPercent: 'Bonus (%)' === members[4].Name,
                                    editable: true
                                };
                                if (c.theValueIsPercent) {
                                    c.title = parseFloat(cells[i + k].FormattedValue.replace(',', '.')) * 100 + '%';
                                } else {
                                    c.title = parseInt(cells[i + k].FormattedValue).toFixed(2);
                                }
                                d.push(c);
                            }
                            k = k + step;
                            result.push(d);
                        }
                        return {
                            content: result
                        };
                    }
                }
            },
    },

    // Report Page

    hrdemoReportChart1: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart1_init_1'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[3].Name,
                                label: (r.Cells[x].Members[3].Name).substring(4, 6)
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart1_init_2'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: parseInt(r.Cells[x].FormattedValue)};
                        },
                        (r, x) => {
                            return {value: parseInt(r.Cells[x + 1].FormattedValue)};
                        }]
                }

            }
        ],
    },

    hrdemoReportChart2: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart2_init_1'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[3].Name,
                                label: (r.Cells[x].Members[3].Name).substring(4, 6)
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart2_init_2'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: parseInt(r.Cells[x].FormattedValue)};
                        },
                        (r, x) => {
                            return {value: parseInt(r.Cells[x + 1].FormattedValue)};
                        }]
                }

            }
        ],
    },

    hrdemoReportChart3: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'chartDefaultMDX'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[6].Name,
                                label: r.Cells[x].Members[6].Name
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'chartDefaultMDX'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }]
                }

            }
        ],
    },

    hrdemoReportChart4: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'chartDefaultMDX'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[6].Name,
                                label: r.Cells[x].Members[6].Name
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'chartDefaultMDX'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }]
                }

            }
        ],
    },

    hrdemoReportChart5: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart5_init_1'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[3].Name,
                                label: r.Cells[x].Members[3].Name
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart5_init_2'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: (parseInt(r.Cells[x].FormattedValue)) / 1000};
                        },
                        (r, x) => {
                            return {value: (parseInt(r.Cells[x + 1].FormattedValue)) / 1000};
                        }]
                }

            }
        ],
    },

    hrdemoReportWaterFall: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_NameENG))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportWaterFall_init'
                    };
                },
                parsingControl: {
                    type: 'script',
                    script(r) {
                        let values = r.Cells.map(
                            (elem, index) => r.Cells.slice(
                                0, index + 1).map(
                                e => Utils.parseNumber(e.FormattedValue, 'HU-hu')).reduce(
                                (a, b) => a + b));

                        values.splice(-1, 1);
                        const max = Math.max.apply(this, values),
                            min = Math.min.apply(this, values);

                        return {
                            maxYAxis: String(Math.round((max * 1.01))),
                            minYAxis: String(Math.round((min * 0.99)))
                        };
                    }
                }
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_NameENG))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportWaterFall_init'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 10,
                    query: [
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 1].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 2].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 3].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 4].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 5].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 6].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 7].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 8].FormattedValue, 'HU-hu')
                            };
                        },
                        (r, x) => {
                            return {
                                value: Utils.parseNumber(r.Cells[x + 9].FormattedValue, 'HU-hu')
                            };
                        },
                    ]
                }

            }
        ],
    },
    hrdemoReportChart6: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart6_init_1'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Members[4].Name,
                                label: r.Cells[x].Members[4].Name
                            };
                        }
                }

            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart6_init_2'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 1,
                    query: [
                        (r, x) => {
                            return {value: parseInt(r.Cells[x].FormattedValue)};
                        }
                    ]
                }

            }
        ],
    },
    hrdemoSimulationExitOrganisationPopUpGridRow2Text1: {
        init() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (m) {
                let y = m.slice(0, 4) + '. ' + months[Utils.parseNumber(m.slice(4, 6)) - 1];
                return {
                    title: Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].title + '  ' + '<b style=color:#747B85>' + y + '</b>',
                    titleFontWeight: '600'
                }
            }
            return {};
        }
    },
    hrdemoSimulationExitOrganisationPopUpGridRow3Text1: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoSimulationGridTable')) {
                let e = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].title;
                return {
                    title: 'Select the last working day of ' + '<b style=color:#747B85>' + e + '</b>',
                    titleFontWeight: '300'
                }
            }
            return {};
        }
    },
    hrdemoUpdateValueGridRow5Text1: {
        init() {
            return {
                title: 'Last edit made by',
                titleFontWeight: '300'
            }
        }
    },
    hrdemoUpdateValueGridRow6Text1: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoSimulationGridTable')) {
                return new RestRequest(this.restRequest);
            }
            return false;
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoUpdateValueGridRow6Text1_init',
                    employee: Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber,
                    version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    period: Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth
                };
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        title: (r, x) => {
                            if (r.Cells[x].FormattedValue && r.Cells[x + 1].FormattedValue !== '') {
                                return r.Cells[x].FormattedValue + ' ' + r.Cells[x + 1].FormattedValue;
                            }
                            return '';
                        }
                    }
            }
        }
    },
    hrdemoSimulationRow1Cell1Button: {
        launch() {
            Api.removeWidgetValues(['hrdemoSimulationGridTable', 'hrdemoSimulationExitOrganisationPopUpGridRow3Text1']);
            Api.openPage('hrdemoMain');
        }
    },
    hrdemoSimulationCompensationChangePopUpGridRow3Text1: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoSimulationGridTable')) {
                return new RestRequest(this.restRequest);
            }
            return false;
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoUpdateValueGridRow6Text1_init',
                    employee: Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber,
                    version: v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    period: Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth
                };
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        title: (r, x) => {
                            if (r.Cells[x].FormattedValue && r.Cells[x + 1].FormattedValue !== '') {
                                return 'Last edit made by ' + r.Cells[x].FormattedValue + ' ' + r.Cells[x + 1].FormattedValue;
                            }
                            return '';
                        },
                    }
            }
        }
    },
    hrdemoUpdateValueGridRow5: {
        init() {
            return {
                visible: !(v('hrdemoUpdateValueGridRow5Text1').value === 'Last edit made by')
            }
        }
    },
    hrdemoUpdateValueGridRow7Text1: {
        init() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (m) {
                let y = months[Utils.parseNumber(m.slice(4, 6)) - 1];
                return {
                    title: m.slice(0, 4) + '. ' + '<b style=color:#747B85>' + y + '</b>',
                    titleFontWeight: '300',
                    visible: true
                }
            }
            return {};
        }
    },

    hrdemoSimulationCompensationChangePopUpGridRow2Text1: {
        init() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (m) {
                let y = m.slice(0, 4) + '. ' + months[Utils.parseNumber(m.slice(4, 6)) - 1];
                return {
                    title: Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].title + '  ' + '<b style=color:#747B85>' + y + '</b>',
                    titleFontWeight: '600'
                }
            }
            return {};
        }
    },

    hrdemoSimulationTableFilterPopUpDropbox: {
        choose(ctx) {
            Utils.setWidgetValue('systemValueSelectedFilteredPosition', v('hrdemoSimulationTableFilterPopUpDropbox.value'));
            Utils.togglePopup('hrdemoSimulationTableFilterPopUp', ctx);
            Api.forceRefresh('hrdemoSimulationGridTable');
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoSimulationTableFilterPopUpDropbox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('systemValueSelectedFilteredPosition');
                            return {
                                name: r.Cells[x].FormattedValue === 'Total Positions' ? 'All' : r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected,
                                //key: r.Cells[x].Members[0].Name
                            };
                        }
                }
            }
    },
    hrdemoSimulationCopyPopupRow5Cell1Text: {
        init() {
            return {
                title: v('hrdemoSimulationGroupSelectorPopUpDropbox').value + ' - ' + v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
            }
        }
    },
    hrdemoSimulationCopyPopupRow6Cell2Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Copy Version')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value;
                return {
                    version: version
                }
            }
        },
    },
    hrdemoSimulationExitOrganisationPopUpGridRow5Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Exit Employee')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    month = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                    employee = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber;
                return {
                    version: version,
                    month: month,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    employee: employee,
                    user: v('activeUser')
                }
            }
        },
    },
    hrdemoSimulationNamePopupRow3GridTable: {
        init(ctx) {
            if (v('hrdemoSimulationGridTable').column == 0) {
                return new RestRequest(this.restRequest)
            }
            return [];
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    employee: Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').employeeNumber
                };
            },
            parsingControl: {
                type: 'matrix',
                length: 1,
                query: [
                    (r, x) => {
                        return {
                            title: r.Cells[x].Members[0].Name,
                            titleFontWeight: 'normal'
                        };
                    },
                    (r, x) => {
                        return {
                            title: (r.Cells[x].FormattedValue).replace('Department', ''),
                            titleFontWeight: 'normal'
                        };
                    }
                ]
            }
        }
    },
    hrdemoSimulationGridTablePopUpGridRow2Cell1Button: {
        launch(ctx) {
            Utils.closePopup('hrdemoSimulationGridTablePopUp', ctx);
            Api.updateWidgetsContent([
                'hrdemoUpdateValueGridRow7Text1',
                'hrdemoUpdateValueGridRow8DatePicker',
                'hrdemoUpdateValueGridRow5Text1',
                'hrdemoUpdateValueGridRow2Text2']).then(() => {
                Api.forceRefresh('hrdemoUpdateValueGridRow5');
            }).then(() => {
                Utils.openPopup('hrdemoUpdateValuePopup', ctx);
            });
        }
    },
    hrdemoSimulationNamePopupPanelCellImage: {
        init() {
            if (Utils.isGridTableLoaded('hrdemoSimulationGridTable')) {
                return {
                    fileName: `${Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').employeeNumber}.jpeg`
                }
            }
            return {visible: false};
        }
    },
    'hrdemoSimulationNamePopupRow3GridTableHeaderText-1': {
        init() {
            return {
                title: v('hrdemoSimulationGridTable').column == 0 ? Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').title : ''
            }
        }
    },
    hrdemoUpdateValueGridRow2Text2: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoSimulationGridTable') && Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth) {
                return new RestRequest(this.restRequest)
            }
            return {};
        },
        updateContentFinished() {
            Api.forceRefresh('hrdemoUpdateValueGridRow4Slider');
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Attributes/Caption))`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    month = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                    employee = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber;
                return {
                    employee: employee,
                    version: version,
                    period: month
                };
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        title: (r, x) => {
                            return r.Cells[x].FormattedValue;
                        }
                    }
            }
        }
    },
    hrdemoUpdateValueGridRow4Slider: {
        getOriginalValue() {
            return Utils.parseNumber(Utils.replaceDecimal(v('hrdemoUpdateValueGridRow2Text2').value), 'HU-hu');
        },
        init() {
            if (v('hrdemoUpdateValueGridRow2Text2').value) {
                return {
                    value: 0,
                    updateableWidgetValueHandler: (sliderValue) => {
                        let originalValue = this.getOriginalValue(),
                            newValue;

                        if (sliderValue === 0) {
                            newValue = originalValue;
                        } else {
                            newValue = (originalValue * (1 + (sliderValue / 100))).toFixed(2);
                        }

                        return newValue;
                    },
                    calculateSliderValue: (value) => {
                        let sliderWidgetValue = v('hrdemoUpdateValueGridRow4Slider');
                        sliderWidgetValue.value = value;

                        Utils.setWidgetValue('hrdemoUpdateValueGridRow4Slider', sliderWidgetValue);

                        let originalValue = this.getOriginalValue();

                        if (originalValue === 0) {
                            return originalValue;
                        }

                        return ((value / originalValue) - 1) * 100;
                    }
                };
            }
            return {};
        }
    },
    hrdemoUpdateValueGridRow9Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI FTE change')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    month = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                    employee = Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber,
                    fte = parseInt(v('hrdemoUpdateValueGridRow3TextBox').value);
                return {
                    version: version,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    month: month,
                    employee: employee,
                    fte: fte,
                    user: v('activeUser')
                }
            }
        },
    },
    hrdemoSimulationAddDummyPopUpGridRow4Cell1Save: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Add Dummy')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value;
                return {
                    measure: v('hrdemoSimulationAddDummyPopUpGridRow2Cell1SegmentedControl').selected === 'Exit' ? -1 : 1,
                    name: v('hrdemoSimulationAddDummyPopUpGridTable_1_1').value,
                    type: v('hrdemoSimulationAddDummyPopUpGridTable_4_1').value,
                    position: v('hrdemoSimulationAddDummyPopUpGridTable_3_1').value,
                    version: version,
                    baseSalary: v('hrdemoSimulationAddDummyPopUpGridTable_6_1').value,
                    numberOfEmployee: v('hrdemoSimulationAddDummyPopUpGridTable_0_1').value,
                    month: (v('hrdemoSimulationAddDummyPopUpGridTable_2_1').value).replace('.', ''),
                    fte: 1,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    bonus: v('hrdemoSimulationAddDummyPopUpGridTable_8_1').value,
                    age: '',
                    car: '',
                    location: ''
                }
            }
        },
    },
    hrdemoSimulationCompensationChangeGroupPopUpGridRow2Text1: {
        init() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (m) {
                let y = m.slice(0, 4) + '. ' + months[Utils.parseNumber(m.slice(4, 6)) - 1];
                return {
                    title: v('hrdemoSimulationGroupSelectorPopUpDropbox').value + ' - ' + '<b style=color:#747B85>' + y + '</b>',
                }
            }
            return {};
        }
    },
    hrdemoSimulationCollectiveRedundancyPopUpGridRow2Text1: {
        init() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (m) {
                let y = m.slice(0, 4) + '. ' + months[Utils.parseNumber(m.slice(4, 6)) - 1];
                return {
                    title: v('hrdemoSimulationGroupSelectorPopUpDropbox').value + ' - ' + '<b style=color:#747B85>' + y + '</b>',
                }
            }
            return {};
        }
    },
    hrdemoSimulationCollectiveRedundancyPopUpGridRow3Text1: {
        init() {
            return {
                title: 'Select the last working day of the ' + v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
            }
        }
    },
    hrdemoSimulationCompensationChangeGroupPopUpGridRow5Cell1Submit: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Compensation change collective')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group = v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    value = v('hrdemoSimulationCompensationChangeGroupPopUpGridRow3TextBox1').value.replace(' %', ''),
                    month = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth;
                return {
                    version: version,
                    value: value,
                    group: group,
                    month: month,
                    user: v('activeUser')
                }
            }
        },
    },
    hrdemoSimulationCollectiveRedundancyPopUpGridRow5Button: {
        launch: {
            url: (db) => `/api/v1/Processes('zSYS Analogic UI Collective redundancy')/tm1.ExecuteWithReturn`,
            type: 'POST',
            server: true,
            body: (db) => {
                let version = v('hrdemoSimulationVersionSelectorPopUpDropbox').value,
                    group = v('hrdemoSimulationGroupSelectorPopUpDropbox').value,
                    month = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth;
                return {
                    version: version,
                    group: group,
                    month: month,
                    user: v('activeUser')
                }
            }
        },
    },
    hrdemoViewGroupGridTable: {
        switch(ctx) {
            if (ctx.getRow() > 2) {
                Api.updateContent('hrdemoViewGroupGridTable').then(() => {
                    Api.updateWidgetsContent(Repository.hrdemoViewGroupGridTable.updatableWidgets());
                    Api.updateContent('hrdemoPeopleServiceTeamListGridTable');
                });
            }
        },
        updatableWidgets() {
            let d = [];
            for (let i = 1; i < 10; i++) {
                d.push(`hrdemoPeopleServiceTeamListGridTableHeaderCell-${i}`)
                d.push(`hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-${i}`)
            }
            return d;
        },
        init() {
            return [
                [{
                    titleOn: 'Name',
                    titleOff: 'Name',
                    value: 1,
                    skin: 'page_toggle_always_on',
                    icon: 'icon-checkbox-on11',
                    iconOff: 'icon-checkbox-on11'
                }],
                [{
                    titleOn: 'Team',
                    titleOff: 'Team',
                    skin: 'page_toggle_always_on',
                    value: 1,
                    icon: 'icon-checkbox-on11',
                    iconOff: 'icon-checkbox-on11'
                }],
                [{
                    titleOn: 'Department',
                    titleOff: 'Department',
                    cellSkin: 'view_border',
                    skin: 'page_toggle_always_on',
                    value: 1,
                    icon: 'icon-checkbox-on11',
                    iconOff: 'icon-checkbox-on11'
                }],
                [{
                    titleOn: 'Salary',
                    titleOff: 'Salary',
                    value: v('hrdemoViewGroupGridTable_3_0').switch ? v('hrdemoViewGroupGridTable_3_0').switch.value : 0
                }],
                [{
                    titleOn: 'Position',
                    titleOff: 'Position',
                    value: v('hrdemoViewGroupGridTable_4_0').switch ? v('hrdemoViewGroupGridTable_4_0').switch.value : 0
                }],
                [{
                    titleOn: 'Supervisor',
                    titleOff: 'Supervisor',
                    value: v('hrdemoViewGroupGridTable_5_0').switch ? v('hrdemoViewGroupGridTable_5_0').switch.value : 0
                }],
                [{
                    titleOn: 'Car',
                    titleOff: 'Car',
                    value: v('hrdemoViewGroupGridTable_6_0').switch ? v('hrdemoViewGroupGridTable_6_0').switch.value : 0
                }],
                [{
                    titleOn: 'Location',
                    titleOff: 'Location',
                    value: v('hrdemoViewGroupGridTable_7_0').switch ? v('hrdemoViewGroupGridTable_7_0').switch.value : 0
                }],
                [{
                    titleOn: 'Age',
                    titleOff: 'Age',
                    value: v('hrdemoViewGroupGridTable_8_0').switch ? v('hrdemoViewGroupGridTable_8_0').switch.value : 0
                }]
            ];
        }
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1': {
        init(ctx) {
            let cn = ['Name', 'Team', 'Department', 'Salary', 'Position', 'Supervisor', 'Car', 'Location', 'Age'],
                index = parseInt(ctx.getId().split('-')[1]) - 1;
            return {
                title: v('hrdemoViewGroupGridTable').cellData[index][0].value === 1 ? cn[index] : '',
                cellWidth: v('hrdemoViewGroupGridTable').cellData[index][0].value === 1 ? '350px' : '0px',
                paddingLeft: '8px',
                titleFontWeight: 'bold',
                titleFontColor: '#767D86',
                titleFontSize: 12,
                marginBottom: '10px'
            };
        }
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-2': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-3': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-4': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-5': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-6': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-7': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-8': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-9': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell1Text-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-1': {
        init(ctx) {
            let index = parseInt(ctx.getId().split('-')[1]) - 1;
            return {
                width: v('hrdemoViewGroupGridTable').cellData[index][0].value === 1 ? '220px' : '0px',
                alignment: 'bottom-left',
                cellHeaderSkin: v('hrdemoViewGroupGridTable').cellData[index][0].value === 1 ? '' : 'no_border',
            };
        }
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-2': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-3': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-4': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-5': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-6': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-7': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-8': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    'hrdemoPeopleServiceTeamListGridTableHeaderCell-9': {
        reference: 'hrdemoPeopleServiceTeamListGridTableHeaderCell-1'
    },
    hrdemoPeopleServiceTeamListRow3Cell1Text1: {
        text_click(ctx) {
            Utils.openPopup('hrdemoFilterPopup', ctx);
        }
    },
    hrdemoFilterGridTable: {
        text_click(ctx) {
            Utils.togglePopup('hrdemoFilterPopup', ctx);
            Utils.openPopup('hrdemoFilterDetailsPopup', ctx);
            Api.updateWidgetsContent(['hrdemoFilterDetailsGridRow3DropBox', 'hrdemoFilterDetailsGridRow2Text1', 'hrdemoFilterDetailsGridRow1Text1']);
        },
        init() {
            let d = [],
                titles = ['Salary', 'Supervisor', 'Car', 'Location', 'Age'];
            for (let i = 0; i < 5; i++) {
                d.push([{title: titles[i]}])
            }
            return d;
        }
    },
    hrdemoFilterDetailsGridRow3DropBox: {
        choose(ctx) {
            let isList = v('systemValueSourcePage') === 'hrdemoPeopleServiceTeamList',
                filterSystemValue = isList ? '' : 'InEditor';
            Utils.setWidgetValue(`systemValueSelected${Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title}Filter${filterSystemValue}`, v('hrdemoFilterDetailsGridRow3DropBox').value === 'None' ? '' : v('hrdemoFilterDetailsGridRow3DropBox').value);
        },
        init() {
            let items = [{name: 'None'}];
            if (Utils.getGridTableCurrentCell('hrdemoFilterGridTable')) {
                let isList = v('systemValueSourcePage') === 'hrdemoPeopleServiceTeamList',
                    filterSystemValue = isList ? '' : 'InEditor';
                for (let i = 0; i < v(`systemValueItemsFor${Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title}Filter${filterSystemValue}`).length; i++) {
                    items.push({
                        name: v(`systemValueItemsFor${Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title}Filter${filterSystemValue}`)[i],
                        on: v(`systemValueItemsFor${Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title}Filter${filterSystemValue}`)[i] === v(`systemValueSelected${Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title}Filter${filterSystemValue}`)
                    });
                }
            }
            return {items: items}
        }
    },
    hrdemoFilterDetailsGridRow2Text1: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoFilterGridTable')) {
                return {
                    title: Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title
                }
            }
            return {};
        }
    },
    hrdemoFilterDetailsGridRow1Text1: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoFilterGridTable')) {
                return {
                    title: Utils.getGridTableCurrentCell('hrdemoFilterGridTable').title + ' Filter'
                }
            }
            return {};
        }
    },
    hrdemoFilterDetailsGridRow5Button: {
        launch(ctx) {
            Utils.togglePopup('hrdemoFilterDetailsPopup', ctx);
        }
    },
    hrdemoFilterDetailsGridRow4Button: {
        launch(ctx) {
            Utils.togglePopup('hrdemoFilterDetailsPopup', ctx);
            if (v('systemValueSourcePage') === 'hrdemoPeopleServiceTeamList') {
                Api.updateContent('hrdemoPeopleServiceTeamListRow3FilterPanelTable');
                Api.forceRefresh('hrdemoPeopleServiceTeamListGridTable');
            } else {
                Utils.setWidgetValue('systemValueEmployeeLevelSelection', '');
                Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorRow3FilterPanelTable']).then(() => {
                    Api.forceRefreshWidgets(['hrdemoPeopleServiceTeamEditorGridTable', 'hrdemoPeopleServiceEmployeeDetailsGridTableHeaderCell1Text']);
                    Api.updateContent('hrdemoPeopleServiceEmployeeDetailsGridTable')
                });
            }
            Api.forceRefresh('hrdemoPeopleServiceTeamListRow3Cell3Text1');
            Api.forceRefresh('hrdemoPeopleServiceTeamEditorRow3Cell3Text1');

        }
    },
    hrdemoPeopleServiceTeamListRow1Cell1Button: {
        launch(ctx) {
            Repository.hrdemoPeopleServiceTeamListRow1Cell1Button.clearValuesOnListPage();
            Api.openPage('hrdemoMain');
        },
        clearValuesOnListPage() {
            Api.removeWidgetValues(['systemValueItemsForCarFilter',
                'systemValueItemsForLocationFilter',
                'systemValueItemsForSupervisorFilter',
                'systemValueItemsForAgeFilter',
                'systemValueItemsForSalaryFilter',
                'systemValueSelectedCarFilter',
                'systemValueSelectedLocationFilter',
                'systemValueSelectedAgeFilter',
                'systemValueSelectedSupervisorFilter',
                'systemValueSelectedSalaryFilter']);
        }
    },
    hrdemoPeopleServiceTeamListRow3Cell3Text1: {
        init() {
            if (v('hrdemoPeopleServiceTeamListRow3FilterPanelTable').cellData) {
                return {
                    visible: (v('hrdemoPeopleServiceTeamListRow3FilterPanelTable.cellData').filter(e => e[0].cellVisible === true).length) > 0
                }
            }
            return {};
        },
        launch(ctx) {
            Repository.hrdemoPeopleServiceTeamListRow1Cell1Button.clearValuesOnListPage();
            Api.forceRefresh('hrdemoPeopleServiceTeamList').then(() => {
                Api.updateContent('hrdemoPeopleServiceTeamListRow3Cell3Text1')
            });
        }
    },
    hrdemoPeopleServiceTeamEditorRow3Cell3Text1: {
        init() {
            if (v('hrdemoPeopleServiceTeamEditorRow3FilterPanelTable').cellData) {
                return {
                    visible: (v('hrdemoPeopleServiceTeamEditorRow3FilterPanelTable.cellData').filter(e => e[0].cellVisible === true).length) > 0
                }
            }
            return {};
        },
        launch(ctx) {
            Repository.hrdemoPeopleServiceTeamEditorRow1Cell1Button.clearValues();
            Api.forceRefresh('hrdemoPeopleServiceTeamEditor').then(() => {
                Api.updateContent('hrdemoPeopleServiceTeamEditorRow3Cell3Text1')
            });
        }
    },
    hrdemoPeopleServiceTeamListRow2Cell1SegmentedControl: {
        switch() {
            Repository.hrdemoPeopleServiceTeamListRow1Cell1Button.clearValuesOnListPage();
            Api.openPage('hrdemoPeopleServiceTeamEditor');
        }
    },
    hrdemoSimulationRow2Cell5Button: {
        init() {
            return {
                visible: !(v('hrdemoSimulationRow1Cell3SegmentedControl').selected === 'Group Budget')
            }
        },
    },
    hrdemoPeopleServiceTeamListRow3FilterPanelTable: {
        init() {
            let d = [],
                titles = ['Salary', 'Supervisor', 'Car', 'Location', 'Age'];
            for (let i = 0; i < 5; i++) {
                d.push([{
                    title: titles[i] + ':   ' + v(`systemValueSelected${titles[i]}Filter`),
                    cellSkin: 'selected_filter',
                    filterType: titles[i],
                    cellVisible: v(`systemValueSelected${titles[i]}Filter`) !== false
                }])
            }
            return d;
        },
        clear_filter() {
            Utils.setWidgetValue(`systemValueSelected${Utils.getGridTableCurrentCell('hrdemoPeopleServiceTeamListRow3FilterPanelTable').filterType}Filter`, '');
            Api.updateWidgetsContent(['hrdemoPeopleServiceTeamListRow3FilterPanelTable']);
            Api.forceRefresh('hrdemoPeopleServiceTeamListGridTable');
        }
    },
    hrdemoSimulationCommentPopupGridXButton: {
        launch(ctx) {
            Utils.togglePopup('hrdemoSimulationCommentPopup', ctx);
            if (v('hrdemoSimulationCommentPopupCommentAdded')) {
                Api.updateContent('hrdemoSimulationGridTable');
            } else {
                Repository.hrdemoSimulationCommentPopupPreviousCommentsGridTable.reset();
            }
        }
    },
    hrdemoSimulationCommentPopupCommentInput: {
        save: {
            url: (db) => {
                return `/api/v1/Processes('zSYS Analogic UI Add Comment')/tm1.ExecuteWithReturn`;
            },
            type: 'POST',
            server: true,
            body: (db) => {
                let parameters = Repository.hrdemoSimulationGridTable.getCommentSaveProcessParameters();
                parameters['comment'] = v('hrdemoSimulationCommentPopupCommentInput.value');
                parameters['activeUser'] = v('activeUser').replace(/\\/g, '/');
                Utils.setWidgetValue('hrdemoSimulationCommentPopupCommentAdded', true);
                return parameters;
            }
        },
        reloadComment: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            server: true,
            body: (db) => {
                return Repository.hrdemoSimulationGridTable.getCommentReloadParametersAfterSave();
            },
            parsingControl: {
                type: 'script',
                script: (data) => {
                    let r = {
                        previousCommentId: data.Cells[0].FormattedValue,
                        commentId: data.Cells[1].FormattedValue,
                        text: data.Cells[2].FormattedValue,
                        user: data.Cells[3].FormattedValue,
                        date: data.Cells[4].FormattedValue
                    };
                    Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadedComments', v('hrdemoSimulationCommentPopupLoadedComments').length !== 0 ? [r].concat(v('hrdemoSimulationCommentPopupLoadedComments')) : [r]);
                    Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadFromLoadedComments', true);
                    Api.forceRefresh('hrdemoSimulationCommentPopupPreviousCommentsGridTable');
                    Api.forceRefresh('hrdemoSimulationCommentPopupCommentInput');
                    Api.forceRefresh('hrdemoSimulationCommentPopupControlPanelLoadMoreButton');
                    return {};
                }
            }
        }
    },
    hrdemoSimulationCommentPopupControlPanelLoadMoreButton: {
        init() {
            let loadedComments = v('hrdemoSimulationCommentPopupLoadedComments'),
                visible = loadedComments !== false && loadedComments.length > 0 && loadedComments[loadedComments.length - 1].previousCommentId !== '';
            return {visible: visible};
        },
        text_click() {
            Api.forceRefresh('hrdemoSimulationCommentPopupPreviousCommentsGridTable');
        }
    },
    hrdemoSimulationCommentPopupPreviousCommentsGridTable: {
        reset() {
            Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadedComments', []);
            Utils.setWidgetValue('hrdemoSimulationCommentPopupCommentAdded', false);
        },
        getGridTableDataFromLoadedComments() {
            let results = [];
            for (let c of v('hrdemoSimulationCommentPopupLoadedComments')) {
                results.push(
                    [{
                        title: c.text,
                        marginBottom: '10',
                        width: '280',
                        skin: 'comment_text'
                    }]
                );
                results.push(
                    [{
                        title: c.user,
                        height: '30',
                        skin: 'comment_user',
                        icon: 'icon-user',
                        titleFontColor: '#000',
                    }]
                );
                results.push(
                    [{
                        title: c.date,
                        marginLeft: '15',
                        height: '30',
                        titleFontColor: '#ACADAE',
                        skin: 'kam_forecast_text'
                    }]
                );
            }
            Api.forceRefresh('hrdemoSimulationCommentPopupControlPanelLoadMoreButton');
            return results;
        },
        initCondition: (db) => {
            return v('commentId', Utils.getGridTableCurrentCell('hrdemoSimulationGridTable')) !== false && v('commentId', Utils.getGridTableCurrentCell('hrdemoSimulationGridTable')) !== '0,00' && v('hrdemoSimulationCommentPopupLoadFromLoadedComments') === false;
        },
        initDefault: (db) => {
            if (v('hrdemoSimulationCommentPopupLoadFromLoadedComments')) {
                Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadFromLoadedComments', false);
                return Repository.hrdemoSimulationCommentPopupPreviousCommentsGridTable.getGridTableDataFromLoadedComments()
            } else {
                return [];
            }
        },
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            server: true,
            body: (db) => {
                let commentId, loadedComments = v('hrdemoSimulationCommentPopupLoadedComments');
                if (loadedComments.length > 0) {
                    commentId = loadedComments[loadedComments.length - 1].previousCommentId;
                } else {
                    commentId = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').commentId;
                }
                return {commentId: commentId};
            },
            parsingControl: {
                type: 'script',
                script: (data) => {
                    let r = {
                        previousCommentId: data.Cells[0].FormattedValue,
                        commentId: data.Cells[1].FormattedValue,
                        text: data.Cells[2].FormattedValue,
                        user: data.Cells[3].FormattedValue,
                        date: data.Cells[4].FormattedValue
                    }, results = [];
                    v('hrdemoSimulationCommentPopupLoadedComments').push(r);
                    return Repository.hrdemoSimulationCommentPopupPreviousCommentsGridTable.getGridTableDataFromLoadedComments();
                }
            }
        }
    },
    hrdemoPeopleServiceTeamEditorRow3FilterPanelTable: {
        init() {
            let d = [],
                titles = ['Salary', 'Supervisor', 'Car', 'Location', 'Age'];
            for (let i = 0; i < 5; i++) {
                d.push([{
                    title: titles[i] + ':   ' + v(`systemValueSelected${titles[i]}FilterInEditor`),
                    cellSkin: 'selected_filter',
                    filterType: titles[i],
                    cellVisible: v(`systemValueSelected${titles[i]}FilterInEditor`) !== false
                }])
            }
            return d;
        },
        clear_filter() {
            Utils.setWidgetValue(`systemValueSelected${Utils.getGridTableCurrentCell('hrdemoPeopleServiceTeamEditorRow3FilterPanelTable').filterType}FilterInEditor`, '');
            Api.updateWidgetsContent(['hrdemoPeopleServiceTeamEditorRow3FilterPanelTable']);
            Api.forceRefresh('hrdemoPeopleServiceTeamEditorGridTable');
        }
    },
    hrdemoPeopleServiceTeamEditorRow3Cell1Text1: {
        text_click(ctx) {
            Utils.openPopup('hrdemoFilterPopup', ctx);
        }
    },
    hrdemoPeopleServiceTeamEditorRow3: {
        init() {
            return {
                visible: /*v('hrdemoPeopleServiceTeamEditorGridTable.cellData').length > 0*/false
            };
        }
    }
};
