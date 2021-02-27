/* global app, El, Render, Utils, Widget */

'use strict';

class CommentFormWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;

        this.state = {};
        this.value = {};

        return `
<h2><span class="icon-comment-off"></span>Comment</h2>
<textarea class="widget-input comment-textarea">${data.text || ''}</textarea>
<p><b>Source:</b><br><textarea class="widget-input source-textarea">${data.source || ''}</textarea></p>
<div class="row">
    <div id="changeCommentBtn" class="col-5"><a data-id="${o.id}" data-action="save" class="widget-btn">${data.text || data.source ? 'CHANGE' : 'SAVE'}</a></div>
    <div id="cancelCommentBtn" class="col-5"><a data-id="${o.id}" class="widget-link-cancel">CANCEL</a></div>
</div>
<p><b>Description:</b><br>${data.description}</p>`;
    }

    initEventHandlers() {
        $('#changeCommentBtn').on('click', e => {
            let a = $(e.currentTarget).find('a'), s = a.closest('section');

            a.data('text', Utils.escapeText(s.find('.comment-textarea').val()));
            a.data('source', s.find('.source-textarea').val());
            a.data('editedAt', Utils.getFormattedDate(new Date(), ':', true));

            Widget.doHandleSystemEvent(a, e);

            return false;
        });

        $('#cancelCommentBtn').on('click', e => {
            const commentWidget = new CommentWidget({id: $(e.currentTarget).find('a').data('id')});

            Render.renderWidget(null, El.sideBarContent, commentWidget);

            return false;
        });
    }
}
;