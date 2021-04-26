/* global Widget */

'use strict';

class PageTitleWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options, v = data ? data.value : o.value ? o.value : '';

        return `
<div class="row">
    <div class="col">
        <h2 class="sub-title"><a data-action="back" data-id="${o.id}" class="link-back"><span class="icon-arrow-left"></span></a>${v}</h2>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        Widget.handleSystemEvent(section, 'click', '.link-back');
    }
}
;