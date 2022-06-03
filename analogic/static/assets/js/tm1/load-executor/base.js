'use strict';

class LoadExecutor {
    constructor(context, ...args) {
        this.context = context
        this.args = args
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

        this.loadData();

    }

    loadData() {

    }
}