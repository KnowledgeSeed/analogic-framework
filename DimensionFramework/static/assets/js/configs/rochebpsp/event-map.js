/* global app */
'use strict';
app.eventMap = {
    'launch.rocheBPSPMainGridRow3Cell1Button': [
        {
            action: app.fn.openPageWithState,
            argument: ['rocheBPSPCustomers', 'rocheBPSPCustomersTerritorySelector', 'rocheBPSPCustomersHorizontalTable', 'rocheBPSPCustomersHeaderInfoGridTable']
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton.finished': [
        {
            action: app.fn.checkTIResponseStatus,
            argument: [app.fn.openPage, 'rocheBPSPIpPlanningCheckout', app.fn.openPopup, 'rocheBPSPIpPlanningCheckoutWarning']
        }
    ],

    'launch.rocheBPSPipPlanningGridTableMonthly_row_0': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'isChildrenLocked',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
                        }
                    ]
                },
                {
                    conditionKey: 'isLockedByMe',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCheckoutPopup'
                        }
                    ]
                },
                {
                    conditionKey: 'isLocked',
                    actions: [
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCheckoutWarningContactEditorButton'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCheckoutWarningByUserText'
                        },
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCheckoutWarning'
                        }
                    ]
                },
                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCheckoutPopup'
                        }
                    ]
                }
            ]
        }
    ]
}
;