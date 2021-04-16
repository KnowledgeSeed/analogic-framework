/* global app */

'use strict';

app.eventMap = {
    'rightclick.grid_row_5': [
        {
            action: app.fn.openPopup,
            argument: 'tempPopupForGridTable'
        }
    ],
    'launch.paste': [
        {
            action: app.fn.pastToGridTableText,
            argument: ''
        }
    ]
};