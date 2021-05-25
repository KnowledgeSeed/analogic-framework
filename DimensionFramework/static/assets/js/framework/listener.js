/* global app, El, Render */

const Listeners = [];

Listeners.handle = ev => {
    const m = ev.data.method;

    if ('refresh' === m) {
        Render.renderWidget(ev);
    } else if ('refreshWithoutLoader' === m) {
        Render.renderWidget(ev, false, false, false, false);
    } else if ('refreshGridCell' === m) {
        Render.refreshGridCell(ev);
    } else if ('refreshWithWaitingForEvent' === m) {
        let eventName = ev.data.parameters[0];
        let widgetId = ev.data.options.id;

        El.body.on(eventName, () => {
            El.body.off(eventName);
            app.fn.forceRefresh(widgetId);
        });
    } else if ('refreshWithState' === m) {
        Render.renderWidget(ev, null, null, true);
    } else if ('show' === m) {
        $('#' + ev.data.options.id).show();
    } else if ('hide' === m) {
        $('#' + ev.data.options.id).hide();
    } else if('refreshWithTimeout' === m) {
        let seconds = ev.data.parameters[0];
        setTimeout(function(){ Render.renderWidget(ev); }, seconds);
    }  else if ('refreshWithWaitingForEvents' === m) {
        let events = ev.data.parameters;
        let widgetId = ev.data.options.id, i;
        WidgetValue[widgetId + 'eventsfired'] = events.map((e) => {return {name: e, fired: false};});
        for(i = 0; i < events.length; ++i) {
            const eventName = events[i];
            El.body.on(eventName, () => {
                El.body.off(eventName);
                let index = WidgetValue[widgetId + 'eventsfired'].findIndex(e => e.name === eventName);
                WidgetValue[widgetId + 'eventsfired'][index].fired = true;
                let c = WidgetValue[widgetId + 'eventsfired'].filter(d => d.fired === false).length;
                if(c === 0) {
                    app.fn.forceRefresh(widgetId);
                }
            });
        }
    } else if ('renderPage' === m) {
        let holder = $('#' + ev.data.options.id);
        let widget = new ev.data.options.type(ev.data.options);
        holder.html(widget.renderPage());
        widget.initEvents();
    }
};