/* global app */
'use strict';
EventMap = {

    'launch.hrdemoMainRow2Cell2Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoGroupSelect'
        }
    ],
    'launch.hrdemoMainRow2Cell3Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoReport'
        }
    ],

    'launch.hrdemoReportRow1Cell1Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoMain'
        }
    ],

    'launch.hrdemoMainRow2Cell4Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoGroups'
        }
    ],

    'launch.hrdemoGroupsRow1Cell1Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoMain'
        }
    ],

    'launch.hrdemoMainRow2Cell5Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoSettings'
        }
    ],

    'launch.hrdemoSettingsRow2Cell2Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoMain'
        }
    ],

    'launch.hrdemoGroupSelectGridTable_row_4.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoSimulation'
        }
    ],

    'launch.hrdemoSimulationRow1Cell1Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoMain'
        }
    ],

    'text_click.hrdemoSimulationRow2Cell3Text.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationGroupSelectorPopUp'
        }
    ],
    'text_click.hrdemoSimulationRow2Cell1Text.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationVersionSelectorPopUp'
        }
    ],
    'text_click.hrdemoSimulationGroupSelectorPopUpCell1Button': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoGroups'
        }
    ],


    'launch.hrdemoSettingsRow3Cell3Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoPositionParameters'
        }
    ],

    'launch.hrdemoPositionParametersRow1Cell1Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoMain'
        }
    ],

    'launch.hrdemoSettingsRow3Cell2Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoSocialSecurity'
        }
    ],
    'text_click.hrdemoSocialSecurityRow2Cell1Text.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSocialSecurityHeadcountSelectorPopUp'
        }
    ],

    'choose.hrdemoSocialSecurityHeadcountSelectorPopUpDropbox.finished': [
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSocialSecurityRow2Cell1Text'
        }
    ],

    'text_click.hrdemoSocialSecurityRow2Cell1Text2.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSocialSecurityVersionSelectorPopUp'
        }
    ],

    'choose.hrdemoSocialSecurityVersionSelectorPopUpDropbox.finished': [

        {
            "action": Api.updateContent,
            "argument": 'hrdemoSocialSecurityRow2Cell1Text2'
        },
    ],

    'text_click.hrdemoPositionParametersRow2Cell1Text.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoPositionParametersHeadcountSelectorPopUp'
        }
    ],

    'choose.hrdemoPositionParametersHeadcountSelectorPopUpDropbox.finished': [
        {
            "action": Api.updateContent,
            "argument": 'hrdemoPositionParametersRow2Cell1Text'
        },
    ],

    'text_click.hrdemoPositionParametersRow2Cell1Text2.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoPositionParametersVersionSelectorPopUp'
        }
    ],

    'choose.hrdemoPositionParametersVersionSelectorPopUpDropbox.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoPositionParametersVersionSelectorPopUp'
        }
    ],

    'text_click.hrdemoPositionParametersRow2Cell1Text3.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoPositionParametersPositionSelectorPopUp'
        }
    ],

    'choose.hrdemoPositionParametersPositionSelectorPopUpDropbox.finished': [

        {
            "action": Api.updateContent,
            "argument": 'hrdemoPositionParametersRow2Cell1Text3'
        },
    ],

    'launch.hrdemoSimulationRow2Cell5Button.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationCopyPopup'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationCopyPopupRow5Cell1Text'
        }
    ],

    'launch.hrdemoSimulationCopyPopupRow6Cell1Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCopyPopup'
        }
    ],

    'launch.hrdemoSimulationCopyPopupRow6Cell2Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCopyPopup'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoSimulationGridTable', 'hrdemoSimulationRow3Cell2PanelGridTable']
        },
        {
            "action": Api.forceRefresh,
            "argument": 'hrdemoSimulationRow3CellGauge'
        }
    ],

    'launch.hrdemoSimulationGridTablePopUpGridRow1Cell1Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationGridTablePopUp'
        },
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationCompensationChangePopUp'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoSimulationCompensationChangePopUpGridRow2Text1','hrDemoSimulationCompensationChangePopUpGridTable', 'hrdemoSimulationCompensationChangePopUpGridRow3Text1']
        },
    ],

    'launch.hrdemoSimulationGridTablePopUpGridRow2Cell1Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationGridTablePopUp'
        },
        {
            "action": Api.openPopup,
            "argument": 'hrdemoUpdateValuePopup'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoUpdateValueGridRow7Text1', 'hrdemoUpdateValueGridRow8DatePicker', 'hrdemoUpdateValueGridRow2Text2', 'hrdemoUpdateValueGridRow6Text1']
        },
        {
            action: Api.forceRefresh,
            argument: 'hrdemoUpdateValueGridRow5'
        }
    ],
    'launch.hrdemoNewGroupGridRow4Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoNewGroupPopup'
        },
        {
            "action": Api.forceRefresh,
            "argument": 'hrdemoGroupSelectGridTable'
        },
        {
            "action": Api.forceRefresh,
            "argument": 'hrdemoGroupsPageGridTable'
        }
    ],
    'text_click.hrdemoSimulationGridTableHeaderTextFilter.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationTableFilterPopUp'
        },
    ],
    'launch.hrdemoNewGroupGridRow5Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoNewGroupPopup'
        }
    ],
    'launch.hrdemoSimulationExitOrganisationPopUpGridRow5Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationExitOrganisationPopUp'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoSimulationGridTable', 'hrdemoSimulationRow3Cell2PanelGridTable']
        },
        {
            "action": Api.forceRefresh,
            "argument": 'hrdemoSimulationRow3CellGauge'
        }
    ],
    'launch.hrdemoSimulationExitOrganisationPopUpGridRow6Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationExitOrganisationPopUp'
        }
    ],


    'launch.hrdemoSimulationGridTablePopUpGridRow3Cell1Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationGridTablePopUp'
        },
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationExitOrganisationPopUp'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoSimulationExitOrganisationPopUpGridRow2Text1', 'hrdemoSimulationExitOrganisationPopUpGridRow4DatePicker', 'hrdemoSimulationExitOrganisationPopUpGridRow3Text1']
        },

    ],
    'launch.hrdemoSimulationCompensationChangePopUpGridRow4Cell1Save.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCompensationChangePopUp'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationGridTable'
        },
    ],
    'launch.hrdemoSimulationCompensationChangePopUpGridRow4Cell1Cancel.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCompensationChangePopUp'
        }
    ],
    'launch.hrdemoGroupsPageGridTableButton4.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoPeopleServiceTeamEditor'
        }
    ],
    'launch.hrdemoGroupsPageGridTableButton5.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoDeleteGroupPopup'
        },
    ],
    'launch.hrdemoDeleteGroupGridRow5Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoDeleteGroupPopup'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoGroupsPageGridTable'
        }
    ],
    'launch.hrdemoDeleteGroupGridRow6Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoDeleteGroupPopup'
        },
    ],
     'launch.hrdemoFilterDetailsGridRow4Button.finished': [
        {
            "action": Api.forceRefresh,
            "argument": 'hrdemoPeopleServiceTeamListRow3Cell3Text1'
        },
    ],


    'text_click.hrdemoPeopleServiceTeamEditorRow2Cell1Title2.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoEditGroupPopup'
        },
    ],
    'text_click.hrdemoPeopleServiceTeamListRow2Cell1Tittle2.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoEditGroupPopup'
        },
    ],
    'text_click.hrdemoEditGroupGridRow5Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoEditGroupPopup'
        },
    ],
    'text_click.hrdemoPeopleServiceTeamListRow2Cell3Tittle.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoViewGroupPopup'
        },
    ],
    'launch.hrdemoEditGroupGridRow4Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoEditGroupPopup'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoGroupsPageGridTable', 'hrdemoPeopleServiceTeamListRow2Cell1Tittle', 'hrdemoPeopleServiceTeamEditorRow2Cell1Tittle']
        }
    ],
    'launch.hrdemoEditGroupGridRow5Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoEditGroupPopup'
        },
    ],


    'launch.hrdemoGroupsPageGridTableButton-5.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoDeletePopup'
        },

        {
            "action": Api.updateContent,
            "argument": 'hrdemoGroupsPageGridTable'
        },
    ],
    'launch.hrdemoPeopleServiceTeamListRow1Cell4Button1.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoGroups'
        }
    ],
    'launch.hrdemoPeopleServiceTeamEditorRow1Cell4Button2.finished': [
        {
            "action": Api.updateContent,
            "argument": 'hrdemoPeopleServiceTeamEditorGridTable'
        }
    ],

    'launch.hrdemoGroupsRow2Cell1Button.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoNewGroupPopup'
        }
    ],
    'launch.hrdemoSimulationRow2Cell4Button.finished': [
        {
            "action": Api.openPage,
            "argument": 'hrdemoPeopleServiceTeamEditor'
        }
    ],
    'launch.hrdemoSimulationAddDummyPopUpGridRow4Cell1Cancel.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationAddDummyPopUp'
        }
    ],
    'text_click.hrdemoSimulationGridTable_row_30.finished': [
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationCommentPopup'
        },
        {
            "action": Api.forceRefresh,
            "argument": 'hrdemoSimulationCommentPopupPreviousCommentsGridTable'
        }
    ],
    'save.hrdemoSimulationCommentPopupCommentInput.finished': [
        {
            "action": Api.executeQueryRequest,
            "argument": ['hrdemoSimulationCommentPopupCommentInput', 'reloadComment']
        }
    ],
    'launch.hrdemoUpdateValueGridRow9Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoUpdateValuePopup'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationGridTable'
        }
    ],
    'launch.hrdemoUpdateValueGridRow10Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoUpdateValuePopup'
        },
    ],
    'launch.hrdemoSimulationAddDummyPopUpGridRow4Cell1Save.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationAddDummyPopUp'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationGridTable'
        }
    ],
    'launch.hrdemoSimulationGridTableGroupPopUpGridRow1Cell1Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationGridTableGroupPopUp'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationCompensationChangeGroupPopUpGridRow2Text1'
        },
        {
            "action": Api.forceRefresh,
            "argument": ['hrdemoSimulationCompensationChangeGroupPopUpGridRow4Cell1']
        },
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationCompensationChangeGroupPopUp'
        }
    ],
    'launch.hrdemoSimulationCompensationChangeGroupPopUpGridRow6Cell1Cancel.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCompensationChangeGroupPopUp'
        }
    ],
    'launch.hrdemoSimulationCompensationChangeGroupPopUpGridRow5Cell1Submit.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCompensationChangeGroupPopUp'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationGridTable'
        }
    ],
    'launch.hrdemoSimulationGridTableGroupPopUpGridRow2Cell1Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationGridTableGroupPopUp'
        },
        {
            "action": Api.updateWidgetsContent,
            "argument": ['hrdemoSimulationCollectiveRedundancyPopUpGridRow2Text1', 'hrdemoSimulationCollectiveRedundancyPopUpGridRow3Text1']
        },
        {
            "action": Api.openPopup,
            "argument": 'hrdemoSimulationCollectiveRedundancyPopUp'
        }
    ],
    'launch.hrdemoSimulationCollectiveRedundancyPopUpGridRow6Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCollectiveRedundancyPopUp'
        },
    ],
    'launch.hrdemoSimulationCollectiveRedundancyPopUpGridRow5Button.finished': [
        {
            "action": Api.togglePopup,
            "argument": 'hrdemoSimulationCollectiveRedundancyPopUp'
        },
        {
            "action": Api.updateContent,
            "argument": 'hrdemoSimulationGridTable'
        }
    ]
};
