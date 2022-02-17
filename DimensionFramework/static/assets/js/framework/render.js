/* global app, El, Listeners, Loader, QB, PageState, WidgetConfig */

class Render {
    static showPage(page, withState = false) {
        let widget = new WidgetConfig[page].type(WidgetConfig[page]), s = PageState;
        s.previous = s.current;
        s.current = page;
        s[s.previous] = El.body.clone();

        Render.renderWidget(null, El.body, widget, withState);
    }

    static updateContent(event) {
        let widget = new event.data.options.type(event.data.options);
        widget.updateContent(event).then((r) =>{
            L(event.data.options.id, 'update done');
            if('rendered' !== r) {
                widget.updateContentFinished();
            }
        });
    }

    static renderWidget(event, holder, widget, withState = false, withLoader = true, previouslyLoadedData = false) {
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
            widget.render(withState, refresh, false, QB.loadData, previouslyLoadedData).then(html => {
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
                            El.body.on(i.eventName, {
                                options: i.options,
                                method: i.method,
                                parameters: i.parameters
                            }, i.handler);
                        }
                        El.body.trigger('bodyReady');//backward compatibility
                        if (!withState) {
                            widget.initFinished();
                        }
                    } else {
                        for (i of Listeners.filter(e => e.method === 'refreshGridCell' && e.options.id.includes(holder.attr('id')))) {
                            let event = i.eventName.split('.')[0];
                            if ($._data(El.body[0], "events")[event].filter(e => e.data.method === 'refreshGridCell' &&
                                e.data.options.id === i.options.id).length === 0) {
                                El.body.on(i.eventName, {
                                    options: i.options,
                                    method: i.method,
                                    parameters: i.parameters
                                }, i.handler);
                            }
                        }
                        if (!withState) {
                            El.body.trigger('rendered.' + widgetId);//backward compatibility
                            widget.refreshFinished();
                        }
                    }

                    app.fn.showToolTipsChanged();

                    withLoader && Loader.stop();
                });
            });
        });

        return 'rendered';
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