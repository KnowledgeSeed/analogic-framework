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
    ],

    'launch.haysMainRow3Cell2Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysKamForecasting'
        }
    ],
    'launch.haysKamForecastingGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],
    'launch.haysMainRow3Cell3Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysForecastingHierarchy'
        }
    ],
    'launch.haysForecastingHierarchyGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],
    'launch.haysMainRow3Cell4Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysArbeitsbericht'
        }
    ],
    'launch.haysArbeitsberichtGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],

    'launch.haysKamForecastingGridRow2Cell4Button1': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingDepartmentPopUp'
        }
    ],

    'launch.haysKamForecastingGridRow2Cell2Button1': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingBusinessPopUp'
        }
    ],

    'launch.haysKamForecastingGridRow2Cell3Button1': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingAreaPopUp'
        }
    ],

    'launch.haysKamForecastingGridRow2Cell5Button1': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingTeamPopUp'
        }
    ],


    'launch.haysKamForecastingBusinessPopUpGridTable_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingAreaPopUp'
        }
    ],

    'launch.haysKamForecastingAreaPopUpGridTable_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingDepartmentPopUp'
        }
    ],

    'launch.haysKamForecastingDepartmentPopUpGridTable_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingTeamPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_0': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_1': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_2': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_3': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_4': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'launch.haysKamForecastingGridRow4Cell2Button': [
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingPointPopUp'
        }
    ]

};
