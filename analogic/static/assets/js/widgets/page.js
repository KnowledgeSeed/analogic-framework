'use strict';

class PageWidget extends Widget {

    getHtml(widgets, d) {
        const params = this.getParameters(d);
        this.title = params.title;
        this.favicon = params.favicon;

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

    afterRendered() {
        if (this.title) {
            Utils.changePageTitle(this.title);
        }

        if (this.favicon) {
            Utils.changePageFavicon(this.favicon);
        }

        Extensions.pageRender.forEach(ext => ext.afterPageRendered());
    }

    reRenderWidget(withState = false, withLoader = true, previouslyLoadedData = false) {
        return super.reRenderWidget(withState, withLoader, previouslyLoadedData).then(() => this.afterRendered());
    }

    renderWidget(withState = false, withLoader = true, previouslyLoadedData = false) {
        return super.renderWidget(withState, withLoader, previouslyLoadedData).then(() => this.afterRendered());
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

    getParameters(d) {
        return {
            title: this.getRealValue('title', d, false),
            favicon: this.getRealValue('favicon', d, false)
        };
    }
}
;