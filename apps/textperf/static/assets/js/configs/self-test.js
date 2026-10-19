/* global app, TextPerf, Widgets, Api, Utils */
'use strict';

// In-page functional checks of the text widget behaviour, used by the Cypress spec and
// runnable by hand from the console: await TextPerf.selfTest()
// It is not loaded by the framework, the spec (or the console) pulls it in on demand.
TextPerf.selfTest = async () => {
    const results = [], wait = (ms = 30) => new Promise(resolve => setTimeout(resolve, ms)),
        check = (name, ok, details) => results.push({name: name, ok: !!ok, details: ok ? undefined : details}),
        events = () => TextPerf.log.map(l => l.event + ':' + l.id).join(' '),
        reset = () => TextPerf.log.length = 0,
        click = selector => { reset(); $(selector)[0].dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true})); return wait(); },
        rightClick = selector => { reset(); const e = new MouseEvent('contextmenu', {bubbles: true, cancelable: true}); $(selector)[0].dispatchEvent(e); return e.defaultPrevented; },
        key = (selector, keyCode) => { $(selector).trigger($.Event('keydown', {keyCode: keyCode})); return wait(); },
        children = selector => $(selector).children().map((i, e) => e.className).get().join(' '),
        errors = [], onError = e => errors.push(e.message);

    window.addEventListener('error', onError);

    // --- standalone widgets ---
    await click('#textperfPlainText .ks-text-title');
    check('plain: click fires text_click only', events() === 'text_click:textperfPlainText', events());
    check('plain: click does not open an editor', $('#textperfPlainText input').length === 0);

    await click('#textperfIconText .ks-text-icon span');
    check('icon: click fires perform, then text_click', events() === 'perform:textperfIconText text_click:textperfIconText', events());

    await click('#textperfEditableText .ks-text-title');
    let input = $('#textperfEditableText .ks-text-title-input');
    check('editable: click opens the editor with the current value', input.length === 1 && input.val() === 'edit me', input.val());
    check('editable: click fires text_click', events() === 'text_click:textperfEditableText', events());

    // The reported crash: a click inside the editor restarted the edit and removed the focused input.
    await click('#textperfEditableText .ks-text-title-input');
    check('editable: click inside the editor keeps the same input', $('#textperfEditableText .ks-text-title-input')[0] === input[0]);
    check('editable: click inside the editor keeps its value', $('#textperfEditableText .ks-text-title-input').val() === 'edit me');

    reset();
    input.val('changed "value"').trigger('focusout');
    await wait();
    check('editable: leaving the editor fires write with the new value',
        TextPerf.log.length === 1 && TextPerf.log[0].event === 'write' && TextPerf.log[0].value === Utils.escapeText('changed "value"'), JSON.stringify(TextPerf.log));
    check('editable: title shows the new value, editor is gone',
        $('#textperfEditableText .ks-text-title').text() === 'changed "value"' && $('#textperfEditableText input').length === 0);

    await click('#textperfEditableText .ks-text-title');
    check('editable: can be edited again, quotes survive', $('#textperfEditableText .ks-text-title-input').val() === 'changed "value"');
    $('#textperfEditableText .ks-text-title-input').val('edit me').trigger('focusout');
    await wait();

    check('right click: enabled widget fires rightclick and blocks the browser menu',
        rightClick('#textperfRightClickText .ks-text-title') === true && events() === 'rightclick:textperfRightClickText', events());
    check('right click: other widgets leave the browser menu alone',
        rightClick('#textperfPlainText .ks-text-title') === false && rightClick('#textperfEditableText .ks-text-title') === false && events() === '', events());

    // --- content update switches icon / body / editable on and off ---
    TextPerf.generation = 1;
    await Api.updateContentWithoutLoader('textperfDynamicText');
    await wait();
    check('update: icon, title and body are in this order',
        children('#textperfDynamicText .ks-text-inner') === 'ks-text-icon ks-text-title ks-text-body', children('#textperfDynamicText .ks-text-inner'));
    check('update: content is refreshed', $('#textperfDynamicText .ks-text-title').text() === 'Dynamic g1' &&
        $('#textperfDynamicText .ks-text-body').text() === 'dynamic body' && $('#textperfDynamicText .ks-text-icon span').hasClass('icon-copy'));
    check('update: editable attribute follows the state', $('#textperfDynamicText .ks-text-title').attr('data-editable') === '1');

    await click('#textperfDynamicText .ks-text-title');
    check('update: widget that became editable opens the editor', $('#textperfDynamicText .ks-text-title-input').length === 1);
    $('#textperfDynamicText .ks-text-title-input').trigger('focusout');
    await wait();

    await click('#textperfDynamicText .ks-text-icon span');
    check('update: icon added by the update fires perform', events() === 'perform:textperfDynamicText text_click:textperfDynamicText', events());

    TextPerf.generation = 2;
    await Api.updateContentWithoutLoader('textperfDynamicText');
    await wait();
    await click('#textperfDynamicText .ks-text-title');
    check('update: widget that is no longer editable does not open the editor',
        $('#textperfDynamicText input').length === 0 && $('#textperfDynamicText .ks-text-title').attr('data-editable') === '0');

    // --- grid table cells (column 1 editable, 2 performable with icon, 4 right click) ---
    const gridChecks = async (phase) => {
        await click('#textperfGrid_0_0 .ks-text-title');
        check(phase + 'grid: readonly cell fires text_click only', events() === 'grid.text_click:textperfGrid_0_0' && $('#textperfGrid_0_0 input').length === 0, events());

        await click('#textperfGrid_0_1 .ks-text-title');
        input = $('#textperfGrid_0_1 .ks-text-title-input');
        check(phase + 'grid: editable cell opens the editor', input.length === 1 && input.val() === $('#textperfGrid_0_1').data('expected'), input.val());

        await click('#textperfGrid_0_1 .ks-text-title-input');
        check(phase + 'grid: click inside the editor keeps the same input', $('#textperfGrid_0_1 .ks-text-title-input')[0] === input[0]);

        reset();
        input.val('42');
        await key(input, 13);
        check(phase + 'grid: Enter fires write once with the new value',
            TextPerf.log.length === 1 && TextPerf.log[0].event === 'grid.write' && TextPerf.log[0].value === '42', JSON.stringify(TextPerf.log));
        check(phase + 'grid: cell shows the new value', $('#textperfGrid_0_1 .ks-text-title').text() === '42' && $('#textperfGrid_0_1 input').length === 0);

        await click('#textperfGrid_0_1 .ks-text-title');
        await key('#textperfGrid_0_1 .ks-text-title-input', 40);
        // The previous editor is closed by the browser's own focusout, which only fires in a focused window.
        check(phase + 'grid: arrow down moves the editor to the next row',
            $('#textperfGrid_1_1 .ks-text-title-input').length === 1 && (!document.hasFocus() || $('#textperfGrid_0_1 input').length === 0));
        $('#textperfGrid_0_1 .ks-text-title-input, #textperfGrid_1_1 .ks-text-title-input').trigger('focusout');
        await wait();

        await click('#textperfGrid_0_2 .ks-text-icon span');
        check(phase + 'grid: icon fires perform, then text_click', events() === 'grid.perform:textperfGrid_0_2 grid.text_click:textperfGrid_0_2', events());

        check(phase + 'grid: right click on an editable cell fires rightclick once',
            rightClick('#textperfGrid_0_1 .ks-text-title') === true && events() === 'grid.rightclick:textperfGrid_0_1', events());
        check(phase + 'grid: right click on an enableRightClick cell fires rightclick once',
            rightClick('#textperfGrid_0_4 .ks-text-title') === true && events() === 'grid.rightclick:textperfGrid_0_4', events());
        check(phase + 'grid: right click on a readonly cell leaves the browser menu alone',
            rightClick('#textperfGrid_0_0 .ks-text-title') === false && events() === '', events());
    };

    const rememberValue = () => $('#textperfGrid_0_1').data('expected', $('#textperfGrid_0_1 .ks-text-title').text());

    rememberValue();
    await gridChecks('');

    ++TextPerf.generation;
    await Widgets.textperfGrid.updateContent();
    await wait();
    check('grid update: content is refreshed', $('#textperfGrid_0_0 .ks-text-title').text() === 'Row 0 (g' + TextPerf.generation + ')', $('#textperfGrid_0_0 .ks-text-title').text());
    rememberValue();
    await gridChecks('after update: ');

    ++TextPerf.generation;
    await Widgets.textperfGrid.reRenderWidget(false, false);
    await wait();
    check('grid re-render: content is refreshed', $('#textperfGrid_0_0 .ks-text-title').text() === 'Row 0 (g' + TextPerf.generation + ')', $('#textperfGrid_0_0 .ks-text-title').text());
    check('grid re-render: every cell is rendered', $('#textperfGrid .ks-grid-table-content .ks-grid-table-cell').length === TextPerf.rows * TextPerf.cols);
    rememberValue();
    await gridChecks('after re-render: ');

    reset();
    $('body').trigger('forcerefresh.textperfGrid_0_0');
    await wait(200);
    await click('#textperfGrid_0_0 .ks-text-title');
    check('grid cell refresh: refreshed cell still fires its events', events() === 'grid.text_click:textperfGrid_0_0', events());
    check('grid cell refresh: one refresh listener per cell',
        $._data(document.body, 'events').forcerefresh.filter(e => e.data.options.id === 'textperfGrid_0_0').length === 1);

    // --- markup ---
    const plainCell = children('#textperfGrid_0_0 .ks-text-inner'), plain = children('#textperfPlainText .ks-text-inner');
    if (TextPerf.compact) {
        check('compact: unused icon and body are not rendered', plainCell === 'ks-text-title' && plain === 'ks-text-title', plainCell + ' | ' + plain);
        check('compact: used icon and body are rendered', children('#textperfGrid_0_2 .ks-text-inner') === 'ks-text-icon ks-text-title' &&
            children('#textperfGrid_0_3 .ks-text-inner') === 'ks-text-title ks-text-body');
    } else {
        check('default: icon, title and body are always rendered',
            plainCell === 'ks-text-icon ks-text-title ks-text-body' && plain === plainCell, plainCell + ' | ' + plain);
    }
    check('icon position class is always present', $('#textperfPlainText .ks-text').hasClass('pos-icon-right') && $('#textperfIconText .ks-text').hasClass('pos-icon-left'));

    await wait(100);
    window.removeEventListener('error', onError);
    check('no uncaught errors', errors.length === 0, errors.join(' | '));

    return {compact: TextPerf.compact, passed: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok)};
};
