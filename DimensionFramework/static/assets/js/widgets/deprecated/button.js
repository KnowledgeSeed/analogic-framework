/* global app, El, Widget */

'use strict';

class OldButtonWidget extends Widget {

    getHtml() {
        const o = this.options;

        if (!o.hasLayout) {
            return `<a ${o.confirmMessage ? `data-confirmmessage="${o.confirmMessage}" ` : ''} ${o.url ? `target="_blank" href="${o.url}"` : `data-id="${o.id}" data-action="${o.action}"`}  class="${o.backgroundVisible ? `widget-btn button-widget${o.url ? '-url' : ''}` : `widget-link-cancel button-widget-cancel${o.url ? '-url' : ''}`}">${o.label}</a>`;
        }

        let w = o.width ? Math.round((o.width / 100) * 12) : 6;

        return `<div class="row margin-bottom-row"><div class="col-2"><div class="row"><div class="col-${w}"><a ${o.confirmMessage ? `data-confirmmessage="${o.confirmMessage}" ` : ''} ${o.url ? `target="_blank" href="${o.url}"` : `data-id="${o.id}" data-action="${o.action}"`}  class="${o.backgroundVisible ? `widget-btn button-widget${o.url ? '-url' : ''}` : `widget-link-cancel button-widget-cancel${o.url ? '-url' : ''}`}">${o.label}</a></div></div></div></div>`;
    }

    initEventHandlers(section) {
        let a = section.find('a');

        if (!a.data('confirmmessage')) {
            Widget.handleSystemEvent(section, 'click', '.button-widget');
            return Widget.handleSystemEvent(section, 'click', '.button-widget-cancel');
        }

        a.on('click', e => {
            let w = $(e.currentTarget), s = w.closest('section'), p = w.parent(), t = [];

            t.push('<div class="row"><div class="col-12"><div class="row"><div class="col-12"><h4 style="margin-top: 20px;margin-bottom: 20px;">', w.data('confirmmessage'), '</h4></div></div></div></div>');
            t.push('<div class="row"><div class="col-12"><div class="row">');
            t.push('<div class="col-6"><a id="deleteOk" class="widget-btn button-widget">OK</a></div>');
            t.push('<div class="col-6"><a id="deleteCancel" style="text-align: center;display:block;" class="widget-link-cancel button-widget-cancel">CANCEL</a></div>');
            t.push('</div></div></div>');

            El.body.prepend(`<div id="horizontalpopup" style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;z-index: 8;"></div>`);

            p.append(`<div class="widget-table-row-edit-menu" style="right:-150px;">${t.join('')}</div>`).promise().then(() => {
                let c = p.find('.widget-table-row-edit-menu'), g = $('#horizontalpopup');

                g.on('click', () => {
                    g.remove();
                    c.remove();
                });

                $('#deleteOk').on('click', () => {
                    Widget.doHandleSystemEvent(w, e);
                    g.remove();
                    c.remove();
                });

                $('#deleteCancel').on('click', () => {
                    g.remove();
                    c.remove();
                });
            });
        });
    }
}
;