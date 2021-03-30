'use strict';

class MainContentWidget extends Widget {

    getHtml(widgets) {
        return `<div class="main-content">${widgets.join('')}</div>`;
    }
}
;