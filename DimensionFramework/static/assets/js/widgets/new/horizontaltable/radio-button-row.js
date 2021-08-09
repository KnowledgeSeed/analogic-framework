/* global app, Widget */

'use strict';

class RadioButtonRowWidget extends Widget {

    getHtml(widgets, data, withState) {
        const o = this.options, s = [`<div class="ks-horizontal-table-cell ks-checkbox-cell" ${data.actionWidth !== false ? `style="flex: 0 0 ${data.actionWidth}%;"` : ''}>`];

        if (data.active === true) {
            s.push(`<div class="ks-horizontal-table-cell-inner"><div data-index="${data.index}" data-ordinal="${data.ordinal}" class="ks-horizontal-table-row-toggle ${data.on ? 'ks-on' : '' }" ${data.d.join('')} id="${o.id + (data.num + 1)}" data-id="${data.id}" data-action="${o.action}"><div class="ks-horizontal-table-toggle-icon ks-horizontal-table-toggle-icon-off"><span class="icon-radio-off"></span></div><div class="ks-horizontal-table-toggle-icon ks-horizontal-table-toggle-icon-on"><span class="icon-radio-on"></span></div></div></div>`);
        }

        s.push(`</div>`);

        return s.join('');
    }
}
;