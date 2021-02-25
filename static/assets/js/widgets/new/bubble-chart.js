/* global app, Widget */

'use strict';
class BubbleChartWidget extends Widget {

    getHtml(widgets, d) {
        const dataset = {data: [[6144, 2616, 2760.8394444444443, 3503.45688888889, 6141.246444444446, 7118.31577777778, 9414.003044444447, 8804.068604444448]], label: ["Net Income"], title: ["Total revenues and EBIT"], subtitle: ["USD millions"], max: [50000], min: [0], xlabel: []};

        BubbleChartWidget.bubbleCharts = {};

        this.value = {
            dataset: dataset,
            color: this.getRealValue('color', d, '#ba68c8'),
            bubbleWidth: this.getRealValue('bubbleWidth', d),
            bubbleWidthRatio: this.getRealValue('bubbleWidthRatio', d),
            width: this.getRealValue('width', d)
        };

        return `
<div class="ks-chart-holder" style="${this.getGeneralStyles(d).join('')}">
    <div class="ks-chart-widget ChartBlockSubTitle"></div>
    <div class="ks-chart-widget"></div>
</div>`;
    }

    initEventHandlers(section) {
        const h = [], v = this.value, d = v.dataset, data = d.data[0], len = data.length, color = v.color, divs = section.children().children(), width = v.width;
        const bubbleWidth = v.bubbleWidth || width / len, bubbleWidthRatio = v.bubbleWidthRatio || 100 / len, maxVal = Math.max(...data);

        let size, val;

        divs.eq(0).html(d.title[0] + ' <span>' + d.subtitle[0] + '<\/span>');

        for (val of data) {
            size = Math.round(val / maxVal * bubbleWidth);
            h.push('<div class="VerticalChartCircle" style="width: ', bubbleWidthRatio, '%;">');
            h.push('<div style="background-color:', color, '; height: ', size, 'px; width: ', size, 'px;"><\/div>');
            h.push('<div style="color: #000000;font-size: 10px;font-weight: bold;margin-top:35px;">', app.utils.formatIntForChart(Math.round(val)), '<\/div><\/div>');
        }

        divs.eq(1).html(h.join(''));
    }
}
;