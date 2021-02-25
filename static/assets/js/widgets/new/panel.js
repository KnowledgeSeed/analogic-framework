'use strict';

class PanelWidget extends Widget {

    getHtml(widgets) {
        let mainDivStyle = this.getGeneralStyles({});
        return `<div style="${mainDivStyle.join('')}">${widgets.join('')}</div>`;
    }
}
;