/* global app, jQuery, Loader, QB, Render, Utils */

'use strict';

const Doc = $(document), El = {body: $('body')}, PageState = {current: '', previous: ''}, WidgetValue = {infoData: {}},
    Extensions = {
        authenticationProviders: [],
        writeExecutors: []
    }, Widgets = {};

let EventMap, Repository, WidgetConfig;

(() => {
    Doc.ready(() => {
        EventMap = EventMap || app.eventMap;//Todo app.eventMap megszűntetése

        Repository = Repository || app.repository;

        WidgetConfig = WidgetConfig || app.widgetConfig;

        app.clickEvent = Utils.isMobile() ? 'touchstart' : 'click touchstart';

        Loader.autoOn();

        let wc, i;

        for (i in WidgetConfig) {
            wc = WidgetConfig[i];

            if (wc.type) {
                loadWidget(wc);
            }
        }

        QB.getUserData().then(start);
    }).on('touchstart', () => app.isTouched = true);

    function loadWidget(wc, parent = Widgets, parentId = null) {
        if (wc.import) {
            let wci = v(wc.import, WidgetConfig), w = new wci.type(wci);
            w.widgets = {};
            if(parent[wc.id]) {
                L('duplicated widgetid: ' + wc.id );
                L(wc);
            }
            parent[wc.id] = w;
            (wci.widgets || []).forEach(w => loadWidget(w, parent[wc.id].widgets, wc.id));
        } else {
            if (parent[wc.id]) {
                L('duplicated widgetid: ' + wc.id);
                L(wc);
            }
            let wcc = new wc.type(wc);
            wcc.parentId = parentId;
            wc.parentId = parentId;
            parent[wc.id] = wcc;
            (wc.widgets || []).forEach(w => loadWidget(w, parent, parentId));
        }
    }

    function start() {
        app.id = Utils.getRandomId();

        initEvents();

        WidgetValue.systemValueGlobalCompanyProductPlanVersion = 'Budget';//Todo ez mi? Ne töröld, amíg nem nézem meg a bpspben (Ote)

        Render.showPage(WidgetValue.redirect !== null ? WidgetValue.redirect : app.mainPage);

        WidgetValue.redirect = null;
    }

    function initEvents() {
        window.onbeforeunload = () => 'Logout';
    }

    function requestClipboarReadPermissionForFireFox() {
        navigator.permissions.query({name: 'clipboard-read'}).then(result => L(result.state));
    }

    app.fn.getZoomButtonsHtml = widget => {
        if (!widget.options.zoomable) {
            return '';
        }

        return '<div class="widget-financial-block-buttons"><span class="icon-minimize"><\/span><span id="' + widget.options.id + 'FullScreenBtn" class="icon-full-screen"><\/span><\/div>';
    };

    app.fn.showInFullScreen = (headerName, content) => {
        const s = Doc.scrollTop();

        El.visibleBodyChildren = El.body.children().filter(':visible').hide();

        return El.body.prepend('<div data-scrolltop="' + s + '" id="widgetFullscreen" class="widget-fullscreen"><header class="small-header"><div class="wrapper"><div class="row"><div class="col"><h1>' + headerName + '<\/h1><\/div><\/div><\/div><span id="fullScreenOffBtn" class="icon-full-screen-off"><\/span><\/header><div id="fullScreenContent" class="widget-fullscreen-content">' + content + '<\/div><\/div>');
    };
})();