/* global app, Utils */

'use strict';

class LineAreaChartWidget extends Widget {

    getHtml(verticalLineBoxWidget, d) {
        const v = this.getParameters(d);

        return `
<div class="ks-line-area-chart ks-line-area-chart-${v.skin}" style="${this.getGeneralStyles(d.options, {width: 450, height: 450}).join('')}">
    ${verticalLineBoxWidget.join('')}
    <div class="ks-line-area-chart-widget">
        <canvas id="${this.options.id}Canvas"></canvas>
    </div>
    <div class="ks-legend ks-legend-${v.legendSkin}"></div>
</div>`;
    }

    updateHtml(data) {
        this.getParameters(data);

        let c = this.getChartConfig();

        this.chart.data = c.data;
        this.chart.options = c.options;

        this.chart.update();
    }

    getParameters(d) {
        const o = this.options, f = this.getRealValue('defaultFontFamily', d, 'imago, sans-serif'), c = '#A6A7A7', b = '#000', e = 'bold';

        const demoDatasets = [
            {legendLabel: 'Legend1', borderWidth: 2, borderColor: 'red', backgroundColor: 'red', hoverBackgroundColor: 'darkblue', fill: true, lineTension: 0.5, labelVisible: true},
            {legendLabel: 'Legend2', borderColor: 'blue', backgroundColor: 'blue', hoverBackgroundColor: 'yellow', fill: true, lineTension: 0.5},
            {legendLabel: 'Legend3', borderColor: 'brown', backgroundColor: 'brown', fill: true, lineTension: 0.5},
            {legendLabel: 'Legend4', borderColor: 'orange', backgroundColor: 'orange', fill: true, lineTension: 0.5},
            {yAxisID: 'y1', legendLabel: 'Legend5', borderColor: 'black', labelBorderColor: '#000000', labelBackgroundColor: '#FFFFFF', labelColor: 'blue', labelBorderWidth: 2, borderWidth: 3, backgroundColor: 'rgba(255, 10, 13, 0.4)', fill: false, labelVisible: true, borderDash: [5, 5]},
        ];

        const demoData = [
            [{label: '2019'}, {label: '2020'}, {label: '2021'}, {label: '2022'}, {label: '2023'}, {label: '2024'}, {label: '2025'}],
            [
                [{value: 10}, {value: 15}, {value: 18}, {value: 20}, {value: 63, displayValue: 'Display Value'}],
                [{value: 20}, {value: 25}, {value: 28}, {value: 30}, {value: 0}],
                [{value: 30}, {value: 35}, {value: 38}, {value: 40}, {value: 90}],
                [{value: 40}, {value: 45}, {value: 48}, {value: 50}, {value: 120}],
                [{value: 50}, {value: 55}, {value: 58}, {value: 60}, {value: 150}],
                [{value: 30}, {value: 45}, {value: 30}, {value: 20}, {value: 170}],
                [{value: 40}, {value: 75}, {value: 78}, {value: 80}, {value: 80}]
            ]
        ];

        const data = $.extend(true, [], o.data || [], (d.data[0].length || d.data[1].length) ? d.data : demoData);

        const datasets = !(o.datasets || []).length && !(d.datasets || []).length ? demoDatasets : $.extend(true, [], o.datasets || [], d.datasets || []);

        d = d.options;

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
            xMin: this.getRealValue('xMin', d, null),
            xMax: this.getRealValue('xMax', d, null),
            yMin: this.getRealValue('yMin', d, null),
            yMax: this.getRealValue('yMax', d, null),
            xAxesOffset: this.getRealValue('xAxesOffset', d, 0),
            xAxesOffsetRight: this.getRealValue('xAxesOffsetRight', d, 0),
            xAxesOffsetLeft: this.getRealValue('xAxesOffsetLeft', d, 0),
            yAxesOffset: this.getRealValue('yAxesOffset', d, 0.15),
            yAxesOffsetTop: this.getRealValue('yAxesOffsetTop', d, null),
            yAxesOffsetBottom: this.getRealValue('yAxesOffsetBottom', d, null),
            yAxesLabelDisplay: this.getRealValue('yAxesLabelDisplay', d, true),
            yAxesLabelFontSize: this.getRealValue('yAxesLabelFontSize', d, 14),
            yAxesLabelFontFamily: this.getRealValue('yAxesLabelFontFamily', d, f),
            yAxesLabelFontColor: this.getRealValue('yAxesLabelFontColor', d, b),
            yAxesLabelFontStyle: this.getRealValue('yAxesLabelFontStyle', d, e),
            yAxesLabelPadding: this.getRealValue('yAxesLabelPadding', d, 0),
            yAxesLabelRotation: this.getRealValue('yAxesLabelRotation', d, 0),
            yAxesStacked: this.getRealValue('yAxesStacked', d, false),
            yAxesUnit: this.getRealValue('yAxesUnit', d, ''),
            yAxesDecimalNum: parseInt(this.getRealValue('yAxesDecimalNum', d, 2)),
            yAxesSeparatesThousands: this.getRealValue('yAxesSeparatesThousands', d, false),
            yAxesTicksPrecisionFixed: this.getRealValue('yAxesTicksPrecisionFixed', d, false),

            tooltipsEnabled: this.getRealValue('tooltipsEnabled', d, true),
            tooltipsMode: this.getRealValue('tooltipsMode', d, 'index'),
            tooltipsIntersect: this.getRealValue('tooltipsIntersect', d, false),
            aspectRatio: this.getRealValue('aspectRatio', d, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', d, true),
            defaultBezierCurveTension: this.getRealValue('defaultBezierCurveTension', d, 0)
        };

        this.value = v;

        return v;
    }

    initEventHandlers() {
        const o = this.options, a = $('#' + o.id + 'Canvas');

        const c = new Chart(a[0].getContext('2d'), this.getChartConfig());

        a.parent().next().html(c.generateLegend()).on('click', '.ks-legend-item', e => {
            let legend = $(e.target).closest('.ks-legend-item').toggleClass('off'), id = legend.data('id');

            c.getDatasetMeta(id).hidden = !c.getDatasetMeta(id).hidden;

            c.update();
        });

        this.chart = c;
        this.canvas = a;

        if (o.widgets) {
            this.verticalLineBox = this.getSection().find('.ks-vertical-line-box');
            this.verticalLines = this.verticalLineBox.children('.ks-vertical-line');

            this.adjustVerticalLineBox();
        }
    }

    getChartConfig() {
        let v = this.value, datasets = Utils.clone(v.datasets, true, false), d = v.data[v.data.length - 1], j, i, xValues = v.data[0].map(e => e.label), data, len = d.length, lastHoveredDatasetIndex, isY1Axis, y, yVals = [], m;

        const yAxesUnit = v.yAxesUnit, yAxesDecimalNum = v.yAxesDecimalNum, yAxesSeparatesThousands = v.yAxesSeparatesThousands, yAxesTicksPrecisionFixed = v.yAxesTicksPrecisionFixed, yAxesStacked = v.yAxesStacked;

        for (i = 0; i < datasets.length; ++i) {
            data = [];
            m = 0;
            isY1Axis = 'y1' === datasets[i].yAxisID;

            for (j = 0; j < len; ++j) {
                y = Utils.parseNumber(d[j][i].value || '0');

                data.push({x: parseInt(xValues[j]), y: y});

                if (isY1Axis || !yAxesStacked) {
                    yVals.push(y);
                } else {
                    m += y;
                }
            }

            if (!isY1Axis && yAxesStacked) {
                yVals.push(m);
            }

            datasets[i].data = data;
        }

        const yMin = v.yMin ?? Math.min(...yVals), yMax = v.yMax ?? Math.max(...yVals), yTotal = yMax - yMin;

        const yAxesOffsetTop = Utils.calculateMargin(v.yAxesOffsetTop ?? v.yAxesOffset, yTotal), yAxesOffsetBottom = Utils.calculateMargin(v.yAxesOffsetBottom ?? v.yAxesOffset, yTotal);

        return {
            type: 'line',
            data: {
                labels: xValues,
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                        id: 'x',
                        type: 'linear',
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
                            min: parseFloat(v.xMin ?? xValues[0]) - (v.xAxesOffsetLeft || v.xAxesOffset),
                            max: parseFloat(v.xMax ?? xValues.slice(-1)) + (v.xAxesOffsetRight || v.xAxesOffset),
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
                        id: 'x1',
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
                        id: 'y',
                        stacked: yAxesStacked,
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
                            min: yMin - yAxesOffsetBottom,
                            max: yMax + yAxesOffsetTop,
                            display: v.yAxesTicksLabelDisplay,
                            labelOffset: v.yAxesTicksOffset,
                            padding: v.yAxesTicksPadding,
                            fontSize: v.yAxesTicksFontSize,
                            fontFamily: v.yAxesTicksFontFamily,
                            fontStyle: v.yAxesTicksFontStyle,
                            fontColor: v.yAxesTicksFontColor,
                            minRotation: v.yAxesLabelRotation,
                            maxRotation: v.yAxesLabelRotation,
                            autoSkip: true,
                            callback: v => {
                                v = Utils.precisionRound(v, yAxesDecimalNum, yAxesTicksPrecisionFixed);

                                return (yAxesSeparatesThousands ? Utils.separatesThousands(v) : v) + yAxesUnit;
                            }
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
                        id: 'y1',
                        offset: false,
                        display: false,
                        grid: {
                            display: false,
                            offset: false
                        },
                        ticks: {
                            min: yMin - yAxesOffsetBottom,
                            max: yMax + yAxesOffsetTop,
                            display: false,
                            padding: 0
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
                        borderWidth: c => datasets[c.datasetIndex].labelBorderWidth || 0,
                        borderColor: c => datasets[c.datasetIndex].labelBorderColor,
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
                            weight: 'normal',
                            style: v.yAxesTicksFontStyle,
                            family: v.yAxesTicksFontFamily,
                            lineHeight: 1
                        },
                        padding: {
                            top: 7,
                            left: 10,
                            right: 10,
                            bottom: 0
                        },
                        formatter: (v, o) => {
                            v = d[o.dataIndex][o.datasetIndex].displayValue ?? Utils.precisionRound('number' === typeof v ? v : v.y, yAxesDecimalNum, yAxesTicksPrecisionFixed);

                            return (yAxesSeparatesThousands ? Utils.separatesThousands(v) : v) + yAxesUnit;
                        }
                    }
                },
                tooltips: {
                    enabled: v.tooltipsEnabled,
                    mode: v.tooltipsMode,
                    intersect: v.tooltipsIntersect,
                    callbacks: {
                        label: v => {
                            v = d[v.index][v.datasetIndex].displayValue ?? Utils.precisionRound(v.value, yAxesDecimalNum, yAxesTicksPrecisionFixed);

                            return (yAxesSeparatesThousands ? Utils.separatesThousands(v) : v) + yAxesUnit;
                        }
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                elements: {
                    line: {
                        tension: v.defaultBezierCurveTension
                    }
                },
                animation: {
                    duration: 0
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: false,
                    animationDuration: 0
                },
                onHover: (e, c) => {
                    let t = e.type, i = (c[0] || {})._datasetIndex;

                    if ('mousemove' === t && i !== lastHoveredDatasetIndex) {
                        lastHoveredDatasetIndex = i;

                        this.setOriginalBackgroundForDatasets();

                        this.setHoverBackgroundForDataset(i);
                    } else if ('mouseout' === t) {
                        lastHoveredDatasetIndex = null;

                        this.setOriginalBackgroundForDatasets();
                    }
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

                    return h.join('') + '</div>';
                }
            }
        };
    }

    setOriginalBackgroundForDatasets() {
        let o = this.value.datasets, i;

        for (i = 0; i < o.length; ++i) {
            this.chart.data.datasets[i].backgroundColor = o[i].backgroundColor;
        }

        this.chart.update();
    }

    setHoverBackgroundForDataset(i) {
        let b = (this.value.datasets[i] ?? {}).hoverBackgroundColor;

        if (!b) {
            return;
        }

        this.chart.data.datasets[i].backgroundColor = b;

        this.chart.update();
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
        return {
            data: [data[0] || [], data[1] || []],
            datasets: data[2] || [],
            options: data[3] || {}
        };
    }
}