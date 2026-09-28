/* global app, Utils, Widget, Widgets */

'use strict';

class PasswordTextWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        this.reset();

        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d);

        return `
<div class="${m.mainClass}" style="${m.mainStyle}">
    <div class="ks-password-text-inner" style="${m.innerStyle}">
        <input type="password" class="ks-password-text-input" data-id="${o.id}" data-action="savePassword" style="${m.inputStyle}"/>
        <i class="ks-password-text-icon icon-eye" style="${m.iconStyle}"></i>
    </div>
</div>`;
    }

    // Pure: everything getHtml() renders, as plain strings.
    buildModel(d) {
        let mainDivClass = [],
            mainDivStyle = this.getGeneralStyles(d).concat(this.getHtmlComponentStylesArray('main', d)),
            inputStyles = this.getHtmlComponentStylesArray('input', d),
            innerStyles = this.getHtmlComponentStylesArray('inner', d),
            iconStyles = this.getHtmlComponentStylesArray('icon', d);

        return {
            // The skin has always been read from the global lookup helper `v` here, which has none:
            // the class has always been ks-password-text-undefined.
            mainClass: Widget.intern(`ks-password-text ${mainDivClass.join(' ')} ks-password-text-undefined`),
            mainStyle: Widget.intern(mainDivStyle.join('')),
            innerStyle: Widget.intern(innerStyles.join('')),
            inputStyle: Widget.intern(inputStyles.join('')),
            iconStyle: Widget.intern(iconStyles.join(''))
        };
    }

    reset() {
        delete this.value;
        delete this.savePassword;
    }

    // Model based update: the styles follow the data, everything that is state (the type of the
    // input, the eye icon) is left alone. The password is cleared on every update, as before.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: keep the old behavior.
        if (!previous || this.getHtml !== PasswordTextWidget.prototype.getHtml) {
            return this.updateHtmlLegacy(data);
        }

        this.reset();

        const section = this.getSection(), next = this.buildModel(data), main = section.children()[0];

        Widget.applyStyleDiff(main, previous.mainStyle, next.mainStyle);
        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);
        Widget.applyStyleDiff(section.find('.ks-password-text-inner')[0], previous.innerStyle, next.innerStyle);
        Widget.applyStyleDiff(section.find('.ks-password-text-input')[0], previous.inputStyle, next.inputStyle);
        Widget.applyStyleDiff(section.find('.ks-password-text-icon')[0], previous.iconStyle, next.iconStyle);

        section.find('.ks-password-text-input').val('');

        this._vm = next;
    }

    // Previous field by field update, used when there is no model to diff against or a
    // subclass renders its own markup.
    updateHtmlLegacy(data) {
        this.reset();
        this.getSection().find('.ks-password-text-input').val('');
    }

    initEventHandlers() {
        const section = this.getSection(), o = this.options;

        section.find('.ks-password-text-icon').on('click', (e) => {
            let i = $(e.currentTarget), input = section.find('.ks-password-text-input');

            if (input.attr('type') === 'password') {
                input.attr('type', 'text');
                i.removeClass('icon-eye').addClass('icon-eye-slash');
            } else {
                input.attr('type', 'password');
                i.removeClass('icon-eye-slash').addClass('icon-eye');
            }

        });

        section.find('.ks-password-text-input').on('focusout', e => {
            let s = $(e.currentTarget);

            Widgets[o.id].value = s.val();

            s.data('value', s.val());

            Widget.doHandleSystemEvent(s, e);
        });
    }

}