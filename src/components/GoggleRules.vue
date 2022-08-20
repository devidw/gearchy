<template>
  <div class="space-y-10">
    <goggle-rule
      v-for="(rule, i) of goggle[action]"
      :key="i"
      :action="action"
      :index="i"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import GoggleRule from 'components/GoggleRule.vue'
import { GoggleInstructionActionKey } from 'goggledy'

const props = defineProps<{
  action: GoggleInstructionActionKey
}>()

const { goggle } = storeToRefs(useGoggleStore())
</script>

<style lang="sass">
.q-tab-panel
  @apply p-0
</style>
