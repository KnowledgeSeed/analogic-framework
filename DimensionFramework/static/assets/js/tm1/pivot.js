/* global app */

Pivot = {callNum: 0};

Pivot.call = p => {
    ++Pivot.callNum;

    return $.ajax({
        url: 'pivot',
        method: p.method || 'POST',
        data: p.data || {},
        dataType: p.dataType || 'json'
    }).always(() => {
        --Pivot.callNum;
    });
};