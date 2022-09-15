import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Octokit } from 'https://cdn.skypack.dev/octokit'

export const useGitHubStore = defineStore('github', {
  state: () => ({
    accessToken: useStorage('accessToken', ''),
  }),

  getters: {
    api(state) {
      return new Octokit({ auth: state.accessToken })
    },
  },

  actions: {
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
