/* global app, Utils, Widget, Widgets */

'use strict';

class TextBoxWidget extends Widget {

    // Single source of truth for the classes/styles/content getHtml renders, shared with
    // updateHtml so the two cannot drift apart. `d` has to be normalized already (see
    // normalizeData).
    buildParts(d, v) {
        const o = this.options;

        let hide = o.hideIfNoData === true && d.value === '';

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
            mainDivClass: mainDivClass,
            mainDivStyle: mainDivStyle.join(''),
            titleStyles: titleStyles.join(''),
            iconStyles: iconStyles.join(''),
            textStyles: textStyles.join(''),
            iconHtml: v.icon !== false ? `<img src="${app.applicationAssetsUrl}/skin/images/${v.icon}">` : '',
            placeholder: v.defaultText ? v.defaultText : ''
        };
    }

    normalizeData(d) {
        d = d || {value: ''};

        if (!d.value && d.value !== 0) {
            d.value = '';
        }

        return d;
    }

    getHtml(widgets, d) {
        const o = this.options;

        d = this.normalizeData(d);

        this.value = d.value;

        const v = this.getParameters(d);

        this.addDynamicData(d, v);

        const p = this.buildParts(d, v);

        return `
<div class="ks-textbox ${p.mainDivClass.join(' ')} ks-textbox-${v.skin}"  style="${p.mainDivStyle}">
    <div class="ks-textbox-inner">
        <div class="ks-textbox-title" style="${p.titleStyles}">
            <span class="ks-textbox-title-primary">${v.title ? v.title : ''}</span>
            <span class="ks-textbox-title-secondary"></span>
        </div>
        <div class="ks-textbox-field">
            <div class="ks-textbox-field-inner ${v.editable === false ? 'readonly' : ''}">
                <div class="ks-textbox-icon" style="${p.iconStyles}">${p.iconHtml}</div>
                <div class="ks-textbox-divider"></div>
                <input ${v.editable === false ? 'readonly' : ''} style="${p.textStyles}" data-action="writeEnd" data-id="${o.id}"  type="${v.textBoxType}" value="${Utils.htmlEncode(d.value)}" class="ks-textbox-input" placeholder="${p.placeholder}">
            </div>
        </div>
    </div>
</div>`;
    }

    updateHtml(data) {
        const section = this.getSection(),
            main = section.find('.ks-textbox').first(),
            titleDiv = section.find('.ks-textbox-title'),
            titlePrimary = section.find('.ks-textbox-title-primary'),
            fieldInner = section.find('.ks-textbox-field-inner'),
            iconDiv = section.find('.ks-textbox-icon'),
            input = section.find('input');

        data = this.normalizeData(data);

        const p = this.getParameters(data);

        this.value = data.value;

        this.addDynamicData(data, p);

        const parts = this.buildParts(data, p);

        // style is derived purely from the parameters, so it is rewritten wholesale
        main.attr('style', parts.mainDivStyle);

        // Every class getHtml derives from the parameters (state classes and the skin) is
        // dropped and re-applied, the base `ks-textbox` class is kept.
        main.removeClass((i, c) => (c.match(/(^|\s)(has-title|has-icon|has-highlight|ks-textbox-\S+)/g) || []).join(' '));
        main.addClass(parts.mainDivClass.join(' ')).addClass('ks-textbox-' + p.skin);

        titleDiv.attr('style', parts.titleStyles);
        titlePrimary.html(p.title ? p.title : '');

        fieldInner.toggleClass('readonly', p.editable === false);

        iconDiv.attr('style', parts.iconStyles);
        iconDiv.html(parts.iconHtml);

        input.attr('style', parts.textStyles);
        input.prop('readOnly', p.editable === false);
        input.attr('type', p.textBoxType);
        input.attr('placeholder', parts.placeholder);
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