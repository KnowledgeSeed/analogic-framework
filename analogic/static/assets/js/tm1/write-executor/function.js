'use strict';

class FunctionWriteExecutor extends WriteExecutor {
    execute() {
        let eventHandler = this.context.getEventHandler(),
            result = eventHandler(this.context);

        if (result instanceof WriteExecutor) {
            return result.execute(this.context);
        }

        return true;
    }
}