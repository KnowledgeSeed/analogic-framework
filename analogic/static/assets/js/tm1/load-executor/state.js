'use strict';

class StateLoadExecutor extends LoadExecutor {

    loadData() {
        let repositoryObject = this.context.getRepositoryObject();

        return $.Deferred().resolve(repositoryObject.state(this.context.getWidgetId()));
    }
}