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

let EventMap, Repository, WidgetConfig;

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

        let deferred = [];

        Extensions.appInitialization.forEach(ext => deferred.push(ext.execute()));

        $.when.apply($, deferred).then(() => {

            app.checkScreenResolutionWarningDisplayed = false;

            initEvents();

            Widgets.systemValueGlobalCompanyProductPlanVersion = 'Budget';


            Auth.getAjaxRequest(Utils.getAppProviderBasedUrl('navigation_parameters'), {}, 'GET').then((data) => {
                let page = app.mainPage, navigationParametersAdded = false;
                if (data.navigation_parameters) {
                    let navigation_parameters;

                    try {
                        const decoded = atob(data.navigation_parameters);
                        navigation_parameters = JSON.parse(decoded);

                        if (navigation_parameters.page) {
                            page = navigation_parameters.page;
                            navigationParametersAdded = true;
                        }
                        for (let key in navigation_parameters) {
                            if (key !== 'page') {
                                Widgets[key] = navigation_parameters[key];
                            }
                        }
                        if (navigation_parameters.sub_path) {
                            Utils.changeUrlState(navigation_parameters.sub_path);
                        } else if(navigation_parameters.page){
                            Utils.changeUrlState(navigation_parameters.page);
                        } else {
                            Utils.changeUrlState(page);
                        }
                    } catch (error) {
                        console.error("Failed to process navigation_parameters:", error.message);
                        navigation_parameters = {};
                    }
                } else {
                    Utils.changeUrlState(page);
                }

                Widgets[page].renderWidget().then(() => {
                    Utils.checkScreenResolution();
                    if (app.enableToolTips) {
                        Utils.enableToolTips();
                    }
                    if (navigationParametersAdded) {
                        Auth.getAjaxRequest(Utils.getAppProviderBasedUrl('clear_navigation_parameters'), {}, 'GET');
                    }
                });
                PageState.current = page;
            });
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