/* global app, Utils, Widget, Widgets */

'use strict';

class PasswordTextWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        this.reset();

        let mainDivClass = [],
            mainDivStyle = this.getGeneralStyles(d).concat(this.getHtmlComponentStylesArray('main', d)),
            inputStyles = this.getHtmlComponentStylesArray('input', d),
            innerStyles = this.getHtmlComponentStylesArray('inner', d),
            iconStyles = this.getHtmlComponentStylesArray('icon', d);

        return `
<div class="ks-password-text ${mainDivClass.join(' ')} ks-password-text-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-password-text-inner" style="${innerStyles.join('')}">
        <input type="password" class="ks-password-text-input" data-id="${o.id}" data-action="savePassword" style="${inputStyles.join('')}"/>
        <i class="ks-password-text-icon icon-eye" style="${iconStyles.join('')}"></i>
    </div>
</div>`;
    }

    reset() {
        delete this.value;
        delete this.savePassword;
    }

    updateHtml(data) {
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