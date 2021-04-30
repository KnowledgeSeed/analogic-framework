/* global app, El, PopupWidget, Loader, Listeners, PageState, Render, Utils, WidgetConfig, WidgetValue */

'use strict';
app.widgetValue = WidgetValue;

app.fn.handleListener = Listeners.handle;

app.fn.showWidgets = ids => ids.forEach(app.fn.showWidget);

app.fn.showWidget = id => $('#' + id).show().addClass('forcedByEventMap');

app.fn.hideWidgets = ids => ids.forEach(app.fn.hideWidget);

app.fn.hideWidget = id => $('#' + id).hide().addClass('forcedByEventMap');

app.fn.toggleWidgets = ids => ids.forEach(app.fn.toggleWidget);

app.fn.toggleWidget = id => $('#' + id).toggle().addClass('forcedByEventMap');

app.fn.fadeOutWidget = id => $('#' + id).fadeOut(300).addClass('forcedByEventMap');

app.fn.fadeInWidget = id => $('#' + id).fadeIn(300).addClass('forcedByEventMap');

app.fn.changeSegmentedControlSelection = tabId => $('#' + tabId).addClass('on').closest('section').parent().closest('section').find('.segment').removeClass('on');

app.fn.resetRadioButtons = id => $('#' + id).find('.widget-radio').removeClass('on').closest('tr').attr('style', '');

app.fn.scrollTo = Utils.scrollTo;

app.fn.jumpTo = id => window.location.href = '#' + id;

app.fn.openPage = page => Render.showPage(page);

app.fn.backToMain = () => Render.showPage(app.MainPage);

app.fn.openPrevPage = () => {
    if (PageState.previous !== '') {
        Render.showPage(PageState.previous);
    }
};

app.fn.openPrevPageWithState = () => {
    if (PageState.previous !== '') {
        Render.showPage(PageState.previous, true);
    }
};

app.fn.openPageWithWaitingForEvent = arg => {
    if (!Array.isArray(arg) || arg.length < 2) {
        alert('openPageWithWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');

        return;
    }

    Loader.start();

    El.body.on(arg[0], () => Render.showPage(arg[1]));
};

app.fn.openPageAndScrollToSection = arg => {
    Render.showPage(arg[0]);

    El.body.on('bodyReady', () => {
        El.body.off('bodyReady');
        app.fn.jumpTo(arg[1]);
    });
};

app.fn.openPageWithWaitingForEventAndScrollToSection = arg => {
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

app.fn.openPageWithState = page => {
    if (Array.isArray(page)) {
        if (PageState[page[0]]) {
            Render.showPage(page[0], true);
        } else {
            Render.showPage(page[0]);

        }

        El.body.on('bodyReady', () => {
            El.body.off('bodyReady');

            if (page.length > 1) {
                for (let i = 1; i < page.length; ++i) {
                    app.fn.forceRefresh(page[i]);
                }
            }
        });
    } else {
        if (PageState[page]) {
            Render.showPage(page, true);
        } else {
            Render.showPage(page);
        }
    }
};

app.fn.openPageWithStateAndScrollToSection = arg => {
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

app.fn.openPageWithStateAndWaitingForEvent = arg => {
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

app.fn.openPageWithStateAndWaitingForEventAndScrollToSection = arg => {
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

app.fn.removeWidgetValues = widgetIds => widgetIds.forEach(id => WidgetValue[id] = {});

app.fn.removePageValues = pageId => {
    let page = WidgetConfig[pageId], w;

    for (w of page.widgets) {
        WidgetValue[w.id] = {};
        app.fn.removeValuesRecursively(w.widgets);
    }
};

app.fn.removeValuesRecursively = widgets => {
    for (let w of widgets || []) {
        WidgetValue[w.id] = {};
        app.fn.removeValuesRecursively(w.widgets);
    }
};

app.fn.showToolTipsChanged = () => $('.ks-button-info').toggle(WidgetValue.ShowTooltips === true);

app.fn.forceRefresh = widgetId => El.body.triggerHandler('forcerefresh.' + widgetId);

app.fn.goToUrl = url => window.location.href = url;

app.fn.goToUrlNewTab = url => {
    let win = window.open(url, '_blank');
    win.focus();
};

app.fn.showPopup = (c, w = false) => app.popup.show(c, w);

app.fn.changeSystemValue = arg => WidgetValue[arg[0]] = v(arg[1]) === 1;

app.fn.addSystemValue = arg => WidgetValue[arg[0]] = arg[1];

app.fn.addSystemValueByVal = arg => WidgetValue[arg[0]] = v(arg[1]);

app.fn.addGridTableSystemValue = arg => {
    let systemValueName = 'systemValue' + arg[0], gridTableValues = v(arg[1]);

    WidgetValue[systemValueName] = gridTableValues.cellData[gridTableValues.row][arg[2]][arg[3]];
};

app.fn.increaseWidgetValue = arg => {
    let k = arg[0] + '.value';

    if (v(k) && v(arg[2]) && v(k) < v(arg[2])) {
        WidgetValue[arg[0]].value = parseInt(v(k)) + parseInt(arg[1]);
    }
};

app.fn.decreaseWidgetValue = arg => {
    let k = arg[0] + '.value';

    if (v(k) && v(k) > arg[2]) {
        WidgetValue[arg[0]].value = parseInt(v(k)) - parseInt(arg[1]);
    }
};

app.fn.resetWidgetValue = arg => {
    let k = arg[0] + '.value';

    if (v(k)) {
        WidgetValue[arg[0]].value = parseInt(arg[1]);
    }
};

app.fn.setWidgetValue = arg => {
    let k = arg[0] + '.value';

    if (v(k) && v(arg[1])) {
        WidgetValue[arg[0]].value = v(arg[1]);
    }
};

app.fn.removePageState = ids => {
    for (let id of ids) {
        if (PageState[id]) {
            delete PageState[id];
        }
    }
};

app.fn.openPopup = (argument, ev, element) => {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.open();
};

app.fn.togglePopup = (argument, ev, element) => {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.toggle();
};

app.fn.showInfoWidget = arg => {
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

app.fn.toggleInfoWidget = arg => {
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

app.fn.pastToGridTableText = (argument, ev, element) => {
  TextWidget.paste($('#' + WidgetValue['rightclick']), ev);
};

app.fn.checkTIResponseStatus = (argument, ev, element, response) => {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('checkResponseStatus has 2 mandatory argument!');
        return;
    }

    let f1 = false, f2 = false, f1args = [], f2args = [], i = 0, r;

    while(i < argument.length){
        if(typeof argument[i] === 'function'){
            f1 === false ? f1 = argument[i] : f2 = argument[i];
        } else {
            f2 === false ? f1args.push(argument[i]) : f2args.push(argument[i]);
        }
        ++i;
    }

    if(f1 === false || f2 === false){
        alert('checkResponseStatus has 2 mandatory function argument!');

        return;
    }

    r = v('ProcessExecuteStatusCode', response);

    if (r && r !== 'Aborted'){
        f1args.length <= 1 ? f1args.length > 0 ? f1(f1args[0], ev, element) : f1('', ev, element) : f1(f1args, ev, element);
    } else {
        f2args.length <= 1 ? f2args.length > 0 ? f2(f2args[0], ev, element) : f2('', ev, element) : f2(f2args, ev, element);
    }
};

app.fn.customGridTablePopupLogic = (argument, ev, element) => {
    console.log(element);
    //rocheBPSPProductsCheckoutPopup
}