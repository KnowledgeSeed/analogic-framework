/* global Sortable, Utils, WidgetValue */

'use strict';
class PivotTableWidget extends Widget {

    getHtml(widgets, data) {
        this.value = JSON.parse(data);
        L(this.value);
        return `
            <div id="dimensionHolders" class="ks-pivot-table-controls-holder">
                <div class="ks-pivot-table-control-row presets-row">
                    <div class="ks-pivot-table-presets-btn">
                        <span class="icon-ellipsis"></span>
                        <div class="ks-pivot-table-presets-dropdown">
                            <a><span class="icon-clear" style="color: #dc3545;"></span>Reset</a>
                            <a><span class="icon-tray-arrow-down" style="color: #3aa745;"></span>Save as Preset</a>
                            <a><span class="icon-tray-files" style="color: #1d7bff;"></span>Load Preset</a>
                        </div>
                    </div>
                </div>

                <div class="ks-pivot-table-control-row"><div id="dimensionHolder" class="ks-pivot-table-tag-holder"></div></div>

                <div class="ks-pivot-table-control-row"><div id="dimensionSlicer" class="ks-pivot-table-tag-holder"><div class="ks-pivot-table-tag-holder-icon"><span class="icon-columns"></span></div></div></div>

                <div class="ks-pivot-table-control-row">
                    <div id="dimensionRowHolder" class="ks-pivot-table-tag-holder"><div class="ks-pivot-table-tag-holder-icon"><span class="icon-rows"></span></div></div>

                    <div class="ks-pivot-table-tag-switch"><span class="icon-arrow-swap"></span></div>

                    <div id="dimensionColHolder" class="ks-pivot-table-tag-holder"><div class="ks-pivot-table-tag-holder-icon"><span class="icon-columns"></span></div></div>
                </div>
            </div>
        </div>`;
    }

    initEventHandlers(section) {
        this.initDimensions(section);

        this.initPresetsDropdown(section);
    }

    initDimensions(section) {
        const colors = ['e83e8c', '6f42c1', 'e98300', '46c997', '1d7bff', '3aa745', 'fac107'];
        let dimName, hierarchyName, h = [], i = 0, o;

        for (dimName in this.value) {
            o = this.value[dimName];
            for (hierarchyName in o) {
                // has-next, has-prev
                h.push('<div data-dimension="', dimName, '" data-hierarchy="', hierarchyName, '" data-selected_member="', o[hierarchyName].defaultMember, '" data-selected_subset="" class="ks-pivot-table-tag"><div class="ks-pivot-table-tag-color" style="background-color: #', colors[i % colors.length], ';"></div><h3 class="ellipsis">', dimName, '</h3><h4 class="ellipsis">', hierarchyName, '</h4></div>');
                ++i;
            }
        }

        this.initSortable($('#dimensionHolder').html(h.join('')));

        h = [];


        this.initSortable($('#dimensionSlicer'), true);

        this.initSortable($('#dimensionRowHolder'), true);

        this.initSortable($('#dimensionColHolder'), true);
    }

    initPresetsDropdown(section) {
        const dd = section.find('.ks-pivot-table-presets-dropdown');

        dd.parent().on('click', e => {
            if ($(e.target).hasClass('ks-pivot-table-presets-btn')) {
                dd.toggle();
            }
        });
    }

    initSortable(div, initDropBox) {
        Sortable.create(div[0], {
            group: 1,
            draggable: '.ks-pivot-table-tag',
            filter: '.ks-pivot-table-tag-dropdown',
            preventOnFilter: false,
            onAdd: e => this.elementReplaced(e)
        });

        if (initDropBox) {
            div.on('click', '.ks-pivot-table-tag', e => this.initFilterDropBox(e));
        }
    }

    elementReplaced(e) {
        const id = e.target.id, v = ['dimensionRowHolder', 'dimensionColHolder'];

        if (v.includes(id) && v.includes(e.from.id)) {
            return;
        }

        e = $(e.item);

        e.children('.ks-pivot-table-tag-dropdown').remove();

        const a = e.children('h3'), dimName = e.data('dimension'), hierarchyName = e.data('hierarchy');

        if ('dimensionHolder' === id) {
            a.html(dimName).next().html(hierarchyName);
        } else if ('dimensionSlicer' === id) {
            a.html(hierarchyName).next().html(e.data('selected_member'));
        } else {

        }
    }

    initFilterDropBox(e) {
        if ($(e.target).closest('.ks-pivot-table-tag-dropdown').length) {
            return;
        }

        e = $(e.currentTarget);

        const children = e.children(), lastChild = children.last();

        if (lastChild.hasClass('ks-pivot-table-tag-dropdown')) {
            lastChild.toggle();

            return;
        }

        const color = children.filter('.ks-pivot-table-tag-color').css('background-color');
        const data = WidgetValue[e.closest('section').attr('id')][e.data('dimension')][e.data('hierarchy')];
        const selectedMember = e.data('selected_member');

        let h, d;

        if ('dimensionSlicer' === e.parent().attr('id')) {
            h = ['<div data-multi="false" class="ks-pivot-table-tag-dropdown"><div class="ks-pivot-table-tag-dropdown-search"><input type="text" placeholder="Search..."></div>'];

            for (d of data.elements) {
                h.push('<div class="ks-pivot-table-tag-dropdown-row"><div class="icon-check-', (selectedMember === d.name ? 'on' : 'off'), ' ks-pivot-table-tag-dropdown-row-icon" style="color: ', color, ';"></div>', d.name, (d.alias !== d.name ? (' ' + d.alias) : ''), '</div>');
            }
        } else {
            h = ['<div data-multi="true" class="ks-pivot-table-tag-dropdown"><div class="ks-pivot-table-tag-dropdown-search"><input type="text" placeholder="Search..."></div><div class="ks-pivot-table-tag-dropdown-row all-row"><span class="icon-check-on ks-pivot-table-tag-dropdown-row-icon" style="color: ', color, ';"></span></div>'];

            for (d of data.subsets) {
                h.push('<div class="ks-pivot-table-tag-dropdown-row"><div class="icon-check-off ks-pivot-table-tag-dropdown-row-icon" style="color: ', color, ';"></div>', d, '</div>');
            }
        }

        h.push('</div></div>');

        e.append(h.join('')).promise().then(() => this.initFilterDropBoxEventHandlers(lastChild.next()));
    }

    initFilterDropBoxEventHandlers(box) {
        let items = box.children(), input = items.eq(0).children('input'), len = items.length - 1;

        items = items.slice(1);

        input.on('input', () => this.searchFilterDropBox(Utils.cleanStr(input.val().trim()).toLowerCase(), items, len));

        box.on('click', '.ks-pivot-table-tag-dropdown-row', e => this.filterDropBoxItemClicked(e, box, items));
    }

    searchFilterDropBox(searchTerm, items, len) {
        let i, e;

        for (i = 0; i < len; ++i) {
            e = items.eq(i);
            e.toggle(-1 !== Utils.cleanStr(e.text()).toLowerCase().indexOf(searchTerm));
        }
    }

    filterDropBoxItemClicked(e, box, items) {
        e = $(e.currentTarget);

        let item = e.children().eq(0), activeCount = 0;

        if (box.data('multi')) {
            // icon-check-intermediate
        } else {
            items.children('.icon-check-on').removeClass('icon-check-on').addClass('icon-check-off');
        }

        activeCount += item.toggleClass('icon-check-off icon-check-on');

        if (1 === activeCount) {
            e.data('selected_member').children('h4', );
        } else {

        }
    }
}
;


