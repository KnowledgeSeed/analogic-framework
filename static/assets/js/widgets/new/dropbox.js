/* global app, Widget */

'use strict';

class DropBoxWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        const v = {
            editable: this.getRealValue('editable', d, true),
            placeHolder: this.getRealValue('placeHolder', d, ''),
            skin: this.getRealValue('skin', d, 'standard'),
            textAlignment: this.getRealValue('textAlignment', d, false),
            textFontColor: this.getRealValue('textFontColor', d, false),
            textFontSize: this.getRealValue('textFontSize', d, false),
            title: this.getRealValue('title', d, ''),
            titleVisible: this.getRealValue('titleVisible', d, true),
            multiSelect: this.getRealValue('multiSelect', d, false),
            titleFontColor: this.getRealValue('titleFontColor', d, false),
            titleFontSize: this.getRealValue('titleFontSize', d, false),
            titleTextAlignment: this.getRealValue('titleTextAlignment', d, false),
        };

        let data;
        if (Array.isArray(d) || (d.items && Array.isArray(d.items))) {
            data = d.items && Array.isArray(d.items) ? {...o, ...{items: d.items}} : {...o, ...{items: d}};
        } else {
            data = {...o, ...this.state};
        }
        data.value = $.grep(data.items, (item, i) => {
            return item.on;
        }).map(item => {
            return item.name;
        }).join();
        this.state = o;
        this.value = data;
        let hide = o.hideIfNoData === true && d.length === 0;


        let mainDivClass = [], mainDivStyle = this.getGeneralStyles(d), titleStyles = [], textStyles = [];

        v.titleTextAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleTextAlignment === 'start' || v.titleTextAlignment === 'end' ? `flex-${v.titleTextAlignment}` : v.titleTextAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);

        v.textAlignment && textStyles.push(`text-align:${v.textAlignment};`);
        v.textFontColor && textStyles.push(`color:${v.textFontColor};`);
        v.textFontSize && textStyles.push(`font-size:${v.textFontSize}px;`);

        hide && mainDivStyle.push('display:none;');

        let selectedItems = $.grep(data.items, (item, i) => {
            return item.on;
        }).map(item => {
            return item.name;
        }).join(', ');

        return `<div class="ks-dropbox ks-dropbox-${v.skin}" style="${mainDivStyle.join('')}">
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
                    <div class="ks-dropbox-panel" style="display:none;">
                            <div class="ks-dropbox-panel-inner">
                                    ${this.getItems(data, v)}
                            </div>
                    </div>
            </div>`;
    }

    getItems(data, v) {
        return data.items.map(item => {
            return `<div class="ks-dropbox-panel-item ${item.on && v.multiSelect === false ? 'on' : ''}">
                            <div class="ks-dropbox-panel-item-inner">
                                    <div class="ks-dropbox-panel-item-icon"><input class="ks-dropbox-panel-item-checkbox" ${v.multiSelect ? '' : 'style="display:none;"'} ${item.on ? 'checked=checked' : ''} type="checkbox"></div>
                                    <div class="ks-dropbox-panel-item-separator"></div>
                                    <div class="ks-dropbox-panel-item-text" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="${item.name}">${item.name}</div>
                            </div>
                    </div>`;
        }).join('');
    }

    initEventHandlers(section) {
        const id = section.attr('id');
        if(section.find('.ks-dropbox-field').hasClass('readonly')) {
            return;
        }

        const dropbox = $('#' + id + ' .ks-dropbox-field-inner').on('click', (e) => {
            app.doc.find(".ks-dropbox .ks-dropbox-panel").not(dropbox).each((i, el) => {
                $(el).is(':visible') ? $(el).slideUp(50) : false;
            });

            itemHolder.is(':visible') ? itemHolder.slideUp(50) : itemHolder.slideDown(50, function () {
                $(e.currentTarget).parent().get(0).scrollIntoView({behavior: "smooth", block: "start"});
            });

            return false;
        });

        if (section.find('input').length) {
            section.find('input').on('input', (i) => {
                let e = $(i.currentTarget), d = e.parent(), term = e.val(), f;
                section.find('.ks-dropbox-panel-item').each(function () {
                    f = $(this);
                    f.toggle(-1 !== f.find('.ks-dropbox-panel-item-text').html().toLowerCase().indexOf(term.toLowerCase()));
                });
            });
        }

        const itemHolder = $('#' + id + ' .ks-dropbox-panel').on('click', false).on('click', '.ks-dropbox-panel-item ', e => {
            const clickedItem = $(e.currentTarget);

            const checkbox = clickedItem.find('.ks-dropbox-panel-item-checkbox');

            const items = itemHolder.children('.widget-dropdown-item');

            if (checkbox.length && checkbox.is(':visible')) {
                checkbox.prop("checked", !checkbox.prop("checked"));
                app.widgetValue[id].items[clickedItem.index()].on = checkbox.prop("checked");
                app.widgetValue[id].value = $.grep(app.widgetValue[id].items, (item, i) => {
                    return item.on;
                }).map(item => {
                    return item.name;
                }).join();
            } else {
                itemHolder.find('.ks-dropbox-panel-item').removeClass('on').each(function () {
                    app.widgetValue[id].items[$(this).index()].on = $(this).hasClass('on');
                    app.widgetValue[id].value = $.grep(app.widgetValue[id].items, (item, i) => {
                        return item.on;
                    }).map(item => {
                        return item.name;
                    }).join();
                });
                clickedItem.addClass('on');
                app.widgetValue[id].items[clickedItem.index()].on = clickedItem.hasClass('on');
                app.widgetValue[id].value = $.grep(app.widgetValue[id].items, (item, i) => {
                    return item.on;
                }).map(item => {
                    return item.name;
                }).join();
                itemHolder.slideUp(50);

            }

            let v = $.grep(app.widgetValue[id].items, (item, i) => {
                return item.on;
            }).map(item => {
                return item.name;
            }).join(', '), searchText = $('#' + id + ' .search-text');

            searchText.attr('placeholder', v);
            searchText.val('');
            section.find('.ks-dropbox-panel-item').show();



            let element = $('<div></div>');
            element.data({action: 'choose', id: section.prop('id'), value: app.widgetValue[id].value});
            if (section.data('ordinal')) {
                element.data('ordinal', section.data('ordinal'));
            }
            Widget.doHandleSystemEvent(element, e);
            return false;
        });

        const catcher = app.doc.not(dropbox).on('touch click', e => {
            itemHolder.is(':visible') ? itemHolder.slideUp(50) : false;
        });

        itemHolder.hide();
    }

}
;

