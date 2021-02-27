'use strict';

class FormWidget extends Widget {

    getHtml(widgets, d) {
        const v = {
            skin: this.getRealValue('skin', d, 'standard')
        };

        return `<div class="ks-form ks-form-${v.skin} row" style="${this.getGeneralStyles(d).join('')}"><div class="col-3">${widgets.map(item => {return `<div class="form-row">${item}</div>`;}).join('')}</div></div>`;
    }
}
;