/* global app, El, MiddleWare, Repository, Sortable, Utils, WidgetValue */

'use strict';
class PivotTableWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;

        const v = {
            selectorTreeColNames: ['Dimensions', 'Hierarchies', 'Subsets', 'Elements'],
            colors: [{name: 'Light Blue 100', hex: '009FDA'}, {name: 'Light Blue 60', hex: '66C5E9'}, {name: 'Light Blue 40', hex: '99D9F0'}, {name: 'Gray', hex: '747678'}, {name: 'Gray 40', hex: 'C7C8C9'}, {name: 'Gray 20', hex: 'E3E4E4'}, {name: 'Purple', hex: '80379B'}, {name: 'Purple 60', hex: 'B387C3'}, {name: 'Purple 40', hex: 'CCAFD7'}, {name: 'Orange', hex: 'E98300'}, {name: 'Orange 60', hex: 'F2B566'}, {name: 'Orange 40', hex: 'F6CD99'}, {name: 'Pink', hex: 'D71F85'}, {name: 'Pink 60', hex: 'E77986'}, {name: 'Pink 40', hex: 'EFA5CE'}, {name: 'Green', hex: '739600'}, {name: 'Green 60', hex: 'ABC066'}, {name: 'Green 40', hex: 'C7D599'}],
            dimensionNames: data,
            selectorData: {}
        };

        this.value = v;

        return `
<div class="ks-pivot-table-controls-holder">
    <div class="ks-pivot-table-control-row presets-row">
        <div class="ks-pivot-table-presets-btn">
            <span class="icon-ellipsis"></span>
            <div id="pivotPresetsDropdown" class="ks-pivot-table-presets-dropdown">
                <a><span class="icon-clear" style="color: #dc3545;"></span>Reset</a>
                <a><span class="icon-tray-arrow-down" style="color: #3aa745;"></span>Save as Preset</a>
                <a><span class="icon-tray-files" style="color: #1d7bff;"></span>Load Preset</a>
            </div>
        </div>
    </div>

    <div class="ks-pivot-table-control-row"><div id="pivotSlicer" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-filter-circle icon-columns"></span></div></div></div>

    <div class="ks-pivot-table-control-row">
        <div id="pivotRowSelector" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-rows"></span></div></div>

        <div class="ks-pivot-table-tag-switch"><span class="icon-arrow-swap"></span></div>

        <div id="pivotColSelector" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-columns"></span></div></div>
    </div>
</div>`;
    }

    initEventHandlers(section) {
        this.initPresetsDropdown();

        this.initSelectorTree(section);

        this.holders = $('#pivotSlicer,#pivotRowSelector,#pivotColSelector');

        this.initSortable(this.holders.eq(0));

        this.initSortable(this.holders.eq(1));

        this.initSortable(this.holders.eq(2));

        section.on('click', '.ks-pivot-table-add-tag', e => this.openSelectorTreeFromHolder(e)).on('click', '.ks-pivot-table-tag', e => this.openSelectorTreeFromCard(e));
    }

    initPresetsDropdown() {
        const dd = $('#pivotPresetsDropdown');

        dd.parent().on('click', e => {
            if ($(e.target).hasClass('ks-pivot-table-presets-btn')) {
                dd.toggle();
            }
        });
    }

    initSelectorTree(section) {
        const v = this.value, h = ['<div style="display: none; margin: 50px auto;"><div class="ks-pivot-tag-add-controls"><div class="ks-pivot-tag-color-dropdown-holder"><label>Pivot Colour</label><div class="ks-pivot-tag-color-dropdown"><div class="ks-pivot-tag-color-icon"></div><span></span><div style="display: none;" class="ks-pivot-tag-color-dropdown-chooser">'];

        this.addToNextLevelChildren(v.selectorData, v.dimensionNames);

        for (let color of v.colors) {
            h.push('<div data-name="', color.name, '" data-hex="', color.hex, '" class="ks-pivot-tag-color-dropdown-chooser-item" style="background-color: #', color.hex, ';"></div>');
        }

        h.push('</div></div></div><div class="ks-pivot-tag-button-holder"><a id="selectorTreeDeleteBtn" class="ks-pivot-btn btn-red">Delete</a><a id="selectorTreeCancelBtn" class="ks-pivot-btn btn-blue-light">Cancel</a><a id="selectorTreeSaveBtn" class="ks-pivot-btn btn-blue">Save</a></div></div><div class="ks-pivot-tag-add-holder">');

        h.push(this.renderNextSelectorTreeLevel(v.selectorData), '</div></div>');

        this.selectorTree = $(h.join('')).prependTo(section)
        .on('click', '.ks-pivot-tag-add-item:not(".title-item")', e => this.selectorTreeItemClicked(e))
        .on('click', '.icon-ellipsis', e => this.selectorTreeSubsetContextMenuButtonClicked(e));

        this.colorDropdown = this.selectorTree.find('.ks-pivot-tag-color-dropdown').on('click', e => this.selectorTreeColorClicked(e));

        this.selectorTreeSaveBtn = $('#selectorTreeSaveBtn').on('click', () => this.saveCard());
        this.selectorTreeDeleteBtn = $('#selectorTreeDeleteBtn').on('click', () => this.deleteCard());
        $('#selectorTreeCancelBtn').on('click', () => this.closeSelectorTree());
    }

    initSortable(div) {
        Sortable.create(div[0], {
            group: 1,
            draggable: '.ks-pivot-table-tag',
            preventOnFilter: false,
            onAdd: e => this.cardReplaced(e)
        });
    }

    cardReplaced(e) {

    }

    selectorTreeItemClicked(e) {
        const clickedPart = $(e.target), c = ['icon-check-off', 'icon-check-on'], d = c.join(' '), item = $(e.currentTarget), col = item.parent();

        if ('element_name' === col.data('type')) {
            item.children().eq(0).toggleClass(d);

            let checkBoxes = col.children().children('span'), info = checkBoxes.eq(0).removeClass();
            checkBoxes = checkBoxes.slice(1);

            if (!checkBoxes.filter('.icon-check-off').length) {
                info.addClass(c[1]);
            } else if (!checkBoxes.filter('.icon-check-on').length) {
                info.addClass(c[0]);
            } else {
                info.addClass('icon-check-intermediate');
            }

            return;
        } else if (clickedPart.hasClass(c[0]) || clickedPart.hasClass(c[1])) {
            clickedPart.toggleClass(d);

            item.siblings().children('.icon-check-on').toggleClass(d);

            const isSelected = clickedPart.hasClass(c[1]);

            this.selectorTreeSaveBtn.toggleClass('disabled', !this.taintedCard && !isSelected);

            col.data('sel', isSelected ? item.data('name') : '');

            return;
        }

        item.toggleClass('ks-on').siblings().removeClass('ks-on');

        const isItemActive = item.hasClass('ks-on');

        col.data('value', isItemActive ? item.data('name') : '').nextAll().remove();

        if (isItemActive) {
            this.showNextSelectorTreeLevel();
        }
    }

    showNextSelectorTreeLevel() {
        let i, col, val, v = this.value, cols = this.getSelectorTreeColumns(), selectedData = {}, nextLevelData;

        for (i = 0; i < cols.length; ++i) {
            col = cols.eq(i);
            val = col.data('value');

            selectedData[col.data('type')] = val;

            nextLevelData = (nextLevelData || v.selectorData)[val].children || {};
        }

        if ($.isEmptyObject(nextLevelData)) {
            this.getNextSelectorTreeLevel(selectedData, nextLevelData, cols);
        } else {
            this.renderNextSelectorTreeLevel(nextLevelData, cols);
        }
    }

    getNextSelectorTreeLevel(selectedData, nextLevelData, cols) {
        const postParams = Repository[this.options.id].init;

        postParams.data = selectedData;

        $.when(MiddleWare.call(postParams)).then(data => {
            this.addToNextLevelChildren(nextLevelData, data);

            this.renderNextSelectorTreeLevel(nextLevelData, cols);
        });
    }

    addToNextLevelChildren(nextLevelData, data) {
        for (let name of data) {
            nextLevelData[name] = {children: {}};
        }
    }

    renderNextSelectorTreeLevel(nextLevelData, cols) {
        const types = ['dimension', 'hierarchy', 'subset', 'element'], i = cols ? cols.length : 0, v = this.value, isCheckableCol = (i > 1), isElementsCol = (3 === i);

        let name, h = ['<div data-type="', types[i], '_name" class="ks-pivot-tag-add-col ', (isCheckableCol ? 'checkable-col' : ''), '"><div class="ks-pivot-tag-add-item title-item">', (isElementsCol ? '<span class="icon-check-on"></span>' : ''), v.selectorTreeColNames[i], (isElementsCol ? '<span class="icon-ellipsis"><div class="ks-pivot-table-presets-dropdown"><a data-action="save"><span class="icon-plus-circle" style="color: #1d7bff;"></span>Save as New Subset</a><a data-action="remove"><span class="icon-trash-fill" style="color: #dc3545;"></span>Remove Subset</a></div></span>' : ''), '</div>'];

        if (isCheckableCol) {
            let chevron = 2 === i ? '<span class="icon-chevron-right"></span>' : '';

            for (name in nextLevelData) {
                h.push('<div class="ks-pivot-tag-add-item" data-name="', name, '"><span class="icon-check-', (isElementsCol ? 'on' : 'off'), '"></span>', name, chevron, '</div>');
            }
        } else {
            for (name in nextLevelData) {
                h.push('<div class="ks-pivot-tag-add-item" data-name="', name, '">', name, '<span class="icon-chevron-right"></span></div>');
            }
        }

        h.push('</div>');

        h = h.join('');

        if (!cols) {
            return h;
        }

        cols.last().after(h);
    }

    selectorTreeColorClicked(e, doNotOpen) {
        e = $(e.target);

        if (e.hasClass('ks-pivot-tag-color-dropdown-chooser-item')) {
            const hex = e.data('hex');

            e.parent().prev().html(e.data('name')).prev().css('background-color', '#' + hex);

            this.colorDropdown.data('hex', hex);
        } else if (e.hasClass('ks-pivot-tag-color-dropdown-chooser')) {
            return;
        }

        if (!doNotOpen) {
            this.colorDropdown.children('.ks-pivot-tag-color-dropdown-chooser').toggle();
        }
    }

    saveCard() {
        if (this.selectorTreeSaveBtn.hasClass('disabled')) {
            return;
        }

        if (this.taintedHolder) {
            this.saveNewCardIfNotExistsInTheHolderAlready();
        } else {
            this.adjustCardAccordingToNewSelection();
        }

        this.closeSelectorTree();
    }

    saveNewCardIfNotExistsInTheHolderAlready() {
        const cols = this.getSelectorTreeColumns(), dimension = cols.eq(0).data('value'), hierarchy = cols.eq(1).data('value'), subset = cols.eq(2).data('sel');

        const cardSelector = '[data-dimension="' + dimension + '"][data-hierarchy="' + hierarchy + '"][data-subset="' + subset + '"]';
        const card = this.taintedHolder.children(cardSelector);

        if (card.length) {
            return;
        }

        this.holders.not(this.taintedHolder).children(cardSelector).remove();

        const hex = this.colorDropdown.data('hex');
        const h = ['<div class="ks-pivot-table-tag" data-dimension="', dimension, '" data-hierarchy="', hierarchy, '" data-subset="', subset, '" data-hex="', hex, '"><div class="ks-pivot-table-tag-color" style="background-color: #', hex, ';"></div><h3>', dimension, '</h3><h4>', subset, '</h4></div>'];

        this.taintedHolder.append(h.join(''));
    }

    adjustCardAccordingToNewSelection() {
        const cols = this.getSelectorTreeColumns(), hex = this.colorDropdown.data('hex');
        const dimension = cols.eq(0).data('value'), hierarchy = cols.eq(1).data('value'), subset = cols.eq(2).data('sel');

        if (!subset.length) {
            this.deleteCard();

            return;
        }

        this.taintedCard.data({dimension: dimension, hierarchy: hierarchy, subset: subset, hex: hex});
        this.taintedCard.children().eq(0).css('background-color', '#' + hex).next().html(dimension).next().html(subset);
    }

    deleteCard() {
        const popup = $('<div class="ks-pivot-tag-add-popup"><h3>Do you really want to delete card?</h3><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">No</a><a data-action="yes" class="ks-pivot-btn btn-blue">Yes</a></div></div>');

        popup.on('click', 'a', e => {
            if ('yes' === $(e.currentTarget).data('action')) {
                this.taintedCard.remove();

                this.closeSelectorTree();
            }

            popup.remove();

            Utils.backdrop.hide();
        });

        El.body.prepend(popup);

        Utils.backdrop.show();
    }

    selectorTreeSubsetContextMenuButtonClicked(e) {
        const btn = $(e.target), action = btn.closest('a').data('action');

        if (btn.hasClass('icon-ellipsis')) {
            btn.children().toggle();
        } else if ('save' === action) {
            this.saveAsNewSubset();
        } else if ('remove' === action) {
            this.removeSubset();
        }
    }

    saveAsNewSubset() {
        const popup = $('<div class="ks-pivot-tag-add-popup"><h3>Save as New Subset</h3><label>Subset Title</label><input type="text"><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">Cancel</a><a data-action="save" class="ks-pivot-btn btn-blue">Save</a></div></div>');

        popup.on('click', 'a', e => {
            e = $(e.currentTarget);

            if ('save' === e.data('action')) {
                const input = e.parent().parent().children('input'), newSubsetName = input.val().trim();

                input.toggleClass('error', !newSubsetName);

                if (newSubsetName) {
                    this.doSaveAsNewSubset(newSubsetName, popup);
                }

                return;
            }

            popup.remove();

            Utils.backdrop.hide();
        });

        El.body.prepend(popup);

        Utils.backdrop.show();
    }

    doSaveAsNewSubset(newSubsetName, popup) {
        const postParams = Repository[this.options.id].init, cols = this.getSelectorTreeColumns(), d = {};

        d.dimension_name = cols.eq(0).data('value');
        d.hierarchy_name = cols.eq(1).data('value');
        d.subset_name = newSubsetName;
        d.element_names = cols.eq(3).children().slice(1).children('.icon-check-on').map((i, e) => $(e).parent().data('name')).get();

        postParams.data = d;

        $.when(MiddleWare.call(postParams)).then(subsetNames => this.reloadSubsetsInSelectorTree(popup, cols, d, subsetNames));
    }

    removeSubset() {
        const popup = $('<div class="ks-pivot-tag-add-popup"><h3>Do you really want to delete subset?</h3><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">No</a><a data-action="yes" class="ks-pivot-btn btn-blue">Yes</a></div></div>');

        popup.on('click', 'a', e => {
            if ('yes' === $(e.currentTarget).data('action')) {
                this.doRemoveSubset(popup);

                return;
            }

            popup.remove();

            Utils.backdrop.hide();
        });

        El.body.prepend(popup);

        Utils.backdrop.show();
    }

    doRemoveSubset(popup) {
        const postParams = Repository[this.options.id].init, cols = this.getSelectorTreeColumns(), d = {};

        d.dimension_name = cols.eq(0).data('value');
        d.hierarchy_name = cols.eq(1).data('value');
        d.subset_name_to_remove = cols.eq(2).data('value');

        postParams.data = d;

        $.when(MiddleWare.call(postParams)).then(subsetNames => this.reloadSubsetsInSelectorTree(popup, cols, d, subsetNames));
    }

    reloadSubsetsInSelectorTree(popup, cols, selectedData, subsetNames) {
        cols.eq(2).remove();
        cols.eq(3).remove();

        this.value.selectorData[selectedData.dimension_name].children[selectedData.hierarchy_name].children = {};

        this.addToNextLevelChildren(this.value.selectorData[selectedData.dimension_name].children[selectedData.hierarchy_name].children, subsetNames);

        this.renderNextSelectorTreeLevel(this.value.selectorData[selectedData.dimension_name].children[selectedData.hierarchy_name].children, cols.slice(0, 2));

        popup.remove();

        Utils.backdrop.hide();
    }

    openSelectorTreeFromCard(e) {
        e = $(e.currentTarget);

        this.taintedHolder = null;
        this.taintedCard = e;

        this.setSelectorTreeForCardPosition();

        this.selectorTreeColorClicked(this.colorDropdown.find('.ks-pivot-tag-color-dropdown-chooser-item[data-hex="' + e.data('hex') + '"]'), true);

        this.selectorTreeSaveBtn.removeClass('disabled');

        this.selectorTreeDeleteBtn.show();

        this.selectorTree.show().next().hide();
    }

    setSelectorTreeForCardPosition() {
        let e = this.taintedCard, col = this.getSelectorTreeColumns().eq(0);

        col.children().filter((i, c) => e.data('dimension') === $(c).data('name')).trigger('click');

        col = col.next();
        col.children().filter((i, c) => e.data('hierarchy') === $(c).data('name')).trigger('click');

        col = col.next();
        col.children().filter((i, c) => e.data('subset') === $(c).data('name')).children().eq(0).trigger('click');
    }

    openSelectorTreeFromHolder(e) {
        this.taintedCard = null;
        this.taintedHolder = $(e.currentTarget).closest('.ks-pivot-table-tag-holder');

        this.offerNextColorInSelectorTreeColorDropdown();

        this.selectorTreeSaveBtn.addClass('disabled');

        this.selectorTreeDeleteBtn.hide();

        this.selectorTree.show().next().hide();
    }

    offerNextColorInSelectorTreeColorDropdown() {
        const v = this.value, colors = {}, cards = this.taintedHolder.children('.ks-pivot-table-tag');

        v.colors.forEach(e => colors[e.hex] = 0);

        let i, len = cards.length, offeredColor;

        for (i = 0; i < len; ++i) {
            ++colors[cards.eq(i).data('hex')];
        }

        const min = Math.min(...Object.values(colors));

        for (i of v.colors) {
            if (min === colors[i.hex]) {
                offeredColor = i;
                break;
            }
        }

        this.colorDropdown.data('hex', i.hex).children('.ks-pivot-tag-color-icon').css('background-color', '#' + i.hex).next().html(i.name);
    }

    closeSelectorTree() {
        const cols = this.getSelectorTreeColumns();

        cols.data('value', '').eq(0).children('.ks-on').removeClass('ks-on');
        cols.slice(1).remove();

        this.selectorTree.hide().next().show();
    }

    getSelectorTreeColumns() {
        return this.selectorTree.children('.ks-pivot-tag-add-holder').children();
    }
}
;