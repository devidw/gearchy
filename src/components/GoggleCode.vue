<template>
  <pre><code class="font-mono leading-loose">{{ stringifiedGoggle }}</code></pre>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'

const { stringifiedGoggle } = storeToRefs(useGoggleStore())
</script>
