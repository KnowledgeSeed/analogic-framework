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
        PageWidget.scaleToDesignWidth(this.designWidth);

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
        const designWidth = this.getRealValue('designWidth', d, false);
        this.designWidth = designWidth > 0 ? designWidth : false;

        return {
            title: this.getRealValue('title', d, false),
            favicon: this.getRealValue('favicon', d, false)
        };
    }

    /**
     * A page designed for a fixed width (designWidth, e.g. a 1920px Figma frame)
     * fills any window: the body is zoomed by window width / designWidth, on
     * render and on resize. A page without designWidth is shown unscaled.
     * app.designScale is the current factor (false when unscaled).
     */
    static scaleToDesignWidth(designWidth) {
        PageWidget.designWidth = designWidth;
        PageWidget.applyDesignScale();

        if (designWidth && !PageWidget.resizeListening) {
            PageWidget.resizeListening = true;
            $(window).on('resize', () => PageWidget.applyDesignScale());
        }
    }

    static applyDesignScale() {
        const designWidth = PageWidget.designWidth;
        const setScale = scale => {
            app.designScale = scale;
            El.body.css('zoom', scale ? String(scale) : '');
        };

        if (!designWidth) {
            // Only undo a zoom this set: an app's own body zoom stays as it was.
            if (app.designScale) {
                setScale(false);
            }
            return;
        }
        // Fit the whole window first; if the scaled page is still taller than
        // the window, its vertical scrollbar takes width - fit the rest
        // (clientWidth), or the page would scroll sideways too.
        setScale(window.innerWidth / designWidth);
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth < window.innerWidth) {
            setScale(clientWidth / designWidth);
        }
    }
}
;