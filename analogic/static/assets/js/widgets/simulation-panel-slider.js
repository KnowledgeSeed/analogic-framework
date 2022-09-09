/* global app, noUiSlider, Utils, Widget */

'use strict';

class SimulationPanelSliderWidget extends Widget {

    getHtml() {
        const o = this.options, unit = o.unit || '', id = Utils.getRandomId();
        const min = null === o.minValue ? 0 : o.minValue;
        const max = null === o.maxValue ? 0 : o.maxValue;
        const delta = null === o.currentValue ? 0 : o.currentValue;

        return `
<div class="widget-variable-row-value-slider has-center">
    <div class="widget-variable-row-value value-left">${min + unit}</div>
    <div id="${id}" class="sps" data-parent_id="${o.parentWidgetId || ''}" data-min="${min}" data-max="${max}" data-delta="${delta}" data-unit="${unit}" data-ordinal="${o.ordinal}"></div>
    <div class="widget-variable-row-value value-right">${max + unit}</div>
</div>`;
    }

    initEventHandlers() {
        SimulationPanelSliderWidget.createSlider(this.getSection().find('.sps'));
    }

    static createSlider(sliderHolder) {
        const id = sliderHolder.prop('id'), parentWidgetId = sliderHolder.data('parent_id') || null, ordinal = sliderHolder.data('ordinal');
        const delta = sliderHolder.data('delta'), unit = sliderHolder.data('unit'), min = sliderHolder.data('min'), max = sliderHolder.data('max');

        const slider = noUiSlider.create(sliderHolder[0], {
            step: 1,
            start: delta,
            direction: 'ltr',
            orientation: 'horizontal',
            behaviour: 'tap-drag',
            range: {
                min: min,
                max: max
            },
            tooltips: {
                to: v => Math.round(v) + ' ' + unit,
                from: v => Math.round(v).toString().replace(' ' + unit, '')
            }
        });

        slider.on('set', () => {
            const v = slider.get(), e = $('<div>').data({action: 'slide', id: parentWidgetId, ordinal: ordinal, value: v});

            Widget.doHandleSystemEvent(e, null, true);

            sliderHolder.data('delta', v).attr('data-delta', v);
        });

        return slider;
    }
}
;