<template>
  <q-page padding>
    <div text="gray" class="flex justify-between mb-8">
      <div class="font-heading tracking-wide" text="3xl" font="bold">
        Goggles
        <span v-if="login" class="text-size-4 opacity-50">
          by {{ login }}
        </span>
      </div>
      <div space-x-1>
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
      </div>
    </div>

    <div v-if="gists" class="card-list">
      <GoggleCard v-for="(gist, i) of gists" :key="i" v-bind="gist" />
    </div>

    <div
      v-if="gists.length && pagination.pageInfo.hasNextPage"
      text="gray center opacity-50"
      class="pt-6"
    >
      <q-btn flat round icon="eva-more-horizontal-outline" @click="fetchGists">
        <q-tooltip> Load more goggles </q-tooltip>
      </q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import GoggleCard from 'components/GoggleCard.vue'
import CustomDialogVue from 'components/CustomDialog.vue'

const $q = useQuasar()
const { login, gists, pagination } = storeToRefs(useGistStore())
const { resetGists, fetchGists, createGist } = useGistStore()

fetchGists()

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
</script>

<style scoped lang="sass">
.card-list
  // By default all cards same size
  & > div
    @apply scale-[1]

  // When hoving over list all cards scale down
  &:hover > div
    @apply scale-[0.98] opacity-75

  & > div:hover
    @apply scale-[1] opacity-100
</style>
