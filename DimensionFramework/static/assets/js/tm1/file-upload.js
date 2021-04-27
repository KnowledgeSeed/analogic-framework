/* global app, El, Loader, QB, Repository, Utils, WidgetValue */

FileUpload = {};

FileUpload.uploadFile = (w, eventMapId, context, event, element) => {
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
            QB.executeEventMapAction(eventMapId + '.finished', event, element, d);
            v.form = new FormData();
            app.fn.showPopup(v.uploadSuccessMessage);
        } else {
            app.fn.showPopup(d, 600);
        }
    }).fail(() => {
        app.fn.showPopup('Upload failed');
    }).always(() => {
        v.form = new FormData();
        Loader.stop();
    });

    return true;

};

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