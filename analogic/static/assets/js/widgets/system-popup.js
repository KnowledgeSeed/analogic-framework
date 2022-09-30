/* global app, El */

'use strict';

app.popup = {
    show: (content, w = false) => El.body.prepend($('<div id="systemPopup" class="ks-popup ks-popup-holder"><div class="ks-popup-background"></div><div class="ks-popup-content-holder"' + (w !== false ? ' style="width:' + w + 'px;max-height:800px;overflow-y:auto;"' : '') + '><div class="ks-popup-content">' + content + '<br/><br/><a data-close="1" class="ks-popup-button">Ok</a></div></div></div>').on('click', 'a[data-close]', () => app.popup.hide())),
    hide: () => $('#systemPopup').remove()
};