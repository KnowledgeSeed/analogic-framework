'use strict';

class MatrixParsingControl extends ParsingControl {

    parse() {
        const ctx = this.context, data = ctx.getLoaderResponse(),
        valueQueries = this.args[0];

        let i = 0, v, row = [], result = [],
            k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0,
            q = valueQueries.length;

        if (k % q !== 0) {
            L('Too many data!!');
            while (k % q !== 0) {
                --k;
            }
        }

        while (i < k) {
            row = [];
            for (v of valueQueries.query) {
                row.push(v(data, i, ctx));
            }
            i = i + valueQueries.length;
            result.push(row);
        }

        return result;
    }
}