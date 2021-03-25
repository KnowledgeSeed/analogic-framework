/* global app, El, Doc, Intl, WidgetValue*/

'use strict';

const L = console.log, v = (path, obj = WidgetValue) => path.split(".").reduce((o, key) => o && o[key] ? o[key] : false, obj);

const Utils = {
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
    stopEvent(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        return e;
    },
    cleanStr: s => Utils.replaceAll(s, {'ö': 'o', 'ü': 'u', 'ó': 'o', 'ő': 'o', 'ú': 'u', 'é': 'e', 'á': 'a', 'ű': 'u', 'í': 'i'}),
    clone: (object, deep) => deep ? $.extend(true, {}, object) : $.extend({}, object),
    replaceAll: (s, m) => s.replace(RegExp(Object.keys(m).join('|'), 'gi'), r => m[r.toLowerCase()]),
    scrollTop: duration => $('html, body').animate({scrollTop: 0}, duration || 500),
    scrollTo(id, duration) {
        El.body.triggerHandler('refresh.' + id);
        $('html, body').animate({scrollTop: $('#' + id).offset().top}, duration || 500);
    },
    getRandomId: () => window.crypto.getRandomValues(new Uint32Array(1))[0],
    toTitleCase: str => str.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase()),
    parseNumber(value, locale = navigator.language) {
        if ('number' === typeof value) {
            return value;
        }

        if (2 === locale.length) {
            locale += '-' + locale.toUpperCase();
        }

        value = ('' + value).trim();
        const sign = ('(' === value[0] && ')' === value[value.length - 1] ? -1 : 1);

        value = value.replace(/\D+$/g, '');

        const exponentSuffix = value.match(/e-{0,1}\d+$/i);
        if (exponentSuffix) {
            value = value.slice(0, exponentSuffix.index);
        }

        const decimal = Intl.NumberFormat(locale).format('1.1').charAt(1);
        const cleanPattern = new RegExp(`[^-+0-9${ decimal }]`, 'g');
        const cleaned = value.replace(cleanPattern, '');
        const normalized = cleaned.replace(decimal, '.');

        return sign * parseFloat(normalized) + (exponentSuffix ? exponentSuffix[0] : 0);
    },
    replaceDecimal(value, locale = navigator.language) {
        const decimal = Intl.NumberFormat(locale).format('1.1').charAt(1);

        return ('' + value).trim().replace('.', decimal);
    },
    isInViewport(e) {
        const b = e.getBoundingClientRect(), w = window, d = document.documentElement;

        return (b.top >= 0 && b.left >= 0 && b.bottom <= (w.innerHeight || d.clientHeight) && b.right <= (w.innerWidth || d.clientWidth));
    },
    parseFormatStringToCSSClasses(s) {
        return (typeof s === 'string') ? s.split('-').map((e, c) => {
            return 'c-' + c + '-' + e;
        }).join(' ') : '';
    },
    getToday: (delimiter = '.') => Utils.getFormattedDate(new Date(), delimiter),
    getTimestamp(dateStr = '', forwardTime = false) {
        const d = dateStr ? new Date(dateStr.replace(/\./g, '-')) : new Date(), o = forwardTime ? Utils.forwardTime(d) : Utils.rewindTime(d);

        return o.getFullYear() + '-' + (o.getMonth() + 1).toString().padStart(2, 0) + '-' + o.getDate().toString().padStart(2, 0) + 'T' + o.getHours().toString().padStart(2, 0) + ':' + o.getMinutes().toString().padStart(2, 0) + ':' + o.getSeconds().toString().padStart(2, 0) + '.' + o.getMilliseconds().toString().padStart(3, 0) + 'Z';
    },
    rewindTime: d => {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        return d;
    },
    forwardTime: d => {
        d.setHours(23);
        d.setMinutes(59);
        d.setSeconds(59);
        d.setMilliseconds(999);

        return d;
    },
    getFormattedDate(d = new Date(), delimiter = '-', withTime = false) {
        const Y = d.getFullYear(), M = (d.getMonth() + 1).toString(), D = d.getDate().toString();

        let time = '';
        if (withTime) {
            const h = d.getHours().toString(), m = d.getMinutes().toString(), s = d.getSeconds().toString();
            time = ' ' + h.padStart(2, 0) + ':' + m.padStart(2, 0) + ':' + s.padStart(2, 0);
        }

        return Y + delimiter + M.padStart(2, 0) + delimiter + D.padStart(2, 0) + time;
    },
    isMobile() {
        if (null === app.isMobile) {
            app.isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
        }

        return app.isMobile;
    },
    escapeText: str => JSON.stringify(str).slice(1, -1),
    nl2br: s => s.replace(/(?:\r\n|\r|\n)/g, '<br>'),
    getObjectValueByDotSeparatedKeys(o, dotSeparatedKeys) {
        if ('undefined' === typeof o) {
            return o;
        }

        const i = dotSeparatedKeys.indexOf('.'), v = o[dotSeparatedKeys];

        if (-1 === i || v) {
            return v;
        } else {
            return Utils.getObjectValueByDotSeparatedKeys(o[dotSeparatedKeys.slice(0, i)], dotSeparatedKeys.slice(i + 1));
        }
    },
    adjustHeightsToMax(elements) {
        let i, height, maxHeight = 0, len = elements.length;
        // testing with maybe "outerHeight"
        for (i = 0; i < len; ++i) {
            height = elements.eq(i).height();
            if (height > maxHeight) {
                maxHeight = height;
            }
        }

        elements.height(maxHeight);
    },
    formatIntForChart: intVal => intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    precisionRound(number, precision) {
        const factor = Math.pow(10, precision);

        return Math.round(number * factor) / factor;
    },
    backdrop: {
        show: () => {
            app.backdrop = app.backdrop || $('<div class="ks-container-backdrop">');
            El.body.prepend(app.backdrop);
        },
        hide: () => (app.backdrop || {}).remove()
    },
    addLeadingZero: n => n < 10 ? '0' + n : '' + n,
    getSize(x, withSemicolon = false, convertToPixelSizeType = null) {
        let s = parseFloat(x);

        if (-1 === ('' + x).indexOf('%')) {
            s += 'px';
        } else {
            if (convertToPixelSizeType) {
                s = 100 * s / Doc[convertToPixelSizeType]();
            } else {
                s += '%';
            }
        }

        return s + (withSemicolon ? ';' : '');
    },
    getGridTableCurrentCell(widgetId) {
        let a = v(widgetId + '.cellData', WidgetValue), b = v(widgetId + '.row', WidgetValue), c = v(widgetId + '.column', WidgetValue);
        if (a && b && c) {
            return a[b][c];
        }
        return false;
    },
    create_UUID() {
        let dt = new Date().getTime();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
};

app.utils = Utils;