/* global app, Utils, Widget, WidgetValue */

'use strict';

class TextAreaWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
        d = d || {value: ''};
        if (!d.value) {
            d.value = '';
        }
        this.value = d;
        let hide = o.hideIfNoData === true && d.value === '';

        const v = {
            icon: this.getRealValue('icon', d, false),
            highlight: this.getRealValue('highlight', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            textAlignment: this.getRealValue('textAlignment', d, false),
            textFontColor: this.getRealValue('textFontColor', d, false),
            textFontSize: this.getRealValue('textFontSize', d, false),
            title: this.getRealValue('title', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleTextAlignment: this.getRealValue('titleTextAlignment', d, false)
        };

        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d), titleStyles = [], textStyles = [];

        v.title && mainDivClass.push('has-title');
        v.icon !== false && mainDivClass.push('has-icon');
        v.highlight && mainDivClass.push('has-highlight');

        v.titleTextAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleTextAlignment === 'start' || v.titleTextAlignment === 'end' ? `flex-${v.titleTextAlignment}` : v.titleTextAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);

        v.textAlignment && textStyles.push(`text-align:${v.textAlignment};`);
        v.textFontColor && textStyles.push(`color:${v.textFontColor};`);
        v.textFontSize && textStyles.push(`font-size:${v.textFontSize}px;`);

        hide && mainDivStyle.push('display:none;');

        return `
<div class="ks-textarea ${mainDivClass.join(' ')} ks-textarea-${v.skin}"  style="${mainDivStyle.join('')}">
    <div class="ks-textarea-inner">
        <div class="ks-textarea-title" style="${titleStyles.join('')}">
            <span class="ks-textarea-title-primary">${v.title ? v.title : ''}</span>
            <span class="ks-textarea-title-secondary"></span>
        </div>
        <div class="ks-textarea-field">
            <div class="ks-textarea-field-inner">
                <div class="ks-textarea-icon">${v.icon !== false ? `<img src="assets/skins/${app.customerAssetsFolder}/images/${v.icon}">` : '' }</div>
                <div class="ks-textarea-divider"></div>
                <textarea style="${textStyles.join('')}" data-action="save" data-ordinal="${d.ordinal}" data-id="${o.id}" class="ks-textarea-input" >${d.value || ''}</textarea>
            </div>
        </div>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        section.find('.ks-textarea-input').on('focusout', e => {
            let w = $(e.currentTarget), id = section.prop('id'), v = Utils.escapeText(w.val());

            WidgetValue[id].value = v;

            w.data('value', v);

            Widget.doHandleSystemEvent(w, e);
        });
    }
}
;