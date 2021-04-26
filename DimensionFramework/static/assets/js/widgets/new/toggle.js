/* global app, Widget, WidgetValue */

'use strict';

class ToggleWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = {
            isGridTableHierarchyExpander: this.getRealValue('isGridTableHierarchyExpander', d, false),
            editable: this.getRealValue('editable', d, true),
            groupId: this.getRealValue('groupId', d, false),
            icon: this.getRealValue('icon', d, false),
            iconOff: this.getRealValue('iconOff', d, false),
            skin: this.getRealValue('skin', d, 'skin1'),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleOn: this.getRealValue('titleOn', d, ''),
            titleOff: this.getRealValue('titleOff', d, ''),
            value: this.getRealValue('value', d, false)
        };

        this.value = {isGridTableHierarchyExpander: v.isGridTableHierarchyExpander};

        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d), titleStyles = [], b = 1 === parseInt(v.value);

        v.titleOn !== '' && mainDivClass.push('has-label');
        b && mainDivClass.push('ks-on');
        mainDivClass.push(`ks-toggle-${v.skin}`);

        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);

        titleStyles = titleStyles.join('');

        if (v.groupId && b) {
            WidgetValue[v.groupId] = {ordinal: d.ordinal, value: v.titleOn};
        }

        return `
<div class="ks-toggle ${mainDivClass.join(' ')} ${v.groupId ? `ks-toggle-${v.groupId}` : ''} ${v.isGridTableHierarchyExpander ? 'ks-toggle-expander' : ''}" style="${mainDivStyle.join('')}" data-ordinal="${d.ordinal}" data-value="${v.value}" data-id="${o.id}" data-action="switch">
    <div class="ks-toggle-inner ${v.editable === false ? 'readonly' : ''}">
        <div class="ks-toggle-icon ks-toggle-icon-on">${v.icon ? `<span class="${v.icon}"></span>` : ''}</div>
        <div class="ks-toggle-icon ks-toggle-icon-off">${v.iconOff ? `<span class="${v.iconOff}"></span>` : ''}</div>
        <div style="${titleStyles}" class="ks-toggle-label ks-toggle-label-on">${v.titleOn}</div>
        <div style="${titleStyles}" class="ks-toggle-label ks-toggle-label-off">${v.titleOff}</div>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        if (section.find('.ks-toggle-inner').hasClass('readonly')) {
            return;
        }

        const o = this.options;

        let isGridTableHierarchyExpander = this.value.isGridTableHierarchyExpander;

        section.find('.ks-toggle').on('click', e => {
            const s = $(e.currentTarget), isActive = !s.hasClass('ks-on');

            if (o.groupId) {
                if (isActive) {
                    $('.ks-toggle-' + o.groupId).removeClass('ks-on');
                    s.toggleClass('ks-on', isActive).trigger('change', [isActive]);

                    s.data('value', isActive ? 1 : 0);

                    Widget.doHandleSystemEvent(s, e);

                    WidgetValue[o.groupId] = {ordinal: s.data('ordinal'), value: s.find('.ks-toggle-label-on').html()};

                    Widget.executeEventMapActions('switch.' + o.groupId, {}, {});
                }
            } else {
                s.toggleClass('ks-on', isActive).trigger('change', [isActive]);

                s.data('value', isActive ? 1 : 0);

                Widget.doHandleSystemEvent(s, e);

                if (this.amIOnAGridTable()) {
                    Widget.doHandleGridTableSystemEvent(s, e);
                }

                if (isGridTableHierarchyExpander) {
                    ToggleWidget.doExpand(s, !isActive, ToggleWidget.getToggleIndex(s));
                }
            }
        });

        if (isGridTableHierarchyExpander) {
            let s = section.find('.ks-toggle');
            ToggleWidget.doExpand(s, !s.hasClass('ks-on'), ToggleWidget.getToggleIndex(s), false);
        }
    }

    static getToggleIndex(s) {
        let ts = s.closest('.ks-grid-table-row').find('.ks-toggle'), toggleIndex = 0;

        if (ts.length > 1) {
            for (let i = 0; i < ts.length; ++i) {
                if ($(ts[i]).data('id') === s.data('id')) {
                    toggleIndex = i;
                }
            }
        }

        return toggleIndex;
    }

    static getActaulToggle(r, toggleIndex) {
        let arr = r.find('.ks-toggle');

        if (arr.length > 1) {
            return $(arr[toggleIndex]);
        }

        return arr;
    }

    static doExpand(s, isActive, toggleIndex, fade = true) {
        let parentRow = s.closest('.ks-grid-table-row'), nextRows = parentRow.nextAll('.ks-grid-table-row');
        let currentPadding = parseInt(s.css('padding-left')), nrp, i = 0, r, t;

        L(s, currentPadding, toggleIndex);

        if (nextRows.length > 0) {
            r = $(nextRows[0]);
            nrp = parseInt(ToggleWidget.getActaulToggle(r, toggleIndex).css('padding-left'));

            L(nrp);

            while (nrp > currentPadding && i < nextRows.length) {
                isActive ? ToggleWidget.hide(r, fade) : ToggleWidget.show(r, fade);

                if (isActive) {
                    ToggleWidget.hide(r, fade);
                    ++i;
                } else {
                    t = ToggleWidget.getActaulToggle(r, toggleIndex);
                    if (t.hasClass('ks-toggle-expander')) {
                        i = i + ToggleWidget.doExpand(t, !t.hasClass('ks-on'), toggleIndex, fade);
                        ++i;
                    } else {
                        ToggleWidget.show(r, fade);
                        ++i;
                    }
                }

                if (i < nextRows.length) {
                    nrp = parseInt(ToggleWidget.getActaulToggle($(nextRows[i]), toggleIndex).css('padding-left'));
                    r = $(nextRows[i]);
                }
            }
        }

        return i;
    }

    static hide(r, fade) {
        fade ? r.fadeOut() : r.hide();
    }

    static show(r, fade) {
        fade ? r.fadeIn() : r.show();
    }
}
;