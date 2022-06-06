'use strict';

class DefaultLoadExecutor extends LoadExecutor {

    execute() {
        return Auth.loadDefault(this.context.getWidgetTypeName());
    }
}