describe('Hello Analogic', () => {
  it('Main', () => {
    cy
        .viewport(1920,1080)
        .visit('http://localhost:5000/helloanalogic/')

    cy.get('#analogicDemoMainRow3Cell2Button').should('exist');
    cy.get('#analogicDemoMainRow3Cell3Button').should('exist');
    cy.get('#analogicDemoMainRow3Cell4Button').should('exist');
    cy.get('#analogicDemoMainRow3Cell5Button').should('exist');
  })

  it('Sales Units', () => {
    cy.viewport(1920,1080)
    cy.get('#analogicDemoMainRow3Cell2Button > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get('#analogicDemoAddCloneContractContractsTable_0_0 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-icon').should('exist');
    cy.get('#analogicDemoAddCloneContractRow2Cell2Button > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoAddCloneContractRow2Cell3Button > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoAddCloneContractRow3Cell1Button > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoAddCloneContractRow1Cell5Button > .ks-button > .ks-button-inner').should('exist');
    cy.get('#analogicDemoAddCloneContractRow1Cell1Text > .ks-text > .ks-text-inner > .ks-text-title').contains('Sales Units');
    cy.get('#analogicDemoAddCloneContractRow3Cell1Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow2DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow2DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(1) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow3TextBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-input').clear('t');
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow3TextBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-input').type('test');
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow4DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow4DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(1) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow5DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow5DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(1) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow6Dropbox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow6Dropbox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(2) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupText > .ks-text > .ks-text-inner > .ks-text-title').contains('Add Sales Unit');
    cy.get('#analogicDemoAddCloneContractNewContractPopupPopupRow7Button2 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractContractsTable_1_11 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-icon > .icon-copy').click();
    cy.get('#analogicDemoAddCloneContractClonePopupRow3Cell1Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractRow2Cell2Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractValidationRow4Cell1Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractRow2Cell2Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractValidationRow4Cell2Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAddCloneContractRow2Cell3Button > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get('.icon-menu').click();
    
  })

  it('Review Sales', () => {
    cy.viewport(1920,1080)
    cy.get('.icon-rectangle-stack').click();
    cy.get('.ks-button-icon > .icon-plus-circle').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_1_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_3_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpRow1Cell1Text > .ks-text > .ks-text-inner > .ks-text-title').contains('Filters');
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_0_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Plan Cycle');
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_3_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').contains('Market Organization');
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_5_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').contains('Country of Origin');
    cy.get('.icon-x').click();
    cy.get('#analogicDemoReviewContractsFilterGridTable_0_5 > .ks-text > .ks-text-inner > .ks-text-title').contains('Market Organization');
    cy.get('#analogicDemoReviewContractsFilterGridTable_0_3 > .ks-text > .ks-text-inner > .ks-text-title').contains('Country of Origin');
    cy.get('#analogicDemoReviewContractsFilterGridTable_0_1 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon').click();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(3) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get('#analogicDemoReviewContractsFilterPopUp > .ks-container-backdrop').click();
    cy.get('.ks-button-icon > .icon-plus-circle').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_2_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_1_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_0_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoReviewContractsCenterFilterPopUpTable_4_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').click();
    cy.get('.icon-x').click();
    cy.get('#analogicDemoReviewContractsFilterGridTable_0_5 > .ks-text > .ks-text-inner').click();
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(3) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(4) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get('#analogicDemoReviewContractsFilterPopUp > .ks-container-backdrop').click();
    cy.get('#analogicDemoReviewContractsFilterGridTable_0_3 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon').click();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(3) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(4) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get('#analogicDemoReviewContractsFilterPopUp > .ks-container-backdrop').click();
    cy.get('#analogicDemoReviewContractsGridRow3Cell2Button > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get('#analogicDemoReviewContractsPointPopUpCell1Button1 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').should('exist');
    cy.get('#analogicDemoReviewContractsPointPopUpCell2Button1 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').should('exist');
    cy.get('#analogicDemoReviewContractsPointPopUpCell3Button1 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').should('exist');
    cy.get('#analogicDemoReviewContractsPointPopUp > .ks-container-backdrop').click();
    cy.get('.icon-menu').click();
  })

  it('Allocation', () => {
    cy.viewport(1920,1080)
    cy.get('.icon-check-list').click();
    cy.get('#analogicDemoAllocationRow3Cell3Text > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoAllocationFilterTable_3_1 > .ks-text > .ks-text-inner > .ks-text-icon').click();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner').click();
    cy.get('.ks-container-backdrop').click();
    cy.get('#analogicDemoAllocationRow3Cell3Text > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAllocationFilterTable_4_1 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get(':nth-child(3) > .ks-dropbox-panel-item-inner').click();
    cy.get('.ks-container-backdrop').click();
    cy.get('.icon-rectangle-stack').click();
    cy.get('#analogicDemoAllocationRow3Cell1Text > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get(':nth-child(4) > .ks-dropbox-panel-item-inner').click();

    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner').click();
    cy.get(':nth-child(6) > .ks-dropbox-panel-item-inner').click();
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner').click();
    cy.get('.ks-container-backdrop').click();
    cy.get('#analogicDemoAllocationRow3Cell1Text > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').contains('Admin');
    cy.get('#analogicDemoAllocationRow3Cell3Text > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAllocationFilterTable_2_1 > .ks-text > .ks-text-inner > .ks-text-icon > .icon-columns1').click();
    cy.get('#analogicDemoAllocationHierarchySaveSelected > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoAllocationHierarchyRow1Cell1Text > .ks-text > .ks-text-inner > .ks-text-title').contains('Multi-level-selection');
    cy.get('#analogicDemoAllocationHierarchyGrid2Level1GridTable_0_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Selection Level 1');
    cy.get('#analogicDemoAllocationHierarchyGrid2Level1GridTable_1_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level2GridTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Selection Level 2');
    cy.get('#analogicDemoAllocationHierarchyGrid2Level2GridTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level3GridTable_2_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Selection Level 3');
    cy.get('#analogicDemoAllocationHierarchyGrid2Level3GridTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level4GridTable_0_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Selection Level 4');
    cy.get('#analogicDemoAllocationHierarchyGrid2Level4GridTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level5GridTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Selection Level 5');
    cy.get('#analogicDemoAllocationHierarchyGrid2Level5GridTable_3_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level5GridTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level5GridTable_5_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level5GridTable_7_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoAllocationHierarchyGrid2Level5GridTable_9_0 > .ks-toggle > .ks-toggle-inner').click();
    cy.get('#analogicDemoAllocationHierarchySaveSelected > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get('.ks-textbox-input').clear('c');
    cy.get('.ks-textbox-input').type('cypress test');
    cy.get('#analogicDemoAllocationRow3Cell3Text > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoAllocationRow3Cell3Text > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('.icon-menu').click();
  })

  it('Plan Report', () => {
    cy.viewport(1920,1080)
    cy.get('.icon-percent-target').click();
    cy.get('.ks-button-icon > .icon-plus-circle').click();
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_0_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Financial Year');
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').contains('Business Partner');
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_5_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').contains('Legal Entity');
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_1_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_3_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-off').click();
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_5_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').click();
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_4_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').click();
    cy.get('#analogicDemoPlanReportCenterFilterPopUpTable_0_0 > .ks-toggle > .ks-toggle-inner > .ks-toggle-label-on').click();
    cy.get('#analogicDemoPlanReportCenterFilterPopUpRow1Cell2X > .ks-text > .ks-text-inner > .ks-text-icon > .icon-x').click();
    cy.get('#analogicDemoPlanReportFilterGridTable_0_4 > .ks-text > .ks-text-inner > .ks-text-title').contains('Business Partner');
    cy.get('#analogicDemoPlanReportFilterGridTable_0_5 > .ks-text > .ks-text-inner > .ks-text-title').contains('Product Organization');
    cy.get('#analogicDemoPlanReportFilterGridTable_0_4 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(3) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get('#analogicDemoPlanReportFilterPopUp > .ks-container-backdrop').click();
    cy.get('#analogicDemoPlanReportFilterGridTable_0_5 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(2) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get(':nth-child(3) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get('#analogicDemoPlanReportFilterPopUp > .ks-container-backdrop').click();
    cy.get('#analogicDemoPlanReportFilterGridTable_0_3 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get('.ks-dropbox-input').clear('1');
    cy.get('.ks-dropbox-input').type('1');
    cy.get(':nth-child(1) > .ks-dropbox-panel-item-inner > .ks-dropbox-panel-item-icon > .ks-dropbox-panel-item-checkbox').check();
    cy.get('#analogicDemoPlanReportFilterPopUp > .ks-container-backdrop').click();
    cy.get('#analogicDemoPlanReportForecastTable_0_8 > .ks-text > .ks-text-inner > .ks-text-icon > .icon-card-chart').click();
    cy.get('#examplePagePieChartWidgetCanvas').should('exist');
    cy.get('#analogicDemoPlanReportChartPopupRow1Cell1Text > .ks-text > .ks-text-inner > .ks-text-title').contains('Line Scatter Combo Chart');
    cy.get('[data-id="0"]').click();
    cy.get('[data-id="1"]').click();
    cy.get('[data-id="2"]').click();
    cy.get('[data-id="0"]').click();
    cy.get('[data-id="1"]').click();
    cy.get('[data-id="2"]').click();
    cy.get('.rectRot').click();
    cy.get('.rect').click();
    cy.get('.triangle').click();
    cy.get('.rectRot').click();
    cy.get('.rect').click();
    cy.get('.triangle').click();
    cy.get('#analogicDemoPlanReportChartPopupRow1Cell2X > .ks-text > .ks-text-inner > .ks-text-icon > .icon-x').click();
    cy.get('#analogicDemoPlanReportRow2Cell1SearchBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-input').clear('l');
    cy.get('#analogicDemoPlanReportRow2Cell1SearchBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-input').type('line');
    cy.get('#analogicDemoPlanReportRow2Cell1SearchBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-icon').click();
    cy.get('#analogicDemoPlanReportRow2Cell1SearchBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-input').click();
    cy.get('#analogicDemoPlanReportRow2Cell1SearchBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-input').click();
    cy.get('#analogicDemoPlanReportRow2Cell1SearchBox > .ks-textbox > .ks-textbox-inner > .ks-textbox-field > .ks-textbox-field-inner > .ks-textbox-icon').click();
    cy.get('#analogicDemoPlanReportGridRow3Cell3Button > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get('#analogicDemoPlanReportPointPopUpCell1Button1 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').should('exist');
    cy.get('#analogicDemoPlanReportPointPopUpCell2Button1 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').should('exist');
    cy.get('#analogicDemoPlanReportPointPopUpCell3Button1 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').should('exist');
    cy.get('#analogicDemoPlanReportPointPopUp > .ks-container-backdrop').click();
    cy.get('.icon-menu').click();

  })

  it('KPI Plan + Validation Report', () => {
    cy.viewport(1920,1080)
    cy.get('#analogicDemoMainRow10Cell2Text2 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoKPIPlanTargetTable_1_0 > .ks-text > .ks-text-inner > .ks-text-title').contains('Net Income');
    cy.get('#analogicDemoKPIPlanTargetTable_2_0 > .ks-text > .ks-text-inner > .ks-text-title').contains('Line item 1');
    cy.get('#analogicDemoKPIPlanTargetTableHeaderText-1 > .ks-text > .ks-text-inner > .ks-text-title').contains('Group 1');
    cy.get('#analogicDemoKPIPlanTargetRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(2) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(3) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(4) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(2) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(4) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoKPIPlanTargetRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(3) > .ks-dropbox-panel-item-inner').click();
    cy.get('.icon-menu').click();
    cy.get('#analogicDemoMainRow10Cell2Text3 > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell7Button > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoReleaseAndValidationRow3Button > .ks-button > .ks-button-inner > .ks-button-content').should('exist');
    cy.get('#analogicDemoReleaseAndValidationTable1HeaderText-0 > .ks-text > .ks-text-inner > .ks-text-title').contains('Strict Validation Rules');
    cy.get('#analogicDemoReleaseAndValidationRow1Cell5Button > .ks-button > .ks-button-inner').should('exist');
    cy.get('#analogicDemoReleaseAndValidationRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell1DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(3) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell2DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(3) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell3DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell3DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell3DropBox > .ks-dropbox > .ks-dropbox-inner > .ks-dropbox-field > .ks-dropbox-field-inner > .ks-dropbox-input').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell3DropBox > .ks-dropbox > .ks-dropbox-panel > .ks-dropbox-panel-inner > :nth-child(4) > .ks-dropbox-panel-item-inner').click();
    cy.get('#analogicDemoReleaseAndValidationRow3Button > .ks-button > .ks-button-inner > .ks-button-content').click();
    cy.get('#analogicDemoReleaseAndValidationRow2Cell7Button > .ks-button > .ks-button-inner > .ks-button-content > .ks-button-label').click();
    cy.get('#analogicDemoReleaseAndValidationTable2_2_2 > .ks-text > .ks-text-inner > .ks-text-title').click();
    cy.get('.icon-menu').click();

  })

})
