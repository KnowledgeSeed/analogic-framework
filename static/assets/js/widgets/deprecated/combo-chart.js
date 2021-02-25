/* global app, Widget */
'use strict';
class OldComboChartWidget extends Widget {
    getHtml(widgets, data) {
        const o = this.options;
        this.state = {data: data};
        let w = o.width ? o.width : 425;
        let h = o.height ? o.height : 400;
        return `
<div class="row">
    <div class="col">
        <div class="widget-financial-block">
           ${app.fn.getZoomButtonsHtml(this)}
            <div class="widget-financial-data-table" style="width:${w}px;">
                <h3>${o.title}</h3>
                <div class="widget-financial-data-chart">
                    <canvas id="${o.id}Canvas" width="${w}" height="${h}"></canvas>
                    <div class="widget-financial-data-chart-legend"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        const canvas = $('#' + this.options.id + 'Canvas');
        const ctx = canvas[0].getContext('2d');
        const c = new Chart(ctx, OldComboChartWidget.getChartConfig(this.options, this.state.data));
        canvas.next().html(c.generateLegend()).on('click', 'span', e => {
            let legend = $(e.target), id = legend.data('id');
            c.getDatasetMeta(id).hidden = !c.getDatasetMeta(id).hidden;
            c.update();
        });
        this.initShowInFullScreenEventHandler(section, this.options);
    }
    initShowInFullScreenEventHandler(section, o) {
        $('#' + o.id + 'FullScreenBtn').on('click', () => {
            app.fn.showInFullScreen(o.title, '').promise().done(() => {
                const chartDiv = section.find('.widget-financial-data-chart'), prevChartDiv = chartDiv.prev();
                $('#fullScreenContent').append(chartDiv.wrap('<div style="position: relative; width: 70%; left: 15%;"><\/div>').parent());
                $('#fullScreenOffBtn').on('click', () => {
                    prevChartDiv.after(chartDiv);
                });
            });
            return false;
        });
    }
    static getChartConfig(config, data) {
        let yAxisStacked = config.yAxisStacked ? config.yAxisStacked : false, xAxisStacked = config.xAxisStacked ? config.xAxisStacked : true;
        for (let f = 0; f < config.datasets.length; ++f) {
            if (config.datasets[f].data) {
                config.datasets[f].data = [];
            }
        }
        let datasets = config.datasets, d = data[1], i, j, labels = data[0].map(item => {
            return item.label;
        }), min = 0, s;
        for (j = 0; j < d.length; ++j) {
            for (i = 0; i < datasets.length; ++i) {
                if (!datasets[i].data) {
                    datasets[i].data = [];
                }
                s = d[j][i].value === '' ? '0' : app.utils.parseNumber(d[j][i].value);
                if (s < min) {
                    min = s;
                }
                datasets[i].data.push(s);
            }
        }
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                            display: typeof config.xAxesDisplay === 'undefined' ? true : config.xAxesDisplay,
                            stacked: xAxisStacked,
                            gridLines: {
                                display: typeof config.xAxesGridLinesDisplay === 'undefined' ? false : config.xAxesGridLinesDisplay,
                                drawBorder: typeof config.xAxesGridLinesDrawBorder === 'undefined' ? true : config.xAxesGridLinesDrawBorder,
                                color: config.xAxesGridLinesColor ? config.xAxesGridLinesColor : '#A6A7A7'
                            },
                            //maxBarThickness: 10,
                            ticks: {
                                beginAtZero: typeof config.xAxesTicksBegintAtZero === 'undefined' ? false : config.xAxesTicksBegintAtZero,
                                fontSize: config.xAxesTicksFontSize ? config.xAxesTicksFontSize : 10,
                                fontFamily: config.xAxesTicksFontFamily ? config.xAxesTicksFontFamily : 'imago, sans-serif',
                                fontStyle: config.xAxesTicksFontStyle ? config.xAxesTicksFontStyle : 'bold',
                                fontColor: config.xAxesTicksFontColor ? config.xAxesTicksFontColor : '#000',
                                // padding: -140
                            }
                        }],
                    yAxes: [{
                            display: typeof config.yAxesDisplay === 'undefined' ? true : config.yAxesDisplay,
                            stacked: yAxisStacked,
                            gridLines: {
                                display: typeof config.yAxesGridLinesDisplay === 'undefined' ? false : config.yAxesGridLinesDisplay,
                                color: config.yAxesGridLinesColor ? config.yAxesGridLinesColor : '#A6A7A7',
                                drawBorder: typeof config.yAxesGridLinesDisplay === 'undefined' ? true : config.yAxesGridLinesDisplay,
                            },
                            ticks: {
//                                min: min,
//                                suggestedMin: min,
                                beginAtZero: typeof config.yAxesTicksBegintAtZero === 'undefined' ? false : config.yAxesTicksBegintAtZero,
                                fontSize: config.yAxesTicksFontSize ? config.yAxesTicksFontSize : 10,
                                fontFamily: config.yAxesTicksFontFamily ? config.yAxesTicksFontFamily : 'imago, sans-serif',
                                fontStyle: config.yAxesTicksFontStyle ? config.yAxesTicksFontStyle : 'bold',
                                fontColor: config.yAxesTicksFontColor ? config.yAxesTicksFontColor : '#000'
                            },
                            scaleLabel: {
                                display: typeof config.yAxesScaleLabelDisplay === 'undefined' ? true : config.yAxesScaleLabelDisplay,
                                labelString: config.yAxisLabel,
                                fontSize: config.yAxesScaleLabelFontSize ? config.yAxesScaleLabelFontSize : 14,
                                fontFamily: config.yAxesScaleLabelFontFamily ? config.yAxesScaleLabelFontFamily : 'imago, sans-serif',
                                fontColor: config.yAxesScaleLabelFontColor ? config.yAxesScaleLabelFontColor : '#A6A7A7',
                                padding: config.yAxesScaleLabelPadding ? config.yAxesScaleLabelPadding : 0
                            }
                        }]
                },
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                title: {
                    display: true
                },
                legend: {
                    display: false
                },
                legendCallback: (chart) => {
                    let text = [], i;
                    for (i = chart.data.datasets.length - 1; i >= 0; --i) {
                        text.push('<span data-id="' + i + '" style="color: ' + chart.data.datasets[i].backgroundColor + ';">' + chart.data.datasets[i].label + '<\/span>');
                    }
                    return text.join("");
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                elements: {
                    line: {
                        tension: 0
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
                bezierCurve: false
            }
        };
    }
}
;