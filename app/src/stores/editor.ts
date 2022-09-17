import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    tabScrollIndexes: {
      discard: 0,
      boost: 0,
      downrank: 0,
    },
  }),

  getters: {},

  actions: {},
})
