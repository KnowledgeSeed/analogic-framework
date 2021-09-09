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
        this.initSortable($('#dimensionSlicer'));

        this.initSortable($('#dimensionRowHolder'));

        this.initSortable($('#dimensionColHolder'));
    }

    initPresetsDropdown(section) {
        const dd = section.find('.ks-pivot-table-presets-dropdown');

        dd.parent().on('click', e => {
            if ($(e.target).hasClass('ks-pivot-table-presets-btn')) {
                dd.toggle();
            }
        });
    }

    initSortable(div) {
        Sortable.create(div[0], {
            group: 1,
            draggable: '.ks-pivot-table-tag',
            filter: '.ks-pivot-table-tag-dropdown',
            preventOnFilter: false,
            onAdd: e => this.elementReplaced(e)
        });
    }

    elementReplaced(e) {
        const id = e.target.id, v = ['dimensionRowHolder', 'dimensionColHolder'];

        if (v.includes(id) && v.includes(e.from.id)) {
            return;
        }

        e = $(e.item);

        e.children('.ks-pivot-table-tag-dropdown').remove();

        const a = e.children('h3'), dimName = e.data('dimension'), hierarchyName = e.data('hierarchy');

        if ('dimensionSlicer' === id) {
            a.html(hierarchyName).next().html(e.data('selected_member'));
        } else {

        }
    }
}
;


