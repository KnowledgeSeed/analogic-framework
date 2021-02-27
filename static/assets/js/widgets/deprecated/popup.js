/* global app, El */

'use strict';

app.popup = {
    show: content => El.body.prepend('<div id="popup" class="popupHolder"><div class="popupBackground"></div><div class="popup"><div class="popupContent">' + content + '<br><br><a onclick="app.popup.hide();" class="widget-btn button-widget">Ok</a></div></div></div>'),
    hide: () => $('#popup').remove()
};