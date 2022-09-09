/* global app, Widget */

'use strict';

class ImageWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options, s = this.getGeneralStyles();

        const v = this.getParameters(d);

        if (o.fontSize) {
            s.push('font-size:', o.fontSize, 'px;');
        }
        let html = [];
        html.push(`<div class="ks-image ks-image-${v.skin}">`);
        if (o.icon) {
            html.push(`<span class="icon-${v.icon}" style="display: inline-block;${s.join('')}"><\/span>`);
        } else {
            html.push('<img src="' + app.applicationAssetsUrl + '/skin/images/' + v.fileName + '" alt="' + v.title + '" style="' + s.join('') + '">');
        }
        html.push('</div>');

        return html.join('');
    }

    updateHtml(data) {
        const o = this.options, p = this.getParameters(data), section = $('#' + o.id), icon = section.find('.ks-image span');

        if(icon) {
            icon.attr('class', p.icon ? 'icon-' + p.icon : '');
        }
    }

    getParameters(d){
        return {
            icon: this.getRealValue('icon', d, false),
            fileName: this.getRealValue('fileName', d, ''),
            skin: this.getRealValue('skin', d, 'standard'),
            title: this.getRealValue('title', d, '')
        };
    }
}
;