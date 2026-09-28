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

        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d, v, hide);

        return `
<div class="${m.mainClass}"  style="${m.mainStyle}">
    <div class="ks-textarea-inner">
        <div class="ks-textarea-title" style="${m.titleStyle}">
            <span class="ks-textarea-title-primary">${m.titleHtml}</span>
            <span class="ks-textarea-title-secondary"></span>
        </div>
        <div class="ks-textarea-field">
            <div class="ks-textarea-field-inner">
                <div class="ks-textarea-icon">${m.iconHtml}</div>
                <div class="ks-textarea-divider"></div>
                <textarea ${m.disabled ? 'disabled' : ''} ${m.placeholder !== null ? `placeholder="${m.placeholder}"` : ''} style="${m.textStyle}" data-action="save" data-ordinal="${m.ordinal}" data-id="${o.id}" class="ks-textarea-input" >${m.value}</textarea>
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
            mainClass: Widget.intern(`ks-textarea ${mainDivClass.join(' ')} ks-textarea-${v.skin}`),
            mainStyle: Widget.intern(mainDivStyle.join('')),
            titleStyle: Widget.intern(titleStyles.join('')),
            titleHtml: v.title ? v.title : '',
            iconHtml: v.icon !== false ? `<img style="${iconStyles.join('')}" src="${app.applicationAssetsUrl}/skin/images/${v.icon}">` : '',
            disabled: !v.editable,
            placeholder: v.placeholder !== false ? v.placeholder : null,
            textStyle: Widget.intern(textStyles.join('')),
            ordinal: d.ordinal,
            value: d.value || ''
        };
    }

    initEventHandlers() {
        const o = this.options, section = this.getSection();

        // The editable state can change with the data (updateContent), so it is checked when the
        // event happens, not only when the handler is bound.
        if (o.icon) {
            section.find('.ks-textarea-icon').on('click', e => {
                if (!this.editable) {
                    return;
                }
                TextAreaWidget.doSaveEvent(section, section.find('.ks-textarea-input'), e);
            });
        } else {
            section.find('.ks-textarea-input').on('focusout', e => {
                if (!this.editable) {
                    return;
                }
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

    // Model based update: only what differs from the model applied last is touched, so classes,
    // styles and other state added to the elements at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: keep the old behavior.
        if (!previous || this.getHtml !== TextAreaWidget.prototype.getHtml) {
            return this.updateHtmlLegacy(data);
        }

        let d = data || {value: ''};
        if (!d.value) {
            d.value = '';
        }
        const o = this.options, p = this.getParameters(d), section = this.getSection();

        this.editable = p.editable;
        this.value = Utils.escapeText(d.value);

        const next = this.buildModel(d, p, o.hideIfNoData === true && d.value === ''),
            main = section.children()[0], title = section.find('.ks-textarea-title')[0],
            titleText = section.find('.ks-textarea-title-primary')[0], icon = section.find('.ks-textarea-icon')[0],
            textarea = section.find('textarea')[0];

        //main
        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);
        Widget.applyStyleDiff(main, previous.mainStyle, next.mainStyle);

        //title and icon
        Widget.applyStyleDiff(title, previous.titleStyle, next.titleStyle);
        Widget.setContentIfChanged(titleText, next.titleHtml);
        Widget.setContentIfChanged(icon, next.iconHtml);

        //textarea
        if (textarea) {
            next.disabled ? textarea.setAttribute('disabled', '') : textarea.removeAttribute('disabled');
            next.placeholder !== null ? Widget.setAttributeIfChanged(textarea, 'placeholder', next.placeholder) : textarea.removeAttribute('placeholder');
            Widget.applyStyleDiff(textarea, previous.textStyle, next.textStyle);
            Widget.setAttributeIfChanged(textarea, 'data-ordinal', next.ordinal);
            if (textarea.defaultValue !== String(next.value)) {
                textarea.defaultValue = next.value;
            }
            // What the user is typing right now is not replaced by a refresh.
            if (document.activeElement !== textarea && textarea.value !== String(next.value)) {
                textarea.value = next.value;
            }
        }

        this._vm = next;
    }

    // Previous field by field update, used when there is no model to diff against or a
    // subclass renders its own markup.
    updateHtmlLegacy(data) {
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