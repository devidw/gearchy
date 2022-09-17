<template>
  <q-page padding>
    <custom-page-header>
      <template v-slot:title>
        Goggles
        <span v-if="login" class="text-size-4 opacity-50">
          by {{ login }}
        </span>
      </template>
      <template v-slot:actions>
        <q-btn
          flat
          round
          icon="eva-refresh-outline"
          @click="
            () => {
              resetGists()
              fetchGists()
            }
          "
        />
        <q-btn
          flat
          round
          icon="eva-plus-circle-outline"
          @click="createGoggle"
        />
      </template>
    </custom-page-header>

    <q-infinite-scroll
      v-if="gists.length"
      @load="onLoad"
      :offset="0"
      class="space-y-4"
    >
      <goggle-list-item v-for="(gist, i) in gists" :key="i" :gist="gist" />
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import GoggleListItem from 'components/GoggleListItem.vue'
import CustomPageHeader from 'components/CustomPageHeader.vue'
import CustomDialogVue from 'components/CustomDialog.vue'

const $q = useQuasar()
const { login, gists, pagination } = storeToRefs(useGistStore())
const { resetGists, fetchGists, createGist } = useGistStore()

async function onLoad(index: number, done: (stop: boolean) => void) {
  await fetchGists()
  done(!pagination.value.pageInfo.hasNextPage)
  // console.info('onLoad', index)
}

function createGoggle() {
  $q.dialog({
    component: CustomDialogVue,
    componentProps: {
      title: 'Create new Goggle',
      message:
        'Choose if you want to create a public or private Goggle. This will determine the initial visibility of the Gist as well.',
      actions: [
        {
          type: 'ok',
          label: 'Public',
          payload: {
            isPublic: true,
          },
        },
        {
          type: 'ok',
          label: 'Private',
          payload: {
            isPublic: false,
          },
        },
        { type: 'cancel' },
      ],
    },
  }).onOk(({ isPublic }) => createGist(isPublic))
}

fetchGists()
</script>

<style scoped lang="sass">
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
