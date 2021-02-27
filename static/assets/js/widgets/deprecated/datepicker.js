/* global app, Doc, Widget, WidgetValue, _ */

'use strict';
class OldDatePickerWidget extends Widget {

    getHtml(widgets, d) {
        const o = this.options;

        if (!d.datePicked || d.datePicked === '') {
            d = {};
            d.datePicked = OldDatePickerWidget.getStandardizedDateString(new Date(), o.monthPicker);
        }

        const data = {...o, ...d};

        this.state = o;

        let date = OldDatePickerWidget.getDateFromString(data.datePicked, o.monthPicker),
        dateText = OldDatePickerWidget.getFormattedDateString(date, o.monthPicker),
        minDate = data.minDate ? OldDatePickerWidget.getDateFromString(data.minDate, o.monthPicker) : '',
        maxDate = data.maxDate ? OldDatePickerWidget.getDateFromString(data.maxDate, o.monthPicker) : '';

        this.value = {value: data.datePicked};

        WidgetValue[this[Object.getOwnPropertySymbols(this)[0]].id].minDate = minDate;
        WidgetValue[this[Object.getOwnPropertySymbols(this)[0]].id].maxDate = maxDate;

        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const html =
        `${data.titleVisible ? `<label>${data.title}</label>` : ''}
            <div class="widget-datepicker dropdown-type" data-monthpicker="${o.monthPicker || false}" data-min-date="${data.minDate || ''}" data-max-date="${data.maxDate || ''}">
                <span class="icon-date"></span>
                <input type="text" class="widget-input" value="${dateText}" ${data.editable ? '' : `disabled`}>
                <div class="widget-datepicker-picker-holder holder" style="display:none;">
                    <div class="widget-datepicker-picker-header">
                        <div class="widget-datepicker-picker-header-inner">
                            <span class="datepicker-year" data-year="${date.getFullYear()}">${date.getFullYear()}</span>
                            <div class="pager pager-left"></div>
                            <div class="pager pager-right"></div>
                        </div>
                    </div>
                    <div class="widget-datepicker-picker-months clear">
                    ${months.map((month, i) => {
            let ym = new Date(date.getFullYear(), i),
            disabled = '',
            min = new Date(minDate),
            max = new Date(maxDate);
            if ((ym < min.setMonth(min.getMonth() - 1)) || (ym > max)) {
                disabled = 'disabled';
            }
            return '<div data-month=' + i + ' class="' + disabled + ' widget-datepicker-picker-month-item ' + ((i === date.getMonth()) ? 'on' : '') + '">' + month + '</div>';

        }).join('')}</div>${o.monthPicker ? `` : `<div class="widget-datepicker-picker-days clear">${OldDatePickerWidget.getPickerHolderDaysHtml(date, minDate, maxDate)}</div>`}</div></div>`;

        return html;
    }

    static getPickerHolderDaysHtml(date, minDate, maxDate) {
        let daysOnPane = OldDatePickerWidget.getDaysOnDatepicker(date.getFullYear(), date.getMonth(), date.getDate());

        return daysOnPane.map((d, i) => {
            let ym = new Date(date.getFullYear(), date.getMonth(), d),
            min = new Date(minDate),
            disabled = '';

            //if (minDate !== '' && (ym < min.setDate(min.getDate()-1))) { // FF
            if (minDate !== '' && (ym < min.setDate(min.getDate()))) { // Chrome
                disabled = 'disabled';
            }

            if (maxDate !== '' && (ym > maxDate)) {
                disabled = 'disabled';
            }

            return '<div ' + (!d ? '' : 'data-enabled="true"') + (d ? 'data-day="' + d + '"' : '') + ' class="' + disabled + ' widget-datepicker-picker-day-item ' + (d === Number(date.getDate()) ? 'on' : '') + ' ' + (((i % 7) === 6) ? 'weekend weekend-2' : '') + ' ' + (((i % 7) === 5) ? 'weekend weekend-1' : '') + '">' + d + '</div>';
        }).join('');
    }

    initEventHandlers(section) {
        const id = section.attr('id'), s = section;
        const datePicker = s.find('.widget-datepicker');
        const dateInput = s.find('.widget-input');

        let date = OldDatePickerWidget.getDateFromString(WidgetValue[id].value, datePicker.data('monthpicker')),
        yearHolder = s.find('.datepicker-year'),
        monthHolders = s.find('.widget-datepicker-picker-month-item'),
        dayHolders = s.find('.widget-datepicker-picker-day-item'),
        target;

        datePicker.on('click touch', e => {
            Doc.find('.dropdown-type .holder').not(datePicker).each((i, el) => {
                if ($(el).is(':visible')) {
                    $(el).slideUp(50);
                }
            });

            if (pickerHolder.is(':visible')) {
                el = $('<div>').data({action: 'choose', id: id});
                Widget.doHandleSystemEvent(el, _, false);
                pickerHolder.slideUp(50);
            } else {
                pickerHolder.slideDown(50, function () {
                    $(e.currentTarget).parent().get(0).scrollIntoView({behavior: "smooth", block: "start"});
                });
            }

            return false;
        }).on('dateChange.' + id, (_, date) => {
            let minDate = datePicker.data('min-date') ? OldDatePickerWidget.getDateFromString(datePicker.data('min-date'), datePicker.data('monthpicker')) : '';
            let maxDate = datePicker.data('max-date') ? OldDatePickerWidget.getDateFromString(datePicker.data('max-date'), datePicker.data('monthpicker')) : '';

            if (datePicker.data('min-date') && OldDatePickerWidget.isValidDateString(datePicker.data('min-date'))) {
                if (date < minDate) {
                    date = minDate;
                    dateInput.val(OldDatePickerWidget.getFormattedDateString(date, datePicker.data('monthpicker')));
                }
            }

            if (datePicker.data('max-date') && OldDatePickerWidget.isValidDateString(datePicker.data('max-date'))) {
                if (date > maxDate) {
                    date = maxDate;
                    dateInput.val(OldDatePickerWidget.getFormattedDateString(date, datePicker.data('monthpicker')));
                }
            }

            WidgetValue[id].value = OldDatePickerWidget.getStandardizedDateString(date, datePicker.data('monthpicker'));

            s.find('.widget-datepicker-picker-days').empty().append(OldDatePickerWidget.getPickerHolderDaysHtml(date, minDate, maxDate));
            yearHolder.data('year', date.getFullYear()).text(date.getFullYear());
            monthHolders.removeClass('on').filter(`[data-month='${date.getMonth()}']`).addClass('on');
            dayHolders.removeClass('on').filter(`[data-day='${date.getDate()}']`).addClass('on');

            monthHolders.each((i, e) => {
                target = $(e);
                let ym = new Date(date.getFullYear(), target.data('month')),
                min = new Date(minDate);
                if (minDate && (ym < min.setMonth(min.getMonth() - 1))) {
                    target.addClass('disabled');
                } else {
                    target.removeClass('disabled');
                }

                if (maxDate && (ym > maxDate)) {
                    target.addClass('disabled');
                } else {
                    target.removeClass('disabled');
                }
            });
        });

        const pickerHolder = s.find('.widget-datepicker-picker-holder')
        .on('click touch', '.pager', e => {
            let mod = $(e.currentTarget).hasClass('pager-left') ? -1 : 1;
            date = OldDatePickerWidget.getDateFromString(WidgetValue[id].value, datePicker.data('monthpicker'));
            date.setYear(Number(date.getFullYear()) + mod);
        }).on('click touch', '.widget-datepicker-picker-month-item', e => {
            target = $(e.currentTarget);
            date = OldDatePickerWidget.getDateFromString(WidgetValue[id].value, datePicker.data('monthpicker'));
            date.setMonth(target.data('month'));
        }).on('click touch', '.widget-datepicker-picker-day-item[data-enabled="true"]', e => {
            target = $(e.currentTarget);
            date = OldDatePickerWidget.getDateFromString(WidgetValue[id].value, datePicker.data('monthpicker'));
            date.setDate(target.data('day'));
        }).on('click touch', e => {
            e.stopPropagation();
            $('#' + id + ' .widget-input').val(OldDatePickerWidget.getFormattedDateString(date, datePicker.data('monthpicker')));
            datePicker.trigger('dateChange.' + id, [date]);
        });

        dateInput.on('input', e => {
            let date = OldDatePickerWidget.getDateFromString($(e.currentTarget).val(), $(e.currentTarget).data('monthpicker'));
            if (!date) {
                return false;
            }

            datePicker.trigger('dateChange.' + id, [date]);
        }).on('focusout', e => {
            let date = OldDatePickerWidget.getDateFromString($(e.currentTarget).val(), $(e.currentTarget).data('monthpicker'));
            $('#' + id + ' .widget-input').val(OldDatePickerWidget.getFormattedDateString(date, datePicker.data('monthpicker')));
        }).on('keypress', e => {
            if (e.which === 13) {
                $(e.currentTarget).blur();
                e = $('<div>').data({action: 'choose', id: id});
                Widget.doHandleSystemEvent(e, _, false);
            }
        });

        const catcher = Doc.not(datePicker).on('click touch', e => {
            if (pickerHolder.is(':visible')) {
                e = $('<div>').data({action: 'choose', id: id});
                Widget.doHandleSystemEvent(e, _, false);
                pickerHolder.slideUp(50);
            }
        });

        pickerHolder.hide();
    }

    static isValidDateString(dateString, isMonthPicker = false) {
        let dateRegex;
        if (isMonthPicker) {
            // accepted formats: yyyy-mm|yyyy/mm|yyyy.mm.|yyyy.mm|yyyy. mm|yyyy. mm.
            dateRegex = /(19|20)\d\d([- /.]|. )([1-9]|0[1-9]|1[012])([.]?)$/g;
        } else {
            // accepted formats: yyyy-mm-dd|yyyy/mm/dd|yyyy.mm.dd|yyyy.mm.dd.|yyyy. mm. dd|yyyy. mm. dd.
            dateRegex = /(19|20)\d\d([- /.]|. )([1-9]|0[1-9]|1[012])([- /.]|. )([1-9]|0[1-9]|[12][0-9]|3[01])([.]?)$/g;
        }

        return dateRegex.test(dateString);
    }

    static getDateFromString(dateString, isMonthPicker = false) {
        if (!OldDatePickerWidget.isValidDateString(dateString, isMonthPicker)) {
            return new Date();
        }

        dateString = dateString.replace(/\s/g, '').replace(/\.{1}$/, '').replace(/[/.]/g, '-'); //1: replace whitespace | 2: replace last character if it is dot | 3: replace / or . to -
        dateString += isMonthPicker ? '-01' : '';

        if (isNaN(Date.parse(dateString))) {
            return new Date();
        }

        return new Date(dateString);
    }

    static getDaysOnDatepicker(year, month, day, needDaysOutOfMonth = false) {
        let firstDayInMonth = new Date(year, month, 1),
        lastDayInMonth = new Date(year, month + 1, 0),
        daysInActualMonth = lastDayInMonth.getDate(),
        firstWeekdayInMonth = firstDayInMonth.getDay() === 0 ? 7 : firstDayInMonth.getDay(),
        lastWeekdayInMonth = lastDayInMonth.getDay() === 0 ? 7 : lastDayInMonth.getDay(),
        daysInBeforeActualMonth = new Date(year, month, 0).getDate(),
        daysOnPane = [];

        if (needDaysOutOfMonth) {
            daysOnPane = [].concat(
            Array.from({length: firstWeekdayInMonth - 1}, (el, index) => index + (daysInBeforeActualMonth - (firstWeekdayInMonth - 2))),
            Array.from({length: daysInActualMonth}, (el, index) => index + 1),
            Array.from({length: 7 - lastWeekdayInMonth}, (el, index) => index + 1));
        } else {
            daysOnPane = [].concat(
            Array.from({length: firstWeekdayInMonth - 1}, (el, index) => ''),
            Array.from({length: daysInActualMonth}, (el, index) => index + 1),
            Array.from({length: 7 - lastWeekdayInMonth}, (el, index) => ''));
        }

        return daysOnPane;
    }

    static getFormattedDateString(date, isMonthPicker = false) {
        if (isMonthPicker) {
            return date.toLocaleDateString("hu-HU", {year: "numeric", month: "2-digit"});  // hu-HU: yyyy. mm.
        } else {
            return date.toLocaleDateString("hu", {year: "numeric", month: "2-digit", day: "2-digit"});  // hu-HU: yyyy. mm. dd.
    }
    }

    static getStandardizedDateString(date, isMonthPicker = false) {
        if (isMonthPicker) {
            //return date.toLocaleDateString("fr-CA", {year: "numeric", month: "2-digit"}); // fr-CA: yyyy-mm
            //return date.toLocaleDateString("lv-LV", {year: "numeric", month: "2-digit"}); // lv-LV: yyyy.mm
            return date.getFullYear() + '.' + OldDatePickerWidget.addLeadingZero((date.getMonth() + 1));
        } else {
            //return date.toLocaleDateString("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}); // fr-CA: yyyy-mm-dd
            //return date.toLocaleDateString("lv-LV", {year: "numeric", month: "2-digit", day: "2-digit"}); // lv-LV: yyyy.mm.dd
            return date.getFullYear() + '.' + OldDatePickerWidget.addLeadingZero((date.getMonth() + 1)) + '.' + OldDatePickerWidget.addLeadingZero(date.getDate());
    }
    }

    static addLeadingZero(n) {
        return n < 10 ? '0' + n : '' + n;
    }
}
;