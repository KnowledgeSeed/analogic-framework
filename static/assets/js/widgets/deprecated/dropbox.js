/* global app, Widget */

'use strict';
class OldDropBoxWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
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
        }).join();//multiselectre is kell majd
        this.state = o;
        this.value = data;
        let hide = o.hideIfNoData === true && d.length === 0;
        const html =
                `${data.titleVisible && !hide ? `<label>${data.title}</label>` : ''}
                <div ${hide ? ' style="display:none;" ' : ''} class="widget-dropdown dropdown-type">
                    ${data.multiSelect ?
                `<input class="search-text" placeholder="${$.grep(data.items, (item, i) => {
                    return item.on;
                }).map(item => {
            return item.name;
        }).join(', ')}"/>`
                :
                `<input class="search-text" placeholder="${$.grep(data.items, (item, i) => {
                    return item.on;
                }).map(item => {
            return item.name;
        }).join(', ')}"></input>`}
                    <div class="widget-dropdown-picker-holder holder">
                    ${data.multiSelect ? `
                        ${data.items.map(item => {
            return `<div class="widget-dropdown-item">
                                    <div class="widget-checkbox ${item.on ? 'on' : ''}">
                                            <span class="icon-checkbox-off"></span>
                                            <span class="icon-checkbox-on"></span>
                                    </div>
                                    ${item.name}
                                </div>`;
        }).join('')}                      `
                : `
                        ${data.items.map(item => {
                    return `<div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="widget-dropdown-item ${item.on ? 'on' : ''}" title="${item.name}">${item.name}</div>`
                }).join('')}
                        `
                }
                    </div>
                </div>`;

        return html;
    }

    initEventHandlers(section) {
        const id = section.attr('id');
        const dropbox = $('#' + id + ' .widget-dropdown').on('click', (e) => {
            app.doc.find(".dropdown-type .holder").not(dropbox).each((i, el) => {
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
                d.find('.widget-dropdown-item').each(function () {
                    f = $(this);
                    f.toggle(-1 !== f.html().toLowerCase().indexOf(term.toLowerCase()));
                });
            });
        }

        const itemHolder = $('#' + id + ' .widget-dropdown-picker-holder').on('click', false).on('click', '.widget-dropdown-item', e => {
            const clickedItem = $(e.currentTarget);

            const checkbox = clickedItem.children('.widget-checkbox').toggleClass('on');

            const items = itemHolder.children('.widget-dropdown-item');

            if (checkbox.length) {
                app.widgetValue[id].items[clickedItem.index()].on = checkbox.hasClass('on');
                app.widgetValue[id].value = $.grep(app.widgetValue[id].items, (item, i) => {
                    return item.on;
                }).map(item => {
                    return item.name;
                }).join();
            } else {
                itemHolder.children('.widget-dropdown-item').removeClass('on').each(function () {
                    app.widgetValue[id].items[$(this).index()].on = $(this).hasClass('on');
                    app.widgetValue[id].value = $.grep(app.widgetValue[id].items, (item, i) => {
                        return item.on;
                    }).map(item => {
                        return item.name;
                    }).join();//multiselectre is kell majd
                });
                clickedItem.addClass('on');
                app.widgetValue[id].items[clickedItem.index()].on = clickedItem.hasClass('on');
                app.widgetValue[id].value = $.grep(app.widgetValue[id].items, (item, i) => {
                    return item.on;
                }).map(item => {
                    return item.name;
                }).join();//multiselectre is kell majd
                itemHolder.slideUp(50);

            }

            let v = $.grep(app.widgetValue[id].items, (item, i) => {
                return item.on;
            }).map(item => {
                return item.name;
            }).join(', '), searchText = $('#' + id + ' .search-text');

            searchText.attr('placeholder', v);
            searchText.val('');
            section.find('.widget-dropdown-item').show();



            let element = $('<div></div>');
            element.data({action: 'choose', id: section.prop('id'), value: app.widgetValue[id].value});
            if(section.data('ordinal')){
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
