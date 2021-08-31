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
    ],
     'launch.rocheBPSPCustomersPlanningGridRow1Cell0Button.finished': [
        {
            action: app.fn.openPageWithState,
            argument: ['rocheBPSPCustomers', 'rocheBPSPCustomersHorizontalTable', 'rocheBPSPCustomersHeaderInfoGridTable']
        },
        {
            action: app.fn.removeWidgetValues,
            argument: [
                'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector',
                'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector',
                'rocheBPSPCustomersPlanningGridTableYearly',
                'rocheBPSPCustomersPlanningGridTableMonthly',
                'rocheBPSPCustomersPlanningPeriodUnitSegmentedControl',
                'rocheBPSPCustomersPlanningTypeSegmentedControl'
            ]
        },
        {
            action: app.fn.addSystemValue,
            argument: ['systemValueCustomersPlanningMonthlyType', 'Base Plan']
        },
        {
            action: app.fn.addSystemValue,
            argument: ['systemValueCustomersPlanningMonthlyTypeValue', 'Base Plan']
        },
        {
            action: app.fn.addSystemValue,
            argument: ['systemValueCustomerPlanningSegmentedControlPeriodUnit', 'Yearly']
        },
        {
            action: app.fn.addSystemValueByVal,
            argument: ['systemValueCustomersPlanningFocused', 'systemValueDefaultCustomersPlanningFocused']
        },
        {
            action: app.fn.addSystemValue,
            argument: ['systemValueIsCustomersPlanningFocused', false]
        },
        {
            action: app.fn.removeSliders,
            argument: ''
        }
    ]
}
;