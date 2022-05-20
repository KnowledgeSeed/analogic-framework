/* global app, Widget, WidgetValue */

'use strict';

class FileUploadWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;

        const v = {
            backgroundColor: this.getRealValue('backgroundColor', d, false),
            borderColor: this.getRealValue('borderColor', d, false),
            borderWidth: this.getRealValue('borderWidth', d, 1),
            cornerRadius: this.getRealValue('cornerRadius', d, false),
            dividerWidth: this.getRealValue('dividerWidth', d, false),
            effect: this.getRealValue('effect', d, false),
            fontBold: this.getRealValue('fontBold', d, false),
            fontColor: this.getRealValue('fontColor', d, false),
            fontSize: this.getRealValue('fontSize', d, false),
            gradient: this.getRealValue('gradient', d, false),
            icon: this.getRealValue('icon', d, false),
            iconHeight: this.getRealValue('iconHeight', d, false),
            iconPosition: this.getRealValue('iconPosition', d, 'left'),
            iconWidth: this.getRealValue('iconWidth', d, false),
            label: this.getRealValue('label', d, ''),
            maxFileSize: this.getRealValue('maxFileSize', d, 5),
            progressVisible: this.getRealValue('progressVisible', d, true),
            staging: this.getRealValue('staging', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            target: this.getRealValue('target', d, false),
            uploadSuccessMessage: this.getRealValue('uploadSuccessMessage', d, 'Upload success'),
            showUploadSuccessMessage: this.getRealValue('showUploadSuccessMessage', d, true)
        };

        this.value = {
            maxFileSize: v.maxFileSize,
            staging: v.staging,
            target: v.target,
            uploadSuccessMessage: v.uploadSuccessMessage,
            showUploadSuccessMessage: v.showUploadSuccessMessage
        };

        let aClass = [], aStyle = this.getWidthAndHeight(d), pStyle = [...aStyle],
            innerStyle = this.getHtmlComponentStylesArray('inner', d),
            labelStyle = this.getHtmlComponentStylesArray('label', d),
            dividerStyle = this.getHtmlComponentStylesArray('divider', d),
            imgStyle = this.getHtmlComponentStylesArray('img', d);
        let outerDivSyle = this.getPaddings(d).concat(this.getMargins(d));

        /* Override css */

        /* Add defined css class */
        v.icon !== false && aClass.push('has-icon');
        v.label !== '' && aClass.push('has-label');
        v.effect === 'shadow' && aClass.push('has-box-shadow');
        v.iconPosition === 'left' ? aClass.push('pos-icon-left') : aClass.push('pos-icon-right');

        /* override a tag style */
        v.borderColor && aStyle.push('background-color:', v.borderColor, ';');
        aStyle.push('padding:', v.borderWidth, 'px;');

        /* overrid inner div style */
        if (v.cornerRadius) {
            aStyle.push('border-radius:', v.cornerRadius, 'px;');
            innerStyle.push('border-radius:', v.cornerRadius - 1, 'px;');
        }

        if (v.backgroundColor) {
            if (v.gradient) {
                const a = v.gradient[0], b = v.gradient[1];
                innerStyle.push('background:', a, ';');//old browsers
                innerStyle.push('background:', `-moz-linear-gradient(top, ${a} 0%, ${b} 100%);`);//FF3.6-15
                innerStyle.push('background:', `-webkit-linear-gradient(top, ${a} 0%,${b} 100%);`);//Chrome10-25,Safari5.1-6
                innerStyle.push('background:', `linear-gradient(to bottom, ${a} 0%,${b} 100%);`);//W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+
                innerStyle.push('filter:', `progid:DXImageTransform.Microsoft.gradient( startColorstr='${a}', endColorstr='${b}',GradientType=0 )`);//IE6-9
            } else {
                innerStyle.push('background-color:', v.backgroundColor, ';');
            }
        }

        /* override label div style */
        v.fontColor && labelStyle.push('color:', v.fontColor, ';');
        v.fontSize && labelStyle.push('font-size:', v.fontSize, 'px;');
        v.fontBold && labelStyle.push('font-weight:bold;');

        /* override divider div style */
        v.dividerWidth && dividerStyle.push('width:', v.dividerWidth, 'px;');

        /* override img tag style */
        v.iconWidth && imgStyle.push('width:', v.iconWidth, 'px;');
        v.iconHeight && imgStyle.push('height:', v.iconHeight, 'px;');

        v.progressVisible === false && pStyle.push('display:none;');

        return `
<div style="${outerDivSyle.join('')}">
    <label style="${aStyle.join('')}"class="ks-button ${aClass.join(' ')} ks-button-${v.skin} ">
        <div class="ks-button-inner" style="${innerStyle.join('')}">
            <div class="ks-button-content">
                <input style="opacity: 0;width: 0.1px;height: 0.1px;" onchange="" data-id="${o.id}" data-action="upload" type="file" multiple>
                <div class="ks-button-icon" style="${imgStyle.join('')}">${v.icon !== false ? `<span style="${imgStyle.join('')}" class="${v.icon}"></span>` : '' }</div>
                <div class="ks-button-divider" style="${dividerStyle.join('')}"></div>
                <div class="ks-button-label" style="${labelStyle.join('')}">${v.label}</div>
            </div>
        </div>
    </label>
    <div style="${pStyle.join('')}" class="progress"><div class="progress-bar" style="text-align: center;"></div></div>
</div>`;
    }

    initEventHandlers(section) {
        section.find('input').on('change', e => {
            let s = $(e.currentTarget), f = new FormData(), i = 0, size = 0, w = section.attr('id'), v = WidgetValue[w], m = v.maxFileSize, file, files = s[0].files, len = files.length;

            for (i = 0; i < len; ++i) {
                size += files[i].size;
            }

            if (size === 0){
                return;
            }

            if (size / 1048576 <= m) {
                v.fileNames = [];

                for (i = 0; i < len; ++i) {
                    file = files[i];
                    f.append('file' + i, file);
                    v.fileNames.push(file.name);
                }

                f.append('fileNum', len);

                v.form = f;

                Widget.doHandleSystemEvent(s, e);
            } else {
                app.fn.showPopup('Maximum file size: ' + m + ' mb!');

                s.val('');
            }
        });
    }
}
;