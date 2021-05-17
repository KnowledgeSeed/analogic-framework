/* global app, El, Loader, QB, Repository, Utils, WidgetValue */

Server = {};

Server.download = (p) => {
    let url = p.url;
    for (const [key, value] of Object.entries(p)) {
        if(key !== 'url'){
            url += '&' + key + '=' + value;
        }
    }
    window.open(url, '_blank');
    /* return $.ajax({
         url: p.url,
         method: 'POST',
         cache: false,
         processData: false,
         data: p,
         success: function (response, status, xhr) {
             let blob = Server.base64ToBlob(response, xhr.getResponseHeader("content-type"));
             let url = window.URL.createObjectURL(blob);
             window.open(url, '_blank');
             setTimeout(function() { URL.revokeObjectURL(url); }, 100);
         },
     });*/
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