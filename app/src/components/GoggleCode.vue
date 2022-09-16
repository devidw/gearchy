<template>
  <div class="g-box px-6 py-4 h-full overflow-y-scroll relative">
    <highlightjs :code="stringifiedGoggle" lang="goggle" />
    <div class="absolute right-13 top-3">
      <q-btn
        round
        flat
        icon="eva-copy-outline"
        @click="copyCode()"
        class="text-gray fixed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'

const $q = useQuasar()
const { stringifiedGoggle } = storeToRefs(useGoggleStore())

function copyCode() {
  copyToClipboard(stringifiedGoggle.value)
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
</style>
