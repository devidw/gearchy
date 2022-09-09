import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const usePrefStore = defineStore('pref', {
  state: () => ({
    pref: useStorage('pref', {
      editor: {
        showAdvanced: false,
      },
    }),
  }),

  getters: {},

  actions: {},
})
