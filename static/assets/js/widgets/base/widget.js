/* global app */

'use strict';
Object.defineProperties(app.symbol, {
    options: {value: Symbol()}
});

class Widget {

    constructor(options) {
        if ('object' !== typeof options) {
            throw new TypeError('The "object" parameter has to be a valid widget-config Object of app.widgetConfig!');
        }

        if (!this.getHtml) {
            throw new TypeError('The "getHtml" method must be implemented for the "' + this.name + '" object!');
        }

        this[app.symbol.options] = options;
    }

    render(withState, refresh, useDefaultData = false, loadFunction = app.fn.loadData) {
        const o = this.options, instance = this;

        if (withState && 'PageWidget' === instance.constructor.name) {
            this.addListeners();

            return $.Deferred().resolve(app.pageState[o.id]);
        }

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                app.listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        if (o.depends) {//grid
            const f = o.id.split('_'), a = f[0], b = f[1];

            for (let l of o.depends) {
                app.listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.action + '.' + a + '_' + b + '_' + l.col + '.finished',
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        app.listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: app.fn.handleListener});

        let useDefaultDataForChildren = (o.visible === false && !refresh && o.notLoadIfHidden) || useDefaultData;

        //rekurzív renderelés, adatbetöltéssel

        return loadFunction(o.id, instance.constructor.name, useDefaultDataForChildren).then(function (data) {
            let deffered = [], w;

            for (w of widgets) {
                deffered.push(w.render(withState, refresh, useDefaultDataForChildren));
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                let processedData = instance.processData(data);
                let visible = processedData && typeof processedData.visible !== "undefined" ? processedData.visible : o.visible;
                return instance.getMainHtmlElement(o, processedData, visible, widgetHtmls, withState);
            });
        });
    }

    getMainHtmlElement(o, data, visible, widgetHtmls, withState) {
        if (app.useDraggable) {
            let gs = this.getGeneralStyles(data);
            if (visible === false) {
                gs.push('display:none;');
            }
            return `<section ${o.ordinal ? `data-ordinal="${o.ordinal}"` : ''} ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : app.utils.getRandomId()}">${this.getHtml(widgetHtmls, data, withState)}</section>`;

        } else {

            let gs = [];
            if (visible === false) {
                gs.push('display:none;');
            }
            return `<section ${o.ordinal ? `data-ordinal="${o.ordinal}"` : ''} ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : app.utils.getRandomId()}">${this.getHtml(widgetHtmls, data, withState)}</section>`;
        }
    }

    embeddedRender(withState, data, loadFunction = app.fn.loadData) { //az adat a befoglaló widgettől jön
        const o = {...this.options, ...data};
        const instance = this;


        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                app.listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        if (o.depends) {//grid
            const f = o.id.split('_');
            for (let l of o.depends) {
                app.listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.action + '.' + f[0] + '_' + f[1] + '_' + l.col + '.finished',
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        app.listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: app.fn.handleListener});

        //rekurzív renderelés, adatbetöltéssel

        return loadFunction(o.id, instance.constructor.name).then(function () {
            let deffered = [], w;

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }
                let visible = data && typeof data.visible !== "undefined" ? data.visible : o.visible;
                return instance.getMainHtmlElement(o, data, visible, widgetHtmls, withState);
            });
        });
    }

    addListeners() {
        const o = this.options;
        let widgetOptions, widgets = [], w;

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                app.listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters ? l.parameters : [],
                    handler: app.fn.handleListener
                });
            }
        }

        app.listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: app.fn.handleListener});

        for (w of widgets) {
            w.addListeners();
        }
    }

    initEvents(withState) {
        const o = this.options;

        let widgetOptions, widgets = [], w;

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        for (w of widgets) {
            w.initEvents(withState);
        }

        let section = $('#' + o.id);

        this.initEventHandlers(section, withState);
    }

    initEventHandlers() {

    }

    processData(data) {
        return data;
    }

    amIOnAGridTable() {
        const o = this.options;
        return (o.id.split('_').length - 1) === 2;
    }

    static handleSystemEvent(element, triggerEventName, filterSelector, updateValue = true, allowBubblingUp = false) {
        element.on(triggerEventName, filterSelector, event => {
            Widget.doHandleSystemEvent($(event.currentTarget), event, updateValue);

            return allowBubblingUp;
        });
    }

    static doHandleSystemEvent(element, event, updateValue = true) {
        let a = element.data('action'), i = element.data('id');

        const eventMapId = a + '.' + i;

        app.el.body.triggerHandler(eventMapId + '.started');

        if (app.widgetValue[i] && updateValue === true) {
            app.widgetValue[i][a] = element.data();
        }

        app.fn.handleSystemEvent(eventMapId, event, element);
    }

    static doHandleGridTableSystemEvent(element, event, updateValue = true) {
        let a = element.data('action'), i = element.data('id'), idParts = i.split('_');

        const eventMapId = a + '.' + idParts[0] + '_row_' + idParts[2];

        app.el.body.triggerHandler(eventMapId + '.started');

        if (app.widgetValue[i] && updateValue === true) {
            app.widgetValue[i][a] = element.data();
        }

        app.fn.handleSystemEvent(eventMapId, event, element);
    }

    get options() {
        return this[app.symbol.options];
    }

    set options(n) {
        throw new Error('Don\'t change the "options" property on this object!');
    }

    get state() {
        return app.widgetState[this.options.id] || {};
    }

    set state(stateObject) {
        app.widgetState[this.options.id] = stateObject;
    }

    get value() {
        return app.widgetValue[this.options.id] || {};
    }

    set value(valueObject) {
        app.widgetValue[this.options.id] = valueObject;
    }

    get name() {
        return this.constructor.name;
    }

    set name(n) {
        throw new Error('Don\'t change the "name" property on this object!');
    }

    getRealValue(key, data = {}, defaultVal = '') {
//        if ('undefined' !== typeof this.value[key]) {
//            return this.value[key];
//        }

        if ('undefined' !== typeof data[key]) {
            return data[key];
        }

        if ('undefined' !== typeof this.options[key]) {
            return this.options[key];
        }

        return defaultVal;
    }

    getGeneralStyles(data = {}, defaults = {}){
        let styles = this.getWithAndHeight(data, defaults);
        styles = styles.concat(this.getPaddings(data, defaults));
        styles = styles.concat(this.getMargins(data, defaults));

//        const marginBottom = this.getRealValue('marginBottom', data, defaults.marginBottom);
//        const marginLeft = this.getRealValue('marginLeft', data, defaults.marginLeft);
//        const marginRight = this.getRealValue('marginRight', data, defaults.marginRight);
//        const marginTop = this.getRealValue('marginTop', data, defaults.marginTop);
//
//        const paddingBottom = this.getRealValue('paddingBottom', data, defaults.paddingBottom);
//        const paddingLeft = this.getRealValue('paddingLeft', data, defaults.paddingLeft);
//        const paddingRight = this.getRealValue('paddingRight', data, defaults.paddingRight);
//        const paddingTop = this.getRealValue('paddingTop', data, defaults.paddingTop);
//
//        const height = this.getRealValue('height', data, defaults.height);
//        const width = this.getRealValue('width', data, defaults.width);
//
//        marginTop && styles.push('margin-top:', marginTop, marginTop !== 'auto' && !isNaN(marginTop) ? 'px;' : ';');
//        marginLeft && styles.push('margin-left:', marginLeft, marginLeft !== 'auto' && !isNaN(marginLeft) ? 'px;' : ';');
//        marginRight && styles.push('margin-right:', marginRight, marginRight !== 'auto' && !isNaN(marginRight) ? 'px;' : ';');
//        marginBottom && styles.push('margin-bottom:', marginBottom, marginBottom !== 'auto' && !isNaN(marginBottom) ? 'px;' : ';');
//
//        paddingTop && styles.push('padding-top:', paddingTop, paddingTop !== 'auto' && !isNaN(paddingTop) ? 'px;' : ';');
//        paddingLeft && styles.push('padding-left:', paddingLeft, paddingLeft !== 'auto' && !isNaN(paddingLeft) ? 'px;' : ';');
//        paddingRight && styles.push('padding-right:', paddingRight, paddingRight !== 'auto' && !isNaN(paddingRight) ? 'px;' : ';');
//        paddingBottom && styles.push('padding-bottom:', paddingBottom, paddingBottom !== 'auto' && !isNaN(paddingBottom) ? 'px;' : ';');
//
//        height && styles.push('height:', height, isNaN(height) ? ';' : 'px;');
//        width && styles.push('width:', width, isNaN(width) ? ';' : 'px;');

        return styles;
    }

    getWithAndHeight(data = {}, defaults = {}){
        const styles = [];

        const height = this.getRealValue('height', data, defaults.height);
        const width = this.getRealValue('width', data, defaults.width);

        height && styles.push('height:', height, isNaN(height) ? ';' : 'px;');
        width && styles.push('width:', width, isNaN(width) ? ';' : 'px;');

        return styles;
    }

    getPaddings(data = {}, defaults = {}){
        const styles = [];

        const paddingBottom = this.getRealValue('paddingBottom', data, defaults.paddingBottom);
        const paddingLeft = this.getRealValue('paddingLeft', data, defaults.paddingLeft);
        const paddingRight = this.getRealValue('paddingRight', data, defaults.paddingRight);
        const paddingTop = this.getRealValue('paddingTop', data, defaults.paddingTop);

        paddingTop && styles.push('padding-top:', paddingTop, paddingTop !== 'auto' && !isNaN(paddingTop) ? 'px;' : ';');
        paddingLeft && styles.push('padding-left:', paddingLeft, paddingLeft !== 'auto' && !isNaN(paddingLeft) ? 'px;' : ';');
        paddingRight && styles.push('padding-right:', paddingRight, paddingRight !== 'auto' && !isNaN(paddingRight) ? 'px;' : ';');
        paddingBottom && styles.push('padding-bottom:', paddingBottom, paddingBottom !== 'auto' && !isNaN(paddingBottom) ? 'px;' : ';');

        return styles;
    }

    getMargins(data = {}, defaults = {}){
        const styles = [];

        const marginBottom = this.getRealValue('marginBottom', data, defaults.marginBottom);
        const marginLeft = this.getRealValue('marginLeft', data, defaults.marginLeft);
        const marginRight = this.getRealValue('marginRight', data, defaults.marginRight);
        const marginTop = this.getRealValue('marginTop', data, defaults.marginTop);
        const height = this.getRealValue('height', data, defaults.height);

        marginTop && styles.push('margin-top:', marginTop, marginTop !== 'auto' && !isNaN(marginTop) ? 'px;' : ';');
        marginLeft && styles.push('margin-left:', marginLeft, marginLeft !== 'auto' && !isNaN(marginLeft) ? 'px;' : ';');
        marginRight && styles.push('margin-right:', marginRight, marginRight !== 'auto' && !isNaN(marginRight) ? 'px;' : ';');
        marginBottom && styles.push('margin-bottom:', marginBottom, marginBottom !== 'auto' && !isNaN(marginBottom) ? 'px;' : ';');
        height && styles.push('height:', height, isNaN(height) ? ';' : 'px;');

        return styles;
    }

    getWidthForSection(data = {}, defaults = {}){
        const styles = [];
        const width = this.getRealValue('width', data, defaults.width);
        if (!isNaN(width)) {
            return [];
        }
        width && styles.push('width:', width, isNaN(width) ? ';' : 'px;');

        return styles;
    }
}