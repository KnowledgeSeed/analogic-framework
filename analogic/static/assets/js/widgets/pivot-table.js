/* global app, Auth, Doc, El, Pivot, Repository, Sortable, Utils, Widget, WidgetValue */

'use strict';
class PivotTableWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options, p = data[1] ? JSON.parse(data[1]) : null, s = p ? p[4] : {};

        this.selectorTreeColNames = ['Dimensions', 'Hierarchies', 'Subsets', 'Elements'];
        this.colors = [{name: 'Light Blue 100', hex: '009FDA'}, {name: 'Light Blue 60', hex: '66C5E9'}, {name: 'Light Blue 40', hex: '99D9F0'}, {name: 'Gray', hex: '747678'}, {name: 'Gray 40', hex: 'C7C8C9'}, {name: 'Gray 20', hex: 'E3E4E4'}, {name: 'Purple', hex: '80379B'}, {name: 'Purple 60', hex: 'B387C3'}, {name: 'Purple 40', hex: 'CCAFD7'}, {name: 'Orange', hex: 'E98300'}, {name: 'Orange 60', hex: 'F2B566'}, {name: 'Orange 40', hex: 'F6CD99'}, {name: 'Pink', hex: 'D71F85'}, {name: 'Pink 60', hex: 'E77986'}, {name: 'Pink 40', hex: 'EFA5CE'}, {name: 'Green', hex: '739600'}, {name: 'Green 60', hex: 'ABC066'}, {name: 'Green 40', hex: 'C7D599'}];
        this.data = data[0];
        this.presetData = p;
        this.tree = {children: {}};

        return `
<div id="pivot"><div class="ks-pivot-table-controls-holder">
    <div class="ks-pivot-table-control-row presets-row">
        <div class="ks-pivot-table-presets-btn">
            <span class="icon-ellipsis"></span>
            <div id="pivotPresetsDropdown" class="ks-pivot-table-presets-dropdown">
                <a id="closePanelBtn"><span class="icon-arrow-to-top" style="color: #007BFF;"></span>Close Panel</a>
                <a id="resetPivotBtn"><span class="icon-clear" style="color: #dc3545;"></span>Reset</a>
                <a id="saveAsPresetBtn" data-id="${o.id}" data-action="savePivotPreset"><span class="icon-tray-arrow-down" style="color: #3AA745;"></span>Save as Preset</a>
                <a id="loadPresetBtn" data-id="${o.id}" data-action="loadPivotPreset"><span class="icon-tray-files" style="color: #1d7bff;"></span>Load Preset</a>
                <hr><a><span class="icon-zero-square-outline" style="color: #80379b;"></span>Supress Zero</a>
                <a class="supressZeroBtn" data-id="${o.id}" data-type="nonEmptyColumns" data-action="savePivotPreset"><span class="icon-check" style="color: #1d7bff;${s.nonEmptyColumns ? '' : 'visibility:hidden;'}"></span>From columns</a>
                <a class="supressZeroBtn" data-id="${o.id}" data-type="nonEmptyRows" data-action="savePivotPreset"><span class="icon-check" style="color: #1d7bff;${s.nonEmptyRows ? '' : 'visibility:hidden;'}"></span>From rows</a>
                <hr><a id="exportBtn" data-id="${o.id}" data-action="exportPivotTable"><span class="icon-doc-arrow-down" style="color: #3AA745;"></span>Export to Excel</a>
            </div>
        </div>
    </div>

    <div class="ks-pivot-table-control-row"><div id="pivotSlicer" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-filter-circle icon-columns"></span></div></div></div>

    <div class="ks-pivot-table-control-row">
        <div id="pivotRowSelector" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-rows"></span></div></div>

        <div class="ks-pivot-table-tag-switch"><span class="icon-arrow-swap"></span></div>

        <div id="pivotColSelector" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-columns"></span></div></div>
    </div>
</div><table id="pivotTable" class="ks-pivot-table"></table></div>`;
    }

    initEventHandlers(section) {
        const o = this.options;

        this.widgetId = section.attr('id');

        section = section.children();

        this.cubeName = o.cubeName;

        this.initPresetsDropdown();

        this.initSelectorTree(section);

        this.holders = $('#pivotSlicer,#pivotRowSelector,#pivotColSelector');

        this.initSortable(this.holders.eq(0));

        this.initSortable(this.holders.eq(1));

        this.initSortable(this.holders.eq(2));

        section.children('.ks-pivot-table-controls-holder').off('click')
            .on('click', '.ks-pivot-table-add-tag', e => this.openSelectorTreeFromHolder(e))
            .on('click', '.ks-pivot-table-tag', e => this.openSelectorTreeFromCard(e))
            .on('click', '.icon-x-circle', e => this.deleteCard(e))
            .on('click', '.ks-pivot-table-tag-switch', () => this.changeRowsAndColumnsCards())
            .on('click', '#resetPivotBtn', () => this.resetPivotTable())
            .on('click', '#loadPresetBtn', e => this.loadPresetButtonClicked(e))
            .on('click', '#saveAsPresetBtn', e => this.saveAsPreset(e))
            .on('click', '.supressZeroBtn', e => this.supressZeroBtnClicked(e))
            .on('click', '#exportBtn', e => this.exportPivotTable(e))
            .on('click', '#closePanelBtn', () => this.pivotPresetsDropdown.hide())
            .on('choose', e => Utils.stopEvent(e));

        Doc.off('keydown.pivot').on('keydown.pivot', e => this.keyPressed(e));

        this.table = $('#pivotTable').off('click')
            .on('click', '.ks-pivot-table-group-sign-start,.ks-pivot-table-group-sign-closed', e => this.expandCollapseButtonClicked(e))
            .on('click', '.icon-chevron-close-horizontal', e => this.squeezeRowColumns(e))
            .on('click', '.icon-chevron-open-horizontal', e => this.pullApartRowColumns(e))
            .on('click', '.ks-pivot-table-content-cell', e => this.selectContentCell($(e.currentTarget)))
            .on('dblclick', '.ks-pivot-table-content-cell', e => this.editContentCell($(e.currentTarget)));

        this.expandedCollapsedMembers = [{}, {}];

        this.supressOptions = {nonEmptyRows: true, nonEmptyColumns: true};

        this.loadPreset(this.presetData);

        this.initControls();
    }

    initControls() {
        this.selectedCell = $();

        this.cellInput = $('<input>').on('keydown click', e => this.cellInputEventHandler(e)).on('focusout', e => this.saveContentCellValue(e));
    }

    cellInputEventHandler(e) {
        e.stopImmediatePropagation();

        if (13 === e.which) {
            this.saveContentCellValue(e);
        } else if (27 === e.which) {
            this.finishEditingContentCell();
        }
    }

    initPresetsDropdown() {
        this.pivotPresetsDropdown = $('#pivotPresetsDropdown');

        this.pivotPresetsDropdown.parent().off('click').on('click', e => {
            e = $(e.target);
            if (e.hasClass('ks-pivot-table-presets-btn') || e.hasClass('icon-ellipsis')) {
                this.pivotPresetsDropdown.toggle();
            }
        });
    }

    initSelectorTree(section) {
        const h = ['<div style="display: none; margin: 50px auto;"><div class="ks-pivot-tag-add-controls"><div class="ks-pivot-tag-color-dropdown-holder"><label>Pivot Colour</label><div class="ks-pivot-tag-color-dropdown"><div class="ks-pivot-tag-color-icon"></div><span></span><div style="display: none;" class="ks-pivot-tag-color-dropdown-chooser">'];

        this.addToNextLevelChildren(this.tree, this.data.children, this.data.data);

        for (let color of this.colors) {
            h.push('<div data-name="', color.name, '" data-hex="', color.hex, '" class="ks-pivot-tag-color-dropdown-chooser-item" style="background-color: #', color.hex, ';"></div>');
        }

        h.push('</div></div></div><div class="ks-pivot-tag-button-holder"><a id="selectorTreeDeleteBtn" class="ks-pivot-btn btn-red">Delete</a><a id="selectorTreeCancelBtn" class="ks-pivot-btn btn-blue-light">Cancel</a><a id="selectorTreeSaveBtn" class="ks-pivot-btn btn-blue">Save</a></div></div><div class="ks-pivot-tag-add-holder">');

        h.push(this.renderNextSelectorTreeLevel(this.tree), '</div></div>');

        this.selectorTree = $(h.join('')).prependTo(section)
            .off('click input change')
            .on('click', '.ks-pivot-tag-add-item:not(".title-item")', (e, callback) => this.selectorTreeItemClicked(e, callback))
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
            onUpdate: () => this.getPivotTable()
        });
    }

    keyPressed(e) {
        if (Pivot.callNum) {
            return;
        }

        if (27 === e.which) {
            this.pivotPresetsDropdown.hide();
        }

        if (this.selectorTree.is(':visible')) {
            this.handleSelectorTreeNavigation(e);
        } else if (this.selectedCell.hasClass('sel')) {
            this.handleContentCellNavigation(e);
        }
    }

    handleSelectorTreeNavigation(e) {
        let n = e.which, b = this.selectorTree.find('.nav'), i = this.selectorTree.find('input'), f, isSaveAllowed = !this.selectorTreeSaveBtn.hasClass('disabled');

        if (!b.length) {
            f = i.filter('input:focus');
            b = f.length ? f : i.last();
        }

        let isOnInput = b.is('input');

        if ((38 === n) && !isOnInput) {
            n = b.prev(':not(.title-item):visible');
            n = n.length ? n : b.parent().prev().find('input');
        } else if (40 === n) {
            n = isOnInput ? b.closest('.ks-pivot-add-tag-search-holder').next().children().eq(1) : b.next(':visible');
        } else if ((37 === n || (9 === n && e.shiftKey)) && !isOnInput) {
            n = b.closest('.ks-pivot-tag-add-col').prev().children().eq(1).children().eq(1);
        } else if ((39 === n || (9 === n && !e.shiftKey)) && !isOnInput) {
            n = b.closest('.ks-pivot-tag-add-col').next();
            if (n.length) {
                n = n.children().eq(1).children().eq(1);
            } else {
                return b.trigger('click');
            }
        } else if ((32 === n || (13 === n && !isSaveAllowed)) && !isOnInput) {
            Utils.stopEvent(e);
            n = b.find('.icon-check-on,.icon-check-off,.icon-check-intermediate');
            return n.length ? n.trigger('click') : b.trigger('click');
        } else if ((13 === n) && isSaveAllowed && !isOnInput) {
            this.saveCard();
        } else if (27 === n) {
            this.closeSelectorTree();
        }

        if (!n.length) {
            return;
        }

        Utils.stopEvent(e);

        i.blur();

        b.removeClass('nav');
        n.addClass('nav').focus();

        if (!Utils.isInViewport(n[0])) {
            Utils.scrollTo(n, 0);
        }
    }

    handleContentCellNavigation(e) {
        let w = e.which, c = this.selectedCell, n, s = 'ks-pivot-table-content-cell';

        if (27 === w) {
            return c.removeClass('sel');
        } else if (37 === w) {
            n = c.prev();
        } else if (39 === w) {
            n = c.next();
        } else if (38 === w) {
            n = c.parent().prev().children('.' + s).eq(c.prevAll('.' + s).length);
        } else if (40 === w) {
            n = c.parent().next().children('.' + s).eq(c.prevAll('.' + s).length);
        }

        if (n && n.hasClass(s)) {
            Utils.stopEvent(e);

            c.removeClass('sel');

            this.selectedCell = n.addClass('sel');
        } else if (c.length && ([13, 32].includes(w) || e.originalEvent.key.match(/^[a-z0-9]{1}$/i))) {
            this.editContentCell(c);

            Utils.stopEvent(e);
        }
    }

    cardReplacedToOtherHolder(e) {
        let d, id = 'pivotSlicer', card = $(e.item), defaultMember, dim = card.data('dimension'), hier = card.data('hierarchy'), subset = card.data('subset');

        if (id === e.to.id) {
            $(e.to).children('[data-dimension="' + dim + '"][data-hierarchy="' + hier + '"]').not(card).remove();

            d = this.tree.children[dim].children[hier];
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

        this.getPivotTable();
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

    selectorTreeItemClicked(e, callback) {
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
            this.showNextSelectorTreeLevel(callback);
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
        const d = this.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[cols.eq(2).data('value')];
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

        this.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[subset].checkboxClass = subsetCheckboxClass;

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
        let i, elements = this.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[subset || cols.eq(2).data('value')];

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

        const cols = this.getSelectorTreeColumns(), isDisabled = !cols.eq(this.isTaintedHolderSlicer() ? 3 : 2).children('.ks-pivot-tag-add-col-content').children().slice(1).children('.icon-check-on').length || !cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1).length;

        this.selectorTreeSaveBtn.toggleClass('disabled', isDisabled);
    }

    showNextSelectorTreeLevel(callback) {
        let i, col, val, cols = this.getSelectorTreeColumns(), selectedData = {}, nextLevelData;

        for (i = 0; i < cols.length; ++i) {
            col = cols.eq(i);
            val = col.data('value');

            selectedData[col.data('type') + '_name'] = val;

            nextLevelData = (nextLevelData || this.tree).children[val];
        }

        if ($.isEmptyObject(nextLevelData.children)) {
            this.getNextSelectorTreeLevel(selectedData, nextLevelData, cols, callback);
        } else {
            this.renderNextSelectorTreeLevel(nextLevelData, cols, callback);
        }
    }

    getNextSelectorTreeLevel(selectedData, nextLevelData, cols, callback) {
        selectedData.cube_name = this.cubeName;
        selectedData.options = JSON.stringify(this.options);

        return $.when(Pivot.call({data: selectedData})).then(resp => {
            this.addToNextLevelChildren(nextLevelData, resp.children, resp.data);

            if (cols) {
                this.renderNextSelectorTreeLevel(nextLevelData, cols, callback);
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

    renderNextSelectorTreeLevel(nextLevelData, cols, callback) {
        const types = ['dimension', 'hierarchy', 'subset', 'element'], i = cols ? cols.length : 0, children = nextLevelData.children;
        const isTaintedHolderSlicer = this.isTaintedHolderSlicer(), isCheckableCol = (i > 1), isElementCol = (3 === i);
        const aliasAttrName = isElementCol ? this.getSelectedAliasAttributeName(cols.eq(0).data('value'), cols.eq(1).data('value')) : false;

        let el, isCheckedElementRenderedForSlicer = false, name, isSubsetSelected, h = ['<div data-type="', types[i], '" class="ks-pivot-tag-add-col ', (isCheckableCol && (!isTaintedHolderSlicer || isElementCol) ? 'checkable-col' : ''), '"><div class="ks-pivot-add-tag-search-holder"><div class="ks-pivot-add-tag-search"><span class="icon-search"></span><input type="text" placeholder="Search..."></div></div><div class="ks-pivot-tag-add-col-content"><div class="ks-pivot-tag-add-item title-item">', (isElementCol ? ('<span ' + (isTaintedHolderSlicer ? 'style="display: none;"' : '') + '></span>') : ''), this.selectorTreeColNames[i], (isElementCol ? '<span class="icon-aa"><div class="ks-pivot-table-presets-dropdown"></div></span><span class="icon-ellipsis"><div class="ks-pivot-table-presets-dropdown"><a data-action="save"><span class="icon-plus-circle" style="color: #1d7bff;"></span>Save as New Subset</a><a data-action="remove"><span class="icon-trash-fill" style="color: #dc3545;"></span>Remove Subset</a></div></span>' : ''), '</div>'];

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

                h.push('<div class="ks-pivot-tag-add-item" data-name="', Utils.htmlEncode(name), '">', check, ((isElementCol && aliasAttrName) ? (name + ' (' + el[aliasAttrName] + ')') : name), chevron, '</div>');
            }
        } else {
            for (name in children) {
                h.push('<div class="ks-pivot-tag-add-item" data-name="', Utils.htmlEncode(name), '">', name, '<span class="icon-chevron-right"></span></div>');
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

            if (callback) {
                callback();
            } else if (1 === this.subsetMergeSaveStatus) {
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

        this.getPivotTable();

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
            displayName = aliasAttrName ? this.tree.children[dimension].children[hierarchy].children[subset].children[element][aliasAttrName] : element;
            this.holders.eq(0).children(cardSelector).remove();
        } else {
            displayName = subset;
            this.holders.slice(1).children(cardSelector).remove();
        }

        const hex = this.colorDropdown.data('hex');
        const h = ['<div class="ks-pivot-table-tag" data-alias_attr_name="', Utils.htmlEncode(aliasAttrName), '" data-dimension="', Utils.htmlEncode(dimension), '" data-hierarchy="', Utils.htmlEncode(hierarchy), '" data-subset="', Utils.htmlEncode(subset), '"', 'data-element="', Utils.htmlEncode(element), '"', ' data-hex="', hex, '"><div class="ks-pivot-table-tag-color" style="background-color: #', hex, ';"></div><h3>', dimension, '</h3><h4>', displayName, '</h4><span class="icon-x-circle"></span></div>'];

        this.taintedHolder.append(h.join(''));
    }

    adjustCardAccordingToNewSelection() {
        const cols = this.getSelectorTreeColumns(), isTaintedHolderSlicer = this.isTaintedHolderSlicer();

        const element = isTaintedHolderSlicer ? cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1).has('.icon-check-on').data('name') : '';
        const c = cols.eq(2).children('.ks-pivot-tag-add-col-content');
        let subset = (isTaintedHolderSlicer ? c.children('.ks-on') : c.children().has('.icon-check-on,.icon-check-intermediate'));

        if ((isTaintedHolderSlicer && !element) || (!isTaintedHolderSlicer && !subset.length)) {
            this.deleteCard();

            return false;
        } else if (!isTaintedHolderSlicer && subset.has('.icon-check-intermediate').length) {
            this.saveAsNewSubset();

            return;
        }

        subset = subset.data('name');

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
        const d = this.tree.children[dimension].children[hierarchy];

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

                this.getPivotTable();

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
        const cols = this.getSelectorTreeColumns(), d = this.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')];

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
        this.subsetMergeSaveStatus = 1;

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
            } else {
                this.subsetMergeSaveStatus = 0;
            }

            popup.remove();

            Utils.backdrop.hide();
        });

        El.body.prepend(popup).promise().then(() => popup.find('input').focus());

        Utils.backdrop.show();
    }

    doSaveAsNewSubset(newSubsetName, popup) {
        const o = this.options;

        newSubsetName = (o.subsetPrefix || '') + newSubsetName + (o.subsetSuffix || '');

        const cols = this.getSelectorTreeColumns(), d = {cube_name: this.cubeName, dimension_name: cols.eq(0).data('value'), hierarchy_name: cols.eq(1).data('value'), subset_name: newSubsetName, options: JSON.stringify(o)};

        this.newSubsetName = newSubsetName;

        let c, el, elements, subset, subsets = this.tree.children[d.dimension_name].children[d.hierarchy_name].children, elementNames = [];

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

        d.element_names = $.unique(elementNames);

        $.when(Pivot.call({data: d})).then(subsetData => this.reloadSubsetsInSelectorTree(popup, cols, d, subsetData));
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
        const cols = this.getSelectorTreeColumns(), d = {cube_name: this.cubeName, dimension_name: cols.eq(0).data('value'), hierarchy_name: cols.eq(1).data('value'), subset_name_to_remove: cols.eq(2).children('.ks-pivot-tag-add-col-content').children('.ks-on').data('name')};

        $.when(Pivot.call({data: d})).then(subsetData => this.reloadSubsetsInSelectorTree(popup, cols, d, subsetData));

        const deletedCards = this.holders.children('[data-dimension="' + d.dimension_name + '"][data-hierarchy="' + d.hierarchy_name + '"][data-subset="' + d.subset_name_to_remove + '"]').remove();

        if (deletedCards.length) {
            this.getPivotTable();
        }
    }

    reloadSubsetsInSelectorTree(popup, cols, selectedData, subsetData) {
        cols.slice(2).remove();

        this.tree.children[selectedData.dimension_name].children[selectedData.hierarchy_name] = {children: {}};

        this.addToNextLevelChildren(this.tree.children[selectedData.dimension_name].children[selectedData.hierarchy_name], subsetData.children, subsetData.data);

        this.renderNextSelectorTreeLevel(this.tree.children[selectedData.dimension_name].children[selectedData.hierarchy_name], cols.slice(0, 2));

        popup.remove();

        Utils.backdrop.hide();
    }

    changeRowsAndColumnsCards() {
        const rowCards = this.holders.eq(1).children('.ks-pivot-table-tag'), colCards = this.holders.eq(2).children('.ks-pivot-table-tag'), a = this.expandedCollapsedMembers, b = a[0];

        this.holders.eq(1).append(colCards);
        this.holders.eq(2).append(rowCards);

        a[0] = a[1];
        a[1] = b;

        this.getPivotTable();
    }

    resetPivotTable() {
        this.holders.children('.ks-pivot-table-tag').remove();

        this.table.html('');

        this.expandedCollapsedMembers = [{}, {}];

        this.pivotPresetsDropdown.hide();
    }

    loadPresetButtonClicked(e) {
        Widget.doHandleSystemEvent($(e.currentTarget), e);

        this.pivotPresetsDropdown.hide();
    }

    loadPreset(d) {
        if (!d) {
            return;
        }

        let i, c, h;

        for (i = 0; i < 3; ++i) {
            h = this.holders.eq(i);

            for (c of d[i]) {
                h.append('<div class="ks-pivot-table-tag sortable-chosen" ' + Object.entries(c).map(e => 'data-' + e[0] + '="' + e[1] + '"').join(' ') + ' draggable="true"><div class="ks-pivot-table-tag-color" style="background-color: #' + c.hex + ';"></div><h3>' + c.name + '</h3><h4>' + c.title + '</h4><span class="icon-x-circle"></span></div>');
            }
        }

        this.expandedCollapsedMembers = d[3];

        this.supressOptions = d[4] || this.supressOptions;

        this.getPivotTable();
    }

    saveAsPreset(e) {
        let i, d = [];

        for (i = 0; i < 3; ++i) {
            d[i] = this.holders.eq(i).children('.ks-pivot-table-tag').map((i, e) => {
                e = $(e);

                return {...e.data(), name: e.find('h3').html(), title: e.find('h4').html()};
            }).get();
        }

        d[i] = this.expandedCollapsedMembers;

        d[++i] = this.supressOptions;

        this.save = JSON.stringify(d);

        Widget.doHandleSystemEvent($(e.currentTarget), e);

        this.pivotPresetsDropdown.hide();
    }

    supressZeroBtnClicked(e) {
        let btn = $(e.currentTarget), s = btn.children('span'), isSupressed = 'visible' === s.css('visibility');

        s.css('visibility', isSupressed ? 'hidden' : 'visible');

        this.supressOptions[btn.data('type')] = !isSupressed;

        this.presetData[4] = this.supressOptions;

        this.save = JSON.stringify(this.presetData);

        Widget.doHandleSystemEvent($(e.currentTarget), e);

        this.getPivotTable();
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
        let e, f, c = this.taintedCard, cols = this.getSelectorTreeColumns(), col = cols.eq(0), nextCol, items = col.children();

        items.eq(0).eq(0).find('input').val('');
        f = c.data('dimension');
        e = items.eq(1).children().filter((i, c) => f === c.dataset.name);

        if (!e.length) {
            return;
        }

        e.trigger('click', () => {
            do {
                nextCol = col.next();
            } while (!nextCol.length)

            col = nextCol;
            f = c.data('hierarchy');
            e = col.children('.ks-pivot-tag-add-col-content').children().filter((i, c) => f === c.dataset.name);

            if (!e.length) {
                return;
            }

            e.trigger('click', () => {
                do {
                    nextCol = col.next();
                } while (!nextCol.length)

                col = nextCol;
                f = c.data('subset');
                e = col.children('.ks-pivot-tag-add-col-content').children().filter((i, c) => f === c.dataset.name).children().eq(0);

                if (!e.length) {
                    return;
                }

                e.trigger('click', () => {
                    if (this.isTaintedHolderSlicer()) {
                        do {
                            nextCol = col.next();
                        } while (!nextCol.length)

                        f = c.data('element');
                        e = nextCol.children('.ks-pivot-tag-add-col-content').children().filter((i, c) => f === c.dataset.name);

                        if (!e.has('.icon-check-on').length) {
                            e.trigger('click');
                        }
                    }

                    cols.eq(0).children().eq(0).find('input').val('').trigger('change');
                    cols.last().children().eq(0).find('input').focus();
                });
            });
        });
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
        const colors = {}, cards = this.taintedHolder.children('.ks-pivot-table-tag');

        this.colors.forEach(e => colors[e.hex] = 0);

        let i, len = cards.length, offeredColor;

        for (i = 0; i < len; ++i) {
            ++colors[cards.eq(i).data('hex')];
        }

        const min = Math.min(...Object.values(colors));

        for (i of this.colors) {
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
        let d = this.tree.children, dim, hier, subset, el, hiers, subsets, elements;

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

    getPivotTable() {
        let d = this.getSelectedCardsData();

        if (!d) {
            this.table.html('');

            return;
        }

        $.when(Pivot.call({data: d})).then(r => this.renderPivotTable(r, d.colors));
    }

    getSelectedCardsData() {
        let i, j, d = {}, cards, len, types = ['slices', 'rows', 'cols'], v, cardData, colors = [[], [], []], n, o = {...this.options, ...this.supressOptions}, data = {cube_name: this.cubeName, options: JSON.stringify(o)};

        for (i = 0; i < 3; ++i) {
            v = [];

            cards = this.holders.eq(i).children('.ks-pivot-table-tag');

            for (j = 0, len = cards.length; j < len; ++j) {
                cardData = cards.eq(j).data();

                if (i) {
                    n = cardData.dimension;

                    cardData.expanded_collapsed_members = this.expandedCollapsedMembers[i - 1][n] || {};
                }

                v.push(cardData);

                colors[i][j] = cardData.hex;
            }

            d[types[i]] = v;
        }

        if (!d.cols.length) {
            return null;
        }

        data.colors = colors;

        data.selected_cards = JSON.stringify(d);

        return data;
    }

    renderPivotTable(d, colors) {
        const cc = d.cell_count;

        if ($.isEmptyObject(d.data)) {
            if (this.options.cellLimit < cc) {
                app.popup.show('The Cell Limit (<b style="color: green;">' + this.options.cellLimit + '</b>) is exceeded: <b style="color: red;">' + cc + '</b>');
            } else {
                app.popup.show('Error during rendering the Pivot Table!');
            }

            return;
        }

        this.cellsetId = d.data.cellsetId;

        const t0 = performance.now(), cols = d.data.cols, colLen = cols.length, cells = d.data.cells, rows = d.data.rows, rowLen = rows.length, rowElementLen = (rows[0] || []).length;
        const colElementLen = (cols[0] || []).length, levelMtx = [], colLevelMtx = [], colHeaderMtx = [], maxColspansByLevels = [], colColors = colors[2], rowColors = colors[1], defaultColor = '3AA745';
        let h = '', v = '', i, j, k, e, m, row, r, p, lastExpanded, expandClass, isExpanded, isLastParents = [], level, nextLevel, maxColspan, midLine, c, totalColspan = 0, name, names, color, colspan, levels, prevLevel, children, isLastRow;

        L('CELLS COUNT: ' + cc);

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
                names = [name];

                for (k = i - 1; k >= 0; --k) {
                    e = (rows[k] || [])[j] || [];

                    if (e[2]) {
                        p = true;

                        for (m of names) {
                            if (m && !e[2].includes(m)) {
                                p = false;
                                break;
                            }
                        }

                        prevLevel = (levelMtx[k] || [])[j] || 0;

                        if (p) {
                            if (name) {
                                level = prevLevel + 1;
                            } else {
                                level = isLastParents[j] ? prevLevel + 1 : (levelMtx[i - 1] || [])[j] || 0;
                            }

                            break;
                        } else {
                            names.length = 1;
                            names.push(e[1]);
                        }

                        if (!prevLevel) {
                            break;
                        }
                    } else {
                        if (!(levelMtx[k] || [])[j]) {
                            break;
                        }

                        names.push(e[1]);
                    }
                }

                if (name) {
                    isLastParents[j] = 2 === colspan;
                }

                levels[j] = level;

                if (colspan > (maxColspansByLevels[j][level] || 0)) {
                    maxColspansByLevels[j][level] = colspan;
                }
            }

            levelMtx[i] = levels;
        }

        this.maxColspans = [];

        for (j = 0; j < rowElementLen; ++j) {
            k = maxColspansByLevels[j];
            r = 0;

            for (level in k) {
                r += k[level];
            }

            this.maxColspans[j] = r;
        }

        for (j = 0; j < rowElementLen; ++j) {
            r = this.maxColspans[j];

            v += '<td data-i="' + j + '" class="ks-pivot-table-close-category-cell' + (j === rowElementLen - 1 ? ' h4' : '') + '" colspan="' + r + '" style="color: #' + (rowColors[j] || defaultColor) + ';"><span class="icon-chevron-close-horizontal"></span></td>';

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

                    if (children) {
                        if (!name || children.includes(name)) {
                            level = prevLevel + 1;
                            c = k;

                            break;
                        }

                        if (!prevLevel) {
                            break;
                        }
                    }
                }

                levels[j] = level;

                if (!r) {
                    continue;
                }

                if (!(j in colHeaderMtx)) {
                    colHeaderMtx[j] = [];
                    colHeaderMtx[j][level] = Array(colLen);
                } else if (!(level in colHeaderMtx[j])) {
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

                isLastRow = (j === colElementLen - 1 && k === m - 1);

                if (isLastRow) {
                    h += '<tr data-i="' + j + '">' + v;
                } else {
                    h += '<tr data-i="' + j + '"><td data-h="1" class="h4" colspan="' + totalColspan + '"></td>';
                }

                isExpanded = false;

                for (i = 0; i < colLen; ++i) {
                    r = c[i];

                    if (r) {
                        if (true === r[2]) {
                            h += '<td class="ks-pivot-table-col-group-sign-cell"><div style="border-color: #' + color + ';" class="ks-pivot-table-group-sign-start"><div style="background-color: #' + color + ';"></div></div>' + r[0] + '</td>';
                            isExpanded = true;
                            p = r[1];
                            r[3] = i;
                            lastExpanded = r;
                        } else if (false === r[2]) {
                            h += '<td data-e="1" class="ks-pivot-table-col-group-sign-cell' + (isLastRow ? ' ks-pivot-table-header-cell' : '') + '"><div style="border-color: #' + color + ';" class="ks-pivot-table-group-sign-closed"><div style="background-color: #' + color + ';"></div></div>' + r[0] + '</td>';
                            isExpanded = false;
                        } else {
                            h += '<td class="' + (isLastRow ? 'ks-pivot-table-header-cell' : 'h5') + '">' + r[0] + '</td>';
                            isExpanded = false;
                        }
                    } else {
                        if (isExpanded) {
                            level = null === p ? colLen - 1 : row[k - 1][p][3];

                            if (c[i + 1] || (i === level)) {
                                h += '<td class="ks-pivot-table-col-group-sign-cell"><div class="ks-pivot-table-group-sign-end" style="background-color: #' + color + ';"><div style="background-color: #' + color + ';"></div></div></td>';
                                ++lastExpanded[3];
                                isExpanded = false;
                            } else {
                                h += '<td class="ks-pivot-table-col-group-sign-cell"><div class="ks-pivot-table-group-sign-middle" style="background-color: #' + color + ';"></div></td>';
                                ++lastExpanded[3];
                            }
                        } else {
                            h += '<td class="ks-pivot-table-' + (isLastRow ? 'header' : 'sign') + '-cell"></td>';
                        }
                    }
                }

                h += '</tr>';
            }
        }

        // TABLE

        k = 0;
        v = [];

        for (i = 0; i < rowLen; ++i) {
            row = rows[i];

            h += '<tr>';

            for (j = 0; j < rowElementLen; ++j) {
                r = row[j];

                color = rowColors[j] || defaultColor;
                level = levelMtx[i][j];
                maxColspan = this.maxColspans[j];

                if (level) {
                    nextLevel = (levelMtx[i + 1] || [])[j] || 0;
                    p = '<td data-i="' + j + '" class="ks-pivot-table-group-sign-cell"><div class="ks-pivot-table-group-sign-middle" style="background-color: #' + color + ';"></div></td>';

                    if (nextLevel >= level) {
                        if ((v[level - 1] || [])[j]) {
                            midLine = p.repeat(level);
                        } else {
                            midLine = p.repeat(level - 1) + '<td data-i="' + j + '"></td>';
                        }
                    } else {
                        midLine = p.repeat(nextLevel);

                        if ((v[level - 1] || [])[j]) {
                            midLine += ('<td data-i="' + j + '" class="ks-pivot-table-group-sign-cell"><div class="ks-pivot-table-group-sign-end" style="background-color: #' + color + ';"><div style="background-color: #' + color + ';"></div></div></td>').repeat(level - nextLevel);
                        } else {
                            midLine += ('<td data-i="' + j + '" class="ks-pivot-table-group-sign-cell"><div class="ks-pivot-table-group-sign-end" style="background-color: #' + color + ';"><div style="background-color: #' + color + ';"></div></div></td>').repeat(level - nextLevel - 1) + '<td data-i="' + j + '"></td>';
                        }
                    }
                } else {
                    midLine = '';
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

                        v[level] = v[level] || [];

                        if (name && r[2].includes(name)) {
                            v[level][j] = true;
                            expandClass = 'start';
                            c = '';
                        } else {
                            v[level][j] = false;
                            expandClass = 'closed';
                            c = ' closed-cell';
                        }

                        h += midLine + '<td data-i="' + j + '" class="ks-pivot-table-group-sign-cell' + c + '"><div class="ks-pivot-table-group-sign-' + expandClass + '" style="border-color: #' + color + ';"><div style="background-color: #' + color + ';"></div></div></td><td data-i="' + j + '" colspan="' + (maxColspan - level - 1) + '" class="ks-pivot-table-group-title-cell h3">' + r[0] + '</td>';
                    } else {
                        h += midLine + '<td data-i="' + j + '" colspan="' + (maxColspan - level) + '" class="' + (level ? 'ks-pivot-table-title-cell' : 'ks-pivot-table-category-cell') + ' h3">' + r[0] + '</td>';
                    }
                } else {
                    h += midLine + '<td data-i="' + j + '" colspan="' + (maxColspan - level) + '" class="ks-pivot-table-category-cell h3"></td>';
                }
            }

            h += '<td class="ks-pivot-table-content-cell h2">' + cells.slice(k, k += colLen).join('</td><td class="ks-pivot-table-content-cell">') + '</td></tr>';
        }

        this.table.html(h);

        this.perf('RENDERED', t0);
    }

    expandCollapseButtonClicked(e) {
        let btn = $(e.currentTarget), cell = btn.parent(), i = cell.data('i'), isToExpand = btn.hasClass('ks-pivot-table-group-sign-closed'), h, f, member = this.getBreadcrumbsOfCell(cell);

        if (isToExpand) {
            f = 'expand';
        } else {
            f = 'collapse';
        }

        if (i > -1) {
            h = 0;
            f += 'Rows';
            member += cell.next().text();
        } else {
            h = 1;
            f += 'Cols';
            i = cell.parent().data('i');
            member += cell.text();
        }

        let d = this.holders.eq(h + 1).children('.ks-pivot-table-tag').eq(i).data('dimension'), x = this.expandedCollapsedMembers[h];

        x[d] = x[d] || {};

        if (!isToExpand === x[d][member]) {
            x[d][member] = null;
        } else {
            x[d][member] = isToExpand;
        }

        this.getPivotTable();
    }

    getBreadcrumbsOfCell(cell) {
        if (cell.data('i') > -1) {
            let p = cell.prev(), r, colspan, b = [];

            while (p.hasClass('ks-pivot-table-group-sign-cell')) {
                r = p.parent().prev(), colspan = p.prop('colpsan') || 1;

                p.prevAll().each((i, e) => colspan += e.colSpan);

                while (r.length) {
                    p = this.getCellForColspan(r, colspan);

                    if (p.hasClass('ks-pivot-table-group-sign-cell') && p.has('.ks-pivot-table-group-sign-start').length) {
                        b.push(p.next().text());

                        break;
                    }

                    r = r.prev();
                }

                p = p.prev();
            }

            return b.reverse().length ? (b.join('^') + '^') : '';
        }

        let colspan = cell.prop('colpsan') || 1, r = cell.parent().prev(), c, b = [];

        cell.prevAll().each((i, e) => colspan += e.colSpan);

        while (r.length) {
            c = this.getCellForColspan(r, colspan);

            if (!c.hasClass('ks-pivot-table-col-group-sign-cell')) {
                break;
            }

            for (c of c.prevAll()) {
                c = $(c);
                if (c.hasClass('ks-pivot-table-col-group-sign-cell') && c.has('.ks-pivot-table-group-sign-start').length) {
                    b.push(c.text());

                    break;
                }
            }

            r = r.prev();
        }

        return b.reverse().length ? (b.join('^') + '^') : '';
    }

    squeezeRowColumns(e) {
        this.table.hide();

        let t0 = performance.now(), cell = $(e.currentTarget).removeClass('icon-chevron-close-horizontal').addClass('icon-chevron-open-horizontal').parent(), totalColspan = 1;
        let c, d, colId = cell.data('i'), row = cell.parent(), card = this.holders.eq(1).children('.ks-pivot-table-tag').eq(colId);

        cell.data('colspan', cell.prop('colspan')).prop('colspan', 1).siblings('[data-i]').each((i, e) => totalColspan += e.colSpan);

        row.prevAll().each((i, e) => e.firstChild.colSpan = totalColspan);

        colId += '';
        row = row.next();
        row.children('[data-i="' + colId + '"]').addClass('h1').eq(0).before('<td class="h0" style="color: #' + card.data('hex') + ';" data-i="' + colId + '" rowspan="0"><div>' + card.children('h3').html() + '</div></td>');
        row = row.next()[0];

        while (row) {
            c = row.firstChild;

            while (c) {
                d = c.dataset;

                if (d.i === colId) {
                    c.classList.add('h1');
                } else if ((d.i > colId) || !d.i) {
                    break;
                }

                c = c.nextElementSibling;
            }

            row = row.nextElementSibling;
        }

        this.perf('COLUMN SQUEEZED', t0);

        this.table.show();
    }

    pullApartRowColumns(e) {
        this.table.hide();

        let t0 = performance.now(), cell = $(e.currentTarget).removeClass('icon-chevron-open-horizontal').addClass('icon-chevron-close-horizontal').parent();
        let c, d, colId = cell.data('i'), row = cell.parent(), totalColspan = cell.data('colspan');

        cell.prop('colspan', totalColspan).siblings('[data-i]').each((i, e) => totalColspan += e.colSpan);

        row.prevAll().each((i, e) => e.firstChild.colSpan = totalColspan);

        colId += '';
        row = row.next();
        row.children('[data-i="' + colId + '"]').removeClass('h1').eq(0).remove();
        row = row.next()[0];

        while (row) {
            c = row.firstChild;

            while (c) {
                d = c.dataset;

                if (d.i === colId) {
                    c.classList.remove('h1');
                } else if ((d.i > colId) || !d.i) {
                    break;
                }

                c = c.nextElementSibling;
            }

            row = row.nextElementSibling;
        }

        this.perf('COLUMN PULLED APART', t0);

        this.table.show();
    }

    getCellForColspan(row, colspan) {
        let colspanSum = 0, c;

        for (c of row.children()) {
            colspanSum += c.colSpan;
            if (colspanSum >= colspan) {
                return $(c);
            }
        }
    }

    selectContentCell(cell) {
        this.selectedCell.removeClass('sel');

        this.selectedCell = cell.addClass('sel');
    }

    editContentCell(cell) {
        let i = this.cellInput, p = i.parent(), v = i.val().trim(), n = cell.html();

        if (cell.has('input').length) {
            return;
        }

        cell.html('').append(i.val(n).data('value', n)).promise().then(() => Utils.focus(i));

        p.html(v);
    }

    saveContentCellValue(e) {
        let i = this.cellInput, p = i.parent(), url = "/api/v1/Cellsets('" + this.cellsetId + "')/Cells";

        let body = '{"Ordinal":' + this.getOrdinalOfCell(p) + ',"Value": \"' + i.val().trim() + '\"}';

        Auth.getAjaxRequest(app.apiHost + url, body, 'PATCH', this.widgetId)
            .then(() => p.addClass('ok'))
            .fail(() => p.addClass('err'))
            .always(() => this.finishEditingContentCell());
    }

    finishEditingContentCell() {
        let i = this.cellInput, p = i.parent();

        i.detach();

        if (p.hasClass('err')) {
            p.html(i.data('value')).removeClass('sel');
        } else if (p.hasClass('ok')) {
            p.html(i.val().trim()).removeClass('sel');
        } else {
            p.html(i.data('value'));
        }

        this.selectContentCell(p);
    }

    getOrdinalOfCell(c) {
        let r = c.parent(), s = '.ks-pivot-table-content-cell';

        return c.prevAll(s).length + r.children(s).length * r.prevAll(':not([data-i])').length;
    }

    exportPivotTable(e) {
        let d = this.getSelectedCardsData();

        if (!d) {
            app.popup.show('The Pivot Table is empty!');

            return;
        }

        let r = this.table[0].firstChild, rowHeader = [], colHeader = [], i = -1, j, k, c, n, p, v;

        while (r) {
            c = r.firstChild;
            k = r.dataset.i;

            if (k) {
                rowHeader[k] = rowHeader[k] || [];
                j = 0;

                while (c) {
                    if (!c.classList.contains('h4') && !c.classList.contains('ks-pivot-table-close-category-cell')) {
                        v = c.innerText;

                        if (v) {
                            rowHeader[k][j] = v;
                            n = v;
                        } else if (!rowHeader[k][j] || (c.firstChild && c.firstChild.classList.contains('ks-pivot-table-group-sign-middle'))) {
                            rowHeader[k][j] = n;
                        }

                        ++j;
                    }

                    c = c.nextElementSibling;
                }
            } else {
                p = 0;
                j = c.dataset.i;

                if (j) {
                    ++i;
                    colHeader[i] = [];
                }

                while (j) {
                    n = c.nextElementSibling;
                    k = n.dataset.i;

                    if (j !== k) {
                        v = c.innerHTML;

                        if (v) {
                            v = ' '.repeat(p) + v;
                        } else {
                            v = colHeader[i - 1][j];
                        }

                        colHeader[i][j] = v;

                        p = 0;
                    } else if (!(c.classList.contains('closed-cell') || (c.firstChild && c.firstChild.classList.contains('ks-pivot-table-group-sign-start')))) {
                        ++p;
                    }

                    c = n;
                    j = k;
                }
            }

            r = r.nextElementSibling;
        }

        d.export_data = JSON.stringify({row_header: rowHeader, col_header: colHeader});

        Pivot.export(d);
    }

    perf(title, t0) {
        L(title + ' IN: ' + ((performance.now() - t0) / 1000) + ' seconds');
    }
}
;