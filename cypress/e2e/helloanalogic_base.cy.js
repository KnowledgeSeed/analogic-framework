describe('empty spec', () => {
  it('passes', () => {
    cy
        .viewport(1920,1080)
        .visit('http://localhost:5000/helloanalogic/')
  })
})