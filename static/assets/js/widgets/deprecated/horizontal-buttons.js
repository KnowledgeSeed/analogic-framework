/* global app, Widget */

'use strict';

class HorizontalButtonsWidget extends Widget {

    getHtml(widgets, withState) {
        const o = this.options;
        let bw = o.buttonWidth ? Math.round((o.buttonWidth / 100) * 12) : 6;
        let w = o.width ? Math.round((o.width / 100) * 12) : false;
        return `<div class="row margin-bottom-row">
                    ${w ? `<div class="col-${w}"><div class="row">` : ''}
                    ${widgets.map(item => {return `<div class="col-${bw}">${item}</div>`;}).join('')}
                    ${w ? `</div></div>` : ''}
                </div>`;
    }
}
;


