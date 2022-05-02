/* global app, Listeners, QB, Widget */

'use strict';

class GridTableWidget extends Widget {

    getHtml(widgets, headerRowWidgetHtml, data) {
        const o = this.options;
        let d = Array.isArray(data) ? data : data.content;
        const v = this.getParameters(data);


        let mainDivStyle = this.getGeneralStyles(data);
        if (v.hideIfNoData === true && (!d || d.length === 0)) {
            mainDivStyle.push('display:none;');
        }

        let r = [], c = [], tb, th, j = 0,
            col = o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget').length, hw = '';

        if (o.errorMessage !== '') {
            return `<div><h3 style="color:red;">${o.errorMessage}</h3></div>`;
        }

        this.state['col'] = col;

        if (v.maxRows) {
            let page = this.state.page ? this.state.page : 1;
            let maxRows = v.maxRows * col;
            let start = (page - 1) * maxRows, end = page * maxRows;
            this.state['widgets'] = widgets;
            this.state['headerRowWidgetHtml'] = headerRowWidgetHtml;
            //   this.state['d'] = d;
            this.state['maxRows'] = v.maxRows;
            while (start < widgets.length && start < end) {
                r.push(this.buildTableRowHtml(widgets.slice(start, start + col).join(''), v.rowHeight, v.borderBottom));
                start = start + col;
            }
        } else {
            while (j < widgets.length) {
                r.push(this.buildTableRowHtml(widgets.slice(j, j + col).join(''), v.rowHeight, v.borderBottom));
                j = j + col;
            }
        }


        tb = this.buildTableBodyHtml(r.join(''));

        r = [];

        if (headerRowWidgetHtml) {
            th = this.buildTableHeadHtml(headerRowWidgetHtml);
        } else {
            for (let w of o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget')) {
                hw = '';
                if (w.title) {
                    hw = w.title.split('|').map(e => '<div>' + e + '</div>').join('');
                }
                c.push(this.buildTableHeaderCellHtml(hw, w.width, w.borderLeft, w.borderRight, w.headerAlignment ? w.headerAlignment : w.alignment));
            }

            th = this.buildTableHeadHtml(this.buildTableHeaderRowHtml(c.join(''), v.rowHeight, v.borderTop, v.borderBottom));
        }
        return this.getWidgetHtml(this.buildTableHtml([th, tb].join(''), v.skin), o.title, mainDivStyle);
    }

    getParameters(data) {
        return {
            allowFullContentUpdated: this.getRealValue('allowFullContentUpdated', data, false),
            borderBottom: this.getRealValue('borderBottom', data, true),
            borderTop: this.getRealValue('borderTop', data, true),
            hideIfNoData: this.getRealValue('hideIfNoData', data, false),
            maxRows: this.getRealValue('maxRows', data, false),
            minWidth: this.getRealValue('minWidth', data, false),
            rowHeight: this.getRealValue('rowHeight', data, false),
            skin: this.getRealValue('skin', data, 'standard'),
            width: this.getRealValue('width', data, false)
        };
    }

    getWidgetHtml(innerHtml, title, mainDivStyle) {
        return `<div style="${mainDivStyle.join('')}"><h3>${title}</h3>${innerHtml}</div>`;
    }

    buildTableHtml(innerHtml, skin = 'template1') {
        return `<div class="ks-grid-table ks-grid-table-${skin}"><div class="ks-grid-table-inner">${innerHtml}</div></div>`;
    }

    buildTableHeadHtml(innerHtml) {
        return `<div class="ks-grid-table-head">${innerHtml}</div>`;
    }

    buildTableHeaderRowHtml(innerHtml, height, borderTop = true, borderBottom = true) {
        return `<div class="ks-grid-table-row ${borderBottom ? 'border-bottom' : ''} ${borderTop ? 'border-top' : ''}" ${height ? `style="height:${height}px;"` : ''}>${innerHtml}</div>`;
    }

    buildTableHeaderCellHtml(innerHtml, width, borderLeft = true, borderRight = true, alignment = 'center-center') {
        return `<div class="ks-grid-table-cell ${borderRight ? 'border-right' : ''}  ${borderLeft ? 'border-left' : ''}" style="width:${width}px;"><div class="ks-grid-table-cell-content ks-pos-${alignment}">${innerHtml}</div></div>`;
    }

    buildTableBodyHtml(innerHtml) {
        return `<div class="ks-grid-table-content">${innerHtml}</div>`;
    }

    buildTableRowHtml(innerHtml, height, borderBottom = true) {
        return `<div class="ks-grid-table-row ${borderBottom ? 'border-bottom' : ''}"  ${height ? `style="height:${height}px;"` : ''}>${innerHtml}</div>`;
    }

    renderPage() {
        return this.getHtml(this.state['widgets'], this.state['headerRowWidgetHtml'], this.value['cellData']);
    }

    isContentUpdatable(refreshedData) {
        const o = this.options;
        return refreshedData.length === v(o.id + '.cellData.length');
    }

    renderRowForUpdateContent(widgets, v) {
        L('render row for update content!!!!!!!!!');
        let j = 0, col = this.state['col'], r = [];
        while (j < widgets.length) {
            r.push(this.buildTableRowHtml(widgets.slice(j, j + col).join(''), v.rowHeight, v.borderBottom));
            j = j + col;
        }
        return r.join('');
    }

    updateContent(event, data = false, loadFunction = QB.loadData) {
        const o = this.options, instance = this;
        let widgetOptions, processedData, widgets = [],
            rowNum, colNum, i, j, deferred = [], w, previousLength = v(o.id + '.cellData.length');

        return loadFunction(o.id, instance.name).then(function (d) {
            processedData = instance.processData(d);
            const vv = instance.getParameters(d);
            if (!Array.isArray(processedData)) {
                processedData = processedData.content;
            }

            if (!vv.allowFullContentUpdated && !instance.isContentUpdatable(processedData)) {
                return Render.renderWidget(event, $('#' + o.id), instance, false, false, d);
            }

            for (widgetOptions of o.widgets || []) {
                if ('GridTableHeaderRowWidget' !== widgetOptions.type.name) {
                    widgets.push(new widgetOptions.type(widgetOptions));
                }
            }
            rowNum = processedData.length;
            colNum = processedData[0] ? processedData[0].length : 0;
            instance.state['rows'] = rowNum;
            instance.value = {cellData: []};
            deferred.push(instance.updateHtml(d));
            for (i = 0; i < rowNum; ++i) {
                instance.value.cellData[i] = [];
                j = 0;
                for (w of widgets) {
                    let dd = {
                        id: o.id + '_' + i + '_' + j,
                        cellId: o.id + 'Cell' + i + '-' + j
                    };
                    if (vv.allowFullContentUpdated && i >= previousLength) {
                        deferred.push(w.render(event, {...dd, ...processedData[i][j]}));
                    } else {
                        deferred.push(w.updateContent(event, {...dd, ...processedData[i][j]}));
                    }
                    instance.value.cellData[i].push(processedData[i][j]);
                    ++j;
                }
            }
            return $.when.apply($, deferred).then(function (...results) {
                if (vv.allowFullContentUpdated && rowNum > previousLength) {
                    let rowsToAppend = instance.renderRowForUpdateContent(results.filter(e => e !== 'update'), vv);
                    $('#' + o.id).find('.ks-grid-table-content').append(rowsToAppend);
                }
                return 'update';
            });
        });
    }

    updateHtml(data) {
        const o = this.options, v = this.getParameters(data), section = $('#' + o.id),
            mainDiv = section.children();
        v.minWidth && mainDiv.css('min-width', Widget.getPercentOrPixel(v.minWidth));
        v.width && mainDiv.css('width', Widget.getPercentOrPixel(v.width));
        if (data.content) {
            v.hideIfNoData && section.css('display', data.content.length > 0 ? 'unset' : 'none');
        }
        return 'update';
    }

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        const o = this.options, instance = this, h = Listeners.handle;

        let widgetOptions, widgets = [], headerRowWidget = false;

        for (widgetOptions of o.widgets || []) {
            if ('GridTableHeaderRowWidget' !== widgetOptions.type.name) {
                widgets.push(new widgetOptions.type(widgetOptions));
            } else {
                headerRowWidget = new widgetOptions.type(widgetOptions);
            }
        }

        if (o.listen) {
            for (let l of o.listen) {
                Listeners.push({
                    options: o,
                    method: l.method,
                    eventName: l.event,
                    parameters: l.parameters || [],
                    handler: h
                });
            }
        }

        Listeners.push({options: o, method: 'refresh', eventName: 'forcerefresh.' + o.id, handler: h});
        Listeners.push({
            options: o,
            method: 'refreshWithoutLoader',
            eventName: 'refreshwithoutloader.' + o.id,
            handler: h
        });
        Listeners.push({options: o, method: 'updateContent', eventName: 'updatecontent.' + o.id, handler: h});
        Listeners.push({
            options: o,
            method: 'updateContentWithoutLoader',
            eventName: 'updatecontentwithoutloader.' + o.id,
            handler: h
        });
        if (o.maxRows) {
            Listeners.push({options: o, method: 'renderPage', eventName: 'page.' + o.id, handler: h});
        }

        let afterLoad = (data) => {
            let deffered = [], w, processedData = instance.processData(data), i = 0, j = 0, rows, k, colNum;
            if (!Array.isArray(processedData)) {
                processedData = processedData.content;
            }
            o.errorMessage = '';

            if (processedData[0] && processedData[0].rows) {//each column has query
                rows = processedData[0].rows;
                colNum = processedData.length;
                k = 1;
            } else {//1 global query
                rows = processedData.length;
                colNum = processedData[0] ? processedData[0].length : 0;
                k = 0;
            }

            let widgetColNum = o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget').length;
            if (colNum !== widgetColNum + k && processedData[0]) {
                o.errorMessage = 'Error! Grid widgets number ' + widgetColNum + ' is not equal to repository query number ' + colNum + '!';
            }

            instance.state = {rows: rows};
            instance.value = {cellData: []};

            if (headerRowWidget !== false) {
                deffered.push(headerRowWidget.render(withState, processedData.length > 0 ? processedData[0] : []));
            }

            for (i = 0; i < rows; ++i) {
                instance.value.cellData[i] = [];
                j = 0;
                for (w of widgets) {
                    let d = {
                        id: o.id + '_' + i + '_' + j,
                        cellId: o.id + 'Cell' + i + '-' + j
                    };
                    k === 1 ? deffered.push(w.render(withState, {...d, ...processedData[j + k][i]})) : deffered.push(w.render(withState, {...d, ...processedData[i][j]}));
                    k === 1 ? instance.value.cellData[i].push(processedData[j + k][i]) : instance.value.cellData[i].push(processedData[i][j]);
                    ++j;
                }
            }
            //lassú:
            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r, first = true, headerRowWidgetHtml = false;

                for (r of results) {
                    if (first === true && headerRowWidget !== false) {
                        headerRowWidgetHtml = r;
                    } else {
                        widgetHtmls.push(r);
                    }
                    first = false;
                }
                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;
                let ghtml = instance.getHtml(widgetHtmls, headerRowWidgetHtml, data, withState), gs = [];
                if (o.applyMeasuresToSection === true) {
                    gs = instance.getWidthAndHeight(data);
                }

                if (visible === false) {
                    gs.push('display:none;');
                }
                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}"  style="${gs.join('')}"  id="${o.id}">${ghtml}</section>`;
            });
        };

        if (previouslyLoadedData !== false) {
            return afterLoad(previouslyLoadedData);
        }

        return QB.loadData(o.id, instance.name).then(function (data) {
            return afterLoad(data);
        });
    }

    initEvents(withState) {
        const o = this.options;

        if (o.errorMessage) {
            return;
        }

        let widgetOptions, widgets = [], w, i, j;

        for (i = 0; i < this.state.rows; ++i) {
            j = 0;
            for (widgetOptions of o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget') || []) {
                let d = {id: o.id + '_' + i + '_' + j};
                widgets.push(new widgetOptions.type({...widgetOptions, ...d}));
                ++j;
            }
        }

        for (w of widgets) {
            w.initEvents(withState);
        }

        let headerRowWidget = o.widgets.filter(e => e.type.name === 'GridTableHeaderRowWidget');

        for (w of headerRowWidget) {
            new w.type(w).initEvents(withState);
        }

        let section = $('#' + o.id);

        this.initEventHandlers(section, withState);
    }

    appendListeners(o, h) {
        if (o.maxRows) {
            Listeners.push({options: o, method: 'renderPage', eventName: 'page.' + o.id, handler: h});
        }
    }

    initEventHandlers(section) {

    }
}
;