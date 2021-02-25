/* global app, Widget */

'use strict';
class GridWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
        const v = {
            skin: this.getRealValue('skin', d, 'template1'),
        };
        let mainDivStyle = [];
        if (this.getWidthForSection(d).length === 0) {
            mainDivStyle = this.getGeneralStyles(d);
        } else {
            mainDivStyle = this.getMargins(d);
        }

        return `<div class="ks-grid ks-grid-${v.skin}"  style="${mainDivStyle.join('')}"><div class="ks-grid-inner"><div class="ks-grid-content">${widgets.join('')}</div></div></div>`;
    }

    getMainHtmlElement(o, data, visible, widgetHtmls, withState) {
        let gs = this.getWidthForSection(data);
        if (visible === false) {
            gs.push('display:none;');
        }
        return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : app.utils.getRandomId()}">${this.getHtml(widgetHtmls, this.processData(data), withState)}</section>`;
    }

}
;



