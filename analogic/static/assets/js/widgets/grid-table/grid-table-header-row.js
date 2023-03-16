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
        this.isRendering = true;
        const o = this.options, instance = this;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(this.getWidget(widgetOptions));
        }

        this.addListeners();

        this.addDependents();

        return loadFunction(o.id, instance.name).then(function (data) {
            let deferred = [], w, k = 0;

            for (w of widgets) {
                deferred.push(w.render(withState, d.length > k ? d[k] : {}));
                ++k;
            }

            return $.when.apply($, deferred).then(function (...results) {
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