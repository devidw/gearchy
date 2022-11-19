// DO NOT REMOVE
// Imports Quasar Cypress AE predefined commands
import { registerCommands } from '@quasar/quasar-app-extension-testing-e2e-cypress'
registerCommands()

Cypress.Commands.add('setLocalStorageGitHubAccessToken', () => {
  localStorage.setItem('accessToken', Cypress.env('github_access_token'))
})
