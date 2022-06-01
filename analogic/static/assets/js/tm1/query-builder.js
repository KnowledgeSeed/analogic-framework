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
    Extensions.forEach(ext => {
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

QB.getWriteContext = (eventName, widgetId, jqueryEvent, jqueryElement, gridTableInfo=null) => {
    return {
        getId() {
            return widgetId;
        },
        getWidgetId() {
            return widgetId;
        },
        getEventMapId() {
           return this.getEventName() + '.' + this.getId();
        },
        getEventName() {
           return eventName;
        },
        getEventHandler() {
           return (this.getObject() || {})[this.getEventName()];
        },
        getObject() {
            return Repository[widgetId];
        },
        getJQueryEvent() {
            return jqueryEvent;
        },
        getJQueryElement() {
            return jqueryElement;
        },
        getEvent() {
            return jqueryEvent;
        },
        getElement() {
            return jqueryElement;
        },
        getWidgetValue(property = false) {
            return v(this.getId() + (property ? '.' + property : ''));
        },
        getCell() {
            return gridTableInfo !== null ? gridTableInfo.getCell() : null;
        },
        getRow() {
            return gridTableInfo !== null ? gridTableInfo.getRow() : null;
        },
        getColumn() {
            return gridTableInfo !== null ? gridTableInfo.getColumn() : null;
        },
        getGridTableInfo() {
            return gridTableInfo;
        },
        isGridTable() {
            return this.getGridTableInfo() !== null;
        }
    }
};

QB.getGridTableInfo = (cell, row, column) => {
    return {
        getCell() {
            return cell;
        },
        getRow() {
            return row;
        },
        getColumn() {
            return column;
        },
    };
};

QB.validateWrite = (g, isGridTable, newContext, gridTableCell, z, w, e) => {
    if (g.validation) {
        let r = isGridTable ? g.validation(newContext, gridTableCell, v(w + '.' + e), z[1], z[2]) : g.validation(newContext);

        if (!r.success) {
            if (r.widget) {
                let input = $('#' + r.widget).find('.ks-textbox-field');

                if (input.hasClass('input-error')) {
                    return false;
                }

                if (input) {
                    input.addClass('input-error');
                }

                let secondary = $('#' + r.widget).find('.ks-textbox-title-secondary');
                secondary.html(r.message);
            } else {
                if (r.message) {
                    app.popup.show(r.message);
                }
            }

            return false;
        } else {
            let input = $('#' + w).find('.ks-textbox-field');

            if (input) {
                input.removeClass('input-error');
            }

            $('#' + w).find('.ks-textbox-title-secondary').html('');
        }
    }
    return true;
};

QB.writeData2 = (eventMapId, jqueryEvent, jqueryElement) => {
    let s = eventMapId.split('.'), eventName = s[0], widgetId = s[1], z = widgetId.split('_'),
    repositoryObject, eventObject, newContext;

    if (eventName === 'upload') {
        return FileUpload.uploadFile(widgetId, eventMapId, WidgetValue);
    }

    if (z.length > 2 && z[1] !== 'row') { //gridtable
        return QB.writeGridTableData(z, eventName, eventMapId, jqueryEvent, jqueryElement);
    }

    repositoryObject = Repository[widgetId], eventObject = (repositoryObject || {})[eventName];

    if (!eventObject) {
        QB.executeEventMapAction(eventMapId + '.finished', jqueryEvent, jqueryElement);
        return true;
    }

    newContext = {...QB.getWriteContext(widgetId, repositoryObject, jqueryEvent, jqueryElement, null), ...WidgetValue};


};

QB.writeGridTableData = (z, eventName, eventMapId, jqueryEvent, jqueryElement) => {
    let gridTableCell, gridTableInfo, r, context = WidgetValue, widgetId, repositoryObject, eventObject, newContext;

    r = context[z[0]];

    r.row && delete r.row;
    r.column && delete r.column;

    context[z[0]] = {...r, ...{row: z[1], column: z[2]}, ...context[w]};

    gridTableCell = v(z[0] + '.cellData')[z[1]][z[2]];

    gridTableInfo = QB.getGridTableInfo(gridTableCell, parseInt(z[1]), parseInt(z[2]));

    widgetId = z.length > 3 ? z[3] : z[0];

    repositoryObject = Repository[widgetId], eventObject = (repositoryObject || {})[eventName];

    if (!eventObject) {
        QB.executeEventMapAction(eventMapId + '.finished', jqueryEvent, jqueryElement);
        return true;
    }

    newContext = {...QB.getWriteContext(widgetId, repositoryObject, jqueryEvent, jqueryElement, gridTableInfo), ...context};

    if (z.length > 3) {
        repositoryObject.cellsetId = Repository[z[0]].cellsetId;
    }

    if (!QB.validateWrite(eventObject, true, newContext, gridTableCell, z, widgetId, eventName)) {
        return false;
    }

    if (eventObject.execute) {
        eventObject.execute(newContext, gridTableCell, v(widgetId + '.' + eventName), z[1], z[2], jqueryEvent, jqueryElement);
        QB.executeEventMapAction(eventName + '.' + widgetId + '.finished', jqueryEvent, jqueryElement, {});
        QB.writeExecuteFinished(eventMapId, newContext, repositoryObject, jqueryEvent, jqueryElement);
        return;
    }

};

QB.writeExecuteFinished = (eventMapId, newContext, repositoryObject, jqueryEvent, jqueryElement) => {
    QB.executeEventMapAction(eventMapId + '.finished', jqueryEvent, jqueryElement, {});
    if (repositoryObject.callback) {
        repositoryObject.callback({
            ...{
                getResponse() {
                    return '';
                }, ...newContext
            }
        });
    }
};

QB.writeData = (eventMapId, jqueryEvent, jqueryElement) => {
    return WriteExecutorFactory.createExecutor(eventMapId, jqueryEvent, jqueryElement).execute();
};

QB.writeDataOld = (eventMapId, event, element) => {
    let s = eventMapId.split('.'), e = s[0], w = s[1], z = w.split('_'), context = WidgetValue, isGridTable = false, r,
        g, newContext, gridTableCell, gridTableInfo = QB.getGridTableInfo({}, false, false);

    if (e === 'upload') {
        return FileUpload.uploadFile(w, eventMapId, context);
    }


    if (z.length > 2 && z[1] !== 'row') { //gridtable
        r = context[z[0]];

        r.row && delete r.row;
        r.column && delete r.column;

        context[z[0]] = {...r, ...{row: z[1], column: z[2]}, ...context[w]};

        gridTableCell = v(z[0] + '.cellData')[z[1]][z[2]];

        gridTableInfo = QB.getGridTableInfo(gridTableCell, parseInt(z[1]), parseInt(z[2]));

        w = z.length > 3 ? z[3] : z[0];
        isGridTable = true;
    }

    r = Repository[w], g = (r || {})[e];

    newContext = {...QB.getWriteContext(w, r, event, element, gridTableInfo), ...context}; //sample context implementation to avoid many parameters

    if (!g) {
        QB.executeEventMapAction(eventMapId + '.finished', event, element);
        return true;
    }

    if (isGridTable && z.length > 3) {
        r.cellsetId = Repository[z[0]].cellsetId;
    }

    if (!QB.validateWrite(g, isGridTable, newContext, gridTableCell, z, w, e)) {
        return false;
    }

    // let f = r.init, c = f ? Array.isArray(f) ? f[0].cellsetId ? f[0].cellsetId : '' : f.cellsetId ? f.cellsetId : '' : '';
    if (Array.isArray(g)) {
        //todo: implement!!
    }

    if (g.execute) {
        isGridTable ? g.execute(newContext, gridTableCell, v(w + '.' + e), z[1], z[2], event, element) : g.execute(newContext, event, element);
        QB.executeEventMapAction(eventMapId + '.finished', event, element, {});
        if (isGridTable) {
            QB.executeEventMapAction(e + '.' + w + '.finished', event, element, {});
        }
        if (g.callback) {
            g.callback({
                ...{
                    getResponse() {
                        return '';
                    }, ...newContext
                }
            });
        }
    } else {
        if (g.download && (typeof g.download === 'function')) {
            return Server.download(g.download(context));
        }
        let c = r.cellsetId || '',
            body = isGridTable ? g.body(newContext, gridTableCell, v(w + '.' + e), z[1], z[2], event, element) : g.body(newContext, event, element),
            url = isGridTable ? g.url({...r, ...{cellsetId: c}}, gridTableCell, v(w + '.' + e), z[1], z[2]) : g.url({...r, ...{cellsetId: c}});

        if (g.server) {
            let mm = QB.getServerSideUrlAndBody(url, body, w, e);
            url = mm.url;
            body = mm.body;
        }


        let type;
        if (typeof g.type === 'function') {
            type = isGridTable ? g.type(newContext, gridTableCell, v(w + '.' + e), z[1], z[2]) : g.type(newContext);
        } else {
            type = g.type;
        }
        Loader.start(true);
        Auth.getTm1AjaxRequest(app.tm1ApiHost + url, body, type, w).then((d) => {
            Loader.stop(true);
            L('finished after ajax');
            QB.executeEventMapAction(eventMapId + '.finished', event, element, d);
            if (isGridTable) {
                QB.executeEventMapAction(e + '.' + w + '.finished', event, element, {});
            }
            if (g.callback) {
                g.callback({
                    ...{
                        getResponse() {
                            return d;
                        }, ...newContext
                    }
                });
            }
        });
    }


    return true;
};

QB.executeEventMapAction = (eventMapId, context, response) => {
    L(eventMapId);
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