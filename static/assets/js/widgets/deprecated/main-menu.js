/* global Widget */

'use strict';
class MainMenuWidget extends Widget {

    getHtml(widgets, data) {

        const html =
                `<div class="wrapper">
				<div class="row">
					<div class="col">
						<h2 class="main-title">${this.options.title}</h2>
					</div>
				</div>
				<div class="row">
					<div class="col">
					     <nav>
                                                ${widgets.map(item => {
                    return item;
                }).join('')}
                                            </nav>
					</div>
				</div>
			</div>`;

        return html;
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
        const id = section.attr('id');
        Widget.handleSystemEvent(app.el.body.find('#' + id), 'click', '.main-nav-item.action');
    }
}
;