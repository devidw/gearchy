beforeEach(() => {
  // Cypress.config('defaultCommandTimeout', 40000)
  cy.setLocalStorageGitHubAccessToken()
  cy.visit('/')
})

it('shows message on network error', () => {
  cy.intercept({
    method: 'POST',
    url: 'https://api.github.com/graphql',
  }, {
    forceNetworkError: true,
  }).as('github')

  cy.get('[data-test="error-message"]').should('be.visible')
})

it.only('shows loading animation on loading', () => {
  cy.intercept({
    method: 'POST',
    url: 'https://api.github.com/graphql',
  }, {
    delayMs: 10000,
  }).as('github')

  cy.get('[data-test="loading-animation"] img').should('be.visible')
})

export { }
