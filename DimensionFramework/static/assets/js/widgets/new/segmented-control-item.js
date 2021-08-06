/* global Widget */

'use strict';

class SegmentedControlItemWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;

        const v = {
            skin: this.getRealValue('skin', d, 'standard2'),
            label: this.getRealValue('label', d, ''),
            selected: this.getRealValue('selected', d, false),
            action: this.getRealValue('action', d, ''),
            value: this.getRealValue('value', d, '')
        };

        return `<a id="${o.id + '_' + d.id}" data-id="${d.id}" data-value="${v.value}" data-action="${v.action}" class="ks-segment ks-segmented-${v.skin} ${v.selected ? ' ks-on' : ''}"  style="${this.getGeneralStyles(d).join('')}"><div class="ks-segment-inner"><div class="ks-segment-icon"></div><div class="ks-segment-label">${v.label}</div></div></a>`;
    }

    embeddedRender(withState, data, loadFunction = QB.loadData) { //az adat a befoglaló widgettől jön
        const o = {...this.options, ...data}, instance = this, h = Listeners.handle;
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

        if (o.depends) {//grid
            const f = o.id.split('_'), a = f[0], b = f[1];

            for (let l of o.depends) {
                Listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.event ? l.event : l.action + '.' + a + '_' + b + '_' + l.col + '.finished',
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

       // Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});

        //rekurzív renderelés, adatbetöltéssel
        return loadFunction(o.originalId, instance.name).then(function () {
            let deffered = [];

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;

                return instance.getMainHtmlElement(o, data, visible, widgetHtmls, withState);
            });
        });
    }
}
;