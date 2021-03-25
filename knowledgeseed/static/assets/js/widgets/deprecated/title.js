'use strict';
class TitleWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;

        return `<div class="row"><div class="col"><h3 class="sub-title">${o.title}<b>${o.subTitle}</b></h3></div></div>`;
    }
}
;