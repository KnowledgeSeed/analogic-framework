/* global Widget, Widgets */

'use strict';

class GpuTableWidget extends Widget {

    constructor(options) {
        super(options);
        this.state = {
            columns: [],
            rows: [],
            skin: 'default'
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
            zebra: this.getRealValue('zebra', d, true)
        };
    }

    getHtml(widgets, d) {
        const o = this.options;
        const parameters = this.getParameters(d);
        this.state.columns = Array.isArray(parameters.columns) ? parameters.columns.slice() : [];
        this.state.rows = Array.isArray(parameters.rows) ? parameters.rows.slice() : [];
        this.state.skin = parameters.skin || 'default';

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
    <div class="ks-gpu-table_fallback" aria-live="polite"></div>
</section>`;
    }

    updateHtml(data) {
        const parameters = this.getParameters(data);
        this.state.columns = Array.isArray(parameters.columns) ? parameters.columns.slice() : [];
        this.state.rows = Array.isArray(parameters.rows) ? parameters.rows.slice() : [];
        this.state.skin = parameters.skin || 'default';

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

        this.refreshGpuScene();
    }

    initEventHandlers() {
        this.dom.root = $('#' + this.options.id);
        this.dom.canvas = this.dom.root.find('canvas.ks-gpu-table_canvas')[0];
        this.dom.fallback = this.dom.root.find('.ks-gpu-table_fallback')[0];

        if (!this.dom.canvas) {
            return;
        }

        this.attachResizeObserver();
        this.refreshGpuScene();
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
        this.refreshGpuScene();
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
        const rows = Array.isArray(this.state.rows) ? this.state.rows.length : 0;
        const cellWidth = 2 / Math.max(1, columns);
        const cellHeight = 2 / Math.max(1, rows || 1);
        const vertices = [];

        for (let rowIndex = 0; rowIndex < Math.max(rows, 1); rowIndex++) {
            for (let colIndex = 0; colIndex < Math.max(columns, 1); colIndex++) {
                const x0 = -1 + colIndex * cellWidth;
                const x1 = x0 + cellWidth;
                const y0 = 1 - rowIndex * cellHeight;
                const y1 = y0 - cellHeight;
                const color = this.resolveCellColor(rowIndex, colIndex);

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

    resolveCellColor(rowIndex, colIndex) {
        const baseValue = this.extractCellValue(rowIndex, colIndex);
        if (typeof baseValue === 'number' && isFinite(baseValue)) {
            const normalized = Math.max(0, Math.min(1, baseValue));
            return [0.2 + 0.8 * normalized, 0.4, 0.9 - 0.5 * normalized];
        }
        if (typeof baseValue === 'string') {
            const hash = this.simpleHash(baseValue + rowIndex + ':' + colIndex);
            return [((hash >> 16) & 255) / 255, ((hash >> 8) & 255) / 255, (hash & 255) / 255];
        }
        return [(colIndex % 2) * 0.25 + 0.35, (rowIndex % 2) * 0.25 + 0.35, 0.65];
    }

    extractCellValue(rowIndex, colIndex) {
        const row = this.state.rows[rowIndex];
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
                clearValue: {r: 0.07, g: 0.07, b: 0.09, a: 1.0},
                loadOp: 'clear',
                storeOp: 'store'
            }]
        });

        passEncoder.setPipeline(this.pipeline);
        passEncoder.setVertexBuffer(0, vertexBuffer);
        passEncoder.draw(vertices.length / 5, 1, 0, 0);
        passEncoder.end();
        device.queue.submit([commandEncoder.finish()]);
    }
}

;
