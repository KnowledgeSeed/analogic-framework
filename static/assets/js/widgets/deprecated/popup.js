/* global app, jQuery */

'use strict';

app.popup = (function (app, $) {

    return {
        show: function (content) {
            const html = `
                <div id="popup" class="popupHolder">
                    <div class="popupBackground"></div>
                    <div class="popup">
                        <div class="popupContent">${content}<br/><br/><a onclick="app.popup.hide();" class="widget-btn button-widget">Ok</a></div>
                    </div>
                </div>`;

            app.el.body.prepend(html);
        },
        hide: function () {
            $('#popup').remove();
        }
    };
})(app, jQuery);