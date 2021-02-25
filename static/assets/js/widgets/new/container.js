/* global SwipeWidget, PopupWidget  */

'use strict';

class ContainerWidget {

    constructor(options) {
        if ('swipe' === options.behaviour) {
            this.c = new SwipeWidget(options);
        } else {
            this.c = new PopupWidget(options);
        }
    }

    getHtml(widgets, d) {
        return this.c.getHtml(widgets, d);
    }

    initEvents(withState) {
        this.c.initEvents(withState);
    }

    initEventHandlers(s) {
        this.c.initEventHandlers(s);
    }

    open() {
        this.c.open();
    }

    setAnchor(a) {
        this.c.setAnchor(a);
    }

    isAnchorOnClick() {
        return this.c.isAnchorOnClick();
    }

    render(withState, refresh, useDefaultData = false) {
        return this.c.render(withState, refresh, useDefaultData);
    }
}
;