'use strict';

class Panel2Widget extends Widget {

    getHtml(widgets, d) {
        const v = {
            skin: this.getRealValue('skin', d, 'standard')
        };

        return `<div class="ks-panel  ks-panel-${v.skin}" style="${this.getGeneralStyles({}).join('')}">${widgets.join('')}</div>`;
    }
}
;