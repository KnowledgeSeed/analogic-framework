/* global Sortable */

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
        let dimName, hierarchy, h = [], i = 0;

        for (dimName in this.value) {
            for (hierarchy of this.value[dimName]) {
                // has-next, has-prev
                h.push('<div class="ks-pivot-table-tag"><div class="ks-pivot-table-tag-color" style="background-color: #', colors[i % colors.length], ';"></div><h3 class="ellipsis">', dimName, '</h3><h4 class="ellipsis">', hierarchy.name, '</h4></div>');
                ++i;
            }
        }

        this.initSortable($('#dimensionHolder').html(h.join('')));

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
            //onAdd:
        });
    }


}
;