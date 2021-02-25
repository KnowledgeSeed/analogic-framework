/* global app, Widget  */

'use strict';
class SiteMenuListItemWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;
        let selectedValue = data.value === null ? 0 : data.value;
        return this.getMainHtml(data.parent, o.buttonText, o.text, o.value, o.value == selectedValue);

    }

    getMainHtml(id, buttonText, text, value, selected) {
        const html =
                `<a style="display:none;" data-parent="${id}" data-id="${id}" data-action="launch" data-value="${value}" class="user-box-menu-item user-box-auto-refresh-item ${selected ? 'active' : ''}"><div class="user-box-auto-refresh">${buttonText}</div>${text}</a>`;
        return html;
    }

    initEventHandlers(section) {
        section.find('.user-box-menu-item').on('click', event => {
            let element = $(event.currentTarget), p = element.parent().parent(), siblings = p.find('[data-parent="' + element.data('id') + '"]');
            p.find('.user-box-menu-select').find('.user-box-auto-refresh').html(element.find('.user-box-auto-refresh').html());
            siblings.filter('.active').removeClass('active');
            element.addClass('active');
            Widget.doHandleSystemEvent(element, event, true);
        });
    }
}
;


