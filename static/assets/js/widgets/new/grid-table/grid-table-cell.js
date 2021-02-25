/* global app, Widget */

'use strict';
class GridTableCellWidget extends Widget {

    getHtml(widgets, data, withState) {
        const v = {
            alignment: this.getRealValue('alignment', data, 'center-center', ),
            borderLeft: this.getRealValue('borderLeft', data, true),
            borderRight: this.getRealValue('borderRight', data, true),
            cellBackgroundColor: this.getRealValue('cellBackgroundColor', data, false),
            cellVisible: this.getRealValue('cellVisible', data, true),  
            skin: this.getRealValue('skin', data, 'standard'),
            width: this.getRealValue('width', data, 30)
        };
        let mainDivStyle = this.getGeneralStyles(data);
        v.cellBackgroundColor && mainDivStyle.push(`background-color:${v.cellBackgroundColor};`);
        if (v.cellVisible === false) {
            mainDivStyle.push('display:none;');
        }

        return  `<div class="ks-grid-table-cell ks-grid-table-cell-${v.skin} ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${mainDivStyle.join('')}"><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
    }

    initEvents(withState) {
        const o = this.options;

        let widgetOptions, widgets = [], w;

        for (widgetOptions of o.widgets || []) {
            let d = {id: o.id};
            widgets.push(new widgetOptions.type({...widgetOptions, ...d}));
        }

        for (w of widgets) {
            w.initEvents(withState);
        }

        let section = $('#' + o.id);

        this.initEventHandlers(section, withState);
    }

    render(withState, childrenData) {
        const o = {...this.options, ...childrenData};

        const instance = this;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type({...widgetOptions, ...childrenData}));
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

        return app.fn.loadData(o.id, instance.constructor.name).then(function (data) {
            let deffered = [], w;

            for (w of widgets) {
                deffered.push(w.embeddedRender(withState, childrenData));
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                return `${instance.getHtml(widgetHtmls, childrenData, withState)}`;
            });
        });
    }

}
;

