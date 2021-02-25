/* global Widget */

'use strict';

class HeaderWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;
        const v = {
            skin: this.getRealValue('skin', d, 'standard'),
            title: this.getRealValue('title', d, false),
            icon: this.getRealValue('icon', d, false)
        };

        let mainDivStyle = this.getGeneralStyles(d);
        let icon = v.icon ? (`<div class="title-icon main-back" style="cursor: pointer;" data-action="back" data-id="${o.id}"><span class="${v.icon}"></span></div>`) : '';

        const html =
                `<header>
                    <div class="ks-header ks-header-${v.skin}" style="${mainDivStyle.join('')}">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <h1>${icon}${v.title}</h1>
                            </div>
                            <div class="col-md-6">
                                ${widgets.join('')}
                            </div>
                        </div>
                    </div>
                </header>`;

        return html;
    }

    initEventHandlers(section) {
        Widget.handleSystemEvent(section, 'click', '.main-back');
    }
}
;