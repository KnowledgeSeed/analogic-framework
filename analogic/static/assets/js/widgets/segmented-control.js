/* global app, Listeners, QB, Widget */

'use strict';

class SegmentedControlWidget extends Widget {

    getHtml(widgets, d) {
        const v = {
            skin: this.getRealValue('skin', d, 'standard')
        };
        const o = this.options;

        let vv = d ? d : o.widgets.map(e => {
            return {value: e.value, selected: e.selected, label: e.label}
        });

        let selected = false, i;
        for (i = 0; i < vv.length; ++i) {
            if (vv[i].selected) {
                selected = {selected: vv[i].label, value: vv[i].value};
            }
        }
        if (selected === false && vv.length > 0) {
            selected = {selected: vv[0].label, value: vv[0].value};
        }

        if (selected) {
            this.selected = selected.selected;
            this.value = selected.value;
        }

        return `<div class="ks-segmented ks-segmented-${v.skin}"  style="${this.getGeneralStyles(d).join('')}"><div class="ks-segmented-inner">${widgets.join('')}</div></div>`;
    }

    embeddedRender(withState, data, loadFunction = QB.loadData) {
        this.isRendering = true;
        const o = {...this.options, ...data}, instance = this, h = Listeners.handle;

        let widgetOptions, widgets = [], i = 0, childrenData, w, widgetHtmls = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(this.getWidget(widgetOptions));
        }

        for (w of widgets) {
            childrenData = {id: o.id, position: i, originalId: w.id};
            widgetHtmls.push(w.embeddedRender(withState, {...childrenData, ...data[i]}));

            ++i;
        }

        this.addListeners(false);

        if (new o.type(o).amIOnAGridTable()) { //Todo check
            Listeners.push({options: o, method: 'refreshGridCell', eventName: 'forcerefresh.' + o.id, handler: h});
        }

        let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;

        return instance.getMainHtmlElement(o, data, visible, widgetHtmls, withState)
    }

    render(withState) {
        this.isRendering = true;
        const o = this.options, instance = this;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(this.getWidget(widgetOptions));
        }

        this.addListeners(false);

        return QB.loadData(o.id, instance.name).then(function (data) {
            let deferred = [], w, i = 0, childrenData,
                widgetData = Array.isArray(data) ? data : (data && data.data) ? data.data : [];

            for (w of widgets) {
                childrenData = {id: o.id, position: i, originalId: w.id};
                deferred.push(w.embeddedRender(withState, {...childrenData, ...widgetData[i]}));

                ++i;
            }

            return $.when.apply($, deferred).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;
                return `<section title="${o.title || ''}" ${visible === false ? 'style="display:none"' : 'style="display:contents;"'} id="${o.id}">${instance.getHtml(widgetHtmls, instance.processData(data), withState)}</section>`;
            });
        });
    }

    initEventHandlers() {

        const section = this.getSection();

        section.find('.ks-segment').on('click', (e) => {
            let s = $(e.currentTarget);

            this.selected = s.find('.ks-segment-label').html();
            this.value = s.data('value');

            let second = $('<div>').data('id', s.data('id')).data('action', 'switch');

            Widget.doHandleSystemEvent(s, e, false);
            Widget.doHandleSystemEvent(second, e, false);
            if (this.amIOnAGridTable()) {
                Widget.doHandleGridTableSystemEvent(s, e);
                Widget.doHandleGridTableSystemEvent(second, e);
            }
        });

        section.find('a').on('click', e => {
            let s = $(e.target).closest('section').parent().closest('section').find('.ks-segment'), b = false, i,
                w = $(e.target).closest('a');

            $(e.target).closest('section').parent().closest('section').find('.ks-segment').removeClass('ks-on').removeClass('ks-right').removeClass('ks-left');

            w.addClass('ks-on');

            for (i = 0; i < s.length; ++i) {
                e = $(s[i]);

                if (e.attr('id') === w.attr('id')) {
                    b = true;
                } else {
                    b ? e.addClass('ks-right') : e.addClass('ks-left');
                }
            }
        });
    }

    processData(data) {
        return Array.isArray(data) ? data : (data && data.data) ? data.data : [];
    }

    reset() {
        delete this.selected;
        delete this.value;
    }
}
;