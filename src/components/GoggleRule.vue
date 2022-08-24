<template>
  <div class="g-rule rounded-4 px-4 py-2 font-mono bg-stone-8">
    <div class="flex justify-between">
      <div
        class="w-1/12 flex justify-center items-center h-20"
        :class="{
          'flex-col -mt-2': action === 'boost',
          'flex-col-reverse -mb-2': action === 'downrank',
        }"
      >
        <template v-if="hasSlider()">
          <q-btn
            flat
            round
            dense
            @click="shiftRuleValue"
            class="g-btn"
            :icon="
              action === 'boost'
                ? 'eva-arrowhead-up-outline'
                : 'eva-arrowhead-down-outline'
            "
          />
          <span class="text-xs text-gray">
            {{ ruleValue }}
          </span>
        </template>
        <q-btn
          v-else
          flat
          round
          dense
          class="g-btn"
          icon="eva-slash-outline"
          disabled
        />
      </div>

      <div class="w-10/12 flex">
        <div class="w-1/2 flex items-between">
          <q-input
            v-model="goggle.rules[action][index].site"
            type="text"
            placeholder="Site"
            borderless
            dense
            input-class="text-xs !text-gray"
            class="w-full"
          />
          <q-input
            v-model="goggle.rules[action][index].pattern"
            type="text"
            placeholder="Pattern"
            borderless
            dense
            input-class="text-lg font-bold !text-stone-3"
            class="w-full"
          />
        </div>

        <div class="w-1/2 flex items-end">
          <q-select
            v-if="hasPattern()"
            v-model="goggle.rules[action][index].options"
            :options="options"
            class="w-full h-full flex items-end"
            hide-dropdown-icon
            multiple
            borderless
            use-chips
            stack-label
            emit-value
            map-options
            dense
          >
            <template v-slot:selected-item="scope">
              <q-chip
                :tabindex="scope.tabindex"
                :label="scope.opt.label"
                @remove="scope.removeAtIndex(scope.index)"
                removable
                icon-remove="eva-close-outline"
                class="!text-gray font-medium text-xs bg-stone-7"
              />
            </template>
          </q-select>
        </div>
      </div>

      <div class="w-1/12 flex flex-col justify-center items-end g-btn">
        <div>
          <q-btn dense flat round icon="eva-more-vertical-outline">
            <q-menu
              cover
              anchor="center middle"
              flat
              class="text-gray rounded-full"
              ref="moreMenu"
            >
              <q-btn
                flat
                round
                icon="eva-copy-outline"
                @click="
                  () => {
                    duplicateActionRule(action, index)
                    moreMenu?.hide()
                  }
                "
              />
              <q-btn flat round icon="eva-repeat-outline" />
              <q-btn
                flat
                round
                icon="eva-trash-2-outline"
                @click="removeActionRule(action, index)"
              />
            </q-menu>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import { GoggleInstructionActionKey } from 'goggledy'
import { QMenu } from 'quasar'

const props = defineProps<{
  action: GoggleInstructionActionKey
  index: number
}>()
const moreMenu = ref<QMenu>()

const { goggle } = storeToRefs(useGoggleStore())
const { removeActionRule, duplicateActionRule } = useGoggleStore()

const options = ref([
  { label: 'URL', value: 'inurl' },
  { label: 'Title', value: 'intitle' },
  { label: 'Description', value: 'indescription' },
  { label: 'Content', value: 'incontent' },
])

const ruleValue = computed({
  get: () => goggle.value.rules[props.action][props.index].value || 1,
  set: (value: number) => {
    goggle.value.rules[props.action][props.index].value = value
  },
})

function shiftRuleValue() {
  if (ruleValue.value === 10) {
    ruleValue.value = 1
  } else {
    ruleValue.value++
  }
}

const hasSlider = () => props.action !== 'discard'
const hasPattern = () =>
  goggle.value.rules[props.action][props.index].pattern !== ''
</script>

<style lang="sass">
.g-btn
  @apply text-gray text-opacity-25 hover:text-opacity-50 transition transition-300

.q-select .q-field__control
  @apply h-full flex items-end

  .q-field__native
    @apply items-end
</style>
