'use strict';

class WriteExecutorFactory {
    static createExecutor() {
        return new UploadWriteExecutor();
    }
}