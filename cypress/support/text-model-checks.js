/*
 * Checks for the view-model based TextWidget (buildModel / model based updateHtml).
 *
 * The function below is evaluated inside the application window (cy.window().then(win => win.eval(...)))
 * so that Widget, Utils and Widgets resolve to the framework globals. It has no other dependencies and
 * can be pasted into a browser console on any page of an app as well.
 *
 * It verifies that
 *  1. golden:       getHtml() renders exactly what the original (pre-model) implementation rendered
 *  2. equivalence:  updateHtml(new data) leaves the same DOM as a fresh render of the new data
 *  3. runtime:      classes / inline styles / attributes added at runtime survive updateHtml()
 *  4. editing:      an editor that lives in the title is not replaced while it is being used
 *  5. dataCache:    jQuery .data() reads the new values after an update
 *  6. subclass:     a subclass that overrides getHtml() keeps the previous update behavior
 */
function textModelChecks() {
    const TextClass = (() => {
        const entry = Object.values(Widgets).find(w => w && w.constructor && w.constructor.name === 'TextWidget');
        return entry && entry.constructor;
    })();
    if (!TextClass) {
        return {error: 'no TextWidget instance on this page'};
    }

    // reference: getHtml() of TextWidget before the view model refactor, verbatim
    const legacyGetHtml = function (widgets, d) {
        const o = this.options;
        const v = this.getParameters(d);
        this.setValues(v);
        let mainDivClass = [],
            mainDivStyle = this.getGeneralStyles(d).concat(this.getHtmlComponentStylesArray('main', d)),
            titleStyles = this.getHtmlComponentStylesArray('title', d),
            bodyStyles = this.getHtmlComponentStylesArray('body', d),
            innerStyles = this.getHtmlComponentStylesArray('inner', d),
            iconStyles = this.getHtmlComponentStylesArray('icon', d);
        (v.title !== false || v.editable) && mainDivClass.push('has-title');
        v.body && mainDivClass.push('has-body');
        v.backgroundColor && mainDivStyle.push(`background-color:${v.backgroundColor};`);
        v.titleAlignment && titleStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.titleAlignment === 'start' || v.titleAlignment === 'end' ? `flex-${v.titleAlignment}` : v.titleAlignment};`);
        v.titleFontColor && titleStyles.push(`color:${v.titleFontColor};`);
        v.titleFontSize && titleStyles.push(`font-size:${v.titleFontSize}px;`);
        v.titleFontWeight && titleStyles.push(`font-weight:${v.titleFontWeight};`);
        v.titleBackgroundColor && titleStyles.push(`background-color:${v.titleBackgroundColor};`);
        v.titleCursor && titleStyles.push(`cursor:${v.titleCursor};`);
        v.editable && (v.title === false || v.title === '') && titleStyles.push('height: 20px;');
        v.bodyAlignment && bodyStyles.push(`display: flex;padding-left: 0px;justify-content: ${v.bodyAlignment === 'start' || v.bodyAlignment === 'end' ? `flex-${v.bodyAlignment}` : v.bodyAlignment};`);
        v.bodyFontColor && bodyStyles.push(`color:${v.bodyFontColor};`);
        v.bodyFontSize && bodyStyles.push(`font-size:${v.bodyFontSize}px;`);
        v.bodyFontWeight && bodyStyles.push(`font-weight:${v.bodyFontWeight};`);
        v.bodyBackgroundColor && bodyStyles.push(`background-color:${v.bodyBackgroundColor};`);
        v.bodyCursor && bodyStyles.push(`cursor:${v.bodyCursor};`);
        v.iconWidth && iconStyles.push('width:', v.iconWidth, 'px;');
        v.iconHeight && iconStyles.push('height:', v.iconHeight, 'px;');
        v.iconColor && iconStyles.push('color:', v.iconColor, ';');
        v.iconPosition === 'left' ? mainDivClass.push('pos-icon-left') : mainDivClass.push('pos-icon-right');
        v.innerWidth && innerStyles.push('width:', Widget.getPercentOrPixel(v.innerWidth), ';');
        v.innerHeight && innerStyles.push('height:', Widget.getPercentOrPixel(v.innerHeight), ';');
        v.innerCursor && innerStyles.push(`cursor:${v.innerCursor};`);
        return `
<div class="ks-text ${mainDivClass.join(' ')} ks-text-${v.skin}" style="${mainDivStyle.join('')}">
    <div class="ks-text-inner" style="${innerStyles.join('')}" data-id="${o.id}" data-action="text_click" data-ordinal="${v.ordinal}">
        <div class="ks-text-icon" data-id="${o.id}" data-action="${v.iconCustomEventName ? v.iconCustomEventName : 'perform'}" data-ordinal="${v.ordinal}"><span style="${iconStyles.join('')}" class="${v.icon}"></span></div>
        <div class="ks-text-title" data-performable="${v.performable ? '1' : '0'}" data-editable="${v.editable ? '1' : '0'}" title="${v.title && !v.tooltip ? Utils.htmlEncode(Utils.stripHtml(v.title)) : ''}" data-ordinal="${v.ordinal}" style="${titleStyles.join('')}">${v.title !== false ? v.title : ''}</div>
        <div class="ks-text-body" style="${bodyStyles.join('')}">${v.body !== false ? v.body : ''}</div>
    </div>
</div>`;
    };

    const domain = {
        backgroundColor: ['red', '#fff'], body: ['Body <i>x</i>', '', 0, 'b'], bodyBackgroundColor: ['blue'], bodyCursor: ['pointer'],
        bodyFontColor: ['green'], bodyFontSize: [12, '14'], bodyFontWeight: ['bold', 700], bodyAlignment: ['start', 'end', 'center'],
        editable: [true, false], icon: ['icon-star', 'icon-x y'], iconColor: ['#009FDA'], iconCustomEventName: ['myIcon'], iconHeight: [10],
        iconPosition: ['left', 'right'], iconWidth: [20], innerHeight: [30, '50%'], innerWidth: ['100%', 40], innerCursor: ['grab'],
        performable: [true, false], skin: ['template2', 'x'], title: ['Title', '', 'A & B <b>x</b>', 0, 'n"q'], titleBackgroundColor: ['#eee'],
        titleCursor: ['text'], titleFontColor: ['#333'], titleFontSize: [13, 20], titleFontWeight: ['600'],
        titleAlignment: ['start', 'end', 'center', 'space-between'], tooltip: [true, false, 'tip'], ordinal: [0, 5, 'x'], height: [40, '20px'],
        width: [100, '50%'], minHeight: [10], minWidth: ['30px'], marginTop: [4], marginLeft: [5], paddingLeft: [6], paddingTop: [2],
        mainStyle: [{background_color: 'yellow', border_radius: '4px'}], titleStyle: [{font_size: '11px', color: 'red'}], bodyStyle: [{margin_top: '3px'}],
        innerStyle: [{cursor: 'help'}], iconStyle: [{font_size: '15px', color: 'blue'}]
    };
    const keys = Object.keys(domain);
    let seed = 777;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const randData = probability => {
        const c = {};
        keys.forEach(k => {
            if (rnd() < probability) {
                const a = domain[k];
                c[k] = a[Math.floor(rnd() * a.length)];
            }
        });
        return c;
    };
    const sortObj = o => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a < b ? -1 : 1));
    const sig = el => {
        const style = {}, attrs = {};
        for (let i = 0; i < el.style.length; i++) {
            const n = el.style[i];
            style[n] = el.style.getPropertyValue(n) + '|' + el.style.getPropertyPriority(n);
        }
        for (const a of el.attributes) {
            if (a.name !== 'class' && a.name !== 'style') attrs[a.name] = a.value;
        }
        return {tag: el.tagName, cls: [...el.classList].sort(), style: sortObj(style), attrs: sortObj(attrs), kids: [...el.children].map(sig), html: el.children.length ? null : el.innerHTML};
    };
    const host = document.createElement('div');
    host.style.display = 'none';
    document.body.appendChild(host);
    const mount = (id, html) => {
        const s = document.createElement('section');
        s.id = id;
        s.innerHTML = html.trim();
        host.appendChild(s);
        return s;
    };
    const diffOf = (x, y, path, out) => {
        if (JSON.stringify(x) === JSON.stringify(y)) return;
        if (x && y && typeof x === 'object' && typeof y === 'object' && !Array.isArray(x)) {
            for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) diffOf(x[k], y[k], path + '.' + k, out);
        } else if (Array.isArray(x) && Array.isArray(y)) {
            for (let j = 0; j < Math.max(x.length, y.length); j++) diffOf(x[j], y[j], path + '[' + j + ']', out);
        } else out.push([path, x, y]);
    };
    const nrm = (s, id) => JSON.parse(JSON.stringify(sig(s.firstElementChild)).split(id).join('ID'));
    const report = {};

    try {
        // 1. golden
        const cases = [{}];
        keys.forEach(k => domain[k].forEach(val => cases.push({[k]: val})));
        for (let i = 0; i < 400; i++) cases.push(randData(0.25));
        report.golden = {cases: cases.length, mismatches: 0, first: []};
        cases.forEach((c, i) => {
            const opts = {id: 'goldenTextX'}, data = {};
            Object.keys(c).forEach((k, j) => ((i + j) % 2 === 0 ? opts : data)[k] = c[k]);
            const a = new TextClass(JSON.parse(JSON.stringify(opts))), b = new TextClass(JSON.parse(JSON.stringify(opts)));
            const ha = legacyGetHtml.call(a, [], data), hb = TextClass.prototype.getHtml.call(b, [], data);
            if (ha !== hb) {
                report.golden.mismatches++;
                if (report.golden.first.length < 2) report.golden.first.push({opts, data});
            }
        });

        // 2. render equivalence of updateHtml
        report.equivalence = {pairs: 400, mismatches: 0, first: []};
        for (let i = 0; i < 400; i++) {
            const dA = randData(0.3), dB = randData(0.3), id = 'eqText' + i, idF = 'eqTextFresh' + i;
            const w = new TextClass({id}), fresh = new TextClass({id: idF});
            Widgets[id] = w;
            const secA = mount(id, w.getHtml([], dA));
            w.updateHtml(dB);
            const secF = mount(idF, fresh.getHtml([], dB));
            const out = [];
            diffOf(nrm(secA, id), nrm(secF, idF), '', out);
            if (out.length) {
                report.equivalence.mismatches++;
                if (report.equivalence.first.length < 3) report.equivalence.first.push({i, diff: out.slice(0, 3), dA, dB});
            }
            delete Widgets[id];
        }

        // 3. runtime state survives; declared properties still follow the data
        report.runtime = {checks: 0, failures: []};
        {
            const id = 'rtText', w = new TextClass({id});
            Widgets[id] = w;
            const sec = mount(id, w.getHtml([], {title: 'A', titleFontSize: 12, titleFontColor: '#111', width: 100}));
            const el = {main: sec.querySelector('.ks-text'), inner: sec.querySelector('.ks-text-inner'), title: sec.querySelector('.ks-text-title'), body: sec.querySelector('.ks-text-body')};
            Object.values(el).forEach(e => {
                e.classList.add('x-runtime');
                e.style.setProperty('outline', '2px solid rgb(1, 2, 3)');
                e.style.setProperty('left', '7px');
                e.setAttribute('data-x-runtime', '1');
            });
            const nodes = Object.values(el);
            w.updateHtml({title: 'B', titleFontSize: 20, titleFontColor: '#111', width: 100, body: 'bb'});
            const ok = (cond, what) => {
                report.runtime.checks++;
                if (!cond) report.runtime.failures.push(what);
            };
            Object.entries(el).forEach(([role, e]) => {
                ok(e.classList.contains('x-runtime'), role + ' runtime class');
                ok(e.style.left === '7px' && e.style.outline.includes('rgb(1, 2, 3)'), role + ' runtime inline style');
                ok(e.getAttribute('data-x-runtime') === '1', role + ' runtime attribute');
            });
            ok(el.title.style.fontSize === '20px', 'declared style follows the data');
            ok(el.title.innerHTML === 'B' && el.body.innerHTML === 'bb', 'content follows the data');
            ok(nodes.every((n, i) => n === [sec.querySelector('.ks-text'), sec.querySelector('.ks-text-inner'), sec.querySelector('.ks-text-title'), sec.querySelector('.ks-text-body')][i]), 'nodes are not replaced');
            w.updateHtml({title: 'B', titleFontColor: '#111', width: 100});
            ok(el.title.style.fontSize === '', 'a style that left the data is removed');
            ok(el.title.style.left === '7px', 'runtime style still there after removal of a declared one');
            delete Widgets[id];
        }

        // 4. an active editor in the title is left alone
        {
            const id = 'edText', w = new TextClass({id});
            Widgets[id] = w;
            const sec = mount(id, w.getHtml([], {title: 'A', editable: true}));
            const title = sec.querySelector('.ks-text-title');
            title.innerHTML = '<input class="ks-text-title-input" value="typing">';
            const input = title.querySelector('input');
            w.updateHtml({title: 'B', editable: true});
            report.editing = {editorKept: title.querySelector('input') === input && input.value === 'typing'};
            delete Widgets[id];
        }

        // 5. jQuery data cache
        {
            const id = 'dcText', w = new TextClass({id});
            Widgets[id] = w;
            const sec = mount(id, w.getHtml([], {title: 'A', ordinal: 3, editable: true}));
            const title = $(sec).find('.ks-text-title');
            const before = title.data('ordinal');
            w.updateHtml({title: 'A', ordinal: 8, editable: false});
            report.dataCache = {before, after: $(sec).find('.ks-text-title').data('ordinal'), editableAfter: $(sec).find('.ks-text-title').data('editable')};
            delete Widgets[id];
        }

        // 6. a subclass with its own getHtml keeps the previous behavior
        {
            class CustomText extends TextClass {
                getHtml(widgets, d) {
                    return '<div class="custom"><div class="ks-text-inner"><div class="ks-text-icon"><span></span></div><div class="ks-text-title">x</div><div class="ks-text-body"></div></div></div>';
                }
            }
            const id = 'csText', w = new CustomText({id});
            Widgets[id] = w;
            mount(id, w.getHtml([], {}));
            let error = null;
            try {
                w.updateHtml({title: 'Y'});
            } catch (e) {
                error = String(e.message);
            }
            report.subclass = {usesLegacyPath: w.getHtml !== TextClass.prototype.getHtml && !w._vm, error};
            delete Widgets[id];
        }
    } finally {
        host.remove();
    }
    return report;
}

if (typeof module !== 'undefined') {
    module.exports = {textModelChecks};
}
