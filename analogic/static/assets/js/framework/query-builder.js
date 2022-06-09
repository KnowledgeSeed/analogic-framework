/* global app, El, EventMap, Loader, Auth, FileUpload, Repository, Server, Utils, WidgetValue, Pivot, RestRequest */

'use strict';
const QB = {};

QB.loadData = (widgetId, widgetTypeName, useDefaultData = false, loaderFunctionPath = 'init', extraParams = {}) => {
    return LoadExecutorFactory.createExecutor(widgetId, widgetTypeName, useDefaultData, loaderFunctionPath, extraParams).execute();
};

QB.refreshGridCellData = (argument, type) => {
    let t = argument.split('_');
    return QB.loadData(t[0], type, false, 'refresh_col_' + t[2], {row: t[1], col: t[2]});
};

QB.getUserData = () => {
    let extResponse;

    Extensions.authenticationProviders.forEach(ext => {
        extResponse = ext.getUserData();
        if (false !== extResponse) {
            return extResponse;
        }
    });

    return Auth.getAjaxRequest(app.apiHost + app.apiSubPath + 'ActiveUser', {}, 'GET').pipe(data => {
        WidgetValue.activeUser = data.Name.replace(/"/g, '\\"');
    });
};

QB.parsingControlFinished = (repositoryId) => {
    El.body.triggerHandler('parsingcontrol.' + repositoryId + '.finished');
    if (Repository[repositoryId] && Repository[repositoryId]['parsingControlFinished']) {
        Repository[repositoryId]['parsingControlFinished']();
    }
};

QB.writeData = (eventMapId, jqueryEvent, jqueryElement) => {
    return WriteExecutorFactory.createExecutor(eventMapId, jqueryEvent, jqueryElement).execute();
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

QB.getServerSideUrlAndBody = (url, body, repositoryId, path) => { //Todo refactor
    let params = [], keyAdded = false,
        subUrl = url.includes('?') ? url.indexOf('?') !== (url.length - 1) ? '&server=1' : '' : '?server=1',
        instance = app.instance === 'default' ? '' : '/' + app.instance;
    let newUrl = url.includes('proxy') ? url : url.replace(app.apiHost, app.hostname + '/' + (app.reverseProxyPath ? app.reverseProxyPath + instance : instance) + '/proxy');

    for (const [key, value] of Object.entries(body)) {
        params.push(`"${key}": "${value}"`);
        if ('key' === key) {
            keyAdded = true;
        }
    }
    !keyAdded && params.push(`"key" : "${repositoryId + "_" + path}"`);

    return {url: newUrl + subUrl, body: `{${params.join(',')}}`};
};
