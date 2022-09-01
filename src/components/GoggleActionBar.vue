<template>
  <div text="gray" class="rounded-4 px-4 py-4 bg-stone-8">
    <div>
      <slot></slot>
    </div>
    <div flex>
      <div class="w-1/3">
        <q-btn
          v-if="context === 'edit'"
          round
          flat
          icon="eva-save-outline"
          @click="updateGist()"
        />
        <template v-else>
          <q-btn
            round
            flat
            icon="eva-edit-outline"
            @click="$router.push(`/goggle/${gist.id}/edit`)"
          />
          <!-- <q-btn round flat icon="eva-copy-outline" /> -->
          <q-btn
            round
            flat
            icon="eva-trash-2-outline"
            @click="deleteGoggle()"
          />
        </template>
      </div>
      <div class="w-1/3 flex justify-center">
        <q-btn
          v-if="action && action !== 'meta'"
          round
          flat
          icon="eva-plus-circle-outline"
          @click="addRule()"
        />
      </div>
      <div class="w-1/3 flex justify-end">
        <q-btn round flat icon="eva-cloud-upload-outline" @click="submitGoggle">
          <q-tooltip> Submit Goggle on Brave </q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          icon="eva-search-outline"
          :href="`https://search.brave.com/goggles?goggles_id=${encodeURIComponent(
            gist.url,
          )}`"
          target="_blank"
        >
          <q-tooltip> Search with this Goggle </q-tooltip>
        </q-btn>
        <q-btn
          v-if="goggle.metaData.public"
          round
          flat
          icon="eva-external-link-outline"
          :href="`https://search.brave.com/goggles/discover?goggles_id=${encodeURIComponent(
            gist.url,
          )}`"
          target="_blank"
        >
          <q-tooltip> View Goggle's about page on Brave </q-tooltip>
        </q-btn>
        <q-btn round flat icon="eva-github-outline" @click="openURL(gist.url)">
          <q-tooltip> Open gist on GitHub </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { openURL, copyToClipboard, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import { GoggleActionObject } from 'src/types'
import CustomDialogVue from './CustomDialog.vue'
import { v4 as uuidv4 } from 'uuid'

const $q = useQuasar()
const { updateGist, deleteGist } = useGistStore()
const { gist } = storeToRefs(useGistStore())
const { addActionRule } = useGoggleStore()
const { goggle } = storeToRefs(useGoggleStore())

const props = defineProps(['context', 'action'])

function addRule() {
  const actionObj: GoggleActionObject = {
    id: uuidv4(),
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

function submitGoggle() {
  $q.dialog({
    component: CustomDialogVue,
    componentProps: {
      title: 'Submit Goggle',
      message:
        'Due to CORS restrictions, this can only be done manually. The goggle URL will be copied to your clipboard. And you will be redirected to the Goggle submission page on Brave.',
    },
  }).onOk(async () => {
    await copyToClipboard(gist.value.url)
    openURL('https://search.brave.com/goggles/create')
  })
}
</script>
