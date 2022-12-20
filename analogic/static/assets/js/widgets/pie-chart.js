'use strict';

class PieChartWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const demoData = [
            {value: 77, label: 'A', backgroundColor: 'red', borderWidth: 2},
            {value: 35, label: 'B', backgroundColor: 'blue', borderWidth: 2},
            {value: 19, label: 'C', backgroundColor: 'green', borderWidth: 2}
        ];

        const dataset = o.dataset || d.dataset ? $.extend(true, [], o.dataset || [], d.dataset || []) : demoData;

        const v = {
            canvasHeight: this.getRealValue('canvasHeight', d, false),
            canvasWidth: this.getRealValue('canvasWidth', d, false),
            data: this.getRealValue('data', d, dataset),
            skin: this.getRealValue('skin', d, 'standard'),
            legendSkin: this.getRealValue('legendSkin', d, 'standard'),
            labelDisplay: this.getRealValue('labelDisplay', d, true),
            labelAlign: this.getRealValue('labelAlign', d, 'center'),
            labelBorderColor: this.getRealValue('labelBorderColor', d, '#fff'),
            labelBorderWidth: this.getRealValue('labelBorderWidth', d, 0),
            labelBackgroundColor: this.getRealValue('labelBackgroundColor', d, '#fff'),
            labelBorderRadius: this.getRealValue('labelBorderRadius', d, 0),
            labelTextAlign: this.getRealValue('labelTextAlign', d, 'center'),
            labelAnchor: this.getRealValue('labelAnchor', d, 'center'),
            labelPaddingTop: this.getRealValue('labelPaddingTop', d, 0),
            labelPaddingBottom: this.getRealValue('labelPaddingBottom', d, 0),
            labelPaddingLeft: this.getRealValue('labelPaddingLeft', d, 0),
            labelPaddingRight: this.getRealValue('labelPaddingRight', d, 0),
            labelFontSize: this.getRealValue('labelFontSize', d, 12),
            labelFontColor: this.getRealValue('labelFontColor', d, 'black'),
            labelFontWeight: this.getRealValue('labelFontWeight', d, 'normal'),
            aspectRatio: this.getRealValue('aspectRatio', d, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', d, true)
        };

        this.value = v;

        return `
<div class="ks-pie-chart ks-pie-chart-${v.skin}" style="${this.getGeneralStyles(v.data, {width: 450, height: 450}).join('')}">
    <div class="ks-pie-chart-title"><h3>${o.title}</h3></div>
    <div class="ks-pie-chart-widget">
        <canvas ${v.canvasWidth ? `width="${v.canvasWidth}"` : ''} ${v.canvasHeight ? `height="${v.canvasHeight}"` : ''} id="${o.id}Canvas"></canvas>
    </div>
    <div class="ks-legend ks-legend-${v.legendSkin}"></div>
</div>`;
    }

    initEventHandlers() {
        const canvas = $('#' + this.options.id + 'Canvas'), ctx = canvas[0].getContext('2d'), c = new Chart(ctx, PieChartWidget.getChartConfig(this.value));

        canvas.parent().next().html(c.generateLegend()).on('click', '.ks-legend-item', e => {
            let legend = $(e.target).closest('.ks-legend-item').toggleClass('off'), id = legend.data('id');

            c.getDatasetMeta(0).data[id].hidden = !c.getDatasetMeta(0).data[id].hidden;

            c.update();
        });
    }

    static getChartConfig(v) {
        let datalabels = {
            display: v.labelDisplay,
            align: v.labelAlign,
            borderColor: v.labelBorderColor,
            borderWidth: v.labelBorderWidth,
            backgroundColor: v.labelBackgroundColor,
            borderRadius: v.labelBorderRadius,
            textAlign: v.labelTextAlign,
            anchor: v.labelAnchor,
            color: v.labelFontColor,
            padding: {
                top: v.labelPaddingTop,
                bottom: v.labelPaddingBottom,
                left: v.labelPaddingLeft,
                right: v.labelPaddingRight
            },
            font: {
                size: v.labelFontSize,
                weight: v.labelFontWeight
            }
        };

        if (v.labelBackgroundColor === 'useDataBorderColor') {
            datalabels.backgroundColor = ctx => v.data[ctx.dataIndex].borderColor;
        }

        if (v.labelBackgroundColor === 'useDataBackgroundColor') {
            datalabels.backgroundColor = ctx => v.data[ctx.dataIndex].backgroundColor;
        }

        if (v.labelFontColor === 'useDataBorderColor') {
            datalabels.color = ctx => v.data[ctx.dataIndex].borderColor;
        }

        if (v.labelFontColor === 'useDataBackgroundColor') {
            datalabels.color = ctx => v.data[ctx.dataIndex].backgroundColor;
        }

        return {
            type: 'pie',
            data: {
                labels: v.data.map(t => t.label),
                datasets: [{
                        data: v.data.map(t => t.value),
                        backgroundColor: v.data.map(t => t.backgroundColor),
                        borderWidth: v.data.map(t => t.borderWidth),
                        borderColor: v.data.map(t => t.borderColor ? t.borderColor : '#fff'),
                        label: 'Dataset 1'
                    }]
            },
            options: {
                responsiveAnimationDuration: 0,
                responsive: true,
                aspectRatio: v.aspectRatio,
                maintainAspectRatio: v.maintainAspectRatio,
                plugins: {
                    datalabels: datalabels
                },
                tooltips: {
                    enabled: false
                },
                legend: {
                    display: false
                },
                legendCallback: (chart) => {
                    let text = [], i, d = chart.data.datasets[0], len = d.data.length, labels = chart.data.labels;

                    text.push('<div class="ks-legend-inner">');

                    for (i = 0; i < len; ++i) {
                        text.push(`<div data-id="${i}" style="background-color: ${d.backgroundColor[i]};" class="ks-legend-item"><div class="ks-legend-item-inner"><div style="color: #fff;" class="ks-legend-icon"></div><div style="color: #fff;" class="ks-legend-label">${labels[i] }</div></div></div>`);
                    }

                    text.push('</div>');

                    return text.join('');
                }
            }
        };
    }
}
;