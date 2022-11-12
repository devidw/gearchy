// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your e2e test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
// import '@cypress/code-coverage/support'

// @see https://github.com/cypress-io/cypress/issues/1208
Cypress.on('window:before:load', (win) => {
  win.indexedDB.deleteDatabase('goggles')
})
