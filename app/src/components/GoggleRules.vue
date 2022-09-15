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
import { GoggleActionObject } from 'src/types'
import type { QVirtualScroll } from 'quasar'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  action: GoggleInstructionActionOptionKey
}>()

defineEmits<{
  (event: 'ruleActionChange', action: GoggleInstructionActionOptionKey): void
}>()

defineExpose({
  addRule,
})

const virtualScroll = ref<QVirtualScroll>()
const { goggle } = storeToRefs(useGoggleStore())
const { addActionRule } = useGoggleStore()

const rules = computed({
  get: () => goggle.value.rules[props.action],
  set: (value: GoggleActionObject[]) => {
    goggle.value.rules[props.action] = value
  },
})

async function addRule() {
  addActionRule(props.action as GoggleInstructionActionOptionKey, {
    id: uuidv4(),
    pattern: '',
    site: '',
    options: [],
  })
  await nextTick()
  virtualScroll.value?.scrollTo(0)
}
</script>

<style lang="sass">
.q-virtual-scroll__content
  @apply space-y-4
</style>
