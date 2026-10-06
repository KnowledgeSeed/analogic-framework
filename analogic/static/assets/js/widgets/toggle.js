/* global app, Widget, Widgets */

'use strict';

class ToggleWidget extends Widget {

    // Single source of truth for the classes/styles/content getHtml renders, shared with
    // updateHtml so the two cannot drift apart.
    buildParts(d, v) {
        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d),
            titleStyles = this.getHtmlComponentStylesArray('title', d),
            b = 1 === parseInt(v.value),
            iconStyles = this.getHtmlComponentStylesArray('icon', d);

        v.titleOn !== '' && mainDivClass.push('has-label');
        v.backgroundColor && mainDivStyle.push(`background-color:${v.backgroundColor};`);
        b && mainDivClass.push('ks-on');
        mainDivClass.push(`ks-toggle-${v.skin}`);
        v.groupId && mainDivClass.push(`ks-toggle-${v.groupId}`);
        v.isGridTableHierarchyExpander && mainDivClass.push('ks-toggle-expander');

        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);

        v.iconFontColor && iconStyles.push(`color:${v.iconFontColor};`);
        v.iconFontSize && iconStyles.push(`font-size:${v.iconFontSize}px;`);

        return {
            b: b,
            mainDivClass: mainDivClass,
            mainDivStyle: mainDivStyle.join(''),
            titleStyles: titleStyles.join(''),
            iconStyles: iconStyles.join(''),
            iconOnHtml: v.icon ? `<span class="${v.icon}"></span>` : '',
            iconOffHtml: v.iconOff ? `<span class="${v.iconOff}"></span>` : ''
        };
    }

    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d);

        this.isGridTableHierarchyExpander = v.isGridTableHierarchyExpander;

        const p = this.buildParts(d, v);

        if (v.groupId && p.b) {
            Widgets[v.groupId] = {ordinal: d.ordinal, value: v.titleOn};
        }

        return `
<div class="ks-toggle ${p.mainDivClass.join(' ')}" style="${p.mainDivStyle}" data-ordinal="${d.ordinal}" data-value="${v.value}" data-id="${o.id}" data-action="switch">
    <div class="ks-toggle-inner ${v.editable === false ? 'readonly' : ''}">
        <div style="${p.iconStyles}" class="ks-toggle-icon ks-toggle-icon-on">${p.iconOnHtml}</div>
        <div style="${p.iconStyles}" class="ks-toggle-icon ks-toggle-icon-off">${p.iconOffHtml}</div>
        <div style="${p.titleStyles}" class="ks-toggle-label ks-toggle-label-on">${v.titleOn}</div>
        <div style="${p.titleStyles}" class="ks-toggle-label ks-toggle-label-off">${v.titleOff}</div>
    </div>
</div>`;
    }

    updateHtml(data) {
        const v = this.getParameters(data), section = this.getSection(),
            main = section.find('.ks-toggle'),
            inner = section.find('.ks-toggle-inner'),
            titles = section.find('.ks-toggle-label'),
            titleOn = section.find('.ks-toggle-label-on'),
            titleOff = section.find('.ks-toggle-label-off'),
            icons = section.find('.ks-toggle-icon'),
            iconOn = section.find('.ks-toggle-icon-on'),
            iconOff = section.find('.ks-toggle-icon-off'),
            p = this.buildParts(data, v);

        // style is derived purely from the parameters, so it is rewritten wholesale
        main.attr('style', p.mainDivStyle);

        // Every class getHtml derives from the parameters is dropped and re-applied; the
        // base `ks-toggle` class is kept. `ks-toggle-<skin|groupId|expander>` all share the
        // prefix, so they have to be handled together.
        main.removeClass((i, c) => (c.match(/(^|\s)(ks-toggle-\S+|has-label|ks-on)/g) || []).join(' '));
        main.addClass(p.mainDivClass.join(' '));

        // The attribute is what the markup carries, the data cache is what the click handler
        // and doHandleSystemEvent read, so both are kept in sync.
        main.attr('data-value', v.value).data('value', v.value);
        main.attr('data-ordinal', data.ordinal).data('ordinal', data.ordinal);

        if (v.groupId && p.b) {
            Widgets[v.groupId] = {ordinal: data.ordinal, value: v.titleOn};
        }

        inner.toggleClass('readonly', v.editable === false);

        icons.attr('style', p.iconStyles);
        iconOn.html(p.iconOnHtml);
        iconOff.html(p.iconOffHtml);

        titles.attr('style', p.titleStyles);
        titleOn.html(v.titleOn);
        titleOff.html(v.titleOff);
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