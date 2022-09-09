/* global app */
'use strict';
EventMap = {

    'launch.rocheBPSPMainGridRow3Cell1Button': [
        {
            action: Api.removeWidgetValues,
            argument: ['rocheBPSPCustomersCompanySelector', 'rocheBPSPCustomersTerritorySelector']
        },
        {
            action: Api.openPage,
            argument: 'rocheBPSPCustomers'
        }
    ],

    'launch.rocheBPSPMainGridRow3Cell2Button':
        [
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsReceiverSelector', 'rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly']
            },
            {
                action: Api.openPage,
                argument: 'rocheBPSPProducts'
            }
        ],

    'launch.rocheBPSPProductsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsReceiverSelector', 'rocheBPSPProductsGridTableYearly', 'rocheBPSPProductsGridTableMonthly']
            }
        ],

    'launch.rocheBPSPSettingsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],

    'launch.rocheBPSPMainSubmissionToBPXPPopupNo':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMainSubmissionToBPXPPopup'
            }
        ],
    'launch.rocheBPSPMainSubmissionToBPXPPopupYes':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMainSubmissionToBPXPPopup'
            }
        ],

    //UserPanel events
    'launch.rocheBPSPMainGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPMainUserPanelPopup']
            }
        ],

    'launch.rocheBPSPProductsGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPProductsUserPanelPopup']
            }
        ],

    'launch.rocheBPSPProductsCheckoutGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPProductsCheckoutUserPanelPopup']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPIPPlanningUserPanelPopup']
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPIPPlanningCheckoutUserPanelPopup']
            }
        ],

    'launch.rocheBPSPSettingsGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPSettingsUserPanelPopup']
            }
        ],

    'launch.rocheBPSPMaterialGridRow1Cell3Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPMaterialUserPanelPopup']
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow1Cell3Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPAddMaterialUserPanelPopup']
            }
        ],

    'launch.rocheBPSPCustomersGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCustomersUserPanel']
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCustomersPlanningUserPanel']
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow1Cell3Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCompanySettingsUserPanel']
            }
        ],

    'launch.rocheBPSPSecuritySetupGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPSecuritySetupUserPanel']
            }
        ],

    'launch.rocheBPSPTerritoriesGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPTerritoriesUserPanel']
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTitleGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPTerritoriesUsersUserPanel']
            }
        ],

    'launch.rocheBPSPAccountsGridRow1Cell4Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPAccountsUserPanel']
            }
        ],

    'launch.rocheBPSPAccountsOverviewGridRow1Cell4Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPAccountsOverviewUserPanel']
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow1Cell5Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPAccountsTerritoriesUserPanel']
            }
        ],

    'launch.rocheBPSPTerritoriesProductsGridRow1Cell4Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPTerritoriesProductsUserPanel']
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow1Cell3Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCompanySettingsCheckedOutUserPanel']
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow1Cell3Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCompanySettingsGrowthUserPanel']
            }
        ],


    'launch.rocheBPSPProductReportGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPProductReportUserPanel']
            }
        ],

    'launch.rocheBPSPReportKPIGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPReportKPIUserPanel']
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCustomerReportUserPanel']
            }
        ],

    'launch.rocheBPSPCustomerStatusReportUserPanel':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCustomerStatusReportUserPanel']
            }
        ],

    'launch.rocheBPSPIpPlanningReportGridRow1Cell9Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPIpPlanningReportUserPanel']
            }
        ],


    //start products

    'launch.rocheBPSPProductsGridTableMonthly_row_0':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'isPlanningLocked',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsLockedPlanningPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isChildrenLocked',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsNoCheckoutPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isLockedByMe',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isLocked',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutWarningByUserText'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutWarningContactEditorButton'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutWarning'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'noPopup',
                        actions: [
                            {
                                action: Api.skip,
                                argument: ''
                            }
                        ]
                    },
                    {
                        conditionKey: 'isPlanningLocked',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsLockedPlanningPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isChildrenLocked',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsNoCheckoutPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isLockedByMe',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutPopup'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutPopupVersionCompareButton'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isLocked',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutWarningByUserText'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutWarningContactEditorButton'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutWarning'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutPopup'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutPopup'
            }
        ],
    'launch.rocheBPSPProductsGridRow2Cell1Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsColumnSelectorPopupDropBox'
            }
        ],
    'launch.rocheBPSPProductsColumnSelectorCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupCheckoutButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupCheckoutButton.finished':
        [
            {
                action: Api.checkTIResponseStatus,
                argument: [Api.removeWidgetValues, ['rocheBPSPProductsTypeSegmentedControl'], Api.skip, '']
            },
            {
                action: Api.checkTIResponseStatus,
                argument: [Api.openPage, 'rocheBPSPProductsCheckout', Api.openPopup, 'rocheBPSPProductsCheckoutWarning']
            }
        ],
    'launch.rocheBPSPProductsCheckoutWarningCancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutWarning'
            }
        ],
    'launch.rocheBPSPProductsNoCheckoutPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsNoCheckoutPopup'
            }
        ],
    'launch.rocheBPSPProductsNoCheckoutPopupFocusButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsNoCheckoutPopup'
            }
        ],
    'segmentedControlTab2.rocheBPSPProductsPeriodUnitSegmentedControl':
        [
            {
                action: Api.hideWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo'
                ]
            },
            {
                action: Api.showWidgets,
                argument: ['rocheBPSPProductsGridTableMonthly']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            }
        ],
    'segmentedControlTab1.rocheBPSPProductsPeriodUnitSegmentedControl':
        [
            {
                action: Api.hideWidgets,
                argument: ['rocheBPSPProductsGridTableMonthly']
            },
            {
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow2Cell1Button',
                    'rocheBPSPProductsGridRow3Cell2Text',
                    'rocheBPSPProductsGridRow3Cell2ButtonOne',
                    'rocheBPSPProductsGridRow3Cell2ButtonTwo'
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControlInfoText'
            }
        ],
    'launch.rocheBPSPProductsCheckoutPopupFocusButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutPopup'
            }
        ],

    'launch.rocheBPSPProductsLockedPlanningPopupFocusButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsLockedPlanningPopup'
            }
        ],

    'launch.rocheBPSPProductsLockedPlanningPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsLockedPlanningPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell2Button':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutClearPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutClearPopupClearSelectionButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutClearPopupClearAllButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutClearPopup'
            }
        ],

    'launch.rocheBPSPProductsGridTableYearlyHeaderFocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable'
            }
        ],

    'launch.rocheBPSPProductsGridRow3Cell2ButtonTwo':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsCompareByRowPopupGridTable'
                ]
            },
        ],
    'launch.rocheBPSPProductsGridTableMonthlyHeaderFocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopupGridTable'
            }
        ],
    'launch.rocheBPSPProductsProductSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsProductSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPProductsColumnSelectorRestoreButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsColumnSelectorUpdateButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCommentShowGridRow5Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCommentEdit'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCommentEditGridRow2CommentInput'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCommentEditGridRow3TextInput'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCommentShow'
            }
        ],


    'launch.rocheBPSPProductsCommentEditControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPProductsCommentEdit']
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsGridTableMonthly_row_17':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCommentShowGridTableSource'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCommentShow'
                            }
                        ]
                    },


                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCommentEdit'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCommentShowGridTableSource'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCommentShow'
                            }
                        ]
                    },


                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCommentEdit'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCommentEdit'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCommentShowGridXButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCommentShow'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCommentShowGridTable', 'rocheBPSPProductsCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCommentEditControlPanelSaveButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCommentEdit'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCommentShow'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCommentShowGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCommentShowGridTableSource'
            }
        ],
    'launch.rocheBPSPProductsGridRow1Cell4Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsInfoPopup'
            }
        ],
    'launch.rocheBPSPProductsInfoPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsInfoPopup'
            }
        ],
    // Product  Versions
    'launch.rocheBPSPProductsCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridRow3Cell6',
                    'rocheBPSPProductsGridVersionSelector'
                ]
            },
            {action: Api.togglePopup, argument: 'rocheBPSPProductsCheckoutPopup'}
        ],
    'launch.rocheBPSPProductsGridRow3Cell2ButtonOne':
        [
            {
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell3ButtonGrey',
                    'rocheBPSPProductsGridVersionSelectorTwo',
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsGridLineItemSelector',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: Api.hideWidgets,
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
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPProductsGridVersionSelector'
                ]
            },

        ],
    'launch.rocheBPSPProductsGridRow3Cell4ButtonExit.finished':
        [
            {
                action: Api.showWidgets,
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
                action: Api.hideWidgets,
                argument: [
                    'rocheBPSPProductsGridRow3Cell3ButtonGrey',
                    'rocheBPSPProductsGridVersionSelectorTwo',
                    'rocheBPSPProductsGridRow3Cell4ButtonExit',
                    'rocheBPSPProductsGridLineItemSelector',
                    'rocheBPSPProductsValueSegmentedControl'
                ]
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.executeRequest,
                argument: 'request.rocheBPSPProductsCheckoutUploadPopupUpload'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow1Cell4Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutInfoPopup'
            }
        ],

    'upload.rocheBPSPProductsCheckoutUploadPopupUpload':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            }
        ],

    'launch.rocheBPSPProductsCheckoutInfoPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutInfoPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentShowGridRow5Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutCommentEdit'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCommentEditGridRow3TextInput'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCommentShow'
            }
        ],


    'launch.rocheBPSPProductsCheckoutCommentEditControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPProductsCheckoutCommentEdit']
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
            }
        ],

    'launch.rocheBPSPProductsCheckoutGridTableMonthly_row_17':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutCommentShowGridTableSource'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutCommentShow'
                            }
                        ]
                    },


                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutCommentEdit'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutCommentShowGridTableSource'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutCommentShow'
                            }
                        ]
                    },


                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutCommentEdit'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPProductsCheckoutCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsReceiverSelector']
            }
        ],
    'choose.rocheBPSPipPlanningGridRow1Cell2DropBox':
        [
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox']
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentEditGridXButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCommentEdit'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentShowGridXButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCommentShow'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutCommentShowGridTable', 'rocheBPSPProductsCheckoutCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPProductsCheckoutCommentEditControlPanelSaveButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCommentEdit'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutCommentShow'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCommentShowGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCommentShowGridTableSource'
            }
        ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopupDropBox'
            }
        ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorRestoreButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutColumnSelectorUpdateButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutColumnSelectorPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button':
        [
            {
                action: Api.removeWidgetValues,
                argument: [
                    'rocheBPSPProductsGridTableYearly',
                    'rocheBPSPProductsGridTableMonthly',
                    'rocheBPSPProductsCheckoutCopyMergePopupSlider',
                    'rocheBPSPProductsTypeSegmentedControl'
                ]
            },
            {
                action: Api.removeSliders,
                argument: ''
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCheckoutProduct', false]
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell3Button.finished':
        [

            {
                action: Api.openPage,
                argument: 'rocheBPSPProducts'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPProductsCheckoutGridTableYearly', 'rocheBPSPProductsCheckoutGridTableMonthly']
            }
        ],
    'segmentedControlTab2.rocheBPSPProductsCheckoutPeriodUnitSegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductsCheckoutGridTableYearly'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductsCheckoutGridTableMonthly'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductsCheckoutGridRow2Cell1Button'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            }
        ],
    'segmentedControlTab1.rocheBPSPProductsCheckoutPeriodUnitSegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductsCheckoutGridTableMonthly'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductsCheckoutGridTableYearly'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductsCheckoutGridRow2Cell1Button'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControlInfoText'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsTypeSegmentedControl'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridRow2Cell1bButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutUploadPopupPlDropbox'
            }
        ],
    'launch.rocheBPSPProductsCheckoutUploadPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            }
        ],
    'request.rocheBPSPProductsCheckoutUploadPopupUpload.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutUploadPopupUpload'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutUploadPopup'
            },
            {
                action: Api.showPopup,
                argument: 'Upload success'
            }
        ],
    'upload.rocheBPSPProductsCheckoutUploadPopupUpload.error':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutUploadPopupUpload'
            }
        ],
    'write.rocheBPSPProductsCheckoutGridTableMonthly.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'request.rocheBPSPProductsCheckoutGridTableMonthly'
            }
        ],
    'pastelast.rocheBPSPProductsCheckoutGridTableMonthly.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'request.rocheBPSPProductsCheckoutGridTableMonthly'
            }
        ],
    'launch.rocheBPSPProductsCheckoutGridTableMonthly_row_4':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCopyMergeBackButton':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopupSlider'
            }
        ],
    'perform.rocheBPSPProductsCheckoutGridTableYearly':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'distributionEdit',
                        actions: [
                            {
                                action: Api.addGridTableCurrentRowSystemValue,
                                argument: ['DistributionEditProductCode', 'rocheBPSPProductsCheckoutGridTableYearly', 1, 'title']
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
                            },
                            {
                                action: Api.forceRefreshWithDelay,
                                argument: ['rocheBPSPProductsCheckoutDistributionEditPopupGridTable', 500]
                            }
                        ]
                    },
                    {
                        conditionKey: 'copyMerge',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'performWrite',
                        actions: [
                            {
                                action: Api.forceRefreshWithDelay,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupMergeButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCopyMergePopupCancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCopyMergePopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionEditPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionEditPopupControlPanelSaveButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionEditPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupLastYearButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupLinearSplitButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    'launch.rocheBPSPProductsCheckoutDistributionPopupMonthlyPhasingButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutDistributionPopup'
            }
        ],
    // products checkout versioning
    'launch.rocheBPSProductsCheckoutVersioningRowButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductsCheckoutCompareByRowPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductsCheckoutCompareByRowPopupGridTable'
            }
        ],
    'launch.rocheBPSPProductsCheckoutCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSProductsCheckoutVersioningExitButton',
                    'rocheBPSPProductsCheckoutValueSegmentedControl'
                ]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductsCheckoutCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.openPage,
                argument: 'rocheBPSPMaterial'
            }
        ],

    'launch.rocheBPSPMaterialGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow1Cell0Button':
        [
            {
                action: Api.resetWidgetValue,
                argument: 'rocheBPSPAddMaterialGridRow4Cell3Dropbox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell3Dropbox'
            },
            {
                action: Api.resetWidgetValue,
                argument: 'rocheBPSPAddMaterialGridRow4Cell1Search'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell1Search'
            },
            {
                action: Api.resetWidgetValue,
                argument: 'rocheBPSPAddMaterialGridRow4Cell2Search'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell2Search'
            },
            {
                action: Api.resetWidgetValue,
                argument: 'rocheBPSPAddMaterialGridRow4Cell4Search'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell4Search'
            },
            {
                action: Api.resetWidgetValue,
                argument: 'rocheBPSPAddMaterialGridRow4Cell5Search'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell5Search'
            },
            {
                action: Api.openPage,
                argument: 'rocheBPSPMaterial'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['RocheBPSPMaterialsAddMaterialSearch']
            },
        ],

    'launch.rocheBPSPMaterialGridRow4Cell1Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAddMaterial'
            }
        ],


    'launch.rocheBPSPMainGridRow3Cell3Button':
        [
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox', 'rocheBPSPipPlanningGridTableMonthly']
            },
            {
                action: Api.openPage,
                argument: 'rocheBPSPipPlanning'
            }
        ],

    'launch.rocheBPSPipPlanningGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridRow1Cell3DropBox', 'rocheBPSPipPlanningGridTableMonthly']
            }
        ],


    'launch.rocheBPSPMainGridRow5Cell1aSubmitToBPXP':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutPopupFocusButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutPopupCheckoutButton.finished':
        [
            {
                action: Api.checkTIResponseStatus,
                argument: [Api.openPage, 'rocheBPSPIpPlanningCheckout', Api.openPopup, 'rocheBPSPIpPlanningCheckoutWarning']
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutWarningCancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutWarning'
            }
        ],
    'launch.rocheBPSPIpPlanningNoCheckoutPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningNoCheckoutPopupFocusButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell2Button':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutClearPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutClearPopupClearSelectionButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutClearPopupClearAllButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutClearPopup'
            }
        ],

    'launch.rocheBPSPipPlanningGridTableMonthly_row_0':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'isPlanningLocked',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPipPlanningLockedPlanningPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isChildrenLocked',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningNoCheckoutPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isLockedByMe',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCheckoutPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'isLocked',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCheckoutWarningContactEditorButton'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCheckoutWarningByUserText'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCheckoutWarning'
                            }
                        ]
                    },
                    {
                        conditionKey: 'openPopUpConditional',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCheckoutPopup'
                            }
                        ]
                    }
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText2'
            },
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem1':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'Cash Sales']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem2':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'Lease']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell1SegmentedControlItem3':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'Return']
            }
        ],
    'launch.rocheBPSPipPlanningGridRow1Cell4Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
            }
        ],


    'launch.rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsedItem1':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'All']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsedItem2':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'New']
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsedItem3':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'Used']
            }
        ],

    'launch.rocheBPSPipPlanningValueSegmentedControlItem1':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'VALUE']
            }
        ],

    'launch.rocheBPSPipPlanningValueSegmentedControlItem2':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'DELTA PERCENT']
            }
        ],

    'launch.rocheBPSPipPlanningValueSegmentedControlItem3':
        [
            {
                action: Api.addSystemValue,
                argument: ['dynamicValue', 'DELTA ABS']
            }
        ],


    'launch.rocheBPSPipPlanningGridTableMonthlyHeaderFocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable'
            }
        ],

    'launch.rocheBPSPipPlanningGridRow2Cell3ButtonCompareColumn':
        [
            {
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: Api.hideWidgets,
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
                action: Api.forceRefreshWidgets,
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
                action: Api.showWidgets,
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
                action: Api.hideWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: Api.forceRefreshWidgets,
                argument: ['rocheBPSPipPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            },
        ],


    'launch.rocheBPSPipPlanningGridRow2Cell3ButtonCompareRow':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPipPlanningCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
                argument: ['rocheBPSPipPlanningCompareByRowPopupGridTable']
            },
        ],

    'launch.rocheBPSPipPlanningCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPipPlanningCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutPopupVersionCompareButton.finished':
        [
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPipPlanningGridRow2Cell3ButtonExit',
                    'rocheBPSPipPlanningGridRow2Cell3SegmentedControlUsed',
                    'rocheBPSPipPlanningValueSegmentedControl'
                ]
            },
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPipPlanningGridTableMonthly',
                    'rocheBPSPipPlanningVersionSelector'
                ]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutPopup'
            }
        ],


    'launch.rocheBPSPipPlanningMaterialSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPipPlanningMaterialSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow1Cell4Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutInfoPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutInfoPopup'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell3Button.finished':
        [
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPipPlanningGridTableMonthly']
            },
            {
                action: Api.openPage,
                argument: 'rocheBPSPipPlanning'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutGridRow2Cell1bButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopupPlDropbox'
            }
        ],
    'launch.rocheBPSPIpPlanningCheckoutUploadPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
            }
        ],
    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'request.rocheBPSPIpPlanningCheckoutUploadPopupUpload'
            }
        ],
    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload.error':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopupUpload'
            }
        ],
    'request.rocheBPSPIpPlanningCheckoutUploadPopupUpload.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopupUpload'
            }
        ],

    'launch.rocheBPSPIpPlanningCheckoutVersioningColumnButton':
        [
            {
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningButtonGrey',
                    'rocheBPSPIpPlanningCheckoutVersionSelectorTwo',
                    'rocheBPSPIpPlanningCheckoutVersioningExitButton',
                    'rocheBPSPIpPlanningCheckoutValueSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutSegmentedControlUsed'

                ]
            },
            {
                action: Api.hideWidgets,
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
                action: Api.forceRefreshWidgets,
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
                action: Api.showWidgets,
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
                action: Api.hideWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningButtonGrey',
                    'rocheBPSPIpPlanningCheckoutVersionSelectorTwo',
                    'rocheBPSPIpPlanningCheckoutVersioningExitButton',
                    'rocheBPSPIpPlanningCheckoutValueSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutSegmentedControlUsed'
                ]
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
                argument: ['rocheBPSPIpPlanningCheckoutCompareByRowPopupGridTable']
            },
        ],

    'launch.rocheBPSPIpPlanningCheckoutCompareByRowPopupGridTable_row_0.finished':
        [
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPIpPlanningCheckoutVersioningExitButton',
                    'rocheBPSPIpPlanningCheckoutValueSegmentedControl',
                    'rocheBPSPIpPlanningCheckoutSegmentedControlUsed'
                ]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.hideWidget,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            },
            {
                action: Api.showWidget,
                argument: 'RocheBPSPMaterialsAddMaterialClipboard'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAddMaterialGridRow4'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPAddMaterialGridRow3'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMateralsAddMaterialSearchPagerPanel'
            }
        ],


    'segmentedControlTab2.rocheBPSPAddMaterialGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'RocheBPSPMaterialsAddMaterialClipboard'
            },
            {
                action: Api.showWidget,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAddMaterialGridRow3'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPAddMaterialGridRow4'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMateralsAddMaterialSearchPagerPanel'
            }
        ],

    'segmentedControlTab1.rocheBPSPMaterialGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportByIpNodeButton'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportButton'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2ButtonIP'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2Button'
            }
        ],

    'segmentedControlTab2.rocheBPSPMaterialGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMaterialGridTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },

            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportButton'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell3ExportByIpNodeButton'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2Button'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPMaterialGridRow4Cell2ButtonIP'
            }
        ],

    'launch.rocheBPSPMaterialGridRow4Cell2Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialAddDummyPopup'
            },
        ],
    'launch.rocheBPSPMaterialAddDummyPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyPopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyPopupControlPanelAddButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyPopup'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],
    'launch.rocheBPSPMaterialGridRow4Cell2ButtonIP':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialAddDummyIpPopup'
            },
        ],
    'launch.rocheBPSPMaterialAddDummyIpPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyIpPopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyIpPopupControlPanelAddButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyIpPopup'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialIPNodeGridTable'
            }
        ],
    'launch.rocheBPSPMaterialGridTable_row_5':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialMoveDataPopup'
            },
        ],
    'launch.rocheBPSPMaterialGridTable_row_6':
        [
            {
                action: Api.addGridTableCurrentRowSystemValue,
                argument: ['MaterialToEdit', 'rocheBPSPMaterialGridTable', 2, 'title']
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialEditDummyPopupMaterialNewNameTextBox'
            },
        ],

    'launch.rocheBPSPMaterialMoveDataPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialMoveDataPopup'
            }
        ],

    'launch.rocheBPSPMaterialMoveDataPopupControlPanelAddButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialMoveDataPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],

    'launch.rocheBPSPMaterialEditDummyPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            }
        ],

    'launch.rocheBPSPMaterialEditDummyPopupControlPanelAddButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            }
        ],

    'launch.rocheBPSPMateralsAddMaterialSearchPagerPreviousButton':
        [
            {
                action: Api.decreasePage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerNextButton':
        [
            {
                action: Api.increasePage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerFirstPageButton':
        [
            {
                action: Api.jumpToFirstPage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMateralsAddMaterialSearchPagerLastPageButton':
        [
            {
                action: Api.jumpToLastPage,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],
    'launch.rocheBPSPMaterialGridTable_row_4':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialDeleteDataPopup'
            },


        ],
    'launch.rocheBPSPMaterialDeleteDataPopupControlPanelAddButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],
    'launchpaste.rocheBPSPAddMaterialGridRow3Cell2Button.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'request.rocheBPSPAddMaterialGridRow3Cell2Button'
            }
        ],

    'launch.rocheBPSPMaterialDeleteDataPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataPopup'
            }
        ],

    'launch.rocheBPSPMaterialIPNodeGridTable_row_4':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
            },
        ],

    'launch.rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelAddButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            }
        ],

    'launch.rocheBPSPMaterialDeleteDataIPGridTablePopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialDeleteDataIPGridTablePopup'
            }
        ],

    'launch.rocheBPSPMaterialGridTable_row_3':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialAddDummyGridTablePopupGridRow3Cell1Dropbox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialAddDummyGridTablePopupGridRow4Cell1Dropbox'
            }
        ],
    'launch.rocheBPSPMaterialAddDummyGridTablePopupControlPanelCancelButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyGridTablePopupControlPanelAddButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTablePopup'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],


    'launch.rocheBPSPMaterialIPNodeGridTable_row_3':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopupGridRow4Cell1Dropbox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopupGridRow3Cell1Dropbox'
            }
        ],
    'launch.rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
            }
        ],

    'launch.rocheBPSPMaterialAddDummyGridTableIPpopupControlPanelAddButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialAddDummyGridTableIPpopup'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            }

        ],

    'launch.rocheBPSPMaterialIPNodeGridTable_row_5':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
            },
        ],
    'launch.rocheBPSPMaterialIPNodeGridTable_row_6':
        [
            {
                action: Api.addGridTableCurrentRowSystemValue,
                argument: ['MaterialToEdit', 'rocheBPSPMaterialIPNodeGridTable', 2, 'title']
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMaterialEditDummyPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialEditDummyPopupMaterialNewNameTextBox'
            },
        ],

    'launch.rocheBPSPMaterialMoveDataIPNodePopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
            }
        ],

    'launch.rocheBPSPMaterialMoveDataIPNodePopupControlPanelAddButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPMaterialMoveDataIPNodePopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialGridTable'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPMaterialIPNodeGridTable'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4CellRefreshButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4Cell6Button.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4Cell7Button.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow4CellClearAllFilterButton.finished':
        [

            {
                action: Api.resetWidgetValue,
                argument: ['rocheBPSPAddMaterialGridRow4Cell3Dropbox']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell3Dropbox'
            },
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            },
            {
                action: Api.resetWidgetValue,
                argument: ['rocheBPSPAddMaterialGridRow4Cell1Search']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell1Search'
            },

            {
                action: Api.resetWidgetValue,
                argument: ['rocheBPSPAddMaterialGridRow4Cell2Search']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell2Search'
            },
            {
                action: Api.resetWidgetValue,
                argument: ['rocheBPSPAddMaterialGridRow4Cell4Search']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell4Search'
            },
            {
                action: Api.resetWidgetValue,
                argument: ['rocheBPSPAddMaterialGridRow4Cell5Search']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell5Search'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPAddMaterialGridRow4Cell5ValidToggle'
            }

        ],

    'launch.rocheBPSPIpPlanningCommentEditControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPIpPlanningCommentEdit']
            },

            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
            }

        ],

    'launch.rocheBPSPipPlanningGridTableMonthly_row_21':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [

                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCommentShowGridTableSource'
                            },

                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCommentShow'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCommentEdit'
                            },

                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCommentEdit'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
            }
        ],

    'launch.rocheBPSPIpPlanningCommentEditControlPanelSaveButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCommentEdit'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCommentShow'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCommentShowGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCommentShowGridTableSource'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPipPlanningGridTableMonthly'
            }


        ],

    'launch.rocheBPSPIpPlanningCommentShowGridXButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCommentShow'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCommentShowGridTable', 'rocheBPSPIpPlanningCommentShowGridTableSource']
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPipPlanningGridTableMonthly'
            }


        ],

    'launch.rocheBPSPIpPlanningCommentShowGridRow5Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCommentEdit'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCommentShow'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCommentEditGridRow2CommentInput'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCommentEditGridRow3TextInput'
            },


        ],

    'launch.rocheBPSPIpPlanningCheckoutCommentEditControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPIpPlanningCheckoutCommentEdit']
            },

            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
            }

        ],

    'launch.rocheBPSPIpPlanningCheckoutGridTableMonthly_row_21':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [

                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource'
                            },

                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
            }


        ],

    'launch.rocheBPSPIpPlanningCheckoutCommentEditControlPanelSaveButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutGridTableMonthly'
            }

        ],

    'launch.rocheBPSPIpPlanningCheckoutCommentShowGridXButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPIpPlanningCheckoutCommentShowGridTable', 'rocheBPSPIpPlanningCheckoutCommentShowGridTableSource']
            }


        ],

    'launch.rocheBPSPIpPlanningCheckoutCommentShowGridRow5Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentEdit'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutCommentShow'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow2CommentInput'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningCheckoutCommentEditGridRow3TextInput'
            }
        ],

    'launch.rocheBPSPAddMaterialGridRow3Cell3Button.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialClipboard'
            }

        ],

    'launch.rocheBPSPAddMaterialRemoveClipBoard.finished':
        [
            {
                action: Api.forceRefreshWithDelay,
                argument: ['RocheBPSPMaterialsAddMaterialClipboard', 500]
            }

        ],

    'launch.RocheBPSPMaterialsAddMaterialSearchButton14.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }

        ],
    'launch.RocheBPSPMaterialsAddMaterialSearchSelectAll.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'RocheBPSPMaterialsAddMaterialSearch'
            }
        ],

    'launch.rocheBPSPMainGridRow3Cell4Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'launch.rocheBPSPReportsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],

    'launch.rocheBPSPProductReportGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],

    'launch.rocheBPSPReportsGridRow2Cell1Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],

    'segmentedControlTab1.rocheBPSPProductReportGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportGridTable'
            }
        ],

    'segmentedControlTab2.rocheBPSPProductReportGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },

        ],

    'launch.rocheBPSPProductReportGridTableHeaderFocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportProductSelectorChartButton'
            }
        ],

    'launch.rocheBPSPProductReportMaterialSelectorShortcutPopupGridTableButton01':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportProductSelectorChartButton'
            }
        ],

    'launch.rocheBPSPProductReportMaterialSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductReportMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
            }
        ],

    'launch.rocheBPSPProductReportProductSelectorChartButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChart'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChartGridTable'
            }
        ],

    'launch.rocheBPSPProductReportMaterialSelectorPopopInChartGridTable_row_0':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductReportMaterialSelectorPopopInChart'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportProductSelectorChartButton'
            }
        ],

    'launch.rocheBPSPProductReportGridRow1Cell4Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductReportInfoPopup'
            }
        ],

    'launch.rocheBPSPProductReportInfoPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductReportInfoPopup'
            }
        ],

    'launch.rocheBPSPProductReportGridRow4Cell2Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductReportExportPopup'
            }
        ],
    'launch.rocheBPSPProductReportExportPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductReportExportPopup'
            }
        ],

    'launch.rocheBPSPProductReportGridTable_row_0':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPProductReportCheckoutPopup'
            }

        ],
    'launch.rocheBPSPProductReportCheckoutPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductReportCheckoutPopup'
            }
        ],

    'launch.rocheBPSPProductReportCheckoutPopupFocusButton':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPProductReportCheckoutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportProductSelectorChartButton'
            }
        ],

    'open.rocheBPSPCustomersHorizontalTable.finished':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomersPlanning'
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow1Cell0Button.finished':
        [
            {
                action: Api.openPageWithState,
                argument: ['rocheBPSPCustomers', 'rocheBPSPCustomersHorizontalTable', 'rocheBPSPCustomersHeaderInfoGridTable', 'rocheBPSPCustomersVersionSelector']
            },
            {
                action: Api.removeWidgetValues,
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
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningMonthlyType', 'Base Plan']
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningMonthlyTypeValue', 'Base Plan']
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomerPlanningSegmentedControlPeriodUnit', 'Yearly']
            },
            {
                action: Api.addSystemValueByVal,
                argument: ['systemValueCustomersPlanningFocused', 'systemValueDefaultCustomersPlanningFocused']
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueIsCustomersPlanningFocused', false]
            },
            {
                action: Api.removeSliders,
                argument: ''
            }
        ],
    'launch.rocheBPSPCustomersPlanningCustomerSelectorButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2OpenPopupButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningMonthlyExcelUpload':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningUploadPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningUploadPopupPlDropbox'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningClearPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningClearPopupClearSelectionButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }

        ],
    'launch.rocheBPSPCustomersPlanningClearPopupClearAllButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningClearPopup'
            }, {
            action: Api.forceRefresh,
            argument: 'rocheBPSPCustomersPlanningGridTableYearly'
        },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }

        ],

    'switch.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl.finished':
        [
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningUploadPopup'
            }
        ],

    'upload.rocheBPSPCustomersPlanningUploadPopupUpload.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'request.rocheBPSPCustomersPlanningUploadPopupUpload'
            }
        ],

    'request.rocheBPSPCustomersPlanningUploadPopupUpload.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningUploadPopupUpload'
            },
            {
                action: Api.showPopup,
                argument: 'Upload success'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }
        ],
    'upload.rocheBPSPCustomersPlanningUploadPopupUpload.error':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningUploadPopupUpload'
            }
        ],
    'switch.rocheBPSPCustomersPlanningTypeSegmentedControl.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridTableYearly_row_0':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningFocusPopupVersionCompareButton'
            },
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'openPopUpConditional',
                        actions: [
                            {
                                action: Api.openPopup,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'openPopUpConditional',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
                            }
                        ]
                    },
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningFocusPopupVersionCompareButton'
            }
        ],
    'launch.rocheBPSPCustomersPlanningFocusPopupPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningFocusPopupPopupFocusButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelExport'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridTableMonthlyHeaderReturnFromFocus.finished':
        [
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            }
        ],
    'open.rocheBPSPCustomersPlanningHorizontalTableCustomerSelector.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCustomerSelectorButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2NextButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCustomerSelectorButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell2NextButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCustomerSelectorButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableCustomerSelector'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell2PreviousButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell2NextButton'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningOpportunitiesPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelectorTitle'
            }
        ],
    'perform.rocheBPSPCustomersPlanningGridTableYearly':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'distributionEdit',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTablePopup'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelector'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTableSelectorTitle'
                            }
                        ]
                    },
                    {
                        conditionKey: 'copyMerge',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunitiesFromGridTablePopup'
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', true]
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', true]
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal'
            }
        ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupCancel.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
            }
        ],

    'launch.rocheBPSPCustomersPlanningOpportunitiesPopupClose.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunitiesPopup'
            }
        ],
    'delete.rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector.finished':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomerPlanningOpportunityDelete'
            }
        ],
    'launch.rocheBPSPCustomerPlanningOpportunityDeleteControlPanelDeleteButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomerPlanningOpportunityDelete'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            }
        ],
    'launch.rocheBPSPCustomerPlanningOpportunityDeleteControlPanelCancelButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomerPlanningOpportunityDelete'
            }
        ],//----
    'launch.rocheBPSPCustomersPlanningCommentShowGridRow5Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningCommentEdit'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow3TextInput'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentShow'
            }
        ],

    'launch.rocheBPSPCustomersPlanningCommentEditControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCustomersPlanningCommentEdit']
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPCustomersPlanningCommentShowGridTable', 'rocheBPSPCustomersPlanningCommentShowGridTableSource']
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridTableYearly_row_17':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'hasComment',
                        actions: [
                            {
                                action: Api.addGridTableCurrentRowSystemValue,
                                argument: ['LastClickedProductCode', 'rocheBPSPCustomersPlanningGridTableYearly', 0, 'productCode']
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTableSource'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCustomersPlanningCommentShow'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.addGridTableCurrentRowSystemValue,
                                argument: ['LastClickedProductCode', 'rocheBPSPCustomersPlanningGridTableYearly', 0, 'productCode']
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCustomersPlanningCommentEdit'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow2CommentInput'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentEditGridRow3TextInput'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCustomersPlanningCommentShowGridTable'
                            },
                            {
                                action: Api.forceRefresh,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentEdit'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPCustomersPlanningCommentShowGridTable', 'rocheBPSPCustomersPlanningCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPCustomersPlanningCommentShowGridXButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentShow'
            },
            {
                action: Api.removeWidgetValues,
                argument: ['rocheBPSPCustomersPlanningCommentShowGridTable', 'rocheBPSPCustomersPlanningCommentShowGridTableSource']
            }
        ],
    'launch.rocheBPSPCustomersPlanningCommentEditControlPanelSaveButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCommentEdit'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningCommentShow'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentShowGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCommentShowGridTableSource'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            }
        ],

    'launch.rocheBPSPSettingsGridRow2Cell1Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPSettingsGridRow2Cell2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSecuritySetup'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell1Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPTerritories'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPTerritoriesUsers'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell3Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPAccountsOverviewGridRow1Cell3Edit':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccounts'
            }
        ],

    'launch.rocheBPSPAccountsGridRow1Cell3Overview':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPSettingsGridRow5Cell4Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccountsTerritories'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPSecuritySetupGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPSecuritySetupGridTable_row_5':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPTerritoriesUsers'
            },

        ],

    'launch.rocheBPSPTerritoriesGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow1Cell0Button':
        [
            {
                action: Api.openPrevPage,
                argument: ''
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            }
        ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupCopyButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
            }
        ],
    'launch.rocheBPSPCustomersPlanningCopyMergePopupMergeButton.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableYearly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridTableMonthly'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHeaderInfoGridTable'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCopyMergePopup'
            }
        ],
    'select.rocheBPSPCustomersPlanningHorizontalTableOpportunitiesSelector':
        [
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', true]
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', true]
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal'
            }
        ],
    'launch.rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionCancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', false]
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', false]
            }
        ],
    'launch.rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionSave.finished':
        [
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionLoadable', false]
            },
            {
                action: Api.addSystemValue,
                argument: ['systemValueCustomersPlanningIsOpportunityDistributionTotalLoadable', false]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningOpportunityDistributionPopup'
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.forceRefreshWithDelay,
                argument: ['rocheBPSPCustomersPlanningHorizontalTableOpportunityDistributionTotal', 500]
            },
            {
                action: Api.forceRefreshWithDelay,
                argument: ['rocheBPSPCustomersPlanningHorizontalTableOpportunityDistribution', 500]
            }
        ],
    'perform.rocheBPSPCustomersPlanningGridTableYearly.finished':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'performWrite',
                        actions: [
                            {
                                action: Api.forceRefreshWidgets,
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
                action: Api.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    500
                ]
            },
            {
                action: Api.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable',
                    500
                ]
            }
        ],
    'perform.rocheBPSPCustomersPlanningGridTableMonthly.finished':
        [
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable'
                ]
            }
        ],
    'pastelast.rocheBPSPCustomersPlanningGridTableMonthly.finished':
        [
            {
                action: Api.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableMonthly',
                    500
                ]
            },
            {
                action: Api.forceRefreshWithDelay,
                argument: [
                    'rocheBPSPCustomersPlanningHeaderInfoGridTable',
                    500
                ]
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTitleGridRow1Cell0Button':
        [
            {
                action: Api.openPrevPage,
                argument: ''
            }
        ],

    'launch.rocheBPSPTerritoriesUsersGridRow3Cell2SelectorButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPTerritoriesUsersUsersPopup'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersGridRow3Cell3OpenPopupButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPTerritoriesUsersUsersPopup'
            }
        ],
    'open.rocheBPSPTerritoriesUsersHorizontalTableUserSelector':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPTerritoriesUsersUsersPopup'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTerritoriesGridRow3Cell2SelectorButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesPopup'
            }
        ],

    'launch.rocheBPSPTerritoriesUsersTerritoriesGridRow3Cell3OpenPopupButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesPopup'
            }
        ],
    'open.rocheBPSPTerritoriesUsersTerritoriesHorizontalTableUserSelector':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesPopup'
            }
        ],


    'segmentedControlTab2.rocheBPSPTerritoriesUsersTerritoriesSegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPTerritoriesUsersGrid'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGrid'
            },

            {
                action: Api.removeWidgetValue,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesSegmentedControl'
            },
        ],

    'segmentedControlTab1.rocheBPSPTerritoriesUsersSegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersGrid'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGrid'
            },
            {
                action: Api.removeWidgetValue,
                argument: 'rocheBPSPTerritoriesUsersSegmentedControl'
            },
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow3Cell1SelectorButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesTerritoriesPopup'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGridRow3Cell3OpenPopupButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesTerritoriesPopup'
            }
        ],

    'segmentedControlTab1.rocheBPSPAccountsTerritoriesSegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow3'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow4'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row3'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row4'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable2'
            }

        ],

    'segmentedControlTab2.rocheBPSPAccountsTerritoriesSegmentedControl':
        [

            {
                action: Api.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row3'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGrid2Row4'
            },

            {
                action: Api.showWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable2'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow3'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridRow4'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPAccountsTerritoriesGridTable'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGrid2Row3Cell1SelectorButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesCustomerPopup'
            }
        ],

    'launch.rocheBPSPAccountsTerritoriesGrid2Row3Cell3OpenPopupButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPAccountsTerritoriesCustomerPopup'
            }
        ],
    'perform.rocheBPSPTerritoriesGridTable_row_3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccountsTerritories'
            }
        ],
    'perform.rocheBPSPTerritoriesGridTable_row_4':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPTerritoriesUsers'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersGrid'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPTerritoriesUsersGridTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGrid'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPTerritoriesUsersTerritoriesGridTable'
            },
        ],


    'launch.rocheBPSPTerritoriesProductsGridRow1Cell0Button':
        [
            {
                action: Api.openPrevPage,
                argument: ''
            }
        ],

    'perform.rocheBPSPTerritoriesGridTable_row_2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPTerritoriesProducts'
            }
        ],

    'segmentedControlTab1.rocheBPSPAccountsOverviewGridRow1Cell3SegmentedControl':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccounts'
            }
        ],


    'segmentedControlTab2.rocheBPSPAccountsGridRow1Cell3SegmentedControl':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPAccountsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAccountsOverviewGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPAccountsGridRow2Cell1Button.finished':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPAccountsOverview'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button4':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button5':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow2Button6':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button4':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button5':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsMonthlySplitDaysGridRow2Button6':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button4':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button5':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridRow2Button6':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button5':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsGrowthGridRow2Button6':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button4':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridRow2Button5':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsVersions'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_0':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopupGridRow1Cell1Text'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopupControlPanelUpdateButton'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsVisibilityPopupControlPanelUpdateButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsVisibilityPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsVisibilityPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_5':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_6':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopupEditNameTextBox'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsEditPopupControlPanelSaveButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsEditPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsEditPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsClearPopupControlPanelClearButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsClearPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsClearPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsClearPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_7':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsClearPopup'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell1Toggle':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell1Toggle':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell1Toggle':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'switch.rocheBPSPCompanySettingsSimulationsResetPopupGridRow6Cell1Toggle':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow3Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow4Cell3DropBox'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopupGridRow5Cell3DropBox'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsResetPopupControlPanelResetButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsResetPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsResetPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsGridTable_row_8':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsSimulationsSpreadPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsSpreadPopupControlPanelSpreadButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsSpreadPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsSimulationsSpreadPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsSimulationsSpreadPopup'
            }
        ],


    'text_click.rocheBPSPSimulationSelectorPopUpButton':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsSimulationsGridTable'
            },
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],

    'segmentedControlTab2.rocheBPSPCompanySettingsCheckedOutGridRow4Cell1SegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            }
        ],

    'segmentedControlTab1.rocheBPSPCompanySettingsCheckedOutGridRow4Cell1SegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            }
        ],

    'segmentedControlTab2.rocheBPSPCompanySettingsControlGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCompanySettingsGridTableProduct'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCompanySettingsGridTableCustomer'
            }
        ],

    'segmentedControlTab1.rocheBPSPCompanySettingsControlGridRow2Cell1SegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCompanySettingsGridTableCustomer'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCompanySettingsGridTableProduct'
            }
        ],
    'switch.rocheBPSPCompanySettingsGridTableCustomer_row_1':
        [
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCompanySettingsPopUpGridRow1Cell1Button',
                    'rocheBPSPCompanySettingsPopUpGridRow2Cell1Text',
                    'rocheBPSPCompanySettingsPopUpGridRow3Cell1Text',
                    'rocheBPSPCompanySettingsPopUpGridRow4Cell1Button',
                    'rocheBPSPCompanySettingsPopUpGridRow5Cell1Cancel'
                ]
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsPopUp'
            }
        ],
    'launch.rocheBPSPCompanySettingsPopUpGridRow4Cell1Button':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsPopUp'
            }
        ],
    'launch.rocheBPSPCompanySettingsPopUpGridRow5Cell1Cancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsPopUp'
            }
        ],
    'switch.rocheBPSPCompanySettingsGridTableProduct_row_1':
        [
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCompanySettingsProductPopUpGridRow1Cell1Button',
                    'rocheBPSPCompanySettingsProductPopUpGridRow2Cell1Text',
                    'rocheBPSPCompanySettingsProductPopUpGridRow3Cell1Text',
                    'rocheBPSPCompanySettingsProductPopUpGridRow4Cell1Button',
                    'rocheBPSPCompanySettingsProductPopUpGridRow5Cell1Cancel'
                ]
            },
            {

                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsProductPopUp'
            }

        ],
    'launch.rocheBPSPCompanySettingsProductPopUpGridRow4Cell1Button':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsProductPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsProductPopUpGridRow5Cell1Cancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsProductPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridTableHeaderButton06':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutPopUp'
            }
        ],
    'launch.rocheBPSPCompanySettingsCheckedOutPopUpGridRow4Cell1Button.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutPopUp'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridTableButton06.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTable'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutGridTableIPPlanningButton06.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutPopUpGridRow5Cell1Cancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutHeaderGridTableCellButton06':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutIPPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutIPPopUpGridRow4Cell1Button.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutIPPopUp'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsCheckedOutGridTableIPPlanning'
            }
        ],

    'launch.rocheBPSPCompanySettingsCheckedOutIPPopUpGridRow5Cell1Cancel':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsCheckedOutIPPopUp'
            }
        ],

    'launch.rocheBPSPCompanySettingsGridRow6Cell1Button':
        [
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCompanySettingsGridRow4Cell1MessageInput',
                    'rocheBPSPCompanySettingsGridRow5Cell1MessageInput'
                ]
            },
        ],

    'upload.rocheBPSPCustomersPlanningUploadPopupUpload':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningUploadPopup'
            }
        ],

    'upload.rocheBPSPIpPlanningCheckoutUploadPopupUpload':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningCheckoutUploadPopup'
            }
        ],

    'launch.rocheBPSPipPlanningLockedPlanningPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPipPlanningLockedPlanningPopup'
            }
        ],

    'launch.rocheBPSPipPlanningLockedPlanningPopupFocusButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPipPlanningLockedPlanningPopup'
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningLockPlanningPopup'
            }
        ],

    'launch.rocheBPSPCustomersPlanningLockPlanningPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningLockPlanningPopup'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell3Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell3Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell4Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell4Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell5Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell5Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'launch.rocheBPSPReportKPIGridRow1Cell6Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPReportKPIGridRow3Cell6Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell2Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell3Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell3Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell4Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell4Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridRow2Cell6Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPCustomerStatusReportGridRow3Cell6Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],

    'launch.rocheBPSPReportKPIGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPIpPlanningReportGridRow3Cell2Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell3Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'text_click.rocheBPSPIpPlanningReportGridRow3Cell3Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell4Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'text_click.rocheBPSPIpPlanningReportGridRow3Cell4Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow2Cell5Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPIpPlanningReportGridRow3Cell5Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow2Cell5Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPCustomerReportGridRow3Cell5Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow2Cell6Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPCustomerReportGridRow3Cell6Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],

    'launch.rocheBPSPProductReportGridRow2Cell5Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'text_click.rocheBPSPProductReportGridRow3Cell5Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerStatusReport'
            }
        ],
    'launch.rocheBPSPProductReportGridRow2Cell6Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'text_click.rocheBPSPProductReportGridRow3Cell6Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPIpPlanningReport'
            }
        ],
    'segmentedControlTab2.rocheBPSPProductReportGridRow4Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportGridRow4Cell2Button'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportPivotTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportChartLabel'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportChartLabel'
            }
        ],

    'segmentedControlTab1.rocheBPSPProductReportGridRow4Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportChartLabel'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportPivotTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportGridRow4Cell2Button'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportGridTable'
            }
        ],
    'segmentedControlTab3.rocheBPSPProductReportGridRow4Cell1SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportProductSelectorChartCell'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportChart'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportChartLabel'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportGridRow4Cell2Button'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPProductReportGridTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPProductReportPivotTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPProductReportPivotTable'
            }
        ],

    'launch.rocheBPSPProductReportGridRow2Cell2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPProductReportGridRow3Cell2Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'launch.rocheBPSPReportKPIGridRow2Cell4Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPReportKPIInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPReportKPIInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPReportKPIInfoPopup'
            }
        ],

    'launch.rocheBPSPReportKPIInfoPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPReportKPIInfoPopup'
            }
        ],

    'launch.rocheBPSPReportKPIGridRow4Cell1FocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPReportKPIMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPReportKPIMaterialSelectorShortcutPopupGridTable'
            }
        ],

    'launch.rocheBPSPReportKPIMaterialSelectorShortcutPopupGridTable_row_0.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPReportKPIMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPReportKPIGridRow6Cell4Button'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPReportKPIGridRow7Cell4Button'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPReportKPIGridRow4Cell1FocusButton'
            },
        ],

    'launch.rocheBPSPCustomerStatusReportGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'launch.rocheBPSPCustomerStatusReportGridTableShowLinkButton.finished':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomers'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridRow4Cell1FocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPIpPlanningReportMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningReportMaterialSelectorShortcutPopupGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningReportGridTableHeaderReturnFromFocus'
            }
        ],
    'launch.rocheBPSPIpPlanningReportGridTableHeaderReturnFromFocus.finished':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPIpPlanningReportGridTable'
            }
        ],
    'launch.rocheBPSPIpPlanningReportMaterialSelectorShortcutPopupGridTable_row_0.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPIpPlanningReportMaterialSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow2Cell2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'text_click.rocheBPSPCustomerReportGridRow3Cell2Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPReportKPI'
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow1Cell3Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow2Cell3Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],

    'text_click.rocheBPSPCustomerReportGridRow3Cell3Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPProductReport'
            }
        ],

    'launch.rocheBPSPCustomerReportGridRow1Cell0Button':
        [
            {
                action: Api.backToMain,
                argument: ''
            }
        ],
    'launch.rocheBPSPProductReportGridRow2Cell4Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],

    'text_click.rocheBPSPProductReportGridRow3Cell4Text':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomerReport'
            }
        ],
    'launch.rocheBPSPCustomerReportGridRow4Cell1FocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomerReportMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomerReportMaterialSelectorShortcutPopupGridTable'
            }
        ],
    'launch.rocheBPSPCustomerReportMaterialSelectorShortcutPopupGridTable_row_0.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomerReportMaterialSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomerReportGridTable'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomerReportGridRow4Cell1FocusButton'
            }
        ],

    'segmentedControlTab2.rocheBPSPCustomerReportGridRow4Cell2SegmentedControl':
        [
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCustomerReportGridTable'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCustomerReportGridRow4Cell3Button'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCustomerReportGridRow5'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCustomerReportGridRow6'
            },
            /*
    {
        action: Api.showWidget,
        argument: 'rocheBPSPProductReportChart'
    },
    {
        action: Api.forceRefresh,
        argument: 'rocheBPSPProductReportChart'
    }    */
        ],

    'segmentedControlTab1.rocheBPSPCustomerReportGridRow4Cell2SegmentedControl':
        [
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCustomerReportGridTable'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCustomerReportGridRow4Cell3Button'
            },
            {
                action: Api.showWidget,
                argument: 'rocheBPSPCustomerReportGridRow5'
            },
            {
                action: Api.hideWidget,
                argument: 'rocheBPSPCustomerReportGridRow6'
            },
        ],
    'launch.rocheBPSPCustomerReportGridTable_row_1':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCustomers'
            }
        ],
    /* Company Settings Versions */
    'launch.rocheBPSPCompanySettingsVersionsGridRow1Cell3Button':
        [
            {
                action: Api.togglePopup,
                argument: ['rocheBPSPCompanySettingsVersionsUserPanelGridTable']
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsMonthlySplitDays'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button4':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridRow2Button6':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsSimulations'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridTable_row_0':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopupGridRow1Cell1Text'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopupControlPanelUpdateButton'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsGridTable_row_3':
        [
            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'buttonActive',
                        actions: [
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopupSourceVersionDropbox'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopupTargetVersionDropbox'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'buttonActive',
                        actions: [
                            {
                                action: Api.addGridTableCurrentRowSystemValue,
                                argument: ['VersionEditCurrentActualsMonth', 'rocheBPSPCompanySettingsVersionsGridTable', 0, 'pMonth']
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopupEditNameTextBox'
                            },
                            {
                                action: Api.forceRefresh,
                                argument: 'rocheBPSPCompanySettingsVersionsEditVersionActualsMonthDropbox'
                            },
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
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
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'buttonActive',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPCompanySettingsVersionsClearVersionPopup'
                            }
                        ]
                    },
                    {
                        conditionKey: 'else',
                        actions: [
                            {
                                action: Api.openPopup,
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
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsCopyDataPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsCopyDataPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsEditLockedPopupOKButton':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCompanySettingsVersionsGridTable'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsEditLockedPopup'
            }
        ],

    'launch.rocheBPSPCompanySettingsVersionsEditVersionPopupControlPanelSaveButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopup'
            },
            {
                action: Api.forceRefreshWithDelay,
                argument: ['rocheBPSPCompanySettingsVersionsGridTable', 500]
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsEditVersionPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsEditVersionPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsClearVersionPopupControlPanelClearButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsClearVersionPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsVisibilityPopupControlPanelUpdateButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsVisibilityPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsVisibilityPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsVersionsClearVersionPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsVersionsClearVersionPopup'
            }
        ],
    'launch.rocheBPSPVersionsGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSettings'
            }
        ],
    'launch.rocheBPSPVersionsGridRow2Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettings'
            }
        ],
    'launch.rocheBPSPVersionsGridRow2Button2':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsCheckedOut'
            }
        ],
    'launch.rocheBPSPVersionsGridRow2Button3':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPCompanySettingsGrowth'
            }
        ],
    'launch.rocheBPSPCustomersPlanningGridRow2Cell1ButtonTwo':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCustomersPlanningCompareByRowPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningCompareByRowPopupGridTable'
            }
        ],

    'launch.rocheBPSPCustomersPlanningGridRow2Cell1ButtonOne':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningValueSegmentedControl'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl',
                ]
            },
            {
                action: Api.hideWidgets,
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
                action: Api.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl'
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2ButtonExit'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: Api.showWidgets,
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
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningValueSegmentedControl',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector'
                ]
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCustomersPlanningCompareByRowPopup'
            },
            {
                action: Api.forceRefreshWidgets,
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
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },

            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningValueSegmentedControl',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector'
                ]
            },
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridTableYearly',
                ]
            },
            {action: Api.togglePopup, argument: 'rocheBPSPCustomersPlanningFocusPopupPopup'}
        ],

    'segmentedControlTab2.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl':
        [
            {
                action: Api.hideWidgets,
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
                action: Api.showWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell3ClearAllButton',
                    'rocheBPSPCustomersPlanningMonthlyExcelExport'
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },

        ],
    'segmentedControlTab1.rocheBPSPCustomersPlanningPeriodUnitSegmentedControl':
        [
            {
                action: Api.showWidgets,
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
                action: Api.hideWidgets,
                argument: [
                    'rocheBPSPCustomersPlanningGridRow2Cell1ButtonGrey',
                    'rocheBPSPCustomersPlanningGridRow2VersionSelectorTwo',
                    'rocheBPSPCustomersPlanningGridRow2ButtonExit',
                    'rocheBPSPCustomersPlanningGridRow2LineItemSelector',
                    'rocheBPSPCustomersPlanningValueSegmentedControl'
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3aCreateOpportunityButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButtonIfLock'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2Cell3SubmitButton'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningGridRow2ButtonExit'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab1.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab2.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab3.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],
    'segmentedControlTab4.rocheBPSPCustomersPlanningTypeSegmentedControl':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPCustomersPlanningMonthlyExcelUpload'
            },
        ],

    'launch.rocheBPSPVersionsCopyDataTemplatePopupControlPanelCopyButton.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'refreshRequest.rocheBPSPVersionsCopyDataTemplatePopupControlPanelCopyButton'
            }
        ],
    'upload.rocheBPSPCompanySettingsGrowthGridRow3Cell3Upload.finished':
        [
            {
                action: Api.executeRequest,
                argument: 'request.rocheBPSPCompanySettingsGrowthGridRow3Cell3Upload'
            }
        ],
    'launch.rocheBPSPCompanySettingsGrowthGridRow3Cell3Button1':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPCompanySettingsGrowthPrefillRatesPopup'
            }
        ],
    'launch.rocheBPSPCompanySettingsGrowthPrefillRatesPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPCompanySettingsGrowthPrefillRatesPopup'
            }
        ],

    //Simulation page

    'launch.rocheBPSPMainGridRow5Cell1Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPSimulation'
            }
        ],

    'launch.rocheBPSPSimulationGridRow1Cell0Button':
        [
            {
                action: Api.openPage,
                argument: 'rocheBPSPMain'
            }
        ],
    'choose.rocheBPSPSimulationSelectorPopUpDropbox.finished': [
        {
            action: Api.togglePopup,
            "argument": 'rocheBPSPSimulationSelectorPopUp'
        }
    ],

    'text_click.rocheBPSPSimulationGridRow2CellVersionSelectorCellText.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationSelectorPopUp'
            },
            {
                action: Api.forceRefreshWidgets,
                argument: [
                    'rocheBPSPSimulationSelectorPopUpDropbox'

                ]
            }
        ],

    'launch.rocheBPSPSimulationGridRow1Cell3Button':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationInfoPopupText1'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationInfoPopupText2'
            },
            {
                action: Api.openPopup,
                argument: 'rocheBPSPSimulationInfoPopup'
            }
        ],
    'launch.rocheBPSPSimulationInfoPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationInfoPopup'
            }
        ],

    'launch.rocheBPSPMainGridRow2aCell2Button':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPMainSubmissionToBPXPPopup'
            }
        ],

    'launch.rocheBPSPSimulationGridTableHeaderFocusButton':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPSimulationSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationSelectorShortcutPopupGridTable'
            },
        ],

    'launch.rocheBPSPSimulationSelectorShortcutPopupGridTableButton01':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationSelectorShortcutPopup'
            }
        ],
    'launch.rocheBPSPSimulationDistributionPopupControlPanelCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationDistributionPopup'
            }
        ],

    'launch.rocheBPSPSimulationDistributionPopupControlPanelSaveButton.finished':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationDistributionPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationGridTable'
            },
        ],

    'write.rocheBPSPSimulationGridTable.finished':
        [

            {
                action: Api.conditionalGridTablePopup,
                argument: [
                    {
                        conditionKey: 'splitPopup',
                        actions: [
                            {
                                action: Api.openPopup,
                                argument: 'rocheBPSPSimulationDistributionPopup'
                            },
                        ]
                    },
                ]
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationDistributionPopupGridTable'
            }
        ],

    'launch.rocheBPSPSimulationSelectorShortcutPopupGridTable_row_0':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationSelectorShortcutPopup'
            },
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationGridTable'
            }
        ],

    'launch.rocheBPSPSimulationGridTableHeaderReturnFromFocus':
        [
            {
                action: Api.forceRefresh,
                argument: 'rocheBPSPSimulationGridTable'
            }
        ],

    'launch.rocheBPSPSimulationGridTable_row_0':
        [
            {
                action: Api.openPopup,
                argument: 'rocheBPSPSimulationFocusPopup'
            }
        ],
    'launch.rocheBPSPSimulationFocusPopupCancelButton':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationFocusPopup'
            }
        ],

    'launch.rocheBPSPSimulationFocusPopupFocusButton':
        [
            {
                action: Api.forceRefresh,
                argument: '.rocheBPSPSimulationGridTable'
            },
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationFocusPopup'
            }
        ],

    'text_click.rocheBPSPSimulationGridTableHeaderText-03':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationPLViewLimitPopUp'
            }
        ],
    'choose.rocheBPSPSimulationPLViewLimitPopUpDropbox':
        [
            {
                action: Api.togglePopup,
                argument: 'rocheBPSPSimulationPLViewLimitPopUp'
            }
        ],
}
;