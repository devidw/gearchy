<template>
  <div border="2 dotted stone-700" text="gray" class="rounded-4 px-4 py-1 flex">
    <div class="w-1/3">
      <q-btn round flat icon="eva-save-outline" @click="updateGist()" />
    </div>
    <div class="w-1/3 flex justify-center">
      <q-btn
        v-if="action !== 'meta'"
        round
        flat
        icon="eva-plus-circle-outline"
        @click="addRule()"
      />
    </div>
    <div class="w-1/3 flex justify-end">
      <q-btn
        round
        flat
        icon="eva-search-outline"
        @click="
          openURL(
            `https://search.brave.com/goggles?goggles_id=${encodeURIComponent(
              url
            )}`
          )
        "
      >
        <q-tooltip> Search Brave with this Goggle </q-tooltip>
      </q-btn>
      <q-btn round flat icon="eva-github-outline" @click="openURL(url)">
        <q-tooltip> Open Goggle on GitHub </q-tooltip>
      </q-btn>
      <q-btn
        round
        flat
        icon="eva-trash-2-outline"
        class="opacity-70"
        @click="deleteGoggle()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { openURL, useQuasar } from 'quasar'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import { GoggleActionObject } from 'src/types'
import CustomDialogVue from './CustomDialog.vue'

const $q = useQuasar()
const { updateGist, deleteGist } = useGistStore()
const { addActionRule } = useGoggleStore()

const props = defineProps(['action', 'url'])

function addRule() {
  const actionObj: GoggleActionObject = {
    pattern: '',
    site: '',
    options: [],
  }

  if (props.action !== 'discard') {
    actionObj.value = 2
  }

  addActionRule(props.action, actionObj)
}

function deleteGoggle() {
  $q.dialog({
    component: CustomDialogVue,
    componentProps: {
      title: 'Delete this Goggle?',
      message: 'This will also permanently delete the associated Gist.',
    },
  }).onOk(deleteGist)
}
</script>
