/* global app */
'use strict';
EventMap = {
    'launch.analogicDemoMainRow3Cell2Button': [
        {
            action: Api.openPage,
            argument: 'analogicDemoAddCloneContract'
        }
    ],
    'text_click.analogicDemoAddCloneContractRow1Cell1Text.finished': [
        {
            action: Api.openPage,
            argument: 'analogicDemoMain'
        }
    ],
    'launch.analogicDemoMainRow3Cell3Button': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoReviewContracts'
        }
    ],
    'text_click.analogicDemoReviewContractsRow1Cell1Text.finished': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoMain'
        }
    ],
    'launch.analogicDemoMainRow3Cell4Button': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoAllocation'
        }
    ],
    'text_click.analogicDemoAllocationRow1Cell1Text.finished': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoMain'
        }
    ],
    /*'launch.analogicDemoMainRow3Cell5Button': [
        {
            action: Api.goToUrlNewTab,
            argument: 'https://dev.knowledgeseed.ch:9610/flask/bandidemo/'
        }
    ],*/
    'text_click.analogicDemoNewVolumesRow1Cell1Text.finished': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoMain'
        }
    ],
    'launch.analogicDemoMainRow3Cell6Button': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoPlanReport'
        }
    ],
    'text_click.analogicDemoPlanReportRow1Cell1Text.finished': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoMain'
        }
    ],
    'launch.analogicDemoAddCloneContractContractsTable_row_11.finished': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoAddCloneContractClonePopup'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoAddCloneContractClonePopupRow2Text'
        }
    ],
    'launch.analogicDemoAddCloneContractValidationRow4Cell1Button.finished': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoAddCloneContractValidation'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoAddCloneContractContractsTable'
        }
    ],
    'launch.analogicDemoAddCloneContractClonePopupRow3Cell2Button.finished': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoAddCloneContractClonePopup'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoAddCloneContractContractsTable'
        }
    ],
    'launch.analogicDemoAddCloneContractNewContractPopupPopupRow7Button2.finished': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoAddCloneContractNewContractPopupPopup'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoAddCloneContractContractsTable'
        }
    ],
    'launch.analogicDemoAddCloneContractClonePopupRow3Cell1Button': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoAddCloneContractClonePopup'
        }
    ],
    'launch.analogicDemoAddCloneContractRow2Cell2Button.finished': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoAddCloneContractValidation'
        }
    ],
    'launch.analogicDemoAddCloneContractValidationRow4Cell2Button': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoAddCloneContractValidation'
        }
    ],
    'launch.analogicDemoAddCloneContractRow3Cell1Button': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoAddCloneContractNewContractPopupPopup'
        }
    ],
    'launch.analogicDemoAddCloneContractNewContractPopupPopupRow7Button1': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoAddCloneContractNewContractPopupPopup'
        }
    ],
    'text_click.analogicDemoReviewContractsCenterFilterPopUpRow1Cell2X': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoReviewContractsCenterFilterPopUp'
        }
    ],
    'text_click.analogicDemoReviewContractsFilterGridTable_0_0': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterPopUpDropdown'
        }
    ],
    'text_click.analogicDemoReviewContractsFilterGridTable_0_1': [
         {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterPopUpDropdown'
        }
    ],
    'text_click.analogicDemoReviewContractsFilterGridTable_0_2': [
         {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterPopUpDropdown'
        }
    ],
    'text_click.analogicDemoReviewContractsFilterGridTable_0_3': [
         {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterPopUpDropdown'
        }
    ],
    'text_click.analogicDemoReviewContractsFilterGridTable_0_4': [
         {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterPopUpDropdown'
        }
    ],
    'text_click.analogicDemoReviewContractsFilterGridTable_0_5': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterPopUpDropdown'
        }
    ],

    'launch.analogicDemoReviewContractsGridRow3Cell2Button': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsPointPopUp'
        }
    ],
    'launch.analogicDemoReviewContractsFilterGridTableRowCell2Button': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoReviewContractsCenterFilterPopUp'
        }
    ],
    'switch.analogicDemoReviewContractsCenterFilterPopUpTable_row_0.finished': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoReviewContractsFilterGridTable'
        }
    ],
    'launch.analogicDemoAllocationRow3Cell1Text': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoAllocationFilterPopUp'
        },
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoAllocationFilterPopUpDropbox'
        }
    ],
    'text_click.analogicDemoAllocationFilterTable_row_1': [
        {
            action: Api.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'hasPopup',
                    actions: [
                        {
                            action: Api.openPopup,
                            argument: 'analogicDemoAllocationFilterPopUp'
                        },
                        {
                            action: Api.forceRefresh,
                            argument: 'analogicDemoAllocationFilterPopUpDropbox'
                        }
                    ]
                }
            ]
        },
        {
            action: Api.conditionalGridTablePopup,
            argument: [
                {
                    conditionKey: 'openPage',
                    actions: [
                        {
                            action: Api.openPage,
                            argument: 'analogicDemoAllocationHierarchy'
                        }
                    ]
                }
            ]
        }
    ],

    'launch.analogicDemoAllocationHierarchySaveSelected.finished': [
        {
            action: Api.removeSliders,
            argument: ''
        },
        {
            action: Api.openPage,
            argument: 'analogicDemoAllocation'
        }
    ],
    'perform.analogicDemoAllocationHierarchyRow1Cell1Text': [
        {
            action: Api.openPage,
            argument: 'analogicDemoMain'
        }
    ],
    'text_click.analogicDemoPlanReportFilterGridTable_0_0': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterPopUpDropdown'
        },
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportFilterPopUp'
        }
    ],
    'text_click.analogicDemoPlanReportFilterGridTable_0_1': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterPopUpDropdown'
        },
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportFilterPopUp'
        }
    ],
    'text_click.analogicDemoPlanReportFilterGridTable_0_2': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterPopUpDropdown'
        },
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportFilterPopUp'
        }
    ],
    'text_click.analogicDemoPlanReportFilterGridTable_0_3': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterPopUpDropdown'
        },
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportFilterPopUp'
        }
    ],
    'text_click.analogicDemoPlanReportFilterGridTable_0_4': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterPopUpDropdown'
        },
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportFilterPopUp'
        }
    ],
    'text_click.analogicDemoPlanReportFilterGridTable_0_5': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterPopUpDropdown'
        },
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportFilterPopUp'
        }
    ],

    'launch.analogicDemoPlanReportGridRow3Cell3Button': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportPointPopUp'
        }
    ],
    'launch.analogicDemoPlanReportFilterGridTableRowCell2Button': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportCenterFilterPopUp'
        }
    ],
    'switch.analogicDemoPlanReportCenterFilterPopUpTable_row_0.finished': [
        {
            action: Api.forceRefresh,
            argument: 'analogicDemoPlanReportFilterGridTable'
        }
    ],
    'text_click.analogicDemoPlanReportCenterFilterPopUpRow1Cell2X.finished': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoPlanReportCenterFilterPopUp'
        }
    ],
    'text_click.analogicDemoPlanReportForecastTable_row_8.finished': [
        {
            action: Api.openPopup,
            argument: 'analogicDemoPlanReportChartPopup'
        }
    ],
    'text_click.analogicDemoPlanReportChartPopupRow1Cell2X.finished': [
        {
            action: Api.togglePopup,
            argument: 'analogicDemoPlanReportChartPopup'
        }
    ],
    'launch.analogicDemoMainRow10Cell2Text2': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoKPIPlanTarget'
        }
    ],
    'text_click.analogicDemoKPIPlanTargetRow1Cell1Text.finished': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoMain'
        }
    ],
    'launch.analogicDemoMainRow10Cell2Text3': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoReleaseAndValidation'
        }
    ],
    'text_click.analogicDemoReleaseAndValidationRow1Cell1Text.finished': [
        {
            action: Api.openPageWithState,
            argument: 'analogicDemoMain'
        }
    ],

};
