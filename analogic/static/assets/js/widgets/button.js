/* global app, El, Widget */

'use strict';

class ButtonWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d);

        let aClass = [],
            aStyle = this.getGeneralStyles(d).concat(this.getHtmlComponentStylesArray('main', d)),
            innerStyle = this.getHtmlComponentStylesArray('inner', d),
            contentStyle = this.getHtmlComponentStylesArray('content', d),
            iconStyle = this.getHtmlComponentStylesArray('icon', d),
            iconSpanStyle = this.getHtmlComponentStylesArray('iconSpan', d),
            dividerStyle = this.getHtmlComponentStylesArray('divider', d),
            labelStyle = this.getHtmlComponentStylesArray('label', d),
            iconInfo;

        /* Override css */

        /* Add defined css class */
        v.icon !== false && aClass.push('has-icon');
        v.label !== '' && aClass.push('has-label');
        v.effect === 'shadow' && aClass.push('has-box-shadow');
        v.iconPosition === 'left' ? aClass.push('pos-icon-left') : aClass.push('pos-icon-right');
        v.isInfo !== false && aClass.push('ks-button-info');

        /* override a tag style */
        v.borderColor && aStyle.push('background-color:', v.borderColor, ';');
        v.borderWidth && aStyle.push('padding:', v.borderWidth, 'px;');

        /* override inner div style */
        if (v.cornerRadius) {
            aStyle.push('border-radius:', v.cornerRadius, 'px;');
            innerStyle.push('border-radius:', v.cornerRadius - 1, 'px;');
        }

        if (v.backgroundColor) {
            let a = v.gradient[0], b = v.gradient[1];

            if (v.gradient) {
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
        iconInfo = this.getIcon(v, iconSpanStyle);

        this.setValues(d, v);

        return `
<a style="${aStyle.join('')}" ${o.confirmMessage2 ? `data-confirmmessage2="${o.confirmMessage2}" ` : ''} ${o.confirmMessage ? `data-confirmmessage="${o.confirmMessage}" ` : ''} ${v.url ? `target="_blank" href="${v.url}" data-id="${o.id}" data-action="${v.paste ? "launchpaste" : "launch"}" ` : `data-id="${o.id}" data-action="${v.paste ? "launchpaste" : "launch"}"`} class="ks-button ${aClass.join(' ')} ks-button-${v.skin} ">
    <div class="ks-button-inner" style="${innerStyle.join('')}">
        <div class="ks-button-content" style="${contentStyle.join('')}">
            <div class="ks-button-icon" style="${iconStyle.join('')}">${v.icon !== false ? iconInfo.html : ''}</div>
            <div class="ks-button-divider" style="${dividerStyle.join('')}"></div>
            <div class="ks-button-label" title="${Utils.htmlEncode(v.label)}" style="${labelStyle.join('')}">${v.label}</div>
        </div>
    </div>
</a>`;
    }

    getIcon(v, imgStyle = []) {
        let imgStyleStr;
        v.iconWidth && imgStyle.push('width:', v.iconWidth, 'px;');
        v.iconHeight && imgStyle.push('height:', v.iconHeight, 'px;');
        v.iconColor && imgStyle.push('color:', v.iconColor, ';');
        v.iconFontSize && imgStyle.push('font-size:', v.iconFontSize, 'px;');
        imgStyleStr = imgStyle.join('');
        return {style: imgStyleStr, html: `<span style="${imgStyleStr}" class="${v.icon}"></span>`};
    }

    setValues(data, v) {
        this.data = data;
        this.paste = v.paste;
        this.enabled = v.enabled;
        this.label = v.label;
        this.loadedData = data;
        this.contextMenuEnabled = v.contextMenuEnabled;
    }

    reset() {
        delete this.data;
        delete this.paste;
        delete this.enabled;
        delete this.label;
        delete this.loadedData;
        delete this.contextMenuEnabled;
    }

    getCssPrefix() {
        return 'ks-button';
    }

    updateHtml(data) {
        const o = this.options, v = this.getParameters(data), section = this.getSection(),
            main = section.children(),
            innerDiv = section.find('.ks-button-inner'),
            iconDiv = section.find('.ks-button-icon'),
            labelDiv = section.find('.ks-button-label'),
            generalStyles = this.getGeneralStyles(data),
            iconStyle = this.getHtmlComponentStylesArray('icon', data),
            iconSpanStyle = this.getHtmlComponentStylesArray('iconSpan', data);
        let iconInfo;

        this.setValues(data, v);

        this.updateHtmlComponent('main', data, main);
        this.updateHtmlComponent('inner', data, innerDiv);
        this.updateHtmlComponent('content', data, null, section);
        this.updateHtmlComponent('divider', data, null, section);
        this.updateHtmlComponent('icon', data, iconDiv);
        this.updateHtmlComponent('label', data, labelDiv);


        //section
        if (v.applyMeasuresToSection) {
            Widget.setOrRemoveStyle(section, 'width', v.width ? Widget.getPercentOrPixel(v.width) : false);
            Widget.setOrRemoveStyle(section, 'height', v.height ? Widget.getPercentOrPixel(v.height) : false);
        }

        v.visible ? section.show() : section.hide();

        //main
        this.updateMeasures(main, generalStyles);
        v.borderColor && main.css('border-color', v.borderColor);
        if (v.skin) {
            Widget.setSkin(main, 'ks-button-', v.skin);
        }

        //inner
        v.backgroundColor && innerDiv.css('background-color', v.backgroundColor);
        v.borderWidth && innerDiv.css('border-width', v.borderWidth);
        v.dividerWidth && innerDiv.css('divider-width', v.dividerWidth);

        //icon

        if (v.icon !== false) {
            iconInfo = this.getIcon(v, iconSpanStyle);
            iconDiv.attr('style', iconStyle.join(''));
            iconDiv.html(iconInfo.html);
        } else {
            iconDiv.html('');
        }

        //label

        if (v.label !== '') {
            labelDiv.html(v.label);
            !main.hasClass('has-label') && main.addClass('has-label');
        } else {
            labelDiv.html('');
            main.hasClass('has-label') && main.removeClass('has-label');
        }

        v.fontColor && labelDiv.css('color', v.fontColor);
    }

    getParameters(d) {
        return {
            backgroundColor: this.getRealValue('backgroundColor', d, false),
            borderColor: this.getRealValue('borderColor', d, false),
            borderWidth: this.getRealValue('borderWidth', d, 1),
            cornerRadius: this.getRealValue('cornerRadius', d, false),//-
            dividerWidth: this.getRealValue('dividerWidth', d, false),
            effect: this.getRealValue('effect', d, false),//-
            enabled: this.getRealValue('enabled', d, true),
            fontBold: this.getRealValue('fontBold', d, false),
            fontColor: this.getRealValue('fontColor', d, false),
            fontSize: this.getRealValue('fontSize', d, false),
            gradient: this.getRealValue('gradient', d, false),//-
            icon: this.getRealValue('icon', d, false),
            iconColor: this.getRealValue('iconColor', d, false),
            iconFontSize: this.getRealValue('iconFontSize', d, false),
            iconHeight: this.getRealValue('iconHeight', d, false),
            iconPosition: this.getRealValue('iconPosition', d, 'left'),
            iconWidth: this.getRealValue('iconWidth', d, false),
            isInfo: this.getRealValue('isInfo', d, false),//-
            label: this.getRealValue('label', d, ''),
            contextMenuEnabled: this.getRealValue('contextMenuEnabled', d, false),
            paste: this.getRealValue('paste', d, false),//-
            skin: this.getRealValue('skin', d, 'standard'),
            url: this.getRealValue('url', d, false),//-
            visible: this.getRealValue('visible', d, true)
        };
    }

    initEventHandlers() {
        const section = this.getSection();
        let v = this;
        if (v.enabled === false) {
            return;
        }
        if (this.contextMenuEnabled) {
            section.off('contextmenu').on('contextmenu', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                contextMenu.show($(e.currentTarget).find('.ks-button-inner'), [{
                    key: 'openInNewTab', label: 'Open in new tab', action: () => {
                        const element = $('<div>');
                        element.data({
                            action: 'contextMenuAction',
                            id: v.options.id,
                            actionName: 'openInNewTab'
                        });
                        Widget.doHandleSystemEvent(element, e);

                        if (this.amIOnAGridTable()) {
                            Widget.doHandleGridTableSystemEvent(element, e);
                        }
                    }
                }], true);
            });
        }
        if (!section.find('a').data('confirmmessage') && !section.find('a').data('confirmmessage2')) {
            return section.find('a').off('click').on('click', (e) => {
                let s = $(e.currentTarget);
                if (v.paste) {
                    navigator.clipboard.readText().then(text => {
                        v['clipboard'] = text;
                        Widget.doHandleSystemEvent(s, e);

                        if (this.amIOnAGridTable()) {
                            Widget.doHandleGridTableSystemEvent(s, e);
                        }
                    }).catch(err => L('Read from clipboard failed: ', err));
                } else {
                    Widget.doHandleSystemEvent(s, e);

                    if (this.amIOnAGridTable()) {
                        Widget.doHandleGridTableSystemEvent(s, e);
                    }
                }
            });
        }
        let instance = this;
        if (section.find('a').data('confirmmessage2')) {
            return section.find('a').on('click', (e) => {
                let w = $(e.currentTarget), t = [];
                t.push('<div id="buttonPopup" class="ks-popup ks-popup-holder"><div class="ks-popup-background"></div><div class="ks-popup-content-holder"><div class="ks-popup-content">');
                t.push(w.data('confirmmessage2'));
                t.push('<br><br><a id="deleteOk" class="ks-popup-button">Ok</a><a id="deleteCancel"  class="ks-popup-button-cancel">Cancel</a></div></div></div>');
                El.body.prepend(t.join('')).promise().then(() => {
                    $('#deleteOk').on('click', () => {
                        Widget.doHandleSystemEvent(w, e);
                        if (instance.amIOnAGridTable()) {
                            Widget.doHandleGridTableSystemEvent(w, e);
                        }
                        $('#buttonPopup').remove();
                    });

                    $('#deleteCancel').on('click', () => {
                        $('#buttonPopup').remove();
                    });
                });
            });
        }

        //todo van használva valahol?(horizontal table)
        section.find('a').on('click', e => {
            let w = $(e.currentTarget), p = w.parent().parent(), t = [];

            t.push('<div class="row"><div class="col-12"><div class="row"><div class="col-12"><h4 style="margin-top: 20px;margin-bottom: 20px;">', w.data('confirmmessage'), '</h4></div></div></div></div>');
            t.push('<div class="row"><div class="col-12"><div class="row">');
            t.push('<div class="col-6"><a id="deleteOk" class="widget-btn button-widget">OK</a></div>');
            t.push('<div class="col-6"><a id="deleteCancel" style="text-align: center;display:block;" class="widget-link-cancel button-widget-cancel">CANCEL</a></div>');
            t.push('</div></div></div>');

            El.body.prepend(`<div id="horizontalpopup" style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;z-index: 8;"></div>`);

            p.append(`<div class="widget-table-row-edit-menu" style="right:-150px;">${t.join('')}</div>`).promise().then(() => {
                let c = p.find('.widget-table-row-edit-menu'), g = $('#horizontalpopup');

                g.on('click', () => {
                    g.remove();
                    c.remove();
                });

                $('#deleteOk').on('click', () => {
                    Widget.doHandleSystemEvent(w, e);
                    g.remove();
                    c.remove();
                });

                $('#deleteCancel').on('click', () => {
                    g.remove();
                    c.remove();
                });
            });
        });
    }
}
;