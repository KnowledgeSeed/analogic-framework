'use strict';

class ListParsingControl extends ParsingControl {

    parse() {
        const ctx = this.context, data = ctx.getLoaderResponse(),
        valueQueries = this.args[0];

        let i, result = [],
            k = data.count ? data.count : data.Cells ? data.Cells.length : data.value ? data.value.length : 0;

        for (i = 0; i < k; ++i) {
            result[i] = valueQueries.query(data, i, ctx);
        }

        return result;
    }
}