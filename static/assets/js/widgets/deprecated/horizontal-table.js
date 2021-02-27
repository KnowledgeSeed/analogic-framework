/* global app, El, Listeners, QB, Utils, Widget, WidgetValue */

'use strict';
class OldHorizontalTableWidget extends Widget {

    getHtml(widgets, data, withState, leftRowWidgets, rightRowWidgets) {
        const o = this.options;

        let i, j, k, l, h, s = [], c = [], d = [], width = o.width ? '-' + (12 * (o.width / 100)) : '', dataColumnNames = [];
        let leftActionsNum = 0, rightActionsNum = 0;

        if (!withState) {
            this.state = {};
            this.value = {rows: data.cells};

        }

        let fadeOutNum = o.fadeOutNum ? o.fadeOutNum : 10, fadeOutHeight = 58 * (fadeOutNum + 1);

        if (o.searchField) {
            s.push(`
<div class="row">
    <div class="col-6">
        <div class="widget-search-holder">
            <div class="row">
                <div class="col-6">
                    <div class="widget-search horizontal-table">
                        <span class="icon-search"></span>
                        <input type="text" value=" ${withState && this.state.searchInput ? this.state.searchInput : '' }">
                    </div>
                </div>
${o.checkbox ?
            `<div class="col-6">
                <div class="widget-checkbox-horizontal-table-holder with-label">
                    <div class="widget-checkbox horizontal-table ${withState && this.state.checkbox === true ? 'on' : '' }" data-value="${o.checkbox.value}">
                        <span class="icon-checkbox-off"></span>
                        <span class="icon-checkbox-on"></span>
                    </div>
                    <label>${o.checkbox.value} Only</label>
                </div>
                </div>` : '' }
            </div>
        </div>
    </div>
</div>`);
        }

        o.titleVisible === false ? '' : s.push(`<div class="row"><div class="col"><h2 class="sub-title">${o.title}</h2></div> </div>`);
        s.push(`<div class="row"><div class="col${width}"><div class="widget-table-holder-holder ${ data.cells.length > fadeOutNum ? 'closed' : '' }" ${ data.cells.length > fadeOutNum ? `style="max-height: ${fadeOutHeight}px!important;"` : '' }><div class="widget-table-holder-results" ${ data.cells.length <= fadeOutNum ? 'style="display:none;"' : '' }>${data.cells.length} results</div><div class="widget-table-holder" ${ data.cells.length > fadeOutNum ? `style="max-height: ${fadeOutHeight}px!important;"` : '' }><table class="widget-table ${ data.cells.length > fadeOutNum ? 'scrolled' : '' }"><thead><tr>`);

        if (data.leftActionCells.length > 0) {
            for (l of data.leftActionCells[0]) {
                s.push(`<th class="col-selection" style="background-color: #fff;"></th>`);
            }
        }

        for (h of o.columnNames) { //header
            s.push(`<th class="sortable">${h}</th>`);
            dataColumnNames.push(h.toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, ''));
        }

        if (data.rightActionCells.length > 0) {
            for (l of data.rightActionCells[0]) {
                s.push(`<th class="col-link" style="background-color: #fff;border-top-left-radius: 0px;border-top-right-radius: 0px;"></th>`);
            }
        }

        s.push(`</tr></thead><tbody>`);

        for (i = 0; i < data.cells.length; ++i) {//content
            let enabled = data.leftActionCells.length > 0 && data.leftActionCells[i].length > 0 ? data.leftActionCells[i][0].active : true;
            s.push(`<tr ${!enabled ? 'class="disabled"' : ''}>`);

            c = [];
            d = [];
            //cells:
            for (j = 0; j < data.cells[i].length; ++j) {
                c.push(`<td style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" data-row="${i}" data-col="${j}" data-ordinal="${data.cells[i][j].ordinal}" data-editable="${data.cells[i][j].editable}" class="${data.cells[i][j].editable ? 'editable' : ''}" title="${data.cells[i][j].value.replace(/(<([^>]+)>)/ig, "")}">${data.cells[i][j].value}</td>`);
                if (data.leftActionCells.length + data.rightActionCells.length > 0) {
                    if (dataColumnNames[j] !== '') {
                        if (data.cells[i][j].value.length < 200) {
                            d.push(` data-${dataColumnNames[j]}="${data.cells[i][j].value.replace(/(<([^>]+)>)/ig, "")}" `);
                        }
                    }
                }
            }

            //left actions
            if (data.leftActionCells.length > i) {
                for (k = 0; k < data.leftActionCells[i].length; ++k) {
                    s.push(leftRowWidgets[k].getHtml([], {index: i, on: withState && this.state.radio === i, d: d, active: data.leftActionCells[i][k].active === true, id: o.id, num: leftActionsNum}));
                    ++leftActionsNum;
                }

            }

            s.push(c.join(''));

            //right actions
            if (data.rightActionCells.length > i) {
                for (k = 0; k < data.rightActionCells[i].length; ++k) {
                    s.push(rightRowWidgets[k].getHtml([], {index: i, d: d, active: data.rightActionCells[i][k].active === true, id: o.id, num: rightActionsNum}));
                    ++rightActionsNum;
                }

            }
            s.push(`</tr>`);
        }

        s.push(`</tbody></table></div></div></div></div>`);

        if (widgets.length > 0) {
            s.push(`<div class="row margin-bottom-row"><div class="col"><div class="row">${widgets.join('')} </div></div></div>`);
        }

        if (o.tooltip) {
            s.push(`<div class="row" style="margin-bottom: 30px;"><div class="col"><div style="width: 10px;" data-title="${o.tooltipTitle}" data-tooltip="${o.tooltip}" class="tooltip-icon"><span class="icon-info"></span></div></div></div>`);
        }

        return s.join('');
    }

    render(withState) {
        const o = this.options, instance = this, h = Listeners.handle;

        let widgetOptions, widgets = [];

        for (widgetOptions of o.widgets || []) {
            widgets.push(new widgetOptions.type(widgetOptions));
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

        return QB.loadData(o.id, instance.name).then(function (data) {
            let deffered = [], w, i = 0, leftRowWidgets = [], rightRowWidgets = [], buttonWidgets = [], position = 1000, processedData;

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
                deffered.push(w.render(withState));
            }

            o.leftActionsLength = leftRowWidgets.length;
            o.rightActionsLength = rightRowWidgets.length;

            processedData = instance.processData(data);

            return $.when.apply($, deffered).then(function (...results) {
                let widgetHtmls = [], r;

                for (r of results) {
                    widgetHtmls.push(r);
                }

                let visible = data && data.visible ? data.visible : o.visible;

                return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" ${visible === false ? 'style="display:none"' : '' } id="${o.id}">${instance.getHtml(widgetHtmls, processedData, withState, leftRowWidgets, rightRowWidgets)}</section>`;
            });
        });
    }

    initEventHandlers(section, withState) {
        Widget.handleSystemEvent(section, 'click', '.horizontal-table-row-action');

        section.find('.horizontal-table-row-action-delete').on('click', e => {
            let w = $(e.currentTarget), s = w.closest('section'), p = w.parent(), t = [];
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
            let th = $(this), table = th.closest('section').find('table'), e, thIndex = th.index(), inverse = false;

            th.click(function () {
                e = table.find('th');
                e.removeClass('ordered-by').removeClass('asc').removeClass('desc');
                e.find('span').remove();

                e.filter(function () {
                    return $(this).index() === thIndex;
                }).sortElements(function (a, b) {
                    if ($.text([a]) === $.text([b])) {
                        return 0;
                    }

                    return $.text([a]) > $.text([b]) ? inverse ? -1 : 1 : inverse ? 1 : -1;
                }, function () {
                    return this.parentNode;
                });

                inverse ? th.addClass('ordered-by asc') : th.addClass('ordered-by desc');

                th.append('<span></span>');

                inverse = !inverse;
            });

        });

        section.find('.widget-radio.horizontal-table span').on('click', e => {
            let p = section.find('.widget-radio.on'), w = $(e.currentTarget).parent();

            this.state.radio = w.data('index');
            p.closest('tr').prop('style', '');
            p.removeClass('on');

            w.addClass('on');
            w.closest('tr').prop('style', 'background-color:#bfd9f2;');

            Widget.doHandleSystemEvent(w, e, true);
        });

        section.find('.widget-checkbox.horizontal-table').on('click', e => {
            let c = $(e.currentTarget), s = c.closest('section'), t = s.find('.widget-table').find('tbody'), w = s.find('.widget-search.horizontal-table'), i = w.find('input');
            c.toggleClass('on');
            this.state.checkbox = c.hasClass('on');
            OldHorizontalTableWidget.filter(t, i.val(), c);
        });

        for (let g of section.find('.widget-search.horizontal-table')) {
            let w = $(g), s = w.closest('section'), t = s.find('.widget-table').find('tbody'), i = w.find('input'), c = s.find('.widget-checkbox.horizontal-table');
            i.on('focus', () => i.select()).on('input', () => {
                i.attr('value', i.val());
                this.state['searchInput'] = i.val();
                OldHorizontalTableWidget.filter(t, i.val(), c);
            });
        }

        section.find('td.editable').on('click', e => OldHorizontalTableWidget.addEdit(e));

        if (withState) {
            const o = this.options;

            if (o.searchField || o.checkbox) {
                let t = section.find('.widget-table').find('tbody'), i = section.find('input'), c = section.find('.widget-checkbox.horizontal-table');
                OldHorizontalTableWidget.filter(t, i.val(), c);
            }

            if (o.leftActionsLength > 0) {
                let tr = section.find('.widget-radio.on').closest('tr');
                tr.prop('style', 'background-color:#bfd9f2;');
                if (tr) {
                    let trPos = tr.position(), trCtr = tr.height() / 2, tableContainer = $(section.find('.widget-table-holder')[0]), dataTblctr = (tableContainer.height()) / 2;

                    if (trPos) {
                        tableContainer.scrollTop(trPos.top - dataTblctr + trCtr);
                    }
                }
            }
        }
    }

    static addEdit(e) {
        let c = $(e.currentTarget), s = c.closest('section');
        c.off('click').addClass('editing cell-selected');
        c.html('<input type="text" data-row="' + c.data('row') + '" data-col="' + c.data('col') + '" data-id="' + s.prop('id') + '" data-action="cellEdit" data-ordinal="' + c.data('ordinal') + '" class="widget-input edit-cell" value="' + c.html() + '">').promise().then(() => {
            let r = c.find('.edit-cell').focus().select().on('keydown', f => {
                if (f.keyCode === 13) {
                    OldHorizontalTableWidget.addCellPressed(f, c);
                    r.data('value', Utils.escapeText(r.val()));
                    WidgetValue[r.data('id')].rows[r.data('row')][r.data('col')].value = Utils.escapeText(r.val());
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

                    OldHorizontalTableWidget.addCellPressed(f, c);
                    r.data('value', Utils.escapeText(r.val()));
                    WidgetValue[r.data('id')].rows[r.data('row')][r.data('col')].value = Utils.escapeText(r.val());
                    $(editables[j + 1]).click();

                    Widget.doHandleSystemEvent(r, f);

                    return false;
                }
            });

            r.on('focusout', f => {
                OldHorizontalTableWidget.addCellPressed(f, c);
                r.data('value', Utils.escapeText(r.val()));
                WidgetValue[r.data('id')].rows[r.data('row')][r.data('col')].value = Utils.escapeText(r.val());

                Widget.doHandleSystemEvent(r, f);
            });
        });
    }

    static addCellPressed(f, c) {
        let d = $(f.currentTarget), v = d.val();
        d.off('keydown focusout').removeClass('editing cell-selected');
        c.attr('title', v);
        c.on('click', e => OldHorizontalTableWidget.addEdit(e));
    }

    static filter(tbody, searchTerm, checkBox, additionalFilterRowFunc) {
        let i, j, m, n, rows, r, cells, mL = 3, checkBoxValue, additionalFilterRowFuncFinal = additionalFilterRowFunc;

        searchTerm = Utils.cleanStr(searchTerm.trim()).toLowerCase();

        if (checkBox) {
            checkBoxValue = checkBox.hasClass('on') ? checkBox.data('value') : '';
            if (additionalFilterRowFunc) {
                additionalFilterRowFuncFinal = function (row, checkBoxValue) {
                    return (additionalFilterRowFunc(row) && OldHorizontalTableWidget.checkBoxFilter(row, checkBoxValue));
                };
            } else {
                additionalFilterRowFuncFinal = OldHorizontalTableWidget.checkBoxFilter;
            }
        }


        if (!additionalFilterRowFuncFinal && searchTerm.length < mL) {
            OldHorizontalTableWidget.clearFilter(tbody);
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
        tbody.closest('section').find('.widget-table-holder-results').html(tbody.find('tr:visible').length + ' results');
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