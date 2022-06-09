/* global app, El, Loader, QB, Repository, Utils, WidgetValue */

Server = {};

Server.download = (p, d = {}) => {
    let url = p.url;

    for (const [key, value] of Object.entries(p)) {
        if (key !== 'url') {
            url += '&' + key + '=' + value;
        }
    }

    $.ajax({
        url: url,
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
            if(xhr.status === 401){
                 Auth.handle401();
            }else {
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
            }
        }
    });
};

Server.base64ToBlob = (base64, mimetype, slicesize) => {
    if (!window.atob || !window.Uint8Array) {
        return null;
    }
    mimetype = mimetype || '';
    slicesize = slicesize || 512;
    let bytechars = atob(base64);
    let bytearrays = [];
    for (let offset = 0; offset < bytechars.length; offset += slicesize) {
        let slice = bytechars.slice(offset, offset + slicesize);
        let bytenums = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            bytenums[i] = slice.charCodeAt(i);
        }
        let bytearray = new Uint8Array(bytenums);
        bytearrays[bytearrays.length] = bytearray;
    }
    return new Blob(bytearrays, {type: mimetype});
};