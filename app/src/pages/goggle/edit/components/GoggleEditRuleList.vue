<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'src/stores/goggle'
import { useEditorStore } from 'src/stores/editor'
import GoggleEditRule from './GoggleEditRule.vue'
import type { QVirtualScroll } from 'quasar'
import type { GoggleInstructionActionOptionKey } from 'goggledy'
import type { GoggleActionRule } from 'src/types'

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
const router = useRouter()
const virtualScroll = ref<QVirtualScroll>()
const { goggle } = storeToRefs(useGoggleStore())
const { addRule } = useGoggleStore()
const { tabScrollIndexes } = storeToRefs(useEditorStore())

const rules = computed({
  get: () => {
    if (goggle.value) {
      return goggle.value.rules[props.action]
    } else {
      return []
    }
  },
  set: (value: GoggleActionRule[]) => {
    if (goggle.value) {
      goggle.value.rules[props.action] = value
    }
  },
})

function addRuleHandler() {
  addRule(props.action as GoggleInstructionActionOptionKey)
  scrollTo(0)
}

async function scrollTo(index: number) {
  await nextTick()
  virtualScroll.value?.scrollTo(index)
}

function onVirtualScroll(details: { index: number }) {
  tabScrollIndexes.value[props.action] = details.index
}

if (
  route.params.action &&
  route.params.index &&
  route.params.action === props.action
) {
  scrollTo(Number(route.params.index))
  router.replace({
    params: {
      action: undefined,
      index: undefined,
    },
  })
} else if (tabScrollIndexes.value[props.action]) {
  scrollTo(tabScrollIndexes.value[props.action])
}
</script>

<template>
  <q-virtual-scroll
    v-slot="{ index }"
    ref="virtualScroll"
    :items="rules"
    :virtual-scroll-item-size="100"
    class="g-visual-rules h-full overflow-y-scroll"
    @virtual-scroll="onVirtualScroll"
  >
    <div class="pb-[18px]">
      <goggle-edit-rule
        :action="action"
        :index="index"
        @rule-action-change="$emit('ruleActionChange', $event)"
      />
    </div>
  </q-virtual-scroll>
</template>
