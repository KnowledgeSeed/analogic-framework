/* global app, Utils, Widget, Widgets */

'use strict';

class TextWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
        const v = this.getParameters(d);

        this.setValues(v);

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

        return `
<div class="ks-text ${mainDivClass.join(' ')} ks-text-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-text-inner" style="${innerStyles.join('')}" data-id="${o.id}" data-action="text_click" data-ordinal="${v.ordinal}">
        <div class="ks-text-icon" data-id="${o.id}" data-action="${v.iconCustomEventName ? v.iconCustomEventName : 'perform'}" data-ordinal="${v.ordinal}"><span style="${iconStyles.join('')}" class="${v.icon}"></span></div>
        <div class="ks-text-title" data-performable="${v.performable ? '1' : '0'}" data-editable="${v.editable ? '1' : '0'}" title="${v.title && !v.tooltip ? Utils.htmlEncode(Utils.stripHtml(v.title)) : ''}" data-ordinal="${v.ordinal}" style="${titleStyles.join('')}">${v.title !== false ? v.title : ''}</div>
        <div class="ks-text-body" style="${bodyStyles.join('')}">${v.body !== false ? v.body : ''}</div>
    </div>
</div>`;
    }

    setValues(v) {
        this.value = v.title;
        this.editable = v.editable;
        this.performable = v.performable;
        this.pasteDataByServerSide = v.pasteDataByServerSide;
    }

    reset() {
        delete this.value;
        delete this.editable;
        delete this.performable;
        delete this.pasteDataByServerSide;
    }

    changeEvents(title, section, editable, performable) {
        title.unbind('contextmenu');
        title.off('click');
        if (editable || performable) {
            TextWidget.addEdit(section, this.options, this.amIOnAGridTable(), this.pasteDataByServerSide);
        }
    }

    updateHtml(data) {
        const v = this.getParameters(data), section = this.getSection(),
            title = section.find('.ks-text-title'), body = section.find('.ks-text-body'),
            mainDiv = section.children(), icon = section.find('.ks-text-icon span'),
            inner = section.find('.ks-text-inner');

        this.changeEvents(title, section, v.editable, v.performable);
        title.data('editable', v.editable ? '1' : '0');
        title.data('performable', v.performable ? '1' : '0');

        this.setValues(v);

        this.updateHtmlComponent('main', data, mainDiv);
        this.updateHtmlComponent('inner', data, inner);
        this.updateHtmlComponent('title', data, title);
        this.updateHtmlComponent('body', data, body);
        this.updateHtmlComponent('icon', data, icon);

        //section
        if (v.applyMeasuresToSection) {
            Widget.setOrRemoveStyle(section, 'width', v.width ? Widget.getPercentOrPixel(v.width) : false);
            Widget.setOrRemoveStyle(section, 'height', v.height ? Widget.getPercentOrPixel(v.height) : false);
        }

        //main
        if (v.backgroundColor !== false) {
            mainDiv.css('background-color', v.backgroundColor);
        }
        if (v.skin) {
            Widget.setSkin(mainDiv, 'ks-text-', v.skin);
        }
        Widget.setOrRemoveStyle(mainDiv, 'width', v.width ? Widget.getPercentOrPixel(v.width) : false);
        Widget.setOrRemoveStyle(mainDiv, 'height', v.height ? Widget.getPercentOrPixel(v.height) : false);
        Widget.setOrRemoveStyle(mainDiv, 'margin-top', v.marginTop ? Widget.getPercentOrPixel(v.marginTop) : false);

        //inner
        Widget.setOrRemoveStyle(inner, 'cursor', v.innerCursor);
        Widget.setOrRemoveStyle(inner, 'width', v.innerWidth ? Widget.getPercentOrPixel(v.innerWidth) : false);
        Widget.setOrRemoveStyle(inner, 'height', v.innerHeight ? Widget.getPercentOrPixel(v.innerHeight) : false);

        //title
        title.html(v.title !== false ? v.title : '');
        title.attr('title', v.title ? Utils.htmlEncode(Utils.stripHtml(v.title)) : '');
        if (v.title !== false) {
            mainDiv.addClass('has-title');
        }
        Widget.setOrRemoveStyle(title, 'color', v.titleFontColor);
        Widget.setOrRemoveStyle(title, 'cursor', v.titleCursor);

        //body
        body.html(v.body !== false ? v.body : '');
        if (v.body !== false) {
            mainDiv.addClass('has-body');
        }
        Widget.setOrRemoveStyle(body, 'color', v.bodyFontColor);

        //icon
        icon.attr('class', v.icon ? v.icon : '');
        if (v.iconColor) {
            icon.css('color', v.iconColor);
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

    initEventHandlers() {
        const section = this.getSection(), o = this.options;

        if (this.editable || this.performable) {
            TextWidget.addEdit(section, o, this.amIOnAGridTable(), this.pasteDataByServerSide);
        }

        section.find('.ks-text-inner').on('click', (e) => {
            let s = $(e.currentTarget);
            Widget.doHandleSystemEvent(s, e);
            if (this.amIOnAGridTable()) {
                Widget.doHandleGridTableSystemEvent(s, e);
            }
        });

        section.find('.ks-text-icon').on('click', (e) => {
            let s = $(e.currentTarget), pDiv = s.closest('.ks-text');
            s.data('on', pDiv.hasClass('ks-perform-edit'));
            Widget.doHandleSystemEvent(s, e);

            if (this.amIOnAGridTable()) {
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
            for (k = 0; k < editableRows[i].length; ++k) {
                if (k >= cells.length) {
                    break;
                }
                e = $(editableRows[i][k]);
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
            for (k = 0; k < editableRows[i].length; ++k) {
                if (lastRow) {
                    lastCell = k === (cells.length - 1);
                }
                if (k >= cells.length) {
                    break;
                }
                e = $(editableRows[i][k]);
                sc = e.closest('section');
                s = sc.attr('id');
                v = Utils.escapeText(cells[k]).replace('\\r', '');
                Widgets[s].value = v;
                r = $('<div>').data('id', s).data('action', lastCell ? 'pastelast' : 'paste').data('ordinal', e.data('ordinal')).data('value', v);
                let ic = sc.find('.ks-text-icon');
                if (ic.find('span').attr('class') !== 'false') {
                    Widget.doHandleSystemEvent(ic, f);
                    Widget.doHandleGridTableSystemEvent(ic, f);
                }
                Widget.doHandleSystemEvent(r, f);
                Widget.doHandleGridTableSystemEvent(r, f);
                e.html(cells[k]);
            }
        }

        section.find('.ks-text').removeClass('ks-on');
        TextWidget.addEdit(section, o, true, false);
    }

    static createEditableRows(editables, currentIndex) {
        let result = [], rowIndex = -1, sgi, row = [], a, j = currentIndex, i = j, colIndex = currentIndex, l = true,
            cl = 0;
        let ce = $(editables[j]).closest('section').attr('id').split('_'), cri = parseInt(ce[1]), cci = parseInt(ce[2]);
        while (i >= 0 && l === true) {
            sgi = $(editables[i]).closest('section').attr('id').split('_');
            a = parseInt(sgi[1]);
            if (a !== cri || i === 0) {
                colIndex = currentIndex - (i === 0 ? i : cl);
                l = false;
            }
            cl = i;
            --i;
        }
        while (j < editables.length) {
            sgi = $(editables[j]).closest('section').attr('id').split('_');
            a = parseInt(sgi[1]);
            if ((rowIndex !== a || j === editables.length - 1) && rowIndex !== -1) {
                if (rowIndex !== a) {
                    j = j + colIndex;
                }
                if (j === editables.length - 1) {
                    if (rowIndex !== a) {
                        result.push(row);
                        row = [];
                        row.push(editables[j]);
                        result.push(row);
                        break;
                    } else {
                        row.push(editables[j]);
                    }
                }
                result.push(row);
                row = [];
            }
            row.push(editables[j]);
            rowIndex = a;
            ++j;
        }
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

    static addEdit(section, o, amIOnGridTable, pasteDataByServerSide) {
        let textTitle = section.find('.ks-text-title');
        if (amIOnGridTable === true) {
            textTitle.bind('contextmenu', e => {
                let r = textTitle.data('id', section.attr('id')).data('action', 'rightclick');
                Widget.doHandleSystemEvent(textTitle, e);
                Widget.doHandleGridTableSystemEvent(textTitle, e);
                return false;
            });
        }
        textTitle.on('click', e => {
            let c = $(e.currentTarget), ksText = section.find('.ks-text'), editable = textTitle.data('editable') == 1,
                originalValue = c.text();
            c.off('click');
            ksText.addClass('ks-on').addClass('ks-perform-edit');
            c.html(`<input class="ks-text-title-input" data-id="${o.id}" data-action="write" data-ordinal="${c.data('ordinal')}" type="text" value="${originalValue}"/>`).promise().then(() => {
                let r = c.find('.ks-text-title-input').focus().select().on('focusout', f => {
                    let val = Utils.escapeText(r.val());
                    r.off('focusout').data('value', val);

                    Widgets[r.data('id')].value = val;
                    let ic = section.find('.ks-text-icon');
                    if (ic.find('span').attr('class') !== 'false' && originalValue !== val) {
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
                    TextWidget.addEdit(section, o, amIOnGridTable, pasteDataByServerSide);
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
                            TextWidget.addEdit(section, o, amIOnGridTable, pasteDataByServerSide);
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
                                TextWidget.addEdit(section, o, amIOnGridTable, pasteDataByServerSide);
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
        });
    }
}
;