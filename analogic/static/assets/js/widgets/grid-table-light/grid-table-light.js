/* global Widget, Widgets, QB, Utils, GridTableExport, $, v, Loader */

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
        this.exportHeaderTitles = [];
        this.options.exportHeaderTitles = [];
        Widgets[options.id] = this;
    }

    normalizeClassesInput(value) {
        if (!value && value !== 0) {
            return [];
        }
        if (Array.isArray(value)) {
            return value
                .map(item => (item || '').toString().trim())
                .filter(item => item.length > 0);
        }
        if (typeof value === 'string') {
            return value
                .split(/\s+/)
                .map(item => item.trim())
                .filter(item => item.length > 0);
        }
        return [(value || '').toString().trim()].filter(item => item.length > 0);
    }

    getClassName(baseClasses, extraClasses) {
        const classes = Array.isArray(baseClasses) ? baseClasses.slice() : [baseClasses];
        if (extraClasses) {
            classes.push(...this.normalizeClassesInput(extraClasses));
        }
        return classes.filter(Boolean).join(' ');
    }

    sanitizeExportValue(value) {
        if (value === null || typeof value === 'undefined') {
            return '';
        }
        let text = value;
        if (typeof text !== 'string') {
            if (text && typeof text.toString === 'function') {
                text = text.toString();
            } else {
                text = String(text);
            }
        }
        if (text && typeof Utils !== 'undefined' && Utils && typeof Utils.stripHtml === 'function') {
            return Utils.stripHtml(text);
        }
        return text;
    }

    computeExportHeaderTitles(columns) {
        if (!Array.isArray(columns)) {
            return [];
        }
        return columns.map((column) => {
            if (!column) {
                return '';
            }
            const headerSource = Object.prototype.hasOwnProperty.call(column, 'exportTitle')
                ? column.exportTitle
                : (column.title || column.label || '');
            return this.sanitizeExportValue(headerSource);
        });
    }

    resolveCellExportValue(cell) {
        if (Object.prototype.hasOwnProperty.call(cell, 'exportValue')) {
            return cell.exportValue;
        }
        switch (cell.type) {
            case 'combo': {
                const selectedValue = typeof cell.rawValue !== 'undefined' ? cell.rawValue : cell.value;
                const options = Array.isArray(cell.options) ? cell.options : [];
                const match = options.find((option) => {
                    if (!option) {
                        return false;
                    }
                    const optionValue = Object.prototype.hasOwnProperty.call(option, 'value')
                        ? option.value
                        : (Object.prototype.hasOwnProperty.call(option, 'name') ? option.name : option);
                    return String(optionValue) === String(selectedValue);
                });
                if (match) {
                    if (Object.prototype.hasOwnProperty.call(match, 'exportValue')) {
                        return match.exportValue;
                    }
                    if (Object.prototype.hasOwnProperty.call(match, 'label')) {
                        return match.label;
                    }
                    if (Object.prototype.hasOwnProperty.call(match, 'name')) {
                        return match.name;
                    }
                    if (Object.prototype.hasOwnProperty.call(match, 'value')) {
                        return match.value;
                    }
                    return match;
                }
                return cell.displayValue || cell.rawValue || '';
            }
            case 'button':
                return cell.displayValue || cell.rawValue || '';
            default:
                return cell.displayValue;
        }
    }

    toCssProperty(key) {
        return (key || '')
            .toString()
            .replace(/[A-Z]/g, match => '-' + match.toLowerCase())
            .replace(/_/g, '-')
            .trim();
    }

    resolveStyleValue(style) {
        if (style === null || typeof style === 'undefined') {
            return '';
        }
        if (Array.isArray(style)) {
            return style.map(item => this.resolveStyleValue(item)).join('');
        }
        if (typeof style === 'string') {
            const trimmed = style.trim();
            if (!trimmed) {
                return '';
            }
            return trimmed.endsWith(';') ? trimmed : `${trimmed};`;
        }
        if (typeof style === 'object') {
            return Object.keys(style)
                .map(key => {
                    const value = style[key];
                    if (value === null || typeof value === 'undefined') {
                        return '';
                    }
                    return `${this.toCssProperty(key)}:${value};`;
                })
                .filter(Boolean)
                .join('');
        }
        const value = style.toString().trim();
        return value ? (value.endsWith(';') ? value : `${value};`) : '';
    }

    mergeStyles(...styles) {
        return styles
            .map(style => this.resolveStyleValue(style))
            .filter(Boolean)
            .join('');
    }

    getStyleAttribute(...styles) {
        const merged = this.mergeStyles(...styles);
        return merged ? ` style="${merged}"` : '';
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
            exportButtonClasses: this.getRealValue('exportButtonClasses', data, ''),
            exportButtonStyle: this.getRealValue('exportButtonStyle', data, ''),
            freezeFirstColumns: parseInt(this.getRealValue('freezeFirstColumns', data, 0), 10) || 0,
            freezeHeader: this.getRealValue('freezeHeader', data, true),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            rootClasses: this.getRealValue('rootClasses', data, ''),
            rootStyle: this.getRealValue('rootStyle', data, ''),
            tableClasses: this.getRealValue('tableClasses', data, ''),
            tableStyle: this.getRealValue('tableStyle', data, ''),
            innerClasses: this.getRealValue('innerClasses', data, ''),
            innerStyle: this.getRealValue('innerStyle', data, ''),
            headClasses: this.getRealValue('headClasses', data, ''),
            headStyle: this.getRealValue('headStyle', data, ''),
            bodyClasses: this.getRealValue('bodyClasses', data, ''),
            bodyStyle: this.getRealValue('bodyStyle', data, ''),
            actionsClasses: this.getRealValue('actionsClasses', data, ''),
            actionsStyle: this.getRealValue('actionsStyle', data, ''),
            pagerClasses: this.getRealValue('pagerClasses', data, ''),
            pagerStyle: this.getRealValue('pagerStyle', data, ''),
            pagerInnerClasses: this.getRealValue('pagerInnerClasses', data, ''),
            pagerInnerStyle: this.getRealValue('pagerInnerStyle', data, ''),
            pagerButtonClasses: this.getRealValue('pagerButtonClasses', data, ''),
            pagerButtonStyle: this.getRealValue('pagerButtonStyle', data, ''),
            pagerInfoClasses: this.getRealValue('pagerInfoClasses', data, ''),
            pagerInfoStyle: this.getRealValue('pagerInfoStyle', data, ''),
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

        const rows = (payload.content || []).map((row, rowIndex) => this.normalizeRow(row, rowIndex, columns));
        const content = rows.map(row => row.cells);

        const totalCount = typeof payload.totalCount === 'number' ? payload.totalCount : content.length;
        const page = payload.page || parameters.page || 1;
        const fallbackPageSize = typeof parameters.pageSize === 'number' ? parameters.pageSize : 100;
        const pageSize = typeof payload.pageSize === 'number' ? payload.pageSize : fallbackPageSize;

        return {
            parameters,
            columns,
            rows,
            content,
            totalCount,
            page,
            pageSize,
            meta: payload.meta || {},
            visible: parameters.visible,
            originalId: this.options.originalId
        };
    }

    normalizeRow(row, rowIndex, columns) {
        const rowConfig = Array.isArray(row) ? {cells: row} : ($.extend(true, {}, row || {}));
        const cellSource = Array.isArray(rowConfig.cells)
            ? rowConfig.cells
            : Array.isArray(rowConfig.content)
                ? rowConfig.content
                : (Array.isArray(row) ? row : []);
        const cells = (cellSource || []).map((cell, colIndex) => this.normalizeCell(cell, columns[colIndex], rowIndex, colIndex));
        return {
            index: rowIndex,
            cells,
            rowClasses: rowConfig.rowClasses || rowConfig.classes || '',
            rowStyle: rowConfig.rowStyle || rowConfig.style || ''
        };
    }

    normalizeCell(cell, column, rowIndex, colIndex) {
        const columnDefaults = column && column.cellDefaults ? column.cellDefaults : {};
        let sourceCell;
        if (cell === null || typeof cell === 'undefined') {
            sourceCell = {};
        } else if (typeof cell === 'object' && !Array.isArray(cell)) {
            sourceCell = cell;
        } else {
            sourceCell = {value: cell};
        }
        const normalized = $.extend(true, {}, columnDefaults, sourceCell);
        normalized.type = normalized.type || 'text';
        const hasDisplayValue = Object.prototype.hasOwnProperty.call(normalized, 'displayValue');
        const hasRawValue = Object.prototype.hasOwnProperty.call(normalized, 'rawValue');
        if (!Object.prototype.hasOwnProperty.call(normalized, 'data')) {
            normalized.data = {};
        }
        if (!hasRawValue) {
            if (Object.prototype.hasOwnProperty.call(normalized, 'value')) {
                normalized.rawValue = normalized.value;
            } else if (hasDisplayValue) {
                normalized.rawValue = normalized.displayValue;
            } else {
                normalized.rawValue = '';
            }
        }
        if (normalized.type === 'text') {
            if (!hasDisplayValue) {
                normalized.displayValue = typeof normalized.rawValue !== 'undefined' && normalized.rawValue !== null ? normalized.rawValue : '';
            }
        } else {
            normalized.displayValue = hasDisplayValue ? normalized.displayValue : (normalized.title || normalized.value || normalized.rawValue || '');
        }
        if (typeof normalized.displayValue === 'undefined' || normalized.displayValue === null) {
            normalized.displayValue = '';
        }
        normalized.actions = normalized.actions || {};
        normalized.alignment = normalized.alignment || (column ? column.alignment : 'center-left') || 'center-left';
        normalized.classes = normalized.classes || '';
        normalized.cellClasses = normalized.cellClasses || '';
        normalized.style = normalized.style || {};
        normalized.cellStyle = normalized.cellStyle || '';
        normalized.textClasses = normalized.textClasses || '';
        normalized.textStyle = normalized.textStyle || '';
        normalized.buttonClasses = normalized.buttonClasses || '';
        normalized.buttonStyle = normalized.buttonStyle || '';
        normalized.selectClasses = normalized.selectClasses || '';
        normalized.selectStyle = normalized.selectStyle || '';
        normalized.inputClasses = normalized.inputClasses || '';
        normalized.inputStyle = normalized.inputStyle || '';
        normalized.tooltip = normalized.tooltip || (column && column.tooltip) || '';
        normalized.editable = !!normalized.editable;
        normalized.rowIndex = rowIndex;
        normalized.columnIndex = colIndex;
        normalized.id = `${this.options.id}_${rowIndex}_${colIndex}`;
        normalized.cellId = `${this.options.id}Cell${rowIndex}-${colIndex}`;
        normalized.width = typeof normalized.width === 'undefined' && column ? column.width : normalized.width;
        normalized.frozen = typeof normalized.frozen === 'boolean' ? normalized.frozen : column && column.frozen;
        const exportValue = this.resolveCellExportValue(normalized);
        normalized.exportValue = this.sanitizeExportValue(exportValue);
        if (typeof normalized.title === 'undefined' || normalized.title === null) {
            normalized.title = normalized.exportValue;
        } else if (typeof normalized.title === 'string') {
            normalized.title = this.sanitizeExportValue(normalized.title);
        }
        return normalized;
    }

    buildRenderParts(processed) {
        const {parameters, columns, rows, content} = processed;
        const headerHtml = this.buildHeaderHtml(columns, parameters);
        const bodyHtml = this.buildBodyHtml(rows || [], parameters);
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
            const baseClasses = [GRID_TABLE_LIGHT_CLASSES.cell, `ks-pos-${column.alignment || 'center-left'}`];
            const className = this.getClassName(baseClasses, column.headerClasses || column.classes);
            const widthStyles = [];
            if (column.width) {
                const resolvedWidth = Widget.getPercentOrPixel(column.width);
                widthStyles.push(`width:${resolvedWidth};`);
                widthStyles.push(`flex:0 0 ${resolvedWidth};`);
            }
            const stickyStyles = parameters.freezeHeader ? 'position:sticky;top:0;z-index:4;' : '';
            const styleAttr = this.getStyleAttribute(widthStyles.join(''), stickyStyles, column.headerStyle || column.style || '');
            return `<div class="${className}" data-col="${index}" data-column-key="${column.key}" data-frozen="${column.frozen ? 'true' : 'false'}"${styleAttr}>${column.headerTemplate || column.title || ''}</div>`;
        });
        return `<div class="${GRID_TABLE_LIGHT_CLASSES.row}">${cells.join('')}</div>`;
    }

    buildBodyHtml(rows, parameters) {
        const renderedRows = rows.map((row) => {
            const rowStyles = [];
            if (parameters.rowHeight) {
                rowStyles.push(`height:${Widget.getPercentOrPixel(parameters.rowHeight)};`);
            }
            const cells = (row.cells || []).map((cell) => this.buildCellHtml(cell));
            const className = this.getClassName([GRID_TABLE_LIGHT_CLASSES.row], row.rowClasses);
            const styleAttr = this.getStyleAttribute(rowStyles.join(''), row.rowStyle);
            return `<div class="${className}" data-row="${row.index}"${styleAttr}>${cells.join('')}</div>`;
        });
        return renderedRows.join('');
    }

    buildCellHtml(cell) {
        const classes = [GRID_TABLE_LIGHT_CLASSES.cell, `ks-pos-${cell.alignment}`];
        const className = this.getClassName(classes, cell.cellClasses || cell.classes);
        const styles = [];
        if (cell.width) {
            const resolvedWidth = Widget.getPercentOrPixel(cell.width);
            styles.push(`width:${resolvedWidth};`);
            styles.push(`flex:0 0 ${resolvedWidth};`);
        }
        const contentHtml = this.buildCellContentHtml(cell);
        const styleAttr = this.getStyleAttribute(styles.join(''), cell.cellStyle || cell.style || '');

        return `<div id="${cell.cellId}" class="${className}" data-row="${cell.rowIndex}" data-col="${cell.columnIndex}" data-frozen="${cell.frozen ? 'true' : 'false'}"${styleAttr}>${contentHtml}</div>`;
    }

    buildCellContentHtml(cell) {
        const clickAction = v('click.action', cell.actions) || (cell.type === 'button' ? 'launch' : 'text_click');
        const clickUpdate = v('click.updateValue', cell.actions) === false ? 'false' : 'true';
        const tooltip = cell.tooltip ? ` title="${Utils.htmlEncode(Utils.stripHtml(cell.tooltip))}"` : '';
        switch (cell.type) {
            case 'button':
                return `<button type="button" class="${this.getClassName([GRID_TABLE_LIGHT_CLASSES.button], cell.buttonClasses)}" data-action="${clickAction}" data-update="${clickUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}"${this.getStyleAttribute(cell.buttonStyle)}${tooltip}>${cell.displayValue}</button>`;
            case 'combo': {
                const changeAction = v('change.action', cell.actions) || 'change';
                const changeUpdate = v('change.updateValue', cell.actions) === false ? 'false' : 'true';
                const optionsHtml = (cell.options || []).map(option => {
                    const value = option && typeof option.value !== 'undefined' ? option.value : '';
                    const label = option && typeof option.label !== 'undefined' ? option.label : value;
                    const selected = String(value) === String(cell.rawValue) ? 'selected' : '';
                    return `<option value="${Utils.htmlEncode(String(value))}" ${selected}>${Utils.htmlEncode(String(label))}</option>`;
                }).join('');
                return `<select class="${this.getClassName([GRID_TABLE_LIGHT_CLASSES.select], cell.selectClasses)}" data-action="${changeAction}" data-update="${changeUpdate}" data-id="${cell.id}" data-cell-id="${cell.cellId}"${this.getStyleAttribute(cell.selectStyle)}${tooltip}>${optionsHtml}</select>`;
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
                return `<div class="${this.getClassName([GRID_TABLE_LIGHT_CLASSES.cellValue], cell.textClasses)}" ${attrs.join(' ')}${this.getStyleAttribute(cell.textStyle)}${tooltip}>${cell.displayValue}</div>`;
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
        const buttonClass = this.getClassName([GRID_TABLE_LIGHT_CLASSES.pagerButton], processed.parameters.pagerButtonClasses);
        const buttonStyleAttr = this.getStyleAttribute(processed.parameters.pagerButtonStyle);
        const buttonsHtml = buttons.map(btn => `<button type="button" class="${buttonClass}" data-pager-action="${btn.action}" ${btn.disabled ? 'disabled' : ''}${buttonStyleAttr}>${btn.label}</button>`).join('');
        const innerClass = this.getClassName([GRID_TABLE_LIGHT_CLASSES.pagerInner], processed.parameters.pagerInnerClasses);
        const innerStyleAttr = this.getStyleAttribute(processed.parameters.pagerInnerStyle);
        const infoClass = this.getClassName([GRID_TABLE_LIGHT_CLASSES.pagerInfo], processed.parameters.pagerInfoClasses);
        const infoStyleAttr = this.getStyleAttribute(processed.parameters.pagerInfoStyle);
        return `<div class="${innerClass}" data-page="${page}" data-total-pages="${totalPages}"${innerStyleAttr}>${buttonsHtml}<span class="${infoClass}"${infoStyleAttr}>${page} / ${totalPages}</span></div>`;
    }

    buildExportButton(parameters) {
        const iconClass = parameters && parameters.exportIcon ? parameters.exportIcon : 'icon-tray-arrow-down';
        const buttonClasses = this.getClassName([GRID_TABLE_LIGHT_CLASSES.exportButton], parameters.exportButtonClasses);
        const styleAttr = this.getStyleAttribute(parameters.exportButtonStyle);
        return `<button type="button" class="${buttonClasses}" data-action="export" data-id="${this.options.id}"${styleAttr}><span class="${iconClass}"></span></button>`;
    }

    composeOuterHtml(parts, parameters) {
        const skinClass = parameters.skin ? `${GRID_TABLE_LIGHT_CLASSES.skinPrefix}${parameters.skin}` : '';
        const rootClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.root, skinClass].filter(Boolean), parameters.rootClasses);
        const rootStyleAttr = this.getStyleAttribute(parts.styleAttr, parameters.rootStyle);
        const tableClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.table], parameters.tableClasses);
        const tableStyleAttr = this.getStyleAttribute(parameters.tableStyle);
        const innerClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.inner], parameters.innerClasses);
        const innerStyleAttr = this.getStyleAttribute(parameters.innerStyle);
        const headClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.head], parameters.headClasses);
        const headStyleAttr = this.getStyleAttribute(parts.headStyleAttr, parameters.headStyle);
        const bodyClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.body], parameters.bodyClasses);
        const bodyStyleAttr = this.getStyleAttribute(parameters.bodyStyle);
        const actionsClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.actions], parameters.actionsClasses);
        const actionsStyleAttr = this.getStyleAttribute(parameters.actionsStyle);
        const pagerClassName = this.getClassName([GRID_TABLE_LIGHT_CLASSES.pager], parameters.pagerClasses);
        const pagerStyleAttr = this.getStyleAttribute(parameters.pagerStyle);

        return `<div class="${rootClassName}" data-widget-id="${this.options.id}"${rootStyleAttr}>
            ${parts.exportHtml ? `<div class="${actionsClassName}" data-role="actions"${actionsStyleAttr}>${parts.exportHtml}</div>` : ''}
            <div class="${tableClassName}" data-role="table"${tableStyleAttr}>
                <div class="${innerClassName}"${innerStyleAttr}>
                    <div class="${headClassName}" data-role="head"${headStyleAttr}>${parts.headerHtml}</div>
                    <div class="${bodyClassName}" data-role="body"${bodyStyleAttr}>${parts.bodyHtml}</div>
                </div>
            </div>
            ${parts.pagerHtml ? `<div class="${pagerClassName}" data-role="pager"${pagerStyleAttr}>${parts.pagerHtml}</div>` : ''}
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
        this.exportHeaderTitles = this.computeExportHeaderTitles(processed.columns);
        this.options.exportHeaderTitles = Array.isArray(this.exportHeaderTitles) ? this.exportHeaderTitles.slice() : [];
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
        if (!this.dom.root.hasAttribute('tabindex')) {
            this.dom.root.setAttribute('tabindex', '0');
        }
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
        if (root && this.boundHandlers.keydown) {
            root.removeEventListener('keydown', this.boundHandlers.keydown);
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
        this.boundHandlers.keydown = this.handleKeyDown.bind(this);
        root.addEventListener('click', this.boundHandlers.click);
        root.addEventListener('change', this.boundHandlers.change, true);
        root.addEventListener('contextmenu', this.boundHandlers.contextmenu);
        root.addEventListener('keydown', this.boundHandlers.keydown);

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

    focusRoot() {
        if (this.dom && this.dom.root && typeof this.dom.root.focus === 'function') {
            try {
                this.dom.root.focus({preventScroll: true});
            } catch (e) {
                this.dom.root.focus();
            }
        }
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
        event.preventDefault();
        this.focusRoot();
        this.updateCurrentCellFromElement(cellElement);
        const cellWidgetId = `${this.options.id}_${this.row}_${this.column}`;
        const eventData = {action: 'rightclick', id: cellWidgetId};
        Widgets['rightclick'] = cellWidgetId;
        this.storeEventValues('rightclick', eventData, true);
        const cellJq = $(cellElement);
        const previousAction = cellJq.data('action');
        const previousId = cellJq.data('id');
        cellJq.data('action', 'rightclick');
        cellJq.data('id', cellWidgetId);
        Widget.doHandleGridTableSystemEvent(cellJq, event, true);
        if (typeof previousAction === 'undefined') {
            cellJq.removeData('action');
        } else {
            cellJq.data('action', previousAction);
        }
        if (typeof previousId === 'undefined') {
            cellJq.removeData('id');
        } else {
            cellJq.data('id', previousId);
        }
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
        const previousPage = this.state.page || 1;
        let newPage = previousPage;
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
        if (newPage === previousPage) {
            return;
        }
        this.state.page = newPage;
        const extraParams = {
            page: newPage,
            pageSize: this.state.pageSize,
            skip: this.state.pageSize * (newPage - 1),
            take: this.state.pageSize
        };
        let loaderActive = typeof Loader !== 'undefined' && Loader && typeof Loader.start === 'function' && typeof Loader.stop === 'function';
        if (loaderActive) {
            Loader.start();
        }
        const finalizeLoader = () => {
            if (loaderActive) {
                Loader.stop();
                loaderActive = false;
            }
        };
        const handleSuccess = (payload) => {
            try {
                this.updateContent(payload);
                if (this.options.events && typeof this.options.events.afterPageChange === 'function') {
                    const totalPagesAfter = Math.max(1, Math.ceil(this.state.totalCount / (this.state.pageSize || 1)));
                    this.options.events.afterPageChange({page: newPage, pageSize: this.state.pageSize, totalPages: totalPagesAfter});
                }
            } finally {
                finalizeLoader();
            }
        };
        const handleError = (error) => {
            console.error('GridTableLightWidget.handlePagerAction: unable to load page data.', error);
            this.state.page = previousPage;
            finalizeLoader();
        };
        let request;
        try {
            request = QB.loadData(this.options.id, this.name, false, 'init', extraParams);
        } catch (error) {
            handleError(error);
            return;
        }
        if (!request) {
            finalizeLoader();
            return;
        }
        const isJQueryPromise = typeof request.done === 'function' && typeof request.fail === 'function';
        if (isJQueryPromise) {
            request.done(handleSuccess).fail(handleError);
            if (typeof request.always === 'function') {
                request.always(finalizeLoader);
            } else {
                request.then(finalizeLoader, finalizeLoader);
            }
            return;
        }
        if (typeof request.then === 'function') {
            const chained = request.then(handleSuccess, handleError);
            if (chained && typeof chained.finally === 'function') {
                chained.finally(finalizeLoader);
            } else if (typeof request.finally === 'function') {
                request.finally(finalizeLoader);
            } else {
                request.then(finalizeLoader, finalizeLoader);
            }
            return;
        }
        finalizeLoader();
    }

    handleExport() {
        if (typeof GridTableExport === 'undefined' || !GridTableExport) {
            return;
        }
        if (typeof Loader !== 'undefined' && Loader && typeof Loader.start === 'function') {
            Loader.start();
        }
        const stopLoader = () => {
            if (typeof Loader !== 'undefined' && Loader && typeof Loader.stop === 'function') {
                Loader.stop();
            }
        };
        const totalRows = this.state.totalCount;
        const hasAllData = !this.state.pageSize || totalRows === this.cellData.length;
        if (hasAllData) {
            try {
                GridTableExport.triggerExcelExport(this.options.id, this.parameters && this.parameters.exportConfig ? this.parameters.exportConfig : {});
            } finally {
                stopLoader();
            }
            return;
        }
        const extraParams = {page: 1, pageSize: 0, exportAll: true, totalCount: this.state.totalCount};
        const previousState = {
            cellData: this.cellData,
            columns: this.state.columns,
            page: this.state.page,
            pageSize: this.state.pageSize,
            totalCount: this.state.totalCount,
            parameters: this.parameters,
            exportHeaderTitles: Array.isArray(this.exportHeaderTitles) ? this.exportHeaderTitles.slice() : (Array.isArray(this.options.exportHeaderTitles) ? this.options.exportHeaderTitles.slice() : [])
        };
        const restoreState = () => {
            this.cellData = previousState.cellData;
            this.state.columns = previousState.columns;
            this.state.page = previousState.page;
            this.state.pageSize = previousState.pageSize;
            this.state.totalCount = previousState.totalCount;
            this.parameters = previousState.parameters;
            this.exportHeaderTitles = Array.isArray(previousState.exportHeaderTitles) ? previousState.exportHeaderTitles.slice() : [];
            this.options.exportHeaderTitles = Array.isArray(previousState.exportHeaderTitles) ? previousState.exportHeaderTitles.slice() : [];
            if (Widgets && Widgets[this.options.id]) {
                Widgets[this.options.id].cellData = this.cellData;
            }
        };
        const executeExport = (payload) => {
            const processed = this.processData(payload);
            try {
                this.cellData = processed.content;
                this.state.columns = processed.columns;
                this.parameters = processed.parameters;
                this.exportHeaderTitles = this.computeExportHeaderTitles(processed.columns);
                this.options.exportHeaderTitles = Array.isArray(this.exportHeaderTitles) ? this.exportHeaderTitles.slice() : [];
                if (Widgets && Widgets[this.options.id]) {
                    Widgets[this.options.id].cellData = this.cellData;
                }
                GridTableExport.triggerExcelExport(this.options.id, this.parameters && this.parameters.exportConfig ? this.parameters.exportConfig : {});
            } catch (error) {
                console.error('GridTableLightWidget.handleExport: export failed.', error);
            } finally {
                restoreState();
            }
        };
        const handleFailure = (error) => {
            console.error('GridTableLightWidget.handleExport: unable to prepare export data.', error);
            restoreState();
        };
        const request = QB.loadData(this.options.id, this.name, false, 'init', extraParams);
        const handleWithPromise = (promise) => {
            if (!promise) {
                stopLoader();
                return;
            }
            if (typeof promise.always === 'function') {
                promise.done(executeExport).fail(handleFailure).always(stopLoader);
                return;
            }
            if (typeof promise.then === 'function') {
                let chained = promise.then((payload) => {
                    executeExport(payload);
                }, (error) => {
                    handleFailure(error);
                });
                const finalizer = (target) => {
                    if (target && typeof target.finally === 'function') {
                        target.finally(stopLoader);
                    } else if (target && typeof target.then === 'function') {
                        target.then(stopLoader, stopLoader);
                    } else {
                        stopLoader();
                    }
                };
                finalizer(chained);
                return;
            }
            stopLoader();
        };
        try {
            handleWithPromise(request);
        } catch (error) {
            handleFailure(error);
            stopLoader();
        }
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
        const isShiftPressed = event.shiftKey;
        const isModifierPressed = event.ctrlKey || event.metaKey;

        if (isModifierPressed) {
            if (this.selection.selectedIds.has(cell.id)) {
                this.selection.selectedIds.delete(cell.id);
            } else {
                this.selection.selectedIds.add(cell.id);
            }
            this.selection.anchorCellId = cell.id;
            this.selection.activeCellId = cell.id;
            this.selection.isMouseDown = false;
        } else if (isShiftPressed && this.selection.anchorCellId) {
            this.selection.activeCellId = cell.id;
            this.selectRange(this.selection.anchorCellId, cell.id);
            this.selection.isMouseDown = false;
        } else {
            this.selection.isMouseDown = true;
            this.selection.anchorCellId = cell.id;
            this.selection.activeCellId = cell.id;
            this.selection.selectedIds = new Set([cell.id]);
        }
        this.focusRoot();
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
        this.updateFrozenScrollOffset();
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

    getCellPositionFromId(cellId) {
        if (!cellId || cellId.indexOf(`${this.options.id}Cell`) !== 0) {
            return null;
        }
        const parts = cellId.replace(`${this.options.id}Cell`, '').split('-');
        if (parts.length !== 2) {
            return null;
        }
        const row = parseInt(parts[0], 10);
        const col = parseInt(parts[1], 10);
        if (Number.isNaN(row) || Number.isNaN(col)) {
            return null;
        }
        return {row, col};
    }

    buildCellId(row, col) {
        return `${this.options.id}Cell${row}-${col}`;
    }

    scrollCellIntoView(cellElement) {
        if (!cellElement || !this.dom.body) {
            return;
        }
        const bodyRect = this.dom.body.getBoundingClientRect();
        const cellRect = cellElement.getBoundingClientRect();
        if (cellRect.top < bodyRect.top) {
            this.dom.body.scrollTop -= (bodyRect.top - cellRect.top);
        } else if (cellRect.bottom > bodyRect.bottom) {
            this.dom.body.scrollTop += (cellRect.bottom - bodyRect.bottom);
        }
        if (cellRect.left < bodyRect.left) {
            this.dom.body.scrollLeft -= (bodyRect.left - cellRect.left);
        } else if (cellRect.right > bodyRect.right) {
            this.dom.body.scrollLeft += (cellRect.right - bodyRect.right);
        }
    }

    handleKeyDown(event) {
        if (!this.selection) {
            return;
        }
        const target = event.target;
        if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
            return;
        }
        const isCopy = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c';
        if (isCopy) {
            event.preventDefault();
            this.copySelectedCellsToClipboard();
            return;
        }
        const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (!navigationKeys.includes(event.key)) {
            return;
        }
        const rowCount = Array.isArray(this.cellData) ? this.cellData.length : 0;
        const colCount = rowCount > 0 && Array.isArray(this.cellData[0]) ? this.cellData[0].length : 0;
        if (!rowCount || !colCount) {
            return;
        }
        event.preventDefault();
        let activeId = this.selection.activeCellId;
        if (!activeId || !document.getElementById(activeId)) {
            activeId = this.buildCellId(0, 0);
            this.selection.selectedIds = new Set([activeId]);
            this.selection.anchorCellId = activeId;
        }
        const currentPosition = this.getCellPositionFromId(activeId);
        if (!currentPosition) {
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                currentPosition.row = Math.max(0, currentPosition.row - 1);
                break;
            case 'ArrowDown':
                currentPosition.row = Math.min(rowCount - 1, currentPosition.row + 1);
                break;
            case 'ArrowLeft':
                currentPosition.col = Math.max(0, currentPosition.col - 1);
                break;
            case 'ArrowRight':
                currentPosition.col = Math.min(colCount - 1, currentPosition.col + 1);
                break;
        }
        const nextId = this.buildCellId(currentPosition.row, currentPosition.col);
        const nextCell = document.getElementById(nextId);
        if (!nextCell) {
            return;
        }
        const isShift = event.shiftKey;
        const isModifier = event.ctrlKey || event.metaKey;
        this.selection.activeCellId = nextId;
        if (isShift) {
            if (!this.selection.anchorCellId) {
                this.selection.anchorCellId = activeId;
            }
            this.selectRange(this.selection.anchorCellId, nextId);
        } else if (isModifier) {
            this.selection.anchorCellId = nextId;
        } else {
            this.selection.selectedIds = new Set([nextId]);
            this.selection.anchorCellId = nextId;
        }
        this.updateCurrentCellFromElement(nextCell);
        this.updateSelectionUI();
        this.scrollCellIntoView(nextCell);
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
        input.className = this.getClassName([GRID_TABLE_LIGHT_CLASSES.input], cell.inputClasses);
        const inputStyle = this.resolveStyleValue(cell.inputStyle);
        if (inputStyle) {
            input.setAttribute('style', inputStyle);
        }
        input.value = rawValue === null || typeof rawValue === 'undefined' ? '' : rawValue;
        input.setAttribute('data-action', changeAction);
        input.setAttribute('data-update', changeUpdate);
        input.setAttribute('data-id', cell.id);
        input.setAttribute('data-cell-id', cell.cellId);
        if (cell.tooltip) {
            input.setAttribute('title', Utils.htmlEncode(Utils.stripHtml(cell.tooltip)));
        }

        const contentContainer = cellElement;
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
        this.resetFrozenScrollOffset();
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

        const measurementRow = bodyRows.find(row => row.children && row.children.length) || null;
        const frozenMetrics = [];
        for (let index = 0; index < freezeCount; index++) {
            const headerCell = headerCells[index] || null;
            const bodyCell = measurementRow && measurementRow.children[index] ? measurementRow.children[index] : null;
            if (!headerCell && !bodyCell) {
                continue;
            }
            const measurementCell = bodyCell || headerCell;
            const rect = measurementCell ? measurementCell.getBoundingClientRect() : null;
            const width = rect && rect.width ? rect.width : measurementCell ? measurementCell.offsetWidth : 0;
            frozenMetrics.push({index, width: Math.max(width, 0)});
        }

        if (!frozenMetrics.length) {
            this.resetFrozenScrollOffset();
            return;
        }

        let cumulativeLeft = 0;
        frozenMetrics.forEach(metric => {
            metric.left = cumulativeLeft;
            cumulativeLeft += metric.width;
        });

        const applyFrozenStyles = (cell, metric, isHeader) => {
            if (!cell || !metric) {
                return;
            }
            cell.classList.add(GRID_TABLE_LIGHT_CLASSES.cellFrozen);
            if (typeof cell.dataset.frozenOriginalPosition === 'undefined') {
                cell.dataset.frozenOriginalPosition = cell.style.position || '';
            }
            if (typeof cell.dataset.frozenOriginalTop === 'undefined') {
                cell.dataset.frozenOriginalTop = cell.style.top || '';
            }
            if (typeof cell.dataset.frozenOriginalLeft === 'undefined') {
                cell.dataset.frozenOriginalLeft = cell.style.left || '';
            }
            const width = metric.width || cell.getBoundingClientRect().width || cell.offsetWidth;
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
            } else if (!isHeader) {
                cell.style.top = cell.dataset.frozenOriginalTop || '';
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
            cell.style.left = `${metric.left}px`;
            cell.style.position = 'sticky';
            cell.style.zIndex = isHeader ? '7' : '6';
        };

        frozenMetrics.forEach((metric) => {
            const headerCell = headerCells[metric.index];
            if (headerCell) {
                applyFrozenStyles(headerCell, metric, true);
            }
        });

        bodyRows.forEach(row => {
            const cells = Array.from(row.children);
            cells.forEach(cell => {
                const colIndex = parseInt(cell.getAttribute('data-col'), 10);
                if (!Number.isFinite(colIndex)) {
                    return;
                }
                const metric = frozenMetrics.find(item => item.index === colIndex);
                if (metric) {
                    applyFrozenStyles(cell, metric, false);
                }
            });
        });

        this.updateFrozenScrollOffset();
    }

    clearFrozenStyles() {
        if (!this.dom.root) {
            return;
        }
        this.dom.root.querySelectorAll(`.${GRID_TABLE_LIGHT_CLASSES.cellFrozen}`).forEach(cell => {
            cell.classList.remove(GRID_TABLE_LIGHT_CLASSES.cellFrozen);
            if (typeof cell.dataset.frozenOriginalLeft !== 'undefined') {
                cell.style.left = cell.dataset.frozenOriginalLeft;
            } else {
                cell.style.left = '';
            }
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
            cell.style.transform = '';
            delete cell.dataset.frozenOriginalLeft;
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

    updateFrozenScrollOffset() {
        if (!this.dom || !this.dom.root) {
            return;
        }
        const scrollLeft = this.dom.body ? this.dom.body.scrollLeft : 0;
        this.dom.root.style.setProperty('--ks-grid-table-light-frozen-scroll-left', `${scrollLeft}px`);
    }

    resetFrozenScrollOffset() {
        if (!this.dom || !this.dom.root) {
            return;
        }
        this.dom.root.style.removeProperty('--ks-grid-table-light-frozen-scroll-left');
    }
}

;
