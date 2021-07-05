/* global app, Listeners, QB, Widget */

'use strict';
class SegmentedControlWidget extends Widget {

    getHtml(widgets, d) {
        const v = {
            skin: this.getRealValue('skin', d, 'standard')
        };
        const o = this.options;

        let vv = d ? d : o.widgets.map(e => {return {value: e.value, selected: e.selected, label: e.label}});

        let selected = false, i;
        for(i = 0; i < vv.length; ++i){
            if(vv[i].selected){
                selected = {selected: vv[i].label, value: vv[i].value};
            }
        }
        if(selected === false && vv.length > 0){
            selected = {selected: vv[0].label, value: vv[0].value};
        }

        this.value = selected;

        return `<div class="ks-segmented ks-segmented-${v.skin}"  style="${this.getGeneralStyles(d).join('')}"><div class="ks-segmented-inner">${widgets.join('')}</div></div>`;
    }

    render(withState) {
        const o = this.options, instance = this, h = Listeners.handle;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
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

        Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});

        //rekurzív renderelés, adatbetöltéssel

        return QB.loadData(o.id, instance.name).then(function (data) {
            let deffered = [], w, i = 0, childrenData;

            for (w of widgets) {
                //childrenData = {width: 100 / o.widgets.length, id: o.id, position: i};
                childrenData = {id: o.id, position: i};
                deffered.push(w.embeddedRender(withState, {...childrenData, ...data[i]}));

                ++i;
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;
                return `<section title="${o.title || ''}" ${visible === false ? 'style="display:none"' : 'style="display:contents;"' } id="${o.id}">${instance.getHtml(widgetHtmls, instance.processData(data), withState)}</section>`;
            });
        });
    }

    initEventHandlers(section) {
        section.find('.ks-segment').on('click', (e) => {
            let s = $(e.currentTarget);

            this.value = {selected: s.find('.ks-segment-label').html(), value: s.data('value')};

            let second = $('<div>').data('id', s.data('id')).data('action', 'switch');

            Widget.doHandleSystemEvent(s, e, false);
            Widget.doHandleSystemEvent(second, e, false);
        });

        section.find('a').on('click', e => {
            let s = $(e.target).closest('section').parent().closest('section').find('.ks-segment'), b = false, i, w = $(e.target).closest('a');

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
        return Array.isArray(data) ? data : [];
    }
}
;