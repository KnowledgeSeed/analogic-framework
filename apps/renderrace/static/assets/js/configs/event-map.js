/* global app, RenderRace, Api */
'use strict';

var RenderRace = window.RenderRace = window.RenderRace || {rows: 12, latencies: [], defaultLatency: 600, log: []};

// A click on a table cell refreshes the standalone editable text and the table, the way the comment
// icons of the customer page refresh their widgets. The refresh arrives after the latency, so when the
// user clicks into the text right after a cell, it replaces the content of an element whose edit input
// is focused (report 1).
EventMap = {
    'text_click.rrBsTable': [{action: () => { RenderRace.log.push('text_click'); Api.updateContent('rrEditableText'); Api.updateContent('rrBsTable'); }}],
    'text_click.rrIsTable': [{action: () => { RenderRace.log.push('text_click'); Api.updateContent('rrEditableText'); Api.updateContent('rrIsTable'); }}]
};

// The page is consistent when exactly the panel of the selected segment is visible and its table
// shows the data of that segment.
RenderRace.check = () => {
    const segment = RenderRace.segment(), bs = $('#rrBsPanel'), is = $('#rrIsPanel'),
        bsVisible = bs.is(':visible'), isVisible = is.is(':visible'),
        visibleTable = segment === 'BS' ? '#rrBsTable' : '#rrIsTable',
        firstCell = $(visibleTable).find('.ks-text-title').filter((i, e) => /row 0$/.test($(e).text())).first().text(),
        ok = (segment === 'BS' ? bsVisible && !isVisible : isVisible && !bsVisible) && firstCell === segment + ' row 0';
    return {ok: ok, segment: segment, bsVisible: bsVisible, isVisible: isVisible, firstCell: firstCell};
};

// The page has no real skin: a little style for the segments and the tables, and a status bar that
// shows what is selected, what is on the page, and whether the two agree (for watching / recording).
$(() => {
    $('<style>').text(`
        body { font-family: Arial, sans-serif; }
        #rrToolbar { display: block; margin-top: 60px; }
        .ks-segment { display: inline-block; padding: 10px 22px; margin-right: 4px; border: 2px solid #1f5fbf; border-radius: 6px; cursor: pointer; font-size: 16px; }
        .ks-segment.ks-on { background: #1f5fbf; color: #fff; }
        [id$=PanelTitle] .ks-text-title { font-size: 22px; font-weight: bold; margin: 14px 0 6px; }
        .ks-grid-table .ks-text-title { padding: 3px 6px; }
        #rrStatusBar { position: fixed; top: 0; left: 0; right: 0; z-index: 10000; padding: 12px 20px; font-size: 18px; color: #fff; font-weight: bold; }
        #rrStatusBar.ok { background: #1d8a3a; } #rrStatusBar.bad { background: #c62828; } #rrStatusBar.busy { background: #6b6b6b; }
    `).appendTo('head');
    setInterval(() => {
        if (!$('#rrBsPanel').length) {
            return;
        }
        // The page render replaces the body, so the bar is (re)added once the page is there.
        const bar = $('#rrStatusBar').length ? $('#rrStatusBar') : $('<div id="rrStatusBar">').appendTo('body');
        const c = RenderRace.check(), busy = RenderRace.pending > 0,
            shown = c.bsVisible && c.isVisible ? 'both panels' : c.bsVisible ? 'Balance Sheet' : c.isVisible ? 'Income Statement' : 'no panel',
            shownCell = $('#rrBsPanel:visible, #rrIsPanel:visible').find('.ks-text-title').filter((i, e) => /row 0$/.test($(e).text())).first().text();
        bar.attr('class', busy ? 'busy' : c.ok ? 'ok' : 'bad').text(
            'Selected: ' + (c.segment === 'BS' ? 'Balance Sheet' : 'Income Statement') + '  |  Shown: ' + shown +
            ' (' + (shownCell || '-') + ')  |  ' + (busy ? 'loading ' + RenderRace.pending + '...' : c.ok ? 'CONSISTENT' : 'MISMATCH'));
    }, 100);
});

// Clicks a cell, then right away into the editable text, many times; the delayed refresh of the text
// lands while it is being edited. The page has to have the focus (a real click on it first), otherwise
// the browser fires no blur when the input is removed. Resolves with the uncaught errors.
RenderRace.fastClicks = async (rounds = 20, latency = 150) => {
    const errors = [], onError = e => errors.push(e.message), sleep = ms => new Promise(r => setTimeout(r, ms)),
        click = el => el && el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true})),
        exceptionHook = $.Deferred.exceptionHook;
    // An exception inside a $.Deferred callback (the refresh) is reported here, not as an error event.
    $.Deferred.exceptionHook = (error, stack) => {
        errors.push(error && error.message);
        exceptionHook && exceptionHook(error, stack);
    };
    window.addEventListener('error', onError);
    RenderRace.defaultLatency = latency;
    for (let i = 0; i < rounds; ++i) {
        click($('#rrBsTable_' + (i % 5) + '_0 .ks-text-title')[0]);
        await sleep(10);
        click($('#rrEditableText .ks-text-title')[0]);
        await sleep(latency + 50);
    }
    window.removeEventListener('error', onError);
    $.Deferred.exceptionHook = exceptionHook;
    RenderRace.defaultLatency = 600;
    return {hasFocus: document.hasFocus(), errors: errors};
};

// Two switches whose loads finish in the opposite order: the first one is slow, the second one fast.
RenderRace.raceSwitch = (slow = 1500, fast = 200) => {
    // Each switch loads both tables; the first switch is slow, the second fast.
    RenderRace.latencies = [slow, slow, fast, fast];
    const click = (id) => document.getElementById(id + '_rrSegmented').click();
    click('rrSegmentedItem2');
    return new Promise(resolve => setTimeout(() => {
        click('rrSegmentedItem1');
        setTimeout(() => resolve(RenderRace.check()), slow + fast + 1000);
    }, 100));
};
