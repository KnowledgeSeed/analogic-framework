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
    'launch.rocheBPSPProductsGridTableMonthly_row_0': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'isChildrenLocked',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsNoCheckoutPopup'
                        }
                    ]
                },
                {
                    conditionKey: 'isLockedByMe',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutPopup'
                        }
                    ]
                },
                {
                    conditionKey: 'isLocked',
                    actions: [
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutWarningByUserText'
                        },
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutWarning'
                        }
                    ]
                },
                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutPopup'
                        }
                    ]
                }
            ]
        }
    ],
    'launch.rocheBPSPProductsGridTableYearly_row_0': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'isChildrenLocked',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsNoCheckoutPopup'
                        }
                    ]
                },
                {
                    conditionKey: 'isLockedByMe',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutPopup'
                        }
                    ]
                },
                {
                    conditionKey: 'isLocked',
                    actions: [
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutWarningByUserText'
                        },
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutWarning'
                        }
                    ]
                },
                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutPopup'
                        }
                    ]
                }
            ]
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
    'launch.rocheBPSPProductsColumnSelectorCancelButton': [
        {
            action: app.fn.togglePopup,
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
    'segmentedControlTab2.rocheBPSPProductsPeriodUnitSegmentedControl': [
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
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsGridTableMonthly'
        }
    ],
    'segmentedControlTab1.rocheBPSPProductsPeriodUnitSegmentedControl': [
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
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsGridTableYearly'
        }
    ],
    'launch.rocheBPSPProductsCheckoutPopupFocusButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutPopup'
        }
    ],
    'launch.rocheBPSPProductsGridTableYearlyHeaderFocusButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable'
        }
    ],
    'launch.rocheBPSPProductsGridTableMonthlyHeaderFocusButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable'
        }
    ],
    'launch.rocheBPSPProductsProductSelectorShortcutPopupGridTable_row_0': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
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


    'launch.rocheBPSPProductsCommentShowGridRow5Button': [
        {
            action: app.fn.openPopup,
            argument: ['rocheBPSPProductsCommentEdit']
        },

        {
            action: app.fn.togglePopup,
            argument: ['rocheBPSPProductsCommentShow']
        }
    ],


    'launch.rocheBPSPProductsCommentEditGridRow4Button': [
        {
            action: app.fn.openPopup,
            argument: ['rocheBPSPProductsCommentShow']
        },

        {
            action: app.fn.togglePopup,
            argument: ['rocheBPSPProductsCommentEdit']
        }
    ],


    'launch.rocheBPSPProductsGridTableYearly_row_13': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasComment',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCommentShow'
                        }
                    ]
                },


                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCommentEdit'
                        }
                    ]
                }
            ]
        }
    ],


    'launch.rocheBPSPSettingsGridRow2Cell3Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMaterial'
        }
    ],


    'launch.rocheBPSPMaterialGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPSettings'
        }
    ],


};