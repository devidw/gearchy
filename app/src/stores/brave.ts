import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { openURL, copyToClipboard, Notify, Dialog } from 'quasar'
import { useGistStore } from 'stores/gist'
import CustomDialog from 'components/CustomDialog.vue'

export const useBraveStore = defineStore('brave', {
  state: () => ({
    apiUrl: useStorage('braveApiUrl', ''),
  }),
  getters: {},
  actions: {
    submitGoggle() {
      const { url } = useGistStore().gist
      if (this.apiUrl) {
        this.automaticallySubmitGoggle(url)
      } else {
        this.manuallySubmitGoggle(url)
      }
    },
    async automaticallySubmitGoggle(url: string) {
      try {
        const response = await fetch(
          this.apiUrl.replace('%s', encodeURIComponent(url)),
        )
        const data = await response.json()

        if (data.success === true) {
          Notify.create({
            message: data.message ?? 'Successfully submitted Goggle to Brave',
            type: 'positive',
          })
        } else {
          Notify.create({
            message: data.message ?? 'Failed to sumbit Goggle to Brave',
            caption: data.errors
              .map((arr: [number, string]) => arr.join(': '))
              .join(', '),
            type: 'negative',
            multiLine: data.errors.length > 1,
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
    manuallySubmitGoggle(url: string) {
      Dialog.create({
        component: CustomDialog,
        componentProps: {
          title: 'Manually Submit Goggle',
          message:
            'The goggle URL will be copied to your clipboard. And you will be redirected to the Goggle submission page on Brave. For automated submissions, please refer to the FAQ.',
        },
      }).onOk(async () => {
        await copyToClipboard(url)
        openURL('https://search.brave.com/goggles/create')
      })
    },
  },
})
