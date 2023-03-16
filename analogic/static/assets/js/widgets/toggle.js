/* global app, Widget, Widgets */

'use strict';

class ToggleWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d);

        this.isGridTableHierarchyExpander = v.isGridTableHierarchyExpander;

        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d),
            titleStyles = this.getHtmlComponentStylesArray('title', d),
            b = 1 === parseInt(v.value),
            iconStyles = this.getHtmlComponentStylesArray('icon', d);

        v.titleOn !== '' && mainDivClass.push('has-label');
        v.backgroundColor && mainDivStyle.push(`background-color:${v.backgroundColor};`);
        b && mainDivClass.push('ks-on');
        mainDivClass.push(`ks-toggle-${v.skin}`);

        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);

        v.iconFontColor && iconStyles.push(`color:${v.iconFontColor};`);
        v.iconFontSize && iconStyles.push(`font-size:${v.iconFontSize}px;`);

        titleStyles = titleStyles.join('');
        iconStyles = iconStyles.join('');

        if (v.groupId && b) {
            Widgets[v.groupId] = {ordinal: d.ordinal, value: v.titleOn};
        }

        return `
<div class="ks-toggle ${mainDivClass.join(' ')} ${v.groupId ? `ks-toggle-${v.groupId}` : ''} ${v.isGridTableHierarchyExpander ? 'ks-toggle-expander' : ''}" style="${mainDivStyle.join('')}" data-ordinal="${d.ordinal}" data-value="${v.value}" data-id="${o.id}" data-action="switch">
    <div class="ks-toggle-inner ${v.editable === false ? 'readonly' : ''}">
        <div style="${iconStyles}" class="ks-toggle-icon ks-toggle-icon-on">${v.icon ? `<span class="${v.icon}"></span>` : ''}</div>
        <div style="${iconStyles}" class="ks-toggle-icon ks-toggle-icon-off">${v.iconOff ? `<span class="${v.iconOff}"></span>` : ''}</div>
        <div style="${titleStyles}" class="ks-toggle-label ks-toggle-label-on">${v.titleOn}</div>
        <div style="${titleStyles}" class="ks-toggle-label ks-toggle-label-off">${v.titleOff}</div>
    </div>
</div>`;
    }

    updateHtml(data) {
        const p = this.getParameters(data), section = this.getSection(),
            main = section.find('.ks-toggle'),
            titleOn = section.find('.ks-toggle-label-on'),
            titleOff = section.find('.ks-toggle-label-off'),
            iconOn = section.find('.ks-toggle-icon-on'),
            iconOff = section.find('.ks-toggle-icon-off'),
            b = 1 === parseInt(p.value);

        if (b) {
            !main.hasClass('ks-on') && main.addClass('ks-on');
        } else {
            main.removeClass('ks-on');
        }

        titleOn.html(p.titleOn);
        Widget.setOrRemoveStyle(titleOn, 'color', p.titleFontColor);

        Widget.setOrRemoveStyle(iconOn, 'color', p.iconFontColor);

        titleOff.html(p.titleOff);
        Widget.setOrRemoveStyle(titleOff, 'color', p.titleFontColor);

        Widget.setOrRemoveStyle(iconOff, 'color', p.iconFontColor);
    }

    getParameters(d) {
        return {
            backgroundColor: this.getRealValue('backgroundColor', d, false),
            isGridTableHierarchyExpander: this.getRealValue('isGridTableHierarchyExpander', d, false),
            editable: this.getRealValue('editable', d, true),
            groupId: this.getRealValue('groupId', d, false),
            icon: this.getRealValue('icon', d, false),
            iconOff: this.getRealValue('iconOff', d, false),
            iconFontSize: this.getRealValue('iconFontSize', d, false),
            iconFontColor: this.getRealValue('iconFontColor', d, false),
            skin: this.getRealValue('skin', d, 'skin1'),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleOn: this.getRealValue('titleOn', d, ''),
            titleOff: this.getRealValue('titleOff', d, ''),
            value: this.getRealValue('value', d, false)
        };
    }

    initEventHandlers() {
        const section = this.getSection();

        if (section.find('.ks-toggle-inner').hasClass('readonly')) {
            return;
        }

        const o = this.options;

        let isGridTableHierarchyExpander = this.isGridTableHierarchyExpander;
        section.find('.ks-toggle').on('click', e => {
            const s = $(e.currentTarget), isActive = !s.hasClass('ks-on');

            if (o.groupId) {
                if (isActive) {
                    $('.ks-toggle-' + o.groupId).removeClass('ks-on');
                    s.toggleClass('ks-on', isActive).trigger('change', [isActive]);

                    s.data('value', isActive ? 1 : 0);

                    Widget.doHandleSystemEvent(s, e);

                    Widgets[o.groupId] = {ordinal: s.data('ordinal'), value: s.find('.ks-toggle-label-on').html()};

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

        //L(s, currentPadding, toggleIndex);

        if (nextRows.length > 0) {
            r = $(nextRows[0]);
            nrp = parseInt(ToggleWidget.getActaulToggle(r, toggleIndex).css('padding-left'));

            //L(nrp);

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