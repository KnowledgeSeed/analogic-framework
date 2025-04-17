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

    parseValue: (cellValue) => {
        if(cellValue == "") return {type: 'string', value: ""};
        let modifiedString = cellValue.trim().replace(',', '.');
        if (!isNaN(modifiedString)) return {type: 'number', value: parseFloat(modifiedString)};
        else return {type: 'string', value: cellValue};
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

        return headerTitlesArray.slice(0, lastNonEmptyIndex + 1);
    },

    populateHeaderCells: (worksheet, headerArray, headerRowIndex, startColIndex) => {
        if (!headerArray || headerArray.length === 0) return;

        headerArray.forEach((headerValue, index) => {
            let excelCol = index + startColIndex;
            let cell = worksheet.getCell(headerRowIndex, excelCol);
            const finalValue = headerValue !== null && headerValue !== undefined ? String(headerValue) : "";
            cell.value = finalValue;
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GridTableExport.headerFillColor } };
            cell.font = { bold: GridTableExport.headerFontBold };
            cell.protection = { locked: true };
            cell.border = GridTableExport.borderStyle;
        });
    },

    populateDataCells: (worksheet, tableData, startRowIndex, startColIndex) => {
        if (!tableData) return;

        tableData.forEach((rowData, r) => {
            if (!Array.isArray(rowData)) {
                console.warn(`[Debug populateDataCells] Row ${r} is not an array, skipping:`, rowData);
                return;
            }

            rowData.forEach((cellObj, c) => {
                let excelRow = r + startRowIndex;
                let excelCol = c + startColIndex;
                let cell = worksheet.getCell(excelRow, excelCol);

                const valueToParse = cellObj?.title ?? "";
                const isEditable = cellObj?.editable ?? false;

                const parsedObject = GridTableExport.parseValue(valueToParse);
                const finalCellValue = parsedObject.value;

                cell.value = finalCellValue;

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

    createXlsxBuffer: async (
        tableObject,
        config = {}
    ) => {

        const sheetName = config.sheetName || GridTableExport.defaultSheetName;
        const attrRowEnabled = config.attributes && Object.keys(config.attributes).length > 0;
        const attributes = config.attributes || {};

        const emptyRowsAbove = 1;
        const emptyColsLeft = 1;
        const attributeRowIndex = 1;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        let currentRowIndex = 1;

        if (attrRowEnabled) {
            // TODO: Populate attribute row here if needed
            currentRowIndex = attributeRowIndex + emptyRowsAbove + 1;
        } else {
            currentRowIndex = emptyRowsAbove + 1;
        }

        const headerTitlesArray = GridTableExport.getHeaderRowValues(tableObject?.options);
        const headerRowEnabled = headerTitlesArray && headerTitlesArray.length > 0;
        let headerRowActualIndex = 0;

        if (headerRowEnabled) {
            headerRowActualIndex = currentRowIndex;
            GridTableExport.populateHeaderCells(worksheet, headerTitlesArray, headerRowActualIndex, emptyColsLeft + 1);
            currentRowIndex++;
        }

        const tableData = tableObject?.cellData;
        GridTableExport.populateDataCells(worksheet, tableData, currentRowIndex, emptyColsLeft + 1);

        const resizeStartRow = headerRowEnabled ? headerRowActualIndex : currentRowIndex;
        if (resizeStartRow > 0 && worksheet.lastRow?.number >= resizeStartRow) {
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
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
   },

   triggerExcelExport: async (gridTableId, exportConfig = {}) => {
        let tableObject;
        try {
            tableObject = v(gridTableId);
            if (!tableObject || !tableObject.options || !tableObject.cellData) {
                 console.error(`[Debug trigger] Validation Failed: tableObject=${!!tableObject}, options=${!!tableObject?.options}, cellData=${!!tableObject?.cellData}`);
                 throw new Error("Invalid table data structure received for ID: " + gridTableId);
            }
            L("[Debug trigger] Table Object for Export:", tableObject);
        } catch (err) {
            console.error("Failed to get table data:", err);
            alert("Error: Could not retrieve data for export. Terminating. " + err);
            return;
        }

        const config = {
            sheetName: exportConfig.sheetName || GridTableExport.defaultSheetName,
            fileName: exportConfig.fileName || GridTableExport.defaultFileName,
            attributes: exportConfig.attributes || {}
        };

        try {
            const fileBuffer = await GridTableExport.createXlsxBuffer(
                tableObject,
                config
            );
            if (!fileBuffer || fileBuffer.byteLength < 50) {
                 console.warn("[Debug trigger] Generated buffer seems very small or empty:", fileBuffer?.byteLength);
            }
            GridTableExport.downloadBuffer(fileBuffer, config.fileName);
        } catch (error) {
            console.error("Error during XLSX export process:", error);
            alert("Failed to export data. Please check the console for details.");
        }
    }
};