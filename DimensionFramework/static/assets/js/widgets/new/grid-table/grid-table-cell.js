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

        return `<div id="${v.cellId}" class="ks-grid-table-cell ${v.cellSkin !== false ? 'ks-grid-table-cell-' + v.cellSkin : ''} ${v.cellSkin === false ? 'ks-grid-table-cell-' + v.skin : ''} ${v.borderRight ? 'border-right' : ''} ${v.borderLeft ? 'border-left' : ''}" style="${mainDivStyle.join('')}"><div class="ks-grid-table-cell-border-left"></div><div class="ks-pos-${v.alignment} ks-grid-table-cell-content">${widgets.join('')}</div></div>`;
    }

    getParameters(data) {
        return {
            alignment: this.getRealValue('alignment', data, 'center-center',),
            borderLeft: this.getRealValue('borderLeft', data, false),
            borderRight: this.getRealValue('borderRight', data, false),
            cellBackgroundColor: this.getRealValue('cellBackgroundColor', data, false),
            cellVisible: this.getRealValue('cellVisible', data, true),
            skin: this.getRealValue('skin', data, 'standard'),
            cellId: this.getRealValue('cellId', data, false),
            cellSkin: this.getRealValue('cellSkin', data, false),
            cellWidth: this.getRealValue('cellWidth', data, false),
            width: this.getRealValue('width', data, 30)
        };
    }

    initEvents(withState) {
        const o = this.options, section = $('#' + o.id);

        let widgetOptions, widgets = [], w;

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type({...widgetOptions, ...{id: o.id}}));
        }

        for (w of widgets) {
            w.initEvents(withState);
        }

        this.initEventHandlers(section, withState);
    }

    updateContent(event,data = false, loadFunction = QB.loadData) {
        const o = this.options, instance = this;
        let widgetOptions, childrenData, deferred = [];

        for (widgetOptions of o.widgets || []) {
            childrenData = {...widgetOptions, ...data};
            childrenData['originalId'] = widgetOptions['id'];
            deferred.push(new widgetOptions.type(childrenData).updateContent(event, childrenData));
        }

        return $.when.apply($, deferred).then(function () {
            instance.updateHtml(childrenData);
        });
    }

    updateHtml(data) {
        const o = this.options, p = this.getParameters(data), mainDiv = $('#' + p.cellId);
        p.cellVisible === false ? mainDiv.css('display', 'none') : mainDiv.css('display', 'block') ;
        p.cellWidth && mainDiv.css('width', Widget.getPercentOrPixel(p.cellWidth));
        p.cellBackgroundColor && mainDiv.css('background-color', p.cellBackgroundColor);
    }

    render(withState, childrenData) {
        const o = {...this.options, ...childrenData}, instance = this, h = Listeners.handle;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            childrenData['originalId'] = widgetOptions['id'];
            widgets.push(new widgetOptions.type({...widgetOptions, ...childrenData}));
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

        //  Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});

        return QB.loadData(o.id, instance.name).then(function (data) {
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