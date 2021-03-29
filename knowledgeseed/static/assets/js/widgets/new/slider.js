/* global app, Doc, Widget, noUiSlider, Utils */

'use strict';

class SliderWidget extends Widget {

    getHtml(widgets, d) {
        SliderWidget.slidersByIds = SliderWidget.slidersByIds || {};

        const v = {
            skin: this.getRealValue('skin', d, 'standard'),
            buttonsVisible: this.getRealValue('buttonsVisible', d, true),
            minRange: parseInt(this.getRealValue('minRange', d, -6000)),
            maxRange: parseInt(this.getRealValue('maxRange', d, 8000)),
            smallIncrement: this.getRealValue('smallIncrement', d, 1),
            largeIncrement: this.getRealValue('largeIncrement', d, 100),
            value: this.getRealValue('value', d, 0),
            trackFillStartValue: this.getRealValue('trackFillStartValue', d, 0),
            ordinal: d.ordinal,
            valueDivider: this.getRealValue('valueDivider', d, 1),
            unit: this.getRealValue('unit', d, ''),
            css: {
                tooltip: {'font-size': this.getRealValue('trackValueFontSize', d), color: this.getRealValue('trackValueFontColor', d)},
                tooltipHover: {'font-size': this.getRealValue('trackValueMagnifierLabelFontSize', d), color: this.getRealValue('trackValueMagnifierLabelFontColor', d)}
            }
        };

        v.value = Utils.parseNumber(v.value); //temp!!!!!!

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
</div>`;
    }

    initEventHandlers(section) {
        this.createSlider(section);

        if (!SliderWidget.isDocEventsHaveBeenBound) {
            SliderWidget.initSliderDocEvents();

            SliderWidget.isDocEventsHaveBeenBound = true;
        }
    }

    createSlider(section) {
        const id = section.prop('id'), isTouchMode = app.isTouched, sliderDiv = section.find('.ks-slider'), d = this.value, s = SliderWidget.slidersByIds[id];
        const widgetDiv = SliderWidget.getWidgetDiv(sliderDiv), ordinal = d.ordinal, css = d.css, tooltipFontSize = css.tooltip['font-size'];

        if (s) {
            s.destroy();

            widgetDiv.find('.noUi-base').remove();
        }

        const trackColor = widgetDiv.css('background-color'), trackFillStartValue = d.trackFillStartValue;
        let trackFillColor;

        const slider = noUiSlider.create(widgetDiv[0], {
            start: d.value,
            connect: [true, false],
            direction: 'ltr',
            orientation: 'horizontal',
            behaviour: isTouchMode ? 'none' : 'tap',
            step: 1,
            tooltips: {
                to: v => Math.round(v) + ' ' + d.unit,
                from: v => Math.round(v).toString().replace(' ' + d.unit, '')
            },
            range: {
                min: d.minRange,
                max: d.maxRange
            },
            format: {
                to: v => Math.round(v),
                from: v => Math.round(v)
            }
        });

        if (tooltipFontSize) {
            css.tooltip.top = 2 - tooltipFontSize;
            css.tooltipHover.top = '';
        }

        slider.css = css;

        SliderWidget.slidersByIds[id] = slider;

        const min = Math.abs(d.minRange), max = Math.abs(d.maxRange), width = widgetDiv.width(), totalRange = min + max;
        const offset = width * (min - max) / totalRange / 2;

        sliderDiv.find('.ks-slider-track-zero-indicator').css('left', width / 2 + offset);

        const trackFillWidth = width * (trackFillStartValue - d.minRange) / totalRange, noUiConnect = widgetDiv.find('.noUi-connect');
        const trackFill = $('<div class="ks-slider-track-fill" style="width: ' + trackFillWidth + 'px;"><\/div>');

        widgetDiv.find('.noUi-connects').append(trackFill).promise().then(() => {
            trackFillColor = trackFill.css('background-color');

            slider.on('update', (positions) => {
                adjustTrackFill(positions[0]);
            });
        });

        SliderWidget.hideToolTips(sliderDiv);
        sliderDiv.find('.noUi-tooltip').css(css.tooltip);

        slider.on('set', () => {
            const v = slider.get(), e = $('<div\/>').data({action: 'slide', id: id, ordinal: ordinal, value: v});

            Widget.doHandleSystemEvent(e, null, true);

            d.value = v;
        });

        if (isTouchMode) {
            SliderWidget.disableSlider(sliderDiv);

            this.createRuler(sliderDiv, d.minRange, d.maxRange);
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

    static initSliderDocEvents() {
        const isTouchMode = app.isTouched;

        Doc.on('mouseover.slider', '.ks-slider', e => {
            e = $(Utils.stopEvent(e).currentTarget);

            if (isTouchMode || e.attr('disabled')) {
                return;
            }

            const c = SliderWidget.getSlider(e).css;

            e.find('.noUi-handle').removeClass('off');
            e.find('.noUi-tooltip').removeClass('noUi-tooltip').addClass('noUi-tooltipHover').css(c.tooltipHover);
        }).on('mouseleave.slider', '.ks-slider', e => {
            SliderWidget.hideToolTips($(Utils.stopEvent(e).currentTarget));
        }).on(app.clickEvent, '.ks-slider-stepper-inner,.ks-slider-touch-stepper-inner', e => {
            e = $(Utils.stopEvent(e).currentTarget);

            const sliderDiv = SliderWidget.getSliderDiv(e);

            if (e.data('btn')) {
                openPopup(sliderDiv);

                return false;
            }

            const slider = SliderWidget.getSlider(sliderDiv), step = parseInt(e.html());

            if (isTouchMode) {
                SliderWidget.setRulerValue(sliderDiv, parseInt(sliderDiv.find('.ks-slider-touch-value').html()) + step);
            } else {
                slider.set(slider.get() + step);
            }
        }).on(app.clickEvent, '.ks-slider-options-button,.ks-slider-touch-options-button', e => {
            e = $(Utils.stopEvent(e).currentTarget);

            let sliderDiv = SliderWidget.getSliderDiv(e), v, p = sliderDiv.removeClass('Highlighted').find('.ks-slider-touch,.ks-slider-options');

            if (e.hasClass('ks-button-update')) {
                if (isTouchMode) {
                    e = p.find('input');
                    if (e.is(':visible')) {
                        v = e.val();
                    } else {
                        v = p.find('.ks-slider-touch-value').html();
                    }
                } else {
                    v = p.find('input').val();
                }

                SliderWidget.getSlider(sliderDiv).set(v);
            }

            p.hide();

            if (!isTouchMode) {
                SliderWidget.enableSlider(sliderDiv);
            }

            Utils.backdrop.hide();

            sliderDiv.trigger('change');
        }).on(app.clickEvent, '.ks-slider-inner', e => {
            const sliderDiv = $(Utils.stopEvent(e).currentTarget).parent();

            if (!isTouchMode || sliderDiv.hasClass('Highlighted')) {
                return;
            }

            sliderDiv.addClass('Highlighted').find('.ks-slider-touch').show();

            SliderWidget.setRulerValue(sliderDiv, SliderWidget.getSlider(sliderDiv).get());
            SliderWidget.getSliderButtons(sliderDiv).show();

            Utils.backdrop.show();
        }).on('keydown', '.ks-slider-options input', e => {
            const p = $(e.currentTarget).closest('.ks-slider-options');

            if (13 === e.which) {
                p.find('.ks-button-update').trigger('click');
            } else if (27 === e.which) {
                p.find('.ks-button-cancel').trigger('click');
            }
        });

        function openPopup(sliderDiv) {
            const popup = sliderDiv.find('.ks-slider-options');

            if (isTouchMode) {
                sliderDiv.find('.ks-slider-touch').hide();
            }

            SliderWidget.disableSlider(sliderDiv.addClass('Highlighted'));

            const e = popup.find('input').val(SliderWidget.getSlider(sliderDiv).get());

            popup.show().promise().done(() => e.focus());

            Utils.backdrop.show();
        }
    }

    createRuler(sliderDiv, minRange, maxRange) {
        let i, v = [], s = sliderDiv.find('.ks-slider-touch-track'), p = s.prev(), o;

        minRange -= 100;
        maxRange += 100;

        s.before('<img src="' + app.assetsUrl + '/images/triangle.png" class="ks-slider-triangle" width="16" height="8"><\/div>');

        let rulerNumLabelOffset = 5;

        for (i = maxRange; i >= minRange; --i) {
            if (0 === i % 10) {
                v.push('<div class="ks-tick ks-medium"><\/div>');
            } else if (0 === i % 5) {
                if (0 === (i + rulerNumLabelOffset) % 50) {
                    v.push('<div class="ks-tick ks-big"><span>' + (i + rulerNumLabelOffset) + '<\/span><\/div>');
                } else {
                    v.push('<div class="ks-tick ks-big"><\/div>');
                }
            } else {
                v.push('<div class="ks-tick ks-small"><\/div>');
            }
        }

        o = sliderDiv.find('.ks-slider-touch-track-overflow').html(v.reverse().join('')).css('width', 3 * (maxRange - minRange)).data({'min-range': minRange, 'max-range': maxRange});

        s.on('scroll', rulerScrolled);

        function rulerScrolled() {
            const w = s.outerWidth();

            v = Math.round(minRange + (-s.scrollLeft() - w / 2 + 2) / -3);

            if (v < minRange + 100) {
                s.scrollLeft(300 + 2 - w / 2);
                p.html(minRange + 100);
            } else if (v > maxRange - 100) {
                s.scrollLeft(o.width() + 2 - w / 2 - 300);
                p.html(maxRange - 100);
            } else {
                p.html(v);
            }
        }
    }

    static setRulerValue(sliderDiv, value) {
        let s = sliderDiv.find('.ks-slider-touch-track'), p = sliderDiv.find('.ks-slider-touch-track-overflow'), min, max, offset, size;

        min = p.data('min-range');
        max = p.data('max-range');

        if (value < min + 100) {
            value = min + 100;
        } else if (value > max - 100) {
            value = max - 100;
        }

        size = s.outerWidth();
        offset = (size / 2) + (3 * (min - value)) - 2;

        s.scrollLeft(-offset);

        sliderDiv.find('.ks-slider-touch-value').html(value);
    }

    static disableSlider(sliderDiv) {
        SliderWidget.hideToolTips(sliderDiv.attr('disabled', true));
        SliderWidget.getWidgetDiv(sliderDiv).attr('disabled', true);
    }

    static enableSlider(sliderDiv) {
        sliderDiv.attr('disabled', false);
        SliderWidget.getWidgetDiv(sliderDiv).attr('disabled', false);
        SliderWidget.getSliderButtons(sliderDiv).show();
    }

    static hideToolTips(sliderDiv) {
        const c = SliderWidget.getSlider(sliderDiv).css;

        sliderDiv.find('.noUi-handle').addClass('off');
        sliderDiv.find('.noUi-tooltipHover').removeClass('noUi-tooltipHover').addClass('noUi-tooltip').css(c.tooltip);
    }

    static getSliderDiv(e) {
        return e.closest('.ks-slider');
    }

    static getWidgetDiv(e) {
        return e.hasClass('widget') ? e : e.find('.widget');
    }

    static getSliderButtons(sliderDiv) {
        return sliderDiv.find('.ks-slider-stepper');
    }

    static getSlider(sliderDiv) {
        return SliderWidget.slidersByIds[sliderDiv.data('id')];
    }
}
;