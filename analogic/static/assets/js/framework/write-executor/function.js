'use strict';

class FunctionWriteExecutor extends WriteExecutor {
    execute() {
        let result = Repository[this.context.getWidgetId()][this.context.getEventName()](this.context);

        if (result instanceof WriteExecutor) {
            return result.execute(this.context);
        }

        if (result instanceof RestRequest) {
            this.context.getEventHandler = () => {
                return result.getDescription();
            }
            return new WriteExecutor(this.context).execute();
        }

        return $.Deferred().resolve({
                writeExecutorType: 'function',
                context: this.context,
                response: result
            }
        );
    }
}