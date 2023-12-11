/* global SwipeWidget, PopupWidget, QB  */

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

    initFinished() {
        this.c.initFinished();
    }

    refreshFinished() {
        this.c.refreshFinished();
    }

    updateContentFinished() {
        this.c.updateContentFinished();
    }

    triggerFinishedEvent(eventType = 'init') {
        this.c.triggerFinishedEvent(eventType);
    }

    initEventHandlers(s) {
        this.c.initEventHandlers(s);
    }

    reset() {
        this.c.reset();
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

    reRenderWidget(withState = false, withLoader = true, previouslyLoadedData = false) {
        return this.c.reRenderWidget(withState, withLoader, previouslyLoadedData);
    }

    updateWidgetContent(withLoader = true) {
        return this.c.updateWidgetContent(withLoader);
    }

    render(withState, refresh, useDefaultData = false) {
        return this.c.render(withState, refresh, useDefaultData);
    }

    addListeners() {
        this.c.addListeners();
    }

    updateContent(event, data = false, loadFunction = QB.loadData) {
        return this.c.updateContent(event, data, loadFunction);
    }

    updateHtml(data) {
        return this.c.updateHtml(data);
    }

    getTooltip() {
        const widget = this.c;

        if (!widget) {
            return null;
        }

        if (widget.dynamicTooltip) {
            return widget.dynamicTooltip;
        }

        if ('undefined' !== typeof widget.options['tooltip']) {
            return widget.options['tooltip'];
        }

        return null;
    }
}
;