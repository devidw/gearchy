<template>
  <RecycleScroller :items="rules" :item-size="100" v-slot="{ index }">
    <goggle-rule
      :action="action"
      :index="index"
      @rule-action-change="$emit('ruleActionChange', $event)"
    />
  </RecycleScroller>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import GoggleRule from 'components/GoggleRule.vue'
import { GoggleInstructionActionOptionKey } from 'goggledy'
import { GoggleActionObject } from 'src/types'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const props = defineProps<{
  action: GoggleInstructionActionOptionKey
}>()

defineEmits<{
  (e: 'ruleActionChange', action: GoggleInstructionActionOptionKey): void
}>()

const { goggle } = storeToRefs(useGoggleStore())

const rules = computed({
  get: () => goggle.value.rules[props.action],
  set: (value: GoggleActionObject[]) => {
    goggle.value.rules[props.action] = value
  },
})
</script>

<style lang="sass">
.q-tab-panel
  @apply p-0
</style>
