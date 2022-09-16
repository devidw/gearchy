import { defineStore } from 'pinia'
import { useGistStore } from './gist'
import {
  Goggle,
  GoggleInstruction,
  GoggleInstructionActionOptionKey,
  GoggleInstructionContextOptionKey,
  GoggleInstructionOptions,
  GoggleMetaData,
  GoggleEmpty,
  GoggleComment,
} from 'goggledy'
import { GoggleActionRule } from 'src/types'
import { v4 as uuidv4 } from 'uuid'

export const useGoggleStore = defineStore('goggle', {
  state: () => ({
    goggle: {} as {
      metaData: GoggleMetaData
      rules: {
        discard: GoggleActionRule[]
        boost: GoggleActionRule[]
        downrank: GoggleActionRule[]
      }
    },
  }),

  getters: {
    actions(): { key: GoggleInstructionActionOptionKey; icon: string }[] {
      return [
        {
          key: GoggleInstructionActionOptionKey.DISCARD,
          icon: 'eva-slash-outline',
        },
        {
          key: GoggleInstructionActionOptionKey.BOOST,
          icon: 'eva-arrowhead-up-outline',
        },
        {
          key: GoggleInstructionActionOptionKey.DOWNRANK,
          icon: 'eva-arrowhead-down-outline',
        },
      ]
    },
    stringifiedGoggle(state): string {
      const goggle = new Goggle(
        [new GoggleComment(` generator: Gearchy ${process.env.VERSION}`)],
        state.goggle.metaData,
      )

      // Convert action rules to instructions
      Object.keys(state.goggle.rules).forEach((action) => {
        const rules =
          state.goggle.rules[action as GoggleInstructionActionOptionKey]

        if (!rules || rules.length === 0) {
          return
        }

        goggle.lines.push(new GoggleEmpty())
        goggle.lines.push(new GoggleComment(` ${action}s`))

        rules.forEach((inObj) => {
          const options = {
            [action as GoggleInstructionActionOptionKey]:
              action === 'discard' ? true : inObj.value,
            inurl: inObj.options?.includes('inurl') || false,
            intitle: inObj.options?.includes('intitle') || false,
            indescription: inObj.options?.includes('indescription') || false,
            incontent: inObj.options?.includes('incontent') || false,
          } as GoggleInstructionOptions

          if (inObj.site) {
            options.site = inObj.site
          }

          goggle.lines.push(new GoggleInstruction(inObj.pattern, options))
        })
      })

      return goggle.toString()
    },
  },

  actions: {
    parseGoggle() {
      const { gist, login } = useGistStore()

      if (!gist) {
        return
      }

      const goggle = Goggle.parse((gist.files[0] as { text: string }).text)

      const metaData = goggle.metaData

      if (typeof metaData.public !== 'boolean') {
        metaData.public = gist.public
      }

      if (!metaData.description && gist.description) {
        metaData.description = gist.description
      }

      if (!metaData.author) {
        metaData.author = login
      }

      if (!metaData.homepage) {
        metaData.homepage = gist.url
      }

      if (!metaData.issues) {
        metaData.issues = gist.url + '#comments'
      }

      function convertActions(
        goggle: Goggle,
        action: GoggleInstructionActionOptionKey,
      ) {
        const key =
          action === 'discard'
            ? 'discards'
            : action === 'boost'
            ? 'boosts'
            : 'downranks'
        return goggle[key].map((inObj): GoggleActionRule => {
          const outObj: GoggleActionRule = {
            id: uuidv4(),
            pattern: inObj.pattern,
            site: inObj.options.site,
            options: [],
          }

          if (typeof inObj.options[action] === 'number') {
            outObj.value = inObj.options[action] as number
          }

          Object.keys(inObj.options).forEach((optionKey) => {
            if (
              Object.values(GoggleInstructionContextOptionKey).includes(
                optionKey as GoggleInstructionContextOptionKey,
              )
            ) {
              outObj.options?.push(optionKey)
            }
          })

          return outObj
        })
      }

      this.goggle = {
        metaData: metaData,
        rules: {
          discard: convertActions(
            goggle,
            GoggleInstructionActionOptionKey.DISCARD,
          ),
          boost: convertActions(goggle, GoggleInstructionActionOptionKey.BOOST),
          downrank: convertActions(
            goggle,
            GoggleInstructionActionOptionKey.DOWNRANK,
          ),
        },
      }
    },
    addRule(action: GoggleInstructionActionOptionKey, rule?: GoggleActionRule) {
      if (!rule) {
        rule = {
          id: uuidv4(),
          pattern: '',
          site: '',
          options: [],
        }
      }
      this.goggle.rules[action] = [rule, ...this.goggle.rules[action]]
    },
    removeRule(action: GoggleInstructionActionOptionKey, index: number) {
      this.goggle.rules[action] = this.goggle.rules[action].filter(
        (_, i) => i !== index,
      )
    },
    duplicateRule(action: GoggleInstructionActionOptionKey, index: number) {
      const clone = { ...this.goggle.rules[action][index] }
      clone.id = uuidv4()
      this.goggle.rules[action] = [
        ...this.goggle.rules[action].slice(0, index),
        { ...clone },
        ...this.goggle.rules[action].slice(index),
      ]
    },
    changeRuleAction(
      sourceAction: GoggleInstructionActionOptionKey,
      targetAction: GoggleInstructionActionOptionKey,
      index: number,
    ) {
      const rule = this.goggle.rules[sourceAction][index]
      // Handle the conversion of discard to boost/downrank
      if (sourceAction === 'discard') {
        rule.value = 2
      }
      this.removeRule(sourceAction, index)
      this.addRule(targetAction, rule)
    },
  },
})
