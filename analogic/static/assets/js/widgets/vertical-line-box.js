/* global app, Widget */

'use strict';
class VerticalLineBoxWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

//        const demoData = [
//            {lineVisible: false, labelVisible: false, value: 2019},
//            {lineVisible: true, lineStyle: 'dotted', lineWidth: 2, labelVisible: true, titleVisible: true, value: 2020, label: '33%', title: 'Product Introduction', lineColor: 'darkblue', labelColor: 'red', titleColor: 'black', titleBgColor: 'grey'},
//            {lineVisible: true, lineStyle: 'dashed', lineWidth: 1, labelVisible: true, titleVisible: 0, value: 2023.5, label: '47.5%', title: 'Product Testing', lineColor: 'darkblue', labelColor: 'black', titleBgColor: 'lightblue'},
//            {lineVisible: false, labelVisible: false, value: 2025}
//        ];

        const dataset = $.extend(true, [], o.dataset || [], (d || [])[0] || []);

        const h = [], len = dataset.length, startVal = dataset[0].value, range = dataset[len - 1].value - startVal;

        let i, e, left, w, s, heightClasses = [], titleClass;

        for (i = 0; i < len; ++i) {
            e = dataset[i];

            w = e.lineWidth || 1;
            s = e.lineStyle || 'solid';

            left = 100 * (e.value - startVal) / range;

            titleClass = '';

            h.push('<div class="ks-vertical-label', (e.labelVisible ? '' : ' hidden'), '" style="left: ', left, '%; color: ', (e.labelColor || 'inherit'), ';">', e.label || '', '<\/div>');

            if (e.labelVisible) {
                if (!heightClasses.includes('ks-vertical-line-has-label')) {
                    heightClasses.push('ks-vertical-line-has-label');
                }
            }

            if (e.titleVisible) {
                h.push('<div class="ks-vertical-title" style="color: ', (e.titleColor || 'inherit'), '; background: ', (e.titleBgColor || 'inherit'), '; left: ', left, '%;">', e.title || '', '<\/div>');

                titleClass = 'ks-vertical-line-has-title';

                if (!heightClasses.includes(titleClass)) {
                    heightClasses.push(titleClass);
                }
            }

            if (e.lineVisible) {
                h.push('<div class="ks-vertical-line ', titleClass, '" style="left: calc(', left, '% - ', (Math.floor(w / 2)), 'px); border: ', w, 'px ', s, ' ', e.lineColor || 'inherit', ';"><\/div>');
            }
        }

        return `<div class="${heightClasses.join(' ')}"><div class="ks-vertical-line-box" style="${this.getGeneralStyles(d).join('')}">${h.join('')}</div></div>`;
    }

    initEventHandlers() {
        this.getSection().find('.ks-vertical-line-box').on('mouseover mouseout', '.hidden', e => $(e.currentTarget).css('opacity', 'mouseout' === e.type ? 0 : 1));
    }
}
;