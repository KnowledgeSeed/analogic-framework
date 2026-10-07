/* global app, Widget */

'use strict';

class ImageWidget extends Widget {

    // Single source of truth for the markup getHtml renders, shared with updateHtml.
    // `bustCache` re-requests the image file, used on updates where the file behind an
    // unchanged name may have been replaced.
    buildInnerHtml(v, bustCache = false) {
        const o = this.options, s = this.getGeneralStyles();

        if (o.fontSize) {
            s.push('font-size:', o.fontSize, 'px;');
        }

        if (o.icon) {
            return `<span class="icon-${v.icon}" style="display: inline-block;${s.join('')}"><\/span>`;
        }

        return '<img src="' + app.applicationAssetsUrl + '/skin/images/' + v.fileName + (bustCache ? '?v=' + this.generateRandomString(10) : '') + '" alt="' + v.title + '" style="' + s.join('') + '">';
    }

    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d);

        return `<div class="ks-image ks-image-${v.skin}" data-action="imageClicked" data-id="${o.id}">${this.buildInnerHtml(v)}</div>`;
    }

    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    updateHtml(data) {
        const p = this.getParameters(data), main = this.getSection().find('.ks-image');

        // the click handler is bound to the wrapper, so only its content is replaced
        main.removeClass((i, c) => (c.match(/(^|\s)ks-image-\S+/g) || []).join(' '));
        main.addClass('ks-image-' + p.skin);
        main.html(this.buildInnerHtml(p, true));
    }

    initEventHandlers() {
        const section = this.getSection();
        section.find('.ks-image').on('click', (e) => {
            Widget.doHandleSystemEvent($(e.currentTarget), e);
        });
    }

    getParameters(d) {
        return {
            icon: this.getRealValue('icon', d, false),
            fileName: this.getRealValue('fileName', d, ''),
            skin: this.getRealValue('skin', d, 'standard'),
            title: this.getRealValue('title', d, '')
        };
    }
}
;