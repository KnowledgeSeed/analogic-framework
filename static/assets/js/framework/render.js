/* global app, El, Listeners, Loader, QB, PageState, WidgetConfig */

class Render {
    static showPage(page, withState = false) {
        let widget = new WidgetConfig[page].type(WidgetConfig[page]), s = PageState;
        s.previous = s.current;
        s.current = page;
        s[s.previous] = El.body.clone();

        Render.renderWidget(null, El.body, widget, withState);
    }

    static renderWidget(event, holder, widget, withState = false, withLoader = true) {
        withLoader && Loader.start();

        Listeners.length = 0;

        const refresh = !!event;

        let widgetId, holderHeight = 0;

        holder = holder || $('#' + event.data.options.id);
        widget = widget || new event.data.options.type(event.data.options);

        if (refresh) {
            widgetId = event.data.options.id;
            holderHeight = holder.actual('height');
        }

        holder.empty().off().promise().then(() => {
            widget.render(withState, refresh).then(html => {
                let isHeightUpdated = false, h = $(html), i;

                if (holderHeight > 0) {
                    isHeightUpdated = true;
                    holder.css({opacity: 0, 'min-height': holderHeight});
                }

                holder.html(h.html()).promise().then(() => {
                    if (!holder.hasClass('forcedByEventMap')) {
                        holder.css('display', h.css('display') !== '' ? h.css('display') : 'unset');
                    }

                    if (isHeightUpdated) {
                        holder.css('opacity', 1);
                    }

                    widget.initEvents(withState && refresh);

                    if (!refresh) {
                        for (i of Listeners) {
                            El.body.on(i.eventName, {options: i.options, method: i.method, parameters: i.parameters}, i.handler);
                        }
                        El.body.trigger('bodyReady');
                    } else {
                        El.body.trigger('rendered.' + widgetId);
                    }

                    app.fn.showToolTipsChanged();

                    withLoader && Loader.stop();
                });
            });
        });
    }

    static refreshGridCell(event, withState = false) {
        Listeners.length = 0;

        const refresh = !!event;

        let widgetId, holderHeight = 0;

        let holder = $('#' + event.data.options.id);
        let widget = new event.data.options.type(event.data.options);

        widgetId = event.data.options.id;
        holderHeight = holder.actual('height');

        holder.empty().off().promise().then(() => {
            widget.render(withState, true, false, QB.refreshGridCellData).then(html => {
                let isHeightUpdated = false;

                if (holderHeight > 0) {
                    isHeightUpdated = true;
                    holder.css({opacity: 0, 'min-height': holderHeight});
                }

                holder.html($(html).html()).promise().then(() => {
                    if (isHeightUpdated) {
                        holder.css('opacity', 1);
                    }

                    widget.initEvents(withState && refresh);

                    El.body.trigger('rendered.' + widgetId);

                    app.fn.showToolTipsChanged();
                });
            });
        });
    }
}