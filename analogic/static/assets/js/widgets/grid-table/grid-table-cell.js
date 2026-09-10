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
        if (data === false) {
            if (!this._cellData) return Promise.resolve('update');
            const loader = loadFunction === QB.loadData ? QB.refreshGridCellData : loadFunction;
            return Promise.resolve(loader(this._cellData.id, this.name)).then(next => this.updateContent({...this._cellData, ...next}));
        }
        this._cellData = {...data};
        const o = this.options;
        let widgetOptions, childrenData = data, pending = [];

        for (widgetOptions of o.widgets || []) {
            childrenData = {...widgetOptions, ...data};
            childrenData['originalId'] = widgetOptions['id'];
            const child = Widgets[childrenData.id];
            child.updateSectionAttributes(childrenData);
            pending.push(child.updateHtml(childrenData));
        }
        this.dynamicTooltip = (childrenData || {}).tooltip;
        return Promise.all(pending).then(() => { this.updateHtml(childrenData); return 'update'; });
    }

    updateHtml(data) {
        data = {...data};
        delete data['skin'];
        const p = this.getParameters(data);

        // Everything getHtml() can produce on the cell wrapper and its structural
        // `-content` div (background, width, padding, skin, border classes, alignment)
        // is applied by diffing against a fresh render. `widgets: []` is safe here even
        // though the cell's actual child widget lives inside `.ks-grid-table-cell-
        // content` - morphChildren never removes a node it recognizes as another
        // widget's own root (checked via `Widgets[id]`), and that child already updated
        // itself in place via updateContent's own loop before this method runs.
        const cell = $('#' + p.cellId);
        // Selection and keyboard navigation metadata belong to GridTable's event
        // handlers, not to this cell's render template.
        const runtimeClasses = ['selected', 'active-cell'].filter(c => cell.hasClass(c));
        const row = cell.attr('data-row'), col = cell.attr('data-col');
        this.morphHtml(cell, this.getHtml([], data));
        cell.addClass(runtimeClasses.join(' '));
        if (row !== undefined) cell.attr('data-row', row);
        if (col !== undefined) cell.attr('data-col', col);
    }

    render(withState, childrenData) {
        this._cellData = {...childrenData};
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
