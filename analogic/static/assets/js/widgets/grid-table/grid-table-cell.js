/* global app, Listeners, Widget, QB */

'use strict';

class GridTableCellWidget extends Widget {

    // Single source of truth for the cell's root-div inline style, shared by getHtml
    // and updateHtml so the two cannot drift apart.
    getMainDivStyle(data, v) {
        let defaults = {};
        if (v.cellWidth !== false) {
            defaults['width'] = v.cellWidth;
        }
        let mainDivStyle = this.getGeneralStyles(data, defaults, 'cell-');

        v.cellBackgroundColor && mainDivStyle.push(`background-color:${v.cellBackgroundColor};`);

        if (v.cellVisible === false) {
            mainDivStyle.push('display:none;');
        }

        v.cellPaddingRight && mainDivStyle.push('padding-right:', Widget.getPercentOrPixel(v.cellPaddingRight), ';');
        v.cellPaddingLeft && mainDivStyle.push('padding-left:', Widget.getPercentOrPixel(v.cellPaddingLeft), ';');

        return mainDivStyle.join('');
    }

    getHtml(widgets, data, withState) {
        const v = this.getParameters(data);

        return `<div id="${v.cellId}" class="ks-grid-table-cell ${v.cellSkin !== false ? 'ks-grid-table-cell-' + v.cellSkin : ''} ${v.cellSkin === false ? 'ks-grid-table-cell-' + v.skin : ''} ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${this.getMainDivStyle(data, v)}"><div class="ks-grid-table-cell-border-left"></div><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
    }

    getParameters(data) {
        return {
            alignment: this.getRealValue('alignment', data, 'center-center'),
            borderLeft: this.getRealValue('borderLeft', data, false),
            borderRight: this.getRealValue('borderRight', data, false),
            cellBackgroundColor: this.getRealValue('cellBackgroundColor', data, false),
            cellVisible: this.getRealValue('cellVisible', data, true),
            skin: this.getRealValue('skin', data, 'standard'),
            cellId: this.getRealValue('cellId', data, false),
            cellSkin: this.getRealValue('cellSkin', data, false),
            cellWidth: this.getRealValue('cellWidth', data, false),
            paddingRight: this.getRealValue('paddingRight', data, false),
            cellPaddingRight: this.getRealValue('cellPaddingRight', data, false),
            cellPaddingLeft: this.getRealValue('cellPaddingLeft', data, false),
            paddingLeft: this.getRealValue('paddingLeft', data, false),
            width: this.getRealValue('width', data, 30)
        };
    }

    initEvents(withState, childId) {
        Widgets[childId].initEvents(withState);
        this.initEventHandlers(withState);
        this.isRendering = false;
    }

    updateContent(data = false, loadFunction = QB.loadData) {
        const o = this.options;
        let widgetOptions, childrenData;

        for (widgetOptions of o.widgets || []) {
            childrenData = {...widgetOptions, ...data};
            childrenData['originalId'] = widgetOptions['id'];
            // The child was created in render() with the first row data folded into its
            // options. Rebuild them from the new data, as a fresh render would, otherwise a
            // key that disappears from the data is still read back from the stale options.
            Widgets[childrenData['id']].options = {...childrenData};
            Widgets[childrenData['id']].updateHtml(childrenData);
        }
        this.dynamicTooltip = (childrenData || {}).tooltip;
        this.updateHtml(childrenData);
    }

    updateHtml(data) {
        // The child widget's own options are merged into `data`, so its skin must not
        // be mistaken for the cell's. Work on a copy instead of mutating the caller's data.
        data = {...data};
        delete data['skin'];
        const p = this.getParameters(data), mainDiv = $('#' + p.cellId), content = mainDiv.find('.ks-grid-table-cell-content');

        // The inline style is derived purely from the parameters (same as getHtml), so it
        // is rewritten wholesale: this also clears measures/margins that were dropped.
        mainDiv.attr('style', this.getMainDivStyle(data, p));

        Widget.setSkin(mainDiv, 'ks-grid-table-cell-', p.cellSkin ? p.cellSkin : p.skin);

        Widget.addOrRemoveClass(mainDiv, 'border-right', p.borderRight);
        Widget.addOrRemoveClass(mainDiv, 'border-left', p.borderLeft);

        // Drop the previous alignment before applying the new one, otherwise the
        // classes pile up and the stale one can win.
        content.removeClass((i, c) => (c.match(/(^|\s)ks-pos-\S+/g) || []).join(' '));
        content.addClass('ks-pos-' + p.alignment);
    }

    render(withState, childrenData) {
        this.isRendering = true;
        const o = {...this.options, ...childrenData}, instance = this;

        let widgetOptions, w, widgetHtmls = [], newWidgetOptions;

        for (widgetOptions of o.widgets || []) {
            childrenData['originalId'] = widgetOptions['id'];
            newWidgetOptions = {...widgetOptions, ...childrenData};
            w = new newWidgetOptions.type(newWidgetOptions);
            Widgets[childrenData['id']] = w;
            widgetHtmls.push(w.embeddedRender(withState, childrenData));
        }

        this.addListeners(false);

        return `${instance.getHtml(widgetHtmls, childrenData, withState)}`;
    }
}
;