/* global app, Widget  */

'use strict';
class SiteMenuCheckboxWidget extends Widget {

    getHtml(widgets, data) {
        this.value = {};
        const o = this.options;
        return this.getMainHtml(o.id, o.text, data.value);

    }

    getMainHtml(id, text, value) {
        const html =
                `<a data-id="${id}" data-action="choose" data-value="${value}" class="user-box-menu-item">
                    <div class="widget-checkbox ${value === 1 ? 'on' : ''}">
                        <span class="icon-checkbox-off"></span>
                        <span class="icon-checkbox-on"></span>
                    </div>
                    ${text}
                </a>`;
        return html;
    }

    initEventHandlers(section) {
        section.find('.user-box-menu-item').on('click', event => {
            let element = $(event.currentTarget), checkbox = element.find('.widget-checkbox');
            element.data('value', checkbox.hasClass('on') ? 0 : 1);
            checkbox.toggleClass('on');
            Widget.doHandleSystemEvent(element, event, true);
        });
    }
}
;


