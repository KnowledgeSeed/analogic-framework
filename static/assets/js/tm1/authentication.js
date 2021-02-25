/* global app */

'use strict';

app.fn.fileUploadToServer = (widgetId) => {
    return $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
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
        data: app.widgetValue[widgetId].form
    });
};

app.fn.getTm1AjaxRequest = (url, data, type, widgetId = '') => {
    return $.ajax({
        cache: true,
        type: type,
        url: url,
        headers: app.fn.getHeader(),
        xhrFields: {withCredentials: true},
        data: type === 'GET' ? {} : data,
        global: true,
        success: function (data) {
            app.fn.handleSuccessLogin();
        },
        error: function (response, e) {
            L('error:', response, e, widgetId);
            if (app.restRequestDebugFlag === true) {
                app.fn.showTm1ErrorPage(url, data, response, widgetId);
            }
        },
        statusCode: {
            401: function () {
                if ('Cam' === app.authenticationMode || 'SSOPool' === app.authenticationMode) {
                    $.cookie("authenticated", 0);
                    window.location.href = app.url.cognosAuthenticationBridge;
                }
            }
        }
    });
};

app.fn.handleSuccessLogin = function () {
    if ('Cam' === app.authenticationMode && $.cookie('camPassport') !== '0') {
        let date = new Date();
        date.setTime(date.getTime() + (app.sessionExpiresInMinutes * 60 * 1000));
        $.cookie("authenticated", 'authenticated', {expires: date});
        //   $.cookie("camPassport", 0);
    }
};


app.fn.getHeader = (contentType = 'application/json; charset=utf-8', accept = 'application/json; charset=utf-8') => {
    let headers = {};

    if (accept) {
        headers['Accept'] = accept;
    }

    if (contentType) {
        headers['Content-Type'] = contentType;
    }

    headers['Access-Control-Allow-Origin'] = '*';

    if ('NoAuth' === app.authenticationMode) {
        headers['Authorization'] = "CAMNamespace " + btoa(app.noauthUser + ":" + app.noauthPwd + ":" + app.camNamespace);
    }

    if ('Cam' === app.authenticationMode && $.cookie('camPassport') !== '0') {
        headers['Authorization'] = 'CAMPassport ' + $.cookie('camPassport');
    }

    return headers;
};


