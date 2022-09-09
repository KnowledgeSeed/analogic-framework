/* global app, Chart, Infinity, Utils, Widget */

'use strict';
class RadarChartWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const demoLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

        const demoDatasets = [
            {
                label: 'First Dataset',
                data: [65, 59, 90, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointStyle: 'circle',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 96, 27, 100],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointStyle: 'triangle',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                tension: 0
            }
        ];

        const v = {
            labels: o.labels || d.labels,
            datasets: $.extend(true, [], o.datasets || [], d.datasets),
            min: this.getRealValue('min', d, null),
            max: this.getRealValue('max', d, null),
            stepSize: this.getRealValue('stepSize', d, null),
            ticks: this.getRealValue('ticks', d, []),
            tickColor: this.getRealValue('tickColor', d, '#666'),
            tickFontFamily: this.getRealValue('tickFontFamily', d, null),
            tickFontSize: this.getRealValue('tickFontSize', d, 12),
            tickFontStyle: this.getRealValue('tickFontStyle', d, 'normal'),
            bezierCurveBorderWidth: this.getRealValue('bezierCurveBorderWidth', d, 1.5),
            bezierCurveTension: this.getRealValue('bezierCurveTension', d, 0),
            canvasHeight: this.getRealValue('canvasHeight', d, false),
            canvasWidth: this.getRealValue('canvasWidth', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            legendSkin: this.getRealValue('legendSkin', d, 'standard'),
            legendVisible: this.getRealValue('legendVisible', d, true),
            paddingTop: this.getRealValue('paddingTop', d, 0),
            paddingRight: this.getRealValue('paddingRight', d, 0),
            paddingBottom: this.getRealValue('paddingBottom', d, 0),
            paddingLeft: this.getRealValue('paddingLeft', d, 0),
            tooltipsEnabled: this.getRealValue('tooltipsEnabled', d, true),
            tooltipsMode: this.getRealValue('tooltipsMode', d, 'nearest'),
            aspectRatio: this.getRealValue('aspectRatio', d, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', d, false)
        };

        this.value = v;

        return `
<div class="ks-radar-chart ks-radar-chart-${v.skin}" style="${this.getGeneralStyles(v.data, {
            width: 450,
            height: 450
        }).join('')}">
    <div class="ks-radar-chart-title"><h3>${o.title}</h3></div>
    <div class="ks-radar-chart-widget" style="${v.canvasWidth ? `width:${Utils.getSize(v.canvasWidth, true)}` : ''} ${v.canvasHeight ? `height:${Utils.getSize(v.canvasHeight, true)}` : ''}"><canvas id="${o.id}Canvas"></canvas></div>
    ${v.legendVisible ? `<div class="ks-radar ks-radar-${v.legendSkin}"></div>` : ''}
</div>`;
    }

    initEventHandlers() {
        const canvas = document.getElementById(this.options.id + 'Canvas'), ctx = canvas.getContext('2d'),
            c = new Chart(ctx, this.getChartConfig());

        $(canvas.parentElement.nextElementSibling).html(c.generateLegend()).on('click', '.ks-legend-item', e => {
            let legend = $(e.target).closest('.ks-legend-item').toggleClass('off'), id = legend.data('id');

            c.data.datasets[id].hidden = !c.data.datasets[id].hidden;

            c.update();
        });
    }

    getChartConfig() {
        const v = this.value, ticks = v.ticks;

        return {
            type: 'radar',
            data: {
                labels: v.labels,
                datasets: v.datasets
            },
            options: {
                responsiveAnimationDuration: 0,
                responsive: true,
                aspectRatio: v.aspectRatio,
                maintainAspectRatio: v.maintainAspectRatio,
                bezierCurve: true,
                //events: [],
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                title: {
                    display: false
                },
                tooltips: {
                    enabled: v.tooltipsEnabled,
                    mode: v.tooltipsMode,
                    intersect: false,
                    callbacks: {
                        title: (ctx, data) => {
                            let c, d, t, v = data.datasets, s = '';

                            for (c of ctx) {
                                d = v[c.datasetIndex];
                                t = (d.tooltipLabels || [])[c.index];

                                if (t) {
                                    s += '\n' + d.label + ':\n' + t;
                                }
                            }

                            return ctx[0].value + s;
                        },
                        label: (ctx, data) => {
                            let d = data.datasets[ctx.datasetIndex];

                            if ((d.tooltipLabels || [])[ctx.index]) {
                                return '';
                            }

                            return d.label + ': ' + ctx.label;
                        }
                    }
                },
                legend: {
                    display: false
                },
                legendCallback: chart => {
                    let h = '<div class="ks-legend-inner">', d, i = -1;

                    for (d of chart.data.datasets) {
                        h += '<div data-id="' + (++i) + '" style="background-color:' + d.backgroundColor + ';" class="ks-legend-item"><div class="ks-legend-item-inner"><div style="color: #000;" class="ks-legend-icon"></div><div style="color: #000;" class="ks-legend-label">' + d.label + '</div></div></div>';
                    }

                    h += '</div>';

                    return h;
                },
                scale: {
                    ticks: {
                        beginAtZero: false,
                        min: null === v.min ? undefined : v.min,
                        max: null === v.max ? undefined : v.max,
                        stepSize: null === v.stepSize ? undefined : v.stepSize,
                        callback: (v, i) => (i - 1) in ticks ? ticks[(i - 1)] : v,
                        fontColor: v.tickColor,
                        fontFamily: null === v.tickFontFamily ? undefined : v.tickFontFamily,
                        fontSize: v.tickFontSize,
                        fontStyle: v.tickFontStyle
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        }
                    }
                },
                layout: {
                    padding: {
                        left: v.paddingLeft,
                        right: v.paddingRight,
                        top: v.paddingTop,
                        bottom: v.paddingBottom
                    }
                },
                elements: {
                    line: {
                        borderWidth: v.bezierCurveBorderWidth,
                        tension: v.bezierCurveTension //disables bezier curves if 0
                    }
                }
            }
        };
    }
}
;