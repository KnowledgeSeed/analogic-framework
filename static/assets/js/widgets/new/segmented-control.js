/* global Widget */

'use strict';
class SegmentedControlWidget extends Widget {

    getHtml(widgets, d) {
        const v = {
            skin: this.getRealValue('skin', d, 'standard')
        };
        let mainDivStyle = this.getGeneralStyles(d);
        this.value = {};

        return `<div class="ks-segmented ks-segmented-${v.skin}"  style="${mainDivStyle.join('')}">
                    <div class="ks-segmented-inner">
                        ${widgets.join('')}
                    </div>
                </div>`;

    }

    render(withState) {
        const o = this.options;
        const instance = this;


        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                app.listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        app.listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: app.fn.handleListener});

        //rekurzív renderelés, adatbetöltéssel

        return app.fn.loadData(o.id, instance.constructor.name).then(function (data) {
            let deffered = [], w, i = 0;

            for (w of widgets) {
                //   let childrenData = {width: 100 / o.widgets.length, id: o.id, position: i};
                let childrenData = {id: o.id, position: i};
                deffered.push(w.embeddedRender(withState, childrenData));
                ++i;
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                let visible = data && typeof data.visible !== "undefined" ? data.visible : o.visible;
                return `<section title="${o.title || ''}" ${visible === false ? 'style="display:none"' : 'style="display:contents;"' } id="${o.id}">${instance.getHtml(widgetHtmls, instance.processData(data), withState)}</section>`;
            });
        });
    }

    initEventHandlers(section) {
        
        section.find('.ks-segment').on('click', (e) => {
            let s = $(e.currentTarget);
            this.value = {selected: s.find('.ks-segment-label').html(), value: s.data('value')};
            let second = $('<div></div>').data('id', s.data('id')).data('action', 'switch');
            Widget.doHandleSystemEvent(s, e, false);
            Widget.doHandleSystemEvent(second, e, false);
        });

        section.find('a').on('click', (e) => {
            let s = $(e.target).closest('section').parent().closest('section').find('.ks-segment'), b = false, i, w = $(e.target).closest('a');
            $(e.target).closest('section').parent().closest('section').find('.ks-segment').removeClass('ks-on').removeClass('ks-right').removeClass('ks-left');
            w.addClass('ks-on');
            for(i = 0; i < s.length; ++i){
                if($(s[i]).attr('id') === w.attr('id')){
                    b = true;
                }else{
                    b ? $(s[i]).addClass('ks-right') : $(s[i]).addClass('ks-left');
                }
            }
        });
    }
}
;