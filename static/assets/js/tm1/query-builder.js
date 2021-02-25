/* global app */

'use strict';
app.fn.loadData = (argument, type, useDefaultData = false, path = 'init') => {
    if (useDefaultData) {
        return app.fn.loadDefault(type);
    }
    let conditionPath = path + 'Condition', defaultPath = path + 'Default';
    if (app.repository[argument] && app.repository[argument][path]) {
        if (app.repository[argument][conditionPath] && !app.repository[argument][conditionPath](app.widgetValue)) {
            if (app.repository[argument][defaultPath]) {
                return app.fn.loadFromWidgetValue(app.repository[argument][defaultPath]);
            }
            return app.fn.loadDefault(type);
        }
        if (Array.isArray(app.repository[argument][path])) {
            return app.fn.executeMDXs(argument, path);
        }
        return app.fn.executeMDX(argument, path);
    }
    //TODO remove, back compatibility
    if (app.repository[argument] && app.repository[argument].state) {
        if (Array.isArray(app.repository[argument].state)) {
            return app.fn.loadFromWidgetValues(app.repository[argument].state);
        }
        return app.fn.loadFromWidgetValue(app.repository[argument].state);
    }
    return $.Deferred().resolve('');
};

app.fn.refreshGridCellData = (argument, type) => {
    let t = argument.split('_');
    return app.fn.loadData(t[0], type, 'refresh_col_' + t[2]);
};


app.fn.loadComment = (repositoryId) => {
    if (app.repository[repositoryId] && app.repository[repositoryId].comment) {
        let p = app.repository[repositoryId].comment;
        return app.fn.getTm1AjaxRequest(app.tm1ApiHost + p.url, p.body(app.widgetValue), p.type, repositoryId).then((data) => {
            app.repository[repositoryId].comment.cellsetId = data.ID;
            let t = app.repository[repositoryId].comment.parsingControl;
            if (t) {
                return app.fn.processResultAsObject(t.query, data);
            }
            return data;
        });
    }
    return $.Deferred().resolve('');
};

app.fn.loadDefault = (argument) => {
    return $.ajax({
        url: 'assets/js/configs/default/' + argument + '.json',
        dataType: 'json',
        cache: false
    });
};


app.fn.loadFromWidgetValue = (argument) => {
    if (argument.execute) {
        return $.Deferred().resolve(argument.execute(app.widgetValue));
    }
    return $.Deferred().resolve(argument(app.widgetValue));//TODO remove, back compatibility
};

app.fn.loadFromWidgetValues = (argument) => {
    let p, deffered = [];
    for (p of argument) {
        deffered.push($.Deferred().resolve(p.execute(app.widgetValue)));
    }
    return $.when.apply($, deffered).then(function (...results) {
        return results;
    });
};

app.fn.getUserData = () => {//TODO
    return app.fn.getTm1AjaxRequest(app.tm1ApiHost + app.tm1ApiSubPath + 'ActiveUser', {}, 'GET').pipe((data) => {
        app.user.camName = data.Name;
        app.widgetValue['activeUser'] = data.Name.replace(/"/g, '\\"');
    });
};

app.fn.executeMDXs = (repositoryId, path) => {
    let p, deffered = [], u, isQuery = [], body, c = 1;
    for (p of app.repository[repositoryId][path]) {
        u = app.fn.getUrl(p);
        if (p.execute) {
            deffered.push($.Deferred().resolve(p.execute(app.widgetValue)));
            isQuery.push(false);
        } else {
            body = p.body(app.widgetValue);
            if (p.server) {
                let mm = app.fn.getServerSideUrlAndBody(u.url, body, repositoryId, path + '_' + c);
                u.url = mm.url;
                body = mm.body;
                ++c;
            }
            deffered.push(app.fn.getTm1AjaxRequest(u.url, body, u.type));
            isQuery.push(true);
        }
    }
    return $.when.apply($, deffered).then(function (...results) {
        let r, i = 0, t, d = [], z;
        for (z of results) {
            r = isQuery[i] ? z[0] : z;
            if (r['ID']) {
                app.repository[repositoryId][path][i].cellsetId = r.ID;
            }
            t = app.repository[repositoryId][path][i].parsingControl;
            if (t) {
                if (t.type === 'matrix') {
                    d.push(app.fn.processResult(t, r));
                } else if (t.type === 'list') {
                    d.push(app.fn.processResultAsList(t, r));
                } else {
                    d.push(app.fn.processResultAsObject(t.query, r));
                }
            } else {
                d.push(r);
            }
            ++i;
        }
        if (app.repository[repositoryId].mergeInitResults) {
            return app.fn.mergeResults(d[0], d[1]);
        }
        return d;
    });

};


app.fn.executeMDX = (repositoryId, path) => {
    if (app.repository[repositoryId][path].execute) {
        return app.fn.loadFromWidgetValue(app.repository[repositoryId][path]);
    }
    let p = app.repository[repositoryId][path], u = app.fn.getUrl(p), body = p.body(app.widgetValue);
    if (p.server) {
        let mm = app.fn.getServerSideUrlAndBody(u.url, body, repositoryId, path);
        u.url = mm.url;
        body = mm.body;
    }
    return app.fn.getTm1AjaxRequest(u.url, body, u.type, repositoryId).then((data) => {
        //save cellsetid
        app.repository[repositoryId].cellsetId = data.ID;
        let t = app.repository[repositoryId][path].parsingControl;
        if (t) {
            if (t.type === 'matrix') {
                return app.fn.processResult(t, data);
            } else if (t.type === 'list') {
                return app.fn.processResultAsList(t, data);
            } else {
                return app.fn.processResultAsObject(t.query, data);
            }
        }
        return data;
    });
};

app.fn.uploadFile = (w, eventMapId, context) => {
    const e = 'upload';
    let path = false, uploadParams = {}, uploadRepoExist = app.repository[w] && app.repository[w][e], isTarget = true, subFolder = '';

    if (uploadRepoExist) {
        uploadParams = app.repository[w][e](context);
        if (uploadParams['path']) {
            path = uploadParams['path'];
            if(app.repository[w]['move']){
                isTarget = false;
            }
        }
    }

    if (path === false && app.widgetValue[w]['target']) {
        path = app.widgetValue[w]['target'];
    }

    if (path === false && app.widgetValue[w]['staging']) {
        path = app.widgetValue[w]['staging'];
        isTarget = false;
    }

    if (path === false) {
        app.fn.showPopup('Please provide unc path for uploading!');
        app.el.body.triggerHandler(eventMapId + '.pathError');
        return false;
    }

    if (uploadRepoExist) {
        for (const [key, value] of Object.entries(uploadParams)) {
            if (key !== 'path') {
                app.widgetValue[w]['form'].append(key, value);
            }
        }
    }
    app.widgetValue[w]['form'].append('path', path);
    app.widgetValue[w]['form'].append('mode', 'upload');
    subFolder = isTarget ? '' : app.utils.create_UUID();
    app.widgetValue[w]['form'].append('subFolder', subFolder);
    app.widgetValue[w]['subFolder'] = subFolder;
    app.widgetValue[w]['moveSource'] = path;


    app.loader.start();
    app.fn.fileUploadToServer(w)
            .done(d => {
                if (d === 'ok') {
                    app.el.body.triggerHandler(eventMapId + '.finished');
                    app.widgetValue[w].form = new FormData();
                    app.fn.preProcessUploadedFile(w);
                } else {
                    app.fn.showPopup(d);
                }
            }).fail(() => {
        app.el.body.triggerHandler(eventMapId + '.failed');
        app.fn.showPopup('Upload failed');
    }).always(() => {
        app.widgetValue[w].form = new FormData();
        app.loader.stop();
    });
    return true;
};

app.fn.preProcessUploadedFile = (w) => {
    let eventMapId = 'preProcessing.' + w;
    $('#' + w).find('.progress-bar').html('Preprocessing...');
    app.el.body.on(eventMapId + '.finished', {}, function () {
        $('#' + w).find('.progress-bar').html('Preprocessing finished');
        app.fn.moveUploadedFile(w);
        app.el.body.off(eventMapId + '.finished');
    });
    app.fn.writeData(eventMapId);
};

app.fn.moveUploadedFile = (w) => {
    const e = 'move', eventMapId = e + '.' + w;
    let path = false, uploadParams = {}, moveRepoExist = app.repository[w] && app.repository[w][e], subFolder = app.widgetValue[w]['subFolder'];

    if (moveRepoExist) {
        uploadParams = app.repository[w][e](app.widgetValue);
        if (uploadParams['path']) {
            path = uploadParams['path'];
        }
    }

    if (path === false && app.widgetValue[w]['target']) {
        path = app.widgetValue[w]['target'];
    }

    if (path === false) {
        app.fn.postProcessUploadedFile(w);
        app.fn.showPopup(app.widgetValue[w].uploadSuccessMessage);
        app.widgetValue[w].form = new FormData();
      //  $('#' + w).find('.progress-bar').html('');
    } else {
        $('#' + w).find('.progress-bar').html('Postprocessing...');
        app.widgetValue[w]['form'].append('source', app.widgetValue[w]["moveSource"]);
        app.widgetValue[w]['form'].append('path', path);
        app.widgetValue[w]['form'].append('mode', 'move');
        app.widgetValue[w]['form'].append('subFolder', subFolder);

        app.loader.start();
        app.fn.fileUploadToServer(w)
                .done(d => {
                    if (d === 'ok') {
                        app.el.body.triggerHandler(eventMapId + '.finished');
                        app.fn.showPopup(app.widgetValue[w].uploadSuccessMessage);
                    } else {
                        app.el.body.triggerHandler(eventMapId + '.failed');
                        app.fn.showPopup(d);
                    }
                }).fail(() => {
                    app.el.body.triggerHandler(eventMapId + '.failed');
                    app.fn.showPopup('Moving file(s) failed');
        }).always(() => {
            app.widgetValue[w].form = new FormData();
            //$('#' + w).find('.progress-bar').html('');
            app.loader.stop();
        });
    }
};

app.fn.postProcessUploadedFile = (w) => {
    let eventMapId = 'postProcessing.' + w;
    $('#' + w).find('.progress-bar').html('Postprocessing...');   
    app.el.body.on(eventMapId + '.finished', {}, function () {
        $('#' + w).find('.progress-bar').html('Postprocessing finished');
        app.el.body.off(eventMapId + '.finished');
    });
    app.fn.writeData(eventMapId);
};

app.fn.writeData = (eventMapId) => {
    let s = eventMapId.split('.'), e = s[0], w = s[1], z = w.split('_'), context = app.widgetValue, isGridTable = false;
    if (e === 'upload') {
        return app.fn.uploadFile(w, eventMapId, context);
    }
    if (z.length > 2 && z[1] !== 'row') { //gridtable
        context[z[0]].row && delete context[z[0]].row;
        context[z[0]].column && delete context[z[0]].column;
        context[z[0]] = {...context[z[0]], ...{row: z[1], column: z[2]}, ...context[w]};
        w = z[0];
        isGridTable = true;
    }
    if (app.repository[w] && app.repository[w][e]) {
        if (app.repository[w][e].validation) {
            let r = app.repository[w][e].validation(app.widgetValue);
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
        // let f = app.repository[w].init, c = f ? Array.isArray(f) ? f[0].cellsetId ? f[0].cellsetId : '' : f.cellsetId ? f.cellsetId : '' : '', p = app.repository[w][e];
        if (Array.isArray(app.repository[w][e])) {
            //todo: implement!!
        }
        if (app.repository[w][e].execute) {
            app.repository[w][e].execute(context);
            app.el.body.triggerHandler(eventMapId + '.finished');
        } else {
            let f = app.repository[w], c = f ? f.cellsetId ? f.cellsetId : '' : '', p = app.repository[w][e], body = p.body(context), url = p.url({...f, ...{cellsetId: c}});
            if (p.server) {
                let mm = app.fn.getServerSideUrlAndBody(url, body, w, e);
                url = mm.url;
                body = mm.body;
            }
            app.fn.getTm1AjaxRequest(app.tm1ApiHost + url, body, p.type).then(() => {
                app.el.body.triggerHandler(eventMapId + '.finished');
            });
        }
        if (isGridTable) {
            app.el.body.triggerHandler(e + '.' + w + '.finished');
        }
    } else {
        app.el.body.triggerHandler(eventMapId + '.finished');
    }
    return true;
};

app.fn.getUrl = (p) => {
    return p.cellsetId && !p.url ? app.fn.getCellsetUrl(p) : app.fn.getMDXUrl(p);
};

app.fn.getCellsetUrl = (p) => {
    if (p.query) {
        return {url: app.CellSetUrl(p.cellsetId) + p.query, type: 'GET'};
    }
    return {url: app.defaultCellsetIdQuery(p.cellsetId), type: 'GET'};
};

app.fn.getServerSideUrlAndBody = (url, body, repositoryId, path) => {
    let params = [], subUrl = '';
    subUrl += url.includes('?') ? url.indexOf('?') !== (url.length - 1) ? '&' : '' : url + '?';
    subUrl += 'server=1';

    for (const [key, value] of Object.entries(body)) {
        params.push(`"${key}": "${value}"`);
    }
    params.push(`"key" : "${repositoryId + "_" + path}"`);
    return {url: url + subUrl, body: `{${params.join(',')}}`};
};

app.fn.getMDXUrl = (p) => {
    if (p.url) {
        return {url: app.tm1ApiHost + (typeof p.url === 'function' ? p.url(app.widgetValue) : p.url), type: p.type ? p.type : 'POST'};
    }
    if (p.query) {
        return {url: app.MDXUrl + p.query, type: p.type ? p.type : 'POST'};
    }
    return {url: app.defaultMDXQuery, type: p.type ? p.type : 'POST'};
};

app.fn.processResultAsObject = (valueQueries, data) => {
    let result = {}, r, i = 0;
    for (r in valueQueries) {
        result[r] = valueQueries[r](data, i, app.widgetValue);
    }
    return result;
};

app.fn.processResultAsList = (valueQueries, data) => {
    let i = 0, result = [], k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0;
    while (i < k) {
        result.push(valueQueries.query(data, i));
        i = i + 1;
    }
    return result;
};

app.fn.processResult = (valueQueries, data) => {
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

app.fn.mergeResults = (result1, result2) => {
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


