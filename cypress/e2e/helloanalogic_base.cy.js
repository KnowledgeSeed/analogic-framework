describe('empty spec', () => {
  it('passes', () => {
    cy
        .viewport(1920,1080)
        .visit('http://localhost:5000/helloanalogic/')
    
    cy.get('#analogicDemoMainRow3Cell2Button').should('exist');
    cy.get('#analogicDemoMainRow3Cell2Button_fail').should('exist');

  })
})
