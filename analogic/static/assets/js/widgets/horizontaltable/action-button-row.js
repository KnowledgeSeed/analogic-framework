/* global app, Widget */

'use strict';

class ActionButtonRowWidget extends Widget {

    getHtml(widgets, data, withState) {
        const o = this.options, icons = {delete: 'icon-trash', open: 'icon-arrow-right', popup: 'icon-arrow-right', edit: 'icon-edit'};
        let icon;
        if(data.icon){
            icon = data.icon;
        }else{
            icon = o.icon ? o.icon : icons[o.action];
        }

        let s = [`<div class="ks-horizontal-table-cell ks-action-cell" style="display:flex;justify-content:center;${data.actionWidth !== false ? `flex: 0 0 ${data.actionWidth}%;` : ''}"><div class="ks-horizontal-table-cell-inner" style="width: 100%;">`];

        if (data.active === true) {
            s.push(`<a class="widget-table-more-link horizontal-table-row-action" ${data.d.join('')} style="width: 100%;display: flex;align-items: center;justify-content: center;height:100%;cursor: pointer;" data-rowindex="${data.index}" id="${o.id + (data.num + 1)}" data-id="${data.id}" data-action="${o.action}"><span class="${icon}"></span></a>`);
        }

        s.push(`</div></div>`);

        return s.join('');
    }
}
;