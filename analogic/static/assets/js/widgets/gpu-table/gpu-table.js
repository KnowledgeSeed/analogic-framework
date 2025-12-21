/* global Widget, Widgets */

'use strict';

class GpuTableWidget extends Widget {

    constructor(options) {
        super(options);
        this.state = {
            columns: [],
            rows: [],
            skin: 'default',
            zebra: true,
            page: 1,
            pageSize: 200,
            totalCount: 0
        };
        this.dom = {};
        this.gpu = null;
        this.resizeObserver = null;
        Widgets[options.id] = this;
    }

    getParameters(d) {
        return {
            width: this.getRealValue('width', d, '100%'),
            height: this.getRealValue('height', d, '320px'),
            skin: this.getRealValue('skin', d, 'default'),
            columns: this.getRealValue('columns', d, []),
            rows: this.getRealValue('rows', d, []),
            zebra: this.getRealValue('zebra', d, true),
            page: this.getRealValue('page', d, 1),
            pageSize: this.getRealValue('pageSize', d, 200),
            totalCount: this.getRealValue('totalCount', d, undefined)
        };
    }

    getHtml(widgets, d) {
        const o = this.options;
        const parameters = this.getParameters(d);
        this.state.columns = Array.isArray(parameters.columns) ? parameters.columns.slice() : [];
        this.state.rows = Array.isArray(parameters.rows) ? parameters.rows.slice() : [];
        this.state.skin = parameters.skin || 'default';
        this.state.zebra = !!parameters.zebra;
        this.state.page = Math.max(1, parseInt(parameters.page, 10) || 1);
        this.state.pageSize = Math.max(1, parseInt(parameters.pageSize, 10) || 200);
        this.state.totalCount = Number.isFinite(parameters.totalCount) ? parameters.totalCount : this.state.rows.length;

        const styles = this.getGeneralStyles ? this.getGeneralStyles(d) : [];
        if (parameters.width) {
            styles.push(`width:${parameters.width};`);
        }
        if (parameters.height) {
            styles.push(`height:${parameters.height};`);
        }

        const classes = ['ks-gpu-table', `ks-gpu-table--skin-${this.state.skin}`];

        return `
<section id="${o.id}" class="${classes.join(' ')}" data-id="${o.id}" data-skin="${this.state.skin}" style="${styles.join('')}">
    <canvas class="ks-gpu-table_canvas" data-id="${o.id}" aria-label="GPU rendered table"></canvas>
    <canvas class="ks-gpu-table_overlay" data-id="${o.id}" aria-label="GPU rendered table labels"></canvas>
    <div class="ks-gpu-table_pager" aria-label="Table pager controls">
        <button type="button" class="ks-gpu-table_pager-btn ks-gpu-table_pager-btn--prev" data-action="prev" aria-label="Previous page">‹</button>
        <span class="ks-gpu-table_pager-info">1 / 1</span>
        <button type="button" class="ks-gpu-table_pager-btn ks-gpu-table_pager-btn--next" data-action="next" aria-label="Next page">›</button>
    </div>
    <div class="ks-gpu-table_fallback" aria-live="polite"></div>
</section>`;
    }

    updateHtml(data) {
        const parameters = this.getParameters(data);
        this.state.columns = Array.isArray(parameters.columns) ? parameters.columns.slice() : [];
        this.state.rows = Array.isArray(parameters.rows) ? parameters.rows.slice() : [];
        this.state.skin = parameters.skin || 'default';
        this.state.zebra = !!parameters.zebra;
        this.state.pageSize = Math.max(1, parseInt(parameters.pageSize, 10) || this.state.pageSize || 200);
        this.state.totalCount = Number.isFinite(parameters.totalCount) ? parameters.totalCount : this.state.rows.length;
        this.state.page = Math.max(1, Math.min(this.getTotalPages(), parseInt(parameters.page, 10) || this.state.page || 1));

        if (this.dom.root) {
            this.dom.root.attr('data-skin', this.state.skin);
            this.dom.root.removeClass(function(index, className) {
                return (className || '').split(' ').filter(name => name.startsWith('ks-gpu-table--skin-')).join(' ');
            });
            this.dom.root.addClass(`ks-gpu-table--skin-${this.state.skin}`);
        }

        if (parameters.width) {
            this.dom.root.css('width', parameters.width);
        }
        if (parameters.height) {
            this.dom.root.css('height', parameters.height);
        }

        this.updatePagerUi();
        this.refreshGpuScene();
    }

    initEventHandlers() {
        this.dom.root = $('#' + this.options.id);
        this.dom.canvas = this.dom.root.find('canvas.ks-gpu-table_canvas')[0];
        this.dom.overlay = this.dom.root.find('canvas.ks-gpu-table_overlay')[0];
        this.dom.pager = this.dom.root.find('.ks-gpu-table_pager')[0];
        this.dom.pagerInfo = this.dom.root.find('.ks-gpu-table_pager-info')[0];
        this.dom.pagerPrev = this.dom.root.find('.ks-gpu-table_pager-btn--prev')[0];
        this.dom.pagerNext = this.dom.root.find('.ks-gpu-table_pager-btn--next')[0];
        this.dom.fallback = this.dom.root.find('.ks-gpu-table_fallback')[0];

        if (!this.dom.canvas) {
            return;
        }

        this.bindPager();
        this.attachResizeObserver();
        this.refreshGpuScene();
    }

    bindPager() {
        if (!this.dom.pager) {
            return;
        }
        if (this.dom.pagerPrev) {
            this.dom.pagerPrev.addEventListener('click', () => this.goToPage(this.state.page - 1));
        }
        if (this.dom.pagerNext) {
            this.dom.pagerNext.addEventListener('click', () => this.goToPage(this.state.page + 1));
        }
        this.updatePagerUi();
    }

    attachResizeObserver() {
        if (this.resizeObserver) {
            return;
        }

        if (typeof ResizeObserver === 'undefined') {
            this.resizeCanvas();
            return;
        }

        this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
        this.resizeObserver.observe(this.dom.root[0]);
    }

    resizeCanvas() {
        if (!this.dom || !this.dom.canvas) {
            return;
        }
        const rect = this.dom.root[0].getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;
        this.dom.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
        this.dom.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
        if (this.dom.canvas.style) {
            this.dom.canvas.style.width = `${Math.max(1, Math.floor(rect.width))}px`;
            this.dom.canvas.style.height = `${Math.max(1, Math.floor(rect.height))}px`;
        }
        if (this.dom.overlay) {
            this.dom.overlay.width = Math.max(1, Math.floor(rect.width * ratio));
            this.dom.overlay.height = Math.max(1, Math.floor(rect.height * ratio));
            if (this.dom.overlay.style) {
                this.dom.overlay.style.width = `${Math.max(1, Math.floor(rect.width))}px`;
                this.dom.overlay.style.height = `${Math.max(1, Math.floor(rect.height))}px`;
            }
        }
        this.refreshGpuScene();
    }

    getTotalPages() {
        const totalRows = Number.isFinite(this.state.totalCount) ? this.state.totalCount : this.state.rows.length;
        return Math.max(1, Math.ceil(totalRows / Math.max(1, this.state.pageSize)));
    }

    goToPage(targetPage) {
        const totalPages = this.getTotalPages();
        const nextPage = Math.max(1, Math.min(totalPages, targetPage));
        if (nextPage === this.state.page) {
            return;
        }
        this.state.page = nextPage;
        this.updatePagerUi();
        this.refreshGpuScene();
    }

    getVisibleRows() {
        const startIndex = (this.state.page - 1) * this.state.pageSize;
        const endIndex = startIndex + this.state.pageSize;
        return this.state.rows.slice(startIndex, endIndex);
    }

    updatePagerUi() {
        if (!this.dom.pagerInfo) {
            return;
        }
        const totalPages = this.getTotalPages();
        this.state.page = Math.min(this.state.page, totalPages);
        this.dom.pagerInfo.textContent = `${this.state.page} / ${totalPages}`;
        if (this.dom.pagerPrev) {
            this.dom.pagerPrev.disabled = this.state.page <= 1;
        }
        if (this.dom.pagerNext) {
            this.dom.pagerNext.disabled = this.state.page >= totalPages;
        }
    }

    async refreshGpuScene() {
        if (!this.dom.canvas) {
            return;
        }

        await this.ensureWebGpu();
        if (this.gpu && this.gpu.device) {
            this.drawGrid();
        }
    }

    async ensureWebGpu() {
        if (this.gpu && this.gpu.device) {
            return this.gpu;
        }

        if (!navigator.gpu) {
            this.showFallback('A böngésző nem támogatja a WebGPU-t.');
            return null;
        }

        try {
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                this.showFallback('A WebGPU adapter nem érhető el.');
                return null;
            }
            const device = await adapter.requestDevice();
            const context = this.dom.canvas.getContext('webgpu');
            const format = navigator.gpu.getPreferredCanvasFormat();
            context.configure({device, format, alphaMode: 'premultiplied'});
            this.gpu = {device, context, format};
            this.hideFallback();
            return this.gpu;
        } catch (error) {
            console.error('GpuTableWidget: WebGPU inicializálási hiba', error);
            this.showFallback('A WebGPU inicializálása sikertelen.');
            return null;
        }
    }

    showFallback(message) {
        if (this.dom.fallback) {
            this.dom.fallback.textContent = message;
            this.dom.fallback.classList.add('is-visible');
        }
    }

    hideFallback() {
        if (this.dom.fallback) {
            this.dom.fallback.textContent = '';
            this.dom.fallback.classList.remove('is-visible');
        }
    }

    buildGeometry() {
        const columns = this.state.columns && this.state.columns.length > 0 ? this.state.columns.length : this.deriveColumnCount();
        const dataRows = this.getVisibleRows();
        const dataRowCount = Array.isArray(dataRows) ? dataRows.length : 0;
        const hasHeader = columns > 0;
        const totalRows = Math.max(dataRowCount + (hasHeader ? 1 : 0), 1);
        const cellWidth = 2 / Math.max(1, columns);
        const cellHeight = 2 / totalRows;
        const vertices = [];

        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            for (let colIndex = 0; colIndex < Math.max(columns, 1); colIndex++) {
                const x0 = -1 + colIndex * cellWidth;
                const x1 = x0 + cellWidth;
                const y0 = 1 - rowIndex * cellHeight;
                const y1 = y0 - cellHeight;
                const color = this.resolveCellColor(rowIndex, colIndex, {
                    isHeader: hasHeader && rowIndex === 0,
                    dataRowIndex: hasHeader ? rowIndex - 1 : rowIndex
                });

                vertices.push(
                    x0, y0, color[0], color[1], color[2],
                    x1, y0, color[0], color[1], color[2],
                    x0, y1, color[0], color[1], color[2],
                    x0, y1, color[0], color[1], color[2],
                    x1, y0, color[0], color[1], color[2],
                    x1, y1, color[0], color[1], color[2]
                );
            }
        }
        return new Float32Array(vertices);
    }

    deriveColumnCount() {
        if (!Array.isArray(this.state.rows) || this.state.rows.length === 0) {
            return 1;
        }
        const firstRow = this.state.rows[0];
        if (Array.isArray(firstRow)) {
            return firstRow.length;
        }
        if (typeof firstRow === 'object' && firstRow !== null) {
            return Object.keys(firstRow).length;
        }
        return 1;
    }

    resolveCellColor(rowIndex, colIndex, {isHeader, dataRowIndex}) {
        const palette = this.getPalette();
        if (isHeader) {
            return palette.header;
        }
        const zebraEnabled = this.state.zebra !== false;
        if (zebraEnabled) {
            return (dataRowIndex % 2 === 0) ? palette.even : palette.odd;
        }
        const baseValue = this.extractCellValue(dataRowIndex, colIndex);
        if (typeof baseValue === 'number' && isFinite(baseValue)) {
            const normalized = Math.max(0, Math.min(1, baseValue));
            const mix = (a, b, t) => a + (b - a) * t;
            return [
                mix(palette.even[0], palette.odd[0], normalized),
                mix(palette.even[1], palette.odd[1], normalized),
                mix(palette.even[2], palette.odd[2], normalized)
            ];
        }
        return palette.even;
    }

    getPalette() {
        const skins = {
            default: {
                clear: this.hexToRgb('#ffffff'),
                header: this.hexToRgb('#f5f7fa'),
                even: this.hexToRgb('#ffffff'),
                odd: this.hexToRgb('#f0f4f8'),
                text: '#0b0f1a',
                grid: '#d8dee9'
            },
            contrast: {
                clear: this.hexToRgb('#ffffff'),
                header: this.hexToRgb('#e9eef5'),
                even: this.hexToRgb('#ffffff'),
                odd: this.hexToRgb('#eef2f7'),
                text: '#0b0f1a',
                grid: '#c5d3e2'
            }
        };
        return skins[this.state.skin] || skins.default;
    }

    hexToRgb(hex) {
        const parsed = hex.replace('#', '');
        const bigint = parseInt(parsed, 16);
        return [
            ((bigint >> 16) & 255) / 255,
            ((bigint >> 8) & 255) / 255,
            (bigint & 255) / 255
        ];
    }

    extractCellValue(rowIndex, colIndex) {
        const visibleRows = this.getVisibleRows();
        const row = visibleRows[rowIndex];
        if (!row) {
            return null;
        }
        if (Array.isArray(row)) {
            return row[colIndex];
        }
        const column = this.state.columns[colIndex];
        if (column && column.field && Object.prototype.hasOwnProperty.call(row, column.field)) {
            return row[column.field];
        }
        const keys = Object.keys(row);
        return row[keys[colIndex]];
    }

    simpleHash(value) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = (hash << 5) - hash + value.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    createPipeline() {
        const {device, format} = this.gpu;
        const shaderCode = `
        struct VertexOutput {
            @builtin(position) position : vec4f,
            @location(0) color : vec3f,
        };

        @vertex
        fn vs(@location(0) position : vec2f, @location(1) color : vec3f) -> VertexOutput {
            var out : VertexOutput;
            out.position = vec4f(position, 0.0, 1.0);
            out.color = color;
            return out;
        }

        @fragment
        fn fs(in : VertexOutput) -> @location(0) vec4f {
            return vec4f(in.color, 1.0);
        }`;

        const module = device.createShaderModule({code: shaderCode});
        return device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module,
                entryPoint: 'vs',
                buffers: [
                    {
                        arrayStride: 5 * 4,
                        attributes: [
                            {shaderLocation: 0, offset: 0, format: 'float32x2'},
                            {shaderLocation: 1, offset: 2 * 4, format: 'float32x3'}
                        ]
                    }
                ]
            },
            fragment: {
                module,
                entryPoint: 'fs',
                targets: [{format}]
            },
            primitive: {topology: 'triangle-list'}
        });
    }

    drawGrid() {
        if (!this.gpu || !this.gpu.device || !this.gpu.context) {
            return;
        }
        const {device, context} = this.gpu;
        const palette = this.getPalette();
        const vertices = this.buildGeometry();
        const vertexBuffer = device.createBuffer({
            size: vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });
        device.queue.writeBuffer(vertexBuffer, 0, vertices.buffer, vertices.byteOffset, vertices.byteLength);

        if (!this.pipeline) {
            this.pipeline = this.createPipeline();
        }

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        const passEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [{
                view: textureView,
                clearValue: {r: palette.clear[0], g: palette.clear[1], b: palette.clear[2], a: 1.0},
                loadOp: 'clear',
                storeOp: 'store'
            }]
        });

        passEncoder.setPipeline(this.pipeline);
        passEncoder.setVertexBuffer(0, vertexBuffer);
        passEncoder.draw(vertices.length / 5, 1, 0, 0);
        passEncoder.end();
        device.queue.submit([commandEncoder.finish()]);
        this.drawOverlayText();
    }

    drawOverlayText() {
        if (!this.dom.overlay) {
            return;
        }
        const ctx = this.dom.overlay.getContext('2d');
        if (!ctx) {
            return;
        }
        const ratio = window.devicePixelRatio || 1;
        ctx.save();
        ctx.scale(ratio, ratio);
        ctx.clearRect(0, 0, this.dom.overlay.width, this.dom.overlay.height);

        const columns = this.state.columns && this.state.columns.length > 0 ? this.state.columns.length : this.deriveColumnCount();
        const visibleRows = this.getVisibleRows();
        const dataRowCount = Array.isArray(visibleRows) ? visibleRows.length : 0;
        const hasHeader = columns > 0;
        const totalRows = Math.max(dataRowCount + (hasHeader ? 1 : 0), 1);
        const width = Math.max(1, this.dom.overlay.clientWidth || this.dom.overlay.width / ratio);
        const height = Math.max(1, this.dom.overlay.clientHeight || this.dom.overlay.height / ratio);
        const cellWidth = width / Math.max(1, columns);
        const cellHeight = height / totalRows;
        const palette = this.getPalette();

        ctx.font = `${Math.max(10, Math.floor(cellHeight * 0.4))}px "Inter", "Segoe UI", sans-serif`;
        ctx.fillStyle = palette.text;
        ctx.textBaseline = 'middle';

        const padding = 6;
        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            for (let colIndex = 0; colIndex < columns; colIndex++) {
                const x = colIndex * cellWidth + padding;
                const y = rowIndex * cellHeight + cellHeight / 2;
                let value = '';
                if (hasHeader && rowIndex === 0) {
                    const column = this.state.columns[colIndex];
                    value = column ? (column.title || column.field || '') : '';
                } else {
                    const dataIndex = hasHeader ? rowIndex - 1 : rowIndex;
                    const cellValue = this.extractCellValue(dataIndex, colIndex);
                    value = cellValue !== undefined && cellValue !== null ? String(cellValue) : '';
                }
                ctx.fillText(value, x, y);
            }
        }
        ctx.restore();
    }
}

;
