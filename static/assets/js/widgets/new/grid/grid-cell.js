/* global app, Widget */

'use strict';
class GridCellWidget extends Widget {

    getHtml(widgets, d, withState) {
        const o = {...this.options, ...d};
        const v = {
            alignment: this.getRealValue('alignment', d, 'center-center'),
            skin: this.getRealValue('skin', d, 'standard')
        };

        let mainDivStyle = [];
        if (this.getWidthForSection(d).length === 0) {
            mainDivStyle = this.getGeneralStyles(d);
        } else {
            mainDivStyle = this.getMargins(d);
        }

        return  `<div class="ks-grid-cell ks-grid-cell-${v.skin}" style="${mainDivStyle.join('')}"><div class="ks-pos-${v.alignment} ks-grid-cell-content"  >${widgets.join('')}</div></div>`;

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

