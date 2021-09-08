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

    'launch.haysMainRow8Cell2Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysSettings'
        }
    ],
    'launch.haysSettingsGridRow2Cell2Button': [
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
    'launch.haysKamForecastingGridRow2Cell7Button1': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysVersion'
        }
    ],
    'launch.haysVersionGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],

    'launch.haysSettingsGridRow3Cell2Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysUserGroups'
        }
    ],
    'launch.haysUserGroupsGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],

    'launch.haysUserGroupsGridRow3Cell1Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysUserGroupHierarchy'
        }
    ],
    'launch.haysUserGroupHierarchyGridRow1Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'haysMain'
        }
    ],

    'launch.haysUserGroupHierarchyGridRow2Cell2Button': [
        {
            action: app.fn.openPopup,
            argument: 'haysUserGroupHierarchyDeleteDataGridTablePopup'
        }
    ],

    'perform.haysKamForecastingGridTable_0_0.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_1.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_2.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_3.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'perform.haysKamForecastingGridTable_0_4.finished': [
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
    ],

    'switch.Level1hierarchy': [
        {
            action: app.fn.showWidget,
            argument: 'haysForecastingHierarchyGrid2Row_01_02'
        }
    ],
    'switch.Level2hierarchy': [
        {
            action: app.fn.showWidget,
            argument: 'haysForecastingHierarchyGrid2Row_01_03'
        }
    ],

    'switch.Level3hierarchy': [
        {
            action: app.fn.showWidget,
            argument: 'haysForecastingHierarchyGrid2Row_01_04'
        }
    ],

    'launch.haysUserGroupHierarchylDeleteDataGridTablePopupGridRow4Cell1Button': [
        {
            action: app.fn.togglePopup,
            argument: 'haysUserGroupHierarchyDeleteDataGridTablePopup'
        }
    ],

    'launch.haysKamForecastingGridRow2Cell0Button1': [
        {
            action: app.fn.openPage,
            argument: 'haysForecastingHierarchy'
        }
    ],

};
