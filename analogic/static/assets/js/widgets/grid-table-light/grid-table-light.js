'use strict';

class GridTableLightWidget extends Widget {

    constructor(options) {
        super(options);
        this.currentPage = 1;
        this.totalPages = 1;
        this.pageSize = 0;
        this.totalRows = 0;
        this.allData = [];
        this.columnCount = 0;
        this.frozenHeadersEnabled = false;
    }

    getHtml(data) {
        const o = this.options;
        let processedData = Array.isArray(data) ? data : data.content;
        const params = this.getParameters(data);
        
        let mainDivStyle = this.getGeneralStyles(data);
        if (params.hideIfNoData === true && (!processedData || processedData.length === 0)) {
            mainDivStyle.push('display:none;');
        }

        if (o.errorMessage !== '') {
            return `<div><h3 style="color:red;">${o.errorMessage}</h3></div>`;
        }

        // Store original data for pagination and export
        this.allData = processedData;
        this.totalRows = processedData.length;
        
        // Get column count from widget config or data
        this.columnCount = params.columnCount || (processedData[0] ? processedData[0].length : 0);
        
        // Setup pagination if pageSize is specified
        if (params.pageSize && params.pageSize > 0) {
            this.pageSize = params.pageSize;
            this.totalPages = Math.ceil(this.totalRows / this.pageSize);
            processedData = this.getPaginatedData(processedData, this.currentPage, this.pageSize);
        }

        // Build table HTML
        const tableHtml = this.buildTableHtml(processedData, params);
        const exportButton = params.enableExport ? this.buildExportButtonHtml() : '';
        const paginationHtml = this.buildPaginationHtml(params);

        return this.getWidgetHtml(
            `${exportButton}${tableHtml}${paginationHtml}`, 
            o.title || '', 
            mainDivStyle
        );
    }

    getParameters(data) {
        return {
            borderBottom: this.getRealValue('borderBottom', data, true),
            borderTop: this.getRealValue('borderTop', data, true),
            columnCount: this.getRealValue('columnCount', data, 0),
            enableExport: this.getRealValue('enableExport', data, false),
            freezeHeaders: this.getRealValue('freezeHeaders', data, false),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            pageSize: this.getRealValue('pageSize', data, 0),
            rowHeight: this.getRealValue('rowHeight', data, false),
            skin: this.getRealValue('skin', data, 'standard'),
            width: this.getRealValue('width', data, false)
        };
    }

    buildTableHtml(data, params) {
        if (!data || data.length === 0) {
            return '<div class="grid-table-light-empty">No data available</div>';
        }

        const headerHtml = this.buildHeaderHtml(params);
        const bodyHtml = this.buildBodyHtml(data, params);
        const freezeClass = params.freezeHeaders ? 'freeze-headers' : '';
        
        return `
            <div class="grid-table-light ${freezeClass} grid-table-light-${params.skin}" id="${this.options.id}-table">
                ${headerHtml}
                <div class="grid-table-light-body">
                    ${bodyHtml}
                </div>
            </div>
        `;
    }

    buildHeaderHtml(params) {
        if (!this.options.headers || this.options.headers.length === 0) {
            return '';
        }

        let headerCells = '';
        for (let i = 0; i < this.columnCount && i < this.options.headers.length; i++) {
            const header = this.options.headers[i];
            headerCells += `
                <div class="grid-table-light-header-cell" style="${header.width ? `width:${header.width}px;` : ''}">
                    <div class="grid-table-light-header-content">
                        ${header.title || ''}
                    </div>
                </div>
            `;
        }

        return `
            <div class="grid-table-light-header" ${params.rowHeight ? `style="height:${params.rowHeight}px;"` : ''}>
                ${headerCells}
            </div>
        `;
    }

    buildBodyHtml(data, params) {
        let rowsHtml = '';
        
        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];
            let cellsHtml = '';
            
            for (let j = 0; j < this.columnCount && j < rowData.length; j++) {
                const cellData = rowData[j];
                const cellContent = this.renderCellContent(cellData, i, j);
                
                cellsHtml += `
                    <div class="grid-table-light-cell" data-row="${i}" data-col="${j}">
                        <div class="grid-table-light-cell-content">
                            ${cellContent}
                        </div>
                    </div>
                `;
            }
            
            rowsHtml += `
                <div class="grid-table-light-row" data-row="${i}" ${params.rowHeight ? `style="height:${params.rowHeight}px;"` : ''}>
                    ${cellsHtml}
                </div>
            `;
        }
        
        return rowsHtml;
    }

    renderCellContent(cellData, row, col) {
        // Handle different cell types
        if (typeof cellData === 'object' && cellData !== null) {
            if (cellData.type === 'button') {
                return `<button class="grid-light-button" data-row="${row}" data-col="${col}">${cellData.title || cellData.value || 'Button'}</button>`;
            }
            if (cellData.type === 'select') {
                let options = '';
                if (cellData.options) {
                    cellData.options.forEach(opt => {
                        const selected = opt.value === cellData.value ? 'selected' : '';
                        options += `<option value="${opt.value}" ${selected}>${opt.title}</option>`;
                    });
                }
                return `<select class="grid-light-select" data-row="${row}" data-col="${col}">${options}</select>`;
            }
            return cellData.title || cellData.value || '';
        }
        
        return cellData || '';
    }

    buildExportButtonHtml() {
        return `
            <div class="grid-table-light-export">
                <button class="grid-light-export-btn" title="Export to Excel">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                </button>
            </div>
        `;
    }

    buildPaginationHtml(params) {
        if (!params.pageSize || params.pageSize <= 0 || this.totalPages <= 1) {
            return '';
        }

        const prevDisabled = this.currentPage <= 1 ? 'disabled' : '';
        const nextDisabled = this.currentPage >= this.totalPages ? 'disabled' : '';
        const firstDisabled = this.currentPage <= 1 ? 'disabled' : '';
        const lastDisabled = this.currentPage >= this.totalPages ? 'disabled' : '';

        return `
            <div class="grid-table-light-pagination">
                <button class="grid-light-page-btn first-page" ${firstDisabled} title="First page">&lt;&lt;</button>
                <button class="grid-light-page-btn prev-page" ${prevDisabled} title="Previous page">&lt;</button>
                <span class="grid-light-page-info">
                    ${this.currentPage} / ${this.totalPages}
                </span>
                <button class="grid-light-page-btn next-page" ${nextDisabled} title="Next page">&gt;</button>
                <button class="grid-light-page-btn last-page" ${lastDisabled} title="Last page">&gt;&gt;</button>
            </div>
        `;
    }

    getPaginatedData(data, page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, data.length);
        return data.slice(startIndex, endIndex);
    }

    getWidgetHtml(innerHtml, title, mainDivStyle) {
        const titleHtml = title ? `<h3 class="grid-table-light-title">${title}</h3>` : '';
        return `<div style="${mainDivStyle.join('')}" class="grid-table-light-wrapper">${titleHtml}${innerHtml}</div>`;
    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        this.isRendering = true;
        const o = this.options;
        const instance = this;

        let afterLoad = (data) => {
            let processedData = instance.processData(data);
            
            if (!Array.isArray(processedData)) {
                processedData = processedData.content;
            }
            
            o.errorMessage = '';

            if (processedData && processedData.length > 0) {
                const expectedCols = instance.columnCount || processedData[0].length;
                const actualCols = processedData[0] ? processedData[0].length : 0;
                
                if (actualCols !== expectedCols && actualCols > 0) {
                    console.warn(`GridTableLight: Column count mismatch. Expected: ${expectedCols}, Actual: ${actualCols}`);
                }
            }

            let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;
            let ghtml = instance.getHtml(data);
            let gs = [];
            
            if (o.applyMeasuresToSection === true) {
                gs = instance.getWidthAndHeight(data);
            }

            if (visible === false) {
                gs.push('display:none;');
            }

            return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id}">${ghtml}</section>`;
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

        const container = $('#' + o.id);
        
        // Pagination events
        container.off('.gridTableLight').on('click.gridTableLight', '.grid-light-page-btn', (e) => {
            const btn = $(e.currentTarget);
            
            if (btn.hasClass('disabled')) {
                return;
            }
            
            if (btn.hasClass('first-page')) {
                this.goToPage(1);
            } else if (btn.hasClass('prev-page')) {
                this.goToPage(this.currentPage - 1);
            } else if (btn.hasClass('next-page')) {
                this.goToPage(this.currentPage + 1);
            } else if (btn.hasClass('last-page')) {
                this.goToPage(this.totalPages);
            }
        });

        // Export button event
        container.on('click.gridTableLight', '.grid-light-export-btn', (e) => {
            e.preventDefault();
            this.exportToExcel();
        });

        // Button clicks within cells
        container.on('click.gridTableLight', '.grid-light-button', (e) => {
            const btn = $(e.currentTarget);
            const row = btn.data('row');
            const col = btn.data('col');
            this.handleCellButtonClick(row, col, btn);
        });

        // Select changes within cells
        container.on('change.gridTableLight', '.grid-light-select', (e) => {
            const select = $(e.currentTarget);
            const row = select.data('row');
            const col = select.data('col');
            this.handleCellSelectChange(row, col, select);
        });

        this.isRendering = false;
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) {
            return;
        }
        
        this.currentPage = page;
        
        // Re-render with current data but new page
        const params = this.getParameters({});
        const paginatedData = this.getPaginatedData(this.allData, this.currentPage, this.pageSize);
        const bodyHtml = this.buildBodyHtml(paginatedData, params);
        
        $(`#${this.options.id} .grid-table-light-body`).html(bodyHtml);
        $(`#${this.options.id} .grid-table-light-pagination`).html(
            this.buildPaginationHtml(params).replace(/<div[^>]*>|<\/div>/g, '')
        );
    }

    exportToExcel() {
        if (typeof GridTableExport === 'undefined') {
            console.error('GridTableExport is not available');
            alert('Export functionality is not available');
            return;
        }

        // Prepare data for export (use all data, not just current page)
        const exportData = {
            options: {
                widgets: this.options.headers ? this.options.headers.map(h => ({ 
                    title: h.title,
                    width: h.width || 100
                })) : []
            },
            cellData: this.allData.map(row => 
                row.map(cell => ({
                    title: typeof cell === 'object' && cell !== null ? (cell.title || cell.value || '') : (cell || ''),
                    editable: false
                }))
            )
        };

        const config = {
            sheetName: this.options.title || 'GridTableLight Export',
            fileName: `${this.options.title || 'gridtable-light'}.xlsx`
        };

        GridTableExport.triggerExcelExport(exportData, config);
    }

    handleCellButtonClick(row, col, button) {
        // Override in subclasses or handle via event map
        console.log(`Button clicked at row ${row}, col ${col}`);
        
        // Trigger custom event for event map handling
        El.body.trigger('cellButtonClick.' + this.options.id, {
            row: row,
            col: col,
            button: button.get(0),
            widget: this
        });
    }

    handleCellSelectChange(row, col, select) {
        // Override in subclasses or handle via event map
        console.log(`Select changed at row ${row}, col ${col}, value: ${select.val()}`);
        
        // Trigger custom event for event map handling
        El.body.trigger('cellSelectChange.' + this.options.id, {
            row: row,
            col: col,
            value: select.val(),
            select: select.get(0),
            widget: this
        });
    }

    updateContent(data = false, loadFunction = QB.loadData) {
        const o = this.options;
        const instance = this;

        return loadFunction(o.id, instance.name).then(function (d) {
            const processedData = instance.processData(d);
            const params = instance.getParameters(d);
            
            let newData = Array.isArray(processedData) ? processedData : processedData.content;
            
            instance.allData = newData;
            instance.totalRows = newData.length;
            
            if (params.pageSize && params.pageSize > 0) {
                instance.pageSize = params.pageSize;
                instance.totalPages = Math.ceil(instance.totalRows / instance.pageSize);
                
                // Reset to first page if current page is now invalid
                if (instance.currentPage > instance.totalPages) {
                    instance.currentPage = 1;
                }
                
                newData = instance.getPaginatedData(newData, instance.currentPage, instance.pageSize);
            }

            // Update table body
            const bodyHtml = instance.buildBodyHtml(newData, params);
            $(`#${o.id} .grid-table-light-body`).html(bodyHtml);
            
            // Update pagination if needed
            if (params.pageSize && params.pageSize > 0) {
                $(`#${o.id} .grid-table-light-pagination`).html(
                    instance.buildPaginationHtml(params).replace(/<div[^>]*>|<\/div>/g, '')
                );
            }

            return Promise.resolve('update');
        });
    }

    reset() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.pageSize = 0;
        this.totalRows = 0;
        this.allData = [];
        this.columnCount = 0;
        
        // Remove event listeners
        const container = $('#' + this.options.id);
        container.off('.gridTableLight');
    }
}