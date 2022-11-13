// DO NOT REMOVE
// Imports Quasar Cypress AE predefined commands
import { registerCommands } from '@quasar/quasar-app-extension-testing-e2e-cypress'
registerCommands()

import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import routes from 'src/router/routes'
import type { App } from 'vue'


Cypress.Commands.add('setLocalStorageGitHubAccessToken', () => {
  localStorage.setItem('accessToken', Cypress.env('github_access_token'))
})

Cypress.Commands.add('mount', (component: any, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  // create router if one is not provided
  if (!options.router) {
    options.router = createRouter({
      routes: routes,
      history: createMemoryHistory(),
    })
  }

  // Add router plugin
  options.global.plugins.push({
    install(app: App) {
      app.use(options.router)
    },
  })

  return mount(component, options)
})