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
            if (xhr.status === 401) {
                Auth.handle401();
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
            }
        }
    }).always(() => Loader.stop(true));;
};