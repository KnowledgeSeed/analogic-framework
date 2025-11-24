const GridTableExport = {
    editableColor: 'FFFFFFFF',
    readonlyColor: 'FFD3D3D3',
    formulaColor:  'FFEEEEFF',
    headerFillColor: 'FFEDEDED',
    borderStyle: {
       top:    { style: 'thin', color: { argb: 'FFD3D3D3' } },
       left:   { style: 'thin', color: { argb: 'FFD3D3D3' } },
       bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
       right:  { style: 'thin', color: { argb: 'FFD3D3D3' } }
    },
    headerFontBold: true,
    resizeMargin: 2,
    resizeMinWidth: 4,
    defaultSheetName: 'Export Data',
    defaultFileName: 'export.xlsx',
    defaultStartColumnIndex: 1,

    parseValue: (cellValue) => {
        if (cellValue === "" || cellValue === null || cellValue === undefined) {
            return { type: 'string', value: "" };
        }

        const stringValue = String(cellValue);
        const trimmedValue = stringValue.trim();

        if (trimmedValue === '') {
            return { type: 'string', value: "" };
        }

        const isPercent = trimmedValue.endsWith('%');
        const numericPortion = isPercent ? trimmedValue.slice(0, -1) : trimmedValue;
        const normalizedNumeric = numericPortion.replace(/\s+/g, '').replace(',', '.');

        if (normalizedNumeric !== '' && !isNaN(normalizedNumeric)) {
            const parsedNumber = parseFloat(normalizedNumeric);
            const decimalMatch = normalizedNumeric.match(/\.([0-9]+)$/);
            const decimalCount = decimalMatch ? decimalMatch[1].length : 0;

            if (isPercent) {
                return {
                    type: 'percent',
                    value: parsedNumber / 100,
                    decimals: decimalCount
                };
            }

            return {
                type: 'number',
                value: parsedNumber,
                decimals: decimalCount
            };
        }

        return { type: 'string', value: stringValue };
    },

    downloadBuffer: (buffer, filename)=>{
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    },

    autoResizeColumnsFromRow: (worksheet, startRow)=> {
        if (!worksheet || !worksheet.columns) return;
        worksheet.columns.forEach((column) => {
            if (!column || column.number === undefined) return;
            let maxWidth = 0;
            for (let rowNumber = startRow; rowNumber <= worksheet.lastRow?.number ?? startRow; rowNumber++) {
                const cell = worksheet.getCell(rowNumber, column.number);
                const cellText = cell.text ? cell.text.toString() : (cell.value ? cell.value.toString() : '');
                if (cellText) {
                    maxWidth = Math.max(maxWidth, cellText.length);
                }
            }
            column.width = Math.max(GridTableExport.resizeMinWidth, maxWidth + GridTableExport.resizeMargin);
        });
    },

    parseAttributeValues: (attributes) => {
        if (!Array.isArray(attributes) || attributes.length === 0) {
            if (attributes !== undefined && attributes !== null && attributes !== '') {
                console.warn('[GridTableExport] attributes must be provided as an array.');
            }
            return [];
        }

        const values = [];

        const appendValue = (value) => {
            if (value === null || value === undefined) {
                return;
            }
            const text = String(value).trim();
            if (text === '') {
                return;
            }
            values.push(text);
        };

        const processEntry = (entry) => {
            if (Array.isArray(entry)) {
                entry.forEach(processEntry);
                return;
            }

            if (typeof entry === 'string') {
                entry.split(',').forEach(segment => {
                    appendValue(segment);
                });
                return;
            }

            appendValue(entry);
        };

        attributes.forEach(processEntry);

        return values;
    },

    populateAttributeRow: (worksheet, attributeValues, rowIndex, startColIndex, columnMapping) => {
        if (!attributeValues || attributeValues.length === 0) return;

        const hasColumnMapping = Array.isArray(columnMapping) && columnMapping.length > 0;
        const limit = hasColumnMapping
            ? Math.min(attributeValues.length, columnMapping.length)
            : attributeValues.length;

        for (let index = 0; index < limit; index++) {
            const excelCol = startColIndex + index;
            const cell = worksheet.getCell(rowIndex, excelCol);
            const value = attributeValues[index];
            cell.value = value !== undefined && value !== null ? String(value) : '';
            cell.protection = { locked: true };
        }
    },

    isRepeatingCellsEnabled: (value) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return !!value;
    },

    normalizeEditingConfig: (value, totalColumns) => {
        if (value === null || value === undefined) {
            return { mode: 'none', columns: null };
        }

        if (typeof value === 'boolean') {
            return value
                ? { mode: 'all', columns: null }
                : { mode: 'none', columns: null };
        }

        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed === '') {
                return { mode: 'none', columns: null };
            }

            const lowered = trimmed.toLowerCase();
            if (lowered === 'true') {
                return { mode: 'all', columns: null };
            }

            if (lowered === 'false') {
                return { mode: 'none', columns: null };
            }

            const parsed = GridTableExport.normalizeColumnSelection(trimmed, totalColumns, 'enableEditing');
            return parsed.size > 0
                ? { mode: 'columns', columns: parsed }
                : { mode: 'none', columns: null };
        }

        if (Array.isArray(value)) {
            const parsed = GridTableExport.normalizeColumnSelection(value, totalColumns, 'enableEditing');
            return parsed.size > 0
                ? { mode: 'columns', columns: parsed }
                : { mode: 'none', columns: null };
        }

        console.warn('[GridTableExport] Unsupported enableEditing configuration. Expected boolean, array, or comma-separated range string.');
        return { mode: 'none', columns: null };
    },

    normalizeStartColumnIndex: (value, fallback = GridTableExport.defaultStartColumnIndex) => {
        const defaultValue = Number.isInteger(fallback) && fallback >= 1
            ? fallback
            : Math.max(1, GridTableExport.defaultStartColumnIndex);

        if (value === null || value === undefined || value === '') {
            return defaultValue;
        }

        const numeric = Number(value);
        if (!Number.isFinite(numeric)) {
            console.warn('[GridTableExport] startColumnIndex must be a positive integer. Received:', value);
            return defaultValue;
        }

        const integer = Math.trunc(numeric);
        if (integer < 1) {
            console.warn('[GridTableExport] startColumnIndex must be a positive integer. Received:', value);
            return defaultValue;
        }

        return integer;
    },

    normalizeEmptyColumnsLeft: (value, fallback = GridTableExport.defaultStartColumnIndex - 1) => {
        const defaultValue = Number.isInteger(fallback) && fallback >= 0
            ? fallback
            : Math.max(0, GridTableExport.defaultStartColumnIndex - 1);

        if (value === null || value === undefined || value === '') {
            return defaultValue;
        }

        const numeric = Number(value);
        if (!Number.isFinite(numeric)) {
            console.warn('[GridTableExport] emptyColumnsLeft must be a non-negative integer. Received:', value);
            return defaultValue;
        }

        const integer = Math.trunc(numeric);
        if (integer < 0) {
            console.warn('[GridTableExport] emptyColumnsLeft must be a non-negative integer. Received:', value);
            return defaultValue;
        }

        return integer;
    },

    resolveEmptyColumnsLeft: (startColumnIndex, emptyColumnsLeft) => {
        if (startColumnIndex !== null && startColumnIndex !== undefined && startColumnIndex !== '') {
            const normalizedStart = GridTableExport.normalizeStartColumnIndex(startColumnIndex);
            return Math.max(0, normalizedStart - 1);
        }

        return GridTableExport.normalizeEmptyColumnsLeft(emptyColumnsLeft);
    },

    normalizeSheetNames: (sheetNameConfig, sheetCount = 1) => {
        const names = [];

        const appendName = (value) => {
            if (value === null || value === undefined) {
                return;
            }
            const text = String(value).trim();
            if (text !== '') {
                names.push(text);
            }
        };

        if (Array.isArray(sheetNameConfig)) {
            sheetNameConfig.forEach(appendName);
        } else if (typeof sheetNameConfig === 'string') {
            sheetNameConfig.split(',').forEach(appendName);
        } else if (sheetNameConfig !== undefined && sheetNameConfig !== null) {
            appendName(sheetNameConfig);
        }

        const defaultName = GridTableExport.defaultSheetName;
        for (let index = names.length; index < sheetCount; index++) {
            const suffix = sheetCount > 1 ? ` ${index + 1}` : '';
            names.push(index === 0 ? defaultName : `${defaultName}${suffix}`);
        }

        if (names.length > sheetCount) {
            return names.slice(0, sheetCount);
        }

        return names;
    },

    normalizeTableSources: (tableSource) => {
        const sources = [];

        const looksLikeTabularArray = (candidate) => {
            if (!Array.isArray(candidate) || candidate.length === 0) {
                return false;
            }

            return candidate.every(row => Array.isArray(row) && !row.some(Array.isArray));
        };

        const appendSource = (value) => {
            if (value === null || value === undefined) {
                return;
            }

            if (Array.isArray(value)) {
                if (looksLikeTabularArray(value)) {
                    sources.push(value);
                    return;
                }

                value.forEach(appendSource);
                return;
            }

            if (typeof value === 'string') {
                const parts = value.split(',').map(part => part.trim()).filter(Boolean);
                if (parts.length > 1) {
                    parts.forEach(appendSource);
                    return;
                }
            }

            sources.push(value);
        };

        appendSource(tableSource);
        return sources;
    },

    getTotalColumnCount: (headerArray, tableData) => {
        let maxColumns = 0;

        if (Array.isArray(headerArray)) {
            maxColumns = Math.max(maxColumns, headerArray.length);
        }

        if (Array.isArray(tableData)) {
            for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
                const row = tableData[rowIndex];
                if (Array.isArray(row)) {
                    maxColumns = Math.max(maxColumns, row.length);
                }
            }
        }

        return maxColumns;
    },

    normalizeColumnSelection: (columns, totalColumns, optionName) => {
        const normalized = new Set();

        const reportInvalid = (entry) => {
            if (optionName) {
                console.warn(`[GridTableExport] Ignoring invalid ${optionName} entry:`, entry);
            } else {
                console.warn('[GridTableExport] Ignoring invalid column selection entry:', entry);
            }
        };

        const appendSingleIndex = (value) => {
            const numeric = Number(value);
            if (!Number.isFinite(numeric)) {
                reportInvalid(value);
                return;
            }

            const integer = Math.trunc(numeric);
            if (integer < 1) {
                const optionLabel = optionName || 'column selections';
                console.warn(
                    `[GridTableExport] ${optionLabel} entries must be positive (1-based).`,
                    value,
                    'If you intended to specify a range like 7-20, wrap it in quotes ("7-20") so it is parsed correctly.'
                );
                return;
            }

            const zeroBased = integer - 1;
            if (typeof totalColumns === 'number' && totalColumns > 0 && zeroBased >= totalColumns) {
                if (optionName) {
                    console.warn(`[GridTableExport] ${optionName} entry exceeds available columns:`, value);
                } else {
                    console.warn('[GridTableExport] Column selection entry exceeds available columns:', value);
                }
                return;
            }

            normalized.add(zeroBased);
        };

        const appendRange = (startValue, endValue) => {
            const start = Number(startValue);
            const end = Number(endValue);

            if (!Number.isFinite(start) || !Number.isFinite(end)) {
                reportInvalid(`${startValue}-${endValue}`);
                return;
            }

            let rangeStart = Math.trunc(start);
            let rangeEnd = Math.trunc(end);

            if (rangeStart < 1 || rangeEnd < 1) {
                reportInvalid(`${startValue}-${endValue}`);
                return;
            }

            if (rangeStart > rangeEnd) {
                const temp = rangeStart;
                rangeStart = rangeEnd;
                rangeEnd = temp;
            }

            for (let current = rangeStart; current <= rangeEnd; current++) {
                appendSingleIndex(current);
            }
        };

        const processStringSegment = (segment) => {
            if (!segment) {
                return;
            }

            const trimmed = segment.trim();
            if (trimmed === '') {
                return;
            }

            const rangeMatch = trimmed.match(/^(-?\d+)\s*-\s*(-?\d+)$/);
            if (rangeMatch) {
                appendRange(rangeMatch[1], rangeMatch[2]);
                return;
            }

            appendSingleIndex(trimmed);
        };

        const appendIndex = (value) => {
            if (value === null || value === undefined || value === '') {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach(appendIndex);
                return;
            }

            if (typeof value === 'string') {
                value.split(',').forEach(segment => {
                    processStringSegment(segment);
                });
                return;
            }

            appendSingleIndex(value);
        };

        let workingColumns = columns;

        if (typeof workingColumns === 'string') {
            workingColumns = [workingColumns];
        }

        if (!Array.isArray(workingColumns)) {
            if (workingColumns !== undefined && workingColumns !== null) {
                if (optionName) {
                    console.warn(`[GridTableExport] ${optionName} must be provided as an array or comma-separated string.`);
                } else {
                    console.warn('[GridTableExport] Column selections must be provided as an array or comma-separated string.');
                }
            }
            return normalized;
        }

        workingColumns.forEach(appendIndex);
        return normalized;
    },

    normalizeExcludedColumns: (columns, totalColumns) => {
        return GridTableExport.normalizeColumnSelection(columns, totalColumns, 'excludeColumns');
    },

    getNumberFormatPattern: (decimalCount = 0) => {
        if (!Number.isInteger(decimalCount) || decimalCount <= 0) {
            return '#,##0';
        }

        const clamped = Math.min(decimalCount, 6);
        return `#,##0.${'0'.repeat(clamped)}`;
    },

    getPercentFormatPattern: (decimalCount = 0) => {
        if (!Number.isInteger(decimalCount) || decimalCount <= 0) {
            return '0%';
        }

        const clamped = Math.min(decimalCount, 6);
        return `0.${'0'.repeat(clamped)}%`;
    },

    buildColumnMapping: (totalColumns, excludedColumnsSet) => {
        if (!totalColumns || totalColumns <= 0) {
            return [];
        }

        const mapping = [];
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            if (excludedColumnsSet && excludedColumnsSet.has(columnIndex)) {
                continue;
            }
            mapping.push(columnIndex);
        }

        return mapping;
    },

    extractHeaderCellText: (cell) => {
        if (cell === null || cell === undefined) {
            return '';
        }

        if (typeof cell === 'string' || typeof cell === 'number' || typeof cell === 'boolean') {
            return String(cell);
        }

        if (typeof cell === 'object') {
            if (Object.prototype.hasOwnProperty.call(cell, 'exportValue')) {
                const exportValue = cell.exportValue;
                return exportValue !== null && exportValue !== undefined ? String(exportValue) : '';
            }

            if (Object.prototype.hasOwnProperty.call(cell, 'title')) {
                const titleValue = cell.title;
                return titleValue !== null && titleValue !== undefined ? String(titleValue) : '';
            }

            if (Object.prototype.hasOwnProperty.call(cell, 'text')) {
                const textValue = cell.text;
                return textValue !== null && textValue !== undefined ? String(textValue) : '';
            }

            if (Object.prototype.hasOwnProperty.call(cell, 'value')) {
                const valueField = cell.value;
                return valueField !== null && valueField !== undefined ? String(valueField) : '';
            }
        }

        return String(cell);
    },

    extractHeaderFromTableData: (tableData) => {
        if (!Array.isArray(tableData) || tableData.length === 0) {
            return {
                headerValues: null,
                dataRows: Array.isArray(tableData) ? tableData : [],
                detected: false
            };
        }

        const firstRow = tableData[0];
        if (!Array.isArray(firstRow)) {
            return {
                headerValues: null,
                dataRows: tableData,
                detected: false
            };
        }

        const headerDetectedByFlag = firstRow.some(cell => cell && typeof cell === 'object' && cell.isHeader === true);
        const headerValues = firstRow.map(cell => GridTableExport.extractHeaderCellText(cell));
        const hasNonEmptyHeader = headerValues.some(value => value !== '');

        if (!headerDetectedByFlag && !hasNonEmptyHeader) {
            return {
                headerValues: null,
                dataRows: tableData,
                detected: false
            };
        }

        return {
            headerValues,
            dataRows: tableData.slice(1),
            detected: headerDetectedByFlag ? 'flag' : 'firstRow'
        };
    },

    getHeaderRowValues: (tableOptionsObject) =>{
        let headerTitlesArray = [];

        const outerCheckFailed = !tableOptionsObject || !tableOptionsObject.widgets || tableOptionsObject.widgets.length === 0;
        if (outerCheckFailed) {
            return headerTitlesArray;
        }

        let headerRowWidget = tableOptionsObject.widgets[0];

        const headerCheckPassed = headerRowWidget &&
                                  headerRowWidget.type.name === "GridTableHeaderRowWidget" &&
                                  headerRowWidget.widgets;

        if(headerCheckPassed) {
            for(let i = 0; i < headerRowWidget.widgets.length; i++) {
                headerTitlesArray[i] = "";
                let cellWidget = headerRowWidget.widgets[i];
                if(cellWidget && cellWidget.type.name === "GridTableHeaderCellWidget" && cellWidget.widgets && cellWidget.widgets.length > 0) {
                    for(let j = 0; j < cellWidget.widgets.length; j++) {
                        let currentWidget = cellWidget.widgets[j];
                        if(currentWidget && currentWidget.type.name === "TextWidget" && currentWidget.id) {
                            try {
                                let widgetElement = $('#' + currentWidget.id);
                                if (widgetElement.length) {
                                    let part1 = widgetElement.find('.ks-text-title').text() || "";
                                    let part2 = widgetElement.find('.ks-text-body').text() || "";
                                    headerTitlesArray[i] = (part1 && part2) ? `${part1} ${part2}`.trim() : (part1 || part2).trim();
                                    break;
                                }
                            } catch (e) {
                                console.error("jQuery error finding header text for widget ID:", currentWidget.id, e);
                            }
                        }
                    }
                }
            }
        }
        let lastNonEmptyIndex = -1;

        for (let i = headerTitlesArray.length - 1; i >= 0; i--) {
            if (headerTitlesArray[i] !== "") {
                lastNonEmptyIndex = i;
                break;
            }
        }

        const trimmedHeaders = headerTitlesArray.slice(0, lastNonEmptyIndex + 1);
        if (trimmedHeaders.length > 0) {
            return trimmedHeaders;
        }

        if (tableOptionsObject && Array.isArray(tableOptionsObject.exportHeaderTitles)) {
            const fallbackHeaders = tableOptionsObject.exportHeaderTitles.slice();
            let lastFallbackIndex = fallbackHeaders.length - 1;
            while (lastFallbackIndex >= 0 && fallbackHeaders[lastFallbackIndex] === "") {
                lastFallbackIndex--;
            }
            return fallbackHeaders.slice(0, lastFallbackIndex + 1);
        }

        return [];
    },

    populateHeaderCells: (worksheet, headerArray, headerRowIndex, startColIndex, columnMapping) => {
        if (!headerArray || headerArray.length === 0) return;
        if (!Array.isArray(columnMapping) || columnMapping.length === 0) return;

        columnMapping.forEach((originalIndex, outputIndex) => {
            const excelCol = outputIndex + startColIndex;
            const cell = worksheet.getCell(headerRowIndex, excelCol);
            const headerValue = headerArray[originalIndex];
            const finalValue = headerValue !== null && headerValue !== undefined ? String(headerValue) : "";
            cell.value = finalValue;
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GridTableExport.headerFillColor } };
            cell.font = { bold: GridTableExport.headerFontBold };
            cell.protection = { locked: true };
            cell.border = GridTableExport.borderStyle;
        });
    },

    populateDataCells: (
        worksheet,
        tableData,
        startRowIndex,
        startColIndex,
        repeatingCells = false,
        columnMapping = [],
        editingConfig = { mode: 'none', columns: null }
    ) => {
        if (!tableData) return;
        if (!Array.isArray(columnMapping) || columnMapping.length === 0) return;

        const previousColumnValues = repeatingCells ? {} : null;
        const editingMode = editingConfig?.mode || 'none';
        const editableColumns = editingConfig?.columns || null;

        tableData.forEach((rowData, r) => {
            if (!Array.isArray(rowData)) {
                console.warn(`[Debug populateDataCells] Row ${r} is not an array, skipping:`, rowData);
                return;
            }

            columnMapping.forEach((originalIndex, outputIndex) => {
                const excelRow = r + startRowIndex;
                const excelCol = outputIndex + startColIndex;
                const cell = worksheet.getCell(excelRow, excelCol);

                const cellObj = rowData[originalIndex];
                const hasExportValue = cellObj && Object.prototype.hasOwnProperty.call(cellObj, 'exportValue');
                const rawExport = hasExportValue ? cellObj.exportValue : (cellObj?.title ?? "");
                const valueToParse = rawExport !== null && rawExport !== undefined ? String(rawExport) : "";
                const baseEditable = cellObj?.editable ?? false;
                const editingOverride = editingMode === 'all'
                    || (editingMode === 'columns' && editableColumns && editableColumns.has(originalIndex));
                const isEditable = editingOverride || baseEditable;

                const parsedObject = GridTableExport.parseValue(valueToParse);
                let finalCellValue = parsedObject.value;
                let cellType = parsedObject.type;
                let cellDecimals = parsedObject.decimals ?? 0;

                if (repeatingCells && previousColumnValues) {
                    const trimmedValue = valueToParse.trim();
                    const columnKey = originalIndex;
                    const hasStoredValue = Object.prototype.hasOwnProperty.call(previousColumnValues, columnKey);
                    const storedEntry = hasStoredValue ? previousColumnValues[columnKey] : undefined;

                    if (trimmedValue === '' && hasStoredValue && storedEntry) {
                        finalCellValue = storedEntry.value;
                        cellType = storedEntry.type;
                        cellDecimals = storedEntry.decimals ?? 0;
                    } else if (trimmedValue !== '') {
                        previousColumnValues[columnKey] = {
                            value: finalCellValue,
                            type: cellType,
                            decimals: cellDecimals
                        };
                    }
                }

                cell.value = finalCellValue;

                if (cellType === 'number') {
                    cell.numFmt = GridTableExport.getNumberFormatPattern(cellDecimals);
                } else if (cellType === 'percent') {
                    cell.numFmt = GridTableExport.getPercentFormatPattern(cellDecimals);
                }

                if (isEditable) {
                    cell.protection = { locked: false };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GridTableExport.editableColor } };
                } else {
                    cell.protection = { locked: true };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GridTableExport.readonlyColor } };
                }

                cell.border = GridTableExport.borderStyle;
            });
        });
    },

    addWorksheetFromTable: async (
        workbook,
        tableObject,
        config = {}
    ) => {

        const sheetName = config.sheetName || GridTableExport.defaultSheetName;
        const attributeValues = GridTableExport.parseAttributeValues(config.attributes);
        const attrRowEnabled = attributeValues.length > 0;

        const emptyColsLeft = GridTableExport.resolveEmptyColumnsLeft(
            config.startColumnIndex ?? config.startColumn,
            config.emptyColumnsLeft ?? config.emptyColsLeft
        );
        const dataStartColumnIndex = emptyColsLeft + 1;
        const attributeRowIndex = 1;
        const headerRowIndex = 3;
        const repeatingCellsEnabled = GridTableExport.isRepeatingCellsEnabled(config.repeatingCells);

        const worksheet = workbook.addWorksheet(sheetName);

        let headerTitlesArray = GridTableExport.getHeaderRowValues(tableObject?.options);
        let headerRowEnabled = headerTitlesArray && headerTitlesArray.length > 0;
        let headerRowActualIndex = 0;
        let dataStartRowIndex = headerRowIndex;

        const tableDataOriginal = Array.isArray(tableObject?.cellData) ? tableObject.cellData : [];

        let workingTableData = tableDataOriginal;
        if (!headerRowEnabled) {
            const derivedHeaderInfo = GridTableExport.extractHeaderFromTableData(workingTableData);
            if (derivedHeaderInfo.headerValues && derivedHeaderInfo.headerValues.length > 0) {
                headerTitlesArray = derivedHeaderInfo.headerValues;
                headerRowEnabled = true;
                workingTableData = derivedHeaderInfo.dataRows;
            }
        }

        const totalColumns = GridTableExport.getTotalColumnCount(headerTitlesArray, workingTableData);
        const excludedColumnsSet = GridTableExport.normalizeExcludedColumns(config.excludeColumns, totalColumns);

        const columnMapping = GridTableExport.buildColumnMapping(totalColumns, excludedColumnsSet);
        const editingConfig = GridTableExport.normalizeEditingConfig(config.enableEditing, totalColumns);

        if (attrRowEnabled) {
            GridTableExport.populateAttributeRow(worksheet, attributeValues, attributeRowIndex, dataStartColumnIndex, columnMapping);
        }

        const headerCanBeRendered = headerRowEnabled && columnMapping.length > 0;

        if (headerCanBeRendered) {
            headerRowActualIndex = headerRowIndex;
            GridTableExport.populateHeaderCells(worksheet, headerTitlesArray, headerRowActualIndex, dataStartColumnIndex, columnMapping);
            dataStartRowIndex = headerRowActualIndex + 1;
        }

        if (!headerCanBeRendered) {
            dataStartRowIndex = headerRowIndex;
        }

        GridTableExport.populateDataCells(
            worksheet,
            workingTableData,
            dataStartRowIndex,
            dataStartColumnIndex,
            repeatingCellsEnabled,
            columnMapping,
            editingConfig
        );

        const resizeStartRow = attrRowEnabled
            ? attributeRowIndex
            : (headerCanBeRendered ? headerRowActualIndex : dataStartRowIndex);
        if (columnMapping.length > 0 && resizeStartRow > 0 && worksheet.lastRow?.number >= resizeStartRow) {
           GridTableExport.autoResizeColumnsFromRow(worksheet, resizeStartRow);
        } else {
           console.log("[Debug createXlsxBuffer] Skipping auto-resize (no relevant rows found).");
        }

        await worksheet.protect('ASDXYZ123789', {
            selectLockedCells: true,
            selectUnlockedCells: true,
            formatColumns: true,
            formatRows: true,
            insertColumns: false,
            insertRows: false,
            insertHyperlinks: false,
            deleteColumns: false,
            deleteRows: false,
            sort: false,
            autoFilter: false
        });

        return worksheet;
    },

    createXlsxBuffer: async (
        tableObject,
        config = {}
    ) => {

        const workbook = new ExcelJS.Workbook();
        await GridTableExport.addWorksheetFromTable(workbook, tableObject, config);
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    },

    resolveTableSource: async (source) => {
        let currentValue = source;

        try {
            while (typeof currentValue === 'function') {
                currentValue = currentValue();
            }

            if (currentValue && typeof currentValue.then === 'function') {
                currentValue = await currentValue;
                while (typeof currentValue === 'function') {
                    currentValue = currentValue();
                }
            }
        } catch (evaluationError) {
            console.error('[GridTableExport] Failed to evaluate table source:', evaluationError);
            return null;
        }

        if (typeof currentValue === 'string') {
            const lookupKey = currentValue.trim();
            if (!lookupKey) {
                console.warn('[GridTableExport] Empty string provided as table source.');
                return null;
            }
            try {
                const resolved = v(lookupKey);
                return GridTableExport.normalizeTableObject(resolved, lookupKey);
            } catch (lookupError) {
                console.error(`[GridTableExport] Unable to resolve table data for key "${lookupKey}":`, lookupError);
                return null;
            }
        }

        return GridTableExport.normalizeTableObject(currentValue);
    },

    normalizeTableObject: (value, debugLabel = '') => {
        if (value === null || value === undefined) {
            return null;
        }

        if (Array.isArray(value)) {
            return { cellData: value, options: null };
        }

        if (typeof value === 'object') {
            if (Array.isArray(value.cellData)) {
                return {
                    ...value,
                    options: value.options ?? value.tableOptions ?? null
                };
            }

            if (Array.isArray(value.data)) {
                return {
                    ...value,
                    cellData: value.data,
                    options: value.options ?? value.tableOptions ?? null
                };
            }
        }

        if (debugLabel) {
            console.warn(`[GridTableExport] Unsupported table data structure for "${debugLabel}".`, value);
        } else {
            console.warn('[GridTableExport] Unsupported table data structure supplied to export.', value);
        }

        return null;
    },

    triggerExcelExport: async (tableSource, exportConfig = {}) => {
        const sourceList = GridTableExport.normalizeTableSources(tableSource);
        const resolvedTables = await Promise.all(sourceList.map(GridTableExport.resolveTableSource));

        const validTables = [];
        sourceList.forEach((sourceEntry, index) => {
            const tableObject = resolvedTables[index];
            if (tableObject && Array.isArray(tableObject.cellData)) {
                validTables.push({ tableObject, sourceEntry });
                return;
            }

            const sourceLabel = typeof sourceEntry === 'string'
                ? `source "${sourceEntry}"`
                : 'the provided source';
            console.error(`[GridTableExport] Failed to resolve table data for export from ${sourceLabel}.`, sourceEntry);
        });

        if (validTables.length === 0) {
            alert('Error: Could not retrieve data for export. Terminating.');
            return;
        }

        const sheetNames = GridTableExport.normalizeSheetNames(exportConfig.sheetName, validTables.length);
        const fileName = exportConfig.fileName || GridTableExport.defaultFileName;

        const sharedConfig = {
            attributes: Array.isArray(exportConfig.attributes) ? exportConfig.attributes : [],
            repeatingCells: exportConfig.repeatingCells,
            excludeColumns: Array.isArray(exportConfig.excludeColumns) || typeof exportConfig.excludeColumns === 'string'
                ? exportConfig.excludeColumns
                : [],
            enableEditing: exportConfig.enableEditing,
            emptyColumnsLeft: exportConfig.emptyColumnsLeft ?? exportConfig.emptyColsLeft,
            startColumnIndex: exportConfig.startColumnIndex ?? exportConfig.startColumn
        };

        try {
            const workbook = new ExcelJS.Workbook();
            for (let index = 0; index < validTables.length; index++) {
                const { tableObject } = validTables[index];
                if (typeof console !== 'undefined') {
                    console.debug('[GridTableExport] Preparing sheet for export:', tableObject);
                }

                const perSheetConfig = {
                    ...sharedConfig,
                    sheetName: sheetNames[index] || GridTableExport.defaultSheetName
                };

                await GridTableExport.addWorksheetFromTable(
                    workbook,
                    tableObject,
                    perSheetConfig
                );
            }

            const fileBuffer = await workbook.xlsx.writeBuffer();
            if (!fileBuffer || fileBuffer.byteLength < 50) {
                 console.warn('[Debug trigger] Generated buffer seems very small or empty:', fileBuffer?.byteLength);
            }
            GridTableExport.downloadBuffer(fileBuffer, fileName);
        } catch (error) {
            console.error('Error during XLSX export process:', error);
            alert('Failed to export data. Please check the console for details.');
        }
    }
};
