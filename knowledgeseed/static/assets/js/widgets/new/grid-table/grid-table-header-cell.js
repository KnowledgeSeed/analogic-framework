/* global app, Listeners, PageState, QB, Widget */

'use strict';
class GridTableHeaderCellWidget extends Widget {

    getHtml(widgets, d, withState) {
        const v = {
            alignment: this.getRealValue('alignment', d, 'center-center'),
            borderLeft: this.getRealValue('borderLeft', d, true),
            borderRight: this.getRealValue('borderRight', d, true),
            cellVisible: this.getRealValue('cellVisible', d, true),
            width: this.getRealValue('width', d, false)
        };

        let mainDivStyle = [];

        v.width && mainDivStyle.push(`width:${v.width}${isNaN(v.width) ? ';' : 'px;'}`);

        if (v.cellVisible === false) {
            mainDivStyle.push('display:none;');
        }

        return `<div class="ks-grid-table-cell ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${mainDivStyle.join('')}"><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
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
            const f = o.id.split('_'), a = f[0], b = f[0];

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

        //rekurzív renderelés, adatbetöltéssel

        return loadFunction(o.id, instance.name).then(function (data) {
            let deffered = [], w;

            for (w of widgets) {
                deffered.push(w.render(withState));
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                return `${instance.getHtml(widgetHtmls, instance.processData(d.cellVisible === false ? {...data, ...{cellVisible: d.cellVisible}} : data), withState)}`;
            });
        });
    }
}
;