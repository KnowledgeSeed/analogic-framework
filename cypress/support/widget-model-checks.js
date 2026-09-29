/*
 * Checks for the view-model based widgets (Toggle, TextBox, Button, GridTableCell).
 *
 * widgetModelChecks(name) is evaluated inside the application window (cy.window().then(win => win.eval(...)))
 * so that Widget, Utils and Widgets resolve to the framework globals. The legacy reference classes
 * (cypress/support/legacy/*.legacy.js: the widget as it was before the view model, renamed LegacyXWidget)
 * must have been loaded into the window first.
 *
 * It verifies, per widget, that
 *  1. golden:       getHtml() renders exactly what the legacy implementation rendered
 *  2. equivalence:  updateHtml(new data) leaves the same DOM as a fresh render of the new data
 *  3. runtime:      classes / inline styles / attributes added at runtime survive updateHtml()
 *  4. behavior:     widget specific checks (see the switch at the end)
 */
function widgetModelChecks(name) {
    const SPECS = {
        Toggle: {
            current: 'ToggleWidget', legacy: 'LegacyToggleWidget', args: () => [[]],
            domain: {
                backgroundColor: ['red'], isGridTableHierarchyExpander: [true, false], editable: [true, false], groupId: ['grpX'],
                icon: ['icon-a'], iconOff: ['icon-b'], iconFontSize: [12], iconFontColor: ['#333'], skin: ['skin2'],
                titleFontColor: ['blue'], titleFontSize: [13], titleOn: ['On', 'A & B', ''], titleOff: ['Off', ''],
                value: [0, 1, '1', false, true], ordinal: [0, 3], width: [100], height: ['20px'], marginTop: [4],
                mainStyle: [{border_radius: '3px'}], titleStyle: [{font_weight: '600'}], iconStyle: [{margin_left: '2px'}]
            }
        },
        TextBox: {
            current: 'TextBoxWidget', legacy: 'LegacyTextBoxWidget', args: () => [[]],
            domain: {
                icon: ['ic.png'], highlight: [true], defaultText: ['hint', ''], editable: [true, false], skin: ['s2'],
                textBoxType: ['text', 'password'], textAlignment: ['center'], textFontColor: ['green'], textFontSize: [12],
                title: ['T', '', '<b>b</b>'], titleFontColor: ['#111'], titleFontSize: [14], titleTextAlignment: ['start', 'end', 'center'],
                value: ['abc', '', 0, 'a"b', 5], hideIfNoData: [true], width: [100], height: [30], marginLeft: [3],
                mainStyle: [{border_radius: '2px'}], titleStyle: [{font_weight: '600'}], iconStyle: [{opacity: '0.5'}], textStyle: [{letter_spacing: '1px'}]
            }
        },
        Button: {
            current: 'ButtonWidget', legacy: 'LegacyButtonWidget', args: () => [[]],
            domain: {
                backgroundColor: ['#fff'], borderColor: ['#ccc'], borderWidth: [0, 2], cornerRadius: [4], dividerWidth: [1], effect: ['shadow'],
                fontBold: [true], fontColor: ['#222'], fontSize: [12], gradient: [['#aaa', '#bbb']], icon: ['icon-x'], iconColor: ['red'],
                iconFontSize: [15], iconHeight: [10], iconPosition: ['right', 'left'], iconWidth: [10], isInfo: [true], label: ['Go', '', 'A & B "q"'],
                paste: [true], skin: ['s2'], url: ['http://localhost/x?a=1&b=2'], confirmMessage: ['sure?'], confirmMessage2: ['really?'], width: [80], height: [24],
                mainStyle: [{margin_left: '2px'}], innerStyle: [{opacity: '0.9'}], contentStyle: [{padding_top: '1px'}], iconStyle: [{margin_right: '3px'}],
                iconSpanStyle: [{font_size: '11px'}], dividerStyle: [{opacity: '0.4'}], labelStyle: [{letter_spacing: '1px'}]
            }
        },
        GridTableCell: {
            current: 'GridTableCellWidget', legacy: 'LegacyGridTableCellWidget', args: () => [['<span class="child-x">c</span>']],
            domain: {
                alignment: ['top-left', 'center-right'], borderLeft: [true], borderRight: [true], cellBackgroundColor: ['#eee'],
                cellVisible: [false, true], skin: ['template_table_text', 'x'], cellSkin: ['simple'], cellWidth: ['120px', 90],
                cellPaddingRight: [4], cellPaddingLeft: ['5px'], width: [50], 'cell-width': ['77px'], 'cell-height': [20]
            }
        },
        Panel: {
            current: 'PanelWidget', legacy: 'LegacyPanelWidget', args: () => [['<span class="child-x">c</span>']],
            domain: {
                skin: ['template2', 'x'], width: ['50%', 100, '80px'], height: [40], minHeight: [10], minWidth: ['30px'],
                marginTop: [4], marginLeft: ['auto', 5], marginBottom: [2], marginRight: [3], paddingTop: [2], paddingLeft: [3]
            }
        },
        Grid: {
            current: 'GridWidget', legacy: 'LegacyGridWidget', args: () => [['<span class="child-x">c</span>']],
            domain: {
                skin: ['template2', 'x'], width: ['50%', 100, '80px'], height: [40], minHeight: [10], minWidth: ['30px'],
                marginTop: [4], marginLeft: ['auto', 5], marginBottom: [2], marginRight: [3], paddingTop: [2], paddingLeft: [3]
            }
        },
        GridRow: {
            current: 'GridRowWidget', legacy: 'LegacyGridRowWidget', args: () => [['<span class="child-x">c</span>']],
            domain: {
                skin: ['template2', 'x'], width: ['50%', 100, '80px'], height: [40], minHeight: [10], minWidth: ['30px'],
                marginTop: [4], marginLeft: ['auto', 5], marginBottom: [2], marginRight: [3], paddingTop: [2], paddingLeft: [3],
                alignment: ['center', 'left']
            }
        },
        GridCell: {
            current: 'GridCellWidget', legacy: 'LegacyGridCellWidget', args: () => [['<span class="child-x">c</span>']],
            domain: {
                skin: ['template2', 'x'], width: ['50%', 100, '80px'], height: [40], minHeight: [10], minWidth: ['30px'],
                marginTop: [4], marginLeft: ['auto', 5], marginBottom: [2], marginRight: [3], paddingTop: [2], paddingLeft: [3],
                alignment: ['top-left', 'center-right']
            }
        },
        Image: {
            current: 'ImageWidget', legacy: 'LegacyImageWidget', args: () => [[]],
            domain: {
                icon: ['star', false], fileName: ['a.png', 'b.png'], skin: ['s2'], title: ['T', 'A & B'], fontSize: [12],
                width: [10], height: [20], marginTop: [3]
            }
        },
        PasswordText: {
            current: 'PasswordTextWidget', legacy: 'LegacyPasswordTextWidget', args: () => [[]],
            domain: {
                width: [100], height: [30], marginTop: [3], paddingLeft: [4],
                mainStyle: [{border_radius: '3px'}], inputStyle: [{font_size: '12px'}], innerStyle: [{opacity: '0.9'}], iconStyle: [{color: 'red'}]
            }
        },
        TextArea: {
            current: 'TextAreaWidget', legacy: 'LegacyTextAreaWidget', args: () => [[]],
            domain: {
                editable: [true, false], icon: ['ic.png'], highlight: [true], placeholder: ['hint', ''], skin: ['s2'], textAlignment: ['center'],
                textFontColor: ['green'], textFontSize: [12], title: ['T', '', '<b>b</b>'], titleFontColor: ['#111'], titleFontSize: [14],
                titleTextAlignment: ['start', 'end', 'center'], value: ['abc', '', 0, 'line1\nline2', '<i>x</i>'], ordinal: [0, 4], hideIfNoData: [true],
                width: [100], height: [30], marginLeft: [3], mainStyle: [{border_radius: '2px'}], titleStyle: [{font_weight: '600'}],
                iconStyle: [{opacity: '0.5'}], textStyle: [{letter_spacing: '1px'}]
            }
        },
        GridTableHeaderCell: {
            current: 'GridTableHeaderCellWidget', legacy: 'LegacyGridTableHeaderCellWidget', args: () => [['<span class="child-x">c</span>']], noSectionId: true,
            domain: {
                alignment: ['top-left', 'center-right'], borderLeft: [true, false], borderRight: [true, false], cellHeaderSkin: ['grey', 'x'],
                cellVisible: [false, true], width: [100, '50%', '80px']
            }
        },
        DropBox: {
            current: 'DropBoxWidget', legacy: 'LegacyDropBoxWidget', args: () => [[]],
            forceData: {items: [{name: 'A', on: false}, {name: 'B', on: true}]},
            domain: {
                skin: ['s2'], placeHolder: ['choose', ''], panelWidth: [200], selectFirst: [true, false], multiSelect: [true, false],
                title: ['T', ''], titleVisible: [false, true], titleFontColor: ['#111'], titleFontSize: [12],
                titleTextAlignment: ['start', 'center'], textAlignment: ['center'], textFontColor: ['green'], textFontSize: [12],
                hideIfNoData: [true], width: [100], height: [30], marginLeft: [3]
            }
        },
        GridTable: {
            current: 'GridTableWidget', legacy: 'LegacyGridTableWidget',
            args: () => [['<div class="cellx">1</div>', '<div class="cellx">2</div>', '<div class="cellx">3</div>', '<div class="cellx">4</div>'], ''],
            baseOptions: {widgets: [{type: {name: 'TextWidget'}, title: 'c1', width: 50}, {type: {name: 'TextWidget'}, title: 'c2|x', width: 60}]},
            setup: w => { w.state = {rows: 0}; },
            domain: {
                skin: ['s2'], rowHeight: [30], borderBottom: [true, false], borderTop: [true, false], minWidth: ['30px', 100], width: [100, '50%'],
                height: [40], hideIfNoData: [true], content: [[], [[{}]]], title: ['T', 'A & B'], marginTop: [3]
            }
        },
        GridTableHeaderRow: {
            current: 'GridTableHeaderRowWidget', legacy: 'LegacyGridTableHeaderRowWidget',
            args: () => [['<div class="child-x">c</div>']],
            prepare: (opts, id, cleanup) => {
                const cid = 'hrChild' + id;
                opts.widgets = [{id: cid}];
                Widgets[cid] = {options: {id: cid}};
                cleanup.push(cid);
                return [['<div id="' + cid + '" class="ks-grid-table-cell child-x">c</div>']];
            },
            domain: {alignment: ['center', 'left'], borderBottom: [true, false], borderTop: [true, false], height: [30]}
        }
    };
    const spec = SPECS[name];
    if (!spec) return {error: 'unknown widget ' + name};
    let Current = null, Legacy = null;
    try { Current = eval(spec.current); } catch (e) { /* not defined */ }
    try { Legacy = eval(spec.legacy); } catch (e) { /* not loaded */ }
    if (!Current || !Legacy) return {error: 'class missing', current: !!Current, legacy: !!Legacy};

    const keys = Object.keys(spec.domain);
    let seed = 4242;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const randData = probability => {
        const c = {};
        keys.forEach(k => {
            if (rnd() < probability) {
                const a = spec.domain[k];
                c[k] = a[Math.floor(rnd() * a.length)];
            }
        });
        return c;
    };
    const clone = o => JSON.parse(JSON.stringify(o));
    // some keys are only read from options, split randomly between options and data
    const split = (c, i) => {
        const opts = {}, data = {};
        Object.keys(c).forEach((k, j) => ((i + j) % 2 === 0 ? opts : data)[k] = c[k]);
        return [opts, data];
    };
    const sortObj = o => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a < b ? -1 : 1));
    const sig = el => {
        const style = {}, attrs = {};
        for (let i = 0; i < el.style.length; i++) {
            const n = el.style[i];
            style[n] = el.style.getPropertyValue(n) + '|' + el.style.getPropertyPriority(n);
        }
        for (const a of el.attributes) {
            if (a.name !== 'class' && a.name !== 'style') attrs[a.name] = a.name === 'src' ? a.value.replace(/\?v=[A-Za-z0-9]+$/, '') : a.value;
        }
        const own = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? {prop: el.value} : null;
        return {tag: el.tagName, cls: [...el.classList].sort(), style: sortObj(style), attrs: sortObj(attrs), own, kids: [...el.children].map(sig), html: el.children.length ? null : el.innerHTML};
    };
    const diffOf = (x, y, path, out) => {
        if (JSON.stringify(x) === JSON.stringify(y)) return;
        if (x && y && typeof x === 'object' && typeof y === 'object' && !Array.isArray(x)) {
            for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) diffOf(x[k], y[k], path + '.' + k, out);
        } else if (Array.isArray(x) && Array.isArray(y)) {
            for (let j = 0; j < Math.max(x.length, y.length); j++) diffOf(x[j], y[j], path + '[' + j + ']', out);
        } else out.push([path, x, y]);
    };
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-10000px;top:0;width:400px';
    document.body.appendChild(host);
    const mount = (id, html) => {
        const s = document.createElement('section');
        s.id = spec.noSectionId ? 'sec-' + id : id;
        s.innerHTML = html.trim();
        host.appendChild(s);
        return s;
    };
    const detached = html => {
        const s = document.createElement('section');
        s.innerHTML = html.trim();
        return s;
    };
    const report = {name};
    const cleanupIds = [];

    try {
        // 1. golden
        const cases = [{}];
        keys.forEach(k => spec.domain[k].forEach(val => cases.push({[k]: val})));
        for (let i = 0; i < 400; i++) cases.push(randData(0.25));
        report.golden = {cases: cases.length, mismatches: 0, first: []};
        cases.forEach((c, i) => {
            const [opts, data] = split(c, i);
            opts.id = 'goldenX';
            Object.assign(opts, clone(spec.baseOptions || {}));
            Object.assign(data, clone(spec.forceData || {}));
            const a = new Legacy(clone(opts)), b = new Current(clone(opts));
            if (spec.setup) { spec.setup(a); spec.setup(b); }
            let ha, hb;
            try { ha = a.getHtml(...spec.args(), clone(data)); } catch (e) { ha = 'ERR ' + e.message; }
            try { hb = b.getHtml(...spec.args(), clone(data)); } catch (e) { hb = 'ERR ' + e.message; }
            if (ha !== hb) {
                report.golden.mismatches++;
                if (report.golden.first.length < 2) report.golden.first.push({opts, data, a: String(ha).slice(0, 160), b: String(hb).slice(0, 160)});
            }
        });
        delete Widgets['goldenX'];

        // 2. render equivalence of updateHtml
        report.equivalence = {pairs: 400, mismatches: 0, first: []};
        for (let i = 0; i < 400; i++) {
            const [opts, dA] = split(randData(0.3), i), dB = randData(0.3), id = 'eq' + name + i;
            opts.id = id;
            Object.assign(dA, clone(spec.forceData || {})); Object.assign(dB, clone(spec.forceData || {}));
            if (name === 'GridTableCell') { dA.cellId = 'cell' + id; dB.cellId = 'cell' + id; }
            const argsList = spec.prepare ? spec.prepare(opts, id, cleanupIds) : spec.args();
            Object.assign(opts, clone(spec.baseOptions || {}));
            const w = new Current(clone(opts)), fresh = new Current(clone(opts));
            if (spec.setup) { spec.setup(w); spec.setup(fresh); }
            Widgets[id] = w; cleanupIds.push(id);
            const secA = mount(id, w.getHtml(...argsList, clone(dA)));
            w.updateHtml(clone(dB));
            const secF = detached(fresh.getHtml(...argsList, clone(dB)));
            const out = [];
            diffOf(sig(secA.firstElementChild), sig(secF.firstElementChild), '', out);
            if (out.length) {
                report.equivalence.mismatches++;
                if (report.equivalence.first.length < 3) report.equivalence.first.push({i, diff: out.slice(0, 3), opts, dA, dB});
            }
            delete Widgets[id];
            secA.remove();
        }

        // 3. runtime state survives
        report.runtime = {widgets: 0, checks: 0, failures: []};
        for (let i = 0; i < 60; i++) {
            const [opts, dA] = split(randData(0.3), i), dB = randData(0.3), id = 'rt' + name + i;
            opts.id = id;
            Object.assign(dA, clone(spec.forceData || {})); Object.assign(dB, clone(spec.forceData || {}));
            if (name === 'GridTableCell') { dA.cellId = 'cell' + id; dB.cellId = 'cell' + id; }
            const argsList = spec.prepare ? spec.prepare(opts, id, cleanupIds) : spec.args();
            Object.assign(opts, clone(spec.baseOptions || {}));
            const w = new Current(clone(opts));
            if (spec.setup) spec.setup(w);
            Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml(...argsList, clone(dA)));
            const root = sec.firstElementChild;
            const all = [root, ...root.querySelectorAll('*')].filter(e => !e.classList.contains('child-x'));
            all.forEach(e => {
                e.classList.add('x-runtime');
                e.style.setProperty('outline', '2px solid rgb(1, 2, 3)');
                e.setAttribute('data-x-runtime', '1');
            });
            w.updateHtml(clone(dB));
            report.runtime.widgets++;
            all.forEach(e => {
                if (!e.isConnected) return;
                report.runtime.checks++;
                const ok = e.classList.contains('x-runtime') && e.style.outline.includes('rgb(1, 2, 3)') && e.getAttribute('data-x-runtime') === '1';
                if (!ok && report.runtime.failures.length < 5) report.runtime.failures.push({i, tag: e.tagName, cls: e.className.slice(0, 60)});
            });
            if (sec.firstElementChild !== root) report.runtime.failures.push({i, what: 'root node replaced'});
            delete Widgets[id];
            sec.remove();
        }

        // 4. widget specific behavior
        report.behavior = {};
        const chk = (label, cond) => { report.behavior[label] = !!cond; };
        if (name === 'Toggle') {
            const id = 'bhToggle', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml([], {value: 0, editable: false, ordinal: 1, titleOn: 'A', titleOff: 'A'}));
            w.initEventHandlers();
            const t = () => sec.querySelector('.ks-toggle'), inner = () => sec.querySelector('.ks-toggle-inner');
            const click = () => { try { t().click(); } catch (e) {} };
            chk('readonlyClassSet', inner().classList.contains('readonly'));
            click(); chk('clickIgnoredWhileReadonly', !t().classList.contains('ks-on'));
            w.updateHtml({value: 0, editable: true, ordinal: 1, titleOn: 'A', titleOff: 'A'});
            chk('readonlyClassRemoved', !inner().classList.contains('readonly'));
            click(); chk('clickWorksAfterEditableTrue', t().classList.contains('ks-on'));
            // a click that the data does not confirm does not stay
            w.updateHtml({value: 0, editable: true, ordinal: 1, titleOn: 'A', titleOff: 'A'});
            chk('unconfirmedClickReverted', !t().classList.contains('ks-on'));
            chk('dataValueCacheFollowsData', $(t()).data('value') === 0);
            w.updateHtml({value: 1, editable: true, ordinal: 4, titleOn: 'A', titleOff: 'A'});
            chk('valueOneSetsOn', t().classList.contains('ks-on') && $(t()).data('ordinal') === 4);
            delete Widgets[id];
        }
        if (name === 'TextBox') {
            const id = 'bhTextBox', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml([], {value: 'server1', title: 'T'}));
            const input = () => sec.querySelector('input');
            input().focus(); input().value = 'typed by the user'; input().setSelectionRange(2, 5);
            w.updateHtml({value: 'server2', title: 'T2'});
            chk('focusedInputKeepsTypedValue', document.activeElement === input() && input().value === 'typed by the user');
            chk('focusedSelectionKept', input().selectionStart === 2 && input().selectionEnd === 5);
            chk('titleFollowsData', sec.querySelector('.ks-textbox-title-primary').innerHTML === 'T2');
            input().blur(); input().value = 'stale typed';
            w.updateHtml({value: 'server3', title: 'T2'});
            chk('unfocusedInputFollowsData', input().value === 'server3' && input().getAttribute('value') === 'server3');
            w.updateHtml({value: 'server3', title: 'T2', editable: false});
            chk('readonlyAttribute', input().hasAttribute('readonly') && sec.querySelector('.ks-textbox-field-inner').classList.contains('readonly'));
            w.updateHtml({value: 'server3', title: 'T2', editable: true});
            chk('readonlyRemoved', !input().hasAttribute('readonly'));
            delete Widgets[id];
        }
        if (name === 'Button') {
            const id = 'bhButton', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml([], {label: 'A', icon: 'icon-x'}));
            const a = () => sec.firstElementChild;
            w.updateHtml({label: 'B "q"', icon: 'icon-y', url: 'http://localhost/z', paste: true});
            chk('labelAndTitleFollowData', sec.querySelector('.ks-button-label').innerHTML === 'B "q"' && sec.querySelector('.ks-button-label').getAttribute('title') === 'B "q"');
            chk('iconClassFollowsData', sec.querySelector('.ks-button-icon span') && sec.querySelector('.ks-button-icon span').className === 'icon-y');
            chk('hrefTargetAndActionSet', a().getAttribute('href') === 'http://localhost/z' && a().getAttribute('target') === '_blank' && a().getAttribute('data-action') === 'launchpaste');
            w.updateHtml({label: 'B', icon: false});
            chk('hrefTargetRemoved', !a().hasAttribute('href') && !a().hasAttribute('target') && a().getAttribute('data-action') === 'launch');
            chk('iconRemoved', !sec.querySelector('.ks-button-icon span') && !a().classList.contains('has-icon'));
            w.updateHtml({label: '', icon: 'icon-z'});
            chk('iconRecreatedAndLabelClass', !!sec.querySelector('.ks-button-icon span') && !a().classList.contains('has-label') && a().classList.contains('has-icon'));
            delete Widgets[id];
        }
        if (name === 'GridTableCell') {
            const id = 'bhCell', cellId = 'bhCellFrame', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml(['<span class="child-x">c</span>'], {cellId, skin: 'template_table_text', cellWidth: '100px'}));
            const cell = () => document.getElementById(cellId);
            cell().classList.add('selected', 'active-cell'); cell().setAttribute('data-row', '3'); cell().setAttribute('data-col', '4');
            const node = cell();
            w.updateHtml({cellId, skin: 'template_table_text', cellWidth: '150px', cellVisible: false});
            chk('skinClassKept', cell().classList.contains('ks-grid-table-cell-template_table_text') && !cell().classList.contains('ks-grid-table-cell-standard'));
            chk('runtimeSelectionKept', cell().classList.contains('selected') && cell().classList.contains('active-cell') && cell().getAttribute('data-row') === '3' && cell().getAttribute('data-col') === '4');
            chk('sameNodeAndChildKept', cell() === node && !!cell().querySelector('.child-x'));
            chk('widthAndHiddenFollowData', cell().style.width === '150px' && cell().style.display === 'none');
            w.updateHtml({cellId, skin: 'template_table_text', cellWidth: '150px'});
            chk('visibleAgainWithoutForcedBlock', cell().style.display === '');
            delete Widgets[id];
        }
        if (['Panel', 'Grid', 'GridRow', 'GridCell'].includes(name)) {
            const id = 'bh' + name, w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml(...spec.args(), {skin: 's1', width: 50}));
            const main = sec.firstElementChild;
            main.classList.add('x-runtime');
            w.updateHtml({skin: 's2', width: 80, height: 30});
            chk('skinFollowsData', [...main.classList].some(c => c.endsWith('-s2')) && ![...main.classList].some(c => c.endsWith('-s1')));
            chk('runtimeClassKept', main.classList.contains('x-runtime') && sec.firstElementChild === main);
            chk('childKept', !!sec.querySelector('.child-x'));
            if (name !== 'Panel') chk('styleFollowsData', /height:\s*30px/.test(main.getAttribute('style') || ''));
            delete Widgets[id];
        }
        if (name === 'Image') {
            const idI = 'bhImageIcon', wI = new Current({id: idI, icon: 'star'}); Widgets[idI] = wI; cleanupIds.push(idI);
            const secI = mount(idI, wI.getHtml([], {icon: 'a'}));
            wI.updateHtml({icon: 'b'});
            chk('iconClassFollowsData', !!secI.querySelector('span') && secI.querySelector('span').className === 'icon-b');
            const idF = 'bhImageFile', wF = new Current({id: idF}); Widgets[idF] = wF; cleanupIds.push(idF);
            const secF = mount(idF, wF.getHtml([], {fileName: 'a.png', title: 'A'}));
            wF.updateHtml({fileName: 'b.png', title: 'B'});
            const img = secF.querySelector('img');
            chk('fileAndAltFollowData', /\/b\.png\?v=/.test(img.getAttribute('src')) && img.getAttribute('alt') === 'B');
            chk('cacheBusterEveryUpdate', (() => { const before = img.getAttribute('src'); wF.updateHtml({fileName: 'b.png', title: 'B'}); return img.getAttribute('src') !== before; })());
        }
        if (name === 'PasswordText') {
            const id = 'bhPassword', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml([], {width: 100}));
            const input = sec.querySelector('input'), icon = sec.querySelector('i');
            input.value = 'secret'; input.setAttribute('type', 'text'); icon.classList.remove('icon-eye'); icon.classList.add('icon-eye-slash');
            w.updateHtml({width: 200, inputStyle: {font_size: '12px'}});
            chk('passwordCleared', input.value === '');
            chk('typeAndEyeStateKept', input.getAttribute('type') === 'text' && icon.classList.contains('icon-eye-slash'));
            chk('styleFollowsData', sec.firstElementChild.style.width === '200px' && input.style.fontSize === '12px');
        }
        if (name === 'TextArea') {
            const id = 'bhTextArea', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml([], {value: 'server1', editable: false, placeholder: 'p', ordinal: 1}));
            const ta = () => sec.querySelector('textarea');
            w.initEventHandlers();
            chk('handlerBoundEvenWhenReadonly', !!($._data(ta(), 'events') || {}).focusout);
            chk('disabledAndPlaceholder', ta().hasAttribute('disabled') && ta().getAttribute('placeholder') === 'p');
            w.updateHtml({value: 'server2', editable: true, ordinal: 2});
            chk('enabledAndPlaceholderRemoved', !ta().hasAttribute('disabled') && !ta().hasAttribute('placeholder') && ta().getAttribute('data-ordinal') === '2' && w.editable === true);
            chk('unfocusedValueFollowsData', ta().value === 'server2' && ta().defaultValue === 'server2');
            ta().focus(); ta().value = 'typed by the user';
            w.updateHtml({value: 'server3', editable: true, ordinal: 2});
            chk('focusedTypedValueKept', document.activeElement === ta() && ta().value === 'typed by the user');
        }
        if (name === 'GridTableHeaderCell') {
            const id = 'bhHeaderCell', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            mount(id, w.getHtml(['<span class="child-x">c</span>'], {cellHeaderSkin: 'grey', width: 100}));
            const cell = () => document.getElementById(id);
            cell().classList.add('x-runtime');
            w.updateHtml({cellHeaderSkin: 'blue', width: 150, cellVisible: false});
            chk('skinFollowsData', cell().classList.contains('ks-grid-table-head-cell-blue') && !cell().classList.contains('ks-grid-table-head-cell-grey'));
            chk('widthAndHiddenFollowData', cell().style.width === '150px' && cell().style.display === 'none');
            chk('runtimeClassAndChildKept', cell().classList.contains('x-runtime') && !!cell().querySelector('.child-x') && cell().classList.contains('ks-grid-table-cell'));
            w.updateHtml({cellHeaderSkin: 'blue', width: 150});
            chk('visibleAgainWithoutForcedBlock', cell().style.display === '');
        }
        if (name === 'DropBox') {
            const id = 'bhDropBox', w = new Current({id}); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml([], {items: [{name: 'A', on: false}, {name: 'B', on: true}], skin: 's1', panelWidth: 100}));
            const panel = () => sec.querySelector('.ks-dropbox-panel'), input = () => sec.querySelector('.ks-dropbox-input');
            panel().style.display = 'block'; input().value = 'typed search';
            w.updateHtml({items: [{name: 'A', on: false}, {name: 'B', on: true}], skin: 's2', panelWidth: 300, title: 'T2', titleVisible: true});
            chk('openPanelStaysOpen', panel().style.display === 'block');
            chk('typedSearchKept', input().value === 'typed search');
            chk('panelWidthFollowsData', panel().style.width === '300px');
            chk('skinAndTitleFollowData', sec.firstElementChild.classList.contains('ks-dropbox-s2') && !sec.firstElementChild.classList.contains('ks-dropbox-s1') && sec.querySelector('.ks-dropbox-title-primary').innerHTML === 'T2');
            w.updateHtml({items: [{name: 'x', on: false}, {name: 'y', on: false}, {name: 'z', on: false}], skin: 's2', panelWidth: 300, title: 'T2', titleVisible: true});
            chk('itemsFollowData', sec.querySelectorAll('.ks-dropbox-panel-item').length === 3);
        }
        if (name === 'GridTable') {
            const id = 'bhGridTable', base = clone(spec.baseOptions), w = new Current({id, title: 'T1', ...base}); spec.setup(w); Widgets[id] = w; cleanupIds.push(id);
            const sec = mount(id, w.getHtml(...spec.args(), {rowHeight: 30, skin: 's1'}));
            const main = sec.firstElementChild, rows = () => [...sec.querySelectorAll('.ks-grid-table-content > .ks-grid-table-row')];
            rows()[0].classList.add('x-runtime'); rows()[1].style.display = 'none'; main.classList.add('x-runtime');
            chk('rowsRendered', rows().length === 2 && rows()[0].style.height === '30px');
            w.updateHtml({rowHeight: 50, skin: 's2', borderBottom: false});
            chk('rowHeightAndBorderFollowData', rows().every(r => r.style.height === '50px' && !r.classList.contains('border-bottom')));
            chk('skinFollowsData', !!sec.querySelector('.ks-grid-table-s2') && !sec.querySelector('.ks-grid-table-s1'));
            chk('hiddenRowAndRuntimeClassKept', rows()[1].style.display === 'none' && rows()[0].classList.contains('x-runtime') && main.classList.contains('x-runtime') && sec.firstElementChild === main);
            const generatedHeader = sec.querySelector('.ks-grid-table-head > .ks-grid-table-row');
            chk('generatedHeaderRowFollowsData', generatedHeader.style.height === '50px' && !generatedHeader.classList.contains('border-bottom'));
            const idH = 'bhGridTableHide', wH = new Current({id: idH, hideIfNoData: true, ...clone(spec.baseOptions)}); spec.setup(wH); Widgets[idH] = wH; cleanupIds.push(idH);
            const secH = mount(idH, wH.getHtml(...spec.args(), {content: []}));
            chk('hiddenWithoutData', secH.firstElementChild.style.display === 'none');
            wH.updateHtml({content: [[{}]]});
            chk('visibleAgainWithData', secH.firstElementChild.style.display === '' && secH.style.display === 'unset');
        }
        if (name === 'GridTableHeaderRow') {
            const id = 'bhHeaderRow', cid = 'bhHeaderRowChild', w = new Current({id, widgets: [{id: cid}]}); Widgets[id] = w; Widgets[cid] = {options: {id: cid}}; cleanupIds.push(id, cid);
            mount(id, w.getHtml(['<div id="' + cid + '" class="ks-grid-table-cell child-x">c</div>'], {alignment: 'left', borderBottom: true}));
            const row = document.getElementById(cid).parentElement;
            row.classList.add('x-runtime');
            w.updateHtml({alignment: 'center', borderBottom: false, borderTop: false});
            chk('classesFollowData', row.classList.contains('ks-row-pos-center') && !row.classList.contains('ks-row-pos-left') && !row.classList.contains('border-bottom') && !row.classList.contains('border-top'));
            chk('runtimeClassAndChildKept', row.classList.contains('x-runtime') && !!row.querySelector('.child-x') && row.classList.contains('ks-grid-table-row'));
        }
    } finally {
        cleanupIds.forEach(i => delete Widgets[i]);
        delete Widgets['grpX'];
        host.remove();
    }
    return report;
}

if (typeof module !== 'undefined') {
    module.exports = {widgetModelChecks};
}
