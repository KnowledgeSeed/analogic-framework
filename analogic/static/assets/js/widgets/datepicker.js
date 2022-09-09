/* global app, Doc, Widget, Widgets */

'use strict';

class DatePickerWidget extends Widget {

    getHtml(widgets, d) {
        let mainDivStyle = this.getGeneralStyles(d),
            titleStyles = this.getHtmlComponentStylesArray('title', d),
            innerStyle = this.getHtmlComponentStylesArray('inner', d),
            dividerStyle = this.getHtmlComponentStylesArray('divider', d),
            monthPicker = this.getRealValue('monthPicker', d, false);

        const v = {
            datePicked: this.getRealValue('datePicked', d, DatePickerWidget.getStandardizedDateString(new Date(), monthPicker)),
            editable: this.getRealValue('editable', d, true),
            local: this.getRealValue('local', d, false),
            skin: this.getRealValue('skin', d, 'standard'),
            maxDate: this.getRealValue('maxDate', d, false),
            minDate: this.getRealValue('minDate', d, false),
            monthPicker: monthPicker,
            ordinal: this.getRealValue('ordinal', d, ''),
            panelFixed: this.getRealValue('panelFixed', d, false),
            title: this.getRealValue('title', d, ''),
            titleVisible: this.getRealValue('titleVisible', d, true)
        };

        let date = DatePickerWidget.getDateFromString(v.datePicked, v.monthPicker),
            dateText = DatePickerWidget.getFormattedDateString(date, v.monthPicker, v.local),
            minDate = v.minDate ? DatePickerWidget.getDateFromString(v.minDate, v.monthPicker) : '',
            maxDate = v.maxDate ? DatePickerWidget.getDateFromString(v.maxDate, v.monthPicker) : '';

        this.value = v.datePicked;
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.panelFixed = v.panelFixed;
        this.local = v.local;


        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        let monthsHtml = months.map((month, i) => {
            let ym = new Date(date.getFullYear(), i), disabled = '', min = new Date(minDate), max = new Date(maxDate);

            if ((ym < min.setMonth(min.getMonth() - 1)) || (ym > max)) {
                disabled = 'disabled';
            }

            return '<div data-month=' + i + ' class="' + disabled + ' ks-datepicker-panel-month-item ' + ((i === date.getMonth()) ? 'on' : '') + '">' + month + '</div>';
        });

        const html = `
<div class="ks-datepicker dropdown-type ks-datepicker-${v.skin}" style="${mainDivStyle.join('')}" data-ordinal="${v.ordinal}" data-monthpicker="${v.monthPicker || false}" data-min-date="${v.minDate || ''}" data-max-date="${v.maxDate || ''}">
    <div class="ks-datepicker-inner" style="${innerStyle.join('')}">
        <div class="ks-datepicker-title"  style="${titleStyles.join('')}">
            ${v.titleVisible ? v.title : ''}
        </div>
        <div class="ks-datepicker-field">
            <div class="ks-datepicker-field-inner">
                <div class="ks-datepicker-icon icon-date"></div>
                <input type="text" class="ks-datepicker-input" placeholder="Choose..." value="${dateText}" ${v.editable ? '' : `disabled`}>
            </div>
        </div>
    </div>
    ${v.editable ?
            `<div class="ks-datepicker-panel holder" ${v.panelFixed ? '' : 'style="display:none;'}">
        <div class="ks-datepicker-panel-header">
            <div class="ks-datepicker-panel-header-inner">
                <div class="ks-datepicker-panel-pager ks-left"></div>
                <div class="ks-datepicker-panel-year" data-year="${date.getFullYear()}">${date.getFullYear()}</div>
                <div class="ks-datepicker-panel-pager ks-right"></div>
            </div>
        </div>
        <div class="ks-datepicker-panel-months">${monthsHtml.join('')}</div>
        <div class="ks-datepicker-panel-days">${DatePickerWidget.getPickerHolderDaysHtml(date, minDate, maxDate)}</div>
    </div>` : ''}
</div>`;

        return html;
    }

    static getPickerHolderDaysHtml(date, minDate, maxDate) {
        let daysOnPane = DatePickerWidget.getDaysOnDatepicker(date.getFullYear(), date.getMonth(), date.getDate());

        return daysOnPane.map((d, i) => {
            let ym = new Date(date.getFullYear(), date.getMonth(), d), min = new Date(minDate), disabled = '';

            //if (minDate !== '' && (ym < min.setDate(min.getDate()-1))) { // FF
            if (minDate !== '' && (ym < min.setDate(min.getDate()))) { // Chrome
                disabled = 'disabled';
            }

            if (maxDate !== '' && (ym > maxDate)) {
                disabled = 'disabled';
            }

            return '<div ' + (!d ? '' : 'data-enabled="true"') + (d ? 'data-day="' + d + '"' : '') + ' class="' + disabled + ' ks-datepicker-panel-day-item ' + (d === Number(date.getDate()) ? 'on' : '') + ' ' + (((i % 7) === 6) ? 'ks-weekend ks-weekend-2' : '') + ' ' + (((i % 7) === 5) ? 'ks-weekend ks-weekend-1' : '') + '">' + d + '</div>';
        }).join('');
    }

    initEventHandlers() {
        const id = this.id, datePicker = $('#' + id + ' .ks-datepicker'),
            dateInput = $('#' + id + ' .ks-datepicker-input');

        let date = DatePickerWidget.getDateFromString(Widgets[id].value, datePicker.data('monthpicker')),
            yearHolder = $('#' + id + ' .ks-datepicker-panel-year'),
            monthHolders = $('#' + id + ' .ks-datepicker-panel-month-item'),
            dayHolders = $('#' + id + ' .ks-datepicker-panel-day-item'),
            target;

        datePicker.on('click touch', e => {
            Doc.find(".dropdown-type .holder").not(datePicker).each((i, el) => {
                if ($(el).is(':visible')) {
                    DatePickerWidget.triggerPickEvent($(el).closest('section').attr('id'), $(el), e);
                }
            });

            if (pickerHolder.is(':visible')) {
                DatePickerWidget.triggerPickEvent(id, pickerHolder, e);
            } else {
                pickerHolder.slideDown(50, () => $(e.currentTarget).parent().get(0).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                }));
            }

            return false;
        }).on('dateChange.' + id, (_, date) => {
            let m = datePicker.data('monthpicker'), minDateStr = String(datePicker.data('min-date')),
                maxDateStr = String(datePicker.data('max-date')),
                minDate = minDateStr ? DatePickerWidget.getDateFromString(minDateStr, m) : '',
                maxDate = maxDateStr ? DatePickerWidget.getDateFromString(maxDateStr, m) : '';

            if (minDateStr && DatePickerWidget.isValidDateString(minDateStr, m)) {
                if (date < minDate) {
                    date = minDate;
                    dateInput.val(DatePickerWidget.getFormattedDateString(date, m, Widgets[id].local));
                }
            }

            if (maxDateStr && DatePickerWidget.isValidDateString(maxDateStr, m)) {
                if (date > maxDate) {
                    date = maxDate;
                    dateInput.val(DatePickerWidget.getFormattedDateString(date, m, Widgets[id].local));
                }
            }

            Widgets[id].value = DatePickerWidget.getStandardizedDateString(date, m);

            $('#' + id + ' .ks-datepicker-panel-days').empty().append(DatePickerWidget.getPickerHolderDaysHtml(date, minDate, maxDate));
            yearHolder.data('year', date.getFullYear()).text(date.getFullYear());
            monthHolders.removeClass('on').filter(`[data-month='${date.getMonth()}']`).addClass('on');
            dayHolders.removeClass('on').filter(`[data-day='${date.getDate()}']`).addClass('on');

            monthHolders.each((i, e) => {
                target = $(e);
                let ym = new Date(date.getFullYear(), target.data('month')),
                    min = new Date(minDate);
                if (minDate) {
                    target.toggleClass('disabled', ym < min.setMonth(min.getMonth() - 1));
                }
                if (maxDate) {
                    target.toggleClass('disabled', ym > maxDate);
                }
            });

            if (Widgets[id].panelFixed) {
                DatePickerWidget.triggerPickEvent(id, pickerHolder, {});
            }
        });

        const pickerHolder = $('#' + id + ' .ks-datepicker-panel').on('click touch', '.ks-datepicker-panel-pager', e => {
            let mod = $(e.currentTarget).hasClass('ks-left') ? -1 : 1;
            date = DatePickerWidget.getDateFromString(Widgets[id].value, datePicker.data('monthpicker'));
            date.setYear(Number(date.getFullYear()) + mod);
        }).on('click touch', '.ks-datepicker-panel-month-item', e => {
            target = $(e.currentTarget);
            date = DatePickerWidget.getDateFromString(Widgets[id].value, datePicker.data('monthpicker'));
            date.setMonth(target.data('month'));
        }).on('click touch', '.ks-datepicker-panel-day-item[data-enabled="true"]', e => {
            target = $(e.currentTarget);
            date = DatePickerWidget.getDateFromString(Widgets[id].value, datePicker.data('monthpicker'));
            date.setDate(target.data('day'));
        }).on('click touch', e => {
            e.stopPropagation();
            $('#' + id + ' .ks-datepicker-input').val(DatePickerWidget.getFormattedDateString(date, datePicker.data('monthpicker'), Widgets[id].local));
            datePicker.trigger('dateChange.' + id, [date]);
        });

        dateInput.on('input', e => {
            let date = DatePickerWidget.getDateFromString($(e.currentTarget).val(), $(e.currentTarget).data('monthpicker'));
            if (!date) {
                return false;
            }

            datePicker.trigger('dateChange.' + id, [date]);
        }).on('focusout', e => {
            let date = DatePickerWidget.getDateFromString($(e.currentTarget).val(), $(e.currentTarget).data('monthpicker'));
            $('#' + id + ' .ks-datepicker-input').val(DatePickerWidget.getFormattedDateString(date, datePicker.data('monthpicker'), Widgets[id].local));
        }).on('keypress', e => {
            if (e.which === 13) {
                $(e.currentTarget).blur();
                let element = $('<div>');
                element.data({
                    action: 'pick',
                    id: id,
                    value: $('#' + id + ' .ks-datepicker-input').val().slice(0, -1),
                    ordinal: $('#' + id + ' .ks-datepicker').data('ordinal')
                });
                Widget.doHandleSystemEvent(element, e, true);
            }
        });

        const catcher = Doc.not(datePicker).on('click touch', e => {
            if (pickerHolder.is(':visible') && !Widgets[id].panelFixed) {
                let element = $('<div>');
                element.data({
                    action: 'pick',
                    id: id,
                    value: $('#' + id + ' .ks-datepicker-input').val().slice(0, -1),
                    ordinal: $('#' + id + ' .ks-datepicker').data('ordinal')
                });
                Widget.doHandleSystemEvent(element, e, true);
                pickerHolder.slideUp(50);
            }
        });

        if (!Widgets[id].panelFixed) {
            pickerHolder.hide();
        }
    }

    reset() {
        delete this.value;
        delete this.minDate;
        delete this.maxDate;
        delete this.panelFixed;
        delete this.local;
    }

    static triggerPickEvent(id, pickerHolder, e) {
        let element = $('<div>');
        element.data({
            action: 'pick',
            id: id,
            value: $('#' + id + ' .ks-datepicker-input').val().slice(0, -1),
            ordinal: $('#' + id + ' .ks-datepicker').data('ordinal')
        });
        Widget.doHandleSystemEvent(element, e, true);
        if (!Widgets[id].panelFixed) {
            pickerHolder.slideUp(50);
        }
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
        if (!DatePickerWidget.isValidDateString(dateString, isMonthPicker)) {
            return new Date();
        }

        dateString = String(dateString).replace(/\s/g, '').replace(/\.{1}$/, '').replace(/[/.]/g, '-'); //1: replace whitespace | 2: replace last character if it is dot | 3: replace / or . to -
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

    static getFormattedDateString(date, isMonthPicker = false, local = false) {
        if (isMonthPicker) {
            return date.toLocaleDateString(local ? local : 'hu-HU', {year: 'numeric', month: '2-digit'});  // hu-HU: yyyy. mm.
        } else {
            return date.toLocaleDateString(local ? local.substring(0, 2) : 'hu', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });  // hu-HU: yyyy. mm. dd.
        }
    }

    static getStandardizedDateString(date, isMonthPicker = false) {
        if (isMonthPicker) {
            //return date.toLocaleDateString("fr-CA", {year: "numeric", month: "2-digit"}); // fr-CA: yyyy-mm
            //return date.toLocaleDateString("lv-LV", {year: "numeric", month: "2-digit"}); // lv-LV: yyyy.mm
            return date.getFullYear() + '.' + DatePickerWidget.addLeadingZero((date.getMonth() + 1));
        } else {
            //return date.toLocaleDateString("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}); // fr-CA: yyyy-mm-dd
            //return date.toLocaleDateString("lv-LV", {year: "numeric", month: "2-digit", day: "2-digit"}); // lv-LV: yyyy.mm.dd
            return date.getFullYear() + '.' + DatePickerWidget.addLeadingZero((date.getMonth() + 1)) + '.' + DatePickerWidget.addLeadingZero(date.getDate());
        }
    }

    static addLeadingZero(n) {
        return n < 10 ? '0' + n : '' + n;
    }
}
;