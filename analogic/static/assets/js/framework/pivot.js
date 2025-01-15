/* global Auth, Loader, Server */

Pivot = {callNum: 0};

Pivot.call = p => {
    Loader.start(true);

    ++Pivot.callNum;

    return $.ajax({
        url: Utils.getFullUrlForAjax('pivot'),
        method: p.method || 'POST',
        data: p.data || {},
        dataType: p.dataType || 'json',
        statusCode: {
            401: function () {
                Auth.handle401();
            },
            302: function (resp) {
                Auth.handle302(resp);
            }
        }
    }).always(() => {
        --Pivot.callNum;

        Loader.stop(true);
    });
};

Pivot.export = d => Server.download({url: Utils.getFullUrlForAjax('pivot')}, {method: 'POST', data: d, fileName: 'pivotExport.xlsx'});
