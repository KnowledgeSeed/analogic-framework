/* global $, Widget, Widgets, QB, Utils, Api, GridTableExport */

'use strict';

class GridTableLightWidget extends Widget {

    constructor(options) {
        super(options);
        this.state = {
            page: 1,
            pageSize: options.pageSize || 25,
            totalCount: 0,
            columns: []
        };
        this.cellData = [];
        Widgets[options.id] = this;
    }

    getParameters(data) {
        return {
            allowCopyToClipBoard: this.getRealValue('allowCopyToClipBoard', data, false),
            allowFullContentUpdated: this.getRealValue('allowFullContentUpdated', data, true),
            columnDefaults: this.getRealValue('columnDefaults', data, this.options.columnDefaults || {}),
            columns: this.getRealValue('columns', data, this.options.columns || []),
            enableExport: this.getRealValue('enableExport', data, this.options.enableExport || false),
            exportConfig: this.getRealValue('exportConfig', data, this.options.exportConfig || {}),
            freezeFirstColumns: parseInt(this.getRealValue('freezeFirstColumns', data, this.options.freezeFirstColumns || 0), 10) || 0,
            freezeHeader: this.getRealValue('freezeHeader', data, typeof this.options.freezeHeader === 'undefined' ? true : this.options.freezeHeader),
            hideIfNoData: this.getRealValue('hideIfNoData', data, this.options.hideIfNoData || false),
            minWidth: this.getRealValue('minWidth', data, this.options.minWidth || false),
            page: this.getRealValue('page', data, this.state.page || 1),
            pageSize: this.getRealValue('pageSize', data, this.state.pageSize || (this.options.pageSize || 25)),
            rowHeight: this.getRealValue('rowHeight', data, this.options.rowHeight || false),
            skin: this.getRealValue('skin', data, this.options.skin || 'standard'),
            title: this.getRealValue('title', data, this.options.title || ''),
            toolbar: this.getRealValue('toolbar', data, this.options.toolbar || false),
            visible: this.getRealValue('visible', data, typeof this.options.visible === 'undefined' ? true : this.options.visible),
            width: this.getRealValue('width', data, this.options.width || false)
        };
    }

    processData(data) {
        const parameters = this.getParameters(data);
        let payload = data;
        if (Array.isArray(payload)) {
            payload = {content: payload};
        }
        payload = payload || {};
        const columns = (payload.columns || parameters.columns || []).map((column, index) => {
            const colDefaults = parameters.columnDefaults || {};
            const normalized = $.extend(true, {}, colDefaults, column || {});
            normalized.index = index;
            normalized.key = typeof normalized.key !== 'undefined' ? normalized.key : normalized.field || index;
            normalized.title = typeof normalized.title === 'undefined' ? (normalized.label || '') : normalized.title;
            normalized.alignment = normalized.alignment || 'center-left';
            normalized.width = typeof normalized.width === 'undefined' ? (colDefaults.width || false) : normalized.width;
            normalized.frozen = parameters.freezeFirstColumns > index;
            return normalized;
        });

        const content = (payload.content || []).map((row, rowIndex) => {
            return (row || []).map((cell, colIndex) => this.normalizeCell(cell, columns[colIndex], rowIndex, colIndex));
        });

        const totalCount = typeof payload.totalCount === 'number' ? payload.totalCount : content.length;
        const page = payload.page || parameters.page || 1;
        const pageSize = payload.pageSize || parameters.pageSize || 25;

        return {
            parameters,
            columns,
            content,
            totalCount,
            page,
            pageSize,
            meta: payload.meta || {}
        };
    }

    normalizeCell(cell, column, rowIndex, colIndex) {
        const normalized = $.extend(true, {}, column && column.cellDefaults ? column.cellDefaults : {}, cell || {});
        normalized.type = normalized.type || 'text';
        normalized.displayValue = typeof normalized.displayValue !== 'undefined' ? normalized.displayValue : (normalized.title || normalized.value || '');
        normalized.rawValue = typeof normalized.rawValue !== 'undefined' ? normalized.rawValue : normalized.displayValue;
        normalized.actions = normalized.actions || {};
        normalized.alignment = normalized.alignment || (column ? column.alignment : 'center-left') || 'center-left';
        normalized.classes = normalized.classes || '';
        normalized.style = normalized.style || {};
        normalized.tooltip = normalized.tooltip || column && column.tooltip;
        normalized.editable = normalized.editable || false;
        normalized.rowIndex = rowIndex;
        normalized.columnIndex = colIndex;
        normalized.id = `${this.options.id}_${rowIndex}_${colIndex}`;
        normalized.cellId = `${this.options.id}Cell${rowIndex}-${colIndex}`;
        normalized.width = typeof normalized.width === 'undefined' && column ? column.width : normalized.width;
        normalized.frozen = typeof normalized.frozen === 'boolean' ? normalized.frozen : column && column.frozen;
        return normalized;
    }

    renderTable(processed) {
        const {parameters, columns, content, totalCount, pageSize} = processed;
        const headerHtml = this.buildHeaderHtml(columns, parameters);
        const bodyHtml = this.buildBodyHtml(content, parameters);
        const pagerHtml = this.buildPagerHtml(processed);
        const exportHtml = parameters.enableExport ? this.buildExportButton(parameters) : '';
        let style = this.getGeneralStyles(processed.parameters);
        if (parameters.width) {
            style.push(`width:${Widget.getPercentOrPixel(parameters.width)};`);
        }
        if (parameters.minWidth) {
            style.push(`min-width:${Widget.getPercentOrPixel(parameters.minWidth)};`);
        }
        if (parameters.hideIfNoData && content.length === 0) {
            style.push('display:none;');
        }
        const tableHtml = [`<div class="ks-grid-table ks-grid-table-${parameters.skin}">`,
            '<div class="ks-grid-table-inner">',
            headerHtml,
            bodyHtml,
            '</div>',
            '</div>'];
        const toolbarHtml = parameters.toolbar ? `<div class="ks-grid-table-toolbar">${parameters.toolbar}</div>` : '';
        return `<div class="ks-grid-table-light" style="${style.join('')}">` +
            (parameters.title ? `<h3>${parameters.title}</h3>` : '') +
            toolbarHtml +
            (exportHtml ? `<div class="ks-grid-table-actions">${exportHtml}</div>` : '') +
            tableHtml.join('') +
            (pageSize && totalCount > pageSize ? pagerHtml : '') +
            '</div>';
    }

    buildHeaderHtml(columns, parameters) {
        const cells = columns.map((column, index) => {
            const styles = [];
            if (column.width) {
                styles.push(`width:${Widget.getPercentOrPixel(column.width)};`);
            }
            if (parameters.freezeHeader) {
                styles.push('position:sticky;top:0;z-index:2;');
            }
            if (column.frozen) {
                const left = this.getFrozenOffset(columns, index);
                if (left !== false) {
                    styles.push(`position:sticky;left:${left}px;z-index:3;`);
                }
            }
            return `<div class="ks-grid-table-cell ${column.classes || ''}" data-col="${index}" style="${styles.join('')}">` +
                `<div class="ks-grid-table-cell-content ks-pos-${column.alignment || 'center-left'}">${column.headerTemplate || column.title || ''}</div>` +
                '</div>';
        });
        return `<div class="ks-grid-table-head"><div class="ks-grid-table-row">${cells.join('')}</div></div>`;
    }

    buildBodyHtml(content, parameters) {
        const rows = content.map((row, rowIndex) => {
            const rowStyles = [];
            if (parameters.rowHeight) {
                rowStyles.push(`height:${Widget.getPercentOrPixel(parameters.rowHeight)};`);
            }
            const cells = row.map((cell) => this.buildCellHtml(cell, parameters));
            return `<div class="ks-grid-table-row" data-row="${rowIndex}" style="${rowStyles.join('')}">${cells.join('')}</div>`;
        });
        return `<div class="ks-grid-table-content">${rows.join('')}</div>`;
    }

    buildCellHtml(cell, parameters) {
        const classes = ['ks-grid-table-cell'];
        if (cell.classes) {
            classes.push(cell.classes);
        }
        const styles = [];
        if (cell.width) {
            styles.push(`width:${Widget.getPercentOrPixel(cell.width)};`);
        }
        if (cell.frozen) {
            const left = this.getFrozenOffset(this.state.columns || [], cell.columnIndex);
            if (left !== false) {
                styles.push(`position:sticky;left:${left}px;z-index:1;`);
            }
        }
        if (cell.style) {
            Object.keys(cell.style).forEach(key => {
                if (typeof cell.style[key] !== 'undefined' && cell.style[key] !== null) {
                    styles.push(`${key}:${cell.style[key]};`);
                }
            });
        }
        const contentHtml = this.buildCellContentHtml(cell, parameters);
        Widgets[cell.cellId] = Widgets[cell.cellId] || {};
        Widgets[cell.cellId].cell = cell;
        Widgets[cell.id] = Widgets[cell.id] || {};
        Widgets[cell.id].cell = cell;
        return `<div id="${cell.cellId}" class="${classes.join(' ')}" data-row="${cell.rowIndex}" data-col="${cell.columnIndex}" style="${styles.join('')}">` +
            '<div class="ks-grid-table-cell-border-left"></div>' +
            `<div class="ks-grid-table-cell-content ks-pos-${cell.alignment}">${contentHtml}</div>` +
            '</div>';
    }

    buildCellContentHtml(cell, parameters) {
        const action = (cell.actions && cell.actions.click && cell.actions.click.action) || 'text_click';
        const updateValue = cell.actions && cell.actions.click && cell.actions.click.updateValue === false ? 'false' : 'true';
        const attributes = [`data-id="${cell.id}"`, `data-action="${action}"`, `data-update="${updateValue}"`, `data-cell-id="${cell.cellId}"`];
        const tooltip = cell.tooltip ? ` title="${Utils.htmlEncode(Utils.stripHtml(cell.tooltip))}"` : '';
        switch (cell.type) {
            case 'button':
                return `<button class="ks-grid-table-button" ${attributes.join(' ')}>${cell.displayValue}</button>`;
            case 'combo':
                const optionsHtml = (cell.options || []).map(option => {
                    const value = option && typeof option.value !== 'undefined' ? option.value : '';
                    const label = option && typeof option.label !== 'undefined' ? option.label : value;
                    const selected = value === cell.rawValue ? 'selected' : '';
                    return `<option value="${Utils.htmlEncode(String(value))}" ${selected}>${Utils.htmlEncode(String(label))}</option>`;
                }).join('');
                return `<select class="ks-grid-table-select" data-action="change" data-id="${cell.id}" data-cell-id="${cell.cellId}">${optionsHtml}</select>`;
            case 'custom':
                return cell.html || '';
            case 'text':
            default:
                return `<div class="ks-text"><div class="ks-text-inner" ${attributes.join(' ')}${tooltip}><div class="ks-text-title">${cell.displayValue}</div></div></div>`;
        }
    }

    buildPagerHtml(processed) {
        const {page, pageSize, totalCount} = processed;
        if (!pageSize || totalCount <= pageSize) {
            return '';
        }
        const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
        const buttons = [
            {action: 'first', label: '&laquo;', disabled: page <= 1},
            {action: 'prev', label: '&lsaquo;', disabled: page <= 1},
            {action: 'next', label: '&rsaquo;', disabled: page >= totalPages},
            {action: 'last', label: '&raquo;', disabled: page >= totalPages}
        ];
        const buttonsHtml = buttons.map(btn => `<button class="ks-grid-table-pager-button" data-pager-action="${btn.action}" ${btn.disabled ? 'disabled' : ''}>${btn.label}</button>`).join('');
        return `<div class="ks-grid-table-pager" data-page="${page}" data-total-pages="${totalPages}">${buttonsHtml}<span class="ks-grid-table-pager-info">${page} / ${totalPages}</span></div>`;
    }

    buildExportButton(parameters) {
        return `<button class="ks-grid-table-export" data-action="export" data-id="${this.options.id}"><span class="icon-download"></span></button>`;
    }

    getFrozenOffset(columns, columnIndex) {
        if (!columns || !columns.length) {
            return false;
        }
        let offset = 0;
        for (let i = 0; i < columnIndex; i++) {
            const column = columns[i];
            if (!column || !column.frozen) {
                continue;
            }
            const width = column.width;
            if (typeof width === 'number') {
                offset += width;
            } else if (width && width.toString().endsWith('px')) {
                offset += parseInt(width, 10) || 0;
            } else {
                return false;
            }
        }
        return offset;
    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        this.isRendering = true;
        delete this.row;
        delete this.column;
        const o = this.options;
        this.addListeners(false);
        const loader = previouslyLoadedData !== false ? $.Deferred().resolve(previouslyLoadedData).promise() : loadFunction(o.id, this.name);
        return loader.then((data) => {
            const processed = this.processData(data);
            this.afterProcess(processed);
            const tableHtml = this.renderTable(processed);
            const sectionStyles = [];
            if (o.applyMeasuresToSection === true) {
                sectionStyles.push(...this.getWidthAndHeight(data));
            }
            const visible = typeof processed.parameters.visible === 'boolean' ? processed.parameters.visible : true;
            if (!visible) {
                sectionStyles.push('display:none;');
            }
            const sectionAttributes = [`id="${o.id}"`, `data-originalid="${o.id}"`];
            return `<section ${sectionStyles.length ? `style="${sectionStyles.join('')}"` : ''} ${sectionAttributes.join(' ')}>${tableHtml}</section>`;
        });
    }

    afterProcess(processed) {
        this.state.columns = processed.columns;
        this.state.page = processed.page;
        this.state.pageSize = processed.pageSize;
        this.state.totalCount = processed.totalCount;
        this.cellData = processed.content;
        this.parameters = processed.parameters;
        Widgets[this.options.id] = Widgets[this.options.id] || this;
        Widgets[this.options.id].cellData = this.cellData;
    }

    updateContent(data = false, loadFunction = QB.loadData) {
        const o = this.options;
        const loader = data !== false ? $.Deferred().resolve(data).promise() : loadFunction(o.id, this.name);
        return loader.then((payload) => {
            const processed = this.processData(payload);
            this.afterProcess(processed);
            const section = this.getSection();
            if (!section.length) {
                return 'update';
            }
            section.html(this.renderTable(processed));
            this.initEvents(false);
            return 'update';
        });
    }

    initEvents(withState) {
        const section = this.getSection();
        if (!section.length) {
            return;
        }
        const self = this;
        section.off('.gridtablelight');
        section.on('click.gridtablelight', '[data-action]', function (event) {
            const element = $(event.currentTarget);
            const updateValue = element.data('update') !== 'false';
            const cellElement = element.closest('.ks-grid-table-cell');
            if (cellElement.length) {
                self.row = cellElement.data('row');
                self.column = cellElement.data('col');
            }
            Widget.doHandleGridTableSystemEvent(element, event, updateValue);
        });

        section.on('contextmenu.gridtablelight', '.ks-grid-table-cell', function (event) {
            const cellElement = $(event.currentTarget);
            self.row = cellElement.data('row');
            self.column = cellElement.data('col');
            const proxyElement = $('<div>').data({id: `${self.options.id}_${self.row}_${self.column}`, action: 'rightclick'});
            Widget.doHandleGridTableSystemEvent(proxyElement, event);
        });

        section.on('click.gridtablelight', '.ks-grid-table-pager-button', function (event) {
            event.preventDefault();
            const action = $(event.currentTarget).data('pager-action');
            self.handlePagerAction(action);
        });

        section.on('click.gridtablelight', '.ks-grid-table-export', function (event) {
            event.preventDefault();
            self.handleExport();
        });

        if (this.parameters && this.parameters.allowCopyToClipBoard) {
            this.initSelectionHandlers(section);
        }

        this.isRendering = false;
    }

    initSelectionHandlers(section) {
        const contentArea = section.find('.ks-grid-table-content');
        contentArea.off('.gridtablelight');
        this.selectedCells = new Set();
        this.isMouseDown = false;
        this.activeCell = null;
        this.selectionAnchor = null;
        this.lastHoveredCell = null;

        contentArea.on('mousedown.gridtablelight', '.ks-grid-table-cell', this.handleMouseDown.bind(this));
        contentArea.on('mouseover.gridtablelight', '.ks-grid-table-cell', this.handleMouseOver.bind(this));
        contentArea.on('mouseup.gridtablelight', () => this.isMouseDown = false);
        contentArea.on('mouseleave.gridtablelight', () => this.isMouseDown = false);
        contentArea.on('dblclick.gridtablelight', '.ks-grid-table-cell', this.copySelectedCellsToClipboard.bind(this));
    }

    handleMouseDown(event) {
        if (!this.parameters || !this.parameters.allowCopyToClipBoard) {
            return;
        }
        this.isMouseDown = true;
        const cell = $(event.currentTarget);
        this.activeCell = cell;
        this.selectionAnchor = cell;
        this.selectedCells.clear();
        this.selectedCells.add(cell.attr('id'));
        this.row = cell.data('row');
        this.column = cell.data('col');
        this.updateSelectionUI();
    }

    handleMouseOver(event) {
        if (!this.parameters || !this.parameters.allowCopyToClipBoard || !this.isMouseDown) {
            return;
        }
        const cell = $(event.currentTarget);
        if (!this.selectionAnchor) {
            return;
        }
        this.selectRange(this.selectionAnchor, cell);
        this.updateSelectionUI();
    }

    selectRange(startCell, endCell) {
        const startRow = parseInt(startCell.data('row')); const startCol = parseInt(startCell.data('col'));
        const endRow = parseInt(endCell.data('row')); const endCol = parseInt(endCell.data('col'));
        const minRow = Math.min(startRow, endRow); const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol); const maxCol = Math.max(startCol, endCol);
        this.selectedCells.clear();
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                this.selectedCells.add(`${this.options.id}Cell${r}-${c}`);
            }
        }
    }

    updateSelectionUI() {
        const section = this.getSection();
        section.find('.ks-grid-table-cell.selected').removeClass('selected');
        section.find('.ks-grid-table-cell.active-cell').removeClass('active-cell');
        this.selectedCells.forEach(cellId => {
            section.find('#' + cellId).addClass('selected');
        });
        if (this.activeCell) {
            this.activeCell.addClass('active-cell');
        }
    }

    copySelectedCellsToClipboard() {
        if (!this.selectedCells || this.selectedCells.size === 0) {
            return;
        }
        const rows = new Map();
        let minCol = Infinity;
        let maxCol = -Infinity;
        this.selectedCells.forEach(cellId => {
            const cell = $('#' + cellId);
            const row = parseInt(cell.data('row'));
            const col = parseInt(cell.data('col'));
            const text = cell.find('.ks-text-title').text().trim();
            if (!rows.has(row)) {
                rows.set(row, new Map());
            }
            rows.get(row).set(col, text);
            if (col < minCol) minCol = col;
            if (col > maxCol) maxCol = col;
        });
        const sortedRows = new Map([...rows.entries()].sort((a, b) => a[0] - b[0]));
        let clipboardText = '';
        sortedRows.forEach((cols) => {
            let rowText = [];
            for (let c = minCol; c <= maxCol; c++) {
                rowText.push(cols.get(c) || '');
            }
            clipboardText += rowText.join('\t') + '\n';
        });
        navigator.clipboard.writeText(clipboardText).catch(() => {
            console.error('Copy error');
        });
    }

    handlePagerAction(action) {
        if (!this.state.pageSize) {
            return;
        }
        const totalPages = Math.max(1, Math.ceil(this.state.totalCount / (this.state.pageSize || 1)));
        let newPage = this.state.page || 1;
        switch (action) {
            case 'first':
                newPage = 1;
                break;
            case 'prev':
                newPage = Math.max(1, newPage - 1);
                break;
            case 'next':
                newPage = Math.min(totalPages, newPage + 1);
                break;
            case 'last':
                newPage = totalPages;
                break;
        }
        if (newPage === this.state.page) {
            return;
        }
        this.state.page = newPage;
        const extraParams = {
            page: newPage,
            pageSize: this.state.pageSize,
            skip: this.state.pageSize * (newPage - 1),
            take: this.state.pageSize
        };
        QB.loadData(this.options.id, this.name, false, 'init', extraParams).then((payload) => {
            this.updateContent(payload, () => $.Deferred().resolve(payload).promise());
            if (this.options.events && typeof this.options.events.afterPageChange === 'function') {
                this.options.events.afterPageChange({page: newPage, pageSize: this.state.pageSize, totalPages});
            }
        });
    }

    handleExport() {
        if (typeof GridTableExport === 'undefined' || !GridTableExport) {
            return;
        }
        const totalRows = this.state.totalCount;
        const hasAllData = !this.state.pageSize || totalRows === this.cellData.length;
        if (hasAllData) {
            GridTableExport.triggerExcelExport(this.options.id, this.parameters && this.parameters.exportConfig ? this.parameters.exportConfig : {});
            return;
        }
        const extraParams = {page: 1, pageSize: 0, exportAll: true};
        const previousState = {
            cellData: this.cellData,
            columns: this.state.columns,
            page: this.state.page,
            pageSize: this.state.pageSize,
            totalCount: this.state.totalCount
        };
        QB.loadData(this.options.id, this.name, false, 'init', extraParams).then((payload) => {
            const processed = this.processData(payload);
            this.cellData = processed.content;
            this.state.columns = processed.columns;
            GridTableExport.triggerExcelExport(this.options.id, this.parameters && this.parameters.exportConfig ? this.parameters.exportConfig : {});
            this.cellData = previousState.cellData;
            this.state.columns = previousState.columns;
            this.state.page = previousState.page;
            this.state.pageSize = previousState.pageSize;
            this.state.totalCount = previousState.totalCount;
        });
    }
}
;
