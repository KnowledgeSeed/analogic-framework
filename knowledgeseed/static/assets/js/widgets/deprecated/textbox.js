/* global app, Widget, WidgetValue */

'use strict';

class OldTextBoxWidget extends Widget {

    getHtml(widgets, d) {
        d = d || {value: ''};

        if (!d.value) {
            d.value = '';
        }

        const o = this.options;
        this.value = d;

        let hide = o.hideIfNoData === true && d.value === '';

        return `
${o.titleVisible ? `<label ${hide ? ' style="display:none;" ' : ''} >${o.title}</label>` : ''}
<input ${hide ? ' style="display:none;" ' : ''} data-action="writeEnd" data-id="${o.id}" type="text" value="${d.value}" class="widget-input textbox-widget" ${o.defaultText ? `placeholder='${o.defaultText}'` : ''}>`;
    }

    initEventHandlers(section) {
        section.find('.textbox-widget').on('focusout', e => {
            let w = $(e.currentTarget), id = section.prop('id');
            WidgetValue[id].value = w.val();
            w.attr('value', w.val());
            Widget.doHandleSystemEvent(w, e);
        });
    }
}
;