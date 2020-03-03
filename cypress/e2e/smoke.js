describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .findByText(/about/i, {selector: 'a'})
      .click()
    cy.findByText(/About Kent C. Dodds/i)
  })
})
