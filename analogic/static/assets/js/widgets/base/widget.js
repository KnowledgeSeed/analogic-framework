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
        // `holder.empty()` below drops any scroll position the user built up (e.g. a
        // horizontally scrolled grid table) - the DOM nodes carrying it are destroyed
        // and rebuilt from scratch, so the browser has nothing left to remember it by.
        // The scrollable pane is usually not `holder` itself but a known inner wrapper
        // (grid tables scroll their `_inner`/`_body` div, not the outer section) - a
        // selector lookup is used instead of walking the whole subtree so this stays
        // cheap even for a grid table with tens of thousands of cells.
        let scrollState = Widget.captureScrollState(holder);

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

                    // Restored only now: `holder.css('display', ...)` above can itself
                    // reset a scroll offset held directly on `holder` (changing `display`
                    // establishes a new box), so restoring before it would just be
                    // undone by it.
                    instance.initEvents(withState);
                    Widget.restoreScrollState(holder, scrollState);

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
        const usercentrics = holder.find('#usercentrics-cmp-ui');
        if (usercentrics.length > 0) {
            usercentrics.detach();
        }
        // See the matching comment in reRenderWidget: renderWidget is also used to force
        // a full rebuild of an already-visible widget (e.g. an event-map "refresh"
        // action), which would otherwise silently drop the user's scroll position.
        let scrollState = Widget.captureScrollState(holder);
        return holder.empty().off().promise().then(() => {
            instance.holderStartLoader();
            return instance.render(withState, false, false, QB.loadData, previouslyLoadedData).then(html => {
                let h = $(html), i;
                return holder.html(h.html()).promise().then(() => {
                    if (usercentrics.length > 0) {
                        holder.append(usercentrics);
                    }
                    instance.removeLoaderHtml(withState);
                    instance.initEvents(false);
                    Widget.restoreScrollState(holder, scrollState);
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
        return $.when(Promise.resolve().then(() => this.updateContent()).then((r) => {
            if ('update' === r) {
                instance.updateContentFinished();
            }
        }).finally(() => { withLoader && Loader.stop(true); }));
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
                instance.updateSectionAttributes(processedData);
                return Promise.resolve(instance.updateHtml(processedData)).then(() => 'update');
            });
        }

        return loadFunction(o.id, instance.name).then(function (d) {
            return $.when.apply($, deferred).then(function () {
                processedData = instance.processData(d);
                instance.dynamicTooltip = (processedData || {}).tooltip;
                instance.updateSectionAttributes(processedData);
                return Promise.resolve(instance.updateHtml(processedData)).then(() => 'update');
            });
        });
    }

    updateHtml(data) {
        if (!this.getSection().length) return;
        const childHtml = this.getChildHtml();
        // A child not yet in the DOM (e.g. still behind visible:false +
        // notLoadIfHidden, or a slow-loading sibling) must not be silently
        // rendered as blank - getHtml() would bake an empty slot into this
        // widget's own markup, and the morph would apply that emptiness for
        // real. Skip this update cycle instead; the child gets its correct
        // content from its own eventual initial render, and this widget will
        // pick up the current state on the next updateContent().
        if (!Widget.hasRenderedChildren(childHtml)) return;
        return this.updateRenderedHtml(this.getHtml(childHtml, data, true));
    }

    getChildHtml() {
        return (this.options.widgets || []).map(o => {
            const child = this.getWidget(o);
            const element = child && document.getElementById(child.id || child.c?.id);
            return element ? element.outerHTML : null;
        });
    }

    static hasRenderedChildren(childHtml) {
        return !childHtml.includes(null);
    }

    updateSectionAttributes(data = {}) {
        data = data || {};
        const section = this.getSection();
        if (!section.length) return;
        const o = this.options, visible = this.getRealValue('visible', data, undefined);
        // Explicit visibility is data; an imperatively opened/closed popup is state.
        if (data.visible !== undefined) section.toggle(visible !== false);
        if (o.applyMeasuresToSection) {
            for (const key of ['width', 'height', 'minWidth', 'minHeight']) {
                Widget.setOrRemoveMeasure(section, key, this.getRealValue(key, data, false));
            }
        }
        if (['GridWidget', 'GridRowWidget', 'GridCellWidget'].includes(this.name)) {
            const styles = document.createElement('div').style;
            styles.cssText = this.getWidthForSection(data).join('');
            for (const key of ['width', 'min-width', 'min-height']) {
                section[0].style.setProperty(key, styles.getPropertyValue(key));
            }
        }
        if (data.write !== undefined) section.attr('data-write', data.write).data('write', data.write);
    }

    updateRenderedHtml(html, bindEvents = true) {
        const section = this.getSection();
        if (!section.length) return;
        const fresh = document.createElement('div');
        fresh.innerHTML = html;
        Widget.morphChildren(section[0], fresh, this.id);
        if (bindEvents) this.bindContentEvents(true);
    }

    updateChartContent(data, getConfig) {
        const childHtml = this.getChildHtml();
        if (!Widget.hasRenderedChildren(childHtml)) return;
        const chart = this.chart;
        const hidden = chart ? chart.data.datasets.map((_, i) => chart.getDatasetMeta(i).hidden) : [];
        const pointHidden = chart && ['pie', 'doughnut', 'polarArea'].includes(chart.config.type)
            ? chart.getDatasetMeta(0).data.map(point => point.hidden) : null;
        this.updateRenderedHtml(this.getHtml(childHtml, data, true), false);
        if (!chart) { this.bindContentEvents(); return; }
        const config = getConfig();
        chart.data = config.data;
        chart.options = config.options;
        hidden.forEach((value, i) => { if (chart.data.datasets[i]) chart.getDatasetMeta(i).hidden = value; });
        chart.update();
        if (pointHidden) {
            pointHidden.forEach((value, i) => {
                const point = chart.getDatasetMeta(0).data[i];
                if (point) point.hidden = value;
            });
            chart.update();
        }
        const legend = $(chart.canvas).parent().next('.ks-legend, .ks-radar');
        if (legend.length && chart.generateLegend) {
            legend.html(chart.generateLegend());
            legend.find('.ks-legend-item').each(function () {
                const i = $(this).data('id');
                $(this).toggleClass('off', pointHidden ? !!pointHidden[i] : !!(chart.data.datasets[i] && chart.getDatasetMeta(i).hidden));
            });
        }
    }

    // Rebind only handlers installed by this widget, retaining application handlers
    // and independently managed child widgets. This also binds newly inserted nodes.
    bindContentEvents(withState = false) {
        for (const {element, event} of this._contentEvents || []) {
            $(element).off(event.origType + (event.namespace ? '.' + event.namespace : ''), event.selector, event.handler);
        }
        const section = this.getSection();
        if (section[0]) Widget.rememberMorphTree(section[0], this.id);
        const snapshot = () => {
            const records = [];
            section.find('*').addBack().each(function () {
                for (const events of Object.values($._data(this, 'events') || {})) {
                    for (const event of events) records.push({element: this, event});
                }
            });
            return records;
        };
        const previous = new Set(snapshot().map(r => r.event));
        this.initEventHandlers(withState);
        this._contentEvents = snapshot().filter(r => !previous.has(r.event));
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
                deferred.push(w.render(withState, refresh, useDefaultDataForChildren).catch(err => w.getWidgetErrorHtml(err)));
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
        }).catch(function (error) {
            return instance.getWidgetErrorHtml(error);
        });
    }

    // Fallback markup shown in place of this widget when its own or an ancestor's
    // repository loader function throws or the render pipeline otherwise fails.
    // Keeps one widget's failure from rejecting the $.when.apply batch that the
    // rest of the page's rendering is aggregated through.
    getWidgetErrorHtml(error) {
        console.error('Error rendering widget "' + (this.options ? this.options.id : '?') + '":', error);
        const id = this.options && this.options.id ? this.options.id : Utils.getRandomId();
        return `<section id="${id}">${Widget.getWidgetErrorMessageHtml()}</section>`;
    }

    static getWidgetErrorMessageHtml(message = 'Error! Widget failed to load.') {
        return `<div><h3 style="color:red;">${message}</h3></div>`;
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
            try {
                w.initEvents(withState);
            } catch (e) {
                console.error('Error initializing events for widget "' + (w.options ? w.options.id : '?') + '":', e);
            }
        }

        try {
            this.bindContentEvents(withState);
        } catch (e) {
            console.error('Error initializing event handlers for widget "' + (this.options ? this.options.id : '?') + '":', e);
        }

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
                try {
                    a.action(a.argument, event, element);
                } catch (e) {
                    console.error('Error executing event map action for "' + eventMapId + '":', e);
                }
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
        element.each(function () {
            for (const name of Array.from(this.classList)) {
                if (name.startsWith(skinPrefix)) this.classList.remove(name);
            }
            this.classList.add(skinPrefix + newSkin);
        });
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

    // Known scrollable-pane wrapper classes used across widgets (grid tables scroll an
    // inner `_inner`/`_body`/`-body` div, not their outer section). Checked by class
    // name via jQuery (native getElementsByClassName under the hood) rather than
    // walking the subtree, so this stays cheap even for a grid table with tens of
    // thousands of cells.
    static SCROLLABLE_PANE_SELECTOR = '.ks-grid-table-inner, .ks-grid-table-body, .ks-grid-table-light_inner, .ks-grid-table-light_body, .ks-grid-table-light_head';

    static captureScrollState(holder) {
        const state = [];
        const record = (element, className, index = 0) => {
            const left = element.scrollLeft(), top = element.scrollTop();
            if (left || top) {
                state.push({className, index, left, top});
            }
        };
        record(holder, null);
        holder.find(Widget.SCROLLABLE_PANE_SELECTOR).each(function (index) {
            record($(this), this.className, index);
        });
        return state;
    }

    static restoreScrollState(holder, state) {
        const panes = holder.find(Widget.SCROLLABLE_PANE_SELECTOR);
        (state || []).forEach(({className, index, left, top}) => {
            const element = className === null ? holder : panes.eq(index);
            if (element.length) {
                element.scrollLeft(left);
                element.scrollTop(top);
            }
        });
    }

    // A subtree owned by something other than getHtml()'s own markup - an external
    // library's DOM (a chart canvas, a Tabulator table), or a nested child widget's own
    // root (already updated by its own updateContent/updateHtml, called separately by
    // the base updateContent loop) - must never be diffed or rewritten from here.
    static shouldSkipMorph(element, ownWidgetId) {
        if (element.tagName === 'CANVAS' || element.classList.contains('chartjs-size-monitor')) return true;
        if (element.hasAttribute('data-ks-no-morph')) {
            return true;
        }
        if (element.id && element.id !== ownWidgetId && typeof Widgets !== 'undefined' && Widgets[element.id]) {
            return true;
        }
        return false;
    }

    // Patches `oldEl` in place to match `newEl`: attributes are diffed and set/removed
    // (this single generic pass is what replaces the whole family of hand-written
    // setOrRemoveStyle/addOrRemoveClass/setSkin call sites in each widget's updateHtml -
    // any class/style/data-* attribute a parsing-control script computes is picked up
    // automatically instead of needing its own enumerated patch), then children are
    // diffed positionally. `ownWidgetId` is the id of the widget currently updating,
    // so its own root element isn't mistaken for a "nested child widget" and skipped.
    static morphAttributes(oldEl, newEl) {
        const template = newEl.cloneNode(false);
        const previous = Widget.morphTemplates.get(oldEl);
        // Only remove renderer-owned classes/styles. Runtime additions (selection,
        // popup coordinates, plugin measurements) are not part of the template.
        if (previous) {
            const classes = new Set((previous.getAttribute('class') || '').split(/\s+/).filter(Boolean));
            const extra = Array.from(oldEl.classList).filter(value => !classes.has(value) && !newEl.classList.contains(value));
            if (extra.length) newEl.setAttribute('class', (newEl.getAttribute('class') || '') + ' ' + extra.join(' '));
            for (const property of oldEl.style) {
                if (!previous.style.getPropertyValue(property) && !newEl.style.getPropertyValue(property)) {
                    newEl.style.setProperty(property, oldEl.style.getPropertyValue(property), oldEl.style.getPropertyPriority(property));
                }
            }
        }
        const newAttrs = newEl.attributes;
        for (let i = 0; i < newAttrs.length; ++i) {
            const attr = newAttrs[i];
            if (oldEl.getAttribute(attr.name) !== attr.value) {
                oldEl.setAttribute(attr.name, attr.value);
                // Event handlers use jQuery.data(), whose cache otherwise retains
                // the previous attribute even after a successful DOM update.
                if (attr.name.startsWith('data-')) {
                    $(oldEl).removeData(attr.name.slice(5));
                    $(oldEl).data(attr.name.slice(5));
                }
            }
        }
        const oldAttrs = oldEl.attributes;
        for (let i = oldAttrs.length - 1; i >= 0; --i) {
            const name = oldAttrs[i].name;
            if (!newEl.hasAttribute(name) && (!previous || previous.hasAttribute(name))) {
                oldEl.removeAttribute(name);
                if (name.startsWith('data-')) {
                    $(oldEl).removeData(name.slice(5));
                }
            }
        }
        Widget.morphTemplates.set(oldEl, template);
    }

    static morphTemplates = new WeakMap();

    static rememberMorphTree(element, ownId) {
        if (Widget.shouldSkipMorph(element, ownId)) return;
        if (!Widget.morphTemplates.has(element)) Widget.morphTemplates.set(element, element.cloneNode(false));
        for (const child of element.children) Widget.rememberMorphTree(child, ownId);
    }

    static morphElement(oldEl, newEl, ownWidgetId = null) {
        if (!oldEl || !newEl || Widget.shouldSkipMorph(oldEl, ownWidgetId)) {
            return;
        }
        if (oldEl.noUiSlider) {
            Widget.morphAttributes(oldEl, newEl);
            return;
        }

        const focused = document.activeElement === oldEl;
        const tag = oldEl.tagName;
        const field = (tag === 'INPUT' && oldEl.type !== 'file') || tag === 'TEXTAREA' || tag === 'SELECT';
        const value = focused && field ? oldEl.value : null;
        const selection = focused && (tag === 'INPUT' || tag === 'TEXTAREA') && oldEl.selectionStart !== null ?
            [oldEl.selectionStart, oldEl.selectionEnd, oldEl.selectionDirection] : null;
        const checked = focused && tag === 'INPUT' ? oldEl.checked : null;
        const selected = focused && tag === 'SELECT' ? Array.from(oldEl.selectedOptions, o => o.value) : null;
        Widget.morphAttributes(oldEl, newEl);
        Widget.morphChildren(oldEl, newEl, ownWidgetId);
        // Attributes can change pristine input values; option/textarea children can
        // change live values too. Restore focused state AFTER both passes.
        if (focused && field) {
            if (selected) {
                Array.from(oldEl.options).forEach(o => { o.selected = selected.includes(o.value); });
            } else if (oldEl.value !== value) {
                oldEl.value = value;
            }
            if (tag === 'INPUT') oldEl.checked = checked;
            if (selection && oldEl.selectionStart !== null) oldEl.setSelectionRange(...selection);
        } else if (field) {
            if (tag === 'INPUT' && (oldEl.type === 'checkbox' || oldEl.type === 'radio')) {
                const newChecked = newEl.hasAttribute('checked');
                if (oldEl.checked !== newChecked) {
                    oldEl.checked = newChecked;
                }
            } else if (oldEl.value !== newEl.value) {
                oldEl.value = newEl.value;
            }
        }
    }

    static morphChildren(oldParent, newParent, ownWidgetId) {
        if (oldParent.isContentEditable && oldParent.contains(document.activeElement)) return;
        const active = document.activeElement;
        if (active && active !== oldParent && oldParent.contains(active) &&
            active.matches('input, textarea, select, [contenteditable]') &&
            !newParent.querySelector('input, textarea, select, [contenteditable]')) return;
        const newChildren = Array.from(newParent.childNodes);
        let cursor = oldParent.firstChild;
        const protectedTree = node => node.nodeType === Node.ELEMENT_NODE &&
            (node.noUiSlider || Widget.shouldSkipMorph(node, ownWidgetId) ||
                Array.from(node.querySelectorAll('[id], [data-ks-no-morph], canvas, .noUi-target')).some(el => el.noUiSlider || Widget.shouldSkipMorph(el, ownWidgetId)) ||
                node.contains(document.activeElement));
        const sameNode = (a, b) => a.nodeType === b.nodeType &&
            (a.nodeType !== Node.ELEMENT_NODE || (a.tagName === b.tagName && a.id === b.id));

        for (const [newIndex, newChild] of newChildren.entries()) {
            // Match stable IDs before positional matching. Plugins may insert
            // resize monitors before a canvas; replacing that monitor with a clone
            // would otherwise create a duplicate canvas and orphan the live chart.
            if (newChild.nodeType === Node.ELEMENT_NODE && newChild.id) {
                const match = Array.from(oldParent.children).find(child => child.id === newChild.id);
                if (match && match !== cursor) {
                    oldParent.insertBefore(match, cursor);
                    cursor = match;
                }
            }
            // A protected child omitted from fresh parent markup does not consume
            // the next new sibling. Never remove its ancestor either.
            while (cursor && protectedTree(cursor) && !sameNode(cursor, newChild)) {
                // This protected subtree is still present later in the template.
                // Insert the new preceding sibling here rather than skipping the
                // subtree and cloning it when we reach its template counterpart.
                if (newChildren.slice(newIndex + 1).some(child => sameNode(cursor, child))) break;
                cursor = cursor.nextSibling;
            }
            if (cursor && protectedTree(cursor) && !sameNode(cursor, newChild)) {
                oldParent.insertBefore(newChild.cloneNode(true), cursor);
                continue;
            }
            if (!cursor) {
                oldParent.appendChild(newChild.cloneNode(true));
                continue;
            }
            const oldChild = cursor;
            cursor = oldChild.nextSibling;
            if (oldChild.nodeType === Node.ELEMENT_NODE && Widget.shouldSkipMorph(oldChild, ownWidgetId)) {
                continue;
            }
            if (!sameNode(oldChild, newChild)) {
                oldParent.replaceChild(newChild.cloneNode(true), oldChild);
                continue;
            }

            if (oldChild.nodeType === Node.TEXT_NODE) {
                if (oldChild.textContent !== newChild.textContent) {
                    oldChild.textContent = newChild.textContent;
                }
                continue;
            }

            if (oldChild.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            Widget.morphElement(oldChild, newChild, ownWidgetId);
        }
        while (cursor) {
            const next = cursor.nextSibling;
            if (!protectedTree(cursor)) oldParent.removeChild(cursor);
            cursor = next;
        }
    }

    // Instance helper: re-runs getHtml()'s output through morphElement against an
    // already-rendered element, instead of a widget's updateHtml hand-listing which
    // fields to patch. `targetEl` may be a plain element or a jQuery-wrapped one.
    morphHtml(targetEl, newHtmlString) {
        const target = targetEl && targetEl.jquery ? targetEl[0] : targetEl;
        if (!target || !newHtmlString) {
            return;
        }
        const wrapper = document.createElement('div');
        wrapper.innerHTML = newHtmlString;
        const newRoot = wrapper.firstElementChild;
        const ownId = target.id && typeof Widgets !== 'undefined' && Widgets[target.id] === this ? target.id : this.options.id;
        if (!newRoot || Widget.shouldSkipMorph(target, ownId)) {
            return;
        }
        Widget.morphElement(target, newRoot, ownId);
    }

    // Like morphHtml, but never touches children - for a wrapper element (e.g. a grid
    // cell) whose content is a nested child widget that already updated its own DOM in
    // place; recursing into it here would either fight that update or need this method
    // to reconstruct child markup it doesn't have. Only the wrapper's own attributes are
    // diffed.
    morphAttributesOnly(targetEl, newHtmlString) {
        const target = targetEl && targetEl.jquery ? targetEl[0] : targetEl;
        if (!target || !newHtmlString) {
            return;
        }
        const wrapper = document.createElement('div');
        wrapper.innerHTML = newHtmlString;
        const newRoot = wrapper.firstElementChild;
        if (!newRoot) {
            return;
        }
        Widget.morphAttributes(target, newRoot);
    }
}
