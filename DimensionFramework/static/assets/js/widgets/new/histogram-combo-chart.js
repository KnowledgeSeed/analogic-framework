/* global app, Widget, Chart, Utils */

'use strict';
class HistogramComboChartWidget extends Widget {

    getHtml(segmentedBarWidget, d) {
        const o = this.options, f = 'tele-groteskultregular', c = '#A6A7A7', b = '#000', e = 'bold';

        const temp = [
            [[0, 0.231], [251.31, 0.22], [502.63, 0.248], [753.94, 0.138], [1005.26, 0.075], [1256.57, 0.047], [1507.89, 0.027], [1759.21, 0.007], [2010.52, 0.006], [2261.84, 0.001]],
            [{x: 0.0, y: 0.0}, {x: 0.0, y: 0.1}, {x: 150.22656183483147, y: 0.15}, {x: 231.74140673751359, y: 0.2}, {x: 270.0253349041392, y: 0.25}, {x: 314.10545855973174, y: 0.3}, {x: 349.49996833180035, y: 0.35}, {x: 399.4739346575615, y: 0.4}, {x: 499.6971843027753, y: 0.45}, {x: 553.6888304932824, y: 0.5}, {x: 596.7857118302029, y: 0.55}, {x: 648.5706250764642, y: 0.6}, {x: 697.4050548313838, y: 0.65}, {x: 756.0476152176744, y: 0.7}, {x: 840.2831704843765, y: 0.75}, {x: 919.1999679965987, y: 0.8}, {x: 1040.6046603678558, y: 0.85}, {x: 1204.0885382779918, y: 0.9}, {x: 1451.9559350499019, y: 0.95}, {x: 2513.15721440083, y: 1.0}]
        ];

        const datasets = d.datasets || temp;

        const v = {
            datasets: datasets,
            configs: [...this.getRealValue('datasetsLine', d, Array(datasets.length - 1).fill({})), this.getRealValue('datasetHistogram', d, {})],
            paddingTop: this.getRealValue('paddingTop', d, 0),
            paddingRight: this.getRealValue('paddingRight', d, 0),
            paddingBottom: this.getRealValue('paddingBottom', d, 0),
            paddingLeft: this.getRealValue('paddingLeft', d, 0),
            xAxisLabel: this.getRealValue('xAxisLabel', d),
            yAxisLabel: this.getRealValue('yAxisLabel', d),
            histYAxisBufferTop: this.getRealValue('histYAxisBufferTop', d, 0),
            histYAxisBufferBottom: this.getRealValue('histYAxisBufferBottom', d, 0),
            lineYAxisBufferTop: this.getRealValue('lineYAxisBufferTop', d, 0),
            lineYAxisBufferBottom: this.getRealValue('lineYAxisBufferBottom', d, 0),
            xAxesDisplay: this.getRealValue('xAxesDisplay', d, true),
            xAxesGridLinesDisplay: this.getRealValue('xAxesGridLinesDisplay', d, true),
            xAxesGridLinesDrawBorder: this.getRealValue('xAxesGridLinesDrawBorder', d, true),
            yAxesDisplay: this.getRealValue('yAxesDisplay', d, true),
            yAxesGridLinesDisplay: this.getRealValue('yAxesGridLinesDisplay', d, true),
            yAxesGridLinesDrawBorder: this.getRealValue('yAxesGridLinesDrawBorder', d, true),
            xAxesGridLinesColor: this.getRealValue('xAxesGridLinesColor', d, c),
            yAxesGridLinesColor: this.getRealValue('yAxesGridLinesColor', d, c),
            yAxesGridLinesNum: this.getRealValue('yAxesGridLinesNum', d, 0),
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
            aspectRatio: this.getRealValue('aspectRatio', d, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', d, true)
        };

        this.value = v;

        return `
<div class="ks-chart-holder" style="${this.getGeneralStyles(d, {width: 425, height: 400}).join('')}">
    ${segmentedBarWidget.join('')}
    <div class="ks-chart-widget" style="width: 100%; height: 100%;"><canvas id="${o.id}Canvas"></canvas></div>
</div>`;
    }

    initEventHandlers() {
        const o = this.options, canvas = $('#' + o.id + 'Canvas'), ctx = canvas[0].getContext('2d');

        this.chart = new Chart(ctx, this.getChartConfig());

        if (o.widgets) {
            this.segmentedBar = canvas.parent().prev().css('position', 'relative');
            this.confidenceLines = this.segmentedBar.find('.ks-segmentedbar-confidence-line');

            this.adjustSegmentedBar();
        }
    }

    getChartConfig() {
        const v = this.value, d = v.datasets, configs = v.configs, a = 'blue', stepSize = v.yAxesGridLinesNum ? v.yAxesGridLinesNum + 1 : 0;

        const histDataset = d[0], histLabels = histDataset.map(p => p[0]), histValues = histDataset.map(p => p[1]), lineValues = [], datasets = [];

        let i, lineDataset, c, r, b;

        for (i = 1; i < d.length; ++i) {
            lineDataset = d[i];
            c = configs[i - 1];
            b = c.borderWidth || 1;
            r = c.pointRadius || 1;

            lineValues.push(...lineDataset.map(p => p.y));

            datasets.push({
                type: 'line',
                xAxisID: 'lineAxisX',
                yAxisID: 'lineAxisY',
                data: lineDataset,
                label: c.legendLabel || '',
                borderColor: c.borderColor || a,
                backgroundColor: c.backgroundColor || a,
                pointStyle: c.pointStyle || 'circle',
                pointRadius: r,
                pointHoverRadius: r + 1,
                borderWidth: b,
                pointHoverBorderWidth: b + 1,
                spanGaps: false,
                fill: false
            });
        }

        let lineYMin = Math.min(...lineValues), lineYMax = Math.max(...lineValues);

        lineYMax += this.calculateBufferValue(v.lineYAxisBufferTop, lineYMax, lineYMin);
        lineYMin -= this.calculateBufferValue(v.lineYAxisBufferBottom, lineYMax, lineYMin);

        let histYMin = Math.min(...histValues), histYMax = Math.max(...histValues);

        histYMax += this.calculateBufferValue(v.histYAxisBufferTop, histYMax, histYMin);
        histYMin -= this.calculateBufferValue(v.histYAxisBufferBottom, histYMax, histYMin);

        const xMin = histLabels[0], xStep = histLabels[1] - xMin;

        c = configs[configs.length - 1];

        datasets.push({
            type: 'bar',
            data: histValues,
            label: c.legendLabel || '',
            backgroundColor: c.backgroundColor || a,
            borderWidth: c.borderWidth || 1,
            borderColor: c.borderColor || a,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: null
        });

        return {
            data: {
                labels: histLabels,
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                            offset: true,
                            gridLines: {
                                drawTicks: v.xAxesDisplay,
                                drawOnChartArea: v.xAxesGridLinesDisplay,
                                drawBorder: v.yAxesGridLinesDrawBorder,
                                color: v.xAxesGridLinesColor,
                                zeroLineColor: v.xAxesGridLinesColor,
                                offsetGridLines: true
                            },
                            ticks: {
                                display: false
                            }
                        }, {
                            id: 'lineAxisX',
                            type: 'linear',
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: v.xAxesDisplay,
                                min: xMin,
                                max: histLabels[histLabels.length - 1] + xStep,
                                stepSize: xStep,
                                fontSize: v.xAxesTicksFontSize,
                                fontFamily: v.xAxesTicksFontFamily,
                                fontStyle: v.xAxesTicksFontStyle,
                                fontColor: v.xAxesTicksFontColor,
                                autoSkip: true,
                                callback: v => Utils.precisionRound(v, 1),
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
                        }
                    ],
                    yAxes: [{
                            display: true,
                            offset: false,
                            gridLines: {
                                display: true,
                                color: v.yAxesGridLinesColor,
                                zeroLineColor: v.yAxesGridLinesColor,
                                lineWidth: 1.5,
                                drawBorder: v.xAxesGridLinesDrawBorder,
                                drawOnChartArea: v.yAxesGridLinesDisplay,
                                drawTicks: v.yAxesDisplay
                            },
                            ticks: {
                                display: v.yAxesDisplay,
                                min: histYMin,
                                max: histYMax,
                                stepSize: stepSize ? (histYMax - histYMin) / stepSize : 0,
                                labelOffset: v.yAxesTicksOffset,
                                padding: v.yAxesTicksPadding,
                                fontSize: v.yAxesTicksFontSize,
                                fontFamily: v.yAxesTicksFontFamily,
                                fontStyle: v.yAxesTicksFontStyle,
                                fontColor: v.yAxesTicksFontColor,
                                minRotation: v.yAxesLabelRotation,
                                maxRotation: v.yAxesLabelRotation,
                                autoSkip: true,
                                callback: (v, i, all) => (!i && stepSize && all.length > stepSize + 1) ? '' : Utils.precisionRound(v, 2)
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
                        }, {
                            id: 'lineAxisY',
                            display: true,
                            position: 'right',
                            offset: false,
                            gridLines: {
                                display: true,
                                lineWidth: 1.5,
                                drawOnChartArea: false,
                                color: v.yAxesGridLinesColor,
                                drawBorder: v.xAxesGridLinesDrawBorder,
                                drawTicks: v.yAxesDisplay && (datasets.length > 1)
                            },
                            ticks: {
                                min: lineYMin,
                                max: lineYMax,
                                stepSize: stepSize ? (lineYMax - lineYMin) / stepSize : 0,
                                labelOffset: v.yAxesTicksOffset,
                                padding: v.yAxesTicksPadding,
                                display: v.yAxesDisplay && (datasets.length > 1),
                                fontFamily: v.yAxesTicksFontFamily,
                                fontSize: v.yAxesTicksFontSize,
                                fontStyle: v.yAxesTicksFontStyle,
                                fontColor: v.yAxesTicksFontColor,
                                minRotation: v.yAxesLabelRotation,
                                maxRotation: v.yAxesLabelRotation,
                                autoSkip: true,
                                callback: v => Utils.precisionRound(v, 2)
                            }
                        }
                    ]
                },
                plugins: {
                    datalabels: {
                        align: 'top',
                        offset: 0,
                        anchor: 'end',
                        clamp: true,
                        clip: false,
                        display: c => c.active ? true : (configs[c.datasetIndex].labelVisible ? 'auto' : false),
                        borderRadius: 5,
                        borderWidth: 0,
                        color: c => configs[c.datasetIndex].labelColor || v.yAxesTicksFontColor || a,
                        backgroundColor: c => configs[c.datasetIndex].labelBackgroundColor || configs[c.datasetIndex].backgroundColor || a,
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
                    enabled: false,
                    mode: 'nearest',
                    intersect: false
                },
                title: {
                    display: false
                },
                legend: {
                    display: false
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
                        tension: 0
                    }
                },
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                onResize: () => setTimeout(() => this.adjustSegmentedBar(), 100),
                responsiveAnimationDuration: 0,
                responsive: true,
                aspectRatio: v.aspectRatio,
                maintainAspectRatio: v.maintainAspectRatio,
                bezierCurve: false
            }
        };
    }

    calculateBufferValue(buffer, max, min) {
        let b = parseFloat(buffer);

        if (-1 !== ('' + buffer).indexOf('%')) {
            b = (max - min) * b / 100;
        }

        return b;
    }

    adjustSegmentedBar() {
        if (!this.segmentedBar) {
            return;
        }

        const a = this.chart.chartArea;

        this.segmentedBar.css({width: a.right - a.left + 1, left: a.left - 0.5, top: a.top});

        this.confidenceLines.height(this.segmentedBar.height() + a.bottom - a.top);
    }

    processData(data) {
        return data ? {datasets: data} : data;
    }
}
;