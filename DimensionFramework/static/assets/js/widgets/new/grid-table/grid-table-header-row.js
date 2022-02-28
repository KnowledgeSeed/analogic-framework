/* global app, Listeners, PageState, QB, Widget */

'use strict';
class GridTableHeaderRowWidget extends Widget {

    getHtml(widgets, d, withState) {
        const v = {
            alignment: this.getRealValue('alignment', d, false),
            borderBottom: this.getRealValue('borderBottom', d, true),
            borderTop: this.getRealValue('borderTop', d, true),
            height: this.getRealValue('height', d, false)
        };

        return `<div class="ks-grid-table-row ${v.alignment !== false ? `ks-row-pos-${v.alignment}` : ''} ${v.borderBottom ? 'border-bottom' : ''} ${v.borderTop ? 'border-top' : ''}">${widgets.join('')}</div>`;
    }

    render(withState, d, loadFunction = QB.loadData) {
        const o = this.options, instance = this;

        if (withState && 'PageWidget' === instance.name) {
            this.addListeners();

            return $.Deferred().resolve(PageState[o.id]);
        }

        let widgetOptions, widgets = [], h = Listeners.handle;

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

        if (o.depends) {//grid
            const f = o.id.split('_'), a = f[0], b = f[1];

            for (let l of o.depends) {
                Listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.action + '.' + a + '_' + b + '_' + l.col + '.finished',
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

        Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});
        Listeners.push({
            options: o,
            method: 'refreshWithoutLoader',
            eventName: 'refreshwithoutloader.' + o.id,
            handler: h
        });
        Listeners.push({options: o, method: 'updateContent', eventName: 'updatecontent.' + o.id, handler: h});
        Listeners.push({options: o, method: 'updateContentWithoutLoader', eventName: 'updatecontentwithoutloader.' + o.id, handler: h});

        //rekurzív renderelés, adatbetöltéssel

        return loadFunction(o.id, instance.name).then(function (data) {
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