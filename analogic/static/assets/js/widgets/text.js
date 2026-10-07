/* global app, Utils, Widget, Widgets */

'use strict';

class TextWidget extends Widget {

    // Single source of truth for everything getHtml renders as classes/styles/attributes,
    // shared with updateHtml so the two cannot drift apart.
    buildParts(d, v) {
        let mainDivClass = [],
            mainDivStyle = this.getGeneralStyles(d).concat(this.getHtmlComponentStylesArray('main', d)),
            titleStyles = this.getHtmlComponentStylesArray('title', d),
            bodyStyles = this.getHtmlComponentStylesArray('body', d),
            innerStyles = this.getHtmlComponentStylesArray('inner', d),
            iconStyles = this.getHtmlComponentStylesArray('icon', d);

        (v.title !== false || v.editable) && mainDivClass.push('has-title');
        v.body && mainDivClass.push('has-body');
        v.backgroundColor && mainDivStyle.push(`background-color:${v.backgroundColor};`);

        v.titleAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleAlignment === 'start' || v.titleAlignment === 'end' ? `flex-${v.titleAlignment}` : v.titleAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);
        v.titleFontWeight && titleStyles.push(`font-weight:${v.titleFontWeight};`);
        v.titleBackgroundColor && titleStyles.push(`background-color:${v.titleBackgroundColor};`);
        v.titleCursor && titleStyles.push(`cursor:${v.titleCursor};`);
        v.editable && (v.title === false || v.title === '') && titleStyles.push('height: 20px;');

        v.bodyAlignment && bodyStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.bodyAlignment === 'start' || v.bodyAlignment === 'end' ? `flex-${v.bodyAlignment}` : v.bodyAlignment};`);
        v.bodyFontColor && bodyStyles.push(`color:${v.bodyFontColor};`);
        v.bodyFontSize && bodyStyles.push(`font-size:${v.bodyFontSize}px;`);
        v.bodyFontWeight && bodyStyles.push(`font-weight:${v.bodyFontWeight};`);
        v.bodyBackgroundColor && bodyStyles.push(`background-color:${v.bodyBackgroundColor};`);
        v.bodyCursor && bodyStyles.push(`cursor:${v.bodyCursor};`);

        v.iconWidth && iconStyles.push('width:', v.iconWidth, 'px;');
        v.iconHeight && iconStyles.push('height:', v.iconHeight, 'px;');
        v.iconColor && iconStyles.push('color:', v.iconColor, ';');
        v.iconPosition === 'left' ? mainDivClass.push('pos-icon-left') : mainDivClass.push('pos-icon-right');

        v.innerWidth && innerStyles.push('width:', Widget.getPercentOrPixel(v.innerWidth), ';');
        v.innerHeight && innerStyles.push('height:', Widget.getPercentOrPixel(v.innerHeight), ';');
        v.innerCursor && innerStyles.push(`cursor:${v.innerCursor};`);

        return {
            mainDivClass: mainDivClass,
            mainDivStyle: mainDivStyle.join(''),
            titleStyles: titleStyles.join(''),
            bodyStyles: bodyStyles.join(''),
            innerStyles: innerStyles.join(''),
            iconStyles: iconStyles.join(''),
            iconAction: v.iconCustomEventName ? v.iconCustomEventName : 'perform',
            titleAttr: v.title && !v.tooltip ? Utils.htmlEncode(Utils.stripHtml(v.title)) : ''
        };
    }

    getHtml(widgets, d) {
        const o = this.options;
        const v = this.getParameters(d);

        this.setValues(v);

        const p = this.buildParts(d, v),
            hasIcon = !v.compactHtml || v.icon,
            hasTitle = !v.compactHtml || v.title !== false || v.editable,
            hasBody = !v.compactHtml || v.body;

        return `
<div class="ks-text ${p.mainDivClass.join(' ')} ks-text-${v.skin}" style="${p.mainDivStyle}">
    <div class="ks-text-inner" style="${p.innerStyles}" data-id="${o.id}" data-action="text_click" data-ordinal="${v.ordinal}">
        ${hasIcon ? this.getIconHtml(v, p) : ''}
        ${hasTitle ? this.getTitleHtml(v, p) : ''}
        ${hasBody ? this.getBodyHtml(v, p) : ''}
    </div>
</div>`;
    }

    getIconHtml(v, p) {
        return `<div class="ks-text-icon" data-id="${this.options.id}" data-action="${p.iconAction}" data-ordinal="${v.ordinal}"><span style="${p.iconStyles}" class="${v.icon}"></span></div>`;
    }

    getTitleHtml(v, p) {
        return `<div class="ks-text-title" data-performable="${v.performable ? '1' : '0'}" data-editable="${v.editable ? '1' : '0'}" title="${p.titleAttr}" data-ordinal="${v.ordinal}" style="${p.titleStyles}">${v.title !== false ? v.title : ''}</div>`;
    }

    getBodyHtml(v, p) {
        return `<div class="ks-text-body" style="${p.bodyStyles}">${v.body !== false ? v.body : ''}</div>`;
    }

    // With compactHtml the icon, title and body elements are only rendered when they have
    // something to show, so a later content update may need one that is not in the DOM yet.
    addMissingCompactElements(inner, v, p) {
        if (v.icon && !inner.children('.ks-text-icon').length) {
            inner.prepend(this.getIconHtml(v, p));
        }

        const body = inner.children('.ks-text-body');

        if ((v.title !== false || v.editable) && !inner.children('.ks-text-title').length) {
            const titleHtml = this.getTitleHtml(v, p);
            body.length ? body.before(titleHtml) : inner.append(titleHtml);
        }

        if (v.body && !body.length) {
            inner.append(this.getBodyHtml(v, p));
        }
    }

    setValues(v) {
        this.value = v.title;
        this.editable = v.editable;
        this.performable = v.performable;
        this.pasteDataByServerSide = v.pasteDataByServerSide;
        this.enableRightClick = v.enableRightClick;
    }

    reset() {
        delete this.value;
        delete this.editable;
        delete this.performable;
        delete this.pasteDataByServerSide;
        delete this.enableRightClick;
    }

    updateHtml(data) {
        const v = this.getParameters(data), section = this.getSection(), sectionElement = section[0],
            find = selector => $(sectionElement ? sectionElement.querySelector(selector) : null),
            mainDiv = section.children(), inner = find('.ks-text-inner');

        this.setValues(v);

        const p = this.buildParts(data, v);

        if (v.compactHtml) {
            this.addMissingCompactElements(inner, v, p);
        }

        const title = find('.ks-text-title'), body = find('.ks-text-body'), iconDiv = find('.ks-text-icon'),
            icon = find('.ks-text-icon span');

        //section
        if (v.applyMeasuresToSection) {
            Widget.setOrRemoveStyle(section, 'width', v.width ? Widget.getPercentOrPixel(v.width) : false);
            Widget.setOrRemoveStyle(section, 'height', v.height ? Widget.getPercentOrPixel(v.height) : false);
        }

        //main: style is derived purely from the parameters, so it is rewritten wholesale.
        //Classes are managed one by one, runtime ones (ks-on, ks-perform-edit) must survive.
        mainDiv.attr('style', p.mainDivStyle);
        mainDiv.removeClass((i, c) => (c.match(/(^|\s)ks-text-\S+/g) || []).join(' '));
        mainDiv.addClass('ks-text-' + v.skin);
        for (const c of ['has-title', 'has-body', 'pos-icon-left', 'pos-icon-right']) {
            Widget.addOrRemoveClass(mainDiv, c, p.mainDivClass.includes(c));
        }

        //inner
        inner.attr('style', p.innerStyles);
        inner.attr('data-ordinal', v.ordinal).data('ordinal', v.ordinal);

        //icon (attributes are mirrored into jQuery's data cache, which the event handlers read)
        iconDiv.attr('data-action', p.iconAction).data('action', p.iconAction);
        iconDiv.attr('data-ordinal', v.ordinal).data('ordinal', v.ordinal);
        icon.attr('class', v.icon).attr('style', p.iconStyles);

        //title
        title.attr('style', p.titleStyles);
        title.attr('data-editable', v.editable ? '1' : '0').data('editable', v.editable ? '1' : '0');
        title.attr('data-performable', v.performable ? '1' : '0').data('performable', v.performable ? '1' : '0');
        title.attr('data-ordinal', v.ordinal).data('ordinal', v.ordinal);
        TextWidget.setContent(title, v.title !== false ? v.title : '');
        title.attr('title', p.titleAttr);

        //body
        body.attr('style', p.bodyStyles);
        TextWidget.setContent(body, v.body !== false ? v.body : '');
    }

    // jQuery's html() is only needed for content with inline scripts, which innerHTML would not run.
    static setContent(element, content) {
        if (element[0] && !/<script/i.test(content)) {
            element[0].innerHTML = content;
        } else {
            element.html(content);
        }
    }

    getParameters(d) {
        return {
            applyMeasuresToSection: this.getRealValue('applyMeasuresToSection', d, false),
            backgroundColor: this.getRealValue('backgroundColor', d, false),
            body: this.getRealValue('body', d, false),
            bodyBackgroundColor: this.getRealValue('bodyBackgroundColor', d, false),
            bodyCursor: this.getRealValue('bodyCursor', d, false),
            bodyFontColor: this.getRealValue('bodyFontColor', d, false),
            bodyFontSize: this.getRealValue('bodyFontSize', d, false),
            bodyFontWeight: this.getRealValue('bodyFontWeight', d, false),
            bodyAlignment: this.getRealValue('bodyAlignment', d, false),
            compactHtml: this.getRealValue('compactHtml', d, app.textWidgetCompactHtml === true),
            enableRightClick: this.getRealValue('enableRightClick', d, false),
            editable: this.getRealValue('editable', d, false),
            icon: this.getRealValue('icon', d, false),
            iconColor: this.getRealValue('iconColor', d, false),
            iconCustomEventName: this.getRealValue('iconCustomEventName', d, false),
            iconHeight: this.getRealValue('iconHeight', d, false),
            iconPosition: this.getRealValue('iconPosition', d, 'right'),
            iconWidth: this.getRealValue('iconWidth', d, false),
            innerHeight: this.getRealValue('innerHeight', d, false),
            innerWidth: this.getRealValue('innerWidth', d, false),
            innerCursor: this.getRealValue('innerCursor', d, false),
            pasteDataByServerSide: this.getRealValue('pasteDataByServerSide', d, false),
            performable: this.getRealValue('performable', d, false),
            skin: this.getRealValue('skin', d, 'template1'),
            title: this.getRealValue('title', d, false),
            titleBackgroundColor: this.getRealValue('titleBackgroundColor', d, false),
            titleCursor: this.getRealValue('titleCursor', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleFontWeight: this.getRealValue('titleFontWeight', d, false),
            titleAlignment: this.getRealValue('titleAlignment', d, false),
            tooltip: this.getRealValue('tooltip', d, false),
            ordinal: typeof d.ordinal !== 'undefined' ? d.ordinal : '',
            height: this.getRealValue('height', d, false),
            width: this.getRealValue('width', d, false),
            marginTop: this.getRealValue('marginTop', d, false)
        };
    }

    // The handlers are delegated from the section and read the editable / performable /
    // enableRightClick state when the event fires. So they survive content updates that
    // add or replace the inner elements, and don't have to be rebound when the state changes.
    initEventHandlers() {
        const section = this.getSection();
        const amIOnGridTable = this.amIOnAGridTable();

        section.off('.textwidget');

        section.on('click.textwidget', '.ks-text-title', (e) => {
            const c = $(e.currentTarget);
            // A click inside the input of a title that is already being edited must not restart the edit.
            if ((this.editable || this.performable) && !c.find('.ks-text-title-input').length) {
                // The options are read here, not at bind time: a grid table cell replaces
                // them on every content update.
                TextWidget.startEdit(c, section, this.options, amIOnGridTable, this.pasteDataByServerSide);
            }
        });

        section.on('contextmenu.textwidget', '.ks-text-title', (e) => {
            const onEditableGridTableCell = amIOnGridTable && (this.editable || this.performable);
            if (!onEditableGridTableCell && !this.enableRightClick) {
                return;
            }
            const target = $(e.currentTarget).data('id', section.attr('id')).data('action', 'rightclick');
            Widget.doHandleSystemEvent(target, e);
            if (amIOnGridTable) {
                Widget.doHandleGridTableSystemEvent(target, e);
            }
            return false;
        });

        section.on('click.textwidget', '.ks-text-inner', (e) => {
            let s = $(e.currentTarget);
            Widget.doHandleSystemEvent(s, e);
            if (amIOnGridTable) {
                Widget.doHandleGridTableSystemEvent(s, e);
            }
        });

        section.on('click.textwidget', '.ks-text-icon', (e) => {
            let s = $(e.currentTarget), pDiv = s.closest('.ks-text');
            s.data('on', pDiv.hasClass('ks-perform-edit'));
            Widget.doHandleSystemEvent(s, e);

            if (amIOnGridTable) {
                Widget.doHandleGridTableSystemEvent(s, e);
            }
            pDiv.removeClass('ks-perform-edit');
        });
    }


    static getEditables(gridId) {
        return $('#' + gridId).find('.ks-text-title[data-editable=1]').filter(':visible').sort(function (a, b) {
            return ($(b).data('ordinal')) < ($(a).data('ordinal')) ? 1 : -1;
        });
    }

    static paste(r, f) {
        let c = r.find('.ks-text-title'), gridId = r.attr('id').split('_')[0];
        let editables = TextWidget.getEditables(gridId),
            j = TextWidget.getCurrentIndex(editables, c);
        if (j >= 0 && editables.length > 0) {
            navigator.clipboard.readText().then(text => TextWidget.pasteData2(text, editables, j, f)).catch(err => L('Read from clipboard failed: ', err));
        }
    }

    static pasteData2(text, editables, j, f) {
        let e, rows = text.trim().split('\n'), cells = [], i, k, s, r;
        if (rows.length === 0) {
            return;
        }

        let editableRows = TextWidget.createEditableRows(editables, j);
        for (i = 0; i < editableRows.length; ++i) {
            if (rows.length <= i) {
                break;
            }
            cells = rows[i].split('\t');
            let editableRow = editableRows[i], limit = Math.min(editableRow.length, cells.length);
            for (k = 0; k < limit; ++k) {
                if (!editableRow[k]) {
                    continue;
                }
                e = $(editableRow[k]);
                s = e.closest('section').attr('id');
                Widgets[s].value = Utils.escapeText(cells[k]);
                r = $('<div>').data('id', s).data('action', 'write').data('ordinal', e.data('ordinal'));
                Widget.doHandleSystemEvent(r, f);
                e.html(cells[k]);
            }
        }
    }

    static pasteData(text, editables, j, f, o, section) {
        let e, rows = text.trim().split('\n'), cells = [], i, k, s, r, sc, v, lastRow = false, lastCell = false;
        if (rows.length === 0) {
            return;
        }

        let editableRows = TextWidget.createEditableRows(editables, j);
        for (i = 0; i < editableRows.length; ++i) {
            lastRow = (rows.length - 1) === i;
            if (rows.length <= i) {
                break;
            }
            cells = rows[i].split('\t');
            lastCell = false;
            let editableRow = editableRows[i], limit = Math.min(editableRow.length, cells.length), lastEditableIndex = -1;
            if (lastRow) {
                for (let idx = limit - 1; idx >= 0 && lastEditableIndex === -1; --idx) {
                    if (editableRow[idx]) {
                        lastEditableIndex = idx;
                    }
                }
            }
            for (k = 0; k < limit; ++k) {
                if (!editableRow[k]) {
                    continue;
                }
                if (lastRow) {
                    lastCell = k === lastEditableIndex;
                }
                e = $(editableRow[k]);
                sc = e.closest('section');
                s = sc.attr('id');
                v = Utils.escapeText(cells[k]).replace('\\r', '');
                Widgets[s].value = v;
                r = $('<div>').data('id', s).data('action', lastCell ? 'pastelast' : 'paste').data('ordinal', e.data('ordinal')).data('value', v);
                let ic = sc.find('.ks-text-icon');
                if (ic.length && ic.find('span').attr('class') !== 'false') {
                    Widget.doHandleSystemEvent(ic, f);
                    Widget.doHandleGridTableSystemEvent(ic, f);
                }
                Widget.doHandleSystemEvent(r, f);
                Widget.doHandleGridTableSystemEvent(r, f);
                e.html(cells[k]);
            }
        }

        section.find('.ks-text').removeClass('ks-on');
    }

    static createEditableRows(editables, currentIndex) {
        if (!editables || !editables.length) {
            return [];
        }

        let j = currentIndex;
        if (j < 0) {
            j = editables.length - 1;
        }
        if (j >= editables.length) {
            return [];
        }

        const currentElement = editables.get(j);
        if (!currentElement) {
            return [];
        }

        const currentSectionId = $(currentElement).closest('section').attr('id');
        if (!currentSectionId) {
            return [];
        }

        const currentSectionParts = currentSectionId.split('_');
        if (currentSectionParts.length < 3) {
            return [];
        }

        const currentRowIndex = parseInt(currentSectionParts[1], 10);
        const currentColumnIndex = parseInt(currentSectionParts[2], 10);

        if (Number.isNaN(currentRowIndex) || Number.isNaN(currentColumnIndex)) {
            return [];
        }

        const rows = new Map();
        const orderedRowIndexes = [];

        editables.each((index, element) => {
            const section = $(element).closest('section');
            if (!section.length) {
                return;
            }
            const sectionId = section.attr('id');
            if (!sectionId) {
                return;
            }

            const parts = sectionId.split('_');
            if (parts.length < 3) {
                return;
            }

            const rowIndex = parseInt(parts[1], 10);
            const columnIndex = parseInt(parts[2], 10);

            if (Number.isNaN(rowIndex) || Number.isNaN(columnIndex)) {
                return;
            }

            if (!rows.has(rowIndex)) {
                rows.set(rowIndex, new Map());
                orderedRowIndexes.push(rowIndex);
            }

            rows.get(rowIndex).set(columnIndex, element);
        });

        orderedRowIndexes.sort((a, b) => a - b);

        const currentRowCells = rows.get(currentRowIndex);
        if (!currentRowCells) {
            return [];
        }

        let targetColumns = Array.from(currentRowCells.keys())
            .filter(columnIndex => columnIndex >= currentColumnIndex)
            .sort((a, b) => a - b);

        if (!targetColumns.length) {
            return [];
        }

        const expandedColumns = [];
        let lastColumn = null;

        targetColumns.forEach(columnIndex => {
            if (lastColumn !== null) {
                for (let gap = lastColumn + 1; gap < columnIndex; ++gap) {
                    expandedColumns.push(gap);
                }
            }

            expandedColumns.push(columnIndex);
            lastColumn = columnIndex;
        });

        targetColumns = expandedColumns;

        const result = [];

        orderedRowIndexes.forEach(rowIndex => {
            if (rowIndex < currentRowIndex) {
                return;
            }

            const rowCells = rows.get(rowIndex);
            if (!rowCells) {
                return;
            }

            // Preserve column alignment: include null placeholders when the target column isn't editable in this row.
            const row = targetColumns.map(columnIndex => rowCells.has(columnIndex) ? rowCells.get(columnIndex) : null);
            result.push(row);
        });

        return result;
    }

    static getCurrentIndex(editables, c) {
        let i = 0, j = -1;
        while (i < editables.length && j === -1) {
            if ($(editables[i]).data('ordinal') === c.data('ordinal')) {
                j = i;
            }
            ++i;
        }
        if ((j + 1) >= editables.length) {
            j = -1;
        }
        return j;
    }

    // Kept for application code that still calls them. The delegated handlers bound in
    // initEventHandlers follow the editable / performable / enableRightClick state on their own,
    // so there is nothing left to bind or rebind here.
    static addEdit(section, o, amIOnGridTable, pasteDataByServerSide) {
    }

    static addRightClick(section, amIOnGridTable) {
    }

    changeEvents(title, section, editable, performable, enableRightClick) {
    }

    static startEdit(c, section, o, amIOnGridTable, pasteDataByServerSide) {
        let ksText = section.find('.ks-text'), editable = c.data('editable') == 1,
            originalValue = c.text();
        ksText.addClass('ks-on').addClass('ks-perform-edit');
        c.html(`<input class="ks-text-title-input" data-id="${o.id}" data-action="write" data-ordinal="${c.data('ordinal')}" type="text"/>`).promise().then(() => {
            let r = c.find('.ks-text-title-input').val(originalValue).focus().select().on('focusout', f => {
                let val = Utils.escapeText(r.val());
                r.off('focusout').data('value', val);

                Widgets[r.data('id')].value = val;
                let ic = section.find('.ks-text-icon');
                if (ic.length && ic.find('span').attr('class') !== 'false' && originalValue !== val) {
                    ic.data('value', val);
                    let pDiv = ic.closest('.ks-text');
                    ic.data('on', pDiv.hasClass('ks-perform-edit'));
                    Widget.doHandleSystemEvent(ic, f);

                    if (amIOnGridTable) {
                        Widget.doHandleGridTableSystemEvent(ic, f);
                    }
                }
                if (editable && originalValue !== val) {
                    if (amIOnGridTable) {
                        Widget.doHandleGridTableSystemEvent(r, f);
                    }

                    Widget.doHandleSystemEvent(r, f);
                }

                c.html(r.val());
                ksText.removeClass('ks-on');
            });
            if (amIOnGridTable === true) {
                let gridId = r.data('id').split('_')[0];
                r.on('keydown', f => {
                    if (f.keyCode === 13) {
                        let val = Utils.escapeText(r.val());
                        r.off('focusout').data('value', val);
                        Widgets[r.data('id')].value = val;
                        if (editable && originalValue !== val) {
                            if (amIOnGridTable) {
                                Widget.doHandleGridTableSystemEvent(r, f);
                            }

                            Widget.doHandleSystemEvent(r, f);
                        }
                        c.html(r.val());
                        ksText.removeClass('ks-on');
                    }
                    if (f.keyCode === 39 || f.keyCode === 37) {
                        let editables = TextWidget.getEditables(gridId),
                            j = TextWidget.getCurrentIndex(editables, c), k = 0;

                        k = f.keyCode === 39 ? j + 1 : j === -1 ? editables.length - 1 : j - 1;

                        $(editables[k]).click();
                    }

                    if (f.keyCode === 38 || f.keyCode === 40) {
                        let sgi = r.data('id').split('_'), gridId = sgi[0], actRow = parseInt(sgi[1]),
                            row = f.keyCode === 38 ? actRow === 0 ? -1 : actRow - 1 : actRow + 1, column = sgi[2],
                            t;
                        if (row === -1) {
                            return;
                        }
                        let nextElement = $('#' + gridId + '_' + row + '_' + column);
                        if (nextElement.length && nextElement.is(':visible')) {
                            t = nextElement.find('.ks-text-title');
                            if (t.data('editable') == 1) {
                                t.click();
                            }
                        }
                    }

                    if (f.ctrlKey && f.keyCode === 86) {
                        if (pasteDataByServerSide) {
                            navigator.clipboard.readText().then(text => {
                                let ppId = section.attr('id'), pp = $('<div>').data('id', ppId).data('action', 'pasteDataByServerSide').data('value', text);
                                if (amIOnGridTable) {
                                    Widget.doHandleGridTableSystemEvent(pp, f);
                                }

                                Widget.doHandleSystemEvent(pp, f);
                            }).catch(err => L('Read from clipboard failed: ', err));
                            c.html('pasting..');
                            ksText.removeClass('ks-on');
                            return false;
                        }
                        let editables = TextWidget.getEditables(gridId),
                            j = TextWidget.getCurrentIndex(editables, c);
                        if (j >= 0 && editables.length > 0) {
                            navigator.clipboard.readText().then(text => TextWidget.pasteData(text, editables, j, f, o, section)).catch(err => L('Read from clipboard failed: ', err));
                        }
                    }
                });
            }

        });
    }
}
;