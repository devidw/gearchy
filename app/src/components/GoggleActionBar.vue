<template>
  <div class="g-box p-4 space-y-10 text-gray">
    <slot name="before"></slot>
    <div class="flex justify-between">
      <div class="sm:w-2/5">
        <q-btn
          v-if="context === 'edit'"
          round
          flat
          icon="eva-save-outline"
          @click="updateGist"
        />

        <template v-else>
          <q-btn
            round
            flat
            icon="eva-edit-outline"
            @click="$router.push(`/goggle/${gist.id}/edit`)"
          />
          <q-btn
            round
            flat
            icon="eva-trash-2-outline"
            @click="deleteGoggle()"
          />
        </template>
      </div>
      <div class="sm:w-1/5 flex justify-center">
        <q-btn
          v-if="tab && !['meta', 'codes'].includes(tab)"
          round
          flat
          icon="eva-plus-circle-outline"
          @click="$emit('add-rule')"
        />
      </div>
      <div class="sm:w-2/5 flex justify-end">
        <q-btn
          v-if="tab && tab === 'code'"
          round
          flat
          icon="eva-copy-outline"
          @click="copyCode()"
        />
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
    <slot name="after"></slot>
  </div>
</template>

<script setup lang="ts">
import { openURL, copyToClipboard, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import { useBraveStore } from 'stores/brave'
import CustomDialog from './CustomDialog.vue'
import { GoggleEditTab } from 'src/types'

const $q = useQuasar()
const { updateGist, deleteGist } = useGistStore()
const { gist } = storeToRefs(useGistStore())
const { goggle, stringifiedGoggle } = storeToRefs(useGoggleStore())
const { hasApiUrl } = storeToRefs(useBraveStore())
const { submitGoggle: automaticallySubmitGoggle } = useBraveStore()

defineProps<{
  context?: string
  tab?: GoggleEditTab
}>()

defineEmits<{
  (event: 'addRule'): void
}>()

function copyCode() {
  copyToClipboard(stringifiedGoggle.value)
  $q.notify({
    message: 'Goggle code copied to clipboard',
    type: 'positive',
    position: 'top',
    timeout: 1000,
  })
}

function deleteGoggle() {
  $q.dialog({
    component: CustomDialog,
    componentProps: {
      title: 'Delete this Goggle?',
      message:
        'This will permanently delete the associated Gist on GitHub. Once the gist is deleted, it has to be resubmitted on Brave to remove it from the search engine as well.',
    },
  }).onOk(async () => {
    await deleteGist()
    submitGoggle()
  })
}

function submitGoggle() {
  if (hasApiUrl.value) {
    automaticallySubmitGoggle(gist.value.url)
  } else {
    manuallySubmitGoggle(gist.value.url)
  }
}

function manuallySubmitGoggle(url: string) {
  $q.dialog({
    component: CustomDialog,
    componentProps: {
      title: 'Manually Submit Goggle',
      message:
        'The goggle URL will be copied to your clipboard. And you will be redirected to the Goggle submission page on Brave. For automated submissions, please refer to the FAQ.',
    },
  }).onOk(async () => {
    await copyToClipboard(url)
    openURL('https://search.brave.com/goggles/create')
  })
}
</script>
