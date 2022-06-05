'use strict';

class WriteExecutor {
    constructor(context, ...args) {
        this.context = context;
        this.args = args;
    }

    execute() {
        let eventHandler = this.context.getEventHandler();

        if (!this.validate()) {
            return false;
        }

        if (eventHandler.execute) {
            this.triggerExecuteRepositoryFunction();
        } else {
            this.triggerRestRequest();
        }
        return true;
    }

    validate() {
        let eventHandler = this.context.getEventHandler();

        if (eventHandler.validation) {

            let r = this.callValidate();

            if (!r.success) {
                if (r.widget) {
                    let input = $('#' + r.widget).find('.ks-textbox-field');

                    if (input.hasClass('input-error')) {
                        return false;
                    }

                    if (input) {
                        input.addClass('input-error');
                    }

                    let secondary = $('#' + r.widget).find('.ks-textbox-title-secondary');
                    secondary.html(r.message);
                } else {
                    if (r.message) {
                        app.popup.show(r.message);
                    }
                }

                return false;
            } else {
                let widgetId = this.context.getWidgetId(),
                    input = $('#' + widgetId).find('.ks-textbox-field');

                if (input) {
                    input.removeClass('input-error');
                }

                $('#' + widgetId).find('.ks-textbox-title-secondary').html('');
            }
        }
        return true;
    }

    callValidate() {
        return this.context.getEventHandler().validation(this.context);
    }

    triggerExecuteRepositoryFunction() {
        let eventHandler = this.context.getEventHandler(), ctx = this.context;

        this.callExecuteRepositoryFunction();

        this.triggerRepositoryFinished();

        if (eventHandler.callback) {
            eventHandler.callback({
                ...{
                    getResponse() {
                        return '';
                    }, ...ctx
                }
            });
        }
    }

    callExecuteRepositoryFunction() {
        this.context.getEventHandler().execute(
            this.context,
            this.context.getJQueryEvent(),
            this.context.getJQueryElement());
    }

    triggerRepositoryFinished(response = {}) {

        QB.executeEventMapAction(
            this.context.getEventMapId() + '.finished',
            this.context,
            response);
    }

    triggerRestRequest() {
        let ctx = this.context, cellsetId = ctx.getObject().cellsetId || '',
            body = this.getRestBody(),
            url = this.getRestUrl({...ctx.getObject(), ...{cellsetId: cellsetId}}),
            widgetId = ctx.getWidgetId(),
            eventName = ctx.getEventName(),
            eventHandler = ctx.getEventHandler(),
            instance = this
        ;

        if (eventHandler.server) {
            let mm = QB.getServerSideUrlAndBody(url, body, widgetId, eventName);
            url = mm.url;
            body = mm.body;
        }


        let type;
        if (typeof eventHandler.type === 'function') {
            type = this.getRestType();
        } else {
            type = eventHandler.type;
        }
        Loader.start(true);
        Auth.getTm1AjaxRequest(app.tm1ApiHost + url, body, type, widgetId).then((d) => {
            Loader.stop(true);
            L('finished after ajax');
            instance.triggerRepositoryFinished(d);
            if (eventHandler.callback) {
                eventHandler.callback({
                    ...{
                        getResponse() {
                            return d;
                        }, ...ctx
                    }
                });
            }
        });
    }


    getRestBody() {
        return this.context.getEventHandler().body(
            this.context,
            this.context.getJQueryEvent(),
            this.context.getJQueryElement());
    }

    getRestUrl(ctx) {
        return this.context.getEventHandler().url(ctx);
    }

    getRestType() {
        return this.context.getEventHandler().type(this.context);
    }
}