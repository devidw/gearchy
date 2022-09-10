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
          >
            <q-tab name="meta" icon="eva-edit-outline" />
            <q-tab
              v-for="(action, index) in actions"
              :key="index"
              :name="action.key"
              :icon="action.icon"
            />
          </q-tabs>
        </goggle-action-bar>

        <q-tab-panels
          v-model="tab"
          animated
          transition-next="fade"
          transition-prev="fade"
          class="g-tab-panels"
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
              @rule-action-change="(newTab) => (tab = newTab)"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleMetaData from 'components/GoggleMetaData.vue'
import GoggleRules from 'components/GoggleRules.vue'
import { GoggleEditTab } from 'src/types'

const route = useRoute()
const tab: Ref<GoggleEditTab> = ref('meta')
const { error, isLoading, gist } = storeToRefs(useGistStore())
const { goggle, actions } = storeToRefs(useGoggleStore())
const { fetchGist } = useGistStore()

fetchGist(route.params.id as string)
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
