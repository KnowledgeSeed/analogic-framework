/* global app, El, MiddleWare, Repository, Sortable, Utils, WidgetValue */

'use strict';
class PivotTableWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;

        const v = {
            selectorTreeColNames: ['Dimensions', 'Hierarchies', 'Subsets', 'Elements'],
            colors: [{name: 'Light Blue 100', hex: '009FDA'}, {name: 'Light Blue 60', hex: '66C5E9'}, {name: 'Light Blue 40', hex: '99D9F0'}, {name: 'Gray', hex: '747678'}, {name: 'Gray 40', hex: 'C7C8C9'}, {name: 'Gray 20', hex: 'E3E4E4'}, {name: 'Purple', hex: '80379B'}, {name: 'Purple 60', hex: 'B387C3'}, {name: 'Purple 40', hex: 'CCAFD7'}, {name: 'Orange', hex: 'E98300'}, {name: 'Orange 60', hex: 'F2B566'}, {name: 'Orange 40', hex: 'F6CD99'}, {name: 'Pink', hex: 'D71F85'}, {name: 'Pink 60', hex: 'E77986'}, {name: 'Pink 40', hex: 'EFA5CE'}, {name: 'Green', hex: '739600'}, {name: 'Green 60', hex: 'ABC066'}, {name: 'Green 40', hex: 'C7D599'}],
            data: data,
            tree: {children: {}}
        };

        this.value = v;

        return `
<div class="ks-pivot-table-controls-holder">
    <div class="ks-pivot-table-control-row presets-row">
        <div class="ks-pivot-table-presets-btn">
            <span class="icon-ellipsis"></span>
            <div id="pivotPresetsDropdown" class="ks-pivot-table-presets-dropdown">
                <a id="resetPivotBtn"><span class="icon-clear" style="color: #dc3545;"></span>Reset</a>
                <a><span class="icon-tray-arrow-down" style="color: #3AA745;"></span>Save as Preset</a>
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
</div><table id="pivotTable" class="ks-pivot-table"></div>`;
    }

    initEventHandlers(section) {
        this.initPresetsDropdown();

        this.initSelectorTree(section);

        this.holders = $('#pivotSlicer,#pivotRowSelector,#pivotColSelector');

        this.initSortable(this.holders.eq(0));

        this.initSortable(this.holders.eq(1));

        this.initSortable(this.holders.eq(2));

        section.on('click', '.ks-pivot-table-add-tag', e => this.openSelectorTreeFromHolder(e))
        .on('click', '.ks-pivot-table-tag', e => this.openSelectorTreeFromCard(e))
        .on('click', '.icon-x-circle', e => this.deleteCard(e))
        .on('click', '.ks-pivot-table-tag-switch', () => this.changeRowsAndColumnsCards())
        .on('click', '#resetPivotBtn', () => this.resetPivotTable());

        this.pivotTable = $('#pivotTable').on('click', '.ks-pivot-table-group-sign-start', e => PivotTableWidget.collapseButtonClicked(e))
        .on('click', '.ks-pivot-table-group-sign-closed', e => PivotTableWidget.expandButtonClicked(e))
        .on('click', '.icon-chevron-close-horizontal', e => PivotTableWidget.squeezeRowColumns(e))
        .on('click', '.icon-chevron-open-horizontal', e => PivotTableWidget.pullApartRowColumns(e));
    }

    initPresetsDropdown() {
        const dd = $('#pivotPresetsDropdown');

        dd.parent().on('click', e => {
            e = $(e.target);
            if (e.hasClass('ks-pivot-table-presets-btn') || e.hasClass('icon-ellipsis')) {
                dd.toggle();
            }
        });
    }

    initSelectorTree(section) {
        const v = this.value, h = ['<div style="display: none; margin: 50px auto;"><div class="ks-pivot-tag-add-controls"><div class="ks-pivot-tag-color-dropdown-holder"><label>Pivot Colour</label><div class="ks-pivot-tag-color-dropdown"><div class="ks-pivot-tag-color-icon"></div><span></span><div style="display: none;" class="ks-pivot-tag-color-dropdown-chooser">'];

        this.addToNextLevelChildren(v.tree, v.data.children, v.data.data);

        for (let color of v.colors) {
            h.push('<div data-name="', color.name, '" data-hex="', color.hex, '" class="ks-pivot-tag-color-dropdown-chooser-item" style="background-color: #', color.hex, ';"></div>');
        }

        h.push('</div></div></div><div class="ks-pivot-tag-button-holder"><a id="selectorTreeDeleteBtn" class="ks-pivot-btn btn-red">Delete</a><a id="selectorTreeCancelBtn" class="ks-pivot-btn btn-blue-light">Cancel</a><a id="selectorTreeSaveBtn" class="ks-pivot-btn btn-blue">Save</a></div></div><div class="ks-pivot-tag-add-holder">');

        h.push(this.renderNextSelectorTreeLevel(v.tree), '</div></div>');

        this.selectorTree = $(h.join('')).prependTo(section)
        .on('click', '.ks-pivot-tag-add-item:not(".title-item")', e => this.selectorTreeItemClicked(e))
        .on('click', '.icon-ellipsis', e => this.selectorTreeSubsetContextMenuButtonClicked($(e.target)))
        .on('click', '.icon-aa', e => this.aliasAttributeNameButtonClicked($(e.target)))
        .on('input change', 'input', e => this.filterSelectorTreeColumn(e));

        this.colorDropdown = this.selectorTree.find('.ks-pivot-tag-color-dropdown').on('click', e => this.selectorTreeColorClicked($(e.target)));

        this.selectorTreeSaveBtn = $('#selectorTreeSaveBtn').on('click', () => this.saveCard());
        this.selectorTreeDeleteBtn = $('#selectorTreeDeleteBtn').on('click', () => this.deleteCard());

        $('#selectorTreeCancelBtn').on('click', () => this.closeSelectorTree());
    }

    initSortable(div) {
        Sortable.create(div[0], {
            group: 1,
            draggable: '.ks-pivot-table-tag',
            preventOnFilter: false,
            onAdd: e => this.cardReplacedToOtherHolder(e),
            onUpdate: () => PivotTableWidget.getPivotTable()
        });
    }

    cardReplacedToOtherHolder(e) {
        let d, id = 'pivotSlicer', card = $(e.item), defaultMember, dim = card.data('dimension'), hier = card.data('hierarchy'), subset = card.data('subset');

        if (id === e.to.id) {
            $(e.to).children('[data-dimension="' + dim + '"][data-hierarchy="' + hier + '"]').not(card).remove();

            d = this.value.tree.children[dim].children[hier];
            defaultMember = d.defaultMember;

            d = d.children[subset];

            if ($.isEmptyObject(d.children)) {
                let p = {dimension_name: dim, hierarchy_name: hier, subset_name: subset};

                this.getNextSelectorTreeLevel(p, d).then(resp => this.adjustCardForSlicer(card, resp.data.children, defaultMember));
            } else {
                this.adjustCardForSlicer(card, d.children, defaultMember);
            }
        } else {
            this.holders.slice(1).children('[data-dimension="' + dim + '"][data-hierarchy="' + hier + '"]').not(card).remove();

            card.attr('data-element', '').data('element', '').find('h4').html(card.data('subset'));
        }

        PivotTableWidget.getPivotTable();
    }

    adjustCardForSlicer(card, elements, defaultMember) {
        let e, elNames = Object.keys(elements);

        if (defaultMember && elNames.includes(defaultMember)) {
            e = defaultMember;
        } else {
            e = elNames[0];
        }

        card.attr('data-element', e).data('element', e).find('h4').html(e);
    }

    selectorTreeItemClicked(e) {
        this.removeDuplicatedSelectorTreeCols = !e.isTrigger;

        let clickedPart = $(e.target), item = $(e.currentTarget), col = item.parent().parent(), isTaintedHolderSlicer = this.isTaintedHolderSlicer(), colType = col.data('type'), isSelectedBySubsetCheckbox = null, value = item.data('name');

        if ('element' === colType) {
            this.elementClicked(isTaintedHolderSlicer, item, col);

            this.adjustSelectorTreeSaveBtnVisibility();

            return;
        } else if (clickedPart.hasClass('icon-check-on') || clickedPart.hasClass('icon-check-off') || clickedPart.hasClass('icon-check-intermediate')) {
            isSelectedBySubsetCheckbox = this.subsetCheckboxClicked(clickedPart, item);
        } else if ('dimension' === colType || 'hierarchy' === colType) {
            this.resetSelectorTreeSelections();
        }

        if (isSelectedBySubsetCheckbox) {
            item.toggleClass('ks-on', true).siblings().removeClass('ks-on');
        } else if (null === isSelectedBySubsetCheckbox) {
            item.toggleClass('ks-on').siblings().removeClass('ks-on');
        }

        const isItemActive = item.hasClass('ks-on');

        this.lastClickedSelectorTreeItem = isItemActive ? {col: colType, name: value} : null;

        col.data('value', isItemActive ? value : '').nextAll().remove();

        if (isItemActive) {
            this.showNextSelectorTreeLevel();
        }

        this.adjustSelectorTreeSaveBtnVisibility();
    }

    elementClicked(isTaintedHolderSlicer, item, col) {
        const span = item.children().eq(0).toggleClass('icon-check-off icon-check-on');

        if (isTaintedHolderSlicer) {
            item.siblings().children(':first-child').removeClass('icon-check-on').addClass('icon-check-off');

            return;
        }

        const cols = this.getSelectorTreeColumns(), subsetItemCheckInfo = col.prev().children('.ks-pivot-tag-add-col-content').children('.ks-on').children().eq(0).removeClass();
        const d = this.value.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[cols.eq(2).data('value')];
        const infoCheckbox = this.adjustElementColumnCheckInfo(col), subsetCheckboxClass = infoCheckbox.attr('class');

        d.checkboxClass = subsetCheckboxClass;
        d.children[item.data('name')].on = span.hasClass('icon-check-on');

        subsetItemCheckInfo.removeClass().addClass(subsetCheckboxClass);
    }

    subsetCheckboxClicked(clickedPart, item) {
        let subsetCheckboxClass, isSubsetSelected = false, subset = item.data('name'), cols = this.getSelectorTreeColumns();

        if (clickedPart.hasClass('icon-check-on') || clickedPart.hasClass('icon-check-intermediate')) {
            subsetCheckboxClass = 'icon-check-off';
        } else {
            subsetCheckboxClass = 'icon-check-on';
            isSubsetSelected = true;
        }

        clickedPart.removeClass().addClass(subsetCheckboxClass);

        this.value.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[subset].checkboxClass = subsetCheckboxClass;

        this.adjustElementsSelectivityMetaData(cols, isSubsetSelected, subset);

        return isSubsetSelected;
    }

    adjustElementColumnCheckInfo(col) {
        let checkBoxes = col.children('.ks-pivot-tag-add-col-content').children().children('span'), infoCheckbox = checkBoxes.eq(0).removeClass();

        checkBoxes = checkBoxes.slice(1);

        if (!checkBoxes.filter('.icon-check-off').length) {
            infoCheckbox.addClass('icon-check-on');
        } else if (!checkBoxes.filter('.icon-check-on').length) {
            infoCheckbox.addClass('icon-check-off');
        } else {
            infoCheckbox.addClass('icon-check-intermediate');
        }

        return infoCheckbox;
    }

    adjustElementsSelectivityMetaData(cols, isSubsetSelected, subset) {
        let i, elements = this.value.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[subset || cols.eq(2).data('value')];

        if (elements) {
            elements = elements.children;

            for (i in elements) {
                elements[i].on = isSubsetSelected;
            }
        }
    }

    adjustSelectorTreeSaveBtnVisibility() {
        if (this.taintedCard) {
            return;
        }

        const cols = this.getSelectorTreeColumns(), isDisabled = !cols.eq(this.isTaintedHolderSlicer() ? 3 : 2).children('.ks-pivot-tag-add-col-content').children().slice(1).children('.icon-check-on').length;

        this.selectorTreeSaveBtn.toggleClass('disabled', isDisabled);
    }

    showNextSelectorTreeLevel() {
        let i, col, val, v = this.value, cols = this.getSelectorTreeColumns(), selectedData = {}, nextLevelData;

        for (i = 0; i < cols.length; ++i) {
            col = cols.eq(i);
            val = col.data('value');

            selectedData[col.data('type') + '_name'] = val;

            nextLevelData = (nextLevelData || v.tree).children[val];
        }

        if ($.isEmptyObject(nextLevelData.children)) {
            this.getNextSelectorTreeLevel(selectedData, nextLevelData, cols);
        } else {
            this.renderNextSelectorTreeLevel(nextLevelData, cols);
        }
    }

    getNextSelectorTreeLevel(selectedData, nextLevelData, cols) {
        const postParams = {...Repository[this.options.id].init};

        postParams.data = selectedData;

        return $.when(MiddleWare.call(postParams)).then(resp => {
            this.addToNextLevelChildren(nextLevelData, resp.children, resp.data);

            if (cols) {
                this.renderNextSelectorTreeLevel(nextLevelData, cols);
            }

            return resp;
        });
    }

    addToNextLevelChildren(currentLevelData, children, additionalData = {}) {
        Object.assign(currentLevelData, additionalData);

        for (let name of children) {
            currentLevelData.children[name] = {children: {}};
    }
    }

    renderNextSelectorTreeLevel(nextLevelData, cols) {
        const types = ['dimension', 'hierarchy', 'subset', 'element'], i = cols ? cols.length : 0, v = this.value, children = nextLevelData.children;
        const isTaintedHolderSlicer = this.isTaintedHolderSlicer(), isCheckableCol = (i > 1), isElementCol = (3 === i);
        const aliasAttrName = isElementCol ? this.getSelectedAliasAttributeName(cols.eq(0).data('value'), cols.eq(1).data('value')) : false;

        let el, isCheckedElementRenderedForSlicer = false, name, isSubsetSelected, h = ['<div data-type="', types[i], '" class="ks-pivot-tag-add-col ', (isCheckableCol && (!isTaintedHolderSlicer || isElementCol) ? 'checkable-col' : ''), '"><div class="ks-pivot-add-tag-search-holder"><div class="ks-pivot-add-tag-search"><span class="icon-search"></span><input type="text" placeholder="Search..."></div></div><div class="ks-pivot-tag-add-col-content"><div class="ks-pivot-tag-add-item title-item">', (isElementCol ? ('<span ' + (isTaintedHolderSlicer ? 'style="display: none;"' : '') + '></span>') : ''), v.selectorTreeColNames[i], (isElementCol ? '<span class="icon-aa"><div class="ks-pivot-table-presets-dropdown"></div></span><span class="icon-ellipsis"><div class="ks-pivot-table-presets-dropdown"><a data-action="save"><span class="icon-plus-circle" style="color: #1d7bff;"></span>Save as New Subset</a><a data-action="remove"><span class="icon-trash-fill" style="color: #dc3545;"></span>Remove Subset</a></div></span>' : ''), '</div>'];

        if (isCheckableCol) {
            let check, defautMember, chevron = 2 === i ? '<span class="icon-chevron-right"></span>' : '', subsetCheckbox = cols.eq(2).children('.ks-pivot-tag-add-col-content').children('.ks-on').children('span').eq(0);

            if (subsetCheckbox.hasClass('icon-check-on')) {
                isSubsetSelected = true;
            } else if (subsetCheckbox.hasClass('icon-check-off')) {
                isSubsetSelected = false;
            }

            for (name in children) {
                el = children[name];

                if (isTaintedHolderSlicer) {
                    if (isElementCol) {
                        defautMember = nextLevelData.defautMember;
                        check = '<span class="icon-check-' + (((!defautMember && !isCheckedElementRenderedForSlicer) || defautMember === name) ? 'on' : 'off') + '"></span>';
                        isCheckedElementRenderedForSlicer = true;
                    } else {
                        check = '';
                    }
                } else {
                    if (isElementCol) {
                        check = '<span class="icon-check-' + (el.on || isSubsetSelected ? 'on' : 'off') + '"></span>';
                    } else {
                        check = '<span class="' + (el.checkboxClass || 'icon-check-off') + '"></span>';
                    }
                }

                h.push('<div class="ks-pivot-tag-add-item" data-name="', name, '">', check, ((isElementCol && aliasAttrName) ? (name + ' (' + el[aliasAttrName] + ')') : name), chevron, '</div>');
            }
        } else {
            for (name in children) {
                h.push('<div class="ks-pivot-tag-add-item" data-name="', name, '">', name, '<span class="icon-chevron-right"></span></div>');
            }
        }

        h.push('</div></div>');

        h = h.join('');

        if (!cols) {
            return h;
        }

        let col = cols.last(), j;

        return col.after(h).promise().then(() => {
            cols = this.getSelectorTreeColumns();

            if (this.removeDuplicatedSelectorTreeCols) {
                for (j = cols.length - 1; j > i; --j) {
                    cols.eq(j).remove();
                }
            }

            if (isElementCol) {
                this.adjustElementColumnCheckInfo(col.next());
            }

            if ('undefined' !== typeof isSubsetSelected) {
                this.adjustElementsSelectivityMetaData(cols, isSubsetSelected);
            }

            this.adjustSelectorTreeSaveBtnVisibility();

            if (1 === this.subsetMergeSaveStatus) {
                this.subsetMergeSaveStatus = 2;
                this.getSelectorTreeColumns().eq(2).children('.ks-pivot-tag-add-col-content').children('[data-name="' + this.newSubsetName + '"]').children().eq(0).trigger('click');
            } else if (2 === this.subsetMergeSaveStatus) {
                this.subsetMergeSaveStatus = 0;
                this.doSaveCard();
            } else if (this.lastClickedSelectorTreeItem) {
                el = cols.filter('[data-type="' + this.lastClickedSelectorTreeItem.type + '"]').children('.ks-pivot-tag-add-col-content').children('[data-name="' + this.lastClickedSelectorTreeItem.name + '"]');

                if (!el.hasClass('ks-on')) {
                    el.trigger('click');
                }
            }

            cols.eq(j).children().eq(0).find('input').focus();
        });
    }

    selectorTreeColorClicked(e, doNotOpen) {
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

        if (1 < this.getSelectorTreeColumns().eq(2).children('.ks-pivot-tag-add-col-content').children().children('.icon-check-on,.icon-check-intermediate').length) {
            this.subsetMergeSaveStatus = 1;

            this.saveAsNewSubset();

            return;
        }

        this.doSaveCard();
    }

    doSaveCard() {
        if (this.taintedHolder) {
            this.saveNewCard();
        } else if (!this.adjustCardAccordingToNewSelection()) {
            return;
        }

        PivotTableWidget.getPivotTable();

        this.closeSelectorTree();
    }

    saveNewCard() {
        const cols = this.getSelectorTreeColumns(), dimension = cols.eq(0).data('value'), hierarchy = cols.eq(1).data('value');
        const isTaintedHolderSlicer = this.isTaintedHolderSlicer(), aliasAttrName = this.getSelectedAliasAttributeName(dimension, hierarchy);
        const cardSelector = '[data-dimension="' + dimension + '"][data-hierarchy="' + hierarchy + '"]';
        const element = isTaintedHolderSlicer ? cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1).has('.icon-check-on').data('name') : '';
        const card = this.taintedHolder.children(cardSelector + (isTaintedHolderSlicer ? '[data-element="' + element + '"]' : ''));

        if (card.length) {
            this.taintedCard = card;

            this.adjustCardAccordingToNewSelection();

            return;
        }

        const c = cols.eq(2).children('.ks-pivot-tag-add-col-content');
        const subset = (isTaintedHolderSlicer ? c.children('.ks-on') : c.children().has('.icon-check-on')).data('name');

        if (!subset) {
            app.popup.show('SUBSET ERROR!');
            L(cols);
            app.cols = cols;

            return;
        }

        let displayName;

        if (isTaintedHolderSlicer) {
            displayName = aliasAttrName ? this.value.tree.children[dimension].children[hierarchy].children[subset].children[element][aliasAttrName] : element;
            this.holders.eq(0).children(cardSelector).remove();
        } else {
            displayName = subset;
            this.holders.slice(1).children(cardSelector).remove();
        }

        const hex = this.colorDropdown.data('hex');
        const h = ['<div class="ks-pivot-table-tag" data-alias_attr_name="', aliasAttrName, '" data-dimension="', dimension, '" data-hierarchy="', hierarchy, '" data-subset="', subset, '"', 'data-element="', element, '"', ' data-hex="', hex, '"><div class="ks-pivot-table-tag-color" style="background-color: #', hex, ';"></div><h3>', dimension, '</h3><h4>', displayName, '</h4><span class="icon-x-circle"></span></div>'];

        this.taintedHolder.append(h.join(''));
    }

    adjustCardAccordingToNewSelection() {
        const cols = this.getSelectorTreeColumns(), isTaintedHolderSlicer = this.isTaintedHolderSlicer();

        const element = isTaintedHolderSlicer ? cols.eq(3).children('.ks-pivot-tag-add-col-content').children().has('.icon-check-on').data('name') : '';
        const c = cols.eq(2).children('.ks-pivot-tag-add-col-content');
        const subset = (isTaintedHolderSlicer ? c.children('.ks-on') : c.children().has('.icon-check-on')).data('name');

        if ((isTaintedHolderSlicer && !element) || (!isTaintedHolderSlicer && !subset)) {
            this.deleteCard();

            return false;
        }

        const dimension = cols.eq(0).data('value'), hierarchy = cols.eq(1).data('value'), hex = this.colorDropdown.data('hex');
        const cardSelector = '[data-dimension="' + dimension + '"][data-hierarchy="' + hierarchy + '"]';
        const aliasAttrName = this.getSelectedAliasAttributeName(dimension, hierarchy);

        if (isTaintedHolderSlicer) {
            this.holders.eq(0).children(cardSelector).not(this.taintedCard).remove();
        } else {
            this.holders.slice(1).children(cardSelector).not(this.taintedCard).remove();
        }

        this.taintedCard.data({alias_attr_name: aliasAttrName, dimension: dimension, hierarchy: hierarchy, subset: subset, hex: hex, element: element});
        this.taintedCard.children().eq(0).css('background-color', '#' + hex).next().html(dimension).next().html(isTaintedHolderSlicer ? element : subset);

        return true;
    }

    getSelectedAliasAttributeName(dimension, hierarchy) {
        const d = this.value.tree.children[dimension].children[hierarchy];

        return d.selectedAliasAttributeName || d.aliasAttributeNames[0] || '';
    }

    deleteCard(e) {
        if (e) {
            Utils.stopEvent(e);

            this.taintedCard = $(e.currentTarget).closest('.ks-pivot-table-tag');
        }

        const popup = $('<div class="ks-pivot-tag-add-popup"><h3>Do you really want to delete card?</h3><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">No</a><a data-action="yes" class="ks-pivot-btn btn-blue">Yes</a></div></div>');

        popup.on('click', 'a', e => {
            if ('yes' === $(e.currentTarget).data('action')) {
                this.taintedCard.remove();

                PivotTableWidget.getPivotTable();

                this.closeSelectorTree();
            }

            popup.remove();

            Utils.backdrop.hide();
        });

        El.body.prepend(popup);

        Utils.backdrop.show();
    }

    selectorTreeSubsetContextMenuButtonClicked(btn) {
        const action = btn.closest('a').data('action');

        if (btn.hasClass('icon-ellipsis')) {
            btn.children().toggle();
        } else if ('save' === action) {
            this.saveAsNewSubset();
        } else if ('remove' === action) {
            this.removeSubset();
        }
    }

    aliasAttributeNameButtonClicked(btn) {
        const cols = this.getSelectorTreeColumns(), d = this.value.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')];

        if (btn.hasClass('icon-aa')) {
            btn.children().html(d.aliasAttributeNames.map((e, i) => '<a' + (((!d.selectedAliasAttributeName && !i) || e === d.selectedAliasAttributeName) ? ' class="on"' : '') + ' data-alias_attr_name="' + e + '"><span class="icon-check"></span>' + e + '</a>')).toggle();
        } else if (btn.is('a') || btn.hasClass('icon-check')) {
            d.selectedAliasAttributeName = btn.data('alias_attr_name');
            btn.closest('a').addClass('on').siblings().removeClass('on');

            this.adjustElementAliases(cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1), d.selectedAliasAttributeName, d.children[cols.eq(2).data('value')].children);
        }
    }

    adjustElementAliases(elements, aliasAttrName, data) {
        let i, n, e, len = elements.length;

        for (i = 0; i < len; ++i) {
            e = elements.eq(i);
            n = e.data('name');
            e.contents().eq(1)[0].textContent = n + ' (' + data[n][aliasAttrName] + ')';
        }
    }

    filterSelectorTreeColumn(e) {
        let inp = $(e.currentTarget), items = inp.closest('.ks-pivot-add-tag-search-holder').next().children().slice(1), searchTerm = Utils.cleanStr(inp.val().trim()).toLowerCase(), i, len = items.length;

        for (i = 0; i < len; ++i) {
            e = items.eq(i);

            e.toggle(Utils.cleanStr(e.text().toLowerCase()).includes(searchTerm));
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
                } else {
                    return;
                }
            }

            this.subsetMergeSaveStatus = 0;

            popup.remove();

            Utils.backdrop.hide();
        });

        El.body.prepend(popup);

        Utils.backdrop.show();
    }

    doSaveAsNewSubset(newSubsetName, popup) {
        const postParams = {...Repository[this.options.id].init}, cols = this.getSelectorTreeColumns(), postData = {}, dim = cols.eq(0).data('value'), hier = cols.eq(1).data('value');

        postData.dimension_name = dim;
        postData.hierarchy_name = hier;
        postData.subset_name = newSubsetName;

        this.newSubsetName = newSubsetName;

        let c, el, elements, subset, subsets = this.value.tree.children[dim].children[hier].children, elementNames = [];

        for (subset in subsets) {
            c = subsets[subset].checkboxClass;
            if ('icon-check-on' === c || 'icon-check-intermediate' === c) {
                elements = subsets[subset].children;
                for (el in elements) {
                    if (elements[el].on) {
                        elementNames.push(el);
                    }
                }
            }
        }

        postData.element_names = $.unique(elementNames);

        postParams.data = postData;

        $.when(MiddleWare.call(postParams)).then(subsetData => this.reloadSubsetsInSelectorTree(popup, cols, postData, subsetData));
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
        const postParams = {...Repository[this.options.id].init}, cols = this.getSelectorTreeColumns(), d = {};
        const dim = cols.eq(0).data('value'), hier = cols.eq(1).data('value'), subset = cols.eq(2).children('.ks-on').data('name');

        d.dimension_name = dim;
        d.hierarchy_name = hier;
        d.subset_name_to_remove = subset;

        postParams.data = d;

        $.when(MiddleWare.call(postParams)).then(subsetData => this.reloadSubsetsInSelectorTree(popup, cols, d, subsetData));

        const deletedCards = this.holders.children('[data-dimension="' + dim + '"][data-hierarchy="' + hier + '"][data-subset="' + subset + '"]').remove();

        if (deletedCards.length) {
            PivotTableWidget.getPivotTable();
        }
    }

    reloadSubsetsInSelectorTree(popup, cols, selectedData, subsetData) {
        cols.slice(2).remove();

        this.value.tree.children[selectedData.dimension_name].children[selectedData.hierarchy_name] = {children: {}};

        this.addToNextLevelChildren(this.value.tree.children[selectedData.dimension_name].children[selectedData.hierarchy_name], subsetData.children, subsetData.data);

        this.renderNextSelectorTreeLevel(this.value.tree.children[selectedData.dimension_name].children[selectedData.hierarchy_name], cols.slice(0, 2));

        popup.remove();

        Utils.backdrop.hide();
    }

    changeRowsAndColumnsCards() {
        const rowCards = this.holders.eq(1).children('.ks-pivot-table-tag'), colCards = this.holders.eq(2).children('.ks-pivot-table-tag');

        this.holders.eq(1).append(colCards);
        this.holders.eq(2).append(rowCards);

        PivotTableWidget.getPivotTable();
    }

    resetPivotTable() {
        this.holders.children('.ks-pivot-table-tag').remove();

        this.pivotTable.html('');
    }

    openSelectorTreeFromCard(e) {
        e = $(e.currentTarget);

        this.taintedHolder = null;
        this.taintedCard = e;

        this.setSelectorTreeForCardPosition();

        this.selectorTreeColorClicked(this.colorDropdown.find('.ks-pivot-tag-color-dropdown-chooser-item[data-hex="' + e.data('hex') + '"]'), true);

        this.selectorTreeSaveBtn.removeClass('disabled');

        this.selectorTreeDeleteBtn.show();

        this.selectorTree.show().next().hide().next().hide();
    }

    setSelectorTreeForCardPosition() {
        let e = this.taintedCard, cols = this.getSelectorTreeColumns(), col = cols.eq(0), nextCol, c = col.children();

        c.eq(0).eq(0).find('input').val('');
        c.eq(1).children().filter((i, c) => e.data('dimension') === $(c).data('name')).trigger('click');

        do {
            nextCol = col.next();
        } while (!nextCol.length)

        col = nextCol;
        col.children('.ks-pivot-tag-add-col-content').children().filter((i, c) => e.data('hierarchy') === $(c).data('name')).trigger('click');

        do {
            nextCol = col.next();
        } while (!nextCol.length)

        col = nextCol;
        col.children('.ks-pivot-tag-add-col-content').children().filter((i, c) => e.data('subset') === $(c).data('name')).children().eq(0).trigger('click');

        if (this.isTaintedHolderSlicer()) {
            do {
                nextCol = col.next();
            } while (!nextCol.length)

            e = nextCol.children('.ks-pivot-tag-add-col-content').children().filter((i, c) => e.data('element') === $(c).data('name'));

            if (!e.has('.icon-check-on').length) {
                e.trigger('click');
            }
        }

        cols.eq(0).children().eq(0).find('input').val('').trigger('change');
        cols.last().children().eq(0).find('input').focus();
    }

    openSelectorTreeFromHolder(e) {
        this.taintedCard = null;
        this.taintedHolder = $(e.currentTarget).closest('.ks-pivot-table-tag-holder');

        this.offerNextColorInSelectorTreeColorDropdown();

        this.selectorTreeSaveBtn.addClass('disabled');

        this.selectorTreeDeleteBtn.hide();

        const inp = this.getSelectorTreeColumns().eq(0).children().eq(0).find('input').val('').trigger('change');

        this.selectorTree.show().next().hide().next().hide();

        inp.focus();
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

        this.selectorTreeColorClicked(this.colorDropdown.find('.ks-pivot-tag-color-dropdown-chooser-item[data-hex="' + i.hex + '"]'), true);
    }

    closeSelectorTree() {
        let cols = this.getSelectorTreeColumns();

        cols.data('value', '').eq(0).children('.ks-pivot-tag-add-col-content').children('.ks-on').removeClass('ks-on');
        cols.slice(1).remove();

        this.selectorTree.hide().next().show().next().show();

        this.resetSelectorTreeSelections();
    }

    resetSelectorTreeSelections() {
        let d = this.value.tree.children, dim, hier, subset, el, hiers, subsets, elements;

        for (dim in d) {
            hiers = d[dim].children;
            for (hier in hiers) {
                subsets = hiers[hier].children;
                for (subset in subsets) {
                    subsets[subset].checkboxClass = null;
                    elements = subsets[subset].children;
                    for (el in elements) {
                        elements[el].on = false;
                    }
                }
            }
        }
    }

    getSelectorTreeColumns() {
        return this.selectorTree.children('.ks-pivot-tag-add-holder').children();
    }

    isTaintedHolderSlicer() {
        return ('pivotSlicer' === (this.taintedHolder || (this.taintedCard || $()).parent()).attr('id'));
    }
}
;

PivotTableWidget.getPivotTable = (expandRowCell, expandRowCard, expandColCell, expandColCard) => {
    let i, j, d = {}, cards, len, types = ['slices', 'rows', 'cols'], v, cardData, colors = [[], [], []];

    const holders = $('#pivotSlicer,#pivotRowSelector,#pivotColSelector');

    for (i = 0; i < 3; ++i) {
        v = [];

        //cards = this.holders.eq(i).children('.ks-pivot-table-tag');
        cards = holders.eq(i).children('.ks-pivot-table-tag');

        for (j = 0, len = cards.length; j < len; ++j) {
            cardData = cards.eq(j).data();

            v.push(cardData);

            colors[i][j] = cardData.hex;
        }

        d[types[i]] = v;
    }

    if (!d.cols.length) {
        //this.pivotTable.html('');
        $('#pivotTable').html('');

        return;
    }

    const postParams = {...Repository['bandiPivot'/*this.options.id*/].init, data: {}};

    if (expandRowCell) {
        postParams.data.expand_row_element = JSON.stringify({...expandRowCard.data(), member: expandRowCell.next().text()});
    } else if (expandColCell) {
        postParams.data.expand_col_element = JSON.stringify({...expandColCard.data(), member: expandColCell.text()});
    }

    postParams.data.selected_cards = JSON.stringify(d);

    $.when(MiddleWare.call(postParams)).then(d => {
        if (expandRowCell) {
            PivotTableWidget.renderExpandedRows(d, expandRowCell, colors[1]);
        } else if (expandColCell) {
            PivotTableWidget.renderExpandedCols(d, expandColCell, colors[2]);
        } else {
            PivotTableWidget.renderPivotTable(d, colors);
        }
    });
};

PivotTableWidget.renderExpandedCols = (d, expandCell, colors) => {
    let c, totalColspan = 1, row = $(expandCell.parent().parent()[0].firstChild);

    expandCell.prevAll().each((i, e) => totalColspan += e.colSpan);

    while (row.length) {
        c = PivotTableWidget.getCellForColspan(row, totalColspan);

        if ('i' in row.data()) {
            
        } else {

        }

        row = row.next();
    }
};

PivotTableWidget.renderExpandedRows = (d, expandCell, colors) => {
    const colId = expandCell.data('i'), colspan = expandCell.next().prop('colspan'), surroundingHtmls = PivotTableWidget.getSurroundingHtmlsForExpandedCell(expandCell, colors), color = colors[colId] || '3AA745';
    let j, k = 0, h = [], rows = d.data.rows, len = rows.length, r, containsConsolidatedCell = false, cells = d.data.cells, colLen = d.data.cols.length;

    for (j = 1; j < len; ++j) {
        r = rows[j][0];

        h.push('<tr>', surroundingHtmls[0], '<td data-i="', colId, '" class="ks-pivot-table-group-sign-cell"><div class="ks-pivot-table-group-sign-middle" style="background-color: #', color, ';"></div></td>');

        if (r[2]) {
            h.push('<td data-i="', colId, '" class="ks-pivot-table-group-sign-cell closed-cell"><div class="ks-pivot-table-group-sign-closed" style="border-color: #', color, ';"><div style="background-color: #', color, ';"></div></div></td><td data-i="', colId, '" colspan="', colspan - 1, '" class="ks-pivot-table-group-title-cell">', r[0], '</td>');

            containsConsolidatedCell = true;
        } else {
            h.push('<td data-i="', colId, '" colspan="', colspan, '" class="ks-pivot-table-title-cell">', r[0], '</td>');
        }

        h.push(surroundingHtmls[1], '<td class="ks-pivot-table-content-cell">', cells.slice(k, k += colLen).join('</td><td class="ks-pivot-table-content-cell">'), '</td></tr>');
    }

    r = expandCell.parent().after(h.join('')).prev();

    if (containsConsolidatedCell) {
        h = colspan + 1;

        while (r.length) {
            r.children('[data-i="' + colId + '"]').each((i, e) => {
                if (e.colSpan >= colspan) {
                    e.colSpan = h;
                }
            });

            r = r.prev();
        }

        ++PivotTableWidget.maxColspans[colId];
    }
};

PivotTableWidget.getSurroundingHtmlsForExpandedCell = (expandCell, colors) => {
    let i, j, h, cells, cellGroups = [expandCell.prevAll(':not(.h0)').clone().get().reverse(), expandCell.next().nextAll('[data-i]:not(.h0)').clone()], c, len, ret = [];

    for (i = 0; i < 2; ++i) {
        h = [];
        cells = cellGroups[i];

        for (j = 0, len = cells.length; j < len; ++j) {
            c = $(cells[j]);

            if (c.hasClass('closed-cell') || c.hasClass('ks-pivot-table-group-title-cell')) {
                c.removeClass(['closed-cell', 'ks-pivot-table-group-title-cell']).addClass('ks-pivot-table-category-cell').html('');
            } else if (c.hasClass('ks-pivot-table-group-sign-cell')) {
                c.html('<div class="ks-pivot-table-group-sign-middle" style="background-color: #' + (colors[c.data('i')] || '53A451') + ';"></div>');
            }

            h.push(c[0].outerHTML);
        }

        ret[i] = h.join('');
    }

    return ret;
};

PivotTableWidget.renderPivotTable = (d, colors) => {
    const h = [], v = [], cols = d.data.cols, colLen = cols.length, cells = d.data.cells, rows = d.data.rows, rowLen = rows.length, rowElementLen = rows[0].length;
    const colElementLen = cols[0].length, levelMtx = [], colLevelMtx = [], colHeaderMtx = [], maxColspansByLevels = [], colColors = colors[2], rowColors = colors[1], defaultColor = '3AA745';
    let i, j, k, m, row, r, p, lastExpanded, expandClass, isExpanded, level, maxColspan, verticalLineCellsHtml, c, totalColspan = 0, name, color, colspan, levels, prevLevel, children;

    // ROW HEADER

    for (i = 0; i < rowLen; ++i) {
        row = rows[i];

        levels = [];

        for (j = 0; j < rowElementLen; ++j) {
            r = row[j];

            name = r[1];
            level = 0;
            colspan = r[2] ? 2 : 1;
            maxColspansByLevels[j] = maxColspansByLevels[j] || {};

            for (k = i - 1; k >= 0; --k) {
                prevLevel = (levelMtx[k] || [])[j] || 0;

                children = ((rows[k] || [])[j] || [])[2];

                if (children && (!name || children.includes(name))) {
                    level = prevLevel + 1;

                    break;
                } else if (!prevLevel && children) {
                    break;
                }
            }

            levels[j] = level;

            if (colspan > (maxColspansByLevels[j][level] || 0)) {
                maxColspansByLevels[j][level] = colspan;
            }
        }

        levelMtx[i] = levels;
    }

    PivotTableWidget.maxColspans = [];

    for (j = 0; j < rowElementLen; ++j) {
        k = maxColspansByLevels[j];
        r = 0;

        for (level in k) {
            r += k[level];
        }

        PivotTableWidget.maxColspans[j] = r;
    }

    for (j = 0; j < rowElementLen; ++j) {
        r = PivotTableWidget.maxColspans[j];

        v.push('<td data-i="', j, '" class="', (j === rowElementLen - 1 ? 'ks-pivot-table-close-group-cell' : 'ks-pivot-table-close-category-cell'), '" colspan="', r, '" style="color: #', (rowColors[j] || defaultColor), ';"><span class="icon-chevron-close-horizontal"></span></td>');

        totalColspan += r;
    }


    // COL HEADER

    for (i = 0; i < colLen; ++i) {
        row = cols[i];

        levels = [];

        for (j = 0; j < colElementLen; ++j) {
            r = row[j];
            name = r[1];
            level = 0;
            c = null;

            for (k = i - 1; k >= 0; --k) {
                prevLevel = (colLevelMtx[k] || [])[j] || 0;

                children = ((cols[k] || [])[j] || [])[2];

                if (children && (!name || children.includes(name))) {
                    level = prevLevel + 1;
                    c = k;

                    break;
                } else if (!prevLevel && children) {
                    break;
                }
            }

            levels[j] = level;

            if (!r) {
                continue;
            }

            if (!colHeaderMtx[j]) {
                colHeaderMtx[j] = [];
                colHeaderMtx[j][level] = Array(colLen);
            } else if (!colHeaderMtx[j][level]) {
                colHeaderMtx[j][level] = Array(colLen);
            }

            if (r[2]) {
                name = false;

                for (m = i + 1; m < colLen; ++m) {
                    if ((cols[m][j] || [])[1]) {
                        name = cols[m][j][1];

                        break;
                    }
                }

                if (name && r[2].includes(name)) {
                    isExpanded = true;
                } else {
                    isExpanded = false;
                }

                colHeaderMtx[j][level][i] = [r[0], c, isExpanded, 0];
            } else {
                colHeaderMtx[j][level][i] = [r[0], c];
            }

        }

        colLevelMtx[i] = levels;
    }

    for (j = 0; j < colElementLen; ++j) {
        color = colColors[j] || defaultColor;
        row = colHeaderMtx[j];
        m = row.length;

        for (k = 0; k < m; ++k) {
            c = row[k];

            if (j === colElementLen - 1 && k === m - 1) {
                h.push('<tr data-i="', j, '">', v.join(''));
            } else {
                h.push('<tr data-i="', j, '"><td colspan="', totalColspan, '"></td>');
            }

            isExpanded = false;

            for (i = 0; i < colLen; ++i) {
                r = c[i];

                if (r) {
                    if (true === r[2]) {
                        h.push('<td class="ks-pivot-table-col-group-sign-cell"><div style="border-color: #', color, ';" class="ks-pivot-table-group-sign-start"><div style="background-color: #', color, ';"></div></div>', r[0], '</td>');
                        isExpanded = true;
                        p = r[1];
                        r[3] = i;
                        lastExpanded = r;
                    } else if (false === r[2]) {
                        h.push('<td class="ks-pivot-table-col-group-sign-cell"><div style="border-color: #', color, ';" class="ks-pivot-table-group-sign-closed"><div style="background-color: #', color, ';"></div></div>', r[0], '</td>');
                        isExpanded = false;
                    } else {
                        h.push('<td class="ks-pivot-table-header-cell">', r[0], '</td>');
                        isExpanded = false;
                    }
                } else {
                    if (isExpanded) {
                        level = null === p ? colLen - 1 : row[k - 1][p][3];

                        if (c[i + 1] || (i === level)) {
                            h.push('<td class="ks-pivot-table-col-group-sign-cell"><div class="ks-pivot-table-group-sign-end" style="background-color: #', color, ';"><div style="background-color: #', color, ';"></div></div></td>');
                            ++lastExpanded[3];
                            isExpanded = false;
                        } else {
                            h.push('<td class="ks-pivot-table-col-group-sign-cell"><div class="ks-pivot-table-group-sign-middle" style="background-color: #', color, ';"></div></td>');
                            ++lastExpanded[3];
                        }
                    } else {
                        h.push('<td class="ks-pivot-table-sign-cell"></td>');
                    }
                }
            }

            h.push('</tr>');
        }
    }

    // TABLE

    k = 0;
    v.length = 0;

    for (i = 0; i < rowLen; ++i) {
        row = rows[i];

        h.push('<tr>');

        for (j = 0; j < rowElementLen; ++j) {
            r = row[j];

            color = rowColors[j] || defaultColor;
            level = levelMtx[i][j];
            maxColspan = PivotTableWidget.maxColspans[j];

            if (level) {
                if (v[j]) {
                    verticalLineCellsHtml = ('<td data-i="' + j + '" class="ks-pivot-table-group-sign-cell"><div class="ks-pivot-table-group-sign-middle" style="background-color: #' + color + ';"></div></td>').repeat(level);
                } else {
                    verticalLineCellsHtml = ('<td data-i="' + j + '" class="ks-pivot-table-group-sign-cell"><div class="ks-pivot-table-group-sign-middle" style="background-color: #' + color + ';"></div></td>').repeat(level - 1) + '<td data-i="' + j + '"></td>';
                }
            } else {
                verticalLineCellsHtml = '';
            }

            if (r) {
                if (r[2]) {
                    name = false;

                    for (m = i + 1; m < rowLen; ++m) {
                        if ((rows[m][j] || [])[1]) {
                            name = rows[m][j][1];

                            break;
                        }
                    }

                    if (name && r[2].includes(name)) {
                        v[j] = true;
                        expandClass = 'start';
                        c = '';
                    } else {
                        v[j] = false;
                        expandClass = 'closed';
                        c = ' closed-cell';
                    }

                    h.push(verticalLineCellsHtml, '<td data-i="', j, '" class="ks-pivot-table-group-sign-cell', c, '"><div class="ks-pivot-table-group-sign-', expandClass, '" style="border-color: #', color, ';"><div style="background-color: #', color, ';"></div></div></td><td data-i="', j, '" colspan="', maxColspan - level - 1, '" class="ks-pivot-table-group-title-cell">', r[0], '</td>');
                } else {
                    h.push(verticalLineCellsHtml, '<td data-i="', j, '" colspan="', maxColspan - level, '" class="', (level ? 'ks-pivot-table-title-cell' : 'ks-pivot-table-category-cell'), '">', r[0], '</td>');
                }
            } else {
                h.push(verticalLineCellsHtml, '<td data-i="', j, '" colspan="', maxColspan - level, '" class="ks-pivot-table-category-cell"></td>');
            }
        }

        h.push('<td class="ks-pivot-table-content-cell">', cells.slice(k, k += colLen).join('</td><td class="ks-pivot-table-content-cell">'), '</td></tr>');
    }

    //table.html(h.join(''));
    $('#pivotTable').html(h.join('')).promise().then(() => PivotTableWidget.adjustPivotTableEndSigns());
}
;

PivotTableWidget.adjustPivotTableEndSigns = () => {

};

PivotTableWidget.collapseButtonClicked = e => {
    let btn = $(e.currentTarget), cell = btn.parent();

    if ('i' in cell.data()) {
        PivotTableWidget.collapseRows(btn, cell);
    } else {
        PivotTableWidget.collapseCols(btn, cell);
    }
};

PivotTableWidget.expandButtonClicked = e => {
    let btn = $(e.currentTarget), cell = btn.parent();

    if ('i' in cell.data()) {
        PivotTableWidget.expandRows(btn, cell);
    } else {
        PivotTableWidget.expandCols(btn, cell);
    }
};

PivotTableWidget.collapseCols = (btn, cell) => {
    let row = cell.parent().next(), c, totalColspan = 1, hideLength = 0, offset = 0, nextSiblings = cell.nextAll(), i, len = nextSiblings.length;

    cell.prevAll().each((i, e) => totalColspan += e.colSpan);

    c = PivotTableWidget.getCellForColspan(row, totalColspan).nextAll();

    for (i = 0; i < len; ++i) {
        if (!hideLength && !c.eq(i).html()) {
            ++offset;
        } else {
            ++hideLength;
        }

        if (nextSiblings.eq(i).children('.ks-pivot-table-group-sign-end').length) {
            break;
        }
    }

    totalColspan += offset;

    row = $(row.parent()[0].firstChild);

    while (row.length) {
        for (c of PivotTableWidget.getCellForColspan(row, totalColspan).nextAll().slice(0, hideLength)) {
            c = $(c);
            c.data('h', (c.data('h') || 0) + 1).hide();
        }

        row = row.next();
    }

    if (offset) {
        nextSiblings.slice(0, offset).children().removeClass('ks-pivot-table-group-sign-middle');
    }

    btn.addClass('ks-pivot-table-group-sign-closed').removeClass('ks-pivot-table-group-sign-start');
};

PivotTableWidget.expandCols = (btn, cell) => {
    let c = cell.next(), row = cell.parent();

    if (c.text() || !c.length) {
        PivotTableWidget.getPivotTable(null, null, cell, /*this.holders.eq(2)*/$('#pivotColSelector').children('.ks-pivot-table-tag').eq(row.data('i')));

        btn.addClass('ks-pivot-table-group-sign-start').removeClass('ks-pivot-table-group-sign-closed');

        return;
    }

    let i, totalColspan = 1, showLength = 0, offset = 0, nextSiblings = cell.nextAll();
    let len = nextSiblings.length, color = cell.children().children().eq(0).css('background-color'), hiddenLevel;

    cell.prevAll().each((i, e) => totalColspan += e.colSpan);

    c = PivotTableWidget.getCellForColspan(row.next(), totalColspan).nextAll();

    for (i = 0; i < len; ++i) {
        if (!showLength && !c.eq(i).html()) {
            ++offset;
        } else {
            ++showLength;
        }

        if (nextSiblings.eq(i).children('.ks-pivot-table-group-sign-end').length) {
            break;
        }
    }

    totalColspan += offset;

    row = $(row.parent()[0].firstChild);

    while (row.length) {
        for (c of PivotTableWidget.getCellForColspan(row, totalColspan).nextAll().slice(0, showLength)) {
            c = $(c);
            hiddenLevel = (c.data('h') - 1) || 0;

            c.data('h', hiddenLevel);

            if (!hiddenLevel) {
                c.show();
            }
        }

        row = row.next();
    }

    nextSiblings.slice(0, showLength - 1).html('<div class="ks-pivot-table-group-sign-middle" style="background-color: ' + color + ';"></div>');

    btn.addClass('ks-pivot-table-group-sign-start').removeClass('ks-pivot-table-group-sign-closed');
};

PivotTableWidget.collapseRows = (btn, cell) => {
    let row = cell.parent().next(), c, totalColspan = 1, isSameElement = true, hideAllowed;

    cell.prevAll().each((i, e) => totalColspan += e.colSpan);

    while (row.length) {
        cell = PivotTableWidget.getCellForColspan(row, totalColspan);

        c = cell.children().eq(0);

        if (isSameElement && cell.next().hasClass('ks-pivot-table-category-cell')) {
            hideAllowed = false;
        } else {
            isSameElement = false;
            hideAllowed = true;
        }

        if (hideAllowed) {
            if (c.hasClass('ks-pivot-table-group-sign-middle')) {
                row.data('h', (row.data('h') || 0) + 1).hide();
            } else {
                break;
            }
        }

        row = row.next();
    }

    btn.addClass('ks-pivot-table-group-sign-closed').removeClass('ks-pivot-table-group-sign-start');
};

PivotTableWidget.expandRows = (btn, cell) => {
    let rowCards = $('#pivotRowSelector').children('.ks-pivot-table-tag'), totalColspan = 1;

    if (!rowCards.length) {
        return;
    }

    cell.prevAll().each((i, e) => totalColspan += e.colSpan);

    if (null === PivotTableWidget.doExpandRows(cell, totalColspan)) {
        PivotTableWidget.getPivotTable(cell, rowCards.eq(cell.data('i')));
    }

    btn.addClass('ks-pivot-table-group-sign-start').removeClass('ks-pivot-table-group-sign-closed');
    cell.removeClass('closed-cell');
};

PivotTableWidget.doExpandRows = (cell, totalColspan) => {
    let hiddenLevel = null, row = cell.parent().next(), isSameElement = true, showAllowed;

    while (row.length) {
        cell = PivotTableWidget.getCellForColspan(row, totalColspan);

        if (isSameElement && cell.next().hasClass('ks-pivot-table-category-cell')) {
            showAllowed = false;
        } else {
            isSameElement = false;
            showAllowed = true;
        }

        if (showAllowed) {
            if (cell.children().eq(0).hasClass('ks-pivot-table-group-sign-middle')) {
                hiddenLevel = row.data('h') - 1;

                row.data('h', hiddenLevel);

                if (!hiddenLevel) {
                    row.show();
                }
            } else {
                break;
            }
        }

        row = row.next();
    }

    return hiddenLevel;
};

PivotTableWidget.squeezeRowColumns = e => {
    let cell = $(e.currentTarget).removeClass('icon-chevron-close-horizontal').addClass('icon-chevron-open-horizontal').parent();
    let colId = cell.data('i'), row = cell.parent().next(), card = /*this.holders.eq(1)*/$('#pivotRowSelector').children('.ks-pivot-table-tag').eq(colId);

    cell.data('colspan', cell.prop('colspan')).prop('colspan', 1);

    row.children('[data-i="' + colId + '"]').addClass('h1').eq(0).before('<td class="h0" style="color: #' + card.data('hex') + ';" data-i="' + colId + '" rowspan="0"><div>' + card.children('h3').html() + '</div></td>');

    row = row.next();

    while (row.length) {
        row.children('[data-i="' + colId + '"]').addClass('h1');

        row = row.next();
    }
};

PivotTableWidget.pullApartRowColumns = e => {
    let cell = $(e.currentTarget).removeClass('icon-chevron-open-horizontal').addClass('icon-chevron-close-horizontal').parent();
    let colId = cell.data('i'), row = cell.parent().next();

    cell.prop('colspan', cell.data('colspan'));

    row.children('[data-i="' + colId + '"]').removeClass('h1').eq(0).remove();

    row = row.next();

    while (row.length) {
        row.children('[data-i="' + colId + '"]').removeClass('h1');

        row = row.next();
    }
};

PivotTableWidget.getCellForColspan = (row, colspan) => {
    let colspanSum = 0, c;

    for (c of row.children()) {
        colspanSum += c.colSpan;
        if (colspanSum >= colspan) {
            return $(c);
        }
    }
};