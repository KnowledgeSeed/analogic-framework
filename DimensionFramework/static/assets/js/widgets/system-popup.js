/* global app, El, jQuery */

'use strict';

app.popup = (function ($) {
    return {
        show: (content, w = false) => El.body.prepend('<div id="systemPopup" class="ks-popup ks-popup-holder"><div class="ks-popup-background"></div><div class="ks-popup-content-holder"' + (w !== false ? ' style="width:' + w + 'px;"' : '') + '><div class="ks-popup-content">' + content + '<br/><br/><a onclick="app.popup.hide();" class="ks-popup-button">Ok</a></div></div></div>'),
        hide: () => $('#systemPopup').remove()
    };
})(jQuery);