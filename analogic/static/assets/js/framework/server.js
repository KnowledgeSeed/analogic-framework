/* global app, Auth, El, Loader, QB, Repository, Utils, Widgets */

Server = {};
Server.download = (p, d = {}) => {
    Loader.start(true);

    let url = p.url;

    for (const [key, value] of Object.entries(p)) {
        if (key !== 'url') {
            url += '&' + key + '=' + value;
        }
    }

    return $.ajax({
        url: Utils.getFullUrlForAjax(url),
        method: d.method || 'GET',
        data: d.data || {},
        xhr: function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 2) {
                    if (xhr.status == 200) {
                        xhr.responseType = "blob";
                    } else {
                        xhr.responseType = "text";
                    }
                }
            };
            return xhr;
        },
        success: function (response, status, xhr) {
            if (xhr.status === 401) {
                Auth.handle401();
            } else if (xhr.status === 302) {
                Auth.handle302(response);
            } else {
                let blob = new Blob([response], {type: "application/octetstream"});
                let a = $('<a />');
                a.attr('href', window.URL.createObjectURL(blob));
                a.attr('download', p.fileName || d.fileName || 'file');
                $('body').append(a);
                a[0].click();
                $('body').remove(a);
            }
        },
        statusCode: {
            401: function () {
                Auth.handle401();
            },
            302: function (resp) {
                Auth.handle302(resp);
            }
        }
    }).always(() => Loader.stop(true));
    ;
};

Server.uploadImage = (context) => {
    const e = 'uploadImage', widgetId = context.getWidgetId(), eventMapId = context.getEventMapId(),
        r = context.getObject(), ww = Widgets[widgetId];
    let uploadParams = {}, uploadRepoExist = r && r[e];

    if (uploadRepoExist) {
        uploadParams = r[e](context);
        for (const [key, value] of Object.entries(uploadParams)) {
            if (key !== 'callback') {
                ww.form.append(key, value);
            }
        }
    }


    Loader.start();

    return Server.uploadImageToServer(widgetId).done(d => {
        if (d.message === 'ok') {
            if (uploadParams.callback) {
                uploadParams.callback({
                    getResponse() {
                        return d;
                    },
                    ...context
                });
            }
            QB.executeEventMapAction(eventMapId + '.finished', context, d);
            ww.form = new FormData();
            if (ww.showUploadSuccessMessage === true) {
                Api.showPopup(ww.uploadSuccessMessage);
            }
        } else {
            Api.showPopup(d, 600);
            QB.executeEventMapAction(eventMapId + '.error', context, d);
            Loader.stop();
        }
        if (!ww.skipStoppingTheLoaderAfterSuccessUpload) {
            Loader.stop();
        }
    }).fail(xhr => {
        const statusCode = xhr.status;
        if (statusCode === 403) {
            Api.showPopup('Access Denied');
        } else if (statusCode === 401) {
            Auth.handle401();
        } else if (statusCode === 500) {
            Api.showPopup('Server error: Please try again later.');
        } else {
            Api.showPopup('Upload failed with status code: ' + statusCode);
        }
        Loader.stop();
    }).always(() => {
        ww.form = new FormData();
        Api.forceRefreshWithoutLoader(widgetId);
    });
};

Server.uploadImageToServer = widgetId => {

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
        url: Utils.getFullUrlForAjax('upload_image'),
        method: 'POST',
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: Widgets[widgetId].form
    });
};