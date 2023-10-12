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
            return Auth.loadDefault(this.context.getWidgetTypeName());
        }

        return this.loadData();

    }

    parsingControlFinished(widgetId) {
        if (this.context.triggerParsingControlFinished()) {
            QB.parsingControlFinished(widgetId);
        }
    }

    loadData() {

        const ctx = this.context, widgetId = ctx.getWidgetId(),
            repositoryObject = ctx.getRepositoryObject();

        let loaderFunctionResult, p = ctx.getLoaderFunction();

        if (p && (p.execute || (typeof p === 'function'))) {

            if (typeof p === 'function') {
                const rw = ctx.getReferenceWidgetId() ? ctx.getReferenceWidgetId() : widgetId;
                loaderFunctionResult = Repository[rw][ctx.getLoaderFunctionName()](ctx, widgetId, ctx.getExtraParams(), repositoryObject);
            } else {
                loaderFunctionResult = p.execute(ctx, widgetId, ctx.getExtraParams(), repositoryObject);
            }

            if (!(loaderFunctionResult instanceof RestRequest)) {

                this.parsingControlFinished(widgetId);

                return $.Deferred().resolve(loaderFunctionResult);
            } else {
                p = loaderFunctionResult.getDescription();
                ctx.getRestRequest = () => {
                    return p;
                };
            }

            if (loaderFunctionResult instanceof LoadExecutor) { //Todo hook point
                return loaderFunctionResult.hook();
            }

        }


        let u = this.getUrl(p), body = p.body ? p.body(ctx, widgetId, repositoryObject) : {};

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

        return Auth.getAjaxRequest(url, body, type, widgetId).then((data) => {
            return instance.handleAjaxResponse(data);
        });

    }

    handleAjaxResponse(data) {

        const ctx = this.context;


        if (data && data.ID) {
            const loaderFunctionNames = ctx.getLoaderFunctionName().split('_');
            if (loaderFunctionNames.length > 1 && Array.isArray(ctx.getRepositoryObject()[loaderFunctionNames[0]])) {
                const index = parseInt(loaderFunctionNames[1]) - 1;
                ctx.getRepositoryObject()[loaderFunctionNames[0]][index].cellsetId = data.ID;
            } else {
                ctx.getRepositoryObject().cellsetId = data.ID;
            }
        }

        if (!this.context.runParsingControl()) {
            return data;
        }

        return ParsingControlFactory.createExecutor(ctx, data).execute();
    }

    getUrl = p => {
        if (p.url) {
            const url = (typeof p.url === 'function' ? p.url(Widgets) : p.url);
            return {
                url: QB.getUrl(url, p.source),
                type: p.type ? p.type : 'POST'
            };
        }

        L('error: url not found', p);

        return {url: '', type: p.type ? p.type : 'POST'};
    };
}