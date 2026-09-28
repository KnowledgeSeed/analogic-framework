/* global app, Utils, Widget */

'use strict';
class GridCellWidget extends Widget {

    getHtml(widgets, d, withState) {
        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d);

        return `<div class="${m.mainClass}" style="${m.mainStyle}"><div class="${m.contentClass}">${widgets.join('')}</div></div>`;

    }

    // Pure: everything getHtml() renders, as plain strings.
    buildModel(d) {
        let mainDivStyle, v = {
            alignment: this.getRealValue('alignment', d, 'center-center'),
            skin: this.getRealValue('skin', d, 'standard')
        };

        if (this.getWidthForSection(d).length) {
            mainDivStyle = this.getMargins(d);
        } else {
            mainDivStyle = this.getGeneralStyles(d);
        }

        return {
            mainClass: Widget.intern(`ks-grid-cell ks-grid-cell-${v.skin}`),
            mainStyle: Widget.intern(mainDivStyle.join('')),
            contentClass: Widget.intern(`ks-pos-${v.alignment} ks-grid-cell-content`)
        };
    }

    // Model based update: only what differs from the model applied last is touched, so classes,
    // styles and other state added to the element at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: nothing to update (as before).
        if (!previous || this.getHtml !== GridCellWidget.prototype.getHtml) {
            return;
        }

        const next = this.buildModel(data), main = this.getSection().children()[0];

        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);
        Widget.applyStyleDiff(main, previous.mainStyle, next.mainStyle);
        Widget.applyClassDiff(main && main.querySelector('.ks-grid-cell-content'), previous.contentClass, next.contentClass);

        this._vm = next;
    }

    getMainHtmlElement(o, data, visible, widgetHtmls, withState) {
        let gs = this.getWidthForSection(data);

        if (false === visible) {
            gs.push('display:none;');
        }

        this.dynamicTooltip = (data || {}).tooltip;

        return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : Utils.getRandomId()}">${this.getHtml(widgetHtmls, this.processData(data), withState)}</section>`;
    }
}
;