<template>
  <div
    class="g-box px-7 py-4 min-h-20 flex items-center cursor-pointer tracking-wide font-(bold [heading]) text-(xl stone-3) transition"
    @click="$router.push(`/goggle/${gist.id}`)"
  >
    <q-icon
      :name="gist.public ? 'eva-eye-outline' : 'eva-eye-off-outline'"
      class="mr-3 opacity-50"
    />
    {{ gist.description || 'Untitled' }}
  </div>
</template>

<script setup lang="ts">
import { Gist } from 'stores/gist'

defineProps<{
  gist: Gist
}>()
</script>
