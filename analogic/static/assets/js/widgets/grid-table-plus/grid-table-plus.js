/* global app, Widget, Widgets, Utils, RestRequest, Repository, QB, Loader, Auth */

'use strict';

class GridTablePlusWidget extends Widget {

    constructor(options) {
        super(options);
        this.isGridTablePlusWidget = true;
        this.boundTabulatorHandlers = [];
        this.reset();
    }

    reset() {
        if (this.table && typeof this.table.destroy === 'function') {
            this.table.destroy();
        }
        this.table = null;
        this.boundTabulatorHandlers = [];
        this.cellData = [];
        this.fieldToIndex = {};
        this.tabulatorDefinition = null;
        this.tabulatorEvents = {};
        this.lastProcessedData = {};
        super.reset();
    }

    processData(data) {
        if (!data || typeof data !== 'object') {
            this.lastProcessedData = {};
            return {};
        }
        this.lastProcessedData = data;
        return data;
    }

    getCssPrefix() {
        return 'ks-grid-table-plus';
    }

    getParameters(data) {
        return {
            minWidth: this.getRealValue('minWidth', data, false),
            width: this.getRealValue('width', data, false),
            height: this.getRealValue('height', data, false),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            skin: this.getRealValue('skin', data, 'standard'),
            tabulatorOptions: this.getRealValue('tabulatorOptions', data, {}),
            tabulatorColumnOptions: this.getRealValue('tabulatorColumnOptions', data, {}),
            tabulatorEvents: this.getRealValue('tabulatorEvents', data, {})
        };
    }

    getDefaultTabulatorOptions() {
        return {
            layout: 'fitColumns',
            reactiveData: false,
            index: '__analogicRowIndex'
        };
    }

    prepareTabulatorSetup(data = {}) {
        const parameters = this.getParameters(data);
        const repoColumns = Array.isArray(data.columns) ? data.columns : [];
        const repoData = Array.isArray(data.data) ? data.data : [];
        const repoOptions = data.options || {};
        const repoEvents = data.events || {};

        const configColumnOverrides = this.options.tabulatorColumnOptions || {};
        const parameterColumnOverrides = parameters.tabulatorColumnOptions || {};
        const columnOverrides = {...configColumnOverrides, ...parameterColumnOverrides};

        const columns = repoColumns.map((column, index) => {
            const field = column.field || `col_${index}`;
            const overrides = columnOverrides[field] || columnOverrides[column.id] || {};
            const formatter = overrides.formatter || column.formatter;
            const formatterParams = overrides.formatterParams || column.formatterParams;

            const prepared = {
                title: column.title || '',
                field: field,
                width: column.width,
                hozAlign: column.hozAlign || column.align,
                headerHozAlign: column.headerHozAlign || column.headerAlign,
                resizable: typeof column.resizable === 'undefined' ? true : column.resizable,
                frozen: column.frozen,
                cssClass: column.cssClass || overrides.cssClass
            };

            let resolvedFormatter = formatter;
            if (typeof resolvedFormatter !== 'function') {
                resolvedFormatter = (cell) => this.defaultFormatter(cell);
            } else {
                const userFormatter = resolvedFormatter;
                resolvedFormatter = (cell, formatterParamsArg, onRendered) => {
                    const params = formatterParamsArg || formatterParams || {};
                    const result = userFormatter.call(column, cell, params, onRendered);
                    return typeof result === 'undefined' ? this.defaultFormatter(cell) : result;
                };
            }

            prepared.formatter = resolvedFormatter;
            if (formatterParams) {
                prepared.formatterParams = formatterParams;
            }

            if (overrides.editor || column.editor) {
                prepared.editor = overrides.editor || column.editor;
            }

            return {...column, ...overrides, ...prepared};
        });

        this.fieldToIndex = {};
        columns.forEach((col, index) => {
            this.fieldToIndex[col.field] = index;
        });

        const {rows, cellMatrix} = this.buildTabulatorData(repoData, columns);
        this.cellData = cellMatrix;
        const nextState = {...this.state};
        nextState.rows = cellMatrix.length;
        nextState.columns = columns.length;
        nextState.parameters = parameters;
        this.state = nextState;

        const options = {
            ...this.getDefaultTabulatorOptions(),
            ...this.options.tabulatorOptions,
            ...parameters.tabulatorOptions,
            ...repoOptions
        };

        const events = {
            ...(this.options.tabulatorEvents || {}),
            ...parameters.tabulatorEvents,
            ...repoEvents
        };

        this.tabulatorDefinition = {
            columns: columns,
            data: rows,
            options: options,
            events: events,
            parameters: parameters
        };

        return this.tabulatorDefinition;
    }

    buildTabulatorData(rawRows, columns) {
        const rows = [];
        const cellMatrix = [];

        rawRows.forEach((rawRow, rowIndex) => {
            const row = rawRow && typeof rawRow === 'object' ? rawRow : {};
            const rowData = {__analogicRowIndex: rowIndex};
            const cellRow = [];
            columns.forEach((column, columnIndex) => {
                const field = column.field;
                const value = row[field];
                const normalized = this.normalizeCellData(value, rowIndex, columnIndex, field);
                cellRow.push(normalized);
                rowData[field] = normalized.displayValue;
                if (!rowData.__analogicCells) {
                    rowData.__analogicCells = {};
                }
                rowData.__analogicCells[field] = normalized;
            });
            cellMatrix.push(cellRow);
            rows.push(rowData);
        });

        return {rows, cellMatrix};
    }

    normalizeCellData(value, rowIndex, columnIndex, field) {
        let cell = {};
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            cell = {...value};
        } else {
            cell.value = value;
        }

        if (typeof cell.value === 'undefined') {
            if (typeof cell.Value !== 'undefined') {
                cell.value = cell.Value;
            } else if (typeof cell.FormattedValue !== 'undefined') {
                cell.value = cell.FormattedValue;
            } else if (typeof cell.formattedValue !== 'undefined') {
                cell.value = cell.formattedValue;
            }
        }

        if (typeof cell.displayValue === 'undefined') {
            if (typeof cell.html !== 'undefined') {
                cell.displayValue = cell.html;
            } else if (typeof cell.title !== 'undefined') {
                cell.displayValue = cell.title;
            } else if (typeof cell.FormattedValue !== 'undefined') {
                cell.displayValue = cell.FormattedValue;
            } else if (typeof cell.formattedValue !== 'undefined') {
                cell.displayValue = cell.formattedValue;
            } else {
                cell.displayValue = typeof cell.value === 'undefined' ? '' : cell.value;
            }
        }

        cell.rowIndex = rowIndex;
        cell.columnIndex = columnIndex;
        cell.field = field;
        cell.id = `${this.id}_${rowIndex}_${columnIndex}`;
        cell.cellId = `${this.id}Cell${rowIndex}-${columnIndex}`;
        cell.widgetId = this.id;

        return cell;
    }

    defaultFormatter(cell) {
        const meta = this.getCellFromTabulatorCell(cell);
        const value = meta && typeof meta.displayValue !== 'undefined' ? meta.displayValue : '';
        const element = cell && typeof cell.getElement === 'function' ? cell.getElement() : null;
        if (element && meta) {
            element.setAttribute('data-widget-id', this.id);
            element.setAttribute('data-row', meta.rowIndex);
            element.setAttribute('data-col', meta.columnIndex);
        }
        return value;
    }

    getCellFromTabulatorCell(cell) {
        const context = this.resolveCellContext(cell);
        return context ? context.meta : null;
    }

    resolveCellContext(cellComponent) {
        if (!this.isCellComponent(cellComponent)) {
            return null;
        }

        const field = typeof cellComponent.getField === 'function' ? cellComponent.getField() : null;
        const columnIndex = typeof field === 'string' && this.fieldToIndex[field] !== undefined ? this.fieldToIndex[field] : null;

        let rowComponent = null;
        if (typeof cellComponent.getRow === 'function') {
            try {
                rowComponent = cellComponent.getRow();
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to resolve row from cell component', error);
            }
        }

        let rowData = null;
        if (rowComponent && typeof rowComponent.getData === 'function') {
            try {
                rowData = rowComponent.getData();
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to access row data from row component', error);
            }
        }

        let meta = null;
        if (rowData && rowData.__analogicCells && field) {
            meta = rowData.__analogicCells[field] || null;
        }

        let rowIndex = meta && typeof meta.rowIndex === 'number' ? meta.rowIndex : null;
        if (rowIndex === null && rowData && typeof rowData.__analogicRowIndex === 'number') {
            rowIndex = rowData.__analogicRowIndex;
        }
        if (rowIndex === null && rowComponent && typeof rowComponent.getIndex === 'function') {
            try {
                const index = rowComponent.getIndex();
                if (typeof index === 'number') {
                    rowIndex = index;
                }
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to resolve row index from row component', error);
            }
        }

        let resolvedColumnIndex = columnIndex;
        if (resolvedColumnIndex === null && meta && typeof meta.columnIndex === 'number') {
            resolvedColumnIndex = meta.columnIndex;
        }

        if (!meta && typeof rowIndex === 'number' && typeof resolvedColumnIndex === 'number' && Array.isArray(this.cellData[rowIndex])) {
            meta = this.cellData[rowIndex][resolvedColumnIndex] || null;
        }

        if (!meta) {
            const element = typeof cellComponent.getElement === 'function' ? (() => {
                try {
                    return cellComponent.getElement();
                } catch (error) {
                    console.warn('GridTablePlusWidget: unable to resolve cell element while locating metadata', error);
                    return null;
                }
            })() : null;
            if (element && element.getAttribute) {
                const rowAttr = element.getAttribute('data-row');
                const colAttr = element.getAttribute('data-col');
                const parsedRow = rowAttr !== null ? Number(rowAttr) : NaN;
                const parsedCol = colAttr !== null ? Number(colAttr) : NaN;
                if (!Number.isNaN(parsedRow) && !Number.isNaN(parsedCol) && Array.isArray(this.cellData[parsedRow])) {
                    meta = this.cellData[parsedRow][parsedCol] || null;
                    if (meta) {
                        rowIndex = parsedRow;
                        resolvedColumnIndex = parsedCol;
                    }
                }
            }
        }

        if (!meta) {
            return null;
        }

        if (typeof meta.field === 'undefined' && field) {
            meta.field = field;
        }
        if (typeof meta.rowIndex !== 'number' && typeof rowIndex === 'number') {
            meta.rowIndex = rowIndex;
        }
        if (typeof meta.columnIndex !== 'number' && typeof resolvedColumnIndex === 'number') {
            meta.columnIndex = resolvedColumnIndex;
        }

        if (rowData) {
            if (!rowData.__analogicCells) {
                rowData.__analogicCells = {};
            }
            rowData.__analogicCells[meta.field] = meta;
        }

        return {
            field: meta.field,
            rowComponent: rowComponent || null,
            rowData: rowData || null,
            rowIndex: typeof meta.rowIndex === 'number' ? meta.rowIndex : rowIndex,
            columnIndex: typeof meta.columnIndex === 'number' ? meta.columnIndex : resolvedColumnIndex,
            meta: meta
        };
    }

    getHtml(widgetHtmls, processedData) {
        const definition = this.prepareTabulatorSetup(processedData || {});
        const classes = ['ks-grid-table-plus', `ks-grid-table-plus-${definition.parameters.skin || 'standard'}`];
        const styles = this.getGeneralStyles(processedData);
        if (definition.parameters.hideIfNoData && definition.data.length === 0) {
            styles.push('display:none;');
        }
        if (definition.parameters.minWidth) {
            styles.push(`min-width:${Widget.getPercentOrPixel(definition.parameters.minWidth)};`);
        }
        if (definition.parameters.width) {
            styles.push(`width:${Widget.getPercentOrPixel(definition.parameters.width)};`);
        }
        const containerId = `${this.id}__tabulator`;
        return `<div class="${classes.join(' ')}" style="${styles.join('')}">
    ${this.options.title ? `<h3>${this.options.title}</h3>` : ''}
    <div class="ks-grid-table-plus-inner">
        <div class="analogic-tabulator" id="${containerId}"></div>
    </div>
</div>`;
    }

    initEvents(withState) {
        this.initializeTabulatorInstance();
        super.initEvents(withState);
    }

    initializeTabulatorInstance() {
        const container = document.getElementById(`${this.id}__tabulator`);
        if (!container) {
            return;
        }
        if (this.table && typeof this.table.destroy === 'function') {
            this.table.destroy();
        }
        this.table = null;
        container.innerHTML = '';

        if (typeof Tabulator === 'undefined') {
            console.warn('Tabulator library is not available. GridTablePlusWidget cannot initialize.');
            return;
        }

        const definition = this.tabulatorDefinition || this.prepareTabulatorSetup(this.lastProcessedData || {});
        const options = {...definition.options, columns: definition.columns, data: definition.data};
        this.table = new Tabulator(container, options);
        this.registerTabulatorEventHandlers(definition.events || {});
    }

    registerTabulatorEventHandlers(eventMap = {}) {
        this.tabulatorEvents = eventMap;
        if (!this.table) {
            return;
        }

        if (!Array.isArray(this.boundTabulatorHandlers)) {
            this.boundTabulatorHandlers = [];
        }

        this.boundTabulatorHandlers.forEach(({eventName, handler}) => {
            if (typeof this.table.off === 'function') {
                try {
                    this.table.off(eventName, handler);
                } catch (error) {
                    console.warn(`Unable to detach Tabulator handler for ${eventName}`, error);
                }
            }
        });
        this.boundTabulatorHandlers = [];

        const attachHandler = (eventName, handler) => {
            if (typeof handler !== 'function' || typeof eventName !== 'string') {
                return;
            }
            if (typeof this.table.on === 'function') {
                this.table.on(eventName, handler);
                this.boundTabulatorHandlers.push({eventName, handler});
            }
        };

        Object.entries(eventMap).forEach(([eventName, handlerName]) => {
            if (!handlerName || typeof handlerName !== 'string') {
                return;
            }
            const wrapped = (...args) => {
                this.handleTabulatorEvent(eventName, handlerName, args);
            };
            attachHandler(eventName, wrapped);
        });

        const syncHandlers = {
            cellClick: (event, cell) => {
                this.updateCurrentPositionFromCell(cell);
            },
            cellTap: (event, cell) => {
                this.updateCurrentPositionFromCell(cell);
            }
        };

        Object.entries(syncHandlers).forEach(([eventName, handler]) => {
            attachHandler(eventName, handler);
        });
    }

    updateCurrentPositionFromCell(cell) {
        const meta = this.getCellFromTabulatorCell(cell);
        if (!meta) {
            return;
        }
        this.row = meta.rowIndex;
        this.column = meta.columnIndex;
    }

    handleTabulatorEvent(eventName, handlerName, args) {
        const cellComponent = this.extractCellComponent(args);
        if (cellComponent) {
            this.updateCurrentPositionFromCell(cellComponent);
            if (eventName === 'cellEdited') {
                this.syncCellMetadataFromComponent(cellComponent, {preferRowData: true});
            }
        }
        const repository = Repository[this.id] || {};
        const handler = repository[handlerName];
        if (typeof handler !== 'function') {
            console.warn(`Repository handler "${handlerName}" for widget "${this.id}" is not defined.`);
            return;
        }
        const context = this.buildRepositoryContext(eventName, args);
        try {
            const response = handler.call(repository, context, ...args);
            if (response instanceof RestRequest) {
                this.executeRestRequest(response, context);
            }
        } catch (error) {
            app.handleJsError(error, this.id, handlerName, `Error while executing Tabulator handler "${handlerName}"`);
        }
    }

    buildRepositoryContext(eventName, args) {
        const cellComponent = this.extractCellComponent(args);
        let rowComponent = this.extractRowComponent(args);
        if (!rowComponent && cellComponent && typeof cellComponent.getRow === 'function') {
            try {
                rowComponent = cellComponent.getRow();
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to resolve row component from cell', error);
            }
        }
        let columnComponent = this.extractColumnComponent(args);
        if (!columnComponent && cellComponent && typeof cellComponent.getColumn === 'function') {
            try {
                columnComponent = cellComponent.getColumn();
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to resolve column component from cell', error);
            }
        }
        const cellData = this.getCellFromTabulatorCell(cellComponent);
        const rowIndex = cellData ? cellData.rowIndex : (rowComponent && typeof rowComponent.getIndex === 'function' ? rowComponent.getIndex() : null);
        const columnField = cellData ? cellData.field : (columnComponent && typeof columnComponent.getField === 'function' ? columnComponent.getField() : null);
        const columnIndex = typeof columnField === 'string' && this.fieldToIndex[columnField] !== undefined ? this.fieldToIndex[columnField] : null;
        const widget = this;

        return {
            getWidgetId() {
                return widget.id;
            },
            getTabulator() {
                return widget.table;
            },
            getEventName() {
                return eventName;
            },
            getCellComponent() {
                return cellComponent;
            },
            getRowComponent() {
                return rowComponent;
            },
            getColumnComponent() {
                return columnComponent;
            },
            getCell() {
                return cellData;
            },
            getRow() {
                return typeof rowIndex === 'number' ? widget.cellData[rowIndex] : null;
            },
            getColumn() {
                return typeof columnIndex === 'number' ? widget.cellData.map(row => row[columnIndex]) : null;
            },
            getRowIndex() {
                return rowIndex;
            },
            getColumnIndex() {
                return columnIndex;
            },
            getColumnField() {
                return columnField;
            },
            getRowData() {
                return rowComponent && typeof rowComponent.getData === 'function' ? rowComponent.getData() : null;
            },
            getColumnDefinition() {
                return columnComponent && typeof columnComponent.getDefinition === 'function' ? columnComponent.getDefinition() : null;
            },
            getCellId() {
                return cellData ? cellData.id : null;
            },
            getCellElement() {
                return cellComponent && typeof cellComponent.getElement === 'function' ? cellComponent.getElement() : null;
            },
            getCellValue() {
                if (!cellData) {
                    return undefined;
                }
                return typeof cellData.value !== 'undefined' ? cellData.value : cellData.displayValue;
            },
            getEventArguments() {
                return args;
            },
            getEventValues() {
                return {
                    value: cellData ? cellData.value : undefined,
                    displayValue: cellData ? cellData.displayValue : undefined,
                    metadata: cellData && typeof cellData.metadata !== 'undefined' ? cellData.metadata : undefined,
                    field: columnField,
                    rowIndex: rowIndex,
                    columnIndex: columnIndex,
                    rowData: rowComponent && typeof rowComponent.getData === 'function' ? rowComponent.getData() : null,
                    cell: cellData
                };
            },
            getEvent() {
                return args && args.length ? args[0] : null;
            }
        };
    }

    extractCellComponent(args) {
        return (args || []).find(arg => this.isCellComponent(arg)) || null;
    }

    extractRowComponent(args) {
        return (args || []).find(arg => this.isRowComponent(arg)) || null;
    }

    extractColumnComponent(args) {
        return (args || []).find(arg => this.isColumnComponent(arg)) || null;
    }

    captureCellElementHtml(cellComponent) {
        if (!cellComponent || typeof cellComponent.getElement !== 'function') {
            return undefined;
        }
        try {
            const element = cellComponent.getElement();
            if (element && typeof element.innerHTML !== 'undefined') {
                return element.innerHTML;
            }
        } catch (error) {
            console.warn('GridTablePlusWidget: unable to resolve cell element while syncing metadata', error);
        }
        return undefined;
    }

    syncCellMetadataFromComponent(cellComponent, options = {}) {
        if (!this.isCellComponent(cellComponent)) {
            return;
        }

        const context = this.resolveCellContext(cellComponent);
        if (!context) {
            return;
        }

        const {meta, field, rowData, rowIndex, columnIndex} = context;
        const skipDomCapture = options && options.skipDomCapture === true;
        const preferRowData = options && options.preferRowData === true;

        let value;
        if (typeof cellComponent.getValue === 'function') {
            try {
                value = cellComponent.getValue();
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to resolve cell value while syncing metadata', error);
            }
        }

        if (typeof value !== 'undefined') {
            meta.value = value;
        }

        let displayValue;
        if (preferRowData && rowData && field && Object.prototype.hasOwnProperty.call(rowData, field)) {
            displayValue = rowData[field];
        }
        if (typeof displayValue === 'undefined' && !skipDomCapture) {
            displayValue = this.captureCellElementHtml(cellComponent);
        }
        if (typeof displayValue === 'undefined' && typeof value !== 'undefined') {
            displayValue = value;
        }
        if (typeof displayValue === 'undefined' && meta && typeof meta.displayValue !== 'undefined') {
            displayValue = meta.displayValue;
        }

        if (typeof displayValue === 'undefined') {
            return;
        }

        meta.displayValue = displayValue;

        if (rowData && field) {
            rowData[field] = displayValue;
            if (!rowData.__analogicCells) {
                rowData.__analogicCells = {};
            }
            rowData.__analogicCells[field] = meta;
        }

        if (typeof rowIndex === 'number' && typeof columnIndex === 'number' && Array.isArray(this.cellData[rowIndex])) {
            this.cellData[rowIndex][columnIndex] = meta;
        }

        if (this.tabulatorDefinition && Array.isArray(this.tabulatorDefinition.data) && typeof rowIndex === 'number') {
            const storedRow = this.tabulatorDefinition.data[rowIndex];
            if (storedRow) {
                storedRow[field] = displayValue;
                if (!storedRow.__analogicCells) {
                    storedRow.__analogicCells = {};
                }
                storedRow.__analogicCells[field] = meta;
            }
        }

        if (!skipDomCapture && typeof cellComponent.getElement === 'function') {
            try {
                const element = cellComponent.getElement();
                if (element && element.innerHTML !== displayValue) {
                    element.innerHTML = displayValue;
                }
            } catch (error) {
                console.warn('GridTablePlusWidget: unable to update cell element while syncing metadata', error);
            }
        }
    }

    isCellComponent(arg) {
        if (!arg || typeof arg !== 'object') {
            return false;
        }
        if (typeof arg.getType === 'function') {
            try {
                return arg.getType() === 'cell';
            } catch (error) {
                return false;
            }
        }
        const requiredMethods = ['getRow', 'getField', 'getValue', 'getElement'];
        if (requiredMethods.every((method) => typeof arg[method] === 'function')) {
            return true;
        }
        return '_cell' in arg;
    }

    isRowComponent(arg) {
        if (!arg || typeof arg !== 'object') {
            return false;
        }
        if (typeof arg.getType === 'function') {
            try {
                return arg.getType() === 'row';
            } catch (error) {
                return false;
            }
        }
        if ('_row' in arg && arg._row) {
            return true;
        }
        return typeof arg.getIndex === 'function' && typeof arg.getData === 'function' && !this.isCellComponent(arg);
    }

    isColumnComponent(arg) {
        if (!arg || typeof arg !== 'object') {
            return false;
        }
        if (typeof arg.getType === 'function') {
            try {
                return arg.getType() === 'column';
            } catch (error) {
                return false;
            }
        }
        if ('_column' in arg && arg._column) {
            return true;
        }
        if (typeof arg.getField === 'function' && typeof arg.getCells === 'function' && !this.isCellComponent(arg)) {
            return true;
        }
        return false;
    }

    executeRestRequest(restRequest, context) {
        const description = restRequest.getDescription();
        if (!description) {
            return;
        }
        const type = typeof description.type === 'function' ? description.type(context) : (description.type || 'POST');
        const url = typeof description.url === 'function' ? description.url(context) : description.url;
        const body = typeof description.body === 'function' ? description.body(context) : (description.body || {});
        const server = description.server === true;
        const callback = description.callback;
        let finalUrl = url;
        let finalBody = body;

        if (server) {
            const mm = QB.getServerSideUrlAndBody(url, body, this.id, context.getEventName());
            finalUrl = mm.url;
            finalBody = mm.body;
        }

        Loader.start(true);
        Auth.getAjaxRequest(QB.getUrl(finalUrl, description.source), finalBody, type, this.id, false, `${context.getEventName()}.${this.id}`).then((response) => {
            Loader.stop(true);
            if (typeof callback === 'function') {
                callback({getResponse: () => response, ...context});
            }
            QB.executeEventMapAction(`${context.getEventName()}.${this.id}.finished`, context, response);
        }).fail(() => {
            Loader.stop(true);
        });
    }

    updateContent(data = false, loadFunction = QB.loadData) {
        const o = this.options, instance = this;
        if (data !== false) {
            const processed = instance.processData(data);
            instance.prepareTabulatorSetup(processed);
            instance.updateHtml(processed);
            instance.refreshTabulator();
            return $.Deferred().resolve('update');
        }
        return loadFunction(o.id, instance.name).then(function (d) {
            const processed = instance.processData(d);
            instance.prepareTabulatorSetup(processed);
            instance.updateHtml(processed);
            instance.refreshTabulator();
            return 'update';
        });
    }

    refreshTabulator() {
        if (!this.table) {
            this.initializeTabulatorInstance();
            return;
        }
        const definition = this.tabulatorDefinition || {};
        if (typeof this.table.setColumns === 'function') {
            this.table.setColumns(definition.columns || []);
        }
        if (typeof this.table.replaceData === 'function') {
            this.table.replaceData(definition.data || []);
        } else if (typeof this.table.setData === 'function') {
            this.table.setData(definition.data || []);
        }
        if (typeof this.table.setOptions === 'function' && definition.options) {
            this.table.setOptions(definition.options);
        }
        this.registerTabulatorEventHandlers(definition.events || {});
        if (typeof this.table.redraw === 'function') {
            this.table.redraw(true);
        }
    }

    updateHtml(data) {
        const definition = this.tabulatorDefinition || this.prepareTabulatorSetup(data || {});
        const section = $('#' + this.id);
        const main = section.find('.ks-grid-table-plus').first();
        if (!main.length) {
            return;
        }
        if (definition.parameters.hideIfNoData) {
            main.css('display', definition.data.length > 0 ? 'block' : 'none');
        }
        if (definition.parameters.minWidth) {
            main.css('min-width', Widget.getPercentOrPixel(definition.parameters.minWidth));
        }
        if (definition.parameters.width) {
            main.css('width', Widget.getPercentOrPixel(definition.parameters.width));
        }
    }
}
;
