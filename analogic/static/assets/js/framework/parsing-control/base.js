'use strict';

class ParsingControl {

    constructor(context, ...args) {
        this.context = context;
        this.args = args;
    }

    execute() {
        try {
            let response = this.parse();
            if (this.context.triggerParsingControlFinished()) {
                QB.parsingControlFinished(this.context.getWidgetId());
            }
            return response;
        } catch (e) {
            app.handleJsError(e, this.context.getWidgetId(), this.context.getLoaderFunctionName(), 'Error in parsing');
        }
    }

    parse() {
        return false;
    }
}