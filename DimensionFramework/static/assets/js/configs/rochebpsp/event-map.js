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

    'launch.rocheBPSPSettingsGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],

    //start products
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
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsColumnSelectorPopupDropBox'
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
            argument: [app.fn.openPage, 'rocheBPSPProductsCheckout', app.fn.openPopup, 'rocheBPSPProductsCheckoutWarning']
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
    'launch.rocheBPSPProductsNoCheckoutPopupFocusButton': [
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
    'launch.rocheBPSPProductsColumnSelectorRestoreButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsColumnSelectorUpdateButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsCommentShowGridRow5Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCommentEdit'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCommentEditGridRow2CommentInput'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCommentEditGridRow3TextInput'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCommentShow'
        }
    ],


    'launch.rocheBPSPProductsCommentEditControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: ['rocheBPSPProductsCommentEdit']
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
        }
    ],

    'launch.rocheBPSPProductsGridTableMonthly_row_17': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasComment',
                    actions: [
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentShowGridTable'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentShowGridTableSource'
                        },
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
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentEditGridRow2CommentInput'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentEditGridRow3TextInput'
                        }
                    ]
                }
            ]
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
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentShowGridTable'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentShowGridTableSource'
                        },
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
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentEditGridRow2CommentInput'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCommentEditGridRow3TextInput'
                        }
                    ]
                }
            ]
        }
    ],
    'launch.rocheBPSPProductsCommentEditGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCommentEdit'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
        }
    ],
    'launch.rocheBPSPProductsCommentShowGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCommentShow'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
        }
    ],
    'launch.rocheBPSPProductsCommentEditControlPanelSaveButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCommentEdit'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCommentShow'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCommentShowGridTable'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCommentShowGridTableSource'
        }
    ],
    'launch.rocheBPSPProductsGridRow1Cell4Button': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsInfoPopupText1'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsInfoPopupText2'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsInfoPopup'
        }
    ],
    'launch.rocheBPSPProductsInfoPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsInfoPopup'
        }
    ],

    //end products

    //rocheBPSPProductsCheckout
    'launch.rocheBPSPProductsCheckoutGridRow1Cell4Button': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutInfoPopupText1'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutInfoPopupText2'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutInfoPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutInfoPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutInfoPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutCommentShowGridRow5Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutCommentEdit'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutCommentEditGridRow3TextInput'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutCommentShow'
        }
    ],


    'launch.rocheBPSPProductsCheckoutCommentEditControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: ['rocheBPSPProductsCheckoutCommentEdit']
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
        }
    ],

    'launch.rocheBPSPProductsCheckoutGridTableMonthly_row_17': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasComment',
                    actions: [
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentShowGridTable'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentShowGridTableSource'
                        },
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutCommentShow'
                        }
                    ]
                },


                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutCommentEdit'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentEditGridRow3TextInput'
                        }
                    ]
                }
            ]
        }
    ],


    'launch.rocheBPSPProductsCheckoutGridTableYearly_row_13': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasComment',
                    actions: [
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentShowGridTable'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentShowGridTableSource'
                        },
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutCommentShow'
                        }
                    ]
                },


                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutCommentEdit'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCommentEditGridRow3TextInput'
                        }
                    ]
                }
            ]
        }
    ],
    'launch.rocheBPSPProductsCheckoutCommentEditGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutCommentEdit'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
        }
    ],
    'launch.rocheBPSPProductsCheckoutCommentShowGridXButton': [
        {
            action: app.fn.togglePopup,
            ar