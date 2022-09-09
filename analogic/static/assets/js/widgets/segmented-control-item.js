/* global Widget */

'use strict';

class SegmentedControlItemWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;

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