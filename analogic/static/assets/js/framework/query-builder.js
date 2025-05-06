/* global app, El, EventMap, Loader, Auth, FileUpload, Repository, Server, Utils, Widgets, RestRequest */

'use strict';
const QB = {};

QB.loadData = (widgetId, widgetTypeName, useDefaultData = false, loaderFunctionPath = 'init', extraParams = {}) => {
    const executor = LoadExecutorFactory.createExecutor(widgetId, widgetTypeName, useDefaultData, loaderFunctionPath, extraParams);

    try {
        return executor.execute();
    } catch (e) {
        const widgetId = executor.context ? executor.context.getWidgetId() : false,
            functionName = executor.context ? executor.context.getLoaderFunctionName() : false;
        app.handleJsError(e, widgetId, functionName, 'Error in loading data');
    }
};

QB.refreshGridCellData = (argument, type) => {
    let t = argument.split('_');
    return QB.loadData(t[0], type, false, 'refresh_col_' + t[2], {row: t[1], col: t[2]});
};

QB.getUserData = () => {
    let extResponse, ext;

    for (ext in Extensions.authenticationProviders) {
        extResponse = Extensions.authenticationProviders[ext].getUserData();
        if (false !== extResponse) {
            return extResponse;
        }
    }

    if ('NoLogin' === app.authenticationMode) {
        return Auth.getAjaxRequest('activeUser', {}, 'GET').pipe(data => {
            Widgets.activeUser = data.username;
        });
    }

    return Auth.getAjaxRequest(QB.getUrl(app.apiSubPath + 'ActiveUser'), {}, 'GET').pipe(data => {
        Widgets.activeUser = data.Name.replace(/"/g, '\\"');
    });
};

QB.parsingControlFinished = (repositoryId) => {
    El.body.triggerHandler('parsingcontrol.' + repositoryId + '.finished');
    if (Repository[repositoryId] && Repository[repositoryId]['parsingControlFinished']) {
        Repository[repositoryId]['parsingControlFinished']();
    }
};

QB.writeData = (eventMapId, jqueryEvent, jqueryElement, resent = false) => {
    const executor = WriteExecutorFactory.createExecutor(eventMapId, jqueryEvent, jqueryElement);
    if (Utils.isRequestLoggerEnabled()) {
        Utils.generateRequestLoggerGroupId();
    }

    try {
        return executor.execute();
    } catch (e) {
        const widgetId = executor.context ? executor.context.getWidgetId() : false,
            functionName = executor.context ? executor.context.getEventName() : false;
        app.handleJsError(e, widgetId, functionName, 'Error in writing data');
    }
};

QB.obtainNewCellSetIdAndSendAgain = (widgetId, eventMapId) => {
    QB.loadData(widgetId, '', false, 'init').then(d => {
        QB.writeData(eventMapId, {}, {}, true);
    });
};

QB.executeEventMapAction = (eventMapId, context, response) => {
    El.body.triggerHandler(eventMapId);
    let actions = EventMap[eventMapId], a;
    if (actions) {
        for (a of actions) {
            a.action(a.argument, context.getJQueryEvent(), context.getJQueryElement(), response);
        }
    }
};

QB.getServerSideUrlAndBody = (url, body, repositoryId, path) => {
    let params = [], keyAdded = false,
        subUrl = url.includes('?') ? url.indexOf('?') !== (url.length - 1) ? '&server=1' : '' : '?server=1',
        newUrl = url.includes('proxy') ? url : url.includes(app.apiHost) ? url.replace(app.apiHost, 'proxy') : 'proxy' + url,
        isMiddleware = url.includes('middleware')

    for (const [key, value] of Object.entries(body)) {
        if (key === 'longRunningTaskParameters' || isMiddleware) {
            params.push(`"${key}": ${JSON.stringify(value)}`);
        } else {
            params.push(`"${key}": "${value}"`);
        }
        if ('key' === key) {
            keyAdded = true;
        }
    }
    !keyAdded && params.push(`"key" : "${repositoryId + "_" + path}"`);

    if (Utils.isRequestLoggerEnabled()) {
        params.push(`"requestLoggerEnabled" : "true"`);
        subUrl += '&requestLoggerEnabled=true';

        let requestLoggerJourneyId = Utils.getRequestLoggerJourneyId(),
            requestLoggerGroupId = Utils.getRequestLoggerGroupId();

        if (!requestLoggerJourneyId) {
            requestLoggerJourneyId = Utils.generateRequestLoggerJourneyId();
        }

        if (!requestLoggerGroupId) {
            requestLoggerGroupId = Utils.generateRequestLoggerGroupId();
        }

        params.push(`"requestLoggerJourneyId" : "${requestLoggerJourneyId}"`);
        params.push(`"requestLoggerGroupId" : "${requestLoggerGroupId}"`);
        subUrl += '&requestLoggerJourneyId=' + requestLoggerJourneyId;
        subUrl += '&requestLoggerGroupId=' + requestLoggerGroupId;
    }

    if (isMiddleware) {
        newUrl = url;
        subUrl = '';
    }

    return {url: newUrl + subUrl, body: `{${params.join(',')}}`};
};

QB.getUrl = (url, source = '') => {
    const proxyPaths = ['proxy', 'list_images', 'delete_image'];
    const proxy_sub_path = proxyPaths.some(path => url.includes(path)) ? '' : 'proxy';

    if (url.includes('middleware')) {
        return url;
    }

    if (app.apiHost && !url.includes('proxy')) {
        return app.apiHost + url;
    }

    if (app.auth_prov) {
        if (app.auth_prov === 'primary') {
            const instancePrefix = app.instance === 'default' && source ? 'default/' : '';
            const sourcePrefix = source ? `${source}/` : '';
            return `${instancePrefix}${sourcePrefix}${proxy_sub_path}${url}`;
        } else {
            const isUrlNavigation = Utils.isUrlNavigation();
            let path = isUrlNavigation
                ? Utils.getAppSubPathArray()
                : window.location.pathname.split('/').filter(s => s !== '');

            path.pop();
            if (source) path.push(source);
            if (proxy_sub_path) path.push(proxy_sub_path);
            else url = '/' + url;

            const basePath = isUrlNavigation ? path.join('/') : [window.location.origin, ...path].join('/');
            return basePath + url;
        }
    }

    return proxy_sub_path + url;
};
