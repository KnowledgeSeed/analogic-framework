/* global app, Utils, Widget, Widgets */

'use strict';

class TextBoxWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        d = d || {value: ''};

        if (!d.value && d.value !== 0) {
            d.value = '';
        }

        this.value = d.value;

        let hide = o.hideIfNoData === true && d.value === '';

        const v = this.getParameters(d);

        this.addDynamicData(d, v);

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
<div class="ks-textbox ${mainDivClass.join(' ')} ks-textbox-${v.skin}"  style="${mainDivStyle.join('')}">
    <div class="ks-textbox-inner">
        <div class="ks-textbox-title" style="${titleStyles.join('')}">
            <span class="ks-textbox-title-primary">${v.title ? v.title : ''}</span>
            <span class="ks-textbox-title-secondary"></span>
        </div>
        <div class="ks-textbox-field">
            <div class="ks-textbox-field-inner ${v.editable === false ? 'readonly' : ''}">
                <div class="ks-textbox-icon" style="${iconStyles.join('')}">${v.icon !== false ? `<img src="${app.applicationAssetsUrl}/skin/images/${v.icon}">` : ''}</div>
                <div class="ks-textbox-divider"></div>
                <input ${v.editable === false ? 'readonly' : ''} style="${textStyles.join('')}" data-action="writeEnd" data-id="${o.id}"  type="${v.textBoxType}" value="${Utils.htmlEncode(d.value)}" class="ks-textbox-input" placeholder="${v.defaultText ? v.defaultText : ''}">
            </div>
        </div>
    </div>
</div>`;
    }

    updateHtml(data) {
        const o = this.options, p = this.getParameters(data), section = $('#' + o.id),
            input = section.find('input');

        data = data || {value: ''};

        if (!data.value && data.value !== 0) {
            data.value = '';
        }

        this.value = data.value;

        this.addDynamicData(data, p);

        input.attr('placeholder', p.defaultText === false ? '' : p.defaultText);
        input.attr('value', Utils.htmlEncode(data.value));
        input.val(data.value);

    }

    addDynamicData(data, parameters) {
        const exclude = Object.keys(parameters);
        exclude.push('value', 'id', 'type', 'options');
        for (const [key, value] of Object.entries(data)) {
            if (exclude.indexOf(key) === -1) {
                this[key] = value;
            }
        }
    }

    getParameters(d) {
        return {
            icon: this.getRealValue('icon', d, false),
            highlight: this.getRealValue('highlight', d, false),
            defaultText: this.getRealValue('defaultText', d, false),
            editable: this.getRealValue('editable', d, true),
            skin: this.getRealValue('skin', d, 'standard'),
            textBoxType: this.getRealValue('textBoxType', d, 'text'),
            textAlignment: this.getRealValue('textAlignment', d, false),
            textFontColor: this.getRealValue('textFontColor', d, false),
            textFontSize: this.getRealValue('textFontSize', d, false),
            title: this.getRealValue('title', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleTextAlignment: this.getRealValue('titleTextAlignment', d, false)
        };
    }

    reset() {
        delete this.value;
    }

    initEventHandlers() {

        const section = this.getSection();

        section.find('.ks-textbox-input').on('focusout', e => {
            let w = $(e.currentTarget), id = section.prop('id');

            if (!w.hasClass('readonly')) {
                let value = Utils.escapeText(w.val());

                Widgets[id].value = value;

                //w.attr('value', value);

                Widget.doHandleSystemEvent(w, e);

                if (this.amIOnAGridTable()) {
                    Widget.doHandleGridTableSystemEvent(w, e);
                }
            }
        });

        section.find('.ks-textbox-input').on('keyup', e => {
            let w = $(e.currentTarget), id = section.prop('id'), value, element;
            if (!w.hasClass('readonly')) {
                value = Utils.escapeText(w.val());

                Widgets[id].value = value;

                //w.attr('value', value);

                element = $('<div>');
                element.data({action: 'writeKey', id: id, value: value});

                Widget.doHandleSystemEvent(element, e);

                if (this.amIOnAGridTable()) {
                    Widget.doHandleGridTableSystemEvent(element, e);
                }
            }
        });
    }
}
;