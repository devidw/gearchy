<template>
  <div text="gray" class="rounded-4 px-4 py-4 bg-stone-8 space-y-10">
    <div>
      <slot></slot>
    </div>
    <div flex>
      <div class="w-2/5">
        <q-btn
          v-if="context === 'edit'"
          round
          flat
          icon="eva-save-outline"
          @click="updateAndMybSubmitGoggle()"
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
      <div class="w-1/5 flex justify-center">
        <q-btn
          v-if="action && action !== 'meta'"
          round
          flat
          icon="eva-plus-circle-outline"
          @click="addRule()"
        />
      </div>
      <div class="w-2/5 flex justify-end">
        <q-btn
          v-if="showCode"
          round
          flat
          icon="eva-copy-outline"
          @click="copyCode()"
        />
        <q-btn
          round
          flat
          icon="eva-code-download-outline"
          @click="() => (showCode = !showCode)"
          :class="{ 'rotate-180 ': showCode }"
          class="transition-(transform duration-300)"
        />
        <q-btn
          v-if="!hasApiUrl"
          round
          flat
          icon="eva-cloud-upload-outline"
          @click="manuallySubmitGoggle"
        >
          <q-tooltip> Submit Goggle on Brave </q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          icon="eva-search-outline"
          :href="`https://search.brave.com/goggles?goggles_id=${encodeURIComponent(
            gistUrlWithLogin,
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
            gistUrlWithLogin,
          )}`"
          target="_blank"
        >
          <q-tooltip> View Goggle's about page on Brave </q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          icon="eva-github-outline"
          @click="openURL(gistUrlWithLogin)"
        >
          <q-tooltip> Open gist on GitHub </q-tooltip>
        </q-btn>
      </div>
    </div>
    <Transition
      enter-active-class="transition-(all duration-300)"
      leave-active-class="transition-(all duration-300)"
      enter-from-class="opacity-0 -translate-y-3"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="showCode"
        class="bg-stone-7 rounded-4 px-6 py-2 max-h-xl overflow-y-scroll"
      >
        <goggle-code />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { openURL, copyToClipboard, useQuasar, Notify } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import { useBraveSubmissionProxyStore } from 'stores/brave-api-proxy'
import { GoggleActionObject } from 'src/types'
import CustomDialogVue from './CustomDialog.vue'
import GoggleCode from 'components/GoggleCode.vue'
import { v4 as uuidv4 } from 'uuid'

const $q = useQuasar()
const { updateGist, deleteGist } = useGistStore()
const { gist, gistUrlWithLogin } = storeToRefs(useGistStore())
const { addActionRule } = useGoggleStore()
const { goggle, stringifiedGoggle } = storeToRefs(useGoggleStore())
const { hasApiUrl } = storeToRefs(useBraveSubmissionProxyStore())
const { submitGoggle } = useBraveSubmissionProxyStore()
const showCode = ref(false)

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
    component: CustomDialogVue,
    componentProps: {
      title: 'Delete this Goggle?',
      message: 'This will also permanently delete the associated Gist.',
    },
  }).onOk(deleteGist)
}

async function updateAndMybSubmitGoggle() {
  await updateGist()

  if (hasApiUrl.value) {
    submitGoggle(gistUrlWithLogin.value)
  }
}

function manuallySubmitGoggle() {
  $q.dialog({
    component: CustomDialogVue,
    componentProps: {
      title: 'Manually Submit Goggle',
      message:
        'The goggle URL will be copied to your clipboard. And you will be redirected to the Goggle submission page on Brave. For automated submissions, please refer to the FAQ.',
    },
  }).onOk(async () => {
    await copyToClipboard(gist.value.url)
    openURL('https://search.brave.com/goggles/create')
  })
}
</script>
