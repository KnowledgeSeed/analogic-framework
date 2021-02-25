/* global app, PopupWidget */

'use strict';
app.fn.showWidgets = (ids) => {
    for (let id of ids) {
        app.fn.showWidget(id);
    }
};

app.fn.showWidget = (id) => {
    $('#' + id).show();
    $('#' + id).addClass('forcedByEventMap');
};

app.fn.hideWidgets = (ids) => {
    for (let id of ids) {
        app.fn.hideWidget(id);
    }
};

app.fn.hideWidget = (id) => {
    $('#' + id).hide();
    $('#' + id).addClass('forcedByEventMap');
};

app.fn.toggleWidgets = (ids) => {
    for (let id of ids) {
        app.fn.toggleWidget(id);
    }
};

app.fn.toggleWidget = (id) => {
    $('#' + id).toggle();
    $('#' + id).addClass('forcedByEventMap');
};

app.fn.fadeOutWidget = (id) => {
    $('#' + id).fadeOut(300);
    $('#' + id).addClass('forcedByEventMap');
};

app.fn.fadeInWidget = (id) => {
    $('#' + id).fadeIn(300);
    $('#' + id).addClass('forcedByEventMap');
};

app.fn.changeSegmentedControlSelection = (tabId) => {
    let t = $('#' + tabId);
    t.closest('section').parent().closest('section').find('.segment').removeClass('on');
    t.addClass('on');
};

app.fn.resetRadioButtons = (id) => {
    let t = $('#' + id).find('.widget-radio');
    t.removeClass('on');
    t.closest('tr').attr('style', '');
};

app.fn.scrollTo = (id) => {
    app.utils.scrollTo(id);
};

app.fn.jumpTo = (id) => {
    window.location.href = '#' + id;
};

app.fn.openPage = (page) => {
    app.fn.showPage(page);
};

app.fn.backToMain = () => {
    app.fn.showPage(app.MainPage);
};


app.fn.openPrevPage = () => {
    if (app.pageState.previous !== '') {
        app.fn.openPage(app.pageState.previous);
    }
};

app.fn.openPrevPageWithState = () => {
    if (app.pageState.previous !== '') {
        app.fn.showPage(app.pageState.previous, true);
    }
};

app.fn.openPageWithWaitingForEvent = (argument) => {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('openPageWithWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');
        return;
    }
    app.loader.start();
    app.el.body.on(argument[0], () => {
        app.fn.showPage(argument[1]);
    });
};

app.fn.openPageAndScrollToSection = (argument) => {
    app.fn.showPage(argument[0]);
    app.el.body.on('bodyReady', () => {
        app.el.body.off('bodyReady');
        app.fn.jumpTo(argument[1]);
    });
};

app.fn.openPageWithWaitingForEventAndScrollToSection = (argument) => {
    if (!Array.isArray(argument) || argument.length < 3) {
        alert('openPageWithWaitingForEventAndScrollToSection has 3 mandatory argument: ["eventName", "pageId", "section"] !');
        return;
    }
    app.loader.start();
    app.el.body.on(argument[0], () => {
        app.fn.showPage(argument[1]);
        app.el.body.on('bodyReady', () => {
            app.el.body.off('bodyReady');
            app.fn.jumpTo(argument[2]);
        });
    });
};


//cached html

app.fn.openPageWithState = (page) => {
    if (Array.isArray(page)) {
        if (app.pageState[page[0]]) {
            app.fn.showPage(page[0], true);
        } else {
            app.fn.showPage(page[0]);

        }
        app.el.body.on('bodyReady', () => {
            app.el.body.off('bodyReady');
            if (page.length > 1) {
                for (let i = 1; i < page.length; ++i) {
                    app.fn.forceRefresh(page[i]);
                }
            }
        });
    } else {
        if (app.pageState[page]) {
            app.fn.showPage(page, true);
        } else {
            app.fn.showPage(page);
        }

    }

};

app.fn.openPageWithStateAndScrollToSection = (argument) => {
    app.fn.showPage(argument[0], true);
    app.el.body.on('bodyReady', () => {
        app.el.body.off('bodyReady');
        app.fn.jumpTo(argument[1]);
        if (argument.length > 2) {
            for (let i = 2; i < argument.length; ++i) {
                app.fn.forceRefresh(argument[i]);
            }
        }
    });
};

app.fn.openPageWithStateAndWaitingForEvent = (argument) => {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('openPageWithStateAndWaitingForEvent has 2 mandatory argument: ["eventName", "pageId"] !');
        return;
    }
    app.loader.start();
    app.el.body.on(argument[0], () => {
        app.fn.showPage(argument[1], true);
        if (argument.length > 2) {
            app.el.body.on('bodyReady', () => {
                app.el.body.off('bodyReady');
                for (let i = 2; i < argument.length; ++i) {
                    app.fn.forceRefresh(argument[i]);
                }
            });
        }
    });
};

app.fn.openPageWithStateAndWaitingForEventAndScrollToSection = (argument) => {
    if (!Array.isArray(argument) || argument.length < 3) {
        alert('openPageWithStateAndWaitingForEventAndScrollToSection has 3 mandatory argument: ["eventName", "pageId", "sectionName"] !');
        return;
    }
    app.loader.start();
    app.el.body.on(argument[0], () => {
        app.fn.showPage(argument[1], true);
        app.el.body.on('bodyReady', () => {
            app.el.body.off('bodyReady');
            app.fn.jumpTo(argument[2]);
            if (argument.length > 3) {
                for (let i = 3; i < argument.length; ++i) {
                    app.fn.forceRefresh(argument[i]);
                }
            }
        });
    });
};

app.fn.handleListener = (event) => {
    if (event.data.method === 'refresh') {
        app.fn.renderWidget(event);
    }

    if (event.data.method === 'refreshWithoutLoader') {
        app.fn.renderWidget(event, false, false, false, false);
    }

    if (event.data.method === 'refreshGridCell') {
        app.fn.refreshGridCell(event);
    }

    if (event.data.method === 'refreshWithWaitingForEvent') {
        let eventName = event.data.parameters[0];
        let widgetId = event.data.options.id;
        app.el.body.on(eventName, () => {
            app.el.body.off(eventName);
            app.fn.forceRefresh(widgetId);
        });
    }

    if (event.data.method === 'refreshWithState') {
        app.fn.renderWidget(event, null, null, true);
    }

    if (event.data.method === 'show') {
        $('#' + event.data.options.id).show();
    }

    if (event.data.method === 'hide') {
        $('#' + event.data.options.id).hide();
    }
};


app.fn.removeWidgetValues = (widgetIds) => {
    for (let w of widgetIds) {
        app.widgetValue[w] = {};
    }
};

app.fn.removePageValues = (pageId) => {
    let page = app.widgetConfig[pageId], w;
    for (w of page.widgets) {
        app.widgetValue[w.id] = {};
        app.fn.removeValuesRecursively(w.widgets);
    }
};

app.fn.removeValuesRecursively = (widgets) => {
    let w;
    if (widgets) {
        for (w of widgets) {
            app.widgetValue[w.id] = {};
            app.fn.removeValuesRecursively(w.widgets);
        }
    }
};

app.fn.showToolTipsChanged = () => {
    if (app.widgetValue['ShowTooltips'] === true) {
        $('.ks-button-info').show();
    } else {
        $('.ks-button-info').hide();
    }
};

app.fn.forceRefresh = (widgetId) => {
    app.el.body.triggerHandler('forcerefresh.' + widgetId);
};

app.fn.goToUrl = (url) => {
    window.location.href = url;
};

app.fn.goToUrlNewTab = (url) => {
    let win = window.open(url, '_blank');
    win.focus();
};

app.fn.showPopup = (content) => {
    app.popup.show(content);
};

app.fn.changeSystemValue = (argument) => {
    app.widgetValue[argument[0]] = v(argument[1]) === 1;
};

app.fn.addSystemValue = (argument) => {
    app.widgetValue[argument[0]] = argument[1];
};

app.fn.addSystemValueByVal = (argument) => {
    app.widgetValue[argument[0]] = v(argument[1]);
};

app.fn.addGridTableSystemValue = (argument) => {
    let systemValueName = 'systemValue' + argument[0], gridTableValues = v(argument[1]);
    app.widgetValue[systemValueName] = gridTableValues.cellData[gridTableValues.row][argument[2]][argument[3]];
};

app.fn.increaseWidgetValue = (argument) => {
   let k = argument[0] + '.value';
   if(v(k) && v(argument[2]) && v(k) < v(argument[2])){
      app.widgetValue[argument[0]].value = parseInt(v(k)) + parseInt(argument[1]);
   }
};

app.fn.decreaseWidgetValue = (argument) => {
   let k = argument[0] + '.value';
   if(v(k) && v(k) > argument[2]){
      app.widgetValue[argument[0]].value = parseInt(v(k)) - parseInt(argument[1]);
   }
};

app.fn.resetWidgetValue = (argument) => {
   let k = argument[0] + '.value';
   if(v(k)){
      app.widgetValue[argument[0]].value = parseInt(argument[1]);
   }
};

app.fn.setWidgetValue = (argument) => {
   let k = argument[0] + '.value';
   if(v(k) && v(argument[1])){
       app.widgetValue[argument[0]].value = v(argument[1]);
   }
};

app.fn.removePageState = (ids) => {
    for (let id of ids) {
        if (app.pageState[id]) {
            delete app.pageState[id];
        }
    }
};

app.fn.openPopup = (argument, event, element) => {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.open();
};

app.fn.togglePopup = (argument, event, element) => {
    const c = PopupWidget.popupsByIds[argument];

    if (c.isAnchorOnClick()) {
        c.setAnchor($('#' + element.data('id')));
    }

    c.toggle();
};

app.fn.showInfoWidget = (argument) => {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('showInfoWidget has 2 mandatory argument: ["infoPopupId", {repository data structure}] !');
        return;
    }
    app.fn.fadeOutWidget(argument[0]);
    app.widgetValue['infoData'] = argument[1];
    if (argument.length > 2) {
        for (let i = 2; i < argument.length; ++i) {
            app.fn.forceRefresh(argument[i]);
        }
    }
    app.fn.fadeInWidget(argument[0], 300);
};

app.fn.toggleInfoWidget = (argument) => {
    if (!Array.isArray(argument) || argument.length < 2) {
        alert('toggleInfoWidget has 2 mandatory argument: ["infoPopupId", {repository data structure}] !');
        return;
    }
    app.fn.toggleWidget(argument[0]);
    if ($('#' + argument[0]).is(":visible")) {
        app.widgetValue['infoData'] = argument[1];
        if (argument.length > 2) {
            for (let i = 2; i < argument.length; ++i) {
                app.fn.forceRefresh(argument[i]);
            }
        }
    }

};



