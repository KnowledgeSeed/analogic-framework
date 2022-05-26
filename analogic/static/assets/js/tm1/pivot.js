/* global app */

Pivot = {callNum: 0};

Pivot.call = p => {
    ++Pivot.callNum;

    return $.ajax({
        url: 'pivot',
        method: p.method || 'POST',
        data: p.data || {},
        dataType: p.dataType || 'json',
        statusCode: {
            401: function () {
                if ('Cam' === app.authenticationMode && app.handled401 === false) {
                    app.handled401 = true;
                    $.cookie("authenticated", 0);
                    window.location.href = app.url.authenticationBridge;
                }
                Extensions.forEach(ext => ext.handle401());
            }
        }
    }).always(() => {
        --Pivot.callNum;
    });
};