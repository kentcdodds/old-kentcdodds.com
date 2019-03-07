describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .getByText(/about/i)
      .click()
      .getByText(/About Kent C. Dodds/i)
  })
})
