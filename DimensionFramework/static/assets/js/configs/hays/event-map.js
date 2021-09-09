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

    'launch.haysMainRow11Cell2Button': [
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
            action: app.fn.togglePopup,
            argument: 'haysMainKAMPopup'
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
            argument: 'haysArbeitsbericht'
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
            argument: 'haysZEGBericht'
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
    'launch.haysMainKAMPopupButton1': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysKamForecasting'
        }
    ],
    'launch.haysMainKAMPopupButton2': [
        {
            action: app.fn.openPageWithState,
            argument: 'haysForecastingHierarchy'
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

    'text_click.haysKamForecastingGridTable_0_0.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'text_click.haysKamForecastingGridTable_0_1.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'text_click.haysKamForecastingGridTable_0_2.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'text_click.haysKamForecastingGridTable_0_3.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'haysKamForecastingFilterPopUpDropdown'
        },
        {
            action: app.fn.openPopup,
            argument: 'haysKamForecastingFilterPopUp'
        }
    ],

    'text_click.haysKamForecastingGridTable_0_4.finished': [
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

    'switch.haysForecastingHierarchyGrid2Level1GridTable': [
        {
            action: app.fn.showWidget,
            argument: 'haysForecastingHierarchyGrid2Row_01_02'
        }
    ],
    'switch.haysForecastingHierarchyGrid2Level2GridTable': [
        {
            action: app.fn.showWidget,
            argument: 'haysForecastingHierarchyGrid2Row_01_03'
        }
    ],

    'switch.haysForecastingHierarchyGrid2Level3GridTable': [
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
            action: app.fn.openPageWithState,
            argument: 'haysForecastingHierarchy'
        }
    ],

};
