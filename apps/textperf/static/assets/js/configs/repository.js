/* global app */
'use strict';
Repository = {
    textperfGrid: {
        init: {
            execute: () => {
                const g = TextPerf.generation, result = [];
                for (let i = 0; i < TextPerf.rows; ++i) {
                    const row = [];
                    for (let j = 0; j < TextPerf.cols; ++j) {
                        const kind = TextPerf.kind(j), cell = {title: (i * 1000 + j + g) + ',00'};
                        if (kind === 'label') {
                            cell.title = 'Row ' + i + (g ? ' (g' + g + ')' : '');
                        } else if (kind === 'performable') {
                            cell.icon = 'icon-dots-vertical';
                        } else if (kind === 'titleBody') {
                            cell.body = 'b' + i;
                        }
                        row.push(cell);
                    }
                    result.push(row);
                }
                return result;
            }
        }
    },
    textperfDynamicText: {
        init: {
            execute: () => {
                const on = TextPerf.generation % 2 === 1;
                return {
                    title: 'Dynamic g' + TextPerf.generation,
                    icon: on ? 'icon-copy' : false,
                    body: on ? 'dynamic body' : false,
                    editable: on
                };
            }
        }
    }
};
