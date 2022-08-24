<template>
  <div class="space-y-10">
    <draggable v-model="rules" item-key="id" class="space-y-5">
      <template #item="{ index }">
        <goggle-rule :action="action" :index="index" class="cursor-move" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import GoggleRule from 'components/GoggleRule.vue'
import { GoggleInstructionActionKey } from 'goggledy'
import { GoggleActionObject } from 'src/types'
import draggable from 'vuedraggable'

const props = defineProps<{
  action: GoggleInstructionActionKey
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
