/* global app, Listeners, PageState, QB, Widget */

'use strict';
class GridTableHeaderCellWidget extends Widget {

    getHtml(widgets, d, withState) {
        const o = this.options;

        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d);

        return `<div id="${o.id}" class="${m.mainClass}" style="${m.mainStyle}"><div class="ks-grid-table-head-cell-border-left"></div><div class="${m.contentClass}">${widgets.join('')}</div></div>`;
    }

    // Pure: everything getHtml() renders, as plain strings.
    buildModel(d, v = this.getParameters(d)) {
        let mainDivStyle = [];

        v.width && mainDivStyle.push(`width:${v.width}${isNaN(v.width) ? ';' : 'px;'}`);

        if (v.cellVisible === false) {
            mainDivStyle.push('display:none;');
        }

        return {
            mainClass: Widget.intern(`${v.cellHeaderSkin ? 'ks-grid-table-head-cell-' + v.cellHeaderSkin : ''}  ks-grid-table-cell ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}`),
            mainStyle: Widget.intern(mainDivStyle.join('')),
            contentClass: Widget.intern(`ks-pos-${v.alignment} ks-grid-table-cell-content`)
        };
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
        }).catch(function (error) {
            return instance.getWidgetErrorHtml(error);
        });
    }

    // Model based update of the header cell frame: only what differs from the model applied last
    // is touched, so classes, styles and other state added at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: keep the old behavior.
        if (!previous || this.getHtml !== GridTableHeaderCellWidget.prototype.getHtml) {
            return this.updateHtmlLegacy(data);
        }

        const next = this.buildModel(data || {}), mainDiv = document.getElementById(this.options.id);

        if (mainDiv) {
            Widget.applyClassDiff(mainDiv, previous.mainClass, next.mainClass);
            Widget.applyStyleDiff(mainDiv, previous.mainStyle, next.mainStyle);
            Widget.applyClassDiff(mainDiv.querySelector('.ks-grid-table-cell-content'), previous.contentClass, next.contentClass);
        }

        this._vm = next;
    }

    // Previous field by field update, used when there is no model to diff against or a
    // subclass renders its own markup.
    updateHtmlLegacy(data) {
        const o = this.options, p = this.getParameters(data), mainDiv = $('#' + o.id);
        Widget.setSkin(mainDiv, 'ks-grid-table-head-cell-', p.cellHeaderSkin);
        p.cellVisible === false ? mainDiv.css('display', 'none') : mainDiv.css('display', 'block');
        p.width && mainDiv.css('width', Widget.getPercentOrPixel(p.width));
    }
}
;