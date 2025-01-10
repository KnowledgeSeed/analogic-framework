'use strict';

class ImageUploadWriteExecutor extends WriteExecutor {
    execute() {
        return Server.uploadImage(this.context);
    }
}