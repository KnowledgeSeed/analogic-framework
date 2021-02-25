/* global app, Widget */

'use strict';
class VerticalBarChartWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;
        this.state = {data: data};
        let h = this.getLabels(o.datasets, data[2]);
        let w = o.width ? Math.round((o.width / 100) * 12) : 6;
        let offset = o.offset ? Math.round((o.offset / 100) * 12) : 3;
        return `
<div class="row">
    <div class="col">
        <div class="widget-financial-block">
            ${app.fn.getZoomButtonsHtml(this)}
            <div class="widget-col-chart-info-holder clear">
                ${h}
            </div>
            <div class="row">
                <div class="col-${w} offset-${offset}">
                    <div class="widget-col-chart-holder widget-financial-data-chart">
                        <canvas id="${o.id}Canvas"></canvas>
                        <div class="widget-financial-data-chart-legend"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        const canvas = $('#' + this.options.id + 'Canvas');

        const ctx = canvas[0].getContext('2d');
        const c = new Chart(ctx, VerticalBarChartWidget.getChartConfig(this.options, this.state.data));

        canvas.next().html(c.generateLegend()).on('click', 'span', e => {
            let legend = $(e.target), id = legend.data('id');

            c.getDatasetMeta(id).hidden = !c.getDatasetMeta(id).hidden;

            c.update();
        });

        this.initShowInFullScreenEventHandler(section, this.options);
    }

    initShowInFullScreenEventHandler(section, o) {
        section.find('.icon-full-screen').on('click', e => {
            app.fn.showInFullScreen(o.title, '').promise().done(() => {
                const chartDiv = section.find('.widget-financial-data-chart'), parentDiv = chartDiv.parent();

                $('#fullScreenContent').append(chartDiv.wrap('<div style="position: relative; width: 70%; left: 15%;"><\/div>').parent());

                $('#fullScreenOffBtn').on('click', () => {
                    parentDiv.append(chartDiv);
                });
            });

            return false;
        });
    }

    static getChartConfig(config, data) {
        let yAxis = config.displayYaxis ? config.displayYaxis : false, xAxis = config.displayXaxis ? config.displayXaxis : true;
        for(let f = 0; f < config.datasets.length; ++f){
            if(config.datasets[f].data){
                config.datasets[f].data = [];
            }
        }
        let datasets = config.datasets, d = data[1], i, j, labels = data[0].map(item => {
            return window.parseInt(item.label);
        }), s;
        for (j = 0; j < d.length; ++j) {
            for (i = 0; i < datasets.length; ++i) {
                if (!datasets[i].data) {
                    datasets[i].data = [];
                }
                s = d[j][i].value === '' ? '0' : app.utils.parseNumber(d[j][i].value);
                datasets[i].data.push(s);
                datasets[i].label = data[2][i].label;
            }
        }
        let chartConfig = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                            display: xAxis,
                            stacked: true,
                            maxBarThickness: 40,
                            barThickness: 30,
                            gridLines: {
                                display: false,
                                drawBorder: true,
                                color: '#A6A7A7'
                            },
                            ticks: {
                                beginAtZero: false,
                                fontSize: 10,
                                fontFamily: 'imago, sans-serif',
                                fontStyle: 'bold',
                                fontColor: '#858686',
                                padding: 30
                            }
                        }],
                    yAxes: [{
                            display: yAxis,
                            stacked: true,
                            gridLines: {
                                display: false,
                                color: '#A6A7A7',
                                drawBorder: true
                            },
                            ticks: {
                                beginAtZero: false,
                                fontSize: 10,
                                fontFamily: 'imago, sans-serif',
                                fontStyle: 'bold',
                                fontColor: '#000'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '',
                                fontSize: 14,
                                fontFamily: 'imago, sans-serif',
                                fontColor: '#A6A7A7',
                                padding: 0
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
                hover: {
                    animationDuration: 1
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                                ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.fillStyle = "rgba(0, 0, 0, 1)";
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                if (Math.abs(data) > 0) {
                                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                }

                            });
                        });
                    }
                },
                title: {
                    display: true
                },
                legend: {
                    display: false
                },
                legendCallback: (chart) => {
                    return "";
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
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
        if(config.hideUpperDataText && config.hideUpperDataText === true){
            chartConfig.options.animation = {};
        }
        return chartConfig;
    }

    getLabels(colors, data) {
        let h = [], i;
        for (i = 0; i < data.length; ++i) {
            h.push(` <div class="widget-col-chart-info">
                    <h4>${data[i].label}</h4>
                    <h5 ${ i < colors.length ? `style="color: ${colors[i].backgroundColor};"` : ''}>${data[i].value}</h5>
                </div>`);
        }
        return h.join('');
    }
}
;