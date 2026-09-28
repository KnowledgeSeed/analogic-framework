/* global app, Widget, Widgets */

'use strict';

class ToggleWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d);

        this.isGridTableHierarchyExpander = v.isGridTableHierarchyExpander;

        // The model is what this render is made of; updateHtml() diffs against it later.
        const m = this._vm = this.buildModel(d, v);

        if (v.groupId && m.on) {
            Widgets[v.groupId] = {ordinal: d.ordinal, value: v.titleOn};
        }

        return `
<div class="${m.mainClass}" style="${m.mainStyle}" data-ordinal="${m.ordinal}" data-value="${m.value}" data-id="${o.id}" data-action="switch">
    <div class="${m.innerClass}">
        <div style="${m.iconStyle}" class="ks-toggle-icon ks-toggle-icon-on">${m.iconOnHtml}</div>
        <div style="${m.iconStyle}" class="ks-toggle-icon ks-toggle-icon-off">${m.iconOffHtml}</div>
        <div style="${m.titleStyle}" class="ks-toggle-label ks-toggle-label-on">${m.titleOn}</div>
        <div style="${m.titleStyle}" class="ks-toggle-label ks-toggle-label-off">${m.titleOff}</div>
    </div>
</div>`;
    }

    // Pure: everything getHtml() renders, as plain strings.
    buildModel(d, v = this.getParameters(d)) {
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

        return {
            on: b,
            mainClass: Widget.intern(`ks-toggle ${mainDivClass.join(' ')} ${v.groupId ? `ks-toggle-${v.groupId}` : ''} ${v.isGridTableHierarchyExpander ? 'ks-toggle-expander' : ''}`),
            mainStyle: Widget.intern(mainDivStyle.join('')),
            ordinal: d.ordinal,
            value: v.value,
            innerClass: `ks-toggle-inner ${v.editable === false ? 'readonly' : ''}`,
            iconStyle: Widget.intern(iconStyles.join('')),
            iconOnHtml: v.icon ? `<span class="${v.icon}"></span>` : '',
            iconOffHtml: v.iconOff ? `<span class="${v.iconOff}"></span>` : '',
            titleStyle: Widget.intern(titleStyles.join('')),
            titleOn: v.titleOn,
            titleOff: v.titleOff
        };
    }

    // Model based update: only what differs from the model applied last is touched, so classes,
    // styles and other state added to the elements at runtime survive.
    updateHtml(data) {
        const previous = this._vm;
        // Nothing to diff against, or a subclass renders its own markup: keep the old behavior.
        if (!previous || this.getHtml !== ToggleWidget.prototype.getHtml) {
            return this.updateHtmlLegacy(data);
        }

        const p = this.getParameters(data), section = this.getSection(),
            main = section.find('.ks-toggle')[0], inner = section.find('.ks-toggle-inner')[0],
            iconOn = section.find('.ks-toggle-icon-on')[0], iconOff = section.find('.ks-toggle-icon-off')[0],
            titleOn = section.find('.ks-toggle-label-on')[0], titleOff = section.find('.ks-toggle-label-off')[0],
            next = this.buildModel(data, p);

        //main
        Widget.applyClassDiff(main, previous.mainClass, next.mainClass);
        Widget.applyStyleDiff(main, previous.mainStyle, next.mainStyle);
        // The on state is data: a click the server did not confirm must not stay on screen.
        main && main.classList.toggle('ks-on', next.on);
        Widget.setAttributeIfChanged(main, 'data-ordinal', next.ordinal);
        Widget.setAttributeIfChanged(main, 'data-value', next.value);

        //inner (carries the readonly state)
        Widget.applyClassDiff(inner, previous.innerClass, next.innerClass);

        //icons
        Widget.applyStyleDiff(iconOn, previous.iconStyle, next.iconStyle);
        Widget.applyStyleDiff(iconOff, previous.iconStyle, next.iconStyle);
        Widget.setContentIfChanged(iconOn, next.iconOnHtml);
        Widget.setContentIfChanged(iconOff, next.iconOffHtml);

        //labels
        Widget.applyStyleDiff(titleOn, previous.titleStyle, next.titleStyle);
        Widget.applyStyleDiff(titleOff, previous.titleStyle, next.titleStyle);
        Widget.setContentIfChanged(titleOn, next.titleOn);
        Widget.setContentIfChanged(titleOff, next.titleOff);

        this._vm = next;
    }

    // Previous field by field update, used when there is no model to diff against or a
    // subclass renders its own markup.
    updateHtmlLegacy(data) {
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

        // The readonly state can change with the data (updateContent), so it is checked when the
        // toggle is clicked, not only when the handler is bound.
        const isReadonly = () => section.find('.ks-toggle-inner').hasClass('readonly');

        const o = this.options;

        let isGridTableHierarchyExpander = this.isGridTableHierarchyExpander;
        section.find('.ks-toggle').on('click', e => {
            if (isReadonly()) {
                return;
            }

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

        if (isGridTableHierarchyExpander && !isReadonly()) {
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