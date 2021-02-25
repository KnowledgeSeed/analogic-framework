/* global app, Widget  */

'use strict';
class SiteMenuListWidget extends Widget {

    getHtml(widgets, data) {
        this.value = {};
        const o = this.options;
        return this.getMainHtml(o.id, o.text, data.buttonText, widgets.join(''));

    }

    getMainHtml(id, text, buttonText, innerHtml) {
        const html =
                `<a class="user-box-menu-item user-box-menu-select">
                    <div class="user-box-auto-refresh">${buttonText}</div>
                    ${text}
                    <span class="icon-chevron-right"></span>
                </a>
                <a style="display: none;" data-parent="${id}" class="user-box-menu-item"><span class="icon-chevron-left"></span>${text}</a>
                ${innerHtml}`;
        return html;
    }

    initEventHandlers(section) {
        $('#' + section.attr('id')).on('click', '.user-box-menu-select', (e) => {
            let c = $(e.currentTarget);
            const childItems = $('[data-parent="' + section.attr('id') + '"]'), menuItems = c.parent().parent().children();

            if (childItems.length) {
                menuItems.hide();
                c.parent().show();
                c.hide();
                childItems.show();
            }
        });
        $('#' + section.attr('id')).on('click', '.user-box-menu-item', (e) => {
            let c = $(e.currentTarget);
            if(c.find('.icon-chevron-left').length){
                const childItems = $('[data-parent="' + section.attr('id') + '"]'), menuItems = c.parent().parent().children();
                menuItems.show();
                $('#' + section.attr('id')).find('.user-box-menu-select').show();
                childItems.hide();
            }
        });
    }

    embeddedRender(withState, data) {
        const o = this.options;
        const instance = this;


        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                app.listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        app.listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: app.fn.handleListener});

        //rekurzív renderelés, adatbetöltéssel

        return app.fn.loadData(o.id, instance.constructor.name).then(function () {
            let deffered = [], w, v = data.value === null ? 0 : data.value, t;

            for (w of widgets) {
                deffered.push(w.embeddedRender(withState, {...data, ...{parent: o.id}}));
                if(v == w.options.value){
                    t = w.options.buttonText;
                }
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                let visible = data && data.visible ? data.visible : o.visible;
                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" ${visible === false ? 'style="display:none"' : '' } id="${o.id}">${instance.getHtml(widgetHtmls, instance.processData({...data, ...{buttonText: t}}), withState)}</section>`;
            });
        });
    }

}
;