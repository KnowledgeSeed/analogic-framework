/* global app, Utils */

'use strict';
class TornadoChartWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options, d = data, demo = [{leftValue: -19452.07, leftColor: '#ab47bc', rightValue: 30453.73, rightColor: '#e040fb', legendLabel: 'Legend 1'}, {leftValue: -2239.34, leftColor: '#1e66b5', rightValue: 5385.57, rightColor: '#007aff', legendLabel: 'Legend 2'}, {leftValue: -1373.56, leftColor: '#4e6f0e', rightValue: 5469.78, rightColor: '#6ba100', legendLabel: 'Legend 3'}, {leftValue: 339.74, leftColor: '#c7790c', rightValue: 5048.17, rightColor: '#ff9500', legendLabel: 'Legend 4'}, {leftValue: 2553.18, leftColor: '#2c90bd', rightValue: 4841.15, rightColor: '#40c4ff', legendLabel: 'Legend 5'}];

        const h = [], xMin = this.getRealValue('xMin', d, -30000), xMax = this.getRealValue('xMax', d, 50000), range = (xMax - xMin);

        const v = {
            dataset: $.extend(true, [], data.dataset || [], o.dataset || demo),
            xAxisLabel: this.getRealValue('xAxisLabel', d),
            baseValue: this.getRealValue('baseValue', d, 3500),
            legendVisible: this.getRealValue('legendVisible', d, true),
            skin: this.getRealValue('skin', d, 'attila-1'),
            xMin: xMin,
            range: range
        };

        this.value = v;

        let step = range / (this.getRealValue('gridLinesNum', d, 9) - 1);
        step = step === 0 ? 1 : step;

        for (let i = xMin; i <= xMax + 1; i += step) {
            h.push('<div class="ks-tornado-x-line"><div class="ks-tornado-x-line-label">', Utils.precisionRound(i, 1), '<\/div><\/div>');
        }

        return `
<div class="ks-tornado-outer ks-tornado-outer-${v.skin}" style="${this.getGeneralStyles(d).join('')}">
    <div class="ks-tornado ks-tornado-${v.skin}">
        <div class="ks-tornado-inner">
            <div class="ks-tornado-x-holder">
                <div class="ks-tornado-content-holder">
                    ${h.join('')}
                    <div class="ks-tornado-x-baseline">
                        <div class="ks-tornado-x-baseline-label">${this.getRealValue('baseTitle', d, 'Baseline')}<b>${v.baseValue}</b></div>
                        ${this.createTitleHtml(d)}
                    </div>
                </div>
            </div>
            <div class="ks-tornado-bar-holder">
                <div class="ks-tornado-bar-content-holder">
                    <div class="ks-tornado-bar-baseline"></div>
                </div>
            </div>
        </div>
    </div>
    ${this.createLegendHtml(v)}
</div>`;
    }

    createTitleHtml(d) {
        if (!this.getRealValue('titleVisible', d, true)) {
            return '';
        }

        return `
<div class="ks-input-control ks-input-low">
    ${this.getRealValue('leftTitle', d, 'Input Low')}
    <div class="ks-input-control-icon"></div>
</div>
<div class="ks-input-control ks-input-high">
    <div class="ks-input-control-icon"></div>
    ${this.getRealValue('rightTitle', d, 'Input High')}
</div>`;
    }

    createLegendHtml(v) {
        if (!v.legendVisible) {
            return '';
        }

        const h = ['<div class="ks-legend ks-legend-', v.skin, '"><div class="ks-legend-inner">'];

        let b, c, d;

        for (d of v.dataset) {
            c = d.leftColor;
            b = 'color: ' + c + ';';

            h.push('<div class="ks-legend-item"><div class="ks-legend-item-inner"><div class="ks-legend-icon" style="color: ', c, ';', b, '"><\/div><div class="ks-legend-label" style="color: ', c, ';">', d.legendLabel, '<\/div><\/div><\/div>');
        }

        h.push('<\/div><\/div>');

        return h.join('');
    }

    initEventHandlers() {
        const section = this.getSection(), v = this.value, mainDiv = section.children(), divs = mainDiv.children(), legendDiv = divs.eq(1), p = mainDiv.children().width() / v.range;
        const baseLines = mainDiv.find('.ks-tornado-x-baseline,.ks-tornado-bar-baseline'), h = [], base = v.baseValue;

        divs.eq(0).height(mainDiv.height() - legendDiv.outerHeight(true));

        for (let e of v.dataset) {
            h.push('<div class="ks-tornado-bar-row"><div class="ks-tornado-bar ks-left" style="background-color:', e.leftColor, ';width:', (base - e.leftValue) * p, 'px;"><div class="ks-tornado-bar-label">', e.leftValue, '<\/div><\/div><div class="ks-tornado-bar ks-right" style="background-color:', e.rightColor, ';width:', (e.rightValue - base) * p, 'px;"><div class="ks-tornado-bar-label">', e.rightValue, '<\/div><\/div><\/div>');
        }

        let bars;

        baseLines.css('left', (base - v.xMin) * p).eq(1).html(h.join('')).promise().then(e => {
            bars = e.children();
        });

        legendDiv.on('click', '.ks-legend-item', e => bars.filter(':nth-child(' + ($(e.currentTarget).toggleClass('off').index() + 1) + ')').toggle());
    }

    processData(data) {
        return data;
    }
}
;