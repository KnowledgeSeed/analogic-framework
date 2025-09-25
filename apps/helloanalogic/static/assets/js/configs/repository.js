/* global app, Utils, Api, v */

'use strict';

Repository = {
    gridTableLightDemoTable: {
        init(ctx) {
            const extra = ctx && ctx.getExtraParams ? ctx.getExtraParams() : {};
            const DEFAULT_PAGE_SIZE = 100;
            const requestedPageSize = typeof extra.pageSize === 'number' ? extra.pageSize : DEFAULT_PAGE_SIZE;
            const pageSize = requestedPageSize === 0 ? 0 : (requestedPageSize || DEFAULT_PAGE_SIZE);
            const totalCount = 20000;
            const page = extra.page ? Math.max(1, parseInt(extra.page, 10) || 1) : 1;
            const startIndex = pageSize ? Math.max(0, (page - 1) * pageSize) : 0;
            const endIndex = pageSize ? Math.min(totalCount, startIndex + pageSize) : totalCount;

            if (!v('gridTableLightDemoLastAction')) {
                Utils.setWidgetValue('gridTableLightDemoLastAction', {
                    title: 'GridTableLight demo',
                    body: 'Use the Details buttons or Owner dropdowns to trigger repository events.'
                });
            }

            const statuses = ['Planned', 'In Progress', 'At Risk', 'Completed', 'Closed'];
            const owners = [
                {value: 'anna', label: 'Anna Howard'},
                {value: 'david', label: 'David Yu'},
                {value: 'marta', label: 'Marta López'},
                {value: 'sven', label: 'Sven Karlsson'},
                {value: 'leila', label: 'Leila Wong'}
            ];
            const healthStates = [
                {label: 'On track', color: '#047857'},
                {label: 'Review', color: '#b45309'},
                {label: 'Blocked', color: '#b91c1c'},
                {label: 'At risk', color: '#b45309'},
                {label: 'Completed', color: '#0f172a'}
            ];

            let storedColumnCount = v('gridTableLightDemoColumnCount');
            storedColumnCount = typeof storedColumnCount === 'number' ? storedColumnCount : parseInt(storedColumnCount, 10);
            if (!Number.isFinite(storedColumnCount)) {
                storedColumnCount = 20;
            }
            storedColumnCount = Math.min(30, Math.max(6, storedColumnCount));
            if (v('gridTableLightDemoColumnCount') !== storedColumnCount) {
                Utils.setWidgetValue('gridTableLightDemoColumnCount', storedColumnCount);
            }

            const columnCount = storedColumnCount;
            const columns = [];
            for (let idx = 0; idx < columnCount; idx++) {
                if (idx === 0) {
                    columns.push({key: 'record', title: 'Record', width: 220});
                } else if (idx === 1) {
                    columns.push({key: 'status', title: 'Status', width: 160, alignment: 'center-center'});
                } else if (idx === 2) {
                    columns.push({key: 'owner', title: 'Owner', width: 180});
                } else if (idx === 3) {
                    columns.push({key: 'action', title: 'Action', width: 120, alignment: 'center-center'});
                } else if (idx === 4) {
                    columns.push({key: 'health', title: 'Health', width: 140, alignment: 'center-center'});
                } else {
                    columns.push({key: `metric${idx - 4}`, title: `Metric ${idx - 4}`, alignment: 'center-right'});
                }
            }

            const content = [];
            for (let index = startIndex; index < endIndex; index++) {
                const status = statuses[index % statuses.length];
                const owner = owners[index % owners.length];
                const health = healthStates[index % healthStates.length];
                const baseValue = index + 1;
                const row = {
                    rowClasses: `grid-table-light-demo-row ${index % 2 === 0 ? 'grid-table-light-demo-row--even' : 'grid-table-light-demo-row--odd'}`,
                    rowStyle: index % 2 === 0 ? 'border-bottom:1px solid rgba(148,163,184,0.24)' : {backgroundColor: 'rgba(15,23,42,0.04)'},
                    cells: [
                        {
                            type: 'text',
                            rawValue: `Record ${baseValue}`,
                            editable: true,
                            tooltip: 'Rename the record',
                            cellClasses: 'grid-table-light-demo-cell grid-table-light-demo-cell--primary',
                            cellStyle: index % 3 === 0 ? {backgroundColor: 'rgba(37,99,235,0.08)'} : 'background-color:rgba(15,23,42,0.04)',
                            textClasses: 'grid-table-light-demo-text grid-table-light-demo-text--strong',
                            textStyle: {letterSpacing: '0.01em'},
                            inputClasses: 'grid-table-light-demo-input',
                            inputStyle: 'border-color:#38bdf8'
                        },
                        {
                            type: 'text',
                            rawValue: status,
                            alignment: 'center-center',
                            cellClasses: `status-${status.toLowerCase().replace(/\s+/g, '-')}`,
                            textClasses: 'grid-table-light-demo-text grid-table-light-demo-text--status'
                        },
                        {
                            type: 'combo',
                            rawValue: owner.value,
                            options: owners,
                            selectClasses: 'grid-table-light-demo-select',
                            selectStyle: {minWidth: '160px'},
                            cellStyle: 'justify-content:flex-start'
                        },
                        {
                            type: 'button',
                            displayValue: 'Details',
                            alignment: 'center-center',
                            buttonClasses: 'grid-table-light-demo-button',
                            buttonStyle: {borderRadius: '9999px', padding: '0 12px'},
                            cellStyle: 'text-align:center'
                        },
                        {
                            type: 'custom',
                            rawValue: health.label,
                            alignment: 'center-center',
                            cellClasses: 'grid-table-light-demo-badge-cell',
                            html: `<span class="grid-table-light-demo-badge" style="color:${health.color}"><span class="dot"></span>${health.label}</span>`
                        }
                    ]
                };

                for (let colIndex = 5; colIndex < columnCount; colIndex++) {
                    const metricIndex = colIndex - 4;
                    const value = (baseValue * metricIndex).toString();
                    row.cells.push({
                        type: 'text',
                        rawValue: value,
                        alignment: 'center-right',
                        cellClasses: colIndex % 2 === 0 ? 'grid-table-light-demo-metric' : '',
                        textStyle: colIndex % 3 === 0 ? {color: '#0369a1'} : ''
                    });
                }

                content.push(row);
            }

            return {
                columns: columns,
                content: content,
                totalCount: totalCount,
                page: page,
                pageSize: pageSize,
                allowCopyToClipBoard: true,
                freezeHeader: true,
                freezeFirstColumns: 2,
                enableExport: true,
                exportConfig: {fileName: 'grid-table-light-demo.xlsx'},
                rootClasses: ['grid-table-light-demo-root'],
                rootStyle: 'box-shadow:0 20px 25px -15px rgba(15,23,42,0.3)',
                tableClasses: 'grid-table-light-demo-table',
                tableStyle: {backgroundColor: '#fff'},
                innerClasses: ['grid-table-light-demo-inner'],
                innerStyle: 'gap:0',
                headClasses: 'grid-table-light-demo-head',
                headStyle: {backgroundColor: 'rgba(15,23,42,0.05)'},
                bodyClasses: 'grid-table-light-demo-body',
                bodyStyle: 'max-height:520px',
                actionsClasses: 'grid-table-light-demo-actions',
                actionsStyle: {top: '4px'},
                pagerClasses: 'grid-table-light-demo-pager',
                pagerStyle: 'justify-content:flex-end',
                pagerInnerClasses: 'grid-table-light-demo-pager-inner',
                pagerInnerStyle: {gap: '6px'},
                pagerButtonClasses: 'grid-table-light-demo-pager-button',
                pagerButtonStyle: 'min-width:32px',
                pagerInfoClasses: 'grid-table-light-demo-pager-info',
                pagerInfoStyle: {fontWeight: '600'}
            };
        },
        launch(ctx) {
            const rowIndex = ctx.getRow();
            const row = Utils.getGridTableCurrentRow(ctx.getWidgetId());
            const recordCell = row && row[0] ? row[0] : null;
            const recordLabel = recordCell ? (recordCell.displayValue || recordCell.title || recordCell.rawValue || '') : '';
            const rowNumber = typeof rowIndex === 'number' ? rowIndex + 1 : false;
            const rowLabel = rowNumber ? `row ${rowNumber}` : 'selected row';
            Utils.setWidgetValue('gridTableLightDemoLastAction', {
                title: 'Details requested',
                body: recordLabel ? `${recordLabel} – ${rowLabel}` : `Details requested for ${rowLabel}`
            });
            Api.updateContent('gridTableLightDemoInfoText');
        },
        text_change(ctx) {
            const columnIndex = ctx.getColumn();
            const rowIndex = ctx.getRow();
            const cell = ctx.getCell();
            const newValue = cell ? (cell.displayValue || cell.rawValue || '') : '';
            const rowNumber = typeof rowIndex === 'number' ? rowIndex + 1 : false;
            const rowText = rowNumber ? `Row ${rowNumber}` : 'Row';

            if (columnIndex === 0) {
                console.log('GridTableLight demo: record renamed', {row: rowNumber, value: newValue});
                Utils.setWidgetValue('gridTableLightDemoLastAction', {
                    title: 'Record renamed',
                    body: newValue ? `${rowText} renamed to ${newValue}` : `${rowText} renamed`
                });
                Api.updateContent('gridTableLightDemoInfoText');
                return;
            }
        },
        change(ctx) {
            const columnIndex = ctx.getColumn();
            if (columnIndex !== 2) {
                return;
            }
            const rowIndex = ctx.getRow();
            const row = Utils.getGridTableCurrentRow(ctx.getWidgetId()) || [];
            const recordCell = row[0] || {};
            const recordLabel = recordCell.displayValue || recordCell.title || recordCell.rawValue || '';
            const cell = ctx.getCell();
            const newValue = cell ? (cell.displayValue || cell.rawValue || '') : '';
            const rowNumber = typeof rowIndex === 'number' ? rowIndex + 1 : false;
            const rowText = rowNumber ? `Row ${rowNumber}` : 'Row';

            Utils.setWidgetValue('gridTableLightDemoLastAction', {
                title: 'Owner updated',
                body: recordLabel ? `${recordLabel} assigned to ${newValue}` : `${rowText} assigned to ${newValue}`
            });
            Api.updateContent('gridTableLightDemoInfoText');
        }
    },
    gridTableLightColumnCountSelector: {
        init: {
            execute: () => {
                let selected = v('gridTableLightDemoColumnCount');
                selected = typeof selected === 'number' ? selected : parseInt(selected, 10);
                if (!Number.isFinite(selected)) {
                    selected = 20;
                }
                selected = Math.min(30, Math.max(6, selected));
                if (v('gridTableLightDemoColumnCount') !== selected) {
                    Utils.setWidgetValue('gridTableLightDemoColumnCount', selected);
                }

                const items = [];
                for (let count = 6; count <= 30; count++) {
                    items.push({name: String(count), on: count === selected});
                }

                return {
                    title: 'Columns',
                    items: items
                };
            }
        },
        choose: {
            execute: () => {
                let selected = v('gridTableLightColumnCountSelector.value');
                selected = typeof selected === 'number' ? selected : parseInt(selected, 10);
                if (!Number.isFinite(selected)) {
                    selected = 20;
                }
                selected = Math.min(30, Math.max(6, selected));
                Utils.setWidgetValue('gridTableLightDemoColumnCount', selected);
                Api.updateContent('gridTableLightDemoTable');
            }
        }
    },
    gridTableLightCompactTable: {
        init() {
            const owners = [
                {value: 'alex', label: 'Alex Doe'},
                {value: 'brianna', label: 'Brianna Lee'},
                {value: 'carlos', label: 'Carlos Mendes'},
                {value: 'dina', label: 'Dina Patel'}
            ];
            const priorities = [
                {label: 'High', color: '#b91c1c'},
                {label: 'Medium', color: '#b45309'},
                {label: 'Low', color: '#047857'}
            ];
            const statuses = ['Draft', 'Planned', 'In Review', 'Completed'];

            const columns = [
                {key: 'task', title: 'Task', width: 200},
                {key: 'category', title: 'Category', width: 140},
                {key: 'owner', title: 'Owner', width: 160},
                {key: 'priority', title: 'Priority', width: 120, alignment: 'center-center'},
                {key: 'action', title: 'Action', width: 100, alignment: 'center-center'},
                {key: 'status', title: 'Status', width: 120, alignment: 'center-center'},
                {key: 'start', title: 'Start'},
                {key: 'end', title: 'End'},
                {key: 'progress', title: 'Progress', alignment: 'center-right'},
                {key: 'score', title: 'Score', alignment: 'center-right'}
            ];

            const baseDate = new Date('2024-01-08');
            const content = [];
            for (let idx = 0; idx < 10; idx++) {
                const owner = owners[idx % owners.length];
                const priority = priorities[idx % priorities.length];
                const status = statuses[idx % statuses.length];
                const start = new Date(baseDate.getTime() + idx * 86400000);
                const end = new Date(start.getTime() + (idx % 5 + 2) * 86400000);
                const progressValue = Math.min(100, 15 + idx * 7);
                const scoreValue = (72 + (idx * 3) % 20).toString();

                content.push([
                    {
                        type: 'text',
                        displayValue: `Task ${idx + 1}`,
                        rawValue: `Task ${idx + 1}`,
                        editable: true,
                        tooltip: 'Rename the task'
                    },
                    {
                        type: 'text',
                        displayValue: idx % 2 === 0 ? 'Finance' : 'Operations',
                        rawValue: idx % 2 === 0 ? 'Finance' : 'Operations'
                    },
                    {
                        type: 'combo',
                        rawValue: owner.value,
                        options: owners
                    },
                    {
                        type: 'custom',
                        rawValue: priority.label,
                        alignment: 'center-center',
                        html: `<span class="grid-table-light-demo-badge" style="color:${priority.color};background:${priority.color}1A"><span class="dot"></span>${priority.label}</span>`
                    },
                    {
                        type: 'button',
                        displayValue: 'Open',
                        alignment: 'center-center'
                    },
                    {
                        type: 'text',
                        displayValue: status,
                        rawValue: status,
                        alignment: 'center-center'
                    },
                    {
                        type: 'text',
                        displayValue: start.toISOString().slice(0, 10),
                        rawValue: start.toISOString().slice(0, 10)
                    },
                    {
                        type: 'text',
                        displayValue: end.toISOString().slice(0, 10),
                        rawValue: end.toISOString().slice(0, 10)
                    },
                    {
                        type: 'text',
                        displayValue: `${progressValue}%`,
                        rawValue: `${progressValue}%`,
                        alignment: 'center-right'
                    },
                    {
                        type: 'text',
                        displayValue: scoreValue,
                        rawValue: scoreValue,
                        alignment: 'center-right'
                    }
                ]);
            }

            return {
                columns: columns,
                content: content,
                totalCount: content.length,
                page: 1,
                pageSize: content.length,
                freezeHeader: true,
                freezeFirstColumns: 1,
                allowCopyToClipBoard: true
            };
        },
        text_change(ctx) {
            const columnIndex = ctx.getColumn();
            const rowIndex = ctx.getRow();
            const cell = ctx.getCell();
            const newValue = cell ? (cell.displayValue || cell.rawValue || '') : '';
            console.log('GridTableLight compact table text change', {column: columnIndex, row: rowIndex, value: newValue});
        },
        change(ctx) {
            const columnIndex = ctx.getColumn();
            if (columnIndex !== 2) {
                return;
            }
            const rowIndex = ctx.getRow();
            const cell = ctx.getCell();
            const newValue = cell ? (cell.displayValue || cell.rawValue || '') : '';
            console.log('GridTableLight compact table owner change', {row: rowIndex, value: newValue});
        },
        launch(ctx) {
            const rowIndex = ctx.getRow();
            const row = Utils.getGridTableCurrentRow(ctx.getWidgetId()) || [];
            const taskCell = row[0] || {};
            const taskLabel = taskCell.displayValue || taskCell.rawValue || `Row ${typeof rowIndex === 'number' ? rowIndex + 1 : ''}`;
            console.log('GridTableLight compact table launch', {row: rowIndex, task: taskLabel});
        }
    },
    gridTableLightTextTable: {
        init() {
            const columnCount = 15;
            const rowCount = 60;
            const columns = [];
            for (let index = 0; index < columnCount; index++) {
                columns.push({
                    key: `col${index + 1}`,
                    title: `Column ${index + 1}`,
                    width: index < 2 ? 200 : 160
                });
            }
            const content = [];
            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                const row = [];
                for (let colIndex = 0; colIndex < columnCount; colIndex++) {
                    row.push(`Row ${rowIndex + 1} · Col ${colIndex + 1}`);
                }
                content.push(row);
            }
            return {
                columns: columns,
                content: content,
                totalCount: content.length,
                page: 1,
                freezeFirstColumns: 2,
                allowCopyToClipBoard: true,
                bodyStyle: 'max-height:360px;'
            };
        }
    },
    gridTableLightDemoInfoText: {
        init() {
            const info = v('gridTableLightDemoLastAction') || {
                title: 'GridTableLight demo',
                body: 'Use the Details buttons or Owner dropdowns to trigger repository events.'
            };
            return info;
        }
    },
    // Add Clone Contracts
    analogicDemoAddCloneContractContractsTable: {
        init: {
            execute: (db) => {
                let result = [],
                    searchString = v('analogicDemoAddCloneContractRow2Cell1SearchBox').value ? v('analogicDemoAddCloneContractRow2Cell1SearchBox').value : '';
                for (let i = 0; i < 12; ++i) {
                    let row = [];
                    row.push({
                        icon: i === 0 ? 'icon-alert' : ''
                    });
                    row.push({
                        title: 'SU_' + Math.floor(Math.random() * 1000000) + '',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: i !== 0 ? 'Column Data' : '',
                        cellSkin: i !== 0 ? 'gray_bg' : 'red_bg'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        title: 'Column Data',
                        cellSkin: i !== 0 ? 'gray_bg' : 'simple'
                    });
                    row.push({
                        icon: i !== 0 ? 'icon-copy' : ''
                    });
                    result.push(row);
                }
                return result.filter(row => (row[1].title).includes(searchString));
            }
        }
    },
    analogicDemoAddCloneContractClonePopupRow2Text: {
        init: {
            execute: (db) => {
                return {
                    title: Utils.getGridTableCurrentRow('analogicDemoAddCloneContractContractsTable') ? Utils.getGridTableCurrentRow('analogicDemoAddCloneContractContractsTable')[1].title : ''
                }
            }
        }
    },
    analogicDemoAddCloneContractValidationRow2Text: {
        init: {
            execute: (db) => {
                return {
                    title: v('analogicDemoAddCloneContractContractsTable.cellData') ? v('analogicDemoAddCloneContractContractsTable.cellData')[0][1].title : ''
                }
            }
        }
    },
    analogicDemoAddCloneContractNewContractPopupPopupRow2DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'Segment 1', on: false},
                        {name: 'Segment 2', on: false},
                        {name: 'Segment 3', on: false},
                        {name: 'Segment 4', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoAddCloneContractNewContractPopupPopupRow4DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'Type 1', on: false},
                        {name: 'Type 2', on: false},
                        {name: 'Type 3', on: false},
                        {name: 'Type 4', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoAddCloneContractNewContractPopupPopupRow5DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'City 1', on: false},
                        {name: 'City 2', on: false},
                        {name: 'City 3', on: false},
                        {name: 'City 4', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoAddCloneContractNewContractPopupPopupRow6Dropbox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'Account 1', on: false},
                        {name: 'Account 2', on: false},
                        {name: 'Account 3', on: false},
                        {name: 'Account 4', on: false}
                    ]
                }
            }
        }
    },

    // Review Contracts
    analogicDemoReviewContracts: {
        updateanalogicDemoReviewContractsGridTableCell: (gridTableId, actualRow, actualColumn) => {
            let gridTableData = v(gridTableId), cellOriginalValue = gridTableData.cellData[actualRow][actualColumn];
            if (actualColumn != gridTableData.column) {
                return cellOriginalValue;
            }
            let dropDownValue = v('analogicDemoReviewContractsFilterPopUpDropdown.value') ? v('analogicDemoReviewContractsFilterPopUpDropdown.value') : '';
            if (actualRow == 1) {
                cellOriginalValue['title'] = dropDownValue;

            }
            if (dropDownValue === "") {
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button_circle' : 'filter_text_disabled';
            } else {
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button' : 'filter_text';
            }
            return cellOriginalValue;
        }
    },
    analogicDemoReviewContractsContractsTable: {
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 11; ++i) {
                    let row = [];
                    row.push({
                        title: ''
                    });
                    row.push({
                        title: i === 0 ? 'Sales Unit' : 'SU_' + Math.floor(Math.random() * 1000000),
                        alignment: i === 0 ? 'center-left' : 'center-left',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 1' : (Math.random() * 100).toFixed(2),
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 2' : 'Column Data',
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 3' : (Math.random() * 100).toFixed(2),
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 4' : (Math.random() * 100).toFixed(2),
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 5' : Math.floor(Math.random() * 100000000) + '_' + Math.floor(Math.random() * 10000),
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 6' : 'Column Data',
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 7' : Math.floor(Math.random() * 1000000) + '_ABC',
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 8' : 'Column Data',
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    row.push({
                        title: i === 0 ? 'Column 9' : Math.floor(Math.random() * 10000),
                        alignment: i === 0 ? 'center-left' : 'center-right',
                        skin: i === 0 ? 'table_header_2' : 'normal'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoReviewContractsFilterGridTable: {
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            title: 'Plan Cycle',
                            icon: 'icon-filter-circle',
                            iconColor: '#009FDA',
                            skin: 'filter_button_circle',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_0_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_0_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[0][0].value === 1
                        },
                        {
                            title: 'Currency',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_2_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_2_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[2][0].value === 1
                        },
                        {
                            title: 'Line of Business',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_4_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_4_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[4][0].value === 1
                        },
                        {
                            title: 'Country of Origin',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_5_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_5_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[5][0].value === 1
                        },
                        {
                            title: 'Plan Version',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_1_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_1_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[1][0].value === 1
                        },
                        {
                            title: 'Market Organization',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_3_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_3_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[3][0].value === 1
                        }
                    ],
                    [
                        {
                            title: '',
                            skin: '',
                            icon: '',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_0_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_0_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[0][0].value === 1
                        },
                        {
                            title: '',
                            skin: '',
                            icon: '',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_2_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_2_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[2][0].value === 1
                        },
                        {
                            title: '',
                            skin: '',
                            icon: '',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_4_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_4_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[4][0].value === 1
                        },
                        {
                            title: '',
                            skin: '',
                            icon: '',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_5_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_5_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[5][0].value === 1
                        },
                        {
                            title: '',
                            skin: '',
                            icon: '',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_1_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_1_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[1][0].value === 1
                        },
                        {
                            title: '',
                            skin: '',
                            icon: '',
                            cellVisible: v('analogicDemoReviewContractsCenterFilterPopUpTable_3_0.switch') ? v('analogicDemoReviewContractsCenterFilterPopUpTable_3_0.switch.value') === 1 : v('analogicDemoReviewContractsCenterFilterPopUpTable.cellData')[3][0].value === 1
                        }
                    ]
                ];
                return result;
            }

        },
        refresh_col_0: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoReviewContracts.updateanalogicDemoReviewContractsGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_1: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoReviewContracts.updateanalogicDemoReviewContractsGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_2: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoReviewContracts.updateanalogicDemoReviewContractsGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_3: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoReviewContracts.updateanalogicDemoReviewContractsGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_4: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoReviewContracts.updateanalogicDemoReviewContractsGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        },
        refresh_col_5: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoReviewContracts.updateanalogicDemoReviewContractsGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
    },
    analogicDemoReviewContractsFilterPopUpDropdown: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('analogicDemoReviewContractsFilterGridTable');
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let selectedTitle = Utils.getGridTableCurrentCell('analogicDemoReviewContractsFilterGridTable').title,
                    result = [], selectedItem = [];
                for (let i = 1; i < 6; i++) {
                    selectedItem.push({name: selectedTitle + ' ' + i})
                }
                result = {
                    items: selectedItem
                };
                return result
            }
        }
    },
    analogicDemoReviewContractsFilterGridTableRowCell3Text: {
        perform: {
            execute: (db) => {
                if (v('analogicDemoReviewContractsFilterGridTable.row') == 1) {
                    Widgets['analogicDemoReviewContractsFilterPopUpDropdown']['value'] = '';
                }
            }
        }
    },
    analogicDemoReviewContractsFilterGridTableRowCell4Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoReviewContractsFilterGridTableRowCell3Text.perform.execute(db);
            }
        }
    },
    analogicDemoReviewContractsFilterGridTableRowCell5Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoReviewContractsFilterGridTableRowCell3Text.perform.execute(db);
            }
        }
    },
    analogicDemoReviewContractsFilterGridTableRowCell6Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoReviewContractsFilterGridTableRowCell3Text.perform.execute(db);
            }
        }
    },
    analogicDemoReviewContractsFilterGridTableRowCell7Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoReviewContractsFilterGridTableRowCell3Text.perform.execute(db);
            }
        }
    }, analogicDemoReviewContractsFilterGridTableRowCell8Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoReviewContractsFilterGridTableRowCell3Text.perform.execute(db);
            }
        }
    },

    analogicDemoReviewContractsCenterFilterPopUpTable: {
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            titleOn: 'Plan Cycle',
                            titleOff: 'Plan Cycle',
                            value: 1
                        }
                    ],
                    [
                        {
                            titleOn: 'Plan Version',
                            titleOff: 'Plan Version',
                            value: 0
                        }
                    ],
                    [
                        {
                            titleOn: 'Currency',
                            titleOff: 'Currency',
                            value: 1
                        }
                    ],
                    [
                        {
                            titleOn: 'Market Organization',
                            titleOff: 'Market Organization',
                            value: 0
                        }
                    ],
                    [
                        {
                            titleOn: 'Line of Business',
                            titleOff: 'Line of Business',
                            value: 1
                        }
                    ],
                    [
                        {
                            titleOn: 'Country of Origin',
                            titleOff: 'Country of Origin',
                            value: 1
                        }
                    ]
                ]
                return result;
            }
        }
    },
    analogicDemoReviewContractsFilterGridTable1: {
        init: {
            execute: (db) => {
                return [
                    [
                        {
                            title: 'User',
                            icon: 'icon-filter-circle',
                            iconColor: '#747678',
                            skin: 'filter_button'
                        }
                    ],
                    [
                        {
                            title: 'Admin',
                            icon: '',
                            skin: 'filter_text',
                            iconColor: '#A9A9A9',
                            iconPosition: 'right'
                        },
                    ]
                ]
            }
        }
    },

    // Allocation
    analogicDemoAllocationFilterTable: {
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            title: 'Multi-level-selection Filter'
                        },
                        {
                            title: '101020, 1254853, 1244693',
                            icon: 'icon-columns1',
                            iconColor: '#009FDA',
                            openPage: true
                        }
                    ],
                    [
                        {
                            title: 'Multi-level-selection Filter'
                        },
                        {
                            title: '',
                            icon: 'icon-columns1',
                            iconColor: '#009FDA',
                            openPage: true
                        }
                    ],
                    [
                        {
                            title: 'Multi-level-selection Filter'
                        },
                        {
                            title: '',
                            icon: 'icon-columns1',
                            iconColor: '#009FDA',
                            openPage: true
                        }
                    ],
                    [
                        {
                            title: 'Single-selection Filter'
                        },
                        {
                            title: v('systemValueDefaultDropboxValue') === '101234' ? v('analogicDemoAllocationFilterPopUpDropbox.value') : '101234',
                            icon: 'icon-sort-down',
                            iconColor: '#000000',
                            hasPopup: true,
                            skin: 'allocation_gt_2'
                        }
                    ],
                    [
                        {
                            title: 'Single-selection Filter'
                        },
                        {
                            title: v('systemValueDefaultDropboxValue') === '242687' ? v('analogicDemoAllocationFilterPopUpDropbox.value') : '242687',
                            icon: 'icon-sort-down',
                            iconColor: '#000000',
                            skin: 'allocation_gt_2',
                            hasPopup: true
                        }
                    ],
                    [
                        {
                            title: 'Multi-level-selection Filter'
                        },
                        {
                            title: '',
                            icon: 'icon-columns1',
                            iconColor: '#009FDA',
                            openPage: true
                        }
                    ],
                    [
                        {
                            title: 'Multi-level-selection Filter'
                        },
                        {
                            title: '',
                            icon: 'icon-columns1',
                            iconColor: '#009FDA',
                            openPage: true
                        }
                    ],
                ]
                return result;
            }
        },
        text_click: {
            execute: (db) => {
                if (v('analogicDemoAllocationFilterTable').row == 3) {
                    Utils.setWidgetValue('systemValueDefaultDropboxValue', '101234');
                } else if (v('analogicDemoAllocationFilterTable').row == 4) {
                    Utils.setWidgetValue('systemValueDefaultDropboxValue', '242687');
                }
            }
        }
    },
    analogicDemoAllocationFilterPopUpDropbox: {
        init: {
            execute: (db) => {
                let result = {
                    items: [
                        {name: v('systemValueDefaultDropboxValue'), on: false},
                        {name: 'Filter 2', on: false},
                        {name: 'Filter 3', on: false},
                        {name: 'Filter 4', on: false},
                        {name: 'Filter 5', on: false},
                        {name: 'Filter 6', on: false}
                    ]
                };
                return result;
            }
        },
        choose: {
            execute: (db) => {
                Api.forceRefreshWidgets(['analogicDemoAllocationFilterTable', 'analogicDemoAllocationRow3Cell1Text']);
            }
        }
    },
    analogicDemoAllocationRow3Cell1Text: {
        init: {
            execute: (db) => {
                return {
                    label: v('systemValueDefaultDropboxValue') === 'Admin' ? v('analogicDemoAllocationFilterPopUpDropbox.value') : 'Admin'
                }
            }
        },
        launch: {
            execute: (db) => {
                Utils.setWidgetValue('systemValueDefaultDropboxValue', 'Admin');
            }
        }
    },

    //Allocation Hierarchy
    analogicDemoAllocationHierarchy: {
        getHeight: () => {
            //todo
            return window.innerHeight - 221;
        }
    },
    analogicDemoAllocationHierarchyPanel: {
        init: {
            execute: (db) => {
                return {//todo
                    height: Repository.analogicDemoAllocationHierarchy.getHeight()
                };
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level1GridTable: {
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 6; ++i) {
                    let row = [];
                    row.push({
                        titleOn: 'Selection Level 1',
                        titleOff: 'Selection Level 1'
                    });
                    row.push({
                        icon: 'icon-arrow-right'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level1GridTableHeader: {
        init: {
            execute: (db) => {
                return {icon: v('analogicDemoAllocationHierarchyGrid2Level1GridTable.switch.value') === 1 ? 'icon-check-intermediate' : 'icon-check-off'};
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level2GridTable: {
        initCondition: (db) => {
            return Utils.getGridTableCurrentCell('analogicDemoAllocationHierarchyGrid2Level1GridTable').titleOn === 'Selection Level 1';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 8; ++i) {
                    let row = [];
                    row.push({
                        titleOn: 'Selection Level 2',
                        titleOff: 'Selection Level 2'
                    });
                    row.push({
                        icon: 'icon-arrow-right'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level2GridTableHeader: {
        init: {
            execute: (db) => {
                return {icon: v('analogicDemoAllocationHierarchyGrid2Level2GridTable.switch.value') === 1 ? 'icon-check-intermediate' : 'icon-check-off'};
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level3GridTable: {
        initCondition: (db) => {
            return Utils.getGridTableCurrentCell('analogicDemoAllocationHierarchyGrid2Level2GridTable').titleOn === 'Selection Level 2';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 5; ++i) {
                    let row = [];
                    row.push({
                        titleOn: 'Selection Level 3',
                        titleOff: 'Selection Level 3'
                    });
                    row.push({
                        icon: 'icon-arrow-right'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level3GridTableHeader: {
        init: {
            execute: (db) => {
                return {icon: v('analogicDemoAllocationHierarchyGrid2Level3GridTable.switch.value') === 1 ? 'icon-check-intermediate' : 'icon-check-off'};
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level4GridTable: {
        initCondition: (db) => {
            return Utils.getGridTableCurrentCell('analogicDemoAllocationHierarchyGrid2Level3GridTable').titleOn === 'Selection Level 3';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 3; ++i) {
                    let row = [];
                    row.push({
                        titleOn: 'Selection Level 4',
                        titleOff: 'Selection Level 4'
                    });
                    row.push({
                        icon: 'icon-arrow-right'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level4GridTableHeader: {
        init: {
            execute: (db) => {
                return {icon: v('analogicDemoAllocationHierarchyGrid2Level4GridTable.switch.value') === 1 ? 'icon-check-intermediate' : 'icon-check-off'};
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level5GridTable: {
        initCondition: (db) => {
            return Utils.getGridTableCurrentCell('analogicDemoAllocationHierarchyGrid2Level4GridTable').titleOn === 'Selection Level 4';
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 10; ++i) {
                    let row = [];
                    row.push({
                        titleOn: 'Selection Level 5',
                        titleOff: 'Selection Level 5'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoAllocationHierarchyGrid2Level5GridTableHeader: {
        init: {
            execute: (db) => {
                return {icon: v('analogicDemoAllocationHierarchyGrid2Level5GridTable.switch.value') === 1 ? 'icon-check-on' : 'icon-check-off'};
            }
        }
    },

    // Plan Report
    analogicDemoPlanReport: {
        updateanalogicDemoPlanReportGridTableCell: (gridTableId, actualRow, actualColumn) => {
            let gridTableData = v(gridTableId), cellOriginalValue = gridTableData.cellData[actualRow][actualColumn];
            if (actualColumn != gridTableData.column) {
                return cellOriginalValue;
            }
            let dropDownValue = v('analogicDemoPlanReportFilterPopUpDropdown.value') ? v('analogicDemoPlanReportFilterPopUpDropdown.value') : '';
            if (actualRow == 1) {
                cellOriginalValue['title'] = dropDownValue;

            }
            if (dropDownValue === "") {
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button_circle' : 'filter_text_disabled';
            } else {
                cellOriginalValue['skin'] = actualRow == 0 ? 'filter_button' : 'filter_text';
            }
            return cellOriginalValue;
        }
    }
    ,
    analogicDemoPlanReportFilterGridTable: {
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            title: 'Financial Year',
                            icon: 'icon-filter-circle',
                            iconColor: '#009FDA',
                            skin: 'filter_button_circle',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_0_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_0_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[0][0].value === 1
                        },
                        {
                            title: 'Market Segment',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_4_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_4_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[4][0].value === 1
                        },
                        {
                            title: 'Legal Entity',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_5_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_5_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[5][0].value === 1
                        },
                        {
                            title: 'Client',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_2_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_2_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[2][0].value === 1
                        },
                        {
                            title: 'Business Partner',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_1_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_1_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[1][0].value === 1
                        },
                        {
                            title: 'Product Organization',
                            icon: 'icon-filter-circle',
                            skin: 'filter_button_circle',
                            iconColor: '#009FDA',
                            iconCustomEventName: 'text_click',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_3_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_3_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[3][0].value === 1
                        }
                    ],
                    [
                        {
                            title: '',
                            skin: 'filter_text_disabled',
                            icon: '',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_0_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_0_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[0][0].value === 1
                        },
                        {
                            title: '',
                            skin: 'filter_text_disabled',
                            icon: '',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_4_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_4_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[4][0].value === 1
                        },
                        {
                            title: '',
                            skin: 'filter_text_disabled',
                            icon: '',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_5_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_5_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[5][0].value === 1
                        },
                        {
                            title: '',
                            skin: 'filter_text_disabled',
                            icon: '',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_2_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_2_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[2][0].value === 1
                        },
                        {
                            title: '',
                            skin: 'filter_text_disabled',
                            icon: '',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_1_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_1_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[1][0].value === 1
                        },
                        {
                            title: '',
                            skin: 'filter_text_disabled',
                            icon: '',
                            cellVisible: v('analogicDemoPlanReportCenterFilterPopUpTable_3_0.switch') ? v('analogicDemoPlanReportCenterFilterPopUpTable_3_0.switch.value') === 1 : v('analogicDemoPlanReportCenterFilterPopUpTable.cellData')[3][0].value === 1
                        }
                    ]
                ];
                return result;
            }

        }
        ,
        refresh_col_0: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoPlanReport.updateanalogicDemoPlanReportGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
        ,
        refresh_col_1: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoPlanReport.updateanalogicDemoPlanReportGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
        ,
        refresh_col_2: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoPlanReport.updateanalogicDemoPlanReportGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
        ,
        refresh_col_3: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoPlanReport.updateanalogicDemoPlanReportGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
        ,
        refresh_col_4: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoPlanReport.updateanalogicDemoPlanReportGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
        ,
        refresh_col_5: {
            execute: (db, widgetId, extraParams) => {
                return Repository.analogicDemoPlanReport.updateanalogicDemoPlanReportGridTableCell(widgetId, extraParams.row, extraParams.col);
            }
        }
    }
    ,

    analogicDemoPlanReportFilterPopUpDropdown: {
        initCondition: (db) => {
            return Utils.isGridTableLoaded('analogicDemoPlanReportFilterGridTable');
        },
        initDefault: (db) => {
            return [];
        },
        init: {
            execute: (db) => {
                let selectedTitle = Utils.getGridTableCurrentCell('analogicDemoPlanReportFilterGridTable').title,
                    result = [], selectedItem = [];
                for (let i = 1; i < 6; i++) {
                    selectedItem.push({name: selectedTitle + ' ' + i})
                }
                result = {
                    items: selectedItem
                };
                return result
            }
        }
    },
    analogicDemoPlanReportFilterGridTableRowCell1Text: {
        perform: {
            execute: (db) => {
                if (v('analogicDemoPlanReportFilterGridTable.row') == 1) {
                    Widgets['analogicDemoPlanReportFilterPopUpDropdown']['value'] = '';
                }
            }
        }
    },
    analogicDemoPlanReportFilterGridTableRowCell2Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoPlanReportFilterGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    analogicDemoPlanReportFilterGridTableRowCell3Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoPlanReportFilterGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    analogicDemoPlanReportFilterGridTableRowCell4Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoPlanReportFilterGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    analogicDemoPlanReportFilterGridTableRowCell5Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoPlanReportFilterGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    analogicDemoPlanReportFilterGridTableRowCell6Text: {
        perform: {
            execute: (db) => {
                Repository.analogicDemoPlanReportFilterGridTableRowCell1Text.perform.execute(db);
            }
        }
    },
    analogicDemoPlanReportCenterFilterPopUpTable: {
        init: {
            execute: (db) => {
                let result = [
                    [
                        {
                            titleOn: 'Financial Year',
                            titleOff: 'Financial Year',
                            value: 1
                        }
                    ],
                    [
                        {
                            titleOn: 'Business Partner',
                            titleOff: 'Business Partner',
                            value: 0
                        }
                    ],
                    [
                        {
                            titleOn: 'Client',
                            titleOff: 'Client',
                            value: 1
                        }
                    ],
                    [
                        {
                            titleOn: 'Product Organization',
                            titleOff: 'Product Organization',
                            value: 0
                        }
                    ],
                    [
                        {
                            titleOn: 'Market Segment',
                            titleOff: 'Market Segment',
                            value: 1
                        }
                    ],
                    [
                        {
                            titleOn: 'Legal Entity',
                            titleOff: 'Legal Entity',
                            value: 1
                        }
                    ]
                ]
                return result;
            }
        }
    },

    analogicDemoPlanReportForecastTable: {
        init: {
            execute: (db) => {
                let result = [],
                    searchString = v('analogicDemoPlanReportRow2Cell1SearchBox').value ? v('analogicDemoPlanReportRow2Cell1SearchBox').value : '';
                for (let i = 0; i < 9; ++i) {
                    let row = [];
                    row.push({
                        title: i % 3 === 0 ? 'TOTAL' : 'Line',
                        cellSkin: i % 3 === 0 ? 'gray_bg' : 'grey_borders'
                    });
                    row.push({
                        title: Math.floor(Math.random() * 1000000),
                        cellSkin: i % 3 === 0 ? 'dark_blue_bg' : 'blue_bg'
                    });
                    row.push({
                        title: '+' + (Math.random() * 10).toFixed(2) + '%',
                        cellSkin: i % 3 === 0 ? 'gray_bg' : 'grey_borders'
                    });
                    row.push({
                        title: '+' + Math.floor(Math.random() * 1000000),
                        cellSkin: i % 3 === 0 ? 'gray_bg' : 'grey_borders'
                    });
                    row.push({
                        title: Math.floor(Math.random() * 1000000),
                        cellSkin: i % 3 === 0 ? 'dark_blue_bg' : 'blue_bg'
                    });
                    row.push({
                        title: '+' + (Math.random() * 10).toFixed(2) + '%',
                        cellSkin: i % 3 === 0 ? 'gray_bg' : 'grey_borders'
                    });
                    row.push({
                        title: '+' + Math.floor(Math.random() * 1000000),
                        cellSkin: i % 3 === 0 ? 'gray_bg' : 'grey_borders'
                    });
                    row.push({
                        title: Math.floor(Math.random() * 1000000),
                        cellSkin: i % 3 === 0 ? 'dark_blue_bg' : 'blue_bg'
                    });
                    row.push({title: '', cellSkin: i % 3 === 0 ? 'gray_bg' : 'grey_borders'});
                    result.push(row)
                }
                return result.filter(row => ((row[0].title).toLowerCase()).includes(searchString.toLowerCase()));
            }
        }
    },

    // KPI Financial Plan vs. Target
    analogicDemoKPIPlanTarget: {
        setTextSkin: (value) => {
            let skin = '';
            if (value >= 700) {
                skin = 'green_bg_number';
            } else if (value > 693 && value < 700) {
                skin = 'orange_bg_number';
            } else {
                skin = 'pink_bg_number';
            }
            return skin;
        }
    },
    analogicDemoKPIPlanTargetRow2Cell1DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: '2021', on: true},
                        {name: '2022', on: false},
                        {name: '2023', on: false},
                        {name: '2024', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoKPIPlanTargetRow2Cell2DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'Live Version', on: true},
                        {name: 'Budget', on: false},
                        {name: 'Revision', on: false},
                        {name: 'Forecast', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoKPIPlanTargetTable: {
        init: {
            execute: (db) => {
                let result = [], value, row,
                    titles = ['', 'Net Income', 'RoE above Risk free', 'bp**', 'RoE absolute', '%', 'ENW Growth', '%', 'Net Operating Margin', '%', 'EVM Profit', '%', 'Dividend (accrued)'];
                for (let i = 0; i < 13; ++i) {
                    row = [];
                    row.push({
                        title: i === 0 ? '' : i === 1 ? 'Net Income' : i % 2 === 0 ? 'Line item ' + (i / 2) + '' : 'USD',
                        skin: i % 2 === 0 && i !== 1 && i !== 12 ? 'black_text' : i === 1 || i === 12 ? 'black_text_with_body' : 'gray_text',
                        body: i === 1 || i === 12 ? 'USD' : '',
                        cellSkin: i % 2 === 0 && i !== 0 && i !== 12 ? 'dashed_right' : i === 0 ? 'only_bottom' : 'bottom_dashed_right'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2022' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2023' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '700' : i === 12 ? '0.0' : value,
                        icon: i % 2 === 0 && i !== 12 && i !== 0 ? 'icon-target' : '',
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2024' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right_dash' : i === 1 ? 'all_borders_dash' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom_dash' : 'without_three_dash'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2022' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2023' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '700' : i === 12 ? '0.0' : value,
                        icon: i % 2 === 0 && i !== 12 && i !== 0 ? 'icon-target' : '',
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2024' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right_dash' : i === 1 ? 'all_borders_dash' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom_dash' : 'without_three_dash'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2022' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2023' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '700' : i === 12 ? '0.0' : value,
                        icon: i % 2 === 0 && i !== 12 && i !== 0 ? 'icon-target' : '',
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2024' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right_dash' : i === 1 ? 'all_borders_dash' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom_dash' : 'without_three_dash'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2022' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2023' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '700' : i === 12 ? '0.0' : value,
                        icon: i % 2 === 0 && i !== 12 && i !== 0 ? 'icon-target' : '',
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2024' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right_dash' : i === 1 ? 'all_borders_dash' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom_dash' : 'without_three_dash'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2022' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2023' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '700' : i === 12 ? '0.0' : value,
                        icon: i % 2 === 0 && i !== 12 && i !== 0 ? 'icon-target' : '',
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    value = Math.floor(Math.random() * (750 - 650) + 650);
                    row.push({
                        title: i === 0 ? '2024' : i === 1 ? (Math.random() * (25 - 20) + 20).toFixed(1) : i % 2 === 0 && i !== 12 ? '' : i === 12 ? '0.0' : value,
                        skin: i === 1 || i === 12 ? 'gray_bg_number' : i % 2 !== 0 && i !== 1 && i !== 0 ? Repository.analogicDemoKPIPlanTarget.setTextSkin(value) : 'target',
                        cellSkin: i % 2 !== 0 && i !== 1 && i !== 0 ? 'top_and_right' : i === 1 ? 'all_borders' : i === 0 ? 'all_borders_head' : i === 12 ? 'all_borders_bottom' : 'without_three'
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    // Release and Validation Status Report
    analogicDemoReleaseAndValidationRow2Cell1DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: '2021', on: true},
                        {name: '2022', on: false},
                        {name: '2023', on: false},
                        {name: '2024', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoReleaseAndValidationRow2Cell2DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'Segment 1', on: true},
                        {name: 'Segment 2', on: false},
                        {name: 'Segment 3', on: false},
                        {name: 'Segment 4', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoReleaseAndValidationRow2Cell3DropBox: {
        init: {
            execute: (db) => {
                return {
                    items: [
                        {name: 'Financial Statement', on: true},
                        {name: 'Package 1', on: false},
                        {name: 'Package 2', on: false},
                        {name: 'Package 3', on: false}
                    ]
                }
            }
        }
    },
    analogicDemoReleaseAndValidationTable1: {
        init: {
            execute: (db) => {
                let result = [];
                for (let i = 0; i < 5; ++i) {
                    let row = [];
                    row.push({
                        title: 'Rule ' + (i + 1)
                    });
                    row.push({
                        icon: 'icon-check-on'
                    });
                    row.push({
                        icon: i === 2 ? '' : 'icon-check-on',
                        title: i === 2 ? '39' : '',
                        skin: i === 2 ? 'table_text_val' : ''
                    });
                    row.push({
                        icon: 'icon-check-on'
                    });
                    row.push({
                        icon: i === 1 ? '' : 'icon-check-on',
                        title: i === 1 ? '2' : '',
                        skin: i === 1 ? 'table_text_val' : ''
                    });
                    result.push(row)
                }
                return result;
            }
        }
    },
    analogicDemoReleaseAndValidationTable2: {
        reference: 'analogicDemoReleaseAndValidationTable1'
    },
    analogicDemoReleaseAndValidationTable3: {
        reference: 'analogicDemoReleaseAndValidationTable1'
    },
    /* analogicDemoPlanReportChartPopupRow1Chart: {
         init: {
             execute: (db) => {
                 return {
                     maxYAxis: String((Math.round((Math.max(20, 42, 58)) * 1.01))),
                     minYAxis: String((Math.round((Math.min(11, 15, 21)) * 0.99))),
                 }
             }
         }
     }*/
}
;
