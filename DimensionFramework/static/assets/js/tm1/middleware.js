/* global app */

MiddleWare = {};

MiddleWare.call = p => {
    return $.ajax({
        url: p.url(),
        dataType: 'html'
    });
};