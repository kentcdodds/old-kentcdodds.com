describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .findByText(/about/i, {selector: 'a'})
      .click()
      .findByText(/About Kent C. Dodds/i)
  })
})
