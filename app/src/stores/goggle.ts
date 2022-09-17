import { defineStore } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useBraveStore } from 'stores/brave'
import { GoggleActionRule } from 'src/types'
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
import { Dialog } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
import CustomDialog from 'components/CustomDialog.vue'

const publicOrPrivateDialogOptions = [
  {
    type: 'ok',
    label: 'Public',
    payload: {
      isPublic: true,
    },
  },
  {
    type: 'ok',
    label: 'Private',
    payload: {
      isPublic: false,
    },
  },
  { type: 'cancel' },
]

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
        [
          new GoggleComment(
            ` generator: Gearchy/${process.env.VERSION} <https://app.gearchy.wolf.gdn>`,
          ),
        ],
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
    createGoggle() {
      Dialog.create({
        component: CustomDialog,
        componentProps: {
          title: 'Create new Goggle',
          message:
            'Choose if you want to create a public or private Goggle. This will determine the initial visibility of the Gist as well.',
          actions: publicOrPrivateDialogOptions,
        },
      }).onOk(async ({ isPublic }) => {
        const { createGist } = useGistStore()
        const id = await createGist(isPublic)
        this.router.push({ name: 'goggle-edit', params: { id } })
      })
    },
    duplicateGoggle() {
      Dialog.create({
        component: CustomDialog,
        componentProps: {
          title: 'Duplicate this Goggle?',
          message:
            'Choose if you want to duplicate this Goggle as a public or private Goggle. This will determine the initial visibility of the Gist as well.',
          actions: publicOrPrivateDialogOptions,
        },
      }).onOk(async ({ isPublic }) => {
        const { duplicateGist } = useGistStore()
        const id = await duplicateGist(isPublic)
        this.router.push({ name: 'goggle-edit', params: { id } })
      })
    },
    deleteGoggle() {
      Dialog.create({
        component: CustomDialog,
        componentProps: {
          title: 'Delete this Goggle?',
          message:
            'This will permanently delete the associated Gist on GitHub. Once the gist is deleted, it has to be resubmitted on Brave to remove it from the search engine as well.',
        },
      }).onOk(async () => {
        const { deleteGist } = useGistStore()
        const { submitGoggle } = useBraveStore()
        this.router.push('/')
        await deleteGist()
        submitGoggle()
      })
    },
    parseGoggle() {
      const { gist, login } = useGistStore()

      if (!gist || !gist.files || !gist.files[0]) {
        return
      }

      const goggle = Goggle.parse(String(gist.files[0].content))

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

          if (action !== 'discard') {
            // Goggle parser does not return obmited default values ($boost) and
            // invalid values ($boost=99), therfore we add a default value here
            if (typeof inObj.options[action] === 'number') {
              outObj.value = inObj.options[action] as number
            } else {
              outObj.value = 2
            }
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
          value: action !== 'discard' ? 2 : undefined,
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
    getRuleIndexById(
      action: GoggleInstructionActionOptionKey,
      id: string,
    ): number {
      return this.goggle.rules[action].findIndex((rule) => rule.id === id)
    },
  },
})
