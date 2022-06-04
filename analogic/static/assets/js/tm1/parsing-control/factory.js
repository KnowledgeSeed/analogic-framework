/* global Widgets, QB, Repository, Extensions */

'use strict';

class ParsingControlFactory {

    static createExecutor(context, data){

        const widgetId = context.getWidgetId(),
            repositoryObject = context.getRepositoryObject(), p = context.getLoaderFunction();

        let dataContext = {
          getLoaderResponse() {
              return data;
          }
        }, ctx = {...context, ...dataContext};

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
                return new MatrixParsingControl(ctx);
            } else if (t.type === 'list') {
                return new ListParsingControl(ctx);
            } else if (t.type === 'script') {
                return new ScriptParsingControl(ctx);
            } else {
                return new ObjectParsingControl(ctx);
            }
        }
        return new SkipParsingControl(ctx);
    }
}