<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import type { GoggleFilePreview } from 'src/types'

const props = defineProps<{
  goggleFilePreview: GoggleFilePreview
}>()

const router = useRouter()
const { availableHosts } = useGoggleFileStore()

function gotoDetailPage() {
  router.push({
    name: 'goggle-detail',
    params: {
      host: props.goggleFilePreview.host,
      id: props.goggleFilePreview.id,
    },
  })
}
</script>

<template>
  <div
    class="g-box px-7 py-4 min-h-20 cursor-pointer tracking-wide font-(bold [heading]) text-(xl stone-3) transition grid grid-cols-[2.5rem_1fr]"
    @click="gotoDetailPage"
  >
    <div class="flex items-center">
      <q-icon
        :name="availableHosts[goggleFilePreview.host].hostInfo.icon"
        class="mr-3 opacity-50"
      >
        <q-tooltip>
          {{ availableHosts[goggleFilePreview.host].hostInfo.name }}
        </q-tooltip>
      </q-icon>
    </div>
    <div class="flex items-center" data-cy="goggle-list-item-name">
      {{ goggleFilePreview.name || 'Unnamed Goggle' }}
    </div>
  </div>
</template>
