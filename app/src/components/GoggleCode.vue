<template>
  <div class="g-box px-6 py-4 h-full overflow-y-scroll relative">
    <q-virtual-scroll
      :items="stringifiedGoggleLines"
      v-slot="{ item }"
      class="h-full"
    >
      <highlightjs :code="item" lang="goggle" />
    </q-virtual-scroll>

    <div class="absolute right-20 top-3">
      <q-btn
        round
        flat
        icon="eva-clipboard-outline"
        @click="copyCode()"
        class="text-gray fixed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { copyToClipboard, useQuasar } from 'quasar'
import { useGoggleStore } from 'stores/goggle'

const $q = useQuasar()
const { stringifiedGoggle } = useGoggleStore()

const stringifiedGoggleLines = computed(() => {
  return stringifiedGoggle.split('\n')
})

function copyCode() {
  copyToClipboard(stringifiedGoggle)
  $q.notify({
    message: 'Goggle code copied to clipboard',
    type: 'positive',
  })
}
</script>

<style lang="sass">
pre[lang="goggle"]
  @apply m-0

  & > code
    @apply #{'!'}p-0 bg-transparent whitespace-pre-wrap break-all font-mono leading-loose

    // empty lines
    &:not(.goggle)
      @apply h-[1.5rem]
</style>
