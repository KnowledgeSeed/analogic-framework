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
            argument: 'rocheBPSPProductsCheckoutCommentShow'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
        }
    ],
    'launch.rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutCommentEdit'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutCommentShow'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutCommentShowGridTable'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutCommentShowGridTableSource'
        }
    ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutColumnSelectorPopupDropBox'
        }
    ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorRestoreButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorUpdateButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPProducts'
        }
    ],
    'segmentedControlTab2.rocheBPSPProductsCheckoutPeriodUnitSegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsCheckoutGridTableYearly'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsCheckoutGridTableMonthly'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsCheckoutGridRow2Cell1Button'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsCheckoutGridRow2Cell1aButton'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsCheckoutGridRow2Cell1bButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutGridTableMonthly'
        }
    ],
    'segmentedControlTab1.rocheBPSPProductsCheckoutPeriodUnitSegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsCheckoutGridTableMonthly'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsCheckoutGridTableYearly'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductsCheckoutGridRow2Cell1Button'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsCheckoutGridRow2Cell1aButton'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductsCheckoutGridRow2Cell1bButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutGridTableYearly'
        }
    ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1bButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutUploadPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutUploadPopupPlDropbox'
        }
    ],
    'launch.rocheBPSPProductsCheckoutUploadPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutUploadPopup'
        }
    ],
  /*  'launch.rocheBPSPProductsCheckoutGridTableMonthlyHeaderButton-05': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutDistributionPopup'
        }
    ],*/
    'perform.rocheBPSPProductsCheckoutGridTableMonthly_row_4': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutDistributionPopup'
        }
    ],
    'perform.rocheBPSPProductsCheckoutGridTableYearly': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'distributionEdit',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutDistributionEditPopupGridTable'
                        }
                    ]
                },
                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
                        }
                    ]
                }
            ]
        }
    ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupCancel': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutDistributionEditPopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
        }
    ],
    //end rocheBPSPProductsCheckout comment mody

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

    'launch.rocheBPSPAddMaterialGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMaterial'
        }
    ],


    'launch.rocheBPSPMaterialGridRow4Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPAddMaterial'
        }
    ],


    'launch.rocheBPSPMainGridRow3Cell3Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPipPlanning'
        }
    ],

    'launch.rocheBPSPipPlanningGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox']
        }
    ],


    'launch.rocheBPSPMainGridRow5Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPSettings'
        }
    ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem1': [
        {
            action: app.fn.addSystemValue,
            argument: ['dynamicValue', 'Cash Sales']
        }
    ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem2': [
        {
            action: app.fn.addSystemValue,
            argument: ['dynamicValue', 'Lease']
        }
    ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem3': [
        {
            action: app.fn.addSystemValue,
            argument: ['dynamicValue', 'Return']
        }
    ],



        'launch.rocheBPSPipPlanningGridTableMonthlyHeaderFocusButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable'
        }
    ],


};