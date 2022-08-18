<template>
  <div class="border-2 border-stone-800 rounded-4 p-5 flex justify-between">
    <div class="w-1/10 flex flex-col justify-center">
      <q-slider
        :disable="!hasPatternOrSite()"
        dense
        vertical
        label
        label-always
        v-model="goggle[props.action][props.index].value"
        :min="1"
        :max="10"
        reverse
        class="h-30"
      />
    </div>
    <div class="w-7/10 flex">
      <div class="sm:w-1/2">
        <q-input
          v-model="goggle[props.action][props.index].pattern"
          type="text"
          label="Pattern"
        />
        <q-input
          v-model="goggle[props.action][props.index].site"
          type="text"
          label="Site"
        />
      </div>
      <div class="sm:w-1/2 pl-3">
        <q-select
          :disable="!hasPattern()"
          v-model="goggle[props.action][props.index].options"
          :options="options"
          label="Match"
          class="h-full cursor-pointer"
          dropdown-icon="none"
          multiple
          borderless
          use-chips
          stack-label
        />
      </div>
    </div>
    <div
      class="flex flex-col justify-around transition transition-300"
      text="gray opacity-25"
      hover="text-opacity-50"
    >
      <q-btn flat round icon="eva-arrow-upward-outline" />
      <q-btn
        flat
        round
        icon="eva-close-outline"
        @click="removeActionRule(props.action, props.index)"
      />
      <q-btn flat round icon="eva-arrow-downward-outline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'

const props = defineProps<{
  action: 'discard' | 'boost' | 'downrank'
  index: number
}>()

const { goggle } = storeToRefs(useGoggleStore())
const { removeActionRule } = useGoggleStore()

const options = ref([
  { label: 'in URL', value: 'inURL' },
  { label: 'in title', value: 'inTitle' },
  { label: 'in description', value: 'inDescription' },
  { label: 'in content', value: 'inContent' },
])

const hasPattern = () => goggle.value[props.action][props.index].pattern !== ''
const hasPatternOrSite = () =>
  goggle.value[props.action][props.index].pattern !== '' ||
  goggle.value[props.action][props.index].site !== ''
</script>

<style scoped lang="sass">
.q-checkbox__label
  @apply text-capitalize
</style>
