/* global app, Widget */

'use strict';

class OldRadioButtonRowWidget extends Widget {

    getHtml(widgets, data, withState) {
        const o = this.options, s = [];

        s.push(`<td class="col-selection">`);

        if (data.active) {
            s.push(`<a><div data-index="${data.index}" class="widget-radio horizontal-table ${data.on ? 'on' : '' }" ${data.d.join('')} id="${o.id + (data.num + 1)}" data-id="${data.id}" data-action="${o.action}"><span class="icon-radio-off"></span><span class="icon-radio-on"></span></div></a>`);
        }

        s.push(`</td>`);

        return s.join('');

    }
}
;