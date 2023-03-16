/* global app, Listeners, PageState, QB, Widget */

'use strict';
class GridTableHeaderCellWidget extends Widget {

    getHtml(widgets, d, withState) {
        const v = this.getParameters(d), o = this.options;

        let mainDivStyle = [];

        v.width && mainDivStyle.push(`width:${v.width}${isNaN(v.width) ? ';' : 'px;'}`);

        if (v.cellVisible === false) {
            mainDivStyle.push('display:none;');
        }

        return `<div id="${o.id}" class="${v.cellHeaderSkin ? 'ks-grid-table-head-cell-' + v.cellHeaderSkin : ''}  ks-grid-table-cell ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${mainDivStyle.join('')}"><div class="ks-grid-table-head-cell-border-left"></div><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
    }

    getParameters(d){
        return {
            alignment: this.getRealValue('alignment', d, 'center-center'),
            borderLeft: this.getRealValue('borderLeft', d, true),
            borderRight: this.getRealValue('borderRight', d, true),
            cellHeaderSkin: this.getRealValue('cellHeaderSkin', d, false),
            cellVisible: this.getRealValue('cellVisible', d, true),
            width: this.getRealValue('width', d, false)
        };
    }

    render(withState, d, loadFunction = QB.loadData) {
        this.isRendering = true;
        const o = this.options, instance = this;

        let widgetOptions, widgets = [], h = Listeners.handle;

        for (widgetOptions of o.widgets || []) {
            widgets.push(this.getWidget(widgetOptions));
        }

        this.addListeners(false);

        this.addDependents();

        return loadFunction(o.id, instance.name).then(function (data) {
            let deferred = [], w;

            for (w of widgets) {
                deferred.push(w.render(withState));
            }

            return $.when.apply($, deferred).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                return `${instance.getHtml(widgetHtmls, instance.processData(d.cellVisible === false ? {...data, ...{cellVisible: d.cellVisible}} : data), withState)}`;
            });
        });
    }

    updateHtml(data) {
        const o = this.options, p = this.getParameters(data), mainDiv = $('#' + o.id);
        Widget.setSkin(mainDiv, 'ks-grid-table-head-cell-', p.cellHeaderSkin);
        p.cellVisible === false ? mainDiv.css('display', 'none') : mainDiv.css('display', 'block');
        p.width && mainDiv.css('width', Widget.getPercentOrPixel(p.width));
    }
}
;