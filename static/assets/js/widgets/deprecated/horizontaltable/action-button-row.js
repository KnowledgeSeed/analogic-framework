/* global app, Widget */

'use strict';

class OldActionButtonRowWidget extends Widget {

    getHtml(widgets, data, withState) {
        const o = this.options, s = [], icons = {delete: 'icon-trash', open: 'icon-arrow-right', popup: 'icon-arrow-right', edit: 'icon-edit'};

        s.push(`<td class="col-link">`);

        if (data.active) {
            s.push(`<a class="widget-table-more-link horizontal-table-row-action" ${data.d.join('')}  data-rowindex="${data.index}" id="${o.id + (data.num + 1)}" data-id="${data.id}" data-action="${o.action}"><span class="${o.icon ? o.icon : icons[o.action]}"></span></a>`);
        }

        s.push(`</td>`);

        return s.join('');
    }
}
;