/* global app, El, EventMap, Listeners, QB, PageState, Repository, Utils, WidgetConfig, WidgetValue, Widgets */

'use strict';
const WidgetState = {};

class Widget {

    constructor(options) {
        if ('object' !== typeof options) {
            throw new TypeError('The "object" parameter has to be a valid widget-config Object of WidgetConfig!');
        }

        if (!this.getHtml) {
            throw new TypeError('The "getHtml" method must be implemented for the "' + this.name + '" object!');
        }

        this.options = options;
    }

    getWidgetOptions(widgetOptions) {
        if (widgetOptions.import) {
            return v(widgetOptions.import, WidgetConfig);
        }

        return widgetOptions;
    }

    isContentUpdatable() {
        return true;
    }

    updateContent(event, data = false, loadFunction = QB.loadData) {
        const o = this.options, instance = this;
        let ww, widgetOptions, processedData, deferred = [];

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidgetOptions(widgetOptions);
            deferred.push(Widgets[ww.id].updateContent(event));
        }

        if (data !== false) {
            return $.when.apply($, deferred).then(function () {
                processedData = instance.processData(data);
                instance.updateHtml(processedData);
            });
        }

        return loadFunction(o.id, instance.name).then(function (d) {
            return $.when.apply($, deferred).then(function () {
                processedData = instance.processData(d);
                instance.updateHtml(processedData);
                return 'update';
            });
        });
    }

    updateHtml(data) {

    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        const o = this.options, instance = this, h = Listeners.handle;
        let ww;

        if (withState && 'PageWidget' === instance.name) {
            this.addListeners();

            return $.Deferred().resolve(PageState[o.id]);
        }

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidgetOptions(widgetOptions);
            widgets.push(Widgets[ww.id]);
        }

        if (o.depends) {//grid
            const f = o.id.split('_'), a = f[0], b = f[1];

            for (let l of o.depends) {
                Listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.event ? l.event : l.action + '.' + a + '_' + b + '_' + l.col + '.finished',
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

        this.addListeners(false);

        let useDefaultDataForChildren = (o.visible === false && !refresh && o.notLoadIfHidden) || useDefaultData;

        //rekurzív renderelés, adatbetöltéssel

        let afterLoad = (data) => {
            let deffered = [], w;

            for (w of widgets) {
                deffered.push(w.render(withState, refresh, useDefaultDataForChildren));
            }

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r, processedData = instance.processData(data), v = (processedData || {}).visible,
                    visible = undefined !== v ? v : o.visible;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                return instance.getMainHtmlElement(o, processedData, visible, widgetHtmls, withState);
            });
        };

        if (previouslyLoadedData !== false) {
            return afterLoad(previouslyLoadedData);
        }

        return loadFunction(o.id, instance.name, useDefaultDataForChildren).then(function (data) {
            return afterLoad(data);
        });
    }

    getMainHtmlElement(o, data, visible, widgetHtmls, withState) {
        let gs = [], html;

        if (o.applyMeasuresToSection === true) {
            gs = this.getWidthAndHeight(data);
        }

        if (visible === false) {
            gs.push('display:none;');
        }

        let originalId = false, write = 'on';
        if (data && data.originalId) {
            originalId = data.originalId;
        }

        if (o.write) {
            write = o.write;
        }

        if (data && data.write) {
            write = data.write;
        }
        html = this.getHtml(widgetHtmls, data, withState);

        //TODO title ote
        //return `<section ${write === 'off' ? `data-write="off"` : ''} ${originalId !== false ? `data-originalId="${o.originalId}"` : ''} ${o.ordinal ? `data-ordinal="${o.ordinal}"` : ''} ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : Utils.getRandomId()}">${html}</section>`;
        return `<section ${write === 'off' ? `data-write="off"` : ''} ${originalId !== false ? `data-originalId="${o.originalId}"` : ''} ${o.ordinal ? `data-ordinal="${o.ordinal}"` : ''} ${o.margin ? 'class="wrapper"' : ''} style="${gs.join('')}" id="${o.id ? o.id : Utils.getRandomId()}">${html}</section>`;

    }

    embeddedRender(withState, data, loadFunction = QB.loadData) { //az adat a befoglaló widgettől jön
        const o = {...this.options, ...data}, instance = this, h = Listeners.handle;
        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
        }

        if (o.listen) {
            for (let l of o.listen) {
                Listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

        if (o.depends) {//grid
            const f = o.id.split('_'), a = f[0], b = f[1];

            for (let l of o.depends) {
                Listeners.push({
                    options: o,
                    method: 'refreshGridCell',
                    eventName: l.event ? l.event : l.action + '.' + a + '_' + b + '_' + l.col + '.finished',
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }
        if (new o.type(o).amIOnAGridTable()) {
            Listeners.push({options: o, method: 'refreshGridCell', eventName: 'forcerefresh.' + o.id, handler: h});
        }

        //rekurzív renderelés, adatbetöltéssel

        return loadFunction(o.id, instance.name).then(function () {
            let deffered = [];

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;

                return instance.getMainHtmlElement(o, data, visible, widgetHtmls, withState);
            });
        });
    }

    addListeners(recursive = true) {
        const o = this.options, h = Listeners.handle;
        let widgetOptions, widgets = [], w, ww;

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidgetOptions(widgetOptions);
            widgets.push(Widgets[ww.id]);
        }

        if (o.listen) {
            for (let l of o.listen) {
                Listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

        Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});
        Listeners.push({
            options: o,
            method: 'refreshWithoutLoader',
            eventName: 'refreshwithoutloader.' + o.id,
            handler: h
        });
        Listeners.push({options: o, method: 'updateContent', eventName: 'updatecontent.' + o.id, handler: h});
        Listeners.push({
            options: o,
            method: 'updateContentWithoutLoader',
            eventName: 'updatecontentwithoutloader.' + o.id,
            handler: h
        });
        this.appendListeners(o, h);

        if (recursive) {
            for (w of widgets) {
                w.addListeners();
            }
    }
    }

    appendListeners(options, handler) {

    }

    initFinished() {
        this.triggerFinishedEvent();
    }

    updateContentFinished() {
        this.triggerFinishedEvent('updateContent');
    }

    refreshFinished() {
        this.triggerFinishedEvent('refresh');
    }

    triggerFinishedEvent(eventType = 'init') {
        const o = this.options;

        let widgetOptions, widgets = [], w, ww;

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidgetOptions(widgetOptions);
            widgets.push(Widgets[ww.id]);
        }

        for (w of widgets) {
            w.triggerFinishedEvent(eventType);
        }

        El.body.triggerHandler(eventType + '.' + o.id + '.finished');

        let actions = EventMap[eventType + '.' + o.id + '.finished'], a;
        if (actions) {
            for (a of actions) {
                a.action(a.argument, {}, {});
            }
        }
        if (Repository[o.id] && Repository[o.id][eventType + 'Finished']) {
            Repository[o.id][eventType + 'Finished']();
    }
    }

    initEvents(withState) {
        const o = this.options, section = $('#' + o.id);

        let widgetOptions, widgets = [], w, ww;

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidgetOptions(widgetOptions);
            widgets.push(Widgets[ww.id]);
        }

        for (w of widgets) {
            w.initEvents(withState);
        }

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
        let a = element.data('action'), i = element.data('id'), section = element.closest('section');

        const eventMapId = a + '.' + i;

        if ('rightclick' === a) {
            WidgetValue['rightclick'] = i;
        }

        El.body.triggerHandler(eventMapId + '.started');

        if (WidgetValue[i] && updateValue) {
            WidgetValue[i][a] = element.data();
        }

        const write = section.data('write') !== 'off';

        Widget.executeEventMapActions(eventMapId, event, element, write);
    }

    static doHandleGridTableSystemEvent(element, event, updateValue = true) {
        let a = element.data('action'), i = element.data('id'), idParts = i.split('_'),
            section = element.closest('section');

        const eventMapId = a + '.' + idParts[0] + '_row_' + idParts[2],
            columnEventMapId = a + '.' + idParts[0] + '_' + idParts[1] + '_' + idParts[2] + '_' + section.data('originalid');

        El.body.triggerHandler(eventMapId + '.started');
        El.body.triggerHandler(columnEventMapId + '.started');

        if (WidgetValue[i] && updateValue) {
            WidgetValue[i][a] = element.data();
        }

        const write = section.data('write') !== 'off';

        Widget.executeEventMapActions(a + '.' + idParts[0], event, element, false);
        Widget.executeEventMapActions(eventMapId, event, element, write);
        Widget.executeEventMapActions(columnEventMapId, event, element, write);
    }

    static executeEventMapActions(eventMapId, event, element, write = true, ...args) {
        L(eventMapId, event, element, args);

        let actions = EventMap[eventMapId], a;
        let writeSuccess = true;
        if (write === true) {
            writeSuccess = QB.writeData(eventMapId, event, element);
        }

        if (writeSuccess && actions) {
            for (a of actions) {
                a.action(a.argument, event, element);
            }
    }
    }

    get id() {
        return this.options.id;
    }

    get state() {
        return WidgetState[this.id] || {};
    }

    set state(stateObject) {
        WidgetState[this.id] = stateObject;
    }

    get value() {
        return WidgetValue[this.id] || {};
    }

    set value(valueObject) {
        WidgetValue[this.id] = valueObject;
    }

    get name() {
        return this.constructor.name;
    }

    set name(n) {
        throw new Error('Don\'t change the "name" property on this object!');
    }

    getRealValue(key, data = {}, defaultVal = '', dataPrefix = '') {

        if ('undefined' !== typeof data[dataPrefix + key]) {
            return data[dataPrefix + key];
        }

        if ('undefined' !== typeof this.options[key]) {
            return this.options[key];
        }

        return defaultVal;
    }

    getHtmlComponentStylesArray(key, data = {}) {
        let stylesObj = this.getHtmlComponentStyles(key, data), styles = [];
        for (const [key, value] of Object.entries(stylesObj)) {
            styles.push(`${key.replaceAll('_', '-')}:${value};`);
        }
        return styles;
    }

    getHtmlComponentStylesString(key, data = {}) {
        return this.getHtmlComponentStylesArray(key, data).join('');
    }

    getHtmlComponentStyles(key, data = {}) {
        return this.getRealValue(key + 'Style', data, {});
    }

    getGeneralStyles(data = {}, defaults = {}, dataPrefix = '') {
        return [...this.getWidthAndHeight(data, defaults, dataPrefix), ...this.getPaddings(data, defaults, dataPrefix), ...this.getMargins(data, defaults, dataPrefix)];
    }

    getWidthAndHeight(data = {}, defaults = {}, dataPrefix = '') {
        const s = [],
            height = this.getRealValue('height', data, defaults.height, dataPrefix),
            minHeight = this.getRealValue('minHeight', data, defaults.minHeight, dataPrefix),
            width = this.getRealValue('width', data, defaults.width, dataPrefix),
            minWidth = this.getRealValue('minWidth', data, defaults.minWidth, dataPrefix);

        height && s.push('height:', height, isNaN(height) ? ';' : 'px;');
        minHeight && s.push('min-height:', minHeight, isNaN(minHeight) ? ';' : 'px;');
        width && s.push('width:', width, isNaN(width) ? ';' : 'px;');
        minWidth && s.push('min-width:', minWidth, isNaN(minWidth) ? ';' : 'px;');

        return s;
    }

    getPaddings(data = {}, defaults = {}, dataPrefix = '') {
        const s = [],
            paddingBottom = this.getRealValue('paddingBottom', data, defaults.paddingBottom, dataPrefix),
            paddingLeft = this.getRealValue('paddingLeft', data, defaults.paddingLeft, dataPrefix),
            paddingRight = this.getRealValue('paddingRight', data, defaults.paddingRight, dataPrefix),
            paddingTop = this.getRealValue('paddingTop', data, defaults.paddingTop, dataPrefix);

        paddingTop && s.push('padding-top:', paddingTop, paddingTop !== 'auto' && !isNaN(paddingTop) ? 'px;' : ';');
        paddingLeft && s.push('padding-left:', paddingLeft, paddingLeft !== 'auto' && !isNaN(paddingLeft) ? 'px;' : ';');
        paddingRight && s.push('padding-right:', paddingRight, paddingRight !== 'auto' && !isNaN(paddingRight) ? 'px;' : ';');
        paddingBottom && s.push('padding-bottom:', paddingBottom, paddingBottom !== 'auto' && !isNaN(paddingBottom) ? 'px;' : ';');

        return s;
    }

    getMargins(data = {}, defaults = {}, dataPrefix = '') {
        const s = [],
            marginBottom = this.getRealValue('marginBottom', data, defaults.marginBottom, dataPrefix),
            marginLeft = this.getRealValue('marginLeft', data, defaults.marginLeft, dataPrefix),
            marginRight = this.getRealValue('marginRight', data, defaults.marginRight, dataPrefix),
            marginTop = this.getRealValue('marginTop', data, defaults.marginTop, dataPrefix);

        marginTop && s.push('margin-top:', marginTop, marginTop !== 'auto' && !isNaN(marginTop) ? 'px;' : ';');
        marginLeft && s.push('margin-left:', marginLeft, marginLeft !== 'auto' && !isNaN(marginLeft) ? 'px;' : ';');
        marginRight && s.push('margin-right:', marginRight, marginRight !== 'auto' && !isNaN(marginRight) ? 'px;' : ';');
        marginBottom && s.push('margin-bottom:', marginBottom, marginBottom !== 'auto' && !isNaN(marginBottom) ? 'px;' : ';');

        return s;
    }

    getWidthForSection(data = {}, defaults = {}) {
        const s = [],
            width = this.getRealValue('width', data, defaults.width),
            minHeight = this.getRealValue('minHeight', data, defaults.minHeight),
            minWidth = this.getRealValue('minWidth', data, defaults.minWidth);

        if (!isNaN(width)) {
            return [];
        }

        width && s.push('width:', width, isNaN(width) ? ';' : 'px;');
        minHeight && s.push('min-height:', minHeight, isNaN(minHeight) ? ';' : 'px;');
        minWidth && s.push('min-width:', minWidth, isNaN(minWidth) ? ';' : 'px;');

        return s;
    }

    getHeightForSection(data = {}, defaults = {}) {
        const s = [], height = this.getRealValue('height', data, defaults.height);

        if (!isNaN(height)) {
            return [];
        }

        height && s.push('height:', height, isNaN(height) ? ';' : 'px;');

        return s;
    }

    static getPercentOrPixel(value) {
        return isNaN(value) ? value : value + 'px';
    }

    static setSkin(element, skinPrefix, newSkin) {
        if (!element.hasClass(skinPrefix + newSkin)) {
            if (element.attr('class')) {
                let result, classWithoutSkin, originalClass = element.attr('class'),
                    s = originalClass.indexOf(skinPrefix);
                classWithoutSkin = s !== -1 ? originalClass.substring(0, s - 1) : originalClass;
                result = classWithoutSkin.split(' ');
                result.push(skinPrefix + newSkin);
                element.attr('class', result.join(' '));
            }
        }
    }

    static removeStyle(element, styleName) {
        let s = element.prop('style');
        s && s.removeProperty(styleName);
    }

    static setOrRemoveStyle(element, styleName, value) {
        value ? element.css(styleName, value) : Widget.removeStyle(element, styleName);
    }

    static setOrRemoveMeasure(element, measureName, value) {
        Widget.setOrRemoveStyle(element, measureName, value ? Widget.getPercentOrPixel(value) : false);
    }
}