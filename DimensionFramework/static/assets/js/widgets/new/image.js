/* global app, Widget */

'use strict';

class ImageWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options, s = this.getGeneralStyles();

        const v = {
            icon: this.getRealValue('icon', d, false),
            fileName: this.getRealValue('fileName', d, ''),
            skin: this.getRealValue('skin', d, 'standard'),
            title: this.getRealValue('title', d, '')
        };

        if (o.fontSize) {
            s.push('font-size:', o.fontSize, 'px;');
        }
        let html = [];
        html.push(`<div class="ks-image ks-image-${v.skin}">`);
        if (o.icon) {
            html.push(`<span class="icon-${v.icon}" style="display: inline-block;${s.join('')}"><\/span>`);
        } else {
            html.push('<img src="' + app.assetsUrl + '/skins/' + app.applicationAssetsFolder + '/images/' + v.fileName + '" alt="' + v.title + '" style="' + s.join('') + '">');
        }
        html.push('</div>');

        return html.join('');
    }
}
;