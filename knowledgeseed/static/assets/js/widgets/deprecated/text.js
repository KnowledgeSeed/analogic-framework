'use strict';
class OldTextWidget extends Widget {

    getHtml(widgets, data) {
        const o = {...this.options, ...data}, titleVisible = o.titleVisible === undefined || o.titleVisible === true ? true : false;

        return `<div class="row"><div class="col"><div class="widget-summary">${titleVisible ? `<h4>${o.title}</h4>` : '' }<p>${o.text}</p></div></div></div>`;
    }
}
;