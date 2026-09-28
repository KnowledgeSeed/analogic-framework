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

        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d, v, hide);

        return `
<div class="${m.mainClass}"  style="${m.mainStyle}">
    <div class="ks-textbox-inner">
        <div class="ks-textbox-title" style="${m.titleStyle}">
            <span class="ks-textbox-title-primary">${m.titleHtml}</span>
            <span class="ks-textbox-title-secondary"></span>
        </div>
        <div class="ks-textbox-field">
            <div class="${m.fieldClass}">
                <div class="ks-textbox-icon" style="${m.iconStyle}">${m.iconHtml}</div>
                <div class="ks-textbox-divider"></div>
                <input ${m.readonly ? 'readonly' : ''} style="${m.inputStyle}" data-action="writeEnd" data-id="${o.id}"  type="${m.inputType}" value="${Utils.htmlEncode(m.value)}" class="ks-textbox-input" placeholder="${m.placeholder}">
            </div>
        </div>
    </div>
</div>`;
    }

    // Pure: everything getHtml() renders, as plain values.
    buildModel(d, v = this.getParameters(d), hide = false) {
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

        return {
            mainClass: Widget.intern(`ks-textbox ${mainDivClass.join(' ')} ks-textbox-${v.skin}`),
            mainStyle: Widget.intern(mainDivStyle.join('')),
            titleStyle: Widget.intern(titleStyles.join('')),
            titleHtml: v.title ? v.title : '',
            fieldClass: `ks-textbox-field-inner ${v.editable === false ? 'readonly' : ''}`,
            iconStyle: Widget.intern(iconStyles.join('')),
            iconHtml: v.icon !== false ? `<img src="${app.applicationAssetsUrl}/skin/images/${v.icon}">` : '',
            readonly: v.editable === false,
            inputStyle: Widget.intern(textStyles.join('')),
            inputType: v.textBoxType,
            value: d.value,
            placeholder: v.defaultText ? v.defaultText : ''
        };
    }

    // Model based update: only what differs from the model applied last is touched, so classes,
    // styles and other state added to the elements at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: keep the old behavior.
        if (!previous || this.getHtml !== TextBoxWidget.prototype.getHtml) {
            return this.updateHtmlLegacy(data);
        }

        data = data || {value: ''};

        if (!data.value && data.value !== 0) {
            data.value = '';
        }

        this.value = data.value;

        const o = this.options, p = this.getParameters(data), section = this.getSection();

        this.addDynamicData(data, p);

        const next = this.buildModel(data, p, o.hideIfNoData === true && data.value === ''),
            main = section.children()[0], title = section.find('.ks-textbox-title')[0],
            titleText = section.find('.ks-textbox-title-primary')[0], field = section.find('.ks-textbox-field-inner')[0],
            icon = section.find('.ks-textbox-icon')[0], input = section.find('.ks-textbox-input')[0];

        //main
        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);
        Widget.applyStyleDiff(main, previous.mainStyle, next.mainStyle);

        //title
        Widget.applyStyleDiff(title, previous.titleStyle, next.titleStyle);
        Widget.setContentIfChanged(titleText, next.titleHtml);

        //field (carries the readonly state) and icon
        Widget.applyClassDiff(field, previous.fieldClass, next.fieldClass);
        Widget.applyStyleDiff(icon, previous.iconStyle, next.iconStyle);
        Widget.setContentIfChanged(icon, next.iconHtml);

        //input
        if (input) {
            next.readonly ? input.setAttribute('readonly', '') : input.removeAttribute('readonly');
            Widget.applyStyleDiff(input, previous.inputStyle, next.inputStyle);
            Widget.setAttributeIfChanged(input, 'type', next.inputType);
            Widget.setAttributeIfChanged(input, 'placeholder', next.placeholder);
            Widget.setAttributeIfChanged(input, 'value', next.value);
            // What the user is typing right now is not replaced by a refresh.
            if (document.activeElement !== input && input.value !== String(next.value)) {
                input.value = next.value;
            }
        }

        this._vm = next;
    }

    // Previous field by field update, used when there is no model to diff against or a
    // subclass renders its own markup.
    updateHtmlLegacy(data) {
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
                if (this._ignoreNextFocusOut) {
                    delete this._ignoreNextFocusOut;
                    return;
                }

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

                if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
                    this._ignoreNextFocusOut = true;
                    Widget.doHandleSystemEvent(w, e);

                    if (this.amIOnAGridTable()) {
                        Widget.doHandleGridTableSystemEvent(w, e);
                    }
                }
            }
        });
    }
}
;