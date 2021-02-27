/* global app, Listeners, QB, Widget */

'use strict';
class MainMenuWidget extends Widget {

    getHtml(widgets, data) {

        return `
<div class="wrapper">
    <div class="row">
        <div class="col">
            <h2 class="main-title">${this.options.title}</h2>
        </div>
    </div>
    <div class="row">
        <div class="col">
             <nav>${widgets.map(item => item).join('')}</nav>
        </div>
    </div>
</div>`;
    }

    render(withState) {
        const o = this.options, instance = this, h = Listeners.handle;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                Listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

        Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});

        //rekurzív renderelés, adatbetöltéssel

        return QB.loadData(o.id, instance.name).then(function (data) {
            let deffered = [], w, i = 0;

            for (w of widgets) {
                deffered.push(w.embeddedRender(withState, i < data.length ? data[i] : {}));
                ++i;
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

    initEventHandlers(section) {
        Widget.handleSystemEvent(section, 'click', '.main-nav-item.action');
    }
}
;