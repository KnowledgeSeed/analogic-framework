/* global app */

'use strict';

class CommentWidget extends Widget {

    getHtml(widgets, data) {
        this.state = {};
        this.value = {};
        const o = this.options;
        return `<h2><span class="icon-comment-off"></span>Comment</h2>
            <p>${app.utils.nl2br(data.text)}</p>
            <p>
                <b>Source:</b>
                <br>
                ${app.utils.nl2br(data.source)}
            </p>
            <h6>Edited by <b>${data.editedBy}</b>, <strong>${data.editedAt}</strong></h6>
            <a data-id="${o.id}" id="ceb" class="widget-btn">EDIT</a>
            <p>
                <b>Description:</b>
                <br>
                ${data.description}
            </p>`;
    }

    initEventHandlers(section) {
        $('#ceb').on('click', (e) => {
            let a = $(e.currentTarget);
            const commentFormWidget = new CommentFormWidget({id: a.data('id')});

            app.fn.renderWidget(null, app.el.sideBarContent, commentFormWidget);

            return false;
        });
    }
}
;