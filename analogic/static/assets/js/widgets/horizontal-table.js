/* global app, El, Listeners, QB, Utils, Widget, Widgets */

'use strict';

class HorizontalTableWidget extends Widget {

    getHtml(widgets, data, withState, leftRowWidgets, rightRowWidgets) {
        const o = this.options;
        let mainDivStyle = this.getGeneralStyles(data), s = [], h, d, i, actionWidth = false;

        const v = {
            columnTypes: this.getRealValue('columnTypes', data, false),
            fadeOutNum: this.getRealValue('fadeOutNum', data, 10),
            hideIfNoData: this.getRealValue('hideIfNoData', d, false),
            multiSelect: this.getRealValue('multiSelect', d, false),
            searchField: this.getRealValue('searchField', data, false),
            selectFirst: this.getRealValue('selectFirst', data, false),
            selectedRowBackgroundColor: this.getRealValue('selectedRowBackgroundColor', data, '#bfd9f2'),
            skin: this.getRealValue('skin', data, 'standard')
        };

        let fadeOutHeight = 45 * (v.fadeOutNum);

        if (!withState) {
            this.state = {};
            this.rows = data.cells;
            this.multiSelect = v.multiSelect;
            this.selectedRowBackgroundColor = v.selectedRowBackgroundColor;
        }

        if (v.searchField) {
            s.push(`<div class="ks-horizontal-table-search"><div class="ks-horizontal-table-search-icon"><span class="icon-search"></span></div><input type="text" value=" ${withState && this.state.searchInput ? this.state.searchInput : ''}" class="ks-horizontal-table-search-input" placeholder="Search..."></div>`);
        }

        if (o.checkbox) {
            s.push(`
<div class="ks-horizontal-table-search-toggle-holder">
    <div class="ks-horizontal-table-search-toggle ${withState && this.state.checkbox === true ? 'ks-on' : ''}" data-value="${o.checkbox.value}">
        <div class="ks-horizontal-table-toggle-icon ks-horizontal-table-toggle-icon-off"><span class="icon-checkbox-off"></span></div>
        <div class="ks-horizontal-table-toggle-icon ks-horizontal-table-toggle-icon-on"><span class="icon-checkbox-on"></span></div>
        <div class="ks-horizontal-table-toggle-label ks-horizontal-table-toggle-label-on">${o.checkbox.value} Only</div>
    </div>
</div>`
            );
        }

        if (v.hideIfNoData === true && (!data || data.cells.length === 0)) {
            mainDivStyle.push('display:none;');
        }

        if (o.columnWidths && (leftRowWidgets.length + rightRowWidgets.length) > 0) {
            let sumWidth = 0;
            for (i = 0; i < o.columnWidths.length; ++i) {
                if (o.columnWidths[i].indexOf('%') !== -1) {
                    sumWidth += parseInt(o.columnWidths[i].replace('%', ''));
                }
            }
            if (sumWidth) {
                actionWidth = (100 - sumWidth) / (leftRowWidgets.length + rightRowWidgets.length);
            }
        }

        h = this.getTableHeader(o, data, leftRowWidgets, rightRowWidgets, actionWidth);
        d = this.getTableBody(o, data, h.dataColumnNames, leftRowWidgets, rightRowWidgets, withState, actionWidth, v);

        return `
<div class="ks-horizontal-table ${data.cells.length > v.fadeOutNum ? 'ks-scroll' : ''}  ks-horizontal-table-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-horizontal-table-inner">
        <div class="ks-horizontal-table-header">${s.join('')}</div>
        <div class="ks-horizontal-table-body">
            <div class="ks-horizontal-table-row ks-horizontal-table-head-row">${h.html}</div>
            <div class="ks-horizontal-table-body-scroll" style="max-height:${fadeOutHeight}px;${data.cells.length <= v.fadeOutNum ? 'overflow:hidden;' : ''}">${d}</div>
            ${data.cells.length > v.fadeOutNum ? '<div class="ks-horizontal-table-fade"></div>' : ''}
        </div>
        ${data.cells.length > v.fadeOutNum ? `<div class="ks-horizontal-table-footer"><div class="ks-horizontal-table-info">${data.cells.length}  ${data.cells.length > 1 ? 'results' : 'result'}</div></div>` : ''}
    </div>
</div>`;
    }

    getTableHeader(o, data, leftRowWidgets, rightRowWidgets, actionWidth) {
        let l, s = [], dataColumnNames = [], i = 0;

        if (data.leftActionCells.length > 0) {
            for (l of data.leftActionCells[0]) {
                s.push(`<div class="ks-horizontal-table-cell ks-${leftRowWidgets[i].name === 'RadioButtonRowWidget' ? 'checkbox' : 'action'}-cell" ${actionWidth !== false ? `style="flex: 0 0 ${actionWidth}%;"` : ''}>${leftRowWidgets[i].options.columnName ? leftRowWidgets[i].options.columnName : ''}</div>`);
                ++i;
            }
        }

        for (const [ind, vi] of o.columnNames.entries()) {
            s.push(`<div class="ks-horizontal-table-cell sortable" style="${o.columnWidths && o.columnWidths[ind] && parseInt(o.columnWidths[ind].replace('%', '')) === 0 ? 'display:none;' : ''}${o.columnWidths && o.columnWidths[ind] ? 'flex: 0 0 ' + o.columnWidths[ind] + (o.columnWidths[ind].indexOf('%') === -1 ? 'px;' : ';') : ''}"><div class="ks-horizontal-table-cell-inner">${vi}<div class="ks-order"></div></div></div>`);
            dataColumnNames.push(vi.toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, ''));
        }

        if (data.rightActionCells.length > 0) {
            i = 0;
            for (l of data.rightActionCells[0]) {
                s.push(`<div class="ks-horizontal-table-cell ks-${rightRowWidgets[i].name === 'RadioButtonRowWidget' ? 'checkbox' : 'action'}-cell"  ${actionWidth !== false ? `style="flex: 0 0 ${actionWidth}%;"` : ''}>${rightRowWidgets[i].options.columnName ? rightRowWidgets[i].options.columnName : ''}</div>`);
                ++i;
            }
        }

        return {html: s.join(''), dataColumnNames: dataColumnNames};
    }

    getTableBody(o, data, dataColumnNames, leftRowWidgets, rightRowWidgets, withState, actionWidth, v) {
        let i, j, k, c = [], d = [], leftActionsNum = 0, rightActionsNum = 0, s = [], mtx = data.cells,
            len = mtx.length, cells, cell, escapedValue, enabled, len2, columnType = 'string', selectFirstIndex;

        for (i = 0; i < len; ++i) {//content
            enabled = data.leftActionCells.length > 0 && data.leftActionCells[i].length > 0 ? data.leftActionCells[i][0].active : true;
            s.push(`<div class="ks-horizontal-table-row ${!enabled ? 'ks-disabled' : ''}">`);
            c = [];
            d = [];

            cells = mtx[i];
            len2 = cells.length;
            for (j = 0; j < len2; ++j) {
                cell = cells[j];

                if (v.columnTypes) {
                    columnType = v.columnTypes[j];
                }

                escapedValue = cell.value.replace(/(<([^>]+)>)/ig, "").replace(/"/ig, "");
                k = cell.color;

                c.push(`<div class="ks-horizontal-table-cell" style="${k ? ('color:' + k + ';') : ''}${o.columnWidths && o.columnWidths[j] ? 'flex: 0 0 ' + o.columnWidths[j] + (o.columnWidths[j].indexOf('%') === -1 ? 'px;' : ';') : ''}white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"><div class="ks-horizontal-table-cell-inner ${cell.editable ? 'editable' : ''}" data-columntype="${columnType}" data-row="${i}" data-col="${j}" data-ordinal="${cell.ordinal}" data-editable="${cell.editable}" title="${escapedValue}">${cell.value.replace(/</ig, "< ")}</div></div>`);

                if (data.leftActionCells.length + data.rightActionCells.length > 0 && dataColumnNames[j] !== '' && cell.value.length < 200) {
                    d.push(` data-${dataColumnNames[j]}="${escapedValue}" `);
                }
            }

            cells = data.leftActionCells;
            if (cells.length > i) {
                cell = cells[i];
                len2 = cell.length;
                for (k = 0; k < len2; ++k) {
                    s.push(leftRowWidgets[k].getHtml([], {
                        icon: cell[k].icon,
                        index: i,
                        on: (withState && this.state.radio === i) || cell[k].on === true || (v.selectFirst && i === 0),
                        d: d,
                        active: cell[k].active === true,
                        id: o.id,
                        num: leftActionsNum,
                        actionWidth: actionWidth
                    }));
                    if (v.selectFirst && i === 0) {
                        let html = $(s[s.length - 1]), p = html.find('.ks-horizontal-table-row-toggle');
                        Widgets[o.id][p.data('action')] = p.data();
                        selectFirstIndex = s.length - 1;
                    }
                    if (cell[k].on === true) {
                        let html = $(s[s.length - 1]), p = html.find('.ks-horizontal-table-row-toggle');
                        Widgets[o.id][p.data('action')] = p.data();
                        if (v.selectFirst) {
                            s[selectFirstIndex] = s[selectFirstIndex].replace('ks-on', '');
                        }
                    }
                    ++leftActionsNum;
                }

            }

            s.push(c.join(''));

            cells = data.rightActionCells;
            if (cells.length > i) {
                cell = cells[i];
                len2 = cell.length;
                for (k = 0; k < len2; ++k) {
                    s.push(rightRowWidgets[k].getHtml([], {
                        icon: cell[k].icon,
                        ordinal: cell[k].ordinal,
                        on: (withState && this.state.radio === i) || cell[k].on === true || (v.selectFirst && i === 0),
                        index: i,
                        d: d,
                        active: cell[k].active === true,
                        id: o.id,
                        num: rightActionsNum,
                        actionWidth: actionWidth
                    }));
                    if (v.selectFirst && i === 0) {
                        let html = $(s[s.length - 1]), p = html.find('.ks-horizontal-table-row-toggle');
                        Widgets[o.id][p.data('action')] = p.data();
                        selectFirstIndex = s.length - 1;
                    }
                    if (cell[k].on === true) {
                        let html = $(s[s.length - 1]), p = html.find('.ks-horizontal-table-row-toggle');
                        Widgets[o.id][p.data('action')] = p.data();
                        if (v.selectFirst) {
                            s[selectFirstIndex] = s[selectFirstIndex].replace('ks-on', '');
                        }
                    }
                    ++rightActionsNum;
                }

            }

            s.push(`</div>`);
        }

        return s.join('');
    }

    render(withState) {
        this.isRendering = true;
        const o = this.options, instance = this;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(this.getWidget(widgetOptions));
        }

        this.addListeners(false);

        return QB.loadData(o.id, instance.name).then(function (data) {
            let deferred = [], w, i = 0, leftRowWidgets = [], rightRowWidgets = [], buttonWidgets = [], position = 1000,
                processedData;

            for (w of widgets) {
                if (!w.options.position) {
                    w.options.position = position;
                    ++position;
                }

                w.name.includes('RowWidget') ? w.options.align === 'left' ? leftRowWidgets.push(w) : rightRowWidgets.push(w) : buttonWidgets.push(w);
            }

            rightRowWidgets = rightRowWidgets.sort((a, b) => a.options.position > b.options.position ? 1 : -1);

            leftRowWidgets = leftRowWidgets.sort((a, b) => a.options.position > b.options.position ? 1 : -1);

            buttonWidgets = buttonWidgets.sort((a, b) => a.options.position > b.options.position ? 1 : -1);

            for (w of buttonWidgets) {
                deferred.push(w.render(withState));
            }

            o.leftActionsLength = leftRowWidgets.length;
            o.rightActionsLength = rightRowWidgets.length;

            processedData = instance.processData(data);

            return $.when.apply($, deferred).then(function (...results) {
                let widgetHtmls = [], r, gs = [];

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && typeof data.visible !== 'undefined' ? data.visible : o.visible;

                if (o.applyMeasuresToSection === true) {
                    gs = instance.getWidthAndHeight(data);
                }

                if (visible === false) {
                    gs.push('display:none;');
                }

                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id}">${instance.getHtml(widgetHtmls, processedData, withState, leftRowWidgets, rightRowWidgets)}</section>`;
            });
        });
    }

    initEventHandlers(withState) {

        const section = this.getSection();

        Widget.handleSystemEvent(section, 'click', '.horizontal-table-row-action');

        section.find('.horizontal-table-row-action-delete').on('click', e => {
            let w = $(e.currentTarget), p = w.parent(), t = [];

            t.push('<div class="row"><div class="col-12"><div class="row"><div class="col-12"><h4 style="margin-top: 20px;margin-bottom: 20px;">', w.data('message'), '</h4></div></div></div></div>');
            t.push('<div class="row"><div class="col-12"><div class="row">');
            t.push('<div class="col-6"><a id="deleteOk" class="widget-btn button-widget">Delete</a></div>');
            t.push('<div class="col-6"><a id="deleteCancel" style="text-align: center;display:block;" class="widget-link-cancel button-widget-cancel">CANCEL</a></div>');
            t.push('</div></div></div>');

            El.body.prepend(`<div id="horizontalpopup" style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;z-index: 8;"></div>`);

            p.append(`<div class="widget-table-row-edit-menu">${t.join('')}</div>`).promise().then(() => {
                let c = p.find('.widget-table-row-edit-menu'), g = $('#horizontalpopup');

                g.on('click', () => {
                    g.remove();
                    c.remove();
                });

                $('#deleteOk').on('click', () => {
                    Widget.doHandleSystemEvent(w, e);
                    g.remove();
                    c.remove();
                });

                $('#deleteCancel').on('click', () => {
                    g.remove();
                    c.remove();
                });
            });
        });

        section.find('.sortable').each(function () {
            let th = $(this), s = th.closest('section'), table = s.find('.ks-horizontal-table-body-scroll'),
                thIndex = th.index(), inverse = false;


            th.click(function () {
                s.find('.ks-horizontal-table-cell').removeClass('ks-ordered').removeClass('ks-asc').removeClass('ks-desc');
                table.find('.ks-horizontal-table-cell').filter(function () {
                    return $(this).index() === thIndex;
                }).sortElements(function (a, b) {
                    let aEl = $(a).find('div'), aValue, bValue;
                    if (aEl.data('columntype') === 'real') {
                        aValue = Utils.parseNumber(aEl.text());
                        bValue = Utils.parseNumber($(b).find('div').text());
                    } else {
                        aValue = aEl.text();
                        bValue = $(b).find('div').text();
                    }
                    if (aValue === bValue) {
                        return 0;
                    }

                    return aValue > bValue ? inverse ? -1 : 1 : inverse ? 1 : -1;
                }, function () {
                    return this.parentNode;
                });

                inverse ? th.addClass('ks-ordered ks-asc') : th.addClass('ks-ordered ks-desc');

                inverse = !inverse;
            });
        });

        section.find('.ks-horizontal-table-row-toggle').on('click', e => {
            let p = section.find('.ks-horizontal-table-row-toggle.ks-on'), w = $(e.currentTarget);

            this.state.radio = w.data('index');

            p.closest('.ks-horizontal-table-row').css('background-color', '');
            if (this.multiSelect === false) {
                p.removeClass('ks-on');
                w.addClass('ks-on');
                w.closest('.ks-horizontal-table-row').prop('style', 'background-color:' + this.selectedRowBackgroundColor + ';');
            } else {
                if (w.hasClass('ks-on')) {
                    w.removeClass('ks-on');
                    this.selected = false;
                    this.selectedOrdinal = w.data('ordinal');
                } else {
                    w.addClass('ks-on');
                    this.selected = true;
                    this.selectedOrdinal = w.data('ordinal');
                    w.closest('.ks-horizontal-table-row').prop('style', 'background-color:' + this.selectedRowBackgroundColor + ';');
                }
            }
            Widget.doHandleSystemEvent(w, e, true);
        });

        section.find('.ks-horizontal-table-search-toggle').on('click', e => {
            let c = $(e.currentTarget).toggleClass('ks-on'), s = c.closest('section'),
                t = s.find('.ks-horizontal-table-body-scroll'), w = s.find('.ks-horizontal-table-search'),
                i = w.find('input');

            this.state.checkbox = c.hasClass('ks-on');

            HorizontalTableWidget.filter(t, i.val(), c);
        });

        for (let g of section.find('.ks-horizontal-table-search')) {
            let w = $(g), s = w.closest('section'), t = s.find('.ks-horizontal-table-body-scroll'), i = w.find('input'),
                c = s.find('.ks-horizontal-table-search-toggle');
            i.on('focus', () => i.select()).on('input', () => {
                i.attr('value', i.val());
                this.state.searchInput = i.val();
                HorizontalTableWidget.filter(t, i.val(), c);
            });
        }

        section.find('div.editable').on('click', e => HorizontalTableWidget.addEdit(e));

        if (withState) {
            const o = this.options;
            if (o.searchField || o.checkbox) {
                let t = section.find('.ks-horizontal-table-body-scroll'), i = section.find('input'),
                    c = section.find('.ks-horizontal-table-search-toggle');
                HorizontalTableWidget.filter(t, i.val(), c);
            }

            if (o.leftActionsLength > 0) {
                let tr = section.find('.ks-horizontal-table-row-toggle.ks-on').closest('.ks-horizontal-table-row').prop('style', 'background-color:#bfd9f2;');

                if (tr) {
                    let trPos = tr.position(), trCtr = tr.height() / 2,
                        tableContainer = $(section.find('.ks-horizontal-table-body')[0]),
                        dataTblctr = (tableContainer.height()) / 2;

                    if (trPos) {
                        tableContainer.scrollTop(trPos.top - dataTblctr + trCtr);
                    }
                }
                // $(section.find('.widget-table-holder')[0]).scrollTop(100);
            }
        }
    }

    reset() {
        delete this.rows;
        delete this.multiSelect;
        delete this.selectedRowBackgroundColor;
    }

    static addEdit(e) {
        let c = $(e.currentTarget), s = c.closest('section'), vv = c.text();

        c.off('click');
        c.addClass('editing');
        c.addClass('cell-selected');
        c.html(`<input type="text" data-row="${c.data('row')}" data-col="${c.data('col')}" data-id="${s.prop('id')}" data-action="cellEdit" data-ordinal="${c.data('ordinal')}" class="widget-input edit-cell">`).promise().then(() => {
            let r = c.find('.edit-cell');
            r.val(vv).focus().select().on('keydown', f => {
                if (f.keyCode === 13) {
                    HorizontalTableWidget.addCellPressed(f, c);
                    r.data('value', Utils.escapeText(r.val()));
                    Widgets[r.data('id')].rows[r.data('row')][r.data('col')].value = Utils.escapeText(r.val());
                    Widget.doHandleSystemEvent(r, f);
                }
                if (f.keyCode === 9) {
                    let editables = s.find('[data-editable=true]').filter(':visible'), i = 0, j = -1;
                    while (i < editables.length && j === -1) {
                        if ($(editables[i]).data('ordinal') === c.data('ordinal')) {
                            j = i;
                        }
                        ++i;
                    }
                    if ((j + 1) >= editables.length) {
                        j = -1;
                    }
                    HorizontalTableWidget.addCellPressed(f, c);
                    r.data('value', Utils.escapeText(r.val()));
                    Widgets[r.data('id')].rows[r.data('row')][r.data('col')].value = Utils.escapeText(r.val());
                    $(editables[j + 1]).click();
                    Widget.doHandleSystemEvent(r, f);

                    return false;
                }
            });

            r.on('focusout', f => {
                HorizontalTableWidget.addCellPressed(f, c);
                r.data('value', Utils.escapeText(r.val()));
                Widgets[r.data('id')].rows[r.data('row')][r.data('col')].value = Utils.escapeText(r.val());
                Widget.doHandleSystemEvent(r, f);
            });
        });
    }

    static addCellPressed(f, c) {
        let v = $(f.currentTarget).off('keydown focusout').val();

        c.removeClass('editing cell-selected').html(v).attr('title', v).on('click', e => HorizontalTableWidget.addEdit(e));
    }

    static filter(tbody, searchTerm, checkBox, additionalFilterRowFunc) {
        let i, j, m, n, rows, r, cells, mL = 3, checkBoxValue, additionalFilterRowFuncFinal = additionalFilterRowFunc;

        searchTerm = Utils.cleanStr(searchTerm.trim()).toLowerCase();

        if (checkBox) {
            checkBoxValue = checkBox.hasClass('ks-on') ? checkBox.data('value') : '';
            if (additionalFilterRowFunc) {
                additionalFilterRowFuncFinal = function (row, checkBoxValue) {
                    return (additionalFilterRowFunc(row) && HorizontalTableWidget.checkBoxFilter(row, checkBoxValue));
                };
            } else {
                additionalFilterRowFuncFinal = HorizontalTableWidget.checkBoxFilter;
            }
        }


        if (!additionalFilterRowFuncFinal && searchTerm.length < mL) {
            HorizontalTableWidget.clearFilter(tbody);
            return;
        }

        tbody.lastSearchedTerm = tbody.lastSearchedTerm || '';

        if (!additionalFilterRowFuncFinal && tbody.lastSearchedTerm === searchTerm) {
            return;
        }

        if (!additionalFilterRowFuncFinal) {
            additionalFilterRowFuncFinal = function () {
                return true;
            };
        }

        rows = tbody.children();
        for (i = 0, n = rows.length; i < n; ++i) {
            r = rows.eq(i);

            if (!additionalFilterRowFuncFinal(r, checkBoxValue)) {
                r.hide();
                continue;
            }

            cells = r.children();
            for (j = 0, m = cells.length; j < m; ++j) {
                if (-1 !== Utils.cleanStr(cells.eq(j).text()).toLowerCase().indexOf(searchTerm)) {
                    r.show();

                    break;
                }

                r.hide();
            }
        }

        tbody.lastSearchedTerm = searchTerm;
        tbody.closest('section').find('.ks-horizontal-table-info').html(tbody.find('.ks-horizontal-table-row:visible').length + ' results');
    }

    static checkBoxFilter(row, checkBoxValue) {
        if (!checkBoxValue) {
            return true;
        }

        let j, m, c = row.children();

        for (j = 0, m = c.length; j < m; ++j) {
            if (-1 !== Utils.cleanStr(c.eq(j).text()).toLowerCase().indexOf(checkBoxValue.toLowerCase())) {
                return true;
            }

        }

        return false;
    }

    static clearFilter(tbody, callbackFunc) {
        tbody.lastSearchedTerm = '';

        tbody.children().show().promise().done(function () {
            if (callbackFunc) {
                callbackFunc();
            }
        });
    }

    processData(data) {
        if (data.cells) {
            return data; //dummy
        }

        const o = this.options;

        let leftActionCells = [], rightActionCells = [], cells = [], j, i, r, k;

        for (k = 0; k < data.length; ++k) {
            j = 0;

            while (j < data[k].length) {
                r = [];
                for (i = 0; i < o.leftActionsLength; ++i) {
                    r.push(data[k][j]);
                    ++j;
                }
                leftActionCells.push(r);

                r = [];
                for (i = 0; i < o.columnNames.length; ++i) {
                    r.push(data[k][j]);
                    ++j;
                }
                cells.push(r);

                r = [];
                for (i = 0; i < o.rightActionsLength; ++i) {
                    r.push(data[k][j]);
                    ++j;
                }
                rightActionCells.push(r);
            }
        }

        return {cells: cells, leftActionCells: leftActionCells, rightActionCells: rightActionCells};
    }
}
;