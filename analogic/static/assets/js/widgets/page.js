'use strict';

class PageWidget extends Widget {

    getHtml(widgets) {
        return widgets.join('');
    }

    renderStartLoader(withLoader) {

    }

    holderStartLoader() {
        Loader.start(true);
    }

    removeLoaderHtml(withState) {
        if (withState) {
            $('.loader').remove();
        }
    }

    getHolder(id) {
        return El.body;
    }
}
;