/* global app, Doc, jQuery */

'use strict';

const Loader = ($ => {
    let ajaxCallNum = 0, timeoutId, e = $('<div style="position: fixed; z-index: 9999; display: none;" class="loader"><img src="' + app.assetsUrl + '/images/loading2.gif"><\/div>');

    return {
        start: incAjaxCallNum => {
            if (incAjaxCallNum) {
                ++ajaxCallNum;
            }

            if (!e.is(':visible')) {
                if (incAjaxCallNum) {
                    timeoutId = setTimeout(() => e.show(), 1000);
                } else {
                    e.show();
                }
            }

            e.appendTo('body');
        },
        stop: decAjaxCallNum => {
            if (decAjaxCallNum) {
                clearTimeout(timeoutId);

                --ajaxCallNum;

                setTimeout(() => {
                    if (0 === ajaxCallNum) {
                        e.hide().remove();
                    }
                }, 500);
            } else {
                e.hide().remove();
            }
        },
        autoOn: () => {
           // Doc.ajaxStart(() => Loader.start(true)).ajaxStop(() => Loader.stop(true));
        }
    };
})(jQuery);