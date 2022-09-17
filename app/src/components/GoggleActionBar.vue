<template>
  <div class="g-box p-4 text-gray space-y-5 sm:space-y-10">
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
          <q-btn round flat icon="eva-copy-outline" @click="duplicateGoggle" />
          <q-btn round flat icon="eva-trash-2-outline" @click="deleteGoggle" />
        </template>
      </div>
      <div class="sm:w-1/5 flex justify-center">
        <q-btn
          v-if="tab && !['meta', 'code'].includes(tab)"
          round
          flat
          icon="eva-plus-circle-outline"
          @click="$emit('addRule')"
        />
      </div>
      <div class="sm:w-2/5 flex justify-end">
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
import { openURL } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import { useBraveStore } from 'stores/brave'
import { GoggleEditTab } from 'src/types'

const { updateGist } = useGistStore()
const { gist } = storeToRefs(useGistStore())
const { duplicateGoggle, deleteGoggle } = useGoggleStore()
const { submitGoggle } = useBraveStore()

defineProps<{
  context?: string
  tab?: GoggleEditTab
}>()

defineEmits<{
  (e: 'addRule'): void
}>()
</script>
