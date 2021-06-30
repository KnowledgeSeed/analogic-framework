/* global app, El, Loader, Utils */

'use strict';
const Auth = {};

Auth.loadDefault = arg => {
    return $.ajax({
        url: app.assetsUrl + '/js/configs/default/' + arg + '.json',
        dataType: 'json',
        cache: false
    });
};

Auth.getTm1AjaxRequest = (url, data, type, widgetId = '') => {
    return $.ajax({
        cache: true,
        type: type,
        url: url,
        headers: Auth.getHeader(),
        xhrFields: {withCredentials: true},
        data: type === 'GET' ? {} : data,
        global: true,
        success: function (data) {
            Auth.handleSuccessLogin();
        },
        error: function (response, e) {
            L('error:', response, e, widgetId);
            if (app.restRequestDebugFlag === true) {
                Auth.showTm1ErrorPage(url, data, response, widgetId);
            }
        },
        statusCode: {
            401: function () {
                if (('Cam' === app.authenticationMode || 'SSOPool' === app.authenticationMode) && app.handled401 === false) {
                    app.handled401 = true;
                    $.cookie("authenticated", 0);
                    window.location.href = app.url.authenticationBridge;
                }
            }
        }
    });
};

Auth.handleSuccessLogin = () => {
    if ('Cam' === app.authenticationMode && $.cookie('camPassport') !== '0') {
        let date = new Date();
        date.setTime(date.getTime() + (app.sessionExpiresInMinutes * 60 * 1000));
        $.cookie("authenticated", 'authenticated', {expires: date});
        if ('Cam' === app.authenticationMode || 'SSOPool' === app.authenticationMode) {
            app.handled401 = false;
        }
        //$.cookie("camPassport", 0);
    }
    if ((new Date().getTime() - app.pingTime) / 1000 >= 30) {
        app.pingTime = new Date().getTime();
        $.ajax({
            url: 'ping',
            method: 'GET',
            global: false,
            success: function (data) {
            },
            error: function (response, e) {
            },
            statusCode: {
            }
        });
    }
};


Auth.getHeader = (contentType = 'application/json; charset=utf-8', accept = 'application/json; charset=utf-8') => {
    let headers = {};

    if (accept) {
        headers['Accept'] = accept;
    }

    if (contentType) {
        headers['Content-Type'] = contentType;
    }

    headers['Access-Control-Allow-Origin'] = '*';

    if ('DevAuth' === app.authenticationMode) {
        headers['Authorization'] = app.devAuthLogin;
    }

    if ('Cam' === app.authenticationMode && $.cookie('camPassport') !== '0') {
        headers['Authorization'] = 'CAMPassport ' + $.cookie('camPassport');
    }

    return headers;
};

Auth.showTm1ErrorPage = (url, body, event, widgetId) => {
    El.body.empty().off().promise().then(() => {
        El.body.html(`
<div style="margin-left: 15px;">
    <br/><h1>Error in api request!</h1><br/><br/>
    ${widgetId !== '' ? ` <h3>widget:</h3><br/><textarea rows="1" cols="100">${widgetId}</textarea><br/><br/>` : ''}
    <h3>response status:</h3><br/>
    <textarea rows="2" cols="100">${event.status + ' ' + event.statusText}</textarea><br/><br/>
    <h3>response text:</h3><br/>
    <textarea rows="2" cols="100">${event.responseText}</textarea><br/><br/>
    <h3>request url:</h3><br/>
    <textarea rows="4" cols="100">${url}</textarea><br/><br/>
    <h3>request body:</h3><br/>
    <textarea rows="25" cols="100">${body}</textarea><br/><br/>
</div>`);
    });
};