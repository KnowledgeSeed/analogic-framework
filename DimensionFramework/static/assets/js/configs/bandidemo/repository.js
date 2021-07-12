/* global app, Utils*/

'use strict';

app.repository = {
    bandiDemoHorizontalTable: {
        initCondition: (db) => {
            return true;
        },
        initDefault: (db) => {
            return [];
        },
        init:
        {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            body: (db) => `{"MDX":"
                         SELECT
                            {[Demo Measure].[Demo Measure].Members}
                           ON COLUMNS ,
                            {[Demo Products].[Demo Products].Members}
                           ON ROWS
                         FROM [Demo Cube 2]
                         WHERE
                           (
                            [Demo Company].[Demo Company].[Company One],
                            [Demo Time].[Demo Time].[2021]
                           )
                  "}`
            ,
            parsingControl: {
                type: 'matrix',
                length: 3,
                query: [
                    (r, x) => {
                        return {value: r.Cells[x].FormattedValue};
                    }, (r, x) => {
                        return {value: r.Cells[x + 1].FormattedValue};
                    }, (r, x) => {
                        return {value: r.Cells[x + 2].FormattedValue};
                    }
                ]
            }
        }
    }
};