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
            console.error('Error in parsing for widget "' + this.context.getWidgetId() + '" (function: ' + this.context.getLoaderFunctionName() + '):', e);
            throw e;
        }
    }

    parse() {
        return false;
    }
}