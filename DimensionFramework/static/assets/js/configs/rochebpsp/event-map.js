/* global app */
'use strict';
app.eventMap = {
    'launch.rocheBPSPMainGridRow3Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPCustomers'
        }
    ],

    'launch.rocheBPSPMainGridRow3Cell2Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPProducts'
        }
    ],

    'launch.rocheBPSPMainGridRow3Cell3Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPReports'
        }
    ],

    'launch.rocheBPSPMainGridRow3Cell4Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPSettings'
        }
    ],

    'launch.rocheBPSPCustomersGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],

    'launch.rocheBPSPProductsGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],

    'launch.rocheBPSPReportsGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],

    'launch.rocheBPSPSettingsGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],
    'launch.rocheBPSPProductsGridTableYearly_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutPopup'
        }
    ],
    'launch.rocheBPSPProductsGridRow2Cell1Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutPopupCheckoutButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutPopupCheckoutButton.finished': [
        {
            action: app.fn.checkTIResponseStatus,
            argument: [app.fn.openPage, 'rocheBPSPCustomers', app.fn.openPopup, 'rocheBPSPProductsCheckoutWarning']
        }
    ],
    'launch.rocheBPSPProductsCheckoutPopupFocusButton.finished': [
        {
            action: app.fn.checkTIResponseStatus,
            argument: [app.fn.openPage, 'rocheBPSPCustomers', app.fn.openPopup, 'rocheBPSPProductsColumnSelectorPopup']
        }
    ]
}; 