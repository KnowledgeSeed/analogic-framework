'use strict';

class PivotLoadExecutor extends LoadExecutor {

    execute() {
        const loaderFunction = this.context.getLoaderFunction();
        return Pivot.call(loaderFunction).then(d => d);
    }
}