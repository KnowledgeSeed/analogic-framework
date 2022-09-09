/* global app, Utils */

'use strict';

class LineAreaChartWidget extends Widget {

    getHtml(verticalLineBoxWidget, d) {
        const o = this.options, f = this.getRealValue('defaultFontFamily', d, 'imago, sans-serif'), c = '#A6A7A7', b = '#000', e = 'bold';

        const defaultDatasets = [{borderColor: 'black', borderWidth: 3, backgroundColor: 'rgba(255, 10, 13, 0.4)', fill: true, lineTension: 0.5}, {legendLabel: 'Legend2', borderWidth: 2, borderColor: 'red', backgroundColor: 'rgba(10, 255, 13, 0.4)', fill: true, lineTension: 0.5}, {legendLabel: 'Legend3', borderColor: 'blue', backgroundColor: 'blue', fill: true, lineTension: 0.5}, {legendLabel: 'Legend4', borderColor: 'brown', backgroundColor: 'brown', fill: true, lineTension: 0.5}, {legendLabel: 'Legend5', borderColor: 'orange', backgroundColor: 'orange', fill: true, lineTension: 0.5}];

        const defaultData = [
            [{label: '2019'}, {label: '2020'}, {label: '2021'}, {label: '2022'}, {label: '2023'}, {label: '2024'}, {label: '2025'}],
            [
                [{value: 20}, {value: 10}, {value: 15}, {value: 18}, {value: 20}],
                [{value: 30}, {value: 20}, {value: 25}, {value: 28}, {value: 30}],
                [{value: 40}, {value: 30}, {value: 35}, {value: 38}, {value: 40}],
                [{value: 50}, {value: 40}, {value: 45}, {value: 48}, {value: 50}],
                [{value: 60}, {value: 50}, {value: 55}, {value: 58}, {value: 60}],
                [{value: 50}, {value: 30}, {value: 45}, {value: 30}, {value: 20}],
                [{value: 70}, {value: 40}, {value: 75}, {value: 78}, {value: 80}]
            ]
        ];

        const data = $.extend(true, [], o.data || [], d.data.length ? d.data : defaultData);

        const datasets = !o.datasets && !d.datasets ? defaultDatasets : $.extend(true, [], o.datasets || [], d.datasets || []);

        const v = {
            data: data,
            datasets: datasets,
            legendSkin: this.getRealValue('legendSkin', d, 'standard'),
            skin: this.getRealValue('skin', d, 'standard'),
            xAxisLabel: this.getRealValue('xAxisLabel', d),
            yAxisLabel: this.getRealValue('yAxisLabel', d),
            xAxesDisplay: this.getRealValue('xAxesDisplay', d, true),
            xAxesGridLinesDisplay: this.getRealValue('xAxesGridLinesDisplay', d, true),
            xAxesGridLinesDrawBorder: this.getRealValue('xAxesGridLinesDrawBorder', d, true),
            yAxesDisplay: this.getRealValue('yAxesDisplay', d, true),
            yAxesGridLinesDisplay: this.getRealValue('yAxesGridLinesDisplay', d, true),
            yAxesGridLinesDrawBorder: this.getRealValue('yAxesGridLinesDrawBorder', d, false),
            xAxesGridLinesColor: this.getRealValue('xAxesGridLinesColor', d, c),
            yAxesGridLinesColor: this.getRealValue('yAxesGridLinesColor', d, c),
            xAxesTicksDisplay: this.getRealValue('xAxesTicksDisplay', d, true),
            yAxesTicksDisplay: this.getRealValue('yAxesTicksDisplay', d, true),
            xAxesTicksLabelDisplay: this.getRealValue('xAxesTicksLabelDisplay', d, true),
            yAxesTicksLabelDisplay: this.getRealValue('yAxesTicksLabelDisplay', d, true),
            xAxesTicksFontSize: this.getRealValue('xAxesTicksFontSize', d, 10),
            yAxesTicksFontSize: this.getRealValue('yAxesTicksFontSize', d, 10),
            xAxesTicksFontFamily: this.getRealValue('xAxesTicksFontFamily', d, f),
            yAxesTicksFontFamily: this.getRealValue('yAxesTicksFontFamily', d, f),
            xAxesTicksFontStyle: this.getRealValue('xAxesTicksFontStyle', d, e),
            yAxesTicksFontStyle: this.getRealValue('yAxesTicksFontStyle', d, e),
            xAxesTicksFontColor: this.getRealValue('xAxesTicksFontColor', d, b),
            yAxesTicksFontColor: this.getRealValue('yAxesTicksFontColor', d, b),
            xAxesTicksPadding: this.getRealValue('xAxesTicksPadding', d, -5),
            yAxesTicksPadding: this.getRealValue('yAxesTicksPadding', d, 5),
            xAxesTicksOffset: this.getRealValue('xAxesTicksOffset', d, 0),
            yAxesTicksOffset: this.getRealValue('yAxesTicksOffset', d, 0),
            xAxesLabelDisplay: this.getRealValue('xAxesLabelDisplay', d, true),
            xAxesLabelFontSize: this.getRealValue('xAxesLabelFontSize', d, 14),
            xAxesLabelFontFamily: this.getRealValue('xAxesLabelFontFamily', d, f),
            xAxesLabelFontColor: this.getRealValue('xAxesLabelFontColor', d, b),
            xAxesLabelFontStyle: this.getRealValue('xAxesLabelFontStyle', d, e),
            xAxesLabelPadding: this.getRealValue('xAxesLabelPadding', d, 0),
            xAxesLabelRotation: this.getRealValue('xAxesLabelRotation', d, 0),
            yAxesLabelDisplay: this.getRealValue('yAxesLabelDisplay', d, true),
            yAxesLabelFontSize: this.getRealValue('yAxesLabelFontSize', d, 14),
            yAxesLabelFontFamily: this.getRealValue('yAxesLabelFontFamily', d, f),
            yAxesLabelFontColor: this.getRealValue('yAxesLabelFontColor', d, b),
            yAxesLabelFontStyle: this.getRealValue('yAxesLabelFontStyle', d, e),
            yAxesLabelPadding: this.getRealValue('yAxesLabelPadding', d, 0),
            yAxesLabelRotation: this.getRealValue('yAxesLabelRotation', d, 0),
            tooltipsEnabled: this.getRealValue('tooltipsEnabled', d, true),
            tooltipsMode: this.getRealValue('tooltipsMode', d, 'index'),
            tooltipsIntersect: this.getRealValue('tooltipsIntersect', d, false),
            aspectRatio: this.getRealValue('aspectRatio', d, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', d, true)
        };

        this.value = v;

        return `
<div class="ks-line-area-chart ks-line-area-chart-${v.skin}" style="${this.getGeneralStyles(v.data, {width: 450, height: 450}).join('')}">
    ${verticalLineBoxWidget.join('')}
    <div class="ks-line-area-chart-widget">
        <canvas id="${o.id}Canvas"></canvas>
    </div>
    <div class="ks-legend ks-legend-${v.legendSkin}"></div>
</div>`;
    }

    initEventHandlers() {
        const o = this.options, a = $('#' + o.id + 'Canvas');

        const c = new Chart(a[0].getContext('2d'), this.getChartConfig(this.value));

        a.parent().next().html(c.generateLegend()).on('click', '.ks-legend-item', e => {
            let legend = $(e.target).closest('.ks-legend-item').toggleClass('off'), id = legend.data('id');

            c.getDatasetMeta(id).hidden = !c.getDatasetMeta(id).hidden;

            c.update();
        });

        this.chart = c;
        this.canvas = a;

        if (o.widgets) {
            this.verticalLineBox = this.getSection().find('.ks-vertical-line-box');
            app.q = this.verticalLineBox;
            this.verticalLines = this.verticalLineBox.children('.ks-vertical-line');

            this.adjustVerticalLineBox();
        }
    }

    getChartConfig(v) {
        let datasets = v.datasets, d = v.data[v.data.length - 1], j, i, e;

        for (i = 0; i < d.length; ++i) {
            for (j = 0; j < datasets.length; ++j) {
                e = datasets[j];

                if (!datasets[j].data) {
                    datasets[j].data = [];
                }

                datasets[j].data.push(Utils.parseNumber(d[i][j].value || '0'));
            }
        }

        return {
            type: 'line',
            data: {
                labels: v.data[0].map(item => item.label),
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                            offset: false,
                            display: v.xAxesDisplay,
                            gridLines: {
                                display: v.xAxesGridLinesDisplay,
                                drawTicks: v.xAxesTicksDisplay,
                                drawOnChartArea: v.xAxesGridLinesDisplay,
                                drawBorder: v.yAxesGridLinesDrawBorder,
                                color: v.xAxesGridLinesColor,
                                zeroLineColor: v.xAxesGridLinesColor,
                                offsetGridLines: false
                            },
                            ticks: {
                                display: v.xAxesTicksLabelDisplay,
                                fontSize: v.xAxesTicksFontSize,
                                fontFamily: v.xAxesTicksFontFamily,
                                fontStyle: v.xAxesTicksFontStyle,
                                fontColor: v.xAxesTicksFontColor,
                                autoSkip: true,
                                minRotation: v.xAxesLabelRotation,
                                maxRotation: v.xAxesLabelRotation,
                                labelOffset: v.xAxesTicksOffset,
                                padding: v.xAxesTicksPadding
                            },
                            scaleLabel: {
                                display: v.xAxesLabelDisplay,
                                labelString: v.xAxisLabel,
                                fontSize: v.xAxesLabelFontSize,
                                fontFamily: v.xAxesLabelFontFamily,
                                fontColor: v.xAxesLabelFontColor,
                                fontStyle: v.xAxesLabelFontStyle,
                                padding: v.xAxesLabelPadding
                            }
                        }, {
                            display: v.yAxesGridLinesDrawBorder,
                            position: 'top',
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                color: v.xAxesGridLinesColor,
                                lineWidth: 1.5,
                                drawOnChartArea: false,
                                drawTicks: false
                            }
                        }],
                    yAxes: [{
                            display: v.yAxesDisplay,
                            offset: false,
                            gridLines: {
                                lineWidth: v.yAxesGridLinesDrawBorder ? [] : [0],
                                display: v.yAxesGridLinesDisplay,
                                color: v.yAxesGridLinesColor,
                                zeroLineColor: v.yAxesGridLinesColor,
                                drawBorder: v.xAxesGridLinesDrawBorder,
                                drawOnChartArea: v.yAxesGridLinesDisplay,
                                drawTicks: v.yAxesTicksDisplay
                            },
                            ticks: {
                                display: v.yAxesTicksLabelDisplay,
                                labelOffset: v.yAxesTicksOffset,
                                padding: v.yAxesTicksPadding,
                                fontSize: v.yAxesTicksFontSize,
                                fontFamily: v.yAxesTicksFontFamily,
                                fontStyle: v.yAxesTicksFontStyle,
                                fontColor: v.yAxesTicksFontColor,
                                minRotation: v.yAxesLabelRotation,
                                maxRotation: v.yAxesLabelRotation,
                                autoSkip: true
                            },
                            scaleLabel: {
                                display: v.yAxesLabelDisplay,
                                labelString: v.yAxisLabel,
                                fontSize: v.yAxesLabelFontSize,
                                fontFamily: v.yAxesLabelFontFamily,
                                fontColor: v.yAxesLabelFontColor,
                                fontStyle: v.yAxesLabelFontStyle,
                                padding: v.yAxesLabelPadding
                            }
                        }]
                },
                plugins: {
                    datalabels: {
                        align: 'top',
                        offset: 0,
                        anchor: 'end',
                        clamp: true,
                        clip: false,
                        display: c => v.tooltipsEnabled ? false : (c.active ? true : (datasets[c.datasetIndex].labelVisible ? 'auto' : false)),
                        borderRadius: 5,
                        borderWidth: 0,
                        color: c => {
                            c = datasets[c.datasetIndex];
                            return c.labelColor || v.yAxesTicksFontColor || c.borderColor;
                        },
                        backgroundColor: c => {
                            c = datasets[c.datasetIndex];
                            return c.labelBackgroundColor || c.backgroundColor || c.borderColor;
                        },
                        font: {
                            size: v.yAxesTicksFontSize,
                            color: v.yAxesTicksFontColor,
                            style: v.yAxesTicksFontStyle,
                            family: v.yAxesTicksFontFamily,
                            lineHeight: 1
                        },
                        padding: {
                            top: 7,
                            left: 10,
                            right: 10
                        },
                        formatter: p => 'object' === typeof p ? p.y : p[1]
                    }
                },
                tooltips: {
                    enabled: v.tooltipsEnabled,
                    mode: v.tooltipsMode,
                    intersect: v.tooltipsIntersect
                },
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                elements: {
                    line: {
                        tension: 0
                    }
                },
                animation: {
                    duration: 0
                },
                hover: {
                    mode: 'nearest',
                    intersect: false,
                    animationDuration: 0
                },
                onResize: () => setTimeout(() => this.adjustVerticalLineBox(), 100),
                responsiveAnimationDuration: 0,
                responsive: true,
                aspectRatio: v.aspectRatio,
                maintainAspectRatio: v.maintainAspectRatio,
                bezierCurve: false,
                legendCallback: chart => {
                    let h = [], i, e, c, d = chart.data.datasets;

                    h.push('<div class="ks-legend-inner">');

                    for (i = 0; i < d.length; ++i) {
                        e = d[i];
                        c = e.backgroundColor;

                        h.push(`<div data-id="${i}" class="ks-legend-item"><div class="ks-legend-item-inner"><div style="color: ${c};" class="ks-legend-icon"></div><div style="color: ${c};" class="ks-legend-label">${e.legendLabel}</div></div></div>`);
                    }

                    return h.join('') + '<\/div>';
                }
            }
        };
    }

    adjustVerticalLineBox() {
        if (!this.verticalLines || !this.verticalLines.length) {
            return;
        }

        this.verticalLineBox.removeAttr('style');

        const a = this.chart.chartArea, o = this.canvas.offset(), h = a.bottom - a.top;

        this.verticalLineBox.css({width: a.right - a.left + 1, height: 0, left: a.left - 0.5, top: o.top + a.bottom - this.verticalLineBox.offset().top - h - 1});

        this.verticalLines.height(h);
    }

    processData(data) {
        let d = {data: []}, i, len = data.length;

        for (i = 0; i < len; ++i) {
            i < 2 ? d.data.push(data[i]) : d.datasets = data[i];
        }

        return d;
    }
}
;