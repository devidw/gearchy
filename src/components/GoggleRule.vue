<template>
  <div class="border-2 border-stone-8 rounded-4 p-5 pl-8 flex justify-between">
    <div v-if="hasSlider()" class="w-1/10 flex flex-col justify-center">
      <q-slider
        :disable="!hasPatternOrSite()"
        dense
        vertical
        label
        label-always
        v-model="goggle.rules[action][index].value"
        :min="1"
        :max="10"
        reverse
        class="h-30"
      />
    </div>
    <div
      class="flex"
      :class="{ 'w-7/10': hasSlider(), 'w-9/10': !hasSlider() }"
    >
      <div class="sm:w-1/2">
        <q-input
          v-model="goggle.rules[action][index].pattern"
          type="text"
          label="Pattern"
        />
        <q-input
          v-model="goggle.rules[action][index].site"
          type="text"
          label="Site"
        />
      </div>
      <div class="sm:w-1/2 sm:pl-3">
        <q-select
          :disable="!hasPattern()"
          v-model="goggle.rules[action][index].options"
          :options="options"
          label="Match"
          class="h-full cursor-pointer"
          dropdown-icon="none"
          multiple
          borderless
          use-chips
          stack-label
          emit-value
          map-options
        />
      </div>
    </div>
    <div
      class="flex flex-col justify-around transition transition-300"
      text="gray opacity-25"
      hover="text-opacity-50"
    >
      <q-btn
        flat
        round
        icon="eva-arrow-upward-outline"
        :class="{ invisible: index === 0 }"
        @click="moveActionRule(action, index, 'up')"
      />
      <q-btn
        flat
        round
        icon="eva-close-outline"
        @click="removeActionRule(action, index)"
      />
      <q-btn
        flat
        round
        icon="eva-arrow-downward-outline"
        :class="{ invisible: index + 1 === goggle.rules[action].length }"
        @click="moveActionRule(action, index, 'down')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import { GoggleInstructionActionKey } from 'goggledy'

const props = defineProps<{
  action: GoggleInstructionActionKey
  index: number
}>()

const { goggle } = storeToRefs(useGoggleStore())
const { removeActionRule, moveActionRule } = useGoggleStore()

const options = ref([
  { label: 'in URL', value: 'inurl' },
  { label: 'in title', value: 'intitle' },
  { label: 'in description', value: 'indescription' },
  { label: 'in content', value: 'incontent' },
])

const hasSlider = () => props.action !== 'discard'
const hasPattern = () =>
  goggle.value.rules[props.action][props.index].pattern !== ''
const hasPatternOrSite = () =>
  goggle.value.rules[props.action][props.index].pattern !== '' ||
  goggle.value.rules[props.action][props.index].site !== ''
</script>

<style scoped lang="sass">
.q-checkbox__label
  @apply text-capitalize
</style>
