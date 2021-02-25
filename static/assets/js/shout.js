/* global app */

'use strict';


app.fn.shout = (message) => {
    if (app.useShout) {
        $.ajax({
            method: 'POST',
            url: 'shoutServlet?t=' + new Date(),
            headers: {'Content-Type': "application/x-www-form-urlencoded"},
            data: {id: app.id, message: message},
            global: false
        });
    }
};

app.fn.getShouts = () => {
    if (!app.shoutWaiting) {
        app.shoutWaiting = true;
        $.ajax({
            beforeSend: function (jqXHR, settings) {
                let self = this, xhr = settings.xhr;
                settings.xhr = function () {
                    var output = xhr();
                    output.onreadystatechange = function () {
                        if (typeof (self.readyStateChanged) === "function") {
                            self.readyStateChanged(this);
                        }
                    };
                    return output;
                };
            },
            readyStateChanged: function (xhr) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    app.shoutWaiting = false;
                    let r = JSON.parse(xhr.responseText);
                    if (r.id != app.id) { //saját event-re nem figyelünk a szerver felöl
                        app.el.body.triggerHandler(r.message);
                    }
                }

                if (xhr.readyState === 4 && (xhr.status === 500 || xhr.status === 502)) { // 500 server timeout, 502 proxy timeout
                    app.shoutWaiting = false;
                }
            },
            url: 'shoutServlet?t=' + new Date(),
            method: 'GET',
            global: false
        });
    }
};