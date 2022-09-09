/* global app, El, SimulationPanelSliderWidget, Widget */

'use strict';
class SimulationPanelWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;

        let h = ['<div class="row"><div class="col"><div class="form-row widget-variable-form-row"><label>', o.title, '<\/label>'], d;

        this.value = {};

        for (d of data) {
            h.push(this.getOneSimulationPanelHtml(d[0]));
        }

        h.push('<\/div><\/div><\/div>');

        if (o.addEnabled) {
            h.push('<div class="row margin-bottom-row"><div class="col"><a data-action="add" data-id="' + o.id + '" class="widget-btn btn-add"><span class="icon-add"></span></a><\/div><\/div>');
        }

        return h.join('');
    }

    initEventHandlers() {
        const section = this.getSection(), sliderHolders = section.find('.sps').empty(), o = this.options;

        for (let i = 0; i < sliderHolders.length; ++i) {
            SimulationPanelSliderWidget.createSlider(sliderHolders.eq(i));
        }

        section.on('click', '.icon-edit', e => {
            this.doEvent($(e.target));
        });

        section.find('.icon-trash-fill').on('click', e => {
            const w = $(e.currentTarget), p = w.parent(), t = [];

            t.push('<div class="row"><div class="col-12"><div class="row"><div class="col-12"><h4 style="margin-top: 20px;margin-bottom: 20px;color: #000;font-size: 15px;padding-left:10px;">', o.deleteMessage ? o.deleteMessage : 'Are you sure?', '<\/h4><\/div><\/div><\/div><\/div>');
            t.push('<div class="row"><div class="col-12"><div class="row">');
            t.push('<div class="col-6"><a id="deleteOk" class="widget-btn button-widget">Delete<\/a><\/div>');
            t.push('<div class="col-6"><a id="deleteCancel" style="text-align: center;display:block;" class="widget-link-cancel button-widget-cancel">CANCEL<\/a><\/div>');
            t.push('<\/div><\/div><\/div>');

            El.body.prepend(`<div id="horizontalpopup" style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;z-index: 8;"></div>`);

            p.append(`<div class="widget-table-row-edit-menu" style="right:40px;">${t.join('')}</div>`).promise().then(() => {
                let c = p.find('.widget-table-row-edit-menu'), g = $('#horizontalpopup');

                g.on('click', () => {
                    g.remove();
                    c.remove();
                });

                $('#deleteOk').on('click', () => {
                    this.doEvent(w);
                    g.remove();
                    c.remove();
                });

                $('#deleteCancel').on('click', () => {
                    g.remove();
                    c.remove();
                });
            });
        });

        section.on('click', '.btn-add', e => {
            Widget.doHandleSystemEvent($(e.currentTarget), e, true);
        });
    }

    doEvent(e) {
        const row = e.closest('.row'), panelBlocks = row.children().slice(0, -1);
        const action = e.hasClass('icon-edit') ? 'edit' : 'delete';
        const sliderValue = row.find('.sps')[0].noUiSlider.get();
        const data = {action: action, id: this.options.id, ordinal: row.data('ordinal'), value: sliderValue};

        let b, label, i;

        for (i = 0; i < panelBlocks.length; ++i) {
            b = panelBlocks.eq(i);
            label = b.find('h4').html().toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '');
            if (label) {
                data[label] = b.find('h5').html() || '';
            }
        }

        Widget.doHandleSystemEvent($('<div>').data(data), null, true);
    }

    getOneSimulationPanelHtml(d) {
        const cols = d.cols || [], o = this.options;

        d.parentWidgetId = o.id;

        return `
<div class="widget-variable-row">
    <div class="row align-items-center" data-ordinal="${d.ordinal}">
        <div class="col-2">${this.getPanelBlockHtml(cols[0] || {})}</div>
        <div class="col-2">${this.getPanelBlockHtml(cols[1] || {})}</div>
        <div class="col-1">${this.getPanelBlockHtml(cols[2] || {}, true)}</div>
        <div class="col-7">
            <div class="widget-variable-row-edit-holder">
                ${o.editEnabled ? '<span class="icon-edit"><\/span>' : ''}
                ${o.deleteEnabled ? '<span class="icon-trash-fill"><\/span>' : ''}
            </div>
            ${(new SimulationPanelSliderWidget(d)).getHtml()}
        </div>
    </div>
</div>`;
    }

    getPanelBlockHtml(col = {}, withRightBorder = false) {
        return col.value ? `<div title="${col.value}" class="widget-variable-row-data-col ${withRightBorder ? 'border-right' : ''}"><h4>${col.label}</h4><h5 class="ellipsis">${col.value}</h5></div>` : `<h4 title="${col.label}" class="widget-variable-row-global-title ellipsis">${col.label}</h4>`;
    }
}
;