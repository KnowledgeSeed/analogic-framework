/* global Widgets, QB, Repository, Extensions */

'use strict';

class ParsingControlFactory {

    static createExecutor(context, data){

        const widgetId = context.getWidgetId(),
            repositoryObject = context.getRepositoryObject(), p = context.getRestRequest() !== false ? context.getRestRequest() : context.getLoaderFunction();

        let ctx = Object.create(context);
        ctx.getLoaderResponse = () => {
            return data;
        };

        if(isClass(p.parsingControl)){
            return new p.parsingControl(ctx); //Todo check
        }

        if (p.parsingControl instanceof ParsingControl) {
            return p.parsingControl; // Todo check
        }

        let t = (typeof p.parsingControl === 'function') ? p.parsingControl(ctx, widgetId, repositoryObject) : p.parsingControl;

        if (t instanceof ParsingControl) { //hook point for overriding
            return t;
        }

        if (t) {
            if (t.type === 'matrix') {
                return new MatrixParsingControl(ctx, t);
            } else if (t.type === 'list') {
                return new ListParsingControl(ctx, t);
            } else if (t.type === 'script') {
                return new ScriptParsingControl(ctx, t);
            } else {
                return new ObjectParsingControl(ctx, t);
            }
        }
        return new SkipParsingControl(ctx);
    }
}