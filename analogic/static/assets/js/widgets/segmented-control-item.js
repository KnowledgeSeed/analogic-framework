/* global Widget */

'use strict';

class SegmentedControlItemWidget extends Widget {
    updateHtml(data) {
        const item = document.getElementById(this._segmentId);
        if (item) this.morphHtml(item, this.getHtml([], {...this._segmentContext, ...data}));
        else super.updateHtml(data);
    }

    getHtml(widgets, d) {
        const o = this.options;
        this._segmentContext = {id: d.id, position: d.position};
        this._segmentId = o.id + '_' + d.id;

        const v = {
            skin: this.getRealValue('skin', d, 'standard2'),
            label: this.getRealValue('label', d, ''),
            selected: this.getRealValue('selected', d, false),
            action: this.getRealValue('action', d, ''),
            value: this.getRealValue('value', d, '')
        };

        return `<a id="${o.id + '_' + d.id}" data-id="${d.id}" data-value="${v.value}" data-action="${v.action}" class="ks-segment ${v.selected ? ' ks-on' : ''} ks-segmented-${v.skin}"  style="${this.getGeneralStyles(d).join('')}"><div class="ks-segment-inner"><div class="ks-segment-icon"></div><div class="ks-segment-label">${v.label}</div></div></a>`;
    }
}
;
