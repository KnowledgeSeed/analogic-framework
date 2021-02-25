/* global app, Widget */

'use strict';

class SwitchButtonWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;
        this.value = {};
        return `<div class="switch ${'1' === data.value ? 'active' : ''}" data-ordinal="${data.ordinal}" data-value="${data.value}" data-id="${o.id}" data-action="launch">${app.utils.nl2br(this.options.title)}</div>`;
    }

    initEventHandlers(section) {
        //vagy a handleSystemEvent-et vagy a doHandleSystemEvent-et használd, mert készer küldi el
        //
        //  Widget.handleSystemEvent(section, 'click', '.switch', true, true);

        if (!SwitchButtonWidget.isDocEventsHaveBeenBound) {
            app.doc.on('click', '.switch', e => {
                const s = $(e.currentTarget), isActive = !s.hasClass('active');

                s.toggleClass('active', isActive).trigger('change', [isActive]);

                s.data('value', isActive ? 1 : 0);

                Widget.doHandleSystemEvent(s, e);
            });

            SwitchButtonWidget.isDocEventsHaveBeenBound = true;
        }
    }
}
;