/* global app, Widget */

'use strict';

class ImageWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options, s = this.getGeneralStyles(d);

        const v = this.getParameters(d);

        if (o.fontSize) {
            s.push('font-size:', o.fontSize, 'px;');
        }
        let html = [];
        html.push(`<div class="ks-image ks-image-${v.skin}" data-action="imageClicked" data-id="${o.id}">`);
        if (v.icon) {
            html.push(`<span class="icon-${v.icon}" style="display: inline-block;${s.join('')}"><\/span>`);
        } else {
            html.push('<img src="' + app.applicationAssetsUrl + '/skin/images/' + v.fileName + '" alt="' + v.title + '" style="' + s.join('') + '">');
        }
        html.push('</div>');

        return html.join('');
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
        const section = this.getSection(), p = this.getParameters(data);

        this.morphHtml(section.children(), this.getHtml([], data));

        if (!p.icon) {
            // getHtml() deliberately has no cache-busting query string on the <img> src
            // (one would make it always "different" from the diff's point of view and
            // default to the non-parameter-driven behavior) - it is appended here, after
            // the morph, so the browser still refetches the file even when its name is
            // unchanged (the image itself may have been replaced server-side).
            section.find('img').attr('src', app.applicationAssetsUrl + '/skin/images/' + p.fileName + '?v=' + this.generateRandomString(10));
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
