/* global app, Widget, Widgets */

'use strict';

class ImageUploadWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;

        const params = {
            allowedMimeTypes: this.getRealValue('allowedMimeTypes', d, false),
            allowedWidthInPixel: this.getRealValue('allowedWidthInPixel', d, false),
            allowedHeightInPixel: this.getRealValue('allowedHeightInPixel', d, false),
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
            maxFileSizePerFile: this.getRealValue('maxFileSizePerFile', d, 5),
            progressVisible: this.getRealValue('progressVisible', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            uploadSuccessMessage: this.getRealValue('uploadSuccessMessage', d, 'Upload success'),
            showUploadSuccessMessage: this.getRealValue('showUploadSuccessMessage', d, false),
            skipStoppingTheLoaderAfterSuccessUpload: this.getRealValue('skipStoppingTheLoaderAfterSuccessUpload', d, false)
        };

        this.maxFileSize = params.maxFileSize;
        this.maxFileSizePerFile = params.maxFileSizePerFile;
        this.uploadSuccessMessage = params.uploadSuccessMessage;
        this.showUploadSuccessMessage = params.showUploadSuccessMessage;
        this.skipStoppingTheLoaderAfterSuccessUpload = params.skipStoppingTheLoaderAfterSuccessUpload;
        this.allowedMimeTypes = params.allowedMimeTypes;
        this.allowedWidthInPixel = params.allowedWidthInPixel;
        this.allowedHeightInPixel = params.allowedHeightInPixel;

        let aClass = [], aStyle = this.getWidthAndHeight(d), pStyle = [...aStyle],
            innerStyle = this.getHtmlComponentStylesArray('inner', d),
            labelStyle = this.getHtmlComponentStylesArray('label', d),
            dividerStyle = this.getHtmlComponentStylesArray('divider', d),
            imgStyle = this.getHtmlComponentStylesArray('img', d);
        let outerDivSyle = this.getPaddings(d).concat(this.getMargins(d));

        /* Override css */

        /* Add defined css class */
        params.icon !== false && aClass.push('has-icon');
        params.label !== '' && aClass.push('has-label');
        params.effect === 'shadow' && aClass.push('has-box-shadow');
        params.iconPosition === 'left' ? aClass.push('pos-icon-left') : aClass.push('pos-icon-right');

        /* override a tag style */
        params.borderColor && aStyle.push('background-color:', params.borderColor, ';');
        aStyle.push('padding:', params.borderWidth, 'px;');

        /* overrid inner div style */
        if (params.cornerRadius) {
            aStyle.push('border-radius:', params.cornerRadius, 'px;');
            innerStyle.push('border-radius:', params.cornerRadius - 1, 'px;');
        }

        if (params.backgroundColor) {
            if (params.gradient) {
                const a = params.gradient[0], b = params.gradient[1];
                innerStyle.push('background:', a, ';');//old browsers
                innerStyle.push('background:', `-moz-linear-gradient(top, ${a} 0%, ${b} 100%);`);//FF3.6-15
                innerStyle.push('background:', `-webkit-linear-gradient(top, ${a} 0%,${b} 100%);`);//Chrome10-25,Safari5.1-6
                innerStyle.push('background:', `linear-gradient(to bottom, ${a} 0%,${b} 100%);`);//W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+
                innerStyle.push('filter:', `progid:DXImageTransform.Microsoft.gradient( startColorstr='${a}', endColorstr='${b}',GradientType=0 )`);//IE6-9
            } else {
                innerStyle.push('background-color:', params.backgroundColor, ';');
            }
        }

        /* override label div style */
        params.fontColor && labelStyle.push('color:', params.fontColor, ';');
        params.fontSize && labelStyle.push('font-size:', params.fontSize, 'px;');
        params.fontBold && labelStyle.push('font-weight:bold;');

        /* override divider div style */
        params.dividerWidth && dividerStyle.push('width:', params.dividerWidth, 'px;');

        /* override img tag style */
        params.iconWidth && imgStyle.push('width:', params.iconWidth, 'px;');
        params.iconHeight && imgStyle.push('height:', params.iconHeight, 'px;');

        params.progressVisible === false && pStyle.push('display:none;');

        return `
<div style="${outerDivSyle.join('')}">
    <label style="${aStyle.join('')}"class="ks-button ${aClass.join(' ')} ks-button-${params.skin} ">
        <div class="ks-button-inner" style="${innerStyle.join('')}">
            <div class="ks-button-content">
                <input style="opacity: 0;width: 0.1px;height: 0.1px;" data-id="${o.id}" data-action="uploadImage" type="file" multiple>
                <div class="ks-button-icon" style="${imgStyle.join('')}">${params.icon !== false ? `<span style="${imgStyle.join('')}" class="${params.icon}"></span>` : ''}</div>
                <div class="ks-button-divider" style="${dividerStyle.join('')}"></div>
                <div class="ks-button-label" style="${labelStyle.join('')}">${params.label}</div>
            </div>
        </div>
    </label>
    <div style="${pStyle.join('')}" class="progress"><div class="progress-bar" style="text-align: center;"></div></div>
</div>`;
    }

    initEventHandlers() {
        let ww = this;
        this.getSection().find('input').on('change', async e => {
            let s = $(e.currentTarget), f = new FormData(), i, size = 0,
                m = ww.maxFileSize, mf = ww.maxFileSizePerFile, file, files = s[0].files, len = files.length,
                amt = ww.allowedMimeTypes, aw = ww.allowedWidthInPixel, ah = ww.allowedHeightInPixel;

            for (i = 0; i < len; ++i) {
                file = files[i];

                if (file.size / 1048576 > mf) {
                    Api.showPopup('Maximum file size per file: ' + mf + ' mb!');
                    s.val('');
                    return;
                }

                size += file.size;

                if (amt && !amt.includes(file.type)) {
                    Api.showPopup('Only ' + amt.join(',') + ' files are allowed!');
                    s.val('');
                    return;
                }

                if (aw && ah) {
                    let valid = await ww.validateImageDimensions(file, 640, 360);
                    if (!valid) {
                        Api.showPopup('Image dimensions must be ' + aw + 'x' + ah + ' pixels!');
                        s.val('');
                        return;
                    }
                }
            }

            if (size === 0) {
                return;
            }

            if (size / 1048576 <= m) {
                ww.fileNames = [];

                for (i = 0; i < len; ++i) {
                    file = files[i];
                    f.append('file' + i, file);
                    ww.fileNames.push(file.name);
                }

                f.append('fileNum', len);

                ww.form = f;

                Widget.doHandleSystemEvent(s, e);
            } else {
                Api.showPopup('The maximum size of all files: ' + m + ' mb!');

                s.val('');
            }
        });
    }

    validateImageDimensions(file, requiredWidth, requiredHeight) {
        return new Promise((resolve) => {
            let img = new Image();
            img.onload = () => {
                resolve(img.width === requiredWidth && img.height === requiredHeight);
            };
            img.onerror = () => {
                resolve(false);
            };
            img.src = URL.createObjectURL(file);
        });
    }

    reset() {
        delete this.maxFileSize;
        delete this.maxFileSizePerFile;
        delete this.uploadSuccessMessage;
        delete this.showUploadSuccessMessage;
        delete this.allowedMimeTypes;
        delete this.allowedWidthInPixel;
        delete this.allowedHeightInPixel;
    }
}
;