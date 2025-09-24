/* global Widget, Widgets, QB, Utils, GridTableExport, $, v */

'use strict';

const GRID_TABLE_LIGHT_CLASSES = {
    root: 'ks-grid-table-light',
    skinPrefix: 'ks-grid-table-light--skin-',
    table: 'ks-grid-table-light_table',
    inner: 'ks-grid-table-light_inner',
    head: 'ks-grid-table-light_head',
    body: 'ks-grid-table-light_body',
    row: 'ks-grid-table-light_row',
    cell: 'ks-grid-table-light_cell',
    cellContent: 'ks-grid-table-light_cell-content',
    cellValue: 'ks-grid-table-light_value',
    cellFrozen: 'ks-grid-table-light_cell--frozen',
    cellSelected: 'ks-grid-table-light_cell--selected',
    cellActive: 'ks-grid-table-light_cell--active',
    button: 'ks-grid-table-light_button',
    select: 'ks-grid-table-light_select',
    input: 'ks-grid-table-light_input',
    actions: 'ks-grid-table-light_actions',
    exportButton: 'ks-grid-table-light_export',
    pager: 'ks-grid-table-light_pager',
    pagerInner: 'ks-grid-table-light_pager-inner',
    pagerButton: 'ks-grid-table-light_pager-button',
    pagerInfo: 'ks-grid-table-light_pager-info'
};

class GridTableLightWidget extends Widget {

    constructor(options) {
        super(options);
        this.options.originalId = this.options.originalId || this.options.id;
        if (typeof this.options.exportIcon === 'undefined') {
            this.options.exportIcon = 'icon-tray-arrow-down';
        }
        this.state = {
            page: 1,
            pageSize: typeof options.pageSize === 'number' ? options.pageSize : 100,
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
        const statePageSize = typeof this.state.pageSize === 'number' ? this.state.pageSize : 100;
        return {
            allowCopyToClipBoard: this.getRealValue('allowCopyToClipBoard', data, false),
            allowFullContentUpdated: this.getRealValue('allowFullContentUpdated', data, true),
            columnDefaults: this.getRealValue('columnDefaults', data, {}),
            columns: this.getRealValue('columns', data, []),
            enableExport: this.getRealValue('enableExport', data, false),
            exportIcon: this.getRealValue('exportIcon', data, this.options.exportIcon || 'icon-tray-arrow-down'),
            exportConfig: this.getRealValue('exportConfig', data, {}),
            freezeFirstColumns: parseInt(this.getRealValue('freezeFirstColumns', data, 0), 10) || 0,
            freezeHeader: this.getRealValue('freezeHeader', data, true),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            minWidth: this.getRealValue('minWidth', data, false),
            page: this.getRealValue('page', data, this.state.page || 1),
            pageSize: this.getRealValue('pageSize', data, statePageSize),
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
        const fallbackPageSize = typeof parameters.pageSize === 'number' ? parameters.pageSize : 100;
        const pageSize = typeof payload.pageSize === 'number' ? payload.pageSize : fallbackPageSize;

        return {
            parameters,
            columns,
            content,
            totalCount,
            page,
            pageSize,
            meta: payload.meta || {},
            visible: parameters.visible,
            originalId: this.options.originalId
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
        normalized.editable = !!normalized.editable;
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
        const exportHtml = parameters.enableExport ? this.buildExportButton(parameters) : '';
        const styleParts = this.getGeneralStyles(parameters);
        const headStyles = [];
        if (parameters.freezeHeader) {
            headStyles.push('position:sticky;top:0;z-index:5;');
        }
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
            styleAttr: styleParts.join(''),
            headStyleAttr: headStyles.join('')
        };
    }

    buildHeaderHtml(columns, parameters) {
        const cells = columns.map((column, index) => {
            const classes = [GRID_TABLE_LIGHT_CLASSES.cell];
            if (column.classes) {
                classes.push(column.classes);
            }
            const styles = [];
            if (column.width) {
                const resolvedWidth = Widget.getPercentOrPixel(column.width);
                styles.push(`width:${resolvedWidth};`);
                styles.push(`flex:0 0 ${resolvedWidth};`);
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
                <div class="${GRID_TABLE_LIGHT_CLASSES.cellContent} ks-pos-${column.alignment || 'center-left'}">${column.headerTemplate || column.title || ''}</div>
            </div>`;
        });
        return `<div class="${GRID_TABLE_LIGHT_CLASSES.row}">${cells.join('')}</div>`;
    }

    buildBodyHtml(content, parameters) {
        const rows = content.map((row, rowIndex) => {
            const rowStyles = [];
            if (parameters.rowHeight) {
                rowStyles.push(`height:${Widget.getPercentOrPixel(parameters.rowHeight)};`);
            }
            const cells = row.map((cell) => this.buildCellHtml(cell));
            return `<div class="${GRID_TABLE_LIGHT_CLASSES.row}" data-row="${rowIndex}" style="${rowStyles.join('')}">${cells.join('')}</div>`;
        });
        return rows.join('');
    }

    buildCellHtml(cell) {
        const classes = [GRID_TABLE_LIGHT_CLASSES.cell];
        if (cell.classes) {
            classes.push(cell.classes);
        }
        const styles = [];
        if (cell.width) {
            const resolvedWidth = Widget.getPercentOrPixel(cell.width);
            styles.push(`width:${resolvedWidth};`);
            styles.push(`flex:0 0 ${resolvedWidth};`);
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

        return `<div id="${cell.cellId}" class="${classes.join(' ')}" data-row="${cell.rowIndex}" data-col="${cell.columnIndex}" data-frozen="${cell.frozen ? 'true' : 'false'}"${styleAttr}>
            <div class="${GRID_TABLE_LIGHT_CLASSES.cellContent} ks-pos-${cell.alignment}">${contentHtml}</div>
        </div>`;
    }

    buildCellContentHtml(cell) {
        const clickAction = v('click.action', cell.actions) || (cell.type === 'button' ? 'launch' : 'text_click');
        const clickUpdate = v('click.updateValue', cell.actions) === false ? 'false' : 'true';
        const tooltip = cell.tooltip ? ` title="${Utils.htmlEncode(Utils.stripHtml(cell.tooltip))}"` : '';
        switch (cell.type) {
            case 'button':
                return `<button type="button" class="${GRID_TABLE_LIGHT_CLASSES.button}" data-action="${clickAction}" data-update="${clickUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}">${cell.displayValue}</button>`;
            case 'combo': {
                const changeAction = v('change.action', cell.actions) || 'change';
                const changeUpdate = v('change.updateValue', cell.actions) === false ? 'false' : 'true';
                const optionsHtml = (cell.options || []).map(option => {
                    const value = option && typeof option.value !== 'undefined' ? option.value : '';
                    const label = option && typeof option.label !== 'undefined' ? option.label : value;
                    const selected = value === cell.rawValue ? 'selected' : '';
                    return `<option value="${Utils.htmlEncode(String(value))}" ${selected}>${Utils.htmlEncode(String(label))}</option>`;
                }).join('');
                return `<select class="${GRID_TABLE_LIGHT_CLASSES.select}" data-action="${changeAction}" data-update="${changeUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}">${optionsHtml}</select>`;
            }
            case 'custom':
                return cell.html || '';
            case 'text':
            default: {
                const changeAction = v('change.action', cell.actions) || 'text_change';
                const changeUpdate = v('change.updateValue', cell.actions) === false ? 'false' : 'true';
                const attrs = [`data-action="${clickAction}"`, `data-update="${clickUpdate}"`, `data-id="${cell.id}"`, `data-cell-id="${cell.cellId}"`];
                if (cell.editable) {
                    attrs.push('data-editable="true"');
                    attrs.push(`data-change-action="${changeAction}"`);
                    attrs.push(`data-change-update="${changeUpdate}"`);
                }
                return `<div class="${GRID_TABLE_LIGHT_CLASSES.cellValue}" ${attrs.join(' ')}${tooltip}>${cell.displayValue}</div>`;
            }
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
        const buttonsHtml = buttons.map(btn => `<button type="button" class="${GRID_TABLE_LIGHT_CLASSES.pagerButton}" data-pager-action="${btn.action}" ${btn.disabled ? 'disabled' : ''}>${btn.label}</button>`).join('');
        return `<div class="${GRID_TABLE_LIGHT_CLASSES.pagerInner}" data-page="${page}" data-total-pages="${totalPages}">${buttonsHtml}<span class="${GRID_TABLE_LIGHT_CLASSES.pagerInfo}">${page} / ${totalPages}</span></div>`;
    }

    buildExportButton(parameters) {
        const iconClass = parameters && parameters.exportIcon ? parameters.exportIcon : 'icon-tray-arrow-down';
        return `<button type="button" class="${GRID_TABLE_LIGHT_CLASSES.exportButton}" data-action="export" data-id="${this.options.id}"><span class="${iconClass}"></span></button>`;
    }

    composeOuterHtml(parts, parameters) {
        const headAttr = parts.headStyleAttr ? ` style="${parts.headStyleAttr}"` : '';
        const skinClass = parameters.skin ? `${GRID_TABLE_LIGHT_CLASSES.skinPrefix}${parameters.skin}` : '';
        const rootClasses = [GRID_TABLE_LIGHT_CLASSES.root];
        if (skinClass) {
            rootClasses.push(skinClass);
        }
        return `<div class="${rootClasses.join(' ')}" data-widget-id="${this.options.id}" style="${parts.styleAttr}">
            ${parts.exportHtml ? `<div class="${GRID_TABLE_LIGHT_CLASSES.actions}" data-role="actions">${parts.exportHtml}</div>` : ''}
            <div class="${GRID_TABLE_LIGHT_CLASSES.table}" data-role="table">
                <div class="${GRID_TABLE_LIGHT_CLASSES.inner}">
                    <div class="${GRID_TABLE_LIGHT_CLASSES.head}"${headAttr} data-role="head">${parts.headerHtml}</div>
                    <div class="${GRID_TABLE_LIGHT_CLASSES.body}" data-role="body">${parts.bodyHtml}</div>
                </div>
            </div>
            ${parts.pagerHtml ? `<div class="${GRID_TABLE_LIGHT_CLASSES.pager}" data-role="pager">${parts.pagerHtml}</div>` : ''}
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
        const root = sectionElement.querySelector('.' + GRID_TABLE_LIGHT_CLASSES.root);
        if (!root) {
            return;
        }
        this.dom.root = root;
        this.dom.table = root.querySelector('.' + GRID_TABLE_LIGHT_CLASSES.table);
        this.dom.inner = root.querySelector('.' + GRID_TABLE_LIGHT_CLASSES.inner);
        this.dom.head = root.querySelector('.' + GRID_TABLE_LIGHT_CLASSES.head);
        this.dom.body = root.querySelector('.' + GRID_TABLE_LIGHT_CLASSES.body);
        this.dom.pager = root.querySelector('.' + GRID_TABLE_LIGHT_CLASSES.pager);
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
        if (this.dom.body && this.boundHandlers.scroll) {
            this.dom.body.removeEventListener('scroll', this.boundHandlers.scroll);
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
            this.dom.body.addEventListener('mousedown', this.boundHandlers.mousedown);
            this.dom.body.addEventListener('mouseover', this.boundHandlers.mouseover);
            this.dom.body.addEventListener('mouseup', this.boundHandlers.mouseup);
            this.dom.body.addEventListener('mouseleave', this.boundHandlers.mouseleave);
        } else {
            this.destroySelectionState();
        }

        if (this.dom.body) {
            this.boundHandlers.dblclick = this.handleDoubleClick.bind(this);
            this.dom.body.addEventListener('dblclick', this.boundHandlers.dblclick);
            this.boundHandlers.scroll = this.handleBodyScroll.bind(this);
            this.dom.body.addEventListener('scroll', this.boundHandlers.scroll);
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
                this.dom.body.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.cell}.${GRID_TABLE_LIGHT_CLASSES.cellSelected}`).forEach(el => el.classList.remove(GRID_TABLE_LIGHT_CLASSES.cellSelected));
                this.dom.body.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.cell}.${GRID_TABLE_LIGHT_CLASSES.cellActive}`).forEach(el => el.classList.remove(GRID_TABLE_LIGHT_CLASSES.cellActive));
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
        const cellElement = actionable.closest(`.${GRID_TABLE_LIGHT_CLASSES.cell}`);
        if (actionable.tagName === 'INPUT') {
            if (cellElement) {
                this.updateCurrentCellFromElement(cellElement);
            }
            return;
        }
        if (cellElement) {
            this.updateCurrentCellFromElement(cellElement);
        }
        const element = $(actionable);
        const updateValue = actionable.getAttribute('data-update') !== 'false';
        const actionName = actionable.getAttribute('data-action');
        this.storeEventValues(actionName, element.data(), updateValue);
        Widget.doHandleGridTableSystemEvent(element, event, updateValue);
    }

    handleChange(event) {
        const target = event.target;
        if (!target || !target.hasAttribute('data-action')) {
            return;
        }
        if (!this.dom.root || !this.dom.root.contains(target)) {
            return;
        }
        const cellElement = target.closest(`.${GRID_TABLE_LIGHT_CLASSES.cell}`);
        if (cellElement) {
            this.updateCurrentCellFromElement(cellElement);
        }
        const element = $(target);
        let value = target.value;
        if (target.tagName === 'INPUT') {
            value = target.value;
        }
        element.data('value', value);
        if (cellElement) {
            const rowIndex = parseInt(cellElement.getAttribute('data-row'), 10);
            const columnIndex = parseInt(cellElement.getAttribute('data-col'), 10);
            if (this.cellData[rowIndex] && this.cellData[rowIndex][columnIndex]) {
                const cell = this.cellData[rowIndex][columnIndex];
                cell.rawValue = value;
                if (target.tagName === 'SELECT') {
                    const selectedOption = target.options[target.selectedIndex];
                    if (selectedOption) {
                        cell.displayValue = selectedOption.text;
                    }
                } else {
                    cell.displayValue = value;
                }
            }
            Widgets[this.options.id].cellData = this.cellData;
        }
        const updateValue = target.getAttribute('data-update') !== 'false';
        const actionName = target.getAttribute('data-action');
        this.storeEventValues(actionName, element.data(), updateValue);
        Widget.doHandleGridTableSystemEvent(element, event, updateValue);
    }

    handleContextMenu(event) {
        const cellElement = event.target.closest(`.${GRID_TABLE_LIGHT_CLASSES.cell}`);
        if (!cellElement || !this.dom.root || !this.dom.root.contains(cellElement)) {
            return;
        }
        this.updateCurrentCellFromElement(cellElement);
        event.preventDefault();
        const cellWidgetId = `${this.options.id}_${this.row}_${this.column}`;
        Widgets['rightclick'] = cellWidgetId;
        this.storeEventValues('rightclick', {action: 'rightclick', id: cellWidgetId}, true);
        const proxyElement = $('<div>').data({
            action: 'rightclick',
            id: cellWidgetId
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

    storeEventValues(actionName, data, updateValue = true) {
        if (!updateValue || !actionName || !data) {
            return;
        }
        const widgetStore = Widgets[this.options.id];
        if (!widgetStore) {
            return;
        }
        const cloned = $.extend(true, {}, data);
        widgetStore[actionName] = cloned;
        if (typeof cloned.value !== 'undefined') {
            widgetStore.value = cloned.value;
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
        const cell = event.target.closest(`.${GRID_TABLE_LIGHT_CLASSES.cell}`);
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
        const cell = event.target.closest(`.${GRID_TABLE_LIGHT_CLASSES.cell}`);
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

    handleDoubleClick(event) {
        if (!this.dom.body) {
            return;
        }
        const cellElement = event.target.closest(`.${GRID_TABLE_LIGHT_CLASSES.cell}`);
        if (cellElement && this.dom.body.contains(cellElement)) {
            this.updateCurrentCellFromElement(cellElement);
            const cell = this.getCellFromElement(cellElement);
            if (cell && cell.type === 'text' && cell.editable) {
                event.preventDefault();
                this.startTextEdit(cellElement);
                return;
            }
        }
        if (this.parameters && this.parameters.allowCopyToClipBoard) {
            this.copySelectedCellsToClipboard();
        }
    }

    handleBodyScroll() {
        if (this.dom.head && this.dom.body) {
            this.dom.head.scrollLeft = this.dom.body.scrollLeft;
        }
        this.scheduleStickyUpdate();
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
        this.dom.body.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.cell}.${GRID_TABLE_LIGHT_CLASSES.cellSelected}`).forEach(el => el.classList.remove(GRID_TABLE_LIGHT_CLASSES.cellSelected));
        this.dom.body.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.cell}.${GRID_TABLE_LIGHT_CLASSES.cellActive}`).forEach(el => el.classList.remove(GRID_TABLE_LIGHT_CLASSES.cellActive));
        this.selection.selectedIds.forEach(id => {
            const cell = document.getElementById(id);
            if (cell) {
                cell.classList.add(GRID_TABLE_LIGHT_CLASSES.cellSelected);
            }
        });
        if (this.selection.activeCellId) {
            const activeCell = document.getElementById(this.selection.activeCellId);
            if (activeCell) {
                activeCell.classList.add(GRID_TABLE_LIGHT_CLASSES.cellActive);
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

    getCellFromElement(cellElement) {
        if (!cellElement) {
            return null;
        }
        const rowIndex = parseInt(cellElement.getAttribute('data-row'), 10);
        const columnIndex = parseInt(cellElement.getAttribute('data-col'), 10);
        if (Number.isNaN(rowIndex) || Number.isNaN(columnIndex)) {
            return null;
        }
        return this.cellData[rowIndex] && this.cellData[rowIndex][columnIndex] ? this.cellData[rowIndex][columnIndex] : null;
    }

    startTextEdit(cellElement) {
        if (!cellElement || cellElement.dataset.editing === 'true') {
            return;
        }
        const cell = this.getCellFromElement(cellElement);
        if (!cell || cell.type !== 'text' || !cell.editable) {
            return;
        }
        const valueWrapper = cellElement.querySelector(`.${GRID_TABLE_LIGHT_CLASSES.cellValue}`);
        if (!valueWrapper) {
            return;
        }
        const changeAction = valueWrapper.getAttribute('data-change-action') || 'text_change';
        const changeUpdate = valueWrapper.getAttribute('data-change-update') || 'true';
        const rawValue = typeof cell.rawValue !== 'undefined' && cell.rawValue !== null ? cell.rawValue : cell.displayValue;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = GRID_TABLE_LIGHT_CLASSES.input;
        input.value = rawValue === null || typeof rawValue === 'undefined' ? '' : rawValue;
        input.setAttribute('data-action', changeAction);
        input.setAttribute('data-update', changeUpdate);
        input.setAttribute('data-id', cell.id);
        input.setAttribute('data-cell-id', cell.cellId);
        if (cell.tooltip) {
            input.setAttribute('title', Utils.htmlEncode(Utils.stripHtml(cell.tooltip)));
        }

        const contentContainer = cellElement.querySelector(`.${GRID_TABLE_LIGHT_CLASSES.cellContent}`) || cellElement;
        valueWrapper.dataset.originalValue = valueWrapper.textContent;
        valueWrapper.style.display = 'none';
        contentContainer.appendChild(input);
        cellElement.dataset.editing = 'true';

        let isFinalized = false;
        const finalize = (commit) => {
            if (isFinalized) {
                return;
            }
            isFinalized = true;
            input.removeEventListener('blur', onBlur);
            input.removeEventListener('keydown', onKeyDown);
            this.finishTextEdit(cellElement, input, commit);
        };
        const onBlur = () => finalize(true);
        const onKeyDown = (evt) => {
            if (evt.key === 'Enter') {
                evt.preventDefault();
                finalize(true);
            } else if (evt.key === 'Escape') {
                evt.preventDefault();
                finalize(false);
            }
        };

        input.addEventListener('blur', onBlur);
        input.addEventListener('keydown', onKeyDown);

        requestAnimationFrame(() => {
            input.focus();
            input.select();
        });
    }

    finishTextEdit(cellElement, input, commit) {
        const valueWrapper = cellElement.querySelector(`.${GRID_TABLE_LIGHT_CLASSES.cellValue}`);
        const cell = this.getCellFromElement(cellElement);
        if (!valueWrapper) {
            if (input && input.parentNode) {
                input.parentNode.removeChild(input);
            }
            cellElement.removeAttribute('data-editing');
            return;
        }

        const originalValue = valueWrapper.dataset.originalValue;
        delete valueWrapper.dataset.originalValue;
        valueWrapper.style.display = '';

        if (!commit) {
            if (typeof originalValue !== 'undefined') {
                valueWrapper.textContent = originalValue;
            } else if (cell) {
                valueWrapper.textContent = cell.displayValue;
            }
            if (input && input.parentNode) {
                input.parentNode.removeChild(input);
            }
            cellElement.removeAttribute('data-editing');
            return;
        }

        const value = input.value;
        valueWrapper.textContent = value;
        const changeEvent = new Event('change', {bubbles: true, cancelable: true});
        input.value = value;
        input.dispatchEvent(changeEvent);
        if (input && input.parentNode) {
            input.parentNode.removeChild(input);
        }
        cellElement.removeAttribute('data-editing');
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
        if (!this.dom.body) {
            return;
        }
        this.adjustHeaderForScrollbar();
        this.clearFrozenStyles();
        const freezeCount = this.parameters && this.parameters.freezeFirstColumns ? parseInt(this.parameters.freezeFirstColumns, 10) : 0;
        if (!freezeCount) {
            return;
        }

        const headerRow = this.dom.head ? this.dom.head.querySelector(`.${GRID_TABLE_LIGHT_CLASSES.row}`) : null;
        const headerCells = headerRow ? Array.from(headerRow.children) : [];
        const bodyRows = Array.from(this.dom.body.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.row}`));
        if (!headerCells.length && !bodyRows.length) {
            return;
        }

        const referenceRow = bodyRows.find(row => row.children && row.children.length);
        const referenceCells = referenceRow ? Array.from(referenceRow.children) : [];
        const indexes = [];
        for (let i = 0; i < freezeCount; i++) {
            indexes.push(i);
        }
        const widths = [];
        const offsets = [];
        indexes.forEach(index => {
            const headerCell = headerCells[index];
            const bodyCell = referenceCells[index];
            if (!headerCell && !bodyCell) {
                return;
            }
            const measurementCell = bodyCell || headerCell;
            const widthCell = bodyCell || headerCell;
            const rect = widthCell ? widthCell.getBoundingClientRect() : null;
            const width = rect ? rect.width : (widthCell ? widthCell.offsetWidth : 0);
            const offset = measurementCell ? measurementCell.offsetLeft : 0;
            widths[index] = width;
            offsets[index] = offset;
        });
        const availableIndexes = indexes.filter(index => typeof offsets[index] === 'number' && !Number.isNaN(offsets[index]));
        if (!availableIndexes.length) {
            return;
        }

        const applyFrozenStyles = (cell, index, isHeader) => {
            if (!cell) {
                return;
            }
            const width = widths[index] || cell.getBoundingClientRect().width || cell.offsetWidth;
            cell.classList.add(GRID_TABLE_LIGHT_CLASSES.cellFrozen);
            if (typeof cell.dataset.frozenOriginalPosition === 'undefined') {
                cell.dataset.frozenOriginalPosition = cell.style.position || '';
            }
            if (typeof cell.dataset.frozenOriginalTop === 'undefined') {
                cell.dataset.frozenOriginalTop = cell.style.top || '';
            }
            const left = offsets[index] || 0;
            cell.style.left = `${left}px`;
            if (width) {
                if (typeof cell.dataset.frozenOriginalMinWidth === 'undefined') {
                    cell.dataset.frozenOriginalMinWidth = cell.style.minWidth || '';
                }
                if (typeof cell.dataset.frozenOriginalMaxWidth === 'undefined') {
                    cell.dataset.frozenOriginalMaxWidth = cell.style.maxWidth || '';
                }
                if (typeof cell.dataset.frozenOriginalFlex === 'undefined') {
                    cell.dataset.frozenOriginalFlex = cell.style.flex || '';
                }
                if (typeof cell.dataset.frozenOriginalWidth === 'undefined') {
                    cell.dataset.frozenOriginalWidth = cell.style.width || '';
                }
                cell.style.minWidth = `${width}px`;
                cell.style.maxWidth = `${width}px`;
                cell.style.width = `${width}px`;
                cell.style.flex = `0 0 ${width}px`;
            }
            if (isHeader && this.parameters && this.parameters.freezeHeader) {
                cell.style.top = '0px';
            }
            if (typeof cell.dataset.frozenOriginalBackground === 'undefined') {
                cell.dataset.frozenOriginalBackground = cell.style.backgroundColor || '';
            }
            let computedBg = '';
            if (typeof window !== 'undefined') {
                computedBg = window.getComputedStyle(cell).backgroundColor;
                if (!computedBg || computedBg === 'rgba(0, 0, 0, 0)') {
                    const parent = cell.parentElement;
                    const parentBg = parent && window.getComputedStyle(parent).backgroundColor;
                    if (parentBg && parentBg !== 'rgba(0, 0, 0, 0)') {
                        computedBg = parentBg;
                    }
                }
            }
            if (!computedBg || computedBg === 'rgba(0, 0, 0, 0)') {
                computedBg = cell.style.backgroundColor || '#fff';
            }
            cell.style.backgroundColor = computedBg;
            cell.style.position = 'sticky';
            if (!isHeader) {
                cell.style.top = cell.dataset.frozenOriginalTop || '';
            }
            cell.style.zIndex = isHeader ? '7' : '6';
        };

        availableIndexes.forEach(index => {
            const headerCell = headerCells[index];
            if (headerCell) {
                applyFrozenStyles(headerCell, index, true);
            }
        });

        bodyRows.forEach(row => {
            const cells = row.children;
            availableIndexes.forEach(index => {
                if (index < cells.length) {
                    applyFrozenStyles(cells[index], index, false);
                }
            });
        });
    }

    clearFrozenStyles() {
        if (!this.dom.root) {
            return;
        }
        this.dom.root.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.cellFrozen}`).forEach(cell => {
            cell.classList.remove(GRID_TABLE_LIGHT_CLASSES.cellFrozen);
            cell.style.left = '';
            cell.style.top = '';
            cell.style.backgroundColor = cell.dataset.frozenOriginalBackground || '';
            delete cell.dataset.frozenOriginalBackground;
            cell.style.zIndex = '';
            if (typeof cell.dataset.frozenOriginalPosition !== 'undefined') {
                cell.style.position = cell.dataset.frozenOriginalPosition;
            } else {
                cell.style.position = '';
            }
            if (typeof cell.dataset.frozenOriginalTop !== 'undefined') {
                cell.style.top = cell.dataset.frozenOriginalTop;
            }
            if (typeof cell.dataset.frozenOriginalMinWidth !== 'undefined') {
                cell.style.minWidth = cell.dataset.frozenOriginalMinWidth;
            } else {
                cell.style.minWidth = '';
            }
            if (typeof cell.dataset.frozenOriginalMaxWidth !== 'undefined') {
                cell.style.maxWidth = cell.dataset.frozenOriginalMaxWidth;
            } else {
                cell.style.maxWidth = '';
            }
            if (typeof cell.dataset.frozenOriginalFlex !== 'undefined') {
                cell.style.flex = cell.dataset.frozenOriginalFlex;
            } else {
                cell.style.flex = '';
            }
            if (typeof cell.dataset.frozenOriginalWidth !== 'undefined') {
                cell.style.width = cell.dataset.frozenOriginalWidth;
            } else {
                cell.style.width = '';
            }
            delete cell.dataset.frozenOriginalPosition;
            delete cell.dataset.frozenOriginalTop;
            delete cell.dataset.frozenOriginalMinWidth;
            delete cell.dataset.frozenOriginalMaxWidth;
            delete cell.dataset.frozenOriginalFlex;
            delete cell.dataset.frozenOriginalWidth;
        });
    }

    adjustHeaderForScrollbar() {
        if (!this.dom.head || !this.dom.body) {
            return;
        }
        const scrollbarWidth = this.dom.body.offsetWidth - this.dom.body.clientWidth;
        if (scrollbarWidth > 0) {
            this.dom.head.style.boxSizing = 'border-box';
            this.dom.head.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            this.dom.head.style.boxSizing = '';
            this.dom.head.style.paddingRight = '';
        }
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
