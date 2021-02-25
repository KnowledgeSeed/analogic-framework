/* global app, Widget */

'use strict';

class CheckboxWidget extends Widget {

    getHtml() {
        const o = this.options;
        const data = {...o, ...this.value};

        data.value = o.isCheckBoxSelected;
        this.state = o;
        this.value = data;

        const html =
                `${o.titleVisible ? `<label>${o.title}</label>` : ''}
                 <div class="widget-checkbox-holder with-label">
                    <div class="widget-checkbox ${o.isCheckBoxSelected ? 'on' : ''}">
                            <span class="icon-checkbox-off"><\/span>
                            <span class="icon-checkbox-on"><\/span>
                    </div>
                    <label>${o.label}<\/label>
                 </div>
                `;

        return html;
    }

    initEventHandlers(section) {//ezt javítani widget példányra
        const id = section.attr('id');

        $('#' + id + ' .widget-checkbox').on('touch click', e => {
            $(e.currentTarget).toggleClass('on');
            app.widgetValue[id].value = $(e.currentTarget).hasClass('on');
        });
    }
}
;
