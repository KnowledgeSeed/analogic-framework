/* global app, Widget */

'use strict';

class ImageWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options, s = this.getGeneralStyles();
        const v = {
            fileName: this.getRealValue('fileName', d, ''),
            title: this.getRealValue('title', d, ''),
        };

        if (o.fontSize) {
            s.push('font-size:', o.fontSize, 'px;');
        }

        if (o.icon) {
            return '<span style="display: inline-block;' + s.join('') + '" class="icon-' + o.icon + '"><\/span>';
        } else {
            return '<img src="assets/skins/' + app.customerAssetsFolder + '/images/' + v.fileName + '" alt="' + v.title + '" style="' + s.join('') + '">';
        }
    }
}
;