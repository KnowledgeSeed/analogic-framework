/* global app, jQuery */

'use strict';

app.loader = ((app, $) => {

    let ajaxCallNum = 0, timeoutId;
    let globalLoader = $('<div style="position: fixed; z-index: 9999; display: none;" class="loader"><img src="static/assets/images/loading2.gif"><\/div>');

    return {
        start: increaseAjaxCallNum => {
            if (increaseAjaxCallNum) {
                ++ajaxCallNum;
            }

            if (!globalLoader.is(':visible')) {
                if (increaseAjaxCallNum) {
                    timeoutId = setTimeout(() => globalLoader.show(), 2000);
                } else {
                    globalLoader.show();
                }
            }

            globalLoader.appendTo('body');
        },
        stop: decreaseAjaxCallNum => {
            if (decreaseAjaxCallNum) {
                clearTimeout(timeoutId);

                --ajaxCallNum;

                setTimeout(() => {
                    if (0 === ajaxCallNum) {
                        globalLoader.hide().remove();
                    }
                }, 500);
            } else {
                globalLoader.hide().remove();
            }
        },
        autoOn: () => {
            app.doc.ajaxStart(() => {
                app.loader.start(true);
            }).ajaxStop(() => {
                app.loader.stop(true);
            });
        }
    };
})(app, jQuery);