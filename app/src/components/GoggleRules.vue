<template>
  <q-virtual-scroll
    :items="rules"
    :virtual-scroll-item-size="100"
    v-slot="{ index }"
    ref="virtualScroll"
    @virtual-scroll="onVirtualScroll"
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
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import { useEditorStore } from 'stores/editor'
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
const router = useRouter()
const virtualScroll = ref<QVirtualScroll>()
const { goggle } = storeToRefs(useGoggleStore())
const { addRule } = useGoggleStore()
const { tabScrollIndexes } = storeToRefs(useEditorStore())

const rules = computed({
  get: () => goggle.value.rules[props.action],
  set: (value: GoggleActionRule[]) => {
    goggle.value.rules[props.action] = value
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

<style lang="sass"></style>
