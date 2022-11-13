<script lang="ts" setup>
import { ref, type Ref, onBeforeUnmount, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import { useGoggleStore } from 'src/stores/goggle'
import { useEditorStore } from 'src/stores/editor'
import GoggleActionBar from '../GoggleActionBar.vue'
import GoggleEditMetaData from './components/GoggleEditMetaData.vue'
import GoggleEditRuleList from './components/GoggleEditRuleList.vue'
import GoggleCode from './components/GoggleCode.vue'
import updateGoggleNotify from '../useUpdateGoggleNotify'
import submitGoggleNotify from '../useSubmitGoggleNotify'
import type { GoggleInstructionActionOptionKey } from 'goggledy'
import type { GoggleFileHostHandle } from 'src/types'

export type GoggleEditTab = 'meta' | 'code' | GoggleInstructionActionOptionKey

const route = useRoute()
const router = useRouter()
const tab: Ref<GoggleEditTab> = ref('meta')
const goggleEditRulesRef = $ref<InstanceType<typeof GoggleEditRuleList>[]>()
const goggleFileStore = useGoggleFileStore()
const { isLoading, goggleFile } = storeToRefs(useGoggleFileStore())
const { actions, goggle } = storeToRefs(useGoggleStore())

async function updateAndSubmitGoggle() {
  await updateGoggleNotify()
  if (goggleFile.value?.url) {
    submitGoggleNotify(goggleFile.value.url)
  }
}

function addRuleHandler() {
  goggleEditRulesRef?.[0].addRuleHandler()
}

/**
 * Keep the goggle name in sync with the goggle file name
 */
watchEffect(() => {
  if (goggleFile.value && goggle.value && goggle.value.metaData.name) {
    goggleFile.value.name = goggle.value.metaData.name
  }
})

/**
 * Clear remembered scroll indexes of the different editor action tabs
 */
onBeforeUnmount(() => {
  // TODO: Anyway to get this working inside a action of the store itself?
  useEditorStore().tabScrollIndexes = {
    discard: 0,
    boost: 0,
    downrank: 0,
  }
})

if (!route.params.host || !route.params.id) {
  router.push({ name: 'goggle-list' })
}

if (route.params.action) {
  tab.value = route.params.action as GoggleEditTab
}

await goggleFileStore.retrieve(
  route.params.host as GoggleFileHostHandle,
  route.params.id as string,
)

if (goggleFileStore.error || !goggle.value) {
  router.push({ name: 'goggle-list' })
}
</script>

<template>
  <q-page>
    <div class="space-y-10">
      <q-tab-panels
        v-model="tab"
        animated
        transition-next="fade"
        transition-prev="fade"
        class="g-tab-panels h-[70vh] md:h-[55vh]"
      >
        <q-tab-panel name="meta">
          <GoggleEditMetaData v-model="goggle.metaData" />
        </q-tab-panel>
        <q-tab-panel name="code">
          <goggle-code />
        </q-tab-panel>
        <q-tab-panel v-for="(action, i) in actions" :key="i" :name="action.key">
          <GoggleEditRuleList
            ref="goggleEditRulesRef"
            :action="action.key"
            @rule-action-change="(newTab) => (tab = newTab)"
          />
        </q-tab-panel>
      </q-tab-panels>

      <goggle-action-bar class="lt-md:(fixed left-0 bottom-0 w-full rounded-0)">
        <template #left>
          <g-btn
            icon="eva-save-outline"
            :disable="!!isLoading"
            @click="updateGoggleNotify"
          />
          <template
            v-if="
              goggleFileStore.host?.hostInfo.canSubmit &&
              goggleFile &&
              goggleFile.url
            "
          >
            <g-btn
              icon="eva-cloud-upload-outline"
              :disable="!!isLoading"
              @click="submitGoggleNotify(goggleFile.url)"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                Submit Goggle
              </q-tooltip>
            </g-btn>
            <g-btn
              icon="eva-flash-outline"
              :disable="!!isLoading"
              @click="updateAndSubmitGoggle"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                Save and Submit
              </q-tooltip>
            </g-btn>
          </template>
        </template>
        <template #center>
          <g-btn
            v-if="tab && !['meta', 'code'].includes(tab)"
            icon="eva-plus-circle-outline"
            @click="addRuleHandler"
          />
        </template>
        <template #after>
          <q-tabs
            v-model="tab"
            align="justify"
            indicator-color="transparent"
            content-class="g-tabs"
          >
            <q-tab name="meta" label="meta" icon="eva-edit-outline" />
            <q-tab
              v-for="(action, index) in actions"
              :key="index"
              :name="action.key"
              :label="action.key + 's'"
              :icon="action.icon"
            />
            <q-tab name="code" label="source" icon="eva-code-outline" />
          </q-tabs>
        </template>
      </goggle-action-bar>
    </div>
  </q-page>
</template>

<style lang="sass">
.g-tabs
  .q-tab
    @apply rounded-4 bg-stone-7 text-stone-4 sm:py-2 md:(pb-1) lt-sm:px-0 flex-(grow-1 shrink-1 basis-0)

    & + .q-tab
      @apply ml-2 sm:ml-4

    &.q-tab--active
      @apply bg-stone-6 text-stone-3

    .q-tab__content
      @apply md:space-y-2

      .q-tab__label
        @apply lt-md:hidden font-([heading] bold) text-([10px]) tracking-[2px] opacity-65

.g-tab-panels
  @apply bg-transparent

  @media (max-height: 700px)
    @apply h-[60vh]

  .q-tab-panel
    @apply p-0 overflow-y-hidden
</style>
