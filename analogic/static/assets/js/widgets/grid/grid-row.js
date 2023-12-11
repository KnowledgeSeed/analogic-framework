/* global app, Utils, Widget */

'use strict';
class GridRowWidget extends Widget {

    getHtml(widgets, d, withState) {
        let mainDivStyle, v = {
            alignment: this.getRealValue('alignment', d, false),
            skin: this.getRealValue('skin', d, 'standard')
        };

        if (this.getWidthForSection(d).length) {
            mainDivStyle = this.getMargins(d);
        } else {
            mainDivStyle = this.getGeneralStyles(d);
        }

        return `<div class="ks-grid-row ${v.alignment !== false ? `ks-row-pos-${v.alignment}` : ''} ks-grid-row-${v.skin}" style="${mainDivStyle.join('')}">${widgets.join('')}</div>`;

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