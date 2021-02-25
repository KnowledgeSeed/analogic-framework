/* global app, Widget */

'use strict';
class OldTextAreaWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;

        let actions = [], a;
        this.state = {};
        this.value = {};
        if (o.actions) {
            for (a of o.actions) {
                actions.push(`<a data-id="${o.id}" data-action="${a.action}" data-ordinal="${data.ordinal}" class="widget-textarea-control"><span class="${a.icon}"></span>${a.title}</a>`);
            }
        }

        const html =
                `<div class="row">
                <div class="col">
                    <div class="form-row">
                        <label>${o.title} <a data-title="${o.tooltipTitle}" data-tooltip="${o.tooltip}" class="tooltip-icon"><span class="icon-info"></span></a></label>
                        <div class="widget-textarea-holder with-controls">
                            <textarea data-ordinal="${data.ordinal}" class="widget-input">${data.text || ''}</textarea>
                            <div class="widget-textarea-controls">
                                ${actions.join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        return html;
    }

    processData(data) {
        return data;
    }

    initEventHandlers(section) {
        const o = this.options;
        section.find('textarea').on('focusout', e => {
            let w = $(e.currentTarget);
            w.html(w.val());
            let c = $('<div></div>');
            c.data('id', o.id);
            c.data('value', app.utils.escapeText(w.val()));
            c.data('ordinal', w.data('ordinal'));
            c.data('action', 'save');
            Widget.doHandleSystemEvent(c, e);
        });
        $('.widget-textarea-control').on('click', (e) => {
            let c = $(e.currentTarget), s = c.closest('section'), t = s.find('textarea');
            c.data('value', app.utils.escapeText(t.val()));
            Widget.doHandleSystemEvent(c, e);
        });
    }
}
;