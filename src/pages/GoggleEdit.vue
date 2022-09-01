<template>
  <q-page padding>
    <template v-if="!isLoading && !error && gist && goggle">
      <div class="space-y-10">
        <goggle-action-bar context="edit" :action="tab">
          <q-tabs
            v-model="tab"
            align="justify"
            indicator-color="transparent"
            content-class="g-tabs"
            class="mb-10"
          >
            <q-tab name="meta" icon="eva-edit-outline" />
            <q-tab
              v-for="(action, index) in actions"
              :key="index"
              :name="action.key"
              :icon="action.icon"
              @drop="onDrop($event, action.key)"
              @dragover.prevent
              @dragenter.prevent
              :class="{
                'animate-pulse bg-stone-6': isDragging && tab !== action.key,
              }"
            />
          </q-tabs>
        </goggle-action-bar>

        <q-tab-panels
          v-model="tab"
          class="g-tab-panels"
          animated
          transition-next="fade"
          transition-prev="fade"
        >
          <q-tab-panel name="meta">
            <goggle-meta-data />
          </q-tab-panel>
          <q-tab-panel
            v-for="(action, i) in actions"
            :key="i"
            :name="action.key"
          >
            <goggle-rules
              :action="action.key"
              @rule-drag-start="onRuleDragStart"
              @rule-drag-end="onRuleDragEnd"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleMetaData from 'components/GoggleMetaData.vue'
import GoggleRules from 'components/GoggleRules.vue'
import { GoggleInstructionActionOptionKey } from 'goggledy'

const route = useRoute()
const tab = ref('meta')
const shouldSwitchTabTo = ref('')
const isDragging = ref(false)
const { error, isLoading, gist } = storeToRefs(useGistStore())
const { goggle, actions } = storeToRefs(useGoggleStore())
const { changeActionOnRule } = useGoggleStore()
const { fetchGist } = useGistStore()

fetchGist(route.params.id as string)

function onRuleDragStart() {
  isDragging.value = true
}

function onRuleDragEnd() {
  isDragging.value = false
  if (shouldSwitchTabTo.value) {
    tab.value = shouldSwitchTabTo.value
    shouldSwitchTabTo.value = ''
  }
}

function onDrop(evt: DragEvent, action: GoggleInstructionActionOptionKey) {
  // console.log('onDrop')
  const sourceAction = evt.dataTransfer.getData(
    'action',
  ) as GoggleInstructionActionOptionKey

  if (sourceAction === action) {
    return
  }

  const sourceIndex = parseInt(evt.dataTransfer.getData('index'))

  changeActionOnRule(sourceIndex, sourceAction, action)

  // We can not immediately switch to the new tab, because the drag operation is
  // still being processed by sortablejs. If we would switch to the new tab now,
  // sortablejs would not find the element anymore.
  // Therefore we remember the action to switch to and do it after the drag has ended.
  shouldSwitchTabTo.value = action
}
</script>

<style lang="sass">
.g-tabs .q-tab
  @apply rounded-4 bg-stone-7 color-stone-4 py-4 tracking-widest

  & + .q-tab
    @apply ml-4

  &.q-tab--active
    @apply bg-stone-6 color-stone-3

  .q-tab__label
    @apply font-extrabold

.g-tab-panels
  @apply bg-transparent

  .q-tab-panel
    @apply overflow-y-hidden
</style>
