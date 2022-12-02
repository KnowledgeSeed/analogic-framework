/* global app, Utils, Widget, Widgets */

'use strict';

class TextAreaWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
        d = d || {value: ''};
        if (!d.value) {
            d.value = '';
        }

        let hide = o.hideIfNoData === true && d.value === '';

        const v = this.getParameters(d);
        this.editable = v.editable;
        this.value = Utils.escapeText(d.value);

        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d),
            titleStyles = this.getHtmlComponentStylesArray('title', d),
            iconStyles = this.getHtmlComponentStylesArray('icon', d),
            textStyles = this.getHtmlComponentStylesArray('text', d);

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
                <div class="ks-textarea-icon">${v.icon !== false ? `<img style="${iconStyles.join('')}" src="${app.applicationAssetsUrl}/skin/images/${v.icon}">` : ''}</div>
                <div class="ks-textarea-divider"></div>
                <textarea ${v.editable ? '' : 'disabled'} ${v.placeholder !== false ? `placeholder="${v.placeholder}"` : ''} style="${textStyles.join('')}" data-action="save" data-ordinal="${d.ordinal}" data-id="${o.id}" class="ks-textarea-input" >${d.value || ''}</textarea>
            </div>
        </div>
    </div>
</div>`;
    }

    initEventHandlers() {
        const o = this.options, section = this.getSection();

        if (!this.editable) {
            return;
        }

        if (o.icon) {
            section.find('.ks-textarea-icon').on('click', e => {
                TextAreaWidget.doSaveEvent(section, section.find('.ks-textarea-input'), e);
            });
        } else {
            section.find('.ks-textarea-input').on('focusout', e => {
                TextAreaWidget.doSaveEvent(section, $(e.currentTarget), e);
            });
        }
    }

    getParameters(d) {
        return {
            editable: this.getRealValue('editable', d, true),
            icon: this.getRealValue('icon', d, false),
            highlight: this.getRealValue('highlight', d, false),
            placeholder: this.getRealValue('placeholder', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            textAlignment: this.getRealValue('textAlignment', d, false),
            textFontColor: this.getRealValue('textFontColor', d, false),
            textFontSize: this.getRealValue('textFontSize', d, false),
            title: this.getRealValue('title', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleTextAlignment: this.getRealValue('titleTextAlignment', d, false)
        };
    }

    updateHtml(data) {
        let d = data || {value: ''};
        if (!d.value) {
            d.value = '';
        }
        const p = this.getParameters(d), section = this.getSection(),
        textarea = section.find('textarea');

        this.editable = p.editable;
        this.value = Utils.escapeText(d.value);

        textarea.val(d.value);
    }

    reset() {
        delete this.value;
        delete this.editable;
    }

    static doSaveEvent(section, w, e) {
        let id = section.prop('id'), v = Utils.escapeText(w.val());

        Widgets[id].value = v;

        w.data('value', v);

        Widget.doHandleSystemEvent(w, e);
    }
}
;