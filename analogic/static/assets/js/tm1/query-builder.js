/* global app, El, EventMap, Loader, Auth, FileUpload, Repository, Server, Utils, WidgetValue, Pivot, RestRequest */

'use strict';
const QB = {};

QB.loadData = (argument, type, useDefaultData = false, path = 'init', extraParams = {}) => {
    if (useDefaultData) {
        return Auth.loadDefault(type);
    }

    let conditionPath = path + 'Condition', defaultPath = path + 'Default', r = Repository[argument], newContext;
    if (r && r.reference) {
        r = Repository[r.reference];
    }
    newContext = QB.getExecuteContext(argument, r, extraParams);

    if (r && r[path]) {
        if (r[conditionPath] && !r[conditionPath](newContext, argument)) {
            if (r[defaultPath]) {
                return QB.loadFromWidgetValue(r[defaultPath], argument, {}, newContext);
            }

            return Auth.loadDefault(type);
        }

        if (r[path].pivot) {
            return Pivot.call(r[path]).then(d => d);
        }

        if (Array.isArray(r[path])) {
            return QB.executeMDXs(argument, path);
        }

        return QB.executeMDX(argument, path, extraParams);
    }

    if (r && r.state) { //Todo remove, backward compatibility
        if (r[conditionPath] && !r[conditionPath](WidgetValue)) {
            if (r[defaultPath]) {
                return QB.loadFromWidgetValue(r[defaultPath], argument);
            }

            return Auth.loadDefault(type);
        }
        if (Array.isArray(r.state)) {
            return QB.loadFromWidgetValues(r.state, argument);
        }

        return QB.loadFromWidgetValue(r.state, argument);
    }

    return $.Deferred().resolve('');
};

QB.refreshGridCellData = (argument, type) => {
    let t = argument.split('_');
    return QB.loadData(t[0], type, false, 'refresh_col_' + t[2], {row: t[1], col: t[2]});
};

QB.loadFromWidgetValue = (arg, repositoryId, extraParams = {}, newContext = false) => {
    return $.Deferred().resolve(arg(newContext ? newContext : WidgetValue, repositoryId));//TODO keep newContext argument if possible
};

QB.loadFromWidgetValues = (arg, repositoryId) => {
    let p, deffered = [];

    for (p of arg) {
        deffered.push($.Deferred().resolve(p.execute(WidgetValue, repositoryId)));
    }

    return $.when.apply($, deffered).then(function (...results) {
        return results;
    });
};

QB.getUserData = () => {
    let extResponse;
    Extensions.authenticationProviders.forEach(ext => {
        extResponse = ext.getUserData();
        if (false !== extResponse) {
            return extResponse;
        }
    });
    return Auth.getTm1AjaxRequest(app.tm1ApiHost + app.tm1ApiSubPath + 'ActiveUser', {}, 'GET').pipe(data => {
        WidgetValue.activeUser = data.Name.replace(/"/g, '\\"');
    });
};

QB.executeMDXs = (repositoryId, path) => {//Todo implement new context
    let p, deffered = [], u, isQuery = [], body, c = 1, mm, callExecute = true;

    for (p of Repository[repositoryId][path]) {
        u = QB.getUrl(p);
        if (p.body && p.execute && p.callExecute) {
            callExecute = p.callExecute(WidgetValue, repositoryId, Repository[repositoryId]);
        }

        if (p.execute && callExecute) {
            deffered.push($.Deferred().resolve(p.execute(WidgetValue, repositoryId, Repository[repositoryId])));
            isQuery.push(false);
            ++c;
        } else if (p.pivot) {
            deffered.push(Pivot.call(p));
            isQuery.push(true);
        } else {
            body = p.body(WidgetValue, repositoryId, Repository[repositoryId]);

            if (p.server) {
                mm = QB.getServerSideUrlAndBody(u.url, body, repositoryId, path + '_' + c);
                u.url = mm.url;
                body = mm.body;
                ++c;
            }

            deffered.push(Auth.getTm1AjaxRequest(u.url, body, u.type, repositoryId));
            isQuery.push(true);
        }
    }

    return $.when.apply($, deffered).then(function (...results) {
        let r, i = 0, t, d = [], z, parsingControlResult;

        if (Repository[repositoryId].commonParsingControl) {
            if (Repository[repositoryId].mainQueryIndex) {
                r = isQuery[Repository[repositoryId].mainQueryIndex] ? z[0] : z;
                if (r.ID) {
                    Repository[repositoryId][path][Repository[repositoryId].mainQueryIndex].cellsetId = r.ID;
                }
            }
            for (z of results) {
                d.push(isQuery[i] ? z[0] : z);
                ++i;
            }
            parsingControlResult = Repository[repositoryId].commonParsingControl(d, repositoryId, Repository[repositoryId]);
            QB.parsingControlFinished(repositoryId);
            return parsingControlResult;
        }

        for (z of results) {
            r = isQuery[i] ? z[0] : z;
            if (r.ID) {
                Repository[repositoryId][path][i].cellsetId = r.ID;
            }

            t = (typeof Repository[repositoryId][path][i].parsingControl === 'function') ? Repository[repositoryId][path][i].parsingControl(r, repositoryId, Repository[repositoryId]) : Repository[repositoryId][path][i].parsingControl;

            if (t) {
                if (t.type === 'matrix') {
                    d.push(QB.processResult(t, r));
                } else if (t.type === 'list') {
                    d.push(QB.processResultAsList(t, r));
                } else if (t.type === 'script') {
                    d.push(t.script(r, repositoryId, Repository[repositoryId]));
                } else {
                    d.push(QB.processResultAsObject(t.query, r));
                }
            } else {
                d.push(r);
            }

            ++i;
        }

        if (Repository[repositoryId].mergeInitResults) {
            return QB.mergeResults(d[0], d[1]);
        }
        QB.parsingControlFinished(repositoryId);
        return d;
    });
};

QB.parsingControlFinished = (repositoryId) => {
    El.body.triggerHandler('parsingcontrol.' + repositoryId + '.finished');
    if (Repository[repositoryId] && Repository[repositoryId]['parsingControlFinished']) {
        Repository[repositoryId]['parsingControlFinished']();
    }
};

QB.getExecuteContext = (id, repositoryObject, extraParams, loaderFunction = false) => {
    let o = {
        getId() {
            return id;
        },
        getObject() {
            return repositoryObject;
        },
        getExtraParams() {
            return extraParams;
        },
        getLoaderFunction() {
            return loaderFunction;
        }
    };
    return {...o, ...WidgetValue}
};

QB.executeMDX = (repositoryId, path, extraParams = {}) => {
    let r = Repository[repositoryId], p = r[path], parsingControlResult, newContext,
        calculatedRepositoryId = repositoryId;

    if (r.reference) {
        calculatedRepositoryId = r.reference;
        r = Repository[r.reference];
        p = r[path];
    }

    newContext = QB.getExecuteContext(repositoryId, r, extraParams, p);

    if (p && (p.execute || (typeof p === 'function'))) {
        parsingControlResult = typeof p === 'function' ?
            Repository[calculatedRepositoryId][path](newContext, repositoryId, extraParams, Repository[repositoryId]) : // Todo remove parameters except newContext if possible
            p.execute(newContext, repositoryId, extraParams, Repository[repositoryId]); // Todo remove parameters except newContext if possible
        if (!(parsingControlResult instanceof RestRequest)) {
            QB.parsingControlFinished(newContext);
            return $.Deferred().resolve(parsingControlResult);
        }
        p = parsingControlResult.getDescription();
    }


    let u = QB.getUrl(p), body = p.body(newContext, repositoryId, r); // Todo remove parameters except newContext if possible

    if (p.server) {//Todo ref!
        let mm = QB.getServerSideUrlAndBody(u.url, body, repositoryId, path);
        u.url = mm.url;
        body = mm.body;
    }
    return Auth.getTm1AjaxRequest(u.url, body, u.type, repositoryId).then((data) => {
        //save cellsetid
        r.cellsetId = data.ID;
        let t = (typeof p.parsingControl === 'function') ? p.parsingControl(newContext, repositoryId, r) : p.parsingControl; // Todo remove parameters except newContext if possible

        if (t) {
            if (t.type === 'matrix') {
                parsingControlResult = QB.processResult(t, data, newContext);
            } else if (t.type === 'list') {
                parsingControlResult = QB.processResultAsList(t, data, newContext);
            } else if (t.type === 'script') {
                parsingControlResult = t.script(data, repositoryId, r, newContext); // Todo remove parameters except newContext and data if possible
            } else {
                parsingControlResult = QB.processResultAsObject(t.query, data, newContext);
            }
            QB.parsingControlFinished(newContext);
            return parsingControlResult;
        }
        QB.parsingControlFinished(newContext);
        return data;
    });
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

QB.getUrl = p => p.cellsetId && !p.url ? QB.getCellsetUrl(p) : QB.getMDXUrl(p);

QB.getCellsetUrl = p => {
    if (p.query) {
        return {url: app.CellSetUrl(p.cellsetId) + p.query, type: 'GET'};
    }

    return {url: app.defaultCellsetIdQuery(p.cellsetId), type: 'GET'};
};

QB.getServerSideUrlAndBody = (url, body, repositoryId, path) => {
    let params = [], keyAdded = false,
        subUrl = url.includes('?') ? url.indexOf('?') !== (url.length - 1) ? '&server=1' : '' : '?server=1',
        instance = app.instance === 'default' ? '' : '/' + app.instance;
    let newUrl = url.includes('proxy') ? url : url.replace(app.tm1ApiHost, app.hostname + '/' + (app.reverseProxyPath ? app.reverseProxyPath + instance : instance) + '/proxy');

    for (const [key, value] of Object.entries(body)) {
        params.push(`"${key}": "${value}"`);
        if ('key' === key) {
            keyAdded = true;
        }
    }
    !keyAdded && params.push(`"key" : "${repositoryId + "_" + path}"`);

    return {url: newUrl + subUrl, body: `{${params.join(',')}}`};
};

QB.getMDXUrl = p => {
    if (p.url) {
        return {
            url: app.tm1ApiHost + (typeof p.url === 'function' ? p.url(WidgetValue) : p.url),
            type: p.type ? p.type : 'POST'
        };
    }

    L('error: url not found', p);

    return {url: '', type: p.type ? p.type : 'POST'};
};

QB.processResultAsObject = (valueQueries, data, newContext = false) => {
    let result = {}, r, i = 0;

    for (r in valueQueries) {
        result[r] = valueQueries[r](data, i, newContext ? newContext : WidgetValue); //Todo keep just newContext if possible
    }

    return result;
};

QB.processResultAsList = (valueQueries, data, newContext = {}) => {
    let i, result = [],
        k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0;

    for (i = 0; i < k; ++i) {
        result[i] = valueQueries.query(data, i, newContext);
    }

    return result;
};

QB.processResult = (valueQueries, data, newContext = {}) => {
    let i = 0, v, row = [], result = [],
        k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0,
        q = valueQueries.length;

    if (k % q !== 0) {
        L('Too many data!!');
        while (k % q !== 0) {
            --k;
        }
    }

    while (i < k) {
        row = [];
        for (v of valueQueries.query) {
            row.push(v(data, i, newContext));
        }
        i = i + valueQueries.length;
        result.push(row);
    }

    return result;
};

QB.mergeResults = (result1, result2) => {
    let m = [], z, n, y = [];

    for (z = 0; z < result1.length; ++z) {
        y = [];

        for (n = 0; n < result1[z].length; ++n) {
            y.push({...result1[z][n], ...result2[z][n]});
        }

        m.push(y);
    }

    return m;
};