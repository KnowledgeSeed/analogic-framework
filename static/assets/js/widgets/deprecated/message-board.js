'use strict';

class MessageBoardWidget extends Widget {

    getHtml(widgets, message) {
        const o = this.options, e = [], t = [];

        if (o.titleVisible) {
            t.push('<h3>', message.title, '<\/h3>');
        }

        e.push(`<div class="row"> <div class="col"><div class="message-item">${t.join('')}<h6>${message.dateTime}</h6><p>${message.text}</p></div></div></div>`);

        return e.join('');
    }
}
;