// DO NOT REMOVE
// Imports Quasar Cypress AE predefined commands
import { registerCommands } from '@quasar/quasar-app-extension-testing-e2e-cypress'
registerCommands()

// @see
// https://docs.cypress.io/api/cypress-api/custom-commands#5-Write-TypeScript-definitions
// for how to type custom commands

Cypress.Commands.add('setLocalStorageGitHubAccessToken', () => {
  localStorage.setItem('accessToken', Cypress.env('github_access_token'))
})
