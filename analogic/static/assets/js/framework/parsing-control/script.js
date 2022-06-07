'use strict';

class ScriptParsingControl extends ParsingControl{

    parse() {
        const ctx = this.context;
        return this.args[0].script(ctx.getLoaderResponse(), ctx.getWidgetId(), ctx.getRepositoryObject(), ctx);
    }
}