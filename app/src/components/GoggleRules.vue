<template>
  <q-virtual-scroll
    :items="rules"
    :virtual-scroll-item-size="82"
    v-slot="{ index }"
    ref="virtualScroll"
    class="h-full overflow-y-scroll"
  >
    <goggle-rule
      :action="action"
      :index="index"
      @rule-action-change="$emit('ruleActionChange', $event)"
    />
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import GoggleRule from 'components/GoggleRule.vue'
import { GoggleInstructionActionOptionKey } from 'goggledy'
import { GoggleActionRule } from 'src/types'
import type { QVirtualScroll } from 'quasar'

const props = defineProps<{
  action: GoggleInstructionActionOptionKey
}>()

defineEmits<{
  (e: 'ruleActionChange', action: GoggleInstructionActionOptionKey): void
}>()

defineExpose({
  addRuleHandler,
})

const virtualScroll = ref<QVirtualScroll>()
const { goggle } = storeToRefs(useGoggleStore())
const { addRule } = useGoggleStore()

const rules = computed({
  get: () => goggle.value.rules[props.action],
  set: (value: GoggleActionRule[]) => {
    goggle.value.rules[props.action] = value
  },
})

async function addRuleHandler() {
  addRule(props.action as GoggleInstructionActionOptionKey)
  await nextTick()
  virtualScroll.value?.scrollTo(0)
}
</script>

<style lang="sass">
.q-virtual-scroll__content
  @apply space-y-4
</style>
