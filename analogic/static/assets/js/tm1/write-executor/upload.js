'use strict';

class UploadWriteExecutor extends WriteExecutor {
    execute() {
        return FileUpload.uploadFile(this.context);
    }
}