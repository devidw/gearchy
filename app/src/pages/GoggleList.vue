<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'src/stores/goggle'
import GoggleListItem from 'components/GoggleListItem.vue'
import CustomPageHeader from 'components/CustomPageHeader.vue'

const { gists, pagination } = storeToRefs(useGistStore())
const { resetGists, fetchGists } = useGistStore()
const { createGoggle } = useGoggleStore()

async function onLoad(index: number, done: (stop: boolean) => void) {
  await fetchGists()
  done(!pagination.value.pageInfo.hasNextPage)
  // console.info('onLoad', index)
}

fetchGists()
</script>

<template>
  <q-page padding>
    <custom-page-header>
      <template #actions>
        <g-btn
          icon="eva-refresh-outline"
          @click="
            () => {
              resetGists()
              fetchGists()
            }
          "
        />
        <g-btn icon="eva-plus-circle-outline" @click="createGoggle" />
      </template>
    </custom-page-header>

    <q-infinite-scroll
      v-if="gists.length"
      :offset="0"
      class="space-y-4"
      @load="onLoad"
    >
      <goggle-list-item v-for="(gist, i) in gists" :key="i" :gist="gist" />
    </q-infinite-scroll>
  </q-page>
</template>

<style scoped lang="sass">
@media (hover: hover)
  .q-infinite-scroll
    // By default all cards same size
    & > div
      @apply scale-[1]
    // When hoving over list all cards scale down
    &:hover > div
      @apply scale-[0.98] opacity-75
    & > div:hover
      @apply scale-[1] opacity-100
</style>
