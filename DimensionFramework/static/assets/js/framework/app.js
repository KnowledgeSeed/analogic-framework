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
      /*  WidgetValue['systemValueGlobalStartingPlanYear'] = 2021;//todo temp
        WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';//todo temp
        WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = 'Y1'; //todo temp
        WidgetValue['activeUserName'] = 'Knowledgeseed/Oravecz Tamás'; //todo temp
        WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = 2022;//todo temp
        WidgetValue['systemValueFocusedProduct']  = 'P6';//todo temp
        WidgetValue['systemValueCheckoutProduct'] = 'P6'; //todo temp
        WidgetValue['systemValueSegmentedControlPeriodUnit'] = 'Yearly';
        WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';//todo temp
        WidgetValue['rocheBPSPProductsGridRow1Cell2DropBox'] = {
            value: 'Roche Dia Brazil',
            items: [{name: "Roche Dia Brazil", key: "1241", on: true}]
        };//todo temp
        WidgetValue['rocheBPSPMaterialGridRow1Cell2DropBox'] = {
            value: 'Roche Dia Brazil',
            items: [{name: "Roche Dia Brazil", key: "1241", on: true}]
        };//todo temp
        WidgetValue['rocheBPSPProductsGridRow1Cell3DropBox'] = {value: 'BR Brazil'};*/
WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';
        /* short route to customer planning page
        app.MainPage = 'rocheBPSPCustomersPlanning';
        WidgetValue['systemValueGlobalStartingPlanYear'] = 2021;
        WidgetValue['systemValueGlobalSegmentedControlRelativeYearValue'] = 2021;
        WidgetValue['systemValueGlobalSegmentedControlRelativeYear'] = 'Y0';
        WidgetValue['systemValueGlobalCompanyVersion'] = 'Live';
        WidgetValue['systemValueGlobalCompanyProductPlanVersion'] = 'Budget';
        WidgetValue['activeUserName'] = 'Knowledgeseed/Oravecz Tamás';
        WidgetValue['rocheBPSPCustomersCompanySelector'] = {
            value: 'RD Poland',
            items: [{name: "RD Poland", key: "1391", on: true}]
        };
        WidgetValue['rocheBPSPCustomersTerritorySelector'] = {
            value: 'PL - ASM Centrum (Budzynski)',
            items: [{name: "PL - ASM Centrum (Budzynski)", key: "TTY-0000000451", on: true}]
        };
        WidgetValue['rocheBPSPCustomersHorizontalTable'] = {
            open: {
                receiver: 'PL',
                code: 'GNN-0003251897',
                customer: 'Lublin-Samodzielny Publiczny Szpital Kliniczny Nr 1-PL43000922'
            }
        };
        WidgetValue['systemValueCustomerPlanningSegmentedControlPeriodUnit'] = 'Yearly';
        WidgetValue['systemValueCustomersPlanningMonthlyType'] = 'Base Plan';
        WidgetValue['systemValueCustomersPlanningFocused'] = 'PL1';
        WidgetValue['systemValueDefaultCustomersPlanningFocused'] = 'PL1';
        WidgetValue['systemValueCustomersPlanningCustomerCode'] = 'GNN-0003251897';
        WidgetValue['systemValueCustomersPlanningMonthlyTypeValue'] = 'Base Plan';

         /*end customer planning */


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