<script setup lang="ts">
import { ref, Ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useBraveStore } from 'stores/brave'
import { useGoggleStore } from 'stores/goggle'
import { useEditorStore } from 'stores/editor'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleMetaData from 'components/GoggleEditMetaData.vue'
import GoggleEditRules from 'components/GoggleEditRules.vue'
import GoggleCode from 'components/GoggleCode.vue'
import { GoggleEditTab } from 'src/types'

const route = useRoute()
const tab: Ref<GoggleEditTab> = ref('meta')
const goggleRulesRef = ref<InstanceType<typeof GoggleRules>[]>()
const { error, isLoading, gist } = storeToRefs(useGistStore())
const { fetchGist, updateGist } = useGistStore()
const { goggle, actions } = storeToRefs(useGoggleStore())
const { submitGoggle } = useBraveStore()

async function updateAndSubmitGoggle() {
  await updateGist()
  submitGoggle()
}

function addRuleHandler() {
  goggleRulesRef.value?.[0].addRuleHandler()
}

onBeforeUnmount(() => {
  // TODO: Anyway to get this working inside a action of the store itself?
  useEditorStore().tabScrollIndexes = {
    discard: 0,
    boost: 0,
    downrank: 0,
  }
})

fetchGist(route.params.id as string)

if (route.params.action) {
  tab.value = route.params.action as GoggleEditTab
}
</script>

<template>
  <q-page padding>
    <template v-if="!isLoading && !error && gist && goggle">
      <div class="space-y-10">
        <q-tab-panels
          v-model="tab"
          animated
          transition-next="fade"
          transition-prev="fade"
          class="g-tab-panels h-[70vh] md:h-[55vh]"
        >
          <q-tab-panel name="meta">
            <goggle-meta-data />
          </q-tab-panel>
          <q-tab-panel name="code">
            <goggle-code />
          </q-tab-panel>
          <q-tab-panel
            v-for="(action, i) in actions"
            :key="i"
            :name="action.key"
          >
            <goggle-edit-rules
              ref="goggleRulesRef"
              :action="action.key"
              @rule-action-change="(newTab) => (tab = newTab)"
            />
          </q-tab-panel>
        </q-tab-panels>

        <goggle-action-bar
          context="edit"
          :tab="tab"
          class="lt-md:(fixed left-0 bottom-0 w-full rounded-0)"
          @add-rule="addRuleHandler"
        >
          <template #actions>
            <g-btn icon="eva-save-outline" @click="updateGist" />
            <g-btn icon="eva-flash-outline" @click="updateAndSubmitGoggle">
              <q-tooltip anchor="top middle" self="bottom middle">
                Save and Submit
              </q-tooltip>
            </g-btn>
          </template>
          <template #after>
            <q-tabs
              v-model="tab"
              align="justify"
              indicator-color="transparent"
              content-class="g-tabs"
            >
              <q-tab name="meta" icon="eva-edit-outline" />
              <q-tab
                v-for="(action, index) in actions"
                :key="index"
                :name="action.key"
                :icon="action.icon"
              />
              <q-tab name="code" icon="eva-code-outline" />
            </q-tabs>
          </template>
        </goggle-action-bar>
      </div>
    </template>
  </q-page>
</template>

<style lang="sass">
.g-tabs .q-tab
  @apply rounded-4 bg-stone-7 text-stone-4 tracking-widest sm:py-4 lt-sm:px-0

  & + .q-tab
    @apply ml-2 sm:ml-4

  &.q-tab--active
    @apply bg-stone-6 text-stone-3

  .q-tab__label
    @apply font-extrabold

.g-tab-panels
  @apply bg-transparent

  @media (max-height: 700px)
    @apply h-[60vh]

  .q-tab-panel
    @apply p-0 overflow-y-hidden
</style>
