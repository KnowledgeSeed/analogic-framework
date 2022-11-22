/* global app, El, Utils, Widget */

'use strict';

class PopupWidget extends Widget {

    getHtml(widgets, d) {
        d = d || {};

        const v = this.getParameters(d);


        const s = this.getHtmlComponentStylesArray('main', d), w = v.widthStr, h = v.heightStr,
            isVertical = ('top' === v.position || 'bottom' === v.position),
            backgroundStyle = this.getHtmlComponentStylesArray('background', d),
            contentStyle = this.getHtmlComponentStylesArray('content', d),
            backdropStyle = this.getHtmlComponentStylesArray('backdrop', d),
            closeBtnStyle = this.getHtmlComponentStylesArray('closeBtn', d)
        ;

        let alignmentClass = '', b = '';

        if (v.bgColor) {
            s.push('background-color:' + v.bgColor + ';');
        }

        if (!v.fixed) {
            s.push('position: absolute;');
        }

        s.push('width:', w, ';');

        if (v.heightFixed) {
            s.push('height:', h, ';');
        }


        if (v.anchor || v.anchorOnClick) {
            v.heightNum = parseFloat(h);
            v.widthNum = parseFloat(w);
            v.heightRatio = -1 === h.indexOf('%') ? null : v.heightNum / 100;
            v.widthRatio = -1 === w.indexOf('%') ? null : v.widthNum / 100;
        } else if ('center' === v.position) {
            alignmentClass = 'aligned-center-both';
        } else {
            alignmentClass = isVertical ? 'aligned-center-horizontal' : 'aligned-center-vertical';

            s.push(v.position, ':' + v.offset + 'px;');
        }

        this.value = v;

        return `
${v.backdrop ? `<div style="${backdropStyle.join('')}" class="ks-container-backdrop ks-container-${v.skin}"  ${b}></div>` : ''}
<div class="ks-container ${alignmentClass} ks-container-${v.skin}" style="${s.join('')}">
    <div style="${backgroundStyle.join('')}" class="ks-container-background">
        <div style="${contentStyle.join('')}"  class="ks-container-content">${v.closeBtn ? `<div style="${closeBtnStyle.join('')}" class="div-x"><span class="icon-x"></span></div>` : ''}${widgets.join('')}</div>
    </div>
</div>`;
    }

    updateHtml(data) {

    }

    getParameters(d) {
        const p = {
            id: this.options.id,
            anchor: this.getRealValue('anchor', d),
            anchorOnClick: this.getRealValue('anchorOnClick', d, false),
            anchorVisible: this.getRealValue('anchorVisible', d),
            backdrop: this.getRealValue('backdrop', d, false),
            bgColor: this.getRealValue('bgColor', d),
            bgScrollable: this.getRealValue('bgScrollable', d, true),
            closeBtn: this.getRealValue('closeBtn', d, false),
            closeOnClickBackdrop: this.getRealValue('closeOnClickBackdrop', d, true),
            fixed: this.getRealValue('fixed', d, true),
            heightFixed: this.getRealValue('heightFixed', d, true),
            heightStr: Utils.getSize(this.getRealValue('height', d, 200)),
            offset: this.getRealValue('offset', d, 0),
            position: this.getRealValue('position', d, 'center'),
            positionAndCalculateBestSpace: this.getRealValue('positionAndCalculateBestSpace', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            fadingSpeed: this.getRealValue('fadingSpeed', d, 300),
            visible: this.getRealValue('visible', d, true),
            widthStr: Utils.getSize(this.getRealValue('width', d, 400))
        };

        if (p.positionAndCalculateBestSpace) {
            p.position = false;
        }

        return p;
    }

    initEventHandlers() {
        const v = this.value, a = v.anchor;

        this.section = this.getSection();
        this.container = this.section.children().last();
        this.backdrop = this.container.prev();

        if (this.backdrop && v.closeOnClickBackdrop) {
            this.backdrop.on('click', () => this.close());
        }

        this.section.on('open', () => this.open());
        this.section.find('.div-x').on('click', () => this.close());

        if (a) {
            if ('string' === typeof a) {
                const anchorSection = $('#' + a);

                if (anchorSection.length) {
                    const anchorChildren = anchorSection.children();

                    v.anchor = 1 === anchorChildren.length ? anchorChildren : anchorSection;
                }
            } else {
                v.anchor = $('#' + (a.prop('id') || a.data('id')));
            }
        }

        if (v.visible) {
            this.open();
        }

        PopupWidget.popupsByIds[v.id] = this;
    }

    setAnchor(anchor) {
        this.value.anchor = anchor;

        return this;
    }

    getAnchor() {
        return this.value.anchor;
    }

    isAnchorOnClick() {
        return this.value.anchorOnClick;
    }

    toggle() {
        if (this.isOpened) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.container.css(this.getPositionByAnchor());
        this.section.fadeIn(this.value.fadingSpeed);

        this.isOpened = true;

        this.adjustBgScrolling();
    }

    getPositionByAnchor() {
        const v = this.value, a = v.anchor;

        if (!a) {
            return {};
        }

        const w = $(window), winHeight = w.height(), winWidth = w.width();
        const popupHeight = v.heightRatio ? v.heightRatio * winHeight : v.heightNum;
        const popupWidth = v.widthRatio ? v.widthRatio * winWidth : v.widthNum;
        const rect = a[0].getBoundingClientRect(), configOffset = v.offset;
        const anchorHeight = a.height(), anchorWidth = a.width(), pos = {};

        let bestSpace, offset = 0;

        if (v.position) {
            bestSpace = v.position;
        } else {
            const spaces = [['left', rect.x - popupWidth], ['right', winWidth - rect.right - popupWidth], ['top', rect.y - popupHeight], ['bottom', winHeight - rect.bottom - popupHeight]].sort((a, b) => a[1] < b[1]);

            if (v.positionAndCalculateBestSpace) {
                const space = spaces.filter(a => a[0] === v.positionAndCalculateBestSpace);
                if (v.positionAndCalculateBestSpace === 'right' && space[0][1] < 0) {
                    bestSpace = "left";
                } else {
                    bestSpace = space[0][0];
                }
            } else {
                bestSpace = spaces[0][0];
            }
        }

        if (v.anchorVisible) {
            this.container.removeClass('anchor-top anchor-right anchor-bottom anchor-left').addClass('anchor-' + bestSpace);
            offset = 15;
        }

        if ('bottom' === bestSpace) {
            pos.left = rect.x - (popupWidth - anchorWidth) / 2 + configOffset;
            pos.top = rect.bottom - offset;
        } else if ('top' === bestSpace) {
            pos.left = rect.x - (popupWidth - anchorWidth) / 2 + configOffset;
            pos.top = rect.y - popupHeight + offset;
        } else if ('right' === bestSpace) {
            pos.left = rect.right + offset;
            pos.top = rect.y - (popupHeight - anchorHeight) / 2 + configOffset;
        } else {
            pos.left = rect.x - popupWidth - offset;
            pos.top = rect.y - (popupHeight - anchorHeight) / 2 + configOffset;
        }

        if (!v.fixed) {
            pos.left += w.scrollLeft();
            pos.top += w.scrollTop();
        }

        return pos;
    }

    close() {
        this.section.fadeOut(this.value.fadingSpeed);

        this.isOpened = false;

        this.adjustBgScrolling();
    }

    adjustBgScrolling() {
        if (!this.value.bgScrollable) {
            El.body.css('overflow', this.isOpened ? ' hidden' : 'auto');
        }
    }
}
;

PopupWidget.popupsByIds = {};