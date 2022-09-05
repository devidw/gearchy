<template>
  <highlightjs :code="stringifiedGoggle" lang="goggle" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'

const { stringifiedGoggle } = storeToRefs(useGoggleStore())
</script>

<style lang="sass">
.hljs
  @apply bg-transparent whitespace-pre-wrap font-mono leading-loose
</style>
