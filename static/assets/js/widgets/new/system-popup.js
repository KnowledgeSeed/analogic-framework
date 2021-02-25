/* global app, jQuery */

'use strict';

app.popup = (function (app, $) {

    return {
        show: function (content) {
            const html = `
                <div id="systemPopup" class="ks-popup ks-popup-holder">
                    <div class="ks-popup-background"></div>
                    <div class="ks-popup-content-holder">
                        <div class="ks-popup-content">${content}<br/><br/><a onclick="app.popup.hide();" class="ks-popup-button">Ok</a></div>
                    </div>
                </div>`;

            app.el.body.prepend(html);
        },
        hide: function () {
            $('#systemPopup').remove();
        }
    };
})(app, jQuery);