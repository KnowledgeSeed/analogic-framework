/* global app, El, Render */

const Listeners = [];

Listeners.handle = ev => {
    const method = ev.data.method, widgetId = ev.data.options.id, parameters = ev.data.parameters;
    if (parameters && parameters.length > 0) {
        Api[method]([widgetId].concat(parameters));
    } else {
        Api[method](widgetId);
    }
};