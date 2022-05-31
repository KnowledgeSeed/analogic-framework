/* global app */
'use strict';
app.eventMap = {

    'launch.rocheBPSPMainGridRow3Cell1Button': [
        {
            action: app.fn.removeWidgetValues,
            argument: ['rocheBPSPCustomersCompanySelector', 'rocheBPSPCustomersTerritorySelector']
        },
        {
            action: app.fn.openPage,
            argument: 'rocheBPSPCustomers'
        }
    ],

    'launch.rocheBPSPMainGridRow3Cell2Button':
        [
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsReceiverSelector', 'rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly']
            },
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProducts'
            }
        ],

    'launch.rocheBPSPProductsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsReceiverSelector', 'rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly']
            }
        ],

    'launch.rocheBPSPSettingsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],

    'launch.rocheBPSPMainSubmissionToBPXPPopupNo':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMainSubmissionToBPXPPopup'
            }
        ],
    'launch.rocheBPSPMainSubmissionToBPXPPopupYes':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMainSubmissionToBPXPPopup'
            }
        ],

    //UserPanel events
    'launch.rocheBPSPMainGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPMainUserPanelPopup']
            }
        ],

    'launch.rocheBPSPProductsGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPProductsUserPanelPopup']
            }
        ],

    'launch.rocheBPSPProductsCheckoutGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPProductsCheckoutUserPanelPopup']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPIPPlanningUserPanelPopup']
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPIPPlanningCheckoutUserPanelPopup']
            }
        ],

    'launch.rocheBPSPSettingsGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPSettingsUserPanelPopup']
            }
        ],

    'launch.rocheBPSPMaterialGridRow1Cell3Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPMaterialUserPanelPopup']
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow1Cell3Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPAddMaterialUserPanelPopup']
            }
        ],

    'launch.rocheBPSPCustomersGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCustomersUserPanel']
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCustomersPlanningUserPanel']
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow1Cell3Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCompanySettingsUserPanel']
            }
        ],

    'launch.rocheBPSPSecuritySetupGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPSecuritySetupUserPanel']
            }
        ],

    'launch.rocheBPSPTerritoriesGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPTerritoriesUserPanel']
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTitleGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPTerritoriesUsersUserPanel']
            }
        ],

    'launch.rocheBPSPAccountsGridRow1Cell4Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPAccountsUserPanel']
            }
        ],

    'launch.rocheBPSPAccountsOverviewGridRow1Cell4Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPAccountsOverviewUserPanel']
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow1Cell5Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPAccountsTerritoriesUserPanel']
            }
        ],

    'launch.rocheBPSPTerritoriesProductsGridRow1Cell4Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPTerritoriesProductsUserPanel']
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow1Cell3Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCompanySettingsCheckedOutUserPanel']
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow1Cell3Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCompanySettingsGrowthUserPanel']
            }
        ],


    'launch.rocheBPSPProductReportGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPProductReportUserPanel']
            }
        ],

    'launch.rocheBPSPReportKPIGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPReportKPIUserPanel']
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCustomerReportUserPanel']
            }
        ],

    'launch.rocheBPSPCustomerStatusReportUserPanel':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCustomerStatusReportUserPanel']
            }
        ],

    'launch.rocheBPSPIpPlanningReportGridRow1Cell9Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPIpPlanningReportUserPanel']
            }
        ],


    //start products

    'launch.rocheBPSPProductsGridTableMonthly_row_0':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'isPlanningLocked',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPProductsLockedPlanningPopup'
                            }
                        ]
                    },
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

    'launch.rocheBPSPProductsGridTableYearly_row_0':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'noPopup',
                        actions: [
                            {
                                action: app.fn.skip,
                                argument: ''
                            }
                        ]
                    },
                    {
                        conditionKey: 'isPlanningLocked',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPProductsLockedPlanningPopup'
                            }
                        ]
                    },
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
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutPopupVersionCompareButton'
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
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutPopupVersionCompareButton'
                            }
                        ]
                    }
                ]
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutPopup'
            }
        ],
    'launch.rocheBPSPProductsGridRow2Cell1Button':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsColumnSelectorPopupDropBox'
            }
        ],
    'launch.rocheBPSPProductsColumnSelectorCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupCheckoutButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupCheckoutButton.finished':
        [
            {
                action: app.fn.checkTIResponseStatus,
                argument: [app.fn.removeWidgetValues, ['rocheBPSPProductsTypeSegmentedControl'], app.fn.skip, '']
            },
            {
                action: app.fn.checkTIResponseStatus,
                argument: [app.fn.openPage, 'rocheBPSPProductsCheckout', app.fn.openPopup, 'rocheBPSPProductsCheckoutWarning']
            }
        ],
    'launch.rocheBPSPProductsCheckoutWarningCancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutWarning'
            }
        ],
    'launch.rocheBPSPProductsNoCheckoutPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsNoCheckoutPopup'
            }
        ],
    'launch.rocheBPSPProductsNoCheckoutPopupFocusButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsNoCheckoutPopup'
            }
        ],
    'segmentedControlTab2.rocheBPSPProductsPeriodUnitSegmentedControl':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: ['rocheBPSPProductsGridTableMonthly']
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            }
        ],
    'segmentedControlTab1.rocheBPSPProductsPeriodUnitSegmentedControl':
        [
            {
                action: app.fn.hideWidgets,
                argument: ['rocheBPSPProductsGridTableMonthly']
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo'
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsGridTableYearly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControlInfoText'
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupFocusButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutPopup'
            }
        ],

    'launch.rocheBPSPProductsLockedPlanningPopupFocusButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsLockedPlanningPopup'
            }
        ],

    'launch.rocheBPSPProductsLockedPlanningPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsLockedPlanningPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell2Button':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutClearPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutClearPopupClearSelectionButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutClearPopupClearAllButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],

    'launch.rocheBPSPProductsGridTableYearlyHeaderFocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable'
            }
        ],

    'launch.rocheBPSPProductsGridRow3Cell2ButtonTwo':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsCompareByRowPopupGridTable'
                ]
            },
        ],
    'launch.rocheBPSPProductsGridTableMonthlyHeaderFocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable'
            }
        ],
    'launch.rocheBPSPProductsProductSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPProductsColumnSelectorRestoreButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsColumnSelectorUpdateButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCommentShowGridRow5Button':
        [
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


    'launch.rocheBPSPProductsCommentEditControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPProductsCommentEdit']
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsGridTableMonthly_row_17':
        [
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
    'launch.rocheBPSPProductsGridTableYearly_row_13':
        [
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
    'launch.rocheBPSPProductsCommentEditGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCommentEdit'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCommentShowGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCommentShow'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCommentEditControlPanelSaveButton.finished':
        [
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
    'launch.rocheBPSPProductsGridRow1Cell4Button':
        [
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
    'launch.rocheBPSPProductsInfoPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsInfoPopup'
            }
        ],
    // Product  Versions
    'launch.rocheBPSPProductsCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPProductsYearSegmentedControl',
                    'rocheBPSPProductsPeriodUnitSegmentedControl',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo',
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow2Cell7',
                    'rocheBPSPProductsGridRow3Cell3'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow3Cell6',
                    'rocheBPSPProductsGridVersionSelector'
                ]
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupVersionCompareButton.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPProductsYearSegmentedControl',
                    'rocheBPSPProductsPeriodUnitSegmentedControl',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo',
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow2Cell7',
                    'rocheBPSPProductsGridRow3Cell3'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow3Cell6',
                    'rocheBPSPProductsGridVersionSelector'
                ]
            },
            {action: app.fn.togglePopup, argument: 'rocheBPSPProductsCheckoutPopup'}
        ],
    'launch.rocheBPSPProductsGridRow3Cell2ButtonOne':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell3ButtonGrey',
                    'rocheBPSPProductsGridVersionSelectorTwo',
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsGridLineItemSelector',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow2Cell7',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsYearSegmentedControl',
                    'rocheBPSPProductsPeriodUnitSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsGridVersionSelector'
                ]
            },

        ],
    'launch.rocheBPSPProductsGridRow3Cell4ButtonExit.finished':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo',
                    'rocheBPSPProductsGridRow2Cell7',
                    'rocheBPSPProductsYearSegmentedControl',
                    'rocheBPSPProductsPeriodUnitSegmentedControl',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell3'
                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell3ButtonGrey',
                    'rocheBPSPProductsGridVersionSelectorTwo',
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsGridLineItemSelector',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsGridVersionSelector'
                ]
            },
        ],
    //end Product Versions

    //end products

    //rocheBPSPProductsCheckout
    'upload.rocheBPSPProductsCheckoutUploadPopupUpload.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPProductsCheckoutUploadPopupUpload'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow1Cell4Button':
        [
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

    'upload.rocheBPSPProductsCheckoutUploadPopupUpload':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            }
        ],

    'launch.rocheBPSPProductsCheckoutInfoPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutInfoPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentShowGridRow5Button':
        [
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


    'launch.rocheBPSPProductsCheckoutCommentEditControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPProductsCheckoutCommentEdit']
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
            }
        ],

    'launch.rocheBPSPProductsCheckoutGridTableMonthly_row_17':
        [
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


    'launch.rocheBPSPProductsCheckoutGridTableYearly_row_13':
        [
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
    'choose.rocheBPSPProductsCompanySelector':
        [
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsReceiverSelector']
            }
        ],
    'choose.rocheBPSPipPlanningGridRow1Cell2DropBox':
        [
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox']
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentEditGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCommentEdit'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentShowGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCommentShow'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton.finished':
        [
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
    'launch.rocheBPSPProductsCheckoutColumnSelectorCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1Button':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopupDropBox'
            }
        ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorRestoreButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorUpdateButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button':
        [
            {
                action: app.fn.removeWidgetValues,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridTableMonthly',
                    'rocheBPSPProductsCheckoutCopyMergePopupSlider',
                    'rocheBPSPProductsTypeSegmentedControl'
                ]
            },
            {
                action: app.fn.removeSliders,
                argument: ''
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCheckoutProduct', false]
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button.finished':
        [

            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProducts'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutGridTableYearly', 'rocheBPSPProductsCheckoutGridTableMonthly']
            }
        ],
    'segmentedControlTab2.rocheBPSPProductsCheckoutPeriodUnitSegmentedControl':
        [
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
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            }
        ],
    'segmentedControlTab1.rocheBPSPProductsCheckoutPeriodUnitSegmentedControl':
        [
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
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutGridTableYearly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControlInfoText'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1bButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutUploadPopupPlDropbox'
            }
        ],
    'launch.rocheBPSPProductsCheckoutUploadPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            }
        ],
    'request.rocheBPSPProductsCheckoutUploadPopupUpload.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutUploadPopupUpload'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            },
            {
                action: app.fn.showPopup,
                argument: 'Upload success'
            }
        ],
    'upload.rocheBPSPProductsCheckoutUploadPopupUpload.error':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutUploadPopupUpload'
            }
        ],
    'write.rocheBPSPProductsCheckoutGridTableMonthly.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPProductsCheckoutGridTableMonthly'
            }
        ],
    'pastelast.rocheBPSPProductsCheckoutGridTableMonthly.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPProductsCheckoutGridTableMonthly'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridTableMonthly_row_4':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCopyMergeBackButton':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopupSlider'
            }
        ],
    'perform.rocheBPSPProductsCheckoutGridTableYearly':
        [
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
    'perform.rocheBPSPProductsCheckoutGridTableYearly.finished':
        [
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
    'launch.rocheBPSPProductsCheckoutCopyMergePopupCopyButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupMergeButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupCancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionEditPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionEditPopupControlPanelSaveButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupLastYearButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupLinearSplitButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupMonthlyPhasingButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    // products checkout versioning
    'launch.rocheBPSProductsCheckoutVersioningRowButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductsCheckoutCompareByRowPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCompareByRowPopupGridTable'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSProductsCheckoutVersioningColumnButton',
                    'rocheBPSProductsCheckoutVersioningCompareText',
                    'rocheBPSProductsCheckoutVersioningRowButton',
                    'rocheBPSPProductsCheckoutGridRow2Cell1Button',
                    'rocheBPSPProductsCheckoutGridRow2Cell2Button',
                    'rocheBPSPProductsCheckoutGridRow2Cell3Button',
                    'rocheBPSPProductsYearSegmentedControl',
                    'rocheBPSPProductsCheckoutPeriodUnitSegmentedControl',
                    'rocheBPSProductsCheckoutVersioningColumnButton',
                    'rocheBPSPProductsCheckoutGridLineItemSelector'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSProductsCheckoutVersioningExitButton',
                    'rocheBPSPProductsCheckoutValueSegmentedControl'
                ]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsCheckoutGridTableYearly',
                    // 'rocheBPSPProductsGridRow3Cell6'
                ]
            }
        ],
    // products checkout versioning

    //end rocheBPSPProductsCheckout comment mody

    'launch.rocheBPSPSettingsGridRow2Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMaterial'
            }
        ],

    'launch.rocheBPSPMaterialGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow1Cell0Button':
        [
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

    'launch.rocheBPSPMaterialGridRow4Cell1Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAddMaterial'
            }
        ],


    'launch.rocheBPSPMainGridRow3Cell3Button':
        [
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox', 'rocheBPSPipPlanningGridTableMonthly']
            },
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPipPlanning'
            }
        ],

    'launch.rocheBPSPipPlanningGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox', 'rocheBPSPipPlanningGridTableMonthly']
            }
        ],


    'launch.rocheBPSPMainGridRow5Cell1aSubmitToBPXP':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutPopupFocusButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton.finished':
        [
            {
                action: app.fn.checkTIResponseStatus,
                argument: [app.fn.openPage, 'rocheBPSPIpPlanningCheckout', app.fn.openPopup, 'rocheBPSPIpPlanningCheckoutWarning']
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutWarningCancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutWarning'
            }
        ],
    'launch.rocheBPSPIpPlanningNoCheckoutPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningNoCheckoutPopupFocusButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell2Button':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutClearPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutClearPopupClearSelectionButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutClearPopupClearAllButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],

    'launch.rocheBPSPipPlanningGridTableMonthly_row_0':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'isPlanningLocked',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPipPlanningLockedPlanningPopup'
                            }
                        ]
                    },
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
                        conditionKey: 'openPopUpConditional',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPIpPlanningCheckoutPopup'
                            }
                        ]
                    }
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText2'
            },
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem1':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'Cash Sales']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem2':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'Lease']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem3':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'Return']
            }
        ],
    'launch.rocheBPSPipPlanningGridRow1Cell4Button':
        [
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


    'launch.rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsedItem1':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'All']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsedItem2':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'New']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsedItem3':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'Used']
            }
        ],

    'launch.rocheBPSPipPlanningValueSegmentedControlItem1':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'VALUE']
            }
        ],

    'launch.rocheBPSPipPlanningValueSegmentedControlItem2':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'DELTA PERCENT']
            }
        ],

    'launch.rocheBPSPipPlanningValueSegmentedControlItem3':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['dynamicValue', 'DELTA ABS']
            }
        ],


    'launch.rocheBPSPipPlanningGridTableMonthlyHeaderFocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable'
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3ButtonCompareColumn':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1',
                    'rocheBPSPipPlanningGridRow2Cell2',
                    'rocheBPSPipPlanningGridRow2Cell3Text',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareColumn',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareRow',
                    'rocheBPSPipPlanningYearSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutPopupCheckoutButton',
                    'rocheBPSPIpPlanningCheckoutPopupVersionCompareButton'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            },
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3ButtonExit.finished':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1',
                    'rocheBPSPipPlanningGridRow2Cell2',
                    'rocheBPSPipPlanningGridRow2Cell3Text',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareColumn',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareRow',
                    'rocheBPSPipPlanningYearSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutPopupCheckoutButton',
                    'rocheBPSPIpPlanningCheckoutPopupVersionCompareButton',
                    'rocheBPSPipPlanningGridTableMonthlyHeaderReturnFromFocus',
                    'rocheBPSPipPlanningGridTableMonthlyHeaderFocusButton',
                    'rocheBPSPipPlanningGridTableMonthlyHeaderCell-01'

                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: ['rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            },
        ],


    'launch.rocheBPSPipPlanningGridRow2Cell3ButtonCompareRow':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPipPlanningCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: ['rocheBPSPipPlanningCompareByRowPopupGridTable']
            },
        ],

    'launch.rocheBPSPipPlanningCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1',
                    'rocheBPSPipPlanningGridRow2Cell2',
                    'rocheBPSPipPlanningGridRow2Cell3Text',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareColumn',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareRow',
                    'rocheBPSPipPlanningYearSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutPopupCheckoutButton',
                    'rocheBPSPIpPlanningCheckoutPopupVersionCompareButton'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPipPlanningCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutPopupVersionCompareButton.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1',
                    'rocheBPSPipPlanningGridRow2Cell2',
                    'rocheBPSPipPlanningGridRow2Cell3Text',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareColumn',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonCompareRow',
                    'rocheBPSPipPlanningYearSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutPopupCheckoutButton',
                    'rocheBPSPIpPlanningCheckoutPopupVersionCompareButton'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],


    'launch.rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow1Cell4Button':
        [
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
    'launch.rocheBPSPIpPlanningCheckoutInfoPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell3Button.finished':
        [
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridTableMonthly']
            },
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPipPlanning'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell1bButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopupPlDropbox'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutUploadPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
            }
        ],
    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPIpPlanningCheckoutUploadPopupUpload'
            }
        ],
    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload.error':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopupUpload'
            }
        ],
    'request.rocheBPSPIpPlanningCheckoutUploadPopupUpload.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopupUpload'
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutVersioningColumnButton':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningButtonGrey',
                    'rocheBPSPIpPlanningCheckoutVersionSelectorTwo',
                    'rocheBPSPIpPlanningCheckoutVersioningExitButton',
                    'rocheBPSPIpPlanningCheckoutValueSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutSegmentedControlUsed'

                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningCompareText',
                    'rocheBPSPIpPlanningCheckoutVersioningColumnButton',
                    'rocheBPSPIpPlanningCheckoutVersioningRowButton',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlOne',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell1bButton',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell2Button',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlTwo'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersionSelectorTwo',
                    'rocheBPSPIpPlanningCheckoutGridTableMonthly',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlTwo'
                ]
            },
        ],

    'launch.rocheBPSPIpPlanningCheckoutVersioningExitButton.finished':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningCompareText',
                    'rocheBPSPIpPlanningCheckoutVersioningColumnButton',
                    'rocheBPSPIpPlanningCheckoutVersioningRowButton',
                    'rocheBPSPipPlanningYearSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell1bButton',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell2Button',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlOne',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlTwo'
                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningButtonGrey',
                    'rocheBPSPIpPlanningCheckoutVersionSelectorTwo',
                    'rocheBPSPIpPlanningCheckoutVersioningExitButton',
                    'rocheBPSPIpPlanningCheckoutValueSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutSegmentedControlUsed'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersionSelectorTwo',
                    'rocheBPSPIpPlanningCheckoutGridTableMonthly',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlTwo'
                ]
            },
        ],


    'launch.rocheBPSPIpPlanningCheckoutVersioningRowButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: ['rocheBPSPIpPlanningCheckoutCompareByRowPopupGridTable']
            },
        ],

    'launch.rocheBPSPIpPlanningCheckoutCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningCompareText',
                    'rocheBPSPIpPlanningCheckoutVersioningColumnButton',
                    'rocheBPSPIpPlanningCheckoutVersioningRowButton',
                    'rocheBPSPipPlanningYearSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell1aButton',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell1bButton',
                    'rocheBPSPIpPlanningCheckoutGridRow2Cell2Button',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlOne',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlTwo'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningExitButton',
                    'rocheBPSPIpPlanningCheckoutValueSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutSegmentedControlUsed'
                ]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector',
                    'rocheBPSPIpPlanningCheckoutGridSegmentedControlTwo'
                ]
            }
        ],


    'segmentedControlTab1.rocheBPSPAddMaterialGridRow2Cell1SegmentedControl':
        [
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


    'segmentedControlTab2.rocheBPSPAddMaterialGridRow2Cell1SegmentedControl':
        [
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

    'segmentedControlTab1.rocheBPSPMaterialGridRow2Cell1SegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportByIpNodeButton'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportButton'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2ButtonIP'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2Button'
            }
        ],

    'segmentedControlTab2.rocheBPSPMaterialGridRow2Cell1SegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPMaterialGridTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },

            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportButton'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportByIpNodeButton'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2Button'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2ButtonIP'
            }
        ],

    'launch.rocheBPSPMaterialGridRow4Cell2Button':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialAddDummyPopup'
            },
        ],
    'launch.rocheBPSPMaterialAddDummyPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyPopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyPopupControlPanelAddButton.finished':
        [
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
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],
    'launch.rocheBPSPMaterialGridRow4Cell2ButtonIP':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialAddDummyIpPopup'
            },
        ],
    'launch.rocheBPSPMaterialAddDummyIpPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyIpPopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyIpPopupControlPanelAddButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyIpPopup'
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
    'launch.rocheBPSPMaterialGridTable_row_5':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialMoveDataPopup'
            },
        ],
    'launch.rocheBPSPMaterialGridTable_row_6':
        [
            {
                action: app.fn.addGridTableCurrentRowSystemValue,
                argument: ['MaterialToEdit', 'rocheBPSPMaterialGridTable', 2, 'title']
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPMaterialEditDummyPopupMaterialNewNameTextBox'
            },
        ],

    'launch.rocheBPSPMaterialMoveDataPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialMoveDataPopup'
            }
        ],

    'launch.rocheBPSPMaterialMoveDataPopupControlPanelAddButton':
        [
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
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],

    'launch.rocheBPSPMaterialEditDummyPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            }
        ],

    'launch.rocheBPSPMaterialEditDummyPopupControlPanelAddButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            }
        ],

    'launch.rocheBPSPMateralsAddMaterialSearchPagerPreviousButton':
        [
            {
                action: app.fn.decreasePage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerNextButton':
        [
            {
                action: app.fn.increasePage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerFirstPageButton':
        [
            {
                action: app.fn.jumpToFirstPage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerLastPageButton':
        [
            {
                action: app.fn.jumpToLastPage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMaterialGridTable_row_4':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialDeleteDataPopup'
            },


        ],
    'launch.rocheBPSPMaterialDeleteDataPopupControlPanelAddButton.finished':
        [
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
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],
    'launchpaste.rocheBPSPAddMaterialGridRow3Cell2Button.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPAddMaterialGridRow3Cell2Button'
            }
        ],

    'launch.rocheBPSPMaterialDeleteDataPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataPopup'
            }
        ],

    'launch.rocheBPSPMaterialIPNodeGridTable_row_4':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
            },
        ],

    'launch.rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelAddButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },

            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            }
        ],

    'launch.rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
            }
        ],

    'launch.rocheBPSPMaterialGridTable_row_3':
        [
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
    'launch.rocheBPSPMaterialAddDummyGridTablePopupControlPanelCancelButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyGridTablePopupControlPanelAddButton.finished':
        [
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
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],


    'launch.rocheBPSPMaterialIPNodeGridTable_row_3':
        [
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
    'launch.rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelAddButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
            },

            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },

            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            }

        ],

    'launch.rocheBPSPMaterialIPNodeGridTable_row_5':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
            },
        ],
    'launch.rocheBPSPMaterialIPNodeGridTable_row_6':
        [
            {
                action: app.fn.addGridTableCurrentRowSystemValue,
                argument: ['MaterialToEdit', 'rocheBPSPMaterialIPNodeGridTable', 2, 'title']
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPMaterialEditDummyPopupMaterialNewNameTextBox'
            },
        ],

    'launch.rocheBPSPMaterialMoveDataIPNodePopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
            }
        ],

    'launch.rocheBPSPMaterialMoveDataIPNodePopupControlPanelAddButton':
        [
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
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4CellRefreshButton.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4Cell6Button.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4Cell7Button.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4CellClearAllFilterButton.finished':
        [

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

    'launch.rocheBPSPIpPlanningCommentEditControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPIpPlanningCommentEdit']
            },

            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
            }

        ],

    'launch.rocheBPSPipPlanningGridTableMonthly_row_21':
        [
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

    'launch.rocheBPSPIpPlanningCommentEditGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCommentEdit'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
            }
        ],

    'launch.rocheBPSPIpPlanningCommentEditControlPanelSaveButton.finished':
        [
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

    'launch.rocheBPSPIpPlanningCommentShowGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCommentShow'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPipPlanningGridTableMonthly'
            }


        ],

    'launch.rocheBPSPIpPlanningCommentShowGridRow5Button':
        [
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

    'launch.rocheBPSPIpPlanningCheckoutCommentEditControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPIpPlanningCheckoutCommentEdit']
            },

            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
            }

        ],

    'launch.rocheBPSPIpPlanningCheckoutGridTableMonthly_row_21':
        [
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

    'launch.rocheBPSPIpPlanningCheckoutCommentEditGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
            }


        ],

    'launch.rocheBPSPIpPlanningCheckoutCommentEditControlPanelSaveButton.finished':
        [
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

    'launch.rocheBPSPIpPlanningCheckoutCommentShowGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
            }


        ],

    'launch.rocheBPSPIpPlanningCheckoutCommentShowGridRow5Button':
        [
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

    'launch.rocheBPSPAddMaterialGridRow3Cell3Button.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialClipboard'
            }

        ],

    'launch.rocheBPSPAddMaterialRemoveClipBoard.finished':
        [
            {
                action: app.fn.forceRefreshWithDelay,
                argument: ['RocheBPSPMaterialsAddMaterialClipboard', 500]
            }

        ],

    'launch.RocheBPSPMaterialsAddMaterialSearchButton14.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }

        ],
    'launch.RocheBPSPMaterialsAddMaterialSearchSelectAll.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPMainGridRow3Cell4Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'launch.rocheBPSPReportsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],

    'launch.rocheBPSPProductReportGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],

    'launch.rocheBPSPReportsGridRow2Cell1Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],

    'segmentedControlTab1.rocheBPSPProductReportGridRow2Cell1SegmentedControl':
        [
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

    'segmentedControlTab2.rocheBPSPProductReportGridRow2Cell1SegmentedControl':
        [
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

    'launch.rocheBPSPProductReportGridTableHeaderFocusButton':
        [
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

    'launch.rocheBPSPProductReportMaterialSelectorShortcutPopupGridTableButton01':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportProductSelectorChartButton'
            }
        ],

    'launch.rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
            }
        ],

    'launch.rocheBPSPProductReportProductSelectorChartButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChart'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
            }
        ],

    'launch.rocheBPSPProductReportMaterialSelectorPopopInChartGridTable_row_0':
        [
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

    'launch.rocheBPSPProductReportGridRow1Cell4Button':
        [
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

    'launch.rocheBPSPProductReportInfoPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductReportInfoPopup'
            }
        ],

    'launch.rocheBPSPProductReportGridRow4Cell2Button':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductReportExportPopup'
            }
        ],
    'launch.rocheBPSPProductReportExportPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductReportExportPopup'
            }
        ],

    'launch.rocheBPSPProductReportGridTable_row_0':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPProductReportCheckoutPopup'
            }

        ],
    'launch.rocheBPSPProductReportCheckoutPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductReportCheckoutPopup'
            }
        ],

    'launch.rocheBPSPProductReportCheckoutPopupFocusButton':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPProductReportCheckoutPopup'
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

    'open.rocheBPSPCustomersHorizontalTable.finished':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomersPlanning'
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow1Cell0Button.finished':
        [
            {
                action: app.fn.openPageWithState,
                argument: ['rocheBPSPCustomers', 'rocheBPSPCustomersHorizontalTable', 'rocheBPSPCustomersHeaderInfoGridTable', 'rocheBPSPCustomersVersionSelector']
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
        ],
    'launch.rocheBPSPCustomersPlanningCustomerSelectorButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2OpenPopupButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningMonthlyExcelUpload':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningUploadPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningUploadPopupPlDropbox'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningClearPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningClearPopupClearSelectionButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
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
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }

        ],
    'launch.rocheBPSPCustomersPlanningClearPopupClearAllButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            }, {
            action: app.fn.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }

        ],

    'switch.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl.finished':
        [
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningGridTableYearly',
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    'rocheBPSPCustomersPlanningTypeSegmentedControl',
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningMonthlyExcelUpload',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text'
                ]
            }
        ],
    'launch.rocheBPSPCustomersPlanningUploadPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningUploadPopup'
            }
        ],

    'upload.rocheBPSPCustomersPlanningUploadPopupUpload.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPCustomersPlanningUploadPopupUpload'
            }
        ],

    'request.rocheBPSPCustomersPlanningUploadPopupUpload.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningUploadPopupUpload'
            },
            {
                action: app.fn.showPopup,
                argument: 'Upload success'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }
        ],
    'upload.rocheBPSPCustomersPlanningUploadPopupUpload.error':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningUploadPopupUpload'
            }
        ],
    'switch.rocheBPSPCustomersPlanningTypeSegmentedControl.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridTableYearly_row_0':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningFocusPopupVersionCompareButton'
            },
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'openPopUpConditional',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
                            }
                        ]
                    },
                ]
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridTableMonthly_row_0':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'openPopUpConditional',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
                            }
                        ]
                    },
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningFocusPopupVersionCompareButton'
            }
        ],
    'launch.rocheBPSPCustomersPlanningFocusPopupPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningFocusPopupPopupFocusButton.finished':
        [
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
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelExport'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridTableMonthlyHeaderReturnFromFocus.finished':
        [
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningMonthlyExcelUpload'
                ]
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridTableYearlyHeaderReturnFromFocus.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            }
        ],
    'open.rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.finished':
        [
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
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2NextButton.finished':
        [
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
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton.finished':
        [
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
    'launch.rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningOpportunitiesPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelectorTitle'
            }
        ],
    'perform.rocheBPSPCustomersPlanningGridTableYearly':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'distributionEdit',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTablePopup'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelector'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelectorTitle'
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
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCopyMergePopupSlider'
                            }
                        ]
                    }
                ]
            }
        ],
    'open.rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelector.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTablePopup'
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', true]
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', true]
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal'
            }
        ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupCancel.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
            }
        ],

    'launch.rocheBPSPCustomersPlanningOpportunitiesPopupClose.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunitiesPopup'
            }
        ],
    'delete.rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector.finished':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomerPlanningOpportunityDelete'
            }
        ],
    'launch.rocheBPSPCustomerPlanningOpportunityDeleteControlPanelDeleteButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomerPlanningOpportunityDelete'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }
        ],
    'launch.rocheBPSPCustomerPlanningOpportunityDeleteControlPanelCancelButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomerPlanningOpportunityDelete'
            }
        ],//----
    'launch.rocheBPSPCustomersPlanningCommentShowGridRow5Button':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningCommentEdit'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow3TextInput'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentShow'
            }
        ],

    'launch.rocheBPSPCustomersPlanningCommentEditControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCustomersPlanningCommentEdit']
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPCustomersPlanningCommentShowGridTable', 'rocheBPSPCustomersPlanningCommentShowGridTableSource']
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridTableYearly_row_17':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [
                            {
                                action: app.fn.addGridTableCurrentRowSystemValue,
                                argument: ['LastClickedProductCode', 'rocheBPSPCustomersPlanningGridTableYearly', 0, 'productCode']
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTable'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTableSource'
                            },
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCustomersPlanningCommentShow'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: app.fn.addGridTableCurrentRowSystemValue,
                                argument: ['LastClickedProductCode', 'rocheBPSPCustomersPlanningGridTableYearly', 0, 'productCode']
                            },
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCustomersPlanningCommentEdit'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow3TextInput'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTable'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTableSource'
                            }
                        ]
                    }
                ]
            }
        ],
    'launch.rocheBPSPCustomersPlanningCommentEditGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentEdit'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPCustomersPlanningCommentShowGridTable', 'rocheBPSPCustomersPlanningCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPCustomersPlanningCommentShowGridXButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentShow'
            },
            {
                action: app.fn.removeWidgetValues,
                argument: ['rocheBPSPCustomersPlanningCommentShowGridTable', 'rocheBPSPCustomersPlanningCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPCustomersPlanningCommentEditControlPanelSaveButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentEdit'
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningCommentShow'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentShowGridTable'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentShowGridTableSource'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            }
        ],

    'launch.rocheBPSPSettingsGridRow2Cell1Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPSettingsGridRow2Cell2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSecuritySetup'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell1Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPTerritories'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPTerritoriesUsers'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPAccountsOverviewGridRow1Cell3Edit':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccounts'
            }
        ],

    'launch.rocheBPSPAccountsGridRow1Cell3Overview':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell4Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccountsTerritories'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPSecuritySetupGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPSecuritySetupGridTable_row_5':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPTerritoriesUsers'
            },

        ],

    'launch.rocheBPSPTerritoriesGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow1Cell0Button':
        [
            {
                action: app.fn.openPrevPage,
                argument: ''
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            }
        ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupCopyButton.finished':
        [
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
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupMergeButton.finished':
        [
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
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
            }
        ],
    'select.rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', true]
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', true]
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal'
            }
        ],
    'launch.rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionCancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', false]
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', false]
            }
        ],
    'launch.rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionSave.finished':
        [
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', false]
            },
            {
                action: app.fn.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', false]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector',
                    'rocheBPSPCustomersPlanningGridTableYearly',
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable'
                ]
            }

        ],
    'cellEdit.rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution.finished':
        [
            {
                action: app.fn.forceRefreshWithDelay,
                argument: ['rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal', 500]
            },
            {
                action: app.fn.forceRefreshWithDelay,
                argument: ['rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution', 500]
            }
        ],
    'perform.rocheBPSPCustomersPlanningGridTableYearly.finished':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'performWrite',
                        actions: [
                            {
                                action: app.fn.forceRefreshWidgets,
                                argument: [
                                    'rocheBPSPCustomersPlanningGridTableYearly',
                                    'rocheBPSPCustomersPlanningHeaderInfoGridTable'
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    'write.rocheBPSPCustomersPlanningGridTableMonthly.finished':
        [
            {
                action: app.fn.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    500
                ]
            },
            {
                action: app.fn.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable',
                    500
                ]
            }
        ],
    'perform.rocheBPSPCustomersPlanningGridTableMonthly.finished':
        [
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable'
                ]
            }
        ],
    'pastelast.rocheBPSPCustomersPlanningGridTableMonthly.finished':
        [
            {
                action: app.fn.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    500
                ]
            },
            {
                action: app.fn.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable',
                    500
                ]
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTitleGridRow1Cell0Button':
        [
            {
                action: app.fn.openPrevPage,
                argument: ''
            }
        ],

    'launch.rocheBPSPTerritoriesUsersGridRow3Cell2SelectorButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPTerritoriesUsersUsersPopup'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersGridRow3Cell3OpenPopupButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPTerritoriesUsersUsersPopup'
            }
        ],
    'open.rocheBPSPTerritoriesUsersHorizontalTableUserSelector':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPTerritoriesUsersUsersPopup'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTerritoriesGridRow3Cell2SelectorButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesPopup'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTerritoriesGridRow3Cell3OpenPopupButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesPopup'
            }
        ],
    'open.rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesPopup'
            }
        ],


    'segmentedControlTab2.rocheBPSPTerritoriesUsersTerritoriesSegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPTerritoriesUsersGrid'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGrid'
            },

            {
                action: app.fn.removeWidgetValue,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesSegmentedControl'
            },
        ],

    'segmentedControlTab1.rocheBPSPTerritoriesUsersSegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersGrid'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGrid'
            },
            {
                action: app.fn.removeWidgetValue,
                argument: 'rocheBPSPTerritoriesUsersSegmentedControl'
            },
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow3Cell1SelectorButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesTerritoriesPopup'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow3Cell3OpenPopupButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesTerritoriesPopup'
            }
        ],

    'segmentedControlTab1.rocheBPSPAccountsTerritoriesSegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow3'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow4'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row3'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row4'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable2'
            }

        ],

    'segmentedControlTab2.rocheBPSPAccountsTerritoriesSegmentedControl':
        [

            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row3'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row4'
            },

            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable2'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow3'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow4'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGrid2Row3Cell1SelectorButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesCustomerPopup'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGrid2Row3Cell3OpenPopupButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesCustomerPopup'
            }
        ],
    'perform.rocheBPSPTerritoriesGridTable_row_3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccountsTerritories'
            }
        ],
    'perform.rocheBPSPTerritoriesGridTable_row_4':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPTerritoriesUsers'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersGrid'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersGridTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGrid'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGridTable'
            },
        ],


    'launch.rocheBPSPTerritoriesProductsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPrevPage,
                argument: ''
            }
        ],

    'perform.rocheBPSPTerritoriesGridTable_row_2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPTerritoriesProducts'
            }
        ],

    'segmentedControlTab1.rocheBPSPAccountsOverviewGridRow1Cell3SegmentedControl':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccounts'
            }
        ],


    'segmentedControlTab2.rocheBPSPAccountsGridRow1Cell3SegmentedControl':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPAccountsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAccountsOverviewGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAccountsGridRow2Cell1Button.finished':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button4':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button5':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button6':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button4':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button5':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button6':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button4':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button5':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button6':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button5':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button6':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button4':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button5':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_0':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopupGridRow1Cell1Text'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopupControlPanelUpdateButton'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsVisibilityPopupControlPanelUpdateButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsVisibilityPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_5':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_6':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopupEditNameTextBox'
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsEditPopupControlPanelSaveButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsEditPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsClearPopupControlPanelClearButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsClearPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsClearPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsClearPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_7':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsClearPopup'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell1Toggle':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell1Toggle':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell1Toggle':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow6Cell1Toggle':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsResetPopupControlPanelResetButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsResetPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_8':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsSpreadPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsSpreadPopupControlPanelSpreadButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsSpreadPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsSpreadPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsSpreadPopup'
            }
        ],


    'text_click.rocheBPSPSimulationSelectorPopUpButton':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsGridTable'
            },
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'segmentedControlTab2.rocheBPSPCompanySettingsCheckedOutGridRow4Cell1SegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            }
        ],

    'segmentedControlTab1.rocheBPSPCompanySettingsCheckedOutGridRow4Cell1SegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            }
        ],

    'segmentedControlTab2.rocheBPSPCompanySettingsControlGridRow2Cell1SegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCompanySettingsGridTableProduct'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCompanySettingsGridTableCustomer'
            }
        ],

    'segmentedControlTab1.rocheBPSPCompanySettingsControlGridRow2Cell1SegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCompanySettingsGridTableCustomer'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCompanySettingsGridTableProduct'
            }
        ],
    'switch.rocheBPSPCompanySettingsGridTableCustomer_row_1':
        [
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCompanySettingsPopUpGridRow1Cell1Button',
                    'rocheBPSPCompanySettingsPopUpGridRow2Cell1Text',
                    'rocheBPSPCompanySettingsPopUpGridRow3Cell1Text',
                    'rocheBPSPCompanySettingsPopUpGridRow4Cell1Button',
                    'rocheBPSPCompanySettingsPopUpGridRow5Cell1Cancel'
                ]
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsPopUp'
            }
        ],
    'launch.rocheBPSPCompanySettingsPopUpGridRow4Cell1Button':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsPopUp'
            }
        ],
    'launch.rocheBPSPCompanySettingsPopUpGridRow5Cell1Cancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsPopUp'
            }
        ],
    'switch.rocheBPSPCompanySettingsGridTableProduct_row_1':
        [
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCompanySettingsProductPopUpGridRow1Cell1Button',
                    'rocheBPSPCompanySettingsProductPopUpGridRow2Cell1Text',
                    'rocheBPSPCompanySettingsProductPopUpGridRow3Cell1Text',
                    'rocheBPSPCompanySettingsProductPopUpGridRow4Cell1Button',
                    'rocheBPSPCompanySettingsProductPopUpGridRow5Cell1Cancel'
                ]
            },
            {

                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsProductPopUp'
            }

        ],
    'launch.rocheBPSPCompanySettingsProductPopUpGridRow4Cell1Button':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsProductPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsProductPopUpGridRow5Cell1Cancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsProductPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridTableHeaderButton06':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutPopUp'
            }
        ],
    'launch.rocheBPSPCompanySettingsCheckedOutPopUpGridRow4Cell1Button.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutPopUp'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridTableButton06.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridTableIPPlanningButton06.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutPopUpGridRow5Cell1Cancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutHeaderGridTableCellButton06':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutIPPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutIPPopUpGridRow4Cell1Button.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutIPPopUp'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutIPPopUpGridRow5Cell1Cancel':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutIPPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow6Cell1Button':
        [
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCompanySettingsGridRow4Cell1MessageInput',
                    'rocheBPSPCompanySettingsGridRow5Cell1MessageInput'
                ]
            },
        ],

    'upload.rocheBPSPCustomersPlanningUploadPopupUpload':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningUploadPopup'
            }
        ],

    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
            }
        ],

    'launch.rocheBPSPipPlanningLockedPlanningPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPipPlanningLockedPlanningPopup'
            }
        ],

    'launch.rocheBPSPipPlanningLockedPlanningPopupFocusButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPipPlanningLockedPlanningPopup'
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningLockPlanningPopup'
            }
        ],

    'launch.rocheBPSPCustomersPlanningLockPlanningPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningLockPlanningPopup'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell3Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell4Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell4Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell5Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell5Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell6Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell6Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell2Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell3Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell4Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell4Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell6Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell6Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],

    'launch.rocheBPSPReportKPIGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPIpPlanningReportGridRow3Cell2Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'text_click.rocheBPSPIpPlanningReportGridRow3Cell3Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell4Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'text_click.rocheBPSPIpPlanningReportGridRow3Cell4Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell5Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPIpPlanningReportGridRow3Cell5Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow2Cell5Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPCustomerReportGridRow3Cell5Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow2Cell6Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPCustomerReportGridRow3Cell6Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],

    'launch.rocheBPSPProductReportGridRow2Cell5Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPProductReportGridRow3Cell5Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'launch.rocheBPSPProductReportGridRow2Cell6Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPProductReportGridRow3Cell6Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'segmentedControlTab2.rocheBPSPProductReportGridRow4Cell1SegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportGridRow4Cell2Button'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportPivotTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPProductReportChartLabel'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportChartLabel'
            }
        ],

    'segmentedControlTab1.rocheBPSPProductReportGridRow4Cell1SegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportChartLabel'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportPivotTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPProductReportGridRow4Cell2Button'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportGridTable'
            }
        ],
    'segmentedControlTab3.rocheBPSPProductReportGridRow4Cell1SegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportChartLabel'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportGridRow4Cell2Button'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPProductReportPivotTable'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPProductReportPivotTable'
            }
        ],

    'launch.rocheBPSPProductReportGridRow2Cell2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPProductReportGridRow3Cell2Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'launch.rocheBPSPReportKPIGridRow2Cell4Button':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPReportKPIInfoPopupText1'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPReportKPIInfoPopupText2'
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPReportKPIInfoPopup'
            }
        ],

    'launch.rocheBPSPReportKPIInfoPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPReportKPIInfoPopup'
            }
        ],

    'launch.rocheBPSPReportKPIGridRow4Cell1FocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPReportKPIMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPReportKPIMaterialSelectorShortcutPopupGridTable'
            }
        ],

    'launch.rocheBPSPReportKPIMaterialSelectorShortcutPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPReportKPIMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPReportKPIGridRow6Cell4Button'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPReportKPIGridRow7Cell4Button'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPReportKPIGridRow4Cell1FocusButton'
            },
        ],

    'launch.rocheBPSPCustomerStatusReportGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridTableShowLinkButton.finished':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomers'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow4Cell1FocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPIpPlanningReportMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningReportMaterialSelectorShortcutPopupGridTable'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningReportGridTableHeaderReturnFromFocus'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridTableHeaderReturnFromFocus.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPIpPlanningReportGridTable'
            }
        ],
    'launch.rocheBPSPIpPlanningReportMaterialSelectorShortcutPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPIpPlanningReportMaterialSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow2Cell2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPCustomerReportGridRow3Cell2Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow1Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow2Cell3Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],

    'text_click.rocheBPSPCustomerReportGridRow3Cell3Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow1Cell0Button':
        [
            {
                action: app.fn.backToMain,
                argument: ''
            }
        ],
    'launch.rocheBPSPProductReportGridRow2Cell4Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],

    'text_click.rocheBPSPProductReportGridRow3Cell4Text':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow4Cell1FocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomerReportMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomerReportMaterialSelectorShortcutPopupGridTable'
            }
        ],
    'launch.rocheBPSPCustomerReportMaterialSelectorShortcutPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomerReportMaterialSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomerReportGridTable'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomerReportGridRow4Cell1FocusButton'
            }
        ],

    'segmentedControlTab2.rocheBPSPCustomerReportGridRow4Cell2SegmentedControl':
        [
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCustomerReportGridTable'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCustomerReportGridRow4Cell3Button'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCustomerReportGridRow5'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCustomerReportGridRow6'
            },
            /*
    {
        action: app.fn.showWidget,
        argument: 'rocheBPSPProductReportChart'
    },
    {
        action: app.fn.forceRefresh,
        argument: 'rocheBPSPProductReportChart'
    }    */
        ],

    'segmentedControlTab1.rocheBPSPCustomerReportGridRow4Cell2SegmentedControl':
        [
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCustomerReportGridTable'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCustomerReportGridRow4Cell3Button'
            },
            {
                action: app.fn.showWidget,
                argument: 'rocheBPSPCustomerReportGridRow5'
            },
            {
                action: app.fn.hideWidget,
                argument: 'rocheBPSPCustomerReportGridRow6'
            },
        ],
    'launch.rocheBPSPCustomerReportGridTable_row_1':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCustomers'
            }
        ],
    /* Company Settings Versions */
    'launch.rocheBPSPCompanySettingsVersionsGridRow1Cell3Button':
        [
            {
                action: app.fn.togglePopup,
                argument: ['rocheBPSPCompanySettingsVersionsUserPanelGridTable']
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button4':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button6':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridTable_row_0':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopupGridRow1Cell1Text'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopupControlPanelUpdateButton'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridTable_row_3':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'buttonActive',
                        actions: [
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopupSourceVersionDropbox'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopupTargetVersionDropbox'
                            },
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsEditLockedPopup'
                            }
                        ]
                    }
                ]
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridTable_row_4':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'buttonActive',
                        actions: [
                            {
                                action: app.fn.addGridTableCurrentRowSystemValue,
                                argument: ['VersionEditCurrentActualsMonth', 'rocheBPSPCompanySettingsVersionsGridTable', 0, 'pMonth']
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopupEditNameTextBox'
                            },
                            {
                                action: app.fn.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsEditVersionActualsMonthDropbox'
                            },
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsEditLockedPopup'
                            }
                        ]
                    }
                ]
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridTable_row_5':
        [
            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'buttonActive',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsClearVersionPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsEditLockedPopup'
                            }
                        ]
                    }
                ]
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsCopyDataPopupControlPanelCopyButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsCopyDataPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsEditLockedPopupOKButton':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCompanySettingsVersionsGridTable'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsEditLockedPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsVersionsEditVersionPopupControlPanelSaveButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopup'
            },
            {
                action: app.fn.forceRefreshWithDelay,
                argument: ['rocheBPSPCompanySettingsVersionsGridTable', 500]
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsEditVersionPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsClearVersionPopupControlPanelClearButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsClearVersionPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsVisibilityPopupControlPanelUpdateButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsVisibilityPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsClearVersionPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsClearVersionPopup'
            }
        ],
    'launch.rocheBPSPVersionsGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],
    'launch.rocheBPSPVersionsGridRow2Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],
    'launch.rocheBPSPVersionsGridRow2Button2':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],
    'launch.rocheBPSPVersionsGridRow2Button3':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCustomersPlanningCompareByRowPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCompareByRowPopupGridTable'
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningValueSegmentedControl'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },

            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },

            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl',
                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningMonthlyExcelUpload',
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningPeriodUnitSegmentedControlItem2',
                    'rocheBPSPCustomersPlanningYearSegmentedControl',
                    'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
                ]
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2ButtonExit':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2ButtonExit'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningMonthlyExcelUpload',
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningPeriodUnitSegmentedControlItem2',
                    'rocheBPSPCustomersPlanningYearSegmentedControl',
                    'rocheBPSPCustomersPlanningGridTableYearlyHeaderReturnFromFocus',
                    'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'

                ]
            }
        ],
    'launch.rocheBPSPCustomersPlanningCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningMonthlyExcelUpload',
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningGridTableYearlyHeaderReturnFromFocus',
                    'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton',
                    'rocheBPSPCustomersPlanningYearSegmentedControl'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningValueSegmentedControl',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector'
                ]
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCompareByRowPopup'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableYearly',
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton',
                    'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton',
                    'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock',

                ]
            }
        ],

    'launch.rocheBPSPCustomersPlanningFocusPopupVersionCompareButton.finished':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },

            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningMonthlyExcelUpload',
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningGridTableYearlyHeaderReturnFromFocus',
                    'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton',
                    'rocheBPSPCustomersPlanningYearSegmentedControl'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningValueSegmentedControl',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector'
                ]
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableYearly',
                ]
            },
            {action: app.fn.togglePopup, argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'}
        ],

    'segmentedControlTab2.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl':
        [
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport'
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },

        ],
    'segmentedControlTab1.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl':
        [
            {
                action: app.fn.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1Text',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne',
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport',
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningPeriodUnitSegmentedControlItem2'
                ]
            },
            {
                action: app.fn.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl'
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2ButtonExit'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab1.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab2.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab3.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab4.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],

    'launch.rocheBPSPVersionsCopyDataTemplatePopupControlPanelCopyButton.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'refreshRequest.rocheBPSPVersionsCopyDataTemplatePopupControlPanelCopyButton'
            }
        ],
    'upload.rocheBPSPCompanySettingsGrowthGridRow3Cell3Upload.finished':
        [
            {
                action: app.fn.executeRequest,
                argument: 'request.rocheBPSPCompanySettingsGrowthGridRow3Cell3Upload'
            }
        ],
    'launch.rocheBPSPCompanySettingsGrowthGridRow3Cell3Button1':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPCompanySettingsGrowthPrefillRatesPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsGrowthPrefillRatesPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPCompanySettingsGrowthPrefillRatesPopup'
            }
        ],

    //Simulation page

    'launch.rocheBPSPMainGridRow5Cell1Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPSimulation'
            }
        ],

    'launch.rocheBPSPSimulationGridRow1Cell0Button':
        [
            {
                action: app.fn.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'choose.rocheBPSPSimulationSelectorPopUpDropbox.finished': [
        {
            action: app.fn.togglePopup,
            "argument": 'rocheBPSPSimulationSelectorPopUp'
        }
    ],

    'text_click.rocheBPSPSimulationGridRow2CellVersionSelectorCellText.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationSelectorPopUp'
            },
            {
                action: app.fn.forceRefreshWidgets,
                argument: [
                    'rocheBPSPSimulationSelectorPopUpDropbox'

                ]
            }
        ],

    'launch.rocheBPSPSimulationGridRow1Cell3Button':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationInfoPopupText1'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationInfoPopupText2'
            },
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPSimulationInfoPopup'
            }
        ],
    'launch.rocheBPSPSimulationInfoPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationInfoPopup'
            }
        ],

    'launch.rocheBPSPMainGridRow2aCell2Button':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPMainSubmissionToBPXPPopup'
            }
        ],

    'launch.rocheBPSPSimulationGridTableHeaderFocusButton':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPSimulationSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationSelectorShortcutPopupGridTable'
            },
        ],

    'launch.rocheBPSPSimulationSelectorShortcutPopupGridTableButton01':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPSimulationDistributionPopupControlPanelCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationDistributionPopup'
            }
        ],

    'launch.rocheBPSPSimulationDistributionPopupControlPanelSaveButton.finished':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationDistributionPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationGridTable'
            },
        ],

    'write.rocheBPSPSimulationGridTable.finished':
        [

            {
                action: app.fn.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'splitPopup',
                        actions: [
                            {
                                action: app.fn.openPopup,
                                argument: 'rocheBPSPSimulationDistributionPopup'
                            },
                        ]
                    },
                ]
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationDistributionPopupGridTable'
            }
        ],

    'launch.rocheBPSPSimulationSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationSelectorShortcutPopup'
            },
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationGridTable'
            }
        ],

    'launch.rocheBPSPSimulationGridTableHeaderReturnFromFocus':
        [
            {
                action: app.fn.forceRefresh,
                argument: 'rocheBPSPSimulationGridTable'
            }
        ],

    'launch.rocheBPSPSimulationGridTable_row_0':
        [
            {
                action: app.fn.openPopup,
                argument: 'rocheBPSPSimulationFocusPopup'
            }
        ],
    'launch.rocheBPSPSimulationFocusPopupCancelButton':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationFocusPopup'
            }
        ],

    'launch.rocheBPSPSimulationFocusPopupFocusButton':
        [
            {
                action: app.fn.forceRefresh,
                argument: '.rocheBPSPSimulationGridTable'
            },
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationFocusPopup'
            }
        ],

    'text_click.rocheBPSPSimulationGridTableHeaderText-03':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationPLViewLimitPopUp'
            }
        ],
    'choose.rocheBPSPSimulationPLViewLimitPopUpDropbox':
        [
            {
                action: app.fn.togglePopup,
                argument: 'rocheBPSPSimulationPLViewLimitPopUp'
            }
        ],
}
;