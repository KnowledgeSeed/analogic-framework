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
            // The edit input carries a jQuery focusout handler: empty() removes it first, otherwise
            // it fires while the node is being removed and rewrites the element in the middle of
            // the replacement (NotFoundError).
            element[0].firstElementChild && element[0].querySelector('.ks-text-title-input') && element.empty();
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
        navigator.clipboard.readText().then(text => TextWidget.pasteData2(text, r, f)).catch(err => L('Read from clipboard failed: ', err));
    }

    static pasteData2(text, section, f) {
        let t, s, r;
        for (t of TextWidget.getPasteTargets(section, TextWidget.parseClipboard(text))) {
            s = t.section.attr('id');
            Widgets[s].value = Utils.escapeText(t.value);
            r = $('<div>').data('id', s).data('action', 'write').data('ordinal', t.title.data('ordinal'));
            Widget.doHandleSystemEvent(r, f);
            t.title.html(t.value);
        }
    }

    static pasteData(text, f, o, section) {
        const targets = TextWidget.getPasteTargets(section, TextWidget.parseClipboard(text));
        let i, t, s, r, v, ic;

        for (i = 0; i < targets.length; ++i) {
            t = targets[i];
            s = t.section.attr('id');
            v = Utils.escapeText(t.value);
            Widgets[s].value = v;
            // pastelast goes to the last cell that is really written, so it is fired whenever anything was pasted.
            r = $('<div>').data('id', s).data('action', i === targets.length - 1 ? 'pastelast' : 'paste').data('ordinal', t.title.data('ordinal')).data('value', v);
            ic = t.section.find('.ks-text-icon');
            if (ic.length && ic.find('span').attr('class') !== 'false') {
                Widget.doHandleSystemEvent(ic, f);
                Widget.doHandleGridTableSystemEvent(ic, f);
            }
            Widget.doHandleSystemEvent(r, f);
            Widget.doHandleGridTableSystemEvent(r, f);
            t.title.html(t.value);
        }

        section.find('.ks-text').removeClass('ks-on');
    }

    // Only the closing line break is dropped: leading or inner empty cells have to keep their position.
    static parseClipboard(text) {
        if (typeof text !== 'string' || text === '') {
            return [];
        }
        return text.replace(/\r\n?/g, '\n').replace(/\n$/, '').split('\n').map(row => row.split('\t'));
    }

    // Maps the clipboard block onto the grid by position, starting from the cell in `startSection`:
    // clipboard cell (i, k) belongs to the i. visible row and k. visible column counted from the start cell.
    // Values that land on a non-editable cell (or outside of the table) are skipped, they never shift.
    static getPasteTargets(startSection, clipboardRows) {
        const idParts = (startSection.attr('id') || '').split('_'), gridId = idParts[0],
            startRow = parseInt(idParts[1], 10), startColumn = parseInt(idParts[2], 10),
            rows = new Set(), columns = new Set(), targets = [];

        if (idParts.length !== 3 || Number.isNaN(startRow) || Number.isNaN(startColumn) || !clipboardRows.length) {
            return targets;
        }

        $('#' + gridId).find(`section[id^="${gridId}_"]`).filter(':visible').each((index, element) => {
            const parts = element.id.split('_'), row = parseInt(parts[1], 10), column = parseInt(parts[2], 10);
            if (parts.length !== 3 || parts[0] !== gridId || Number.isNaN(row) || Number.isNaN(column)) {
                return;
            }
            row >= startRow && rows.add(row);
            column >= startColumn && columns.add(column);
        });

        const rowIndexes = Array.from(rows).sort((a, b) => a - b),
            columnIndexes = Array.from(columns).sort((a, b) => a - b);
        let i, k, section, title, value;

        for (i = 0; i < clipboardRows.length && i < rowIndexes.length; ++i) {
            for (k = 0; k < clipboardRows[i].length && k < columnIndexes.length; ++k) {
                section = $('#' + gridId + '_' + rowIndexes[i] + '_' + columnIndexes[k]);
                title = section.find('.ks-text-title[data-editable=1]').filter(':visible').first();
                if (title.length) {
                    // Empty cells of the pasted block are written as zeros.
                    value = clipboardRows[i][k].trim() === '' ? '0' : clipboardRows[i][k];
                    targets.push({section: section, title: title, value: value});
                }
            }
        }

        return targets;
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
                        navigator.clipboard.readText().then(text => TextWidget.pasteData(text, f, o, section)).catch(err => L('Read from clipboard failed: ', err));
                    }
                });
            }

        });
    }
}
;