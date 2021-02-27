/* global app, Widget */

'use strict';

class IconButtonWidget extends Widget {

    getHtml() {
        const o = this.options;

        return `<a data-id="${o.id}" data-action="launch" class="widget-btn btn-add horizontal-table-bottom-action" style="margin-left: 10px;"><span class="${o.icon}"></span></a>`;
    }

    initEventHandlers(section, withState) {
        Widget.handleSystemEvent(section, 'click', '.horizontal-table-bottom-action');
    }
}
;