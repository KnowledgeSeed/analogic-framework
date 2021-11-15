/* global app, Doc, Widget, WidgetValue */

'use strict';

class DropBoxWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = {
            backdrop: this.getRealValue('backdrop', d, false),
            editable: this.getRealValue('editable', d, true),
            itemIconOff: this.getRealValue('itemIconOff', d, false),
            itemIconOn: this.getRealValue('itemIconOn', d, false),
            panelWidth: this.getRealValue('panelWidth', d, false),
            placeHolder: this.getRealValue('placeHolder', d, ''),
            selectFirst: this.getRealValue('selectFirst', d, false),
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

        let data;


        if (Array.isArray(d) || (d.items && Array.isArray(d.items))) {
            data = d.items && Array.isArray(d.items) ? {...o, ...{items: d.items}} : {...o, ...{items: d}};
        } else {
            data = {...o, ...this.state};
        }
        let selectedItemsArray = $.grep(data.items, (item, i) => item.on);
        if(!v.multiSelect && selectedItemsArray.length > 1){
            let firstSelectedItem = selectedItemsArray[0];
            selectedItemsArray = [firstSelectedItem];

        }
        if (v.selectFirst === true && selectedItemsArray.length === 0 && data.items.length > 0) {
            data.items[0].on = true;
            selectedItemsArray = $.grep(data.items, (item, i) => item.on);
        }

        data.value = selectedItemsArray.map(item => item.name).join();

        this.state = o;
        this.value = data;

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

        let selectedItems = selectedItemsArray.map(item => item.name).join(', ');

        return `
<div class="ks-dropbox ks-dropbox-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-dropbox-inner">
        <div class="ks-dropbox-title" style="${titleStyles.join('')}">
            <span class="ks-dropbox-title-primary">${v.titleVisible ? v.title : ''}</span>
            <span class="ks-dropbox-title-secondary"></span>
        </div>
        <div class="ks-dropbox-field ${v.editable === false ? 'readonly' : ''}">
            <div class="ks-dropbox-field-inner">
                <input ${v.editable === false ? 'readonly' : ''} style="${textStyles.join('')}" type="text" class="ks-dropbox-input search-text" placeholder="${selectedItems !== '' ? selectedItems : v.placeHolder}">
                <div class="ks-dropbox-icon"></div>
            </div>
        </div>
    </div>
    <div class="ks-dropbox-panel" style="${panelStyles.join('')}">
        ${v.backdrop ? '<div class="ks-dropbox-backdrop"><\/div>' : ''}
        <div class="ks-dropbox-panel-inner">${this.getItems(data, v)}</div>
    </div>
</div>`;
    }

    getItems(data, v) {
        return data.items.map(item => {
            return `
<div class="ks-dropbox-panel-item ${item.on && v.multiSelect === false ? 'on' : ''}">
    <div class="ks-dropbox-panel-item-inner">
        <div class="ks-dropbox-panel-item-icon">
            ${v.multiSelect === false ? `<span class="${item.on ? v.itemIconOn ? v.itemIconOn : '' : v.itemIconOff ? v.itemIconOff : ''}"></span>` : '' }
            <input class="ks-dropbox-panel-item-checkbox" ${v.multiSelect ? '' : 'style="display:none;"'} ${item.on ? 'checked=checked' : ''} type="checkbox">
        </div>
        <div class="ks-dropbox-panel-item-separator"></div>
        <div class="ks-dropbox-panel-item-text" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="${item.name}">${item.name}</div>
    </div>
</div>`;
        }).join('');
    }

    initEventHandlers(section) {
        const id = section.attr('id'), w = WidgetValue[id];

        if (section.find('.ks-dropbox-field').hasClass('readonly')) {
            return;
        }

        section.find('.ks-dropbox-backdrop').on('click', (e) => {
            itemHolder.slideUp(50);
        });

        const dropbox = $('#' + id + ' .ks-dropbox-field-inner').on('click', (e) => {
            Doc.find(".ks-dropbox .ks-dropbox-panel").not(dropbox).each((i, el) => $(el).is(':visible') ? $(el).slideUp(50) : false);

            itemHolder.is(':visible') ? itemHolder.slideUp(50) : itemHolder.slideDown(50, function () {
                $(e.currentTarget).parent().get(0).scrollIntoView({behavior: "smooth", block: "start"});
            });

            return false;
        });

        section.find('input[type="text"]').on('input', i => {
            let e = $(i.currentTarget), term = e.val(), f;
            section.find('.ks-dropbox-panel-item').each(function () {
                f = $(this);
                f.toggle(-1 !== f.find('.ks-dropbox-panel-item-text').html().toLowerCase().indexOf(term.toLowerCase()));
            });
        });

        const itemHolder = $('#' + id + ' .ks-dropbox-panel')./*on('click', false).*/on('click', '.ks-dropbox-panel-item ', e => {
            const clickedItem = $(e.currentTarget);
            DropBoxWidget.handleClick(w, e, itemHolder, section, id, clickedItem, $(e.target).hasClass('ks-dropbox-panel-item-checkbox'));
        });

        const catcher = Doc.not(dropbox).on('touch click', e => {
            itemHolder.is(':visible') ? itemHolder.slideUp(50) : false;
        });

        itemHolder.hide();
    }

    static handleClick(w, e, itemHolder, section, id, clickedItem, fromCheckbox = false) {
            const checkbox = clickedItem.find('.ks-dropbox-panel-item-checkbox');
            const items = itemHolder.children('.widget-dropdown-item');

            if (checkbox.length && checkbox.is(':visible')) {
                if(!fromCheckbox){
                    checkbox.prop('checked', !checkbox.prop('checked'));
                }
                w.items[clickedItem.index()].on = checkbox.prop("checked");
                w.value = $.grep(w.items, (item, i) => item.on).map(item => item.name).join();
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

            searchText.attr('placeholder', v).val('');
            section.find('.ks-dropbox-panel-item').show();

            let element = $('<div>').data({action: 'choose', id: section.prop('id'), value: WidgetValue[id].value});

            if (section.data('ordinal')) {
                element.data('ordinal', section.data('ordinal'));
            }

            Widget.doHandleSystemEvent(element, e);

            return false;
    }
}
;