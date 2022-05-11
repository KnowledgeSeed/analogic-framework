/* global app, Utils, Widget */

'use strict';

class DroppableWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options;
        this.value = d;
        let mainDivStyle = [];
        if (this.getWidthForSection(d).length === 0) {
            mainDivStyle = this.getGeneralStyles(d);
        } else {
            mainDivStyle = this.getMargins(d);
        }
        return `<div id="${o.id}_droppable" data-id="${o.id}" data-action="dropped" class="ks-droppable" style="${mainDivStyle.join('')}box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2), 0px 8px 12px rgba(0, 0, 0, 0.2);"></div>`;
    }

    initEventHandlers(section) {
        let instance = this;
        section.find('div').droppable({
            drop: function (event, ui) {
                $(this).data('droppedId', ui.draggable.prop('id'));
                Widget.doHandleSystemEvent($(this), event);
                if (instance.amIOnAGridTable()) {
                    Widget.doHandleGridTableSystemEvent($(this), event);
                }
            }
        });
    }

    getMainHtmlElement(o, data, visible, widgetHtmls, withState) {
        let gs = this.getWidthForSection(data);
        if (visible === false) {
            gs.push('display:none;');
        }
        return `<section ${o.margin ? 'class="wrapper"' : ''} title="${o.title || ''}" style="${gs.join('')}" id="${o.id ? o.id : Utils.getRandomId()}">${this.getHtml(widgetHtmls, this.processData(data), withState)}</section>`;
    }

}
;


