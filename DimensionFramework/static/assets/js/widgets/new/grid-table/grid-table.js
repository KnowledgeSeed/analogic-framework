/* global app, Listeners, QB, Widget */

'use strict';

class GridTableWidget extends Widget {

    getHtml(widgets, headerRowWidgetHtml, d) {
        const o = this.options;

        const v = {
            borderBottom: this.getRealValue('borderBottom', d, true),
            borderTop: this.getRealValue('borderTop', d, true),
            hideIfNoData: this.getRealValue('hideIfNoData', d, false),
            maxRows: this.getRealValue('maxRows', d, false),
            rowHeight: this.getRealValue('rowHeight', d, false),
            skin: this.getRealValue('skin', d, 'standard')
        };


        let mainDivStyle = this.getGeneralStyles(d);
        if (v.hideIfNoData === true && (!d || d.length === 0)) {
            mainDivStyle.push('display:none;');
        }

        let r = [], c = [], tb, th, j = 0,
            col = o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget').length, hw = '';

        if (o.errorMessage !== '') {
            return `<div><h3 style="color:red;">${o.errorMessage}</h3></div>`;
        }

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

    render(withState) {
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
        if(o.maxRows){
            Listeners.push({options: o, method: 'renderPage', eventName: 'page.' + o.id, handler: h});
        }

        return QB.loadData(o.id, instance.name).then(function (data) {
            let deffered = [], w, processedData = instance.processData(data), i = 0, j = 0, rows, k, colNum;

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

            if (colNum !== o.widgets.filter(e => e.type.name !== 'GridTableHeaderRowWidget').length + k && processedData[0]) {
                o.errorMessage = 'Error! Grid widgets number is not equal to repository query number!';
            }

//            let maxHeight = Math.max.apply(Math, widgets.map(function (o) {
//                return o.options.height;
//            }));

            instance.state = {rows: rows};
            instance.value = {cellData: []};

            const widthTotal = o.widgets.reduce((prev, cur) => prev + (cur.width || cur.type.name !== 'GridTableHeaderRowWidget') ? cur.width : 0, 0);

            //      if (widthTotal <= $(window).width()) {
            if (headerRowWidget !== false) {
                deffered.push(headerRowWidget.render(withState, processedData.length > 0 ? processedData[0] : []));
            }

            for (i = 0; i < rows; ++i) {
                instance.value.cellData[i] = [];
                j = 0;
                for (w of widgets) {
                    let d = {
                        id: o.id + '_' + i + '_' + j
                        //,height: maxHeight
                    };
                    k === 1 ? deffered.push(w.render(withState, {...d, ...processedData[j + k][i]})) : deffered.push(w.render(withState, {...d, ...processedData[i][j]}));
                    k === 1 ? instance.value.cellData[i].push(processedData[j + k][i]) : instance.value.cellData[i].push(processedData[i][j]);
                    ++j;
                }
            }
//            } else {
//                o.errorMessage = 'Size error!';
//            }

            //  o.height = maxHeight;
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
                let ghtml = instance.getHtml(widgetHtmls, headerRowWidgetHtml, processedData, withState);
                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" ${visible === false ? 'style="display:none"' : ''} id="${o.id}">${ghtml}</section>`;
            });
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

    initEventHandlers(section) {

    }
}
;