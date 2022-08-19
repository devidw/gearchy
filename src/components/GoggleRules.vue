<template>
  <div class="text-center mb-10 text-gray">
    <q-btn flat round @click="addRule" icon="eva-plus-circle-outline" />
  </div>

  <div class="space-y-10">
    <goggle-rule
      v-for="(rule, i) of goggle[props.action]"
      :key="i"
      :action="props.action"
      :index="i"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import GoggleRule from 'components/GoggleRule.vue'

const props = defineProps<{
  action: GoggleInstructionActionKey
}>()

const { goggle } = storeToRefs(useGoggleStore())
const { addActionRule } = useGoggleStore()

function addRule() {
  addActionRule(props.action, {
    value: 2,
    pattern: '',
    site: '',
    options: [],
  })
}
</script>
