/* global app, Widget */

'use strict';

class ImageWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d);

        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d, v);

        let html = [];
        html.push(`<div class="${m.mainClass}" data-action="imageClicked" data-id="${o.id}">`);
        if (m.isIcon) {
            html.push(`<span class="${m.iconClass}" style="${m.iconStyle}"><\/span>`);
        } else {
            html.push('<img src="' + m.imgSrc + '" alt="' + m.imgAlt + '" style="' + m.imgStyle + '">');
        }
        html.push('</div>');

        return html.join('');
    }

    // Pure: everything getHtml() renders, as plain values.
    buildModel(d, v = this.getParameters(d)) {
        const o = this.options, s = this.getGeneralStyles();

        if (o.fontSize) {
            s.push('font-size:', o.fontSize, 'px;');
        }

        return {
            mainClass: Widget.intern(`ks-image ks-image-${v.skin}`),
            isIcon: !!o.icon,
            iconClass: `icon-${v.icon}`,
            iconStyle: Widget.intern(`display: inline-block;${s.join('')}`),
            imgSrc: app.applicationAssetsUrl + '/skin/images/' + v.fileName,
            imgAlt: v.title,
            imgStyle: Widget.intern(s.join(''))
        };
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

    // Model based update: only what differs from the model applied last is touched, so classes,
    // styles and other state added to the elements at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: keep the old behavior.
        if (!previous || this.getHtml !== ImageWidget.prototype.getHtml) {
            return this.updateHtmlLegacy(data);
        }

        const section = this.getSection(), next = this.buildModel(data), main = section.children()[0];

        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);

        const icon = section.find('.ks-image span')[0], img = section.find('img')[0];
        if (icon) {
            Widget.applyClassDiff(icon, previous.iconClass, next.iconClass);
            Widget.applyStyleDiff(icon, previous.iconStyle, next.iconStyle);
        } else if (img) {
            // The file may have been replaced on the server under the same name, so the browser
            // has to fetch it again: the random query string is what did that before as well.
            img.setAttribute('src', next.imgSrc + '?v=' + this.generateRandomString(10));
            Widget.setAttributeIfChanged(img, 'alt', next.imgAlt);
            Widget.applyStyleDiff(img, previous.imgStyle, next.imgStyle);
        }

        this._vm = next;
    }

    // Previous field by field update, used when there is no model to diff against or a
    // subclass renders its own markup.
    updateHtmlLegacy(data) {
        const o = this.options, p = this.getParameters(data), section = $('#' + o.id),
            icon = section.find('.ks-image span');

        if (icon.length) {
            icon.attr('class', p.icon ? 'icon-' + p.icon : '');
        } else {
            const file = section.find('img');
            file.attr('src', app.applicationAssetsUrl + '/skin/images/' + p.fileName + '?v=' + this.generateRandomString(10));
        }
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