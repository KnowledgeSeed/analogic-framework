/* global app, Utils, Widget */
'use strict';

class ComboChartWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options, v = this.getParameters(d);

        return `
<div class="ks-chart-holder" style="${this.getGeneralStyles(v.data, {width: 425, height: 400}).join('')}">
    <div class="ks-chart-widget ks-combo-chart-title"><h3>${o.title}</h3></div>
    <div class="ks-chart-widget">
        <canvas ${v.canvasWidth ? `width="${v.canvasWidth}"` : ''} ${v.canvasHeight ? `height="${v.canvasHeight}"` : ''} id="${o.id}Canvas"></canvas>
    </div>
    <div class="ks-legend ks-legend-${v.skin}"></div>
</div>`;
    }

    getParameters(d) {
        const defaultDataSet = [
                {
                    type: "line",
                    legendLabel: "NPV",
                    borderColor: "#00965E",
                    backgroundColor: "#00965E",
                    pointRadius: 2,
                    borderWidth: 2,
                    fill: false,
                    yAxisID: "leftYAxes",
                    dataLabelVisible: false
                },
                {
                    type: "bar",
                    legendLabel: "R&D",
                    backgroundColor: "#858686",
                    borderColor: "#858686",
                    borderWidth: 1,
                    stack: 1,
                    yAxisID: "leftYAxes",
                    dataLabelVisible: false
                },
                {
                    type: "bar",
                    legendLabel: "Sales - Total",
                    backgroundColor: "#0066CC",
                    borderColor: "#0066CC",
                    borderWidth: 1,
                    stack: 2,
                    yAxisID: "leftYAxes",
                    dataLabelVisible: false
                }
            ],
            defaultData = [
                [{label: '2019', value: '2019'}, {label: '2020', value: '2020'}, {label: '2021', value: '2021'}],
                [
                    [{value: 70}, {value: 100}, {value: 100}],
                    [{value: 300}, {value: 200}, {value: 200}],
                    [{value: 150}, {value: 300}, {value: 300}]
                ]
            ],
            f = 'imago, sans-serif', c = '#A6A7A7', b = '#000', e = 'bold',
            data = d.data.length > 0 ? d.data : defaultData;

        const v = {
            data: data,
            datasets: this.getRealValue('datasets', d, defaultDataSet),
            paddingTop: this.getRealValue('paddingTop', data, 0),
            paddingRight: this.getRealValue('paddingRight', data, 0),
            paddingBottom: this.getRealValue('paddingBottom', data, 0),
            paddingLeft: this.getRealValue('paddingLeft', data, 0),
            tooltipsEnabled: this.getRealValue('tooltipsEnabled', data, false),
            tooltipsMode: this.getRealValue('tooltipsMode', data, 'index'),
            legendGroupByStack: this.getRealValue('legendGroupByStack', data, false),
            skin: this.getRealValue('skin', data, 'standard'),
            plot: this.getRealValue('plot', data, false),
            id: this.getRealValue('id', data, false),

            xAxesLabel: this.getRealValue('xAxesLabel', data),
            xAxesDisplay: this.getRealValue('xAxesDisplay', data, true),
            xAxesGridLinesDisplay: this.getRealValue('xAxesGridLinesDisplay', data, false),
            xAxesGridLinesDrawBorder: this.getRealValue('xAxesGridLinesDrawBorder', data, true),
            xAxesGridLinesDrawOnChartArea: this.getRealValue('xAxesGridLinesDrawOnChartArea', data, false),
            xAxesGridLinesDrawTicks: this.getRealValue('xAxesGridLinesDrawTicks', data, false),
            xAxesGridLinesColor: this.getRealValue('xAxesGridLinesColor', data, c),
            xAxesTicksFontSize: this.getRealValue('xAxesTicksFontSize', data, 10),
            xAxesTicksFontFamily: this.getRealValue('xAxesTicksFontFamily', data, f),
            xAxesTicksFontStyle: this.getRealValue('xAxesTicksFontStyle', data, e),
            xAxesTicksFontColor: this.getRealValue('xAxesTicksFontColor', data, b),
            xAxesTicksPadding: this.getRealValue('xAxesTicksPadding', data, -5),
            xAxesTicksOffset: this.getRealValue('xAxesTicksOffset', data, 0),
            xAxesLabelDisplay: this.getRealValue('xAxesLabelDisplay', data, true),
            xAxesLabelFontSize: this.getRealValue('xAxesLabelFontSize', data, 14),
            xAxesLabelFontFamily: this.getRealValue('xAxesLabelFontFamily', data, f),
            xAxesLabelFontColor: this.getRealValue('xAxesLabelFontColor', data, b),
            xAxesLabelFontStyle: this.getRealValue('xAxesLabelFontStyle', data, e),
            xAxesLabelPadding: this.getRealValue('xAxesLabelPadding', data, 0),
            xAxesLabelRotation: this.getRealValue('xAxesLabelRotation', data, 0),
            xAxesStacked: this.getRealValue('xAxesStacked', data, true),
            xAxesTicksBegintAtZero: this.getRealValue('xAxesTicksBegintAtZero', data, true),
            xAxesOffsetGridLines: this.getRealValue('xAxesOffsetGridLines', data, true),
            xAxesZeroLineColor: this.getRealValue('xAxesZeroLineColor', data, b),

            rightYAxesBorderDash: this.getRealValue('rightYAxesBorderDash', data, false), //number array
            rightYAxesTicksBegintAtZero: this.getRealValue('rightYAxesTicksBegintAtZero', data, true),
            rightYAxesTicksPadding: this.getRealValue('rightYAxesTicksPadding', data, true),
            rightYAxesTicksDisplay: this.getRealValue('rightYAxesTicksDisplay', data, true),
            rightYAxesGridLinesDisplay: this.getRealValue('rightYAxesGridLinesDisplay', data, true),
            rightYAxesLabel: this.getRealValue('rightYAxesLabel', data, ''),
            rightYAxesLabelDisplay: this.getRealValue('rightYAxesLabelDisplay', data, true),
            rightYAxesLabelFontSize: this.getRealValue('rightYAxesLabelFontSize', data, 14),
            rightYAxesLabelFontFamily: this.getRealValue('rightYAxesLabelFontFamily', data, f),
            rightYAxesLabelFontColor: this.getRealValue('rightYAxesLabelFontColor', data, b),
            rightYAxesLabelFontStyle: this.getRealValue('rightYAxesLabelFontStyle', data, e),
            rightYAxesLabelPadding: this.getRealValue('rightYAxesLabelPadding', data, 0),
            rightYAxesLabelRotation: this.getRealValue('rightYAxesLabelRotation', data, 0),
            rightYAxesStacked: this.getRealValue('rightYAxesStacked', data, false),
            rightYAxesDisplay: this.getRealValue('rightYAxesDisplay', data, false),
            rightYAxesGridLinesDrawBorder: this.getRealValue('rightYAxesGridLinesDrawBorder', data, false),
            rightYAxesGridLinesColor: this.getRealValue('rightYAxesGridLinesColor', data, c),
            rightYAxesTicksFontSize: this.getRealValue('rightYAxesTicksFontSize', data, 10),
            rightYAxesTicksFontFamily: this.getRealValue('rightYAxesTicksFontFamily', data, f),
            rightYAxesTicksFontStyle: this.getRealValue('rightYAxesTicksFontStyle', data, e),
            rightYAxesTicksFontColor: this.getRealValue('rightYAxesTicksFontColor', data, b),
            rightYAxesTicksOffset: this.getRealValue('rightYAxesTicksOffset', data, 0),

            leftYAxesBorderDash: this.getRealValue('leftYAxesBorderDash', data, false), //number array
            leftYAxesTicksBegintAtZero: this.getRealValue('leftYAxesTicksBegintAtZero', data, true),
            leftYAxesTicksPadding: this.getRealValue('leftYAxesTicksPadding', data, true),
            leftYAxesTicksDisplay: this.getRealValue('leftYAxesTicksDisplay', data, true),
            leftYAxesGridLinesDisplay: this.getRealValue('leftYAxesGridLinesDisplay', data, true),
            leftYAxesGridLinesDrawOnChartArea: this.getRealValue('leftYAxesGridLinesDrawOnChartArea', data, false),
            leftYAxesGridLinesDrawTicks: this.getRealValue('leftYAxesGridLinesDrawTicks', data, false),
            leftYAxesLabel: this.getRealValue('leftYAxesLabel', data, ''),
            leftYAxesLabelDisplay: this.getRealValue('leftYAxesLabelDisplay', data, true),
            leftYAxesLabelFontSize: this.getRealValue('leftYAxesLabelFontSize', data, 14),
            leftYAxesLabelFontFamily: this.getRealValue('leftYAxesLabelFontFamily', data, f),
            leftYAxesLabelFontColor: this.getRealValue('leftYAxesLabelFontColor', data, b),
            leftYAxesLabelFontStyle: this.getRealValue('leftYAxesLabelFontStyle', data, e),
            leftYAxesLabelPadding: this.getRealValue('leftYAxesLabelPadding', data, 0),
            leftYAxesLabelRotation: this.getRealValue('leftYAxesLabelRotation', data, 0),
            leftYAxesStacked: this.getRealValue('leftYAxesStacked', data, false),
            leftYAxesDisplay: this.getRealValue('leftYAxesDisplay', data, true),
            leftYAxesGridLinesDrawBorder: this.getRealValue('leftYAxesGridLinesDrawBorder', data, false),
            leftYAxesGridLinesColor: this.getRealValue('leftYAxesGridLinesColor', data, c),
            leftYAxesTicksFontSize: this.getRealValue('leftYAxesTicksFontSize', data, 10),
            leftYAxesTicksFontFamily: this.getRealValue('leftYAxesTicksFontFamily', data, f),
            leftYAxesTicksFontStyle: this.getRealValue('leftYAxesTicksFontStyle', data, e),
            leftYAxesTicksFontColor: this.getRealValue('leftYAxesTicksFontColor', data, b),
            leftYAxesTicksOffset: this.getRealValue('leftYAxesTicksOffset', data, 0),
            leftYAxesMin: this.getRealValue('leftYAxesMin', data, false),
            leftYAxesMax: this.getRealValue('leftYAxesMax', data, false),
            leftYAxesStepSize: this.getRealValue('leftYAxesStepSize', data, false),
            leftYAxesLabelConcat: this.getRealValue('leftYAxesLabelConcat', data, false),
            leftYAxesZeroLineColor: this.getRealValue('leftYAxesZeroLineColor', data, 'black'),
            leftYAxesLabelSeparatesThousands: this.getRealValue('leftYAxesLabelSeparatesThousands', data, true),

            canvasHeight: this.getRealValue('canvasHeight', data, false),
            canvasWidth: this.getRealValue('canvasWidth', data, false),
            draggable: this.getRealValue('draggable', data, false),
            responsive: this.getRealValue('responsive', data, true),
            aspectRatio: this.getRealValue('aspectRatio', data, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', data, true),
            bezierCurve: this.getRealValue('bezierCurve', data, false),
            showLinearXAxes: this.getRealValue('showLinearXAxes', data, false),
            customLabelsForYAxes: this.getRealValue('customLabelsForYAxes', data, false),
            tooltipsSeparatesThousands: this.getRealValue('tooltipsSeparatesThousands', data, false)
        };

        this.value = v;
        return v;
    }

    updateHtml(data) {
        this.getParameters(data);
        let c = ComboChartWidget.getChartConfig(this.value);
        this.chart.data = c.data;
        this.chart.options = c.options;

        this.chart.update();
    }

    initEventHandlers() {
        const canvas = $('#' + this.options.id + 'Canvas'), ctx = canvas[0].getContext('2d'),
            c = new Chart(ctx, ComboChartWidget.getChartConfig(this.value));

        canvas.parent().next().html(c.generateLegend()).on('click', '.ks-legend-item', e => {
            let legend = $(e.target).closest('.ks-legend-item'), id = legend.toggleClass('off').data('id');

            c.getDatasetMeta(id).hidden = !c.getDatasetMeta(id).hidden;

            c.update();
        });
        this.chart = c;
    }

    static getChartConfig(v) {
        let data = v.data;

        for (let f = 0; f < v.datasets.length; ++f) {
            if (v.datasets[f].data) {
                v.datasets[f].data = [];
            }
        }

        let ds, e, datasets = v.datasets, d = data[data.length - 1], i, j, existXLabels = data.length === 2,
            labels = existXLabels ? data[0].map(item => item.label) : [], s;

        for (j = 0; j < d.length; ++j) {
            for (i = 0; i < datasets.length; ++i) {
                if (!datasets[i].data) {
                    datasets[i].data = [];
                }

                ds = datasets[i];
                e = d[j][i];

                if (e) {
                    if (v.plot && ds.type === 'line') {
                        ds.data.push(e);
                        ds.xAxisID = 'lineAxisX';
                    } else {
                        s = e.value === '' ? '0' : Utils.parseNumber(e.value);
                        ds.data.push(s);
                    }

                    if (v.customLabelsForYAxes) {
                        if (!ds.customLabels) {
                            ds.customLabels = [];
                        }

                        ds.customLabels.push(e.label);
                    }
                }
            }
        }

        let xAxes = [], yAxes = [];

        xAxes.push({
            display: v.xAxesDisplay,
            stacked: v.xAxesStacked,
            gridLines: {
                display: v.xAxesGridLinesDisplay,
                drawBorder: v.xAxesGridLinesDrawBorder,
                drawOnChartArea: v.xAxesGridLinesDrawOnChartArea,
                drawTicks: v.xAxesGridLinesDrawTicks,
                color: v.xAxesGridLinesColor,
                zeroLineColor: v.xAxesZeroLineColor,
                offsetGridLines: v.xAxesOffsetGridLines
            },
            ticks: {
                display: existXLabels === true,
                beginAtZero: v.xAxesTicksBegintAtZero,
                fontSize: v.xAxesTicksFontSize,
                fontFamily: v.xAxesTicksFontFamily,
                fontStyle: v.xAxesTicksFontStyle,
                fontColor: v.xAxesTicksFontColor,
                minRotation: v.xAxesLabelRotation,
                maxRotation: v.xAxesLabelRotation,
                labelOffset: v.xAxesTicksOffset,
                padding: v.xAxesTicksPadding
            }
        });

        if (v.plot) {
            xAxes.push({
                id: 'lineAxisX',
                type: 'linear',
                gridLines: {
                    display: v.xAxesGridLinesDisplay,
                    drawBorder: v.xAxesGridLinesDrawBorder,
                    color: v.xAxesGridLinesColor,
                    zeroLineColor: v.xAxesGridLinesColor,
                    offsetGridLines: v.xAxesOffsetGridLines
                },
                ticks: {
                    display: existXLabels === false || v.showLinearXAxes,
                    fontSize: v.xAxesTicksFontSize,
                    fontFamily: v.xAxesTicksFontFamily,
                    fontStyle: v.xAxesTicksFontStyle,
                    fontColor: v.xAxesTicksFontColor,
                    autoSkip: true,
                    callback: v => Math.round(v),
                    minRotation: v.xAxesLabelRotation,
                    maxRotation: v.xAxesLabelRotation,
                    labelOffset: v.xAxesTicksOffset,
                    padding: v.xAxesTicksPadding
                },

                scaleLabel: {
                    display: v.xAxesLabelDisplay,
                    fontSize: v.xAxesLabelFontSize,
                    fontFamily: v.xAxesLabelFontFamily,
                    fontColor: v.xAxesLabelFontColor,
                    fontStyle: v.xAxesLabelFontStyle,
                    padding: v.xAxesLabelPadding
                }
            });
        }

        let leftYAxesTicks = {
            beginAtZero: v.leftYAxesTicksBegintAtZero,
            padding: v.leftYAxesTicksPadding,
            display: v.leftYAxesTicksDisplay,
            labelOffset: v.leftYAxesTicksOffset,
            fontFamily: v.leftYAxesTicksFontFamily,
            fontSize: v.leftYAxesTicksFontSize,
            fontStyle: v.leftYAxesTicksFontStyle,
            fontColor: v.leftYAxesTicksFontColor,
            minRotation: v.leftYAxesLabelRotation,
            maxRotation: v.leftYAxesLabelRotation,
            autoSkip: true
        };

        if (v.leftYAxesMax !== false) {
            leftYAxesTicks.max = v.leftYAxesMax;
        }

        if (v.leftYAxesMin !== false) {
            leftYAxesTicks.min = v.leftYAxesMin;
        }

        if (v.leftYAxesStepSize !== false) {
            leftYAxesTicks.stepSize = v.leftYAxesStepSize;
        }

        if (v.leftYAxesLabelConcat !== false) {
            leftYAxesTicks.callback = (value, index, values) => value + v.leftYAxesLabelConcat;
        }

        if (v.leftYAxesLabelSeparatesThousands !== false) {
            leftYAxesTicks.callback = (value, index, values) => Utils.separatesThousands(value);
        }

        yAxes.push({
            id: 'leftYAxes',
            display: v.leftYAxesDisplay,
            stacked: v.leftYAxesStacked,
            gridLines: {
                display: v.leftYAxesGridLinesDisplay,
                drawOnChartArea: v.leftYAxesGridLinesDrawOnChartArea,
                color: v.leftYAxesGridLinesColor,
                drawBorder: v.leftYAxesGridLinesDrawBorder,
                drawTicks: v.leftYAxesGridLinesDrawTicks,
                borderDash: v.leftYAxesBorderDash
            },
            ticks: leftYAxesTicks,
            scaleLabel: {
                labelString: v.leftYAxesLabel,
                display: v.leftYAxesLabelDisplay,
                fontSize: v.leftYAxesLabelFontSize,
                fontFamily: v.leftYAxesLabelFontFamily,
                fontColor: v.leftYAxesLabelFontColor,
                fontStyle: v.leftYAxesLabelFontStyle,
                padding: v.leftYAxesLabelPadding
            }
        });

        yAxes.push({
            id: 'rightYAxes',
            display: v.rightYAxesDisplay,
            position: 'right',
            offset: false,
            gridLines: {
                display: v.rightYAxesGridLinesDisplay,
                drawOnChartArea: true,
                color: v.rightYAxesGridLinesColor,
                drawBorder: v.rightYAxesGridLinesDrawBorder,
                drawTicks: v.rightYAxesDisplay,
                borderDash: v.rightYAxesBorderDash
            },
            ticks: {
                padding: v.rightYAxesTicksPadding,
                display: v.rightYAxesTicksDisplay,
                beginAtZero: v.rightYAxesTicksBegintAtZero,

                labelOffset: v.rightYAxesTicksOffset,
                fontFamily: v.rightYAxesTicksFontFamily,
                fontSize: v.rightYAxesTicksFontSize,
                fontStyle: v.rightYAxesTicksFontStyle,
                fontColor: v.rightYAxesTicksFontColor,
                minRotation: v.rightYAxesLabelRotation,
                maxRotation: v.rightYAxesLabelRotation,
                autoSkip: true
            },
            scaleLabel: {
                labelString: v.rightYAxesLabel,
                display: v.rightYAxesLabelDisplay,
                fontSize: v.rightYAxesLabelFontSize,
                fontFamily: v.rightYAxesLabelFontFamily,
                fontColor: v.rightYAxesLabelFontColor,
                fontStyle: v.rightYAxesLabelFontStyle,
                padding: v.rightYAxesLabelPadding
            }
        });

        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                dragData: v.draggable,
                dragDataRound: 2,
                onDragEnd: (e, datasetIndex, index, value) => {
                    let el = $('<div>').data('id', v.id).data('action', 'moved').data('lineIndex', datasetIndex).data('pointIndex', index).data('value', value);
                    Widget.doHandleSystemEvent(el, e);
                },
                scales: {
                    xAxes: xAxes,
                    yAxes: yAxes
                },
                plugins: {
                    datalabels: {
                        align: c => v.datasets[c.datasetIndex].dataLabelAlign ? v.datasets[c.datasetIndex].dataLabelAlign : 'center',
                        offset: c => v.datasets[c.datasetIndex].type === 'line' ? 5 : 0,
                        anchor: c => v.datasets[c.datasetIndex].dataLabelAnchor ? v.datasets[c.datasetIndex].dataLabelAnchor : 'center',
                        clamp: true,
                        clip: false,
                        display: c => v.datasets[c.datasetIndex].dataLabelVisible !== false ? true : false,
                        borderRadius: c => v.datasets[c.datasetIndex].dataLabelBorderRadius ? v.datasets[c.datasetIndex].dataLabelBorderRadius : 0,
                        borderWidth: c => v.datasets[c.datasetIndex].dataLabelBorderWidth ? v.datasets[c.datasetIndex].dataLabelBorderWidth : 0,
                        color: c => v.datasets[c.datasetIndex].dataLabelFontColor ? v.datasets[c.datasetIndex].dataLabelFontColor : 'black',
                        backgroundColor: c => v.datasets[c.datasetIndex].dataLabelBackgroundColor ? v.datasets[c.datasetIndex].dataLabelBackgroundColor : v.datasets[c.datasetIndex].backgroundColor,
                        font: c => {
                            let t = {
                                size: v.yAxesTicksFontSize,
                                color: v.yAxesTicksFontColor,
                                style: v.yAxesTicksFontStyle,
                                family: v.yAxesTicksFontFamily,
                                lineHeight: 0
                            };

                            if (v.datasets[c.datasetIndex].type === 'line') {
                                t.lineHeight = 2;
                            }

                            return t;
                        },
                        padding: c => v.datasets[c.datasetIndex].type === 'line' ? {
                            top: 3,
                            left: 10,
                            right: 10
                        } : {top: 0, left: 0, right: 0},
                        formatter: (p, c) => {
                            if (v.customLabelsForYAxes) {
                                return c.dataset.customLabels[c.dataIndex];
                            }

                            return 'object' === typeof p ? p.y : p[1];
                        }
                    }
                },
                tooltips: {
                    enabled: v.tooltipsEnabled,
                    mode: v.tooltipsMode,
                    intersect: true,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            if(v.tooltipsSeparatesThousands) {
                                return Utils.separatesThousands(tooltipItem.value);
                            }
                            return tooltipItem.value;
                        }
                    }
                },
                title: {
                    display: true
                },
                legend: {
                    display: false
                },
                legendCallback: chart => {
                    if (v.legendGroupByStack) {
                        const groupBy = (xs, key) => {
                            return xs.reduce((rv, x) => {
                                (rv[x[key]] = rv[x[key]] || []).push(x);
                                return rv;
                            }, {});
                        };

                        let groupedByBars = groupBy(chart.data.datasets.filter(d => d.type === 'bar' || d.type === 'line'), 'stack'), /*lines = chart.data.datasets.filter(d => d.type === 'line'),*/
                            i, text = [], legendBackgroundColor, legendTitleColor, j = 0; //lines.length;

                        for (let [key, legends] of Object.entries(groupedByBars)) {
                            text.push('<div class="ks-legend-inner">');
                            for (i = 0; i < legends.length; ++i) {
                                legendBackgroundColor = chart.data.datasets[j].legendBackgroundColor;
                                legendTitleColor = chart.data.datasets[i].legendTitleColor ? chart.data.datasets[i].legendTitleColor : chart.data.datasets[i].backgroundColor;
                                text.push(`<div data-id="${j}" class="ks-legend-item" style="order: ${legends.length - i};"><div class="ks-legend-item-inner" style="${legendBackgroundColor ? 'background-color:' + legendBackgroundColor + ';' : ''}"><div style="color: ${legendTitleColor};" class="ks-legend-icon"></div><div style="color: ${legendTitleColor};"><div style="background-color: ${chart.data.datasets[j].backgroundColor};" class="ks-legend-icon"></div><div style="background-color: ${chart.data.datasets[j].backgroundColor};" class="ks-legend-label">${legends[i].legendLabel}</div></div></div>`);
                                ++j;
                            }
                            text.push('</div>');
                        }

                        return text.join('');
                    } else {
                        let text = ['<div class="ks-legend-inner">'], i, lines = [], legendBackgroundColor,
                            legendTitleColor;

                        for (i = 0; i < chart.data.datasets.length; ++i) {//color vs background-color configba !!!!!
                            legendBackgroundColor = chart.data.datasets[i].legendBackgroundColor;
                            legendTitleColor = chart.data.datasets[i].legendTitleColor ? chart.data.datasets[i].legendTitleColor : chart.data.datasets[i].backgroundColor;
                            if (chart.data.datasets[i].type === 'line') {
                                lines.push(`<div data-id="${i}" class="ks-legend-item"><div class="ks-legend-item-inner" style="${legendBackgroundColor ? 'background-color:' + legendBackgroundColor + ';' : ''}"><div style="color: ${legendTitleColor};" class="ks-legend-icon"></div><div style="color: ${legendTitleColor};"  class="ks-legend-label">${chart.data.datasets[i].legendLabel}</div></div></div>`);
                            } else {
                                text.push(`<div data-id="${i}" class="ks-legend-item"><div class="ks-legend-item-inner" style="${legendBackgroundColor ? 'background-color:' + legendBackgroundColor + ';' : ''}"><div style="color: ${legendTitleColor};" class="ks-legend-icon"></div><div style="color: ${legendTitleColor};" class="ks-legend-label">${chart.data.datasets[i].legendLabel}</div></div></div>`);
                            }
                        }

                        for (i = 0; i < lines.length; ++i) {
                            text.push(lines[i]);
                        }

                        text.push('</div>');

                        return text.join('');
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
                        // borderWidth: 1.5,
                        tension: 0
                    }
                },
                responsiveAnimationDuration: 0,
                responsive: v.responsive,
                aspectRatio: v.aspectRatio,
                maintainAspectRatio: v.maintainAspectRatio,
                bezierCurve: v.bezierCurve
            }
        };
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