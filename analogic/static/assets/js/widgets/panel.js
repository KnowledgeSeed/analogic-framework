'use strict';

class PanelWidget extends Widget {

    getHtml(widgets, d) {
        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d);

        return `<div class="${m.mainClass}" style="${m.mainStyle}">${widgets.join('')}</div>`;
    }

    // Pure: everything getHtml() renders, as plain strings.
    buildModel(d) {
        const v = {
            skin: this.getRealValue('skin', d, 'standard')
        };

        return {
            mainClass: Widget.intern(`ks-panel  ks-panel-${v.skin}`),
            mainStyle: Widget.intern(this.getGeneralStyles({}).join(''))
        };
    }

    // Model based update: only what differs from the model applied last is touched, so classes,
    // styles and other state added to the element at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: nothing to update (as before).
        if (!previous || this.getHtml !== PanelWidget.prototype.getHtml) {
            return;
        }

        const next = this.buildModel(data), main = this.getSection().children()[0];

        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);
        Widget.applyStyleDiff(main, previous.mainStyle, next.mainStyle);

        this._vm = next;
    }
}
;