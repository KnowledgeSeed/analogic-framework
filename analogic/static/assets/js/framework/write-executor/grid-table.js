'use strict';

class GridTableWriteExecutor extends WriteExecutor {
    execute() {
        let splitIds = this.context.getGridTableSplitIds();

        if (splitIds.length > 3) {
            this.context.getObject().cellsetId = Repository[splitIds[0]].cellsetId;
        }

        return super.execute();
    }

    callValidate() {
        return this.context.getEventHandler().validation(
            this.context,
            this.context.getCell(),
            this.context.getEventValues(),
            this.context.getRow(),
            this.context.getColumn());
    }

    callExecuteRepositoryFunction() {
        this.context.getEventHandler().execute(
            this.context,
            this.context.getCell(),
            this.context.getEventValues(),
            this.context.getRow(),
            this.context.getColumn(),
            this.context.getJQueryEvent(),
            this.context.getJQueryElement());
    }

    triggerRepositoryFinished(response = {}) {
        super.triggerRepositoryFinished(response);
        QB.executeEventMapAction(
            this.context.getGridTableOriginalEventMapId() + '.finished',
            this.context,
            response);
    }

    getRestBody() {
        return this.context.getEventHandler().body(
            this.context,
            this.context.getCell(),
            this.context.getEventValues(),
            this.context.getRow(),
            this.context.getColumn(),
            this.context.getJQueryEvent(),
            this.context.getJQueryElement());
    }

    getRestUrl(ctx) {
        return this.context.getEventHandler().url(
            ctx,
            this.context.getCell(),
            this.context.getEventValues(),
            this.context.getRow(),
            this.context.getColumn());
    }

    getRestType() {
        return this.context.getEventHandler().type(
            this.context,
            this.context.getCell(),
            this.context.getEventValues(),
            this.context.getRow(),
            this.context.getColumn());
    }
}