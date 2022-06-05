'use strict';

class SkipLoadExecutor extends LoadExecutor {

    execute() {
        return $.Deferred().resolve('');
    }
}