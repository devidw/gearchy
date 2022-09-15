<template>
  <highlightjs
    :code="stringifiedGoggle"
    lang="goggle"
    class="g-box px-6 py-4 h-full overflow-y-scroll"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'

const { stringifiedGoggle } = storeToRefs(useGoggleStore())
</script>

<style lang="sass">
pre[lang="goggle"]
  @apply m-0

  & > code
    @apply #{'!'}p-0 bg-transparent whitespace-pre-wrap font-mono leading-loose
</style>
