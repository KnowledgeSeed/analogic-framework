'use strict';

class SkipWriteExecutor extends WriteExecutor {
    execute() {
        QB.executeEventMapAction(this.context.getEventMapId() + '.finished', this.context);
        return true;
    }
}