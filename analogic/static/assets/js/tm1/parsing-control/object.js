'use strict';

class ObjectParsingControl extends ParsingControl {

    parse() {
        const ctx = this.context, data = ctx.getLoaderResponse(),
        valueQueries = ctx.getLoaderFunction().parsingControl.query;

        let result = {}, r, i = 0;

        for (r in valueQueries) {
            result[r] = valueQueries[r](data, i, ctx);
        }

        return result;
    }
}