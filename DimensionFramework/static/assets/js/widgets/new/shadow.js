'use strict';

class ShadowWidget extends Widget {

    getHtml(widgets, d) {
        this.value = d;
        let mainDivStyle = this.getGeneralStyles({});
        return ``;
    }
}
;