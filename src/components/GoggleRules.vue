<template>
  <div class="space-y-10">
    <draggable
      v-model="rules"
      item-key="id"
      class="space-y-5"
      :group="action"
      @start="$emit('ruleDragStart')"
      @end="$emit('ruleDragEnd')"
    >
      <template #item="{ index }">
        <goggle-rule
          :action="action"
          :index="index"
          class="cursor-move"
          @dragstart="startDrag($event, index)"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import GoggleRule from 'components/GoggleRule.vue'
import { GoggleInstructionActionOptionKey } from 'goggledy'
import { GoggleActionObject } from 'src/types'
import draggable from 'vuedraggable'

const props = defineProps<{
  action: GoggleInstructionActionOptionKey
}>()

defineEmits(['ruleDragStart', 'ruleDragEnd'])

const { goggle } = storeToRefs(useGoggleStore())

const rules = computed({
  get: () => goggle.value.rules[props.action],
  set: (value: GoggleActionObject[]) => {
    goggle.value.rules[props.action] = value
  },
})

function startDrag(evt: DragEvent, index: number) {
  evt.dataTransfer?.setData('action', props.action)
  evt.dataTransfer?.setData('index', String(index))
}
</script>

<style lang="sass">
.q-tab-panel
  @apply p-0
</style>
