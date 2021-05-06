/* global app, El, Widget */

'use strict';

class ButtonWidget extends Widget {
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
            iconColor: this.getRealValue('iconColor', d, false),
            iconHeight: this.getRealValue('iconHeight', d, false),
            iconPosition: this.getRealValue('iconPosition', d, 'left'),
            iconWidth: this.getRealValue('iconWidth', d, false),
            isInfo: this.getRealValue('isInfo', d, false),
            label: this.getRealValue('label', d, ''),
            skin: this.getRealValue('skin', d, 'standard'),
            url: this.getRealValue('url', d, false)
        };

        let aClass = [], aStyle = this.getGeneralStyles(d), innerStyle = [], labelStyle = [], dividerStyle = [], imgStyle = [];

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

        /* overrid inner div style */
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

        /* override img tag style */
        v.iconWidth && imgStyle.push('width:', v.iconWidth, 'px;');
        v.iconHeight && imgStyle.push('height:', v.iconHeight, 'px;');
        v.iconColor && imgStyle.push('color:', v.iconColor, ';');

        return `
<a style="${aStyle.join('')}" ${o.confirmMessage ? `data-confirmmessage="${o.confirmMessage}" ` : ''} ${v.url ? `target="_blank" href="${v.url}"` : `data-id="${o.id}" data-action="launch"`} class="ks-button ${aClass.join(' ')} ks-button-${v.skin} ">
    <div class="ks-button-inner" style="${innerStyle.join('')}">
        <div class="ks-button-content">
            <div class="ks-button-icon" style="${imgStyle.join('')}">${v.icon !== false ? `<span style="${imgStyle.join('')}" class="${v.icon}"></span>` : '' }</div>
            <div class="ks-button-divider" style="${dividerStyle.join('')}"></div>
            <div class="ks-button-label" title="${v.label}" style="${labelStyle.join('')}">${v.label}</div>
        </div>
    </div>
</a>`;
    }

    initEventHandlers(section) {
        if (!section.find('a').data('confirmmessage')) {
            return section.find('a').on('click', (e) => {
                let s = $(e.currentTarget);

                Widget.doHandleSystemEvent(s, e);

                if (this.amIOnAGridTable()) {
                    Widget.doHandleGridTableSystemEvent(s, e);
                }
            });
        }

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