/* global app */
'use strict';
app.eventMap = {

    'launch.haysMainRow5Cell2Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysArbeitsberichtPivot'
        }
    ],
    'launch.haysArbeitsberichtPivotGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],
    'launch.haysMainRow5Cell3Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysZEGBericht'
        }
    ],
    'launch.haysZEGBerichtGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],
    'launch.haysMainRow7Cell2Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysSettings'
        }
    ],
    'launch.haysSettingsGridRow2Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ]
};
