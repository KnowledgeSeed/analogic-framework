/* global app, Widget */

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
        v.width && mainDivStyle.push(`width:${v.width}${isNaN(v.width)?';':'px;'}`);
        if (v.cellVisible === false) {
            mainDivStyle.push('display:none;');
        }

        return  `<div class="ks-grid-table-cell ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${mainDivStyle.join('')}"><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
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

