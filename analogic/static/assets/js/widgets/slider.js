/* global app, Doc, Widget, noUiSlider, Utils, v */

'use strict';
class SliderWidget extends Widget {

    getHtml(widgets, d) {
        SliderWidget.slidersByIds = SliderWidget.slidersByIds || {};

        let val = this.getRealValue('value', d, [0]), i;

        val = Array.isArray(val) ? val : [val];

        for (i = 0; i < val.length; ++i) {
            val[i] = Utils.parseNumber(val[i]);
        }

        const v = {
            skin: this.getRealValue('skin', d, 'standard'),
            buttonsVisible: this.getRealValue('buttonsVisible', d, true),
            minRange: parseFloat(this.getRealValue('minRange', d, -6000)),
            maxRange: parseFloat(this.getRealValue('maxRange', d, 8000)),
            smallIncrement: this.getRealValue('smallIncrement', d, 1),
            largeIncrement: this.getRealValue('largeIncrement', d, 100),
            value: val,
            legend: this.getRealValue('legend', d),
            trackFillStartValue: this.getRealValue('trackFillStartValue', d, 0),
            ordinal: d.ordinal,
            step: this.getRealValue('step', d, 1),
            decimalPlace: this.getRealValue('decimalPlace', d, 0),
            unit: this.getRealValue('unit', d, ''),
            updateableWidgetId: this.getRealValue('updateableWidgetId', d, false),
            updateableWidgetValueHandler: this.getRealValue('updateableWidgetValueHandler', d, false),
            updateCallBack: this.getRealValue('updateCallBack', d, false),
            calculateSliderValue: this.getRealValue('calculateSliderValue', d, false),
            changedByInput: false,
            originalValue: this.getRealValue('originalValue', d, false),
            orientation: this.getRealValue('orientation', d, 'horizontal'),
            direction: this.getRealValue('direction', d, 'ltr'),
            disabled: this.getRealValue('disabled', d, false),
            queryFillColor: this.getRealValue('queryFillColor', d, false),
            css: {
                tooltip: {
                    'font-size': this.getRealValue('trackValueFontSize', d),
                    color: this.getRealValue('trackValueFontColor', d)
                },
                tooltipHover: {
                    'font-size': this.getRealValue('trackValueMagnifierLabelFontSize', d),
                    color: this.getRealValue('trackValueMagnifierLabelFontColor', d)
                }
            }
        };

        this.value = v;

        return `
<div data-id="${this.options.id}" class="ks-slider ks-slider-${v.skin}" style="${this.getGeneralStyles(d).join('')}">
    <div class="ks-slider-touch" style="display: none;">
        <div class="ks-slider-touch-inner">
            <div class="ks-slider-touch-value"></div>
            <div class="ks-slider-touch-track">
                <div class="ks-slider-touch-track-overflow"></div>
            </div>
            <div class="ks-slider-touch-steppers">
                <div class="ks-slider-touch-stepper ks-slider-touch-stepper-big-left">
                    <div class="ks-slider-touch-stepper-inner">-${v.largeIncrement}</div>
                </div>
                <div class="ks-slider-touch-stepper ks-slider-touch-stepper-small-left">
                    <div class="ks-slider-touch-stepper-inner">-${v.smallIncrement}</div>
                </div>
                <div class="ks-slider-touch-stepper ks-slider-touch-stepper-options">
                    <div class="ks-slider-touch-stepper-inner" data-btn="true">&middot;&middot;&middot;</div>
                </div>
                <div class="ks-slider-touch-stepper ks-slider-touch-stepper-small-right">
                    <div class="ks-slider-touch-stepper-inner">+${v.smallIncrement}</div>
                </div>
                <div class="ks-slider-touch-stepper ks-slider-touch-stepper-big-right">
                    <div class="ks-slider-touch-stepper-inner">+${v.largeIncrement}</div>
                </div>
            </div>
            <div class="ks-slider-touch-options-buttons">
                <div class="ks-slider-touch-options-button ks-button-cancel">Cancel</div>
                <div class="ks-slider-touch-options-button ks-button-update">OK</div>
            </div>
        </div>
    </div>

    <div class="ks-slider-inner">
        <div class="ks-slider-track">
            <div class="ks-slider-track-zero-indicator"></div>
            <div class="ks-slider-track widget"></div>
        </div>
        <div class="ks-slider-steppers" ${!v.buttonsVisible || app.isTouched ? 'style="display: none;"' : ''}>
            <div class="ks-slider-stepper ks-slider-stepper-big-left">
                <div class="ks-slider-stepper-inner noselect">-${v.largeIncrement}</div>
            </div>
            <div class="ks-slider-stepper ks-slider-stepper-small-left">
                <div class="ks-slider-stepper-inner noselect">-${v.smallIncrement}</div>
            </div>
            <div class="ks-slider-stepper ks-slider-stepper-options">
                <div class="ks-slider-stepper-inner noselect" data-btn="true">&#183;&#183;&#183;</div>
            </div>
            <div class="ks-slider-stepper ks-slider-stepper-small-right">
                <div class="ks-slider-stepper-inner noselect">+${v.smallIncrement}</div>
            </div>
            <div class="ks-slider-stepper ks-slider-stepper-big-right">
                <div class="ks-slider-stepper-inner noselect">+${v.largeIncrement}</div>
            </div>
        </div>
    </div>

    <div class="ks-slider-options">
        <div class="ks-slider-options-controls">
            <div class="ks-slider-options-label">Current Value</div>
            <div class="ks-slider-options-input">
                <input type="text" value="">
                <div class="ks-slider-options-input-label ks-label-min">
                    <div class="ks-slider-options-input-label-name">Min</div>
                    <div class="ks-slider-options-input-label-value">${v.minRange}</div>
                </div>
                <div class="ks-slider-options-input-label ks-label-max">
                    <div class="ks-slider-options-input-label-name">Max</div>
                    <div class="ks-slider-options-input-label-value">${v.maxRange}</div>
                </div>
            </div>
        </div>
        <div class="ks-slider-options-buttons">
            <div class="ks-slider-options-button ks-button-cancel">Cancel</div>
            <div class="ks-slider-options-button ks-button-update">Update</div>
        </div>
    </div>
    ${this.createLegendHmtml()}
</div>`;
    }

    initEventHandlers() {
        const section = this.getSection(), id = this.id, w = this.value, isTouchMode = app.isTouched;

        this.createSlider(section, id);

        if (w.disabled) {
            return;
        }

        section.on('mouseover.slider', '.ks-slider', e => {
            e = $(Utils.stopEvent(e).currentTarget);

            if (isTouchMode || e.attr('disabled')) {
                return;
            }

            this.handles.removeClass('off');
            this.tooltip.removeClass('noUi-tooltip').addClass('noUi-tooltipHover').css(this.slider.css.tooltipHover);
        }).on('mouseleave.slider', '.ks-slider', e => {
            Utils.stopEvent(e);

            this.hideToolTips();
        }).on(app.clickEvent, '.ks-slider-stepper-inner,.ks-slider-touch-stepper-inner', e => {
            e = $(Utils.stopEvent(e).currentTarget);

            if (e.data('btn')) {
                this.openPopup();

                return false;
            }

            const step = parseFloat(e.html());

            if (isTouchMode) {
                this.setRulerValue(parseFloat(this.touchValue.html()) + step);
            } else {
                this.slider.set(this.slider.get(true) + step);
            }
        }).on(app.clickEvent, '.ks-slider-options-button,.ks-slider-touch-options-button', e => {
            e = $(Utils.stopEvent(e).currentTarget);

            let v, p = this.sliderDiv.removeClass('Highlighted').children('.ks-slider-touch,.ks-slider-options');

            if (e.hasClass('ks-button-update')) {
                if (isTouchMode) {
                    e = p.find('input');

                    if (e.is(':visible')) {
                        v = e.val();
                    } else {
                        v = this.touchValue.html();
                    }
                } else {
                    v = p.find('input').val();
                }

                this.slider.set(v);
            }

            p.hide();

            if (!isTouchMode) {
                this.enableSlider();
            }

            Utils.backdrop.hide();

            this.sliderDiv.trigger('change');
        }).on(app.clickEvent, '.ks-slider-inner', e => {
            Utils.stopEvent(e);

            if (!isTouchMode || this.sliderDiv.hasClass('Highlighted')) {
                return;
            }

            this.sliderDiv.addClass('Highlighted');
            this.touch.show();

            this.setRulerValue(this.slider.get());
            this.buttons.show();

            Utils.backdrop.show();
        }).on('keydown', '.ks-slider-options input', e => {
            if (13 === e.which) {
                this.optionsDiv.find('.ks-button-update').trigger('click');
            } else if (27 === e.which) {
                this.optionsDiv.find('.ks-button-cancel').trigger('click');
            }
        });

        if (v('updateableWidgetId', w)) {
            let updateableInput = $('#' + w.updateableWidgetId).find('input');

            updateableInput.off('change').on('change', () => {
                let updateableInputValue = Utils.parseNumber(Utils.replaceDecimal(updateableInput.val()));

                v(id).value.changedByInput = true;

                if (w.calculateSliderValue) {
                    this.slider.set(w.calculateSliderValue(updateableInputValue));
                } else {
                    this.slider.set(updateableInputValue);
                }
            });
        }
    }

    createSlider(section, id) {
        const isTouchMode = app.isTouched, d = this.value, s = SliderWidget.slidersByIds[id], ordinal = d.ordinal;
        const css = d.css, tooltipFontSize = css.tooltip['font-size'], step = d.step, decimalPlace = d.decimalPlace;

        this.sliderDiv = section.children('.ks-slider');
        const inner = this.sliderDiv.children('.ks-slider-inner');
        this.widgetDiv = inner.children('.ks-slider-track').children('.widget');
        this.buttons = inner.children('.ks-slider-steppers').children('.ks-slider-stepper');
        this.optionsDiv = this.sliderDiv.children('.ks-slider-options');
        this.touch = this.sliderDiv.children('.ks-slider-touch');
        const touchInner = this.touch.children('.ks-slider-touch-inner');
        this.touchTrack = touchInner.children('.ks-slider-touch-track');
        this.touchTrackOverflow = this.touchTrack.children();
        this.touchValue = touchInner.children('.ks-slider-touch-value');

        if (s) {
            s.destroy();

            this.widgetDiv.find('.noUi-base').remove();
        }

        const trackColor = this.widgetDiv.css('background-color'), trackFillStartValue = d.trackFillStartValue;
        let trackFillColor;

        this.slider = noUiSlider.create(this.widgetDiv[0], {
            start: d.value,
            connect: 1 === d.value.length ? [true, false] : false,
            direction: d.direction,
            orientation: d.orientation,
            behaviour: 'unconstrained-tap',
            //behaviour: isTouchMode ? 'none' : 'tap',
            step: step,
            tooltips: Array(d.value.length).fill({
                to: v => this.format(v) + ' ' + d.unit,
                from: v => this.format(v)
            }),
            range: {
                min: d.minRange,
                max: d.maxRange
            },
            format: {
                to: v => decimalPlace ? parseFloat(this.format(v)) : Math.round(v),
                from: v => decimalPlace ? parseFloat(this.format(v)) : Math.round(v)
            }
        });

        this.handles = this.widgetDiv.find('.noUi-handle');
        this.tooltip = this.handles.children('.noUi-tooltip');

        if (d.disabled) {
            this.widgetDiv.find('.noUi-origin').attr('disabled', true);
        }

        if (tooltipFontSize) {
            css.tooltip.top = 2 - tooltipFontSize;
            css.tooltipHover.top = '';
        }

        if ((d.legend || []).length) {
            this.handles.each((i, h) => d.legend[i] && $(h).css({cssText: 'background-color:' + d.legend[i].color + ' !important'}));

            section.on(app.clickEvent, '.ks-legend-item', e => this.handles.eq(e.currentTarget.dataset.id).toggle());
        }

        this.slider.css = css;

        SliderWidget.slidersByIds[id] = this.slider;

        const min = Math.abs(d.minRange), max = Math.abs(d.maxRange), width = this.widgetDiv.width(), totalRange = min + max;
        const offset = width * (Math.abs(min - max)) / totalRange / 2;

        this.sliderDiv.find('.ks-slider-track-zero-indicator').css('left', width / 2 + offset);

        const trackFillWidth = width * (trackFillStartValue - d.minRange) / totalRange, noUiConnect = this.widgetDiv.find('.noUi-connect');
        const trackFill = $('<div class="ks-slider-track-fill" style="width: ' + trackFillWidth + 'px;"><\/div>');

        this.widgetDiv.find('.noUi-connects').append(trackFill).promise().then(() => {
            trackFillColor = trackFill.css('background-color');

            let updateableInput, vv, ww;

            if (d.updateableWidgetId) {
                updateableInput = $('#' + d.updateableWidgetId).find('input');
            }

            this.slider.on('update', positions => {
                d.queryFillColor ? adjustTrackFillQueryColor(positions[0]) : adjustTrackFill(positions[0]);

                if (updateableInput && !d.changedByInput) {
                    if (d.updateableWidgetValueHandler) {
                        vv = d.originalValue !== false ? d.originalValue : d.updateableWidgetValueHandler(positions[0]);
                    } else {
                        vv = (d.originalValue !== false ? d.originalValue : positions[0]) + ' ' + d.unit;
                    }

                    ww = Utils.replaceDecimal(vv);

                    updateableInput.val(ww);

                    if (v(d.updateableWidgetId)) {
                        v(d.updateableWidgetId).value = ww;
                    }
                }

                if (d.updateCallBack) {
                    d.updateCallBack(positions[0], id);
                }

                d.changedByInput = false;
                d.originalValue = false;
            });
        });

        this.hideToolTips();
        this.tooltip.css(css.tooltip);

        this.slider.on('set', e => {
            const val = this.slider.get();
            let ss = $('#' + id).data({action: 'slide', id: id, ordinal: ordinal, value: val});

            Widget.doHandleSystemEvent(ss, e, true);

            if (this.amIOnAGridTable()) {
                Widget.doHandleGridTableSystemEvent(ss, e);
            }

            d.value = val;
        });

        if (isTouchMode) {
            this.disableSlider();

            this.createRuler();
        }

        function adjustTrackFillQueryColor(sliderNewVal) {
            if (sliderNewVal > trackFillStartValue) {
                trackFill.css({background: trackFill.css('background-color'), 'z-index': 1});
                noUiConnect.css('background', trackFill.css('background-color'));
            } else {
                trackFill.css({background: '', 'z-index': 0});
                noUiConnect.css('background', trackColor);
            }
        }

        function adjustTrackFill(sliderNewVal) {
            if (sliderNewVal > trackFillStartValue) {
                trackFill.css({background: trackColor, 'z-index': 1});
                noUiConnect.css('background', trackFillColor);
            } else {
                trackFill.css({background: '', 'z-index': 0});
                noUiConnect.css('background', trackColor);
            }
        }
    }

    createLegendHmtml() {
        let v = this.value, h = '<div class="ks-legend"><div class="ks-legend-inner">', d, i = -1;

        if (!(v.legend || []).length) {
            return '';
        }

        for (d of v.legend) {
            h += '<div data-id="' + (++i) + '" style="background-color:' + d.color + ';" class="ks-legend-item"><div class="ks-legend-item-inner"><div style="color: #000;" class="ks-legend-icon"></div><div style="color: #000;" class="ks-legend-label">' + d.name + '</div></div></div>';
        }

        h += '</div></div>';

        return h;
    }

    createRuler() {
        let v = this.value, i, h = [], t = this.touchTrack, p = t.prev(), o, minRange = v.minRange - 100, maxRange = v.maxRange + 100;

        t.before('<img src="' + app.assetsUrl + '/images/triangle.png" class="ks-slider-triangle" width="16" height="8"><\/div>');

        let rulerNumLabelOffset = 5;

        for (i = maxRange; i >= minRange; --i) {
            if (0 === i % 10) {
                h.push('<div class="ks-tick ks-medium"><\/div>');
            } else if (0 === i % 5) {
                if (0 === (i + rulerNumLabelOffset) % 50) {
                    h.push('<div class="ks-tick ks-big"><span>' + (i + rulerNumLabelOffset) + '<\/span><\/div>');
                } else {
                    h.push('<div class="ks-tick ks-big"><\/div>');
                }
            } else {
                h.push('<div class="ks-tick ks-small"><\/div>');
            }
        }

        o = this.touchTrackOverflow.html(h.reverse().join('')).css('width', 3 * (maxRange - minRange)).data({
            'min-range': minRange,
            'max-range': maxRange
        });

        t.on('scroll', () => this.rulerScrolled(o, p, t, h, minRange, maxRange));
    }

    rulerScrolled(o, p, s, v, minRange, maxRange) {
        const w = s.outerWidth();

        v = parseFloat(minRange + (-s.scrollLeft() - w / 2 + 2) / -3);

        if (v < minRange + 100) {
            s.scrollLeft(300 + 2 - w / 2);
            p.html(minRange + 100);
        } else if (v > maxRange - 100) {
            s.scrollLeft(o.width() + 2 - w / 2 - 300);
            p.html(maxRange - 100);
        } else {
            p.html(this.format(v));
        }
    }

    format(v) {
        return Number.parseFloat(v).toFixed(this.value.decimalPlace);
    }

    reset() {
        delete this.value;
    }

    openPopup() {
        if (app.isTouched) {
            this.touch.hide();
        }

        this.disableSlider();

        this.sliderDiv.addClass('Highlighted');

        const e = this.optionsDiv.find('input').val(this.slider.get());

        this.optionsDiv.show().promise().done(() => e.focus());

        Utils.backdrop.show();
    }

    setRulerValue(value) {
        let t = this.touchTrack, p = this.touchTrackOverflow, min, max, offset, size;

        min = p.data('min-range');
        max = p.data('max-range');

        if (value < min + 100) {
            value = min + 100;
        } else if (value > max - 100) {
            value = max - 100;
        }

        size = t.outerWidth();
        offset = (size / 2) + (3 * (min - value)) - 2;

        t.scrollLeft(-offset).promise().then(() => this.touchValue.html(this.format(value)));
    }

    disableSlider() {
        this.sliderDiv.attr('disabled', true);
        this.widgetDiv.attr('disabled', true);
        this.hideToolTips();
    }

    enableSlider() {
        this.buttons.show();
        this.sliderDiv.attr('disabled', false);
        this.widgetDiv.attr('disabled', false);
    }

    hideToolTips() {
        this.handles.addClass('off');
        this.tooltip.removeClass('noUi-tooltipHover').addClass('noUi-tooltip').css(this.slider.css.tooltip);
    }

}
;