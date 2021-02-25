'use strict';

class PageWidget extends Widget {

    getHtml(widgets) {
        return widgets.join('');
    }
}
;