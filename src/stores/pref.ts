import { defineStore } from 'pinia'

export const usePrefStore = defineStore('pref', {
  state: () => ({
    pref: {
      editor: {
        showAdvanced: false,
      },
    },
  }),

  getters: {},

  actions: {},
})
