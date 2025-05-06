/* global app, El, PopupWidget, Loader, Listeners, PageState, QB, Render, SliderWidget, TextWidget, Utils, WidgetConfig, WidgetState, Widgets, v */

'use strict';

Api.handleListener = Listeners.handle;

Api.showWidgets = function showWidgets(ids) {
    ids.forEach(Api.showWidget);
};

/* listener function */
Api.show = function show(widgetId) {
    $('#' + widgetId).show();
};

/* listener function */
Api.hide = function hide(widgetId) {
    $('#' + widgetId).hide();
};

Api.showWidget = function showWidget(id) {
    $('#' + id).show().addClass('forcedByEventMap');
};

Api.hideWidgets = function hideWidgets(ids) {
    ids.forEach(Api.hideWidget);
};

Api.hideWidget = function hideWidget(id) {
    $('#' + id).hide().addClass('forcedByEventMap');
};

Api.toggleWidgets = function toggleWidgets(ids) {
    ids.forEach(Api.toggleWidget);
};

Api.toggleWidget = function toggleWidget(id) {
    $('#' + id).toggle().addClass('forcedByEventMap');
};

Api.fadeOutWidget = function fadeOutWidget(id) {
    $('#' + id).fadeOut(300).addClass('forcedByEventMap');
};

Api.fadeInWidget = function fadeInWidget(id) {
    $('#' + id).fadeIn(300).addClass('forcedByEventMap');
};

Api.changeSegmentedControlSelection = function changeSegmentedControlSelection(tabId) {
    $('#' + tabId).addClass('on').closest('section').parent().closest('section').find('.segment').removeClass('on');
};

Api.resetRadioButtons = function resetRadioButtons(id) {
    $('#' + id).find('.widget-radio').removeClass('on').closest('tr').attr('style', '');
};

Api.scrollTo = function scrollTo(arg) {
    if (Array.isArray(arg)) {
        if (arg.length === 2) {
            Utils.scrollTo(arg[0], 500, arg[1]);
        } else {
            Utils.scrollTo(arg[0]);
        }
    } else {
        Utils.scrollTo(arg);
    }
};

Api.jumpTo = function jumpTo(id) {
    window.location.href = '#' + id;
};

Api.openPage = function openPage(page) {
    return Render.showPage(page);
};

Api.backToMain = function backToMain() {
    return Render.showPage(app.mainPage);
};

Api.openPrevPage = function openPrevPage() {
    if (PageState.previous !== '') {
        return Render.showPage(PageState.previous);
    }
    return $.Deferred().resolve('');
};

Api.openPrevPageWithState = function openPrevPageWithState() {
    if (PageState.previous !== '') {
        return Render.showPage(PageState.previous, true);
    }
    return $.Deferred().resolve('');
};

Api.openPageWithWaitingForEvent = function openPageWithWaitingForEvent(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('openPageWithWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');

        return $.Deferred().resolve('');;
    }

    Loader.start();

    El.body.on(arg[0], () => Render.showPage(arg[1]));
};

Api.openPageAndScrollToSection = function openPageAndScrollToSection(arg) {
    let r = Render.showPage(arg[0]);

    El.body.on('bodyReady', () => {
        El.body.off('bodyReady');
        Api.jumpTo(arg[1]);
    });
    return r;
};

Api.openPageWithWaitingForEventAndScrollToSection = function openPageWithWaitingForEventAndScrollToSection(arg) {
    if (!Array.isArray(arg) || arg.length < 3) {
        alert('openPageWithWaitingForEventAndScrollToSection has 3 mandatory argument: ["eventName", "pageId", "section"] !');

        return $.Deferred().resolve('');
    }
    Loader.start();

    El.body.on(arg[0], () => {
        Render.showPage(arg[1]);

        El.body.on('bodyReady', () => {
            El.body.off('bodyReady');
            Api.jumpTo(arg[2]);
        });
    });
};

Api.openPageWithState = function openPageWithState(page, alsoForceRefreshWidgetsWithState=false) {
    if (Array.isArray(page)) {
        if (PageState[page[0]]) {
            let r = Render.showPage(page[0], true);
            El.body.on('bodyReady', () => {
                El.body.off('bodyReady');

                if (page.length > 1) {
                    for (let i = 1; i < page.length; ++i) {
                        alsoForceRefreshWidgetsWithState ? Api.forceRefreshWithState(page[i]) : Api.forceRefresh(page[i]);
                    }
                }
            });
            return r;
        } else {
            return Render.showPage(page[0]);

        }
    } else {
        if (PageState[page]) {
            return Render.showPage(page, true);
        } else {
            return Render.showPage(page);
        }
    }
};

Api.openPageWithStateAndScrollToSection = function openPageWithStateAndScrollToSection(arg) {
    let r = Render.showPage(arg[0], true);

    El.body.on('bodyReady', () => {
        El.body.off('bodyReady');
        Api.jumpTo(arg[1]);

        if (arg.length > 2) {
            for (let i = 2; i < arg.length; ++i) {
                Api.forceRefresh(arg[i]);
            }
        }
    });
    return r;
};

Api.openPageWithStateAndWaitingForEvent = function openPageWithStateAndWaitingForEvent(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('openPageWithStateAndWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');

        return $.Deferred().resolve('');
    }

    Loader.start();

    El.body.on(arg[0], () => {
        Render.showPage(arg[1], true);

        if (arg.length > 2) {
            El.body.on('bodyReady', () => {
                El.body.off('bodyReady');

                for (let i = 2; i < arg.length; ++i) {
                    Api.forceRefresh(arg[i]);
                }
            });
        }
    });
};

Api.openPageWithStateAndWaitingForEventAndScrollToSection = function openPageWithStateAndWaitingForEventAndScrollToSection(arg) {
    if (!Array.isArray(arg) || arg.length < 3) {
        alert('openPageWithStateAndWaitingForEventAndScrollToSection has 3 mandatory argument: ["eventName", "pageId", "sectionName"] !');

        return $.Deferred().resolve('');
    }

    Loader.start();

    El.body.on(arg[0], () => {
        Render.showPage(arg[1], true);

        El.body.on('bodyReady', () => {
            El.body.off('bodyReady');
            Api.jumpTo(arg[2]);

            if (arg.length > 3) {
                for (let i = 3; i < arg.length; ++i) {
                    Api.forceRefresh(arg[i]);
                }
            }
        });
    });
};

Api.removeWidgetValues = function removeWidgetValues(widgetIds) { //Todo rename resetWidgets
    widgetIds.forEach(id => {
        if(Widgets[id] instanceof Widget) {
            Widgets[id].reset()
        } else {
            delete Widgets[id];
        }
    });
};

Api.skip = function skip(arg) {
    return arg;
};

Api.removePageValues = function removePageValues(pageId) {
    let page = WidgetConfig[pageId], w;

    for (w of page.widgets) {
        Widgets[w.id].reset();
        Api.removeValuesRecursively(w.widgets);
    }
};

Api.removeValuesRecursively = function removeValuesRecursively(widgets) {
    for (let w of widgets || []) {
        Widgets[w.id].reset();
        Api.removeValuesRecursively(w.widgets);
    }
};

Api.showToolTipsChanged = function showToolTipsChanged() {
    $('.ks-button-info').toggle(Widgets.ShowTooltips === true);
};

/* listener function */
Api.refresh = function refresh(widgetId) {
    return Api.forceRefresh(widgetId);
};

Api.forceRefresh = function forceRefresh(widgetId) {
    if(Array.isArray(widgetId) ) {
        return Api.forceRefreshWidgets(widgetId);
    }
    return Widgets[widgetId].reRenderWidget();
};

/* listener function */
Api.refreshWithoutLoader = function refreshWithoutLoader(widgetId) {
    return Api.forceRefreshWithoutLoader(widgetId);
};

/* listener function */
Api.forceRefreshWithoutLoader = function forceRefreshWithoutLoader(widgetId) {
    return Widgets[widgetId].reRenderWidget(false, false);
};

Api.forceRefreshWidgets = function forceRefreshWidgets(widgetIds) {

    let deferred = [];

    widgetIds.forEach(widgetId => deferred.push(Widgets[widgetId].reRenderWidget()));

    return $.when.apply($, deferred);
};


/* listener function */
Api.refreshWithTimeout = function refreshWithTimeout(argument) {
    return Api.forceRefreshWithDelay(argument);
};

Api.forceRefreshWithDelay = function forceRefreshWithDelay(argument) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, argument[1]);
    }).then(function () {
        return Widgets[argument[0]].reRenderWidget();
    });
};

/* listener function */
Api.refreshWithStateAndTimeout = function refreshWithStateAndTimeout(argument) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, argument[1]);
    }).then(function () {
        return Widgets[argument[0]].reRenderWidget(true);
    });
};

/* listener function */
Api.refreshWithState = function refreshWithState(widgetId) {
    return Api.forceRefreshWithState(widgetId);
};

/* listener function */
Api.refreshWithWaitingForEvents = function refreshWithWaitingForEvents(args) {
    const widgetId = args.shift(), callback = args.find(e => typeof e === 'function'),
        events = args.filter(e => typeof e !== 'function');
    let i;
    Widgets[widgetId + 'eventsfired'] = events.map((e) => {
        return {name: e, fired: false};
    });
    for (i = 0; i < events.length; ++i) {
        const eventName = events[i];
        El.body.on(eventName, () => {
            El.body.off(eventName);
            let index = Widgets[widgetId + 'eventsfired'].findIndex(e => e.name === eventName);
            Widgets[widgetId + 'eventsfired'][index].fired = true;
            let c = Widgets[widgetId + 'eventsfired'].filter(d => d.fired === false).length;
            if (c === 0) {
                Api.forceRefresh(widgetId).then(callback);
            }
        });
    }
};

/* listener function */
Api.renderPage = function renderPage(widgetId) {
    let holder = $('#' + widgetId);
    let widget = Widgets[widgetId];
    holder.html(widget.renderPage());
    widget.initEvents();
};

Api.forceRefreshWithState = function forceRefreshWithState(widgetId) {
    return Widgets[widgetId].reRenderWidget(true);
};

Api.goToUrl = function goToUrl(url) {
    window.location.href = url;
};

Api.goToUrlNewTab = function goToUrlNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
};

Api.showPopup = function showPopup(c, w = false) {
    app.popup.show(c, w);
};

Api.changeSystemValue = function changeSystemValue(arg) {
    Widgets[arg[0]] = v(arg[1]) === 1;
};

Api.addSystemValue = function addSystemValue(arg) {
    Widgets[arg[0]] = arg[1];
};

Api.addSystemValueByVal = function addSystemValueByVal(arg) {
    Widgets[arg[0]] = v(arg[1]);
};

Api.addGridTableSystemValue = function addGridTableSystemValue(arg) {
    let systemValueName = 'systemValue' + arg[0], gridTableValues = v(arg[1]);

    Widgets[systemValueName] = gridTableValues.cellData[gridTableValues.row][arg[2]][arg[3]];
};

Api.addGridTableCurrentRowSystemValue = function addGridTableCurrentRowSystemValue(arg) {
    Widgets['systemValue' + arg[0]] = Utils.getGridTableCell(arg[1], arg[2])[arg[3]];
};

Api.increaseWidgetValue = function increaseWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k) && v(arg[2]) && v(k) < v(arg[2])) {
        Widgets[arg[0]].value = parseInt(v(k)) + parseInt(arg[1]);
    }
};

Api.decreaseWidgetValue = function decreaseWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k) && v(k) > arg[2]) {
        Widgets[arg[0]].value = parseInt(v(k)) - parseInt(arg[1]);
    }
};

Api.resetWidgetValue = function resetWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k)) {
        Widgets[arg[0]].value = parseInt(arg[1]);
    }
};

Api.setWidgetValue = function setWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k) && v(arg[1])) {
        Widgets[arg[0]].value = v(arg[1]);
    }
};

Api.removePageState = function removePageState(ids) {
    for (let id of ids) {
        if (PageState[id]) {
            delete PageState[id];
        }
    }
};

Api.openPopup = function openPopup(argument, ev, element) {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.open();
};

Api.openPopupWithTimeout = function openPopupWithTimeout(argument, ev, element) {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('openPopupWithTimeout has 2 mandatory argument: ["popupid", "timeout ms"] !');
        return;
    }
    setTimeout(function () {
        Api.openPopup(argument[0], ev, element)
    }, argument[1]);
};

Api.togglePopup = function togglePopup(argument, ev, element) {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.toggle();
};

Api.closePopup = function closePopup(argument) {
    const c = PopupWidget.popupsByIds[argument];
    c && c.close();
};

Api.pasteToGridTableText = function pastToGridTableText(argument, ev, element) {
    TextWidget.paste($('#' + Widgets['rightclick']), ev);
};

Api.checkTIResponseStatus = function checkTIResponseStatus(argument, ev, element, response) {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('checkResponseStatus has 2 mandatory argument!');
        return;
    }

    let f1 = false, f2 = false, f1args = [], f2args = [], i = 0, r;

    while (i < argument.length) {
        if (typeof argument[i] === 'function') {
            f1 === false ? f1 = argument[i] : f2 = argument[i];
        } else {
            f2 === false ? f1args.push(argument[i]) : f2args.push(argument[i]);
        }
        ++i;
    }

    if (f1 === false || f2 === false) {
        alert('checkResponseStatus has 2 mandatory function argument!');

        return;
    }

    r = v('ProcessExecuteStatusCode', response);

    if (r && r !== 'Aborted') {
        f1args.length <= 1 ? f1args.length > 0 ? f1(f1args[0], ev, element) : f1('', ev, element) : f1(f1args, ev, element);
    } else {
        f2args.length <= 1 ? f2args.length > 0 ? f2(f2args[0], ev, element) : f2('', ev, element) : f2(f2args, ev, element);
    }
};

Api.conditionalHorizontalTableEventHandlerExecution = function conditionalHorizontalTableEventHandlerExecution(argument, ev, element) {
    let widgetId = element.data('id'),
        action = element.data('action'),
        row = v(widgetId)[action].rowindex,
        currentCell = v(widgetId).rows[row][0];
    Api.conditionalExecution(argument, ev, element, currentCell);
};

Api.conditionalGridTablePopup = function conditionalGridTablePopup(argument, ev, element) {
    let currentCell = Utils.getGridTableCurrentCell(element.data('id').split('_')[0]);
    Api.conditionalExecution(argument, ev, element, currentCell);
};

Api.conditionalExecution = (argument, ev, element, currentCell) => {
    let i, j;
    for (i = 0; i < argument.length; ++i) {
        if (currentCell[argument[i].conditionKey] || argument[i].conditionKey === 'else') {
            let conditionKeyResult;
            if (typeof currentCell[argument[i].conditionKey] === 'function') {
                conditionKeyResult = currentCell[argument[i].conditionKey]();
            } else {
                conditionKeyResult = currentCell[argument[i].conditionKey];
            }

            if (conditionKeyResult === true || argument[i].conditionKey === 'else') {
                for (j = 0; j < argument[i].actions.length; ++j) {
                    argument[i].actions[j].action(argument[i].actions[j].argument, ev, element);
                }
                return;
            }
        }
    }
};

Api.increasePage = function increasePage(widgetId) {
    if (WidgetState[widgetId].page) {
        WidgetState[widgetId].page = WidgetState[widgetId].page + 1;
    } else {
        WidgetState[widgetId].page = 2;
    }
    let start = (WidgetState[widgetId].page - 2) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col;
    Api.copyChangedCells(widgetId, start);
    Widgets[widgetId].renderPage();
};

Api.decreasePage = function decreasePage(widgetId) {
    if (WidgetState[widgetId].page) {
        WidgetState[widgetId].page = WidgetState[widgetId].page - 1;
    }

    let start = (WidgetState[widgetId].page) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col;
    Api.copyChangedCells(widgetId, start);

    Widgets[widgetId].renderPage();
};

Api.jumpToFirstPage = function jumpToFirstPage(widgetId) {
    Api.copyChangedCells(widgetId, (WidgetState[widgetId].page - 1) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col);
    WidgetState[widgetId].page = 1;
    Widgets[widgetId].renderPage();
};

Api.jumpToLastPage = function jumpToLastPage(widgetId) {
    Api.copyChangedCells(widgetId, (WidgetState[widgetId].page - 1) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col);
    WidgetState[widgetId].page = Utils.getGridTableActualAndLastPage(widgetId).maxPage;
    Widgets[widgetId].renderPage();
};

Api.copyChangedCells = function copyChangedCells(widgetId, start) {
    let changedCells = $('#' + widgetId).find('.ks-grid-table-content .ks-grid-table-cell'), i = 0;
    while (i < changedCells.length) {
        WidgetState[widgetId]['widgets'][start + i] = changedCells[i].outerHTML;
        ++i;
    }
};

/* eventId.widgetId */
Api.executeRequest = function executeRequest(eventMapId) { //Todo rename executeWriteRequest?
    return QB.writeData(eventMapId, {}, {});
};

Api.executeQueryRequest = function executeQueryRequest(argument) { //Todo rename executeLoadRequest?
    let isArray = Array.isArray(argument);

    if (isArray && argument.length < 2) {
        let message = 'executeQueryRequest has 2 mandatory argument!';
        alert(message);
        L(message + ' but got:', argument);
        return;
    }

    return isArray ? QB.loadData(argument[0], '', false, argument[1]) :
        QB.loadData(argument);
};

Api.removeSliders = function removeSliders() {
    SliderWidget.slidersByIds = [];
    SliderWidget.isDocEventsHaveBeenBound = false;
};

/* listener function */
Api.updateContent = function updateContent(widgetId) {
    return Widgets[widgetId].updateWidgetContent();
};

/* listener function */
Api.updateContentWithoutLoader = function updateContentWithoutLoader(widgetId) {
    return Widgets[widgetId].updateWidgetContent(false);
};

Api.updateWidgetsContent = function updateWidgetsContent(widgetIds) {
    let deferred = [];

    widgetIds.forEach(widgetId => {
        if(Widgets[widgetId]) {
            deferred.push(Widgets[widgetId].updateWidgetContent());
        }
    });

    return $.when.apply($, deferred);
};

Api.updateWidgetsContentWithoutLoader = function updateWidgetsContentWithoutLoader(widgetIds) {
    let deferred = [];

    widgetIds.forEach(widgetId => {
        if(Widgets[widgetId]) {
            deferred.push(Widgets[widgetId].updateWidgetContent(false));
        }
    });

    return $.when.apply($, deferred);
};

/* listener function */
Api.refreshWithWaitingForEvent = function refreshWithWaitingForEvent(args) {
    if (!Array.isArray(args) || args.length < 2) {
        let message = 'refreshWithWaitingForEvent has 2 mandatory argument!';
        alert(message);
        L(message + ' but got:', args);
        return;
    }
    const widgetId = args[0], eventName = args[1],
        withLoader = args.length > 2 ? args[2] : true,
        callback = args.length > 3 ? args[3] : false;

    return El.body.on(eventName, () => {
        El.body.off(eventName);
        const m = withLoader ? 'forceRefresh' : 'forceRefreshWithoutLoader';
        Api[m](widgetId).then(callback);
    });
};

/* listener function */
Api.refreshWithWaitingForEventWithoutLoader = function refreshWithWaitingForEventWithoutLoader(args) {
    if (!Array.isArray(args) || args.length < 2) {
        alert('refreshWithWaitingForEventWithoutLoader has 2 mandatory argument!');
        return;
    }

    args.length > 2 ? args.splice(2, 0, false) : args.push(false);

    return Api.refreshWithWaitingForEvent(args);
};

/* listener function */
Api.refreshGridCell = function refreshGridCell(widgetId) {
    Widgets[widgetId].refreshGridCell();
};

Api.toggleInfoWidget = function toggleInfoWidget(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('toggleInfoWidget has 2 mandatory argument: ["infoPopupId", {repository data structure}] !');
        return;
    }

    Api.toggleWidget(arg[0]);

    if ($('#' + arg[0]).is(':visible')) {
        Widgets.infoData = arg[1];

        if (arg.length > 2) {
            for (let i = 2; i < arg.length; ++i) {
                Api.forceRefresh(arg[i]);
            }
        }
    }
};

Api.logout = function logout() {
    return Auth.logout();
};

Api.goToStartPage = function goToStartPage() {
   Auth.goToStartPage();
};

Api.triggerWidgetEvent = function triggerWidgetEvent(widgetId, eventName) {
    const widget = Widgets[widgetId], triggerHandlerFunctionName = eventName + 'TriggerHandler';
    if (!widget) {
        console.error('Unable to find ' + widgetId);
        return false;
    }
    if (!widget[triggerHandlerFunctionName]) {
        console.error('Unable to find ' + triggerHandlerFunctionName);
        return false;
    }
    widget[triggerHandlerFunctionName]();
    return true;
};

Api.navigateAppTo = function navigateAppTo(browser_url) {
    return Api.openPage(Utils.changeUrlState(browser_url));
};
