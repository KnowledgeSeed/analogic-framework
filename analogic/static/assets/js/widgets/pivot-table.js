class PivotTableWidget extends Widget {


    constructor(options) {
        super(options);
        if (typeof this.options.controlsInMenu === 'undefined') {
            this.options.controlsInMenu = true;
        }
        this.suppressZeroMode = 'rows';
        this.exportStyles = {
            editableColor: 'FFFFFFFF',
            readonlyColor: 'FFD3D3D3',
            headerFillColor: 'FFEDEDED',
            borderStyle: {
                top: {style: 'thin', color: {argb: 'FFD3D3D3'}},
                left: {style: 'thin', color: {argb: 'FFD3D3D3'}},
                bottom: {style: 'thin', color: {argb: 'FFD3D3D3'}},
                right: {style: 'thin', color: {argb: 'FFD3D3D3'}}
            },
            headerFontBold: true,
            resizeMargin: 2,
            resizeMinWidth: 4
        };
    }

    getHtml() {
        const o = this.options;

        this.lastSelectionSubset = 'user_Default';
        this.lastSelectionDisplayName = 'Last selection';
        this.selectorTreeColNames = ['Dimensions', 'Hierarchies', 'Subsets', 'Elements'];
        this.colors = [{name: 'Light Blue 100', hex: '009FDA'}, {
            name: 'Light Blue 60',
            hex: '66C5E9'
        }, {name: 'Light Blue 40', hex: '99D9F0'}, {name: 'Gray', hex: '747678'}, {
            name: 'Gray 40',
            hex: 'C7C8C9'
        }, {name: 'Gray 20', hex: 'E3E4E4'}, {name: 'Purple', hex: '80379B'}, {
            name: 'Purple 60',
            hex: 'B387C3'
        }, {name: 'Purple 40', hex: 'CCAFD7'}, {name: 'Orange', hex: 'E98300'}, {
            name: 'Orange 60',
            hex: 'F2B566'
        }, {name: 'Orange 40', hex: 'F6CD99'}, {name: 'Pink', hex: 'D71F85'}, {
            name: 'Pink 60',
            hex: 'E77986'
        }, {name: 'Pink 40', hex: 'EFA5CE'}, {name: 'Green', hex: '739600'}, {
            name: 'Green 60',
            hex: 'ABC066'
        }, {name: 'Green 40', hex: 'C7D599'}];
        this.tree = {children: {}};

        return `
<div class="ks-pivot">
    <div class="ks-pivot-table-controls-holder" ${o.hideCards ? 'style="display: none;"' : ''}>
        ${this.getControlsHtml()}
        <div class="ks-pivot-table-control-row">
            <div id="pivotSlicer" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-filter-circle icon-columns"></span></div></div>
        </div>
        <div class="ks-pivot-table-control-row">
            <div id="pivotRowSelector" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-rows"></span></div></div>
            <div class="ks-pivot-table-tag-switch"><span class="icon-arrow-swap"></span></div>
            <div id="pivotColSelector" class="ks-pivot-table-tag-holder"><a class="ks-pivot-table-add-tag"><span class="icon-plus-circle"></span></a><div class="ks-pivot-table-tag-holder-icon"><span class="icon-columns"></span></div></div>
        </div>
    </div>
    <table id="pivotTable" class="ks-pivot-table"></table>
</div>`;
    }

    getControlsHtml() {
        if (this.options.controlsInMenu) {
            return `
        <div class="ks-pivot-table-control-row presets-row pivot-btn-row right-align">
            <div class="ks-pivot-table-presets-btn">
                <span class="icon-ellipsis"></span>
                <div id="pivotPresetsDropdown" class="ks-pivot-table-presets-dropdown">
                    <a id="closePanelBtn"><span class="icon-arrow-to-top" style="color: #007BFF;"></span>Close Panel</a>
                    <a id="resetPivotBtn"><span class="icon-clear" style="color: #dc3545;"></span>Reset</a>
                    <a id="savePresetBtn"><span class="icon-tray-arrow-down" style="color: #3AA745;"></span>Save as Preset</a>
                    <a id="loadPresetBtn"><span class="icon-tray-files" style="color: #1d7bff;"></span>Load Preset</a>
                    <hr>
                    <a><span class="icon-zero-square-outline" style="color: #80379b;"></span>Suppress Zero</a>
                    <a class="suppressZeroBtn" data-id="${this.options.id}" data-type="nonEmptyColumns"><span class="icon-check" style="color: #1d7bff;"></span>From columns</a>
                    <a class="suppressZeroBtn" data-id="${this.options.id}" data-type="nonEmptyRows"><span class="icon-check" style="color: #1d7bff;"></span>From rows</a>
                    <hr>
                    <a id="exportBtnInline" data-id="${this.options.id}" data-action="exportPivotTable"><span class="icon-doc-arrow-down" style="color: #3AA745;"></span>Export to Excel</a>
                </div>
            </div>
        </div>`;
        } else {
            const suppressLabels = {
                all: 'All',
                columns: 'Columns',
                rows: 'Rows',
                off: 'OFF'
            };
            const currSuppress = suppressLabels[this.suppressZeroMode || 'off'];
            return `
<div class="ks-pivot-table-control-row presets-row pivot-btn-row left-align">
    <button id="resetPivotBtn" class="pivot-btn-outline"><span class="icon-arrow-undo"></span> Reset</button>
    <button id="savePresetBtn" class="pivot-btn-outline"><span class="icon-tray-arrow-down"></span> Save as Preset</button>
    <button id="loadPresetBtn" class="pivot-btn-outline"><span class="icon-tray-files"></span> Load Preset</button>
    <span class="pivot-btn-outline-group" style="position:relative;">
      <span class="pivot-btn-outline-label">Supress Zero:</span>
      <button id="suppressZeroDropdownBtn" class="pivot-btn-outline suppressZeroDropdownBtn" type="button">${currSuppress}</button>
      <div id="suppressZeroPopup" class="suppress-zero-popup" style="display:none;position:absolute;z-index:999;left:0;top:40px;"></div>
    </span>
    <span class="pivot-btn-outline-label" style="margin-left:24px;">Excel:</span>
    <button id="exportBtn" class="pivot-btn-outline"><span class="icon-doc-arrow-down"></span></button>
</div>`;
        }
    }


    initEventHandlers() {
        const o = this.options,
            section = this.getSection().children().off('click').on('click', () => this.closeDropdowns());

        this.cubeName = o.cubeName;
        this.presetId = 0;
        this.expandedCollapsedMembers = [{}, {}];
        this.suppressOptions = {nonEmptyRows: true, nonEmptyColumns: true};

        let presetParams = [], fn = (Repository[this.id] || {}).getPivotPresetParams;

        if (fn) {
            presetParams = fn(LoadExecutorFactory.createContext(this.id, 'PivotTableWidget'));
        }

        Pivot.call({
            data: {
                cube_name: o.cubeName,
                options: JSON.stringify({widgetId: this.id, presetParams: presetParams})
            }
        }).then(d => {
            this.presets = this.parsePresetsData(d.data);

            this.doLoadPreset(this.presetId);

            d.data = {};

            this.data = d;

            this.initSelectorTree(section);
        });

        this.initPresetsDropdown();

        this.holders = $('#pivotSlicer,#pivotRowSelector,#pivotColSelector');

        this.initSortable(this.holders.eq(0));

        this.initSortable(this.holders.eq(1));

        this.initSortable(this.holders.eq(2));

        section.children('.ks-pivot-table-controls-holder').off('click')
            .on('click', '.ks-pivot-table-add-tag', e => this.openSelectorTreeFromHolder(e))
            .on('click', '.ks-pivot-table-tag', e => this.cardClicked(e))
            .on('click', '.icon-x-circle', e => this.deleteCard(e))
            .on('click', '.ks-pivot-table-tag-switch', () => this.changeRowsAndColumnsCards())
            .on('choose', e => Utils.stopEvent(e));

        Doc.off('keydown.pivot').on('keydown.pivot', e => this.keyPressed(e));

        this.table = $('#pivotTable').off('click')
            .on('click', '.ks-pivot-table-group-sign-start,.ks-pivot-table-group-sign-closed', e => this.expandCollapseButtonClicked(e))
            .on('click', '.icon-chevron-close-horizontal', e => this.squeezeRowColumns(e))
            .on('click', '.icon-chevron-open-horizontal', e => this.pullApartRowColumns(e))
            .on('click', '.ks-pivot-table-content-cell.u', e => this.selectContentCell($(e.currentTarget)))
            .on('dblclick', '.ks-pivot-table-content-cell.u', e => this.editContentCell($(e.currentTarget)));


        this.initControls();
    }

    parsePresetsData(d) {
        let i, p = [], len = d.length - 5;

        for (i = 0; i < len; i += 6) {
            p.push({
                data: JSON.parse(d[i + 5].FormattedValue),
                id: d[i].FormattedValue,
                name: d[i + 4].FormattedValue,
                type: d[i + 2].FormattedValue,
                isOwner: parseInt(d[i + 3].FormattedValue)
            });
        }

        return p;
    }

    initControls() {
        if (!this.options.controlsInMenu) {
            $('#resetPivotBtn').off().on('click', () => this.resetPivotTable());
            $('#loadPresetBtn').off().on('click', () => this.loadPresetBtnClicked());
            $('#savePresetBtn').off().on('click', () => this.savePreset());
            $('#exportBtn').off().on('click', e => this.exportPivotTable(e));

            $('#suppressZeroDropdownBtn').off().on('click', e => {
                e.stopPropagation();
                this.showSuppressZeroPopup(e.currentTarget);
            });

            $(document).off('click.suppressZero').on('click.suppressZero', () => {
                $('#suppressZeroPopup').hide();
            });
        } else {
            $('#resetPivotBtn').off().on('click', () => this.resetPivotTable());
            $('#loadPresetBtn').off().on('click', () => this.loadPresetBtnClicked());
            $('#savePresetBtn').off().on('click', () => this.savePreset());
            $('#exportBtnInline').off().on('click', e => this.exportPivotTable(e));
            $('.suppressZeroBtn').off().on('click', e => this.suppressZeroBtnClicked(e));
        }
    }


    closeDropdowns() {
        this.closeSlicerFilterBox();

        this.closePresetsDropdown();
    }

    cellInputEventHandler(e) {
        e.stopImmediatePropagation();

        if (13 === e.which) {
            this.saveContentCellValue();
        } else if (27 === e.which) {
            this.finishEditingContentCell();
        }
    }

    initPresetsDropdown() {
        this.pivotPresetsDropdown = $('#pivotPresetsDropdown');

        this.pivotPresetsDropdown.parent().off('click')
            .on('click', '#resetPivotBtn', () => this.resetPivotTable())
            .on('click', '#loadPresetBtn', () => this.loadPresetBtnClicked())
            .on('click', '#savePresetBtn', () => this.savePreset())
            .on('click', '#exportBtn', e => this.exportPivotTable(e))
            .on('click', '#closePanelBtn', () => this.closePresetsDropdown())
            .on('click', e => {
                let b = $(e.target);

                if (b.hasClass('ks-pivot-table-presets-btn') || b.hasClass('icon-ellipsis')) {
                    this.pivotPresetsDropdown.toggle();
                }

                Utils.stopEvent(e);
            });

        this.suppressZeroBtns = this.pivotPresetsDropdown.find('.suppressZeroBtn').on('click', e => this.suppressZeroBtnClicked(e));
    }

    closePresetsDropdown() {
        this.pivotPresetsDropdown.hide();
    }

    initSelectorTree(section) {
        let h = '<div style="display: none; margin: 50px auto;"><div class="ks-pivot-tag-add-controls"><div class="ks-pivot-tag-color-dropdown-holder"><label>Pivot Colour</label><div class="ks-pivot-tag-color-dropdown"><div class="ks-pivot-tag-color-icon"></div><span></span><div style="display: none;" class="ks-pivot-tag-color-dropdown-chooser">';

        this.addToNextLevelChildren(this.tree, this.data.children, this.data.data);

        for (let color of this.colors) {
            h += '<div data-name="' + color.name + '" data-hex="' + color.hex + '" class="ks-pivot-tag-color-dropdown-chooser-item" style="background-color: #' + color.hex + ';"></div>';
        }

        h += '</div></div></div><div class="ks-pivot-tag-button-holder"><a id="selectorTreeCancelBtn" class="ks-pivot-btn btn-blue-light"><span class="icon-x-circle"></span>Cancel</a><a id="selectorTreeSaveBtn" class="ks-pivot-btn btn-blue"><span style="color: #fff;" class="icon-check-on"></span>Save</a><a id="selectorTreeViewBtn" class="ks-pivot-btn btn-blue"><span style="color: #fff;" class="icon-glasses"></span>View</a></div></div><div class="ks-pivot-tag-add-holder">';

        h += this.renderNextSelectorTreeLevel(this.tree) + '</div></div>';

        this.selectorTree = $(h).prependTo(section)
            .off('click input change')
            .on('click', '.ks-pivot-tag-add-item:not(".title-item")', (e, callback) => this.selectorTreeItemClicked(e, callback))
            .on('click', '#pivotElementsCheckbox', () => this.getSelectorTreeColumns().eq(2).children('.ks-pivot-tag-add-col-content').children('.ks-on').children().eq(0).trigger('click'))
            .on('click', '.icon-aa', e => this.aliasAttributeNameButtonClicked($(e.target)))
            .on('input change', 'input', e => this.filterSelectorTreeColumn(e));

        this.colorDropdown = this.selectorTree.find('.ks-pivot-tag-color-dropdown').on('click', e => this.selectorTreeColorClicked($(e.target)));

        this.selectorTreeSaveBtn = $('#selectorTreeSaveBtn').on('click', () => this.saveCard());
        this.selectorTreeViewBtn = $('#selectorTreeViewBtn').on('click', () => this.selectorTreeViewBtnClicked());

        $('#selectorTreeCancelBtn').on('click', () => this.closeSelectorTree());
    }

    initSortable(div) {
        Sortable.create(div[0], {
            group: 1,
            draggable: '.ks-pivot-table-tag',
            filter: '.no-drag',
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
            this.closeDropdowns();
        }

        if (this.selectorTree.is(':visible')) {
            this.handleSelectorTreeNavigation(e);
        } else if (this.selectedCell && this.selectedCell.length && this.selectedCell.hasClass('sel')) {
            this.handleContentCellNavigation(e);
        }
    }


    handleSelectorTreeNavigation(e) {
        let n = e.which, b = this.selectorTree.find('.nav'), i = this.selectorTree.find('input'), f,
            isSaveAllowed = !this.selectorTreeSaveBtn.hasClass('disabled');

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
        let d, card = $(e.item), dim = card.data('dimension'), hier = card.data('hierarchy'),
            subset = card.data('subset');

        this.options.isPrivateSubset = card.data('private') || false;

        if ('pivotSlicer' === e.to.id) {
            $(e.to).children('[data-dimension="' + dim + '"][data-hierarchy="' + hier + '"]').not(card).remove();

            d = this.tree.children[dim];

            if (!d.children[hier]) {
                let p = {dimension_name: dim};

                this.getNextSelectorTreeLevel(p, d).then(() => this.getNextSelectorTreeLevel({
                    ...p,
                    hierarchy_name: hier
                }, d.children[hier])).then(() => this.adjustCardForSlicer(d, dim, hier, subset, card));
            } else {
                this.adjustCardForSlicer(d, dim, hier, subset, card);
            }
        } else {
            this.holders.slice(1).children('[data-dimension="' + dim + '"][data-hierarchy="' + hier + '"]').not(card).remove();

            card.attr('data-element', '').data('element', '').find('h4').html(this.lastSelectionSubset === subset ? this.lastSelectionDisplayName : subset);

            this.getPivotTable();
        }
    }

    adjustCardForSlicer(d, dim, hier, subset, card) {
        d = d.children[hier];

        let defaultMember = d.defaultMember;

        d = d.children[subset];

        if ($.isEmptyObject(d.children)) {
            let p = {dimension_name: dim, hierarchy_name: hier, subset_name: subset};

            this.getNextSelectorTreeLevel(p, d).then(resp => this.doAdjustCardForSlicer(card, resp.data.children, defaultMember));
        } else {
            this.doAdjustCardForSlicer(card, d.children, defaultMember);
        }
    }

    doAdjustCardForSlicer(card, elements, defaultMember) {
        let e, elNames = elements.map(e => e[0]), i;

        if (defaultMember) {
            i = elNames.indexOf(defaultMember);
        }

        if (-1 !== i) {
            e = defaultMember;
        } else {
            e = elNames[0];
            i = 0;
        }

        card.attr({'data-element': e, index: i}).data({element: e, index: i}).find('h4').html(e);

        this.getPivotTable();
    }

    selectorTreeItemClicked(e, callback) {
        this.removeDuplicatedSelectorTreeCols = !e.isTrigger;

        let clickedPart = $(e.target), item = $(e.currentTarget), col = item.parent().parent(),
            colType = col.data('type'), isSelectedBySubsetCheckbox = null, value = item.data('name'), p;

        if ('element' === colType) {
            this.elementClicked(item, col);
            this.adjustSelectorTreeSaveBtnVisibility();
            return;
        } else if (clickedPart.hasClass('icon-check-on') || clickedPart.hasClass('icon-check-off') || clickedPart.hasClass('icon-check-intermediate')) {
            isSelectedBySubsetCheckbox = this.subsetCheckboxClicked(clickedPart, item);
        } else if ('dimension' === colType || 'hierarchy' === colType) {
            this.resetSelectorTreeSelections();
        } else if (clickedPart.hasClass('icon-trash')) {
            this.removeSubset(value);
            return;
        }

        p = item.children('.icon-trash').length > 0;
        col.attr('data-private', p).data('private', p);

        if (isSelectedBySubsetCheckbox) {
            item.toggleClass('ks-on', true).siblings().removeClass('ks-on');
        } else if (null === isSelectedBySubsetCheckbox) {
            item.toggleClass('ks-on').siblings().removeClass('ks-on');
        }

        const isItemActive = item.hasClass('ks-on'), v = isItemActive ? value : '';

        this.lastClickedSelectorTreeItem = isItemActive ? {col: colType, name: value} : null;

        col.attr('data-value', v).data('value', v).nextAll().remove();

        if (isItemActive) {
            this.showNextSelectorTreeLevel(callback);
        }

        this.adjustSelectorTreeSaveBtnVisibility();
    }

    elementClicked(item, col) {
        const span = item.children().eq(0).toggleClass('icon-check-off icon-check-on');
        const cols = this.getSelectorTreeColumns(),
            subsetItemCheckInfo = col.prev().children('.ks-pivot-tag-add-col-content').children('.ks-on').children().eq(0).removeClass();
        const d = this.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[cols.eq(2).data('value')];
        const infoCheckbox = this.adjustElementColumnCheckInfo(col), subsetCheckboxClass = infoCheckbox.attr('class');

        d.checkboxClass = subsetCheckboxClass;
        d.children[item.index() - 1].on = span.hasClass('icon-check-on');

        subsetItemCheckInfo.removeClass().addClass(subsetCheckboxClass);
    }

    subsetCheckboxClicked(clickedPart, item) {
        let subsetCheckboxClass, isSubsetSelected = false, subset = item.data('name'),
            cols = this.getSelectorTreeColumns();

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
        let checkBoxes = col.children('.ks-pivot-tag-add-col-content').children().children('span'),
            infoCheckbox = checkBoxes.eq(0).removeClass();

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
        let i,
            elements = this.tree.children[cols.eq(0).data('value')].children[cols.eq(1).data('value')].children[subset || cols.eq(2).data('value')];

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

        const cols = this.getSelectorTreeColumns(),
            isDisabled = !cols.eq(2).children('.ks-pivot-tag-add-col-content').children().slice(1).children('.icon-check-on,.icon-check-intermediate').length;

        this.selectorTreeSaveBtn.toggleClass('disabled', isDisabled);
        this.selectorTreeViewBtn.toggleClass('disabled', isDisabled);
    }

    showNextSelectorTreeLevel(callback) {
        let i, col, val, cols = this.getSelectorTreeColumns(), selectedData = {}, nextLevelData;

        for (i = 0; i < cols.length; ++i) {
            col = cols.eq(i);
            val = col.data('value');

            selectedData[col.data('type') + '_name'] = val;

            nextLevelData = (nextLevelData || this.tree).children[val];

            if (2 === i) {
                this.options.isPrivateSubset = col.data('private') || false;
            }
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

        return Pivot.call({data: selectedData}).then(resp => {
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
        const types = ['dimension', 'hierarchy', 'subset', 'element'], i = cols ? cols.length : 0,
            children = nextLevelData.children;
        const isCheckableCol = (i > 1), isElementCol = (3 === i), privateSubsets = nextLevelData.privateSubsets || [];
        const aliasAttrName = isElementCol ? this.getSelectedAliasAttributeName(cols.eq(0).data('value'), cols.eq(1).data('value'), cols.eq(2).data('value')) : false;

        let el, name, displayName, isSubsetSelected, defaultSubsetItem = '', h = '',
            g = '<div data-type="' + types[i] + '" class="ks-pivot-tag-add-col ' + (isCheckableCol ? 'checkable-col' : '') + '"><div class="ks-pivot-add-tag-search-holder"><div class="ks-pivot-add-tag-search"><span class="icon-search"></span><input type="text" placeholder="Search..."></div></div><div class="ks-pivot-tag-add-col-content"><div class="ks-pivot-tag-add-item title-item">' + (isElementCol ? ('<span id="pivotElementsCheckbox"></span>') : '') + this.selectorTreeColNames[i] + (isElementCol ? '<span class="icon-aa"><div class="ks-pivot-table-presets-dropdown"></div></span>' : '') + '</div>';

        if (isCheckableCol) {
            let check, del, c, chevron = isElementCol ? '' : '<span class="icon-chevron-right"></span>',
                subsetCheckbox = cols.eq(2).children('.ks-pivot-tag-add-col-content').children('.ks-on').children('span').eq(0);

            if (subsetCheckbox.hasClass('icon-check-on')) {
                isSubsetSelected = true;
            } else if (subsetCheckbox.hasClass('icon-check-off')) {
                isSubsetSelected = false;
            }

            for (name in children) {
                el = children[name];
                del = '';

                if (isElementCol) {
                    name = el[0];
                    let aliasValue = el[aliasAttrName] || '';
                    displayName = aliasAttrName && aliasValue ? (name + ' (' + aliasValue + ')') : name;
                    check = '<span class="icon-check-' + (el.on || (isSubsetSelected === true) ? 'on' : 'off') + '"></span>';
                } else {
                    displayName = name;
                    if (name === this.lastSelectionSubset) {
                        defaultSubsetItem = '<div class="ks-pivot-tag-add-item" data-name="' + name + '"><span class="' + (el.checkboxClass || 'icon-check-off') + '"></span><span class="icon-cursor"></span>' + this.lastSelectionDisplayName + chevron + '<span style="display: none;" class="icon-trash"></span></div>';
                        continue;
                    } else if (privateSubsets.includes(name)) {
                        c = 'person-outline';
                        del = '<span class="icon-trash"></span>';
                    } else {
                        c = 'globe-lines';
                    }
                    check = '<span class="' + (el.checkboxClass || 'icon-check-off') + '"></span><span class="icon-' + c + '"></span>';
                }
                h += '<div class="ks-pivot-tag-add-item" data-name="' + Utils.htmlEncode(name) + '">' + check + displayName + del + chevron + '</div>';
            }
        } else {
            for (name in children) {
                h += '<div class="ks-pivot-tag-add-item" data-name="' + Utils.htmlEncode(name) + '">' + name + '<span class="icon-chevron-right"></span></div>';
            }
        }

        h = g + defaultSubsetItem + h + '</div></div>';

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
            } else {
                j = cols.length - 1;
            }

            if (isElementCol) {
                this.adjustElementColumnCheckInfo(cols.eq(j));
            }

            if (typeof isSubsetSelected !== 'undefined') {
                this.adjustElementsSelectivityMetaData(cols, isSubsetSelected);
            }

            this.adjustSelectorTreeSaveBtnVisibility();

            if (callback) {
                callback();
            } else if (1 === this.subsetMergeSaveStatus) {
                this.subsetMergeSaveStatus = 2;
                let newItem = this.getSelectorTreeColumns().eq(2).children('.ks-pivot-tag-add-col-content').children('[data-name="' + this.newSubsetName + '"]');
                if (newItem.length) {
                    newItem.children('span').eq(0).trigger('click');
                } else {
                    this.subsetMergeSaveStatus = 0;
                    this.closePopup();
                    app.popup.show('Error displaying temporary subset for view.', 400);
                }
            } else if (2 === this.subsetMergeSaveStatus) {
                this.subsetMergeSaveStatus = 0;
                this.doSaveCard();
            } else if (this.lastClickedSelectorTreeItem) {
                el = cols.filter('[data-type="' + this.lastClickedSelectorTreeItem.col + '"]').children('.ks-pivot-tag-add-col-content').children('[data-name="' + this.lastClickedSelectorTreeItem.name + '"]');
                if (!el.hasClass('ks-on')) {
                    el.trigger('click');
                } else if (cols.length < 4 && 'subset' === this.lastClickedSelectorTreeItem.col) {
                    this.showNextSelectorTreeLevel();
                }
            }
            if (cols.length > i) {
                cols.eq(j).children().eq(0).find('input').focus();
            }
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

    selectorTreeViewBtnClicked() {
        if (this.selectorTreeViewBtn.hasClass('disabled')) {
            return;
        }

        let c = this.getSelectorTreeColumns().eq(2).children('.ks-pivot-tag-add-col-content').children(), f = c.eq(1);


        if ((this.lastSelectionSubset !== f.data('name') || !f.has('.icon-check-on').length) && (1 === c.has('.icon-check-on').length)) {
            this.saveCard();

            return;
        }

        this.subsetMergeSaveStatus = 1;

        this.doSaveAsNewSubset(this.lastSelectionSubset, false);
    }

    saveCard() {
        if (this.selectorTreeSaveBtn.hasClass('disabled')) {
            return;
        }

        let c = this.getSelectorTreeColumns().eq(2).children('.ks-pivot-tag-add-col-content').children().children();

        if (0 < c.filter('.icon-check-intermediate').length || 1 < c.filter('.icon-check-on').length) {
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

        this.closeSelectorTree();

        this.getPivotTable();
    }

    saveNewCard() {
        const cols = this.getSelectorTreeColumns(), dimension = cols.eq(0).data('value'),
            hierarchy = cols.eq(1).data('value'), s = cols.eq(2);
        const isTaintedHolderSlicer = this.isTaintedHolderSlicer(),
            aliasAttrName = this.getSelectedAliasAttributeName(dimension, hierarchy, s.data('value'));
        const cardSelector = '[data-dimension="' + dimension + '"][data-hierarchy="' + hierarchy + '"]';
        const element = isTaintedHolderSlicer ? cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1).has('.icon-check-on') : null;
        const elementName = element ? element.data('name') : '';

        this.taintedCard = this.taintedHolder.children(cardSelector + (isTaintedHolderSlicer ? '[data-element="' + elementName + '"]' : ''));

        if (this.taintedCard.length) {
            this.adjustCardAccordingToNewSelection();

            return;
        }

        const c = s.children('.ks-pivot-tag-add-col-content'), isPrivate = s.data('private');
        const subsetItem = (isTaintedHolderSlicer ? c.children('.ks-on') : c.children().has('.icon-check-on')),
            subset = subsetItem.data('name');

        if (!subset) {
            app.popup.show('SUBSET ERROR!');
            L('SUBSET ERROR! "cols" var: ', cols);

            return;
        }

        let displayName;

        if (isTaintedHolderSlicer) {
            displayName = aliasAttrName ? this.tree.children[dimension].children[hierarchy].children[subset].children[element.index() - 1][aliasAttrName] : elementName;
            this.holders.eq(0).children(cardSelector).remove();
        } else {
            displayName = this.lastSelectionSubset === subset ? this.lastSelectionDisplayName : subset;
            f
            this.holders.slice(1).children(cardSelector).remove();
        }

        const hex = this.colorDropdown.data('hex');

        this.taintedCard = $('<div class="ks-pivot-table-tag noselect" data-private="' + isPrivate + '" data-alias_attr_name="' + Utils.htmlEncode(aliasAttrName) + '" data-dimension="' + Utils.htmlEncode(dimension) + '" data-hierarchy="' + Utils.htmlEncode(hierarchy) + '" data-subset="' + Utils.htmlEncode(subset) + '"' + 'data-element="' + Utils.htmlEncode(elementName) + '"' + ' data-hex="' + hex + '"><div class="ks-pivot-table-tag-color" style="background-color: #' + hex + ';"></div><h3>' + dimension + '</h3><h4>' + displayName + '</h4><span class="icon-x-circle"></span></div>');

        this.taintedHolder.append(this.taintedCard);
    }

    adjustCardAccordingToNewSelection() {
        const cols = this.getSelectorTreeColumns(), isTaintedHolderSlicer = this.isTaintedHolderSlicer();

        const element = isTaintedHolderSlicer ? cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1).has('.icon-check-on').data('name') : '';
        const s = cols.eq(2), c = s.children('.ks-pivot-tag-add-col-content'), isPrivate = s.data('private');
        let subset = (isTaintedHolderSlicer ? c.children('.ks-on') : c.children().has('.icon-check-on,.icon-check-intermediate'));

        if ((isTaintedHolderSlicer && !element) || (!isTaintedHolderSlicer && !subset.length)) {
            this.deleteCard();

            return false;
        } else if (!isTaintedHolderSlicer && subset.has('.icon-check-intermediate').length) {
            this.saveAsNewSubset();

            return true;
        }

        subset = subset.data('name');

        const dimension = cols.eq(0).data('value'), hierarchy = cols.eq(1).data('value'),
            hex = this.colorDropdown.data('hex');
        const cardSelector = '[data-dimension="' + dimension + '"][data-hierarchy="' + hierarchy + '"]';
        const aliasAttrName = this.getSelectedAliasAttributeName(dimension, hierarchy, subset);

        if (isTaintedHolderSlicer) {
            this.holders.eq(0).children(cardSelector).not(this.taintedCard).remove();
        } else {
            this.holders.slice(1).children(cardSelector).not(this.taintedCard).remove();
        }

        this.taintedCard.data({
            private: isPrivate,
            alias_attr_name: aliasAttrName,
            dimension: dimension,
            hierarchy: hierarchy,
            subset: subset,
            hex: hex,
            element: element
        });
        this.taintedCard.attr({
            'data-private': isPrivate,
            'data-alias_attr_name': aliasAttrName,
            'data-dimension': dimension,
            'data-hierarchy': hierarchy,
            'data-subset': subset,
            'data-hex': hex,
            'data-element': element
        });
        this.taintedCard.children().eq(0).css('background-color', '#' + hex).next().html(dimension).next().html(isTaintedHolderSlicer ? element : (this.lastSelectionSubset === subset ? this.lastSelectionDisplayName : subset));

        return true;
    }

    getSelectedAliasAttributeName(dimension, hierarchy, subset) {
        const d = this.tree.children[dimension].children[hierarchy], e = d.children[subset];

        return e.selectedAliasAttributeName || e.defaultAliasAttributeName || d.aliasAttributeNames[0] || '';
    }

    deleteCard(e) {
        if (e) {
            Utils.stopEvent(e);

            this.taintedCard = $(e.currentTarget).closest('.ks-pivot-table-tag');
        }

        this.popup = $('<div class="ks-pivot ks-pivot-tag-add-popup"><h3>Do you really want to delete card?</h3><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">No</a><a data-action="yes" class="ks-pivot-btn btn-blue">Yes</a></div></div>');

        this.popup.on('click', 'a', e => {
            if ('yes' === $(e.currentTarget).data('action')) {
                this.taintedCard.remove();

                this.closeSelectorTree();

                this.getPivotTable();
            }

            this.closePopup();
        });

        this.showPopup();
    }

    aliasAttributeNameButtonClicked(btn) {
        const cols = this.getSelectorTreeColumns(), dim = cols.eq(0).data('value'), hier = cols.eq(1).data('value'),
            subset = cols.eq(2).data('value');
        const d = this.tree.children[dim].children[hier], g = d.children[subset];

        if (btn.hasClass('icon-aa')) {
            let s = this.getSelectedAliasAttributeName(dim, hier, subset);

            btn.children().html(d.aliasAttributeNames.map((e, i) => '<a data-alias_attr_name="' + e + '"><span class="icon-check' + (((!s && !i) || e === s) ? '' : ' off') + '"></span>' + e + '</a>')).toggle();
        } else if (btn.is('a') || btn.hasClass('icon-check')) {
            btn = btn.closest('a');

            g.selectedAliasAttributeName = btn.data('alias_attr_name');

            btn.children().removeClass('off');
            btn.siblings().children().addClass('off');

            this.adjustElementAliases(cols.eq(3).children('.ks-pivot-tag-add-col-content').children().slice(1), g.selectedAliasAttributeName, g.children);
        }
    }

    adjustElementAliases(elements, aliasAttrName, data) {
        let i, n, e, len = elements.length, d;

        for (i = 0; i < len; ++i) {
            e = elements.eq(i);
            n = e.data('name');
            d = data[i];
            e.contents().eq(1)[0].textContent = n + ' (' + (d[aliasAttrName] || d[0]) + ')';
        }
    }

    filterSelectorTreeColumn(e) {
        let inp = $(e.currentTarget), items = inp.closest('.ks-pivot-add-tag-search-holder').next().children().slice(1),
            searchTerm = Utils.cleanStr(inp.val().trim()).toLowerCase(), i, len = items.length;

        for (i = 0; i < len; ++i) {
            e = items.eq(i);

            e.toggle(Utils.cleanStr(e.text().toLowerCase()).includes(searchTerm));
        }
    }

    saveAsNewSubset() {
        this.subsetMergeSaveStatus = 1;

        this.popup = $(`
            <div class="ks-pivot ks-pivot-tag-add-popup">
                <h3>Save as New Subset</h3>
                <label>Subset Title</label>
                <input type="text">
                <div class="ks-pivot-popup-check-holder">
                    <span class="icon-check off" style="color: #1d7bff;"></span>This Subset is Public
                </div>
                <div class="ks-pivot-tag-add-popup-button-holder">
                    <a class="ks-pivot-btn btn-blue-light">Cancel</a>
                    <a data-action="save" class="ks-pivot-btn btn-blue">Save</a>
                </div>
            </div>
        `);

        this.popup.on('click', 'a', e => {
            e = $(e.currentTarget);

            if ('save' === e.data('action')) {
                const input = this.popup.find('input');
                const newSubsetName = input.val().trim();
                const isPublicCheckbox = this.popup.find('.ks-pivot-popup-check-holder .icon-check');
                const isPublic = !isPublicCheckbox.hasClass('off');

                input.toggleClass('error', !newSubsetName);

                if (newSubsetName) {
                    const cols = this.getSelectorTreeColumns();
                    const dim = cols.eq(0).data('value');
                    const hier = cols.eq(1).data('value');
                    const hierData = this.tree.children[dim].children[hier];
                    const lowerNewName = newSubsetName.toLowerCase();
                    let existingName = null;
                    let isOverwrite = false;

                    if (isPublic) {
                        const publicSubsets = Object.keys(hierData.children).filter(name => !hierData.privateSubsets.includes(name) && name !== this.lastSelectionSubset);
                        const existingPublicIndex = publicSubsets.map(s => s.toLowerCase()).indexOf(lowerNewName);
                        if (existingPublicIndex > -1) {
                            input.remove();
                            this.popup.find('label').html('A Public Subset with this name already exists.<br>Public subsets cannot be overwritten here.').css('color', 'red');
                            this.popup.find('a[data-action="save"]').remove();
                            this.popup.find('.ks-pivot-popup-check-holder').remove();
                            return;
                        }
                    } else {
                        const existingPrivateIndex = hierData.privateSubsets.map(s => s.toLowerCase()).indexOf(lowerNewName);
                        if (existingPrivateIndex > -1) {
                            existingName = hierData.privateSubsets[existingPrivateIndex];
                            isOverwrite = true;
                        }
                    }


                    if (isOverwrite) {
                        input.remove();
                        this.popup.find('.ks-pivot-popup-check-holder').remove();
                        this.popup.children('label').html(`There is an existing private subset named "${existingName}".<br>Would you like to overwrite it with the new selection?`);
                        this.popup.find('a').eq(1).text('Overwrite').off('click').on('click', ev => {
                            Utils.stopEvent(ev);
                            this.doSaveAsNewSubset(existingName, isPublic);
                        });
                        return;
                    } else {
                        this.doSaveAsNewSubset(newSubsetName, isPublic);
                    }

                } else {
                    return;
                }
            } else {
                this.subsetMergeSaveStatus = 0;
            }

            this.closePopup();
        });

        this.popup.on('click', '.ks-pivot-popup-check-holder', e => {
            $(e.currentTarget).find('span').toggleClass('off');
        });


        this.showPopup(() => this.popup.find('input').focus());
    }

    doSaveAsNewSubset(newSubsetName, isPublic) {
        const o = this.options;
        const cols = this.getSelectorTreeColumns();
        const dimName = cols.eq(0).data('value');
        const hierName = cols.eq(1).data('value');

        const requestOptions = {...o, isPublic: isPublic};

        const d = {
            cube_name: this.cubeName,
            dimension_name: dimName,
            hierarchy_name: hierName,
            subset_name: newSubsetName,
            options: JSON.stringify(requestOptions)
        };

        this.newSubsetName = (this.subsetMergeSaveStatus === 1 && newSubsetName === this.lastSelectionSubset) ? this.lastSelectionSubset : newSubsetName;
        this.newSubsetIsPublic = isPublic;

        let i, c, el, elements, subset, subsets = this.tree.children[dimName].children[hierName].children,
            elementNames = [];

        for (subset in subsets) {
            if (!subsets[subset].checkboxClass) continue;

            if (subsets[subset].checkboxClass.includes('icon-check-on') || subsets[subset].checkboxClass.includes('icon-check-intermediate')) {
                elements = subsets[subset].children;
                for (i in elements) {
                    el = elements[i];
                    if (el.on) {
                        elementNames.push(el[0]);
                    }
                }
            }
        }

        d.element_names = $.uniqueSort(elementNames);


        Pivot.call({data: d})
            .then(subsetData => this.reloadSubsetsInSelectorTree(cols, d, subsetData))
            .catch(err => {
                app.popup.show('Error saving subset.', 400);
                console.error("Error in doSaveAsNewSubset:", err);
                this.subsetMergeSaveStatus = 0;
                this.closePopup();
            });
    }

    removeSubset(subset) {
        this.popup = $('<div class="ks-pivot ks-pivot-tag-add-popup"><div style="text-align: center;margin: 15px;"><span class="icon-trash-fill" style="color: #DC3545;font-size: 30px;"></span></div><h2 style="text-align: center;">Delete Subset</h2><h3>Are you sure?<br>This action cannot be undone!</h3><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">Cancel</a><a data-action="yes" class="ks-pivot-btn btn-red-bg">Delete</a></div></div>');

        this.popup.on('click', 'a', e => {
            if ('yes' === $(e.currentTarget).data('action')) {
                this.doRemoveSubset(subset);

                return;
            }

            this.closePopup();
        });

        this.showPopup();
    }

    doRemoveSubset(subset) {
        const cols = this.getSelectorTreeColumns(), d = {
            cube_name: this.cubeName,
            dimension_name: cols.eq(0).data('value'),
            hierarchy_name: cols.eq(1).data('value'),
            subset_name_to_remove: subset
        };

        const deletedCards = this.holders.children('[data-dimension="' + d.dimension_name + '"][data-hierarchy="' + d.hierarchy_name + '"][data-subset="' + subset + '"]').remove();

        Pivot.call({data: d}).then(subsetData => {
            if (deletedCards.length) {
                this.closeSelectorTree();

                this.getPivotTable();
            }

            this.reloadSubsetsInSelectorTree(cols, d, subsetData);
        });
    }

    reloadSubsetsInSelectorTree(cols, selectedData, subsetData) {
        const dimName = selectedData.dimension_name;
        const hierName = selectedData.hierarchy_name;

        this.tree.children[dimName].children[hierName] = {children: {}};

        this.addToNextLevelChildren(this.tree.children[dimName].children[hierName], subsetData.children, subsetData.data);

        cols.slice(2).remove();

        this.renderNextSelectorTreeLevel(this.tree.children[dimName].children[hierName], cols.slice(0, 2));

        this.closePopup();

        if (this.subsetMergeSaveStatus === 1 && this.newSubsetName === this.lastSelectionSubset) {
        } else if (this.subsetMergeSaveStatus === 1) {
            let newSubsetCol = this.getSelectorTreeColumns().eq(2);
            let newItem = newSubsetCol.children('.ks-pivot-tag-add-col-content').children('[data-name="' + this.newSubsetName + '"]');

            if (newItem.length) {
                if (!this.newSubsetIsPublic) {
                    newSubsetCol.attr('data-private', true).data('private', true);
                } else {
                    newSubsetCol.attr('data-private', false).data('private', false);
                }
                newItem.children('span').eq(0).trigger('click');
            }
            this.subsetMergeSaveStatus = 0;
        }
    }

    showPopup(callback) {
        El.body.prepend(this.popup).promise().then(() => callback && callback());

        Utils.backdrop.show();
    }

    closePopup() {
        const popupOnScreen = $('.ks-pivot.ks-pivot-tag-add-popup');

        if (popupOnScreen.length > 0) {
            popupOnScreen.remove();
            Utils.backdrop.hide();
        }

        this.popup = null;
    }


    changeRowsAndColumnsCards() {
        const rowCards = this.holders.eq(1).children('.ks-pivot-table-tag'),
            colCards = this.holders.eq(2).children('.ks-pivot-table-tag'), a = this.expandedCollapsedMembers, b = a[0];

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

        this.presetId = null;
    }

    loadPresetBtnClicked() {
        let list = '', n, p = this.presets, id = this.presetId, i, len = p.length;

        for (i = 0; i < len; ++i) {
            n = p[i];

            list += '<a title="' + n.name + '" data-id="' + i + '" class="ellipsis"><span class="icon-check' + (i === id ? '' : ' off') + '"></span><span class="icon-' + ('Public' === n.type ? 'globe-lines' : 'person-outline') + '"></span>' + n.name + (n.isOwner ? '<span class="icon-trash"></span>' : '') + '</a>';
        }

        this.popup = $('<div class="ks-pivot ks-pivot-tag-add-popup"><h3>Please select the Preset to load</h3><div class="ks-pivot-filterbox ks-pivot-table-presets-dropdown"><div class="ks-pivot-add-tag-search"><span class="icon-search"></span><input type="text" placeholder="Search..."></div><div class="ks-pivot-scrollable">' + list + '</div><hr><a data-load="1" class="ks-pivot-btn btn-blue-light">Load</a><a class="ks-pivot-btn btn-red">Cancel</a></div></div>');

        this.showPopup();

        let c = this.popup.children().children('.ks-pivot-scrollable'), elements = c.children(), s;

        let f = c.prev().find('input').on('input', () => {
            s = Utils.cleanStr(f.val().trim().toLowerCase());

            elements.each((i, e) => e.style.display = -1 === Utils.cleanStr(e.innerText).toLowerCase().indexOf(s) ? 'none' : '');
        });

        this.popup.on('click', 'a', e => {
            e = $(e.currentTarget);
            c = e.data('id');

            if (c > -1) {
                elements.children('.icon-check').addClass('off');
                e.children('.icon-check').removeClass('off');

                id = c;

                return;
            }

            if (e.data('load')) {
                this.doLoadPreset(id);
                this.closePopup();
            }
            if ($(e.currentTarget).hasClass('btn-red')) {
                this.closePopup();
            }


            this.closePopup();
        }).on('click', '.icon-trash', e => this.deletePreset($(Utils.stopEvent(e).currentTarget).parent()));
    }

    doLoadPreset(presetId) {
        let presetData = (this.presets[presetId] || {}).data;

        if (!presetData) {
            return;
        }

        Pivot.call({data: {options: JSON.stringify({presetData: presetData})}}).then(adjustedPresetDataBySelectedIndexInSlicer => this.doLoadPresetFinished(adjustedPresetDataBySelectedIndexInSlicer, presetId));
    }

    doLoadPresetFinished(presetData, presetId) {
        let i, c, h;

        this.resetPivotTable();

        for (i = 0; i < 3; ++i) {
            h = this.holders.eq(i);

            for (c of presetData[i]) {
                h.append('<div class="ks-pivot-table-tag noselect sortable-chosen" ' + Object.entries(c).map(e => 'data-' + e[0] + '="' + e[1] + '"').join(' ') + ' draggable="true"><div class="ks-pivot-table-tag-color" style="background-color: #' + c.hex + ';"></div><h3>' + c.name + '</h3><h4>' + c.title + '</h4><span class="icon-x-circle"></span></div>');
            }
        }

        this.presetId = presetId;

        this.expandedCollapsedMembers = presetData[3];

        this.suppressOptions = presetData[4] ? {...presetData[4]} : this.suppressOptions;

        this.getPivotTable();

        this.adjustSuppressZeroButtons();
    }

    deletePreset(a) {
        let v = this.presets[a.data('id')], d = {pID: v.id, pValue: '', pName: '', pType: ''},
            p = $('<div style="width: 600px;" class="ks-pivot ks-pivot-tag-add-popup"><div style="text-align: center;margin: 15px;"><span class="icon-trash-fill" style="color: #DC3545;font-size: 30px;"></span></div><h2 style="text-align: center;">Delete Preset</h2><h3>Are you sure you want to delete the "' + a.attr('title') + '" ' + v.type + ' Preset?<br><br>This action cannot be undone!</h3><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">Cancel</a><a data-action="yes" class="ks-pivot-btn btn-red-bg">Delete</a></div></div>');

        El.body.append(p);

        p.on('click', 'a', e => {
            if ($(e.currentTarget).hasClass('btn-red-bg')) {
                Pivot.call({
                    data: {
                        options: JSON.stringify({
                            process: 'zSYS Analogic Save Pivot Preset',
                            processParams: d
                        })
                    }
                }).then(r => this.saveOrDeletePresetFinished(r));
            }

            p.remove();
        });
    }

    savePreset() {
        let id = this.presetId, d = this.presets[id] || {}, isPublic = 'Public' === d.type;

        this.popup = $('<div class="ks-pivot ks-pivot-tag-add-popup"><h3>Please set the Preset name a visibility</h3><div class="ks-pivot-add-tag-search"><input value="' + (d.name || '') + '" type="text" placeholder="The Preset name..."></div><div class="ks-pivot-popup-check-holder"><span class="icon-check' + (isPublic ? '' : ' off') + '" style="color: #1d7bff;"></span>The Preset is Public</div><div class="ks-pivot-tag-add-popup-button-holder"><a class="ks-pivot-btn btn-blue-light">Cancel</a><a class="ks-pivot-btn btn-blue">Save</a></div></div>');

        let n = this.popup.find('input'), c = this.popup.find('.icon-check');

        this.showPopup(() => app.utils.focus(n, true));

        this.popup.on('click', 'a', e => {
            if ($(e.currentTarget).hasClass('btn-blue')) {
                this.doSavePreset(n.val().trim(), !c.hasClass('off'));
                this.closePopup();
            } else {
                this.closePopup();
            }
        }).on('click', '.ks-pivot-popup-check-holder', e => {
            $(e.currentTarget).find('span').toggleClass('off');
        });
    }

    doSavePreset(presetName, isPublic) {
        let p = this.presets, i, j, k = null, f, d = [], t = isPublic ? 'Public' : 'Private';

        if (!presetName) {
            app.popup.show('Please give a Preset name to save.', 300);
            return;
        }

        for (i = 0; i < p.length; ++i) {
            j = p[i];
            if (j.name === presetName && j.type === t) {
                if (j.isOwner) {
                    k = i;
                } else {
                    if (isPublic) {
                        f = true;
                    }
                }
            }
        }

        if (isPublic && f) {
            app.popup.show('A Public Preset with the same name "' + presetName + '" already exists.<br>Please change the name or set the visibility to Private.', 550);
            return;
        } else if (null === k) {
            k = p.length;
            p[k] = {id: ''};
        }

        for (j = 0; j < 3; ++j) {
            d[j] = this.holders.eq(j).children('.ks-pivot-table-tag').map((idx, el) => {
                let card = $(el);
                return {
                    ...card.data(),
                    index: card.data('index') ?? 0,
                    name: card.find('h3').html(),
                    title: card.find('h4').html()
                };
            }).get();
        }

        d[j] = this.expandedCollapsedMembers;
        d[++j] = this.suppressOptions;

        p[k].data = d;
        p[k].name = presetName;
        p[k].isOwner = 1;
        p[k].type = t;

        this.presetId = k;

        let processParams = {pValue: d, pID: p[k].id, pName: presetName, pType: p[k].type, pWidgetID: this.id};

        Pivot.call({
            data: {
                options: JSON.stringify({
                    process: 'zSYS Analogic Save Pivot Preset',
                    processParams: processParams,
                    widgetId: this.id
                })
            }
        })
            .then(r => this.saveOrDeletePresetFinished(r))
            .catch(err => {
                app.popup.show('Error communicating with server to save preset.', 400);
                console.error("Error saving preset:", err);
            });
    }

    saveOrDeletePresetFinished(r) {
        if (!r[0]) {
            return app.popup.show('Error during saving/deleting the Preset!', 400);
        }

        Pivot.call({data: {cube_name: this.cubeName, options: JSON.stringify({widgetId: this.id})}}).then(d => {
            this.presets = this.parsePresetsData(d.data);

            this.doLoadPreset(this.presetId);

            this.closePopup();
        });
    }

    suppressZeroBtnClicked(e) {
        let btn = $(e.currentTarget), s = btn.children('span'), isSuppressed = !s.hasClass('off');

        s.toggleClass('off', isSuppressed);

        this.suppressOptions[btn.data('type')] = !isSuppressed;

        this.getPivotTable();
    }

    showSuppressZeroPopup(btn) {
        const options = [
            {mode: 'all', label: 'All'},
            {mode: 'columns', label: 'Columns'},
            {mode: 'rows', label: 'Rows'},
            {mode: 'off', label: 'OFF'}
        ];
        const currMode = this.suppressZeroMode || 'off';
        let html = options.map(opt =>
            `<div class="popup-row${opt.mode === currMode ? ' active' : ''}" data-mode="${opt.mode}">
            ${opt.mode === currMode ? '<span style="margin-right:6px;">&#10003;</span>' : '<span style="width:18px;display:inline-block;"></span>'}
            ${opt.label}
        </div>`).join('');
        $('#suppressZeroPopup').html(html).show();


        $('#suppressZeroPopup .popup-row').off().on('click', e => {
            const mode = $(e.currentTarget).data('mode');
            this.setSuppressZeroMode(mode);
            $('#suppressZeroPopup').hide();
        });
    }

    setSuppressZeroMode(mode) {
        this.suppressZeroMode = mode;
        if (mode === 'all') {
            this.suppressOptions = {nonEmptyRows: true, nonEmptyColumns: true};
        } else if (mode === 'columns') {
            this.suppressOptions = {nonEmptyRows: false, nonEmptyColumns: true};
        } else if (mode === 'rows') {
            this.suppressOptions = {nonEmptyRows: true, nonEmptyColumns: false};
        } else {
            this.suppressOptions = {nonEmptyRows: false, nonEmptyColumns: false};
        }
        this.getPivotTable();
        this.refreshControls();
    }

    refreshControls() {
        $('.ks-pivot-table-control-row.pivot-btn-row').replaceWith(this.getControlsHtml());
        this.initControls();
    }


    adjustSuppressZeroButtons() {
        for (let t in this.suppressOptions) {
            this.suppressZeroBtns.filter('[data-type="' + t + '"]').find('span').toggleClass('off', !this.suppressOptions[t]);
        }
    }

    cardClicked(e) {
        let card = $(Utils.stopEvent(e).currentTarget);
        if (card.parent('#pivotSlicer').length) {
            card.children('.ks-pivot-filterbox').length ? this.closeSlicerFilterBox() : this.createSlicerFilterBox(card);
        } else {
            this.openSelectorTreeFromCard(card);
        }
    }

    createSlicerFilterBox(card) {
        let d = card.data(),
            elements = (((this.tree.children[d.dimension].children[d.hierarchy] || {}).children || {})[d.subset] || {}).children;

        if (elements) {
            this.doCreateSlicerFilterBox(card, elements);
        } else {
            this.options.isPrivateSubset = card.data('private') || false;

            this.getNextSelectorTreeLevel({
                dimension_name: d.dimension,
                hierarchy_name: d.hierarchy,
                subset_name: d.subset
            }, {}).then(r => this.doCreateSlicerFilterBox(card, r.data.children));
        }
    }

    doCreateSlicerFilterBox(card, elements) {
        this.closeSlicerFilterBox();

        let d = card.data(), n, h = '', aliasAttrName = d.alias_attr_name, m = '' + d.element, t, e, f, s, i = 0, j;

        for (i in elements) {
            e = elements[i];
            n = e[0];

            e = e[aliasAttrName] || n;
            t = n + ' (' + e + ')';

            if (n === m) {
                s = '';
                j = i;
            } else {
                s = ' off';
            }

            h += '<a data-name="' + n + '" data-alias="' + e + '" title="' + t + '" class="ellipsis"><span class="icon-check' + s + '"></span>' + t + '</a>';
        }

        e = $('<div class="ks-pivot-filterbox ks-pivot-table-presets-dropdown"><div class="ks-pivot-add-tag-search"><span class="icon-search"></span><input type="text" placeholder="Search..."></div><div class="ks-pivot-scrollable">' + h + '</div><hr><a class="ks-pivot-btn btn-blue-light">Edit List</a><a class="ks-pivot-btn btn-red">Delete Filter</a></div>');

        e.on('click', false).on('click', '.btn-blue-light', () => this.openSelectorTreeFromCard(card)).on('click', '.btn-red', () => card.children('.icon-x-circle').click());

        n = e.children('.ks-pivot-scrollable').on('click', 'a', e => {
            e = $(e.currentTarget);
            i = e.index();
            s = e.data();

            elements.children('span').addClass('off');
            e.children('span').removeClass('off');

            card.attr({'data-element': s.name, 'data-title': s.alias, 'data-index': i}).data({
                element: s.name,
                title: s.alias,
                index: i
            }).children('h4').html(s.alias).promise().then(() => this.getPivotTable());
        });

        elements = n.children();

        card.addClass('no-drag').append(e).promise().then(() => elements.eq(j).length && n.scrollTop(elements.eq(j).position().top - 100));

        f = e.css('left', (card.outerWidth() - e.outerWidth()) / 2).find('input').on('input', () => {
            s = Utils.cleanStr(f.val().trim().toLowerCase());

            elements.each((i, e) => e.style.display = -1 === Utils.cleanStr(e.innerText).toLowerCase().indexOf(s) ? 'none' : '');
        });

        e.show().promise().then(() => e.offset({left: Math.max(0, e.offset().left)}));

        this.slicerFilterBox = e;
    }

    closeSlicerFilterBox() {
        if (this.slicerFilterBox && this.slicerFilterBox.length) {
            this.slicerFilterBox.parent().removeClass('no-drag');
            this.slicerFilterBox.remove();
        }
    }


    openSelectorTreeFromCard(card) {
        this.taintedHolder = null;
        this.taintedCard = card;

        this.setSelectorTreeForCardPosition();

        this.selectorTreeColorClicked(this.colorDropdown.find('.ks-pivot-tag-color-dropdown-chooser-item[data-hex="' + card.data('hex') + '"]'), true);

        this.selectorTreeSaveBtn.removeClass('disabled');
        this.selectorTreeViewBtn.removeClass('disabled');

        this.showSelectorTree();
    }

    setSelectorTreeForCardPosition() {
        let e, f, c = this.taintedCard, cols = this.getSelectorTreeColumns(), col = cols.eq(0), nextCol,
            items = col.children();

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
        this.getSelectorTreeColumns().slice(1).remove();

        this.taintedCard = null;
        this.taintedHolder = $(e.currentTarget).closest('.ks-pivot-table-tag-holder');

        this.offerNextColorInSelectorTreeColorDropdown();

        this.selectorTreeSaveBtn.addClass('disabled');
        this.selectorTreeViewBtn.removeClass('disabled');

        const inp = this.getSelectorTreeColumns().eq(0).children().eq(0).find('input').val('').trigger('change');

        this.showSelectorTree();

        inp.focus();
    }

    showSelectorTree() {
        this.selectorTree.show().next().hide().next().hide();
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
        if (Pivot.callNum) {
            return;
        }

        let cols = this.getSelectorTreeColumns();

        cols.attr('data-value', '').data('value', '').eq(0).children('.ks-pivot-tag-add-col-content').children('.ks-on').removeClass('ks-on');

        this.selectorTree.hide().next().show().next().show();

        this.resetSelectorTreeSelections();

        if (this.taintedCard && this.isTaintedHolderSlicer()) {
            setTimeout(() => this.createSlicerFilterBox(this.taintedCard), 200);
        }
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

        Pivot.call({data: d}).then(r => this.renderPivotTable(r, d.colors));
    }

    getSelectedCardsData() {
        let i, j, d = {}, cards, len, types = ['slices', 'rows', 'cols'], v, cardData, colors = [[], [], []], n,
            o = {...this.options, ...this.suppressOptions},
            data = {cube_name: this.cubeName, options: JSON.stringify(o)};

        for (i = 0; i < 3; ++i) {
            v = [];

            cards = this.holders.eq(i).children('.ks-pivot-table-tag');

            for (j = 0, len = cards.length; j < len; ++j) {
                n = cards.eq(j).data();
                cardData = {...n};

                cardData.dimension += '';
                cardData.hierarchy += '';
                cardData.subset += '';
                cardData.element += '';

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
                app.popup.show('The Cell Limit (<b style="color: green;">' + this.options.cellLimit + '</b>) is exceeded: <b style="color: red;">' + cc + '</b>', 400);
            } else {
                app.popup.show('Error during rendering the Pivot Table!', 400);
            }

            return;
        }

        this.cellsetId = d.data.cellsetId;

        const t0 = performance.now(), cols = d.data.cols, colLen = cols.length, cells = d.data.cells,
            cellsIsUpdateable = d.data.cellsIsUpdateable, rows = d.data.rows, rowLen = rows.length,
            rowElementLen = (rows[0] || []).length;
        const colElementLen = (cols[0] || []).length, levelMtx = [], colLevelMtx = [], colHeaderMtx = [],
            maxColspansByLevels = [], colColors = colors[2], rowColors = colors[1], defaultColor = '3AA745';
        let h = '', v = '', i, j, k, e, m, row, r, p, lastExpanded, expandClass, isExpanded, isLastParents = [], level,
            nextLevel, maxColspan, midLine, c, totalColspan = 0, name, names, color, colspan, levels, prevLevel,
            children, isLastRow;

        L('CELLS COUNT: ' + cc);

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
                        h += midLine + '<td data-i="' + j + '" colspan="' + (maxColspan - level) + '" class="ks-pivot-table-title-cell h3">' + r[0] + '</td>';
                    }
                } else {
                    h += midLine + '<td data-i="' + j + '" colspan="' + (maxColspan - level) + '" class="ks-pivot-table-category-cell h3"></td>';
                }
            }
            c = k;
            k += colLen;

            for (; c < k; ++c) {
                const formattedValue = this._formatNumberForDisplay(cells[c]);
                h += '<td class="ks-pivot-table-content-cell h2 ' + (cellsIsUpdateable[c] ? 'u' : 'hd') + '">' + formattedValue + '</td>';
            }

            h += '</tr>';
        }

        this.table.html(h);

        this.perf('RENDERED', t0);
    }

    expandCollapseButtonClicked(e) {
        let btn = $(e.currentTarget), cell = btn.parent(), i = cell.data('i'),
            isToExpand = btn.hasClass('ks-pivot-table-group-sign-closed'), h, f,
            member = this.getBreadcrumbsOfCell(cell);

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

        let d = this.holders.eq(h + 1).children('.ks-pivot-table-tag').eq(i).data('dimension'),
            x = this.expandedCollapsedMembers[h];

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

        let t0 = performance.now(),
            cell = $(e.currentTarget).removeClass('icon-chevron-close-horizontal').addClass('icon-chevron-open-horizontal').parent(),
            totalColspan = 1;
        let c, d, colId = cell.data('i'), row = cell.parent(),
            card = this.holders.eq(1).children('.ks-pivot-table-tag').eq(colId);

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

        let t0 = performance.now(),
            cell = $(e.currentTarget).removeClass('icon-chevron-open-horizontal').addClass('icon-chevron-close-horizontal').parent();
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
        let i = this.cellInput, p = i.parent(), v = i.val().trim(), n = cell.text();

        if (cell.has('input').length) {
            return;
        }

        cell.html('').append(i.val(n).data('value', n)).promise().then(() => Utils.focus(i));

        p.html(v);
    }

    saveContentCellValue() {
        let i = this.cellInput, p = i.parent(), url = "/api/v1/Cellsets('" + this.cellsetId + "')/Cells";

        let body = '{"Ordinal":' + this.getOrdinalOfCell(p) + ',"Value": \"' + Utils.convertValueToPost(i.val()) + '\"}';


        Auth.getAjaxRequest(QB.getUrl(url) + '&server=true', body, 'PATCH', this.id)
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

    _formatNumberForDisplay(value) {
        if (value === null || value === undefined || String(value).trim() === '') {
            return value;
        }

        const cleanString = String(value).replace(/,/g, '');

        const num = parseFloat(cleanString);

        if (!isNaN(num)) {
            return Math.round(num).toLocaleString('en-US').replace(/,/g, ' ');
        }
        return value;
    }

    getTableCompatibleObject() {
        const table = this.table;
        if (!table?.length || !table.find('tr').length) {
            return null;
        }

        const allRows = table.find('tr').get();
        const headerRowElements = allRows.filter(tr => $(tr).find('td.ks-pivot-table-content-cell').length === 0 && $(tr).text().trim() !== '');
        const dataRowElements = allRows.filter(tr => $(tr).find('td.ks-pivot-table-content-cell').length > 0);

        if (dataRowElements.length === 0) {
            return null;
        }

        let maxDataI = -1;
        $(dataRowElements[0]).find('td:not(.ks-pivot-table-content-cell)').each(function () {
            const dataI = parseInt($(this).attr('data-i'), 10);
            if (!isNaN(dataI) && dataI > maxDataI) {
                maxDataI = dataI;
            }
        });
        const numRowHeaderCols = maxDataI + 1;

        let maxHeaderCols = 0;
        headerRowElements.forEach(tr => {
            let currentColCount = 0;
            $(tr).find('td').each(function () {
                currentColCount += $(this).prop('colspan') || 1;
            });
            if (currentColCount > maxHeaderCols) {
                maxHeaderCols = currentColCount;
            }
        });
        const numDataCols = maxHeaderCols - numRowHeaderCols;

        const parsePivotHeaders = (headerRows, numRowLabelCols, totalDataCols) => {
            return headerRows.map(tr => {
                const rowLevel = Array(totalDataCols).fill('');
                let htmlColCounter = 0;
                let dataColPointer = 0;

                $(tr).find('td').each(function () {
                    if (dataColPointer >= totalDataCols) return false;

                    const $td = $(this);
                    const text = $td.text().trim();
                    const colspan = $td.prop('colspan') || 1;
                    const isPlaceholder = (colspan > 1 && text === '');
                    const isControlCell = $td.hasClass('ks-pivot-table-close-category-cell');

                    if (!isPlaceholder && !isControlCell) {
                        let dataColsSpanned = 0;
                        for (let k = 0; k < colspan; k++) {
                            if (htmlColCounter + k >= numRowLabelCols) {
                                dataColsSpanned++;
                            }
                        }
                        if (dataColsSpanned > 0) {
                            rowLevel[dataColPointer] = text;
                            dataColPointer += dataColsSpanned;
                        }
                    }
                    htmlColCounter += colspan;
                });
                return rowLevel;
            });
        };

        const parsePivotDataRows = (dataRows, numRowLabelCols) => {
            return dataRows.map(tr => {
                const $tr = $(tr);
                const rowLabelObjects = Array(numRowLabelCols).fill({title: '', editable: false});
                const labelContentTds = $tr.find('td:not(.ks-pivot-table-content-cell, .ks-pivot-table-group-sign-cell)');

                labelContentTds.each(function () {
                    const $td = $(this);
                    const colIndex = parseInt($td.attr('data-i'), 10);
                    if (!isNaN(colIndex) && colIndex < numRowLabelCols) {
                        rowLabelObjects[colIndex] = {
                            title: $td.text().trim(),
                            editable: false
                        };
                    }
                });

                const dataCells = $tr.find('td.ks-pivot-table-content-cell').map((_, td) => ({
                    title: $(td).text().trim(),
                    editable: $(td).hasClass('u')
                })).get();

                return [...rowLabelObjects, ...dataCells];
            });
        };

        const dataHeaderMatrix = parsePivotHeaders(headerRowElements, numRowHeaderCols, numDataCols);
        if (dataHeaderMatrix.length > 1) {
            const firstHeaderRow = dataHeaderMatrix[dataHeaderMatrix.length - 1];
            const secondHeaderRow = dataHeaderMatrix[dataHeaderMatrix.length - 2];

            if (secondHeaderRow[0] === '' && firstHeaderRow[0] !== '' && firstHeaderRow[0] !== undefined) {
                firstHeaderRow.unshift('');
                firstHeaderRow.pop();
            }
        }

        const finalCellData = parsePivotDataRows(dataRowElements, numRowHeaderCols);
        const lastKnownRowLabels = Array(numRowHeaderCols).fill('');
        finalCellData.forEach(row => {
            for (let i = 0; i < numRowHeaderCols; i++) {
                const cell = row[i];
                if (cell && cell.title && cell.title.trim() !== '') {
                    lastKnownRowLabels[i] = cell.title.trim();
                } else if (cell) {
                    cell.title = lastKnownRowLabels[i];
                }
            }
        });

        const rowLabelHeaders = Array.from({length: numRowHeaderCols}, (_, i) => ``);

        dataHeaderMatrix.reverse().forEach((dataHeaderRow, levelIndex) => {
            const rowLabelPart = (levelIndex === 0)
                ? rowLabelHeaders
                : Array(numRowHeaderCols).fill('');

            const fullHeaderRow = [
                ...rowLabelPart.map(text => ({title: text, editable: false})),
                ...dataHeaderRow.map(text => ({title: text, editable: false}))
            ];

            finalCellData.unshift(fullHeaderRow);
        });

        return {
            options: {
                widgets: [],
                columnHeaders: []
            },
            cellData: finalCellData,
            isEditable: true,
            headerRowCount: dataHeaderMatrix.length
        };
    }

    _parseValueForExport(cellValue) {
        if (cellValue == null || typeof cellValue !== 'string' || cellValue.trim() === '') {
            return {type: 'string', value: ""};
        }
        let modifiedString = cellValue.trim().replace(/[\s,]/g, '');

        if (!isNaN(modifiedString) && modifiedString !== '') {
            return {type: 'number', value: parseFloat(modifiedString)};
        } else {
            return {type: 'string', value: cellValue};
        }
    }

    _downloadExportBuffer(buffer, filename) {
        const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    _autoResizeExportColumns(worksheet) {
        if (!worksheet || !worksheet.columns) return;
        worksheet.columns.forEach((column) => {
            if (!column || column.number === undefined) return;
            let maxWidth = 0;
            for (let rowNumber = 1; rowNumber <= (worksheet.lastRow?.number ?? 1); rowNumber++) {
                const cell = worksheet.getCell(rowNumber, column.number);
                const cellText = cell.text ? cell.text.toString() : (cell.value ? cell.value.toString() : '');
                if (cellText) {
                    maxWidth = Math.max(maxWidth, cellText.length);
                }
            }
            column.width = Math.max(this.exportStyles.resizeMinWidth, maxWidth + this.exportStyles.resizeMargin);
        });
    }

    _getSlicerDataForExport() {
        const slicerData = [];
        $('#pivotSlicer .ks-pivot-table-tag').each(function () {
            const card = $(this);
            slicerData.push({
                dimension: card.find('h3').text().trim(),
                value: card.find('h4').text().trim()
            });
        });
        return slicerData;
    }

    exportPivotTable(e) {
        const gridTableObj = this.getTableCompatibleObject();
        const slicerData = this._getSlicerDataForExport();

        if (!gridTableObj) {
            console.warn("Pivot export failed: No compatible data structure could be generated.");
            if (typeof app !== 'undefined' && app.popup) {
                app.popup.show("Cannot export empty or invalid pivot table.", 400);
            }
            return;
        }

        this._generateAndDownloadExcel(gridTableObj, slicerData, {
            fileName: "pivot_export.xlsx",
            sheetName: "Pivot Export",
            disableSheetProtection: true
        }).catch(err => {
            console.error("Error during pivot table export:", err);
            if (typeof app !== 'undefined' && app.popup) {
                app.popup.show("An error occurred during the export process.", 500);
            }
        });
    }


    async _generateAndDownloadExcel(gridTableObj, slicerData, config) {
        const {cellData, headerRowCount} = gridTableObj;
        const sheetName = config.sheetName || 'Pivot Export';
        const fileName = config.fileName || 'pivot_export.xlsx';
        const styles = this.exportStyles;
        const boldFont = {bold: true};

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        let currentRow = 1;

        if (slicerData && slicerData.length > 0) {
            let titleCell = worksheet.getCell(currentRow, 1);
            titleCell.value = 'Filters';
            titleCell.font = boldFont;
            currentRow++;
            let dimHeaderCell = worksheet.getCell(currentRow, 1);
            dimHeaderCell.value = 'Dimension';
            dimHeaderCell.font = boldFont;
            slicerData.forEach((filter, index) => {
                worksheet.getCell(currentRow, 2 + index).value = filter.dimension;
            });
            currentRow++;
            let valueHeaderCell = worksheet.getCell(currentRow, 1);
            valueHeaderCell.value = 'Selected Element';
            valueHeaderCell.font = boldFont;
            slicerData.forEach((filter, index) => {
                worksheet.getCell(currentRow, 2 + index).value = filter.value;
            });
            currentRow++;
            currentRow++;
        }

        cellData.forEach((rowData, r) => {
            const excelRow = r + currentRow;
            const isHeaderRow = r < headerRowCount;
            rowData.forEach((cellObj, c) => {
                const excelCol = c + 1;
                const cell = worksheet.getCell(excelRow, excelCol);

                const valueToParse = cellObj?.title ?? "";
                const isCellEditable = cellObj?.editable ?? false;

                const parsedResult = this._parseValueForExport(valueToParse);
                cell.value = parsedResult.value;
                cell.border = styles.borderStyle;

                if (isHeaderRow) {
                    cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: styles.headerFillColor}};
                    cell.font = boldFont;
                    cell.protection = {locked: true};
                } else {
                    if (config.disableSheetProtection === true) {
                        cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: styles.editableColor}};
                    } else {
                        if (isCellEditable) {
                            cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: styles.editableColor}};
                            cell.protection = {locked: false};
                        } else {
                            cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: styles.readonlyColor}};
                            cell.protection = {locked: true};
                        }
                    }

                    if (parsedResult.type === 'number') {
                        cell.numFmt = '#,##0';
                    }
                }
            });
        });

        this._autoResizeExportColumns(worksheet);

        if (!config.disableSheetProtection) {
            await worksheet.protect('', {
                selectLockedCells: true,
                selectUnlockedCells: true,
                sort: true,
                autoFilter: false
            });
        }

        const buffer = await workbook.xlsx.writeBuffer();
        this._downloadExportBuffer(buffer, fileName);
    }

    perf(title, t0) {
        L(title + ' IN: ' + ((performance.now() - t0) / 1000) + ' seconds');
    }
}