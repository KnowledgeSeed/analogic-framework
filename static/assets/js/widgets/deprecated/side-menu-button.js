/* global Widget */

'use strict';
class SideMenuButtonWidget extends Widget {

    getHtml() {
        const o = this.options;
        
        return `<a class="side-menu-button-action" data-id="${o.id}" data-action="${o.action}">${o.title}</a>`;
    }
};


