<template>
  <q-page padding class="space-y-5">
    <div v-if="!loading && goggle" class="space-y-10">
      <q-tabs v-model="tab" align="justify" indicator-color="transparent">
        <q-tab name="meta" icon="eva-edit-outline" />
        <q-tab name="discard" icon="eva-slash-outline" />
        <q-tab name="boost" icon="eva-arrowhead-up-outline" />
        <q-tab name="downrank" icon="eva-arrowhead-down-outline" />
      </q-tabs>

      <goggle-edit-action-bar :url="gist.url" />

      <q-tab-panels v-model="tab">
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
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'src/stores/goggle'
import GoggleEditActionBar from 'components/GoggleEditActionBar.vue'
import GoggleMetaData from 'components/GoggleMetaData.vue'
import GoggleRules from 'components/GoggleRules.vue'

const route = useRoute()
const tab = ref('meta')
const { loading, gist, goggle } = storeToRefs(useGoggleStore())
const { fetchGoggle } = useGoggleStore()

fetchGoggle(route.params.id)
</script>

<style lang="sass">
.q-page > div > .q-tabs .q-tab
  @apply rounded-4 bg-stone-800 color-stone-400 py-4 tracking-widest

  & + .q-tab
    @apply ml-5

  .q-tab__label
    @apply font-extrabold
    font-family: heading


  &.q-tab--active
    @apply bg-stone-700 color-stone-300

.q-page > div > .q-tab-panels
  @apply bg-transparent
</style>
