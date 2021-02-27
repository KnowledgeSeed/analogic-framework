/* global app, Utils, Widget, WidgetValue */

'use strict';
class WaterFallWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const dataset1Config = o.dataset1 || {datapoints: []}, dataset2Config = o.dataset2 || {datapoints: []};

        //const demoDataSet1 = {legendLabel: 'Dataset One', legendColor: 'pink', datapoints: [{value: 9.06}, {value: -0.06}, {value: 0.5}, {value: 0}, {value: 9.5}, {value: 9.06}, {value: -0.06}, {value: 0.5}, {value: 0}, {value: 9.5}, {value: 9.06}, {value: -0.06}, {value: 0.5}, {value: 0}, {value: 9.5}, {value: 9.5}]};
        //const demoDataSet2 = {legendLabel: 'Dataset One', legendColor: 'red', datapoints: [{value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}, {value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}, {value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}, {value: 4.5}]};

        const v = {
            id: o.id,
            dataset1: $.extend(true, {}, dataset1Config, d.dataset1),
            dataset2: $.extend(true, {}, dataset2Config, d.dataset2),
            xAxisLabels: this.getRealValue('xAxisLabels', d, [{value: 'FC 0/12'}, {value: 'Headcount Effect BAU'}, {value: 'Shared Service Centers'}, {value: 'Supplements'}, {value: 'Sales bonus'}, {value: 'Other sustainable'}, {value: 'IFRS Sales bonus'}, {value: 'Accural reversal'}, {value: 'Tax and contr. difference'}, {value: 'Wage increase difference'}, {value: 'Unused holidays'}, {value: 'Bonus over/under perfm.'}, {value: 'LTI, RPI'}, {value: 'Reorg. effect'}, {value: 'Transfer non-TWM'}, {value: 'YTD Aug actual'}]),
            labelVisible: this.getRealValue('labelVisible', d, true),
            legendVisible: this.getRealValue('legendVisible', d, true),
            minYAxis: parseFloat(this.getRealValue('minYAxis', d, -10)),
            maxYAxis: parseFloat(this.getRealValue('maxYAxis', d, 100)),
            yAxisGridLineNum: parseInt(this.getRealValue('yAxisGridLineNum', d, 11)),
            height: parseFloat(Utils.getSize(this.getRealValue('height', d, 300), false, 'height')),
            defaultColor: this.getRealValue('defaultColor', d, '#F3F4F6'),
            skin: this.getRealValue('skin', d, 'attila-1')
        };

        this.value = v;

        return `
<div style="${this.getGeneralStyles(d).join('')}">
    <div class="ks-waterfall">
        <div class="ks-waterfall-inner">
            <div class="ks-waterfall-y-holder">
                <div class="ks-waterfall-y-title ks-left"></div>
                <div class="ks-waterfall-y-title ks-right"></div>
                <div class="ks-waterfall-y-line-holder"></div>
            </div>
            <div class="ks-waterfall-x-holder">
                <div class="ks-waterfall-x-title"></div>
                <div class="ks-waterfall-x-content-holder"></div>
            </div>
        </div>
    </div>
    <div class="ks-legend ks-legend-${v.skin}" ${v.legendVisible ? '' : 'style="display: none;"'}><div class="ks-legend-inner"></div></div>
</div>`;
    }

    initEventHandlers(section) {
        const v = this.value, min = v.minYAxis, max = v.maxYAxis, yAxisRange = max - min, yAxisStep = yAxisRange / v.yAxisGridLineNum, defaultColor = v.defaultColor, labels = v.xAxisLabels;
        const yAxisHtml = [], h = [], dataset1 = v.dataset1, datapoints1 = dataset1.datapoints, dataset2 = v.dataset2, datapoints2 = dataset2.datapoints, len = datapoints1.length;
        const chartDiv = section.find('.ks-waterfall'), chartHeight = chartDiv.height(), zeroHeight = (-min / yAxisRange) * chartHeight, labelVisible = v.labelVisible;
        let i, j = max, d, label, isLastCol, hb, lastHeights = [zeroHeight, zeroHeight], val;

        for (i = 0; i <= v.yAxisGridLineNum; ++i) {
            yAxisHtml.push('<div class="ks-waterfall-y-line ks-primary"><div class="ks-waterfall-y-line-tick ks-left"><\/div><div class="ks-waterfall-y-line-label ks-left">', Utils.precisionRound(j, 1), '<\/div><div class="ks-waterfall-y-line-tick ks-right"><\/div><div class="ks-waterfall-y-line-label ks-right"><\/div><\/div>');

            j -= yAxisStep;
        }

        for (i = 0; i < len; ++i) {
            d = datapoints1[i];
            label = labels[i];

            isLastCol = (len - 1 === i);

            if (isLastCol) {
                lastHeights = [zeroHeight, zeroHeight];
            }

            val = Utils.parseNumber(d.value);

            hb = this.calculateHeightAndBottom(val, yAxisRange, chartHeight, lastHeights, 0);

            this.addSecondaryHtml(h);

            h.push('<div class="ks-waterfall-bar-group"><div class="ks-waterfall-bar-group-content">');

            this.addBarHtml(h, d, val, hb[0], hb[1], labelVisible);

            h.push('<div class="ks-waterfall-x-line ks-primary"><div class="ks-waterfall-x-line-tick"><\/div><div class="ks-waterfall-x-line-label">', label.value, '<div class="ks-waterfall-x-line-icon', (label.comment ? '' : ' off'), '"><\/div><\/div><\/div>');

            d = datapoints2[i];

            if (d) {
                val = Utils.parseNumber(d.value);

                hb = this.calculateHeightAndBottom(val, yAxisRange, chartHeight, lastHeights, 1);

                this.addBarHtml(h, d, val, hb[0], hb[1], labelVisible);
            }

            h.push('<\/div><\/div>');
        }

        this.addSecondaryHtml(h);

        section.find('.ks-waterfall-y-line-holder').html(yAxisHtml.join(''));

        section.find('.ks-waterfall-x-content-holder').html(h.join('')).on('click', '.ks-waterfall-x-line-label', e => this.xAxisLabelClicked($(e.currentTarget)));

        if (v.legendVisible) {
            this.createLegend(chartDiv, [dataset1, dataset2]);
        }
    }

    calculateHeightAndBottom(value, yAxisRange, chartHeight, lastHeights, i) {
        let height = (Math.abs(value) / yAxisRange) * chartHeight, bottom, lastHeight = lastHeights[i];

        if (value > 0) {
            bottom = lastHeight;
            lastHeight = lastHeight + height;
        } else {
            bottom = lastHeight - height;
            lastHeight = bottom;
        }

        if (bottom >= chartHeight) {
            height = 0;
        } else if (bottom < 0) {
            height = Math.min(height + bottom, chartHeight);
            bottom = 0;
        } else if (bottom + height > chartHeight) {
            height -= bottom + height - chartHeight;
        }

        lastHeights[i] = lastHeight;

        return [height, bottom];
    }

    addBarHtml(h, d, value, height, bottom, labelVisible) {
        const color = d[value > 0 ? 'positiveColor' : 'negativeColor'] || this.value.defaultColor;

        h.push('<div class="ks-waterfall-bar" style="background-color:', color, '; height: ', height, 'px; bottom: ', bottom, 'px;"><div', (labelVisible ? '' : ' style="display: none;"'), ' class="ks-waterfall-bar-label">', d.value, '<\/div><\/div>');
    }

    addSecondaryHtml(h) {
        h.push('<div class="ks-waterfall-x-line ks-secondary"><div class="ks-waterfall-x-line-tick"></div><div class="ks-waterfall-x-line-label"><\/div><\/div>');
    }

    createLegend(chartDiv, datasets) {
        const legendDiv = chartDiv.next().children('.ks-legend-inner'), h = [], bars = chartDiv.find('.ks-waterfall-bar'), childIndexes = [1, 3];
        let b, c, d;

        for (d of datasets) {
            c = d.legendColor;
            b = 'background-color: ' + c + ';';

            h.push('<div class="ks-legend-item"><div class="ks-legend-item-inner"><div class="ks-legend-icon" style="border-color: ', c, ';', b, '"><\/div><div class="ks-legend-label" style="background-color: ', c, ';">', d.legendLabel, '<\/div><\/div><\/div>');
        }

        legendDiv.html(h.join('')).on('click', '.ks-legend-item', e => bars.filter(':nth-child(' + childIndexes[$(e.currentTarget).toggleClass('off').index()] + ')').toggle());
    }

    xAxisLabelClicked(e) {
        const id = this.value.id, data = {id: id};

        if (e.children().hasClass('off')) {
            data.action = 'commentEdit';
            data.label = e.text();
        } else {
            data.action = 'commentShow';
        }

        delete WidgetValue[id][data.action];

        Widget.doHandleSystemEvent(e.data(data));

        data.action = 'selectLabel';

        delete WidgetValue[id][data.action];

        data.label = e.text();

        Widget.doHandleSystemEvent(e.data(data));

        return false;
    }

    processData(data) {
        let d = data[0];

        d.dataset1 = {datapoints: data.length > 1 ? data[1][0] || [] : []}; //matrix!!
        d.dataset2 = {datapoints: data.length > 2 ? data[2][0] || [] : []}; //matrix!!

        return d;
    }
}
;