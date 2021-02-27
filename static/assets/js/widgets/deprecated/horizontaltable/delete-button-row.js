/* global app, Widget */

'use strict';

class OldDeleteButtonRowWidget extends Widget {

    getHtml(widgets, data, withState) {
        const o = this.options, s = [];

        s.push(`<td class="col-link">`);

        if (data.active) {
            s.push(`<a class="widget-table-more-link horizontal-table-row-action-delete" ${data.d.join('')} data-message="${o.deleteMessage ? o.deleteMessage : 'Are you sure?'}"  data-rowindex="${data.index}" id="${o.id + (data.num + 1)}" data-id="${data.id}" data-action="${o.action}"><span class="icon-trash"></span></a>`);
        }

        s.push(`</td>`);

        return s.join('');
    }
}
;