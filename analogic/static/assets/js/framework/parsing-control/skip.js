'use strict';

class SkipParsingControl extends ParsingControl{

    parse() {
        return this.context.getLoaderResponse();
    }
}