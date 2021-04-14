/* global app, Utils, Widget, WidgetValue */

'use strict';

class TextWidget extends Widget {

    getHtml(widgets, d) {console.log(d);
        const v = {
            body: this.getRealValue('body', d, false),
            bodyFontColor: this.getRealValue('bodyFontColor', d, false),
            bodyFontSize: this.getRealValue('bodyFontSize', d, false),
            bodyAlignment: this.getRealValue('bodyAlignment', d, false),
            draggable: this.getRealValue('draggable', d, false),
            editable: this.getRealValue('editable', d, false),
            skin: this.getRealValue('skin', d, 'template1'),
            title: this.getRealValue('title', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleAlignment: this.getRealValue('titleAlignment', d, false),
            ordinal: typeof d.ordinal !== 'undefined' ? d.ordinal : ''
        };
        this.value = {value: v.title, editable: v.editable};

        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d), titleStyles = [], bodyStyles = [];

        (v.title || v.editable) && mainDivClass.push('has-title');
        v.body && mainDivClass.push('has-body');

        v.titleAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleAlignment === 'start' || v.titleAlignment === 'end' ? `flex-${v.titleAlignment}` : v.titleAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);
        v.editable && (v.title === false || v.title === '') && titleStyles.push('height: 20px;');

        v.bodyAlignment && bodyStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.bodyAlignment === 'start' || v.bodyAlignment === 'end' ? `flex-${v.bodyAlignment}` : v.bodyAlignment};`);
        v.bodyFontColor && bodyStyles.push(`color:${v.bodyFontColor};`);
        v.bodyFontSize && bodyStyles.push(`font-size:${v.bodyFontSize}px;`);

        return `
<div class="ks-text ${mainDivClass.join(' ')} ks-text-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-text-inner">
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
    }

    static addEdit(section, o, amIOnGridTable) {
        section.find('.ks-text-title').on('click', e => {
            let c = $(e.currentTarget);
            c.off('click');

            c.html(`<input class="ks-text-title-input" data-id="${o.id}" data-action="write" data-ordinal="${c.data('ordinal')}" type="text" value="${c.text()}"/>`).promise().then(() => {
                let r = c.find('.ks-text-title-input').focus().select().on('focusout', f => {
                    r.off('focusout').data('value', Utils.escapeText(r.val()));

                    WidgetValue[r.data('id')] = {value: Utils.escapeText(r.val())};

                    Widget.doHandleSystemEvent(r, f);

                    c.html(r.val());

                    TextWidget.addEdit(section, o, amIOnGridTable);
                    console.log('focusout');
                });
                if (amIOnGridTable === true) {
                    let gridId = r.data('id').split('_')[0];
                    r.on('keydown', f => {

                        if (f.keyCode === 39 || f.keyCode === 37) {
                            let editables = $('#' + gridId).find('.ks-text-title[data-editable=1]').filter(':visible').sort(function (a, b) {
                                return ($(b).data('ordinal')) < ($(a).data('ordinal')) ? 1 : -1;
                            }), i = 0, j = -1, k = 0;
                            while (i < editables.length && j === -1) {
                                if ($(editables[i]).data('ordinal') === c.data('ordinal')) {
                                    j = i;
                                }
                                ++i;
                            }
                            if ((j + 1) >= editables.length) {
                                j = -1;
                            }
                            k = f.keyCode === 39 ? j + 1 : j === -1 ? editables.length - 1 : j - 1;console.log(k);

                            $(editables[k]).click();
                        }

                        if(f.keyCode === 38 || f.keyCode === 40) {

                        }
                    });
                }

            });
        });
    }
}
;