/* global app */
'use strict';
app.eventMap = {

    'launch.rocheBPSPMainGridRow3Cell1Button': [
        {
            action: app.fn.openPageWithState,
            argument: 'rocheBPSPCustomers'
        }
    ],


    'launch.rocheBPSPMainGridRow3Cell2Button': [
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsGridRow1Cell3DropBox', 'rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly']
        },
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
            argument: ['rocheBPSPProductsGridRow1Cell3DropBox', 'rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly']
        }
    ],

    'launch.rocheBPSPSettingsGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],

    'launch.rocheBPSPMainGridRow5Cell1aSubmitToBPXP': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMainSubmissionToBPXPPopup'
        }
    ],
    'launch.rocheBPSPMainSubmissionToBPXPPopupNo': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMainSubmissionToBPXPPopup'
        }
    ],
    'launch.rocheBPSPMainSubmissionToBPXPPopupYes': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMainSubmissionToBPXPPopup'
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
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutWarningContactEditorButton'
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
                },
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
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutWarningContactEditorButton'
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
    'upload.rocheBPSPProductsCheckoutUploadPopupUpload.finished': [
        {
            action: app.fn.executeRequest,
            argument: 'request.rocheBPSPProductsCheckoutUploadPopupUpload'
        }
    ],
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
    'choose.rocheBPSPProductsGridRow1Cell2DropBox': [
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsGridRow1Cell3DropBox']
        }
    ],
    'choose.rocheBPSPipPlanningGridRow1Cell2DropBox': [
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox']
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
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly', 'rocheBPSPProductsCheckoutCopyMergePopupSlider']
        },
        {
            action: app.fn.removeSliders,
            argument: ''
        }
    ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button.finished': [

        {
            action: app.fn.openPage,
            argument: 'rocheBPSPProducts'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPProductsCheckoutGridTableYearly', 'rocheBPSPProductsCheckoutGridTableMonthly']
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
    'request.rocheBPSPProductsCheckoutUploadPopupUpload.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutUploadPopupUpload'
        }
    ],
    'upload.rocheBPSPProductsCheckoutUploadPopupUpload.error': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutUploadPopupUpload'
        }
    ],
    'write.rocheBPSPProductsCheckoutGridTableMonthly.finished': [
        {
            action: app.fn.executeRequest,
            argument: 'writeMonthlySplitType.rocheBPSPProductsCheckoutGridTableMonthly'
        }
    ],
    'pastelast.rocheBPSPProductsCheckoutGridTableMonthly.finished': [
        {
            action: app.fn.executeRequest,
            argument: 'writeMonthlySplitType.rocheBPSPProductsCheckoutGridTableMonthly'
        }
    ],
    'launch.rocheBPSPProductsCheckoutGridTableMonthly_row_4': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductsCheckoutDistributionPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutCopyMergeBackButton': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductsCheckoutCopyMergePopupSlider'
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
                            action: app.fn.addGridTableCurrentRowSystemValue,
                            argument: ['DistributionEditProductCode', 'rocheBPSPProductsCheckoutGridTableYearly', 1, 'title']
                        },
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
                        },
                        {
                            action: app.fn.forceRefreshWithDelay,
                            argument: ['rocheBPSPProductsCheckoutDistributionEditPopupGridTable', 500]
                        }
                    ]
                },
                {
                    conditionKey: 'copyMerge',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPProductsCheckoutCopyMergePopupSlider'
                        }
                    ]
                }
            ]
        }
    ],
    'perform.rocheBPSPProductsCheckoutGridTableYearly.finished': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'performWrite',
                    actions: [
                        {
                            action: app.fn.forceRefreshWithDelay,
                            argument: ['rocheBPSPProductsCheckoutGridTableYearly', 500]
                        }
                    ]
                }
            ]
        }
    ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupCopyButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupMergeButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
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
    'launch.rocheBPSPProductsCheckoutDistributionEditPopupControlPanelSaveButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupLastYearButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutDistributionPopup'
        }
    ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupLinearSplitButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductsCheckoutDistributionPopup'
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
            action: app.fn.resetWidgetValue,
            argument: 'rocheBPSPAddMaterialGridRow4Cell3Dropbox'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell3Dropbox'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: 'rocheBPSPAddMaterialGridRow4Cell1Search'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell1Search'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: 'rocheBPSPAddMaterialGridRow4Cell2Search'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell2Search'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: 'rocheBPSPAddMaterialGridRow4Cell4Search'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell4Search'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: 'rocheBPSPAddMaterialGridRow4Cell5Search'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell5Search'
        },
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMaterial'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['RocheBPSPMaterialsAddMaterialSearch']
        },
    ],

    'launch.rocheBPSPMaterialGridRow4Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPAddMaterial'
        }
    ],


    'launch.rocheBPSPMainGridRow3Cell3Button': [
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox', 'rocheBPSPipPlanningGridTableMonthly']
        },
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
            argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox', 'rocheBPSPipPlanningGridTableMonthly']
        }
    ],


    'launch.rocheBPSPMainGridRow5Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPSettings'
        }
    ],

    'launch.rocheBPSPIpPlanningCheckoutPopupFocusButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton.finished': [
        {
            action: app.fn.checkTIResponseStatus,
            argument: [app.fn.openPage, 'rocheBPSPIpPlanningCheckout', app.fn.openPopup, 'rocheBPSPIpPlanningCheckoutWarning']
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutWarningCancel': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutWarning'
        }
    ],
    'launch.rocheBPSPIpPlanningNoCheckoutPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningNoCheckoutPopupFocusButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
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
    'launch.rocheBPSPipPlanningGridRow1Cell4Button': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText1'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText2'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
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

    'launch.rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable_row_0': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow1Cell4Button': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText1'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText2'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutInfoPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell3Button.finished': [
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPipPlanningGridTableMonthly']
        },
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPipPlanning'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell1bButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutUploadPopupPlDropbox'
        }
    ],
    'launch.rocheBPSPIpPlanningCheckoutUploadPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
        }
    ],
    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload.finished': [
        {
            action: app.fn.executeRequest,
            argument: 'request.rocheBPSPIpPlanningCheckoutUploadPopupUpload'
        }
    ],
    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload.error': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutUploadPopupUpload'
        }
    ],
    'request.rocheBPSPIpPlanningCheckoutUploadPopupUpload.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutUploadPopupUpload'
        }
    ],

    'segmentedControlTab1.rocheBPSPAddMaterialGridRow2Cell1SegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        },
        {
            action: app.fn.showWidget,
            argument: 'RocheBPSPMaterialsAddMaterialClipboard'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPAddMaterialGridRow4'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPAddMaterialGridRow3'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPMateralsAddMaterialSearchPagerPanel'
        }
    ],


    'segmentedControlTab2.rocheBPSPAddMaterialGridRow2Cell1SegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'RocheBPSPMaterialsAddMaterialClipboard'
        },
        {
            action: app.fn.showWidget,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPAddMaterialGridRow3'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPAddMaterialGridRow4'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPMateralsAddMaterialSearchPagerPanel'
        }
    ],

    'segmentedControlTab1.rocheBPSPMaterialGridRow2Cell1SegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPMaterialGridTable'
        }
    ],

    'segmentedControlTab2.rocheBPSPMaterialGridRow2Cell1SegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPMaterialGridTable'
        },
        {
            action: app.fn.showWidget,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        }
    ],

    'launch.rocheBPSPMaterialGridRow4Cell2Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialAddDummyPopup'
        },
    ],
    'launch.rocheBPSPMaterialAddDummyPopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialAddDummyPopup'
        }
    ],

    'launch.rocheBPSPMaterialAddDummyPopupControlPanelAddButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialAddDummyPopup'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        }
    ],

    'launch.rocheBPSPMaterialGridTable_row_5': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialMoveDataPopup'
        },


    ],

    'launch.rocheBPSPMaterialMoveDataPopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialMoveDataPopup'
        }
    ],

    'launch.rocheBPSPMaterialMoveDataPopupControlPanelAddButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialMoveDataPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        }
    ],

    'launch.rocheBPSPMateralsAddMaterialSearchPagerPreviousButton': [
        {
            action: app.fn.decreasePage,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerNextButton': [
        {
            action: app.fn.increasePage,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerFirstPageButton': [
        {
            action: app.fn.jumpToFirstPage,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerLastPageButton': [
        {
            action: app.fn.jumpToLastPage,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],

    'launch.rocheBPSPMaterialGridTable_row_4': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialDeleteDataPopup'
        },


    ],


    'launch.rocheBPSPMaterialDeleteDataPopupControlPanelAddButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialDeleteDataPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        }
    ],
    'launchpaste.rocheBPSPAddMaterialGridRow3Cell2Button.finished': [
        {
            action: app.fn.executeRequest,
            argument: 'insert.rocheBPSPAddMaterialGridRow3Cell2Button'
        }
    ],

    'launch.rocheBPSPMaterialDeleteDataPopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialDeleteDataPopup'
        }
    ],

    'launch.RocheBPSPMaterialIPNodeGridTable_row_4': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
        },
    ],

    'launch.rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelAddButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        }
    ],

    'launch.rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
        }
    ],

    'launch.rocheBPSPMaterialGridTable_row_3': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialAddDummyGridTablePopupGridRow3Cell1Dropbox'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialAddDummyGridTablePopupGridRow4Cell1Dropbox'
        }
    ],
    'launch.rocheBPSPMaterialAddDummyGridTablePopupControlPanelCancelButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
        }
    ],

    'launch.rocheBPSPMaterialAddDummyGridTablePopupControlPanelAddButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        }
    ],


    'launch.RocheBPSPMaterialIPNodeGridTable_row_3': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialAddDummyGridTableIPpopupGridRow4Cell1Dropbox'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialAddDummyGridTableIPpopupGridRow3Cell1Dropbox'
        }
    ],
    'launch.rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
        }
    ],

    'launch.rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelAddButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        }

    ],

    'launch.RocheBPSPMaterialIPNodeGridTable_row_5': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
        },
    ],

    'launch.rocheBPSPMaterialMoveDataIPNodePopupControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
        }
    ],

    'launch.rocheBPSPMaterialMoveDataIPNodePopupControlPanelAddButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPMaterialGridTable'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialIPNodeGridTable'
        }
    ],

    'launch.rocheBPSPAddMaterialGridRow4CellRefreshButton.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],

    'launch.rocheBPSPAddMaterialGridRow4Cell6Button.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],

    'launch.rocheBPSPAddMaterialGridRow4Cell7Button.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],


    'launch.rocheBPSPAddMaterialGridRow4CellClearAllFilterButton.finished': [

        {
            action: app.fn.resetWidgetValue,
            argument: ['rocheBPSPAddMaterialGridRow4Cell3Dropbox']
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell3Dropbox'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: ['rocheBPSPAddMaterialGridRow4Cell1Search']
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell1Search'
        },

        {
            action: app.fn.resetWidgetValue,
            argument: ['rocheBPSPAddMaterialGridRow4Cell2Search']
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell2Search'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: ['rocheBPSPAddMaterialGridRow4Cell4Search']
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell4Search'
        },
        {
            action: app.fn.resetWidgetValue,
            argument: ['rocheBPSPAddMaterialGridRow4Cell5Search']
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell5Search'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPAddMaterialGridRow4Cell5ValidToggle'
        }

    ],


    'launch.rocheBPSPIpPlanningCommentEditControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: ['rocheBPSPIpPlanningCommentEdit']
        },

        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
        }

    ],

    'launch.rocheBPSPipPlanningGridTableMonthly_row_21': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasComment',
                    actions: [

                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCommentShowGridTable'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCommentShowGridTableSource'
                        },

                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCommentShow'
                        }
                    ]
                },
                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCommentEdit'
                        },

                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCommentEditGridRow2CommentInput'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCommentEditGridRow3TextInput'
                        }

                    ]
                }
            ]
        }
    ],


    'launch.rocheBPSPIpPlanningCommentEditGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCommentEdit'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
        }


    ],


    'launch.rocheBPSPIpPlanningCommentEditControlPanelSaveButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCommentEdit'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCommentShow'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCommentShowGridTable'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCommentShowGridTableSource'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPipPlanningGridTableMonthly'
        }


    ],


    'launch.rocheBPSPIpPlanningCommentShowGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCommentShow'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
        }


    ],


    'launch.rocheBPSPIpPlanningCommentShowGridRow5Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCommentEdit'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCommentShow'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCommentEditGridRow2CommentInput'
        },

        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCommentEditGridRow3TextInput'
        },


    ],


    'launch.rocheBPSPIpPlanningCheckoutCommentEditControlPanelCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: ['rocheBPSPIpPlanningCheckoutCommentEdit']
        },

        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
        }

    ],

    'launch.rocheBPSPIpPlanningCheckoutGridTableMonthly_row_21': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasComment',
                    actions: [

                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTable'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource'
                        },

                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
                        }
                    ]
                },
                {
                    conditionKey: 'else',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow3TextInput'
                        }

                    ]
                }
            ]
        }
    ],


    'launch.rocheBPSPIpPlanningCheckoutCommentEditGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
        }


    ],


    'launch.rocheBPSPIpPlanningCheckoutCommentEditControlPanelSaveButton.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTable'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutGridTableMonthly'
        }

    ],


    'launch.rocheBPSPIpPlanningCheckoutCommentShowGridXButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
        }


    ],


    'launch.rocheBPSPIpPlanningCheckoutCommentShowGridRow5Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow3TextInput'
        }
    ],


    'launch.rocheBPSPAddMaterialGridRow3Cell3Button.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialClipboard'
        }

    ],

    'launch.rocheBPSPAddMaterialRemoveClipBoard.finished': [
        {
            action: app.fn.forceRefreshWithDelay,
            argument: ['RocheBPSPMaterialsAddMaterialClipboard', 500]
        }

    ],

    'launch.RocheBPSPMaterialsAddMaterialSearchButton14.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }

    ],
    'launch.RocheBPSPMaterialsAddMaterialSearchSelectAll.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'RocheBPSPMaterialsAddMaterialSearch'
        }
    ],

    'launch.rocheBPSPMainGridRow3Cell4Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPReports'
        }
    ],

    'launch.rocheBPSPReportsGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPMain'
        }
    ],

    'launch.rocheBPSPProductReportGridRow1Cell0Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPReports'
        }
    ],

    'launch.rocheBPSPReportsGridRow2Cell1Button': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPProductReport'
        }
    ],

    'segmentedControlTab1.rocheBPSPProductReportGridRow2Cell1SegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductReportChart'
        },
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductReportProductSelectorChartCell'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductReportGridTable'
        }
    ],

    'segmentedControlTab2.rocheBPSPProductReportGridRow2Cell1SegmentedControl': [
        {
            action: app.fn.hideWidget,
            argument: 'rocheBPSPProductReportGridTable'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductReportChart'
        },
        {
            action: app.fn.showWidget,
            argument: 'rocheBPSPProductReportProductSelectorChartCell'
        },

    ],


    'launch.rocheBPSPProductReportGridTableHeaderFocusButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
        }
    ],


    'launch.rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable_row_0': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
        }
    ],


    'launch.rocheBPSPProductReportProductSelectorChartButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductReportMaterialSelectorPopopInChart'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
        }
    ],


    'launch.rocheBPSPProductReportMaterialSelectorPopopInChartGridTable_row_0': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductReportMaterialSelectorPopopInChart'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportChart'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportProductSelectorChartButton'
        }
    ],


    'launch.rocheBPSPProductReportGridRow1Cell4Button': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportInfoPopupText1'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportInfoPopupText2'
        },
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductReportInfoPopup'
        }
    ],


    'launch.rocheBPSPProductReportInfoPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductReportInfoPopup'
        }
    ],


    'launch.rocheBPSPProductReportGridRow2Cell2Button': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductReportExportPopup'
        }

    ],
    'launch.rocheBPSPProductReportExportPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductReportExportPopup'
        }
    ],


    'launch.rocheBPSPProductReportGridTable_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPProductReportCheckoutPopup'
        }

    ],
    'launch.rocheBPSPProductReportCheckoutPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductReportCheckoutPopup'
        }
    ],

    'launch.rocheBPSPProductReportCheckoutPopupFocusButton': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPProductReportGridTable'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPProductReportCheckoutPopup'
        }
    ],

    'open.rocheBPSPCustomersHorizontalTable.finished': [
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPCustomersPlanning'
        }
    ],

    'launch.rocheBPSPCustomersPlanningGridRow1Cell0Button.finished': [
        {
            action: app.fn.openPageWithState,
            argument: 'rocheBPSPCustomers'
        },
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPCustomersPlanningHorizontalTableCustomerSelector', 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector']
        }
    ],
    'launch.rocheBPSPCustomersPlanningCustomerSelectorButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPCustomersPlanningPopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2OpenPopupButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPCustomersPlanningPopup'
        }
    ],
    'switch.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningTypeSegmentedControl'
        }
    ],
    'switch.rocheBPSPCustomersPlanningTypeSegmentedControl.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridTableYearly_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridTableMonthly_row_0': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningFocusPopupPopupCancelButton': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningFocusPopupPopupFocusButton.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridTableMonthlyHeaderReturnFromFocus.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridTableYearlyHeaderReturnFromFocus.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        }
    ],
    'open.rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningCustomerSelectorButton'
        },
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPCustomersPlanningPopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2NextButton.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningCustomerSelectorButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridRow2Cell2NextButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton.finished': [
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningCustomerSelectorButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridRow2Cell2NextButton'
        }
    ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton': [
        {
            action: app.fn.openPopup,
            argument: 'rocheBPSPCustomersPlanningOpportunitiesPopup'
        },
        {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector'
        }
    ],
    'perform.rocheBPSPCustomersPlanningGridTableYearly': [
        {
            action: app.fn.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'distributionEdit',
                    actions: [
                        /*   {
                               action: app.fn.addGridTableCurrentRowSystemValue,
                               argument: ['DistributionEditProductCode', 'rocheBPSPProductsCheckoutGridTableYearly', 1, 'title']
                           },*/
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTablePopup'
                        },
                        {
                            action: app.fn.forceRefresh,
                            argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelector'
                        }
                    ]
                },
                {
                    conditionKey: 'copyMerge',
                    actions: [
                        {
                            action: app.fn.openPopup,
                            argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
                        },
                        /*  {
                              action: app.fn.forceRefresh,
                              argument: 'rocheBPSPProductsCheckoutCopyMergePopupSlider'
                          }*/
                    ]
                }
            ]
        }
    ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupCancel.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
        }
    ],
    'launch.rocheBPSPCustomersPlanningOpportunitiesPopupClose.finished': [
        {
            action: app.fn.togglePopup,
            argument: 'rocheBPSPCustomersPlanningOpportunitiesPopup'
        }
    ]
}
;