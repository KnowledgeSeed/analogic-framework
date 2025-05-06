/* global app, El, EventMap, Listeners, QB, PageState, Repository, Utils, WidgetConfig, Widgets, Widgets */

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
        this.isRendering = false;
    }

    reset() {

    }

    renderStartLoader(withLoader) {
        if (withLoader) {
            Loader.start(true);
        }
    }

    holderStartLoader() {

    }

    removeLoaderHtml(withState) {

    }

    renderLoaderStop(withLoader) {
        if (withLoader) {
            Loader.stop(true);
        }
    }

    getHolder(id) {
        return $('#' + id);
    }

    refreshGridCell() {

        Listeners.length = 0;

        const o = this.options, widget = this, holder = this.getHolder(o.id);

        let holderHeight = 0;

        holderHeight = holder.actual('height');

        return holder.empty().off().promise().then(() => {
            return widget.render(false, true, false, QB.refreshGridCellData).then(html => {
                let isHeightUpdated = false;

                if (holderHeight > 0) {
                    isHeightUpdated = true;
                    holder.css({opacity: 0, 'min-height': holderHeight});
                }

                holder.html($(html).html()).promise().then(() => {
                    if (isHeightUpdated) {
                        holder.css('opacity', 1);
                    }

                    widget.initEvents(false);

                    El.body.trigger('rendered.' + o.id);

                    Api.showToolTipsChanged();

                    return 'refreshGridCell';
                });
            });
        });
    }

    reRenderWidget(withState = false, withLoader = true, previouslyLoadedData = false) {
        if (this.isRendering) {
            this.renderError();
        }
        this.isRendering = true;

        const o = this.options, holder = this.getHolder(o.id), instance = this;

        this.renderStartLoader(withLoader);

        Listeners.length = 0;

        let holderHeight = holder.actual('height');

        return holder.empty().off().promise().then(() => {

            instance.holderStartLoader();

            return instance.render(withState, true, false, QB.loadData, previouslyLoadedData).then(html => {
                let isHeightUpdated = false, h = $(html), i;

                if (holderHeight > 0) {
                    isHeightUpdated = true;
                    holder.css({opacity: 0, 'min-height': holderHeight});
                }

                return holder.html(h.html()).promise().then(() => {

                    instance.removeLoaderHtml(withState);

                    if (!holder.hasClass('forcedByEventMap')) {
                        holder.css('display', h.css('display') !== '' ? h.css('display') : 'unset');
                    }

                    if (isHeightUpdated) {
                        holder.css('opacity', 1);
                    }

                    instance.initEvents(withState);

                    if (o.disableRefreshGridCell !== true) {
                        for (i of Listeners.filter(e => e.method === 'refreshGridCell' && e.options.id.includes(holder.attr('id')))) {
                            const event = i.eventName.split('.')[0];
                            if ($._data(El.body[0], "events") &&
                                $._data(El.body[0], "events")[event] &&
                                $._data(El.body[0], "events")[event].filter(e => e.data.method === 'refreshGridCell' &&
                                    e.data.options.id === i.options.id).length === 0) {
                                El.body.on(i.eventName, {
                                    options: i.options,
                                    method: i.method,
                                    parameters: i.parameters
                                }, i.handler);
                            }
                        }
                    }
                    if (!withState) {
                        El.body.trigger('rendered.' + o.id);
                        instance.refreshFinished();
                    }

                    Api.showToolTipsChanged();

                    instance.renderLoaderStop(withLoader);

                    return 'rerendered';
                });
            });
        });
    }

    renderError() {
        console.error('Duplicate render calls at the same time for the ' + this.options.id + ' widget!');
        console.error('Please check the forceRefresh function call');
    }

    renderWidget(withState = false, withLoader = true, previouslyLoadedData = false) {
        if (this.isRendering) {
            this.renderError();
        }
        this.isRendering = true;

        const o = this.options, holder = this.getHolder(o.id), instance = this;

        this.renderStartLoader(withLoader);

        Listeners.length = 0;

        return holder.empty().off().promise().then(() => {

            instance.holderStartLoader();

            return instance.render(withState, false, false, QB.loadData, previouslyLoadedData).then(html => {
                let h = $(html), i;

                return holder.html(h.html()).promise().then(() => {

                    instance.removeLoaderHtml(withState);

                    instance.initEvents(false);

                    for (i of Listeners) {
                        El.body.on(i.eventName, {
                            options: i.options,
                            method: i.method,
                            parameters: i.parameters
                        }, i.handler);
                    }
                    El.body.trigger('bodyReady');
                    if (!withState) {
                        instance.initFinished();
                    }

                    Api.showToolTipsChanged();

                    instance.renderLoaderStop(withLoader);

                    return 'rendered';
                });
            });
        });
    }

    updateWidgetContent(withLoader = true) {
        withLoader && Loader.start(true);
        let instance = this;
        return this.updateContent().then((r) => {
            if ('update' === r) {
                instance.updateContentFinished();
            }
            withLoader && Loader.stop(true);
        });
    }

    getWidget(widgetOptions) {
        if (widgetOptions.import) {
            return Widgets[v(widgetOptions.import, WidgetConfig).id];
        }
        return Widgets[widgetOptions.id];
    }

    isContentUpdatable() {
        return true;
    }

    updateContent(data = false, loadFunction = QB.loadData) {
        const o = this.options, instance = this;
        let ww, widgetOptions, processedData, deferred = [];

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidget(widgetOptions);
            deferred.push(ww.updateContent());
        }

        if (data !== false) {
            return $.when.apply($, deferred).then(function () {
                processedData = instance.processData(data);
                instance.dynamicTooltip = (processedData || {}).tooltip;
                instance.updateHtml(processedData);
            });
        }

        return loadFunction(o.id, instance.name).then(function (d) {
            return $.when.apply($, deferred).then(function () {
                processedData = instance.processData(d);
                instance.dynamicTooltip = (processedData || {}).tooltip;
                instance.updateHtml(processedData);
                return 'update';
            });
        });
    }

    updateHtml(data) {

    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        this.isRendering = true;
        const o = this.options, instance = this;
        let ww;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            ww = this.getWidget(widgetOptions);
            widgets.push(ww);
        }

        this.addListeners(false);

        let useDefaultDataForChildren = (o.visible === false && !refresh && o.notLoadIfHidden) || useDefaultData;

        let afterLoad = (data) => {
            let deferred = [], w;
            for (w of widgets) {
                deferred.push(w.render(withState, refresh, useDefaultDataForChildren));
            }

            return $.when.apply($, deferred).then(function (...results) {
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

        this.dynamicTooltip = (data || {}).tooltip;

        return `<section ${write === 'off' ? `data-write="off"` : ''} ${originalId !== false ? `data-originalId="${o.originalId}"` : ''} ${o.ordinal ? `data-ordinal="${o.ordinal}"` : ''} ${o.margin ? 'class="wrapper"' : ''} style="${gs.join('')}" id="${o.id ? o.id : Utils.getRandomId()}">${html}</section>`;

    }

    embeddedRender(withState, data, loadFunction = QB.loadData) {
        this.isRendering = true;
        const o = {...this.options, ...data}, instance = this, h = Listeners.handle;

        this.addListeners(false);

        if (new o.type(o).amIOnAGridTable()) {
            Listeners.push({options: o, method: 'refreshGridCell', eventName: 'forcerefresh.' + o.id, handler: h});
        }

        let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;

        return instance.getMainHtmlElement(o, data, visible, [], withState)

    }

    addDependents() {
        const o = this.options, h = Listeners.handle;

        if (o.depends) {
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
    }

    addListeners(recursive = true) {
        const o = this.options, h = Listeners.handle;

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

        if (o.depends && recursive === false) {
            this.addDependents();
        }

        this.appendListeners(o, h);

        if (recursive) {
            let widgetOptions, widgets = [], w, ww;

            for (widgetOptions of o.widgets || []) {
                ww = this.getWidget(widgetOptions);
                widgets.push(ww);
            }

            if (o.type.name === 'GridTableWidget') {
                this.addGridTableListeners();
            } else {
                for (w of widgets) {
                    w.addListeners();
                }
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
            ww = this.getWidget(widgetOptions);
            widgets.push(ww);
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
            ww = this.getWidget(widgetOptions);
            widgets.push(ww);
        }

        for (w of widgets) {
            w.initEvents(withState);
        }

        this.initEventHandlers(withState);

        this.isRendering = false;
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

    getSection() {
        return $('#' + this.id);
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
            Widgets['rightclick'] = i;
        }

        El.body.triggerHandler(eventMapId + '.started');

        if (Widgets[i] && updateValue) {
            Widgets[i][a] = element.data();
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

        if (Widgets[i] && updateValue) {
            Widgets[i][a] = element.data();
        }

        const write = section.data('write') !== 'off';

        Widget.executeEventMapActions(a + '.' + idParts[0], event, element, false);
        Widget.executeEventMapActions(eventMapId, event, element, write);
        Widget.executeEventMapActions(columnEventMapId, event, element, write);
    }

    static executeEventMapActions(eventMapId, event, element, write = true, ...args) {
        L(eventMapId, event, element, args);

        let actions = EventMap[eventMapId], a, writeResponse = true;

        if (write === true) {
            writeResponse = QB.writeData(eventMapId, event, element);
        }

        if (actions && writeResponse !== false) {
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
        return [
            ...this.getWidthAndHeight(data, defaults, dataPrefix),
            ...this.getPaddings(data, defaults, dataPrefix),
            ...this.getMargins(data, defaults, dataPrefix)
        ];
    }

    updateHtmlComponent(key, data, element = null, section = null) {
        if (element === null) {
            element = section.find('.' + this.getCssPrefix() + '-' + key);
        }
        const keyStyles = this.getHtmlComponentStylesArray(key, data);
        if (keyStyles.length > 0) {
            element.attr('style', keyStyles.join(''));
        }
    }

    updateMeasures(main, generalStyles) {
        let styles = main.attr('style');
        styles += generalStyles.join('');
        main.attr('style', styles);
    }

    getCssPrefix() {
        return '';
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

    getTooltip() {
        const widget = this.getWidget(this.options);

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

    static addOrRemoveClass(element, className, add) {
        add ? !element.hasClass(className) && element.addClass(className) : element.removeClass(className);
    }
}