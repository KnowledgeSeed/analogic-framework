'use strict';

class ParsingControl {

    constructor(context, ...args) {
        this.context = context;
        this.args = args;
    }

    execute() {
        let response = this.parse();
        if (this.context.triggerParsingControlFinished()) {
            QB.parsingControlFinished(this.context.getWidgetId());
        }
        return response;
    }

    parse() {
        return false;
    }
}