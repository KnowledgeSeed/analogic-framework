/* global app, El, Loader, QB, Repository, Utils, WidgetValue */

FileUpload = {};

FileUpload.uploadFile = (w, eventMapId, context) => {
    const e = 'upload', r = Repository[w], v = WidgetValue[w];
    let target = false, staging = false, uploadParams = {}, uploadRepoExist = r && r[e], subFolder = '';

    if (uploadRepoExist) {
        uploadParams = r[e](context);
        if (uploadParams.target) {
            target = uploadParams.target;
        }
        if (uploadParams.staging) {
            staging = uploadParams.staging;
        }
    }

    if (target === false && v.target) {
        target = v.target;
    }

    if (staging === false && v.staging) {
        staging = v.staging;
    }

    if (target === false) {
        app.fn.showPopup('Please provide unc target path for uploading!');
        El.body.triggerHandler(eventMapId + '.pathError');
        return false;
    }

    if (uploadRepoExist) {
        for (const [key, value] of Object.entries(uploadParams)) {
            if (key !== 'staging' && key !== 'target') {
                v.form.append(key, value);
            }
        }
    }

    v.form.append('target', target);
    v.form.append('staging', staging === false ? '' : staging);
    subFolder = staging === false ? '' : Utils.create_UUID();
    v.form.append('subFolder', subFolder);

    Loader.start();

    FileUpload.uploadToServer(w).done(d => {
        if (d === 'ok') {
            El.body.triggerHandler(eventMapId + '.finished');
            v.form = new FormData();
            app.fn.showPopup(v.uploadSuccessMessage);
        } else {
            app.fn.showPopup(d);
        }
    }).fail(() => {
        app.fn.showPopup('Upload failed');
    }).always(() => {
        v.form = new FormData();
        Loader.stop();
    });

    return true;

};

/*FileUpload.uploadFile2 = (w, eventMapId, context) => {
    const e = 'upload', r = Repository[w], v = WidgetValue[w];
    let path = false, uploadParams = {}, uploadRepoExist = r && r[e], isTarget = true, subFolder = '';

    if (uploadRepoExist) {
        uploadParams = r[e](context);
        if (uploadParams.path) {
            path = uploadParams.path;
            if (r.move) {
                isTarget = false;
            }
        }
    }

    if (path === false && v.target) {
        path = v.target;
    }

    if (path === false && v.staging) {
        path = v.staging;
        isTarget = false;
    }

    if (path === false) {
        app.fn.showPopup('Please provide unc path for uploading!');
        El.body.triggerHandler(eventMapId + '.pathError');
        return false;
    }

    if (uploadRepoExist) {
        for (const [key, value] of Object.entries(uploadParams)) {
            if (key !== 'path') {
                v.form.append(key, value);
            }
        }
    }
    v.form.append('path', path);
    v.form.append('mode', 'upload');
    subFolder = isTarget ? '' : Utils.create_UUID();
    v.form.append('subFolder', subFolder);
    v.subFolder = subFolder;
    v.moveSource = path;

    Loader.start();

    FileUpload.uploadToServer(w).done(d => {
        if (d === 'ok') {
            El.body.triggerHandler(eventMapId + '.finished');
            v.form = new FormData();
            FileUpload.preProcessUploadedFile(w);
        } else {
            app.fn.showPopup(d);
        }
    }).fail(() => {
        app.fn.showPopup('Upload failed');
    }).always(() => {
        v.form = new FormData();
        Loader.stop();
    });

    return true;
};*/

FileUpload.uploadToServer = widgetId => {
    return $.ajax({
        xhr: function () {
            let xhr = new window.XMLHttpRequest();

            xhr.upload.addEventListener('progress', function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(((evt.loaded / evt.total) * 100));
                    $('#' + widgetId).find('.progress-bar').html(percentComplete + '%');
                }
            }, false);

            return xhr;
        },
        url: 'upload',
        method: 'POST',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: WidgetValue[widgetId].form
    });
};
/*
FileUpload.preProcessUploadedFile = w => {
    let eventMapId = 'preProcessing.' + w;

    $('#' + w).find('.progress-bar').html('Preprocessing...');

    El.body.on(eventMapId + '.finished', {}, function () {
        $('#' + w).find('.progress-bar').html('Preprocessing finished');
        FileUpload.moveUploadedFile(w);
        El.body.off(eventMapId + '.finished');
    });

    QB.writeData(eventMapId);
};

FileUpload.moveUploadedFile = w => {
    const e = 'move', eventMapId = e + '.' + w, r = Repository[w], v = WidgetValue[w];
    let path = false, uploadParams = {}, moveRepoExist = r && r[e], subFolder = v.subFolder;

    if (moveRepoExist) {
        uploadParams = r[e](WidgetValue);
        if (uploadParams.path) {
            path = uploadParams.path;
        }
    }

    if (path === false && v.target) {
        path = v.target;
    }

    if (path === false) {
        FileUpload.postProcessUploadedFile(w);
        app.fn.showPopup(v.uploadSuccessMessage);
        v.form = new FormData();
        //$('#' + w).find('.progress-bar').html('');
    } else {
        $('#' + w).find('.progress-bar').html('Postprocessing...');
        v.form.append('source', v.moveSource);
        v.form.append('path', path);
        v.form.append('mode', 'move');
        v.form.append('subFolder', subFolder);

        Loader.start();

        FileUpload.uploadToServer(w).done(d => {
            if (d === 'ok') {
                El.body.triggerHandler(eventMapId + '.finished');
                app.fn.showPopup(v.uploadSuccessMessage);
            } else {
                El.body.triggerHandler(eventMapId + '.failed');
                app.fn.showPopup(d);
            }
        }).fail(() => {
            El.body.triggerHandler(eventMapId + '.failed');
            app.fn.showPopup('Moving file(s) failed');
        }).always(() => {
            v.form = new FormData();
            //$('#' + w).find('.progress-bar').html('');
            Loader.stop();
        });
    }
};

FileUpload.postProcessUploadedFile = w => {
    let eventMapId = 'postProcessing.' + w;

    $('#' + w).find('.progress-bar').html('Postprocessing...');

    El.body.on(eventMapId + '.finished', {}, function () {
        $('#' + w).find('.progress-bar').html('Postprocessing finished');
        El.body.off(eventMapId + '.finished');
    });

    QB.writeData(eventMapId);
};*/