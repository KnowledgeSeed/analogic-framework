'use strict';

class DownloadWriteExecutor extends WriteExecutor {
    execute() {
        return Server.download(this.context.getEventHandler().download(this.context));
    }
}