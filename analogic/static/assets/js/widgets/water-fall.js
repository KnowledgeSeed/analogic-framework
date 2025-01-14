/* global app, Utils, Widget, Widgets */

'use strict';

class WaterFallWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const dataset1Config = o.dataset1 || {datapoints: []}, dataset2Config = o.dataset2 || {datapoints: []};

        //Simple Demo With 2 Datasets:
        //const dataset1 = {legendLabel: 'Dataset One', legendColor: 'pink', datapoints: [{value: 9.06, positiveColor: 'green', negativeColor: 'red'}, {value: -3.06, positiveColor: 'green', negativeColor: 'red'}, {value: 0.5, positiveColor: 'green', negativeColor: 'red'}, {value: 0, positiveColor: 'green', negativeColor: 'red'}, {value: 9.5, positiveColor: 'green', negativeColor: 'red'}, {value: 9.06, positiveColor: 'green', negativeColor: 'red'}, {value: -0.06, positiveColor: 'green', negativeColor: 'red'}, {value: 0.5, positiveColor: 'green', negativeColor: 'red'}, {value: 0, positiveColor: 'green', negativeColor: 'red'}, {value: 9.5, positiveColor: 'green', negativeColor: 'red'}, {value: 9.06, positiveColor: 'green', negativeColor: 'red'}, {value: -0.06, positiveColor: 'green', negativeColor: 'red'}, {value: 0.5, positiveColor: 'green', negativeColor: 'red'}, {value: 0, positiveColor: 'green', negativeColor: 'red'}, {value: 9.5, positiveColor: 'green', negativeColor: 'red'}, {value: 9.5, positiveColor: 'green', negativeColor: 'red'}]};
        //const dataset2 = {legendLabel: 'Dataset Two', legendColor: 'red', datapoints: [{value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}, {value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}, {value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}, {value: 4.5}]};
        //const xAxisLabels = [{value: 'FC 0/12'}, {value: 'Headcount Effect BAU'}, {value: 'Shared Service Centers'}, {value: 'Supplements'}, {value: 'Sales bonus'}, {value: 'Other sustainable'}, {value: 'IFRS Sales bonus'}, {value: 'Accural reversal'}, {value: 'Tax and contr. difference'}, {value: 'Wage increase difference'}, {value: 'Unused holidays'}, {value: 'Bonus over/under perfm.'}, {value: 'LTI, RPI'}, {value: 'Reorg. effect'}, {value: 'Transfer non-TWM'}, {value: 'YTD Aug actual'}]

        //Demo With 2 Totals and Con Lines:
        //const dataset1 = {showConnectionLines: true, legendLabel: 'Dataset One', legendColor: 'pink', datapoints: [{value: 840000, positiveColor: 'green', negativeColor: 'red'}, {value: 760000, positiveColor: 'green', negativeColor: 'red'}, {value: -190000, positiveColor: 'green', negativeColor: 'red'}, {value: -210000, displayValue: 210000, positiveColor: 'green', negativeColor: 'red'}, {value: 1283000, isTotal: true, positiveColor: 'green', negativeColor: 'red'}, {value: 84000, displayValue: -84000, positiveColor: 'green', negativeColor: 'red'}, {value: -75000, displayValue: 75000, positiveColor: 'green', negativeColor: 'red'}, {value: -100000, displayValue: 100000, positiveColor: 'green', negativeColor: 'red'}, {value: 1016000, positiveColor: 'green', negativeColor: 'red'}]};
        //const xAxisLabels = [{value: 'Total Cost 2022'}, {value: 'Calculated Salary'}, {value: 'Bonus'}, {value: 'Auto Allowance'}, {value: 'Other Benefits'}, {value: 'Employer Contributions'}, {value: 'Social Security'}, {value: 'Pension Fund'}, {value: 'Health Insurance'}];

        const v = {
            id: o.id,
            dataset1: $.extend(true, {}, dataset1Config, d.dataset1),
            dataset2: $.extend(true, {}, dataset2Config, d.dataset2),
            xAxisLabels: this.getRealValue('xAxisLabels', d, []),
            xAxisFontSize: this.getRealValue('xAxisFontSize', d),
            labelFontSize: this.getRealValue('labelFontSize', d),
            labelVisible: this.getRealValue('labelVisible', d, true),
            legendVisible: this.getRealValue('legendVisible', d, true),
            minYAxis: parseFloat(this.getRealValue('minYAxis', d, -10)),
            maxYAxis: parseFloat(this.getRealValue('maxYAxis', d, 60)),
            yAxisGridLineNum: parseInt(this.getRealValue('yAxisGridLineNum', d, 11)),
            yAxisUnit: this.getRealValue('yAxisUnit', d, ''),
            yAxisDecimalNum: parseInt(this.getRealValue('yAxisDecimalNum', d, 2)),
            yAxisTicksPrecisionFixed: this.getRealValue('yAxisTicksPrecisionFixed', d, false),
            yAxisSeparatesThousands: this.getRealValue('yAxisSeparatesThousands', d, false),
            yAxisFontSize: this.getRealValue('yAxisFontSize', d),
            height: parseFloat(Utils.getSize(this.getRealValue('height', d, 300), false, 'height')),
            defaultColor: this.getRealValue('defaultColor', d, '#F3F4F6'),
            skin: this.getRealValue('skin', d, 'attila-1'),
            hiddenDatasets: [false, false],
            allowLastColumnToZero: this.getRealValue('allowLastColumnToZero', d, true)
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

    initEventHandlers() {
        const section = this.getSection();

        this.renderWaterFall(section);

        section
            .on('click', '.ks-waterfall-y-line-label', e => this.renderWaterFall(section, parseFloat(e.currentTarget.innerHTML)))
            .on('click', '.ks-waterfall-reset', () => this.renderWaterFall(section));
    }

    renderWaterFall(section, minYAxis) {
        const v = this.value, min = minYAxis || v.minYAxis, max = v.maxYAxis, yAxisRange = max - min, yAxisStep = yAxisRange / v.yAxisGridLineNum, labels = v.xAxisLabels;
        const yAxisHtml = [], h = [], dataset1 = v.dataset1, datapoints1 = dataset1.datapoints, dataset2 = v.dataset2, datapoints2 = dataset2.datapoints, len = datapoints1.length;
        const chartDiv = section.find('.ks-waterfall'), chartHeight = chartDiv.height(), zeroHeight = (-min / yAxisRange) * chartHeight, labelVisible = v.labelVisible;
        const resetBtnVisibility = (minYAxis && (minYAxis !== v.minYAxis)) ? '' : ' style="display: none;"';
        let i, j = max, d, label, isLastCol, hb, lastHeights = [zeroHeight, zeroHeight], val;

        for (i = 0; i < v.yAxisGridLineNum; ++i) {
            val = Utils.precisionRound(j, v.yAxisDecimalNum, v.yAxisTicksPrecisionFixed);

            yAxisHtml.push('<div class="ks-waterfall-y-line ks-primary"><div class="ks-waterfall-y-line-tick ks-left"></div><div', v.yAxisFontSize ? (' style="font-size:' + v.yAxisFontSize + 'px;"') : '', ' class="ks-waterfall-y-line-label ks-left">', v.yAxisSeparatesThousands ? Utils.separatesThousands(val) : val, v.yAxisUnit, '</div><div class="ks-waterfall-y-line-tick ks-right"></div><div class="ks-waterfall-y-line-label ks-right"></div></div>');

            j -= yAxisStep;
        }

        val = Utils.precisionRound(min, v.yAxisDecimalNum, v.yAxisTicksPrecisionFixed);

        yAxisHtml.push('<div class="ks-waterfall-y-line ks-axis"><div class="ks-waterfall-y-line-tick ks-left"></div><div', v.yAxisFontSize ? (' style="font-size:' + v.yAxisFontSize + 'px;"') : '', ' class="ks-waterfall-y-line-label ks-left ks-waterfall-label-origo">' + (v.yAxisSeparatesThousands ? Utils.separatesThousands(val) : val) + v.yAxisUnit + '</div><div class="ks-waterfall-y-line-tick ks-right"></div><div class="ks-waterfall-y-line-label ks-right"></div><div class="ks-waterfall-reset"' + resetBtnVisibility + '><span class="">i</span> Reset</div></div>');

        for (i = 0; i < len; ++i) {
            d = datapoints1[i];
            label = labels[i];

            isLastCol = (len - 1 === i);

            if (v.allowLastColumnToZero && (isLastCol || d.isTotal)) {
                lastHeights = [zeroHeight, zeroHeight];
            }

            val = Utils.parseNumber(d.value);

            hb = this.calculateHeightAndBottom(val, d, yAxisRange, min, chartHeight, lastHeights, 0);

            this.addSecondaryHtml(h);

            h.push('<div class="ks-waterfall-bar-group"><div class="ks-waterfall-bar-group-content">');

            this.addBarHtml(h, d, val, hb[0], hb[1], labelVisible, v.hiddenDatasets[0], isLastCol, dataset1.showConnectionLines);

            h.push('<div class="ks-waterfall-x-line ks-primary"><div class="ks-waterfall-x-line-tick"></div><div', v.xAxisFontSize ? (' style="font-size:' + v.xAxisFontSize + 'px;"') : '', ' class="ks-waterfall-x-line-label">', label.value, '<div class="ks-waterfall-x-line-icon', (label.comment ? '' : ' off'), '"></div></div></div>');

            d = datapoints2[i];

            if (d) {
                val = Utils.parseNumber(d.value);

                hb = this.calculateHeightAndBottom(val, d, yAxisRange, min, chartHeight, lastHeights, 1);

                this.addBarHtml(h, d, val, hb[0], hb[1], labelVisible, v.hiddenDatasets[1], isLastCol, dataset1.showConnectionLines);
            }

            h.push('</div></div>');
        }

        this.addSecondaryHtml(h);

        section.find('.ks-waterfall-y-line-holder').html(yAxisHtml.join(''));

        section.find('.ks-waterfall-x-content-holder').html(h.join('')).on('click', '.ks-waterfall-x-line-label', e => this.xAxisLabelClicked($(e.currentTarget)));

        if (v.legendVisible) {
            this.createLegend(chartDiv, [dataset1, dataset2]);
        }
    }

    calculateHeightAndBottom(value, d, yAxisRange, minYAxis, chartHeight, lastHeights, i) {
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


        let min = Utils.parseNumber(d.min), forceBottom;

        if (!isNaN(min)) {
            forceBottom = ((Math.max(min, minYAxis) - minYAxis) / yAxisRange) * chartHeight;
            height += bottom - forceBottom;
            bottom = forceBottom;
        }

        return [height, bottom];
    }

    addBarHtml(h, d, val, height, bottom, labelVisible, isHidden, isLastCol, showConnectionLines) {
        const v = this.value, color = d[val > 0 ? 'positiveColor' : 'negativeColor'] || v.defaultColor, s = 'background-color:' + color + ';' + (isHidden ? ' display:none;' : '');
        const c = (showConnectionLines && !isLastCol) ? ('<div style="' + s + '" class="ks-waterfall-con-line-' + (val > 0 ? 'top' : 'bottom') + '"></div>') : '';

        let l = '';

        if (labelVisible) {
            if (undefined === d.displayValue) {
                val = Utils.precisionRound(val, v.yAxisDecimalNum, v.yAxisTicksPrecisionFixed);

                val = (v.yAxisSeparatesThousands ? Utils.separatesThousands(val) : val) + v.yAxisUnit;
            } else {
                val = d.displayValue;
            }

            l = '<div' + (v.labelFontSize ? (' style="font-size:' + v.labelFontSize + 'px;"') : '') +' class="ks-waterfall-bar-label">' + val + '</div>';
        }

        h.push('<div class="ks-waterfall-bar" style="', s, ' height: ', height, 'px; bottom: ', bottom, 'px;">', l, c, '</div>');
    }

    addSecondaryHtml(h) {
        h.push('<div class="ks-waterfall-x-line ks-secondary"><div class="ks-waterfall-x-line-tick"></div><div class="ks-waterfall-x-line-label"></div></div>');
    }

    createLegend(chartDiv, datasets) {
        const legendDiv = chartDiv.next().children('.ks-legend-inner'), h = [], bars = chartDiv.find('.ks-waterfall-bar');
        let b, c, d;

        for (d of datasets) {
            c = d.legendColor;
            b = 'background-color: ' + c + ';';

            h.push('<div class="ks-legend-item"><div class="ks-legend-item-inner"><div class="ks-legend-icon" style="border-color: ', c, ';', b, '"></div><div class="ks-legend-label" style="background-color: ', c, ';">', d.legendLabel, '</div></div></div>');
        }

        legendDiv.html(h.join('')).on('click', '.ks-legend-item', e => this.legendClicked(e, bars));
    }

    legendClicked(e, bars) {
        const childIndexes = [1, 3], id = $(e.currentTarget).toggleClass('off').index();

        const isVis = bars.filter(':nth-child(' + childIndexes[id] + ')').toggle().is(':visible');

        this.value.hiddenDatasets[id] = !isVis;
    }

    xAxisLabelClicked(e) {
        const id = this.value.id, data = {id: id};

        if (e.children().hasClass('off')) {
            data.action = 'commentEdit';
            data.label = e.text();
        } else {
            data.action = 'commentShow';
        }

        delete Widgets[id][data.action];

        Widget.doHandleSystemEvent(e.data(data));

        data.action = 'selectLabel';

        delete Widgets[id][data.action];

        data.label = e.text();

        Widget.doHandleSystemEvent(e.data(data));

        return false;
    }

    processData(data) {
        if (!data) {
            return {};
        }

        let d = data[0];

        if (!d) {
            return data;
        }

        d.dataset1 = {datapoints: data.length > 1 ? data[1][0] || [] : []}; //matrix!!
        d.dataset2 = {datapoints: data.length > 2 ? data[2][0] || [] : []}; //matrix!!

        return d;
    }
}