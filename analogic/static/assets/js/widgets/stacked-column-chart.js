'use strict';

class StackedColumnChartWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        this.getParameters(d);

        return `
<div class="ks-chart-holder" style="${this.getGeneralStyles(d).join('')}">
    <canvas id="${o.id}Canvas" aria-label="${o.id}" role="img"></canvas>
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
        const fontFamily = this.getRealValue('fontFamily', d, 'imago, sans-serif');
        const fontSize = this.getRealValue('fontSize', d, 12);
        const fontStyle = this.getRealValue('fontStyle', d, 'normal');
        const fontWeight = this.getRealValue('fontWeight', d, 'normal');
        const fontLineHeight = this.getRealValue('fontLineHeight', d, 'normal');
        const fontColor = this.getRealValue('fontColor', d, '#000000');
        const gridColor = this.getRealValue('gridColor', d, '#B1B3B3');
        const gridWidth = this.getRealValue('gridWidth', d, 1);
        const xAxisGridDisplay = this.getRealValue('xAxisGridDisplay', d, true);
        const yAxisGridDisplay = this.getRealValue('yAxisGridDisplay', d, true);

        const v = {
            data: !this.options.data && !d.data ? this.getDemoData() : $.extend(true, [], this.options.data || [], d.data || []),
            aspectRatio: this.getRealValue('aspectRatio', d, null),
            maintainAspectRatio: this.getRealValue('maintainAspectRatio', d, true),
            tooltipsEnabled: this.getRealValue('tooltipsEnabled', d, true),
            animationEnabled: this.getRealValue('animationEnabled', d, true),
            hideZeroBars: this.getRealValue('hideZeroBars', d, true),

            rightBorderVisible: this.getRealValue('rightBorderVisible', d, true),
            rightBorderWidth: this.getRealValue('rightBorderWidth', d, 1),
            rightBorderColor: this.getRealValue('rightBorderWidth', d, gridColor),

            topBorderVisible: this.getRealValue('topBorderVisible', d, true),
            topBorderWidth: this.getRealValue('topBorderWidth', d, 1),
            topBorderColor: this.getRealValue('topBorderWidth', d, gridColor),

            interactionMode: this.getRealValue('interactionMode', d, 'nearest'),
            interactionAxis: this.getRealValue('interactionAxis', d, 'x'),
            interactionIsIntersect: this.getRealValue('interactionIsIntersect', d, true),

            lineColor: this.getRealValue('lineColor', d, gridColor),
            lineWidth: this.getRealValue('lineWidth', d, 1.5),
            lineTension: this.getRealValue('lineTension', d, 0.3),

            percentageLineOffsetTop: this.getRealValue('percentageLineOffsetTop', d, 0),
            percentageLineOffsetBottom: this.getRealValue('percentageLineOffsetBottom', d, 0),

            barBorderColor: this.getRealValue('barBorderColor', d, '#FFFFFF'),
            barBorderRadius: this.getRealValue('barBorderRadius', d, 0),
            barBorderWidth: this.getRealValue('barBorderWidth', d, 3),
            barInflateAmount: this.getRealValue('barInflateAmount', d, 'auto'),
            barPercentage: this.getRealValue('barInflateAmount', d, 0.9),
            barCategoryPercentage: this.getRealValue('barCategoryPercentage', d, 0.8),
            barThickness: this.getRealValue('barThickness', d, null),
            barMaxThickness: this.getRealValue('barMaxThickness', d, null),
            barMinLength: this.getRealValue('barMinLength', d, 2),

            canvasPaddingTop: this.getRealValue('canvasPaddingTop', d, 0),
            canvasPaddingRight: this.getRealValue('canvasPaddingRight', d, 0),
            canvasPaddingBottom: this.getRealValue('canvasPaddingBottom', d, 0),
            canvasPaddingLeft: this.getRealValue('canvasPaddingLeft', d, 0),

            customLabels: this.getRealValue('customLabels', d, false),

            legendVisible: this.getRealValue('legendVisible', d, true),
            legendPosition: this.getRealValue('legendPosition', d, 'bottom'),
            legendAlign: this.getRealValue('legendAlign', d, 'center'),
            legendFontFamily: this.getRealValue('legendFontFamily', d, fontFamily),
            legendFontSize: this.getRealValue('legendFontSize', d, fontSize),
            legendFontStyle: this.getRealValue('legendFontStyle', d, fontStyle),
            legendFontWeight: this.getRealValue('legendFontWeight', d, fontWeight),
            legendFontLineHeight: this.getRealValue('legendFontLineHeight', d, fontLineHeight),

            xAxisBorderDisplay: this.getRealValue('xAxisBorderDisplay', d, true),
            xAxisDisplay: this.getRealValue('xAxisDisplay', d, true),
            xAxisAlignToPixels: this.getRealValue('xAxisAlignToPixels', d, true),
            xAxisStacked: this.getRealValue('xAxisStacked', d, true),
            xAxisBorderColor: this.getRealValue('xAxisBorderColor', d, gridColor),
            xAxisBorderWidth: this.getRealValue('xAxisBorderWidth', d, 1),
            xAxisTicksLabelDisplay: this.getRealValue('xAxisTicksLabelDisplay', d, true),
            xAxisTicksFontColor: this.getRealValue('xAxisTicksFontColor', d, fontColor),
            xAxisTicksFontFamily: this.getRealValue('xAxisTicksFontFamily', d, fontFamily),
            xAxisTicksFontSize: this.getRealValue('xAxisTicksFontSize', d, fontSize),
            xAxisTicksFontStyle: this.getRealValue('xAxisTicksFontStyle', d, fontStyle),
            xAxisTicksFontWeight: this.getRealValue('xAxisTicksFontWeight', d, fontWeight),
            xAxisTicksFontLineHeight: this.getRealValue('xAxisTicksFontLineHeight', d, fontLineHeight),
            xAxisTicksLabelPadding: this.getRealValue('xAxisTicksLabelPadding', d, 3),
            xAxisGridDisplay: xAxisGridDisplay,
            xAxisGridColor: this.getRealValue('xAxisGridColor', d, gridColor),
            xAxisGridOffset: this.getRealValue('xAxisGridOffset', d, false),
            xAxisTicksDisplay: this.getRealValue('xAxisTicksDisplay', d, xAxisGridDisplay),
            xAxisGridDrawOnChartArea: this.getRealValue('xAxisGridDrawOnChartArea', d, xAxisGridDisplay),
            xAxisGridLineWidth: this.getRealValue('xAxisGridLineWidth', d, gridWidth),

            yMin: this.getRealValue('yMin', d, null),
            yMax: this.getRealValue('yMax', d, null),
            yMarginTop: this.getRealValue('yMarginTop', d, 0), // e.g.: 0.2, '20%' or 250
            yMarginBottom: this.getRealValue('yMarginBottom', d, 0),
            yAxisDisplay: this.getRealValue('yAxisDisplay', d, true),
            yAxisAlignToPixels: this.getRealValue('yAxisAlignToPixels', d, true),
            yAxisStacked: this.getRealValue('yAxisStacked', d, true),
            yAxisBorderDisplay: this.getRealValue('yAxisBorderDisplay', d, true),
            yAxisBorderColor: this.getRealValue('yAxisBorderColor', d, gridColor),
            yAxisBorderWidth: this.getRealValue('yAxisBorderWidth', d, 1),
            yAxisGridDisplay: yAxisGridDisplay,
            yAxisGridDrawOnChartArea: this.getRealValue('yAxisGridDrawOnChartArea', d, yAxisGridDisplay),
            yAxisGridLineWidth: this.getRealValue('yAxisGridLineWidth', d, gridWidth),
            yAxisTicksDisplay: this.getRealValue('yAxisTicksDisplay', d, yAxisGridDisplay),
            yAxisTicksLabelDisplay: this.getRealValue('yAxisTicksLabelDisplay', d, true),
            yAxisTicksFontColor: this.getRealValue('yAxisTicksFontColor', d, fontColor),
            yAxisTicksFontFamily: this.getRealValue('yAxisTicksFontFamily', d, fontFamily),
            yAxisTicksFontSize: this.getRealValue('yAxisTicksFontSize', d, fontSize),
            yAxisTicksFontStyle: this.getRealValue('yAxisTicksFontStyle', d, fontStyle),
            yAxisTicksFontWeight: this.getRealValue('yAxisTicksFontWeight', d, fontWeight),
            yAxisTicksFontLineHeight: this.getRealValue('yAxisTicksFontLineHeight', d, fontLineHeight),
            yAxisTicksLabelPadding: this.getRealValue('yAxisTicksLabelPadding', d, 3),
            yAxisTicksCount: this.getRealValue('yAxisTicksCount', d, null),
            yAxisTicksLimit: this.getRealValue('yAxisTicksLimit', d, 10),
            yAxisGridColor: this.getRealValue('yAxisGridColor', d, gridColor),
            yAxisGridLinesNum: this.getRealValue('yAxisGridLinesNum', d, 10),
            yAxisShowOnlyZeroLine: this.getRealValue('yAxisShowOnlyZeroLine', d, false),
            yAxisUnit: this.getRealValue('yAxisUnit', d, ''),
            yAxisDecimalNum: parseInt(this.getRealValue('yAxisDecimalNum', d, 2)),
            yAxisSeparatesThousands: this.getRealValue('yAxisSeparatesThousands', d, true),
            yAxisTicksPrecisionFixed: this.getRealValue('yAxisTicksPrecisionFixed', d, false),

            labelDataPointVisible: this.getRealValue('labelDataPointVisible', d, true),
            labelDataLabelVisible: this.getRealValue('labelDataLabelVisible', d, true),
            labelColor: this.getRealValue('labelColor', d, '#FFFFFF'),
            labelBackgroundColor: this.getRealValue('labelBackgroundColor', d, null),
            labelFontFamily: this.getRealValue('labelFontFamily', d, fontFamily),
            labelFontSize: this.getRealValue('labelFontSize', d, fontSize),
            labelFontStyle: this.getRealValue('labelFontStyle', d, fontStyle),
            labelFontWeight: this.getRealValue('labelFontWeight', d, fontWeight),
            labelFontLineHeight: this.getRealValue('labelFontLineHeight', d, fontLineHeight),
            labelPaddingTop: this.getRealValue('labelPaddingTop', d, 7),
            labelPaddingLeft: this.getRealValue('labelPaddingLeft', d, 7),
            labelPaddingRight: this.getRealValue('labelPaddingRight', d, 7),
            labelPaddingBottom: this.getRealValue('labelPaddingBottom', d, 3),
            labelAlign: this.getRealValue('labelAlign', d, 'bottom'),
            labelTextAlign: this.getRealValue('labelTextAlign', d, 'start'),
            labelOffset: this.getRealValue('labelOffset', d, 0),
            labelAnchor: this.getRealValue('labelAnchor', d, 'start'),
            labelClamp: this.getRealValue('labelClamp', d, true),
            labelClip: this.getRealValue('labelClip', d, false),
            labelBorderColor: this.getRealValue('labelBorderColor', d, null),
            labelBorderRadius: this.getRealValue('labelBorderRadius', d, 5),
            labelBorderWidth: this.getRealValue('labelBorderWidth', d, 0),

            arrowEnabled: this.getRealValue('arrowEnabled', d, true),
            arrowMarginTop: this.getRealValue('arrowMarginTop', d, 0.2), // e.g.: 0.2, '20%' or 250
            arrowMarginMiddle: this.getRealValue('arrowMarginMiddle', d, '20%'),
            arrowMarginBottom: this.getRealValue('arrowMarginBottom', d, 0.1),
            arrowLength: this.getRealValue('arrowLength', d, 0.8),
            arrowLineColor: this.getRealValue('arrowLineColor', d, gridColor),
            arrowLineWidth: this.getRealValue('arrowLineWidth', d, 2),
            arrowCircleColor: this.getRealValue('arrowCircleColor', d, gridColor),
            arrowCircleRadius: this.getRealValue('arrowCircleRadius', d, 4),
            arrowCircleWidth: this.getRealValue('arrowCircleWidth', d, 2),
            arrowTriangleColor: this.getRealValue('arrowTriangleColor', d, gridColor),
            arrowTriangleSize: this.getRealValue('arrowTriangleSize', d, 6),
            arrowLabelVisible: this.getRealValue('arrowLabelVisible', d, true),
            arrowLabelColor: this.getRealValue('arrowLabelColor', d, '#FFFFFF'),
            arrowLabelBackgroundColor: this.getRealValue('arrowLabelBackgroundColor', d, null),
            arrowLabelFontFamily: this.getRealValue('arrowLabelFontFamily', d, fontFamily),
            arrowLabelFontSize: this.getRealValue('arrowLabelFontSize', d, fontSize),
            arrowLabelFontStyle: this.getRealValue('arrowLabelFontStyle', d, fontStyle),
            arrowLabelFontWeight: this.getRealValue('arrowLabelFontWeight', d, fontWeight),
            arrowLabelFontLineHeight: this.getRealValue('arrowLabelFontLineHeight', d, fontLineHeight),
            arrowLabelPaddingTop: this.getRealValue('arrowLabelPaddingTop', d, 7),
            arrowLabelPaddingLeft: this.getRealValue('arrowLabelPaddingLeft', d, 7),
            arrowLabelPaddingRight: this.getRealValue('arrowLabelPaddingRight', d, 7),
            arrowLabelPaddingBottom: this.getRealValue('arrowLabelPaddingBottom', d, 3),
            arrowLabelAlign: this.getRealValue('arrowLabelAlign', d, 'top'),
            arrowLabelOffset: this.getRealValue('arrowLabelOffset', d, 0),
            arrowLabelAnchor: this.getRealValue('arrowLabelAnchor', d, 'end'),
            arrowLabelClamp: this.getRealValue('arrowLabelClamp', d, true),
            arrowLabelClip: this.getRealValue('arrowLabelClip', d, false),
            arrowLabelBorderColor: this.getRealValue('arrowLabelBorderColor', d, null),
            arrowLabelBorderRadius: this.getRealValue('arrowLabelBorderRadius', d, 5),
            arrowLabelBorderWidth: this.getRealValue('arrowLabelBorderWidth', d, 0)
        };

        this.value = v;

        return v;
    }

    initEventHandlers() {
        const c = $('#' + this.id + 'Canvas'), ctx = c[0].getContext('2d');

        this.chart = new Chart4(ctx, this.getChartConfig());
    }

    addArrowDatasets(datasets, arrows, labels, yMax, yTotal) {
        let v = this.value, i, a, b, d, yArrowTotal, yArrowSmall, len = arrows.length, yIncrement = 0, y;

        i = Utils.calculateMargin(v.arrowMarginBottom, yTotal);
        yIncrement += i;
        yArrowSmall = yMax + i;

        i = Utils.calculateMargin(v.arrowMarginMiddle, yTotal);
        yIncrement += i;
        yArrowTotal = yArrowSmall + i;

        i = Utils.calculateMargin(v.arrowMarginTop, yTotal);
        yIncrement += i;

        for (i = 0; i < len; ++i) {
            d = arrows[i];
            a = i ? labels[i - 1] : labels[0];
            b = a + ((i ? labels[i] : labels.slice(-1)) - a) * (d.arrowLength || v.arrowLength || 0.9);

            y = i ? yArrowSmall : yArrowTotal;

            datasets.push({
                type: 'line',
                isArrow: true,
                data: [{x: a, y: y}, {x: (a + b) / 2, y: y}, {x: b, y: y}],
                backgroundColor: v.arrowLineColor,
                borderColor: v.arrowLineColor,
                borderWidth: v.arrowLineWidth,
                hoverBorderWidth: v.arrowLineWidth,
                labelVisible: v.arrowLabelVisible,
                labelAlign: v.arrowLabelAlign,
                labelAnchor: v.arrowLabelAnchor,
                labelColor: v.arrowLabelColor,
                labelBackgroundColor: v.arrowLabelBackgroundColor,
                labelOffset: v.arrowLabelOffset,
                labelFontFamily: v.arrowLabelFontFamily,
                labelFontSize: v.arrowLabelFontSize,
                labelFontStyle: v.arrowLabelFontStyle,
                labelFontWeight: v.arrowLabelFontWeight,
                labelFontLineHeight: v.arrowLabelFontLineHeight,
                labelPaddingTop: v.arrowLabelPaddingTop,
                labelPaddingLeft: v.arrowLabelPaddingLeft,
                labelPaddingRight: v.arrowLabelPaddingRight,
                labelPaddingBottom: v.arrowLabelPaddingBottom,
                labelClamp: v.arrowLabelClamp,
                labelClip: v.arrowLabelClip,
                labelBorderColor: v.arrowLabelBorderColor,
                labelBorderRadius: v.arrowLabelBorderRadius,
                labelBorderWidth: v.arrowLabelBorderWidth,
                xAxisID: 'x1',
                yAxisID: 'y1',
                pointStyle: ['circle', false, 'triangle'],
                pointBorderWidth: [v.arrowCircleWidth, 0, 1],
                pointHoverBorderWidth: [v.arrowCircleWidth, 0, 1],
                pointBorderColor: [v.arrowCircleColor, '', v.arrowTriangleColor],
                pointHoverBorderColor: [v.arrowCircleColor, '', v.arrowTriangleColor],
                pointBackgroundColor: ['transparent', '', v.arrowTriangleColor],
                pointHoverBackgroundColor: ['transparent', '', v.arrowTriangleColor],
                rotation: [0, 0, 90],
                radius: [v.arrowCircleRadius, 0, v.arrowTriangleSize],
                hitRadius: [v.arrowCircleRadius, 0, v.arrowTriangleSize],
                hoverRadius: [v.arrowCircleRadius, 0, v.arrowTriangleSize],
                ...d,
            });
        }

        return yIncrement;
    }

    getChartConfig() {
        const v = this.value, data = v.data, showOnlyZeroLine = v.yAxisShowOnlyZeroLine, stepSize = v.yAxisGridLinesNum ? v.yAxisGridLinesNum + 1 : 0, datasets = data.datasets, labels = data.labels;

        const yAxisUnit = v.yAxisUnit, yAxisDecimalNum = v.yAxisDecimalNum, yAxisSeparatesThousands = v.yAxisSeparatesThousands, yAxisTicksPrecisionFixed = v.yAxisTicksPrecisionFixed;

        let yMin = v.yMin, yMax = v.yMax, isYMinSet = $.isNumeric(yMin), isYMaxSet = $.isNumeric(yMax), min = Infinity, max = -Infinity, i, d, labelHalfStep = ((labels[1] || labels[0]) - (labels[0] || 0)) / 2, yTotal;

        if (!isYMinSet || !isYMaxSet) {
            for (d of datasets) {
                min = Math.min(min, ...d.data);
                max = Math.max(max, ...d.data);
            }

            if (!isYMinSet) {
                yMin = min;
            }

            if (!isYMaxSet) {
                yMax = max;
            }
        }

        for (d of datasets) {
            if ('line' === d.type) {
                d.yAxisID = d.percentage ? 'y2' : 'y1';
            } else if (v.hideZeroBars) {
                for (i = 0; i < d.data.length; ++i) {
                    if (!d.data[i]) {
                        d.data[i] = null;
                    }
                }
            }
        }

        yTotal = yMax - yMin;

        yMin -= Utils.calculateMargin(v.yMarginBottom, yTotal);
        yMax += Utils.calculateMargin(v.yMarginTop, yTotal);

        yTotal = yMax - yMin;

        if (v.arrowEnabled) {
            yMax += this.addArrowDatasets(datasets, data.arrows, labels, yMax, yTotal)
        }

        this.onCompleteFinished = false;

        return {
            type: 'bar',
            data: data,
            plugins: [ChartDataLabels4],
            options: {
                animation: {
                    onComplete: (animation) => {
                        if (this.onCompleteFinished || !v.customLabels) {
                            return;
                        }

                        this.onCompleteFinished = true;

                        const chart = animation.chart;

                        const rect = chart.canvas.getBoundingClientRect();

                        const spacing = 18;

                        chart.data.datasets.forEach((dataset, datasetIndex) => {
                            const meta = chart.getDatasetMeta(datasetIndex);

                            let yCoords = [];

                            if (meta.type === 'bar') {
                                for (let q = 0; q < meta.data.length; ++q) {
                                    const bar = meta.data[q];
                                    yCoords.push(rect.top + bar.y);
                                }

                                for (let i = yCoords.length - 1; i > 0; --i) {
                                    if ((yCoords[i] - yCoords[i-1]) < 30) {
                                        yCoords[i-1] -= 30;
                                    }
                                }

                                for (let q = 0; q < meta.data.length; ++q) {
                                    const bar = meta.data[q];
                                    const value = dataset.data[q];

                                    let barX = rect.left + bar.x;
                                    let barY = rect.top + bar.y;

                                    const div = $('<div class="chart-bar-label" style="z-index:100000; white-space:nowrap; display:block; position:absolute; background:' + dataset.backgroundColor + '; color:white; padding:5px; border-radius:5px; font-size:12px;"></div>');

                                    div.css({left: barX + 20, top: yCoords[q]});
                                    div.text(`${value}`);

                                    $('body').prepend(div);
                                }
                            }
                        });
                    }
                },
                normalized: true,
                parsing: true,
                plugins: {
                    title: {
                        display: false,
                        text: 'Demo Stacked Column Chart Title'
                    },
                    subtitle: {
                        display: false,
                        text: 'Demo Stacked Column Chart Subtitle'
                    },
                    legend: {
                        display: v.legendVisible,
                        position: v.legendPosition,
                        align: v.legendAlign,
                        labels: {
                            font: {
                                family: v.legendFontFamily,
                                size: v.legendFontSize,
                                style: v.legendFontStyle,
                                weight: v.legendFontWeight,
                                lineHeight: v.legendFontLineHeight
                            },
                            sort: (a, b) => {
                                return Math.min(a.datasetIndex, b.datasetIndex);
                            },
                            filter: c => !datasets[c.datasetIndex].isArrow
                        }
                    },
                    tooltip: {
                        enabled: v.tooltipsEnabled,
                        filter: c => {
                            c = datasets[c.datasetIndex];

                            return !c.isArrow && false !== c.tooltipsEnabled;
                        },
                        callbacks: {
                            label: c => {
                                c = Utils.precisionRound('object' === typeof c.raw ? c.raw.y : c.raw, yAxisDecimalNum, yAxisTicksPrecisionFixed);

                                return (yAxisSeparatesThousands ? Utils.separatesThousands(c) : c) + yAxisUnit;
                            }
                        }
                    },
                    datalabels: {
                        align: c => {
                            //const value = c.dataset.data[c.dataIndex];
                            //return value < 5 ? 'right' : 'center'; // Adjust alignment for visibility

                            return datasets[c.datasetIndex].labelAlign || v.labelAlign;
                        },
                        offset: c => datasets[c.datasetIndex].labelOffset || v.labelOffset,
                        anchor: c => {
                            //const value = c.dataset.data[c.dataIndex];
                            //return value < 5 ? 'end' : 'center'; // Push small values outside

                            return datasets[c.datasetIndex].labelAnchor || v.labelAnchor;
                        },
                        clamp: c => datasets[c.datasetIndex].labelClamp || v.labelClamp,
                        clip: c => datasets[c.datasetIndex].labelClip || v.labelClip,
                        display: c => {
                            let d = datasets[c.datasetIndex], tooltipsEnabled = v.tooltipsEnabled && (false !== d.tooltipsEnabled), isVis = d.labelVisible;

                            if (d.isArrow) {
                                return isVis && 1 === c.dataIndex;
                            } else if (c.active) {
                                return isVis ? 'auto' : !tooltipsEnabled;
                            }

                            return (isVis ? 'auto' : false);
                        },
                        textAlign: c => datasets[c.datasetIndex].labelTextAlign || v.labelTextAlign,
                        formatter: (n, c) => {
                            let e = '', d = datasets[c.datasetIndex];

                            if (d.isArrow) {
                                return d.label;
                            }

                            if (v.labelDataPointVisible && (false !== d.labelDataPointVisible)) {
                                e = Utils.precisionRound(null === n ? 0 : 'number' === typeof n ? n : n.y, yAxisDecimalNum, yAxisTicksPrecisionFixed);

                                e = (yAxisSeparatesThousands ? Utils.separatesThousands(e) : e) + yAxisUnit;
                            }

                            if (v.labelDataLabelVisible && (false !== d.labelDataLabelVisible)) {
                                e += (d.dataLabels || [])[c.dataIndex] ?? '';
                            }

                            return e;

                        },
                        borderColor: c => datasets[c.datasetIndex].labelBorderColor || v.labelBorderColor || v.yAxisTicksFontColor,
                        borderRadius: c => datasets[c.datasetIndex].labelBorderRadius || v.labelBorderRadius,
                        borderWidth: c => datasets[c.datasetIndex].labelBorderWidth || v.labelBorderWidth || 0,
                        color: c => {
                            c = datasets[c.datasetIndex];

                            return c.labelColor || v.labelColor || v.yAxisTicksFontColor;
                        },
                        backgroundColor: c => {
                            c = datasets[c.datasetIndex];

                            return c.labelBackgroundColor || v.labelBackgroundColor || c.backgroundColor || c.borderColor;
                        },
                        font: c => {
                            c = datasets[c.datasetIndex];

                            return {
                                size: c.labelFontSize || v.labelFontSize || v.yAxisTicksFontSize,
                                weight: c.labelFontWeight || v.labelFontWeight || v.yAxisTicksFontWeight,
                                style: c.labelFontStyle || v.labelFontStyle || v.yAxisTicksFontStyle,
                                family: c.labelFontFamily || v.labelFontFamily || v.yAxisTicksFontFamily,
                                lineHeight: c.labelFontLineHeight || v.labelFontLineHeight || v.yAxisTicksFontLineHeight
                            }
                        },
                        padding: c => {
                            c = datasets[c.datasetIndex];

                            return {
                                top: c.labelPaddingTop || v.labelPaddingTop,
                                left: c.labelPaddingLeft || v.labelPaddingLeft,
                                right: c.labelPaddingRight || v.labelPaddingRight,
                                bottom: c.labelPaddingBottom || v.labelPaddingBottom
                            }
                        },
                    }
                },
                responsive: true,
                spanGaps: true,
                aspectRatio: v.aspectRatio,
                maintainAspectRatio: v.maintainAspectRatio,
                scales: {
                    x: {
                        display: v.xAxisDisplay,
                        alignToPixels: v.xAxisAlignToPixels,
                        stacked: v.xAxisStacked,
                        border: {
                            display: v.xAxisBorderDisplay,
                            width: v.xAxisBorderWidth,
                            color: v.xAxisBorderColor
                        },
                        ticks: {
                            color: v.xAxisTicksFontColor,
                            display: v.xAxisTicksLabelDisplay,
                            padding: v.xAxisTicksLabelPadding,
                            minRotation: 0,
                            maxRotation: 0,
                            font: {
                                family: v.xAxisTicksFontFamily,
                                size: v.xAxisTicksFontSize,
                                style: v.xAxisTicksFontStyle,
                                weight: v.xAxisTicksFontWeight,
                                lineHeight: v.xAxisTicksFontLineHeight
                            }
                        },
                        grid: {
                            display: v.xAxisGridDisplay,
                            offset: v.xAxisGridOffset,
                            color: v.xAxisGridColor,
                            drawTicks: v.xAxisTicksDisplay,
                            drawOnChartArea: v.xAxisGridDrawOnChartArea,
                            lineWidth: v.xAxisGridLineWidth,
                        }
                    },
                    y: {
                        type: 'linear',
                        display: v.yAxisDisplay,
                        alignToPixels: v.yAxisAlignToPixels,
                        stacked: v.yAxisStacked,
                        beginAtZero: true,
                        grace: 0,
                        min: yMin,
                        max: yMax,
                        border: {
                            display: v.yAxisBorderDisplay,
                            width: v.yAxisBorderWidth,
                            color: v.yAxisBorderColor
                        },
                        ticks: {
                            autoSkip: true,
                            //count: showOnlyZeroLine ? undefined : (v.yAxisTicksCount ?? undefined),
                            stepSize: showOnlyZeroLine ? 0 : (stepSize ? (yMax - yMin) / stepSize : 0),
                            maxTicksLimit: v.yAxisTicksLimit,
                            color: v.yAxisTicksFontColor,
                            display: v.yAxisTicksLabelDisplay,
                            padding: v.yAxisTicksLabelPadding,
                            minRotation: 0,
                            maxRotation: 0,
                            font: {
                                family: v.yAxisTicksFontFamily,
                                size: v.yAxisTicksFontSize,
                                style: v.yAxisTicksFontStyle,
                                weight: v.yAxisTicksFontWeight,
                                lineHeight: v.yAxisTicksFontLineHeight
                            },
                            callback: v => {
                                v = Utils.precisionRound(v, yAxisDecimalNum, yAxisTicksPrecisionFixed);

                                return (yAxisSeparatesThousands ? Utils.separatesThousands(v) : v) + yAxisUnit;
                            }
                        },
                        grid: {
                            display: v.yAxisGridDisplay,
                            color: v.yAxisGridColor,
                            drawTicks: v.yAxisTicksDisplay,
                            drawOnChartArea: v.yAxisGridDrawOnChartArea,
                            lineWidth: showOnlyZeroLine ? (o => 0 === o.tick.value ? v.yAxisGridLineWidth : 0) : v.yAxisGridLineWidth
                        }
                    },
                    x1: {
                        type: 'linear',
                        alignToPixels: v.xAxisAlignToPixels,
                        min: labels[0] - labelHalfStep,
                        max: parseFloat(labels.slice(-1)) + labelHalfStep,
                        offset: false,
                        display: v.topBorderVisible,
                        position: 'top',
                        border: {
                            width: v.topBorderWidth,
                            color: v.topBorderColor
                        },
                        grid: {
                            display: false,
                            offset: false
                        },
                        ticks: {
                            display: false,
                            padding: 0
                        }
                    },
                    y1: {
                        type: 'linear',
                        alignToPixels: v.xAxisAlignToPixels,
                        min: yMin,
                        max: yMax,
                        offset: false,
                        display: v.rightBorderVisible,
                        position: 'right',
                        border: {
                            width: v.rightBorderWidth,
                            color: v.rightBorderColor
                        },
                        grid: {
                            display: false,
                            offset: false
                        },
                        ticks: {
                            display: false,
                            padding: 0
                        }
                    },
                    y2: {
                        type: 'linear',
                        min: 0 - (isNaN(v.percentageLineOffsetBottom) ? parseFloat(v.percentageLineOffsetBottom) : (100 * v.percentageLineOffsetBottom / yTotal)),
                        max: 100 + (isNaN(v.percentageLineOffsetTop) ? parseFloat(v.percentageLineOffsetTop) : (100 * v.percentageLineOffsetTop / yTotal)),
                        offset: false,
                        display: false,
                        position: 'right',
                        grid: {
                            display: false,
                            offset: false
                        },
                        ticks: {
                            display: false,
                            padding: 0
                        }
                    }
                },
                layout: {
                    padding: {
                        left: v.canvasPaddingLeft,
                        right: v.canvasPaddingRight,
                        top: v.canvasPaddingTop,
                        bottom: v.canvasPaddingBottom
                    }
                },
                elements: {
                    line: {
                        borderColor: v.lineColor,
                        borderWidth: v.lineWidth,
                        tension: v.lineTension //disables bezier curves if 0
                    },
                    bar: {
                        borderColor: v.barBorderColor,
                        borderRadius: v.barBorderRadius,
                        borderWidth: v.barBorderWidth,
                        borderSkipped: 'bottom',
                        inflateAmount: v.barInflateAmount
                    }
                },
                datasets: {
                    bar: {
                        barPercentage: v.barPercentage,
                        categoryPercentage: v.barCategoryPercentage,
                        barThickness: v.barThickness ?? undefined,
                        maxBarThickness: v.barMaxThickness ?? undefined,
                        minBarLength: v.barMinLength,
                    }
                },
                interaction: {
                    mode: v.interactionMode,
                    axis: v.interactionAxis,
                    intersect: v.interactionIsIntersect
                },
                hover: {
                    animationDuration: 0
                },
            }
        };
    }

    getDemoData() {
        return {
            labels: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032],
            arrows: [
                {label: 'CAGR 16%', arrowLength: 0.985, labelAlign: 'bottom', labelAnchor: 'start', labelOffset: 10},
                {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}
            ],
            datasets: [
                {
                    label: 'Sales',
                    type: 'line',
                    data: [890000, 80570, 89140, 89171, 892800, 89850, 89320, 893090, 89560, 89530, 89700, 892700, 89840, 89710, 97980],
                    backgroundColor: '#E40046',
                    labelBackgroundColor: '#E40046',
                    borderColor: '#E40046',
                    parsing: true,
                    labelVisible: false,
                    borderDash: [5, 5],
                    lineTension: 0.1,
                    tooltipsEnabled: false,
                    //order: 1,
                    //stack: 'stackId',
                    //clip: {left: 105, top: false, right: -200, bottom: -20},
                    //hidden: false,
                },
                {
                    label: 'Percentage Line',
                    type: 'line',
                    data: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 50, 20, 10, 1],
                    backgroundColor: '#E40046',
                    labelBackgroundColor: '#E40046',
                    borderColor: '#E40046',
                    labelVisible: false,
                    tooltipsEnabled: false,
                    percentage: true
                },
                {
                    label: 'Other revenue',
                    labelDataPointVisible: false,
                    dataLabels: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15'],
                    data: [2, 164492, 164984, 165476, 165968, 166460, 166952, 167444, 167936, 168428, 168920, 169412, 169904, 170396, 170888],
                    backgroundColor: '#80B3E6',
                    labelBackgroundColor: '#80B3E6',
                    tooltipsEnabled: false
                },
                {
                    label: 'Cost of Sales',
                    dataLabels: ['\nA1', '\nA2', '\nA3', '\nA4', '\nA5', '\nA6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15'],
                    data: [2, 84252, 84504, 84756, 85008, 85260, 85512, 85764, 86016, 86268, 86520, 86772, 87024, 87276, 87528],
                    backgroundColor: '#0066CC',
                    labelBackgroundColor: '#0066CC',
                },
                {
                    label: 'Gross Profit',
                    data: [2, 110330, 110660, 110990, 111320, 111650, 111980, 112310, 112640, 112970, 113300, 113630, 113960, 114290, 114620],
                    backgroundColor: '#E40046',
                    labelBackgroundColor: '#E40046',
                },
                {
                    label: 'Research & Development',
                    type: 'line',
                    lineTension: 0.1,
                    data: [40000, 40120, 40240, 40360, 40480, 40600, 40720, 40840, 40960, 41080, 41200, 41320, 41440, 41560, 41680],
                    backgroundColor: '#ED8B00',
                    borderColor: '#ED8B00',
                    labelBackgroundColor: '#ED8B00',
                },
                {
                    label: 'Selling, General & Admin',
                    data: [164000, 164492, 164984, 165476, 165968, 166460, 0, 0, 0, 168428, 168920, 169412, 169904, 170396, 170888],
                    backgroundColor: '#A05EB5',
                    labelBackgroundColor: '#A05EB5',
                },
                {
                    label: 'Other op (Income) & Exp',
                    data: [84000, 84252, 84504, 84756, 85008, 85260, 0, 0, 0, 86268, 86520, 86772, 87024, 87276, 87528],
                    backgroundColor: '#B1B3B3',
                    labelBackgroundColor: '#B1B3B3',
                },
                {
                    label: 'Operating Profit',
                    data: [110000, 110330, 110660, 110990, 111320, 111650, 0, 0, 0, 112970, 113300, 113630, 113960, 114290, 114620],
                    backgroundColor: '#1DCE8C',
                    labelBackgroundColor: '#1DCE8C',
                },
                {
                    label: 'Market Share',
                    type: 'line',
                    lineTension: 0.1,
                    arrowMarginTop: '40%',
                    data: [40000, 40120, 40240, 40360, 40480, 40600, 40720, 20840, 40960, 41080, 41200, 41320, 41440, 41560, 41680],
                    backgroundColor: '#00965E',
                    borderColor: '#00965E',
                    labelBackgroundColor: '#00965E',
                }
            ]

        }
    }

    getDemoData2() {
        return {
            labels: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032],
            arrows: [
                {label: 'CAGR 16%', arrowLength: 0.985, labelAlign: 'bottom', labelAnchor: 'start', labelOffset: 10},
                {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}, {label: '- 3%'}, {label: '2%'}
            ],
            datasets: [
                {
                    type: 'line',
                    label: 'Sales',
                    data: [890.000, 890.570, 891.140, 891.710, 892.280, 892.850, 893.420, 893.990, 894.560, 895.130, 895.700, 896.270, 896.840, 897.410, 897.980],
                    backgroundColor: 'red',
                    borderColor: 'red',
                    parsing: true,
                    labelVisible: true,
                    borderDash: [5, 5],
                    tooltipsEnabled: false
                    //order: 1,
                    //stack: 'stackId',
                    //clip: {left: 105, top: false, right: -200, bottom: -20},
                    //hidden: false,
                },
                {
                    label: 'Other revenue',
                    data: [164.000, 164.492, 164.984, 165.476, 165.968, 166.460, 166.952, 167.444, 167.936, 168.428, 168.920, 169.412, 169.904, 170.396, 170.888],
                    backgroundColor: 'blue',
                    tooltipsEnabled: false
                },
                {
                    label: 'Cost of Sales',
                    data: [84.000, 84.252, 84.504, 84.756, 85.008, 85.260, 85.512, 85.764, 86.016, 86.268, 86.520, 86.772, 87.024, 87.276, 87.528],
                    backgroundColor: 'green',
                },
                {
                    label: 'Gross Profit',
                    data: [110.000, 110.330, 110.660, 110.990, 111.320, 111.650, 111.980, 112.310, 112.640, 112.970, 113.300, 113.630, 113.960, 114.290, 114.620],
                    backgroundColor: 'gray',
                },
                {
                    label: 'Research & Development',
                    data: [40.000, 40.120, 40.240, 40.360, 40.480, 40.600, 40.720, 40.840, 40.960, 41.080, 41.200, 41.320, 41.440, 41.560, 41.680],
                    backgroundColor: 'orange',
                },
                {
                    label: 'Selling, General & Admin.',
                    data: [164.000, 164.492, 164.984, 165.476, 165.968, 166.460, 166.952, 167.444, 167.936, 168.428, 168.920, 169.412, 169.904, 170.396, 170.888],
                    backgroundColor: 'purple',
                },
                {
                    label: 'Other op. (Income) & Exp.',
                    data: [84.000, 84.252, 84.504, 84.756, 85.008, 85.260, 85.512, 85.764, 86.016, 86.268, 86.520, 86.772, 87.024, 87.276, 87.528],
                    backgroundColor: 'pink',
                },
                {
                    label: 'Operating Profit',
                    data: [110.000, 110.330, 110.660, 110.990, 111.320, 111.650, 111.980, 112.310, 112.640, 112.970, 113.300, 113.630, 113.960, 114.290, 114.620],
                    backgroundColor: 'brown',
                },
                {
                    label: 'Market Share',
                    data: [40.000, 40.120, 40.240, 40.360, 40.480, 40.600, 40.720, 40.840, 40.960, 41.080, 41.200, 41.320, 41.440, 41.560, 41.680],
                    backgroundColor: 'yellow'
                }
            ]
        }
    }
}