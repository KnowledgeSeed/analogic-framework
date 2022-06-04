'use strict';

class LoadExecutor {

    constructor(context, ...args) {
        this.context = context;
        this.args = args;
    }

    execute() {

        let conditionFunction = this.context.getConditionFunction(),
            conditionFailedFunction = this.context.getConditionFailedFunction();

        if (conditionFunction && !conditionFunction(this.context, this.context.getWidgetId())) {
            if (conditionFailedFunction) {
                return $.Deferred().resolve(conditionFailedFunction(this.context, this.context.getWidgetId()));
            }
            return Auth.loadDefault(this.context.getWidget);
        }

        return this.loadData();

    }

    loadData() {

        const ctx = this.context, widgetId = ctx.getWidgetId(),
            repositoryObject = ctx.getRepositoryObject();

        let loaderFunctionResult, f, p = ctx.getLoaderFunction();

        if (p && (p.execute || (typeof p === 'function'))) {

            f = typeof p === 'function' ? p : p.execute;

            loaderFunctionResult = f(ctx, widgetId, ctx.getExtraParams(), repositoryObject);

            if (!(loaderFunctionResult instanceof RestRequest)) {

                QB.parsingControlFinished(widgetId);

                return $.Deferred().resolve(loaderFunctionResult);
            }

            if (loaderFunctionResult instanceof LoadExecutor) { //hook point
                return loaderFunctionResult.hook();
            }

            //RestRequest
            p = loaderFunctionResult.getDescription();
        }


        let u = this.getUrl(p), body = p.body(ctx, widgetId, repositoryObject);

        if (p.server) {//Todo ref!
            let mm = QB.getServerSideUrlAndBody(u.url, body, widgetId, ctx.getLoaderFunctionName());
            u.url = mm.url;
            body = mm.body;
        }

        return this.callAjax(u.url, body, u.type, widgetId);
    }

    hook() {

    }

    callAjax(url, body, type, widgetId) {

        let instance = this;

        return Auth.getTm1AjaxRequest(url, body, type, widgetId).then((data) => {
            return instance.handleAjaxResponse(data);
        });

    }

    handleAjaxResponse(data) {

        const ctx = this.context;

        if(data && data.ID) {
            ctx.getRepositoryObject().cellsetId = data.ID;
        }

        return ParsingControlFactory.createExecutor(ctx, data).execute();
    }

    getUrl = p => p.cellsetId && !p.url ? QB.getCellsetUrl(p) : QB.getMDXUrl(p);
}