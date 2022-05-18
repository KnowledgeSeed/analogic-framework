/* global app, Widget */

'use strict';
class SegmentedBarWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options, temp = [{value: -300, bgColor: 'lightblue', separatorVisible: true, separatorColor: 'blue', separatorBgColor: 'pink', label: '5.0%', confidenceLineVisible: true, confidenceLineColor: 'red'}, {value: 0, color: 'darkred', bgColor: 'cyan', separatorVisible: true, separatorColor: 'blue', separatorBgColor: 'pink', label: '90.0%', confidenceLineVisible: true, confidenceLineColor: 'red'}, {value: 1821, color: 'green', bgColor: 'turquise', separatorVisible: true, separatorColor: 'blue', separatorBgColor: 'pink', label: '5.0%', confidenceLineVisible: true, confidenceLineColor: 'red'}, {value: 6000, separatorVisible: true, separatorColor: 'blue', separatorBgColor: 'pink', confidenceLineVisible: true, confidenceLineColor: 'red'}];

        let datasetConfig = o.dataset || [];

        if (d.dataset) {
            datasetConfig = $.extend(true, [], datasetConfig, d.dataset);
        }

        const dataset = $.extend(true, [], datasetConfig, d.dataset || temp);

        const h = [], len = dataset.length, range = dataset[len - 1].value - dataset[0].value;

        let i, e, f, w;

        for (i = 0; i < len - 1; ++i) {
            e = dataset[i];
            f = dataset[i + 1];

            if (e.value === f.value) {
                continue;
            }

            w = 100 * (f.value - e.value) / range;

            this.addSeparatorHtml(h, e);

            h.push('<div class="ks-segmentedbar-block color-', i % 2 + 1, '" style="background: ', e.bgColor || 'inherit', '; width: ', w, '%;"><div style="color: ', e.color || 'inherit', ';" class="ks-segmentedbar-block-label">', e.label, '<\/div><\/div>');
        }

        this.addSeparatorHtml(h, f);

        return `<div class="ks-segmentedbar" style="${this.getGeneralStyles(d).join('')}"><div class="ks-segmentedbar-inner">${h.join('')}</div></div>`;
    }

    addSeparatorHtml(h, e) {
        if (!e.separatorVisible) {
            return;
        }

        let c;

        if (e.confidenceLineVisible) {
            c = '<div class="ks-segmentedbar-confidence-line" style="' + (e.confidenceLineColor ? 'background-color: ' + e.confidenceLineColor + ';' : '') + (e.confidenceLineWidth ? 'width: ' + e.confidenceLineWidth + 'px;' : '') + '"><\/div>';
        } else {
            c = '';
        }

        h.push('<div class="ks-segmentedbar-separator">', c, '<div style="color: ', e.separatorColor || 'inherit', ';" class="ks-segmentedbar-separator-label">', e.value, '<\/div><div class="ks-segmentedbar-separator-icon"><\/div><\/div>');
    }

    processData(data) {
        return data ? {dataset: data} : data;
    }
}
;