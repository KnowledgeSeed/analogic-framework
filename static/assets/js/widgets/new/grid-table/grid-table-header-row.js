/* global app, Widget */

'use strict';
class GridTableHeaderRowWidget extends Widget {

    getHtml(widgets, d, withState) {
        const v = {
            alignment: this.getRealValue('alignment', d, false),
            borderBottom: this.getRealValue('borderBottom', d, true),
            borderTop: this.getRealValue('borderTop', d, true),            
            height: this.getRealValue('height', d, false)
        };
        return `<div class="ks-grid-table-row ${v.alignment !== false ? `ks-row-pos-${v.alignment}` : ''}  ${v.borderBottom ? 'border-bottom' : ''} ${v.borderTop ? 'border-top' : ''}">${widgets.join('')}</div>`;

    }
    

    render(withState, d, loadFunction = app.fn.loadData) {
        const o = this.options;
        const instance = this;

        if (withState && 'PageWidget' === instance.constructor.name) {
            this.addListeners();
            return $.Deferred().resolve(app.pageState[o.id]);
        }

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

        if (o.depends) {//grid
            const f = o.id.split('_');
            for (let l of o.depends) {
                app.listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.action + '.' + f[0] + '_' + f[1] + '_' + l.col + '.finished',
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        app.listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: app.fn.handleListener});

        //rekurzív renderelés, adatbetöltéssel

        return loadFunction(o.id, instance.constructor.name).then(function (data) {
            let deffered = [], w, k = 0;

            for (w of widgets) {
                deffered.push(w.render(withState, d.length > k ? d[k] : {}));
                ++k;
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                return `${instance.getHtml(widgetHtmls, instance.processData(data), withState)}`;
            });
        });
    }
}
;

