/* global Doc, El, Render, Widget, Widgets, Utils, app, Node, _ */

'use strict';
class ScrollTableWidget extends Widget {

    constructor(options) {
        super(options);

        this.isMobile = Utils.isMobile() || app.isTouched;
        this.removableClasses = 'ks-cell-selected ks-editing ks-cell-active b s cell-range-top-left-corner cell-range-top-right-corner cell-range-top cell-range-bottom-left-corner cell-range-bottom-right-corner cell-range-bottom cell-range-left cell-range-right';
    }

    getHtml(widgets, data, withState) {
        this.value = this.value ? this.value : {};
        this.options.headerWidth = this.options.headerWidth || 160;

        let e, childId, parent, i, j, parentsByChildren = {}, parentIdsByRowIds = {}, hiddenRowIds = [], label, labelId, isExpanded;

        const o = this.options, rowHeaderData = data[0], colHeaderRowData = data[1], cellData = data[2], colHeaderRowCount = colHeaderRowData.length,
        rowHeaderCount = rowHeaderData.length, cellCount = cellData.length, scrollTableWindowHtml = this.getScrollTableWindowHtml(rowHeaderData),
        ribbons = (o.ribbons || []), ribbonsCount = Math.min(ribbons.length, ((rowHeaderData[0] || {}).ribbons || []).length), defaultFormat = o.format,
        colHeaderHtml = ['<thead>', '<tr><td style="height: 16px;"><\/td><\/tr>'.repeat(ribbonsCount), '<tr><th id="debug" style="color: black; min-width: ', o.headerWidth, 'px !important;" class="ks-scrolltable-name-col">&nbsp;<\/th><\/tr><\/thead><tbody style="height: ', o.height, 'px;" class="ks-scrolltable-header-col-body">'],
        selectedCellState = (withState && ScrollTableWidget.selectedCellStates) ? (ScrollTableWidget.selectedCellStates[o.id] || {}) : {}, cellFormatsByOrdinals = this.getCellFormatsByOrdinals(data[3]);

        for (i = 0; i < colHeaderRowCount; ++i) {
            e = colHeaderRowData[i];
            label = e.label;
            labelId = e.labelId;
            isExpanded = e.expanded || labelId === selectedCellState.parent;

            for (childId of e.childrenIds) {
                parentsByChildren[childId] = {id: labelId, label: label, isExpanded: isExpanded};
            }

            parent = parentsByChildren[labelId];
            if (parent) {
                parentIdsByRowIds[i] = parent.id;
            }

            isExpanded = isExpanded || (parent && parent.isExpanded);

            j = (parent ? 43 : 29) + (e.childrenIds.length ? 20 : 0);

            colHeaderHtml.push('<tr', (parent ? (isExpanded ? '' : ' style="display: none;"') + (' class="inner-row" data-parent="' + parent.id + '"') : ''), '>', '<td style="min-width: ' + o.headerWidth + 'px !important;" class="', Utils.parseFormatStringToCSSClasses(e.format || defaultFormat), ' ks-scrolltable-name-col ', (isExpanded ? 'opened' : ''), '"><span data-label="', label, '" class="ellipsis" style="display: inline-block; width: ', (o.headerWidth - j), 'px;">', label, ' <\/span><span data-value="', labelId, '" class="icon-comment-', (e.comment ? 'on' : 'off'), '"><\/span>', (e.expandable ? '<span class="open-arrow"><\/span>' : ''), '<\/td><\/tr>');

            if (parent && !isExpanded) {
                hiddenRowIds.push(i);
            }
        }

        const ribbonsHtml = [], ribbonOffsets = Array.from({length: ribbonsCount}, function () {
            return {leftOffset: 0, rightOffset: 0, wasTrue: false};
        });

        for (i = 0; i < rowHeaderCount; ++i) {
            e = rowHeaderData[i].ribbons;
            for (j = 0; j < ribbonsCount; ++j) {
                if (e[j]) {
                    ribbonOffsets[j].wasTrue = true;
                } else {
                    if (ribbonOffsets[j].wasTrue) {
                        ++ribbonOffsets[j].rightOffset;
                    } else {
                        ++ribbonOffsets[j].leftOffset;
                    }
                }
            }
        }

        for (i = 0; i < ribbonsCount; ++i) {
            e = ribbonOffsets[i];
            j = ribbons[i];
            ribbonsHtml.push('<tr><td colspan="', e.leftOffset, '"></td><td colspan="', rowHeaderCount - e.rightOffset - e.leftOffset, '"><div class="product-table-bar" style="color:', j.color, '; background-color:', j.backGroundColor, ';">', j.name, '<\/div><\/td><\/tr>');
        }

        const rowHeaderHtml = ['<tr>'];

        for (i of rowHeaderData) {
            rowHeaderHtml.push('<th>', i.value, '<\/th>');
        }

        rowHeaderHtml.push('<\/tr>');


        const cellHtml = [];

        for (i = 0, j = 0; i < cellCount; ++i) {
            e = cellData[i];

            if (0 === i % rowHeaderCount) {
                parent = parentIdsByRowIds[j];
                cellHtml.push('<tr', (parent ? (hiddenRowIds.includes(j) ? ' style="display: none;"' : '') + (' data-parent="' + parent + '"') : ''), '>');
            }

            cellHtml.push('<td class="', Utils.parseFormatStringToCSSClasses(cellFormatsByOrdinals[e.ordinal] || defaultFormat), (e.disabled ? ' disabled' : ''), '" data-ordinal="', e.ordinal, '" data-value="', e.value, '"><span>', e.value, '<\/span><\/td>');

            if (0 === (i + 1) % rowHeaderCount) {
                cellHtml.push('</tr>');
                ++j;
            }
        }

        e = this.getGeneralStyles(data);

        for (i = 0; i < e.length; ++i) {
            if ('height:' === e[i]) {
                e[i] = e[i + 1] = '';

                break;
            }
        }

        return `
<div style="${e.join('')}">${scrollTableWindowHtml}
<div class="row">
    <div class="col">
        <div class="ks-scrolltable-holder">
            <div class="ks-scrolltable-holder-inner" style="padding-left: ${o.headerWidth + 1}px;">
                <table class="ks-scrolltable-table ks-scrolltable-table-names">${colHeaderHtml.join('')}</table>
                <table class="ks-scrolltable-table">
                    <thead class="ks-scrolltable-header">${ribbonsHtml.join('') + rowHeaderHtml.join('')}</thead>
                    <tbody style="height: ${o.height}px;" class="ks-scrolltable-body noselect">${cellHtml.join('')}</tbody>
                </table>
            </div>
        </div>
    </div>
</div></div>`;
    }

    getCellFormatsByOrdinals(d) {
        const o = {};

        for (let e of d || []) {
            o[e.ordinal] = e.value;
        }

        return o;
    }

    getScrollTableWindowHtml(d) {
        let o, h = ['<div data-id="', this.options.id, '" class="ks-scrolltable noselect"><div class="col"><div class="ks-scrolltable-pager" style="margin-left: ', this.options.headerWidth + 1, 'px;">'];

        for (o of d) {
            h.push('<div class="ks-scrolltable-pager-item">', o.label, '<\/div>');
        }

        h.push('<div class="ks-scrolltable-pager-range"><\/div><\/div><\/div><\/div>');

        return h.join('');
    }

    initEventHandlers(withState) {

        const section = this.getSection();

        ScrollTableWidget.initScrollTableWindowEventHandlers(section);

        this.initScrollTableEventHandlers(section, withState);

        if (!ScrollTableWidget.isDocEventsHaveBeenBound) {
            $(window).on('resize', () => ScrollTableWidget.initScrollTableWindowEventHandlers(null, true));

            Doc.on('mouseup touchend', () => ScrollTableWidget.clientX = null);

            ScrollTableWidget.isDocEventsHaveBeenBound = true;
        }
    }

    static initScrollTableWindowEventHandlers(section) {
        (section || Doc).find('.ks-scrolltable').each((i, e) => ScrollTableWidget.initScrollTableWindowEventHandlersForHolder($(e)));
    }

    static initScrollTableWindowEventHandlersForHolder(scrollTableWindowHolder) {
        const
        scrollOffset = 15, id = scrollTableWindowHolder.data('id'),
        dayWindow = scrollTableWindowHolder.find('.ks-scrolltable-pager-range'),
        dayWindowHolder = dayWindow.closest('.ks-scrolltable-pager'), dayWindowHolderWidth = dayWindowHolder.outerWidth(),
        days = dayWindowHolder.children('.ks-scrolltable-pager-item'),
        daysNum = days.length,
        dayWidth = dayWindowHolderWidth / daysNum,
        sch = dayWindow.closest('section').find('.ks-scrolltable-holder'),
        tableHolder = sch.find('.ks-scrolltable-holder-inner').on('scrollchanged', adjustScrollWindowToTableHolder),
        scrollTable = tableHolder.find('.ks-scrolltable-body'),
        colHeaderTable = tableHolder.children('.ks-scrolltable-table-names'),
        cellTableWidth = tableHolder.outerWidth() - colHeaderTable.outerWidth(),
        cellWidth = colHeaderTable.next().children('tbody').children().eq(0).children().eq(0).outerWidth(),
        dayWindowWidth = dayWidth * cellTableWidth / cellWidth,
        dayWindowMaxRightOffset = dayWindowHolderWidth - dayWindowWidth - scrollOffset;

        dayWindow.width(dayWindowWidth).css('left', -scrollOffset);

        if (daysNum > 1) {
            dayWindow.off().on('mousedown touchstart', e => {
                e.stopImmediatePropagation();

                ScrollTableWidget.clientX = getClientX(e);
                dayWindow.left = parseInt(dayWindow.css('left'));

                return false;
            }).on('mousemove touchmove', e => {
                e.stopImmediatePropagation();

                if (ScrollTableWidget.clientX) {
                    const newPos = dayWindow.left + getClientX(e) - ScrollTableWidget.clientX;
                    const newLeft = newPos < -scrollOffset ? -scrollOffset : (newPos > dayWindowMaxRightOffset ? dayWindowMaxRightOffset : newPos);

                    dayWindow.css('left', newLeft);

                    scrollTableWindowDragged(newLeft + scrollOffset);
                }

                return false;
            });

            adjustScrollWindowToTableHolder();
        }

        function getClientX(e) {
            return e.touches ? e.touches[0].clientX : e.originalEvent.clientX;
        }

        function scrollTableWindowDragged(left) {
            const d = left / dayWidth, e = (left + dayWindowWidth) / dayWidth;

            tableHolder.scrollLeft(d * cellWidth);
            days.removeClass('ks-visible').slice(Math.round(d), Math.round(e)).addClass('ks-visible');

            scrollTable.trigger('scroll');

            sch.toggleClass('end', parseInt(dayWindow.css('right')) < 25);
        }

        function adjustScrollWindowToTableHolder() {
            const left = tableHolder.scrollLeft() / cellWidth, d = left * dayWidth, e = (d + dayWindowWidth) / dayWidth;
            dayWindow.css('left', d - scrollOffset);

            days.removeClass('ks-visible').slice(Math.round(left), Math.round(e)).addClass('ks-visible');

            sch.toggleClass('end', parseInt(dayWindow.css('right')) < 25);
        }
    }

    initScrollTableEventHandlers(section, withState) {
        const instance = this, o = instance.options, scrollTable = section.find('.ks-scrolltable-body'), rows = scrollTable.children(), cells = rows.children(), widgetId = section.prop('id'), tableHolder = section.find('.ks-scrolltable-holder-inner'), scrollTableHeaderColBody = section.find('.ks-scrolltable-header-col-body'), scrollTableHeaderColRows = scrollTableHeaderColBody.children(), id = section.prop('id');

        let selectedCell = $(), hoveredCellOrdinal, contextMenu, cellsToSave;

        const focusInput = $('<div class="ks-cell-selected-control">...<input id="focusInput" style="width: 0; height: 0; opacity: 0;" type="text"><\/div>').on('mousedown touchstart', e => {
            Utils.stopEvent(e);

            const btn = $(e.currentTarget), cell = btn.parent().removeClass('ks-cell-selected').addClass('ks-cell-active s');

            btn.detach();

            addCloseBtnToCell(cell);
            addCopyPasteButtonsToCell(cell);

            return false;
        });

        const copyPasteBtns = $('<div class="ks-cell-active-controls noselect"><div class="ks-cell-active-control ks-cell-active-copy">Copy<\/div><div class="ks-cell-active-control ks-cell-active-paste">Paste<\/div><div class="ks-cell-active-control ks-cell-active-more">...<\/div><\/div>');
        const contextMenuBtn = copyPasteBtns.find('.ks-cell-active-more');

        copyPasteBtns.on('mousedown dblclick touchstart', '>', e => {
            Utils.stopEvent(e);

            const btn = $(e.currentTarget), i = btn.index();

            cellsToSave = null;

            if (!i) {
                copyCellsDataToClipBoard();
            } else if (1 === i) {
                navigator.clipboard.readText().then(text => pasteClipBoardDataIntoSelectedCells(text)).catch(err => L('Read from clipboard failed: ', err));
            } else {
                if (contextMenu.is(':visible')) {
                    contextMenu.detach();
                } else {
                    showContextMenu();
                }
            }

            return false;
        });

        const closeBtn = $('<div class="ks-cell-active-close"><span class="icon-add"><\/span><\/div>').on('mousedown', e => {
            Utils.stopEvent(e);

            selectFirstSelectedCell();

            return false;
        });

        const confirmCancelBtns = $('<div class="ks-cell-active-controls ks-control-finalize"><div class="ks-cell-active-control ks-cell-active-confirm">Confirm<\/div><div class="ks-cell-active-control ks-cell-active-cancel">Cancel<\/div><\/div>');

        confirmCancelBtns.on('mousedown', '.ks-cell-active-confirm', e => {
            Utils.stopEvent(e);

            saveCellsData(cellsToSave || cells.filter('.s'), e);

            cellsToSave = null;

            return false;
        }).on('mousedown', '.ks-cell-active-cancel', e => {
            Utils.stopEvent(e);

            selectFirstSelectedCell();

            return false;
        });

        if (!$('#stContextMenu').length) {
            contextMenu = $('<div id="stContextMenu" class="ks-cell-active-more-controls noselect"><div class="ks-cell-active-more-control">Fill Row to the Right<\/div><div class="ks-cell-active-more-control">Fill Row to the Left<\/div><div class="ks-cell-active-more-control">Fill Selected Area<\/div><div class="ks-cell-active-more-control">Clear Row to the Right<\/div><div class="ks-cell-active-more-control">Clear Row to the Left<\/div><div class="ks-cell-active-more-control">Clear Selected Area<\/div><\/div>');
            contextMenu.on('mousedown', '.ks-cell-active-more-control', contextMenuItemClicked);
        }

        ScrollTableWidget.selectedCellStates = withState ? (ScrollTableWidget.selectedCellStates || {}) : {};

        if (!ScrollTableWidget.loupe) {
            ScrollTableWidget.loupe = $('<div class="widget-loupe" style="position: absolute; display: none;"><\/div>').prependTo(El.body);
            ScrollTableWidget.mobileLoupe = $('<div class="widget-loupe mobile-control"><span><\/span><span style="display: block;" class="icon-tooltip-arrow"><\/span><\/div>');
        }

        section.find('.ks-scrolltable-table-names').on('touchstart click', '.icon-comment-on', e => {
            delete Widgets[widgetId].commentEdit;
            Widget.doHandleSystemEvent($(e.currentTarget).data({id: widgetId, action: 'commentShow'}));
            return false;
        }).on('touchstart click', '.icon-comment-off', e => {
            delete Widgets[widgetId].commentShow;
            Widget.doHandleSystemEvent($(e.currentTarget).data({id: widgetId, action: 'commentEdit'}));
            return false;
        }).on('touchstart click', '.open-arrow', e => {
            e.stopImmediatePropagation();

            e = $(e.currentTarget);
            const cell = e.closest('td').toggleClass('opened'), sel = '[data-parent="' + e.prev().data('value') + '"]';

            scrollTableHeaderColRows.filter(sel).toggle(100);
            rows.filter(sel).toggle(100).promise().then(() => {
                if (selectedCell.is(':visible')) {
                    selectedCell.trigger('mousedown');
                }
            });

            return false;
        }).on('mouseover', 'td', e => {
            if ($(e.target).is('td')) {
                return;
            }

            const ev = e.originalEvent;

            ScrollTableWidget.loupe.html($(e.currentTarget).children('span').eq(0).data('label')).css({left: ev.pageX, top: ev.pageY - ScrollTableWidget.loupe.outerHeight()}).show();

            return false;
        }).on('mouseout', () => {
            ScrollTableWidget.loupe.hide();
        }).on('touchstart', 'td', e => {
            e.stopImmediatePropagation();

            //const xPos = e.originalEvent.clientX;
            const xPos = e.touches[0].clientX;

            e = $(e.currentTarget);

            if (xPos > e.outerWidth() - 30) {
                e.children('.open-arrow').trigger('touchstart');
            } else {
                const left = e.parent().data('parent') ? 10 : 0;

                ScrollTableWidget.mobileLoupe.css('left', left).prependTo(e).show().children('span:first').html(e.children('span').eq(0).data('label'));
            }

            return false;
        }).on('click touchstart', '.icon-tooltip-arrow', e => {
            e.stopImmediatePropagation();

            $(e.currentTarget).parent().hide();

            return false;
        });

        scrollTable.on('mouseup touchend', 'td', e => {
            hoveredCellOrdinal = null;
        }).on('mousemove touchmove', 'td', e => {
            let cell;

            if (this.isMobile) {
                const t = e.touches[0];
                cell = $(document.elementFromPoint(t.clientX, t.clientY));
            } else if (1 !== e.originalEvent.buttons) {
                return false;
            } else {
                cell = $(e.currentTarget);
            }

            const ordinal = cell.data('ordinal');

            if (selectedCell.isActive && hoveredCellOrdinal !== ordinal) {
                hoveredCellOrdinal = ordinal;
                cell.x = cell.index();
                cell.y = cell.parent().index();
                selectCells(cell);

                return false;
            }

            return true;
        }).on('mousedown touchstart', 'td', (e, callback) => {
            undoLastPaste();

            contextMenu.detach();
            cellsToSave = null;

            selectedCell = $(e.currentTarget);

            selectedCell.x = selectedCell.index();
            selectedCell.y = selectedCell.parent().index();
            selectedCell.isActive = selectedCell.hasClass('ks-cell-active');

            if (selectedCell.isActive || selectedCell.hasClass('ks-editing')) {
                e.stopImmediatePropagation();

                return true;
            }

            callback = callback || $.Deferred().resolve().promise;

            const editedCell = this.isMobile ? cells.filter('.ks-editing') : null;

            cells.removeClass(instance.removableClasses).children('div').detach();

            selectedCell.toggleClass('b', 0 === selectedCell.y).addClass('ks-cell-selected');

            selectedCell.prepend(focusInput).promise().then(() => {
                if (this.isMobile) {
                    const rowParent = scrollTableHeaderColRows.eq(selectedCell.parent().index()).data('parent'), left = tableHolder.scrollLeft();
                    ScrollTableWidget.selectedCellStates[id] = {docTop: Doc.scrollTop(), top: scrollTable.scrollTop(), left: left, ordinal: selectedCell.data('ordinal'), parent: rowParent};
                    cancelCellEditing(editedCell);
                    editedCell.children('input').remove();
                    tableHolder.scrollLeft(left).trigger('scrollchanged');
                } else {
                    selectedCell.find('input').focus().promise().then(() => {
                        callback().promise().then(() => {
                            const rowParent = scrollTableHeaderColRows.eq(selectedCell.parent().index()).data('parent');
                            ScrollTableWidget.selectedCellStates[id] = {docTop: Doc.scrollTop(), top: scrollTable.scrollTop(), left: tableHolder.scrollLeft(), ordinal: selectedCell.data('ordinal'), parent: rowParent};
                        });
                    });
                }

                scrollTable.scrollLeft(0);
            });

            return this.isMobile;
        }).on('doubletap', 'td', e => {
            $(e.currentTarget).trigger('dblclick');

            return false;
        }).on('dblclick', 'td', e => {
            Utils.stopEvent(e);

            const cell = $(e.currentTarget), value = getCellValue(cell);

            if (cell.hasClass('disabled') || cell.hasClass('ks-editing')) {
                return false;
            }

            focusInput.detach();
            cell.addClass('ks-editing').data('value', value).html('<input type="text" class="ks-cell-widget-input" value="' + value + '">').promise().done(() => {
                const c = cell.children('input').on('select click dblclick', false).on('keydown', e => {
                    if (9 === e.keyCode) {
                        return false;
                    }
                }).focus();
                c[0].setSelectionRange(0, c.val().length);
            });

            return false;
        }).on('focusout blur keydown', 'input', e => {
            e.stopImmediatePropagation();

            const input = $(e.target), cell = input.closest('td'), k = e.keyCode;

            if ('focusInput' === input.prop('id')) {
                return navigateInCells(k, cell, e.ctrlKey);
            } else if (k) {
                if (13 === k) {
                    save(e);
                } else if (27 === k) {
                    cancelCellEditing(cell, true);
                } else {
                    return true;
                }
            } else {
                cancelCellEditing(cell);
            }

            //Essentially, when a node is removed from the DOM tree, it fires a blur event (and before a focusout event too).
            //So, when you call removeChild, the blur event is fired again, but this time input still has its parentNode defined,
            //but input isn't among its parent's children anymore! (Yes, read this twice. Or more.)
            try {
                input.remove();
            } catch (ex) {

            }

            return false;

            function navigateInCells(k, cell, isCtrl) {
                if (37 === k) {
                    k = isCtrl ? cell.prevAll() : cell.prev();
                    if (k.length) {
                        cell = k.last();
                        cell.trigger('mousedown');
                        if (cell.position().left < o.headerWidth) {
                            tableHolder.scrollLeft(tableHolder.scrollLeft() - 2 * k.length * cell.width()).trigger('scrollchanged');
                        }
                    }
                } else if (38 === k) {
                    k = cell.closest('tr');

                    if (isCtrl) {
                        k = k.prevAll(':visible').last();
                    } else {
                        const prevTrs = k.prevUntil(':visible');

                        k = prevTrs.length ? prevTrs.last().prev() : k.prev();
                    }

                    if (k.length) {
                        k.children().eq(cell.index()).trigger('mousedown');
                    }
                } else if (39 === k || 9 === k) {
                    k = isCtrl ? cell.nextAll().last() : cell.next();
                    if (k.length) {
                        k.trigger('mousedown', () => tableHolder.trigger('scrollchanged'));
                    }
                } else if (40 === k) {
                    k = cell.closest('tr');

                    if (isCtrl) {
                        k = k.nextAll(':visible').last();
                    } else {
                        const nextTrs = k.nextUntil(':visible');

                        k = nextTrs.length ? nextTrs.last().next() : k.next();
                    }

                    if (k.length) {
                        k.children().eq(cell.index()).trigger('mousedown');
                    }
                } else if (13 === k) {
                    cell.trigger('dblclick');
                } else {
                    return true;
                }

                return false;
            }

            function save(e) {
                const newVal = Utils.convertValueToPost(input.val().trim());

                cell.data({action: 'cellEdit', value: newVal, id: widgetId});
                setCellsValue(cell, newVal).removeClass('ks-editing');

                Widget.doHandleSystemEvent(cell, e);
            }
        }).on('scroll', e => {
            e.stopImmediatePropagation();

            const t = scrollTable.scrollTop();

            scrollTableHeaderColBody.scrollTop(t);

            if (contextMenu.is(':visible')) {
                setTimeout(showContextMenu, 1);
            }

            return false;
        });

        const showContextMenu = _.throttle(() => {
            const p = contextMenuBtn.offset(), t = p.top + 27, items = contextMenu.children().removeClass('disabled');

            //add disabled classes!

            El.body.prepend(contextMenu.css({top: t, left: p.left - 33}));
        }, 10);

        function contextMenuItemClicked(e) {
            const menuIdx = $(e.currentTarget).index();
            const selectedCells = cells.filter('.s'), selectedCell = selectedCells.has('.ks-cell-active-controls');

            let cell, lastRowIndex = -1, i, len = selectedCells.length, rowIndex, value, affectedCellsInOneRow;

            cellsToSave = $();

            for (i = 0; i < len; ++i) {
                cell = selectedCells.eq(i);
                rowIndex = cell.parent().index();

                if (rowIndex !== lastRowIndex) {
                    value = menuIdx < 3 ? Utils.convertValueToPost(getCellValue(cell)) : 0;

                    if (0 === menuIdx) {
                        affectedCellsInOneRow = cell.nextAll(':not(.disabled)');
                    } else if (1 === menuIdx) {
                        affectedCellsInOneRow = cell.prevAll(':not(.disabled)');
                    } else if (2 === menuIdx) {
                        affectedCellsInOneRow = cell.nextAll('.s:not(.disabled)');
                    } else if (3 === menuIdx) {
                        affectedCellsInOneRow = cell.nextAll(':not(.disabled)').addBack(':not(.disabled)');
                    } else if (4 === menuIdx) {
                        affectedCellsInOneRow = cell.prevAll(':not(.disabled)').addBack(':not(.disabled)');
                    } else if (5 === menuIdx) {
                        affectedCellsInOneRow = cell.nextAll('.s:not(.disabled)').addBack(':not(.disabled)');
                    }

                    setCellsValue(affectedCellsInOneRow, value);

                    cellsToSave = cellsToSave.add(affectedCellsInOneRow);

                    lastRowIndex = rowIndex;
                }
            }

            if (cellsToSave.length) {
                addConfirmCancelButtonsToCell(selectedCell);
            }

            return false;
        }

        scrollTableHeaderColBody.on('wheel', (e) => {
            e = e.originalEvent.deltaY * 10;

            scrollTableHeaderColBody.scrollTop(scrollTableHeaderColBody.scrollTop() + e);

            scrollTable.scrollTop(scrollTable.scrollTop() + e);

            return false;
        });

        const lastSelectedCellState = ScrollTableWidget.selectedCellStates[id];
        if (withState && lastSelectedCellState) {
            setTimeout(() => scrollToLastSelectedCell(lastSelectedCellState), 300);
        }

        function scrollToLastSelectedCell(s) {
            Doc.scrollTop(s.docTop);
            scrollTable.scrollTop(s.top);
            cells.filter('[data-ordinal="' + s.ordinal + '"]').trigger('mousedown');
            tableHolder.scrollLeft(s.left).trigger('scrollchanged');
        }

        function cancelCellEditing(cell, triggerMousedown) {
            setCellsValue(cell, cell.data('value')).removeClass('ks-cell-selected ks-editing').promise().then(() => {
                if (triggerMousedown) {
                    cell.trigger('mousedown');
                }
            });
        }

        function selectFirstSelectedCell() {
            cells.filter('.s:first').removeClass('ks-cell-active').trigger('mousedown');
        }

        function selectCells(hoveredCell) {
            let fromX, fromY, toX, toY, i, rowCells, len, first, last;
            const x = selectedCell.x, y = selectedCell.y;

            if (x <= hoveredCell.x && y > hoveredCell.y) {
                fromX = x, fromY = hoveredCell.y, toX = hoveredCell.x, toY = y;
            } else if (x > hoveredCell.x && y <= hoveredCell.y) {
                fromX = hoveredCell.x, fromY = y, toX = x, toY = hoveredCell.y;
            } else if (x > hoveredCell.x && y > hoveredCell.y) {
                fromX = hoveredCell.x, fromY = hoveredCell.y, toX = x, toY = y;
            } else {
                fromX = x, fromY = y, toX = hoveredCell.x, toY = hoveredCell.y;
            }

            const isFirstRowSelected = (0 === fromY);

            cells.removeClass(instance.removableClasses);

            for (i = fromY; i <= toY; ++i) {
                rowCells = rows.eq(i).children().slice(fromX, toX + 1).addClass('s');
                len = rowCells.length - 1;
                first = rowCells.eq(0).addClass('cell-range-left');
                last = rowCells.eq(len).addClass('cell-range-right');

                if (i === fromY) {
                    first.addClass('cell-range-top-left-corner');
                    rowCells.slice(1, -1).addClass('cell-range-top');
                    if (!isFirstRowSelected) {
                        addCopyPasteButtonsToCell(first);
                        addCloseBtnToCell(last.addClass('cell-range-top-right-corner'));
                    }
                }
                if (i === toY) {
                    rowCells.slice(1, -1).addClass('cell-range-bottom');
                    if (isFirstRowSelected) {
                        addCopyPasteButtonsToCell(first.addClass('cell-range-bottom-left-corner b'));
                        addCloseBtnToCell(last.addClass('cell-range-bottom-right-corner b'));
                    } else {
                        first.addClass('cell-range-bottom-left-corner');
                        last.addClass('cell-range-bottom-right-corner');
                    }
                }
            }
        }

        function copyCellsDataToClipBoard() {
            const selectedCells = cells.filter('.s').removeClass('cell-copying'), len = selectedCells.length, t = Array(2 * len + 1);

            let cell = selectedCells.eq(0), i, lastRowIndex = cell.parent().index(), p;

            for (i = 1; i < len; ++i) {
                t.push(getCellValue(cell));

                cell = selectedCells.eq(i);

                p = cell.parent().index();

                if (lastRowIndex !== p) {
                    t.push('\n');
                    lastRowIndex = p;
                } else {
                    t.push('\t');
                }
            }

            t.push(getCellValue(cell));

            navigator.clipboard.writeText(t.join('')).then().catch(err => L('Write to clipboard failed: ', err));
        }

        function pasteClipBoardDataIntoSelectedCells(text) {
            const rowsFromText = text.trim().split('\n'), rowsFromTextLen = rowsFromText.length, firstSelectedCell = cells.filter('.s:first');

            if (!rowsFromText.length || !firstSelectedCell.length) {
                return;
            }

            cells.removeClass(instance.removableClasses);

            const rowIndex = firstSelectedCell.parent().index(), colIndex = firstSelectedCell.index(), isFirstRowSelected = (0 === rowIndex);
            let i, cellsFromText, len, classes;

            for (i = 0; i < rowsFromTextLen; ++i) {
                cellsFromText = rowsFromText[i].split('\t'), len = cellsFromText.length;

                rows.eq(rowIndex + i).children().slice(colIndex, colIndex + len).each((j, cell) => {
                    cell = $(cell);

                    classes = ['s'];

                    if (0 === i) {
                        classes.push('cell-copying');
                        if (0 === j) {
                            classes.push('cell-range-top-left-corner');
                            if (!isFirstRowSelected) {
                                addConfirmCancelButtonsToCell(cell);
                            }
                        }
                        if (len - 1 === j) {
                            classes.push('cell-range-top-right-corner');
                            if (!isFirstRowSelected) {
                                addCloseBtnToCell(cell);
                            }
                        }
                        if (2 === classes.length) {
                            classes.push('cell-range-top');
                        }
                    }
                    if (rowsFromTextLen - 1 === i) {
                        classes.push('cell-copying');
                        if (0 === j) {
                            classes.push('cell-range-bottom-left-corner');
                            if (isFirstRowSelected) {
                                classes.push('b');
                                addConfirmCancelButtonsToCell(cell);
                            }
                        } else if (len - 1 === j) {
                            classes.push('cell-range-bottom-right-corner');
                            if (isFirstRowSelected) {
                                classes.push('b');
                                addCloseBtnToCell(cell);
                            }
                        } else {
                            classes.push('cell-range-bottom');
                        }
                    } else if (0 === j) {
                        classes.push('cell-range-left cell-copying');
                    } else if (len - 1 === j) {
                        classes.push('cell-range-right cell-copying');
                    }

                    cell.addClass(classes.join(' '));

                    setCellsValue(cell, Utils.convertValueToPost(cellsFromText[j].trim().replace(/[\r\n]+/gm, '')));
                });
            }
        }

        function saveCellsData(cellsToSave, event) {
            let d = [], c, i, len = cellsToSave.length;

            if (!len) {
                return;
            }

            for (i = 0; i < len; ++i) {
                c = cellsToSave.eq(i);
                d.push({ordinal: c.data('ordinal'), value: getCellValue(c)});
            }

            c.data({action: 'pasteCells', id: widgetId});
            Widgets[widgetId].pastedCellValues = d;

            Widget.doHandleSystemEvent(c, event);
        }

        function undoLastPaste() {
            if (!confirmCancelBtns.is(':visible')) {
                return;
            }

            resetCellsOriginalValues(cellsToSave || cells.filter('.s'));
        }

        function resetCellsOriginalValues(cellsToReset) {
            cellsToReset = cellsToReset || cells;

            let i, len = cellsToReset.length, cell;

            for (i = 0; i < len; ++i) {
                cell = cellsToReset.eq(i);
                setCellsValue(cell, cell.data('value'));
            }
        }

        function addCloseBtnToCell(cell) {
            cell.prepend(closeBtn);
        }

        function addCopyPasteButtonsToCell(cell) {
            cell.prepend(copyPasteBtns);
        }

        function addConfirmCancelButtonsToCell(cell) {
            copyPasteBtns.detach();
            contextMenu.detach();
            cell.prepend(confirmCancelBtns);
        }

        function getCellValue(cell) {
            return cell.children('span').html().trim().replace(/&nbsp;/g, ' ');
        }

        function setCellsValue(cells, value) {
            let i, span, len = cells.length, cell;

            for (i = 0; i < len; ++i) {
                cell = cells.eq(i);

                span = cell.children('span');

                if (!span.length) {
                    cell.prepend('<span>' + value + '<\/span>');
                } else {
                    span.html(value);
                }
            }

            return cells;
        }
    }
}
;