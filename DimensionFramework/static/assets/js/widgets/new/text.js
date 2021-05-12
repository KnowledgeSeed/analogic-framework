/* global app, Utils, Widget, WidgetValue */

'use strict';

class TextWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
        const v = {
            body: this.getRealValue('body', d, false),
            bodyFontColor: this.getRealValue('bodyFontColor', d, false),
            bodyFontSize: this.getRealValue('bodyFontSize', d, false),
            bodyAlignment: this.getRealValue('bodyAlignment', d, false),
            draggable: this.getRealValue('draggable', d, false),
            editable: this.getRealValue('editable', d, false),
            icon: this.getRealValue('icon', d, false),
            iconColor: this.getRealValue('iconColor', d, false),
            iconHeight: this.getRealValue('iconHeight', d, false),
            iconPosition: this.getRealValue('iconPosition', d, 'right'),
            iconWidth: this.getRealValue('iconWidth', d, false),
            skin: this.getRealValue('skin', d, 'template1'),
            title: this.getRealValue('title', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleAlignment: this.getRealValue('titleAlignment', d, false),
            ordinal: typeof d.ordinal !== 'undefined' ? d.ordinal : '',
        };
        this.value = {value: v.title, editable: v.editable};

        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d), titleStyles = [], bodyStyles = [],
            iconStyles = [];

        (v.title || v.editable) && mainDivClass.push('has-title');
        v.body && mainDivClass.push('has-body');

        v.titleAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleAlignment === 'start' || v.titleAlignment === 'end' ? `flex-${v.titleAlignment}` : v.titleAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);
        v.editable && (v.title === false || v.title === '') && titleStyles.push('height: 20px;');

        v.bodyAlignment && bodyStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.bodyAlignment === 'start' || v.bodyAlignment === 'end' ? `flex-${v.bodyAlignment}` : v.bodyAlignment};`);
        v.bodyFontColor && bodyStyles.push(`color:${v.bodyFontColor};`);
        v.bodyFontSize && bodyStyles.push(`font-size:${v.bodyFontSize}px;`);

        v.iconWidth && iconStyles.push('width:', v.iconWidth, 'px;');
        v.iconHeight && iconStyles.push('height:', v.iconHeight, 'px;');
        v.iconColor && iconStyles.push('color:', v.iconColor, ';');
        v.iconPosition === 'left' ? mainDivClass.push('pos-icon-left') : mainDivClass.push('pos-icon-right');

        return `
<div class="ks-text ${mainDivClass.join(' ')} ks-text-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-text-inner">
        ${v.icon !== false ? `<div class="ks-text-icon" data-id="${o.id}" data-action="perform" data-ordinal="${v.ordinal}"><span class="${v.icon}"></span></div>` : ''}
        <div class="ks-text-title" data-editable="${v.editable ? '1' : '0'}" data-ordinal="${v.ordinal}" style="${titleStyles.join('')}">${v.title ? v.title : ''}</div>
        <div class="ks-text-separator"></div>
        <div class="ks-text-body" style="${bodyStyles.join('')}">${v.body ? v.body : ''}</div>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        const o = this.options;
        if (o.draggable === true) {
            section.draggable({revert: "invalid"});
        }

        if (this.value.editable) {
            TextWidget.addEdit(section, o, this.amIOnAGridTable());
        }

        section.find('.ks-text-icon').on('click', (e) => {
            let s = $(e.currentTarget);

            Widget.doHandleSystemEvent(s, e);

            if (this.amIOnAGridTable()) {
                Widget.doHandleGridTableSystemEvent(s, e);
            }
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
                WidgetValue[s] = {value: Utils.escapeText(cells[k])};
                r = $('<div>').data('id', s).data('action', 'write').data('ordinal', e.data('ordinal'));
                Widget.doHandleSystemEvent(r, f);
                e.html(cells[k]);
            }
        }
    }

    static pasteData(text, editables, j, f, o, section) {
        let e, rows = text.trim().split('\n'), cells = [], i, k, s, r, sc;
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
                sc = e.closest('section');
                s = sc.attr('id');
                WidgetValue[s] = {value: Utils.escapeText(cells[k])};
                r = $('<div>').data('id', s).data('action', 'write').data('ordinal', e.data('ordinal'));
                let ic = sc.find('.ks-text-icon');
                if (ic.is(':visible')) {
                    Widget.doHandleSystemEvent(ic, f);
                    Widget.doHandleGridTableSystemEvent(ic, f);
                }
                Widget.doHandleSystemEvent(r, f);
                Widget.doHandleGridTableSystemEvent(r, f);
                e.html(cells[k]);
            }
        }
        section.find('.ks-text').removeClass('ks-on');
        TextWidget.addEdit(section, o, true);
    }

    static createEditableRows(editables, j) {
        let result = [], rowIndex = -1, sgi, row = [], a;
        while (j < editables.length) {
            sgi = $(editables[j]).closest('section').attr('id').split('_');
            a = parseInt(sgi[1]);
            if ((rowIndex !== a || j === editables.length - 1) && rowIndex !== -1) {
                if (j === editables.length - 1) {
                    row.push(editables[j]);
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

    static addEdit(section, o, amIOnGridTable) {
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
            let c = $(e.currentTarget), ksText = section.find('.ks-text');
            c.off('click');
            ksText.addClass('ks-on');
            c.html(`<input class="ks-text-title-input" data-id="${o.id}" data-action="write" data-ordinal="${c.data('ordinal')}" type="text" value="${c.text()}"/>`).promise().then(() => {
                let r = c.find('.ks-text-title-input').focus().select().on('focusout', f => {
                    r.off('focusout').data('value', Utils.escapeText(r.val()));

                    WidgetValue[r.data('id')] = {value: Utils.escapeText(r.val())};
                    let ic = section.find('.ks-text-icon');
                    if (ic.is(':visible')) {
                        Widget.doHandleSystemEvent(ic, f);

                        if (amIOnGridTable) {
                            Widget.doHandleGridTableSystemEvent(ic, f);
                        }
                    }

                    Widget.doHandleSystemEvent(r, f);

                    c.html(r.val());
                    ksText.removeClass('ks-on');
                    TextWidget.addEdit(section, o, amIOnGridTable);
                });
                if (amIOnGridTable === true) {
                    let gridId = r.data('id').split('_')[0];
                    r.on('keydown', f => {
                        if (f.keyCode === 39 || f.keyCode === 37) {
                            let editables = TextWidget.getEditables(gridId),
                                j = TextWidget.getCurrentIndex(editables, c), k = 0;

                            k = f.keyCode === 39 ? j + 1 : j === -1 ? editables.length - 1 : j - 1;

                            $(editables[k]).click();
                        }

                        if (f.keyCode === 38 || f.keyCode === 40) {
                            let sgi = r.data('id').split('_'), gridId = sgi[0], actRow = parseInt(sgi[1]),
                                row = f.keyCode === 38 ? actRow === 0 ? -1 : actRow - 1 : actRow + 1, column = sgi[2];
                            if (row === -1) {
                                return;
                            }
                            let nextElement = $('#' + gridId + '_' + row + '_' + column);
                            if (nextElement.length && nextElement.is(':visible')) {
                                nextElement.find('.ks-text-title').click();
                            }
                        }

                        if (f.ctrlKey && f.keyCode === 86) {
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