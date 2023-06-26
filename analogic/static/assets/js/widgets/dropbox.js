/* global app, Doc, Widget, Widgets */

'use strict';

class DropBoxWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = this.getParameters(d), pi = this.processItems(d, o, v);

        let hide = o.hideIfNoData === true && d.length === 0;

        let mainDivStyle = this.getGeneralStyles(d), titleStyles = [], textStyles = [], panelStyles = [];

        v.titleTextAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleTextAlignment === 'start' || v.titleTextAlignment === 'end' ? `flex-${v.titleTextAlignment}` : v.titleTextAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);

        v.textAlignment && textStyles.push(`text-align:${v.textAlignment};`);
        v.textFontColor && textStyles.push(`color:${v.textFontColor};`);
        v.textFontSize && textStyles.push(`font-size:${v.textFontSize}px;`);

        panelStyles.push('display:none;');
        v.panelWidth && panelStyles.push(`width:${v.panelWidth}px;`);

        hide && mainDivStyle.push('display:none;');


        return `
<div class="ks-dropbox ks-dropbox-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-dropbox-inner">
        <div class="ks-dropbox-title" style="${titleStyles.join('')}">
            <span class="ks-dropbox-title-primary">${v.titleVisible ? v.title : ''}</span>
            <span class="ks-dropbox-title-secondary"></span>
        </div>
        <div class="ks-dropbox-field ${v.editable === false ? 'readonly' : ''}">
            <div class="ks-dropbox-field-inner">
                <input ${v.editable === false || v.disableSearch === true  ? 'readonly' : ''} style="${textStyles.join('')}" type="text" class="ks-dropbox-input search-text" placeholder="${pi.selectedItems !== '' ? pi.selectedItems : v.placeHolder}">
                <div class="ks-dropbox-icon"></div>
            </div>
        </div>
    </div>
    <div class="ks-dropbox-panel" style="${panelStyles.join('')}">
        ${v.backdrop ? '<div class="ks-dropbox-backdrop"><\/div>' : ''}
        <div class="ks-dropbox-panel-inner">${this.getItems(pi.data, v)}</div>
    </div>
</div>`;
    }

    processItems(d, o, v) {
        let data;


        if (Array.isArray(d) || (d.items && Array.isArray(d.items))) {
            data = d.items && Array.isArray(d.items) ? {...o, ...{items: d.items}} : {...o, ...{items: d}};
        } else {
            data = {...o, ...this.state};
        }
        let selectedItemsArray = $.grep(data.items, (item, i) => item.on);
        if (!v.multiSelect && selectedItemsArray.length > 1) {
            let firstSelectedItem = selectedItemsArray[0];
            selectedItemsArray = [firstSelectedItem];

        }
        if (v.selectFirst === true && selectedItemsArray.length === 0 && data.items.length > 0) {
            data.items[0].on = true;
            selectedItemsArray = $.grep(data.items, (item, i) => item.on);
        }

        data.value = selectedItemsArray.map(item => item.name).join();

        this.state = v;
        this.value = data.value;
        this.items = data.items;

        let selectedItems = selectedItemsArray.map(item => item.name).join(', ');

        return {
          selectedItems: selectedItems,
          data: data
        };
    }

    getItems(data, v) {
        return data.items.map(item => {
            return `
<div class="ks-dropbox-panel-item ${item.on ? 'on' : ''}">
    <div class="ks-dropbox-panel-item-inner">
        <div class="ks-dropbox-panel-item-icon">
           <span></span>
            <input class="ks-dropbox-panel-item-checkbox" ${v.multiSelect ? '' : 'style="display:none;"'} ${item.on ? 'checked=checked' : ''} type="checkbox">
        </div>
        <div class="ks-dropbox-panel-item-separator"></div>
        <div class="ks-dropbox-panel-item-text" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="${item.name}">${item.name}</div>
    </div>
</div>`;
        }).join('');
    }

    getParameters(d) {
        return {
            backdrop: this.getRealValue('backdrop', d, false),
            disableSearch: this.getRealValue('disableSearch', d, false),
            editable: this.getRealValue('editable', d, true),
            itemIconOff: this.getRealValue('itemIconOff', d, false),
            itemIconOn: this.getRealValue('itemIconOn', d, false),
            hideIfNoData: this.getRealValue('hideIfNoData', d, false),
            panelWidth: this.getRealValue('panelWidth', d, false),
            placeHolder: this.getRealValue('placeHolder', d, ''),
            selectFirst: this.getRealValue('selectFirst', d, false),
            serverSideFilter: this.getRealValue('serverSideFilter', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            textAlignment: this.getRealValue('textAlignment', d, false),
            textFontColor: this.getRealValue('textFontColor', d, false),
            textFontSize: this.getRealValue('textFontSize', d, false),
            title: this.getRealValue('title', d, ''),
            titleVisible: this.getRealValue('titleVisible', d, true),
            multiSelect: this.getRealValue('multiSelect', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleTextAlignment: this.getRealValue('titleTextAlignment', d, false)
        };
    }

    updateHtml(data) {
        const p = this.getParameters(data), section = this.getSection(),
            inner = section.find('.ks-dropbox-panel-inner'), input = section.find('.ks-dropbox-input');
        if (this.state.serverSideFilter) {
            let previouslySelected = this.items.filter(e => e.on === true),
                previouslySelectedName = previouslySelected.map(e => e.name);
            this.items = previouslySelected.concat(data.items.filter(e => !previouslySelectedName.includes(e.name)));
            inner.html(this.getItems({items: this.items}, p));
        } else {
            const pi = this.processItems(data, this.options, p);
            inner.html(this.getItems(pi.data, p));
            input.attr('placeholder', pi.selectedItems !== '' ? pi.selectedItems : p.placeHolder);
        }
    }

    initEventHandlers() {
        const section = this.getSection(), id = this.id, w = this, state = this.state,
            amIOnGridtable = this.amIOnAGridTable();

        if (section.find('.ks-dropbox-field').hasClass('readonly')) {
            return;
        }

        section.find('.ks-dropbox-backdrop').on('click', (e) => {
            itemHolder.slideUp(50);
        });

        const dropbox = $('#' + id + ' .ks-dropbox-field-inner').on('click', (e) => {
            Doc.find(".ks-dropbox .ks-dropbox-panel").not(dropbox).each((i, el) => $(el).is(':visible') ? $(el).slideUp(50) : false);

            itemHolder.is(':visible') ? itemHolder.slideUp(50) : itemHolder.slideDown(50, function () {
                // $(e.currentTarget).parent().get(0).scrollIntoView({behavior: "smooth", block: "start"});
            });

            if (state.serverSideFilter) {
                const previousFilterValue = v(id + '.filter.value');
                section.find('input[type="text"]').val(previousFilterValue !== false ? previousFilterValue : '');
            }

            return false;
        });

        section.find('input[type="text"]').on('input', i => {
            let e = $(i.currentTarget), term = e.val(), f;
            if (state.serverSideFilter) {
                let element = $('<div>').data({action: 'filter', id: section.prop('id'), value: term});

                if (section.data('ordinal')) {
                    element.data('ordinal', section.data('ordinal'));
                }

                Widget.doHandleSystemEvent(element, e);
                if (amIOnGridtable) {
                    Widget.doHandleGridTableSystemEvent(element, e);
                }
            } else {
                section.find('.ks-dropbox-panel-item').each(function () {
                    f = $(this);
                    f.toggle(-1 !== f.find('.ks-dropbox-panel-item-text').html().toLowerCase().indexOf(term.toLowerCase()));
                });
            }
        });

        const itemHolder = $('#' + id + ' .ks-dropbox-panel')./*on('click', false).*/on('click', '.ks-dropbox-panel-item ', e => {
            const clickedItem = $(e.currentTarget);
            DropBoxWidget.handleClick(state, w, e, itemHolder, section, id, clickedItem, $(e.target).hasClass('ks-dropbox-panel-item-checkbox'), amIOnGridtable);
        });

        const catcher = Doc.not(dropbox).on('touch click', e => {
            itemHolder.is(':visible') ? itemHolder.slideUp(50) : false;
            if (itemHolder.is(':visible') && state.serverSideFilter) {
                section.find('input[type="text"]').val('');
            }
        });

        itemHolder.hide();
    }

    reset() {
        delete this.value;
        delete this.items;
    }

    static handleClick(state, w, e, itemHolder, section, id, clickedItem, fromCheckbox = false, amIOnGridtable = false) {
        const checkbox = clickedItem.find('.ks-dropbox-panel-item-checkbox');
        const items = itemHolder.children('.widget-dropdown-item');

        if (state.multiSelect === true) {
            if (checkbox.length && checkbox.is(':visible')) {
                if (!fromCheckbox) {
                    checkbox.prop('checked', !checkbox.prop('checked'));
                }
                w.items[clickedItem.index()].on = checkbox.prop("checked");
                w.value = $.grep(w.items, (item, i) => item.on).map(item => item.name).join();
                checkbox.attr('checked', checkbox.prop("checked") ? 'checked' : false);
            } else {
                clickedItem.toggleClass('on');
                w.items[clickedItem.index()].on = clickedItem.hasClass('on');
                w.value = $.grep(w.items, (item, i) => item.on).map(item => item.name).join();
            }
            //    clickedItem.toggleClass('on');
        } else {
            itemHolder.find('.ks-dropbox-panel-item').removeClass('on').each(function () {
                w.items[$(this).index()].on = $(this).hasClass('on');
                w.value = $.grep(w.items, (item, i) => item.on).map(item => item.name).join();
            });
            clickedItem.addClass('on');
            w.items[clickedItem.index()].on = clickedItem.hasClass('on');
            w.value = $.grep(w.items, (item, i) => item.on).map(item => item.name).join();
            itemHolder.slideUp(50);
        }

        let v = $.grep(w.items, (item, i) => item.on).map(item => item.name).join(', '),
            searchText = $('#' + id + ' .search-text');

        (!state.serverSideFilter || !state.multiSelect) && searchText.attr('placeholder', v).val('');
        section.find('.ks-dropbox-panel-item').show();

        let element = $('<div>').data({action: 'choose', id: section.prop('id'), value: Widgets[id].value});

        if (section.data('ordinal')) {
            element.data('ordinal', section.data('ordinal'));
        }

        Widget.doHandleSystemEvent(element, e);
        if (amIOnGridtable) {
            Widget.doHandleGridTableSystemEvent(element, e);
        }

        return false;
    }
}
;