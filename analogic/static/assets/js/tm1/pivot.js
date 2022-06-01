/* global app, Server */

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
                if (('Cam' === app.authenticationMode || 'SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) && app.handled401 === false) {
                    app.handled401 = true;
                    $.cookie("authenticated", 0);
                    window.location.href = app.url.authenticationBridge;
                }
            }
        }
    }).always(() => {
        --Pivot.callNum;
    });
};

Pivot.export = d => Server.download({url: 'pivot'}, {method: 'POST', data: d, fileName: 'pivotExport.xls'});
