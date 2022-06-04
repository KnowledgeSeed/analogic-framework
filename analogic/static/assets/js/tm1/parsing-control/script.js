'use strict';

class ScriptParsingControl extends ParsingControl{

    parse() {
        const ctx = this.context;
        ctx.getLoaderFunction().parsingControl.script(ctx.getLoaderResponse(), ctx.getWidgetId(), ctx.getRepositoryObject(), ctx);
    }
}