'use strict';

class StatusBarWidget extends Widget {

    getHtml(widgets, data) {
        return `
            <div class="statusbar">
                <span>Case Name: <b>${data[0]}</b></span>
                <span>Draft Name: <b>${data[1]}</b></span>
            </div>`;
    }
}
;