<template>
  <div
    border="2 dotted stone-700"
    text="gray"
    class="rounded-4 px-4 py-1 flex justify-between"
  >
    <div>
      <q-btn round flat icon="eva-save-outline" @click="updateGist()" />
    </div>
    <div>
      <q-btn
        round
        flat
        icon="eva-external-link-outline"
        @click="
          openURL(
            `https://search.brave.com/goggles?goggles_id=${encodeURI(
              props.url
            )}`
          )
        "
      >
        <q-tooltip> Search Brave with this Goggle </q-tooltip>
      </q-btn>
      <q-btn round flat icon="eva-github-outline" @click="openURL(props.url)">
        <q-tooltip> Open Goggle on GitHub </q-tooltip>
      </q-btn>
      <q-btn
        round
        flat
        icon="eva-trash-2-outline"
        class="opacity-70"
        @click="deleteGist()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { openURL } from 'quasar'
import { useGistStore } from 'stores/gist'

const { updateGist, deleteGist } = useGistStore()

const props = defineProps(['url'])
</script>
