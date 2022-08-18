<template>
  <div class="text-center mb-10 text-gray">
    <q-btn flat round @click="addRule" icon="eva-plus-circle-outline" />
  </div>

  <div class="space-y-10">
    <goggle-rule v-for="(rule, i) of rules" :key="i" :rule="rule" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'src/stores/goggle'
import GoggleRule from './GoggleRule.vue'

const props = defineProps<{
  action: 'discard' | 'boost' | 'downrank'
}>()

const { goggle } = storeToRefs(useGoggleStore())
const rules = ref(goggle[props.action])

function addRule() {
  rules.value = [
    {
      value: 1,
      pattern: '',
      site: '',
      options: [],
    },
    ...(rules.value || []),
  ]
}
</script>
