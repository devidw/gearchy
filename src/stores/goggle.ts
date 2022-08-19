import { defineStore } from 'pinia'
import { useGistStore } from './gist'
import { Goggle, GoggleInstructionActionKey } from 'goggledy'

type GoggleActionObject = {
  value?: number
  pattern?: string
  site?: string
  options?: string[]
}

export const useGoggleStore = defineStore('goggle', {
  state: () => ({
    goggle: {} as {
      metaData: object
      discard: GoggleActionObject[]
      boost: GoggleActionObject[]
      downrank: GoggleActionObject[]
    },
  }),

  getters: {
    stringifiedGoggle(state) {
      return
    },
  },

  actions: {
    parseGoggle() {
      const gistStore = useGistStore()
      this.goggle = {
        metaData: {
          name: '',
          description: gistStore.gist.description || '',
          public: gistStore.gist.public || false,
          author: gistStore.login || '',
          transferedTo: '',
          homepage: gistStore.gist.url || '',
          issues: gistStore.gist.url || '',
          license: '',
          avatar: '',
        },
        discard: [],
        boost: [],
        downrank: [],
      }
    },
    addActionRule(
      action: GoggleInstructionActionKey,
      rule: GoggleActionObject
    ) {
      this.goggle[action] = [rule, ...this.goggle[action]]
    },
    removeActionRule(action: GoggleInstructionActionKey, index: number) {
      this.goggle[action] = this.goggle[action].filter((_, i) => i !== index)
    },
    moveActionRule(
      action: GoggleInstructionActionKey,
      index: number,
      direction: 'up' | 'down'
    ) {
      const [removed] = this.goggle[action].splice(index, 1)
      this.goggle[action].splice(
        direction === 'up' ? index - 1 : index + 1,
        0,
        removed
      )
    },
  },
})
