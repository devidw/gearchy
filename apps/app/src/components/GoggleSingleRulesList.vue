<template>
  <q-list class="px-6 py-4 space-y-2 font-mono">
    <template v-for="(rule, i) in filteredRules" :key="i">
      <q-item class="p-0">
        <q-item-section v-if="rule.value" avatar class="w-10 text-xs">
          {{ rule.value }}
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="rule.pattern">{{ rule.pattern }}</q-item-label>
          <q-item-label v-if="rule.site" caption>{{ rule.site }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GoggleActionObject } from 'src/types'

const props = defineProps<{ rules: GoggleActionObject[] }>()

// Filter rules where site or pattern is not empty
const filteredRules = computed(() =>
  props.rules.filter((rule) => rule.site || rule.pattern)
)
</script>
