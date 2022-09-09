/* global app */
'use strict';
class HorizontalBarChartWidget extends Widget {
    getHtml(widgets, data) {
        const o = this.options;

        let mainStyle = this.getGeneralStyles(data);

        const leftHtml = ['<div class="widget-financial-bottom-left"><h3 class="widget-financial-bottom-title">', o.column1Title, '<\/h3>'];
        const chartHtml = ['<div class="widget-financial-bottom-center"><h3 class="widget-financial-bottom-title">', o.column2Title, '<\/h3><div class="widget-financial-bottom-center-0">0<\/div>'];
        const rightHtml = ['<div class="widget-financial-bottom-right"><h3 class="widget-financial-bottom-title">', o.column3Title, '<\/h3><table><tr><th>', o.rightTableColumn1Title, '<\/th><th>', o.rightTableColumn2Title, '<\/th><\/tr>'];
        const maxAbsDelta = this.getMaxAbsDelta(data);

        let d, i;

        for (i = 0; i < data.length; ++i) {
            d = data[i][0];
            leftHtml.push('<div class="widget-financial-bottom-row-title ellipsis">', d.title, '<\/div>');
            chartHtml.push(this.getChartRowHtml(d.delta, maxAbsDelta));
            rightHtml.push('<tr><td class="ellipsis">', d.base, '<\/td><td class="ellipsis">', d.scenario, '<\/td><\/tr>');
        }

        leftHtml.push('<\/div>');
        chartHtml.push('<\/div>');
        rightHtml.push('<\/table><\/div>');

        return `
<div style="${mainStyle.join('')}" class="ks-horizontalbarchart widget-financial-block">
    <div class="widget-financial-bottom-sections clear">
        <div class="">${leftHtml.join('')}${rightHtml.join('')}${chartHtml.join('')}</div>
    </div>
</div>`;
    }

    getMaxAbsDelta(data) {
        let d, m, max = 0;

        for (d of data) {
            m = Math.abs(d[0].delta);
            if (m > max) {
                max = m;
            }
        }

        return max;
    }

    getChartRowHtml(delta, maxAbsDelta) {
        const width = Math.abs(delta) / maxAbsDelta * 50;

        return `
<div class="widget-financial-bottom-chart-row">
    <div class="widget-financial-bottom-chart-row-left" style="width: ${delta < 0 ? width : ''}%;"></div>
    <div class="widget-financial-bottom-chart-row-right" style="width: ${delta > 0 ? width : ''}%;"></div>
    <div class="widget-financial-bottom-chart-row-value value-left ellipsis">${delta < 0 ? delta : ''}</div>
    <div class="widget-financial-bottom-chart-row-value value-right ellipsis">${delta > 0 ? delta : ''}</div>
</div>`;
    }

    initEventHandlers() {
    }
}
;