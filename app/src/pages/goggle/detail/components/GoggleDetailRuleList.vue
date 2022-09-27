<script lang="ts" setup>
import { computed } from 'vue'
import { useGoggleStore } from 'src/stores/goggle'
import type { GoggleActionRule } from 'src/types'
import type { GoggleInstructionActionOptionKey } from 'goggledy'

const props = defineProps<{
  action: GoggleInstructionActionOptionKey
  rules: GoggleActionRule[]
}>()

const { getRuleIndexById } = useGoggleStore()

// Filter rules where site or pattern is not empty
const filteredRules = computed(() =>
  props.rules.filter((rule) => rule.site || rule.pattern),
)
</script>

<template>
  <q-virtual-scroll
    v-slot="{ item }"
    :items="filteredRules"
    class="max-h-[30vh] md:max-h-xl px-6 py-4 space-y-2 font-mono"
  >
    <q-item
      class="p-0"
      :to="{
        name: 'goggle-edit',
        params: {
          id: $route.params.id,
          action,
          index: getRuleIndexById(action, item.id),
        },
      }"
    >
      <q-item-section v-if="item.value" avatar class="w-10 text-xs">
        {{ item.value }}
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="item.pattern">{{ item.pattern }}</q-item-label>
        <q-item-label v-if="item.site" caption>{{ item.site }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-virtual-scroll>
</template>
