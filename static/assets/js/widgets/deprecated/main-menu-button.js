/* global Widget */

'use strict';

class MainMenuButtonWidget extends Widget {
    getHtml(widgets, data) {
        const o = {...this.options, ...data};
        const html =
                `<a ${o.enabled ? '' : 'style="color:#858686;"'} ${o.url ? `href="${o.url}" target="_blank"` : o.enabled ? `data-id="${o.id}" data-action="${o.action}"` : ''}  class="main-nav-item ${o.action !== '' && o.enabled ? 'action' : ''} ">
                <div class="icon-holder" ${o.enabled ? '' : 'style="background-color:#f5f5f5;"'}>
                    <span class="${o.icon}"></span>
                </div>
                ${o.topText}<br>${o.bottomText}
            </a>`;

        return html;
    }
}
;

