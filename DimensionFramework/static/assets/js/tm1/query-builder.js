/* global app, El, Loader, Auth, FileUpload, Repository, Utils, WidgetValue */

'use strict';
const QB = {};

QB.loadData = (argument, type, useDefaultData = false, path = 'init') => {
    if (useDefaultData) {
        return Auth.loadDefault(type);
    }

    let conditionPath = path + 'Condition', defaultPath = path + 'Default', r = Repository[argument];

    if (r && r[path]) {
        if (r[conditionPath] && !r[conditionPath](WidgetValue)) {
            if (r[defaultPath]) {
                return QB.loadFromWidgetValue(r[defaultPath]);
            }

            return Auth.loadDefault(type);
        }

        if (Array.isArray(r[path])) {
            return QB.executeMDXs(argument, path);
        }

        return QB.executeMDX(argument, path);
    }

    if (r && r.state) {
        if (r[conditionPath] && !r[conditionPath](WidgetValue)) {
            if (r[defaultPath]) {
                return QB.loadFromWidgetValue(r[defaultPath]);
            }

            return Auth.loadDefault(type);
        }
        if (Array.isArray(r.state)) {
            return QB.loadFromWidgetValues(r.state);
        }

        return QB.loadFromWidgetValue(r.state);
    }

    return $.Deferred().resolve('');
};

QB.refreshGridCellData = (argument, type) => {
    let t = argument.split('_');

    return QB.loadData(t[0], type, 'refresh_col_' + t[2]);
};

QB.loadComment = repositoryId => {
    let r = Repository[repositoryId];

    if (r && r.comment) {
        let p = r.comment;

        return Auth.getTm1AjaxRequest(app.tm1ApiHost + p.url, p.body(WidgetValue), p.type, repositoryId).then(data => {
            r.comment.cellsetId = data.ID;
            let t = r.comment.parsingControl;

            if (t) {
                return QB.processResultAsObject(t.query, data);
            }

            return data;
        });
    }

    return $.Deferred().resolve('');
};

QB.loadFromWidgetValue = arg => {
    if (arg.execute) {
        return $.Deferred().resolve(arg.execute(WidgetValue));
    }

    return $.Deferred().resolve(arg(WidgetValue));//TODO remove, back compatibility
};

QB.loadFromWidgetValues = arg => {
    let p, deffered = [];

    for (p of arg) {
        deffered.push($.Deferred().resolve(p.execute(WidgetValue)));
    }

    return $.when.apply($, deffered).then(function (...results) {
        return results;
    });
};

QB.getUserData = () => {//TODO
    return Auth.getTm1AjaxRequest(app.tm1ApiHost + app.tm1ApiSubPath + 'ActiveUser', {}, 'GET').pipe(data => {
        WidgetValue.activeUser = data.Name.replace(/"/g, '\\"');
    });
};

QB.executeMDXs = (repositoryId, path) => {
    let p, deffered = [], u, isQuery = [], body, c = 1, mm;

    for (p of Repository[repositoryId][path]) {
        u = QB.getUrl(p);
        if (p.execute) {
            deffered.push($.Deferred().resolve(p.execute(WidgetValue)));
            isQuery.push(false);
        } else {
            body = p.body(WidgetValue);

            if (p.server) {
                mm = QB.getServerSideUrlAndBody(u.url, body, repositoryId, path + '_' + c);
                u.url = mm.url;
                body = mm.body;
                ++c;
            }

            deffered.push(Auth.getTm1AjaxRequest(u.url, body, u.type));
            isQuery.push(true);
        }
    }

    return $.when.apply($, deffered).then(function (...results) {
        let r, i = 0, t, d = [], z;

        for (z of results) {
            r = isQuery[i] ? z[0] : z;
            if (r.ID) {
                Repository[repositoryId][path][i].cellsetId = r.ID;
            }

            t = Repository[repositoryId][path][i].parsingControl;

            if (t) {
                if (t.type === 'matrix') {
                    d.push(QB.processResult(t, r));
                } else if (t.type === 'list') {
                    d.push(QB.processResultAsList(t, r));
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

        return d;
    });
};

QB.executeMDX = (repositoryId, path) => {
    let r = Repository[repositoryId], p = r[path];

    if (p.execute) {
        return QB.loadFromWidgetValue(p);
    }

    let u = QB.getUrl(p), body = p.body(WidgetValue);

    if (p.server) {
        let mm = QB.getServerSideUrlAndBody(u.url, body, repositoryId, path);
        u.url = mm.url;
        body = mm.body;
    }

    return Auth.getTm1AjaxRequest(u.url, body, u.type, repositoryId).then((data) => {
        //save cellsetid
        r.cellsetId = data.ID;
        let t = p.parsingControl;

        if (t) {
            if (t.type === 'matrix') {
                return QB.processResult(t, data);
            } else if (t.type === 'list') {
                return QB.processResultAsList(t, data);
            } else {
                return QB.processResultAsObject(t.query, data);
            }
        }

        return data;
    });
};

QB.writeData = eventMapId => {
    let s = eventMapId.split('.'), e = s[0], w = s[1], z = w.split('_'), context = WidgetValue, isGridTable = false, r, g;

    if (e === 'upload') {
        return FileUpload.uploadFile(w, eventMapId, context);
    }

    if (z.length > 2 && z[1] !== 'row') { //gridtable
        r = context[z[0]];

        r.row && delete r.row;
        r.column && delete r.column;

        context[z[0]] = {...r, ...{row: z[1], column: z[2]}, ...context[w]};

        w = z.length > 3 ? z[3] : z[0];
        isGridTable = true;
    }

    r = Repository[w], g = (r || {})[e];

    if (!g) {
        El.body.triggerHandler(eventMapId + '.finished');

        return true;
    }

    if(isGridTable && z.length > 3){
        r.cellsetId = Repository[z[0]].cellsetId;
    }


    if (g.validation) {
        let r = g.validation(WidgetValue);

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
                app.popup.show(r.message);
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
    // let f = r.init, c = f ? Array.isArray(f) ? f[0].cellsetId ? f[0].cellsetId : '' : f.cellsetId ? f.cellsetId : '' : '';
    if (Array.isArray(g)) {
        //todo: implement!!
    }

    if (g.execute) {
        isGridTable ? g.execute(context, z[1], z[2]) : g.execute(context);
        El.body.triggerHandler(eventMapId + '.finished');
    } else {
        let c = r.cellsetId || '', body = isGridTable ? g.body(context, z[1], z[2]) : g.body(context), url = isGridTable ?  g.url({...r, ...{cellsetId: c}}, z[1], z[2]) : g.url({...r, ...{cellsetId: c}});

        if (g.server) {
            let mm = QB.getServerSideUrlAndBody(url, body, w, e);
            url = mm.url;
            body = mm.body;
        }

        Auth.getTm1AjaxRequest(app.tm1ApiHost + url, body, g.type).then(() => {
            El.body.triggerHandler(eventMapId + '.finished');
        });
    }

    if (isGridTable) {
        El.body.triggerHandler(e + '.' + w + '.finished');
    }

    return true;
};

QB.getUrl = p => p.cellsetId && !p.url ? QB.getCellsetUrl(p) : QB.getMDXUrl(p);

QB.getCellsetUrl = p => {
    if (p.query) {
        return {url: app.CellSetUrl(p.cellsetId) + p.query, type: 'GET'};
    }

    return {url: app.defaultCellsetIdQuery(p.cellsetId), type: 'GET'};
};

QB.getServerSideUrlAndBody = (url, body, repositoryId, path) => {
    let params = [], subUrl = url.includes('?') ? url.indexOf('?') !== (url.length - 1) ? '&server=1' : '' : url + '?server=1';
    let newUrl = url.includes('pool') ? url : url.replace(app.tm1ApiHost, app.host + '/' + (app.subpath != '' ? app.subpath + '/' + app.instance : app.instance) + '/pool')

    for (const [key, value] of Object.entries(body)) {
        params.push(`"${key}": "${value}"`);
    }
    params.push(`"key" : "${repositoryId + "_" + path}"`);

    return {url: newUrl + subUrl, body: `{${params.join(',')}}`};
};

QB.getMDXUrl = p => {
    if (p.url) {
        return {url: app.tm1ApiHost + (typeof p.url === 'function' ? p.url(WidgetValue) : p.url), type: p.type ? p.type : 'POST'};
    }

    if (p.query) {
        return {url: app.MDXUrl + p.query, type: p.type ? p.type : 'POST'};
    }

    return {url: app.defaultMDXQuery, type: p.type ? p.type : 'POST'};
};

QB.processResultAsObject = (valueQueries, data) => {
    let result = {}, r, i = 0;

    for (r in valueQueries) {
        result[r] = valueQueries[r](data, i, WidgetValue);
    }

    return result;
};

QB.processResultAsList = (valueQueries, data) => {
    let i, result = [], k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0;

    for (i = 0; i < k; ++i) {
        result[i] = valueQueries.query(data, i);
    }

    return result;
};

QB.processResult = (valueQueries, data) => {
    let i = 0, v, row = [], result = [], k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0, q = valueQueries.length;

    if (k % q !== 0) {
        L('Too many data!!');
        while (k % q !== 0) {
            --k;
        }
    }

    while (i < k) {
        row = [];
        for (v of valueQueries.query) {
            row.push(v(data, i));
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