import { defineStore } from 'pinia'
import { useGistStore } from './gist'
import {
  Goggle,
  GoggleInstruction,
  GoggleInstructionActionKey,
  GoggleInstructionOptions,
  GoggleMetaData,
  GoggleEmpty,
  GoggleComment,
} from 'goggledy'
import { GoggleActionObject } from 'src/types'
import { v4 as uuidv4 } from 'uuid'

export const useGoggleStore = defineStore('goggle', {
  state: () => ({
    goggle: {} as {
      metaData: GoggleMetaData
      rules: {
        discard: GoggleActionObject[]
        boost: GoggleActionObject[]
        downrank: GoggleActionObject[]
      }
    },
  }),

  getters: {
    stringifiedGoggle(state) {
      const goggle = new Goggle()
      goggle.metaData = state.goggle.metaData

      if (!state.goggle.rules) {
        return
      }

      // Convert action rules to instructions
      Object.keys(state.goggle.rules).forEach((action) => {
        const rules = state.goggle.rules[action as GoggleInstructionActionKey]

        if (!rules || rules.length === 0) {
          return
        }

        goggle.lines.push(new GoggleEmpty())
        goggle.lines.push(new GoggleComment(` ${action}s`))

        rules.forEach((inObj) => {
          const options = {
            [action as GoggleInstructionActionKey]:
              typeof inObj.value === 'number' ? inObj.value : true,
            site: inObj.site,
            inurl: inObj.options?.includes('inurl'),
            intitle: inObj.options?.includes('intitle'),
            indescription: inObj.options?.includes('indescription'),
            incontent: inObj.options?.includes('incontent'),
          } as GoggleInstructionOptions

          goggle.lines.push(new GoggleInstruction(inObj.pattern, options))
        })
      })

      goggle.lines = [
        ...goggle.lines,
        new GoggleEmpty(),
        new GoggleComment(' Powered by Goggledy'),
      ]
      return goggle.stringify()
    },
  },

  actions: {
    parseGoggle() {
      const gistStore = useGistStore()
      // console.log(gistStore.gist)
      const goggle = new Goggle()
      goggle.parse((gistStore.gist.files[0] as { text: string }).text)
      // console.log(goggle.metaData)

      const metaData = goggle.metaData

      if (typeof metaData.public !== 'boolean') {
        metaData.public = gistStore.gist.public
      }

      if (!metaData.description && gistStore.gist.description) {
        metaData.description = gistStore.gist.description
      }

      if (!metaData.author) {
        metaData.author = gistStore.login
      }

      if (!metaData.homepage) {
        metaData.homepage = gistStore.gist.url
      }

      if (!metaData.issues) {
        metaData.issues = gistStore.gist.url
      }

      function convertActions(
        goggle: Goggle,
        action: GoggleInstructionActionKey
      ) {
        return goggle[action].map((inObj): GoggleActionObject => {
          const outObj: GoggleActionObject = {
            id: uuidv4(),
            pattern: inObj.pattern,
            site: inObj.options.site,
            options: [],
          }

          if (typeof inObj.options[action] === 'number') {
            outObj.value = inObj.options[action] as number
          }

          for (const option in inObj.options) {
            if (
              ['inurl', 'intitle', 'indescription', 'incontent'].includes(
                option
              )
            ) {
              outObj.options?.push(option)
            }
          }

          return outObj
        })
      }

      this.goggle = {
        metaData: metaData,
        rules: {
          discard: convertActions(goggle, 'discard'),
          boost: convertActions(goggle, 'boost'),
          downrank: convertActions(goggle, 'downrank'),
        },
      }
    },
    addActionRule(
      action: GoggleInstructionActionKey,
      rule: GoggleActionObject
    ) {
      this.goggle.rules[action] = [rule, ...this.goggle.rules[action]]
    },
    removeActionRule(action: GoggleInstructionActionKey, index: number) {
      this.goggle.rules[action] = this.goggle.rules[action].filter(
        (_, i) => i !== index
      )
    },
    duplicateActionRule(action: GoggleInstructionActionKey, index: number) {
      this.goggle.rules[action] = [
        ...this.goggle.rules[action].slice(0, index),
        { ...this.goggle.rules[action][index] },
        ...this.goggle.rules[action].slice(index),
      ]
    },
  },
})
