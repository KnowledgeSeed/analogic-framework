/* global app, Widget */

'use strict';

class DeleteButtonRowWidget extends Widget {

    getHtml(widgets, data, withState) {
        const o = this.options, s = [`<div class="ks-horizontal-table-cell ks-action-cell" style="display:flex;justify-content:center;${data.actionWidth !== false ? `flex: 0 0 ${data.actionWidth}%;` : ''}"><div class="ks-horizontal-table-cell-inner" style="width: 100%;">`];

        if (data.active === true) {
            s.push(`<a style="width: 100%;display: flex;align-items: center;justify-content: center;height:100%;cursor: pointer;"  class="widget-table-more-link horizontal-table-row-action-delete" ${data.d.join('')} data-message="${o.deleteMessage ? o.deleteMessage : 'Are you sure?'}"  data-rowindex="${data.index}" id="${o.id + (data.num + 1)}" data-id="${data.id}" data-action="${o.action}"><span class="icon-trash"></span></a>`);
        }

        s.push(`</div></div>`);

        return s.join('');
    }
}
;