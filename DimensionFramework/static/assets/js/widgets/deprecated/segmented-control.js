/* global app, Listeners, QB, Widget */

'use strict';
class OldSegmentedControlWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options, w = o.width ? Math.round((o.width / 100) * 12) : 3;

        return `
<div class="row">
    <div class="col-${w}">
        <div class="widget-segmented-control-holder">
            <div class="widget-segmented-control segment-2">${widgets.join('')}</div>
            <div class="tooltip-icon" data-title="${o.tooltipTitle}" data-tooltip="${o.tooltip}"><span class="icon-info"></span></div>
        </div>
    </div>
</div>`;
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
            let deffered = [], w, i = 0;

            for (w of widgets) {
                let childrenData = {width: 100 / o.widgets.length, id: o.id, position: i};
                deffered.push(w.embeddedRender(withState, childrenData));
                ++i;
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && data.visible ? data.visible : o.visible;

                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" ${visible === false ? 'style="display:none"' : '' } id="${o.id}">${instance.getHtml(widgetHtmls, instance.processData(data), withState)}</section>`;
            });
        });
    }

    initEventHandlers(section) {
        Widget.handleSystemEvent(section, 'click', '.segment');

        $('.segment').on('click', e => {
            e = $(e.target);
            e.closest('section').parent().closest('section').find('.segment').removeClass('on');
            e.addClass('on');
        });
    }
}
;