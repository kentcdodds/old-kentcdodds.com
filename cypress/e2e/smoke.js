describe('app', () => {
  it('works', () => {
    cy.visit('/')
    cy.findByText(/about/i, {selector: 'a'}).click()
    cy.findByText(/About Kent C. Dodds/i)
  })
})
