/* global app, Doc, jQuery */

'use strict';

const Loader = ($ => {
    let ajaxCallNum = 0, timeoutId, e = $('<div style="position: fixed; z-index: 9999; display: none;" class="loader"><img src="' + app.assetsUrl + '/images/loading2.gif"><\/div>');

    const show = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
        e.css('opacity', '').show();
    };

    const isBlockingOnly = () => e.is(':visible') && e.css('opacity') === '0';

    return {
        // A counted call (incAjaxCallNum) shows the loader only after a second, so short loads do not
        // flicker. With blockClicks the loader is laid over the page right away, transparent until that
        // second has passed: the page cannot be clicked while it renders (e.g. a second switch of a
        // segmented control while the tables of the first one are still loading).
        start: (incAjaxCallNum, blockClicks = false) => {
            if (incAjaxCallNum) {
                ++ajaxCallNum;
            }

            e.appendTo('body');

            if (!incAjaxCallNum) {
                show();
                return;
            }

            if (!e.is(':visible')) {
                if (blockClicks) {
                    e.css('opacity', 0).show();
                }
                // One pending show for all the counted calls: a second start must not orphan the
                // timer of the first one.
                timeoutId = timeoutId || setTimeout(show, 1000);
            } else if (blockClicks && isBlockingOnly()) {
                timeoutId = timeoutId || setTimeout(show, 1000);
            }
        },
        stop: decAjaxCallNum => {
            if (decAjaxCallNum) {
                ajaxCallNum = Math.max(0, ajaxCallNum - 1);

                // The pending show is cancelled only when the last counted call ended: a call that
                // finished early must not keep the loader away while the others still render.
                if (0 === ajaxCallNum) {
                    clearTimeout(timeoutId);
                    timeoutId = null;

                    // Nothing was shown yet, so nothing can flicker: give the page back right away.
                    if (isBlockingOnly()) {
                        e.hide().remove();
                        return;
                    }
                }

                setTimeout(() => {
                    if (0 === ajaxCallNum) {
                        e.hide().remove();
                    }
                }, 500);
            } else {
                clearTimeout(timeoutId);
                timeoutId = null;
                e.hide().remove();
            }
        },
        autoOn: () => {
           // Doc.ajaxStart(() => Loader.start(true)).ajaxStop(() => Loader.stop(true));
        }
    };
})(jQuery);
