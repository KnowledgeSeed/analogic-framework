'use strict';

class ObjectParsingControl extends ParsingControl {

    parse() {
        const ctx = this.context, data = ctx.getLoaderResponse(),
        valueQueries = this.args[0].query;

        let result = {}, r, i = 0;

        for (r in valueQueries) {
            result[r] = valueQueries[r](data, i, ctx);
        }

        return result;
    }
}