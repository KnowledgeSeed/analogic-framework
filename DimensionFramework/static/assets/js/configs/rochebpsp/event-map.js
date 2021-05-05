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
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsGridRow1Cell3DropBox']
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
            action: app.fn.conditionalGridTablePopup,
            argument: ['isChildrenLocked', 'rocheBPSPProductsNoCheckoutPopup', 'isLocked', 'rocheBPSPProductsCheckoutWarning', 'else', 'rocheBPSPProductsCheckoutPopup']
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
            argument: [app.fn.openPage, 'rocheBPSPProductsCheckout', app.fn.openPage, 'rocheBPSPProductsCheckout']  //app.fn.openPopup, 'rocheBPSPProductsCheckoutWarning']
        }
    ],
    'launch.rocheBPSPProductsCheckoutWarningCancel': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutWarning'
        }
    ],
    'launch.rocheBPSPProductsNoCheckoutPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsNoCheckoutPopup'
        }
    ],
    'segmentedControlTab2.rocheBPSPProductsPerionUnitSegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsGridTableYearly'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsGridTableMonthly'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsGridRow2Cell1Button'
        }
    ],
    'segmentedControlTab1.rocheBPSPProductsPerionUnitSegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsGridTableMonthly'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsGridTableYearly'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsGridRow2Cell1Button'
        }
    ],
    'launch.rocheBPSPProductsCheckoutPopupFocusButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutPopup'
        }
    ],

    //rocheBPSPProductsCheckout
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPProducts'
        }
    ],
    //end rocheBPSPProducts comment mody
    'launch.rocheBPSPProductsGridTableYearly_row_13': [
        {
            action: app.fn.openPopup,
            argument: ['rocheBPSPProductsCommentShow']
        }
    ],


    'launch.rocheBPSPProductsCommentShowGridRow3Button': [
        {
            action: app.fn.openPopup,
            argument: ['rocheBPSPProductsCommentEdit']
        }
    ],


    'launch.rocheBPSPProductsCommentEditGridRow3Button': [
        {
            action: app.fn.openPopup,
            argument: ['rocheBPSPProductsCommentShow']
        }
    ],

}; 