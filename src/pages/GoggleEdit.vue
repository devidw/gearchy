<template>
  <q-page padding>
    <template v-if="!loading && goggle">
      <div class="space-y-10">
        <goggle-action-bar context="edit" :action="tab" :gist="gist">
          <q-tabs
            v-model="tab"
            align="justify"
            indicator-color="transparent"
            content-class="g-tabs"
            class="mb-10"
          >
            <q-tab name="meta" icon="eva-edit-outline" />
            <q-tab name="discard" icon="eva-slash-outline" />
            <q-tab name="boost" icon="eva-arrowhead-up-outline" />
            <q-tab name="downrank" icon="eva-arrowhead-down-outline" />
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
            <goggle-meta-data :meta-data="goggle.metaData" />
          </q-tab-panel>
          <q-tab-panel name="discard">
            <goggle-rules action="discard" />
          </q-tab-panel>
          <q-tab-panel name="boost">
            <goggle-rules action="boost" />
          </q-tab-panel>
          <q-tab-panel name="downrank">
            <goggle-rules action="downrank" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleMetaData from 'components/GoggleMetaData.vue'
import GoggleRules from 'components/GoggleRules.vue'

const route = useRoute()
const tab = ref('meta')
const { loading, gist } = storeToRefs(useGistStore())
const { goggle } = storeToRefs(useGoggleStore())
const { fetchGist } = useGistStore()

fetchGist(route.params.id)
</script>

<style lang="sass">
.g-tabs .q-tab
  @apply rounded-4 bg-stone-700 color-stone-400 py-4 tracking-widest

  & + .q-tab
    @apply ml-4

  &.q-tab--active
    @apply bg-stone-600 color-stone-300

  .q-tab__label
    @apply font-extrabold

.g-tab-panels
  @apply bg-transparent

  .q-tab-panel
    @apply overflow-y-hidden
</style>
