<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import GoggleListItem from './components/GoggleListItem.vue'
import createGoggleDialog from '../useCreateGoggleDialog'

const { goggleFilePreviews } = storeToRefs(useGoggleFileStore())
const goggleFileStore = useGoggleFileStore()

onBeforeMount(async () => {
  await goggleFileStore.list()
})

async function onLoad(index: number, done: (stop: boolean) => void) {
  await goggleFileStore.list()
  done(goggleFileStore.error !== undefined || !goggleFileStore.hasNextPage)
  // console.info('onLoad', index, goggleFileStore.hasNextPage)
}

// function refresh() {
//   goggleFileStore.resetPagination()
// }
</script>

<template>
  <q-page>
    <div class="flex justify-center mb-8 text-(gray)">
      <g-btn
        icon="eva-plus-circle-outline"
        data-cy="create-goggle"
        @click="createGoggleDialog($router)"
      />
      <!-- <g-btn icon="eva-refresh-outline" @click="refresh" /> -->
    </div>

    <q-infinite-scroll
      v-if="goggleFilePreviews.length"
      class="space-y-4"
      @load="onLoad"
    >
      <goggle-list-item
        v-for="(goggleFilePreview, i) in goggleFilePreviews"
        :key="i"
        :goggle-file-preview="goggleFilePreview"
      />
    </q-infinite-scroll>

    <div
      v-else
      class="text-(center gray opacity-75) font-mono"
      data-cy="empty-message"
    >
      No Goggles
    </div>
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
