<template>
  <q-virtual-scroll
    :items="rules"
    :virtual-scroll-item-size="100"
    v-slot="{ index }"
    ref="virtualScroll"
    class="g-visual-rules h-full overflow-y-scroll"
  >
    <div class="pb-[18px]">
      <goggle-rule
        :action="action"
        :index="index"
        @rule-action-change="$emit('ruleActionChange', $event)"
      />
    </div>
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const virtualScroll = ref<QVirtualScroll>()
const { goggle } = storeToRefs(useGoggleStore())
const { addRule } = useGoggleStore()

const rules = computed({
  get: () => goggle.value.rules[props.action],
  set: (value: GoggleActionRule[]) => {
    goggle.value.rules[props.action] = value
  },
})

async function scrollTo(index: number) {
  await nextTick()
  virtualScroll.value?.scrollTo(index)
}

function addRuleHandler() {
  addRule(props.action as GoggleInstructionActionOptionKey)
  scrollTo(0)
}

if (route.params.action && route.params.index) {
  if (route.params.action === props.action) {
    scrollTo(Number(route.params.index))
  }
}
</script>

<style lang="sass"></style>
