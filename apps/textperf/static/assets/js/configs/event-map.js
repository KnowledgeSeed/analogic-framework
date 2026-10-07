/* global app */
'use strict';

// Every system event the text widgets can fire is recorded in TextPerf.log,
// so the tests can assert on what was fired, in which order, and with what value.
TextPerf.record = (name) => (argument, event, element) => {
    const d = element && element.data ? element.data() : {};
    TextPerf.log.push({event: name, id: d.id, action: d.action, value: d.value, on: d.on});
};

TextPerf.timed = (label, run) => () => {
    const start = performance.now();
    ++TextPerf.generation;
    $.when(run()).then(() => {
        TextPerf.lastTiming = {label: label, ms: Math.round(performance.now() - start)};
        $('#textperfTimingText .ks-text-title').text(label + ': ' + TextPerf.lastTiming.ms + ' ms, ' +
            $('#textperfGrid *').length + ' DOM elements in grid');
    });
};

EventMap = {
    'launch.textperfRerenderButton': [{action: TextPerf.timed('re-render', () => Api.forceRefresh('textperfGrid'))}],
    'launch.textperfUpdateButton': [{action: TextPerf.timed('update content', () => Api.updateContent('textperfGrid'))}],
    'launch.textperfToggleButton': [{action: TextPerf.timed('toggle standalone', () => Api.updateContent('textperfDynamicText'))}],

    'text_click.textperfGrid': [{action: TextPerf.record('grid.text_click')}],
    'perform.textperfGrid': [{action: TextPerf.record('grid.perform')}],
    'write.textperfGrid': [{action: TextPerf.record('grid.write')}],
    'rightclick.textperfGrid': [{action: TextPerf.record('grid.rightclick')}],
    'paste.textperfGrid': [{action: TextPerf.record('grid.paste')}],
    'pastelast.textperfGrid': [{action: TextPerf.record('grid.pastelast')}],

    'text_click.textperfPlainText': [{action: TextPerf.record('text_click')}],
    'text_click.textperfEditableText': [{action: TextPerf.record('text_click')}],
    'write.textperfEditableText': [{action: TextPerf.record('write')}],
    'text_click.textperfIconText': [{action: TextPerf.record('text_click')}],
    'perform.textperfIconText': [{action: TextPerf.record('perform')}],
    'rightclick.textperfRightClickText': [{action: TextPerf.record('rightclick')}],
    'text_click.textperfDynamicText': [{action: TextPerf.record('text_click')}],
    'perform.textperfDynamicText': [{action: TextPerf.record('perform')}],
    'write.textperfDynamicText': [{action: TextPerf.record('write')}]
};
