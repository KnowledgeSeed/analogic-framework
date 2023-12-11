/* global app, Listeners, Widget, QB */

'use strict';

class GridTableCellWidget extends Widget {

    getHtml(widgets, data, withState) {
        const v = this.getParameters(data);
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

        return `<div id="${v.cellId}" class="ks-grid-table-cell ${v.cellSkin !== false ? 'ks-grid-table-cell-' + v.cellSkin : ''} ${v.cellSkin === false ? 'ks-grid-table-cell-' + v.skin : ''} ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${mainDivStyle.join('')}"><div class="ks-grid-table-cell-border-left"></div><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
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
            Widgets[childrenData['id']].updateHtml(childrenData);
        }
        this.dynamicTooltip = (childrenData || {}).tooltip;
        this.updateHtml(childrenData);
    }

    updateHtml(data) {
        delete data['skin'];
        const o = this.options, p = this.getParameters(data), mainDiv = $('#' + p.cellId), content = mainDiv.find('.ks-grid-table-cell-content');
        p.cellVisible === false ? mainDiv.css('display', 'none') : mainDiv.css('display', 'block');
        p.cellWidth && mainDiv.css('width', Widget.getPercentOrPixel(p.cellWidth));
        let paddingRight, paddingLeft;

        Widget.setOrRemoveStyle(mainDiv, 'background-color', p.cellBackgroundColor);

        paddingRight = p.cellPaddingRight !== false ? p.cellPaddingRight : o.paddingRight ? o.paddingRight : false;
        Widget.setOrRemoveMeasure(mainDiv, 'padding-right', paddingRight);

        paddingLeft = p.cellPaddingLeft !== false ? p.cellPaddingLeft : o.paddingLeft ? o.paddingLeft : false;
        Widget.setOrRemoveMeasure(mainDiv, 'padding-left', paddingLeft);

        Widget.setSkin(mainDiv, 'ks-grid-table-cell-', p.cellSkin ? p.cellSkin : p.skin);

        Widget.addOrRemoveClass(mainDiv, 'border-right', p.borderRight);
        Widget.addOrRemoveClass(mainDiv, 'border-left', p.borderLeft);

        Widget.addOrRemoveClass(content, 'ks-pos-' + p.alignment, true);
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