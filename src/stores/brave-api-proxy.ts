import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Notify } from 'quasar'

export const useBraveSubmissionProxyStore = defineStore(
  'braveSubmissionProxy',
  {
    state: () => ({
      apiUrl: useStorage('braveSubmissionProxyApiUrl', ''),
    }),
    getters: {
      hasApiUrl(state) {
        return state.apiUrl !== ''
      },
    },
    actions: {
      async submitGoggle(url: string) {
        if (!this.hasApiUrl) {
          return
        }

        try {
          const response = await fetch(
            this.apiUrl.replace('%s', encodeURIComponent(url)),
          )
          const data = await response.json()

          if (data.success === true) {
            Notify.create({
              message: 'Goggle successfully submitted to Brave',
              type: 'positive',
            })
          } else {
            Notify.create({
              message: 'Failed to sumbit Goggle to Brave',
              caption: data.errors
                .map((arr: [number, string]) => arr.join(': '))
                .join(', '),
              type: 'negative',
              multiLine: true,
              timeout: 1000 * 60 * 5,
            })
          }
        } catch (error) {
          Notify.create({
            message: 'Failed to sumbit Goggle to Brave',
            caption: (error as Error).message,
            type: 'negative',
          })
        }
      },
    },
  },
)
