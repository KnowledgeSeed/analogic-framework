/* global app, Widget  */

'use strict';
class SiteMenuButtonWidget extends Widget {

    getHtml(widgets, data) {
        this.value = {};
        const o = this.options;
        return `<a data-id="${o.id}" data-action="launch" class="user-box-menu-item"><span class="${o.icon}"></span>${o.text}</a>`;
    }

    initEventHandlers(section) {
        section.find('.user-box-menu-item').on('click', event => {
            let element = $(event.currentTarget);
            Widget.doHandleSystemEvent(element, event, true);
        });
    }
}
;