<script setup lang="ts">
import { copyToClipboard, useQuasar } from 'quasar'
import { useGoggleStore } from 'stores/goggle'

const $q = useQuasar()
const { stringifiedGoggle } = useGoggleStore()

const stringifiedGoggleLines = stringifiedGoggle.split('\n')

function copyCode() {
  copyToClipboard(stringifiedGoggle)
  $q.notify({
    message: 'Goggle code copied to clipboard',
    type: 'positive',
  })
}
</script>

<template>
  <div class="g-box px-6 py-4 h-full overflow-y-scroll relative">
    <q-virtual-scroll
      v-slot="{ item }"
      :items="stringifiedGoggleLines"
      class="h-full"
    >
      <highlightjs :code="item" lang="goggle" />
    </q-virtual-scroll>

    <div class="absolute right-19 top-3">
      <g-btn
        icon="eva-clipboard-outline"
        class="text-gray fixed"
        @click="copyCode()"
      />
    </div>
  </div>
</template>

<style lang="sass">
pre[lang="goggle"]
  @apply m-0

  & > code
    @apply #{'!'}p-0 bg-transparent whitespace-pre-wrap break-all font-mono leading-loose

    // empty lines
    &:not(.goggle)
      @apply h-[1.5rem]
</style>
