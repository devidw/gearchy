it('shows no googles message only when has no googles', () => {
  cy.visit('/')

  cy.get('[data-test="empty-message"]').should('be.visible')

  cy.get('[data-test="create-goggle"]').click()
  cy.contains('Local').click()

  cy.visit('/')
  cy.get('[data-test="empty-message"]').should('not.exist')
})

export { }
