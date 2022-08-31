import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { Octokit } from 'https://cdn.skypack.dev/octokit'

export const useGitHubStore = defineStore('github', {
  state: () => ({
    accessToken: LocalStorage.getItem('accessToken'),
  }),

  getters: {
    api(state) {
      return new Octokit({ auth: state.accessToken })
    },
  },

  actions: {
    saveAccessToken(accessToken: string) {
      LocalStorage.set('accessToken', accessToken)
      this.accessToken = accessToken
    },
    /**
     * make request and see if success also check the scope x-header to see if it contains the required gist scope
     */
    async isValidAccessToken(accessToken: string) {
      const api = new Octokit({ auth: accessToken })
      try {
        const { headers } = await api.request('GET /user')
        return headers['x-oauth-scopes']?.includes('gist')
      } catch (e) {
        return false
      }
    },
  },
})
