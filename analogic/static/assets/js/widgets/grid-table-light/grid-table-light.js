/* global Widget, Widgets, QB, Utils, GridTableExport, $, v */

'use strict';

class GridTableLightWidget extends Widget {

    constructor(options) {
        super(options);
        this.state = {
            page: 1,
            pageSize: typeof options.pageSize === 'number' ? options.pageSize : 25,
            totalCount: 0,
            columns: []
        };
        this.cellData = [];
        this.dom = {};
        this.boundHandlers = {};
        this.freezeRequest = null;
        Widgets[options.id] = this;
    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        delete this.row;
        delete this.column;
        return super.render(withState, refresh, useDefaultData, loadFunction, previouslyLoadedData);
    }

    getParameters(data) {
        return {
            allowCopyToClipBoard: this.getRealValue('allowCopyToClipBoard', data, false),
            allowFullContentUpdated: this.getRealValue('allowFullContentUpdated', data, true),
            columnDefaults: this.getRealValue('columnDefaults', data, {}),
            columns: this.getRealValue('columns', data, []),
            enableExport: this.getRealValue('enableExport', data, false),
            exportConfig: this.getRealValue('exportConfig', data, {}),
            freezeFirstColumns: parseInt(this.getRealValue('freezeFirstColumns', data, 0), 10) || 0,
            freezeHeader: this.getRealValue('freezeHeader', data, true),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            minWidth: this.getRealValue('minWidth', data, false),
            page: this.getRealValue('page', data, this.state.page || 1),
            pageSize: this.getRealValue('pageSize', data, this.state.pageSize || 25),
            rowHeight: this.getRealValue('rowHeight', data, false),
            skin: this.getRealValue('skin', data, this.options.skin || 'standard'),
            visible: this.getRealValue('visible', data, typeof this.options.visible === 'undefined' ? true : this.options.visible),
            width: this.getRealValue('width', data, false)
        };
    }

    processData(data) {
        const parameters = this.getParameters(data || {});
        let payload = data;
        if (Array.isArray(payload)) {
            payload = {content: payload};
        }
        payload = payload || {};

        const columns = (payload.columns || parameters.columns || []).map((column, index) => {
            const defaults = parameters.columnDefaults || {};
            const normalized = $.extend(true, {}, defaults, column || {});
            normalized.index = index;
            normalized.key = typeof normalized.key !== 'undefined' ? normalized.key : normalized.field || index;
            normalized.title = typeof normalized.title === 'undefined' ? (normalized.label || '') : normalized.title;
            normalized.alignment = normalized.alignment || defaults.alignment || 'center-left';
            normalized.width = typeof normalized.width === 'undefined' ? (defaults.width || false) : normalized.width;
            normalized.frozen = parameters.freezeFirstColumns > index;
            normalized.classes = normalized.classes || '';
            normalized.style = normalized.style || {};
            return normalized;
        });

        const content = (payload.content || []).map((row, rowIndex) => {
            return (row || []).map((cell, colIndex) => this.normalizeCell(cell, columns[colIndex], rowIndex, colIndex));
        });

        const totalCount = typeof payload.totalCount === 'number' ? payload.totalCount : content.length;
        const page = payload.page || parameters.page || 1;
        const pageSize = typeof payload.pageSize === 'number' ? payload.pageSize : parameters.pageSize || 25;

        return {
            parameters,
            columns,
            content,
            totalCount,
            page,
            pageSize,
            meta: payload.meta || {},
            visible: parameters.visible
        };
    }

    normalizeCell(cell, column, rowIndex, colIndex) {
        const columnDefaults = column && column.cellDefaults ? column.cellDefaults : {};
        const normalized = $.extend(true, {}, columnDefaults, cell || {});
        normalized.type = normalized.type || 'text';
        normalized.displayValue = typeof normalized.displayValue !== 'undefined' ? normalized.displayValue : (normalized.title || normalized.value || '');
        normalized.rawValue = typeof normalized.rawValue !== 'undefined' ? normalized.rawValue : normalized.displayValue;
        normalized.actions = normalized.actions || {};
        normalized.alignment = normalized.alignment || (column ? column.alignment : 'center-left') || 'center-left';
        normalized.classes = normalized.classes || '';
        normalized.style = normalized.style || {};
        normalized.tooltip = normalized.tooltip || (column && column.tooltip) || '';
        normalized.editable = normalized.editable || false;
        normalized.rowIndex = rowIndex;
        normalized.columnIndex = colIndex;
        normalized.id = `${this.options.id}_${rowIndex}_${colIndex}`;
        normalized.cellId = `${this.options.id}Cell${rowIndex}-${colIndex}`;
        normalized.width = typeof normalized.width === 'undefined' && column ? column.width : normalized.width;
        normalized.frozen = typeof normalized.frozen === 'boolean' ? normalized.frozen : column && column.frozen;
        return normalized;
    }

    buildRenderParts(processed) {
        const {parameters, columns, content} = processed;
        const headerHtml = this.buildHeaderHtml(columns, parameters);
        const bodyHtml = this.buildBodyHtml(content, parameters);
        const pagerHtml = this.buildPagerHtml(processed);
        const exportHtml = parameters.enableExport ? this.buildExportButton() : '';
        const styleParts = this.getGeneralStyles(parameters);
        if (parameters.width) {
            styleParts.push(`width:${Widget.getPercentOrPixel(parameters.width)};`);
        }
        if (parameters.minWidth) {
            styleParts.push(`min-width:${Widget.getPercentOrPixel(parameters.minWidth)};`);
        }
        if (parameters.hideIfNoData && content.length === 0) {
            styleParts.push('display:none;');
        }
        return {
            headerHtml,
            bodyHtml,
            pagerHtml,
            exportHtml,
            styleAttr: styleParts.join('')
        };
    }

    buildHeaderHtml(columns, parameters) {
        const cells = columns.map((column, index) => {
            const classes = ['ks-grid-table-cell'];
            if (column.classes) {
                classes.push(column.classes);
            }
            const styles = [];
            if (column.width) {
                styles.push(`width:${Widget.getPercentOrPixel(column.width)};`);
            }
            if (parameters.freezeHeader) {
                styles.push('position:sticky;top:0;z-index:4;');
            }
            if (column.style && typeof column.style === 'object') {
                Object.keys(column.style).forEach(key => {
                    const value = column.style[key];
                    if (value !== undefined && value !== null) {
                        styles.push(`${key}:${value};`);
                    }
                });
            }
            return `<div class="${classes.join(' ')}" data-col="${index}" data-column-key="${column.key}" data-frozen="${column.frozen ? 'true' : 'false'}" style="${styles.join('')}">
                <div class="ks-grid-table-cell-content ks-pos-${column.alignment || 'center-left'}">${column.headerTemplate || column.title || ''}</div>
            </div>`;
        });
        return `<div class="ks-grid-table-row">${cells.join('')}</div>`;
    }

    buildBodyHtml(content, parameters) {
        const rows = content.map((row, rowIndex) => {
            const rowStyles = [];
            if (parameters.rowHeight) {
                rowStyles.push(`height:${Widget.getPercentOrPixel(parameters.rowHeight)};`);
            }
            const cells = row.map((cell) => this.buildCellHtml(cell));
            return `<div class="ks-grid-table-row" data-row="${rowIndex}" style="${rowStyles.join('')}">${cells.join('')}</div>`;
        });
        return rows.join('');
    }

    buildCellHtml(cell) {
        const classes = ['ks-grid-table-cell'];
        if (cell.classes) {
            classes.push(cell.classes);
        }
        const styles = [];
        if (cell.width) {
            styles.push(`width:${Widget.getPercentOrPixel(cell.width)};`);
        }
        if (cell.style && typeof cell.style === 'object') {
            Object.keys(cell.style).forEach(key => {
                const value = cell.style[key];
                if (value !== undefined && value !== null) {
                    styles.push(`${key}:${value};`);
                }
            });
        }
        const contentHtml = this.buildCellContentHtml(cell);
        const styleAttr = styles.length ? ` style="${styles.join('')}"` : '';

        Widgets[cell.cellId] = Widgets[cell.cellId] || {};
        Widgets[cell.cellId].cell = cell;
        Widgets[cell.id] = Widgets[cell.id] || {};
        Widgets[cell.id].cell = cell;
        if (cell.type === 'combo') {
            Widgets[cell.id].items = cell.options || [];
            Widgets[cell.id].value = cell.rawValue;
        }

        return `<div id="${cell.cellId}" class="${classes.join(' ')}" data-row="${cell.rowIndex}" data-col="${cell.columnIndex}" data-frozen="${cell.frozen ? 'true' : 'false'}"${styleAttr}>
            <div class="ks-grid-table-cell-content ks-pos-${cell.alignment}">${contentHtml}</div>
        </div>`;
    }

    buildCellContentHtml(cell) {
        const clickAction = v('click.action', cell.actions) || (cell.type === 'button' ? 'launch' : 'text_click');
        const clickUpdate = v('click.updateValue', cell.actions) === false ? 'false' : 'true';
        const tooltip = cell.tooltip ? ` title="${Utils.htmlEncode(Utils.stripHtml(cell.tooltip))}"` : '';
        switch (cell.type) {
            case 'button':
                return `<button type="button" class="ks-grid-table-button" data-action="${clickAction}" data-update="${clickUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}">${cell.displayValue}</button>`;
            case 'combo': {
                const changeAction = v('change.action', cell.actions) || 'change';
                const changeUpdate = v('change.updateValue', cell.actions) === false ? 'false' : 'true';
                const optionsHtml = (cell.options || []).map(option => {
                    const value = option && typeof option.value !== 'undefined' ? option.value : '';
                    const label = option && typeof option.label !== 'undefined' ? option.label : value;
                    const selected = value === cell.rawValue ? 'selected' : '';
                    return `<option value="${Utils.htmlEncode(String(value))}" ${selected}>${Utils.htmlEncode(String(label))}</option>`;
                }).join('');
                return `<select class="ks-grid-table-select" data-action="${changeAction}" data-update="${changeUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}">${optionsHtml}</select>`;
            }
            case 'custom':
                return cell.html || '';
            case 'text':
            default:
                return `<div class="ks-grid-table-value" data-action="${clickAction}" data-update="${clickUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}"${tooltip}>${cell.displayValue}</div>`;
        }
    }

    buildPagerHtml(processed) {
        const {pageSize, totalCount, page} = processed;
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
        const buttonsHtml = buttons.map(btn => `<button type="button" class="ks-grid-table-pager-button" data-pager-action="${btn.action}" ${btn.disabled ? 'disabled' : ''}>${btn.label}</button>`).join('');
        return `<div class="ks-grid-table-pager-inner" data-page="${page}" data-total-pages="${totalPages}">${buttonsHtml}<span class="ks-grid-table-pager-info">${page} / ${totalPages}</span></div>`;
    }

    buildExportButton() {
        return `<button type="button" class="ks-grid-table-export" data-action="export" data-id="${this.options.id}"><span class="icon-download"></span></button>`;
    }

    composeOuterHtml(parts, parameters) {
        return `<div class="ks-grid-table-light" data-widget-id="${this.options.id}" style="${parts.styleAttr}">
            ${parts.exportHtml ? `<div class="ks-grid-table-light-actions" data-role="actions">${parts.exportHtml}</div>` : ''}
            <div class="ks-grid-table ks-grid-table-${parameters.skin}">
                <div class="ks-grid-table-head" data-role="head">${parts.headerHtml}</div>
                <div class="ks-grid-table-content" data-role="body">${parts.bodyHtml}</div>
            </div>
            ${parts.pagerHtml ? `<div class="ks-grid-table-light-pager" data-role="pager">${parts.pagerHtml}</div>` : ''}
        </div>`;
    }

    getHtml(widgetHtmls, data) {
        const processed = data && data.parameters ? data : this.processData(data || {});
        this.afterProcess(processed);
        const parts = this.buildRenderParts(processed);
        return this.composeOuterHtml(parts, processed.parameters);
    }

    updateHtml(processed) {
        this.afterProcess(processed);
        const section = this.getSection();
        if (!section.length) {
            return;
        }
        const container = section[0];
        const parts = this.buildRenderParts(processed);
        container.innerHTML = this.composeOuterHtml(parts, processed.parameters);
        this.bindDom(container);
        this.attachEvents();
        this.scheduleStickyUpdate();
    }

    afterProcess(processed) {
        this.state.columns = processed.columns;
        this.state.page = processed.page;
        this.state.pageSize = processed.pageSize;
        this.state.totalCount = processed.totalCount;
        this.cellData = processed.content;
        this.parameters = processed.parameters;
        Widgets[this.options.id] = this;
        Widgets[this.options.id].cellData = this.cellData;
    }

    bindDom(sectionElement) {
        this.dom = {};
        if (!sectionElement) {
            return;
        }
        const root = sectionElement.querySelector('.ks-grid-table-light');
        if (!root) {
            return;
        }
        this.dom.root = root;
        this.dom.table = root.querySelector('.ks-grid-table');
        this.dom.head = root.querySelector('[data-role="head"]');
        this.dom.body = root.querySelector('[data-role="body"]');
        this.dom.pager = root.querySelector('[data-role="pager"]');
    }

    detachEvents() {
        const root = this.dom.root;
        if (root && this.boundHandlers.click) {
            root.removeEventListener('click', this.boundHandlers.click);
        }
        if (root && this.boundHandlers.contextmenu) {
            root.removeEventListener('contextmenu', this.boundHandlers.contextmenu);
        }
        if (this.dom.body && this.boundHandlers.mousedown) {
            this.dom.body.removeEventListener('mousedown', this.boundHandlers.mousedown);
        }
        if (this.dom.body && this.boundHandlers.mouseover) {
            this.dom.body.removeEventListener('mouseover', this.boundHandlers.mouseover);
        }
        if (this.dom.body && this.boundHandlers.mouseup) {
            this.dom.body.removeEventListener('mouseup', this.boundHandlers.mouseup);
        }
        if (this.dom.body && this.boundHandlers.mouseleave) {
            this.dom.body.removeEventListener('mouseleave', this.boundHandlers.mouseleave);
        }
        if (this.dom.body && this.boundHandlers.dblclick) {
            this.dom.body.removeEventListener('dblclick', this.boundHandlers.dblclick);
        }
        if (root && this.boundHandlers.change) {
            root.removeEventListener('change', this.boundHandlers.change, true);
        }
        if (this.boundHandlers.resize) {
            window.removeEventListener('resize', this.boundHandlers.resize);
        }
        this.boundHandlers = {};
    }

    attachEvents() {
        this.detachEvents();
        const root = this.dom.root;
        if (!root) {
            return;
        }
        this.boundHandlers.click = this.handleClick.bind(this);
        this.boundHandlers.change = this.handleChange.bind(this);
        this.boundHandlers.contextmenu = this.handleContextMenu.bind(this);
        root.addEventListener('click', this.boundHandlers.click);
        root.addEventListener('change', this.boundHandlers.change, true);
        root.addEventListener('contextmenu', this.boundHandlers.contextmenu);

        if (this.dom.body && this.parameters && this.parameters.allowCopyToClipBoard) {
            this.initSelectionState();
            this.boundHandlers.mousedown = this.handleMouseDown.bind(this);
            this.boundHandlers.mouseover = this.handleMouseOver.bind(this);
            this.boundHandlers.mouseup = this.handleMouseUp.bind(this);
            this.boundHandlers.mouseleave = this.handleMouseLeave.bind(this);
            this.boundHandlers.dblclick = this.handleDoubleClick.bind(this);
            this.dom.body.addEventListener('mousedown', this.boundHandlers.mousedown);
            this.dom.body.addEventListener('mouseover', this.boundHandlers.mouseover);
            this.dom.body.addEventListener('mouseup', this.boundHandlers.mouseup);
            this.dom.body.addEventListener('mouseleave', this.boundHandlers.mouseleave);
            this.dom.body.addEventListener('dblclick', this.boundHandlers.dblclick);
        } else {
            this.destroySelectionState();
        }

        this.boundHandlers.resize = this.scheduleStickyUpdate.bind(this);
        window.addEventListener('resize', this.boundHandlers.resize);
    }

    initSelectionState() {
        this.selection = {
            activeCellId: null,
            anchorCellId: null,
            selectedIds: new Set(),
            isMouseDown: false
        };
    }

    destroySelectionState() {
        if (this.selection) {
            if (this.dom.body) {
                this.dom.body.querySelectorAll('.ks-grid-table-cell.selected').forEach(el => el.classList.remove('selected'));
                this.dom.body.querySelectorAll('.ks-grid-table-cell.active-cell').forEach(el => el.classList.remove('active-cell'));
            }
        }
        this.selection = null;
    }

    handleClick(event) {
        const pagerButton = event.target.closest('[data-pager-action]');
        if (pagerButton && this.dom.root && this.dom.root.contains(pagerButton)) {
            event.preventDefault();
            this.handlePagerAction(pagerButton.getAttribute('data-pager-action'));
            return;
        }
        const exportButton = event.target.closest('[data-action="export"]');
        if (exportButton && this.dom.root && this.dom.root.contains(exportButton)) {
            event.preventDefault();
            this.handleExport();
            return;
        }
        const actionable = event.target.closest('[data-action]');
        if (!actionable || actionable.tagName === 'SELECT') {
            return;
        }
        if (!this.dom.root.contains(actionable)) {
            return;
        }
        const cellElement = actionable.closest('.ks-grid-table-cell');
        if (cellElement) {
            this.updateCurrentCellFromElement(cellElement);
        }
        const element = $(actionable);
        const updateValue = actionable.getAttribute('data-update') !== 'false';
        Widget.doHandleGridTableSystemEvent(element, event, updateValue);
    }

    handleChange(event) {
        const target = event.target;
        if (!target || target.tagName !== 'SELECT' || !target.hasAttribute('data-action')) {
            return;
        }
        if (!this.dom.root || !this.dom.root.contains(target)) {
            return;
        }
        const cellElement = target.closest('.ks-grid-table-cell');
        if (cellElement) {
            this.updateCurrentCellFromElement(cellElement);
        }
        const element = $(target);
        element.data('value', target.value);
        const widgetId = target.getAttribute('data-id');
        if (widgetId && Widgets[widgetId]) {
            Widgets[widgetId].value = target.value;
        }
        if (cellElement) {
            const rowIndex = parseInt(cellElement.getAttribute('data-row'), 10);
            const columnIndex = parseInt(cellElement.getAttribute('data-col'), 10);
            if (this.cellData[rowIndex] && this.cellData[rowIndex][columnIndex]) {
                const selectedOption = target.options[target.selectedIndex];
                this.cellData[rowIndex][columnIndex].rawValue = target.value;
                if (selectedOption) {
                    this.cellData[rowIndex][columnIndex].displayValue = selectedOption.text;
                }
            }
            Widgets[this.options.id].cellData = this.cellData;
        }
        const updateValue = target.getAttribute('data-update') !== 'false';
        Widget.doHandleGridTableSystemEvent(element, event, updateValue);
    }

    handleContextMenu(event) {
        const cellElement = event.target.closest('.ks-grid-table-cell');
        if (!cellElement || !this.dom.root || !this.dom.root.contains(cellElement)) {
            return;
        }
        this.updateCurrentCellFromElement(cellElement);
        const proxyElement = $('<div>').data({
            action: 'rightclick',
            id: `${this.options.id}_${this.row}_${this.column}`
        });
        Widget.doHandleGridTableSystemEvent(proxyElement, event);
    }

    updateCurrentCellFromElement(cellElement) {
        const rowIndex = parseInt(cellElement.getAttribute('data-row'), 10);
        const columnIndex = parseInt(cellElement.getAttribute('data-col'), 10);
        this.row = rowIndex;
        this.column = columnIndex;
        Widgets[this.options.id].row = rowIndex;
        Widgets[this.options.id].column = columnIndex;
        if (this.selection) {
            this.selection.activeCellId = cellElement.id;
        }
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
            this.updateContent(payload);
            if (this.options.events && typeof this.options.events.afterPageChange === 'function') {
                const totalPagesAfter = Math.max(1, Math.ceil(this.state.totalCount / (this.state.pageSize || 1)));
                this.options.events.afterPageChange({page: newPage, pageSize: this.state.pageSize, totalPages: totalPagesAfter});
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
            totalCount: this.state.totalCount,
            parameters: this.parameters
        };
        QB.loadData(this.options.id, this.name, false, 'init', extraParams).then((payload) => {
            const processed = this.processData(payload);
            this.cellData = processed.content;
            this.state.columns = processed.columns;
            this.parameters = processed.parameters;
            Widgets[this.options.id].cellData = this.cellData;
            GridTableExport.triggerExcelExport(this.options.id, this.parameters && this.parameters.exportConfig ? this.parameters.exportConfig : {});
            this.cellData = previousState.cellData;
            this.state.columns = previousState.columns;
            this.state.page = previousState.page;
            this.state.pageSize = previousState.pageSize;
            this.state.totalCount = previousState.totalCount;
            this.parameters = previousState.parameters;
            Widgets[this.options.id].cellData = this.cellData;
        });
    }

    handleMouseDown(event) {
        if (!this.selection || event.button !== 0) {
            return;
        }
        if (event.target && ['SELECT', 'INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
            return;
        }
        const cell = event.target.closest('.ks-grid-table-cell');
        if (!cell || !this.dom.body.contains(cell)) {
            return;
        }
        event.preventDefault();
        this.selection.isMouseDown = true;
        this.selection.anchorCellId = cell.id;
        this.selection.activeCellId = cell.id;
        this.selection.selectedIds = new Set([cell.id]);
        this.updateCurrentCellFromElement(cell);
        this.updateSelectionUI();
    }

    handleMouseOver(event) {
        if (!this.selection || !this.selection.isMouseDown) {
            return;
        }
        const cell = event.target.closest('.ks-grid-table-cell');
        if (!cell || !this.dom.body.contains(cell)) {
            return;
        }
        this.selection.activeCellId = cell.id;
        this.selectRange(this.selection.anchorCellId, cell.id);
        this.updateSelectionUI();
    }

    handleMouseUp() {
        if (this.selection) {
            this.selection.isMouseDown = false;
        }
    }

    handleMouseLeave() {
        if (this.selection) {
            this.selection.isMouseDown = false;
        }
    }

    handleDoubleClick() {
        this.copySelectedCellsToClipboard();
    }

    selectRange(startId, endId) {
        if (!startId || !endId) {
            return;
        }
        const parsePosition = (id) => {
            const parts = id.replace(`${this.options.id}Cell`, '').split('-');
            return {row: parseInt(parts[0], 10), col: parseInt(parts[1], 10)};
        };
        const start = parsePosition(startId);
        const end = parsePosition(endId);
        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        const selected = new Set();
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                selected.add(`${this.options.id}Cell${r}-${c}`);
            }
        }
        this.selection.selectedIds = selected;
    }

    updateSelectionUI() {
        if (!this.selection || !this.dom.body) {
            return;
        }
        this.dom.body.querySelectorAll('.ks-grid-table-cell.selected').forEach(el => el.classList.remove('selected'));
        this.dom.body.querySelectorAll('.ks-grid-table-cell.active-cell').forEach(el => el.classList.remove('active-cell'));
        this.selection.selectedIds.forEach(id => {
            const cell = document.getElementById(id);
            if (cell) {
                cell.classList.add('selected');
            }
        });
        if (this.selection.activeCellId) {
            const activeCell = document.getElementById(this.selection.activeCellId);
            if (activeCell) {
                activeCell.classList.add('active-cell');
            }
        }
    }

    copySelectedCellsToClipboard() {
        if (!this.selection || !this.selection.selectedIds || this.selection.selectedIds.size === 0) {
            return;
        }
        const rows = new Map();
        let minCol = Infinity;
        let maxCol = -Infinity;
        this.selection.selectedIds.forEach(id => {
            const cell = document.getElementById(id);
            if (!cell) {
                return;
            }
            const row = parseInt(cell.getAttribute('data-row'), 10);
            const col = parseInt(cell.getAttribute('data-col'), 10);
            const text = cell.textContent.trim();
            if (!rows.has(row)) {
                rows.set(row, new Map());
            }
            rows.get(row).set(col, text);
            if (col < minCol) {
                minCol = col;
            }
            if (col > maxCol) {
                maxCol = col;
            }
        });
        const sortedRows = Array.from(rows.entries()).sort((a, b) => a[0] - b[0]);
        const clipboardLines = sortedRows.map(([rowIndex, cols]) => {
            const values = [];
            for (let c = minCol; c <= maxCol; c++) {
                values.push(cols.get(c) || '');
            }
            return values.join('\t');
        });
        const clipboardText = clipboardLines.join('\n');
        if (clipboardText) {
            navigator.clipboard.writeText(clipboardText).catch(() => {
                console.error('GridTableLightWidget: Unable to copy to clipboard');
            });
        }
    }

    scheduleStickyUpdate() {
        if (this.freezeRequest) {
            cancelAnimationFrame(this.freezeRequest);
        }
        this.freezeRequest = requestAnimationFrame(() => {
            this.freezeRequest = null;
            this.applyColumnFreezing();
        });
    }

    applyColumnFreezing() {
        if (!this.dom.table) {
            return;
        }
        this.clearFrozenStyles();
        const freezeCount = this.parameters && this.parameters.freezeFirstColumns ? parseInt(this.parameters.freezeFirstColumns, 10) : 0;
        if (!freezeCount) {
            return;
        }
        const headerRow = this.dom.head ? this.dom.head.querySelector('.ks-grid-table-row') : null;
        if (!headerRow) {
            return;
        }
        const headerCells = Array.from(headerRow.children);
        const offsets = [];
        let runningLeft = 0;
        for (let i = 0; i < freezeCount && i < headerCells.length; i++) {
            const cell = headerCells[i];
            cell.classList.add('ks-grid-table-cell-frozen');
            cell.style.left = `${runningLeft}px`;
            const width = cell.getBoundingClientRect().width;
            offsets.push(runningLeft);
            runningLeft += width;
        }
        if (!offsets.length) {
            return;
        }
        const bodyRows = this.dom.body ? this.dom.body.querySelectorAll('.ks-grid-table-row') : [];
        bodyRows.forEach(row => {
            const cells = row.children;
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (i < offsets.length) {
                    cell.classList.add('ks-grid-table-cell-frozen');
                    cell.style.left = `${offsets[i]}px`;
                }
            }
        });
    }

    clearFrozenStyles() {
        if (!this.dom.root) {
            return;
        }
        this.dom.root.querySelectorAll('.ks-grid-table-cell-frozen').forEach(cell => {
            cell.classList.remove('ks-grid-table-cell-frozen');
            cell.style.left = '';
        });
    }

    initEvents() {
        const section = this.getSection();
        if (!section.length) {
            this.isRendering = false;
            return;
        }
        this.bindDom(section[0]);
        this.attachEvents();
        this.scheduleStickyUpdate();
        this.isRendering = false;
    }
}

;
