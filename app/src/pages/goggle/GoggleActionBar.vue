<script setup lang="ts">
import { openURL } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGoggleFileStore } from 'src/stores/goggle-file'

const { goggleFile } = storeToRefs(useGoggleFileStore())
const goggleFileStore = useGoggleFileStore()
</script>

<template>
  <div class="g-box p-4 text-gray space-y-5 sm:space-y-10">
    <slot name="before" />
    <div class="flex justify-between">
      <div class="sm:w-2/5">
        <slot name="left" />
      </div>
      <div class="sm:w-1/5 flex justify-center">
        <slot name="center" />
      </div>
      <div class="sm:w-2/5 flex justify-end">
        <slot name="right" />
        <template
          v-if="goggleFileStore.host?.hostInfo.canSubmit && goggleFile?.url"
        >
          <!-- TODO: Any way that TS detects vue if/else control flow logic for typing? -->
          <g-btn
            icon="eva-search-outline"
            :href="`https://search.brave.com/goggles?goggles_id=${encodeURIComponent(
              goggleFile.url,
            )}`"
            target="_blank"
          >
            <q-tooltip anchor="top middle" self="bottom middle">
              Search with Goggle
            </q-tooltip>
          </g-btn>

          <g-btn
            icon="eva-external-link-outline"
            :href="`https://search.brave.com/goggles/discover?goggles_id=${encodeURIComponent(
              goggleFile.url,
            )}`"
            target="_blank"
          >
            <q-tooltip anchor="top middle" self="bottom middle">
              View Goggle's about page on Brave
            </q-tooltip>
          </g-btn>

          <g-btn
            :icon="goggleFileStore.host.hostInfo.icon"
            @click="openURL(goggleFile.url)"
          >
            <q-tooltip anchor="top middle" self="bottom middle">
              Open with {{ goggleFileStore.host.hostInfo.name }}
            </q-tooltip>
          </g-btn>
        </template>
      </div>
    </div>
    <slot name="after" />
  </div>
</template>
