'use strict';

class PanelWidget extends Widget {

    getHtml(widgets) {
        return `<div style="${this.getGeneralStyles({}).join('')}">${widgets.join('')}</div>`;
    }
}
;