/* global app, Utils, Widget, Widgets */

'use strict';

class TextAreaWidget extends Widget {

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
            textStyles: textStyles.join(''),
            iconHtml: v.icon !== false ? `<img style="${iconStyles.join('')}" src="${app.applicationAssetsUrl}/skin/images/${v.icon}">` : ''
        };
    }

    normalizeData(d) {
        d = d || {value: ''};

        if (!d.value) {
            d.value = '';
        }

        return d;
    }

    getHtml(widgets, d) {
        const o = this.options;

        d = this.normalizeData(d);

        const v = this.getParameters(d);
        this.editable = v.editable;
        this.value = Utils.escapeText(d.value);

        const p = this.buildParts(d, v);

        return `
<div class="ks-textarea ${p.mainDivClass.join(' ')} ks-textarea-${v.skin}"  style="${p.mainDivStyle}">
    <div class="ks-textarea-inner">
        <div class="ks-textarea-title" style="${p.titleStyles}">
            <span class="ks-textarea-title-primary">${v.title ? v.title : ''}</span>
            <span class="ks-textarea-title-secondary"></span>
        </div>
        <div class="ks-textarea-field">
            <div class="ks-textarea-field-inner">
                <div class="ks-textarea-icon">${p.iconHtml}</div>
                <div class="ks-textarea-divider"></div>
                <textarea ${v.editable ? '' : 'disabled'} ${v.placeholder !== false ? `placeholder="${v.placeholder}"` : ''} style="${p.textStyles}" data-action="save" data-ordinal="${d.ordinal}" data-id="${o.id}" class="ks-textarea-input" >${d.value || ''}</textarea>
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
        const section = this.getSection(),
            main = section.find('.ks-textarea').first(),
            titleDiv = section.find('.ks-textarea-title'),
            titlePrimary = section.find('.ks-textarea-title-primary'),
            iconDiv = section.find('.ks-textarea-icon'),
            textarea = section.find('textarea');

        const d = this.normalizeData(data), v = this.getParameters(d);

        this.editable = v.editable;
        this.value = Utils.escapeText(d.value);

        const p = this.buildParts(d, v);

        // style is derived purely from the parameters, so it is rewritten wholesale
        main.attr('style', p.mainDivStyle);

        // Every class getHtml derives from the parameters (state classes and the skin) is
        // dropped and re-applied, the base `ks-textarea` class is kept.
        main.removeClass((i, c) => (c.match(/(^|\s)(has-title|has-icon|has-highlight|ks-textarea-\S+)/g) || []).join(' '));
        main.addClass(p.mainDivClass.join(' ')).addClass('ks-textarea-' + v.skin);

        titleDiv.attr('style', p.titleStyles);
        titlePrimary.html(v.title ? v.title : '');

        iconDiv.html(p.iconHtml);

        textarea.attr('style', p.textStyles);
        textarea.prop('disabled', !v.editable);
        if (v.placeholder !== false) {
            textarea.attr('placeholder', v.placeholder);
        } else {
            textarea.removeAttr('placeholder');
        }
        textarea.attr('data-ordinal', d.ordinal).data('ordinal', d.ordinal);
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