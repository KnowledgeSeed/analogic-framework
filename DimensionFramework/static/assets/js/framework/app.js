/* global jQuery, Loader, QB, Render, Utils */

'use strict';

const Doc = $(document), El = {body: $('body')}, PageState = {current: '', previous: ''}, WidgetValue = {infoData: {}};

let EventMap, Repository, WidgetConfig;

(() => {
    Doc.ready(() => {
        EventMap = EventMap || app.eventMap;

        Repository = Repository || app.repository;

        WidgetConfig = WidgetConfig || app.widgetConfig;

        app.clickEvent = Utils.isMobile() ? 'touchstart' : 'click touchstart';

        Loader.autoOn();

        QB.getUserData().then(start);
    }).on('touchstart', () => app.isTouched = true);

    function start() {
        app.id = Utils.getRandomId();

        initEvents();

        Render.showPage(WidgetValue['redirect'] !== null ? WidgetValue['redirect'] : app.MainPage);

        WidgetValue['redirect'] = null;
    }

    function initEvents() {
        window.onbeforeunload = () => 'Logout';

        if (app.useShout) {
            setInterval(app.fn.getShouts, 1000);
        }
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