'use strict';

class SmallHeaderWidget extends Widget {

    getHtml() {
        const o = this.options;

        return `
<header class="small-header ${o.noStyle ? 'no-style' : ''}">
    <div class="wrapper">
        <div class="row">
            <div class="col"><h1>${o.title}</h1></div>
        </div>
    </div>
</header>`;
    }
}
;