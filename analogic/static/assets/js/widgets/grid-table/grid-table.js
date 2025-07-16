'use strict';

class GridTableWidget extends Widget {

    static activeInstance = null;
    static areGlobalListenersAttached = false;

    getHtml(widgets, headerRowWidgetHtml, data) {
        const o = this.options;
        let d = Array.isArray(data) ? data : data.content;
        const v = this.getParameters(data);
        this.allowCopyToClipBoard = v.allowCopyToClipBoard;

        let mainDivStyle = this.getGeneralStyles(data);
        if (v.hideIfNoData === true && (!d || d.length === 0)) {
            mainDivStyle.push('display:none;');
        }

        let r = [], c = [], tb, th, j = 0,
            col = o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget').length, hw = '';

        if (o.errorMessage !== '') {
            return `<div><h3 style="color:red;">${o.errorMessage}</h3></div>`;
        }

        this.state['col'] = col;

        if (v.maxRows) {
            let page = this.state.page ? this.state.page : 1;
            let maxRows = v.maxRows * col;
            let start = (page - 1) * maxRows, end = page * maxRows;
            this.state['widgets'] = widgets;
            this.state['headerRowWidgetHtml'] = headerRowWidgetHtml;
            this.state['maxRows'] = v.maxRows;
            while (start < widgets.length && start < end) {
                r.push(this.buildTableRowHtml(widgets.slice(start, start + col).join(''), v.rowHeight, v.borderBottom));
                start = start + col;
            }
        } else {
            while (j < widgets.length) {
                r.push(this.buildTableRowHtml(widgets.slice(j, j + col).join(''), v.rowHeight, v.borderBottom));
                j = j + col;
            }
        }

        tb = this.buildTableBodyHtml(r.join(''));
        r = [];

        if (headerRowWidgetHtml) {
            th = this.buildTableHeadHtml(headerRowWidgetHtml);
        } else {
            for (let w of o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget')) {
                hw = '';
                if (w.title) {
                    hw = w.title.split('|').map(e => '<div>' + e + '</div>').join('');
                }
                c.push(this.buildTableHeaderCellHtml(hw, w.width, w.borderLeft, w.borderRight, w.headerAlignment ? w.headerAlignment : w.alignment));
            }
            th = this.buildTableHeadHtml(this.buildTableHeaderRowHtml(c.join(''), v.rowHeight, v.borderTop, v.borderBottom));
        }
        return this.getWidgetHtml(this.buildTableHtml([th, tb].join(''), v.skin), o.title || '', mainDivStyle);
    }

    getParameters(data) {
        return {
            allowFullContentUpdated: this.getRealValue('allowFullContentUpdated', data, false),
            allowChangedDataUpdate: this.getRealValue('allowChangedDataUpdate', data, true),
            allowCopyToClipBoard: this.getRealValue('allowCopyToClipBoard', data, false),
            borderBottom: this.getRealValue('borderBottom', data, true),
            borderTop: this.getRealValue('borderTop', data, true),
            disableRefreshGridCell: this.getRealValue('disableRefreshGridCell', data, false),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            maxRows: this.getRealValue('maxRows', data, false),
            minWidth: this.getRealValue('minWidth', data, false),
            rowHeight: this.getRealValue('rowHeight', data, false),
            skin: this.getRealValue('skin', data, 'standard'),
            width: this.getRealValue('width', data, false)
        };
    }

    getWidgetHtml(innerHtml, title, mainDivStyle) {
        return `<div style="${mainDivStyle.join('')}"><h3>${title}</h3>${innerHtml}</div>`;
    }

    buildTableHtml(innerHtml, skin = 'template1') {
        return `<div class="ks-grid-table ks-grid-table-${skin}"><div class="ks-grid-table-inner">${innerHtml}</div></div>`;
    }

    buildTableHeadHtml(innerHtml) {
        return `<div class="ks-grid-table-head">${innerHtml}</div>`;
    }

    buildTableHeaderRowHtml(innerHtml, height, borderTop = true, borderBottom = true) {
        return `<div class="ks-grid-table-row ${borderBottom ? 'border-bottom' : ''} ${borderTop ? 'border-top' : ''}" ${height ? `style="height:${height}px;"` : ''}>${innerHtml}</div>`;
    }

    buildTableHeaderCellHtml(innerHtml, width, borderLeft = true, borderRight = true, alignment = 'center-center') {
        return `<div class="ks-grid-table-cell ${borderRight ? 'border-right' : ''}  ${borderLeft ? 'border-left' : ''}" style="width:${width}px;"><div class="ks-grid-table-cell-content ks-pos-${alignment}">${innerHtml}</div></div>`;
    }

    buildTableBodyHtml(innerHtml) {
        this.currentRowIndex = 0;
        return `<div class="ks-grid-table-content">${innerHtml}</div>`;
    }

    buildTableRowHtml(innerHtml, height, borderBottom = true) {
        const rowIndex = this.currentRowIndex || 0;
        this.currentRowIndex = rowIndex + 1;
        return `<div class="ks-grid-table-row ${borderBottom ? 'border-bottom' : ''}" data-row="${rowIndex}" ${height ? `style="height:${height}px;"` : ''}>${innerHtml}</div>`;
    }

    renderPage() {
        this.getHolder(this.id).html(this.getHtml(this.state['widgets'], this.state['headerRowWidgetHtml'], this.cellData));
        this.initEvents();
    }

    isContentUpdatable(refreshedData) {
        const o = this.options;
        return refreshedData.length === v(o.id + '.cellData.length');
    }

    renderRowForUpdateContent(widgets, v) {
        let j = 0, col = this.state['col'], r = [];
        while (j < widgets.length) {
            r.push(this.buildTableRowHtml(widgets.slice(j, j + col).join(''), v.rowHeight, v.borderBottom));
            j = j + col;
        }
        return r.join('');
    }

    static deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = GridTableWidget.isObject(val1) && GridTableWidget.isObject(val2);
            if (
                areObjects && !GridTableWidget.deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false;
            }
        }
        return true;
    }

    static isObject(object) {
        return object != null && typeof object === 'object';
    }

    updateContent(data = false, loadFunction = QB.loadData) {
        const o = this.options, instance = this;
        let widgetOptions, processedData, widgets = [],
            rowNum, colNum, i, j, rendered = [], w, previousLength = v(o.id + '.cellData.length'), dd;

        return loadFunction(o.id, instance.name).then(function (d) {
            processedData = instance.processData(d);
            const vv = instance.getParameters(d);
            instance.dynamicTooltip = (processedData || {}).tooltip;

            if (!Array.isArray(processedData)) {
                processedData = processedData.content;
            }

            if (!vv.allowFullContentUpdated && !instance.isContentUpdatable(processedData)) {
                return instance.reRenderWidget(false, false, d);
            }

            for (widgetOptions of o.widgets || []) {
                if ('GridTableHeaderRowWidget' !== widgetOptions.type.name) {
                    widgets.push(widgetOptions);
                }
            }
            rowNum = processedData.length;
            colNum = processedData[0] ? processedData[0].length : 0;
            instance.state['rows'] = rowNum;

            instance.updateHtml(d);
            for (i = 0; i < rowNum; ++i) {
                j = 0;
                for (w of widgets) {
                    processedData[i][j].id = o.id + '_' + i + '_' + j;
                    processedData[i][j].cellId = o.id + 'Cell' + i + '-' + j;
                    processedData[i][j].originalId = instance.cellData[i][j].originalId;

                    if (vv.allowFullContentUpdated && i >= previousLength) {
                        Widgets[dd.cellId] = new w.type(w);
                        rendered.push(Widgets[dd.cellId].render(false, processedData[i][j]));
                    } else {
                        if (false === vv.allowChangedDataUpdate || processedData[i][j].manipulated ||
                            !GridTableWidget.deepEqual(instance.cellData[i][j], processedData[i][j])) {
                            if (processedData[i][j].manipulated) {
                                delete processedData[i][j].manipulated;
                            }
                            Widgets[processedData[i][j].cellId].updateContent(processedData[i][j]);
                            instance.cellData[i][j] = processedData[i][j];
                        }
                    }
                    ++j;
                }
            }

            return new Promise(function (resolve) {
                if (vv.allowFullContentUpdated && rowNum > previousLength) {
                    let rowsToAppend = instance.renderRowForUpdateContent(rendered, vv);
                    $('#' + o.id).find('.ks-grid-table-content').append(rowsToAppend);
                }
                return resolve('update');
            });
        });
    }

    updateHtml(data) {
        const o = this.options, v = this.getParameters(data), section = $('#' + o.id),
            mainDiv = section.children();
        v.minWidth && mainDiv.css('min-width', Widget.getPercentOrPixel(v.minWidth));
        v.width && mainDiv.css('width', Widget.getPercentOrPixel(v.width));
        if (data.content && !section.hasClass('forcedByEventMap')) {
            v.hideIfNoData && section.css('display', data.content.length > 0 ? 'unset' : 'none');
        }
        return 'update';
    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        this.isRendering = true;
        delete this.row;
        delete this.column;
        const o = this.options, instance = this;
        let widgetOptions, widgets = [], headerRowWidget = false;

        for (widgetOptions of o.widgets || []) {
            if ('GridTableHeaderRowWidget' !== widgetOptions.type.name) {
                widgets.push(widgetOptions);
            } else {
                headerRowWidget = this.getWidget(widgetOptions);
            }
        }

        this.addListeners(false);

        let afterLoad = (data) => {
            let deferred = [], w, cw, processedData = instance.processData(data), i, j = 0, rows, colNum,
                widgetHtmls = [];

            if (!Array.isArray(processedData)) {
                processedData = processedData.content;
            }
            o.errorMessage = '';

            rows = processedData.length;
            colNum = processedData[0] ? processedData[0].length : 0;

            let widgetColNum = o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget').length;

            if (colNum !== widgetColNum && processedData[0]) {
                o.errorMessage = 'Error! Grid widgets number ' + widgetColNum + ' is not equal to repository query number ' + colNum + '!';
            }

            instance.state = {rows: rows};
            instance.cellData = [];

            if (headerRowWidget !== false) {
                deferred.push(headerRowWidget.render(withState, processedData.length > 0 ? processedData[0] : []));
            }

            for (i = 0; i < rows; ++i) {
                instance.cellData[i] = [];
                j = 0;
                for (w of widgets) {
                    processedData[i][j].id = o.id + '_' + i + '_' + j;
                    processedData[i][j].cellId = o.id + 'Cell' + i + '-' + j;

                    cw = new w.type(w);
                    Widgets[processedData[i][j].cellId] = cw;
                    widgetHtmls.push(cw.render(withState, processedData[i][j]));

                    instance.cellData[i].push(processedData[i][j]);
                    ++j;
                }
            }

            return $.when.apply($, deferred).then(function (...results) {
                let r, first = true, headerRowWidgetHtml = false;

                for (r of results) {
                    if (first === true && headerRowWidget !== false) {
                        headerRowWidgetHtml = r;
                    }
                    first = false;
                }
                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;
                let ghtml = instance.getHtml(widgetHtmls, headerRowWidgetHtml, data, withState), gs = [];
                if (o.applyMeasuresToSection === true) {
                    gs = instance.getWidthAndHeight(data);
                }

                if (visible === false) {
                    gs.push('display:none;');
                }

                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}"  style="${gs.join('')}"  id="${o.id}">${ghtml}</section>`;
            });
        };

        if (previouslyLoadedData !== false) {
            return afterLoad(previouslyLoadedData);
        }

        return QB.loadData(o.id, instance.name).then(function (data) {
            return afterLoad(data);
        });
    }

    initEvents(withState) {
        const o = this.options;
        if (o.errorMessage) {
            return;
        }

        let w, i, j, colNum = (o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget') || []).length;

        for (i = 0; i < this.state.rows; ++i) {
            for (j = 0; j < colNum; ++j) {
                const cellElement = $('#' + o.id + 'Cell' + i + '-' + j);
                cellElement.attr('data-row', i);
                cellElement.attr('data-col', j);
                Widgets[o.id + 'Cell' + i + '-' + j].initEvents(withState, o.id + '_' + i + '_' + j);
            }
        }

        let headerRowWidget = o.widgets.filter(e => e.type.name === 'GridTableHeaderRowWidget');

        for (w of headerRowWidget) {
            Widgets[w.id].initEvents(withState);
        }

        this.initEventHandlers(withState);
        this.isRendering = false;
    }

    initEventHandlers() {
        if (!this.allowCopyToClipBoard) {
            return;
        }

        this.selectedCells = new Set();
        this.isMouseDown = false;
        this.activeCell = null;
        this.selectionAnchor = null;
        this.lastHoveredCell = null;

        const gridContainer = $('#' + this.id);
        const contentArea = gridContainer.find('.ks-grid-table-content');

        contentArea.on('mousedown', '.ks-grid-table-cell', this.handleMouseDown.bind(this));
        contentArea.on('mouseover', '.ks-grid-table-cell', this.handleMouseOver.bind(this));
        $(document).on('mouseup', this.handleMouseUp.bind(this));

        gridContainer.on('click', (e) => {
            if (GridTableWidget.activeInstance !== this) {
                if (GridTableWidget.activeInstance) {
                    $('#' + GridTableWidget.activeInstance.id).removeClass('grid-focused');
                }
                GridTableWidget.activeInstance = this;
                gridContainer.addClass('grid-focused');
            }
        });

        if (!GridTableWidget.areGlobalListenersAttached) {
            $(document).on('keydown', (e) => {
                if (GridTableWidget.activeInstance) {
                    GridTableWidget.activeInstance.handleKeyDown(e);
                }
            });

            $(document).on('click', (e) => {
                if (GridTableWidget.activeInstance) {
                    if ($(e.target).closest('#' + GridTableWidget.activeInstance.id).length === 0) {
                        $('#' + GridTableWidget.activeInstance.id).removeClass('grid-focused');
                        GridTableWidget.activeInstance = null;
                    }
                }
            });

            GridTableWidget.areGlobalListenersAttached = true;
        }
    }

    reset() {
        if (GridTableWidget.activeInstance === this) {
            GridTableWidget.activeInstance = null;
        }
        delete this.cellData;
        delete this.row;
        delete this.column;
        delete this.selectedCells;
        delete this.isMouseDown;
        delete this.activeCell;
        delete this.selectionAnchor;
        delete this.lastHoveredCell;
    }

    handleMouseDown(e) {
        if ($(e.target).is('input, textarea')) {
            return;
        }
        e.preventDefault();

        this.isMouseDown = true;
        const cell = $(e.currentTarget);

        if (!e.ctrlKey && !e.shiftKey) {
            this.clearSelection();
            this.activeCell = cell;
            this.selectionAnchor = cell;
            this.lastHoveredCell = cell;
            this.selectRange(this.selectionAnchor, this.activeCell);
            this.updateSelectionUI();
        } else if (e.shiftKey && this.selectionAnchor) {
            this.activeCell = cell;
            this.selectRange(this.selectionAnchor, this.activeCell);
            this.updateSelectionUI();
        } else if (e.ctrlKey) {
            const cellId = cell.attr('id');
            if (this.selectedCells.has(cellId)) {
                this.selectedCells.delete(cellId);
            } else {
                this.selectedCells.add(cellId);
            }
            this.activeCell = cell;
            this.selectionAnchor = cell;
            this.updateSelectionUI();
        }
    }

    handleMouseOver(e) {
        if (!this.isMouseDown) return;

        const cell = $(e.currentTarget);
        if (this.lastHoveredCell && this.lastHoveredCell.attr('id') === cell.attr('id')) {
            return;
        }

        this.lastHoveredCell = cell;
        this.activeCell = cell;
        this.selectRange(this.selectionAnchor, this.activeCell);
        this.updateSelectionUI();
    }

    handleMouseUp(e) {
        this.isMouseDown = false;
        this.lastHoveredCell = null;
    }

    handleKeyDown(e) {
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            e.preventDefault();
            this.copySelectedCellsToClipboard();
            return;
        }

        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            return;
        }
        e.preventDefault();

        if (!this.activeCell) {
            this.activeCell = $('#' + this.id).find('.ks-grid-table-cell[data-row="0"][data-col="0"]');
            if (!this.activeCell.length) return;

            this.clearSelection();
            this.selectedCells.add(this.activeCell.attr('id'));
            this.selectionAnchor = this.activeCell;
            this.updateSelectionUI();
            return;
        }

        const isCtrlPressed = e.ctrlKey;
        const isShiftPressed = e.shiftKey;
        let currentRow = parseInt(this.activeCell.data('row'));
        let currentCol = parseInt(this.activeCell.data('col'));

        switch (e.key) {
            case 'ArrowUp':
                currentRow--;
                break;
            case 'ArrowDown':
                currentRow++;
                break;
            case 'ArrowLeft':
                currentCol--;
                break;
            case 'ArrowRight':
                currentCol++;
                break;
        }

        const nextCell = $(`#${this.id} .ks-grid-table-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);

        if (nextCell.length) {
            this.activeCell = nextCell;

            if (isShiftPressed) {
                this.clearSelection();
                this.selectRange(this.selectionAnchor, this.activeCell);
            } else if (isCtrlPressed) {
                this.selectionAnchor = this.activeCell;
            } else {
                this.clearSelection();
                this.selectedCells.add(this.activeCell.attr('id'));
                this.selectionAnchor = this.activeCell;
            }

            this.updateSelectionUI();
            this.activeCell[0].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
        }
    }

    selectRange(startCell, endCell) {
        const startRow = parseInt(startCell.data('row'));
        const startCol = parseInt(startCell.data('col'));
        const endRow = parseInt(endCell.data('row'));
        const endCol = parseInt(endCell.data('col'));

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        this.clearSelection();

        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                const cellId = `${this.options.id}Cell${r}-${c}`;
                this.selectedCells.add(cellId);
            }
        }
    }

    updateSelectionUI() {
        $(`#${this.id} .ks-grid-table-cell.selected`).removeClass('selected');
        $(`#${this.id} .ks-grid-table-cell.active-cell`).removeClass('active-cell');

        this.selectedCells.forEach(cellId => {
            $('#' + cellId).addClass('selected');
        });

        if (this.activeCell) {
            this.activeCell.addClass('active-cell');
        }
    }

    clearSelection() {
        this.selectedCells.clear();
        this.updateSelectionUI();
    }

    copySelectedCellsToClipboard() {
        if (this.selectedCells.size === 0) return;

        const rows = new Map();
        let minCol = Infinity, maxCol = -Infinity;

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
        sortedRows.forEach((cols, row) => {
            let rowText = [];
            for (let c = minCol; c <= maxCol; c++) {
                rowText.push(cols.get(c) || '');
            }
            clipboardText += rowText.join('\t') + '\n';
        });

        navigator.clipboard.writeText(clipboardText).then(() => {
            console.log('Selected cells copied to clipboard successfully!');
        }).catch(err => {
            console.error('Copy error: ', err);
        });
    }

    triggerFillRight(params) {
        let requests = this.getFillPatchRequest(params);
        Repository[this.id]['fillRight'] = {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                return requests;
            }
        };
        return Api.executeRequest('fillRight.' + this.id);
    }

    triggerFillLeft(params) {
        if (!params.iterationNumber) {
            params.iterationNumber = -1;
        }
        let requests = this.getFillPatchRequest(params);
        Repository[this.id]['fillLeft'] = {
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            type: 'PATCH',
            body: (db) => {
                return requests;
            }
        };
        return Api.executeRequest('fillLeft.' + this.id);
    }

    getFillPatchRequest(params) {
        if (this.cellData && this.row && this.column) {
            if (typeof params.value == 'undefined' && !params.propertyName) {
                alert(this.id + ' getFillPatchRequest must have value or propertyName parameters!');
                return;
            }
            if (params.iterationNumber && params.iterationNumber === 0) {
                alert(this.id + ' getFillPatchRequest params.iterationNumber can not be 0!');
                return;
            }
            if (params.until && params.until < 0) {
                alert(this.id + ' getFillPatchRequest params.until must be greater than or equal to 0!');
                return;
            }
            let val = params.value !== false && typeof params.value !== 'undefined' ? params.value : this.cellData[this.row][this.column][params.propertyName],
                requests = [], start = parseInt(this.column),
                iterationNumber = params.iterationNumber ? params.iterationNumber : 1,
                end = params.until ? params.until : iterationNumber > 0 ? this.cellData[this.row].length : 0,
                cell, cellCondition = params.cellCondition ? params.cellCondition : () => true,
                template = (ordinal, value) => `{"Ordinal": \"${ordinal}\","Value": \"${value}\"}`;
            if (iterationNumber < 0) {
                const t = start;
                start = end;
                end = t;
                iterationNumber *= -1;
            }
            if (end > this.cellData.length) {
                alert(this.id + ' getFillPatchRequest wrong range params (params.until, params.iterationNumber)');
                return;
            }
            if (params.valueTransformation) {
                val = params.valueTransformation(val);
            }
            while (start < end) {
                cell = this.cellData[this.row][start];
                if (cellCondition(cell)) {
                    requests.push(template(cell.ordinal, val));
                }
                start += iterationNumber;
            }
            return `[${requests.join(',')}]`;
        }
    }

    addGridTableListeners() {
        const cellData = v(this.options.id + '.cellData'), h = Listeners.handle;
        if (cellData && cellData.length > 0) {
            let widgetOptions, cells = [], rowNum = cellData.length, i, j, cw;
            for (widgetOptions of this.options.widgets || []) {
                if ('GridTableHeaderRowWidget' !== widgetOptions.type.name) {
                    cells.push(widgetOptions);
                }
            }
            for (i = 0; i < rowNum; ++i) {
                for (j = 0; j < cells.length; ++j) {
                    cw = cells[j].widgets[0];
                    const o = {...cw, ...{id: this.options.id + '_' + i + '_' + j}};
                    if (o.listen) {
                        for (let l of o.listen) {
                            Listeners.push({
                                options: o,
                                method: l.method,
                                eventName: l.event,
                                parameters: l.parameters || [],
                                handler: h
                            });
                        }
                    }
                    if (o.depends) {
                        const f = o.id.split('_'), a = f[0], b = f[1];
                        for (let l of o.depends) {
                            Listeners.push({
                                options: o,
                                method: 'refreshGridCell',
                                eventName: l.event ? l.event : l.action + '.' + a + '_' + b + '_' + l.col + '.finished',
                                parameters: l.parameters || [],
                                handler: h
                            });
                        }
                    }
                }
            }
        }
    }
}