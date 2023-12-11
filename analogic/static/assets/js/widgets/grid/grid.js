/* global app, Utils, Widget */

'use strict';
class GridWidget extends Widget {

    getHtml(widgets, d) {
        let mainDivStyle, v = {skin: this.getRealValue('skin', d, 'template1')};

        if (this.getWidthForSection(d).length) {
            mainDivStyle = this.getMargins(d);
        } else {
            mainDivStyle = this.getGeneralStyles(d);
        }

        return `<div class="ks-grid ks-grid-${v.skin}" style="${mainDivStyle.join('')}"><div class="ks-grid-inner"><div class="ks-grid-content">${widgets.join('')}</div></div></div>`;
    }

    getMainHtmlElement(o, data, visible, widgetHtmls, withState) {
        let gs = this.getWidthForSection(data);

        if (false === visible) {
            gs.push('display:none;');
        }

        this.dynamicTooltip = (data || {}).tooltip;

        return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : Utils.getRandomId()}">${this.getHtml(widgetHtmls, this.processData(data), withState)}</section>`;
    }

}
;