import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useBraveStore = defineStore('brave', {
  state: () => ({
    apiUrl: useStorage('braveApiUrl', ''),
    error: undefined as Error | undefined,
    message: undefined as string | undefined,
  }),
  getters: {
    isAvailable(state) {
      return !!state.apiUrl
    },
  },
  actions: {
    async submitGoggle(url: string) {
      this.error = undefined
      this.message = undefined
      try {
        const response = await fetch(
          this.apiUrl.replace('%s', encodeURIComponent(url)),
        )
        const data = await response.json()
        this.message = data.message
        if (data.success === false) {
          const errors = data.errors
            .map((arr: [number, string]) => arr.join(': '))
            .join(', ')
          throw Error(errors)
        }
      } catch (error) {
        this.error = error as Error
      }
    },
  },
})
