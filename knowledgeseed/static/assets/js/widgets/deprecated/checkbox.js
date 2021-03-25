/* global app, Widget, WidgetValue */

'use strict';

class CheckboxWidget extends Widget {

    getHtml() {
        const o = this.options, data = {...o, ...this.value};

        data.value = o.isCheckBoxSelected;

        this.state = o;
        this.value = data;

        return `${o.titleVisible ? `<label>${o.title}</label>` : ''}<div class="widget-checkbox-holder with-label"><div class="widget-checkbox ${o.isCheckBoxSelected ? 'on' : ''}"><span class="icon-checkbox-off"><\/span><span class="icon-checkbox-on"><\/span></div><label>${o.label}<\/label></div>`;
    }

    initEventHandlers(section) {//ezt javítani widget példányra
        const id = section.attr('id');

        $('#' + id + ' .widget-checkbox').on('touch click', e => {
            e = $(e.currentTarget);

            e.toggleClass('on');

            WidgetValue[id].value = e.hasClass('on');
        });
    }
}
;