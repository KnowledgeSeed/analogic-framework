/* global app, Doc, El, Utils, Widget */

'use strict';
class SwipeWidget extends Widget {

    getHtml(widgets, d) {
        d = d || {};

        const v = {
            id: this.id,
            backdrop: this.getRealValue('backdrop', d, false),
            bgColor: this.getRealValue('bgColor', d),
            bgScrollable: this.getRealValue('bgScrollable', d, true),
            closeBtn: this.getRealValue('closeBtn', d, false),
            closedSizeStr: Utils.getSize(this.getRealValue('closedSize', d, 30)),
            fixed: this.getRealValue('fixed', d, true),
            heightStr: Utils.getSize(this.getRealValue('height', d, 200)),
            pinned: this.getRealValue('pinned', d, true),
            position: this.getRealValue('position', d, 'bottom'),
            skin: this.getRealValue('skin', d, 'standard'),
            fadingSpeed: this.getRealValue('fadingSpeed', d, 300),
            widthStr: Utils.getSize(this.getRealValue('width', d, 400))
        };

        const s = [], w = v.widthStr, h = v.heightStr, isVertical = ('top' === v.position || 'bottom' === v.position);

        let alignmentClass = '';

        if (v.bgColor) {
            s.push('background-color:' + v.bgColor + ';');
        }

        if (!v.fixed) {
            s.push('position: absolute;');
        }

        s.push('width:', w, ';height:', h, ';');

        if (isVertical) {
            v.sizeStr = h;
            v.swipeAxis = 'height';
            alignmentClass = 'aligned-center-horizontal';
        } else {
            v.sizeStr = w;
            v.swipeAxis = 'width';
            alignmentClass = 'aligned-center-vertical';
        }

        v.size = parseFloat(v.sizeStr);
        v.closedSize = parseFloat(v.closedSizeStr);

        this.value = v;

        const p = v.pinned ? 0 : this.calculateSwipeOutCss()[v.position];

        s.push(v.position, ':', p, ';');

        this.value = v;

        return `
${v.backdrop ? '<div class="ks-container-backdrop" style="display: none;"><\/div>' : ''}
<div class="ks-container ${alignmentClass} ks-container-${v.skin}" style="${s.join('')}">
    <div class="ks-container-background">
        <div class="ks-container-content">${v.closeBtn ? '<div class="div-x"><span class="icon-x"><\/span><\/div>' : ''}${widgets.join('')}</div>
    </div>
</div>`;
    }

    initEventHandlers() {
        const section = this.getSection(), v = this.value;

        this.section = section;
        this.section.find('.div-x').on('click', () => this.close());

        this.container = section.children().last();
        this.backdrop = this.container.prev();

        if (!v.pinned) {
            this.container.on(app.clickEvent + ' mouseenter swipeIn', () => this.swipeIn()).on('mouseleave swipeOut', () => this.swipeOut());
        }

        SwipeWidget.swipesByIds[v.id] = this;
    }

    static windowResized() {
        let v, i;

        for (i in SwipeWidget.swipesByIds) {
            v = SwipeWidget.swipesByIds[i].value;

            if (!v.pinned) {
                v.adjustSwipeOutCss();
            }
        }
    }

    close() {
        this.section.fadeOut(this.value.fadingSpeed);

        this.isSwiped = false;

        this.adjustBgScrolling();
    }

    swipeIn() {
        if (this.isSwipingIn) {
            return;
        }

        this.isSwipingIn = true;

        const v = this.value;

        this.container.animate({[v.position]: 0}, v.fadingSpeed, () => {
            this.isSwipingIn = false;
            this.isSwiped = true;

            this.adjustBgScrolling();
        });

        this.backdrop.fadeIn(v.fadingSpeed);
    }

    swipeOut() {
        if (this.isSwipingOut) {
            return;
        }

        this.isSwipingOut = true;

        const v = this.value, size = this.container[v.swipeAxis](), c = v.closedSizeRatio ? v.closedSizeRatio * size : v.closedSize;

        this.container.animate({[v.position]: c - size}, v.fadingSpeed, () => {
            this.adjustSwipeOutCss();

            this.isSwiped = false;

            this.adjustBgScrolling();

            this.isSwipingOut = false;
        });

        this.backdrop.fadeOut(v.fadingSpeed);
    }

    adjustSwipeOutCss() {
        this.container.css(this.calculateSwipeOutCss());
    }

    adjustBgScrolling() {
        if (!this.value.bgScrollable) {
            El.body.css('overflow', this.isSwiped ? ' hidden' : 'auto');
        }
    }

    calculateSwipeOutCss() {
        const v = this.value;

        if (-1 !== v.closedSizeStr.indexOf('%')) {
            v.closedSizeRatio = v.closedSize / 100;

            if (-1 === v.sizeStr.indexOf('%')) {
                v.closedSizeStr = (v.closedSize * v.size / Doc[v.swipeAxis]()) + '%';
            } else {
                v.closedSizeStr = (v.closedSize * v.size / 100) + '%';
            }
        }

        return {[v.position]: 'calc(' + v.closedSizeStr + ' - ' + v.sizeStr + ')'};
    }
}
;

SwipeWidget.swipesByIds = {};