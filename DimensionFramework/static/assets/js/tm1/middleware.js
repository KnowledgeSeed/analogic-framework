/* global app */

MiddleWare = {};

MiddleWare.call = p => {
    return $.ajax({
        url: p.url(),
        method: p.method,
        data: p.data || {},
        dataType: p.dataType
    });
};