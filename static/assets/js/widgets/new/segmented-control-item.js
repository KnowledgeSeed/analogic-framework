/* global Widget */

'use strict';

class SegmentedControlItemWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;
        //return `<a id="${o.id + '_' + data.id}" data-id="${data.id}" data-action="${o.action}" style="width: ${data.width}%!important; ${data.position > 0 ? 'border-left: 1px solid white;' : ''}" class="segment ${o.selected ? 'on' : ''}">${o.label}</a>`; 

        const v = {
            skin: this.getRealValue('skin', d, 'standard2'),
            label: this.getRealValue('label', d, ''),
            selected: this.getRealValue('selected', d, false),
            action: this.getRealValue('action', d, ''),
            value: this.getRealValue('value', d, '')
        };
        let mainDivStyle = this.getGeneralStyles(d);
        
        return `
            <a id="${o.id + '_' + d.id}" data-id="${d.id}" data-value="${v.value}" data-action="${v.action}" class="ks-segment ks-segmented-${v.skin} ${v.selected ? ' ks-on' : ''}"  style="${mainDivStyle.join('')}">
                <div class="ks-segment-inner">
                        <div class="ks-segment-icon"></div>
                        <div class="ks-segment-label">${v.label}</div>
                </div>
            </a>
        `;

    }
}
;