/* global Api, app, El, Doc, Intl, Widgets, WidgetState */

'use strict';
const L = console.log,
    v = (path, obj = Widgets) => {
        let p = path.split('.');
        if (p.length > 1 && obj[p[0]] && obj[p[0]] instanceof Widget &&
            typeof obj[p[0]]['value'] === 'object' &&
            typeof w(path, obj) === 'undefined') {
            p.splice(1, 0, 'value');
        }
        return p.reduce((o, key) => o && o[key] ? o[key] : false, obj)
    },
    w = (path, obj = Widgets) => path.split('.').reduce((o, key) => (o || {})[key], obj);

const isClass = fn => fn && /^\s*class/.test(fn.toString());

const Utils = {
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
    stopEvent(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        return e;
    },
    cleanStr: s => Utils.replaceAll(s, {
        'ö': 'o',
        'ü': 'u',
        'ó': 'o',
        'ő': 'o',
        'ú': 'u',
        'é': 'e',
        'á': 'a',
        'ű': 'u',
        'í': 'i'
    }),
    clone: (object, deep, isObject = true) => deep ? $.extend(true, isObject ? {} : [], object) : $.extend(isObject ? {} : [], object),
    replaceAll: (s, m) => s.replace(RegExp(Object.keys(m).join('|'), 'gi'), r => m[r.toLowerCase()]),
    scrollTop: duration => $('html, body').animate({scrollTop: 0}, duration || 500),
    scrollTo(idOrObj, duration, topOffset = 0) {
        let isObj = 'object' === typeof idOrObj;
        El.body.triggerHandler('refresh.' + (isObj ? idOrObj.attr('id') : idOrObj));
        $('html, body').animate({scrollTop: (isObj ? idOrObj : $('#' + idOrObj)).offset().top + topOffset}, duration || 500);
    },
    getRandomId: () => window.crypto.getRandomValues(new Uint32Array(1))[0],
    toTitleCase: str => str.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase()),
    convertValueToPost: v => {
        let newVal = Utils.parseNumber(v);

        if (v.match(/%$|%\)$/)) {
            newVal /= 100;
        }

        return Utils.replaceDecimal(newVal);
    },
    parseNumber(value, locale = navigator.language) {
        let localValue = value;

        if ('string' === typeof localValue) {
            localValue = localValue.trim();
        }

        if (localValue === '' || localValue === null || localValue === false) {
            return 0;
        }

        if ('number' === typeof localValue) {
            return localValue;
        }

        if (2 === locale.length) {
            locale += '-' + locale.toUpperCase();
        }

        localValue = ('' + localValue).trim();
        const sign = ('(' === localValue[0] && ')' === localValue[localValue.length - 1] ? -1 : 1);

        localValue = localValue.replace(/\D+$/g, '');

        const exponentSuffix = localValue.match(/e-{0,1}\d+$/i);

        if (exponentSuffix) {
            localValue = localValue.slice(0, exponentSuffix.index);
        }

        const decimal = Intl.NumberFormat(locale).format('1.1').charAt(1);
        const cleanPattern = new RegExp(`[^-+0-9${decimal}]`, 'g');
        const cleaned = localValue.replace(cleanPattern, '');
        const normalized = cleaned.replace(decimal, '.');

        return sign * parseFloat(normalized) + (exponentSuffix ? exponentSuffix[0] : 0);
    },
    replaceDecimal(value, locale = navigator.language) {
        const decimal = Intl.NumberFormat(locale).format('1.1').charAt(1);

        return ('' + value).trim().replace('.', decimal);
    },
    isInViewport(e) {
        const b = e.getBoundingClientRect(), w = window, d = document.documentElement;

        return (b.top >= 0 && b.left >= 0 && b.bottom <= (w.innerHeight || d.clientHeight) && b.right <= (w.innerWidth || d.clientWidth));
    },
    parseFormatStringToCSSClasses(s) {
        return (typeof s === 'string') ? s.split('-').map((e, c) => {
            return 'c-' + c + '-' + e;
        }).join(' ') : '';
    },
    getToday: (delimiter = '.') => Utils.getFormattedDate(new Date(), delimiter),
    getTimestamp(dateStr = '', forwardTime = false) {
        const d = dateStr ? new Date(dateStr.replace(/\./g, '-')) : new Date(),
            o = forwardTime ? Utils.forwardTime(d) : Utils.rewindTime(d);

        return o.getFullYear() + '-' + (o.getMonth() + 1).toString().padStart(2, 0) + '-' + o.getDate().toString().padStart(2, 0) + 'T' + o.getHours().toString().padStart(2, 0) + ':' + o.getMinutes().toString().padStart(2, 0) + ':' + o.getSeconds().toString().padStart(2, 0) + '.' + o.getMilliseconds().toString().padStart(3, 0) + 'Z';
    },
    rewindTime: d => {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        return d;
    },
    forwardTime: d => {
        d.setHours(23);
        d.setMinutes(59);
        d.setSeconds(59);
        d.setMilliseconds(999);

        return d;
    },
    getFormattedDate(d = new Date(), delimiter = '-', withTime = false) {
        const Y = d.getFullYear(), M = (d.getMonth() + 1).toString(), D = d.getDate().toString();

        let time = '';
        if (withTime) {
            const h = d.getHours().toString(), m = d.getMinutes().toString(), s = d.getSeconds().toString();
            time = ' ' + h.padStart(2, 0) + ':' + m.padStart(2, 0) + ':' + s.padStart(2, 0);
        }

        return Y + delimiter + M.padStart(2, 0) + delimiter + D.padStart(2, 0) + time;
    },
    isMobile() {
        if (null === app.isMobile) {
            app.isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
        }

        return app.isMobile;
    },
    escapeText: str => JSON.stringify(str).slice(1, -1),
    stripHtml: str => isNaN(str) ? str.replace(/(<([^>]+)>)/gi, "") : str,
    nl2br: s => s.replace(/(?:\r\n|\r|\n)/g, '<br>'),
    htmlEncode: s => isNaN(s) ? ('' + s).replaceAll('"', '&quot;').replaceAll("'", '&apos;') : s,
    adjustHeightsToMax(elements) {
        let i, height, maxHeight = 0, len = elements.length;
        // testing with maybe "outerHeight"
        for (i = 0; i < len; ++i) {
            height = elements.eq(i).height();
            if (height > maxHeight) {
                maxHeight = height;
            }
        }

        elements.height(maxHeight);
    },
    formatIntForChart: intVal => intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    calculateMargin: (margin, total) => {
        if (!margin) {
            return 0;
        }

        if ('string' === typeof margin && '%' === margin.slice(-1)) {
            margin = total * parseFloat(margin) / 100;
        } else if (margin <= 1) {
            margin *= total;
        }

        return margin;
    },
    precisionRound(number, precision, toFixed = false) {
        const factor = Math.pow(10, precision), n = Math.round(number * factor) / factor;

        return toFixed ? n.toFixed(precision) : n;
    },
    backdrop: {
        show: () => {
            app.backdrop = app.backdrop || $('<div class="ks-container-backdrop">');
            El.body.prepend(app.backdrop);
        },
        hide: () => (app.backdrop || {}).remove()
    },
    addLeadingZero: n => n < 10 ? '0' + n : '' + n,
    getSize(x, withSemicolon = false, convertToPixelSizeType = null) {
        let s = parseFloat(x);

        if (-1 === ('' + x).indexOf('%')) {
            s += 'px';
        } else {
            if (convertToPixelSizeType) {
                s = 100 * s / Doc[convertToPixelSizeType]();
            } else {
                s += '%';
            }
        }

        return s + (withSemicolon ? ';' : '');
    },
    getGridTableId(cellId) {
        if (cellId) {
            return cellId.split(',')[0];
        }
        return false;
    },
    getGridTableCurrentCell(widgetId) {
        let a = v(widgetId + '.cellData', Widgets), b = v(widgetId + '.row', Widgets),
            c = v(widgetId + '.column', Widgets);
        if (a && b && c) {
            return a[b][c];
        }
        return false;
    },
    getGridTableCurrentRow(widgetId) {
        let a = v(widgetId + '.cellData', Widgets), b = v(widgetId + '.row', Widgets);
        if (a && b) {
            return a[b];
        }
        return false;
    },
    getGridTableCell(widgetId, columnIndex) {
        let row = Utils.getGridTableCurrentRow(widgetId);
        return row !== false ? row[columnIndex] : false;
    },
    getGridTableCellByRowAndColumn(widgetId, rowIndex, columnIndex, property = '') {
        let a = v(widgetId + '.cellData');
        if (a === false) {
            return false;
        }
        return property !== '' ? a[rowIndex][columnIndex][property] : a[rowIndex][columnIndex];
    },
    getCheckedGridTableCellByRowAndColumn(widgetId, rowIndex, columnIndex, property = '') {
        let a = v(widgetId + '.cellData');
        if (a === false || a.length <= parseInt(rowIndex) || a[rowIndex].length < parseInt(columnIndex)) {
            return false;
        }
        if (property !== '' && v(property, a[rowIndex][columnIndex]) === false) {
            return false;
        }
        return property !== '' ? a[rowIndex][columnIndex][property] : a[rowIndex][columnIndex];
    },
    setAndGetGridTableSystemValueByCurrentRow(widgetId, columnIndex, systemValue, cellProperty) {
        let c = Utils.getGridTableCell(widgetId, columnIndex);
        if (c !== false) {
            Widgets[systemValue] = c[cellProperty];
            return c[cellProperty];
        }
        return false;
    },
    getDropBoxSelectedItem(widgetId) {
        if (Widgets[widgetId]) {
            let selectedValue = Widgets[widgetId].value;
            return Widgets[widgetId].items.find(e => e.name === selectedValue);
        }
        return false;
    },
    selectDropBoxNextItem(widgetId) {
        if (Widgets[widgetId]) {
            let items = Widgets[widgetId].items;
            const selectedValue = Widgets[widgetId].value,
                index = Widgets[widgetId].items.findIndex(e => e.name === selectedValue);
            if (index + 1 < items.length) {
                items[index + 1].on = true;
                Widgets[widgetId].value = items[index + 1].name;
                return true;
            }
        }
        return false;
    },
    selectDropBoxPreviousItem(widgetId) {
        if (Widgets[widgetId]) {
            let items = Widgets[widgetId].items;
            const selectedValue = Widgets[widgetId].value,
                index = Widgets[widgetId].items.findIndex(e => e.name === selectedValue);
            if (index > 0) {
                items[index - 1].on = true;
                Widgets[widgetId].value = items[index - 1].name;
                return true;
            }
        }
        return false;
    },
    getDropBoxSelectedItemAttribute(widgetId, attributeName) {
        let selectedValue = Widgets[widgetId].value;
        if (!Widgets[widgetId].items) {
            return false;
        }
        let item = Widgets[widgetId].items.find(e => e.name === selectedValue);
        return item ? item[attributeName] : false;
    },
    getCellsFromClipboard(widgetId) {
        let text = v(widgetId + '.clipboard');
        if (text === false) {
            return [];
        }
        let rows = text.trim().split('\n'), result = [], i, k;
        for (i = 0; i < rows.length; ++i) {
            result.push(rows[i].split('\t'));
        }
        return result;
    },
    getArrayWithValues(arrayLength, value) {
        return Array.from({length: arrayLength}, () => value);
    },
    getOrdinalValuePairs(ordinalsArray, values) {
        if (!ordinalsArray || !values) {
            return '';
        }
        if (ordinalsArray.length < values.length) {
            return '';
        }
        let template = (ordinal, value) => `{"Ordinal": ${ordinal},"Value": \"${value}\"}`, result = [], i = 0;
        for (i = 0; i < values.length; ++i) {
            result.push(template(ordinalsArray[i].Ordinal, values[i]));
        }
        return result.join(',');
    },
    getOrdinalValuePairsAndEmptyFilledValues(values, existingValues) {
        let template = (ordinal, value) => `{"Ordinal": ${ordinal},"Value": \"${value}\"}`, result = [], i = 0;
        while (i < existingValues.length) {
            if (i < values.length) {
                result.push(template(existingValues[i].Ordinal, values[i]));
            } else {
                if (existingValues[i].FormattedValue !== "") {
                    result.push(template(existingValues[i].Ordinal, ""));
                } else {
                    i = existingValues.length;
                }
            }
            ++i;
        }
        return result.join(',');
    },
    isGridTableLoaded(widgetId) {
        let l = v(widgetId + '.cellData.length');
        return l !== false && l !== 0;
    },
    getCellsByColumnsFromClipboard(widgetId, columnIndex) {
        let cells = Utils.getCellsFromClipboard(widgetId), result = [], i = 0;
        for (i = 0; i < cells.length; ++i) {
            if (cells[i].length > columnIndex) {
                result.push(cells[i][columnIndex]);
            }
        }
        return result;
    },
    getGridTableActualAndLastPage(widgetId) {
        let state = WidgetState[widgetId], maxPage = Math.ceil(state.rows / state.maxRows),
            actualPage = state.page ? state.page : 1;
        return {actualPage: actualPage, maxPage: maxPage};
    },
    getGridTablePagerText(widgetId) {
        let info = Utils.getGridTableActualAndLastPage(widgetId);
        return info.actualPage + '/' + info.maxPage;
    },
    isGridTablePagerPreviousButtonVisible(widgetId) {
        return WidgetState[widgetId].page ? WidgetState[widgetId].page > 1 ? true : false : false;
    },
    isGridTablePagerNextButtonVisible(widgetId) {
        let info = Utils.getGridTableActualAndLastPage(widgetId);
        return info.actualPage !== info.maxPage;
    },
    isValueExistingAndNotEmpty(widgetId, value = 'value') {
        let l = v(widgetId + '.' + value + '.length');
        return l !== false && l !== 0;
    },
    setWidgetValueIfNotExist(key, value) {
        if (!Widgets[key]) {
            Widgets[key] = value;
        }
        return Widgets[key];
    },
    setWidgetValueIfNotExistByOther(key1, key2) {
        if (!Widgets[key1]) {
            Widgets[key1] = Widgets[key2];
        }
        return Widgets[key1];
    },
    setWidgetValue(key, value) {
        if (Widgets[key] && Widgets[key] instanceof Widget) {
            if (!value) {
                Widgets[key].reset();
            }
            return;
        }
        Widgets[key] = value;
    },
    setWidgetValueByOther(key1, key2) {
        if (Widgets[key1] && Widgets[key1] instanceof Widget) {
            return;
        }
        Widgets[key1] = Widgets[key2];
    },
    getPropertyOrFunctionValue(object, property) {
        if (typeof object[property] === 'function') {
            return object[property]();
        }
        return object[property];
    },
    getDecimalFromPercentString(value, replaceDecimal = false) {
        let result = Utils.parseNumber(value.replace('%', '')) / 100;
        return replaceDecimal ? Utils.replaceDecimal(result) : result;
    },
    filterUnique(arr) {
        return arr.filter((v, i, a) => a.indexOf(v) === i);
    },
    create_UUID() {
        let dt = new Date().getTime();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    getEvenElements(arr) {
        return arr.filter(function (element, index, array) {
            return (index % 2 === 0);
        });
    },
    getOddElements(arr) {
        return arr.filter(function (element, index, array) {
            return (index % 2 === 1);
        });
    },
    getArrayElements(arr, modulo, tailings) {
        return arr.filter(function (element, index, array) {
            return (index % modulo === tailings);
        });
    },
    modifyFileName(widgetId, newName) {
        let file = Widgets[widgetId].form.get('file0'), splittedName = file.name.split('.'),
            fileExt = splittedName[splittedName.length - 1];
        file = new File([file], newName + "." + fileExt, {type: file.type});
        Widgets[widgetId].form.set('file0', file);
    },
    buildProcessParameters(nameValuePairs) {
        let template = (name, value) => `{"Name": \"${name}\","Value": \"${value}\"}`, i, parameters = [];
        for (i = 0; i < nameValuePairs.length; ++i) {
            parameters.push(template(nameValuePairs[i].name, nameValuePairs[i].value));
        }
        return `{
                   "Parameters": [
                       ${parameters.join(',')}
                   ]
                }`;
    },
    buildProcessParametersFromObject(obj) {
        let template = (name, value) => `{"Name": \"${name}\","Value": \"${value}\"}`, parameters = [];
        for (const [name, value] of Object.entries(obj)) {
            parameters.push(template(name, value));
        }
        return `{
                   "Parameters": [
                       ${parameters.join(',')}
                   ]
                }`;
    },
    getProcessNameValuePair(name, value) {
        return {name: name, value: value};
    },
    getHorizontalTableHiddenValue(widgetId, actionName, colIndex, valueName) {
        let w = v(widgetId);
        if (!w || !w[actionName]) {
            return '';
        }
        let index = 'undefined' !== typeof w[actionName].index ? w[actionName].index : w[actionName].rowindex;
        return w.rows[index][colIndex][valueName];
    },
    getGridTableRowCol(widgetId) {
        let result = {row: '', column: '', id: ''};
        if (widgetId) {
            const z = widgetId.split('_');
            if (z.length === 3) {
                result.row = z[1];
                result.column = z[2];
                result.id = z[0];
            }
        }
        return result;
    },
    openPopup(id, ctx) {
        Api.openPopup(id, ctx.getEvent(), ctx.getElement());
    },
    togglePopup(id, ctx) {
        Api.togglePopup(id, ctx.getEvent(), ctx.getElement());
    },
    closePopup(id, ctx) {
        Api.closePopup(id, ctx.getEvent(), ctx.getElement());
    },
    closePopups(ids) {
        ids.forEach(id => {
            Api.closePopup(id);
        });
    },
    getMatrixFromArray(arr, colNum) {
        let result = [], i;

        if (colNum === 0) {
            L('Error: colNum must be greater than 0');
            return [];
        }

        if (arr.length % colNum !== 0) {
            L('Error: arr.length % colNum is not 0:' + arr.length % colNum);
            return [];
        }

        for (i = 0; i < arr.length; i += colNum) {
            result.push(arr.slice(i, i + colNum));
        }

        return result;
    },
    getGridtableMatrix(arr, colNum, f) {
        let result = [], matrix = Utils.getMatrixFromArray(arr, colNum);
        matrix.forEach(row => {
            result.push(row.map(f));
        });
        return result;
    },
    focus(idOrObj, moveCursorToEnd = true) {
        let o = 'object' === typeof idOrObj ? idOrObj : $('#' + idOrObj),
            len = moveCursorToEnd ? o.val().length * 2 : 0;

        o.focus().promise().then(() => o[0].setSelectionRange(len, len));

        return o;
    },
    separatesThousands(n, separator = ' ') {
        var parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, separator) + (decimalPart ? "." + decimalPart : "");
    },
    saveGridTableToggles(widgetId, col) {
        let cellData = v(widgetId + '.cellData'),
            widgetInstance = Widgets[widgetId],
            i,
            result = [];

        if (!cellData || !Array.isArray(cellData)) {
            Utils.setWidgetValue('systemValue' + widgetId + 'Toggles', result);
            return;
        }

        if (widgetInstance && widgetInstance.isGridTablePlusWidget) {
            for (i = 0; i < cellData.length; ++i) {
                const row = cellData[i] || [];
                const cell = row[col];
                if (!cell) {
                    result[i] = undefined;
                    continue;
                }
                if (typeof cell.toggleValue !== 'undefined') {
                    result[i] = cell.toggleValue;
                } else if (typeof cell.value !== 'undefined') {
                    result[i] = cell.value;
                } else {
                    result[i] = cell.displayValue;
                }
            }
            Utils.setWidgetValue('systemValue' + widgetId + 'Toggles', result);
            return;
        }

        for (i = 0; i < cellData.length; ++i) {
            result[i] = v(widgetId + '_' + i + '_' + col).switch ? v(widgetId + '_' + i + '_' + col).switch.value : cellData[i][col].value;
        }

        Utils.setWidgetValue('systemValue' + widgetId + 'Toggles', result);
    },
    getGridTableToggleValue(widgetId, index) {
        let res = v('systemValue' + widgetId + 'Toggles');

        if (index < res.length) {
            return res[index];
        }

        return 0;
    },
    hexToRgb(hex, opacity = 1, asObject) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);

        let r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        r = {r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16), a: opacity};

        if (asObject) {
            return r;
        }

        return 'rgb' + (opacity < 1 ? 'a' : '') + '(' + Object.values(r).slice(0, opacity < 1 ? 4 : -1).join(',') + ')';
    },
    getActiveUserString(value) {
        return value.includes('CAMID') ? value : value.replace(/\\/g, '/');
    },
    checkScreenResolution() {
        let disabled = app.disableCheckResolutionWarning === true;
        if (!app.checkScreenResolutionWarningDisplayed && disabled===false && $('body').width() - 100 > window.innerWidth) {
            Api.showPopup(app.screenResolutionWarningMessage ? app.screenResolutionWarningMessage : 'Your current screen resolution is below the recommended 1920*1080. For optimal user experience please lower your browser zoom to 90% or 80%.');
            app.checkScreenResolutionWarningDisplayed = true;
        }
    },
    undefinedOrFalse(val) {
        return typeof val === 'undefined' || val === false;
    },
    getNavigationUrl(params) {
        let url = window.location.href.split('?')[0];
        if (params) {
            params['p_param'] = true;
            url += '?p=' + btoa(JSON.stringify(params));
        }
        return url;
    },
    enableRequestLogger() {
        app.enableRequestLogger = true;
    },
    disableRequestLogger() {
        app.enableRequestLogger = false;
    },
    isRequestLoggerEnabled() {
        return app.enableRequestLogger;
    },
    setRequestLoggerJourneyId(journeyId) {
        app.requestLoggerJourneyId = journeyId;
    },
    generateRequestLoggerJourneyId() {
        app.requestLoggerJourneyId = Utils.getRandomId();
        return app.requestLoggerJourneyId;
    },
    getRequestLoggerJourneyId() {
        return app.requestLoggerJourneyId;
    },
    setRequestLoggerGroupId(groupId) {
        app.requestLoggerGroupId = groupId;
    },
    generateRequestLoggerGroupId() {
        app.requestLoggerGroupId = Utils.getRandomId();
        return app.requestLoggerGroupId;
    },
    getRequestLoggerGroupId() {
        return app.requestLoggerGroupId;
    },
    enableToolTips() {
        if (app.tooltipsEnabled === true) {
            $(document).tooltip("option", "disabled", false);
        } else {
            app.tooltipsEnabled = true;
            $(document).tooltip({
                items: 'section, .ks-segment',
                content: function () {
                    let element = $(this), widget,
                        tooltip, section;

                    if (element.hasClass('ks-segment')) {
                        section = element.closest('section');
                        if (section && $(section).data('originalid')) {
                            widget = Widgets[$(section).data('originalid')];
                        }
                    } else {
                        widget = Widgets[element.attr('id')];
                    }

                    tooltip = widget ? widget.getTooltip() : null

                    if (tooltip) {
                        return tooltip;
                    }
                }
            });
        }
    },
    disableToolTips() {
        if (app.tooltipsEnabled === true) {
            $(document).tooltip("option", "disabled", true);
        } else {
            console.error('ToolTips are not enabled');
        }
    },
    reloadApp() {
        window.location.reload();
    },
    getAppSubPathArray() {
        let path = window.location.pathname.split('/').filter(s => s !== '');

        while (path.length > 0 && path[path.length - 1] !== app.instance) {
            path.pop();
        }

        return path;
    },
    getAppSubPath() {
        let path = Utils.getAppSubPathArray();
        return path.join('/');
    },
    getFullUrlForAjax(sub_url) {
        if (sub_url.startsWith('http')) {
            return sub_url;
        }
        if (Utils.isUrlNavigation()) {
            return Utils.getInstanceUrl(sub_url);
        }
        return sub_url;
    },
    getInstanceUrl(sub_url) {

        let path = Utils.getAppSubPathArray();

        return [window.location.origin, ...path].join('/') + '/' + sub_url;
    },
    isUrlNavigation() {
        let path = window.location.pathname.split('/').filter(s => s !== '');
        return path[path.length - 1] !== (app.auth_prov && app.auth_prov !== 'primary' ? app.auth_prov : app.instance);
    },
    getAppProviderBasedUrl(url) {
        if (!Utils.isUrlNavigation()) {
            return url;
        }
        return (app.auth_prov && app.auth_prov != 'primary' ? app.auth_prov + '/' : '') + url;
    },
    changeUrlState(subPath) {
        const cleanedSubPath = subPath.startsWith('/') ? subPath.slice(1) : subPath;
        const appSubPath = Utils.getAppSubPath();
        const parts = cleanedSubPath.split('/').filter(part => part !== '');
        const page = parts[0];
        const datasource = app.auth_prov && app.auth_prov !== 'primary' ? `${app.auth_prov}/` : '';

        parts.slice(1).forEach((part, index) => {
            Widgets[`navigationParameter${index + 1}`] = part;
        });

        const adjustedSubPath = cleanedSubPath.startsWith(app.mainPage) ? cleanedSubPath.slice(app.mainPage.length) : cleanedSubPath;

        const basePath = appSubPath ? `/${appSubPath}` : '';
        const finalUrl = `${basePath}/${datasource}${adjustedSubPath}`;

        history.pushState({page}, "", finalUrl);

        return page;
    },
    changePageTitleAndFavicon(title, favicon) {
        Utils.changePageTitle(title);
        Utils.changePageFavicon(favicon);
    },
    changePageFavicon(imageName) {
        let $link = $("link[rel~='icon']");
        if ($link.length === 0) {
            $link = $("<link>", {rel: "icon"}).appendTo("head");
        }
        $link.attr("href", FaviconUrl.faviconsFolder + imageName);
    },
    changePageTitle(text) {
        $('title').text(text);
    },
    parseJSONScript(id) {
        const $el = $('#' + id);
        if (!$el.length) return {};
        try {
            return JSON.parse($el.text());
        } catch (err) {
            console.error(`Json error "${id}" in:`, err);
            return {};
        }
    },
    setAutoPosition(floatingElement, anchor, forcedPosition = null, leftOffset = null) {
        const w = $(window),
            winHeight = w.height(),
            winWidth = w.width(),
            height = floatingElement.outerHeight(),
            width = floatingElement.outerWidth(),
            scrollLeft = w.scrollLeft(),
            scrollTop = w.scrollTop();
        const rect = anchor[0].getBoundingClientRect(),
            anchorWidth = anchor.width(),
            x = rect.left,
            y = rect.top,
            pos = {};

        const spaces = [['left', rect.left - width], ['right', winWidth - rect.right - width], ['top', rect.top - height], ['bottom', winHeight - rect.bottom - height]].sort((a, b) => a[1] < b[1] ? 1 : -1);

        let bestSpace = forcedPosition || spaces[0][0];

        if ('bottom' === bestSpace) {
            pos.left = x + scrollLeft - (width - anchorWidth) / 2;
            pos.top = rect.bottom + scrollTop;
        } else if ('top' === bestSpace) {
            pos.left = x + scrollLeft - (width - anchorWidth) / 2;
            pos.top = y + scrollTop - height;
        } else if ('right' === bestSpace) {
            pos.left = rect.right + scrollLeft;
            pos.top = y + scrollTop - Math.max(0, rect.top + height + 10 - winHeight);
        } else {
            pos.left = x + scrollLeft - width;
            pos.top = y + scrollTop - Math.max(0, rect.top + height + 10 - winHeight);
        }

        if (null !== leftOffset) {
            pos.left = x + scrollLeft - leftOffset;
        }

        let rightOffset = pos.left + width - (scrollLeft + winWidth);

        if (rightOffset > 0) {
            pos.left -= rightOffset;
        }

        return floatingElement.css(pos).prependTo($('body'));
    },
    buildMdxQueryUrl(baseUrl, options = {}, ctx = null) {
        if (typeof baseUrl !== 'string' || !baseUrl.length) {
            console.error('Utils.buildMdxQueryUrl: invalid baseUrl provided.');
            return baseUrl;
        }

        const toFiniteInt = (value) => {
            if (typeof value === 'number' && Number.isFinite(value)) {
                return Math.floor(value);
            }

            if ('string' === typeof value) {
                const trimmed = value.trim();
                if (!trimmed.length) {
                    return undefined;
                }
                const parsed = Number.parseInt(trimmed, 10);
                return Number.isNaN(parsed) ? undefined : Math.floor(parsed);
            }

            return undefined;
        };

        const toPositiveInt = (value) => {
            const parsed = toFiniteInt(value);
            return 'number' === typeof parsed && parsed > 0 ? parsed : undefined;
        };

        const toNonNegativeInt = (value) => {
            const parsed = toFiniteInt(value);
            return 'number' === typeof parsed && parsed >= 0 ? parsed : undefined;
        };

        const metadataKey = 'string' === typeof options.metadataKey ? options.metadataKey : null;
        const returnMetadata = options.returnMetadata === true;
        const onMetadata = 'function' === typeof options.onMetadata ? options.onMetadata : null;

        const extraParams = ctx && typeof ctx.getExtraParams === 'function' ? ctx.getExtraParams() || {} : {};
        const extraPageSize = Object.prototype.hasOwnProperty.call(extraParams, 'pageSize')
            ? toPositiveInt(extraParams.pageSize)
            : undefined;
        const extraSkip = Object.prototype.hasOwnProperty.call(extraParams, 'skip')
            ? toNonNegativeInt(extraParams.skip)
            : undefined;
        const extraTotalCount = Object.prototype.hasOwnProperty.call(extraParams, 'totalCount')
            ? toPositiveInt(extraParams.totalCount)
            : undefined;
        const extraPage = Object.prototype.hasOwnProperty.call(extraParams, 'page')
            ? toPositiveInt(extraParams.page)
            : undefined;
        const exportAll = options.exportAll === true || !!extraParams.exportAll;

        const defaultRowCount = Object.prototype.hasOwnProperty.call(options, 'defaultRowCount')
            ? toPositiveInt(options.defaultRowCount)
            : undefined;
        const explicitRowCount = Object.prototype.hasOwnProperty.call(options, 'rowCount')
            ? toNonNegativeInt(options.rowCount)
            : undefined;

        let rowCount = explicitRowCount;
        if ('number' !== typeof rowCount) {
            if (exportAll) {
                rowCount = extraTotalCount;
            } else if ('number' === typeof extraPageSize) {
                rowCount = 'number' === typeof defaultRowCount
                    ? Math.min(defaultRowCount, extraPageSize)
                    : extraPageSize;
            }
        }
        if ('number' !== typeof rowCount) {
            rowCount = defaultRowCount;
        }
        if ('number' !== typeof rowCount) {
            rowCount = 0;
        }

        const normalizedColumnCount = toPositiveInt(options.columnCount) || 1;

        const explicitSkipRows = Object.prototype.hasOwnProperty.call(options, 'skipRows')
            ? toNonNegativeInt(options.skipRows)
            : undefined;
        let skipRows = exportAll ? 0 : ('number' === typeof explicitSkipRows ? explicitSkipRows : (extraSkip || 0));

        const explicitTopCells = Object.prototype.hasOwnProperty.call(options, 'top')
            ? toNonNegativeInt(options.top)
            : undefined;
        const topCells = 'number' === typeof explicitTopCells
            ? explicitTopCells
            : rowCount * normalizedColumnCount;

        const explicitSkipCells = Object.prototype.hasOwnProperty.call(options, 'skip')
            ? toNonNegativeInt(options.skip)
            : undefined;
        let skipCells = 'number' === typeof explicitSkipCells
            ? explicitSkipCells
            : skipRows * normalizedColumnCount;
        if (exportAll) {
            skipCells = 0;
            skipRows = 0;
        }

        const includeCount = options.includeCount !== false;

        const page = exportAll
            ? 1
            : ('number' === typeof extraPage
                ? extraPage
                : (rowCount > 0 ? Math.floor(skipRows / rowCount) + 1 : 1));

        const metadata = {
            rowCount: rowCount,
            skipRows: skipRows,
            columnCount: normalizedColumnCount,
            top: topCells,
            skip: skipCells,
            includeCount: includeCount,
            exportAll: exportAll,
            pageSize: rowCount,
            page: page,
            totalCountHint: extraTotalCount,
            extraParams: extraParams,
            topExplicit: 'number' === typeof explicitTopCells,
            skipExplicit: 'number' === typeof explicitSkipCells
        };

        const assignMetadata = () => {
            if (metadataKey && ctx && 'object' === typeof ctx) {
                ctx[metadataKey] = metadata;
            }
            if (onMetadata) {
                try {
                    onMetadata(metadata, ctx);
                } catch (error) {
                    console.error('Utils.buildMdxQueryUrl: error while executing onMetadata callback.', error);
                }
            }
        };

        const parameters = [];
        if (includeCount) {
            parameters.push('$count=true');
        }
        if (metadata.topExplicit || topCells > 0) {
            parameters.push(`$top=${Math.max(0, topCells)}`);
        }
        if (metadata.skipExplicit || skipCells > 0 || (metadata.topExplicit && skipCells === 0)) {
            parameters.push(`$skip=${Math.max(0, skipCells)}`);
        }

        if (!parameters.length) {
            assignMetadata();
            return returnMetadata ? {url: baseUrl, metadata: metadata} : baseUrl;
        }

        const insertParametersIntoSegment = (segment) => {
            const marker = `${segment}(`;
            const markerIndex = baseUrl.indexOf(marker);
            if (-1 === markerIndex) {
                return null;
            }

            const prefix = baseUrl.slice(0, markerIndex + marker.length);
            const remainder = baseUrl.slice(markerIndex + marker.length);
            const separator = remainder.length && !remainder.startsWith(';') && !remainder.startsWith(')')
                ? ';'
                : '';
            return `${prefix}${parameters.join(';')}${separator}${remainder}`;
        };

        const insideCells = insertParametersIntoSegment('Cells');
        if (insideCells) {
            assignMetadata();
            return returnMetadata ? {url: insideCells, metadata: metadata} : insideCells;
        }

        const insideTuples = insertParametersIntoSegment('Tuples');
        if (insideTuples) {
            assignMetadata();
            return returnMetadata ? {url: insideTuples, metadata: metadata} : insideTuples;
        }

        const hasQuery = baseUrl.includes('?');
        const separator = hasQuery
            ? (baseUrl.endsWith('?') || baseUrl.endsWith('&') ? '' : '&')
            : '?';
        const finalUrl = `${baseUrl}${separator}${parameters.join('&')}`;
        assignMetadata();
        return returnMetadata ? {url: finalUrl, metadata: metadata} : finalUrl;
    },
    transformMdxResponseToGridTableLight(response, options = {}) {
        const emptyResult = {columns: [], content: []};

        try {
            if (!response || !Array.isArray(response.Cells)) {
                console.error('Utils.transformMdxResponseToGridTableLight: invalid MDX response format.');
                return emptyResult;
            }

            const cells = response.Cells;
            if (!cells.length) {
                console.error('Utils.transformMdxResponseToGridTableLight: MDX response does not contain any cells.');
                return emptyResult;
            }

            let columnIndex = null;
            for (let idx = 1; idx < cells.length; idx++) {
                const previousMembers = Array.isArray(cells[idx - 1].Members) ? cells[idx - 1].Members : [];
                const currentMembers = Array.isArray(cells[idx].Members) ? cells[idx].Members : [];
                const length = Math.max(previousMembers.length, currentMembers.length);
                const differences = [];

                for (let memberIndex = 0; memberIndex < length; memberIndex++) {
                    const previousName = previousMembers[memberIndex] ? previousMembers[memberIndex].Name : undefined;
                    const currentName = currentMembers[memberIndex] ? currentMembers[memberIndex].Name : undefined;
                    if (previousName !== currentName) {
                        differences.push(memberIndex);
                    }
                }

                if (1 === differences.length) {
                    columnIndex = differences[0];
                    break;
                }
            }

            const firstMembers = Array.isArray(cells[0].Members) ? cells[0].Members : [];
            if (null === columnIndex) {
                if (firstMembers.length) {
                    columnIndex = Math.min(firstMembers.length - 1, Math.max(firstMembers.length - 2, 0));
                    console.warn('Utils.transformMdxResponseToGridTableLight: falling back to inferred column index', columnIndex);
                } else {
                    console.error('Utils.transformMdxResponseToGridTableLight: unable to determine column index.');
                    return emptyResult;
                }
            }

            const getRowKey = members => members
                .map((member, idx) => idx === columnIndex ? '__COLUMN__' : (member && member.Name) || '')
                .join('|');

            const rowOrder = [];
            const rowDataByKey = {};
            const columnOrder = [];

            for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                const cell = cells[cellIndex] || {};
                const members = Array.isArray(cell.Members) ? cell.Members : [];
                const rowKey = getRowKey(members);

                if (!rowDataByKey[rowKey]) {
                    rowOrder.push(rowKey);
                    const labelParts = members
                        .filter((member, idx) => idx !== columnIndex && idx < members.length - 1 && member && member.Name)
                        .map(member => member.Name);
                    const label = labelParts.length ? labelParts[labelParts.length - 1] : `Row ${rowOrder.length}`;
                    rowDataByKey[rowKey] = {
                        label: label,
                        description: labelParts.join(' / '),
                        values: {},
                        cellMeta: {},
                        rowOrdinal: null
                    };
                }

                const columnMember = members[columnIndex];
                const columnName = columnMember && columnMember.Name ? columnMember.Name : `Column ${columnOrder.length + 1}`;
                if (!columnOrder.includes(columnName)) {
                    columnOrder.push(columnName);
                }

                const formattedValue = Object.prototype.hasOwnProperty.call(cell, 'FormattedValue') ? cell.FormattedValue : '';
                rowDataByKey[rowKey].values[columnName] = formattedValue;

                if (Object.prototype.hasOwnProperty.call(cell, 'Ordinal')) {
                    const ordinal = cell.Ordinal;
                    if (null === rowDataByKey[rowKey].rowOrdinal) {
                        rowDataByKey[rowKey].rowOrdinal = ordinal;
                    }
                    rowDataByKey[rowKey].cellMeta[columnName] = {ordinal: ordinal};
                }
            }

            console.log('Utils.transformMdxResponseToGridTableLight: detected column count', columnOrder.length);


            const deriveRowLabelTitle = () => {
                if (!firstMembers.length) {
                    return 'Row';
                }
                if (columnIndex > 0) {
                    const previousMember = firstMembers[columnIndex - 1];
                    if (previousMember && previousMember.Name) {
                        return previousMember.Name;
                    }
                }
                for (let idx = firstMembers.length - 2; idx >= 0; idx--) {
                    if (idx === columnIndex) {
                        continue;
                    }
                    const member = firstMembers[idx];
                    if (member && member.Name) {
                        return member.Name;
                    }
                }
                return 'Row';
            };

            const columns = [
                {
                    key: 'rowLabel',
                    title: deriveRowLabelTitle(),
                    alignment: 'center-left'
                }
            ];

            for (let columnIdx = 0; columnIdx < columnOrder.length; columnIdx++) {
                const name = columnOrder[columnIdx] || `Column ${columnIdx + 1}`;
                columns.push({
                    key: `col${columnIdx + 1}`,
                    title: name,
                    alignment: 'center-right'
                });
            }

            const content = rowOrder.map((rowKey, index) => {
                const rowData = rowDataByKey[rowKey];
                const cellsForRow = [];

                const rowLabelCell = {
                    type: 'text',
                    rawValue: rowData.label,
                    displayValue: rowData.label,
                    tooltip: rowData.description || rowData.label,
                    alignment: 'center-left'
                };
                if (rowData.rowOrdinal !== null && typeof rowData.rowOrdinal !== 'undefined') {
                    rowLabelCell.data = {ordinal: rowData.rowOrdinal};
                }
                cellsForRow.push(rowLabelCell);

                for (let columnIdx = 0; columnIdx < columnOrder.length; columnIdx++) {
                    const name = columnOrder[columnIdx];
                    const value = Object.prototype.hasOwnProperty.call(rowData.values, name) ? rowData.values[name] : '';
                    const meta = rowData.cellMeta && Object.prototype.hasOwnProperty.call(rowData.cellMeta, name)
                        ? rowData.cellMeta[name]
                        : null;
                    const cellDefinition = {
                        type: 'text',
                        rawValue: value,
                        displayValue: value,
                        alignment: 'center-right'
                    };
                    if (meta && typeof meta === 'object') {
                        const keys = Object.keys(meta);
                        if (keys.length) {
                            cellDefinition.data = {};
                            for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                                const metaKey = keys[keyIndex];
                                cellDefinition.data[metaKey] = meta[metaKey];
                            }
                        }
                    }
                    cellsForRow.push(cellDefinition);
                }

                return {index: index, cells: cellsForRow};
            });

            return {columns: columns, content: content};
        } catch (error) {
            console.error('Utils.transformMdxResponseToGridTableLight: unexpected error while transforming MDX response.', error);
            return emptyResult;
        }
    },
    extCall(fnName, ...args) {
        return ExtensionFunctions.call(fnName, ...args);
    }
};

app.utils = Utils;
