/* global app, Widget  */

'use strict';
class SiteMenuSubWidget extends Widget {

    getHtml(widgets, data) {
        this.value = {};
        const o = this.options;
        let logo = o.logo ? o.logo : 'default.png', alt = o.alt ? o.alt : '';
        let icon = o.icon ? o.icon : 'icon-profile';
        let text = data.text ? data.text : o.text ? o.text : '';
        return this.getMainHtml(logo, alt, icon, text, widgets.join(''));
    }

    getMainHtml(logo, alt, icon, text, innerHtml) {
        const html =
                `<img class="roche-logo" src="assets/skins/${app.customerAssetsFolder}/images/${logo}" alt="${alt}">
                 <div class="user-box noselect">
                    <span class="${icon}"></span>
                    ${text}
                    <div class="user-box-menu" style="display: none;">${innerHtml}</div>
                 </div>`;
        return html;
    }

    initEventHandlers(section) {
        $('#userboxpopup').remove();
        const userBox = $('#' + section.attr('id')).on('click', '.user-box', () => {
            if (menu.is(':visible')) {
                menu.slideUp(50);
                $('#userboxpopup').remove();
            } else {
                app.el.body.prepend(`<div id="userboxpopup" style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;z-index: 8;"></div>`);
                menu.slideDown(50);
                $('#userboxpopup').on('click', () => {
                    $('#userboxpopup').remove();
                    menu.slideUp(50);
                });
            }

            return false;
        });
        const menu = userBox.children('.user-box').children('.user-box-menu').on('click', false).on('click', 'a', e => {
            const clickedMenuItem = $(e.currentTarget);
            if (clickedMenuItem.hasClass('user-box-menu-select')) {
            }
        });
    }

    render(withState) {
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

        return app.fn.loadData(o.id, instance.constructor.name).then(function (data) {
            let deffered = [], w;

            for (w of widgets) {
                deffered.push(w.embeddedRender(withState, data[w.options.id] ? data[w.options.id] : {}));
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                let visible = data && data.visible ? data.visible : o.visible;
                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" ${visible === false ? 'style="display:none"' : '' } id="${o.id}">${instance.getHtml(widgetHtmls, instance.processData(data), withState)}</section>`;
            });
        });
    }
}
;

