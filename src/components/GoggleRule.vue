<template>
  <div class="border-2 border-stone-800 rounded-4 p-5 flex justify-between">
    <div class="w-1/10 flex flex-col justify-center">
      <q-slider
        :disable="!hasPatternOrSite()"
        dense
        vertical
        label
        label-always
        v-model="rule!.value"
        :min="1"
        :max="10"
        reverse
        class="h-30"
      />
    </div>
    <div class="w-7/10 flex">
      <div class="sm:w-1/2">
        <q-input v-model="rule!.pattern" type="text" label="Pattern" />
        <q-input v-model="rule!.site" type="text" label="Site" />
      </div>
      <div class="sm:w-1/2 pl-3">
        <q-select
          :disable="!hasPattern()"
          v-model="rule!.options"
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
      <q-btn flat round icon="eva-close-outline" />
      <q-btn flat round icon="eva-arrow-downward-outline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['rule'])
const rule = ref(props.rule)
const options = ref([
  { label: 'in URL', value: 'inURL' },
  { label: 'in title', value: 'inTitle' },
  { label: 'in description', value: 'inDescription' },
  { label: 'in content', value: 'inContent' },
])

const hasPattern = () => rule.value.pattern !== ''
const hasPatternOrSite = () =>
  rule.value.pattern !== '' || rule.value.site !== ''
</script>

<style lang="sass" scoped>
.q-checkbox__label
  @apply text-capitalize
</style>
