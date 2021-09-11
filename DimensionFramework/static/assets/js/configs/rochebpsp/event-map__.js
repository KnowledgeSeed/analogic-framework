/* global app */
'use strict';
app.eventMap = {
        'switch.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl.finished': [
        {
            action: app.fn.forceRefreshWidgets,
            argument: [
                'rocheBPSPCustomersPlanningMonthlyExcelExport',
                'rocheBPSPCustomersPlanningGridTableYearly',
                'rocheBPSPCustomersPlanningGridTableMonthly',
                'rocheBPSPCustomersPlanningTypeSegmentedControl',
                'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                'rocheBPSPCustomersPlanningMonthlyExcelUpload',
                'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
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