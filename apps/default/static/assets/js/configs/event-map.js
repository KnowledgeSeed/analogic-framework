/* global app */
'use strict';
EventMap = {
    'launch.analogicMainCompareToGridTable': [
        {
            action: Api.openPage,
            argument: 'analogicCompareGridTablePage'
        }
    ],
    'launch.analogicCompareGridTableBack': [
        {
            action: Api.openPage,
            argument: 'analogicMain'
        }
    ]
};
