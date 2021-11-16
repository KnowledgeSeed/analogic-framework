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
    let urlWithWidgetId = url + ( url.includes('?') ? '&' : '?' ) + 'widgetid=' + widgetId;
    return $.ajax({
        cache: true,
        type: type,
        url: urlWithWidgetId,
        headers: Auth.getHeader(),
        xhrFields: {withCredentials: true},
        data: type === 'GET' ? {} : data,
        global: true,
        success: function (data) {
            Auth.handleSuccessLogin();
        },
        error: function (response, e) {
            L('error:', response, e, widgetId);
        },
        statusCode: {
            401: function () {
                if (('Cam' === app.authenticationMode || 'SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) && app.handled401 === false) {
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
        if ('Cam' === app.authenticationMode || 'SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) {
            app.handled401 = false;
        }
        //$.cookie("camPassport", 0);
    }
    if (('Cam' === app.authenticationMode || 'LoginPool' === app.authenticationMode ) && ((new Date().getTime() - app.pingTime) / 1000 >= 30)) {
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


    if ('Cam' === app.authenticationMode && $.cookie('camPassport') !== '0') {
        headers['Authorization'] = 'CAMPassport ' + $.cookie('camPassport');
    }

    return headers;
};