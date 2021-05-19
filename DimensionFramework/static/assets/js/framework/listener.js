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
    }
};