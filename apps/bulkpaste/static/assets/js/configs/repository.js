/* global app */
'use strict';

const BulkPaste = {
    phases: ['Lead Ident', 'Lead Opt', 'Lead Opt Backup', 'Phase 0', 'Phase 1', 'Phase 2'],
    lockedColumn: 4,
    log: [],
    values: {},
    isEditable(row, column) {
        return column > 0 && column !== BulkPaste.lockedColumn && BulkPaste.phases[row % 6] !== 'Phase 2';
    },
    record(ctx) {
        const entry = {
            event: (ctx.getWidgetId() === 'bulkpasteGrid' ? '' : 'column-') + ctx.getEventName(),
            row: ctx.getRow(),
            column: ctx.getColumn(),
            value: (Widgets['bulkpasteGrid_' + ctx.getRow() + '_' + ctx.getColumn()] || {}).value
        };
        BulkPaste.log.push(entry);
        BulkPaste.values[entry.row + '_' + entry.column] = entry.value;
        $('#bulkpasteLog').append(`${entry.event.padEnd(16)} row ${entry.row}  col ${entry.column}  value "${entry.value}"\n`);
        return entry;
    }
};

Repository = {
    bulkpasteGrid: {
        init: {
            execute: () => {
                const rows = [];
                for (let r = 0; r < 12; ++r) {
                    const row = [];
                    for (let c = 0; c < 6; ++c) {
                        const editable = BulkPaste.isEditable(r, c), stored = BulkPaste.values[r + '_' + c];
                        row.push({
                            title: c === 0 ? (r < 6 ? 'NME ' : 'LE ') + BulkPaste.phases[r % 6] : typeof stored !== 'undefined' ? stored : '0',
                            // like a TM1 cellset ordinal; add ?noordinal=1 to the url to see paste without it
                            ...(window.location.search.includes('noordinal') ? {} : {ordinal: r * 6 + c}),
                            editable: editable,
                            cellBackgroundColor: c > 0 && !editable ? '#EEEEEE' : false
                        });
                    }
                    rows.push(row);
                }
                return rows;
            }
        },
        write: ctx => BulkPaste.record(ctx),
        paste: ctx => BulkPaste.record(ctx),
        pastelast: ctx => BulkPaste.record(ctx)
    },
    // column level handler: paste.bulkpasteGrid_<row>_<column>_bulkpasteGridText2031
    bulkpasteGridText2031: {
        paste: ctx => BulkPaste.record(ctx),
        pastelast: ctx => BulkPaste.record(ctx)
    }
};
