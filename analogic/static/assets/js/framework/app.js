/* global app, jQuery, Loader, QB, Render, Utils */

'use strict';

const Doc = $(document), El = {body: $('body')}, PageState = {current: '', previous: ''},
    Extensions = {
        authenticationProviders: [],
        writeExecutors: [],
        pageRender: [],
        appInitialization: [],
        urlParameters: []
    },
    Widgets = {infoData: {}},
    Api = {};

let EventMap, Repository, WidgetConfig, FaviconUrl, contextMenu;

app.handleAjaxError = (response, widgetId) => {
    const m = (response.responseJSON ? response.responseJSON.message : response.responseText);

    if (Widgets[widgetId] && Widgets[widgetId].options.muteAjaxErrorHandler) {
        return;
    }

    Api.showPopup(response.statusText + ' in ' + widgetId + ':<br/><br/>' + m, 850);
};

app.handleJsError = (error, widgetId, functionName, message) => {
    Loader.stop();
    let msg = message;
    msg += widgetId ? '<br/><br/> widget id: ' + widgetId : '';
    msg += functionName ? '<br/><br/> function: ' + functionName : '';
    msg += error.stack ? '<br/><br/> stack: <br/><br/>' + error.stack : error;
    Api.showPopup(msg, 800);
    throw error;
};

window.onerror = (msg, url, lineNum, colNum, error) => {
    app.hasError = true;
    Api.showPopup(msg + '<br/>' + url + '<br/> in line ' + lineNum + ' column ' + colNum, 800);
    return false;
};

(() => {
    Doc.ready(() => {

        app.clickEvent = Utils.isMobile() ? 'touchstart' : 'click touchstart';
        contextMenu = new ContextMenu();

        let wc, i, j;

        for (i in WidgetConfig) {
            wc = WidgetConfig[i];

            if (wc.type) {
                loadWidget(wc);
            } else {
                for (j in wc) {
                    if (wc[j].id !== j) {
                        console.error('Widget id "' + wc[j].id + '" mismatch with reusable "' + j + '" in  reusable collection "' + i + '". Widget id should be "' + j + '"');
                    }
                }
            }
        }

        FaviconUrl = Utils.parseJSONScript('favicon-url-data');

        QB.getUserData().then(start);
    }).on('touchstart', () => app.isTouched = true);

    function loadWidget(wc, parent = Widgets, parentId = null) {
        if (wc.import) {
            let wci = v(wc.import, WidgetConfig);
            if (wci === false) {
                console.error('WidgetConfig import error: ' + wc.import + ' not found');
            }
            let w = new wci.type(wci);
            if (!parent[wci.id]) {
                parent[wci.id] = w;
                (wci.widgets || []).forEach(w => loadWidget(w, parent, wci.id));
            }
        } else {
            if (wc.id.includes('_')) {
                console.warn('Widget id must not contain underscore: ' + wc.id);
            }
            if (parent[wc.id]) {
                console.error('duplicated widgetid: ' + wc.id);
            }
            let wcc = new wc.type(wc);
            parent[wc.id] = wcc;
            (wc.widgets || []).forEach(w => loadWidget(w, parent, parentId));
        }
    }

    function start() {
        if (app.hasError) {
            return;
        }

        app.id = Utils.getRandomId();

        const deferred = Extensions.appInitialization.map(ext => ext.execute());

        $.when(...deferred).then(() => {
            app.checkScreenResolutionWarningDisplayed = false;
            initEvents();
            Widgets.systemValueGlobalCompanyProductPlanVersion = 'Budget';

            let page = app.mainPage;
            let data = {navigation_parameters: $('#navigation_parameters').val()};

            if (data.navigation_parameters) {
                try {
                    const decoded = atob(data.navigation_parameters);
                    const navigationParameters = JSON.parse(decoded);

                    if (navigationParameters.page) {
                        page = navigationParameters.page;
                    }

                    Object.entries(navigationParameters).forEach(([key, value]) => {
                        if (key !== 'page') {
                            Widgets[key] = value;
                        }
                    });

                    if (navigationParameters.sub_path) {
                        Utils.changeUrlState(navigationParameters.sub_path);
                    } else {
                        Utils.changeUrlState(navigationParameters.p_param ? app.mainPage : page);
                    }
                } catch (error) {
                    console.error("Failed to process navigation_parameters:", error.message);
                }
            } else {
                Utils.changeUrlState(page);
            }

            Widgets[page].renderWidget().then(() => {
                Utils.checkScreenResolution();

                if (app.enableToolTips) {
                    Utils.enableToolTips();
                }

            });

            PageState.current = page;
        });
    }


    function initEvents() {

        window.addEventListener("popstate", (event) => {
            if (event.state && event.state.page) {
                Api.openPage(event.state.page);
            }
        });

        if (app.disableBeforeUnload) {
            return;
        }
        window.onbeforeunload = () => 'Logout';

    }

    function requestClipboarReadPermissionForFireFox() {
        navigator.permissions.query({name: 'clipboard-read'}).then(result => L(result.state));
    }

})();