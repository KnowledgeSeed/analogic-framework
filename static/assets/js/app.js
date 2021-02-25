/* global jQuery, _ */

'use strict';

(($, _) => {

    app.doc.ready(() => {
        app.prop.clickEvent = app.utils.isMobile() ? 'touchstart' : 'click touchstart';

        app.loader.autoOn();

        app.fn.getUserData().then(() => {
            app.id = app.utils.getRandomId();

            initEvents();

            app.fn.showPage(app.MainPage);
        });
    });

    function requestClipboarReadPermissionForFireFox() {
        navigator.permissions.query({name: 'clipboard-read'}).then((result) => {
            L(result.state);
        });
    }

    function initEvents() {
        window.onbeforeunload = () => {
            return 'Logout';
        };

        if (app.useShout) {
            setInterval(app.fn.getShouts, 1000);
        }
    }

    app.fn.showTm1ErrorPage = (url, body, event, widgetId) => {
        app.el.body.empty().off().promise().then(() => {
            let h = `
        <div style="margin-left: 15px;">
            <br/><h1>Error in api request!</h1><br/><br/>
            ${widgetId !== '' ? ` <h3>widget:</h3><br/><textarea rows="1" cols="100">${widgetId }</textarea><br/><br/>` : ''}
            <h3>response status:</h3><br/>
            <textarea rows="2" cols="100">${event.status + ' ' + event.statusText }</textarea><br/><br/>
            <h3>response text:</h3><br/>
            <textarea rows="2" cols="100">${event.responseText}</textarea><br/><br/>
            <h3>request url:</h3><br/>
            <textarea rows="4" cols="100">${url}</textarea><br/><br/>
            <h3>request body:</h3><br/>
            <textarea rows="25" cols="100">${body}</textarea><br/><br/>
        </div>`;
            app.el.body.html(h);
        });
    };

    app.fn.showPage = (page, withState = false) => {
        app.pageState.previous = app.pageState.current;
        app.pageState.current = page;
        app.pageState[app.pageState.previous] = app.el.body.clone();
        app.listeners = [];

        const widget = new app.widgetConfig[page].type(app.widgetConfig[page]);

        app.fn.renderWidget(null, app.el.body, widget, withState);

//        setTimeout(() => {
//            $('.icon-radio-on').eq(0).trigger('click');
//            $('html, body').animate({scrollTop: 1500}, 50);
//        }, 2000);
    };

    app.fn.handleSystemEvent = (eventMapId, event, element, ...args) => {
        L(eventMapId, event, element, args);

        let actions = app.eventMap[eventMapId], a;
        let writeSuccess = app.fn.writeData(eventMapId);

        if (writeSuccess && actions) {
            for (a of actions) {
                a.action(a.argument, event, element);
            }
        }
    };

    app.fn.renderWidget = (event, holder, widget, withState = false, withLoader = true) => {
        withLoader && app.loader.start();

        app.listeners = [];

        const refresh = !!event;

        let widgetId, holderHeight = 0;

        holder = holder || $('#' + event.data.options.id);
        widget = widget || new event.data.options.type(event.data.options);

        if (refresh) {
            widgetId = event.data.options.id;
            holderHeight = holder.actual('height');
        }

        holder.empty().off().promise().then(() => {
            widget.render(withState, refresh).then(html => {
                let isHeightUpdated = false, h = $(html), i;

                if (holderHeight > 0) {
                    isHeightUpdated = true;
                    holder.css({opacity: 0, 'min-height': holderHeight});
                }

                holder.html(h.html()).promise().then(() => {
                    if (!holder.hasClass('forcedByEventMap')) {
                        holder.css('display', h.css('display') !== '' ? h.css('display') : 'unset');
                    }

                    if (isHeightUpdated) {
                        holder.css('opacity', 1);
                    }

                    widget.initEvents(withState && refresh);

                    if (!refresh) {
                        for (i of app.listeners) {
                            app.el.body.on(i.eventName, {options: i.options, method: i.method, parameters: i.parameters}, i.handler);
                        }
                        app.el.body.trigger('bodyReady');
                    } else {
                        app.el.body.trigger('rendered.' + widgetId);
                    }

                    app.fn.showToolTipsChanged();

                    withLoader && app.loader.stop();
                });
            });
        });
    };

    app.fn.refreshGridCell = (event, withState = false) => {
        app.listeners = [];

        const refresh = !!event;

        let widgetId, holderHeight = 0;

        let holder = $('#' + event.data.options.id);
        let widget = new event.data.options.type(event.data.options);

        widgetId = event.data.options.id;
        holderHeight = holder.actual('height');

        holder.empty().off().promise().then(() => {
            widget.render(withState, true, false, app.fn.refreshGridCellData).then(html => {
                let isHeightUpdated = false;

                if (holderHeight > 0) {
                    isHeightUpdated = true;
                    holder.css({opacity: 0, 'min-height': holderHeight});
                }

                holder.html($(html).html()).promise().then(() => {
                    if (isHeightUpdated) {
                        holder.css('opacity', 1);
                    }

                    widget.initEvents(withState && refresh);

                    app.el.body.trigger('rendered.' + widgetId);

                    app.fn.showToolTipsChanged();

                });
            });
        });
    };

    app.fn.getZoomButtonsHtml = function (widget) {
        if (!widget.options.zoomable) {
            return '';
        }

        return '<div class="widget-financial-block-buttons"><span class="icon-minimize"><\/span><span id="' + widget.options.id + 'FullScreenBtn" class="icon-full-screen"><\/span><\/div>';
    };

    app.fn.showInFullScreen = (headerName, content) => {
        const s = app.doc.scrollTop();

        app.el.visibleBodyChildren = app.el.body.children().filter(':visible').hide();

        return app.el.body.prepend('<div data-scrolltop="' + s + '" id="widgetFullscreen" class="widget-fullscreen"><header class="small-header"><div class="wrapper"><div class="row"><div class="col"><h1>' + headerName + '<\/h1><\/div><\/div><\/div><span id="fullScreenOffBtn" class="icon-full-screen-off"><\/span><\/header><div id="fullScreenContent" class="widget-fullscreen-content">' + content + '<\/div><\/div>');
    };
})(jQuery, _);