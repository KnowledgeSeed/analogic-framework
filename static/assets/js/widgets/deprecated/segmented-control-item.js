/* global Widget */

'use strict';

class OldSegmentedControlItemWidget extends Widget {
    getHtml(widgets, data) {
        const o = this.options;
        return `<a id="${o.id + '_' + data.id}" data-id="${data.id}" data-action="${o.action}" style="width: ${data.width}%!important; ${data.position > 0 ? 'border-left: 1px solid white;' : ''}" class="segment ${o.selected ? 'on' : ''}">${o.label}</a>`;   
    }
};