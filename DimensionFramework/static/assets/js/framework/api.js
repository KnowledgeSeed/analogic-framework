/* global app, El, PopupWidget, Loader, Listeners, PageState, QB, Render, SliderWidget, TextWidget, Utils, WidgetConfig, WidgetState, WidgetValue, v */

'use strict';
app.widgetValue = WidgetValue;

app.fn.handleListener = Listeners.handle;

app.fn.showWidgets = function showWidgets(ids) {
    ids.forEach(app.fn.showWidget);
};

app.fn.showWidget = function showWidgets(id) {
    $('#' + id).show().addClass('forcedByEventMap');
};

app.fn.hideWidgets = function hideWidgets(ids) {
    ids.forEach(app.fn.hideWidget);
};

app.fn.hideWidget = function hideWidgets(id) {
    $('#' + id).hide().addClass('forcedByEventMap');
};

app.fn.toggleWidgets = function toggleWidgets(ids) {
    ids.forEach(app.fn.toggleWidget);
};

app.fn.toggleWidget = function toggleWidget(id) {
    $('#' + id).toggle().addClass('forcedByEventMap');
};

app.fn.fadeOutWidget = function fadeOutWidget(id) {
    $('#' + id).fadeOut(300).addClass('forcedByEventMap');
};

app.fn.fadeInWidget = function fadeInWidget(id) {
    $('#' + id).fadeIn(300).addClass('forcedByEventMap');
};

app.fn.changeSegmentedControlSelection = function changeSegmentedControlSelection(tabId) {
    $('#' + tabId).addClass('on').closest('section').parent().closest('section').find('.segment').removeClass('on');
};

app.fn.resetRadioButtons = function resetRadioButtons(id) {
    $('#' + id).find('.widget-radio').removeClass('on').closest('tr').attr('style', '');
};

app.fn.scrollTo = function scrollTo(idOrObj, duration) {
    Utils.scrollTo(idOrObj, duration);
};

app.fn.jumpTo = function jumpTo(id) {
    window.location.href = '#' + id;
};

app.fn.openPage = function openPage(page) {
    Render.showPage(page);
};

app.fn.backToMain = function backToMain() {
    Render.showPage(app.MainPage);
};

app.fn.openPrevPage = function openPrevPage() {
    if (PageState.previous !== '') {
        Render.showPage(PageState.previous);
    }
};

app.fn.openPrevPageWithState = function openPrevPageWithState() {
    if (PageState.previous !== '') {
        Render.showPage(PageState.previous, true);
    }
};

app.fn.openPageWithWaitingForEvent = function openPageWithWaitingForEvent(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('openPageWithWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');

        return;
    }

    Loader.start();

    El.body.on(arg[0], () => Render.showPage(arg[1]));
};

app.fn.openPageAndScrollToSection = function openPageAndScrollToSection(arg) {
    Render.showPage(arg[0]);

    El.body.on('bodyReady', () => {
        El.body.off('bodyReady');
        app.fn.jumpTo(arg[1]);
    });
};

app.fn.openPageWithWaitingForEventAndScrollToSection = function openPageWithWaitingForEventAndScrollToSection(arg) {
    if (!Array.isArray(arg) || arg.length < 3) {
        alert('openPageWithWaitingForEventAndScrollToSection has 3 mandatory argument: ["eventName", "pageId", "section"] !');

        return;
    }
    Loader.start();

    El.body.on(arg[0], () => {
        Render.showPage(arg[1]);

        El.body.on('bodyReady', () => {
            El.body.off('bodyReady');
            app.fn.jumpTo(arg[2]);
        });
    });
};

app.fn.openPageWithState = function openPageWithState(page) {
    if (Array.isArray(page)) {
        if (PageState[page[0]]) {
            Render.showPage(page[0], true);
            El.body.on('bodyReady', () => {
                El.body.off('bodyReady');

                if (page.length > 1) {
                    for (let i = 1; i < page.length; ++i) {
                        app.fn.forceRefresh(page[i]);
                    }
                }
            });
        } else {
            Render.showPage(page[0]);

        }
    } else {
        if (PageState[page]) {
            Render.showPage(page, true);
        } else {
            Render.showPage(page);
        }
    }
};

app.fn.openPageWithStateAndScrollToSection = function openPageWithStateAndScrollToSection(arg) {
    Render.showPage(arg[0], true);

    El.body.on('bodyReady', () => {
        El.body.off('bodyReady');
        app.fn.jumpTo(arg[1]);

        if (arg.length > 2) {
            for (let i = 2; i < arg.length; ++i) {
                app.fn.forceRefresh(arg[i]);
            }
        }
    });
};

app.fn.openPageWithStateAndWaitingForEvent = function openPageWithStateAndWaitingForEvent(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('openPageWithStateAndWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');

        return;
    }

    Loader.start();

    El.body.on(arg[0], () => {
        Render.showPage(arg[1], true);

        if (arg.length > 2) {
            El.body.on('bodyReady', () => {
                El.body.off('bodyReady');

                for (let i = 2; i < arg.length; ++i) {
                    app.fn.forceRefresh(arg[i]);
                }
            });
        }
    });
};

app.fn.openPageWithStateAndWaitingForEventAndScrollToSection = function openPageWithStateAndWaitingForEventAndScrollToSection(arg) {
    if (!Array.isArray(arg) || arg.length < 3) {
        alert('openPageWithStateAndWaitingForEventAndScrollToSection has 3 mandatory argument: ["eventName", "pageId", "sectionName"] !');

        return;
    }

    Loader.start();

    El.body.on(arg[0], () => {
        Render.showPage(arg[1], true);

        El.body.on('bodyReady', () => {
            El.body.off('bodyReady');
            app.fn.jumpTo(arg[2]);

            if (arg.length > 3) {
                for (let i = 3; i < arg.length; ++i) {
                    app.fn.forceRefresh(arg[i]);
                }
            }
        });
    });
};

app.fn.removeWidgetValues = function removeWidgetValues(widgetIds) {
    widgetIds.forEach(id => WidgetValue[id] = {});
};

app.fn.skip = function skip(arg) {
    return arg;
};

app.fn.removePageValues = function removePageValues(pageId) {
    let page = WidgetConfig[pageId], w;

    for (w of page.widgets) {
        WidgetValue[w.id] = {};
        app.fn.removeValuesRecursively(w.widgets);
    }
};

app.fn.removeValuesRecursively = function removeValuesRecursively(widgets) {
    for (let w of widgets || []) {
        WidgetValue[w.id] = {};
        app.fn.removeValuesRecursively(w.widgets);
    }
};

app.fn.showToolTipsChanged = function showToolTipsChanged() {
    $('.ks-button-info').toggle(WidgetValue.ShowTooltips === true);
};

app.fn.forceRefresh = function forceRefresh(widgetId) {
    El.body.triggerHandler('forcerefresh.' + widgetId);
};

app.fn.forceRefreshWithoutLoader = function forceRefreshWithoutLoader(widgetId) {
    El.body.triggerHandler('forcerefreshwithoutloader.' + widgetId);
};

app.fn.forceRefreshWidgets = function forceRefreshWidgets(widgetIds) {
    widgetIds.forEach(widgetId => El.body.triggerHandler('forcerefresh.' + widgetId));
};

app.fn.forceRefreshWithDelay = function forceRefreshWithDelay(argument) {
    setTimeout(function () {
        El.body.triggerHandler('forcerefresh.' + argument[0]);
    }, argument[1]);
};

app.fn.goToUrl = function goToUrl(url) {
    window.location.href = url;
};

app.fn.goToUrlNewTab = function goToUrlNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
};

app.fn.showPopup = function showPopup(c, w = false) {
    app.popup.show(c, w);
};

app.fn.changeSystemValue = function changeSystemValue(arg) {
    WidgetValue[arg[0]] = v(arg[1]) === 1;
};

app.fn.addSystemValue = function addSystemValue(arg) {
    WidgetValue[arg[0]] = arg[1];
};

app.fn.addSystemValueByVal = function addSystemValueByVal(arg) {
    WidgetValue[arg[0]] = v(arg[1]);
};

app.fn.addGridTableSystemValue = function addGridTableSystemValue(arg) {
    let systemValueName = 'systemValue' + arg[0], gridTableValues = v(arg[1]);

    WidgetValue[systemValueName] = gridTableValues.cellData[gridTableValues.row][arg[2]][arg[3]];
};

app.fn.addGridTableCurrentRowSystemValue = function addGridTableCurrentRowSystemValue(arg) {
    WidgetValue['systemValue' + arg[0]] = Utils.getGridTableCell(arg[1], arg[2])[arg[3]];
};

app.fn.increaseWidgetValue = function increaseWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k) && v(arg[2]) && v(k) < v(arg[2])) {
        WidgetValue[arg[0]].value = parseInt(v(k)) + parseInt(arg[1]);
    }
};

app.fn.decreaseWidgetValue = function decreaseWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k) && v(k) > arg[2]) {
        WidgetValue[arg[0]].value = parseInt(v(k)) - parseInt(arg[1]);
    }
};

app.fn.resetWidgetValue = function resetWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k)) {
        WidgetValue[arg[0]].value = parseInt(arg[1]);
    }
};

app.fn.setWidgetValue = function setWidgetValue(arg) {
    let k = arg[0] + '.value';

    if (v(k) && v(arg[1])) {
        WidgetValue[arg[0]].value = v(arg[1]);
    }
};

app.fn.removePageState = function removePageState(ids) {
    for (let id of ids) {
        if (PageState[id]) {
            delete PageState[id];
        }
    }
};

app.fn.openPopup = function openPopup(argument, ev, element) {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.open();
};

app.fn.openPopupWithTimeout = function openPopupWithTimeout(argument, ev, element) {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('openPopupWithTimeout has 2 mandatory argument: ["popupid", "timeout ms"] !');
        return;
    }
    setTimeout(function () {
        app.fn.openPopup(argument[0], ev, element)
    }, argument[1]);
};

app.fn.togglePopup = function togglePopup(argument, ev, element) {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.toggle();
};

app.fn.closePopup = function closePopup(argument) {
    const c = PopupWidget.popupsByIds[argument];
    c && c.close();
};

app.fn.showInfoWidget = function showInfoWidget(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('showInfoWidget has 2 mandatory argument: ["infoPopupId", {repository data structure}] !');

        return;
    }

    app.fn.fadeOutWidget(arg[0]);
    WidgetValue.infoData = arg[1];

    if (arg.length > 2) {
        for (let i = 2; i < arg.length; ++i) {
            app.fn.forceRefresh(arg[i]);
        }
    }

    app.fn.fadeInWidget(arg[0], 300);
};

app.fn.toggleInfoWidget = function toggleInfoWidget(arg) {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('toggleInfoWidget has 2 mandatory argument: ["infoPopupId", {repository data structure}] !');

        return;
    }

    app.fn.toggleWidget(arg[0]);

    if ($('#' + arg[0]).is(':visible')) {
        WidgetValue.infoData = arg[1];

        if (arg.length > 2) {
            for (let i = 2; i < arg.length; ++i) {
                app.fn.forceRefresh(arg[i]);
            }
        }
    }
};

app.fn.pastToGridTableText = function pastToGridTableText(argument, ev, element) {
    TextWidget.paste($('#' + WidgetValue['rightclick']), ev);
};

app.fn.checkTIResponseStatus = function checkTIResponseStatus(argument, ev, element, response) {
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

app.fn.conditionalHorizontalTableEventHandlerExecution = function conditionalHorizontalTableEventHandlerExecution(argument, ev, element) {
    let widgetId = element.data('id'),
        action = element.data('action'),
        row = v(widgetId)[action].rowindex,
        currentCell = v(widgetId).rows[row][0];
    app.fn.conditionalExecution(argument, ev, element, currentCell);
};

app.fn.conditionalGridTablePopup = function conditionalGridTablePopup(argument, ev, element) {
    let currentCell = Utils.getGridTableCurrentCell(element.data('id').split('_')[0]);
    app.fn.conditionalExecution(argument, ev, element, currentCell);
};

app.fn.conditionalExecution = (argument, ev, element, currentCell) => {
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

app.fn.increasePage = function increasePage(widgetId) {
    if (WidgetState[widgetId].page) {
        WidgetState[widgetId].page = WidgetState[widgetId].page + 1;
    } else {
        WidgetState[widgetId].page = 2;
    }
    let start = (WidgetState[widgetId].page - 2) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col;
    app.fn.copyChangedCells(widgetId, start);
    El.body.triggerHandler('page.' + widgetId);
};

app.fn.decreasePage = function decreasePage(widgetId) {
    if (WidgetState[widgetId].page) {
        WidgetState[widgetId].page = WidgetState[widgetId].page - 1;
    }

    let start = (WidgetState[widgetId].page) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col;
    app.fn.copyChangedCells(widgetId, start);

    El.body.triggerHandler('page.' + widgetId);
};

app.fn.jumpToFirstPage = function jumpToFirstPage(widgetId) {
    app.fn.copyChangedCells(widgetId, (WidgetState[widgetId].page - 1) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col);
    WidgetState[widgetId].page = 1;
    El.body.triggerHandler('page.' + widgetId);
};

app.fn.jumpToLastPage = function jumpToLastPage(widgetId) {
    app.fn.copyChangedCells(widgetId, (WidgetState[widgetId].page - 1) * WidgetState[widgetId].maxRows * WidgetState[widgetId].col);
    WidgetState[widgetId].page = Utils.getGridTableActualAndLastPage(widgetId).maxPage;
    El.body.triggerHandler('page.' + widgetId);
};

app.fn.copyChangedCells = function copyChangedCells(widgetId, start) {
    let changedCells = $('#' + widgetId).find('.ks-grid-table-content .ks-grid-table-cell'), i = 0;
    while (i < changedCells.length) {
        WidgetState[widgetId]['widgets'][start + i] = changedCells[i].outerHTML;
        ++i;
    }
};

app.fn.executeRequest = function executeRequest(eventMapId) {
    QB.writeData(eventMapId, {}, {});
};

app.fn.executeQueryRequest = function executeQueryRequest(argument) {
    QB.loadData(argument[0], '', false, argument[1]);
};

app.fn.removeSliders = function removeSliders() {
    SliderWidget.slidersByIds = [];
    SliderWidget.isDocEventsHaveBeenBound = false;
};

app.fn.updateContent = function updateContent(widgetId) {
    El.body.triggerHandler('updatecontent.' + widgetId);
};

app.fn.updateContentWithoutLoader = function updateContentWithoutLoader(widgetId) {
    El.body.triggerHandler('updatecontentwithoutloader.' + widgetId);
};

app.fn.updateWidgetsContent = function updateWidgetsContent(widgetIds) {
    widgetIds.forEach(widgetId => El.body.triggerHandler('updatecontent.' + widgetId));
};

app.fn.updateWidgetsContentWithoutLoader = function updateWidgetsContentWithoutLoader(widgetIds) {
    widgetIds.forEach(widgetId => El.body.triggerHandler('updatecontentwithoutloader.' + widgetId));
};
