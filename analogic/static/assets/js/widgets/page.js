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

    render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false) {
        this.isRendering = true;
        const o = this.options;

        if (withState) {
            this.addListeners();

            return $.Deferred().resolve(PageState[o.id]);
        }
        return super.render(withState, refresh, useDefaultData = false, loadFunction = QB.loadData, previouslyLoadedData = false);
    }
}
;