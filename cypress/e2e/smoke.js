describe('app', () => {
  it('works', () => {
    cy.visit('/')
    cy.findAllByRole('link', {name: /workshops/i})
      .last()
      .click()
    cy.findAllByRole('heading', {name: /Remote Workshops/i})
  })
})
