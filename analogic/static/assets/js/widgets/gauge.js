/* global app, Chart, Doc, El, Utils */

'use strict';

class GaugeWidget extends Widget {

    getHtml(widgets, d) {
        const labelsHtml = [], valuesHtml = [], id = this.options.id;

        if (!d) {
            d = {
                values: [9.0, 9.1, 10],
                labels: ['Modelled', 'Plan', 'Target'],
                minRange: 0,
                maxRange: 14,
                title: 2020
            };
        }

        const v = {
            canvasId: id + 'Canvas',
            values: this.getRealValue('values', d),
            valueLabels: this.getRealValue('valueLabels', d, []),
            labels: this.getRealValue('labels', d),
            minRange: this.getRealValue('minRange', d),
            maxRange: this.getRealValue('maxRange', d),
            showAxisValues: this.getRealValue('showAxisValues', d, true),
            colors: this.getRealValue('colors', d),
            title: this.getRealValue('title', d, ''),
            fontFamily: this.getRealValue('fontFamily', d, 'imago'),
            skin: this.getRealValue('skin', d, 'standard'),
            separatesThousands: this.getRealValue('separatesThousands', d, false)
        };

        if (v.maxRange === 0) {
            v.maxRange = 200;
        }

        this.value = v;

        for (let i = 0; i < v.labels.length; ++i) {
            labelsHtml.push('<div class="ks-gauge-label">', v.labels[i], '<\/div>');
            valuesHtml.push('<div class="ks-gauge-label ks-gauge-value" style="color: ', v.colors[i], '">', v.valueLabels.length > i ? v.valueLabels[i] : v.values[i].toFixed(1), '<\/div>');
        }

        return `
<div class="ks-gauge ks-gauge-${v.skin}" style="${this.getGeneralStyles(d).join('')}">
    <div class="ks-gauge-inner">
        <div class="ks-gauge-title">
            <div class="ks-gauge-title-content">${v.title}</div>
            <div class="ks-gauge-title-border"></div>
        </div>
        <div class="ks-gauge-canvas"><canvas id="${v.canvasId}" data-widget_id="${id}" height="1" width="2"></canvas></div>
        <div class="ks-gauge-labels">
            <div class="ks-gauge-labels-col">${labelsHtml.join('')}</div>
            <div class="ks-gauge-labels-col">${valuesHtml.join('')}</div>
        </div>
    </div>
</div>`;
    }

    initEventHandlers() {
        const v = this.value, canvas = $('#' + v.canvasId), ctx = canvas[0].getContext('2d'),
            c = new Chart(ctx, this.getGaugeConfig());

        this.initShowInFullScreenEventHandler(v);
    }

    initShowInFullScreenEventHandler(v) {
        const section = this.getSection();

        $('#' + v.id + 'FullScreenBtn').on('click', () => {
            this.showInFullScreen(v.title, '').promise().done(() => {
                const chartDiv = section.find('.widget-financial-data-chart'), prevChartDiv = chartDiv.prev();

                $('#fullScreenContent').append(chartDiv.wrap('<div style="position: relative; width: 70%; left: 15%;"><\/div>').parent());

                $('#fullScreenOffBtn').on('click', () => prevChartDiv.after(chartDiv));
            });

            return false;
        });
    }

    showInFullScreen(headerName, content) {
        const s = Doc.scrollTop();

        El.visibleBodyChildren = El.body.children().filter(':visible').hide();

        return El.body.prepend('<div data-scrolltop="' + s + '" id="widgetFullscreen" class="widget-fullscreen"><header class="small-header"><div class="wrapper"><div class="row"><div class="col"><h1>' + headerName + '<\/h1><\/div><\/div><\/div><span id="fullScreenOffBtn" class="icon-full-screen-off"><\/span><\/header><div id="fullScreenContent" class="widget-fullscreen-content">' + content + '<\/div><\/div>');
    }

    getGaugeConfig() {
        const d = this.value, min = d.minRange, max = d.maxRange, values = d.values, datasets = [],
            colors = this.options.colors, len = max.toString().length;

        let i, v, p;

        for (i = 0; i < values.length; ++i) {
            v = values[i];

            if (v < min) {
                v = min;
            } else if (v > max) {
                v = max;
            }

            datasets.push({
                data: [v - min, max - v],
                backgroundColor: [colors[i], '#F3F4F6'],
                originalValue: values[i]
            });
        }

        if (len < 4) {
            p = 0;
        } else if (len < 5) {
            p = 30;
        } else if (len < 6) {
            p = 40;
        } else {
            p = 45;
        }

        return {
            type: 'gauge',
            separatesThousands: d.separatesThousands,
            data: {
                datasets: datasets,
                labels: []
            },
            options: {
                layout: {
                    padding: {
                        left: p,
                        right: p,
                        top: d.showAxisValues ? 15 : 0,
                        bottom: 5
                    }
                }
            }
        };
    }
}
;

Chart.defaults.gauge = Utils.clone(Chart.defaults.doughnut, true);

$.extend(Chart.defaults.gauge, {
    responsive: true,
    cutoutPercentage: 65,
    circumference: 3.19,
    rotation: 9.41,
    //  events: [],
    plugins: {
        datalabels: {
            display: false
        }
    },
    elements: {
        arc: {
            borderWidth: 1,
            borderColor: '#fff'
        }
    },
    animation: {
        animateScale: true,
        animateRotate: true
    },
    title: {
        display: false
    },
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].originalValue;
                return label;
            }
        }
    }
});

Chart.controllers.gauge = Chart.controllers.doughnut.extend({
    name: 'gauge',
    draw: function () {
        Chart.controllers.doughnut.prototype.draw.apply(this, arguments);

        const chart = this.chart, x = chart.ctx, chartData = Widgets[chart.canvas.dataset.widget_id].value;

        if (!chartData.showAxisValues) {
            return;
        }

        const min = chartData.minRange, max = chartData.maxRange, step = (max - min) / 5 === 0 ? 1 : (max - min) / 5,
            labels = [], separatesThousands = chart.config.separatesThousands;
        const maxLen = max.toString().length, widthOffset = 6 * (maxLen - 2);
        const width = chart.width - widthOffset, height = chart.height, fontSize = (height / 140);

        for (let i = min; i <= max + min; i += step) {
            labels.push(separatesThousands ? Utils.separatesThousands(Math.round(i)) : Math.round(i));
        }

        x.font = fontSize + 'em ' + chartData.fontFamily;
        x.fillStyle = '#737B86';
        x.textAlign = 'left';
        x.textBaseline = 'bottom';

        if (maxLen < 2) {
            x.fillText(labels[0], width * 0.05, height);
            x.fillText(labels[1], width * 0.13, height / 2.15);
            x.fillText(labels[2], width * 0.32, height * 0.16);
            x.fillText(labels[3], width * 0.61, height * 0.16);
            x.fillText(labels[4], width * 0.82, height / 2.15);
            x.fillText(labels[5], width * 0.90, height);
        } else if (maxLen < 3) {
            x.fillText(labels[0], width * 0.05, height);
            x.fillText(labels[1], width * 0.11, height / 2.15);
            x.fillText(labels[2], width * 0.32, height * 0.15);
            x.fillText(labels[3], width * 0.61, height * 0.15);
            x.fillText(labels[4], width * 0.84, height / 2.15);
            x.fillText(labels[5], width * 0.92, height);
        } else if (maxLen < 4) {
            x.fillText(labels[0], width * 0.05, height);
            x.fillText(labels[1], width * 0.09, height / 2.15);
            x.fillText(labels[2], width * 0.3, height * 0.15);
            x.fillText(labels[3], width * 0.63, height * 0.15);
            x.fillText(labels[4], width * 0.85, height / 2.15);
            x.fillText(labels[5], width * 0.94, height);
        } else if (maxLen < 5) {
            x.fillText(labels[0], width * 0.08, height);
            x.fillText(labels[1], width * 0.09, height / 2.15);
            x.fillText(labels[2], width * 0.3, height * 0.17);
            x.fillText(labels[3], width * 0.63, height * 0.17);
            x.fillText(labels[4], width * 0.85, height / 2.15);
            x.fillText(labels[5], width * 0.93, height);
        } else if (maxLen < 6) {
            x.fillText(labels[0], width * 0.13, height * 0.94);
            x.fillText(labels[1], width * 0.1, height / 2.15);
            x.fillText(labels[2], width * 0.3, height * 0.21);
            x.fillText(labels[3], width * 0.63, height * 0.21);
            x.fillText(labels[4], width * 0.835, height / 2.15);
            x.fillText(labels[5], width * 0.915, height * 0.94);
        } else {
            x.fillText(labels[0], width * 0.16, height * 0.91);
            x.fillText(labels[1], width * 0.1, height / 2.15);
            x.fillText(labels[2], width * 0.3, height * 0.23);
            x.fillText(labels[3], width * 0.63, height * 0.23);
            x.fillText(labels[4], width * 0.835, height / 2.15);
            x.fillText(labels[5], width * 0.917, height * 0.91);
        }
    }
});