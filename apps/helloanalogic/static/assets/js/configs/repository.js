/* global app, Utils, Api, v, RestRequest */

'use strict';

const GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY = '__gridTableLightServerTable2';
const GRID_TABLE_LIGHT_SERVER_TABLE2_DEFAULT_ROW_COUNT = 20;
const GRID_TABLE_LIGHT_SERVER_TABLE2_COLUMN_COUNT = 18;

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
                body: recordLabel ? `${recordLabel} - ${rowLabel}` : `Details requested for ${rowLabel}`
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
    // gridTableLightServerTable: {
    //     init() {
    //         return new RestRequest(this.request);
    //     },
    //     request: {
    //         url: () => '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Editable))',
    //         type: 'POST',
    //         server: true,
    //         body: () => ({
    //             key: 'safariAssetRegister2_mdx'
    //         }),
    //         parsingControl: {
    //             type: 'script',
    //             script: (data) => {
    //                 const transformed = Utils.transformMdxResponseToGridTableLight(data);
    //
    //                 if (0 === transformed.columns.length && 0 === transformed.content.length) {
    //                     console.error('gridTableLightServerTable: the MDX response could not be transformed into table data.');
    //                     return transformed;
    //                 }
    //
    //                 return Object.assign({
    //                     freezeHeader: true,
    //                     allowCopyToClipBoard: true,
    //                     enableExport: true,
    //                     exportConfig: {fileName: 'safari-asset-register.xlsx'}
    //                 }, transformed);
    //             }
    //         }
    //     }
    // },
    //
    // gridTableLightServerTable2: {
    //     init(ctx) {
    //         return new RestRequest(this.request);
    //     },
    //     request: {
    //         url: (widgets, ctx) => {
    //             const baseUrl = '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Editable))';
    //             const result = Utils.buildMdxQueryUrl(baseUrl, {
    //                 includeCount: true,
    //                 columnCount: GRID_TABLE_LIGHT_SERVER_TABLE2_COLUMN_COUNT,
    //                 defaultRowCount: GRID_TABLE_LIGHT_SERVER_TABLE2_DEFAULT_ROW_COUNT,
    //                 metadataKey: GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY,
    //                 returnMetadata: true
    //             }, ctx);
    //
    //             return result && result.url ? result.url : baseUrl;
    //         },
    //         type: 'POST',
    //         server: true,
    //         body: () => ({key: 'safariAssetRegister2_mdx'}),
    //         parsingControl: {
    //             type: 'script',
    //             script: (data, widgetId, repoObj, ctx) => {
    //                 const transformed = Utils.transformMdxResponseToGridTableLight(data);
    //                 if (0 === transformed.columns.length && 0 === transformed.content.length) {
    //                     console.error('gridTableLightServerTable2: the MDX response could not be transformed into table data.');
    //                     return transformed;
    //                 }
    //
    //                 const metadata = ctx && ctx[GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY] ? ctx[GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY] : {};
    //                 const exportAll = !!(metadata && metadata.exportAll);
    //                 const pageSize = Number.isFinite(metadata && metadata.rowCount) && metadata.rowCount > 0
    //                     ? metadata.rowCount
    //                     : GRID_TABLE_LIGHT_SERVER_TABLE2_DEFAULT_ROW_COUNT;
    //                 const safeSkipRows = Number.isFinite(metadata && metadata.skipRows) && metadata.skipRows >= 0
    //                     ? metadata.skipRows
    //                     : 0;
    //                 const columnCount = Number.isFinite(metadata && metadata.columnCount) && metadata.columnCount > 0
    //                     ? metadata.columnCount
    //                     : GRID_TABLE_LIGHT_SERVER_TABLE2_COLUMN_COUNT;
    //                 const page = Number.isFinite(metadata && metadata.page) && metadata.page > 0
    //                     ? metadata.page
    //                     : (exportAll ? 1 : (pageSize > 0 ? Math.floor(safeSkipRows / pageSize) + 1 : 1));
    //                 const countValue = data ? data['Cells@odata.count'] : undefined;
    //                 const parsedCountValue = typeof countValue === 'number' ? countValue : Number.parseInt(countValue, 10);
    //                 let totalCount;
    //                 if (Number.isFinite(parsedCountValue)) {
    //                     totalCount = Math.ceil(parsedCountValue / columnCount);
    //                 } else {
    //                     const contentRows = Array.isArray(transformed.content) ? transformed.content.length : 0;
    //                     totalCount = contentRows + (exportAll ? 0 : safeSkipRows);
    //                 }
    //                 totalCount = Math.max(0, totalCount);
    //
    //                 return {
    //                     columns: transformed.columns,
    //                     content: transformed.content,
    //                     pageSize: pageSize,
    //                     page: page,
    //                     totalCount: totalCount,
    //                     freezeHeader: true,
    //                     allowCopyToClipBoard: true,
    //                     enableExport: true,
    //                     exportConfig: {fileName: 'safari-asset-register-paged.xlsx'}
    //                 };
    //             }
    //         }
    //     }
    // },

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


    analogicTableDemoTable: {
        init() {
            return this.buildResponse();
        },
        buildResponse() {
            const statuses = ['Proposed', 'In Progress', 'At Risk', 'Completed'];
            const healthStates = ['On Track', 'Needs Attention', 'Critical'];
            const statusStyles = {
                'Proposed': {bg: '#E0F2FE', color: '#0369A1'},
                'In Progress': {bg: '#DBF4FF', color: '#0F6DCA'},
                'At Risk': {bg: '#FEF3C7', color: '#B45309'},
                'Completed': {bg: '#DCFCE7', color: '#047857'},
                default: {bg: '#E2E8F0', color: '#475569'}
            };
            const healthStyles = {
                'On Track': {bg: '#DCFCE7', color: '#166534'},
                'Needs Attention': {bg: '#FEF3C7', color: '#B45309'},
                'Critical': {bg: '#FEE2E2', color: '#B91C1C'},
                default: {bg: '#E2E8F0', color: '#475569'}
            };
            const formatStatus = (value) => {
                const style = statusStyles[value] || statusStyles.default;
                return `<span style="display:inline-flex;align-items:center;padding:4px 12px;border-radius:999px;font-weight:600;background:${style.bg};color:${style.color};">${value}</span>`;
            };
            const formatHealth = (value) => {
                const style = healthStyles[value] || healthStyles.default;
                return `<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-weight:600;background:${style.bg};color:${style.color};">${value}</span>`;
            };
            const syncAttributes = (cell) => {
                if (!cell || typeof cell.getElement !== 'function') {
                    return null;
                }
                const element = cell.getElement();
                const row = typeof cell.getRow === 'function' ? cell.getRow() : null;
                const field = cell.getField();
                const rowData = row && typeof row.getData === 'function' ? row.getData() : {};
                const meta = rowData.__analogicCells ? rowData.__analogicCells[field] : null;
                if (element && meta) {
                    element.setAttribute('data-widget-id', meta.widgetId);
                    element.setAttribute('data-row', meta.rowIndex);
                    element.setAttribute('data-col', meta.columnIndex);
                }
                return meta;
            };
            const projects = [
                {
                    name: 'Enterprise Planning Revamp',
                    code: 'EN-1021',
                    owner: 'Alice Carter',
                    department: 'Corporate Strategy',
                    status: 'In Progress',
                    progress: 68,
                    budget: 1250000,
                    start: '2024-01-15',
                    end: '2024-07-31',
                    health: 'On Track'
                },
                {
                    name: 'Global Pricing Refresh',
                    code: 'GP-2044',
                    owner: 'Rajesh Patel',
                    department: 'Commercial Excellence',
                    status: 'Proposed',
                    progress: 25,
                    budget: 820000,
                    start: '2024-03-01',
                    end: '2024-09-15',
                    health: 'Needs Attention'
                },
                {
                    name: 'Inventory Visibility 360',
                    code: 'SC-1180',
                    owner: 'Maria Gomez',
                    department: 'Supply Chain',
                    status: 'At Risk',
                    progress: 42,
                    budget: 990000,
                    start: '2023-11-10',
                    end: '2024-06-21',
                    health: 'Needs Attention'
                },
                {
                    name: 'Sales Enablement 2.0',
                    code: 'SE-0875',
                    owner: 'Tomoko Ishikawa',
                    department: 'Commercial Excellence',
                    status: 'In Progress',
                    progress: 81,
                    budget: 760000,
                    start: '2024-02-05',
                    end: '2024-08-30',
                    health: 'On Track'
                },
                {
                    name: 'Data Lake Hardening',
                    code: 'IT-3320',
                    owner: 'Lukas Steiner',
                    department: 'Technology Services',
                    status: 'Completed',
                    progress: 100,
                    budget: 640000,
                    start: '2023-05-02',
                    end: '2024-01-19',
                    health: 'On Track'
                },
                {
                    name: 'Customer Portal UX Sprint',
                    code: 'CX-4512',
                    owner: 'Sofia Eriksen',
                    department: 'Digital Experience',
                    status: 'At Risk',
                    progress: 58,
                    budget: 540000,
                    start: '2024-01-22',
                    end: '2024-05-14',
                    health: 'Critical'
                }
            ];
            const actionButtons = (code) => `<div style="display:flex;gap:6px;justify-content:center;">
    <button class="grid-table-plus-demo__action-button" data-action="details" data-project="${code}" style="padding:6px 12px;border-radius:6px;border:1px solid #CBD5E1;background:#FFFFFF;color:#1E293B;font-weight:600;cursor:pointer;">Details</button>
    <button class="grid-table-plus-demo__action-button grid-table-plus-demo__action-button--primary" data-action="focus" data-project="${code}" style="padding:6px 12px;border-radius:6px;border:none;background:#2563EB;color:#FFFFFF;font-weight:600;cursor:pointer;">Focus</button>
</div>`;
            const columns = [
                {
                    title: 'Project',
                    field: 'project',
                    width: 250,
                    headerFilter: 'input',
                    headerSortTristate: true,
                    frozen: true,
                    tooltip(e, cell) {
                        const meta = syncAttributes(cell);
                        const row = typeof cell.getRow === 'function' ? cell.getRow() : null;
                        const rowData = row && typeof row.getData === 'function' ? row.getData() : {};
                        const ownerMeta = rowData.__analogicCells ? rowData.__analogicCells.owner : null;
                        const owner = ownerMeta ? ownerMeta.value : '';
                        let value;
                        if (meta && typeof meta.displayValue !== 'undefined') {
                            value = meta.displayValue;
                        } else if (typeof cell.getValue === 'function') {
                            value = cell.getValue();
                        } else {
                            const field = typeof cell.getField === 'function' ? cell.getField() : null;
                            if (field && Object.prototype.hasOwnProperty.call(rowData, field)) {
                                value = rowData[field];
                            } else if (meta && typeof meta.value !== 'undefined') {
                                value = meta.value;
                            }
                        }
                        return `${typeof value !== 'undefined' ? value : ''} • ${owner}`;
                    }
                },
                {
                    title: 'Owner',
                    field: 'owner',
                    width: 170,
                    headerFilter: 'input'
                },
                {
                    title: 'Department',
                    field: 'department',
                    width: 190,
                    headerFilter: 'select',
                    headerFilterParams: {values: true}
                },
                {
                    title: 'Status',
                    field: 'status',
                    width: 140,
                    headerFilter: 'select',
                    headerFilterParams: {values: statuses},
                    editor: 'select',
                    editorParams: {values: statuses},
                    formatter(cell) {
                        const meta = syncAttributes(cell);
                        const raw = cell.getValue();
                        const value = typeof raw !== 'undefined' ? raw : (meta && typeof meta.value !== 'undefined' ? meta.value : '');
                        return formatStatus(value);
                    }
                },
                {
                    title: 'Progress',
                    field: 'progress',
                    width: 160,
                    hozAlign: 'center',
                    editor: 'number',
                    editorParams: {min: 0, max: 100, step: 1},
                    formatter(cell) {
                        const meta = syncAttributes(cell);
                        const rawValue = cell.getValue();
                        let value = Number(rawValue);
                        if (Number.isNaN(value)) {
                            const fallback = meta && typeof meta.value !== 'undefined' ? Number(meta.value) : 0;
                            value = Number.isNaN(fallback) ? 0 : fallback;
                        }
                        value = Math.max(0, Math.min(100, Math.round(value)));
                        const accent = value >= 80 ? '#16A34A' : value >= 50 ? '#2563EB' : '#F97316';
                        return `<div style="display:flex;align-items:center;gap:8px;width:100%;">
    <div style="flex:1;height:8px;border-radius:999px;background:#E2E8F0;overflow:hidden;">
        <div style="height:100%;width:${value}%;background:${accent};border-radius:999px;"></div>
    </div>
    <span style="min-width:42px;text-align:right;font-weight:600;color:#1F2937;">${value}%</span>
</div>`;
                    }
                },
                {
                    title: 'Budget',
                    field: 'budget',
                    width: 140,
                    hozAlign: 'right',
                    headerFilter: 'input',
                    formatter(cell) {
                        const meta = syncAttributes(cell);
                        const rawValue = cell.getValue();
                        let value = Number(rawValue);
                        if (Number.isNaN(value) && meta && typeof meta.value === 'number') {
                            value = meta.value;
                        }
                        if (Number.isNaN(value)) {
                            return cell.getValue();
                        }
                        const formatted = value >= 1000000 ? `€${(value / 1000000).toFixed(2)}M` : `€${value.toLocaleString('en-US')}`;
                        return `<span style="font-variant-numeric:tabular-nums;font-weight:600;color:#1F2937;">${formatted}</span>`;
                    },
                    topCalc(values) {
                        const total = (values || []).reduce((sum, current) => {
                            if (typeof current === 'number') {
                                return sum + current;
                            }
                            const parsed = parseFloat(current);
                            return sum + (Number.isNaN(parsed) ? 0 : parsed);
                        }, 0);
                        return `€${total.toLocaleString('en-US')}`;
                    }
                },
                {
                    title: 'Start',
                    field: 'start',
                    width: 120,
                    headerFilter: 'input',
                    hozAlign: 'center'
                },
                {
                    title: 'End',
                    field: 'end',
                    width: 120,
                    headerFilter: 'input',
                    hozAlign: 'center'
                },
                {
                    title: 'Health',
                    field: 'health',
                    width: 150,
                    hozAlign: 'center',
                    headerFilter: 'select',
                    headerFilterParams: {values: healthStates},
                    formatter(cell) {
                        const meta = syncAttributes(cell);
                        const raw = cell.getValue();
                        const value = typeof raw !== 'undefined' ? raw : (meta && typeof meta.value !== 'undefined' ? meta.value : '');
                        return formatHealth(value);
                    }
                },
                {
                    title: 'Actions',
                    field: 'actions',
                    width: 200,
                    hozAlign: 'center',
                    headerSort: false
                }
            ];
            const rows = projects.map((project) => ({
                project: {
                    value: project.name,
                    displayValue: `<div style="display:flex;flex-direction:column;gap:2px;">
    <span style="font-weight:600;color:#1F2933;">${project.name}</span>
    <span style="font-size:12px;color:#6B7280;">${project.code}</span>
</div>`
                },
                owner: project.owner,
                department: project.department,
                status: {
                    value: project.status
                },
                progress: {
                    value: project.progress
                },
                budget: {
                    value: project.budget
                },
                start: project.start,
                end: project.end,
                health: {
                    value: project.health
                },
                actions: {
                    value: project.code,
                    displayValue: actionButtons(project.code)
                }
            }));
            const options = {
                groupBy: 'department',
                groupHeader(value, count) {
                    return `<span style="font-weight:600;color:#1F2937;">${value}</span><span style="color:#64748B;margin-left:8px;">${count} project${count === 1 ? '' : 's'}</span>`;
                },
                placeholder: 'No project portfolio data available',
                initialSort: [
                    {column: 'status', dir: 'asc'},
                    {column: 'progress', dir: 'desc'}
                ],
                columnDefaults: {
                    headerFilterPlaceholder: 'Filter…',
                    tooltip: true
                },
                rowContextMenu: [
                    {
                        label: 'Focus project in console',
                        action(e, row) {
                            const data = row.getData().__analogicCells || {};
                            const project = data.project ? data.project.value : 'Unknown project';
                            console.log('[GridTablePlusDemo] context menu -> focus project', project);
                        }
                    },
                    {
                        label: 'Log raw row data',
                        action(e, row) {
                            console.log('[GridTablePlusDemo] context menu -> row data', row.getData());
                        }
                    }
                ],
                clipboard: true
            };
            return {
                columns: columns,
                data: rows,
                options: options,
                events: {
                    tableBuilt: 'tableBuilt',
                    rowSelectionChanged: 'selectionChanged',
                    cellClick: 'cellClicked',
                    cellEdited: 'cellEdited'
                }
            };
        },
        tableBuilt(ctx) {
            const table = ctx.getTabulator();
            const rowCount = table && typeof table.getData === 'function' ? table.getData().length : 0;
            console.log('[GridTablePlusDemo] table built with', rowCount, 'rows');
        },
        selectionChanged(ctx, data) {
            const selected = Array.isArray(data) ? data.map((item) => {
                if (item && item.__analogicCells && item.__analogicCells.project) {
                    return item.__analogicCells.project.value;
                }
                return item && item.project ? item.project : '';
            }).filter(Boolean) : [];
            console.log('[GridTablePlusDemo] selection changed:', selected);
        },
        cellClicked(ctx, event) {
            const rowComponent = ctx.getRowComponent();
            const cells = rowComponent && typeof rowComponent.getData === 'function' ? rowComponent.getData().__analogicCells : null;
            const projectName = cells && cells.project ? cells.project.value : 'Unknown project';
            if (event && event.target && event.target.classList && event.target.classList.contains('grid-table-plus-demo__action-button')) {
                const action = event.target.getAttribute('data-action') || 'action';
                console.log(`[GridTablePlusDemo] ${action} button clicked for ${projectName}`);
                event.stopPropagation();
                return;
            }
            const meta = ctx.getCell();
            const field = meta ? meta.field : 'n/a';
            console.log('[GridTablePlusDemo] cell click ->', field, 'value:', meta ? meta.value : undefined, 'project:', projectName);
        },
        cellEdited(ctx) {
            const meta = ctx.getCell();
            const rowComponent = ctx.getRowComponent();
            const cells = rowComponent && typeof rowComponent.getData === 'function' ? rowComponent.getData().__analogicCells : null;
            const projectName = cells && cells.project ? cells.project.value : 'Unknown project';
            if (meta) {
                const component = typeof ctx.getCellComponent === 'function' ? ctx.getCellComponent() : null;
                if (component && typeof component.getValue === 'function') {
                    const updatedValue = component.getValue();
                    meta.value = updatedValue;
                    meta.displayValue = updatedValue;
                }
                console.log('[GridTablePlusDemo] cell edited ->', meta.field, 'is now', meta.value, 'for', projectName);
            }
        }
    },

    analogicTableDemoSimpleTable: {
        columnCount: 10,
        rowCount: 30,
        init(source) {
            const payload = this.preparePayload(source);
            return this.buildResponse(payload);
        },
        preparePayload(source) {
            const columnCount = this.columnCount || 10;
            const rowCount = this.rowCount || 30;
            const incomingCells = this.resolveIncomingCells(source);
            if (incomingCells) {
                return {
                    columnCount,
                    rowCount,
                    cells: this.normalizeIncomingCells(incomingCells, columnCount, rowCount)
                };
            }
            return this.generateSyntheticPayload(columnCount, rowCount);
        },
        resolveIncomingCells(source) {
            if (!source) {
                return null;
            }
            if (Array.isArray(source)) {
                return source;
            }
            if (source && Array.isArray(source.cells)) {
                return source.cells;
            }
            if (source && Array.isArray(source.data)) {
                return source.data;
            }
            if (source && typeof source.getData === 'function') {
                const data = source.getData();
                if (Array.isArray(data)) {
                    return data;
                }
                if (data && Array.isArray(data.cells)) {
                    return data.cells;
                }
                if (data && Array.isArray(data.data)) {
                    return data.data;
                }
            }
            if (source && typeof source.getExtraParams === 'function') {
                const extra = source.getExtraParams();
                if (extra && Array.isArray(extra.cells)) {
                    return extra.cells;
                }
                if (extra && Array.isArray(extra.data)) {
                    return extra.data;
                }
            }
            return null;
        },
        normalizeIncomingCells(cells, columnCount, rowCount) {
            const total = columnCount * rowCount;
            const normalized = [];
            for (let index = 0; index < total; index++) {
                const incoming = cells[index];
                const ordinal = index;
                if (incoming && typeof incoming === 'object') {
                    const formatted = typeof incoming.FormattedValue !== 'undefined' ? incoming.FormattedValue : '';
                    normalized.push({Ordinal: ordinal, FormattedValue: formatted});
                } else {
                    normalized.push({Ordinal: ordinal, FormattedValue: ''});
                }
            }
            return normalized;
        },
        generateSyntheticPayload(columnCount, rowCount) {
            const cells = [];
            let ordinal = 0;
            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                    cells.push({
                        Ordinal: ordinal,
                        FormattedValue: `Row ${rowIndex + 1} • Col ${columnIndex + 1}`
                    });
                    ordinal += 1;
                }
            }
            return {columnCount, rowCount, cells};
        },
        buildResponse({columnCount, rowCount, cells}) {
            const columns = Array.from({length: columnCount}, (_, index) => ({
                title: `Column ${index + 1}`,
                field: `col_${index + 1}`,
                headerFilter: 'input',
                headerFilterPlaceholder: 'Filter…',
                sorter: 'string',
                editor: 'input',
                headerSortTristate: true
            }));

            const matrix = [];
            const ordinalLookup = {};
            const data = Array.from({length: rowCount}, (_, rowIndex) => {
                const row = {};
                const cellRow = [];
                columns.forEach((column, columnIndex) => {
                    const payloadIndex = rowIndex * columnCount + columnIndex;
                    const payload = cells[payloadIndex] || {};
                    const cell = this.normalizePayloadCell(payload, rowIndex, columnIndex, column.field);
                    row[column.field] = cell;
                    cellRow.push(cell);
                    const cellOrdinal = cell && cell.metadata ? cell.metadata.ordinal : null;
                    if (typeof cellOrdinal === 'number') {
                        ordinalLookup[cellOrdinal] = {rowIndex, columnIndex, field: column.field, cell: cell};
                    }
                });
                matrix.push(cellRow);
                return row;
            });

            this.simpleTableState = {
                columnCount: columnCount,
                rowCount: rowCount,
                cells: cells,
                matrix: matrix,
                ordinalLookup: ordinalLookup
            };

            const options = {
                layout: 'fitDataStretch',
                height: '460px',
                columnDefaults: {
                    headerFilterPlaceholder: 'Filter…'
                }
            };

            return {
                columns: columns,
                data: data,
                options: options,
                events: {
                    cellEdited: 'cellEdited'
                }
            };
        },
        normalizePayloadCell(payload, rowIndex, columnIndex, field) {
            const formattedValue = payload && typeof payload.FormattedValue !== 'undefined' ? payload.FormattedValue : '';
            const ordinal = payload && typeof payload.Ordinal !== 'undefined' ? payload.Ordinal : null;
            const metadata = {
                ordinal: ordinal,
                payload: payload,
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                field: field
            };

            return {
                value: formattedValue,
                displayValue: formattedValue,
                metadata: metadata
            };
        },
        cellEdited(ctx) {
            const component = typeof ctx.getCellComponent === 'function' ? ctx.getCellComponent() : null;
            const meta = typeof ctx.getCell === 'function' ? ctx.getCell() : null;
            const updatedValue = component && typeof component.getValue === 'function' ? component.getValue() : undefined;

            if (!meta) {
                return;
            }

            meta.value = updatedValue;
            meta.displayValue = updatedValue;

            if (!meta.metadata || typeof meta.metadata !== 'object') {
                meta.metadata = {};
            }

            meta.metadata.updatedValue = updatedValue;
            if (meta.metadata.payload && typeof meta.metadata.payload === 'object') {
                meta.metadata.payload.FormattedValue = updatedValue;
            }

            const ordinal = meta.metadata && typeof meta.metadata.ordinal !== 'undefined' ? meta.metadata.ordinal : null;

            const rowIndex = typeof ctx.getRowIndex === 'function' ? ctx.getRowIndex() : undefined;
            const columnIndex = typeof ctx.getColumnIndex === 'function' ? ctx.getColumnIndex() : undefined;

            if (typeof rowIndex === 'number' && typeof columnIndex === 'number' && this.simpleTableState && Array.isArray(this.simpleTableState.matrix)) {
                const row = this.simpleTableState.matrix[rowIndex];
                if (row && row[columnIndex]) {
                    row[columnIndex].value = updatedValue;
                    row[columnIndex].displayValue = updatedValue;
                    if (!row[columnIndex].metadata || typeof row[columnIndex].metadata !== 'object') {
                        row[columnIndex].metadata = {};
                    }
                    row[columnIndex].metadata.updatedValue = updatedValue;
                }
            }

            if (typeof ordinal === 'number' && this.simpleTableState && Array.isArray(this.simpleTableState.cells)) {
                const originalPayload = this.simpleTableState.cells[ordinal];
                if (originalPayload) {
                    originalPayload.FormattedValue = updatedValue;
                }
            }

            if (typeof ordinal === 'number' && this.simpleTableState && this.simpleTableState.ordinalLookup) {
                this.simpleTableState.ordinalLookup[ordinal] = {
                    rowIndex: typeof rowIndex === 'number' ? rowIndex : null,
                    columnIndex: typeof columnIndex === 'number' ? columnIndex : null,
                    field: meta.field || (typeof ctx.getColumnField === 'function' ? ctx.getColumnField() : undefined),
                    cell: meta
                };
            }

            console.log('[GridTablePlusSimpleDemo] cell edited', {
                field: meta.field || (typeof ctx.getColumnField === 'function' ? ctx.getColumnField() : undefined),
                ordinal: ordinal,
                value: updatedValue
            });
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
